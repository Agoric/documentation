"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  HelpCircle,
  Printer,
  RefreshCw,
  Save,
  Upload,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TaxPreparation() {
  const [activeTab, setActiveTab] = useState("preparation")
  const [taxYear, setTaxYear] = useState("2023")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReports = () => {
    setIsGenerating(true)
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false)
    }, 2500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Select value={taxYear} onValueChange={setTaxYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tax Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023 (Current)</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleGenerateReports} disabled={isGenerating}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Generating..." : "Generate Reports"}
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save & File
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
            <p className="text-xs text-muted-foreground">Tax Year 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$384,150</div>
            <p className="text-xs text-muted-foreground">Tax Year 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$164,100</div>
            <p className="text-xs text-muted-foreground">Tax Year 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Estimated Tax</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$41,025</div>
            <p className="text-xs text-muted-foreground">25% effective rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="preparation">
            <FileText className="mr-2 h-4 w-4" />
            Tax Preparation
          </TabsTrigger>
          <TabsTrigger value="reports">
            <Download className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="deductions">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Deductions
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="mr-2 h-4 w-4" />
            Filing History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preparation" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tax Preparation Status</CardTitle>
                  <CardDescription>Current progress for tax year 2023</CardDescription>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-100">
                  In Progress
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div className="font-medium">Overall Completion</div>
                    <div>65%</div>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm">
                    <div className="col-span-6">Task</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-2 text-center">Due Date</div>
                    <div className="col-span-2 text-center">Action</div>
                  </div>
                  <div className="divide-y">
                    {[
                      {
                        task: "Verify Revenue Data",
                        status: "completed",
                        dueDate: "Aug 15, 2023",
                        action: "View",
                      },
                      {
                        task: "Categorize Expenses",
                        status: "completed",
                        dueDate: "Aug 30, 2023",
                        action: "View",
                      },
                      {
                        task: "Reconcile Inventory",
                        status: "in-progress",
                        dueDate: "Sep 15, 2023",
                        action: "Continue",
                      },
                      {
                        task: "Verify Platform Fees",
                        status: "in-progress",
                        dueDate: "Sep 30, 2023",
                        action: "Continue",
                      },
                      {
                        task: "Calculate Q3 Estimated Taxes",
                        status: "pending",
                        dueDate: "Oct 15, 2023",
                        action: "Start",
                      },
                      {
                        task: "Prepare Annual Tax Forms",
                        status: "pending",
                        dueDate: "Jan 31, 2024",
                        action: "Start",
                      },
                    ].map((task, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center">
                        <div className="col-span-6 font-medium">{task.task}</div>
                        <div className="col-span-2 flex justify-center">
                          {task.status === "completed" ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed
                            </Badge>
                          ) : task.status === "in-progress" ? (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                              In Progress
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </div>
                        <div className="col-span-2 text-center">{task.dueDate}</div>
                        <div className="col-span-2 flex justify-center">
                          <Button variant="outline" size="sm">
                            {task.action}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Missing Information</CardTitle>
              <CardDescription>Required data for tax preparation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Q3 Inventory Reconciliation",
                    description: "Complete inventory count and valuation for Q3",
                    severity: "high",
                  },
                  {
                    title: "Shipping Expense Documentation",
                    description: "Upload receipts for international shipping expenses",
                    severity: "medium",
                  },
                  {
                    title: "Software Subscription Receipts",
                    description: "Provide documentation for business software expenses",
                    severity: "low",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                    <div
                      className={`mt-0.5 rounded-full p-1 ${
                        item.severity === "high"
                          ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                          : item.severity === "medium"
                            ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button size="sm">
                      <Upload className="mr-2 h-3 w-3" />
                      Upload
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Tax Reports</CardTitle>
              <CardDescription>Generated reports for tax year 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm">
                  <div className="col-span-4">Report</div>
                  <div className="col-span-2 text-center">Format</div>
                  <div className="col-span-2 text-center">Generated</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "Annual Income Statement",
                      format: "PDF, Excel",
                      date: "Aug 15, 2023",
                      status: "current",
                    },
                    {
                      name: "Quarterly Sales Summary (Q1-Q2)",
                      format: "PDF, Excel",
                      date: "Jul 10, 2023",
                      status: "current",
                    },
                    {
                      name: "Expense Categorization",
                      format: "PDF, Excel",
                      date: "Aug 05, 2023",
                      status: "current",
                    },
                    {
                      name: "Platform Fee Summary",
                      format: "PDF",
                      date: "Jul 28, 2023",
                      status: "current",
                    },
                    {
                      name: "Inventory Valuation",
                      format: "PDF, Excel",
                      date: "Jun 30, 2023",
                      status: "outdated",
                    },
                    {
                      name: "Estimated Tax Worksheet",
                      format: "PDF",
                      date: "Jul 15, 2023",
                      status: "current",
                    },
                  ].map((report, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center">
                      <div className="col-span-4 font-medium">{report.name}</div>
                      <div className="col-span-2 text-center">{report.format}</div>
                      <div className="col-span-2 text-center">{report.date}</div>
                      <div className="col-span-2 flex justify-center">
                        {report.status === "current" ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            Current
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">
                            Outdated
                          </Badge>
                        )}
                      </div>
                      <div className="col-span-2 flex justify-center gap-2">
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Report Generator</CardTitle>
              <CardDescription>Create custom reports for specific tax needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <Select defaultValue="income">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income Statement</SelectItem>
                      <SelectItem value="expense">Expense Report</SelectItem>
                      <SelectItem value="inventory">Inventory Valuation</SelectItem>
                      <SelectItem value="sales">Sales by Platform</SelectItem>
                      <SelectItem value="tax">Tax Estimation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Time Period</label>
                  <Select defaultValue="ytd">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1">Q1 2023</SelectItem>
                      <SelectItem value="q2">Q2 2023</SelectItem>
                      <SelectItem value="q3">Q3 2023</SelectItem>
                      <SelectItem value="q4">Q4 2023</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="all">All Formats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button>Generate Custom Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Business Expense Deductions</CardTitle>
                  <CardDescription>Eligible deductions for tax year 2023</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  $384,150 Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm">
                  <div className="col-span-4">Category</div>
                  <div className="col-span-2 text-center">Amount</div>
                  <div className="col-span-2 text-center">% of Total</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-2 text-center">Details</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      category: "Inventory Costs",
                      amount: "$245,800",
                      percent: "64%",
                      status: "verified",
                    },
                    {
                      category: "Shipping & Fulfillment",
                      amount: "$78,500",
                      percent: "20.4%",
                      status: "verified",
                    },
                    {
                      category: "Platform Fees",
                      amount: "$32,300",
                      percent: "8.4%",
                      status: "verified",
                    },
                    {
                      category: "Marketing & Advertising",
                      amount: "$15,200",
                      percent: "4%",
                      status: "pending",
                    },
                    {
                      category: "Software Subscriptions",
                      amount: "$8,400",
                      percent: "2.2%",
                      status: "pending",
                    },
                    {
                      category: "Office Supplies",
                      amount: "$3,950",
                      percent: "1%",
                      status: "pending",
                    },
                  ].map((deduction, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center">
                      <div className="col-span-4 font-medium">{deduction.category}</div>
                      <div className="col-span-2 text-center">{deduction.amount}</div>
                      <div className="col-span-2 text-center">{deduction.percent}</div>
                      <div className="col-span-2 flex justify-center">
                        {deduction.status === "verified" ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Potential Additional Deductions</CardTitle>
                <CardDescription>Suggested deductions you may qualify for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Home Office Deduction",
                      description: "If you use part of your home exclusively for business",
                      potential: "$2,400 - $4,800",
                    },
                    {
                      title: "Vehicle Expenses",
                      description: "Mileage for business-related travel",
                      potential: "$1,200 - $3,500",
                    },
                    {
                      title: "Professional Development",
                      description: "Courses and training related to your business",
                      potential: "$800 - $2,500",
                    },
                    {
                      title: "Retirement Contributions",
                      description: "SEP IRA or Solo 401(k) contributions",
                      potential: "Up to $66,000",
                    },
                  ].map((deduction, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                      <div className="mt-0.5 rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{deduction.title}</h4>
                        <p className="text-sm text-muted-foreground">{deduction.description}</p>
                        <p className="mt-1 text-sm">
                          <strong>Potential Savings:</strong> {deduction.potential}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Explore
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deduction Documentation</CardTitle>
                <CardDescription>Required documentation for claimed deductions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      category: "Inventory Receipts",
                      status: "complete",
                      count: 145,
                    },
                    {
                      category: "Shipping Receipts",
                      status: "incomplete",
                      count: 87,
                      missing: 12,
                    },
                    {
                      category: "Platform Fee Statements",
                      status: "complete",
                      count: 24,
                    },
                    {
                      category: "Marketing Invoices",
                      status: "incomplete",
                      count: 18,
                      missing: 5,
                    },
                    {
                      category: "Software Subscription Receipts",
                      status: "incomplete",
                      count: 8,
                      missing: 3,
                    },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{doc.category}</div>
                        <div className="text-sm text-muted-foreground">
                          {doc.count} documents {doc.status === "incomplete" ? `(${doc.missing} missing)` : ""}
                        </div>
                      </div>
                      {doc.status === "complete" ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Complete
                        </Badge>
                      ) : (
                        <Button size="sm">
                          <Upload className="mr-2 h-3 w-3" />
                          Upload
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Filing History</CardTitle>
              <CardDescription>Previous tax filings and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm">
                  <div className="col-span-2">Tax Year</div>
                  <div className="col-span-2 text-center">Revenue</div>
                  <div className="col-span-2 text-center">Expenses</div>
                  <div className="col-span-2 text-center">Net Profit</div>
                  <div className="col-span-2 text-center">Tax Paid</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      year: "2022",
                      revenue: "$425,800",
                      expenses: "$298,500",
                      profit: "$127,300",
                      tax: "$31,825",
                    },
                    {
                      year: "2021",
                      revenue: "$352,400",
                      expenses: "$245,200",
                      profit: "$107,200",
                      tax: "$26,800",
                    },
                    {
                      year: "2020",
                      revenue: "$285,600",
                      expenses: "$198,400",
                      profit: "$87,200",
                      tax: "$21,800",
                    },
                  ].map((year, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center">
                      <div className="col-span-2 font-medium">{year.year}</div>
                      <div className="col-span-2 text-center">{year.revenue}</div>
                      <div className="col-span-2 text-center">{year.expenses}</div>
                      <div className="col-span-2 text-center">{year.profit}</div>
                      <div className="col-span-2 text-center">{year.tax}</div>
                      <div className="col-span-2 flex justify-center gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-3 w-3" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Comparison</CardTitle>
              <CardDescription>Tax metrics comparison across years</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-medium">Revenue Growth</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">2021 to 2022</div>
                      <div className="text-sm font-medium">+20.8%</div>
                    </div>
                    <Progress value={20.8} className="h-2" />
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">2022 to 2023 (Projected)</div>
                      <div className="text-sm font-medium">+28.8%</div>
                    </div>
                    <Progress value={28.8} className="h-2" />
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Effective Tax Rate</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">2021</div>
                      <div className="text-sm font-medium">25.0%</div>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">2022</div>
                      <div className="text-sm font-medium">25.0%</div>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">2023 (Projected)</div>
                      <div className="text-sm font-medium">25.0%</div>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Expense Ratio</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">2021</div>
                      <div className="text-sm font-medium">69.6%</div>
                    </div>
                    <Progress value={69.6} className="h-2" />
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">2022</div>
                      <div className="text-sm font-medium">70.1%</div>
                    </div>
                    <Progress value={70.1} className="h-2" />
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">2023 (Projected)</div>
                      <div className="text-sm font-medium">70.1%</div>
                    </div>
                    <Progress value={70.1} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
