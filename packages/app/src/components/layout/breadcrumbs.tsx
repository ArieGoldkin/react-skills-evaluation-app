"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbSegment[] = [];

  // Always start with home
  breadcrumbs.push({ label: "Dashboard", href: "/dashboard" });

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Map segments to readable labels
    let label = segment;
    switch (segment) {
      case "skills":
        label = "Skills";
        break;
      case "new":
        label = "New";
        break;
      case "edit":
        label = "Edit";
        break;
      case "assessments":
        label = "Assessments";
        break;
      case "analytics":
        label = "Analytics";
        break;
      case "admin":
        label = "Administration";
        break;
      case "categories":
        label = "Categories";
        break;
      case "dashboard":
        continue; // Skip dashboard since it's already added
    }

    breadcrumbs.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      href: currentPath,
    });
  }

  return breadcrumbs;
}

export function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  if (breadcrumbs.length <= 1) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={breadcrumb.href || breadcrumb.label}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href || "#"}>
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
