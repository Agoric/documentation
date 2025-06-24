"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate realistic forecasting data with confidence intervals
const generateForecastData = (days: number) => {
  const data = []
  const today = new Date()

  // Historical data (past 30 days)
  for (let i = 30; i > 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Base value with some randomness
    const baseValue = 500 + Math.random() * 100
    // Add some weekly patterns
    const dayOfWeek = date.getDay()
    const weekendEffect = dayOfWeek === 0 || dayOfWeek === 6 ? -50 : 0

    data.push({
      date: date.toISOString().split("T")[0],
      actual: Math.round(baseValue + weekendEffect),
      forecast: null,
      upperBound: null,
      lowerBound: null,
      isHistorical: true,
    })
  }

  // Forecast data
  let lastValue = data[data.length - 1].actual
  for (let i = 1; i <= days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)

    // Base trend with some randomness
    const trend = 1 + (Math.random() * 0.04 - 0.01) // -1% to +3% daily change
    lastValue = lastValue * trend

    // Add some weekly patterns
    const dayOfWeek = date.getDay()
    const weekendEffect = dayOfWeek === 0 || dayOfWeek === 6 ? 0.9 : 1

    // Add some seasonality (higher in middle of month)
    const dayOfMonth = date.getDate()
    const monthEffect = dayOfMonth > 10 && dayOfMonth < 20 ? 1.05 : 1

    const forecastValue = Math.round(lastValue * weekendEffect * monthEffect)

    // Confidence interval widens over time
    const confidenceInterval = Math.round(forecastValue * (0.05 + i * 0.005))

    data.push({
      date: date.toISOString().split("T")[0],
      actual: null,
      forecast: forecastValue,
      upperBound: forecastValue + confidenceInterval,
      lowerBound: forecastValue - confidenceInterval,
      isHistorical: false,
    })
  }

  return data
}

interface ForecastChartProps {
  days: number
}

export function ForecastChart({ days }: ForecastChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setData(generateForecastData(days))
      setLoading(false)
    }, 1000)
  }, [days])

  if (loading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload
      const date = new Date(dataPoint.date)
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })

      return (
        <Card className="p-3 shadow-lg border border-border bg-background">
          <p className="font-medium">{formattedDate}</p>
          {dataPoint.isHistorical ? (
            <p className="text-sm">
              Actual: <span className="font-medium">{dataPoint.actual} units</span>
            </p>
          ) : (
            <>
              <p className="text-sm">
                Forecast: <span className="font-medium">{dataPoint.forecast} units</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Range: {dataPoint.lowerBound} - {dataPoint.upperBound} units
              </p>
            </>
          )}
        </Card>
      )
    }
    return null
  }

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex items-center gap-4">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
          Historical
        </Badge>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          Forecast
        </Badge>
        <Badge variant="outline" className="bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
          Confidence Interval
        </Badge>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} tickCount={7} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Historical"
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Forecast"
          />
          <Line
            type="monotone"
            dataKey="upperBound"
            stroke="#9ca3af"
            strokeWidth={1}
            dot={false}
            activeDot={false}
            name="Upper Bound"
          />
          <Line
            type="monotone"
            dataKey="lowerBound"
            stroke="#9ca3af"
            strokeWidth={1}
            dot={false}
            activeDot={false}
            name="Lower Bound"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
