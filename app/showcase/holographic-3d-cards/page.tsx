"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Holographic3DCard } from "@/components/ui/holographic-3d-card"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Holographic3DCardsShowcase() {
  const [selectedVariant, setSelectedVariant] = React.useState<any>("diamond")
  const [selectedSize, setSelectedSize] = React.useState<any>("md")
  const [perspective, setPerspective] = React.useState<any>("perspective")
  const [interactionMode, setInteractionMode] = React.useState<any>("orbit")
  const [autoRotate, setAutoRotate] = React.useState(true)
  const [holographicEffects, setHolographicEffects] = React.useState(true)
  const [depthLayers, setDepthLayers] = React.useState(5)
  const [hologramHeight, setHologramHeight] = React.useState(3)

  const variants = ["emerald", "sapphire", "ruby", "diamond", "obsidian", "platinum"]
  const sizes = ["sm", "md", "lg", "xl"]
  const perspectives = ["isometric", "perspective", "orthographic"]
  const interactions = ["orbit", "locked"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            3D Holographic Card Projections
          </h1>
          <p className="text-lg text-gray-300">
            Revolutionary three-dimensional holographic displays with authentic depth and perspective
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary">Real-time 3D Rendering</Badge>
            <Badge variant="secondary">Holographic Effects</Badge>
            <Badge variant="secondary">Interactive Controls</Badge>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Projection Size</h3>
              <div className="grid grid-cols-2 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="uppercase"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Perspective */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Camera Perspective</h3>
              <div className="grid grid-cols-1 gap-2">
                {perspectives.map((p) => (
                  <Button
                    key={p}
                    variant={perspective === p ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPerspective(p)}
                    className="capitalize"
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>

            {/* Interaction Mode */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Interaction</h3>
              <div className="grid grid-cols-1 gap-2">
                {interactions.map((mode) => (
                  <Button
                    key={mode}
                    variant={interactionMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setInteractionMode(mode)}
                    className="capitalize"
                  >
                    {mode}
                  </Button>
                ))}
                <Button
                  variant={autoRotate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAutoRotate(!autoRotate)}
                >
                  Auto Rotate
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Controls */}
          <div className="border-t border-white/10 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Depth Layers: {depthLayers}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={depthLayers}
                  onChange={(e) => setDepthLayers(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Hologram Height: {hologramHeight}</label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.5"
                  value={hologramHeight}
                  onChange={(e) => setHologramHeight(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-3">
                <Button
                  variant={holographicEffects ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHolographicEffects(!holographicEffects)}
                  className="w-full"
                >
                  Holographic Effects {holographicEffects ? "On" : "Off"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <Holographic3DCard
            variant={selectedVariant}
            size={selectedSize}
            perspective={perspective}
            interactionMode={interactionMode}
            autoRotate={autoRotate}
            holographicEffects={holographicEffects}
            depthLayers={depthLayers}
            hologramHeight={hologramHeight}
            title="Snapifi Platform Citizen"
            subtitle="Elite Holographic Status"
            content="Revolutionary 50-Year Loans • Premium Trading Access • Diplomatic Immunity • 3D Projection"
            achievementLevel={5}
            className="w-full max-w-2xl"
          >
            <RoyalDiamondSlabCard
              variant={selectedVariant}
              size={selectedSize}
              title="Traditional 2D Version"
              subtitle="Hover to Compare"
              content="Same content in traditional 2D format"
            />
          </Holographic3DCard>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-white">3D Holographic Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map((variant, index) => (
              <motion.div
                key={variant}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Holographic3DCard
                  variant={variant as any}
                  size="md"
                  perspective="perspective"
                  interactionMode="orbit"
                  autoRotate={true}
                  holographicEffects={true}
                  depthLayers={3}
                  hologramHeight={2.5}
                  title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Hologram`}
                  subtitle="3D Projection"
                  content="Advanced holographic display with multi-layer depth rendering"
                  achievementLevel={index + 1}
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
          className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4">Holographic Technology Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-cyan-400">3D Rendering</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Real-time Three.js rendering</li>
                <li>• Multi-layer depth projection</li>
                <li>• Dynamic particle systems</li>
                <li>• Volumetric lighting effects</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-cyan-400">Holographic Effects</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Scanning beam projectors</li>
                <li>• Holographic grid overlay</li>
                <li>• Depth-based transparency</li>
                <li>• Emissive material shaders</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-cyan-400">Interactive Features</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Orbital camera controls</li>
                <li>• Perspective switching</li>
                <li>• Auto-rotation modes</li>
                <li>• Fullscreen projection</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
