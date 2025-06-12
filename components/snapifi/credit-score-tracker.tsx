"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { ArrowUp } from "lucide-react"

export function CreditScoreTracker() {
  const creditData = [
    { month: "Jun", score: 680 },
    { month: "Jul", score: 685 },
    { month: "Aug", score: 695 },
    { month: "Sep", score: 705 },
    { month: "Oct", score: 715 },
    { month: "Nov", score: 725 },
    { month: "Dec", score: 742 },
  ]

  const getScoreCategory = (score: number) => {
    if (score >= 800) return { label: "Excellent", color: "bg-green-100 text-green-800 border-green-200" }
    if (score >= 740) return { label: "Very Good", color: "bg-green-100 text-green-800 border-green-200" }
    if (score >= 670) return { label: "Good", color: "bg-blue-100 text-blue-800 border-blue-200" }
    if (score >= 580) return { label: "Fair", color: "bg-amber-100 text-amber-800 border-amber-200" }
    return { label: "Poor", color: "bg-red-100 text-red-800 border-red-200" }
  }

  const currentScore = creditData[creditData.length - 1].score
  const previousScore = creditData[creditData.length - 2].score
  const scoreChange = currentScore - previousScore
  const scoreCategory = getScoreCategory(currentScore)

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-3xl font-bold">{currentScore}</div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={scoreCategory.color}>
              {scoreCategory.label}
            </Badge>
            <div className="text-xs text-green-600 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              {scoreChange} pts
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">Next Update</div>
          <div className="text-sm text-muted-foreground">June 15, 2023</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={creditData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis domain={[650, 800]} tick={{ fontSize: 10 }} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
