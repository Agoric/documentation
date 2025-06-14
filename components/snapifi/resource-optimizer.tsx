"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function ResourceOptimizer() {
  const [allocations, setAllocations] = useState({
    realEstate: 45,
    retirement: 25,
    emergency: 15,
    investments: 10,
    discretionary: 5,
  })

  const data = [
    { name: "Real Estate", value: allocations.realEstate, color: "#3b82f6" },
    { name: "Retirement", value: allocations.retirement, color: "#10b981" },
    { name: "Emergency Fund", value: allocations.emergency, color: "#f59e0b" },
    { name: "Investments", value: allocations.investments, color: "#8b5cf6" },
    { name: "Discretionary", value: allocations.discretionary, color: "#ef4444" },
  ]

  const updateAllocation = (category: string, value: number[]) => {
    const newValue = value[0]
    const oldValue = allocations[category as keyof typeof allocations]
    const difference = newValue - oldValue

    // Redistribute the difference among other categories
    const otherCategories = Object.keys(allocations).filter((key) => key !== category)
    const redistributeAmount = -difference / otherCategories.length

    const newAllocations = { ...allocations }
    newAllocations[category as keyof typeof allocations] = newValue

    otherCategories.forEach((cat) => {
      const currentValue = newAllocations[cat as keyof typeof allocations]
      const newCatValue = Math.max(0, Math.min(100, currentValue + redistributeAmount))
      newAllocations[cat as keyof typeof allocations] = Math.round(newCatValue)
    })

    setAllocations(newAllocations)
  }

  const resetToOptimal = () => {
    setAllocations({
      realEstate: 50,
      retirement: 20,
      emergency: 15,
      investments: 10,
      discretionary: 5,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Resource Allocation</h4>
          <Button variant="outline" size="sm" onClick={resetToOptimal}>
            Reset to Optimal
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Real Estate Savings</label>
              <Badge variant="secondary">{allocations.realEstate}%</Badge>
            </div>
            <Slider
              value={[allocations.realEstate]}
              onValueChange={(value) => updateAllocation("realEstate", value)}
              max={80}
              min={10}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Retirement Contributions</label>
              <Badge variant="secondary">{allocations.retirement}%</Badge>
            </div>
            <Slider
              value={[allocations.retirement]}
              onValueChange={(value) => updateAllocation("retirement", value)}
              max={50}
              min={5}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Emergency Fund</label>
              <Badge variant="secondary">{allocations.emergency}%</Badge>
            </div>
            <Slider
              value={[allocations.emergency]}
              onValueChange={(value) => updateAllocation("emergency", value)}
              max={30}
              min={5}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Other Investments</label>
              <Badge variant="secondary">{allocations.investments}%</Badge>
            </div>
            <Slider
              value={[allocations.investments]}
              onValueChange={(value) => updateAllocation("investments", value)}
              max={30}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Discretionary Spending</label>
              <Badge variant="secondary">{allocations.discretionary}%</Badge>
            </div>
            <Slider
              value={[allocations.discretionary]}
              onValueChange={(value) => updateAllocation("discretionary", value)}
              max={20}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
