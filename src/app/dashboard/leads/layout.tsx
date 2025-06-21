import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Pipeline | SalesPro",
  description: "Manage and track your sales opportunities",
};

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-theme(spacing.16))] overflow-auto">
      {children}
    </div>
  );
}
