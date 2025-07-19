import * as React from "react";
import { AppLayout } from "./app-layout";
import {
  InteractiveHeader,
  SampleContent,
  SampleFooter,
  SampleSidebar,
} from "./sample-components";

export const InteractiveStory: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <AppLayout
      header={
        <InteractiveHeader
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      sidebar={<SampleSidebar collapsed={sidebarCollapsed} />}
      footer={<SampleFooter />}
      sidebarCollapsed={sidebarCollapsed}
    >
      <SampleContent />
    </AppLayout>
  );
};
