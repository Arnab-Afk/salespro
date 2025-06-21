"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ReportCard } from "@/components/reports/report-card";
import { ReportsNav } from "@/components/reports/reports-nav";
import { demoData } from "@/components/reports/demo-data";
import { useRouter } from "next/navigation";

export default function TeamReportsPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Team Performance" 
        description="Individual and team performance analytics"
      />
      <ReportsNav />

      <div className="grid grid-cols-2 gap-6">
        <ReportCard title="Individual Performance" className="col-span-2">
          <div className="space-y-6">
            {demoData.teamMembers.map((member) => (
              <div 
                key={member.name} 
                className="space-y-2 p-4 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                onClick={() => router.push(`/dashboard/reports/team/${member.id}`)}
              >
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.deals} deals · {member.conversion}% conversion
                    </p>
                  </div>
                  <p className="font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      notation: "compact",
                    }).format(member.revenue)}
                  </p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary/80 to-primary"
                    style={{ width: `${(member.revenue / 425000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ReportCard>

        <ReportCard title="Activity Metrics">
          <div className="space-y-4">
            {[
              { metric: "Calls Made", value: 245, target: 300 },
              { metric: "Meetings Held", value: 48, target: 50 },
              { metric: "Proposals Sent", value: 28, target: 40 },
            ].map((item) => (
              <div key={item.metric} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.metric}</span>
                  <span className="text-muted-foreground">
                    {item.value} / {item.target}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary/80 to-primary"
                    style={{ width: `${(item.value / item.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ReportCard>

        <ReportCard title="Revenue Distribution">
          <div className="h-[250px] flex items-end gap-4">
            {demoData.teamMembers.map((member) => {
              const percentage = (member.revenue / 425000) * 100;
              return (
                <div key={member.name} className="flex-1 text-center">
                  <div
                    className="bg-gradient-to-t from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 transition-colors rounded-t"
                    style={{ height: `${percentage}%` }}
                  />
                  <p className="text-sm font-medium mt-2">{member.name.split(" ")[0]}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(percentage)}%
                  </p>
                </div>
              );
            })}
          </div>
        </ReportCard>
      </div>
    </div>
  );
}
