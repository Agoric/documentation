"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock, Calendar } from "lucide-react"

export function PropertyAcquisitionTimeline() {
  const timelineSteps = [
    {
      id: 1,
      title: "Down Payment Savings",
      description: "Accumulate $90,000 for 20% down payment",
      status: "in-progress",
      progress: 68,
      targetDate: "Jan 2026",
      completed: false,
    },
    {
      id: 2,
      title: "Pre-Approval Process",
      description: "Complete mortgage pre-approval application",
      status: "pending",
      progress: 0,
      targetDate: "Dec 2025",
      completed: false,
    },
    {
      id: 3,
      title: "Property Search",
      description: "Find and evaluate potential properties",
      status: "pending",
      progress: 0,
      targetDate: "Jan 2026",
      completed: false,
    },
    {
      id: 4,
      title: "Property Purchase",
      description: "Complete home purchase and closing",
      status: "pending",
      progress: 0,
      targetDate: "Feb 2026",
      completed: false,
    },
    {
      id: 5,
      title: "First Income Property",
      description: "Acquire first rental property",
      status: "future",
      progress: 0,
      targetDate: "Mar 2026",
      completed: false,
    },
  ]

  return (
    <div className="space-y-4">
      {timelineSteps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.status === "completed"
                  ? "bg-green-100 text-green-600"
                  : step.status === "in-progress"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.completed ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : step.status === "in-progress" ? (
                <Clock className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </div>
            {index < timelineSteps.length - 1 && <div className="w-px h-12 bg-gray-200 mt-2" />}
          </div>
          <div className="flex-1 pb-8">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{step.title}</h4>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    step.status === "completed" ? "default" : step.status === "in-progress" ? "secondary" : "outline"
                  }
                >
                  {step.status === "completed" ? "Complete" : step.status === "in-progress" ? "In Progress" : "Pending"}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {step.targetDate}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
            {step.status === "in-progress" && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${step.progress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
