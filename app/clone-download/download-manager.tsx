"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Download,
  CheckCircle,
  Package,
  HardDrive,
  Zap,
  FileText,
  Database,
  Code,
  ImageIcon,
  Settings,
  Play,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DownloadManagerProps {
  cloneType: string
  onComplete: () => void
}

export function DownloadManager({ cloneType, onComplete }: DownloadManagerProps) {
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)
  const [downloadSpeed, setDownloadSpeed] = useState("0 MB/s")
  const [timeRemaining, setTimeRemaining] = useState("Calculating...")

  const downloadSteps = [
    {
      name: "Initializing Download",
      description: "Preparing download servers and validating request",
      icon: Settings,
      size: "0 MB",
    },
    {
      name: "Core Framework",
      description: "Next.js, React, TypeScript, and core dependencies",
      icon: Code,
      size: "450 MB",
    },
    {
      name: "UI Components",
      description: "Shadcn/ui, Tailwind CSS, animations, and styling",
      icon: Package,
      size: "180 MB",
    },
    {
      name: "Database Schemas",
      description: "PostgreSQL schemas, migrations, and seed data",
      icon: Database,
      size: "95 MB",
    },
    {
      name: "API Services",
      description: "Backend services, authentication, and business logic",
      icon: Zap,
      size: "320 MB",
    },
    {
      name: "Assets & Media",
      description: "Images, icons, fonts, and multimedia files",
      icon: ImageIcon,
      size: "680 MB",
    },
    {
      name: "Documentation",
      description: "Setup guides, API docs, and development resources",
      icon: FileText,
      size: "85 MB",
    },
    {
      name: "Configuration Files",
      description: "Environment configs, Docker files, and deployment scripts",
      icon: Settings,
      size: "45 MB",
    },
  ]

  const downloadInfo = {
    totalSize: "2.8 GB",
    files: "12,847 files",
    folders: "1,203 folders",
    version: "v2.4.1",
    buildDate: "December 2024",
    license: "MIT License",
  }

  useEffect(() => {
    if (isDownloading) {
      const interval = setInterval(() => {
        setDownloadProgress((prev) => {
          const newProgress = prev + Math.random() * 3 + 1

          // Update current step based on progress
          const stepIndex = Math.floor((newProgress / 100) * downloadSteps.length)
          setCurrentStep(Math.min(stepIndex, downloadSteps.length - 1))

          // Simulate download speed
          const speeds = ["45.2 MB/s", "52.8 MB/s", "38.9 MB/s", "61.3 MB/s", "47.1 MB/s"]
          setDownloadSpeed(speeds[Math.floor(Math.random() * speeds.length)])

          // Calculate time remaining
          const remaining = Math.max(0, 100 - newProgress)
          const minutes = Math.floor(remaining / 2)
          const seconds = Math.floor((remaining % 2) * 30)
          setTimeRemaining(`${minutes}m ${seconds}s`)

          if (newProgress >= 100) {
            clearInterval(interval)
            setDownloadComplete(true)
            setTimeRemaining("Complete!")
            setTimeout(() => {
              onComplete()
            }, 2000)
            return 100
          }

          return newProgress
        })
      }, 150)

      return () => clearInterval(interval)
    }
  }, [isDownloading, onComplete])

  const startDownload = () => {
    setIsDownloading(true)
    setDownloadProgress(0)
    setCurrentStep(0)

    // Create download link
    const link = document.createElement("a")
    link.href = "https://releases.snappaifi.com/snappaifi-platform-full-v2.4.1.zip"
    link.download = "snappaifi-platform-full-v2.4.1.zip"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyInstallCommands = () => {
    const commands = `# Extract the downloaded file
unzip snappaifi-platform-full-v2.4.1.zip
cd snappaifi-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npm run db:migrate

# Start development server
npm run dev

# Access your platform at:
# http://localhost:3000`

    navigator.clipboard.writeText(commands)
  }

  return (
    <div className="space-y-6">
      {/* Download Header */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-400" />
              <div>
                <CardTitle className="text-white text-xl">Complete SnappAiFi Platform</CardTitle>
                <CardDescription className="text-blue-200">
                  Full-featured financial platform with all components
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {downloadInfo.totalSize}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300">{downloadInfo.files}</span>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300">{downloadInfo.folders}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300">{downloadInfo.version}</span>
            </div>
          </div>

          {!isDownloading && !downloadComplete && (
            <Button onClick={startDownload} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              <Download className="h-5 w-5 mr-2" />
              Start Download (2.8 GB)
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Download Progress */}
      <AnimatePresence>
        {isDownloading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Download className="h-5 w-5 text-blue-400" />
                    Downloading Platform
                  </CardTitle>
                  <div className="text-right text-sm">
                    <div className="text-white font-medium">{Math.round(downloadProgress)}%</div>
                    <div className="text-slate-400">{downloadSpeed}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Overall Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Overall Progress</span>
                    <span className="text-slate-300">{timeRemaining}</span>
                  </div>
                  <Progress value={downloadProgress} className="w-full h-3" />
                </div>

                {/* Current Step */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Download Components:</h4>
                  <div className="space-y-3">
                    {downloadSteps.map((step, index) => {
                      const isActive = index === currentStep
                      const isCompleted = index < currentStep
                      const StepIcon = step.icon

                      return (
                        <motion.div
                          key={step.name}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                            isActive
                              ? "bg-blue-900/50 border border-blue-500/50"
                              : isCompleted
                                ? "bg-green-900/30 border border-green-500/30"
                                : "bg-slate-900/30 border border-slate-700"
                          }`}
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: isActive || isCompleted ? 1 : 0.5 }}
                        >
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : (
                              <StepIcon className={`h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5
                                className={`font-medium ${
                                  isActive ? "text-white" : isCompleted ? "text-green-200" : "text-slate-400"
                                }`}
                              >
                                {step.name}
                              </h5>
                              <Badge variant={isCompleted ? "secondary" : "outline"} className="text-xs">
                                {step.size}
                              </Badge>
                            </div>
                            <p className={`text-sm ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Complete */}
      <AnimatePresence>
        {downloadComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                  <div>
                    <CardTitle className="text-white text-xl">Download Complete!</CardTitle>
                    <CardDescription className="text-green-200">
                      SnappAiFi platform successfully downloaded
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Alert className="bg-green-900/20 border-green-500/50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-green-200">
                    <strong>Success!</strong> Your complete SnappAiFi platform clone is ready for installation.
                  </AlertDescription>
                </Alert>

                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Installation Commands:</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyInstallCommands}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                  </div>

                  <div className="space-y-2 font-mono text-sm">
                    <div className="text-slate-400"># Extract and setup</div>
                    <div className="text-green-400">unzip snappaifi-platform-full-v2.4.1.zip</div>
                    <div className="text-green-400">cd snappaifi-platform</div>
                    <div className="text-green-400">npm install</div>
                    <div className="text-green-400">npm run dev</div>
                    <div className="text-slate-400"># Access at http://localhost:3000</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => window.open("https://docs.snappaifi.com/setup", "_blank")}
                    className="flex-1"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Setup Guide
                  </Button>
                  <Button
                    onClick={() => window.open("http://localhost:3000", "_blank")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Launch Platform
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
