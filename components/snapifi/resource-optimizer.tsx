"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function ResourceOptimizer() {
  const [allocation, setAllocation] = useState({
    realEstate: 45,
    retirement: 25,
    emergency: 15,
    investments: 15,
  })

  const data = [
    { name: "Real Estate", value: allocation.realEstate, color: "#3b82f6" },
    { name: "Retirement", value: allocation.retirement, color: "#10b981" },
    { name: "Emergency Fund", value: allocation.emergency, color: "#f59e0b" },
    { name: "Investments", value: allocation.investments, color: "#8b5cf6" },
  ]

  const handleSliderChange = (category: keyof typeof allocation, value: number[]) => {
    const newValue = value[0]
    const oldValue = allocation[category]
    const difference = newValue - oldValue

    // Redistribute the difference among other categories
    const otherCategories = Object.keys(allocation).filter((key) => key !== category) as (keyof typeof allocation)[]
    const redistributeAmount = -difference / otherCategories.length

    const newAllocation = { ...allocation }
    newAllocation[category] = newValue

    otherCategories.forEach((cat) => {
      newAllocation[cat] = Math.max(0, Math.min(100, newAllocation[cat] + redistributeAmount))
    })

    // Ensure total is 100%
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0)
    if (total !== 100) {
      const adjustment = (100 - total) / otherCategories.length
      otherCategories.forEach((cat) => {
        newAllocation[cat] = Math.max(0, Math.min(100, newAllocation[cat] + adjustment))
      })
    }

    setAllocation(newAllocation)
  }

  const resetToOptimal = () => {
    setAllocation({
      realEstate: 45,
      retirement: 25,
      emergency: 15,
      investments: 15,
    })
  }

  return (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Real Estate</label>
            <span className="text-sm text-muted-foreground">{allocation.realEstate}%</span>
          </div>
          <Slider
            value={[allocation.realEstate]}
            onValueChange={(value) => handleSliderChange("realEstate", value)}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Retirement</label>
            <span className="text-sm text-muted-foreground">{allocation.retirement}%</span>
          </div>
          <Slider
            value={[allocation.retirement]}
            onValueChange={(value) => handleSliderChange("retirement", value)}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Emergency Fund</label>
            <span className="text-sm text-muted-foreground">{allocation.emergency}%</span>
          </div>
          <Slider
            value={[allocation.emergency]}
            onValueChange={(value) => handleSliderChange("emergency", value)}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Investments</label>
            <span className="text-sm text-muted-foreground">{allocation.investments}%</span>
          </div>
          <Slider
            value={[allocation.investments]}
            onValueChange={(value) => handleSliderChange("investments", value)}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <Button onClick={resetToOptimal} variant="outline" className="w-full">
        Reset to Optimal Allocation
      </Button>
    </div>
  )
}
