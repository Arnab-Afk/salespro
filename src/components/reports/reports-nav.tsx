"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const reportSections = [
  {
    href: "/dashboard/reports/overview",
    label: "Overview",
  },
  {
    href: "/dashboard/reports/pipeline",
    label: "Pipeline Analytics",
  },
  {
    href: "/dashboard/reports/team",
    label: "Team Performance",
  },
];

export function ReportsNav() {
  const pathname = usePathname();

  return (
    <Card className="mb-8">
      <nav className="flex divide-x border-b">
        {reportSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={cn(
              "flex-1 px-4 py-3 text-center text-sm transition-colors hover:bg-muted/50",
              pathname === section.href
                ? "bg-background font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            {section.label}
          </Link>
        ))}
      </nav>
    </Card>
  );
}
