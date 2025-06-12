"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Atom, Brain, Cpu, RefreshCw, Zap } from "lucide-react"

export function QuantumInsightsPanel() {
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const runQuantumAnalysis = () => {
    setProcessing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setProcessing(false)
          setLastUpdated(new Date())
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  // Auto-run on first load
  useEffect(() => {
    runQuantumAnalysis()
  }, [])

  return (
    <Card className="border-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
              <Atom className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle className="text-lg font-bold">Quantum Insights Engine</CardTitle>
          </div>
          <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10">
            v2.5.0
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg bg-slate-800/50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-medium">Quantum Processing Status</div>
              <div className="text-xs text-blue-300">Last updated: {lastUpdated.toLocaleTimeString()}</div>
            </div>

            {processing ? (
              <div className="space-y-2">
                <Progress value={progress} className="h-2 bg-slate-700" indicatorClassName="bg-blue-500" />
                <div className="flex items-center justify-between text-xs">
                  <span>Processing quantum algorithms...</span>
                  <span>{progress}%</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <Zap className="h-4 w-4" />
                <span>Quantum analysis complete</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-800/50 p-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-400" />
                <div className="text-sm font-medium">Quantum Advantage</div>
              </div>
              <div className="mt-2 text-2xl font-bold text-purple-300">157x</div>
              <div className="text-xs text-slate-400">vs. classical computing</div>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-3">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-emerald-400" />
                <div className="text-sm font-medium">AI Confidence</div>
              </div>
              <div className="mt-2 text-2xl font-bold text-emerald-300">99.7%</div>
              <div className="text-xs text-slate-400">based on quantum data</div>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-3">
            <div className="text-sm font-medium">Key Quantum Insights</div>
            <ul className="mt-2 space-y-1 text-xs text-blue-100">
              <li className="flex items-start gap-1">
                <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                <span>Inventory optimization potential: 23.4% improvement</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                <span>Cross-platform pricing optimization: $45,320 potential revenue increase</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                <span>Supply chain inefficiencies detected: 7 critical points identified</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                <span>Customer sentiment prediction: 89.3% accuracy across platforms</span>
              </li>
            </ul>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            onClick={runQuantumAnalysis}
            disabled={processing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${processing ? "animate-spin" : ""}`} />
            {processing ? "Processing..." : "Run Quantum Analysis"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
