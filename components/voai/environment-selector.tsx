"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Volume2, VolumeX, Sparkles, Zap, Eye } from "lucide-react"
import {
  VOAI_ENVIRONMENTS,
  executeEnvironmentAction,
  type VOAIEnvironment,
  type EnvironmentOption,
} from "@/lib/voai-environments"

interface EnvironmentSelectorProps {
  onEnvironmentChange?: (environment: VOAIEnvironment) => void
  onActionExecute?: (environment: string, action: string, result: string) => void
}

export function EnvironmentSelector({ onEnvironmentChange, onActionExecute }: EnvironmentSelectorProps) {
  const [selectedEnvironment, setSelectedEnvironment] = useState<VOAIEnvironment>(VOAI_ENVIRONMENTS[0])
  const [activeOption, setActiveOption] = useState<EnvironmentOption | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResults, setExecutionResults] = useState<string[]>([])
  const [holographicMode, setHolographicMode] = useState(true)
  const [ambientSoundEnabled, setAmbientSoundEnabled] = useState(true)
  const [environmentProgress, setEnvironmentProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    onEnvironmentChange?.(selectedEnvironment)
  }, [selectedEnvironment, onEnvironmentChange])

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

      onActionExecute?.(selectedEnvironment.id, option.id, result)
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
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          VOAI Environment Platform
        </motion.h1>
        <p className="text-slate-400">Select your environment and execute immersive actions</p>
      </div>

      {/* Environment Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {VOAI_ENVIRONMENTS.map((environment) => (
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
                      className="text-3xl"
                      animate={
                        selectedEnvironment.id === environment.id
                          ? {
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: selectedEnvironment.id === environment.id ? Number.POSITIVE_INFINITY : 0,
                      }}
                    >
                      {environment.icon}
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg text-white">{environment.name}</CardTitle>
                      <p className="text-sm text-slate-300">{environment.theme}</p>
                    </div>
                  </div>
                  {selectedEnvironment.id === environment.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-slate-400 mb-3">{environment.description}</p>

                {/* Environment Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Mastery Progress</span>
                    <span className="text-amber-400">{environmentProgress[environment.id] || 0}%</span>
                  </div>
                  <Progress value={environmentProgress[environment.id] || 0} className="h-1" />
                </div>

                {/* Special Features */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {environment.specialFeatures.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Environment Details */}
      <Card className={`bg-gradient-to-br ${selectedEnvironment.gradient} border-amber-400/30`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className="text-4xl"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                {selectedEnvironment.icon}
              </motion.div>
              <div>
                <CardTitle className="text-2xl text-white">{selectedEnvironment.name}</CardTitle>
                <p className="text-slate-200">{selectedEnvironment.description}</p>
              </div>
            </div>

            {/* Environment Controls */}
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
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="actions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="actions">Environment Actions</TabsTrigger>
              <TabsTrigger value="boosts">Personality Boosts</TabsTrigger>
              <TabsTrigger value="results">Execution Results</TabsTrigger>
            </TabsList>

            <TabsContent value="actions" className="space-y-4">
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
                            className="text-2xl mt-1"
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

            <TabsContent value="boosts" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {selectedEnvironment.personalityBoosts.map((boost, index) => (
                  <motion.div
                    key={boost}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 border-purple-400/30">
                      <CardContent className="p-3 text-center">
                        <div className="text-lg mb-1">⚡</div>
                        <div className="text-sm font-medium text-purple-300">{boost}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-3">Special Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedEnvironment.specialFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-gradient-to-br from-cyan-800/30 to-teal-800/30 border-cyan-400/30">
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-cyan-300">{feature}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <div className="space-y-3">
                {executionResults.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <div className="text-4xl mb-2">🎯</div>
                    <div>Execute actions to see results here</div>
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
    </div>
  )
}
