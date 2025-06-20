"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Mail,
  PhoneCall,
  Settings,
  MoreVertical,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "online" | "offline" | "busy";
  avatar: string;
}

const mockTeam: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1234567890",
    role: "Administrator",
    status: "online",
    avatar: "JS",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1234567891",
    role: "Sales Manager",
    status: "busy",
    avatar: "SW",
  },
  {
    id: "3",
    name: "Mike Brown",
    email: "mike@example.com",
    phone: "+1234567892",
    role: "Sales Agent",
    status: "offline",
    avatar: "MB",
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground mt-1">Manage your team members and their access.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Member
        </Button>
      </div>

      <div className="grid gap-6">
        {mockTeam.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                {member.avatar}
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{member.name}</h3>
                  <span 
                    className={`inline-flex h-2 w-2 rounded-full ${
                      member.status === "online" ? "bg-green-500" :
                      member.status === "busy" ? "bg-yellow-500" :
                      "bg-gray-300"
                    }`}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>

              {/* Contact Info */}
              <div className="flex items-center gap-4 text-muted-foreground">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <PhoneCall className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Email</p>
                <p>{member.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p>{member.phone}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-muted p-4 rounded-lg mt-8">
        <h3 className="font-semibold mb-2">Role Information</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p><strong>Administrator:</strong> Full access to all features and settings</p>
          <p><strong>Sales Manager:</strong> Manage team members, view all leads, and access reports</p>
          <p><strong>Sales Agent:</strong> Manage assigned leads and view basic reports</p>
        </div>
      </div>
    </div>
  );
}
