"use client"

import { motion } from "framer-motion"
import { HolographicInvestmentImage } from "./holographic-investment-image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const investmentClasses = [
  {
    class: "QGI" as const,
    name: "QUICA Global Index",
    description: "Diversified global investment index with quantum-enhanced analytics",
    riskLevel: "Moderate",
    minInvestment: "$2,500",
    expectedReturn: "8-12%",
  },
  {
    class: "QBF" as const,
    name: "QUICA Bond Fund",
    description: "Premium government and corporate bond portfolio",
    riskLevel: "Low",
    minInvestment: "$1,800",
    expectedReturn: "4-6%",
  },
  {
    class: "QEF" as const,
    name: "QUICA Equity Fund",
    description: "High-growth equity portfolio with blue-chip stocks",
    riskLevel: "High",
    minInvestment: "$5,200",
    expectedReturn: "12-18%",
  },
  {
    class: "QCF" as const,
    name: "QUICA Crypto Fund",
    description: "Diversified cryptocurrency portfolio",
    riskLevel: "Very High",
    minInvestment: "$3,000",
    expectedReturn: "15-25%",
  },
  {
    class: "QRF" as const,
    name: "QUICA Real Estate Fund",
    description: "Global real estate investment trust",
    riskLevel: "Moderate",
    minInvestment: "$12,500",
    expectedReturn: "6-10%",
  },
  {
    class: "QCM" as const,
    name: "QUICA Commodity Market",
    description: "Precious metals and commodities investment",
    riskLevel: "Moderate",
    minInvestment: "$800",
    expectedReturn: "5-9%",
  },
  {
    class: "QIF" as const,
    name: "QUICA Innovation Fund",
    description: "Technology and innovation-focused investment",
    riskLevel: "High",
    minInvestment: "$1,500",
    expectedReturn: "10-20%",
  },
  {
    class: "QSF" as const,
    name: "QUICA Sustainable Fund",
    description: "ESG-focused sustainable investment portfolio",
    riskLevel: "Moderate",
    minInvestment: "$3,200",
    expectedReturn: "7-11%",
  },
]

export function InvestmentClassShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent mb-4">
            QUICA Investment Classes
          </h1>
          <p className="text-amber-300/80 text-lg font-serif italic">
            Holographic Superior Authority Investment Visualization
          </p>
          <p className="text-purple-200/60 text-sm font-serif italic mt-2">
            Visualizatio Investimenti Auctoritatis Supremae
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {investmentClasses.map((investment, index) => (
            <motion.div
              key={investment.class}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <HolographicInvestmentImage investmentClass={investment.class} size="md" animated={true} />
                  </div>
                  <CardTitle className="text-amber-300 text-lg font-bold">{investment.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-purple-200/80 text-sm">{investment.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-300/80 text-sm">Risk Level:</span>
                      <Badge
                        className={`text-xs ${
                          investment.riskLevel === "Low"
                            ? "bg-green-600/20 text-green-300 border-green-500/30"
                            : investment.riskLevel === "Moderate"
                              ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/30"
                              : investment.riskLevel === "High"
                                ? "bg-orange-600/20 text-orange-300 border-orange-500/30"
                                : "bg-red-600/20 text-red-300 border-red-500/30"
                        }`}
                      >
                        {investment.riskLevel}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-amber-300/80 text-sm">Min Investment:</span>
                      <span className="text-purple-200 font-semibold text-sm">{investment.minInvestment}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-amber-300/80 text-sm">Expected Return:</span>
                      <span className="text-green-300 font-semibold text-sm">{investment.expectedReturn}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm rounded-lg p-8 border border-amber-500/20">
            <h2 className="text-2xl font-bold text-amber-300 mb-4">Superior Authority Holographic Technology</h2>
            <p className="text-purple-200/80 mb-4">
              Each investment class features unique holographic laser-lit visualization with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-amber-300/80">
                <strong>Dynamic Color Coding:</strong> Each class has distinct color schemes for instant recognition
              </div>
              <div className="text-amber-300/80">
                <strong>Laser Scanning Effects:</strong> Continuous holographic scanning animations
              </div>
              <div className="text-amber-300/80">
                <strong>Interactive Patterns:</strong> Unique visual patterns representing each investment type
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
