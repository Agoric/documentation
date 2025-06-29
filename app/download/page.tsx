"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Smartphone,
  Monitor,
  Download,
  Apple,
  Chrome,
  Shield,
  Zap,
  Star,
  CheckCircle,
  QrCode,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("mobile")

  const downloadStats = {
    totalDownloads: "2.4M+",
    rating: "4.9",
    reviews: "125K+",
    lastUpdate: "Dec 2024",
  }

  const platforms = [
    {
      id: "mobile",
      name: "Mobile Apps",
      icon: Smartphone,
      description: "iOS & Android native apps",
    },
    {
      id: "desktop",
      name: "Desktop Apps",
      icon: Monitor,
      description: "Windows, macOS & Linux",
    },
    {
      id: "web",
      name: "Web App",
      icon: Chrome,
      description: "Progressive Web App",
    },
  ]

  const mobileApps = [
    {
      platform: "iOS",
      icon: Apple,
      version: "v2.4.1",
      size: "127 MB",
      requirements: "iOS 14.0+",
      downloadUrl: "https://apps.apple.com/app/snappaifi",
      qrCode: "/qr-ios.png",
      features: ["Face ID/Touch ID", "Apple Pay", "Siri Shortcuts", "Apple Watch"],
    },
    {
      platform: "Android",
      icon: Chrome,
      version: "v2.4.0",
      size: "89 MB",
      requirements: "Android 8.0+",
      downloadUrl: "https://play.google.com/store/apps/details?id=com.snappaifi",
      qrCode: "/qr-android.png",
      features: ["Fingerprint Auth", "Google Pay", "Android Auto", "Wear OS"],
    },
  ]

  const desktopApps = [
    {
      platform: "Windows",
      icon: Monitor,
      version: "v1.8.2",
      size: "245 MB",
      requirements: "Windows 10+",
      downloadUrl: "https://download.snappaifi.com/windows",
      features: ["Windows Hello", "Live Tiles", "Cortana", "Xbox Integration"],
    },
    {
      platform: "macOS",
      icon: Apple,
      version: "v1.8.1",
      size: "198 MB",
      requirements: "macOS 11.0+",
      downloadUrl: "https://download.snappaifi.com/macos",
      features: ["Touch Bar", "Spotlight", "Handoff", "Universal App"],
    },
    {
      platform: "Linux",
      icon: Monitor,
      version: "v1.8.0",
      size: "156 MB",
      requirements: "Ubuntu 20.04+",
      downloadUrl: "https://download.snappaifi.com/linux",
      features: ["AppImage", "Flatpak", "Snap Package", "CLI Tools"],
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit encryption and biometric authentication",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with instant sync",
    },
    {
      icon: Star,
      title: "Premium Features",
      description: "All premium features unlocked for free",
    },
  ]

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
              <Download className="h-4 w-4 mr-2" />
              Latest Version Available
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Download SnappAiFi
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get the most advanced financial platform on all your devices. Experience the future of finance with our
              native apps.
            </p>

            {/* Download Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{downloadStats.totalDownloads}</div>
                <div className="text-sm text-slate-400">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 fill-current" />
                  {downloadStats.rating}
                </div>
                <div className="text-sm text-slate-400">{downloadStats.reviews} Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{downloadStats.lastUpdate}</div>
                <div className="text-sm text-slate-400">Last Update</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Platform Selection */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
            {platforms.map((platform) => (
              <TabsTrigger key={platform.id} value={platform.id} className="flex items-center gap-2">
                <platform.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{platform.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Mobile Apps */}
          <TabsContent value="mobile" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Mobile Applications</h2>
              <p className="text-slate-300">Native apps optimized for iOS and Android</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {mobileApps.map((app) => (
                <motion.div
                  key={app.platform}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <app.icon className="h-8 w-8 text-blue-400" />
                          <div>
                            <CardTitle className="text-white">{app.platform}</CardTitle>
                            <CardDescription>
                              {app.version} • {app.size}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">{app.requirements}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-white mb-3">Platform Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {app.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Download Options */}
                      <div className="flex gap-4">
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => window.open(app.downloadUrl, "_blank")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="icon">
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Desktop Apps */}
          <TabsContent value="desktop" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Desktop Applications</h2>
              <p className="text-slate-300">Full-featured desktop apps for all operating systems</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {desktopApps.map((app) => (
                <motion.div
                  key={app.platform}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <app.icon className="h-8 w-8 text-purple-400" />
                        <div>
                          <CardTitle className="text-white">{app.platform}</CardTitle>
                          <CardDescription>
                            {app.version} • {app.size}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {app.requirements}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Features</h4>
                        <div className="space-y-1">
                          {app.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => window.open(app.downloadUrl, "_blank")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download for {app.platform}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Web App */}
          <TabsContent value="web" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Progressive Web App</h2>
              <p className="text-slate-300">Access SnappAiFi directly from your browser</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="text-center">
                  <Chrome className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-2xl">Web Application</CardTitle>
                  <CardDescription>No download required • Works offline • Auto-updates</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Web Features</h4>
                      <div className="space-y-2">
                        {["Offline Support", "Push Notifications", "Auto-Updates", "Cross-Platform"].map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Browser Support</h4>
                      <div className="space-y-2">
                        {["Chrome 90+", "Firefox 88+", "Safari 14+", "Edge 90+"].map((browser) => (
                          <div key={browser} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {browser}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => window.open("https://app.snappaifi.com", "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Launch Web App
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Install PWA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose SnappAiFi Apps?</h2>
          <p className="text-slate-300">Experience the best of financial technology on every device</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/30 border-slate-700 text-center">
                <CardContent className="pt-8">
                  <feature.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-700">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <h4 className="font-semibold text-white mb-2">System Requirements</h4>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              View Details <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Release Notes</h4>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              What's New <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Support</h4>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Get Help <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Beta Program</h4>
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Join Beta <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
