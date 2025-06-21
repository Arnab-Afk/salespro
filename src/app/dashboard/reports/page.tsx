"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LineChart, 
  BarChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Button } from "@/components/ui/button";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { PDFReport } from "@/components/reports/pdf-report";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { demoData } from "@/components/reports/demo-data";

const leadSourceData = [
  { name: "Referral", value: 400 },
  { name: "Direct", value: 300 },
  { name: "Social", value: 300 },
  { name: "Email", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const activityHeatmap: Array<{
  day: string;
  [key: string]: string | number;
}> = [
  { day: "Mon", "9AM": 4, "12PM": 2, "3PM": 5, "6PM": 3 },
  { day: "Tue", "9AM": 5, "12PM": 3, "3PM": 2, "6PM": 4 },
  { day: "Wed", "9AM": 2, "12PM": 4, "3PM": 4, "6PM": 2 },
  { day: "Thu", "9AM": 3, "12PM": 5, "3PM": 3, "6PM": 5 },
  { day: "Fri", "9AM": 4, "12PM": 3, "3PM": 4, "6PM": 3 }
];

const data = [
  { name: "Jan", revenue: 2400 },
  { name: "Feb", revenue: 1398 },
  { name: "Mar", revenue: 9800 },
  { name: "Apr", revenue: 3908 },
  { name: "May", revenue: 4800 },
  { name: "Jun", revenue: 3800 },
];

export default function ReportsPage() {
  // Create mutable arrays from readonly data
  const pipelineData = [...demoData.pipelineStages];
  
  const exportData = () => {
    const dataStr = JSON.stringify(demoData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analytics-report.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <PDFDownloadLink document={<PDFReport />} fileName="analytics-report.pdf">
            {({ loading }) => (
              <Button variant="default">
                {loading ? "Generating PDF..." : "Download PDF Report"}
              </Button>
            )}
          </PDFDownloadLink>
          <Button onClick={exportData} variant="outline">
            Export JSON
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Activity Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <table className="w-full h-full">
                    <thead>
                      <tr>
                        <th></th>
                        {Object.keys(activityHeatmap[0]).slice(1).map((time) => (
                          <th key={time} className="text-sm font-medium p-2">{time}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activityHeatmap.map((row) => (
                        <tr key={row.day}>
                          <td className="text-sm font-medium p-2">{row.day}</td>
                          {Object.entries(row).slice(1).map(([time, value]) => (
                            <td 
                              key={time} 
                              className="p-2"
                              style={{
                                backgroundColor: `rgba(136, 132, 216, ${Number(value) / 5})`,
                                color: Number(value) > 3 ? 'white' : 'inherit'
                              }}
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Pipeline Stage Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={pipelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Monthly Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Revenue Progress</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-full w-[62.5%] rounded-full bg-primary"
                        style={{
                          width: `${demoData.monthlyTargets.revenue.progress}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      ${demoData.monthlyTargets.revenue.current.toLocaleString()} / ${demoData.monthlyTargets.revenue.target.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Deals Progress</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-full w-[56%] rounded-full bg-primary"
                        style={{
                          width: `${demoData.monthlyTargets.deals.progress}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {demoData.monthlyTargets.deals.current} / {demoData.monthlyTargets.deals.target} Deals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {demoData.teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${member.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {member.deals} deals • {member.conversion}% conversion
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoData.teamMembers.map((member) => (
                    <div key={member.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{member.name}</span>
                        <span className="text-sm text-muted-foreground">{member.conversion}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: `${member.conversion}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Avg. Deal Size</p>
                      <p className="text-2xl font-bold">$45,233</p>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Win Rate</p>
                      <p className="text-2xl font-bold">67%</p>
                      <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Sales Cycle</p>
                      <p className="text-2xl font-bold">24 days</p>
                      <p className="text-xs text-muted-foreground">-2 days from avg</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Pipeline Value</p>
                      <p className="text-2xl font-bold">$2.4M</p>
                      <p className="text-xs text-muted-foreground">+18% from last month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Conversion Rate Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Total Revenue</p>
                    <div className="text-2xl font-bold">
                      ${demoData.kpis.totalRevenue.value.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">{demoData.kpis.totalRevenue.trend} from last quarter</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Leads</p>
                    <div className="text-2xl font-bold">{demoData.kpis.totalLeads.value}</div>
                    <p className="text-xs text-muted-foreground">{demoData.kpis.totalLeads.trend} from last month</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Conversion Rate</p>
                    <div className="text-2xl font-bold">{demoData.kpis.conversionRate.value}</div>
                    <p className="text-xs text-muted-foreground">{demoData.kpis.conversionRate.trend} improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[350px]">
                  <div className="space-y-4">
                    {demoData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                        <div className="ml-auto font-medium">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(activity.value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
