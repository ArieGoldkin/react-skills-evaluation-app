"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ExportSkills, ImportSkills } from "@/components/import-export";
import { SidebarTrigger } from "@skills-eval/design-system";
import { DynamicBreadcrumbs } from "@/components/layout/breadcrumbs";

export default function ImportExportPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <DynamicBreadcrumbs />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Import/Export Skills</h1>
            <p className="text-muted-foreground">
              Backup your skills or migrate data between systems
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ImportSkills />
          <ExportSkills />
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Tips for Import/Export</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Export your skills regularly as a backup</li>
            <li>• Use JSON format for complete data preservation</li>
            <li>• Use CSV format for editing in spreadsheet applications</li>
            <li>• Ensure category IDs exist before importing skills</li>
            <li>• Review import errors and fix data issues before retrying</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
