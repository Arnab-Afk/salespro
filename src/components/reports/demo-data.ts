export const demoData = {
  revenueOverTime: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2025, i, 1).toLocaleDateString("en-US", { month: "short" }),
    value: Math.floor(Math.random() * 400000) + 100000,
  })),

  leadsBySource: [
    { source: "Website", value: 324, trend: "+12%" },
    { source: "LinkedIn", value: 256, trend: "+8%" },
    { source: "Referral", value: 198, trend: "+15%" },
    { source: "Email", value: 167, trend: "-3%" },
    { source: "Events", value: 145, trend: "+5%" },
  ],

  teamMembers: [
    { name: "Sarah Connor", deals: 45, revenue: 425000, conversion: 35 },
    { name: "John Smith", deals: 38, revenue: 385000, conversion: 42 },
    { name: "Emma Davis", deals: 42, revenue: 395000, conversion: 38 },
    { name: "Michael Brown", deals: 36, revenue: 315000, conversion: 33 },
  ],

  pipelineStages: [
    { stage: "Lead", count: 245, value: 2450000 },
    { stage: "Qualified", count: 180, value: 1800000 },
    { stage: "Proposal", count: 95, value: 950000 },
    { stage: "Negotiation", count: 45, value: 450000 },
    { stage: "Closed Won", count: 28, value: 280000 },
  ],

  recentActivity: [
    {
      id: 1,
      action: "Deal Won",
      description: "Closed Enterprise deal with Acme Corp",
      value: 75000,
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "New Lead",
      description: "Website inquiry from TechStart Inc",
      value: 25000,
      time: "4 hours ago",
    },
    {
      id: 3,
      action: "Meeting Scheduled",
      description: "Product demo with Global Systems",
      value: 150000,
      time: "6 hours ago",
    },
  ],

  kpis: {
    totalLeads: {
      value: 1247,
      trend: "+12.5%",
      subtext: "vs last month",
    },
    conversionRate: {
      value: "32%",
      trend: "+5.2%",
      subtext: "vs last month",
    },
    averageDealSize: {
      value: 85000,
      trend: "+8.1%",
      subtext: "vs last month",
    },
    totalRevenue: {
      value: 4250000,
      trend: "+15.3%",
      subtext: "vs last month",
    },
  },

  dealsBySize: {
    small: { count: 145, value: 725000 },
    medium: { count: 86, value: 2150000 },
    large: { count: 34, value: 3400000 },
    enterprise: { count: 12, value: 6000000 },
  },

  monthlyTargets: {
    leads: { current: 245, target: 300, progress: 82 },
    meetings: { current: 48, target: 50, progress: 96 },
    proposals: { current: 28, target: 40, progress: 70 },
    revenue: { current: 425000, target: 500000, progress: 85 },
  },
};
