"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  featureToggleManager,
  FEATURE_CATEGORIES,
  type FeatureToggle,
  type FeatureCategory,
} from "@/lib/feature-toggle-system"
import {
  Settings,
  Search,
  Filter,
  Download,
  Crown,
  RefreshCw,
  BarChart3,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FeatureToggleDashboard() {
  const [features, setFeatures] = useState<FeatureToggle[]>([])
  const [filteredFeatures, setFilteredFeatures] = useState<FeatureToggle[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnlyEnabled, setShowOnlyEnabled] = useState(false)
  const [showOnlyBeta, setShowOnlyBeta] = useState(false)
  const [showOnlyPremium, setShowOnlyPremium] = useState(false)
  const [statistics, setStatistics] = useState<any>(null)

  useEffect(() => {
    // Load initial features
    const allFeatures = featureToggleManager.getAllFeatures()
    setFeatures(allFeatures)
    setFilteredFeatures(allFeatures)
    setStatistics(featureToggleManager.getStatistics())

    // Listen for feature changes
    const handleFeatureChange = () => {
      const updatedFeatures = featureToggleManager.getAllFeatures()
      setFeatures(updatedFeatures)
      setStatistics(featureToggleManager.getStatistics())
    }

    featureToggleManager.addChangeListener(handleFeatureChange)

    return () => {
      featureToggleManager.removeChangeListener(handleFeatureChange)
    }
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = features

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((f) => f.category === selectedCategory)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(query) ||
          f.description.toLowerCase().includes(query) ||
          f.category.toLowerCase().includes(query),
      )
    }

    // Status filters
    if (showOnlyEnabled) {
      filtered = filtered.filter((f) => f.enabled)
    }

    if (showOnlyBeta) {
      filtered = filtered.filter((f) => f.betaFeature)
    }

    if (showOnlyPremium) {
      filtered = filtered.filter((f) => f.premiumFeature)
    }

    setFilteredFeatures(filtered)
  }, [features, selectedCategory, searchQuery, showOnlyEnabled, showOnlyBeta, showOnlyPremium])

  const handleToggleFeature = (featureId: string, enabled: boolean) => {
    try {
      featureToggleManager.toggleFeature(featureId, enabled, "admin")
    } catch (error) {
      console.error("Failed to toggle feature:", error)
      // You could show a toast notification here
    }
  }

  const handleBulkToggle = (featureIds: string[], enabled: boolean) => {
    featureToggleManager.bulkToggleFeatures(featureIds, enabled, "admin")
  }

  const handleCategoryToggle = (category: string, enabled: boolean) => {
    if (enabled) {
      featureToggleManager.enableCategoryFeatures(category, "admin")
    } else {
      featureToggleManager.disableCategoryFeatures(category, "admin")
    }
  }

  const exportConfiguration = () => {
    const config = featureToggleManager.exportConfiguration()
    const blob = new Blob([config], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "snapifi-feature-configuration.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Settings className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-amber-300 font-serif">Feature Toggle Dashboard</h1>
          </div>
          <p className="text-purple-200 font-serif tracking-wider">COMPREHENSIVE FEATURE MANAGEMENT SYSTEM</p>
        </motion.div>

        {/* Statistics Overview */}
        {statistics && (
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-amber-300 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Platform Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="text-center p-3 bg-purple-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-amber-300">{statistics.total}</div>
                  <div className="text-purple-200 text-sm">Total Features</div>
                </div>
                <div className="text-center p-3 bg-green-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{statistics.enabled}</div>
                  <div className="text-purple-200 text-sm">Enabled</div>
                </div>
                <div className="text-center p-3 bg-red-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">{statistics.disabled}</div>
                  <div className="text-purple-200 text-sm">Disabled</div>
                </div>
                <div className="text-center p-3 bg-blue-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{statistics.betaFeatures}</div>
                  <div className="text-purple-200 text-sm">Beta Features</div>
                </div>
                <div className="text-center p-3 bg-yellow-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{statistics.premiumFeatures}</div>
                  <div className="text-purple-200 text-sm">Premium</div>
                </div>
                <div className="text-center p-3 bg-orange-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{statistics.requiresRestart}</div>
                  <div className="text-purple-200 text-sm">Needs Restart</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-amber-300 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Controls & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <Label className="text-purple-200">Search Features</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <Input
                    placeholder="Search features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-purple-800/30 border-purple-600 text-purple-100"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Label className="text-purple-200">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {FEATURE_CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filters */}
              <div className="space-y-3">
                <Label className="text-purple-200">Status Filters</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="enabled-only" checked={showOnlyEnabled} onCheckedChange={setShowOnlyEnabled} />
                    <Label htmlFor="enabled-only" className="text-purple-200 text-sm">
                      Enabled Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="beta-only" checked={showOnlyBeta} onCheckedChange={setShowOnlyBeta} />
                    <Label htmlFor="beta-only" className="text-purple-200 text-sm">
                      Beta Features
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="premium-only" checked={showOnlyPremium} onCheckedChange={setShowOnlyPremium} />
                    <Label htmlFor="premium-only" className="text-purple-200 text-sm">
                      Premium Features
                    </Label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Label className="text-purple-200">Actions</Label>
                <div className="space-y-2">
                  <Button
                    onClick={exportConfiguration}
                    variant="outline"
                    size="sm"
                    className="w-full bg-purple-800/30 border-purple-600 text-purple-100"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Config
                  </Button>
                  <Button
                    onClick={() =>
                      handleBulkToggle(
                        filteredFeatures.map((f) => f.id),
                        true,
                      )
                    }
                    variant="outline"
                    size="sm"
                    className="w-full bg-green-800/30 border-green-600 text-green-100"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Enable All
                  </Button>
                  <Button
                    onClick={() =>
                      handleBulkToggle(
                        filteredFeatures.map((f) => f.id),
                        false,
                      )
                    }
                    variant="outline"
                    size="sm"
                    className="w-full bg-red-800/30 border-red-600 text-red-100"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Disable All
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Management Tabs */}
        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-purple-800/30">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <FeatureGridView features={filteredFeatures} onToggleFeature={handleToggleFeature} />
          </TabsContent>

          <TabsContent value="categories">
            <FeatureCategoryView
              categories={FEATURE_CATEGORIES}
              onToggleFeature={handleToggleFeature}
              onCategoryToggle={handleCategoryToggle}
            />
          </TabsContent>

          <TabsContent value="list">
            <FeatureListView features={filteredFeatures} onToggleFeature={handleToggleFeature} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function FeatureGridView({
  features,
  onToggleFeature,
}: {
  features: FeatureToggle[]
  onToggleFeature: (id: string, enabled: boolean) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence>
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <FeatureCard feature={feature} onToggle={onToggleFeature} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function FeatureCategoryView({
  categories,
  onToggleFeature,
  onCategoryToggle,
}: {
  categories: FeatureCategory[]
  onToggleFeature: (id: string, enabled: boolean) => void
  onCategoryToggle: (category: string, enabled: boolean) => void
}) {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <Card
          key={category.id}
          className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-${category.color}-500/20`}>
                  {/* Icon would be rendered here based on category.icon */}
                  <Settings className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-amber-300">{category.name}</CardTitle>
                  <CardDescription className="text-purple-200">{category.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => onCategoryToggle(category.name, true)}
                  size="sm"
                  variant="outline"
                  className="bg-green-800/30 border-green-600 text-green-100"
                >
                  Enable All
                </Button>
                <Button
                  onClick={() => onCategoryToggle(category.name, false)}
                  size="sm"
                  variant="outline"
                  className="bg-red-800/30 border-red-600 text-red-100"
                >
                  Disable All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} onToggle={onToggleFeature} compact />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function FeatureListView({
  features,
  onToggleFeature,
}: {
  features: FeatureToggle[]
  onToggleFeature: (id: string, enabled: boolean) => void
}) {
  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-amber-300">Feature List</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-2">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between p-3 bg-purple-800/20 rounded-lg hover:bg-purple-800/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-amber-300 font-medium">{feature.name}</h4>
                    <div className="flex space-x-1">
                      {feature.betaFeature && (
                        <Badge variant="secondary" className="text-xs bg-blue-600">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Beta
                        </Badge>
                      )}
                      {feature.premiumFeature && (
                        <Badge variant="secondary" className="text-xs bg-yellow-600">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      {feature.requiresRestart && (
                        <Badge variant="secondary" className="text-xs bg-orange-600">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Restart
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-purple-200 text-sm">{feature.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {feature.category}
                    </Badge>
                    {feature.subcategory && (
                      <Badge variant="outline" className="text-xs">
                        {feature.subcategory}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={(enabled) => onToggleFeature(feature.id, enabled)}
                  />
                  {feature.enabled ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function FeatureCard({
  feature,
  onToggle,
  compact = false,
}: {
  feature: FeatureToggle
  onToggle: (id: string, enabled: boolean) => void
  compact?: boolean
}) {
  return (
    <Card
      className={`bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-amber-400/20 backdrop-blur-sm hover:border-amber-400/40 transition-all duration-200 ${feature.enabled ? "ring-1 ring-green-400/30" : ""}`}
    >
      <CardHeader className={compact ? "pb-2" : ""}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <CardTitle className={`text-amber-300 ${compact ? "text-sm" : "text-base"}`}>{feature.name}</CardTitle>
              {feature.enabled && <CheckCircle className="w-4 h-4 text-green-400" />}
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {feature.betaFeature && (
                <Badge variant="secondary" className="text-xs bg-blue-600">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Beta
                </Badge>
              )}
              {feature.premiumFeature && (
                <Badge variant="secondary" className="text-xs bg-yellow-600">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
              {feature.requiresRestart && (
                <Badge variant="secondary" className="text-xs bg-orange-600">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Restart Required
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {feature.estimatedImpact.toUpperCase()}
              </Badge>
            </div>
          </div>
          <Switch checked={feature.enabled} onCheckedChange={(enabled) => onToggle(feature.id, enabled)} />
        </div>
      </CardHeader>
      {!compact && (
        <CardContent className="pt-0">
          <CardDescription className="text-purple-200 mb-3">{feature.description}</CardDescription>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-300">Category:</span>
              <Badge variant="outline" className="text-xs">
                {feature.category}
              </Badge>
            </div>

            {feature.subcategory && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-300">Subcategory:</span>
                <Badge variant="outline" className="text-xs">
                  {feature.subcategory}
                </Badge>
              </div>
            )}

            {feature.dependencies.length > 0 && (
              <div className="space-y-1">
                <span className="text-purple-300 text-xs">Dependencies:</span>
                <div className="flex flex-wrap gap-1">
                  {feature.dependencies.map((dep) => (
                    <Badge key={dep} variant="secondary" className="text-xs">
                      {dep}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {feature.conflicts.length > 0 && (
              <div className="space-y-1">
                <span className="text-purple-300 text-xs">Conflicts:</span>
                <div className="flex flex-wrap gap-1">
                  {feature.conflicts.map((conflict) => (
                    <Badge key={conflict} variant="destructive" className="text-xs">
                      {conflict}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-2 border-t border-purple-600/30">
              <span className="text-purple-300">Last Modified:</span>
              <span className="text-purple-200">
                {feature.lastModified.toLocaleDateString()} by {feature.modifiedBy}
              </span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
