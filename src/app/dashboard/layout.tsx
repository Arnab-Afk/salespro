import type { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard/nav";
import DashboardShell from "./dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard | SalesPro",
  description: "Your sales performance at a glance",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <DashboardShell>
        {children}
      </DashboardShell>
    </div>
  );
}
