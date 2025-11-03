"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ReportCard } from "@/components/reports/report-card";
import { ReportsNav } from "@/components/reports/reports-nav";
import { demoData } from "@/components/reports/demo-data";

export default function PipelineReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Pipeline Analytics" 
        description="Detailed pipeline stage analysis and conversion rates" 
      />
      <ReportsNav />

      <div className="grid grid-cols-2 gap-6">
        <ReportCard title="Conversion by Stage" className="col-span-2">
          <div className="space-y-6">
            {demoData.pipelineStages.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{stage.stage}</span>
                  <span className="text-muted-foreground">
                    {stage.count} leads ({Math.round((stage.count / 245) * 100)}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary/80 to-primary"
                    style={{ width: `${(stage.count / 245) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ReportCard>

        <ReportCard title="Lead Value Distribution">
          <div className="h-[300px] flex items-end gap-4">
            {[
              { range: "$0-10k", count: 45, value: 225000 },
              { range: "$10k-50k", count: 28, value: 840000 },
              { range: "$50k-100k", count: 12, value: 840000 },
              { range: "$100k+", count: 5, value: 750000 },
            ].map((item) => (
              <div key={item.range} className="flex-1">
                <div
                  className="bg-gradient-to-t from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 transition-colors rounded-t"
                  style={{ height: `${(item.count / 45) * 100}%` }}
                />
                <p className="text-sm font-medium mt-2">{item.range}</p>
                <p className="text-sm text-muted-foreground">{item.count}</p>
              </div>
            ))}
          </div>
        </ReportCard>

        <ReportCard title="Stage Velocity">
          <div className="space-y-4">
            {[
              { stage: "Lead → Qualified", days: 3 },
              { stage: "Qualified → Proposal", days: 7 },
              { stage: "Proposal → Won", days: 14 },
            ].map((item) => (
              <div key={item.stage}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{item.stage}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.days} days avg.
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary/80 to-primary"
                    style={{ width: `${(item.days / 14) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ReportCard>
      </div>
    </div>
  );
}
