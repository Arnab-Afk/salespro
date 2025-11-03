import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics & Reports | SalesPro",
  description: "In-depth analysis and insights about your sales performance",
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
