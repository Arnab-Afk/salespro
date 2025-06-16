import { Metadata } from "next"
import { DashboardLayout } from "./dashboard-layout"

export const metadata: Metadata = {
  title: {
    default: "Dashboard - SalesPro",
    template: "%s - SalesPro Dashboard"
  },
  description: "Lead Management Dashboard for SalesPro"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
