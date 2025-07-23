"use client";

/* global FileList, FileReader */

import { cn } from "@/lib/utils";
import { Upload, X, File, Image, FileText, Archive } from "lucide-react";
import * as React from "react";
import { Button } from "../../ui/button";

export interface FileUploadFile {
  file: File;
  id: string;
  preview?: string;
  status: "pending" | "uploading" | "success" | "error";
  progress?: number;
  error?: string;
}

export interface FileUploadProps {
  onFilesChange?: (files: FileUploadFile[]) => void;
  onUpload?: (files: FileUploadFile[]) => Promise<void>;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  disabled?: boolean;
  className?: string;
  dragAreaClassName?: string;
  showPreview?: boolean;
  allowRemove?: boolean;
  uploadOnSelect?: boolean;
  children?: React.ReactNode;
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_MAX_FILES = 10;

export function FileUpload({
  onFilesChange,
  onUpload,
  accept,
  multiple = true,
  maxFiles = DEFAULT_MAX_FILES,
  maxSize = DEFAULT_MAX_SIZE,
  disabled = false,
  className,
  dragAreaClassName,
  showPreview = true,
  allowRemove = true,
  uploadOnSelect = false,
  children,
}: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<FileUploadFile[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);

  // Handle file selection
  const handleFiles = React.useCallback(
    async (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);

      // Validate file count
      const remainingSlots = maxFiles - files.length;
      const filesToAdd = fileArray.slice(0, remainingSlots);

      if (fileArray.length > remainingSlots) {
        console.warn(`Only ${remainingSlots} more files can be added`);
      }

      // Validate file size and create file objects
      const validFiles: FileUploadFile[] = [];

      for (const file of filesToAdd) {
        if (file.size > maxSize) {
          console.warn(
            `File ${file.name} is too large. Max size: ${formatFileSize(maxSize)}`
          );
          continue;
        }

        const fileObj: FileUploadFile = {
          file,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          status: "pending",
          progress: 0,
        };

        // Create preview for images
        if (showPreview && file.type.startsWith("image/")) {
          try {
            fileObj.preview = await createImagePreview(file);
          } catch (error) {
            console.warn("Failed to create image preview:", error);
          }
        }

        validFiles.push(fileObj);
      }

      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);

      // Auto-upload if enabled
      if (uploadOnSelect && onUpload && validFiles.length > 0) {
        try {
          await onUpload(validFiles);
          // Update status to success
          setFiles(prev =>
            prev.map(f =>
              validFiles.find(vf => vf.id === f.id)
                ? { ...f, status: "success" as const, progress: 100 }
                : f
            )
          );
        } catch (error) {
          // Update status to error
          setFiles(prev =>
            prev.map(f =>
              validFiles.find(vf => vf.id === f.id)
                ? { ...f, status: "error" as const, error: String(error) }
                : f
            )
          );
        }
      }
    },
    [
      files,
      maxFiles,
      maxSize,
      showPreview,
      onFilesChange,
      onUpload,
      uploadOnSelect,
    ]
  );

  // Handle file input change
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [handleFiles]
  );

  // Handle drag and drop
  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        handleFiles(droppedFiles);
      }
    },
    [disabled, handleFiles]
  );

  // Remove file
  const removeFile = React.useCallback(
    (fileId: string) => {
      const updatedFiles = files.filter(f => f.id !== fileId);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    },
    [files, onFilesChange]
  );

  // Trigger file input
  const triggerFileInput = React.useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  // Manual upload
  const triggerUpload = React.useCallback(async () => {
    if (!onUpload || files.length === 0) return;

    const pendingFiles = files.filter(f => f.status === "pending");
    if (pendingFiles.length === 0) return;

    try {
      // Update status to uploading
      setFiles(prev =>
        prev.map(f =>
          pendingFiles.find(pf => pf.id === f.id)
            ? { ...f, status: "uploading" as const, progress: 0 }
            : f
        )
      );

      await onUpload(pendingFiles);

      // Update status to success
      setFiles(prev =>
        prev.map(f =>
          pendingFiles.find(pf => pf.id === f.id)
            ? { ...f, status: "success" as const, progress: 100 }
            : f
        )
      );
    } catch (error) {
      // Update status to error
      setFiles(prev =>
        prev.map(f =>
          pendingFiles.find(pf => pf.id === f.id)
            ? { ...f, status: "error" as const, error: String(error) }
            : f
        )
      );
    }
  }, [onUpload, files]);

  // Get file icon
  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith("image/")) return <Image className="h-8 w-8" />;
    if (type.includes("pdf") || type.includes("document"))
      return <FileText className="h-8 w-8" />;
    if (type.includes("zip") || type.includes("archive"))
      return <Archive className="h-8 w-8" />;
    return <File className="h-8 w-8" />;
  };

  // Get status color
  const getStatusColor = (status: FileUploadFile["status"]) => {
    switch (status) {
      case "pending":
        return "text-muted-foreground";
      case "uploading":
        return "text-blue-500";
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const canAddMore = files.length < maxFiles;
  const pendingCount = files.filter(f => f.status === "pending").length;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Drag and drop area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={canAddMore ? triggerFileInput : undefined}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          isDragOver && !disabled
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed",
          !canAddMore && "cursor-not-allowed opacity-50",
          dragAreaClassName
        )}
      >
        {children || (
          <div className="flex flex-col items-center space-y-4">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isDragOver ? "Drop files here" : "Upload files"}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Max {maxFiles} files, up to {formatFileSize(maxSize)} each
                {accept && ` • ${accept}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              Files ({files.length}/{maxFiles})
            </h4>
            {!uploadOnSelect && pendingCount > 0 && onUpload && (
              <Button onClick={triggerUpload} size="sm" disabled={disabled}>
                Upload {pendingCount} file{pendingCount !== 1 ? "s" : ""}
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {files.map(fileObj => (
              <div
                key={fileObj.id}
                className="flex items-center space-x-3 p-3 border rounded-lg"
              >
                {/* File preview or icon */}
                <div className="flex-shrink-0">
                  {fileObj.preview ? (
                    <img
                      src={fileObj.preview}
                      alt={fileObj.file.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 flex items-center justify-center bg-muted rounded">
                      {getFileIcon(fileObj.file)}
                    </div>
                  )}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{fileObj.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(fileObj.file.size)}
                  </p>

                  {/* Progress bar for uploading files */}
                  {fileObj.status === "uploading" &&
                    fileObj.progress !== undefined && (
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${fileObj.progress}%` }}
                        />
                      </div>
                    )}

                  {/* Error message */}
                  {fileObj.status === "error" && fileObj.error && (
                    <p className="text-xs text-red-500 mt-1">{fileObj.error}</p>
                  )}
                </div>

                {/* Status indicator */}
                <div
                  className={cn(
                    "text-sm font-medium",
                    getStatusColor(fileObj.status)
                  )}
                >
                  {fileObj.status === "pending" && "Ready"}
                  {fileObj.status === "uploading" && "Uploading..."}
                  {fileObj.status === "success" && "Uploaded"}
                  {fileObj.status === "error" && "Failed"}
                </div>

                {/* Remove button */}
                {allowRemove && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(fileObj.id)}
                    disabled={disabled}
                    className="h-8 w-8 p-0 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
