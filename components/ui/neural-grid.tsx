"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeuralGridProps {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  staggerDelay?: number
}

export function NeuralGrid({
  children,
  className,
  columns = 3,
  gap = "md",
  animated = true,
  staggerDelay = 0.1,
}: NeuralGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  }

  const gapClasses = {
    sm: "gap-3",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  }

  const childrenArray = React.Children.toArray(children)

  return (
    <div className={cn("grid", gridCols[columns], gapClasses[gap], className)}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={animated ? { opacity: 0, y: 20, scale: 0.9 } : {}}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: animated ? index * staggerDelay : 0,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
