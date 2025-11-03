"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ReportCard } from "@/components/reports/report-card";
import { demoData } from "@/components/reports/demo-data";

export default function TeamMemberReport({ params }: { params: { id: string }}) {
  const member = demoData.teamMembers.find(m => m.id === params.id) || demoData.teamMembers[0];
  
  return (
    <div className="space-y-8">
      <PageHeader 
        title={member.name}
        description={`${member.role} · ${member.email}`}
        showBack
        backHref="/dashboard/reports/team"
        backLabel="Back to Team Performance"
      />

      <div className="grid grid-cols-3 gap-6">
        {/* Summary Card */}
        <ReportCard title="Performance Summary">
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  notation: "compact",
                }).format(member.revenue)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Deals Closed</p>
              <p className="font-medium">{member.deals}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="font-medium">{member.conversion}%</p>
            </div>
          </div>
        </ReportCard>

        {/* Activity Metrics */}
        <ReportCard title="Activity Metrics" className="col-span-2">
          <div className="space-y-4 mt-4">
            {[
              { label: "Sales Calls", value: 145, target: 150, trend: "+12%" },
              { label: "Client Meetings", value: 24, target: 30, trend: "+5%" },
              { label: "Proposals Sent", value: 12, target: 15, trend: "-2%" },
              { label: "Follow-ups", value: 89, target: 100, trend: "+8%" },
            ].map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <div className="space-x-4">
                    <span className="font-medium">
                      {metric.value} / {metric.target}
                    </span>
                    <span className={metric.trend.startsWith("+") ? "text-green-500" : "text-red-500"}>
                      {metric.trend}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary/80 to-primary"
                    style={{ width: `${(metric.value / metric.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ReportCard>

        {/* Performance Timeline */}
        <ReportCard title="Monthly Performance" className="col-span-3">
          <div className="h-[300px] flex items-end gap-4 mt-4">
            {Array.from({ length: 6 }, (_, i) => ({
              month: new Date(2025, i, 1).toLocaleDateString("en-US", { month: "short" }),
              value: Math.floor(Math.random() * 100000) + 50000,
            })).map((item) => (
              <div key={item.month} className="flex-1">
                <div
                  className="bg-gradient-to-t from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 transition-colors rounded-t"
                  style={{ height: `${(item.value / 150000) * 100}%` }}
                />
                <p className="text-sm font-medium mt-2">{item.month}</p>
                <p className="text-xs text-muted-foreground">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                  }).format(item.value)}
                </p>
              </div>
            ))}
          </div>
        </ReportCard>
      </div>
    </div>
  );
}
