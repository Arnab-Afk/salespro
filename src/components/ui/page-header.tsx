"use client";

import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
}

export function PageHeader({ 
  title, 
  description, 
  className, 
  children,
  showBack,
  backHref,
  backLabel,
}: PageHeaderProps) {
  return (
    <div className="space-y-2">
      {showBack && <BackButton href={backHref} label={backLabel} />}
      <div className={cn("flex items-center justify-between pb-6", className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-2">
            {description}
          </p>
        )}
      </div>
      {children && <div className="ml-auto">{children}</div>}
      </div>
    </div>
  );
}
