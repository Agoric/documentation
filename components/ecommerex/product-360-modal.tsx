"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Pause, RotateCcw, ZoomIn, ZoomOut, ShoppingCart, BarChart3 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useProductComparison } from "@/contexts/product-comparison-context"

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
  images360?: string[]
}

interface Product360ModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function Product360Modal({ product, isOpen, onClose }: Product360ModalProps) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const autoRotateRef = useRef<NodeJS.Timeout>()

  const { addToComparison, removeFromComparison, isInComparison } = useProductComparison()
  const inComparison = isInComparison(product.id)

  // Generate 360° images (simulated with different angles of the same product)
  const images360 = product.images360 || Array.from({ length: 36 }, (_, i) => product.image)
  const totalFrames = images360.length

  // Preload images
  useEffect(() => {
    if (!isOpen) return

    const imagePromises = images360.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = src
      })
    })

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true)) // Continue even if some images fail
  }, [isOpen, images360])

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating && imagesLoaded) {
      autoRotateRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames)
      }, 100 / rotationSpeed)
    } else {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current)
      }
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current)
      }
    }
  }, [isAutoRotating, rotationSpeed, totalFrames, imagesLoaded])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setIsAutoRotating(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart
    const sensitivity = 2
    const frameChange = Math.floor(deltaX / sensitivity)

    if (Math.abs(frameChange) > 0) {
      setCurrentFrame((prev) => {
        const newFrame = (prev + frameChange) % totalFrames
        return newFrame < 0 ? totalFrames + newFrame : newFrame
      })
      setDragStart(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
    setIsAutoRotating(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const deltaX = e.touches[0].clientX - dragStart
    const sensitivity = 2
    const frameChange = Math.floor(deltaX / sensitivity)

    if (Math.abs(frameChange) > 0) {
      setCurrentFrame((prev) => {
        const newFrame = (prev + frameChange) % totalFrames
        return newFrame < 0 ? totalFrames + newFrame : newFrame
      })
      setDragStart(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Zoom handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + zoomDelta)))
  }

  const resetView = () => {
    setCurrentFrame(0)
    setZoom(1)
    setIsAutoRotating(false)
  }

  const toggleComparison = () => {
    if (inComparison) {
      removeFromComparison(product.id)
    } else {
      addToComparison(product)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-cyan-950/95 backdrop-blur-xl border-indigo-500/20">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <DialogTitle className="text-2xl font-bold text-white">{product.name}</DialogTitle>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
                ${product.price.toFixed(2)}
              </span>
              {product.isHolographic && (
                <Badge className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300">
                  Holographic
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>

        <div className="flex flex-1 gap-6">
          {/* 360° Viewer */}
          <div className="flex-1 flex flex-col">
            <div
              ref={containerRef}
              className="relative flex-1 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              {/* Loading State */}
              {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <p className="text-indigo-300">Loading 360° view...</p>
                  </div>
                </div>
              )}

              {/* 360° Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentFrame}
                  src={images360[currentFrame]}
                  alt={`${product.name} - View ${currentFrame + 1}`}
                  className="w-full h-full object-contain transition-transform duration-100"
                  style={{
                    transform: `scale(${zoom})`,
                    filter: product.isHolographic
                      ? "brightness(1.1) contrast(1.1) saturate(1.2)"
                      : "brightness(1) contrast(1) saturate(1)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                />
              </AnimatePresence>

              {/* Holographic Effects */}
              {product.isHolographic && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10 pointer-events-none"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Frame Indicator */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-white text-sm">
                  {currentFrame + 1} / {totalFrames}
                </span>
              </div>

              {/* Zoom Indicator */}
              {zoom !== 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-sm">{Math.round(zoom * 100)}%</span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4 p-4 bg-indigo-950/30 rounded-lg border border-indigo-500/20">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
                >
                  {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetView}
                  className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-indigo-300">Speed:</span>
                  <div className="w-20">
                    <Slider
                      value={[rotationSpeed]}
                      onValueChange={(value) => setRotationSpeed(value[0])}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm text-indigo-300 w-8">{rotationSpeed.toFixed(1)}x</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                  className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.min(3, zoom + 0.2))}
                  className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Info Sidebar */}
          <div className="w-80 flex flex-col gap-4">
            <div className="p-4 bg-indigo-950/30 rounded-lg border border-indigo-500/20">
              <h3 className="text-lg font-semibold text-white mb-2">Product Details</h3>
              <p className="text-sm text-indigo-200/70 mb-4">{product.description}</p>

              {product.holographicFeatures && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-indigo-300 mb-2">Holographic Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.holographicFeatures.map((feature, index) => (
                      <Badge
                        key={index}
                        className="text-xs bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-indigo-300">Category:</span>
                  <span className="text-white">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-300">Stock:</span>
                  <span className="text-white">{product.stock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-300">Rating:</span>
                  <span className="text-white">{product.rating}/5</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-700 hover:via-indigo-700 hover:to-purple-700 text-white"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                className="w-full border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
                onClick={toggleComparison}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                {inComparison ? "Remove from Comparison" : "Add to Comparison"}
              </Button>
            </div>

            {/* Platform Availability */}
            <div className="p-4 bg-indigo-950/30 rounded-lg border border-indigo-500/20">
              <h4 className="text-sm font-medium text-indigo-300 mb-2">Available on:</h4>
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
