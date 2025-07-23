import { MonitoringDashboard } from "@/components/monitoring";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Monitoring | Skills Evaluation",
  description: "Monitor system health and performance metrics",
};

export default function MonitoringPage() {
  return <MonitoringDashboard />;
}
