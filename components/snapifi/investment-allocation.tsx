"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function InvestmentAllocation() {
  const data = [
    { name: "Real Estate Down Payment", value: 45, color: "#3b82f6" },
    { name: "Emergency Fund", value: 20, color: "#10b981" },
    { name: "Retirement (401k)", value: 15, color: "#f59e0b" },
    { name: "Stock Investments", value: 12, color: "#8b5cf6" },
    { name: "High-Yield Savings", value: 8, color: "#ef4444" },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={100} paddingAngle={2} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "12px" }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
