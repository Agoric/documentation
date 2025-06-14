"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Building2,
  Wallet,
  LineChart,
  Brain,
  Cpu,
  Landmark,
  PiggyBank,
  ArrowUpRight,
  Sparkles,
  MapPin,
  DollarSign,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle2,
} from "lucide-react"
import { PropertyAcquisitionTimeline } from "@/components/snapifi/property-acquisition-timeline"
import { PropertyOpportunityMap } from "@/components/snapifi/property-opportunity-map"
import { ResourceOptimizer } from "@/components/snapifi/resource-optimizer"
import { InvestmentAllocation } from "@/components/snapifi/investment-allocation"
import { PropertyValueProjection } from "@/components/snapifi/property-value-projection"

export function RealEstateStrategyDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Real Estate Acquisition Strategy</h1>
          <p className="text-muted-foreground">
            Optimize your resources to achieve primary residence and income property goals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Target className="h-4 w-4" />
            <span>Set New Goal</span>
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
            <Sparkles className="h-4 w-4" />
            <span>AI Strategy Advisor</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="primary" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Primary Residence</span>
          </TabsTrigger>
          <TabsTrigger value="income" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden md:inline">Income Properties</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden md:inline">Resource Optimization</span>
          </TabsTrigger>
          <TabsTrigger value="ai-advisor" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden md:inline">AI Advisor</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Primary Residence Goal</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <div className="mt-2">
                  <Progress value={68} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">$68,000 of $100,000 down payment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Income Properties</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1 of 5</div>
                <div className="mt-2">
                  <Progress value={20} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">$1,250 monthly passive income</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Acquisition Readiness</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <div className="mt-2">
                  <Progress value={82} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Credit, income, and savings factors</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time to Goal</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 months</div>
                <div className="mt-2">
                  <Progress value={58} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Primary residence acquisition</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Property Acquisition Timeline</CardTitle>
                <CardDescription>Your path to real estate ownership</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] flex items-center justify-center">
                  <PropertyAcquisitionTimeline />
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>Optimized for real estate acquisition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <InvestmentAllocation />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Optimize Allocation</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>Actions to accelerate your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium text-blue-700">1</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Increase down payment savings</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Allocate an additional 5% of income to reach your goal 2 months earlier
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                        Adjust Budget
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium text-blue-700">2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Complete pre-approval application</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Get pre-approved for your 50-year property loan to strengthen offers
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                        Start Application
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium text-blue-700">3</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Schedule property viewings</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        5 properties match your criteria in your target neighborhood
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                        View Properties
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Market Opportunities</CardTitle>
                <CardDescription>Current real estate market insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <PropertyOpportunityMap />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <div className="text-sm font-medium">Target Market</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Austin, TX
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Explore Markets
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quantum-Powered Insights</CardTitle>
                <CardDescription>AI predictions for your strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg bg-violet-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-4 w-4 text-violet-600" />
                      <span className="font-medium">Property Value Projection</span>
                    </div>
                    <p className="text-sm mb-2">
                      Properties in your target area are projected to appreciate 4.2% in the next 6 months.
                    </p>
                    <div className="text-xs text-muted-foreground">Confidence: 87%</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-indigo-600" />
                      <span className="font-medium">Strategy Recommendation</span>
                    </div>
                    <p className="text-sm">
                      Consider the 50-year loan with 5% down instead of waiting for 20% down to enter the market sooner.
                    </p>
                    <Button size="sm" className="w-full mt-2 bg-indigo-600">
                      See Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Primary Residence Tab */}
        <TabsContent value="primary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Primary Residence Strategy</CardTitle>
                <CardDescription>Your path to homeownership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Goal</span>
                      </div>
                      <div className="text-2xl font-bold">$450,000</div>
                      <div className="text-sm text-muted-foreground">3bd/2ba Single Family Home</div>
                      <div className="text-sm text-muted-foreground">Austin, TX</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Wallet className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">Down Payment</span>
                      </div>
                      <div className="text-2xl font-bold">$68,000</div>
                      <div className="text-sm text-muted-foreground">of $100,000 goal (20%)</div>
                      <div className="mt-2">
                        <Progress value={68} className="h-2" />
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="font-medium">Timeline</span>
                      </div>
                      <div className="text-2xl font-bold">7 months</div>
                      <div className="text-sm text-muted-foreground">Est. purchase date: Jan 2026</div>
                      <div className="text-sm text-green-600">2 months ahead of schedule</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                        <Cpu className="h-4 w-4 text-violet-600" />
                      </div>
                      <span className="font-medium">Quantum-Optimized Loan Options</span>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4 md:col-span-1">
                          <div className="text-sm font-medium">Loan Type</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="text-sm font-medium">Down Payment</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="text-sm font-medium">Monthly Payment</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="text-sm font-medium">Time to Purchase</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">50-Year Fixed</div>
                          <div className="text-xs text-muted-foreground">4.5% interest</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">5% ($22,500)</div>
                          <div className="text-xs text-green-600">Already saved!</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">$1,850/month</div>
                          <div className="text-xs text-muted-foreground">Includes PMI</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">Immediate</div>
                          <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">30-Year Fixed</div>
                          <div className="text-xs text-muted-foreground">4.25% interest</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">20% ($90,000)</div>
                          <div className="text-xs text-amber-600">$22,000 more needed</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">$1,770/month</div>
                          <div className="text-xs text-muted-foreground">No PMI</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">7 months</div>
                          <div className="text-xs text-muted-foreground">Jan 2026</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">RWA Token Backed</div>
                          <div className="text-xs text-muted-foreground">5.0% interest</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">10% ($45,000)</div>
                          <div className="text-xs text-blue-600">$23,000 more needed</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">$1,950/month</div>
                          <div className="text-xs text-muted-foreground">Includes token benefits</div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                          <div className="font-medium">3 months</div>
                          <div className="text-xs text-muted-foreground">Sep 2025</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Compare More Options</Button>
                <Button>Apply for Pre-Approval</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Property Value Projection</CardTitle>
                <CardDescription>Quantum-powered market analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PropertyValueProjection />
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Projected 5-year appreciation</span>
                    <span className="font-medium">22.5%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Projected value in 5 years</span>
                    <span className="font-medium">$551,250</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Projected equity in 5 years</span>
                    <span className="font-medium">$146,250</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Savings Acceleration</CardTitle>
                <CardDescription>Strategies to reach your down payment faster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PiggyBank className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Current Savings Rate</span>
                      </div>
                      <span className="font-medium">$3,500/month</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Time to 20% down payment</span>
                        <span>7 months</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <div className="text-xs text-muted-foreground">$68,000 of $90,000 saved</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Accelerated Strategy</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Recommended</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Increased savings rate</span>
                        <span className="font-medium">$4,500/month</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Time to 20% down payment</span>
                        <span className="font-medium">5 months</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Time saved</span>
                        <span className="font-medium text-green-600">2 months</span>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="text-sm">
                      <div className="font-medium mb-1">How to achieve this:</div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                        <li>Temporarily reduce retirement contributions by 5%</li>
                        <li>Allocate year-end bonus directly to down payment fund</li>
                        <li>Optimize current expenses (identified $350/month in savings)</li>
                      </ul>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Apply This Strategy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Property Matches</CardTitle>
                <CardDescription>Homes that match your criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">3bd/2ba Single Family Home</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">98% Match</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <div className="text-muted-foreground text-xs">Price</div>
                        <div className="font-medium">$435,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Location</div>
                        <div className="font-medium">North Austin, TX</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Size</div>
                        <div className="font-medium">1,850 sq ft</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Year Built</div>
                        <div className="font-medium">2018</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-green-600">Under market value by 3%</div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">4bd/2ba Single Family Home</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">95% Match</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <div className="text-muted-foreground text-xs">Price</div>
                        <div className="font-medium">$465,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Location</div>
                        <div className="font-medium">South Austin, TX</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Size</div>
                        <div className="font-medium">2,100 sq ft</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Year Built</div>
                        <div className="font-medium">2015</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-amber-600">High appreciation potential</div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">3bd/2.5ba Townhouse</span>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">85% Match</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <div className="text-muted-foreground text-xs">Price</div>
                        <div className="font-medium">$410,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Location</div>
                        <div className="font-medium">East Austin, TX</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Size</div>
                        <div className="font-medium">1,650 sq ft</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Year Built</div>
                        <div className="font-medium">2020</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-blue-600">Lower maintenance costs</div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View All Matches</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Income Properties Tab */}
        <TabsContent value="income" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Income Property Strategy</CardTitle>
                <CardDescription>Building your real estate portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Portfolio Goal</span>
                      </div>
                      <div className="text-2xl font-bold">5 Properties</div>
                      <div className="text-sm text-muted-foreground">$7,500/mo passive income</div>
                      <div className="mt-2">
                        <Progress value={20} className="h-2" />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">1 of 5 properties acquired</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">Current Income</span>
                      </div>
                      <div className="text-2xl font-bold">$1,250/mo</div>
                      <div className="text-sm text-muted-foreground">From 1 property</div>
                      <div className="text-sm text-green-600">$15,000/year</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="font-medium">Next Acquisition</span>
                      </div>
                      <div className="text-2xl font-bold">9 months</div>
                      <div className="text-sm text-muted-foreground">Est. date: Mar 2026</div>
                      <div className="text-sm text-blue-600">After primary residence</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                        <Cpu className="h-4 w-4 text-violet-600" />
                      </div>
                      <span className="font-medium">Quantum-Optimized Acquisition Strategy</span>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-5 md:col-span-1">
                          <div className="text-sm font-medium">Property</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="text-sm font-medium">Acquisition Date</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="text-sm font-medium">Purchase Price</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="text-sm font-medium">Monthly Income</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="text-sm font-medium">ROI</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Property #1</div>
                          <div className="text-xs text-green-600">Acquired</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Jan 2025</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$250,000</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$1,250</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">6.0%</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Property #2</div>
                          <div className="text-xs text-blue-600">Next Target</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Mar 2026</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$275,000</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$1,450</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">6.3%</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Property #3</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Nov 2026</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$300,000</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$1,600</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">6.4%</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Property #4</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Jul 2027</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$325,000</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$1,700</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">6.3%</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Property #5</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">Mar 2028</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$350,000</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">$1,850</div>
                        </div>
                        <div className="col-span-5 md:col-span-1">
                          <div className="font-medium">6.3%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Adjust Strategy</Button>
                <Button>View Property Opportunities</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Current and projected income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PropertyValueProjection isPortfolio />
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Current monthly income</span>
                    <span className="font-medium">$1,250</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Projected monthly income (3 years)</span>
                    <span className="font-medium">$4,300</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Projected monthly income (5 years)</span>
                    <span className="font-medium">$7,850</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Total portfolio value (5 years)</span>
                    <span className="font-medium">$1.75M</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Property Performance</CardTitle>
                <CardDescription>Details of your existing income property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">2bd/2ba Condo - Austin, TX</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-muted-foreground text-xs">Purchase Price</div>
                        <div className="font-medium">$250,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Current Value</div>
                        <div className="font-medium">$275,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Monthly Rent</div>
                        <div className="font-medium">$1,650</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Monthly Expenses</div>
                        <div className="font-medium">$400</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Monthly Mortgage</span>
                        <span>$1,050</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Monthly Expenses</span>
                        <span>$400</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Monthly Income</span>
                        <span>$1,650</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>Monthly Cash Flow</span>
                        <span className="text-green-600">+$200</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Annual Cash Flow</span>
                        <span className="text-green-600">+$2,400</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Cash-on-Cash Return</span>
                        <span>6.0%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-violet-600" />
                        <span className="font-medium">Optimization Opportunities</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm">Increase rent by $100/month at next renewal</p>
                          <div className="text-xs text-muted-foreground mt-1">
                            Market analysis shows 6% below market
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm">Refinance to lower interest rate by 0.5%</p>
                          <div className="text-xs text-muted-foreground mt-1">Potential savings: $85/month</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowUpRight className="h-4 w-4 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm">Consider minor kitchen upgrade</p>
                          <div className="text-xs text-muted-foreground mt-1">
                            $3,500 investment could increase rent by $75/month
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Apply Optimizations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Next Property Opportunities</CardTitle>
                <CardDescription>Potential income properties for acquisition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">2bd/2ba Condo</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">97% Match</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <div className="text-muted-foreground text-xs">Price</div>
                        <div className="font-medium">$275,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Location</div>
                        <div className="font-medium">South Austin, TX</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Est. Rent</div>
                        <div className="font-medium">$1,750/mo</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Cash Flow</div>
                        <div className="font-medium text-green-600">+$250/mo</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-green-600">6.3% Cash-on-Cash Return</div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">3bd/2ba Townhouse</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">94% Match</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <div className="text-muted-foreground text-xs">Price</div>
                        <div className="font-medium">$310,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Location</div>
                        <div className="font-medium">North Austin, TX</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Est. Rent</div>
                        <div className="font-medium">$1,950/mo</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Cash Flow</div>
                        <div className="font-medium text-green-600">+$275/mo</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-green-600">6.4% Cash-on-Cash Return</div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">2bd/1ba Duplex Unit</span>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">85% Match</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <div className="text-muted-foreground text-xs">Price</div>
                        <div className="font-medium">$225,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Location</div>
                        <div className="font-medium">East Austin, TX</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Est. Rent</div>
                        <div className="font-medium">$1,550/mo</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Cash Flow</div>
                        <div className="font-medium text-green-600">+$225/mo</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-amber-600">Needs minor renovation</div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View All Opportunities</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Resource Optimization Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Resource Optimizer</CardTitle>
                <CardDescription>Quantum-powered allocation of your financial resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResourceOptimizer />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Default</Button>
                <Button>Apply Optimized Allocation</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Optimization Impact</CardTitle>
                <CardDescription>How resource optimization affects your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Home className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Primary Residence</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current timeline</span>
                        <span>7 months</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Optimized timeline</span>
                        <span className="font-medium">5 months</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Time saved</span>
                        <span className="text-green-600 font-medium">2 months</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Income Properties</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Current acquisition rate</span>
                        <span>1 property / 12 months</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Optimized acquisition rate</span>
                        <span className="font-medium">1 property / 9 months</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Portfolio completion</span>
                        <span className="text-green-600 font-medium">9 months sooner</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Wallet className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Financial Impact</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Additional monthly cash flow</span>
                        <span className="font-medium text-green-600">+$350</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>5-year net worth increase</span>
                        <span className="font-medium text-green-600">+$125,000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Retirement impact</span>
                        <span className="font-medium text-amber-600">-$15,000</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Note: Temporary reduction in retirement contributions will be offset by real estate equity growth
                    </div>
                  </div>

                  <Button className="w-full">Apply Optimized Strategy</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Banking & Cash Flow Optimization</CardTitle>
                <CardDescription>Maximize your cash flow for real estate acquisition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Current Banking Structure</span>
                      </div>
                      <Badge variant="outline">Suboptimal</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Checking Account</span>
                        <span>0.01% APY</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Savings Account</span>
                        <span>0.5% APY</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Down Payment Fund</span>
                        <span>1.5% APY</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Monthly Banking Fees</span>
                        <span className="text-red-600">-$25</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Optimized Banking Structure</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>High-Yield Checking</span>
                        <span className="text-green-600">2.0% APY</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Money Market Account</span>
                        <span className="text-green-600">3.75% APY</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Brokerage Account</span>
                        <span className="text-green-600">4.5% APY</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Monthly Banking Fees</span>
                        <span className="text-green-600">+$0</span>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="text-sm">
                      <div className="font-medium mb-1">How to achieve this:</div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                        <li>Switch to high-yield checking account with no fees</li>
                        <li>Move savings to a money market account</li>
                        <li>Invest excess cash in a low-risk brokerage account</li>
                      </ul>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Apply This Strategy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expense Optimization</CardTitle>
                <CardDescription>Reduce expenses to accelerate savings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Current Monthly Expenses</span>
                      </div>
                      <span className="font-medium">-$4,250</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Housing</span>
                        <span>-$1,500</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Transportation</span>
                        <span>-$500</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Food</span>
                        <span>-$750</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Entertainment</span>
                        <span>-$500</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Other</span>
                        <span>-$1,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Optimized Monthly Expenses</span>
                      </div>
                      <span className="font-medium text-green-600">-$3,900</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Housing</span>
                        <span>-$1,500</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Transportation</span>
                        <span className="text-green-600">-$400</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Food</span>
                        <span className="text-green-600">-$650</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Entertainment</span>
                        <span className="text-green-600">-$400</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Other</span>
                        <span className="text-green-600">-$950</span>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="text-sm">
                      <div className="font-medium mb-1">How to achieve this:</div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                        <li>Reduce transportation costs by carpooling</li>
                        <li>Cut back on eating out and cook more meals at home</li>
                        <li>Find free or low-cost entertainment options</li>
                        <li>Review and cancel unused subscriptions</li>
                      </ul>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Apply This Strategy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Advisor Tab */}
        <TabsContent value="ai-advisor" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>AI Strategy Advisor</CardTitle>
                <CardDescription>Quantum-powered real estate investment guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Current Strategy Assessment</span>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">Needs Improvement</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Primary Residence Timeline</span>
                        <span>7 months</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Income Property Portfolio</span>
                        <span>5 properties</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Risk Tolerance</span>
                        <span>Moderate</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Resource Allocation</span>
                        <span>Suboptimal</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">AI-Powered Recommendations</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Optimized</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Accelerate Primary Residence</span>
                        <span className="text-green-600">5 months</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Optimize Resource Allocation</span>
                        <span className="text-green-600">Increase savings rate</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Explore Income Property Opportunities</span>
                        <span className="text-green-600">High-potential markets</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Adjust Risk Tolerance</span>
                        <span className="text-green-600">Consider RWA-backed loans</span>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="text-sm">
                      <div className="font-medium mb-1">Next Steps:</div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                        <li>Apply optimized resource allocation strategy</li>
                        <li>Review recommended income property opportunities</li>
                        <li>Consult with a financial advisor to adjust risk tolerance</li>
                      </ul>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Apply AI Strategy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Market Analysis</CardTitle>
                <CardDescription>AI-powered insights into real estate trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Top Performing Markets</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Austin, TX</span>
                        <span className="text-green-600">+12.5% YoY</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Raleigh, NC</span>
                        <span className="text-green-600">+11.2% YoY</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Nashville, TN</span>
                        <span className="text-green-600">+10.8% YoY</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Property Value Projections</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Next 6 Months</span>
                        <span className="text-green-600">+4.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Next 12 Months</span>
                        <span className="text-green-600">+7.8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Next 5 Years</span>
                        <span className="text-green-600">+22.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalized Insights</CardTitle>
                <CardDescription>AI-driven recommendations tailored to your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Primary Residence</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Recommended Loan Type</span>
                        <span>50-Year Fixed</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Down Payment</span>
                        <span>5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Estimated Purchase Date</span>
                        <span>Immediate</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Income Properties</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Recommended Markets</span>
                        <span>Austin, Raleigh, Nashville</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Property Type</span>
                        <span>2bd/2ba Condo</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Cash-on-Cash Return</span>
                        <span>6.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Learning Center</CardTitle>
                <CardDescription>Expand your real estate knowledge with AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Understanding Real Estate Loans</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn about different types of real estate loans, including fixed-rate, adjustable-rate, and
                      government-backed loans.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Analyzing Market Trends</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Discover how to analyze market trends, including supply and demand, property values, and rental
                      rates.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Building a Real Estate Portfolio</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn how to build a diversified real estate portfolio, including strategies for acquiring and
                      managing income properties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
