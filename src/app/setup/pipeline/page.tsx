"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markStepComplete } from "@/lib/setup-steps";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Plus, GripVertical, X } from "lucide-react";
import type { ReactNode } from "react";

type DraggableProps = {
  draggableId: string;
  index: number;
  children: (provided: DraggableProvided, snapshot: DraggableSnapshot) => React.ReactNode;
};

type DraggableProvided = {
  draggableProps: any;
  dragHandleProps: any;
  innerRef: (element: HTMLElement | null) => void;
};

type DraggableSnapshot = {
  isDragging: boolean;
};

type DroppableProvided = {
  droppableProps: any;
  innerRef: (element: HTMLElement | null) => void;
  placeholder: React.ReactNode;
};

interface Stage {
  id: string;
  name: string;
  description: string;
}

export default function PipelineSetup() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [stages, setStages] = useState<Stage[]>([
    { id: "1", name: "Lead", description: "Initial contact with potential customer" },
    { id: "2", name: "Qualified", description: "Lead has been qualified" },
    { id: "3", name: "Proposal", description: "Proposal sent to customer" },
  ]);

  const addStage = () => {
    const newStage = {
      id: String(stages.length + 1),
      name: "New Stage",
      description: "Description",
    };
    setStages([...stages, newStage]);
  };

  const updateStage = (id: string, field: keyof Stage, value: string) => {
    setStages(stages.map(stage => 
      stage.id === id ? { ...stage, [field]: value } : stage
    ));
  };

  const removeStage = (id: string) => {
    setStages(stages.filter(stage => stage.id !== id));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStages(items);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Setup Your Sales Pipeline</h1>
        <p className="text-muted-foreground text-sm">
          Define the stages your leads will go through. Drag to reorder stages.
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="stages">
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {stages.map((stage, index) => (
                <Draggable
                  key={stage.id}
                  draggableId={stage.id}
                  index={index}
                >
                  {((provided: DraggableProvided, snapshot: DraggableSnapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-4 transition-colors hover:bg-muted/50 group border-2 border-transparent data-[dragging=true]:border-primary/50"
                      data-dragging={snapshot.isDragging}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          {...provided.dragHandleProps}
                          className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor={`stage-name-${stage.id}`}>Stage Name</Label>
                            <Input
                              id={`stage-name-${stage.id}`}
                              value={stage.name}
                              onChange={(e) => updateStage(stage.id, "name", e.target.value)}
                              className="bg-background"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`stage-desc-${stage.id}`}>Description</Label>
                            <Input
                              id={`stage-desc-${stage.id}`}
                              value={stage.description}
                              onChange={(e) => updateStage(stage.id, "description", e.target.value)}
                              className="bg-background"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStage(stage.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  )) as any}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-8 flex items-center justify-between">
        <Button 
          onClick={addStage}
          variant="outline"
          className="transition-colors hover:bg-muted"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Stage
        </Button>
        <Button 
          onClick={async () => {
            try {
              setIsSaving(true);
              // Store pipeline stages (you should implement actual storage)
              await markStepComplete("pipeline");
              router.push("/setup/fields");
            } catch (error) {
              console.error("Failed to save pipeline:", error);
            } finally {
              setIsSaving(false);
            }
          }}
          className="ml-auto"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Continue to Field Setup"}
        </Button>
      </div>
    </div>
  );
}
