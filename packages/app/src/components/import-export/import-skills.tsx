"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SkillsBulkService } from "@/services";
import { LoadingSpinner } from "@skills-eval/design-system";
import {
  Upload,
  FileJson,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ImportResult {
  imported: number;
  skipped: number;
  errors: Array<{ row: number; error: string }>;
}

export function ImportSkills() {
  const [isDragging, setIsDragging] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(
    null
  );
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (
      file &&
      (file.type === "application/json" ||
        file.type === "text/csv" ||
        file.name.endsWith(".csv"))
    ) {
      setSelectedFile(file);
      setImportResult(null);
    } else {
      toast.error("Please upload a JSON or CSV file");
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      const formData = new globalThis.FormData();
      formData.append("file", selectedFile);

      const result = await SkillsBulkService.importSkills(formData);
      setImportResult(result);

      if (result.imported > 0) {
        toast.success(`Successfully imported ${result.imported} skills`);
      }

      if (result.errors.length > 0) {
        toast.error(`${result.errors.length} errors occurred during import`);
      }
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Failed to import skills. Please check your file format.");
    } finally {
      setIsImporting(false);
    }
  };

  const resetImport = () => {
    setSelectedFile(null);
    setImportResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Skills</CardTitle>
        <CardDescription>
          Upload a JSON or CSV file to import skills
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedFile && !importResult && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports JSON and CSV formats
            </p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button variant="outline" asChild>
                <span>
                  Choose File
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".json,.csv"
                    onChange={handleFileSelect}
                    disabled={isImporting}
                  />
                </span>
              </Button>
            </label>
          </div>
        )}

        {selectedFile && !importResult && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              {selectedFile.type === "application/json" ? (
                <FileJson className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
              <div className="flex-1">
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetImport}
                disabled={isImporting}
              >
                Remove
              </Button>
            </div>

            <Button
              onClick={handleImport}
              disabled={isImporting}
              className="w-full"
            >
              {isImporting ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Skills
                </>
              )}
            </Button>
          </div>
        )}

        {importResult && (
          <div className="space-y-4">
            {importResult.imported > 0 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Import Successful</AlertTitle>
                <AlertDescription>
                  Successfully imported {importResult.imported} skills
                </AlertDescription>
              </Alert>
            )}

            {importResult.skipped > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Some Skills Skipped</AlertTitle>
                <AlertDescription>
                  {importResult.skipped} skills were skipped (duplicates or
                  invalid data)
                </AlertDescription>
              </Alert>
            )}

            {importResult.errors.length > 0 && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Import Errors</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">
                    {importResult.errors.length} errors occurred:
                  </p>
                  <ul className="text-xs space-y-1 max-h-32 overflow-y-auto">
                    {importResult.errors.slice(0, 5).map((error, index) => (
                      <li key={index}>
                        Row {error.row}: {error.error}
                      </li>
                    ))}
                    {importResult.errors.length > 5 && (
                      <li>
                        ... and {importResult.errors.length - 5} more errors
                      </li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <Button onClick={resetImport} variant="outline" className="w-full">
              Import More Skills
            </Button>
          </div>
        )}

        <div className="pt-4 border-t">
          <h4 className="font-medium text-sm mb-2">File Format Guidelines</h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div>
              <strong>CSV Format:</strong> name, categoryId, proficiency,
              description, tags (comma-separated)
            </div>
            <div>
              <strong>JSON Format:</strong> Array of objects with properties:
              name, categoryId, proficiency, description, tags
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
