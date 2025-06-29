"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAchievementSystem } from "@/hooks/use-achievement-system"

export default function RoyalDiamondCardsShowcase() {
  const [selectedVariant, setSelectedVariant] = React.useState<any>("diamond")
  const [selectedSize, setSelectedSize] = React.useState<any>("md")
  const [selectedIntensity, setSelectedIntensity] = React.useState<any>("moderate")
  const [selectedPattern, setSelectedPattern] = React.useState<any>("classic")
  const [premiumAnimation, setPremiumAnimation] = React.useState<any>("none")
  const [soundEnabled, setSoundEnabled] = React.useState(true)

  const { system, unlockAchievement, getCurrentCardVariant, getCurrentTitle } = useAchievementSystem()

  const variants = ["emerald", "sapphire", "ruby", "diamond", "obsidian", "platinum"]
  const sizes = ["sm", "md", "lg", "xl"]
  const intensities = ["subtle", "moderate", "intense", "maximum"]
  const patterns = ["classic", "geometric", "organic", "circuit", "royal", "futuristic"]
  const animations = ["none", "celebration", "achievement", "royal-entrance", "laser-show"]

  const triggerPremiumAnimation = (animation: string) => {
    setPremiumAnimation(animation)
    setTimeout(() => setPremiumAnimation("none"), 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Royal Diamond Slab Cards
          </h1>
          <p className="text-lg text-gray-300">
            Futuristic laser-engraved cards with diamond particle effects and premium animations
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary">Achievement Level: {system.currentLevel}</Badge>
            <Badge variant="secondary">
              Unlocked: {system.unlockedCount}/{system.totalCount}
            </Badge>
            <Badge variant="secondary">Current Title: {getCurrentTitle()}</Badge>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-sm rounded-xl p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Variant Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Card Variant</h3>
              <div className="grid grid-cols-3 gap-2">
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
              <h3 className="text-sm font-medium text-gray-300">Card Size</h3>
              <div className="grid grid-cols-4 gap-2">
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

            {/* Intensity Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Effect Intensity</h3>
              <div className="grid grid-cols-2 gap-2">
                {intensities.map((intensity) => (
                  <Button
                    key={intensity}
                    variant={selectedIntensity === intensity ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedIntensity(intensity)}
                    className="capitalize"
                  >
                    {intensity}
                  </Button>
                ))}
              </div>
            </div>

            {/* Pattern Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Laser Pattern</h3>
              <div className="grid grid-cols-3 gap-2">
                {patterns.map((pattern) => (
                  <Button
                    key={pattern}
                    variant={selectedPattern === pattern ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPattern(pattern)}
                    className="capitalize"
                  >
                    {pattern}
                  </Button>
                ))}
              </div>
            </div>

            {/* Animation Triggers */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Premium Animations</h3>
              <div className="grid grid-cols-2 gap-2">
                {animations.slice(1).map((animation) => (
                  <Button
                    key={animation}
                    variant="outline"
                    size="sm"
                    onClick={() => triggerPremiumAnimation(animation)}
                    className="capitalize"
                  >
                    {animation.replace("-", " ")}
                  </Button>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">Settings</h3>
              <div className="space-y-2">
                <Button
                  variant={soundEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="w-full"
                >
                  Sound {soundEnabled ? "On" : "Off"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => unlockAchievement("credit-score-boost")}
                  className="w-full"
                >
                  Unlock Achievement
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
          <RoyalDiamondSlabCard
            variant={selectedVariant}
            size={selectedSize}
            intensity={selectedIntensity}
            laserPattern={selectedPattern}
            premiumAnimation={premiumAnimation}
            soundEnabled={soundEnabled}
            achievementLevel={system.currentLevel}
            title="Snapifi Platform Citizen"
            subtitle="Elite Financial Status"
            content="Revolutionary 50-Year Loans • Premium Trading Access • Diplomatic Immunity"
            highlightWords={["50-Year", "Premium", "Diplomatic"]}
            particleCount={selectedIntensity === "maximum" ? 100 : selectedIntensity === "intense" ? 70 : 50}
          />
        </motion.div>

        {/* Card Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-white">Card Variants Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map((variant, index) => (
              <motion.div
                key={variant}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RoyalDiamondSlabCard
                  variant={variant as any}
                  size="md"
                  intensity="moderate"
                  laserPattern="classic"
                  soundEnabled={soundEnabled}
                  title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Card`}
                  subtitle="Premium Collection"
                  content="Laser-engraved excellence with diamond particle effects"
                  highlightWords={["Premium", "Laser-engraved"]}
                  achievementLevel={index + 1}
                  isUnlocked={system.unlockedCount > index}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-white">Achievement Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {system.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RoyalDiamondSlabCard
                  variant={achievement.rewards.cardVariant as any}
                  size="md"
                  intensity="moderate"
                  laserPattern={achievement.rewards.laserPattern as any}
                  soundEnabled={soundEnabled}
                  title={`${achievement.icon} ${achievement.title}`}
                  subtitle={`Level ${achievement.level} Achievement`}
                  content={achievement.description}
                  highlightWords={[achievement.title]}
                  achievementLevel={achievement.level}
                  isUnlocked={achievement.unlocked}
                  premiumAnimation={achievement.unlocked ? "none" : "none"}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
