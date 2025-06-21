"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ReportCard } from "@/components/reports/report-card";
import { ReportsNav } from "@/components/reports/reports-nav";
import { demoData } from "@/components/reports/demo-data";

export default function ReportsOverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Overview" 
        description="Key metrics and performance trends at a glance" 
      />
      <ReportsNav />

      <div className="grid grid-cols-3 gap-6">
        {/* KPIs */}
        <ReportCard
          title="Total Revenue"
          trend={{
            value: demoData.kpis.totalRevenue.trend,
            positive: true,
          }}
        >
          <div className="mt-4">
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

        <ReportCard
          title="Pipeline Value"
          trend={{
            value: "+12.3%",
            positive: true,
          }}
        >
          <div className="mt-4">
            <p className="text-3xl font-bold">$2.8M</p>
            <p className="text-sm text-muted-foreground mt-2">
              Active opportunities
            </p>
          </div>
        </ReportCard>

        <ReportCard
          title="Win Rate"
          trend={{
            value: "+4.5%",
            positive: true,
          }}
        >
          <div className="mt-4">
            <p className="text-3xl font-bold">32%</p>
            <p className="text-sm text-muted-foreground mt-2">
              Last 30 days average
            </p>
          </div>
        </ReportCard>

        {/* Revenue Trend */}
        <ReportCard title="Revenue Trend" className="col-span-2">
          <div className="h-[300px] flex items-end gap-4">
            {Array.from({ length: 12 }, (_, i) => ({
              month: new Date(2025, i, 1).toLocaleDateString("en-US", { month: "short" }),
              value: Math.floor(Math.random() * 400000) + 100000,
            })).map((item) => (
              <div key={item.month} className="flex-1">
                <div
                  className="bg-gradient-to-t from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 transition-colors rounded-t"
                  style={{ height: `${(item.value / 500000) * 100}%` }}
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

        {/* Quick Stats */}
        <ReportCard title="Quick Stats">
          <div className="space-y-4">
            {[
              { label: "Avg. Deal Size", value: "$35,000" },
              { label: "Sales Cycle", value: "24 days" },
              { label: "Active Leads", value: "145" },
              { label: "Lead Response", value: "2.5 hrs" },
            ].map((stat) => (
              <div key={stat.label} className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="font-medium">{stat.value}</p>
              </div>
            ))}
          </div>
        </ReportCard>
      </div>
    </div>
  );
}
