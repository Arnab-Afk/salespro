"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";

const initialLeads = {
  new: [
    { id: "1", name: "John Smith", company: "Acme Inc", value: 12000 },
    { id: "2", name: "Sarah Wilson", company: "TechCorp", value: 24000 },
  ],
  contacted: [
    { id: "3", name: "Mike Brown", company: "StartupX", value: 8000 },
    { id: "4", name: "Lisa Chen", company: "BigCo", value: 32000 },
  ],
  qualified: [
    { id: "5", name: "Alex Johnson", company: "MegaCorp", value: 45000 },
  ],
  proposal: [
    { id: "6", name: "Emma Davis", company: "SmallBiz", value: 15000 },
  ],
  negotiation: [
    { id: "7", name: "Tom Wilson", company: "GrowthCo", value: 28000 },
  ],
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("30");

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceList = leads[result.source.droppableId as keyof typeof leads];
    const destList = leads[result.destination.droppableId as keyof typeof leads];
    const [removed] = sourceList.splice(result.source.index, 1);
    destList.splice(result.destination.index, 0, removed);

    setLeads({ ...leads });
  };

  return (
    <div className="space-y-8">
      <PageHeader page="pipeline">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => router.push("/dashboard/leads/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-6">
        {/* Pipeline Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold mt-2">$164,000</p>
            <p className="text-xs text-green-600 mt-1">+8% from last month</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Avg. Deal Size</p>
            <p className="text-2xl font-bold mt-2">$20,500</p>
            <p className="text-xs text-red-600 mt-1">-2% from last month</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
            <p className="text-2xl font-bold mt-2">32%</p>
            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Sales Cycle</p>
            <p className="text-2xl font-bold mt-2">24 days</p>
            <p className="text-xs text-muted-foreground mt-1">Avg. time to close</p>
          </Card>
        </div>

        {/* Pipeline Kanban */}
        <div className="grid grid-cols-5 gap-6">
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(leads).map(([stage, items]) => (
              <div key={stage} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold capitalize">{stage}</h3>
                  <Badge variant="secondary">{items.length}</Badge>
                </div>
                <Droppable droppableId={stage}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {items.map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={lead.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                              onClick={() =>
                                router.push(`/dashboard/leads/${lead.id}`)
                              }
                            >
                              <p className="font-medium">{lead.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {lead.company}
                              </p>
                              <p className="text-sm font-medium mt-2">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(lead.value)}
                              </p>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
