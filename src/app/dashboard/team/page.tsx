"use client";

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
  Mail,
  Phone,
  Pencil,
  Trash2,
  User,
  Shield,
} from "lucide-react";

import { TeamForm } from "@/components/team/team-form";
import { useState } from "react";

const initialTeamMembers = [
  {
    id: "1",
    name: "Sarah Connor",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    leads: 45,
    deals: 15,
    conversion: "33%",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 234-5678",
    role: "Sales Rep",
    leads: 38,
    deals: 12,
    conversion: "32%",
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@example.com",
    phone: "+1 (555) 345-6789",
    role: "Sales Rep",
    leads: 32,
    deals: 8,
    conversion: "25%",
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 (555) 456-7890",
    role: "Sales Rep",
    leads: 28,
    deals: 10,
    conversion: "36%",
  },
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground mt-2">
            Manage your team members and their roles
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Invite a new team member to join your sales team.
              </DialogDescription>
            </DialogHeader>
            <TeamForm 
              onSubmit={(data) => {
                const newMember = {
                  id: (teamMembers.length + 1).toString(),
                  name: data.name,
                  email: data.email,
                  phone: data.phone,
                  role: data.role,
                  leads: 0,
                  deals: 0,
                  conversion: "0%",
                };
                setTeamMembers([...teamMembers, newMember]);
                setDialogOpen(false);
              }}
              onCancel={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {/* Team Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Members</p>
            <p className="text-2xl font-bold mt-2">{teamMembers.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Active Leads</p>
            <p className="text-2xl font-bold mt-2">143</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Average Conversion</p>
            <p className="text-2xl font-bold mt-2">31.5%</p>
          </Card>
        </div>

        {/* Team List */}
        <Card>
          <div className="grid divide-y">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-6 grid grid-cols-4 gap-4 items-center"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.role === "Admin" ? (
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3" /> Admin
                          </span>
                        ) : (
                          member.role
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <div className="flex items-center gap-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm hover:underline flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" /> {member.email}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Leads</p>
                    <p className="font-medium">{member.leads}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deals</p>
                    <p className="font-medium">{member.deals}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conv.</p>
                    <p className="font-medium">{member.conversion}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={(e) => {
                        e.preventDefault();
                        window.location.href = `mailto:${member.email}`;
                      }}>
                        <Mail className="h-4 w-4 mr-2" /> Email
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={(e) => {
                        e.preventDefault();
                        window.location.href = `tel:${member.phone}`;
                      }}>
                        <Phone className="h-4 w-4 mr-2" /> Call
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onSelect={() => {
                          setTeamMembers(teamMembers.filter(t => t.id !== member.id));
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
