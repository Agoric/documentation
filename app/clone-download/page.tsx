"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, GitBranch, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DownloadManager } from "./download-manager"

export default function CloneDownloadPage() {
  const [selectedCloneType, setSelectedCloneType] = useState("full")
  const [showDownloadManager, setShowDownloadManager] = useState(false)

  const cloneOptions = [
    {
      id: "full",
      name: "Full Platform Clone",
      size: "2.8 GB",
      description: "Complete SnappAiFi platform with all features",
      includes: ["All source code", "Database schemas", "Assets & media", "Documentation", "Configuration files"],
      recommended: true,
    },
    {
      id: "frontend",
      name: "Frontend Only",
      size: "450 MB",
      description: "React/Next.js frontend application",
      includes: ["React components", "UI libraries", "Styling", "Client-side logic", "Static assets"],
    },
    {
      id: "backend",
      name: "Backend Services",
      size: "680 MB",
      description: "API services and database",
      includes: ["API routes", "Database schemas", "Authentication", "Business logic", "Server configs"],
    },
    {
      id: "minimal",
      name: "Minimal Setup",
      size: "120 MB",
      description: "Core functionality only",
      includes: ["Essential components", "Basic routing", "Core features", "Minimal dependencies"],
    },
  ]

  const handleDownloadStart = () => {
    if (selectedCloneType === "full") {
      setShowDownloadManager(true)
    } else {
      // Handle other download types
      const link = document.createElement("a")
      link.href = `https://releases.snappaifi.com/snappaifi-${selectedCloneType}-v2.4.1.zip`
      link.download = `snappaifi-${selectedCloneType}-clone.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (showDownloadManager) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setShowDownloadManager(false)}
              className="text-slate-300 hover:text-white"
            >
              ← Back to Clone Options
            </Button>
          </div>

          <DownloadManager
            cloneType={selectedCloneType}
            onComplete={() => {
              // Handle download completion
              console.log("Download completed!")
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="px-4 py-2">
              <GitBranch className="h-4 w-4 mr-2" />
              Open Source Clone Available
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Clone SnappAiFi
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Download a complete clone of the SnappAiFi platform. Self-host, customize, or learn from the source code.
              Everything you need to run your own financial platform.
            </p>

            <Alert className="max-w-2xl mx-auto bg-green-900/20 border-green-500/50">
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-green-200">
                <strong>Open Source License:</strong> This clone is provided under MIT license. Free for personal and
                commercial use.
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </div>

      {/* Clone Options */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Choose Your Clone</h2>
          <p className="text-slate-300">Select the components you need for your project</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cloneOptions.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 relative ${
                  selectedCloneType === option.id
                    ? "bg-blue-900/50 border-blue-500 ring-2 ring-blue-500/50"
                    : "bg-slate-800/50 border-slate-700 hover:border-blue-500/50"
                }`}
                onClick={() => setSelectedCloneType(option.id)}
              >
                {option.recommended && <Badge className="absolute -top-2 -right-2 bg-green-600">Recommended</Badge>}

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{option.name}</CardTitle>
                    <Badge variant="outline">{option.size}</Badge>
                  </div>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white text-sm">Includes:</h4>
                    {option.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Download Button */}
        <div className="text-center">
          <Button
            onClick={handleDownloadStart}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Download {cloneOptions.find((opt) => opt.id === selectedCloneType)?.name}
          </Button>
        </div>
      </div>
    </div>
  )
}
