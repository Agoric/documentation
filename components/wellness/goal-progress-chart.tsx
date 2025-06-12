"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

interface ChartData {
  category: string
  target: number
  current: number
  percentage: number
}

interface GoalProgressChartProps {
  data: ChartData[]
  className?: string
}

export function GoalProgressChart({ data, className }: GoalProgressChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "savings":
        return { fill: "#60a5fa", stroke: "#3b82f6" }
      case "investment":
        return { fill: "#4ade80", stroke: "#22c55e" }
      case "debt":
        return { fill: "#f87171", stroke: "#ef4444" }
      case "purchase":
        return { fill: "#c084fc", stroke: "#a855f7" }
      case "retirement":
        return { fill: "#fbbf24", stroke: "#f59e0b" }
      case "education":
        return { fill: "#818cf8", stroke: "#6366f1" }
      default:
        return { fill: "#94a3b8", stroke: "#64748b" }
    }
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          className="drop-shadow-glow"
          style={{ filter: "drop-shadow(0 0 8px rgba(129, 140, 248, 0.5))" }}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 16}
          fill={fill}
          opacity={0.3}
        />
        <text
          x={cx}
          y={cy - 10}
          dy={8}
          textAnchor="middle"
          fill="#e0e7ff"
          className="text-xs font-medium"
          style={{ textShadow: "0 0 10px rgba(129, 140, 248, 0.7)" }}
        >
          {payload.category.charAt(0).toUpperCase() + payload.category.slice(1)}
        </text>
        <text
          x={cx}
          y={cy + 10}
          dy={8}
          textAnchor="middle"
          fill="#e0e7ff"
          className="text-xs"
          style={{ textShadow: "0 0 10px rgba(129, 140, 248, 0.7)" }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    )
  }

  // Prepare data for the chart
  const chartData = data.map((item) => ({
    name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    value: item.current,
    category: item.category,
    percentage: item.percentage,
    color: getCategoryColor(item.category),
  }))

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-indigo-200">Progress by Category</h4>
      </div>

      <div className="relative h-[250px]">
        {/* Holographic background effect */}
        <div
          className="absolute inset-0 rounded-lg opacity-10"
          style={{
            background:
              "radial-gradient(circle at center, rgba(129, 140, 248, 0.3) 0%, transparent 70%), linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
          }}
        />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {chartData.map((entry, index) => (
                <filter key={`glow-${index}`} id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              ))}
            </defs>
            <Pie
              activeIndex={activeIndex !== null ? activeIndex : undefined}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color.fill}
                  stroke={entry.color.stroke}
                  strokeWidth={2}
                  style={{
                    filter: activeIndex === index ? `url(#glow-${index})` : "none",
                    opacity: activeIndex === null || activeIndex === index ? 1 : 0.6,
                    transition: "opacity 0.3s",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div
                      className="p-2 rounded-md shadow-lg"
                      style={{
                        background: "rgba(15, 23, 42, 0.8)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                        boxShadow: "0 0 15px rgba(139, 92, 246, 0.2)",
                      }}
                    >
                      <p className="text-xs font-medium text-indigo-200">{data.name}</p>
                      <p className="text-xs text-indigo-300">${data.value.toLocaleString()}</p>
                      <p className="text-xs text-indigo-400">{data.percentage}% complete</p>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-2 px-4">
          {chartData.map((entry, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
              style={{
                background: `rgba(${
                  entry.category === "savings"
                    ? "59, 130, 246"
                    : entry.category === "investment"
                      ? "34, 197, 94"
                      : entry.category === "debt"
                        ? "239, 68, 68"
                        : entry.category === "purchase"
                          ? "168, 85, 247"
                          : entry.category === "retirement"
                            ? "245, 158, 11"
                            : entry.category === "education"
                              ? "99, 102, 241"
                              : "100, 116, 139"
                }, 0.2)`,
                border: `1px solid rgba(${
                  entry.category === "savings"
                    ? "59, 130, 246"
                    : entry.category === "investment"
                      ? "34, 197, 94"
                      : entry.category === "debt"
                        ? "239, 68, 68"
                        : entry.category === "purchase"
                          ? "168, 85, 247"
                          : entry.category === "retirement"
                            ? "245, 158, 11"
                            : entry.category === "education"
                              ? "99, 102, 241"
                              : "100, 116, 139"
                }, 0.3)`,
                boxShadow:
                  activeIndex === index
                    ? `0 0 10px rgba(${
                        entry.category === "savings"
                          ? "59, 130, 246"
                          : entry.category === "investment"
                            ? "34, 197, 94"
                            : entry.category === "debt"
                              ? "239, 68, 68"
                              : entry.category === "purchase"
                                ? "168, 85, 247"
                                : entry.category === "retirement"
                                  ? "245, 158, 11"
                                  : entry.category === "education"
                                    ? "99, 102, 241"
                                    : "100, 116, 139"
                      }, 0.5)`
                    : "none",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  background: entry.color.fill,
                  boxShadow: `0 0 5px ${entry.color.stroke}`,
                }}
              />
              <span
                className="text-indigo-200"
                style={{
                  textShadow: activeIndex === index ? "0 0 5px rgba(224, 231, 255, 0.5)" : "none",
                }}
              >
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
