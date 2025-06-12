"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Building2, Landmark, Coins, Clock, Users, Layers } from "lucide-react"

export function RwaTokenization() {
  const [activeTab, setActiveTab] = useState("available")

  const availableAssets = [
    {
      id: "asset1",
      name: "Residential Property Portfolio",
      icon: <Home className="h-4 w-4 text-blue-600" />,
      type: "Real Estate",
      totalValue: "$2,500,000",
      tokenPrice: "$1,000",
      availableTokens: 250,
      soldTokens: 1750,
      apy: "10%",
      term: "5 years",
      progress: 87.5,
      investors: 120,
      location: "Multiple US Cities",
    },
    {
      id: "asset2",
      name: "Commercial Office Building",
      icon: <Building2 className="h-4 w-4 text-green-600" />,
      type: "Commercial Real Estate",
      totalValue: "$5,000,000",
      tokenPrice: "$2,500",
      availableTokens: 400,
      soldTokens: 1600,
      apy: "12%",
      term: "7 years",
      progress: 80,
      investors: 85,
      location: "Austin, TX",
    },
    {
      id: "asset3",
      name: "Loan Note Portfolio",
      icon: <Landmark className="h-4 w-4 text-amber-600" />,
      type: "Debt",
      totalValue: "$1,000,000",
      tokenPrice: "$500",
      availableTokens: 300,
      soldTokens: 1700,
      apy: "8.5%",
      term: "3 years",
      progress: 85,
      investors: 210,
      location: "Nationwide",
    },
  ]

  const myInvestments = [
    {
      id: "investment1",
      name: "Residential Property NFT",
      icon: <Home className="h-4 w-4 text-blue-600" />,
      tokens: 5.2,
      value: "$5,200",
      purchaseDate: "March 15, 2023",
      apy: "10%",
      monthlyYield: "$43.33",
      nextDistribution: "June 1, 2023",
    },
    {
      id: "investment2",
      name: "Commercial Loan Note",
      icon: <Landmark className="h-4 w-4 text-purple-600" />,
      tokens: 3.0,
      value: "$3,000",
      purchaseDate: "April 2, 2023",
      apy: "12%",
      monthlyYield: "$30.00",
      nextDistribution: "June 1, 2023",
    },
    {
      id: "investment3",
      name: "Yield Token",
      icon: <Coins className="h-4 w-4 text-amber-600" />,
      tokens: 2.5,
      value: "$2,500",
      purchaseDate: "May 10, 2023",
      apy: "8%",
      monthlyYield: "$16.67",
      nextDistribution: "June 1, 2023",
    },
  ]

  return (
    <div className="h-full">
      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="available">Available Assets</TabsTrigger>
          <TabsTrigger value="investments">My Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="h-[calc(100%-40px)] overflow-y-auto">
          <div className="space-y-4">
            {availableAssets.map((asset) => (
              <div key={asset.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {asset.icon}
                    <span className="font-medium">{asset.name}</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    {asset.type}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                  <div>
                    <div className="text-muted-foreground text-xs">Total Value</div>
                    <div className="font-medium">{asset.totalValue}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Token Price</div>
                    <div className="font-medium">{asset.tokenPrice}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">APY</div>
                    <div className="font-medium text-green-600">{asset.apy}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Term</div>
                    <div className="font-medium">{asset.term}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{asset.investors} investors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    <span>{asset.availableTokens} tokens available</span>
                  </div>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span>Funding Progress</span>
                    <span>{asset.progress}%</span>
                  </div>
                  <Progress value={asset.progress} className="h-2" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">{asset.location}</div>
                  <Button size="sm">Invest Now</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investments" className="h-[calc(100%-40px)] overflow-y-auto">
          <div className="space-y-4">
            {myInvestments.map((investment) => (
              <div
                key={investment.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  {investment.icon}
                  <span className="font-medium">{investment.name}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                  <div>
                    <div className="text-muted-foreground text-xs">Tokens Owned</div>
                    <div className="font-medium">{investment.tokens}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Current Value</div>
                    <div className="font-medium">{investment.value}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">APY</div>
                    <div className="font-medium text-green-600">{investment.apy}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Monthly Yield</div>
                    <div className="font-medium text-green-600">{investment.monthlyYield}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Purchased: {investment.purchaseDate}</span>
                  </div>
                  <div>Next distribution: {investment.nextDistribution}</div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline">
                    Manage Investment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
