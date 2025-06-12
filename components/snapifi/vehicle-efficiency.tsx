"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function VehicleEfficiency() {
  const efficiencyData = [
    { month: "Jan", mpg: 30.2, cost: 210 },
    { month: "Feb", mpg: 29.8, cost: 215 },
    { month: "Mar", mpg: 30.5, cost: 205 },
    { month: "Apr", mpg: 31.2, cost: 195 },
    { month: "May", mpg: 32.5, cost: 185 },
    { month: "Jun", mpg: 33.0, cost: 180 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={efficiencyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
        <YAxis yAxisId="left" orientation="left" domain={[25, 35]} tick={{ fontSize: 10 }} />
        <YAxis yAxisId="right" orientation="right" domain={[150, 250]} tick={{ fontSize: 10 }} />
        <Tooltip />
        <Line yAxisId="left" type="monotone" dataKey="mpg" name="MPG" stroke="#8884d8" strokeWidth={2} dot={{ r: 2 }} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="cost"
          name="Monthly Cost"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
