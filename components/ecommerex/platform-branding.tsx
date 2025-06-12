"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Cpu, Fingerprint, LineChart, Sparkles, Wand2 } from "lucide-react"
import { motion } from "framer-motion"

interface PlatformBrandingProps {
  platform: string
  className?: string
}

export function PlatformBranding({ platform, className }: PlatformBrandingProps) {
  const [mood, setMood] = useState<string>("neutral")
  const [confidence, setConfidence] = useState<number>(85)

  // Simulate mood analysis
  useEffect(() => {
    const moods = ["focused", "optimistic", "analytical", "cautious", "enthusiastic"]
    const interval = setInterval(() => {
      setMood(moods[Math.floor(Math.random() * moods.length)])
      setConfidence(Math.floor(Math.random() * 15) + 80) // 80-95% confidence
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const getBrandColor = (platform: string) => {
    const colors = {
      amazon: "from-blue-600 to-teal-500",
      ebay: "from-indigo-600 to-purple-500",
      shopify: "from-emerald-600 to-green-500",
      etsy: "from-amber-600 to-orange-500",
      walmart: "from-blue-600 to-sky-500",
      website: "from-violet-600 to-fuchsia-500",
      default: "from-slate-700 to-slate-900",
    }
    return colors[platform.toLowerCase() as keyof typeof colors] || colors.default
  }

  const getBrandIcon = (platform: string) => {
    const icons = {
      amazon: <Cpu className="h-5 w-5" />,
      ebay: <LineChart className="h-5 w-5" />,
      shopify: <Sparkles className="h-5 w-5" />,
      etsy: <Wand2 className="h-5 w-5" />,
      walmart: <Fingerprint className="h-5 w-5" />,
      website: <Brain className="h-5 w-5" />,
    }
    return icons[platform.toLowerCase() as keyof typeof icons] || <Cpu className="h-5 w-5" />
  }

  const getMoodColor = (mood: string) => {
    const colors = {
      focused: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      optimistic: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      analytical: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      cautious: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      enthusiastic: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      neutral: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
    }
    return colors[mood.toLowerCase() as keyof typeof colors] || colors.neutral
  }

  const getMoodDescription = (mood: string) => {
    const descriptions = {
      focused: "You're in a detail-oriented state. Recommendations will be precise and thorough.",
      optimistic: "You're feeling positive. We'll highlight growth opportunities and potential gains.",
      analytical: "You're in a data-driven mindset. We'll provide in-depth metrics and analysis.",
      cautious: "You're being careful. We'll emphasize risk management and conservative approaches.",
      enthusiastic: "You're energetic. We'll showcase innovative features and exciting possibilities.",
      neutral: "We're analyzing your current mood to provide tailored insights.",
    }
    return descriptions[mood.toLowerCase() as keyof typeof descriptions] || descriptions.neutral
  }

  return (
    <Card className={`overflow-hidden border-0 shadow-lg ${className}`}>
      <div className={`bg-gradient-to-r ${getBrandColor(platform)} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getBrandIcon(platform)}
            <h3 className="text-lg font-bold">{platform} Quantum Hub</h3>
          </div>
          <Badge variant="outline" className="border-white/20 bg-white/10 text-white">
            Quantum Enhanced
          </Badge>
        </div>
        <p className="mt-1 text-sm text-white/80">Data-driven insights powered by quantum algorithms and advanced AI</p>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">AI Mood Analysis</div>
            <Badge variant="secondary" className={`mt-1 ${getMoodColor(mood)}`}>
              {mood.charAt(0).toUpperCase() + mood.slice(1)} ({confidence}% confidence)
            </Badge>
          </div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          >
            <Brain className="h-5 w-5 text-white" />
          </motion.div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{getMoodDescription(mood)}</p>
      </CardContent>
    </Card>
  )
}
