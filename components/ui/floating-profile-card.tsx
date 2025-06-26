"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { User, ChevronUp, RefreshCw, Check } from "lucide-react"

interface FloatingProfileCardProps {
  overallProgress: {
    progress: number
    status: string
    onTrack: number
    atRisk: number
    behind: number
    total: number
  }
}

export function FloatingProfileCard({ overallProgress }: FloatingProfileCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-emerald-500/50 shadow-lg"
      case "at-risk":
        return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-yellow-500/50 shadow-lg"
      case "behind":
        return "bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-red-500/50 shadow-lg"
      default:
        return "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-blue-500/50 shadow-lg"
    }
  }

  return (
    <div
      className="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Card
        className={`bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border-white/20 shadow-2xl transition-all duration-300 ${
          isExpanded ? "w-80 h-auto" : "w-16 h-16"
        }`}
      >
        <CardContent className="p-4">
          {!isExpanded ? (
            <div className="flex items-center justify-center w-8 h-8">
              <User className="h-6 w-6 text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Financial Profile</h3>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                  </div>
                </div>
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Progress</span>
                  <span className="font-medium">{overallProgress.progress.toFixed(1)}%</span>
                </div>

                <div className="relative">
                  <Progress value={overallProgress.progress} className="h-3 bg-white/10" />
                  <div
                    className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressBarColor(overallProgress.status)}`}
                    style={{ width: `${overallProgress.progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-emerald-500">{overallProgress.onTrack}</div>
                    <div className="text-muted-foreground">On Track</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-yellow-500">{overallProgress.atRisk}</div>
                    <div className="text-muted-foreground">At Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-red-500">{overallProgress.behind}</div>
                    <div className="text-muted-foreground">Behind</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Recalculate
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Check className="h-3 w-3 mr-1" />
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
