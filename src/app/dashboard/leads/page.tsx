"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreVertical,
  ArrowLeftRight,
  Mail,
  Phone,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { LeadForm } from "@/components/leads/lead-form";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: string;
  value: number;
}

const mockLeads: Record<string, Lead[]> = {
  "Lead": [
    { id: "1", name: "John Smith", email: "john@example.com", phone: "+1234567890", stage: "Lead", value: 5000 },
    { id: "2", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1234567891", stage: "Lead", value: 7500 },
  ],
  "Qualified": [
    { id: "3", name: "Mike Brown", email: "mike@example.com", phone: "+1234567892", stage: "Qualified", value: 10000 },
  ],
  "Proposal": [
    { id: "4", name: "Lisa Davis", email: "lisa@example.com", phone: "+1234567893", stage: "Proposal", value: 15000 },
    { id: "5", name: "David Wilson", email: "david@example.com", phone: "+1234567894", stage: "Proposal", value: 12000 },
  ],
  "Won": [
    { id: "6", name: "Emma Taylor", email: "emma@example.com", phone: "+1234567895", stage: "Won", value: 20000 },
  ],
};

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState(mockLeads);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceStage = result.source.droppableId;
    const targetStage = result.destination.droppableId;
    const draggedLead = leads[sourceStage][result.source.index];

    const newLeads = { ...leads };

    // Remove from source
    newLeads[sourceStage] = leads[sourceStage].filter(
      (_, index) => index !== result.source.index
    );

    // Add to destination
    draggedLead.stage = targetStage;
    newLeads[targetStage] = [
      ...leads[targetStage].slice(0, result.destination.index),
      draggedLead,
      ...leads[targetStage].slice(result.destination.index),
    ];

    setLeads(newLeads);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leads Pipeline</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Enter the lead's information below.
              </DialogDescription>
            </DialogHeader>
            <LeadForm 
              onSubmit={(data) => {
                console.log(data); // Replace with actual submit logic
                const newLead = {
                  id: (leads["Lead"].length + 1).toString(),
                  name: data.name,
                  email: data.email,
                  phone: data.phone,
                  stage: data.stage,
                  value: parseInt(data.value),
                };
                
                setLeads({
                  ...leads,
                  [data.stage]: [...leads[data.stage], newLead],
                });
              }}
              onCancel={() => {
                // Close dialog (This will be handled by Dialog component)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(leads).map(([stage, stageLeads]) => (
            <div key={stage} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{stage}</h2>
                <span className="text-sm text-muted-foreground">
                  {stageLeads.length} {stageLeads.length === 1 ? "lead" : "leads"}
                </span>
              </div>

              <Droppable droppableId={stage}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {stageLeads.map((lead, index) => (
                      <Draggable
                        key={lead.id}
                        draggableId={lead.id}
                        index={index}
                      >
                        {(provided: any) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 space-y-3"
                          >
                            <div 
                              className="cursor-pointer"
                              onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{lead.name}</p>
                                  <p className="text-sm font-medium text-primary">
                                    {formatCurrency(lead.value)}
                                  </p>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onSelect={(e: Event) => {
                                      e.preventDefault();
                                      window.location.href = `mailto:${lead.email}`;
                                    }}>
                                      <Mail className="h-4 w-4 mr-2" /> Email
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={(e: Event) => {
                                      e.preventDefault();
                                      window.location.href = `tel:${lead.phone}`;
                                    }}>
                                      <Phone className="h-4 w-4 mr-2" /> Call
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Pencil className="h-4 w-4 mr-2" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <div className="flex gap-3 text-muted-foreground mt-3">
                                <p className="text-xs">
                                  {lead.email}
                                </p>
                              </div>
                            </div>
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
  );
}
