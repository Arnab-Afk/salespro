"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  { path: "pipeline", label: "Pipeline Setup" },
  { path: "fields", label: "Fields Setup" },
  { path: "team", label: "Team Setup" },
];

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();

  const currentIndex = steps.findIndex((step) => step.path === segment);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="mr-4 font-bold">SalesPro Setup</div>
          <nav className="flex items-center space-x-4 lg:space-x-6">
            {steps.map((step, index) => (
              <Link
                key={step.path}
                href={`/setup/${step.path}`}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  segment === step.path
                    ? "text-primary font-medium"
                    : index <= currentIndex
                    ? "text-muted-foreground"
                    : "text-muted-foreground/60 pointer-events-none"
                )}
              >
                {step.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
