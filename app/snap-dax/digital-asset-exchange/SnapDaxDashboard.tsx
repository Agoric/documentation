"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Shield, Database, CheckCircle, Globe } from "lucide-react"

// Mock data that works immediately
const mockData = {
  qgiCitizenBonds: [
    {
      id: "QGI-001",
      citizenId: "CITIZEN_DEMO_001",
      bondAmount: 250000,
      bankRate: 0.0525,
      leverageRatio: 60,
      availableLendingCapacity: 15000000,
      currentUtilization: 2500000,
      status: "active",
      purchaseDate: "2024-01-15",
    },
    {
      id: "QGI-002",
      citizenId: "CITIZEN_DEMO_002",
      bondAmount: 250000,
      bankRate: 0.0525,
      leverageRatio: 60,
      availableLendingCapacity: 15000000,
      currentUtilization: 1800000,
      status: "active",
      purchaseDate: "2024-01-20",
    },
    {
      id: "QGI-003",
      citizenId: "CITIZEN_DEMO_003",
      bondAmount: 250000,
      bankRate: 0.0525,
      leverageRatio: 60,
      availableLendingCapacity: 15000000,
      currentUtilization: 3200000,
      status: "active",
      purchaseDate: "2024-01-25",
    },
  ],
  businessBonds: [
    {
      id: "BUS-001",
      businessId: "BUS_DEMO_001",
      businessName: "Snapifi Tech Solutions",
      bondAmount: 500000,
      bankRate: 0.0525,
      creditGuaranteeAmount: 500000,
      currentCreditUtilization: 125000,
      status: "active",
      purchaseDate: "2024-01-10",
    },
    {
      id: "BUS-002",
      businessId: "BUS_DEMO_002",
      businessName: "Digital Asset Ventures",
      bondAmount: 500000,
      bankRate: 0.0525,
      creditGuaranteeAmount: 500000,
      currentCreditUtilization: 275000,
      status: "active",
      purchaseDate: "2024-01-18",
    },
  ],
  governmentPrograms: [
    { code: "SBA_7A", name: "SBA 7(a) Loan Program", agency: "SBA", maxAmount: 5000000, guaranteeRate: 85 },
    { code: "HUD_FHA", name: "FHA Mortgage Insurance", agency: "HUD", maxAmount: 970800, guaranteeRate: 96.5 },
    { code: "VA_HOME", name: "VA Home Loan Guarantee", agency: "VA", maxAmount: 1000000, guaranteeRate: 100 },
    { code: "USDA_RD", name: "USDA Rural Development", agency: "USDA", maxAmount: 500000, guaranteeRate: 90 },
    {
      code: "TREASURY_CAP",
      name: "Treasury Capital Access",
      agency: "Treasury",
      maxAmount: 2000000,
      guaranteeRate: 80,
    },
    { code: "FED_DISCOUNT", name: "Federal Reserve Discount", agency: "Fed", maxAmount: 10000000, guaranteeRate: 100 },
  ],
}

