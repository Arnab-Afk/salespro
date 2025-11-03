interface PageSection {
  title: string;
  description: string;
}

interface PageInfo {
  title: string;
  description: string;
  sections?: {
    [key: string]: PageSection;
  };
}

export type PageDescriptions = {
  [key: string]: PageInfo;
};

export const pageDescriptions: PageDescriptions = {
  dashboard: {
    title: "Dashboard",
    description: "Get an overview of your sales performance and key metrics",
  },
  pipeline: {
    title: "Lead Pipeline",
    description: "Manage and track your sales opportunities in a visual pipeline",
    sections: {
      view: {
        title: "Lead Details",
        description: "View and manage lead information and activities",
      },
      edit: {
        title: "Edit Lead",
        description: "Update lead information and status",
      },
      create: {
        title: "New Lead",
        description: "Add a new lead to your pipeline",
      },
    },
  },
  reports: {
    title: "Analytics & Reports",
    description: "In-depth analysis and insights about your sales performance",
    sections: {
      overview: {
        title: "Performance Overview",
        description: "Key metrics and trends at a glance",
      },
      pipeline: {
        title: "Pipeline Analytics",
        description: "Detailed pipeline stage analysis and conversion rates",
      },
      team: {
        title: "Team Performance",
        description: "Individual and team performance metrics",
      },
    },
  },
  team: {
    title: "Team Management",
    description: "Manage your sales team and track individual performance",
  },
  settings: {
    title: "Settings",
    description: "Configure your workspace and manage preferences",
    sections: {
      company: {
        title: "Company Settings",
        description: "Manage your company profile and branding",
      },
      notifications: {
        title: "Notification Preferences",
        description: "Configure how and when you receive updates",
      },
      pipeline: {
        title: "Pipeline Configuration",
        description: "Customize your sales pipeline stages and fields",
      },
    },
  },
  setup: {
    title: "Workspace Setup",
    description: "Configure your workspace to get started",
    sections: {
      pipeline: {
        title: "Pipeline Setup",
        description: "Define your sales pipeline stages and workflow",
      },
      fields: {
        title: "Custom Fields",
        description: "Configure custom fields for leads and deals",
      },
      team: {
        title: "Team Setup",
        description: "Invite team members and set permissions",
      },
    },
  },
  onboarding: {
    title: "Welcome to SalesPro",
    description: "Let's get your workspace set up for success",
  },
  profile: {
    title: "My Profile",
    description: "Manage your personal settings and preferences",
  },
  integrations: {
    title: "Integrations",
    description: "Connect your favorite tools and services",
    sections: {
      email: {
        title: "Email Integration",
        description: "Connect your email client for seamless communication",
      },
      calendar: {
        title: "Calendar Sync",
        description: "Sync your calendar for meeting management",
      },
      crm: {
        title: "CRM Integration",
        description: "Connect with popular CRM platforms",
      },
    },
  },
  activities: {
    title: "Activities",
    description: "Track all sales activities and interactions",
    sections: {
      tasks: {
        title: "Tasks",
        description: "Manage your to-do list and follow-ups",
      },
      meetings: {
        title: "Meetings",
        description: "Schedule and manage sales meetings",
      },
      emails: {
        title: "Email Tracking",
        description: "Track email communications with leads",
      },
    },
  },
  analytics: {
    title: "Advanced Analytics",
    description: "Deep dive into your sales data and trends",
    sections: {
      forecasting: {
        title: "Sales Forecasting",
        description: "Predictive analysis of future sales performance",
      },
      trends: {
        title: "Trend Analysis",
        description: "Long-term performance trends and patterns",
      },
      comparisons: {
        title: "Comparative Analysis",
        description: "Compare performance across periods and teams",
      },
    },
  },
};
