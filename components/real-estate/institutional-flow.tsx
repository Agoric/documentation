"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ImperialCard } from "@/components/ui/imperial-card"
import { Badge } from "@/components/ui/badge"
import { Users, Building, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

interface PropertySecurity {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  sector: string
  location: string
  type: "REIT" | "PROPERTY" | "FUND" | "INDEX"
  bid: number
  ask: number
  lastTrade: string
}

interface InstitutionalFlowProps {
  property: PropertySecurity
}

interface FlowData {
  date: string
  institutional_buy: number
  institutional_sell: number
  retail_buy: number
  retail_sell: number
  net_flow: number
}

interface InstitutionData {
  name: string
  type: string
  position: number
  change: number
  percentage: number
  color: string
}

export function InstitutionalFlow({ property }: InstitutionalFlowProps) {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M">("1W")

  // Mock institutional flow data
  const flowData: FlowData[] = [
    {
      date: "2024-01-15",
      institutional_buy: 45000000,
      institutional_sell: 32000000,
      retail_buy: 8000000,
      retail_sell: 12000000,
      net_flow: 9000000,
    },
    {
      date: "2024-01-16",
      institutional_buy: 52000000,
      institutional_sell: 28000000,
      retail_buy: 6000000,
      retail_sell: 15000000,
      net_flow: 15000000,
    },
    {
      date: "2024-01-17",
      institutional_buy: 38000000,
      institutional_sell: 41000000,
      retail_buy: 11000000,
      retail_sell: 9000000,
      net_flow: -1000000,
    },
    {
      date: "2024-01-18",
      institutional_buy: 61000000,
      institutional_sell: 35000000,
      retail_buy: 7000000,
      retail_sell: 13000000,
      net_flow: 20000000,
    },
    {
      date: "2024-01-19",
      institutional_buy: 43000000,
      institutional_sell: 39000000,
      retail_buy: 9000000,
      retail_sell: 8000000,
      net_flow: 5000000,
    },
  ]

  const institutionData: InstitutionData[] = [
    {
      name: "BlackRock",
      type: "Asset Manager",
      position: 125000000,
      change: 8500000,
      percentage: 28.5,
      color: "#3b82f6",
    },
    {
      name: "Vanguard",
      type: "Asset Manager",
      position: 98000000,
      change: -2100000,
      percentage: 22.3,
      color: "#ef4444",
    },
    {
      name: "State Street",
      type: "Asset Manager",
      position: 76000000,
      change: 4200000,
      percentage: 17.2,
      color: "#22c55e",
    },
    {
      name: "Fidelity",
      type: "Asset Manager",
      position: 54000000,
      change: 1800000,
      percentage: 12.3,
      color: "#f59e0b",
    },
    { name: "PIMCO", type: "Bond Fund", position: 42000000, change: -900000, percentage: 9.6, color: "#8b5cf6" },
    { name: "Others", type: "Various", position: 45000000, change: 2100000, percentage: 10.1, color: "#6b7280" },
  ]

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(0)}M`
    }
    return `$${value.toLocaleString()}`
  }

  const totalInstitutionalFlow = flowData.reduce((sum, day) => sum + day.net_flow, 0)
  const avgDailyFlow = totalInstitutionalFlow / flowData.length

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ImperialCard variant="gold" className="h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Institutional Flow</h3>
            <Badge variant="outline" className="text-xs">
              Smart Money
            </Badge>
          </div>

          <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
            {["1D", "1W", "1M"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf as any)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  timeframe === tf ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Flow Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">Net Flow</span>
            </div>
            <div className="text-lg font-bold text-green-400">+{formatCurrency(totalInstitutionalFlow)}</div>
            <div className="text-xs text-gray-500">{timeframe} period</div>
          </div>

          <div className="text-center p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">Avg Daily</span>
            </div>
            <div className="text-lg font-bold text-blue-400">
              {avgDailyFlow >= 0 ? "+" : ""}
              {formatCurrency(avgDailyFlow)}
            </div>
            <div className="text-xs text-gray-500">per day</div>
          </div>

          <div className="text-center p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Building className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">Institutions</span>
            </div>
            <div className="text-lg font-bold text-purple-400">{institutionData.length - 1}</div>
            <div className="text-xs text-gray-500">active</div>
          </div>
        </div>

        {/* Flow Chart */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white">Daily Flow Analysis</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={flowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  fontSize={10}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#9ca3af" fontSize={10} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="institutional_buy" fill="#22c55e" name="Institutional Buy" stackId="institutional" />
                <Bar dataKey="institutional_sell" fill="#ef4444" name="Institutional Sell" stackId="institutional" />
                <Bar dataKey="retail_buy" fill="#3b82f6" name="Retail Buy" stackId="retail" />
                <Bar dataKey="retail_sell" fill="#f59e0b" name="Retail Sell" stackId="retail" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Institution Holdings */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white">Major Institutional Holdings</h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Holdings List */}
            <div className="space-y-2">
              {institutionData.map((institution, index) => (
                <motion.div
                  key={institution.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: institution.color }} />
                    <div>
                      <p className="text-sm font-semibold text-white">{institution.name}</p>
                      <p className="text-xs text-gray-400">{institution.type}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{formatCurrency(institution.position)}</p>
                    <div
                      className={`text-xs flex items-center gap-1 ${
                        institution.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {institution.change >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>
                        {institution.change >= 0 ? "+" : ""}
                        {formatCurrency(institution.change)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Holdings Pie Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={institutionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="percentage"
                  >
                    {institutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-slate-800 border border-gray-600 rounded-lg p-3 shadow-lg">
                            <p className="text-white font-semibold">{data.name}</p>
                            <p className="text-gray-300 text-sm">
                              {formatCurrency(data.position)} ({data.percentage}%)
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Flow Analysis */}
        <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-semibold text-white">Flow Analysis</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-gray-400 mb-1">Institutional Sentiment:</p>
              <Badge className="bg-green-500/20 text-green-400">BULLISH</Badge>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Retail Sentiment:</p>
              <Badge className="bg-red-500/20 text-red-400">BEARISH</Badge>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Strong institutional buying pressure with {formatCurrency(totalInstitutionalFlow)} net inflow over the past
            week. Smart money appears to be accumulating positions while retail investors are taking profits.
          </p>
        </div>
      </div>
    </ImperialCard>
  )
}
