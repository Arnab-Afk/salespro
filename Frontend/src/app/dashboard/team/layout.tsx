import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Management | SalesPro",
  description: "Manage your team members and track individual performance",
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-6xl mx-auto">{children}</div>;
}
