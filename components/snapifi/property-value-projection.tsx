"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface PropertyValueProjectionProps {
  isPortfolio?: boolean
}

export function PropertyValueProjection({ isPortfolio = false }: PropertyValueProjectionProps) {
  const singlePropertyData = [
    { year: 2025, value: 450000, equity: 90000, mortgage: 360000 },
    { year: 2026, value: 468000, equity: 108000, mortgage: 345000 },
    { year: 2027, value: 487440, equity: 142440, mortgage: 330000 },
    { year: 2028, value: 507738, equity: 177738, mortgage: 315000 },
    { year: 2029, value: 529048, equity: 214048, mortgage: 300000 },
    { year: 2030, value: 551250, equity: 251250, mortgage: 285000 },
  ]

  const portfolioData = [
    { year: 2025, totalValue: 250000, monthlyIncome: 1250, properties: 1 },
    { year: 2026, totalValue: 535000, monthlyIncome: 2700, properties: 2 },
    { year: 2027, totalValue: 865000, monthlyIncome: 4300, properties: 3 },
    { year: 2028, totalValue: 1245000, monthlyIncome: 6100, properties: 4 },
    { year: 2029, totalValue: 1680000, monthlyIncome: 7850, properties: 5 },
    { year: 2030, totalValue: 2175000, monthlyIncome: 9750, properties: 5 },
  ]

  const data = isPortfolio ? portfolioData : singlePropertyData

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}:{" "}
              {entry.dataKey === "monthlyIncome"
                ? `$${entry.value.toLocaleString()}/mo`
                : entry.dataKey === "properties"
                  ? `${entry.value} properties`
                  : `$${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {isPortfolio ? (
            <>
              <Line
                type="monotone"
                dataKey="totalValue"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Total Portfolio Value"
              />
              <Line
                type="monotone"
                dataKey="monthlyIncome"
                stroke="#10b981"
                strokeWidth={2}
                name="Monthly Income"
                yAxisId="right"
              />
            </>
          ) : (
            <>
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Property Value" />
              <Line type="monotone" dataKey="equity" stroke="#10b981" strokeWidth={2} name="Equity" />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
