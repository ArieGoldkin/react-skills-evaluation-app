"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@skills-eval/design-system";
import { useEffect, useState } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    // Read cookie on client side
    const sidebarState = document.cookie
      .split("; ")
      .find(row => row.startsWith("sidebar_state="))
      ?.split("=")[1];

    setDefaultOpen(sidebarState !== "false");
  }, []);

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
