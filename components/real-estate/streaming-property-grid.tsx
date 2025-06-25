"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Play, Square, RotateCcw, Zap, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { HolographicPropertyCard } from "./holographic-property-card"
import { useStreamingProperties } from "@/hooks/use-streaming-properties"

interface StreamingPropertyGridProps {
  location?: string
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  batchSize?: number
  viewMode?: "grid" | "list"
}

export function StreamingPropertyGrid({
  location = "Los Angeles, CA",
  minPrice,
  maxPrice,
  propertyType,
  batchSize = 5,
  viewMode = "grid",
}: StreamingPropertyGridProps) {
  const {
    properties,
    loading,
    error,
    status,
    isDemo,
    progress,
    isComplete,
    startStreaming,
    stopStreaming,
    clearProperties,
  } = useStreamingProperties({
    location,
    minPrice,
    maxPrice,
    propertyType,
    batchSize,
  })

  const progressPercentage = progress.total > 0 ? (progress.current / progress.total) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Streaming Controls */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Live Property Stream</h3>
            </div>
            {isDemo && (
              <Badge variant="outline" className="border-amber-400/30 text-amber-300">
                Demo Mode
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!loading && !isComplete && (
              <Button
                onClick={startStreaming}
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Stream
              </Button>
            )}

            {loading && (
              <Button
                onClick={stopStreaming}
                variant="outline"
                className="border-red-400/30 text-red-300 hover:bg-red-400/10"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Stream
              </Button>
            )}

            {(isComplete || error) && (
              <Button
                onClick={() => {
                  clearProperties()
                  startStreaming()
                }}
                variant="outline"
                className="border-green-400/30 text-green-300 hover:bg-green-400/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
            )}
          </div>
        </div>

        {/* Status and Progress */}
        {(loading || status) && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-indigo-200/80">{status}</span>
              <span className="text-cyan-300">
                {progress.current} {progress.total > 0 && `/ ${progress.total}`} properties
              </span>
            </div>

            {loading && (
              <div className="space-y-2">
                <Progress value={progressPercentage} className="h-2 bg-white/10" />
                <div className="flex items-center gap-2 text-xs text-indigo-200/60">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  Streaming live property data...
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Streaming Stats */}
      {properties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-2xl font-bold text-white">{properties.length}</p>
                <p className="text-cyan-200/70 text-sm">Properties Loaded</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{properties.filter((p) => p.isHolographic).length}</p>
                <p className="text-purple-200/70 text-sm">Premium Properties</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 backdrop-blur-sm border border-green-400/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-900 font-bold text-sm">$</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  $
                  {properties.length > 0
                    ? Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length / 1000)
                    : 0}
                  K
                </p>
                <p className="text-green-200/70 text-sm">Avg Price</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        }`}
      >
        <AnimatePresence>
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <HolographicPropertyCard property={property} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {!loading && properties.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Ready to Stream Properties</h3>
          <p className="text-indigo-200/70 mb-4">
            Click "Start Stream" to begin loading live property data from Zillow
          </p>
          <Button
            onClick={startStreaming}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Streaming
          </Button>
        </div>
      )}
    </div>
  )
}
