"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Download,
  GitBranch,
  Package,
  Code,
  Shield,
  CheckCircle,
  Archive,
  HardDrive,
  Terminal,
  Database,
  Settings,
  FileText,
  ImageIcon,
  Server,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function FullPlatformDownloadPage() {
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [downloadSpeed, setDownloadSpeed] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [downloadedSize, setDownloadedSize] = useState(0)
  const [currentFile, setCurrentFile] = useState("")

  const totalSize = 2.8 * 1024 * 1024 * 1024 // 2.8 GB in bytes

  const platformContents = [
    {
      category: "Frontend Application",
      size: "850 MB",
      icon: Code,
      items: [
        "React 18 + Next.js 14 application",
        "TypeScript configuration",
        "Tailwind CSS + shadcn/ui components",
        "150+ custom UI components",
        "Responsive design system",
        "Dark/Light theme support",
        "Accessibility features (WCAG 2.1)",
        "Progressive Web App (PWA) setup",
      ],
    },
    {
      category: "Backend Services",
      size: "680 MB",
      icon: Server,
      items: [
        "Next.js API routes",
        "Authentication system (NextAuth)",
        "Database integration (Supabase/PostgreSQL)",
        "File upload handling",
        "Email service integration",
        "Payment processing (Stripe)",
        "Rate limiting & security",
        "Webhook handlers",
      ],
    },
    {
      category: "Database Schema",
      size: "45 MB",
      icon: Database,
      items: [
        "PostgreSQL database schemas",
        "Migration scripts",
        "Seed data files",
        "Database indexes & constraints",
        "Backup & restore scripts",
        "Data validation rules",
        "Relationship mappings",
        "Performance optimizations",
      ],
    },
    {
      category: "Assets & Media",
      size: "1.1 GB",
      icon: ImageIcon,
      items: [
        "High-resolution images (WebP/PNG)",
        "Vector icons & illustrations",
        "Logo variations & brand assets",
        "Font files (Inter, Geist)",
        "Audio files for notifications",
        "Video thumbnails & previews",
        "3D models & holographic assets",
        "Optimized media pipeline",
      ],
    },
    {
      category: "Documentation",
      size: "125 MB",
      icon: FileText,
      items: [
        "Complete setup guide",
        "API documentation",
        "Component library docs",
        "Architecture diagrams",
        "Deployment guides",
        "Troubleshooting guides",
        "Contributing guidelines",
        "License & legal docs",
      ],
    },
    {
      category: "Configuration",
      size: "25 MB",
      icon: Settings,
      items: [
        "Environment variables template",
        "Docker configuration files",
        "CI/CD pipeline configs",
        "ESLint & Prettier rules",
        "TypeScript configurations",
        "Build optimization settings",
        "Security configurations",
        "Monitoring & analytics setup",
      ],
    },
  ]

  const downloadSteps = [
    { name: "Preparing download...", file: "Initializing", duration: 2000 },
    { name: "Downloading frontend app...", file: "app/**", duration: 15000 },
    { name: "Downloading components...", file: "components/**", duration: 12000 },
    { name: "Downloading backend APIs...", file: "api/**", duration: 8000 },
    { name: "Downloading database schemas...", file: "database/**", duration: 3000 },
    { name: "Downloading assets...", file: "public/**", duration: 20000 },
    { name: "Downloading documentation...", file: "docs/**", duration: 5000 },
    { name: "Finalizing package...", file: "Compressing", duration: 4000 },
  ]

  const handleDownload = async () => {
    setIsDownloading(true)
    setDownloadProgress(0)
    setDownloadedSize(0)

    let totalTime = 0
    let stepIndex = 0

    for (const step of downloadSteps) {
      if (isPaused) break

      setCurrentFile(step.file)
      const stepDuration = step.duration
      const stepSize = totalSize / downloadSteps.length

      for (let i = 0; i <= 100; i += 2) {
        if (isPaused) break

        await new Promise((resolve) => setTimeout(resolve, stepDuration / 50))

        const overallProgress = (stepIndex * 100 + i) / downloadSteps.length
        setDownloadProgress(overallProgress)

        const currentDownloaded = (overallProgress / 100) * totalSize
        setDownloadedSize(currentDownloaded)

        // Calculate speed (MB/s)
        const elapsed = totalTime + (i / 100) * stepDuration
        const speed = elapsed > 0 ? currentDownloaded / elapsed / 1000 : 0
        setDownloadSpeed(speed)

        // Calculate time remaining
        const remaining = elapsed > 0 ? ((totalSize - currentDownloaded) / speed) * 1000 : 0
        setTimeRemaining(remaining)
      }

      totalTime += stepDuration
      stepIndex++
    }

    if (!isPaused) {
      setDownloadProgress(100)
      setDownloadedSize(totalSize)
      setCurrentFile("Complete!")

      // Trigger actual download
      const link = document.createElement("a")
      link.href = "https://releases.snappaifi.com/snappaifi-full-platform-v2.4.1.zip"
      link.download = "snappaifi-full-platform-v2.4.1.zip"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => {
        setIsDownloading(false)
      }, 2000)
    }
  }

  const pauseDownload = () => {
    setIsPaused(!isPaused)
  }

  const resetDownload = () => {
    setIsDownloading(false)
    setIsPaused(false)
    setDownloadProgress(0)
    setDownloadedSize(0)
    setCurrentFile("")
    setDownloadSpeed(0)
    setTimeRemaining(0)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) return `${hours}h ${minutes % 60}m`
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`
    return `${seconds}s`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="px-4 py-2">
              <Package className="h-4 w-4 mr-2" />
              Full Platform Download - 2.8 GB
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Complete SnappAiFi
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Download the complete SnappAiFi platform including all source code, assets, documentation, and
              configuration files. Everything you need to run your own financial platform.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                MIT License
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-blue-400" />
                Version 2.4.1
              </div>
              <div className="flex items-center gap-2">
                <Archive className="h-4 w-4 text-purple-400" />
                2.8 GB ZIP
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Download Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Download Control */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Download className="h-5 w-5 text-blue-400" />
                  Download Manager
                </CardTitle>
                <CardDescription>Complete SnappAiFi platform package</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {!isDownloading && downloadProgress === 0 ? (
                  <div className="text-center space-y-4">
                    <div className="text-6xl text-blue-400 mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-white">Ready to Download</h3>
                    <p className="text-slate-300">Click below to start downloading the complete SnappAiFi platform</p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleDownload}>
                      <Download className="h-5 w-5 mr-2" />
                      Start Download (2.8 GB)
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Downloading: {currentFile}</span>
                      <span className="text-slate-300">{Math.round(downloadProgress)}%</span>
                    </div>

                    <Progress value={downloadProgress} className="w-full h-3" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Downloaded</div>
                        <div className="text-white font-medium">{formatBytes(downloadedSize)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Total Size</div>
                        <div className="text-white font-medium">{formatBytes(totalSize)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Speed</div>
                        <div className="text-white font-medium">{formatBytes(downloadSpeed * 1024)}/s</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Time Left</div>
                        <div className="text-white font-medium">{formatTime(timeRemaining)}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={pauseDownload} disabled={downloadProgress >= 100}>
                        {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                        {isPaused ? "Resume" : "Pause"}
                      </Button>
                      <Button variant="outline" onClick={resetDownload}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>

                    {downloadProgress >= 100 && (
                      <Alert className="bg-green-900/20 border-green-500/50">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription className="text-green-200">
                          <strong>Download Complete!</strong> Your SnappAiFi platform clone is ready. Check your
                          downloads folder.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Platform Contents */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">What's Included</CardTitle>
                <CardDescription>Complete breakdown of platform contents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {platformContents.map((section) => (
                    <div key={section.category} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <section.icon className="h-5 w-5 text-blue-400" />
                          <h4 className="font-semibold text-white">{section.category}</h4>
                        </div>
                        <Badge variant="outline">{section.size}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2 ml-8">
                        {section.items.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Package Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Version:</span>
                    <span className="text-white font-medium">2.4.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Size:</span>
                    <span className="text-white font-medium">2.8 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Format:</span>
                    <span className="text-white font-medium">ZIP Archive</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">License:</span>
                    <span className="text-white font-medium">MIT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Updated:</span>
                    <span className="text-white font-medium">Dec 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Requirements */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-slate-300">5 GB free space</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-slate-300">Node.js 18+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-slate-300">PostgreSQL 13+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-slate-300">Git & npm/yarn</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Start */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-900/50 p-3 rounded-lg">
                  <div className="space-y-2 font-mono text-sm">
                    <div className="text-green-400"># 1. Extract download</div>
                    <div className="text-blue-400">unzip snappaifi-*.zip</div>
                    <div className="text-green-400"># 2. Install deps</div>
                    <div className="text-blue-400">npm install</div>
                    <div className="text-green-400"># 3. Start dev server</div>
                    <div className="text-blue-400">npm run dev</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning */}
            <Alert className="bg-yellow-900/20 border-yellow-500/50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-yellow-200">
                <strong>Large Download:</strong> This is a 2.8 GB file. Ensure you have sufficient bandwidth and storage
                space.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}
