"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Zap, Globe, Users, Brain, Sparkles } from "lucide-react"
import { VOAI_ENVIRONMENTS, type VOAIEnvironment } from "@/lib/voai-environments"
import FuturisticCommandCenter from "@/components/navigation/futuristic-command-center"

interface VOAIIntegrationProps {
  onEnvironmentSelect?: (environment: VOAIEnvironment) => void
}

export function VOAIIntegration({ onEnvironmentSelect }: VOAIIntegrationProps) {
  const [selectedEnvironment, setSelectedEnvironment] = useState<VOAIEnvironment | null>(null)
  const [integrationStatus, setIntegrationStatus] = useState<"idle" | "connecting" | "connected">("idle")

  const handleEnvironmentConnect = (environment: VOAIEnvironment) => {
    setIntegrationStatus("connecting")
    setSelectedEnvironment(environment)

    setTimeout(() => {
      setIntegrationStatus("connected")
      onEnvironmentSelect?.(environment)
    }, 2000)
  }

  const getStatusColor = () => {
    switch (integrationStatus) {
      case "connecting":
        return "text-amber-400"
      case "connected":
        return "text-green-400"
      default:
        return "text-slate-400"
    }
  }

  const getStatusText = () => {
    switch (integrationStatus) {
      case "connecting":
        return "Connecting to Environment..."
      case "connected":
        return `Connected to ${selectedEnvironment?.name}`
      default:
        return "Select Environment to Connect"
    }
  }

  return (
    <div className="relative">
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-amber-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Brain className="w-8 h-8 text-purple-400" />
              </motion.div>
              <div>
                <CardTitle className="text-2xl text-white">VOAI Platform Integration</CardTitle>
                <p className="text-slate-300">Connect to immersive AI environments</p>
              </div>
            </div>
            <Badge className={`${getStatusColor()} border-current`}>{getStatusText()}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="environments" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="environments">Environments</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
            </TabsList>

            <TabsContent value="environments" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VOAI_ENVIRONMENTS.map((environment) => (
                  <motion.div key={environment.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedEnvironment?.id === environment.id
                          ? `bg-gradient-to-br ${environment.gradient} border-2 border-amber-400/50`
                          : "bg-slate-800/50 border-slate-600/50 hover:border-slate-500/50"
                      }`}
                      onClick={() => handleEnvironmentConnect(environment)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <motion.div
                            className="text-3xl"
                            animate={
                              selectedEnvironment?.id === environment.id
                                ? {
                                    scale: [1, 1.1, 1],
                                  }
                                : {}
                            }
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            {environment.icon}
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-white">{environment.name}</h3>
                            <p className="text-sm text-slate-300">{environment.theme}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs text-slate-400">{environment.description}</div>
                          <div className="flex flex-wrap gap-1">
                            {environment.personalityBoosts.slice(0, 3).map((boost) => (
                              <Badge key={boost} variant="secondary" className="text-xs">
                                {boost}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-amber-400">
                            {environment.options.length} interactive options available
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="configuration" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Environment Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Holographic Effects</span>
                      <Button size="sm" variant="outline">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Ambient Audio</span>
                      <Button size="sm" variant="outline">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Voice Commands</span>
                      <Button size="sm" variant="outline">
                        Active
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Auto-Execute</span>
                      <Button size="sm" variant="outline">
                        Disabled
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Performance Metrics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Response Time</span>
                      <Badge className="bg-green-500/20 text-green-300">Fast</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Environment Load</span>
                      <Badge className="bg-blue-500/20 text-blue-300">Optimal</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Memory Usage</span>
                      <Badge className="bg-amber-500/20 text-amber-300">Normal</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Network Status</span>
                      <Badge className="bg-green-500/20 text-green-300">Connected</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-4">
              <div className="text-center space-y-4">
                {integrationStatus === "idle" && (
                  <div>
                    <div className="text-4xl mb-4">🔌</div>
                    <h3 className="text-xl text-white mb-2">Ready to Connect</h3>
                    <p className="text-slate-400">Select an environment to begin integration</p>
                  </div>
                )}

                {integrationStatus === "connecting" && (
                  <div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="text-4xl mb-4"
                    >
                      ⚡
                    </motion.div>
                    <h3 className="text-xl text-amber-400 mb-2">Establishing Connection</h3>
                    <p className="text-slate-400">Connecting to {selectedEnvironment?.name}...</p>
                  </div>
                )}

                {integrationStatus === "connected" && selectedEnvironment && (
                  <div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="text-4xl mb-4"
                    >
                      {selectedEnvironment.icon}
                    </motion.div>
                    <h3 className="text-xl text-green-400 mb-2">Successfully Connected</h3>
                    <p className="text-slate-400">You are now connected to {selectedEnvironment.name}</p>
                    <div className="mt-4">
                      <Button
                        onClick={() => (window.location.href = "/dashboard/voai-environments")}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Launch Environment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="testing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardContent className="p-4 text-center">
                    <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-1">Network Test</h4>
                    <p className="text-xs text-slate-400 mb-3">Test environment connectivity</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Run Test
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-1">Voice Commands</h4>
                    <p className="text-xs text-slate-400 mb-3">Test voice recognition</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Test Voice
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardContent className="p-4 text-center">
                    <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-1">Holographic FX</h4>
                    <p className="text-xs text-slate-400 mb-3">Test visual effects</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Test Effects
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="fixed bottom-8 right-8 w-[420px] z-50">
        <FuturisticCommandCenter />
      </div>
    </div>
  )
}
