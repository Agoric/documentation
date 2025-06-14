"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PropertyValueProjectionProps {
  isPortfolio?: boolean
}

export function PropertyValueProjection({ isPortfolio = false }: PropertyValueProjectionProps) {
  const singlePropertyData = [
    { year: 2025, value: 450000, equity: 90000 },
    { year: 2026, value: 468000, equity: 108000 },
    { year: 2027, value: 487440, equity: 127440 },
    { year: 2028, value: 507738, equity: 147738 },
    { year: 2029, value: 529048, equity: 169048 },
    { year: 2030, value: 551250, equity: 191250 },
  ]

  const portfolioData = [
    { year: 2025, income: 1250, properties: 1 },
    { year: 2026, income: 2700, properties: 2 },
    { year: 2027, income: 4300, properties: 3 },
    { year: 2028, income: 6000, properties: 4 },
    { year: 2029, income: 7850, properties: 5 },
    { year: 2030, income: 8500, properties: 5 },
  ]

  const data = isPortfolio ? portfolioData : singlePropertyData

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => [
            isPortfolio ? `$${value}/month` : `$${value.toLocaleString()}`,
            isPortfolio
              ? name === "income"
                ? "Monthly Income"
                : "Properties"
              : name === "value"
                ? "Property Value"
                : "Equity",
          ]}
        />
        {isPortfolio ? (
          <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
        ) : (
          <>
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
            <Line type="monotone" dataKey="equity" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
