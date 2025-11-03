export const setupSteps = [
  {
    id: "pipeline",
    title: "Sales Pipeline Setup",
    description: "Define your sales process stages",
  },
  {
    id: "fields",
    title: "Lead Fields Setup",
    description: "Customize lead information fields",
  },
  {
    id: "team",
    title: "Team Setup",
    description: "Configure team members and roles",
  },
] as const;

export type SetupStep = typeof setupSteps[number]["id"];