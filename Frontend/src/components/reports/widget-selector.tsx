"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface WidgetOption {
  id: string;
  title: string;
  description: string;
  size: "small" | "medium" | "large";
  category: "performance" | "leads" | "team" | "financial";
}

interface WidgetSelectorProps {
  onSelect: (widget: WidgetOption) => void;
  availableWidgets: WidgetOption[];
}

export function WidgetSelector({ onSelect, availableWidgets }: WidgetSelectorProps) {
  const categories = {
    performance: "Performance Metrics",
    leads: "Lead Analytics",
    team: "Team Insights",
    financial: "Financial Reports",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Widget
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Report Widget</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {Object.entries(categories).map(([category, title]) => {
            const widgets = availableWidgets.filter((w) => w.category === category);
            if (widgets.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="font-semibold mb-3">{title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {widgets.map((widget) => (
                    <Card
                      key={widget.id}
                      className="p-4 cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => onSelect(widget)}
                    >
                      <h4 className="font-medium">{widget.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {widget.description}
                      </p>
                      <div className="mt-2">
                        <span className="text-xs bg-primary/10 text-primary py-1 px-2 rounded-full">
                          {widget.size}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
