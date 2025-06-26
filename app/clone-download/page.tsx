"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Download,
  GitBranch,
  Package,
  Code,
  Shield,
  Zap,
  CheckCircle,
  Copy,
  ExternalLink,
  Archive,
  HardDrive,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CloneDownloadPage() {
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedCloneType, setSelectedCloneType] = useState("full")

  const cloneOptions = [
    {
      id: "full",
      name: "Full Platform Clone",
      size: "2.8 GB",
      description: "Complete SnappAiFi platform with all features",
      includes: ["All source code", "Database schemas", "Assets & media", "Documentation", "Configuration files"],
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

  const downloadFormats = [
    {
      format: "ZIP Archive",
      icon: Archive,
      size: "Compressed",
      description: "Standard ZIP file for easy extraction",
      command: "unzip snappaifi-clone.zip",
    },
    {
      format: "Git Repository",
      icon: GitBranch,
      size: "Full History",
      description: "Complete Git repository with version history",
      command: "git clone https://github.com/snappaifi/platform-clone.git",
    },
    {
      format: "Docker Image",
      icon: Package,
      size: "Containerized",
      description: "Ready-to-run Docker container",
      command: "docker pull snappaifi/platform:latest",
    },
    {
      format: "NPM Package",
      icon: Code,
      size: "Modular",
      description: "Installable NPM package",
      command: "npm install @snappaifi/platform-clone",
    },
  ]

  const systemRequirements = {
    minimum: {
      os: "Windows 10, macOS 10.15, Ubuntu 18.04",
      ram: "8 GB RAM",
      storage: "5 GB free space",
      node: "Node.js 18+",
      database: "PostgreSQL 13+",
    },
    recommended: {
      os: "Windows 11, macOS 12+, Ubuntu 22.04",
      ram: "16 GB RAM",
      storage: "20 GB free space",
      node: "Node.js 20+",
      database: "PostgreSQL 15+",
    },
  }

  const handleDownload = async (format: string) => {
    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Generate download URLs based on format
    const downloadUrls = {
      zip: "https://releases.snappaifi.com/snappaifi-platform-v2.4.1.zip",
      git: "https://github.com/snappaifi/platform-clone.git",
      docker: "docker pull snappaifi/platform:v2.4.1",
      npm: "npm install @snappaifi/platform-clone@latest",
    }

    // Simulate actual download
    setTimeout(() => {
      const link = document.createElement("a")
      link.href = downloadUrls[format as keyof typeof downloadUrls] || downloadUrls.zip
      link.download = `snappaifi-${selectedCloneType}-clone.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
                className={`cursor-pointer transition-all duration-300 ${
                  selectedCloneType === option.id
                    ? "bg-blue-900/50 border-blue-500 ring-2 ring-blue-500/50"
                    : "bg-slate-800/50 border-slate-700 hover:border-blue-500/50"
                }`}
                onClick={() => setSelectedCloneType(option.id)}
              >
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

        {/* Download Formats */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Download Formats</h3>
            <p className="text-slate-300">Choose your preferred format and installation method</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {downloadFormats.map((format) => (
              <Card key={format.format} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <format.icon className="h-8 w-8 text-blue-400" />
                    <div>
                      <CardTitle className="text-white text-lg">{format.format}</CardTitle>
                      <CardDescription>{format.size}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-300">{format.description}</p>

                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-green-400 font-mono">{format.command}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(format.command)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleDownload(format.format.toLowerCase().split(" ")[0])}
                    disabled={isDownloading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download {format.format}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Download Progress */}
        {isDownloading && (
          <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Downloading SnappAiFi Clone...</span>
                    <span className="text-slate-300">{Math.round(downloadProgress)}%</span>
                  </div>
                  <Progress value={downloadProgress} className="w-full" />
                  <p className="text-sm text-slate-400">
                    Preparing your {selectedCloneType} clone package. This may take a few minutes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* System Requirements */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">System Requirements</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-yellow-400" />
                  Minimum Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(systemRequirements.minimum).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-400" />
                  Recommended
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(systemRequirements.recommended).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="mt-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Terminal className="h-5 w-5 text-blue-400" />
                Quick Start Guide
              </CardTitle>
              <CardDescription>Get your SnappAiFi clone running in minutes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                      1
                    </Badge>
                    <h4 className="font-semibold text-white">Download & Extract</h4>
                  </div>
                  <p className="text-sm text-slate-300">Download your chosen format and extract the files</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                      2
                    </Badge>
                    <h4 className="font-semibold text-white">Install Dependencies</h4>
                  </div>
                  <p className="text-sm text-slate-300">Run npm install to install all required packages</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                      3
                    </Badge>
                    <h4 className="font-semibold text-white">Configure & Run</h4>
                  </div>
                  <p className="text-sm text-slate-300">
                    Set up environment variables and start the development server
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Installation Commands:</h4>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <code className="text-green-400">npm install</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("npm install")}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-green-400">npm run dev</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("npm run dev")}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-blue-400">http://localhost:3000</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open("http://localhost:3000", "_blank")}
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
