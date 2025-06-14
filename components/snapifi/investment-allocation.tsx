"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function InvestmentAllocation() {
  const data = [
    { name: "Real Estate Down Payment", value: 45, color: "#3b82f6" },
    { name: "Retirement (401k/IRA)", value: 25, color: "#10b981" },
    { name: "Emergency Fund", value: 15, color: "#f59e0b" },
    { name: "Stock Investments", value: 10, color: "#8b5cf6" },
    { name: "Crypto/Alternative", value: 5, color: "#ef4444" },
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value}% (${((data.value / 100) * 8500).toLocaleString()}/month)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => <span style={{ color: entry.color, fontSize: "12px" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
