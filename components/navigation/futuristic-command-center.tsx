"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Crown, Mic, Volume2, VolumeX, Sparkles, Zap, Globe, Mountain, Waves, TreePine, Cpu } from "lucide-react"
import { motion } from "framer-motion"
import {
  VOAI_ENVIRONMENTS,
  executeEnvironmentAction,
  type VOAIEnvironment,
  type EnvironmentOption,
} from "@/lib/voai-environments"
import { Home } from "lucide-react"

/* ---- 1.  Register widgets here (lazy-loaded, no SSR) --------------------- */
const widgetMap = {
  aiChat: dynamic(() => import("../ai/imperial-ai-chat").then((m) => ({ default: m.ImperialAIChat })), {
    ssr: false,
  }),
  realVoice: dynamic(() => import("../ai/real-voice-engine").then((m) => ({ default: m.RealVoiceEngine })), {
    ssr: false,
  }),
  wolfVoice: dynamic(() => import("../ai/wolf-voice-engine").then((m) => ({ default: m.WolfVoiceEngine })), {
    ssr: false,
  }),
  voaiEnvironments: dynamic(
    () => import("../voai/environment-selector").then((m) => ({ default: m.EnvironmentSelector })),
    {
      ssr: false,
    },
  ),
} as const

type WidgetKey = keyof typeof widgetMap

