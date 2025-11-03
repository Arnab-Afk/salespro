"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { markStepComplete } from "@/lib/setup-steps";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

const roles = [
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "Sales Manager" },
  { value: "agent", label: "Sales Agent" },
  { value: "viewer", label: "Viewer" },
];

export default function TeamSetup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" },
  ]);

  const addMember = () => {
    const newMember = {
      id: String(members.length + 1),
      name: "",
      email: "",
      role: "agent",
    };
    setMembers([...members, newMember]);
  };

  const updateMember = (id: string, updates: Partial<TeamMember>) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
  };

  const removeMember = (id: string) => {
    if (members.length === 1) return;
    setMembers(members.filter(member => member.id !== id));
  };

  const handleFinish = async () => {
    try {
      setIsLoading(true);
      await markStepComplete("team");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing setup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateMembers = () => {
    return members.every(member => 
      member.name.trim() !== "" && 
      member.email.trim() !== "" && 
      member.email.includes("@")
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Setup Your Team</h1>
        <p className="text-muted-foreground text-sm">
          Add team members and assign their roles to manage access permissions.
        </p>
      </div>

      <div className="space-y-4">
        {members.map((member) => (
          <Card 
            key={member.id} 
            className="p-4 transition-colors hover:bg-muted/50 group border-2 border-transparent"
          >
            <div className="flex items-center gap-6">
              <div className="flex-1 grid grid-cols-3 gap-4">
                <Input
                  value={member.name}
                  onChange={(e) => updateMember(member.id, { name: e.target.value })}
                  placeholder="Full Name"
                />
                <Input
                  value={member.email}
                  onChange={(e) => updateMember(member.id, { email: e.target.value })}
                  placeholder="Email Address"
                  type="email"
                />
                <Select
                  value={member.role}
                  onValueChange={(value) => updateMember(member.id, { role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeMember(member.id)}
                disabled={member.role === "admin" && members.length === 1}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Button 
          onClick={addMember}
          variant="outline"
          className="transition-colors hover:bg-muted"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
        <div className="ml-auto space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/setup/fields")}
          >
            Previous: Fields
          </Button>
          <Button 
            onClick={handleFinish}
            disabled={isLoading || !validateMembers()}
          >
            {isLoading ? "Completing Setup..." : "Complete Setup"}
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg border">
        <h3 className="font-semibold mb-2">Role Permissions</h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li><strong>Administrator:</strong> Full access to all features, including settings and team management</li>
          <li><strong>Sales Manager:</strong> Access to all leads, reports, and team performance metrics</li>
          <li><strong>Sales Agent:</strong> Access to assigned leads and basic reporting</li>
          <li><strong>Viewer:</strong> View-only access to leads and basic reports</li>
        </ul>
      </div>
    </div>
  );
}
