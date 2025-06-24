"use client"

import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"
import { useGlobalCitizenship } from "@/contexts/global-citizenship-context"

export function EnhancedHomeDashboard() {
  const { currentCitizen } = useGlobalCitizenship()

  if (!currentCitizen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-royal-50 to-royal-100 flex items-center justify-center">
        <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-genius-500 mx-auto mb-4" />
            </motion.div>
            <div className="text-illumination-300 font-medium">Loading Citizen Profile...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const citizenshipType = currentCitizen?.type || "individual"

  return (
    <div className="grid gap-4">
      <Card>
        <CardContent>Citizenship Type: {citizenshipType}</CardContent>
      </Card>
    </div>
  )
}
