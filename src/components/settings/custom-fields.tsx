"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, GripVertical, X, Settings2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface CustomField {
  id: string;
  name: string;
  type: "text" | "number" | "email" | "phone" | "date" | "select" | "checkbox";
  required: boolean;
  options?: string[];
  industry?: string;
}

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "date", label: "Date" },
  { value: "select", label: "Dropdown" },
  { value: "checkbox", label: "Checkbox" }
];

const INDUSTRY_TEMPLATES: Record<string, CustomField[]> = {
  technology: [
    { id: "tech1", name: "Technology Stack", type: "select", required: true },
    { id: "tech2", name: "Company Size", type: "number", required: true },
    { id: "tech3", name: "Budget Range", type: "select", required: true }
  ] as CustomField[],
  healthcare: [
    { id: "health1", name: "Specialization", type: "text", required: true },
    { id: "health2", name: "Facility Type", type: "select", required: true },
    { id: "health3", name: "Compliance Requirements", type: "checkbox", required: true }
  ] as CustomField[],
  retail: [
    { id: "retail1", name: "Store Count", type: "number", required: true },
    { id: "retail2", name: "Product Category", type: "select", required: true },
    { id: "retail3", name: "Average Order Value", type: "number", required: true }
  ] as CustomField[]
};

export function CustomFieldsManager() {
  const [fields, setFields] = useState<CustomField[]>([
    { id: "1", name: "Company Size", type: "number", required: true },
    { id: "2", name: "Industry", type: "select", required: true },
    { id: "3", name: "Budget", type: "number", required: false }
  ]);

  const [newField, setNewField] = useState<Partial<CustomField>>({
    name: "",
    type: "text",
    required: false
  });

  const addField = () => {
    if (newField.name && newField.type) {
      setFields([
        ...fields,
        { 
          id: String(fields.length + 1),
          name: newField.name,
          type: newField.type as CustomField["type"],
          required: newField.required || false
        }
      ]);
      setNewField({ name: "", type: "text", required: false });
    }
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };

  const loadIndustryTemplate = (industry: keyof typeof INDUSTRY_TEMPLATES) => {
    setFields(INDUSTRY_TEMPLATES[industry].map(field => ({
      ...field,
      industry
    })));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Custom Lead Fields</CardTitle>
          <div className="flex items-center gap-2">
            <Select onValueChange={(value: keyof typeof INDUSTRY_TEMPLATES) => loadIndustryTemplate(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Load Industry Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Input
              placeholder="Field name"
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              className="flex-1"
            />
            <Select
              value={newField.type}
              onValueChange={(value) => setNewField({ ...newField, type: value as CustomField["type"] })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Field Type" />
              </SelectTrigger>
              <SelectContent>
                {FIELD_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <label className="text-sm">
                <input
                  type="checkbox"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="mr-2"
                />
                Required
              </label>
            </div>
            <Button onClick={addField}>
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </Button>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {fields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
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
                          <div className="flex-1">
                            <p className="font-medium">{field.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {FIELD_TYPES.find(t => t.value === field.type)?.label} • 
                              {field.required ? " Required" : " Optional"}
                              {field.industry && ` • ${field.industry} template`}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeField(field.id)}
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

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
