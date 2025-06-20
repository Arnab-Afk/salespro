"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ReportCard } from "@/components/reports/report-card";
import { demoData } from "@/components/reports/demo-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeDelta } from "@/components/ui/badge-delta";

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("30");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Business metrics and insights
          </p>
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-4 auto-rows-[minmax(140px,auto)] gap-6">
        {/* Revenue Card */}
        <ReportCard
          size="md"
          title="Total Revenue"
          trend={{
            value: demoData.kpis.totalRevenue.trend,
            positive: true,
          }}
        >
          <div>
            <p className="text-3xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(demoData.kpis.totalRevenue.value)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {demoData.kpis.totalRevenue.subtext}
            </p>
          </div>
        </ReportCard>

        {/* Leads Card */}
        <ReportCard
          size="sm"
          title="Active Leads"
          trend={{
            value: demoData.kpis.totalLeads.trend,
            positive: true,
          }}
        >
          <div>
            <p className="text-3xl font-bold">{demoData.kpis.totalLeads.value}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {demoData.kpis.totalLeads.subtext}
            </p>
          </div>
        </ReportCard>

        {/* Conversion Rate Card */}
        <ReportCard
          size="sm"
          title="Conversion Rate"
          trend={{
            value: demoData.kpis.conversionRate.trend,
            positive: true,
          }}
        >
          <div>
            <p className="text-3xl font-bold">
              {demoData.kpis.conversionRate.value}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {demoData.kpis.conversionRate.subtext}
            </p>
          </div>
        </ReportCard>

        {/* Recent Activity */}
        <ReportCard size="lg" title="Recent Activity">
          <div className="space-y-8">
            {demoData.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(activity.value)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ReportCard>

        {/* Team Performance */}
        <ReportCard size="lg" title="Team Performance">
          <div className="space-y-6">
            {demoData.teamMembers.map((member) => (
              <div key={member.name} className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-muted-foreground">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      notation: "compact",
                    }).format(member.revenue)}
                  </p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${member.conversion}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{member.deals} deals</span>
                  <span>{member.conversion}% conv. rate</span>
                </div>
              </div>
            ))}
          </div>
        </ReportCard>

        {/* Pipeline Distribution */}
        <ReportCard size="md" title="Pipeline Distribution">
          <div className="flex items-end gap-4 h-[200px]">
            {demoData.pipelineStages.map((stage) => {
              const percentage = (stage.count / 245) * 100;
              return (
                <div key={stage.stage} className="flex-1">
                  <div
                    className="bg-primary/10 hover:bg-primary/20 transition-colors rounded-t"
                    style={{ height: `${percentage}%` }}
                  />
                  <p className="text-sm font-medium mt-2">{stage.stage}</p>
                  <p className="text-sm text-muted-foreground">{stage.count}</p>
                </div>
              );
            })}
          </div>
        </ReportCard>

        {/* Monthly Targets */}
        <Card className="col-span-2 p-6">
          <h3 className="font-semibold mb-4">Monthly Targets</h3>
          <div className="space-y-4">
            {Object.entries(demoData.monthlyTargets).map(([key, data]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium capitalize">{key}</span>
                  <span className="text-sm text-muted-foreground">
                    {data.current} / {data.target}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${data.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
