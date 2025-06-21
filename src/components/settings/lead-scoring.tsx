"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ScoringRule {
  id: string;
  field: string;
  condition: "equals" | "contains" | "greater_than" | "less_than" | "between";
  value: string;
  points: number;
}

interface ScoringModel {
  id: string;
  name: string;
  rules: ScoringRule[];
  qualificationThreshold: number;
}

interface ScoringTemplate {
  name: string;
  rules: ScoringRule[];
  qualificationThreshold: number;
}

const INDUSTRY_SCORING_TEMPLATES: Record<string, ScoringTemplate> = {
  technology: {
    name: "Technology Lead Scoring",
    rules: [
      { id: "1", field: "Company Size", condition: "greater_than", value: "100", points: 20 },
      { id: "2", field: "Budget Range", condition: "greater_than", value: "100000", points: 30 },
      { id: "3", field: "Technology Stack", condition: "contains", value: "Enterprise", points: 25 }
    ] as ScoringRule[],
    qualificationThreshold: 50
  },
  healthcare: {
    name: "Healthcare Lead Scoring",
    rules: [
      { id: "1", field: "Facility Type", condition: "equals", value: "Hospital", points: 30 },
      { id: "2", field: "Compliance Requirements", condition: "equals", value: "HIPAA", points: 25 },
      { id: "3", field: "Patient Volume", condition: "greater_than", value: "1000", points: 20 }
    ] as ScoringRule[],
    qualificationThreshold: 60
  },
  retail: {
    name: "Retail Lead Scoring",
    rules: [
      { id: "1", field: "Store Count", condition: "greater_than", value: "5", points: 25 },
      { id: "2", field: "Average Order Value", condition: "greater_than", value: "50", points: 20 },
      { id: "3", field: "Product Category", condition: "contains", value: "Premium", points: 30 }
    ] as ScoringRule[],
    qualificationThreshold: 45
  }
};

export function LeadScoringManager() {
  const [model, setModel] = useState<ScoringModel>({
    id: "1",
    name: "Default Scoring Model",
    rules: [
      { id: "1", field: "Company Size", condition: "greater_than", value: "50", points: 20 },
      { id: "2", field: "Budget", condition: "greater_than", value: "50000", points: 30 }
    ],
    qualificationThreshold: 40
  });

  const [newRule, setNewRule] = useState<Partial<ScoringRule>>({
    field: "",
    condition: "equals",
    value: "",
    points: 0
  });

  const addRule = () => {
    if (newRule.field && newRule.value && newRule.points) {
      setModel({
        ...model,
        rules: [
          ...model.rules,
          {
            id: String(model.rules.length + 1),
            field: newRule.field,
            condition: newRule.condition || "equals",
            value: newRule.value,
            points: newRule.points
          }
        ]
      });
      setNewRule({ field: "", condition: "equals", value: "", points: 0 });
    }
  };

  const removeRule = (id: string) => {
    setModel({
      ...model,
      rules: model.rules.filter(rule => rule.id !== id)
    });
  };

  const loadIndustryTemplate = (industry: keyof typeof INDUSTRY_SCORING_TEMPLATES) => {
    const template = INDUSTRY_SCORING_TEMPLATES[industry];
    setModel({
      id: "1",
      name: template.name,
      rules: template.rules,
      qualificationThreshold: template.qualificationThreshold
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Lead Scoring Model</CardTitle>
          <div className="flex items-center gap-2">
            <Select onValueChange={(value: keyof typeof INDUSTRY_SCORING_TEMPLATES) => loadIndustryTemplate(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Load Industry Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology Template</SelectItem>
                <SelectItem value="healthcare">Healthcare Template</SelectItem>
                <SelectItem value="retail">Retail Template</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Model Name</Label>
              <Input 
                value={model.name}
                onChange={(e) => setModel({ ...model, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Qualification Threshold (points)</Label>
              <Input 
                type="number"
                value={model.qualificationThreshold}
                onChange={(e) => setModel({ ...model, qualificationThreshold: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Scoring Rules</h4>
            
            <div className="flex gap-4">
              <Input
                placeholder="Field name"
                value={newRule.field}
                onChange={(e) => setNewRule({ ...newRule, field: e.target.value })}
                className="flex-1"
              />
              <Select
                value={newRule.condition}
                onValueChange={(value) => setNewRule({ ...newRule, condition: value as ScoringRule["condition"] })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="greater_than">Greater Than</SelectItem>
                  <SelectItem value="less_than">Less Than</SelectItem>
                  <SelectItem value="between">Between</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Value"
                value={newRule.value}
                onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                className="w-[150px]"
              />
              <Input
                type="number"
                placeholder="Points"
                value={newRule.points || ""}
                onChange={(e) => setNewRule({ ...newRule, points: Number(e.target.value) })}
                className="w-[100px]"
              />
              <Button onClick={addRule}>
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </div>

            <div className="space-y-2">
              {model.rules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-center gap-4 bg-secondary p-4 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{rule.field}</p>
                    <p className="text-sm text-muted-foreground">
                      {rule.condition.replace("_", " ")} {rule.value} • {rule.points} points
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRule(rule.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