export function FuturisticCommandCenter() {
  /* ---- 2.  Store active key and environment state ---- */
  const [active, setActive] = useState<WidgetKey | null>("aiChat")
  const [selectedEnvironment, setSelectedEnvironment] = useState<VOAIEnvironment>(VOAI_ENVIRONMENTS[0])
  const [activeOption, setActiveOption] = useState<EnvironmentOption | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResults, setExecutionResults] = useState<string[]>([])
  const [holographicMode, setHolographicMode] = useState(true)
  const [ambientSoundEnabled, setAmbientSoundEnabled] = useState(true)
  const [environmentProgress, setEnvironmentProgress] = useState<Record<string, number>>({})
  const [selectedEnv, setSelectedEnv] = useState(VOAI_ENVIRONMENTS[0].id)

  /* ---- 3.  Derive component safely with optional chaining --------------- */
  const ActiveWidget = active ? widgetMap[active] : null

  const handleEnvironmentSelect = (environment: VOAIEnvironment) => {
    setSelectedEnvironment(environment)
    setActiveOption(null)
    setExecutionResults([])
  }

  const handleOptionExecute = async (option: EnvironmentOption) => {
    setIsExecuting(true)
    setActiveOption(option)

    // Simulate execution time based on action complexity
    const executionTime = option.category === "combat" ? 2000 : option.category === "exploration" ? 1500 : 1000

    setTimeout(() => {
      const result = executeEnvironmentAction(selectedEnvironment.id, option.id)
      setExecutionResults((prev) => [result, ...prev.slice(0, 4)])

      // Update environment progress
      setEnvironmentProgress((prev) => ({
        ...prev,
        [selectedEnvironment.id]: Math.min((prev[selectedEnvironment.id] || 0) + 20, 100),
      }))

      setIsExecuting(false)
      setActiveOption(null)
    }, executionTime)
  }

  const getOptionCategoryColor = (category: EnvironmentOption["category"]) => {
    const colors = {
      interaction: "bg-blue-500/20 text-blue-300 border-blue-400/30",
      exploration: "bg-green-500/20 text-green-300 border-green-400/30",
      social: "bg-purple-500/20 text-purple-300 border-purple-400/30",
      utility: "bg-amber-500/20 text-amber-300 border-amber-400/30",
      combat: "bg-red-500/20 text-red-300 border-red-400/30",
    }
    return colors[category]
  }

  const getEnvironmentIcon = (envId: string) => {
    const icons = {
      wolf: Crown,
      forest: TreePine,
      mountain: Mountain,
      ocean: Waves,
      cyber: Cpu,
    }
    return icons[envId as keyof typeof icons] || Globe
  }

  const getHolographicEffect = (environmentId: string) => {
    const effects = {
      wolf: "shadow-lg shadow-gray-500/50",
      forest: "shadow-lg shadow-green-500/50",
      mountain: "shadow-lg shadow-blue-500/50",
      ocean: "shadow-lg shadow-cyan-500/50",
      cyber: "shadow-lg shadow-purple-500/50",
    }
    return effects[environmentId as keyof typeof effects] || "shadow-lg"
  }

  return (
    <div className="p-6 flex flex-col items-center gap-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
          Futuristic Command Center
        </h1>
        <p className="text-slate-400">Advanced AI Control Hub with VOAI Environment Integration</p>
      </motion.div>

      {/* Main Control Panel */}
      <Card className="w-full max-w-6xl bg-slate-800/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Command Center Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="widgets" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
              <TabsTrigger value="widgets">AI Widgets</TabsTrigger>
              <TabsTrigger value="environments">VOAI Environments</TabsTrigger>
              <TabsTrigger value="actions">Environment Actions</TabsTrigger>
              <TabsTrigger value="results">Execution Results</TabsTrigger>
            </TabsList>

            {/* AI Widgets Tab */}
            <TabsContent value="widgets" className="space-y-4">
              <div className="flex flex-wrap gap-2 pb-6">
                <Button
                  variant={active === "aiChat" ? "default" : "outline"}
                  onClick={() => setActive("aiChat")}
                  size="sm"
                  className="gap-1"
                >
                  <Brain className="w-4 h-4" /> AI Chat
                </Button>
                <Button
                  variant={active === "realVoice" ? "default" : "outline"}
                  onClick={() => setActive("realVoice")}
                  size="sm"
                  className="gap-1"
                >
                  <Mic className="w-4 h-4" /> Real Voice
                </Button>
                <Button
                  variant={active === "wolfVoice" ? "default" : "outline"}
                  onClick={() => setActive("wolfVoice")}
                  size="sm"
                  className="gap-1"
                >
                  <Crown className="w-4 h-4" /> Wolf Voice
                </Button>
                <Button
                  variant={active === "voaiEnvironments" ? "default" : "outline"}
                  onClick={() => setActive("voaiEnvironments")}
                  size="sm"
                  className="gap-1"
                >
                  <Globe className="w-4 h-4" /> VOAI Platform
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto gap-1"
                  onClick={() => setActive(null)}
                  title="Hide panel"
                >
                  × Close
                </Button>
              </div>
            </TabsContent>

            {/* VOAI Environments Tab */}
            <TabsContent value="environments" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Select Environment</h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setHolographicMode(!holographicMode)}
                    className={`${holographicMode ? "text-amber-400" : "text-slate-400"}`}
                  >
                    <Sparkles className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setAmbientSoundEnabled(!ambientSoundEnabled)}
                    className={`${ambientSoundEnabled ? "text-green-400" : "text-slate-400"}`}
                  >
                    {ambientSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {VOAI_ENVIRONMENTS.map((environment) => {
                  const IconComponent = getEnvironmentIcon(environment.id)
                  return (
                    <motion.div key={environment.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedEnvironment.id === environment.id
                            ? `bg-gradient-to-br ${environment.gradient} border-2 border-amber-400/50 ${holographicMode ? getHolographicEffect(environment.id) : ""}`
                            : "bg-slate-800/50 border-slate-600/50 hover:border-slate-500/50"
                        }`}
                        onClick={() => handleEnvironmentSelect(environment)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <motion.div
                                className="flex items-center space-x-2"
                                animate={
                                  selectedEnvironment.id === environment.id
                                    ? {
                                        scale: [1, 1.05, 1],
                                      }
                                    : {}
                                }
                                transition={{
                                  duration: 2,
                                  repeat: selectedEnvironment.id === environment.id ? Number.POSITIVE_INFINITY : 0,
                                }}
                              >
                                <span className="text-2xl">{environment.icon}</span>
                                <IconComponent className="w-5 h-5 text-purple-400" />
                              </motion.div>
                              <div>
                                <CardTitle className="text-sm text-white">{environment.name}</CardTitle>
                                <p className="text-xs text-slate-300">{environment.theme}</p>
                              </div>
                            </div>
                            {selectedEnvironment.id === environment.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
                              />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Mastery</span>
                              <span className="text-amber-400">{environmentProgress[environment.id] || 0}%</span>
                            </div>
                            <Progress value={environmentProgress[environment.id] || 0} className="h-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>

            {/* Environment Actions Tab */}
            <TabsContent value="actions" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">{selectedEnvironment.name} Actions</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{selectedEnvironment.icon}</span>
                  <Badge className={`bg-gradient-to-r ${selectedEnvironment.gradient} text-white border-0`}>
                    {selectedEnvironment.theme}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedEnvironment.options.map((option) => (
                  <motion.div key={option.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 ${
                        activeOption?.id === option.id
                          ? "bg-amber-500/20 border-amber-400/50"
                          : "bg-slate-800/30 border-slate-600/30 hover:border-slate-500/50"
                      }`}
                      onClick={() => !isExecuting && handleOptionExecute(option)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <motion.div
                            className="text-xl mt-1"
                            animate={
                              activeOption?.id === option.id
                                ? {
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 1,
                              repeat: activeOption?.id === option.id ? Number.POSITIVE_INFINITY : 0,
                            }}
                          >
                            {option.icon}
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-white text-sm">{option.name}</h4>
                              <Badge className={getOptionCategoryColor(option.category)}>{option.category}</Badge>
                            </div>
                            <p className="text-xs text-slate-300 mb-2">{option.description}</p>
                            {option.voiceCommand && (
                              <div className="text-xs text-amber-400 italic">Voice: "{option.voiceCommand}"</div>
                            )}
                          </div>
                        </div>

                        {activeOption?.id === option.id && isExecuting && (
                          <motion.div
                            className="mt-3 flex items-center space-x-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Zap className="w-4 h-4 text-amber-400" />
                            </motion.div>
                            <span className="text-xs text-amber-400">Executing action...</span>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Execution Results Tab */}
            <TabsContent value="results" className="space-y-4">
              <div className="space-y-3">
                {executionResults.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <div className="text-4xl mb-2">🎯</div>
                    <div>Execute environment actions to see results here</div>
                  </div>
                ) : (
                  executionResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-gradient-to-r from-green-800/30 to-blue-800/30 border-green-400/30">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="text-lg mt-1">✨</div>
                            <div className="flex-1">
                              <div className="text-sm text-green-100">{result}</div>
                              <div className="text-xs text-green-400 mt-1">{new Date().toLocaleTimeString()}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Active Widget Display */}
      {ActiveWidget && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-6xl border rounded-lg overflow-hidden shadow-lg bg-slate-800/30 border-purple-500/30"
        >
          <ActiveWidget />
        </motion.div>
      )}

      {/* Fallback when nothing selected */}
      {!ActiveWidget && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
          <p className="text-sm text-gray-500 italic">
            Select a module above to begin <span className="text-purple-500">🚀</span>
          </p>
        </motion.div>
      )}

      {/* New Dashboard Tab */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border-amber-400/30 mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-300">
            <Home className="w-5 h-5" />
            Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-slate-300">
            Add whatever additional widgets you like here – analytics, AI chat, etc.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default FuturisticCommandCenter
