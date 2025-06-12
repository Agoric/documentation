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
  CreditCard,
  LineChart,
  Brain,
  Cpu,
  Landmark,
  Coins,
  PiggyBank,
  ArrowUpRight,
  Sparkles,
  Globe,
  MapPin,
  DollarSign,
  BarChart4,
  Layers,
  Briefcase,
  GraduationCap,
  Car,
  MessageSquare,
  Bot,
  Zap,
} from "lucide-react"
import { AIConciergeChatbot } from "@/components/snapifi/ai-concierge-chatbot"
import { CostOfLivingMap } from "@/components/snapifi/cost-of-living-map"
import { LoanPortfolio } from "@/components/snapifi/loan-portfolio"
import { QuantumInsights } from "@/components/snapifi/quantum-insights"
import { RwaTokenization } from "@/components/snapifi/rwa-tokenization"
import { CreditScoreTracker } from "@/components/snapifi/credit-score-tracker"
import { VehicleEfficiency } from "@/components/snapifi/vehicle-efficiency"

export function SnapifiDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Snapifi Financial Platform</h1>
          <p className="text-muted-foreground">
            Inclusive lending, asset-backed loans, and quantum-powered financial insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Wallet className="h-4 w-4" />
            <span>My Portfolio</span>
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
            <Sparkles className="h-4 w-4" />
            <span>Consult Master Banker</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 gap-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="lending" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            <span className="hidden md:inline">Lending</span>
          </TabsTrigger>
          <TabsTrigger value="geo-analytics" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Geo-Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="investments" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            <span className="hidden md:inline">Investments</span>
          </TabsTrigger>
          <TabsTrigger value="ai-concierge" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden md:inline">AI Concierge</span>
          </TabsTrigger>
          <TabsTrigger value="quantum" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span className="hidden md:inline">Quantum</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden md:inline">Education</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$245,780.00</div>
                <p className="text-xs text-muted-foreground">+$12,540 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">742</div>
                <div className="mt-2">
                  <Progress value={74.2} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">+18 points since last quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Property Goal</CardTitle>
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
                <CardTitle className="text-sm font-medium">RWA Tokens</CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5 RWAT</div>
                <p className="text-xs text-muted-foreground">Current value: $12,500</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Your financial health and progress toward goals</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] flex items-center justify-center">
                  <QuantumInsights />
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Genius AI Concierge</CardTitle>
                <CardDescription>Your personal financial assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <AIConciergeChatbot />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <MessageSquare className="h-4 w-4" />
                  <span>Ask Genius AI</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Property Acquisition</CardTitle>
                <CardDescription>Your path to real estate ownership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Down Payment</span>
                      </div>
                      <span className="text-sm">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Credit Score</span>
                      </div>
                      <span className="text-sm">74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Income Stability</span>
                      </div>
                      <span className="text-sm">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Property Options
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cost of Living Analysis</CardTitle>
                <CardDescription>Based on your location and income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <CostOfLivingMap />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <div className="text-sm font-medium">Current Location</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> San Francisco, CA
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Explore Options
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Your RWA tokens and investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Real Estate NFTs</span>
                    </div>
                    <Badge>8.5 Tokens</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Loan Notes</span>
                    </div>
                    <Badge>4.0 Tokens</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Yield Tokens</span>
                    </div>
                    <Badge>2.5 Tokens</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Value</span>
                    <span className="text-sm font-bold">$15,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monthly Yield</span>
                    <span className="text-sm font-medium text-green-600">+$125 (10% APY)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Investments
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Lending Tab */}
        <TabsContent value="lending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Inclusive Lending Options</CardTitle>
                <CardDescription>Asset-backed loans tailored to your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <LoanPortfolio />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View All Loans</Button>
                <Button>Apply for Loan</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Loan Eligibility</CardTitle>
                <CardDescription>Based on your financial profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">50-Year Property Loan</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Eligible</Badge>
                    </div>
                    <Progress value={92} className="h-2 bg-green-100">
                      <div className="bg-green-600 h-full w-[92%] rounded-full" />
                    </Progress>
                    <p className="text-xs text-muted-foreground">Up to $750,000 available</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Debt Consolidation</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Eligible</Badge>
                    </div>
                    <Progress value={85} className="h-2 bg-green-100">
                      <div className="bg-green-600 h-full w-[85%] rounded-full" />
                    </Progress>
                    <p className="text-xs text-muted-foreground">Up to $50,000 available</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Commercial Property</span>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Partial</Badge>
                    </div>
                    <Progress value={65} className="h-2 bg-amber-100">
                      <div className="bg-amber-600 h-full w-[65%] rounded-full" />
                    </Progress>
                    <p className="text-xs text-muted-foreground">Additional documentation needed</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">International Loan</span>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Not Eligible</Badge>
                    </div>
                    <Progress value={30} className="h-2 bg-red-100">
                      <div className="bg-red-600 h-full w-[30%] rounded-full" />
                    </Progress>
                    <p className="text-xs text-muted-foreground">Requires 2+ years of credit history</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Improve Eligibility</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Geo-Analytics Tab */}
        <TabsContent value="geo-analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Cost of Living Map</CardTitle>
                <CardDescription>Housing costs and living expenses by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <CostOfLivingMap fullSize />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Location Analysis</CardTitle>
                <CardDescription>Based on your profession and income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Current Location</span>
                    </div>
                    <div className="text-sm">San Francisco, CA</div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Avg. Home Price</div>
                        <div className="font-medium">$1,250,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Avg. Rent (2BR)</div>
                        <div className="font-medium">$3,850/mo</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Your Profession</div>
                        <div className="font-medium">Software Engineer</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Avg. Salary</div>
                        <div className="font-medium">$145,000/yr</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-muted-foreground text-sm">Housing Affordability</div>
                      <Progress value={45} className="h-2 mt-1" />
                      <div className="text-xs text-red-500 mt-1">45% - Housing costs exceed recommended 30%</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">Recommended Locations</div>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="font-medium">Austin, TX</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">92% Match</Badge>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">Avg. salary: $125,000 | Home: $450,000</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="font-medium">Raleigh, NC</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">88% Match</Badge>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">Avg. salary: $115,000 | Home: $380,000</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">Denver, CO</span>
                          </div>
                          <Badge className="bg-amber-100 text-amber-800">75% Match</Badge>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">Avg. salary: $120,000 | Home: $520,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Explore More Locations</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Investments Tab */}
        <TabsContent value="investments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>RWA Tokenization Platform</CardTitle>
                <CardDescription>Real-world assets tokenized for investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <RwaTokenization />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View All Assets</Button>
                <Button>Invest Now</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Your current investments and returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Residential Property NFT</span>
                      </div>
                      <Badge>5.2 Tokens</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Value</div>
                        <div className="font-medium">$5,200</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Monthly Yield</div>
                        <div className="font-medium text-green-600">$43.33</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">APY</div>
                        <div className="font-medium">10%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Term</div>
                        <div className="font-medium">5 years</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Commercial Loan Note</span>
                      </div>
                      <Badge>3.0 Tokens</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Value</div>
                        <div className="font-medium">$3,000</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Monthly Yield</div>
                        <div className="font-medium text-green-600">$30.00</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">APY</div>
                        <div className="font-medium">12%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Term</div>
                        <div className="font-medium">3 years</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">Yield Token</span>
                      </div>
                      <Badge>2.5 Tokens</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Value</div>
                        <div className="font-medium">$2,500</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Monthly Yield</div>
                        <div className="font-medium text-green-600">$16.67</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">APY</div>
                        <div className="font-medium">8%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Term</div>
                        <div className="font-medium">Flexible</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Portfolio Value</span>
                    <span className="font-bold">$10,700</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Monthly Yield</span>
                    <span className="font-medium text-green-600">$90.00</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Manage Portfolio</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* AI Concierge Tab */}
        <TabsContent value="ai-concierge" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Genius AI Concierge</CardTitle>
                    <CardDescription>Your personal financial assistant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <AIConciergeChatbot fullSize />
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle>Master Banker</CardTitle>
                      <CardDescription>Advanced financial guidance</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg bg-blue-50">
                      <div className="flex items-start gap-2">
                        <Bot className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            Based on your spending patterns and income, I recommend allocating an additional 5% to your
                            property down payment fund to reach your goal 3 months earlier.
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              Tell me more
                            </Button>
                            <Button size="sm" className="h-7 text-xs bg-blue-600">
                              Apply recommendation
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium mb-2">Recent Insights</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-amber-500 mt-0.5" />
                          <p>Your credit utilization increased to 28% this month</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                          <p>New loan option available based on your improved credit score</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                          <p>Property prices in your target area decreased by 2.5%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
                    <Bot className="h-4 w-4" />
                    <span>Schedule Consultation</span>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Learning Progress</CardTitle>
                  <CardDescription>How well the AI understands your finances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Spending Patterns</span>
                        <span className="text-sm">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Financial Goals</span>
                        <span className="text-sm">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Investment Preferences</span>
                        <span className="text-sm">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Risk Tolerance</span>
                        <span className="text-sm">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Improve AI Understanding
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Quantum Tab */}
        <TabsContent value="quantum" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                    <Cpu className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Quantum Computing Integration</CardTitle>
                    <CardDescription>Advanced financial calculations and predictions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <QuantumInsights fullSize />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600">
                  <Cpu className="h-4 w-4" />
                  <span>Run Quantum Analysis</span>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quantum-Powered Insights</CardTitle>
                <CardDescription>Real-time financial predictions and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-violet-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-4 w-4 text-violet-600" />
                      <span className="font-medium">Loan Optimization</span>
                    </div>
                    <p className="text-sm mb-3">
                      Quantum analysis has identified an opportunity to refinance your current loans, potentially saving
                      $12,450 over the loan term.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Current Rate</div>
                        <div className="font-medium">4.25%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Optimized Rate</div>
                        <div className="font-medium text-green-600">3.75%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Monthly Savings</div>
                        <div className="font-medium">$85</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Confidence</div>
                        <div className="font-medium">92%</div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-violet-600">
                      Apply Optimization
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart4 className="h-4 w-4 text-indigo-600" />
                      <span className="font-medium">Market Predictions</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p>Real estate in your target area predicted to appreciate 4.2% in next 6 months</p>
                          <div className="text-xs text-muted-foreground mt-1">Confidence: 87%</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowUpRight className="h-4 w-4 text-amber-500 mt-0.5" />
                        <div>
                          <p>Interest rates predicted to rise 0.25% in next quarter</p>
                          <div className="text-xs text-muted-foreground mt-1">Confidence: 78%</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowUpRight className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p>Your credit score predicted to reach 760+ in 4 months with current behavior</p>
                          <div className="text-xs text-muted-foreground mt-1">Confidence: 91%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Insights
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quantum-Enhanced User Journey</CardTitle>
              <CardDescription>How quantum computing is optimizing your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                      <Cpu className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="font-medium">Adaptive Onboarding</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Quantum algorithms have reduced your onboarding questions by 68% by intelligently predicting
                    relevant information.
                  </p>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Redundancy Reduction</div>
                      <Progress value={68} className="h-1.5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                      <Progress value={94} className="h-1.5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="font-medium">Financial Modeling</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Quantum-powered financial models have increased prediction accuracy by 32% compared to traditional
                    methods.
                  </p>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Processing Speed</div>
                      <Progress value={98} className="h-1.5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
                      <Progress value={87} className="h-1.5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium">AI Enhancement</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Quantum computing has enhanced the AI Concierge's learning speed by 215% and reduced response time
                    by 78%.
                  </p>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Learning Speed</div>
                      <Progress value={92} className="h-1.5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Response Time</div>
                      <Progress value={95} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Financial Education</CardTitle>
                <CardDescription>Self-guided courses and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Credit Management</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to build, maintain, and optimize your credit score for better loan terms.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">4</span> modules
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">75%</span> complete
                      </div>
                    </div>
                    <Progress value={75} className="h-2 mt-2" />
                    <Button size="sm" className="w-full mt-3">
                      Continue Learning
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Home className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">Real Estate Investing</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Understand property markets, valuation, and strategies for real estate investment.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">6</span> modules
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">30%</span> complete
                      </div>
                    </div>
                    <Progress value={30} className="h-2 mt-2" />
                    <Button size="sm" className="w-full mt-3">
                      Continue Learning
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Layers className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium">Tokenized Assets</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn about RWA tokens, blockchain, and how to invest in tokenized real-world assets.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">5</span> modules
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">10%</span> complete
                      </div>
                    </div>
                    <Progress value={10} className="h-2 mt-2" />
                    <Button size="sm" className="w-full mt-3">
                      Continue Learning
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <PiggyBank className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="font-medium">Budgeting Essentials</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Master the fundamentals of budgeting, saving, and planning for financial goals.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">3</span> modules
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">100%</span> complete
                      </div>
                    </div>
                    <Progress value={100} className="h-2 mt-2" />
                    <Button size="sm" variant="outline" className="w-full mt-3">
                      Review Course
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Courses
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Score Tracker</CardTitle>
                  <CardDescription>Monitor and improve your credit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <CreditScoreTracker />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Improve Your Score</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Efficiency</CardTitle>
                  <CardDescription>Track and optimize your vehicle expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Car className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">2019 Toyota Camry</div>
                        <div className="text-sm text-muted-foreground">Last updated: Today</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Fuel Efficiency</div>
                        <div className="flex items-end justify-between">
                          <div className="text-2xl font-bold">32.5</div>
                          <div className="text-sm text-muted-foreground">MPG</div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Monthly Cost</div>
                        <div className="flex items-end justify-between">
                          <div className="text-2xl font-bold">$185</div>
                          <div className="text-sm text-green-600">-$12</div>
                        </div>
                      </div>
                    </div>

                    <div className="h-[100px]">
                      <VehicleEfficiency />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
