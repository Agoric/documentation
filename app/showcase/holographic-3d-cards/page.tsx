"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Holographic3DCard } from "@/components/ui/holographic-3d-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

export default function Holographic3DCardsShowcase() {
  const [selectedVariant, setSelectedVariant] = React.useState<any>("diamond")
  const [hologramIntensity, setHologramIntensity] = React.useState<any>("medium")
  const [projectionHeight, setProjectionHeight] = React.useState([2])
  const [autoRotate, setAutoRotate] = React.useState(true)
  const [showParticles, setShowParticles] = React.useState(true)
  const [interactive, setInteractive] = React.useState(true)

  const variants = ["emerald", "sapphire", "ruby", "diamond", "obsidian", "platinum"]
  const intensities = ["low", "medium", "high", "maximum"]

  const cardData = [
    {
      variant: "diamond",
      title: "Snapifi Platform Citizen",
      subtitle: "Elite Financial Status",
      content: "Revolutionary 50-Year Loans • Premium Trading Access • Diplomatic Immunity",
      highlightWords: ["50-Year", "Premium", "Diplomatic"],
      achievementLevel: 5,
    },
    {
      variant: "emerald",
      title: "Investment Master",
      subtitle: "Portfolio Excellence",
      content: "Advanced Trading Algorithms • Market Analysis • Risk Management",
      highlightWords: ["Advanced", "Analysis", "Management"],
      achievementLevel: 4,
    },
    {
      variant: "sapphire",
      title: "Credit Champion",
      subtitle: "Perfect Score Achievement",
      content: "850 Credit Score • Premium Rates • Exclusive Benefits",
      highlightWords: ["850", "Premium", "Exclusive"],
      achievementLevel: 3,
    },
    {
      variant: "ruby",
      title: "Property Mogul",
      subtitle: "Real Estate Excellence",
      content: "Multiple Properties • Investment Returns • Market Leadership",
      highlightWords: ["Multiple", "Investment", "Leadership"],
      achievementLevel: 4,
    },
    {
      variant: "obsidian",
      title: "Diplomatic Agent",
      subtitle: "Platform Ambassador",
      content: "Immunity Status • Special Privileges • Global Access",
      highlightWords: ["Immunity", "Privileges", "Global"],
      achievementLevel: 5,
    },
    {
      variant: "platinum",
      title: "Savings Specialist",
      subtitle: "Financial Security",
      content: "Emergency Fund Complete • Goal Achievement • Future Secured",
      highlightWords: ["Complete", "Achievement", "Secured"],
      achievementLevel: 3,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            3D Holographic Card Projections
          </h1>
          <p className="text-xl text-gray-300">
            Revolutionary holographic cards with true depth, perspective, and immersive 3D effects
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300">
              🔮 Holographic Technology
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              ✨ 3D Projections
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
              🎯 Interactive Controls
            </Badge>
          </div>
        </motion.div>

        {/* Controls Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-sm rounded-xl p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Variant Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Hologram Variant</h3>
              <div className="grid grid-cols-2 gap-2">
                {variants.map((variant) => (
                  <Button
                    key={variant}
                    variant={selectedVariant === variant ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVariant(variant)}
                    className="capitalize"
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>

            {/* Intensity Control */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Hologram Intensity</h3>
              <div className="grid grid-cols-2 gap-2">
                {intensities.map((intensity) => (
                  <Button
                    key={intensity}
                    variant={hologramIntensity === intensity ? "default" : "outline"}
                    size="sm"
                    onClick={() => setHologramIntensity(intensity)}
                    className="capitalize"
                  >
                    {intensity}
                  </Button>
                ))}
              </div>
            </div>

            {/* Projection Height */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Projection Height: {projectionHeight[0]}m</h3>
              <Slider
                value={projectionHeight}
                onValueChange={setProjectionHeight}
                max={5}
                min={0.5}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Settings */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">3D Settings</h3>
              <div className="space-y-2">
                <Button
                  variant={autoRotate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="w-full"
                >
                  Auto Rotate {autoRotate ? "On" : "Off"}
                </Button>
                <Button
                  variant={showParticles ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowParticles(!showParticles)}
                  className="w-full"
                >
                  Particles {showParticles ? "On" : "Off"}
                </Button>
                <Button
                  variant={interactive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInteractive(!interactive)}
                  className="w-full"
                >
                  Interactive {interactive ? "On" : "Off"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Holographic Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-4xl">
            <Holographic3DCard
              variant={selectedVariant}
              title="Snapifi Platform Citizen"
              subtitle="Elite Financial Status"
              content="Revolutionary 50-Year Loans • Premium Trading Access • Diplomatic Immunity"
              highlightWords={["50-Year", "Premium", "Diplomatic"]}
              achievementLevel={5}
              autoRotate={autoRotate}
              hologramIntensity={hologramIntensity}
              projectionHeight={projectionHeight[0]}
              interactive={interactive}
              showParticles={showParticles}
            />
          </div>
        </motion.div>

        {/* Holographic Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-white">3D Holographic Card Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((card, index) => (
              <motion.div
                key={card.variant}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-96"
              >
                <Holographic3DCard
                  variant={card.variant as any}
                  title={card.title}
                  subtitle={card.subtitle}
                  content={card.content}
                  highlightWords={card.highlightWords}
                  achievementLevel={card.achievementLevel}
                  autoRotate={true}
                  hologramIntensity="medium"
                  projectionHeight={1.5}
                  interactive={true}
                  showParticles={true}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/20 backdrop-blur-sm rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Holographic Technology Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-cyan-400">3D Rendering</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• React Three Fiber</li>
                <li>• WebGL Shaders</li>
                <li>• Real-time Lighting</li>
                <li>• Perspective Camera</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-400">Holographic Effects</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Interference Patterns</li>
                <li>• Color Shifting</li>
                <li>• Fresnel Reflections</li>
                <li>• Scanline Effects</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-400">Interactive Features</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Orbit Controls</li>
                <li>• Auto Rotation</li>
                <li>• Zoom & Pan</li>
                <li>• Touch Support</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-400">Visual Effects</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• 3D Particles</li>
                <li>• Projection Beams</li>
                <li>• Floating Animation</li>
                <li>• Dynamic Materials</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
