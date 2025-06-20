"use client"

import { useEffect, useCallback, useState } from "react"
import { Save, CheckCircle, Crown, Shield, Palette, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdminAccess } from "@/hooks/use-admin-access"

interface Variant {
  id: string
  name: string
  color: string
  isActive: boolean
}

export default function SupremeAuthorityAdminDashboard() {
  const { isAdmin, loading } = useAdminAccess()
  const [variants, setVariants] = useState<Variant[]>([
    { id: "1", name: "Primary", color: "#6366f1", isActive: true },
    { id: "2", name: "Secondary", color: "#8b5cf6", isActive: false },
  ])
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Auto-save functionality
  const autoSave = useCallback(async (updatedVariants: Variant[]) => {
    setIsSaving(true)
    try {
      // Simulate API call - replace with your actual save logic
      await new Promise((resolve) => setTimeout(resolve, 800))
      setLastSaved(new Date())
      console.log("Variants auto-saved:", updatedVariants)
    } catch (error) {
      console.error("Auto-save failed:", error)
    } finally {
      setIsSaving(false)
    }
  }, [])

  // Trigger auto-save when variants change
  useEffect(() => {
    if (variants.length > 0) {
      const timeoutId = setTimeout(() => {
        autoSave(variants)
      }, 1000) // Debounce for 1 second

      return () => clearTimeout(timeoutId)
    }
  }, [variants, autoSave])

  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      name: `Variant ${variants.length + 1}`,
      color: "#6366f1", // Default indigo
      isActive: false,
    }
    setVariants((prev) => [...prev, newVariant])
  }

  const updateVariant = (id: string, updates: Partial<Variant>) => {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)))
  }

  const deleteVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-indigo-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You need admin privileges to access this dashboard.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header with indigo accents */}
      <div className="bg-white border-b border-indigo-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Supreme Authority</h1>
                <p className="text-sm text-indigo-600">Admin Dashboard</p>
              </div>
            </div>

            {/* Auto-save indicator */}
            <div className="flex items-center space-x-3">
              {isSaving ? (
                <div className="flex items-center text-indigo-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2"></div>
                  <span className="text-sm">Saving...</span>
                </div>
              ) : lastSaved ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Variants Management Card */}
        <Card className="border-indigo-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Style Variants</CardTitle>
                <CardDescription className="text-indigo-100">
                  Manage your design system variants with auto-save
                </CardDescription>
              </div>
              <Button onClick={addVariant} className="bg-white text-indigo-600 hover:bg-indigo-50 border-0">
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="border border-indigo-200 rounded-lg p-4 bg-gradient-to-br from-white to-indigo-50 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: variant.color }}
                      />
                      <Input
                        value={variant.name}
                        onChange={(e) => updateVariant(variant.id, { name: e.target.value })}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteVariant(variant.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Color</label>
                      <Input
                        type="color"
                        value={variant.color}
                        onChange={(e) => updateVariant(variant.id, { color: e.target.value })}
                        className="h-10 border-indigo-200 focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`active-${variant.id}`}
                        checked={variant.isActive}
                        onChange={(e) => updateVariant(variant.id, { isActive: e.target.checked })}
                        className="rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`active-${variant.id}`} className="text-sm text-gray-700">
                        Active
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {variants.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No variants yet</h3>
                <p className="text-gray-600 mb-4">Create your first style variant to get started.</p>
                <Button onClick={addVariant} className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Variant
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600">Total Variants</p>
                  <p className="text-3xl font-bold text-gray-900">{variants.length}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Active Variants</p>
                  <p className="text-3xl font-bold text-gray-900">{variants.filter((v) => v.isActive).length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Auto-Saves</p>
                  <p className="text-3xl font-bold text-gray-900">{lastSaved ? "✓" : "—"}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Save className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
