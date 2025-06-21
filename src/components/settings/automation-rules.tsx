"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface AutomationRule {
  id: string;
  trigger: string;
  condition: string;
  value: string;
  action: string;
  params?: string;
}

const TRIGGERS = [
  { value: "lead_created", label: "Lead Created" },
  { value: "field_updated", label: "Field Updated" },
  { value: "score_above", label: "Lead Score Above" },
  { value: "stage_changed", label: "Pipeline Stage Changed" }
];

const ACTIONS = [
  { value: "send_email", label: "Send Email" },
  { value: "assign_owner", label: "Assign Owner" },
  { value: "create_task", label: "Create Task" },
  { value: "update_field", label: "Update Field" }
];

export function AutomationRulesManager() {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: "1",
      trigger: "score_above",
      condition: "score",
      value: "60",
      action: "send_email",
      params: "Notify sales manager"
    }
  ]);

  const [newRule, setNewRule] = useState<Partial<AutomationRule>>({
    trigger: "",
    condition: "",
    value: "",
    action: "",
    params: ""
  });

  const addRule = () => {
    if (newRule.trigger && newRule.condition && newRule.value && newRule.action) {
      setRules([
        ...rules,
        {
          id: String(rules.length + 1),
          trigger: newRule.trigger,
          condition: newRule.condition,
          value: newRule.value,
          action: newRule.action,
          params: newRule.params
        }
      ]);
      setNewRule({ trigger: "", condition: "", value: "", action: "", params: "" });
    }
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automation Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Select
              value={newRule.trigger}
              onValueChange={(value) => setNewRule({ ...newRule, trigger: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trigger" />
              </SelectTrigger>
              <SelectContent>
                {TRIGGERS.map(trigger => (
                  <SelectItem key={trigger.value} value={trigger.value}>
                    {trigger.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Condition (field/score/stage)"
              value={newRule.condition}
              onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
              className="w-[180px]"
            />
            <Input
              placeholder="Value"
              value={newRule.value}
              onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
              className="w-[120px]"
            />
            <Select
              value={newRule.action}
              onValueChange={(value) => setNewRule({ ...newRule, action: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                {ACTIONS.map(action => (
                  <SelectItem key={action.value} value={action.value}>
                    {action.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Params (optional)"
              value={newRule.params}
              onChange={(e) => setNewRule({ ...newRule, params: e.target.value })}
              className="w-[180px]"
            />
            <Button onClick={addRule}>
              <Plus className="w-4 h-4 mr-2" />
              Add Rule
            </Button>
          </div>

          <div className="space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center gap-4 bg-secondary p-4 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium">
                    {TRIGGERS.find(t => t.value === rule.trigger)?.label || rule.trigger}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If <span className="font-semibold">{rule.condition}</span> is <span className="font-semibold">{rule.value}</span>, then <span className="font-semibold">{ACTIONS.find(a => a.value === rule.action)?.label || rule.action}</span> {rule.params && `(${rule.params})`}
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

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
