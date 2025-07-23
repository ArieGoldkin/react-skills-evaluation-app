"use client";

import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Undo2,
  Redo2,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import * as React from "react";
import { Button } from "../../ui/button";

export interface RichTextEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onHTMLChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  editorClassName?: string;
  toolbarClassName?: string;
  minHeight?: number;
  maxHeight?: number;
  showToolbar?: boolean;
  tools?: ToolbarTool[];
  autoFocus?: boolean;
}

export type ToolbarTool =
  | "bold"
  | "italic"
  | "underline"
  | "bulletList"
  | "orderedList"
  | "blockquote"
  | "code"
  | "link"
  | "undo"
  | "redo"
  | "heading1"
  | "heading2"
  | "heading3"
  | "alignLeft"
  | "alignCenter"
  | "alignRight"
  | "|"; // Separator

const DEFAULT_TOOLS: ToolbarTool[] = [
  "bold",
  "italic",
  "underline",
  "|",
  "bulletList",
  "orderedList",
  "blockquote",
  "|",
  "code",
  "link",
  "|",
  "undo",
  "redo",
];

export function RichTextEditor({
  value,
  defaultValue = "",
  onChange,
  onHTMLChange,
  placeholder = "Start typing...",
  disabled = false,
  className,
  editorClassName,
  toolbarClassName,
  minHeight = 120,
  maxHeight,
  showToolbar = true,
  tools = DEFAULT_TOOLS,
  autoFocus = false,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [isEditorFocused, setIsEditorFocused] = React.useState(false);

  // Use controlled or uncontrolled value
  const currentValue = value !== undefined ? value : internalValue;

  // Initialize editor content
  React.useEffect(() => {
    if (editorRef.current && currentValue !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = currentValue;
    }
  }, [currentValue]);

  // Auto focus
  React.useEffect(() => {
    if (autoFocus && editorRef.current) {
      editorRef.current.focus();
    }
  }, [autoFocus]);

  // Handle content changes
  const handleInput = React.useCallback(() => {
    if (!editorRef.current) return;

    const html = editorRef.current.innerHTML;
    const text = editorRef.current.textContent || "";

    if (value === undefined) {
      setInternalValue(html);
    }

    onChange?.(text);
    onHTMLChange?.(html);
  }, [value, onChange, onHTMLChange]);

  // Execute formatting command
  const executeCommand = React.useCallback(
    (command: string, value?: string) => {
      if (disabled) return;

      document.execCommand(command, false, value);
      editorRef.current?.focus();
      handleInput();
    },
    [disabled, handleInput]
  );

  // Handle special commands
  const handleCommand = React.useCallback(
    (tool: ToolbarTool) => {
      switch (tool) {
        case "bold":
          executeCommand("bold");
          break;
        case "italic":
          executeCommand("italic");
          break;
        case "underline":
          executeCommand("underline");
          break;
        case "bulletList":
          executeCommand("insertUnorderedList");
          break;
        case "orderedList":
          executeCommand("insertOrderedList");
          break;
        case "blockquote":
          executeCommand("formatBlock", "blockquote");
          break;
        case "code":
          executeCommand("formatBlock", "pre");
          break;
        case "link": {
          const url = window.prompt("Enter URL:");
          if (url) {
            executeCommand("createLink", url);
          }
          break;
        }
        case "undo":
          executeCommand("undo");
          break;
        case "redo":
          executeCommand("redo");
          break;
        case "heading1":
          executeCommand("formatBlock", "h1");
          break;
        case "heading2":
          executeCommand("formatBlock", "h2");
          break;
        case "heading3":
          executeCommand("formatBlock", "h3");
          break;
        case "alignLeft":
          executeCommand("justifyLeft");
          break;
        case "alignCenter":
          executeCommand("justifyCenter");
          break;
        case "alignRight":
          executeCommand("justifyRight");
          break;
      }
    },
    [executeCommand]
  );

  // Check if command is active
  const isCommandActive = React.useCallback(
    (tool: ToolbarTool): boolean => {
      if (!isEditorFocused) return false;

      try {
        switch (tool) {
          case "bold":
            return document.queryCommandState("bold");
          case "italic":
            return document.queryCommandState("italic");
          case "underline":
            return document.queryCommandState("underline");
          case "bulletList":
            return document.queryCommandState("insertUnorderedList");
          case "orderedList":
            return document.queryCommandState("insertOrderedList");
          case "alignLeft":
            return document.queryCommandState("justifyLeft");
          case "alignCenter":
            return document.queryCommandState("justifyCenter");
          case "alignRight":
            return document.queryCommandState("justifyRight");
          default:
            return false;
        }
      } catch {
        return false;
      }
    },
    [isEditorFocused]
  );

  // Get tool icon
  const getToolIcon = (tool: ToolbarTool) => {
    const iconClass = "h-4 w-4";
    switch (tool) {
      case "bold":
        return <Bold className={iconClass} />;
      case "italic":
        return <Italic className={iconClass} />;
      case "underline":
        return <Underline className={iconClass} />;
      case "bulletList":
        return <List className={iconClass} />;
      case "orderedList":
        return <ListOrdered className={iconClass} />;
      case "blockquote":
        return <Quote className={iconClass} />;
      case "code":
        return <Code className={iconClass} />;
      case "link":
        return <Link className={iconClass} />;
      case "undo":
        return <Undo2 className={iconClass} />;
      case "redo":
        return <Redo2 className={iconClass} />;
      case "heading1":
        return <Type className={iconClass} />;
      case "heading2":
        return <Type className={iconClass} />;
      case "heading3":
        return <Type className={iconClass} />;
      case "alignLeft":
        return <AlignLeft className={iconClass} />;
      case "alignCenter":
        return <AlignCenter className={iconClass} />;
      case "alignRight":
        return <AlignRight className={iconClass} />;
      default:
        return null;
    }
  };

  // Get tool title
  const getToolTitle = (tool: ToolbarTool): string => {
    switch (tool) {
      case "bold":
        return "Bold (Ctrl+B)";
      case "italic":
        return "Italic (Ctrl+I)";
      case "underline":
        return "Underline (Ctrl+U)";
      case "bulletList":
        return "Bullet List";
      case "orderedList":
        return "Numbered List";
      case "blockquote":
        return "Quote";
      case "code":
        return "Code Block";
      case "link":
        return "Insert Link";
      case "undo":
        return "Undo (Ctrl+Z)";
      case "redo":
        return "Redo (Ctrl+Y)";
      case "heading1":
        return "Heading 1";
      case "heading2":
        return "Heading 2";
      case "heading3":
        return "Heading 3";
      case "alignLeft":
        return "Align Left";
      case "alignCenter":
        return "Align Center";
      case "alignRight":
        return "Align Right";
      default:
        return "";
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      // Handle keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            handleCommand("bold");
            break;
          case "i":
            e.preventDefault();
            handleCommand("italic");
            break;
          case "u":
            e.preventDefault();
            handleCommand("underline");
            break;
          case "z":
            if (e.shiftKey) {
              e.preventDefault();
              handleCommand("redo");
            } else {
              e.preventDefault();
              handleCommand("undo");
            }
            break;
          case "y":
            e.preventDefault();
            handleCommand("redo");
            break;
        }
      }
    },
    [disabled, handleCommand]
  );

  const isEmpty =
    !currentValue ||
    currentValue.trim() === "" ||
    currentValue === "<div><br></div>";

  return (
    <div
      className={cn(
        "border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      {/* Toolbar */}
      {showToolbar && (
        <div
          className={cn(
            "flex items-center gap-1 p-2 border-b bg-muted/30",
            toolbarClassName
          )}
        >
          {tools.map((tool, index) => {
            if (tool === "|") {
              return (
                <div
                  key={`separator-${index}`}
                  className="w-px h-6 bg-border mx-1"
                />
              );
            }

            const isActive = isCommandActive(tool);
            return (
              <Button
                key={tool}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCommand(tool)}
                disabled={disabled}
                title={getToolTitle(tool)}
                className="h-8 w-8 p-0"
              >
                {getToolIcon(tool)}
              </Button>
            );
          })}
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        className={cn(
          "prose prose-sm max-w-none p-3 focus:outline-none",
          "prose-headings:my-2 prose-p:my-1 prose-ul:my-1 prose-ol:my-1",
          "prose-blockquote:my-2 prose-blockquote:pl-4 prose-blockquote:border-l-4",
          "prose-pre:bg-muted prose-pre:p-2 prose-pre:rounded",
          disabled && "opacity-50 cursor-not-allowed bg-muted/50",
          editorClassName
        )}
        style={{
          minHeight: `${minHeight}px`,
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
          overflowY: maxHeight ? "auto" : undefined,
        }}
        onInput={handleInput}
        onFocus={() => setIsEditorFocused(true)}
        onBlur={() => setIsEditorFocused(false)}
        onKeyDown={handleKeyDown}
        data-placeholder={isEmpty ? placeholder : undefined}
        suppressContentEditableWarning
      />

      {/* Placeholder styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          [contenteditable][data-placeholder]:empty::before {
            content: attr(data-placeholder);
            color: hsl(var(--muted-foreground));
            pointer-events: none;
            position: absolute;
          }
        `,
        }}
      />
    </div>
  );
}
