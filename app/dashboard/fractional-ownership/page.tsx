"use client"

import { OwnershipDashboard } from "@/components/fractional-ownership/ownership-dashboard"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Building2, Coins, TrendingUp } from "lucide-react"

export default function FractionalOwnershipPage() {
  const [selectedOwnerType, setSelectedOwnerType] = useState<"individual" | "institutional">("individual")
  const [ownerId, setOwnerId] = useState("citizen_12345")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Owner Type Selection */}
      <div className="p-8 border-b border-amber-400/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-amber-400">Fractional Ownership Platform</h1>
              <p className="text-amber-300/70 italic font-serif">Proprietas Fractionalis Systematis</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={selectedOwnerType}
                onValueChange={(value: "individual" | "institutional") => setSelectedOwnerType(value)}
              >
                <SelectTrigger className="w-48 bg-black/20 border-amber-400/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Individual Citizen
                    </div>
                  </SelectItem>
                  <SelectItem value="institutional">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Institutional Entity
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Badge
                className={
                  selectedOwnerType === "individual"
                    ? "text-blue-400 bg-blue-400/10 border-blue-400/30"
                    : "text-amber-400 bg-amber-400/10 border-amber-400/30"
                }
              >
                {selectedOwnerType === "individual" ? "INDIVIDUAL ACCESS" : "INSTITUTIONAL ACCESS"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Access Level Information */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <Coins className="w-5 h-5 mr-2" />
                  Fractional Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">
                  All products offer fractional profit ownership to both individual and institutional investors.
                </p>
                <Badge className="text-xs text-blue-400 bg-blue-400/10 border-blue-400/30">BOTH ACCESS LEVELS</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Commodities Market
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">
                  5% - 25% ROI over minimum 2.5 years. Open to both individual and institutional participants.
                </p>
                <Badge className="text-xs text-green-400 bg-green-400/10 border-green-400/30">BOTH ACCESS LEVELS</Badge>
              </CardContent>
            </Card>

            <Card
              className={`bg-gradient-to-br border ${
                selectedOwnerType === "institutional"
                  ? "from-amber-900/20 to-yellow-900/20 border-amber-400/20"
                  : "from-red-900/20 to-red-900/20 border-red-400/20"
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center ${
                    selectedOwnerType === "institutional" ? "text-amber-400" : "text-red-400"
                  }`}
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  Guaranteed Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">
                  All guaranteed products are exclusively available to institutional investors only.
                </p>
                <Badge
                  className={`text-xs ${
                    selectedOwnerType === "institutional"
                      ? "text-amber-400 bg-amber-400/10 border-amber-400/30"
                      : "text-red-400 bg-red-400/10 border-red-400/30"
                  }`}
                >
                  {selectedOwnerType === "institutional" ? "INSTITUTIONAL ACCESS" : "ACCESS RESTRICTED"}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Dashboard */}
        <OwnershipDashboard ownerId={ownerId} ownerType={selectedOwnerType} />
      </div>
    </div>
  )
}
