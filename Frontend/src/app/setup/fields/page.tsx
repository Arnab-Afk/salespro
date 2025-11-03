"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, GripVertical, X } from "lucide-react";
import { markStepComplete } from "@/lib/setup-steps";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

type FieldType = "text" | "number" | "email" | "phone" | "date" | "select" | "multiselect";

interface DraggableProvided {
  draggableProps: any;
  dragHandleProps: any;
  innerRef: (element: HTMLElement | null) => void;
}

interface DroppableProvided {
  droppableProps: any;
  innerRef: (element: HTMLElement | null) => void;
  placeholder: ReactNode;
}

interface DragSnapshot {
  isDragging: boolean;
}

interface Field {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export default function FieldsSetup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<Field[]>([
    { id: "1", name: "Full Name", type: "text", required: true },
    { id: "2", name: "Email", type: "email", required: true },
    { id: "3", name: "Phone", type: "phone", required: false },
    { id: "4", name: "Lead Source", type: "select", required: true, options: ["Website", "Referral", "Advertisement"] },
  ]);

  const fieldTypes: { value: FieldType; label: string }[] = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "date", label: "Date" },
    { value: "select", label: "Single Select" },
    { value: "multiselect", label: "Multi Select" },
  ];

  const addField = () => {
    const newField = {
      id: String(fields.length + 1),
      name: "New Field",
      type: "text" as FieldType,
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };

  const handleNext = async () => {
    try {
      setIsLoading(true);
      await markStepComplete("fields");
      router.push("/setup/team");
    } catch (error) {
      console.error("Error saving fields setup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Setup Lead Fields</h1>
        <p className="text-muted-foreground text-sm">
          Define the information you want to collect about leads. Drag to reorder fields.
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={field.id}
                  index={index}
                >
                  {((provided: DraggableProvided, snapshot: DragSnapshot) => (
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
                        <div className="flex-1 grid grid-cols-4 gap-6 items-center">
                          <Input
                            value={field.name}
                            onChange={(e) => updateField(field.id, { name: e.target.value })}
                            placeholder="Field Name"
                          />
                          <Select
                            value={field.type}
                            onValueChange={(value: FieldType) => updateField(field.id, { type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {fieldTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {(field.type === "select" || field.type === "multiselect") && (
                            <Input
                              value={field.options?.join(", ") || ""}
                              onChange={(e) => updateField(field.id, { 
                                options: e.target.value.split(",").map(s => s.trim()) 
                              })}
                              placeholder="Options (comma-separated)"
                            />
                          )}
                          <div className="flex items-center gap-2 justify-end">
                            <Switch
                              checked={field.required}
                              onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                              id={`required-${field.id}`}
                            />
                            <Label 
                            htmlFor={`required-${field.id}`} 
                            className="text-sm font-medium"
                          >
                            Required
                          </Label>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeField(field.id)}
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

      <div className="mt-8 flex items-center gap-4">
        <Button 
          onClick={addField}
          variant="outline"
          className="transition-colors hover:bg-muted"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
        <div className="ml-auto space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/setup/pipeline")}
          >
            Previous: Pipeline
          </Button>
          <Button 
            onClick={handleNext}
            disabled={isLoading || fields.length === 0}
          >
            {isLoading ? "Saving..." : "Next: Setup Team"}
          </Button>
        </div>
      </div>
    </div>
  );
}
