"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, TrendingUp, Calendar, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { AIWellnessCompanion } from "./ai-wellness-companion"

interface WellnessWidgetProps {
  className?: string
}

export function WellnessWidget({ className }: WellnessWidgetProps) {
  const [stressLevel] = useState(25)
  const [showCompanion, setShowCompanion] = useState(false)

  const getStressColor = (level: number) => {
    if (level < 30) return "bg-green-500"
    if (level < 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <>
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5" />
            Wellness Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Current Stress Level</span>
                </div>
                <span
                  className={cn(
                    "text-sm",
                    stressLevel < 30 ? "text-green-600" : stressLevel < 60 ? "text-amber-600" : "text-red-600",
                  )}
                >
                  {stressLevel}%
                </span>
              </div>
              <Progress value={stressLevel} className={cn("h-2", getStressColor(stressLevel))} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 border rounded-md">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Financial Health</span>
                </div>
                <p className="text-xs text-muted-foreground">Positive trend - 8% improvement this week</p>
              </div>

              <div className="p-2 border rounded-md">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Next Review</span>
                </div>
                <p className="text-xs text-muted-foreground">Financial planning - Friday, 2pm</p>
              </div>
            </div>

            <div className="p-2 border rounded-md bg-amber-50">
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div>
                  <span className="font-medium text-amber-800">Pattern Detected</span>
                  <p className="text-xs text-amber-700">Late night shopping correlates with 52% higher return rates</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowCompanion(true)}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600"
            >
              Open Wellness Companion
            </Button>
          </div>
        </CardContent>
      </Card>
      {showCompanion && <AIWellnessCompanion onClose={() => setShowCompanion(false)} />}
    </>
  )
}
