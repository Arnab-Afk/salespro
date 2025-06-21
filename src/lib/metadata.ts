export const metadata = {
  default: {
    title: "SalesPro - Modern Lead Management Platform",
    description: "A powerful, modern lead management and sales pipeline platform",
  },
  pages: {
    login: {
      title: "Login | SalesPro",
      description: "Login to your SalesPro account",
    },
    dashboard: {
      title: "Dashboard | SalesPro",
      description: "Your sales performance at a glance",
    },
    reports: {
      title: "Analytics & Reports | SalesPro",
      description: "In-depth analysis and insights about your sales performance",
    },
    pipeline: {
      title: "Lead Pipeline | SalesPro",
      description: "Manage and track your sales opportunities",
    },
    team: {
      title: "Team Management | SalesPro",
      description: "Manage your team members and their performance",
    },
    settings: {
      title: "Settings | SalesPro",
      description: "Configure your workspace settings",
    },
    onboarding: {
      title: "Welcome to SalesPro",
      description: "Set up your workspace and get started",
    },
    setup: {
      pipeline: {
        title: "Pipeline Setup | SalesPro",
        description: "Configure your sales pipeline stages",
      },
      fields: {
        title: "Custom Fields | SalesPro",
        description: "Configure lead and deal fields",
      },
      team: {
        title: "Team Setup | SalesPro",
        description: "Add team members and set permissions",
      },
    },
    leads: {
      new: {
        title: "New Lead | SalesPro",
        description: "Add a new lead to your pipeline",
      },
      edit: {
        title: "Edit Lead | SalesPro",
        description: "Update lead information",
      },
      view: {
        title: "Lead Details | SalesPro",
        description: "View detailed lead information",
      },
    },
    profile: {
      title: "My Profile | SalesPro",
      description: "Manage your personal settings",
    },
  },
} as const;

export type MetadataKey = keyof typeof metadata.pages;
