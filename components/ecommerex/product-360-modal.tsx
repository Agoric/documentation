"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Pause, RotateCcw, ZoomIn, ZoomOut, ShoppingCart, Heart, Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { HolographicLabel } from "./holographic-label"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  stock: number
  platforms: string[]
  isHolographic?: boolean
  holographicFeatures?: string[]
  has360View?: boolean
}

interface Product360ModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export function Product360Modal({ isOpen, onClose, product }: Product360ModalProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const [autoRotationSpeed, setAutoRotationSpeed] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showControls, setShowControls] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  const viewerRef = useRef<HTMLDivElement>(null)
  const autoRotationRef = useRef<number>()

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating) {
      const animate = () => {
        setRotation((prev) => ({
          ...prev,
          y: (prev.y + autoRotationSpeed) % 360,
        }))
        autoRotationRef.current = requestAnimationFrame(animate)
      }
      autoRotationRef.current = requestAnimationFrame(animate)
    } else {
      if (autoRotationRef.current) {
        cancelAnimationFrame(autoRotationRef.current)
      }
    }

    return () => {
      if (autoRotationRef.current) {
        cancelAnimationFrame(autoRotationRef.current)
      }
    }
  }, [isAutoRotating, autoRotationSpeed])

  // Mouse/touch event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setIsAutoRotating(false)
    setDragStart({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y

      setRotation((prev) => ({
        x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
        y: (prev.y + deltaX * 0.5) % 360,
      }))

      setDragStart({ x: e.clientX, y: e.clientY })
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Zoom handlers
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)))
  }, [])

  // Reset functions
  const resetView = () => {
    setRotation({ x: 0, y: 0 })
    setZoom(1)
    setIsAutoRotating(false)
  }

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating)
  }

  // Generate 360° view transform
  const getTransform = () => {
    return `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-cyan-950/95 backdrop-blur-xl border-indigo-500/20">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text">
            360° Product View
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* 360° Viewer */}
          <div className="flex-1 relative">
            <div
              ref={viewerRef}
              className="w-full h-full bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{ touchAction: "none" }}
            >
              {/* 3D Product Container */}
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  className="relative"
                  style={{
                    transform: getTransform(),
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    filter: product.isHolographic
                      ? [
                          "brightness(1.1) contrast(1.1) saturate(1.2) hue-rotate(0deg)",
                          "brightness(1.2) contrast(1.2) saturate(1.3) hue-rotate(10deg)",
                          "brightness(1.1) contrast(1.1) saturate(1.2) hue-rotate(0deg)",
                        ]
                      : "brightness(1) contrast(1) saturate(1)",
                  }}
                  transition={{
                    duration: 3,
                    repeat: product.isHolographic ? Number.POSITIVE_INFINITY : 0,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-contain max-w-full max-h-full"
                    priority
                  />

                  {/* Holographic Effects */}
                  {product.isHolographic && (
                    <>
                      {/* Holographic Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-400/20 rounded-lg"
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                          background: [
                            "linear-gradient(45deg, rgba(34, 211, 238, 0.2), transparent, rgba(168, 85, 247, 0.2))",
                            "linear-gradient(135deg, rgba(168, 85, 247, 0.2), transparent, rgba(34, 211, 238, 0.2))",
                            "linear-gradient(45deg, rgba(34, 211, 238, 0.2), transparent, rgba(168, 85, 247, 0.2))",
                          ],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Floating Particles */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400/60 to-purple-400/60"
                            animate={{
                              x: [Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200],
                              y: [Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200],
                              opacity: [0, 1, 0],
                              scale: [0.5, 1.5, 0.5],
                            }}
                            transition={{
                              duration: Math.random() * 4 + 3,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                            style={{
                              left: "50%",
                              top: "50%",
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Holographic Label */}
              {product.isHolographic && (
                <div className="absolute top-4 left-4">
                  <HolographicLabel variant="premium" features={product.holographicFeatures} />
                </div>
              )}

              {/* 360° Indicator */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">360° View</Badge>
              </div>

              {/* Controls Overlay */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  >
                    <Card className="bg-black/50 backdrop-blur-md border-indigo-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleAutoRotation}
                            className="text-white hover:bg-white/10"
                          >
                            {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={resetView}
                            className="text-white hover:bg-white/10"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>

                          <div className="flex items-center gap-2">
                            <ZoomOut className="h-4 w-4 text-white" />
                            <Slider
                              value={[zoom]}
                              onValueChange={(value) => setZoom(value[0])}
                              min={0.5}
                              max={3}
                              step={0.1}
                              className="w-20"
                            />
                            <ZoomIn className="h-4 w-4 text-white" />
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white">Speed:</span>
                            <Slider
                              value={[autoRotationSpeed]}
                              onValueChange={(value) => setAutoRotationSpeed(value[0])}
                              min={0.5}
                              max={3}
                              step={0.5}
                              className="w-16"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Product Information Panel */}
          <div className="w-80 space-y-4">
            <Card className="bg-indigo-950/30 border-indigo-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-indigo-200/70 text-sm mb-4">{product.description}</p>

                <div className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-3xl font-bold ${
                        product.isHolographic
                          ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                          : "text-white"
                      }`}
                    >
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge className="bg-emerald-600 text-white">{product.stock} in stock</Badge>
                  </div>

                  {/* Holographic Features */}
                  {product.isHolographic && product.holographicFeatures && (
                    <div>
                      <h4 className="text-sm font-semibold text-indigo-300 mb-2">Holographic Features:</h4>
                      <div className="space-y-1">
                        {product.holographicFeatures.map((feature, index) => (
                          <Badge
                            key={index}
                            className="text-xs bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300 mr-1 mb-1"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Platforms */}
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-300 mb-2">Available on:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.platforms.map((platform) => (
                        <Badge
                          key={platform}
                          variant="outline"
                          className="text-xs border-indigo-400/30 text-indigo-300 capitalize"
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      className={`w-full text-white ${
                        product.isHolographic
                          ? "bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-700 hover:via-indigo-700 hover:to-purple-700"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-indigo-500/20 text-indigo-300 hover:bg-indigo-900/30"
                        onClick={() => setIsLiked(!isLiked)}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                        {isLiked ? "Liked" : "Like"}
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1 border-indigo-500/20 text-indigo-300 hover:bg-indigo-900/30"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-indigo-950/20 border-indigo-500/10">
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold text-indigo-300 mb-2">How to use:</h4>
                <ul className="text-xs text-indigo-200/70 space-y-1">
                  <li>• Drag to rotate the product</li>
                  <li>• Scroll to zoom in/out</li>
                  <li>• Use controls to auto-rotate</li>
                  <li>• Click reset to return to original view</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
