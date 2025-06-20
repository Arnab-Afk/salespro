"use client";

import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface BadgeDeltaProps {
  children: React.ReactNode;
  deltaType: "increase" | "decrease" | "unchanged";
  size?: "xs" | "sm" | "md";
  className?: string;
}

export function BadgeDelta({
  children,
  deltaType,
  size = "sm",
  className,
}: BadgeDeltaProps) {
  const sizeClasses = {
    xs: "text-xs px-1.5 py-0.5 gap-0.5",
    sm: "text-sm px-2 py-1 gap-1",
    md: "text-base px-2.5 py-1.5 gap-1.5",
  };

  const deltaColors = {
    increase: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    decrease: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    unchanged: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-medium",
        sizeClasses[size],
        deltaColors[deltaType],
        className
      )}
    >
      {deltaType === "increase" && (
        <ArrowUpIcon
          className={cn(
            "text-green-600 dark:text-green-400",
            size === "xs" ? "h-3 w-3" : "h-4 w-4"
          )}
        />
      )}
      {deltaType === "decrease" && (
        <ArrowDownIcon
          className={cn(
            "text-red-600 dark:text-red-400",
            size === "xs" ? "h-3 w-3" : "h-4 w-4"
          )}
        />
      )}
      {children}
    </span>
  );
}
