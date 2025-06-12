"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Cpu, DollarSign, Home } from "lucide-react"

interface QuantumInsightsProps {
  fullSize?: boolean
}

export function QuantumInsights({ fullSize = false }: QuantumInsightsProps) {
  const [activeTab, setActiveTab] = useState("financial")
  const [animatedData, setAnimatedData] = useState<any[]>([])

  const financialData = [
    { month: "Jan", assets: 220000, savings: 15000, credit: 720 },
    { month: "Feb", assets: 225000, savings: 15500, credit: 725 },
    { month: "Mar", assets: 228000, savings: 16200, credit: 728 },
    { month: "Apr", assets: 235000, savings: 17000, credit: 732 },
    { month: "May", assets: 240000, savings: 17800, credit: 738 },
    { month: "Jun", assets: 245780, savings: 18500, credit: 742 },
    { month: "Jul", assets: 252000, savings: 19200, credit: 748 },
    { month: "Aug", assets: 258000, savings: 20000, credit: 755 },
    { month: "Sep", assets: 265000, savings: 21000, credit: 762 },
    { month: "Oct", assets: 272000, savings: 22000, credit: 768 },
    { month: "Nov", assets: 280000, savings: 23000, credit: 775 },
    { month: "Dec", assets: 290000, savings: 24000, credit: 780 },
  ]

  const propertyData = [
    { month: "Jan", goal: 55000, market: 1250000, affordability: 35 },
    { month: "Feb", goal: 56500, market: 1245000, affordability: 36 },
    { month: "Mar", goal: 58000, market: 1240000, affordability: 37 },
    { month: "Apr", goal: 60000, market: 1235000, affordability: 39 },
    { month: "May", goal: 62000, market: 1230000, affordability: 40 },
    { month: "Jun", goal: 68000, market: 1225000, affordability: 42 },
    { month: "Jul", goal: 72000, market: 1220000, affordability: 44 },
    { month: "Aug", goal: 76000, market: 1215000, affordability: 46 },
    { month: "Sep", goal: 80000, market: 1210000, affordability: 48 },
    { month: "Oct", goal: 85000, market: 1205000, affordability: 50 },
    { month: "Nov", goal: 90000, market: 1200000, affordability: 52 },
    { month: "Dec", goal: 100000, market: 1195000, affordability: 55 },
  ]

  const predictionData = [
    { month: "Jul", assets: 252000, prediction: 252000, confidence: 100 },
    { month: "Aug", assets: 258000, prediction: 258000, confidence: 100 },
    { month: "Sep", assets: 265000, prediction: 265000, confidence: 100 },
    { month: "Oct", assets: 272000, prediction: 272000, confidence: 100 },
    { month: "Nov", assets: 280000, prediction: 280000, confidence: 100 },
    { month: "Dec", assets: 290000, prediction: 290000, confidence: 100 },
    { month: "Jan", assets: null, prediction: 298000, confidence: 95 },
    { month: "Feb", assets: null, prediction: 305000, confidence: 92 },
    { month: "Mar", assets: null, prediction: 312000, confidence: 88 },
    { month: "Apr", assets: null, prediction: 320000, confidence: 85 },
    { month: "May", assets: null, prediction: 328000, confidence: 82 },
    { month: "Jun", assets: null, prediction: 335000, confidence: 78 },
  ]

  useEffect(() => {
    // Animate data loading
    const data = activeTab === "financial" ? financialData : activeTab === "property" ? propertyData : predictionData
    const timer = setTimeout(() => {
      setAnimatedData(data)
    }, 500)
    return () => clearTimeout(timer)
  }, [activeTab])

  return (
    <div className={`w-full ${fullSize ? "h-[300px]" : "h-full"}`}>
      <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="financial" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span className="hidden sm:inline">Financial</span>
          </TabsTrigger>
          <TabsTrigger value="property" className="flex items-center gap-1">
            <Home className="h-3 w-3" />
            <span className="hidden sm:inline">Property</span>
          </TabsTrigger>
          <TabsTrigger value="prediction" className="flex items-center gap-1">
            <Cpu className="h-3 w-3" />
            <span className="hidden sm:inline">Quantum Prediction</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="h-[calc(100%-40px)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="assets"
                name="Total Assets"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line yAxisId="right" type="monotone" dataKey="savings" name="Savings" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="property" className="h-[calc(100%-40px)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="goal"
                name="Down Payment Goal"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line yAxisId="right" type="monotone" dataKey="affordability" name="Affordability %" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="prediction" className="h-[calc(100%-40px)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="assets"
                name="Actual Assets"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="prediction"
                name="Quantum Prediction"
                stroke="#ff7300"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
