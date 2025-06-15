"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Pause, RotateCcw, ZoomIn, ZoomOut, ShoppingCart, BarChart3 } from "lucide-react"
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

  // Generate 360° images (simulated - in real app these would be actual 360° photos)
  const images360 =
    product.images360 ||
    Array.from({ length: 36 }, (_, i) => `/products/${product.id}-360-${String(i + 1).padStart(2, "0")}.jpg`)

  const totalFrames = images360.length

  // Preload images
  useEffect(() => {
    if (!isOpen) return

    const preloadImages = async () => {
      const imagePromises = images360.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = () => resolve(null) // Don't reject, just resolve with null
          img.src = src
        })
      })

      await Promise.all(imagePromises)
      setImagesLoaded(true)
    }

    preloadImages()
  }, [isOpen, images360])

  // Auto rotation
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

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imagesLoaded) return
    setIsDragging(true)
    setDragStart(e.clientX)
    setIsAutoRotating(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imagesLoaded) return

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

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!imagesLoaded) return
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
    setIsAutoRotating(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !imagesLoaded) return

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

  // Handle zoom
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

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-6xl h-full max-h-[90vh] bg-gradient-to-br from-indigo-950/90 via-purple-950/90 to-cyan-950/90 backdrop-blur-md border border-indigo-500/20 rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-indigo-500/20">
            <div>
              <h2 className="text-2xl font-bold text-white">{product.name}</h2>
              <p className="text-indigo-200/70">360° Product View</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-indigo-300 hover:text-white hover:bg-indigo-900/30"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row h-full">
            {/* 360° Viewer */}
            <div className="flex-1 relative">
              <div
                ref={containerRef}
                className="relative w-full h-full min-h-[400px] lg:min-h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
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
                  <div className="absolute inset-0 flex items-center justify-center bg-indigo-900/20">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto mb-4"
                      />
                      <p className="text-indigo-200">Loading 360° view...</p>
                    </div>
                  </div>
                )}

                {/* 360° Image */}
                {imagesLoaded && (
                  <motion.img
                    key={currentFrame}
                    src={images360[currentFrame] || product.image}
                    alt={`${product.name} - View ${currentFrame + 1}`}
                    className="w-full h-full object-contain transition-transform duration-100"
                    style={{
                      transform: `scale(${zoom})`,
                      filter: product.isHolographic ? "brightness(1.1) contrast(1.1) saturate(1.2)" : "none",
                    }}
                    onError={(e) => {
                      // Fallback to main product image
                      e.currentTarget.src = product.image
                    }}
                  />
                )}

                {/* Holographic Effects */}
                {product.isHolographic && imagesLoaded && (
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10"
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Floating particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400/60 to-purple-400/60"
                        animate={{
                          x: [0, Math.random() * 100 - 50],
                          y: [0, Math.random() * 100 - 50],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.3,
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Progress Indicator */}
                {imagesLoaded && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm">
                        {currentFrame + 1} / {totalFrames}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  disabled={!imagesLoaded}
                  className="bg-black/50 backdrop-blur-sm border-indigo-500/20 text-indigo-300 hover:text-white"
                >
                  {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetView}
                  disabled={!imagesLoaded}
                  className="bg-black/50 backdrop-blur-sm border-indigo-500/20 text-indigo-300 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.min(3, zoom + 0.2))}
                  disabled={!imagesLoaded}
                  className="bg-black/50 backdrop-blur-sm border-indigo-500/20 text-indigo-300 hover:text-white"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                  disabled={!imagesLoaded}
                  className="bg-black/50 backdrop-blur-sm border-indigo-500/20 text-indigo-300 hover:text-white"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>

              {/* Speed Control */}
              {isAutoRotating && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 min-w-[200px]">
                  <p className="text-white text-sm mb-2">Rotation Speed</p>
                  <Slider
                    value={[rotationSpeed]}
                    onValueChange={(value) => setRotationSpeed(value[0])}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-indigo-200 mt-1">
                    <span>0.5x</span>
                    <span>{rotationSpeed.toFixed(1)}x</span>
                    <span>2x</span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info Sidebar */}
            <div className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-indigo-500/20 bg-gradient-to-b from-indigo-950/50 to-purple-950/50">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-indigo-200/70 text-sm">{product.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
                    ${product.price.toFixed(2)}
                  </div>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    {product.category}
                  </Badge>
                </div>

                {product.isHolographic && (
                  <div>
                    <p className="text-sm text-indigo-300 mb-2">Holographic Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.holographicFeatures?.map((feature, index) => (
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

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-700 hover:via-indigo-700 hover:to-purple-700 text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (inComparison) {
                        removeFromComparison(product.id)
                      } else {
                        addToComparison(product)
                      }
                    }}
                    className={`border-indigo-500/20 ${
                      inComparison
                        ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-300"
                        : "bg-indigo-950/30 text-indigo-300"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-xs text-indigo-200/50 pt-4">
                  <p>💡 Drag to rotate • Scroll to zoom • Click play for auto-rotation</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
