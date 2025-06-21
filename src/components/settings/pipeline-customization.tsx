"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, GripVertical, X } from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  color: string;
  requirements?: string[];
}

export function PipelineCustomization() {
  const [stages, setStages] = useState<PipelineStage[]>([
    { id: "1", name: "Lead", color: "#e11d48" },
    { id: "2", name: "Contact Made", color: "#f59e0b" },
    { id: "3", name: "Proposal Sent", color: "#3b82f6" },
    { id: "4", name: "Negotiation", color: "#8b5cf6" },
    { id: "5", name: "Closed Won", color: "#22c55e" }
  ]);

  const [newStage, setNewStage] = useState({ name: "", color: "#000000" });

  const addStage = () => {
    if (newStage.name) {
      setStages([
        ...stages,
        { id: String(stages.length + 1), ...newStage }
      ]);
      setNewStage({ name: "", color: "#000000" });
    }
  };

  const removeStage = (id: string) => {
    setStages(stages.filter(stage => stage.id !== id));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStages(items);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Pipeline Stages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Input
              placeholder="Stage name"
              value={newStage.name}
              onChange={(e) => setNewStage({ ...newStage, name: e.target.value })}
              className="flex-1"
            />
            <Input
              type="color"
              value={newStage.color}
              onChange={(e) => setNewStage({ ...newStage, color: e.target.value })}
              className="w-[100px]"
            />
            <Button onClick={addStage}>
              <Plus className="w-4 h-4 mr-2" />
              Add Stage
            </Button>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="stages">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {stages.map((stage, index) => (
                    <Draggable
                      key={stage.id}
                      draggableId={stage.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center gap-4 bg-secondary p-4 rounded-lg"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab"
                          >
                            <GripVertical className="w-5 h-5" />
                          </div>
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: stage.color }}
                          />
                          <span className="flex-1">{stage.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeStage(stage.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
