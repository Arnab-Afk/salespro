"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart3,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Leads",
    value: "164",
    change: "+12%",
    trend: "up",
    icon: Users
  },
  {
    title: "Pipeline Value",
    value: "$425,000",
    change: "+8%",
    trend: "up",
    icon: DollarSign
  },
  {
    title: "Conversion Rate",
    value: "32%",
    change: "-5%",
    trend: "down",
    icon: BarChart3
  }
];

const recentActivity = [
  {
    type: "call",
    lead: "John Smith",
    time: "10 mins ago",
    icon: Phone
  },
  {
    type: "email",
    lead: "Sarah Johnson",
    time: "1 hour ago",
    icon: Mail
  },
  {
    type: "meeting",
    lead: "Mike Brown",
    time: "3 hours ago",
    icon: Calendar
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-muted p-2 rounded-full">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.lead}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type} · {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href="/dashboard/leads"
            className="text-sm text-primary hover:underline block mt-4"
          >
            View all activity
          </Link>
        </Card>

        {/* Pipeline Overview */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Pipeline Overview</h2>
          <div className="space-y-4">
            {[
              { stage: "Lead", count: 45, value: "$225,000" },
              { stage: "Qualified", count: 28, value: "$140,000" },
              { stage: "Proposal", count: 12, value: "$60,000" },
              { stage: "Won", count: 8, value: "$40,000" },
            ].map((stage) => (
              <div key={stage.stage} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{stage.stage}</p>
                  <p className="text-sm text-muted-foreground">
                    {stage.count} leads
                  </p>
                </div>
                <p className="font-semibold">{stage.value}</p>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/leads"
            className="text-sm text-primary hover:underline block mt-4"
          >
            View full pipeline
          </Link>
        </Card>
      </div>
    </div>
  );
}
