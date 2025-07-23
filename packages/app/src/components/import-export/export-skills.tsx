"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@skills-eval/design-system";
import { Download, FileJson, FileText, FileType } from "lucide-react";
import { toast } from "sonner";

export function ExportSkills() {
  const [format, setFormat] = useState<"json" | "csv" | "pdf">("json");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Make a direct fetch request to handle file download
      const response = await fetch(`/api/skills/export?format=${format}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `skills-export-${new Date().toISOString().split("T")[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);

      toast.success(`Skills exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export skills. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const formatIcons = {
    json: <FileJson className="h-4 w-4" />,
    csv: <FileText className="h-4 w-4" />,
    pdf: <FileType className="h-4 w-4" />,
  };

  const formatDescriptions = {
    json: "Best for backups and importing to other systems",
    csv: "Best for spreadsheet applications like Excel",
    pdf: "Best for sharing and printing",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Skills</CardTitle>
        <CardDescription>
          Download your skills data in various formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="export-format">Export Format</Label>
          <Select
            value={format}
            onValueChange={value => setFormat(value as typeof format)}
            disabled={isExporting}
          >
            <SelectTrigger id="export-format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">
                <div className="flex items-center gap-2">
                  {formatIcons.json}
                  <span>JSON</span>
                </div>
              </SelectItem>
              <SelectItem value="csv">
                <div className="flex items-center gap-2">
                  {formatIcons.csv}
                  <span>CSV</span>
                </div>
              </SelectItem>
              <SelectItem value="pdf">
                <div className="flex items-center gap-2">
                  {formatIcons.pdf}
                  <span>PDF</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {formatDescriptions[format]}
          </p>
        </div>

        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full"
        >
          {isExporting ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export Skills
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
