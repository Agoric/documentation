"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MemberMarketplace } from "@/components/snap-dax/member-marketplace"
import { TokenizationHub } from "@/components/snap-dax/tokenization-hub"
import { TransactionCenter } from "@/components/snap-dax/transaction-center"
import { ProductAddition } from "@/components/snap-dax/product-addition"
import { PlatformOverview } from "@/components/snap-dax/platform-overview"
import { HolographicHeader } from "@/components/snap-dax/holographic-header"

export function SnapDaxDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/70">
      <HolographicHeader
        title="SNAP-DAX Platform"
        subtitle="Tokenization & Members-Only Marketplace"
        stats={[
          { label: "Active Members", value: "2,458" },
          { label: "Total Products", value: "1,245" },
          { label: "Tokenized Assets", value: "$24.5M" },
          { label: "24h Volume", value: "$1.2M" },
        ]}
      />

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 border border-indigo-500/20 bg-indigo-950/30 p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="marketplace"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
            >
              Marketplace
            </TabsTrigger>
            <TabsTrigger
              value="tokenization"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
            >
              Tokenization
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="add-product"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
            >
              Add Product
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PlatformOverview />
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <MemberMarketplace />
          </TabsContent>

          <TabsContent value="tokenization" className="space-y-6">
            <TokenizationHub />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionCenter />
          </TabsContent>

          <TabsContent value="add-product" className="space-y-6">
            <ProductAddition />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
