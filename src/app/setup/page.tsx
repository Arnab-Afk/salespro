"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GitBranch, ListChecks, Users } from "lucide-react";

const setupSteps = [
  {
    id: "pipeline",
    title: "Sales Pipeline Setup",
    description: "Define your sales process stages, from lead to close.",
    icon: GitBranch,
  },
  {
    id: "fields",
    title: "Lead Fields Setup",
    description: "Customize the information you collect about leads.",
    icon: ListChecks,
  },
  {
    id: "team",
    title: "Team Setup",
    description: "Add team members and assign their roles.",
    icon: Users,
  },
];

export default function SetupOverview() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to SalesPro Setup</h1>
        <p className="text-xl text-muted-foreground">
          Let&apos;s configure your sales tracking system in three easy steps.
        </p>
      </div>

      <div className="grid gap-6">
        {setupSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card
              key={step.id}
              className="p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">
                    {index + 1}. {step.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <Button
                  onClick={() => router.push(`/setup/${step.id}`)}
                  className="ml-4"
                >
                  Configure
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground mb-6">
          Complete each step to set up your customized lead tracking system. 
          You can always modify these settings later from your dashboard.
        </p>
        <Button
          variant="default"
          size="lg"
          onClick={() => router.push("/setup/pipeline")}
        >
          Start Setup
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