export function SnapDaxDashboard() {
  const [mode, setMode] = useState<"demo" | "live">("demo")
  const [stats, setStats] = useState({
    totalQgiBonds: 0,
    totalBusinessBonds: 0,
    totalLendingCapacity: 0,
    totalUtilization: 0,
    activePrograms: 0,
  })

  useEffect(() => {
    // Calculate stats from mock data
    const qgiTotal = mockData.qgiCitizenBonds.reduce((sum, bond) => sum + bond.bondAmount, 0)
    const businessTotal = mockData.businessBonds.reduce((sum, bond) => sum + bond.bondAmount, 0)
    const lendingCapacity = mockData.qgiCitizenBonds.reduce((sum, bond) => sum + bond.availableLendingCapacity, 0)
    const utilization = mockData.qgiCitizenBonds.reduce((sum, bond) => sum + bond.currentUtilization, 0)

    setStats({
      totalQgiBonds: qgiTotal,
      totalBusinessBonds: businessTotal,
      totalLendingCapacity: lendingCapacity,
      totalUtilization: utilization,
      activePrograms: mockData.governmentPrograms.length,
    })
  }, [])

  const utilizationPercentage = (stats.totalUtilization / stats.totalLendingCapacity) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 p-4">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            SNAP Digital Asset X-Change
          </h1>
          <p className="text-gray-600 text-lg">
            Government-Backed QGI Bonds • 60x Leverage • Institutional Trading Platform
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant={mode === "demo" ? "default" : "secondary"} className="px-4 py-2">
              <Database className="w-4 h-4 mr-2" />
              {mode === "demo" ? "Demo Mode Active" : "Live Mode"}
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Government Guaranteed
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">QGI Citizen Bonds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(stats.totalQgiBonds / 1000).toFixed(0)}K</div>
              <p className="text-xs text-gray-600 mt-1">{mockData.qgiCitizenBonds.length} Active Bonds</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-cyan-600">Business Bonds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(stats.totalBusinessBonds / 1000).toFixed(0)}K</div>
              <p className="text-xs text-gray-600 mt-1">{mockData.businessBonds.length} Active Bonds</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Lending Capacity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(stats.totalLendingCapacity / 1000000).toFixed(0)}M</div>
              <p className="text-xs text-gray-600 mt-1">60x Leverage Applied</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{utilizationPercentage.toFixed(1)}%</div>
              <Progress value={utilizationPercentage} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="qgi-bonds">QGI Bonds</TabsTrigger>
            <TabsTrigger value="business-bonds">Business Bonds</TabsTrigger>
            <TabsTrigger value="programs">Gov Programs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Economic Global Citizenship
                  </CardTitle>
                  <CardDescription>New World Wealth Navigation Assistant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Citizens Registered</span>
                      <span className="font-medium">{mockData.qgiCitizenBonds.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Businesses Registered</span>
                      <span className="font-medium">{mockData.businessBonds.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Bond Value</span>
                      <span className="font-medium">
                        ${((stats.totalQgiBonds + stats.totalBusinessBonds) / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Available Lending</span>
                      <span className="font-medium">${(stats.totalLendingCapacity / 1000000).toFixed(0)}M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Government Programs
                  </CardTitle>
                  <CardDescription>Integrated Federal Guarantee Programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockData.governmentPrograms.slice(0, 4).map((program) => (
                      <div key={program.code} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{program.agency}</div>
                          <div className="text-xs text-gray-600">{program.guaranteeRate}% Guarantee</div>
                        </div>
                        <Badge variant="outline">${(program.maxAmount / 1000000).toFixed(1)}M</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="qgi-bonds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QGI Citizen Bonds - $250K Each</CardTitle>
                <CardDescription>Government-guaranteed bonds with 60x leverage for mortgage lending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.qgiCitizenBonds.map((bond) => (
                    <div key={bond.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{bond.citizenId}</div>
                          <div className="text-sm text-gray-600">Bond ID: {bond.id}</div>
                        </div>
                        <Badge variant={bond.status === "active" ? "default" : "secondary"}>{bond.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Bond Amount</div>
                          <div className="font-medium">${bond.bondAmount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Bank Rate</div>
                          <div className="font-medium">{(bond.bankRate * 100).toFixed(2)}%</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Lending Capacity</div>
                          <div className="font-medium">${(bond.availableLendingCapacity / 1000000).toFixed(0)}M</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Utilization</div>
                          <div className="font-medium">
                            {((bond.currentUtilization / bond.availableLendingCapacity) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business-bonds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Credit Guarantee Bonds - $500K Each</CardTitle>
                <CardDescription>SBA-integrated credit facilities for registered businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.businessBonds.map((bond) => (
                    <div key={bond.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{bond.businessName}</div>
                          <div className="text-sm text-gray-600">Business ID: {bond.businessId}</div>
                        </div>
                        <Badge variant={bond.status === "active" ? "default" : "secondary"}>{bond.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Bond Amount</div>
                          <div className="font-medium">${bond.bondAmount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Bank Rate</div>
                          <div className="font-medium">{(bond.bankRate * 100).toFixed(2)}%</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Credit Guarantee</div>
                          <div className="font-medium">${bond.creditGuaranteeAmount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Credit Used</div>
                          <div className="font-medium">${bond.currentCreditUtilization.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrated Government Programs</CardTitle>
                <CardDescription>Federal guarantee and lending programs with auto-pairing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockData.governmentPrograms.map((program) => (
                    <div key={program.code} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{program.name}</div>
                          <div className="text-sm text-gray-600">{program.agency}</div>
                        </div>
                        <Badge variant="outline">{program.code}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Max Amount</div>
                          <div className="font-medium">${(program.maxAmount / 1000000).toFixed(1)}M</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Guarantee Rate</div>
                          <div className="font-medium">{program.guaranteeRate}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Status Banner */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <div className="font-medium">SNAP DAX is Running in Demo Mode</div>
                  <div className="text-sm text-gray-600">
                    All features are functional with sample data. Ready for live database connection.
                  </div>
                </div>
              </div>
              <Button variant="outline" className="ml-4">
                <Database className="w-4 h-4 mr-2" />
                Connect Database
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
