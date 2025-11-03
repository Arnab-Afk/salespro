"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Mail,
  Phone,
  Building,
  Globe,
  MapPin,
  Clock,
  ChevronLeft,
  BarChart3,
  CalendarDays,
  MessageSquare,
  Plus,
} from "lucide-react";
import Link from "next/link";

// Mock data for the lead
const leadData = {
  id: "1",
  name: "John Smith",
  company: "Acme Corporation",
  email: "john@acmecorp.com",
  phone: "+1 (555) 123-4567",
  website: "www.acmecorp.com",
  location: "San Francisco, CA",
  value: 75000,
  stage: "Qualified",
  source: "Website",
  assignedTo: "Sarah Connor",
  createdAt: "2023-06-15",
  lastContact: "2023-06-20",
};

const activities = [
  {
    type: "email",
    title: "Follow-up Email Sent",
    description: "Sent product pricing and features document",
    date: "2023-06-20",
    time: "2:30 PM",
  },
  {
    type: "call",
    title: "Discovery Call",
    description: "Discussed current pain points and requirements",
    date: "2023-06-18",
    time: "11:00 AM",
  },
  {
    type: "note",
    title: "Meeting Notes",
    description: "Client interested in enterprise package. Need to schedule demo next week.",
    date: "2023-06-18",
    time: "11:45 AM",
  },
];

const tasks = [
  {
    title: "Schedule Product Demo",
    dueDate: "2023-06-25",
    priority: "High",
    completed: false,
  },
  {
    title: "Send Proposal",
    dueDate: "2023-06-28",
    priority: "Medium",
    completed: false,
  },
];

export default function LeadDetailsPage() {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/leads">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{leadData.name}</h1>
            <p className="text-muted-foreground">{leadData.company}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button>
            <CalendarDays className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Overview Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Lead Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Stage</p>
                <p className="font-medium">{leadData.stage}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Deal Value</p>
                <p className="font-medium">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(leadData.value)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Source</p>
                <p className="font-medium">{leadData.source}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p className="font-medium">{leadData.assignedTo}</p>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex gap-4">
              <button
                className={`pb-2 text-sm font-medium ${
                  activeTab === "activity"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("activity")}
              >
                Activity
              </button>
              <button
                className={`pb-2 text-sm font-medium ${
                  activeTab === "tasks"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("tasks")}
              >
                Tasks
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "activity" ? (
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                    </div>
                    <div className="text-sm text-right">
                      <p>{activity.date}</p>
                      <p className="text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Activity
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Due: {task.dueDate}
                      </p>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.priority}
                    </div>
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Task
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${leadData.email}`} className="text-sm hover:underline">
                  {leadData.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${leadData.phone}`} className="text-sm hover:underline">
                  {leadData.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`https://${leadData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  {leadData.website}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{leadData.location}</span>
              </div>
            </div>
          </Card>

          {/* Key Dates */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Key Dates</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Created</span>
                </div>
                <span className="text-sm">{leadData.createdAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last Contact</span>
                </div>
                <span className="text-sm">{leadData.lastContact}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
