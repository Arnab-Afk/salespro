"use client";

import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface ReportWidgetProps {
  title: string;
  size?: "small" | "medium" | "large";
  onRemove?: () => void;
  children: React.ReactNode;
}

export function ReportWidget({
  title,
  size = "medium",
  onRemove,
  children,
}: ReportWidgetProps) {
  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-2",
    large: "col-span-3",
  };

  return (
    <Card className={`${sizeClasses[size]} p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onRemove && (
              <DropdownMenuItem onClick={onRemove}>
                Remove Widget
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>Refresh</DropdownMenuItem>
            <DropdownMenuItem>Download Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </Card>
  );
}
