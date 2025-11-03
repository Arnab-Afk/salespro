"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BadgeDelta } from "@/components/ui/badge-delta";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ReportCardProps {
  className?: string;
  title: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
  onRemove?: () => void;
}

export function ReportCard({
  className,
  title,
  size = "md",
  children,
  trend,
  onRemove,
}: ReportCardProps) {
  const sizeClasses = {
    sm: "col-span-1",
    md: "col-span-2",
    lg: "col-span-3",
  };

  return (
    <Card 
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200",
        "hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5",
        sizeClasses[size],
        className,
      )}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <div className="flex items-center gap-4">
            {trend && (
              <BadgeDelta
                deltaType={trend.positive ? "increase" : "decrease"}
                size="xs"
              >
                {trend.value}
              </BadgeDelta>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onRemove && (
                  <DropdownMenuItem onClick={onRemove}>
                    Remove
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>Refresh</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </Card>
  );
}

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ value, label, trend, trendUp }: StatCardProps) {
  return (
    <Card className="p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {trend && (
          <div className={cn(
            "text-xs font-medium",
            trendUp ? "text-green-600" : "text-red-600"
          )}>
            {trend}
          </div>
        )}
      </div>
    </Card>
  );
}
