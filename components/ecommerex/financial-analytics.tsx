"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LucideBarChart, Calendar, Download, FileText, LucidePieChart, TrendingDown, TrendingUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { CheckCircle2 } from "lucide-react"

// Sample financial data
const revenueData = [
  { month: "Jan", amazon: 42500, ebay: 18200, shopify: 15800, walmart: 8500, website: 12000 },
  { month: "Feb", amazon: 45000, ebay: 19500, shopify: 16200, walmart: 9200, website: 12800 },
  { month: "Mar", amazon: 47800, ebay: 21000, shopify: 17500, walmart: 10500, website: 13500 },
  { month: "Apr", amazon: 51200, ebay: 22800, shopify: 18900, walmart: 11200, website: 14200 },
  { month: "May", amazon: 54500, ebay: 24500, shopify: 20100, walmart: 12500, website: 15800 },
]

const profitData = [
  { month: "Jan", profit: 28500, expenses: 15200 },
  { month: "Feb", profit: 30200, expenses: 16100 },
  { month: "Mar", profit: 32500, expenses: 17200 },
  { month: "Apr", profit: 35100, expenses: 18500 },
  { month: "May", profit: 37800, expenses: 19600 },
]

const platformDistribution = [
  { name: "Amazon", value: 42, color: "#FF9900" },
  { name: "eBay", value: 18, color: "#E53238" },
  { name: "Shopify", value: 16, color: "#96BF48" },
  { name: "Walmart", value: 10, color: "#0071CE" },
  { name: "Website", value: 14, color: "#4353FF" },
]

const categoryDistribution = [
  { name: "Electronics", value: 45, color: "#4353FF" },
  { name: "Computer Accessories", value: 25, color: "#43A047" },
  { name: "Audio", value: 15, color: "#FB8C00" },
  { name: "Storage", value: 10, color: "#E53935" },
  { name: "Other", value: 5, color: "#757575" },
]

const taxLiability = [
  { quarter: "Q1", estimated: 18500, actual: 17800 },
  { quarter: "Q2", estimated: 21200, actual: 20500 },
  { quarter: "Q3", estimated: 23500, actual: 0 },
  { quarter: "Q4", estimated: 26800, actual: 0 },
]

