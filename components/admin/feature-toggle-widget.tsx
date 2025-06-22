"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { featureToggleManager, type FeatureToggle } from "@/lib/feature-toggle-system"
import { Settings, Zap, Crown, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface FeatureToggleWidgetProps {
  maxFeatures?: number
  showCategories?: string[]
  compact?: boolean
}

export function FeatureToggleWidget({
  maxFeatures = 10,
  showCategories = [],
  compact = false,
}: FeatureToggleWidgetProps) {
  const [features, setFeatures] = useState<FeatureToggle[]>([])
  const [statistics, setStatistics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Memoize the change handler to prevent recreation on every render
  const handleChange = useCallback(() => {
    try {
      let allFeatures = featureToggleManager.getAllFeatures()

      // Filter by categories if specified
      if (showCategories.length > 0) {
        allFeatures = allFeatures.filter((f) => showCategories.includes(f.category))
      }

      // Limit number of features
      const limitedFeatures = allFeatures.slice(0, maxFeatures)

      setFeatures(limitedFeatures)
      setStatistics(featureToggleManager.getStatistics())
    } catch (error) {
      console.error("Error updating features:", error)
    }
  }, [maxFeatures, showCategories])

  useEffect(() => {
    // Initial load
    handleChange()
    setIsLoading(false)

    // Add listener
    featureToggleManager.addChangeListener(handleChange)

    // Cleanup
    return () => {
      featureToggleManager.removeChangeListener(handleChange)
    }
  }, [handleChange])

  const handleToggle = useCallback((featureId: string, enabled: boolean) => {
    try {
      featureToggleManager.toggleFeature(featureId, enabled, "widget")
    } catch (error) {
      console.error("Failed to toggle feature:", error)
    }
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-amber-400/20">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-purple-600/30 rounded"></div>
            <div className="h-4 bg-purple-600/30 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (compact) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-amber-400/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-amber-300 text-sm flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Quick Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {features.slice(0, 5).map((feature) => (
            <div key={feature.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-purple-200 text-xs">{feature.name}</span>
                {feature.betaFeature && <Sparkles className="w-3 h-3 text-blue-400" />}
                {feature.premiumFeature && <Crown className="w-3 h-3 text-yellow-400" />}
              </div>
              <Switch checked={feature.enabled} onCheckedChange={(enabled) => handleToggle(feature.id, enabled)} />
            </div>
          ))}
          {statistics && (
            <div className="pt-2 border-t border-purple-600/30">
              <div className="text-xs text-purple-300">
                {statistics.enabled}/{statistics.total} features enabled
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-amber-300 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Feature Controls
          </CardTitle>
          {statistics && (
            <Badge variant="outline" className="text-amber-400 border-amber-400">
              {statistics.enabled}/{statistics.total} Active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-purple-800/20 rounded-lg hover:bg-purple-800/30 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-amber-300 text-sm font-medium">{feature.name}</h4>
                <div className="flex space-x-1">
                  {feature.betaFeature && (
                    <Badge variant="secondary" className="text-xs bg-blue-600">
                      Beta
                    </Badge>
                  )}
                  {feature.premiumFeature && (
                    <Badge variant="secondary" className="text-xs bg-yellow-600">
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-purple-200 text-xs">{feature.description}</p>
              <Badge variant="outline" className="text-xs mt-1">
                {feature.category}
              </Badge>
            </div>
            <Switch checked={feature.enabled} onCheckedChange={(enabled) => handleToggle(feature.id, enabled)} />
          </motion.div>
        ))}

        <div className="pt-3 border-t border-purple-600/30">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-purple-800/30 border-purple-600 text-purple-100"
            onClick={() => window.open("/admin/features", "_blank")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Manage All Features
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
