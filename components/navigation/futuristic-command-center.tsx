"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Crown, Mic, Volume2, VolumeX, Sparkles, Zap, Globe, Mountain, Waves, TreePine, Cpu } from "lucide-react"
import { motion } from "framer-motion"
import { VOAI_ENVIRONMENTS, type VOAIEnvironment } from "@/lib/voai-environments"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  const [active, setActive] = useState<WidgetKey | null>(null)
  const [selectedEnvironment, setSelectedEnvironment] = useState<VOAIEnvironment>(VOAI_ENVIRONMENTS[0])
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResults, setExecutionResults] = useState<string[]>([])
  const [holographicMode, setHolographicMode] = useState(true)
  const [ambientSoundEnabled, setAmbientSoundEnabled] = useState(true)
  const [environmentProgress, setEnvironmentProgress] = useState<Record<string, number>>({})
  const [activeEnv, setActiveEnv] = useState<VOAIEnvironment | null>(null)

  /* ---- 3.  Derive component safely with optional chaining --------------- */
  const ActiveWidget = active ? widgetMap[active] : null
  const ReadyWidget =
    // React.lazy returns an object; dynamic() returns a fn _after_ load
    ActiveWidget && (typeof ActiveWidget === "function" || ActiveWidget.$$typeof) ? ActiveWidget : null

  const handleEnvironmentSelect = (environment: VOAIEnvironment) => {
    setSelectedEnvironment(environment)
    setActiveAction(null)
    setExecutionResults([])
    setActiveEnv(environment)
  }

  const handleActionExecute = (action: string) => {
    setIsExecuting(true)
    setActiveAction(action)

    // Simulate execution time based on action complexity
    const executionTime = 1000

    setTimeout(() => {
      const result = `Executed ${action} in ${selectedEnvironment.name}`
      setExecutionResults((prev) => [result, ...prev.slice(0, 4)])

      // Update environment progress
      setEnvironmentProgress((prev) => ({
        ...prev,
        [selectedEnvironment.id]: Math.min((prev[selectedEnvironment.id] || 0) + 20, 100),
      }))

      setIsExecuting(false)
      setActiveAction(null)
    }, executionTime)
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

  const getEnvironmentGradient = (environmentId: string) => {
    const gradients = {
      wolf: "from-gray-700 via-gray-900 to-black",
      forest: "from-green-700 via-green-900 to-black",
      mountain: "from-blue-700 via-blue-900 to-black",
      ocean: "from-cyan-700 via-cyan-900 to-black",
      cyber: "from-purple-700 via-purple-900 to-black",
    }
    return gradients[environmentId as keyof typeof gradients] || "from-slate-700 via-slate-900 to-black"
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
              <TabsTrigger value="actions" disabled={!activeEnv}>
                {activeEnv ? `${activeEnv.emoji}  ${activeEnv.name}` : "Actions"}
              </TabsTrigger>
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

              <ScrollArea className="h-56 pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {VOAI_ENVIRONMENTS.map((environment) => {
                    const IconComponent = getEnvironmentIcon(environment.id)
                    return (
                      <motion.div key={environment.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                          onClick={() => handleEnvironmentSelect(environment)}
                          className={`rounded-lg border border-indigo-500/40 p-4 text-left transition hover:border-amber-400/70 hover:bg-indigo-800/40 ${
                            selectedEnvironment.id === environment.id
                              ? `bg-gradient-to-br ${getEnvironmentGradient(environment.id)} border-2 border-amber-400/50 ${holographicMode ? getHolographicEffect(environment.id) : ""}`
                              : "bg-slate-800/50 border-slate-600/50 hover:border-slate-500/50"
                          }`}
                        >
                          <h3 className="text-lg font-semibold text-amber-300 flex items-center gap-2">
                            <span className="text-2xl">{environment.emoji}</span> {environment.name}
                          </h3>
                          <p className="mt-1 text-sm text-indigo-200">{environment.description}</p>
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Environment Actions Tab */}
            <TabsContent value="actions" className="space-y-4">
              {activeEnv ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-amber-300 flex items-center gap-2">
                    <span className="text-2xl">{activeEnv.emoji}</span>
                    {activeEnv.name} Actions
                  </h3>
                  <ul className="space-y-2">
                    {activeEnv.actions.map((action) => (
                      <li
                        key={action}
                        className="rounded-md border border-indigo-500/40 px-3 py-2 text-indigo-200 hover:border-amber-400/70 hover:bg-indigo-800/40"
                        onClick={() => !isExecuting && handleActionExecute(action)}
                      >
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-indigo-200">Select an environment first.</p>
              )}
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
                  executionResults.map((result, index) => {
                    const action = result.split(" ")[1] // Extract action from result string
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-gradient-to-r from-green-800/30 to-blue-800/30 border-green-400/30">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <motion.div
                                className="text-xl mt-1"
                                animate={
                                  activeAction === action
                                    ? {
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0],
                                      }
                                    : {}
                                }
                                transition={{
                                  duration: 1,
                                  repeat: activeAction === action ? Number.POSITIVE_INFINITY : 0,
                                }}
                              >
                                {action}
                              </motion.div>
                              <div className="flex-1">
                                <h4 className="font-medium text-white text-sm">{action}</h4>
                              </div>
                            </div>

                            {activeAction === action && isExecuting && (
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
                    )
                  })
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Active Widget Display */}
      {ReadyWidget && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-6xl border rounded-lg overflow-hidden shadow-lg bg-slate-800/30 border-purple-500/30"
        >
          <ReadyWidget />
        </motion.div>
      )}

      {/* Fallback when nothing selected */}
      {!ReadyWidget && (
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