export function FinancialAnalytics() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeframe, setTimeframe] = useState("ytd")

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$548,250</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">↑ 12.5%</span> vs. previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$164,100</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">↑ 8.3%</span> vs. previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29.9%</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-rose-500" />
              <span className="text-rose-500 font-medium">↓ 1.2%</span> vs. previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tax Liability (Est.)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$86,420</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-rose-500" />
              <span className="text-rose-500 font-medium">↑ 5.2%</span> vs. previous period
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <LucideBarChart className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="platforms">
            <LucidePieChart className="mr-2 h-4 w-4" />
            Platform Analysis
          </TabsTrigger>
          <TabsTrigger value="tax">
            <FileText className="mr-2 h-4 w-4" />
            Tax Estimates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Platform</CardTitle>
              <CardDescription>Monthly revenue breakdown across all sales channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Legend />
                    <Bar dataKey="amazon" name="Amazon" fill="#FF9900" />
                    <Bar dataKey="ebay" name="eBay" fill="#E53238" />
                    <Bar dataKey="shopify" name="Shopify" fill="#96BF48" />
                    <Bar dataKey="walmart" name="Walmart" fill="#0071CE" />
                    <Bar dataKey="website" name="Website" fill="#4353FF" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit vs. Expenses</CardTitle>
              <CardDescription>Monthly profit and expense trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="profit" name="Profit" stroke="#4353FF" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#E53935" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution by Platform</CardTitle>
                <CardDescription>Percentage of total revenue by sales channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={platformDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution by Category</CardTitle>
                <CardDescription>Percentage of total revenue by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators by sales channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-2 p-4 font-medium text-sm">
                  <div className="col-span-2">Platform</div>
                  <div className="col-span-1 text-center">Revenue</div>
                  <div className="col-span-1 text-center">Orders</div>
                  <div className="col-span-1 text-center">Avg. Order</div>
                  <div className="col-span-1 text-center">Profit Margin</div>
                  <div className="col-span-1 text-center">YoY Growth</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "Amazon",
                      revenue: "$245,800",
                      orders: 1842,
                      avgOrder: "$133.44",
                      margin: "28.5%",
                      growth: "+15.2%",
                      trending: "up",
                    },
                    {
                      name: "eBay",
                      revenue: "$105,200",
                      orders: 925,
                      avgOrder: "$113.73",
                      margin: "31.2%",
                      growth: "+8.7%",
                      trending: "up",
                    },
                    {
                      name: "Shopify",
                      revenue: "$89,500",
                      orders: 712,
                      avgOrder: "$125.70",
                      margin: "32.8%",
                      growth: "+12.4%",
                      trending: "up",
                    },
                    {
                      name: "Walmart",
                      revenue: "$52,750",
                      orders: 485,
                      avgOrder: "$108.76",
                      margin: "25.6%",
                      growth: "-3.2%",
                      trending: "down",
                    },
                    {
                      name: "Website",
                      revenue: "$68,500",
                      orders: 542,
                      avgOrder: "$126.38",
                      margin: "35.4%",
                      growth: "+18.5%",
                      trending: "up",
                    },
                  ].map((platform, index) => (
                    <div key={index} className="grid grid-cols-7 gap-2 p-4 items-center">
                      <div className="col-span-2 font-medium">{platform.name}</div>
                      <div className="col-span-1 text-center">{platform.revenue}</div>
                      <div className="col-span-1 text-center">{platform.orders}</div>
                      <div className="col-span-1 text-center">{platform.avgOrder}</div>
                      <div className="col-span-1 text-center">{platform.margin}</div>
                      <div className="col-span-1 text-center">
                        <Badge
                          variant="outline"
                          className={
                            platform.trending === "up"
                              ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100"
                              : "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-100"
                          }
                        >
                          {platform.trending === "up" ? (
                            <TrendingUp className="mr-1 h-3 w-3" />
                          ) : (
                            <TrendingDown className="mr-1 h-3 w-3" />
                          )}
                          {platform.growth}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Tax Estimates</CardTitle>
              <CardDescription>Estimated vs. actual tax liability by quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={taxLiability} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Legend />
                    <Bar dataKey="estimated" name="Estimated" fill="#4353FF" />
                    <Bar dataKey="actual" name="Actual" fill="#43A047" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tax Deductions</CardTitle>
                <CardDescription>Potential business expense deductions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Inventory Costs", amount: "$245,800", eligible: "100%" },
                    { category: "Shipping & Fulfillment", amount: "$78,500", eligible: "100%" },
                    { category: "Platform Fees", amount: "$52,300", eligible: "100%" },
                    { category: "Marketing & Advertising", amount: "$35,200", eligible: "100%" },
                    { category: "Office Supplies", amount: "$8,750", eligible: "100%" },
                    { category: "Software Subscriptions", amount: "$12,400", eligible: "100%" },
                  ].map((deduction, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{deduction.category}</div>
                        <div className="text-sm text-muted-foreground">{deduction.eligible} eligible</div>
                      </div>
                      <div className="font-medium">{deduction.amount}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between border-t pt-4">
                  <div className="font-medium">Total Potential Deductions</div>
                  <div className="font-bold">$432,950</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Calendar</CardTitle>
                <CardDescription>Important tax dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      date: "April 15, 2023",
                      description: "Q1 Estimated Tax Payment Due",
                      status: "completed",
                    },
                    {
                      date: "June 15, 2023",
                      description: "Q2 Estimated Tax Payment Due",
                      status: "completed",
                    },
                    {
                      date: "September 15, 2023",
                      description: "Q3 Estimated Tax Payment Due",
                      status: "upcoming",
                    },
                    {
                      date: "January 15, 2024",
                      description: "Q4 Estimated Tax Payment Due",
                      status: "future",
                    },
                    {
                      date: "April 15, 2024",
                      description: "Annual Tax Return Due",
                      status: "future",
                    },
                  ].map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 rounded-full p-1 ${
                          event.status === "completed"
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : event.status === "upcoming"
                              ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {event.status === "completed" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Calendar className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{event.date}</div>
                        <div className="text-sm text-muted-foreground">{event.description}</div>
                      </div>
                      {event.status === "upcoming" && (
                        <Button size="sm" className="ml-auto">
                          Prepare
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
