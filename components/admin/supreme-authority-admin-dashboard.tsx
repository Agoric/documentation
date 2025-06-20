"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Settings, Shield, Users, BarChart3, CheckCircle, Clock, Star, Activity } from "lucide-react"
import { useAdminAccess } from "@/contexts/admin-access-context"

interface Variant {
  id: string
  name: string
  description: string
  config: Record<string, any>
  createdAt: Date
  lastSaved?: Date
}

export default function SupremeAuthorityAdminDashboard() {
  const { isAdmin, loading } = useAdminAccess()
  const [variants, setVariants] = useState<Variant[]>([])
  const [activeVariant, setActiveVariant] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)

  // Auto-save function
  const autoSave = useCallback(async () => {
    if (!autoSaveEnabled || variants.length === 0) return

    setIsSaving(true)
    try {
      // Simulate API call to save variants
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update last saved timestamp for all variants
      setVariants((prev) =>
        prev.map((variant) => ({
          ...variant,
          lastSaved: new Date(),
        })),
      )

      setLastSaved(new Date())
      console.log("Auto-saved variants:", variants.length)
    } catch (error) {
      console.error("Auto-save failed:", error)
    } finally {
      setIsSaving(false)
    }
  }, [variants, autoSaveEnabled])

  // Auto-save whenever variants change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      autoSave()
    }, 1000) // Save 1 second after last change

    return () => clearTimeout(timeoutId)
  }, [variants, autoSave])

  const createVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      name: `Variant ${variants.length + 1}`,
      description: "New variant description",
      config: { theme: "indigo", enabled: true },
      createdAt: new Date(),
    }

    setVariants((prev) => [...prev, newVariant])
    setActiveVariant(newVariant.id)
  }

  const deleteVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id))
    if (activeVariant === id) {
      setActiveVariant(variants[0]?.id || "")
    }
  }

  const updateVariant = (id: string, updates: Partial<Variant>) => {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-indigo-700 font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <Card className="w-96 border-red-200">
          <CardContent className="text-center py-8">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">Access Denied</h2>
            <p className="text-red-600">You don't have permission to access this dashboard.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentVariant = variants.find((v) => v.id === activeVariant)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Enhanced header with excellence features */}
      <header className="bg-gradient-to-r from-white via-indigo-50 to-purple-50 border-b border-indigo-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                  Supreme Authority Dashboard
                </h1>
                <p className="text-sm text-indigo-600 font-medium">
                  Excellence Configuration Active • Premium Features Enabled
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Enhanced auto-save status */}
              <div className="flex items-center space-x-3 text-sm bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-indigo-200">
                {isSaving ? (
                  <>
                    <Clock className="w-5 h-5 text-indigo-500 animate-spin" />
                    <span className="text-indigo-600 font-medium">Auto-saving...</span>
                  </>
                ) : lastSaved ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">Saved {lastSaved.toLocaleTimeString()}</span>
                  </>
                ) : null}
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-300 font-semibold"
                >
                  <Star className="w-4 h-4 mr-1" />
                  {variants.length} Excellence Variants
                </Badge>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <Activity className="w-4 h-4 mr-1" />
                  Premium Active
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="variants" className="space-y-6">
          <TabsList className="bg-indigo-50 border border-indigo-200">
            <TabsTrigger value="variants" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Variants
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="variants" className="space-y-6">
            {/* Variant Creation */}
            <Card className="border-indigo-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-6 h-6" />
                  <span>Excellence Variant Management</span>
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Create and manage premium system variants with AI-powered auto-save
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Button
                    onClick={createVariant}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Variant
                  </Button>

                  <div className="flex items-center space-x-2">
                    <Label htmlFor="auto-save" className="text-sm font-medium text-gray-700">
                      Auto-save enabled
                    </Label>
                    <input
                      id="auto-save"
                      type="checkbox"
                      checked={autoSaveEnabled}
                      onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Variants Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {variants.map((variant) => (
                    <Card
                      key={variant.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        activeVariant === variant.id
                          ? "ring-2 ring-indigo-500 border-indigo-300 bg-indigo-50"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                      onClick={() => setActiveVariant(variant.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{variant.name}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteVariant(variant.id)
                            }}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{variant.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Created {variant.createdAt.toLocaleDateString()}</span>
                          {variant.lastSaved && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Saved
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Variant Editor */}
            {currentVariant && (
              <Card className="border-indigo-200 shadow-lg">
                <CardHeader className="bg-indigo-600 text-white rounded-t-lg">
                  <CardTitle>Edit Variant: {currentVariant.name}</CardTitle>
                  <CardDescription className="text-indigo-100">
                    Modify variant settings - changes auto-save automatically
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="variant-name" className="text-sm font-medium text-gray-700">
                        Variant Name
                      </Label>
                      <Input
                        id="variant-name"
                        value={currentVariant.name}
                        onChange={(e) => updateVariant(currentVariant.id, { name: e.target.value })}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="variant-theme" className="text-sm font-medium text-gray-700">
                        Theme
                      </Label>
                      <select
                        id="variant-theme"
                        value={currentVariant.config.theme || "indigo"}
                        onChange={(e) =>
                          updateVariant(currentVariant.id, {
                            config: { ...currentVariant.config, theme: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-indigo-200 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="indigo">Indigo</option>
                        <option value="purple">Purple</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="variant-description" className="text-sm font-medium text-gray-700">
                      Description
                    </Label>
                    <Textarea
                      id="variant-description"
                      value={currentVariant.description}
                      onChange={(e) => updateVariant(currentVariant.id, { description: e.target.value })}
                      className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="text-indigo-900">Analytics Dashboard</CardTitle>
                <CardDescription>System performance and usage metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">
                    <h3 className="font-semibold">Total Variants</h3>
                    <p className="text-2xl font-bold">{variants.length}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg">
                    <h3 className="font-semibold">Auto-saves Today</h3>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg">
                    <h3 className="font-semibold">Active Sessions</h3>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="text-indigo-900">User Management</CardTitle>
                <CardDescription>Manage user access and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
                  <p>User management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
