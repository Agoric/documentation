"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, RotateCcw, ZoomIn, ZoomOut, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Property {
  id: string
  title: string
  images360?: string[]
  isHolographic?: boolean
  holographicFeatures?: string[]
  price: number
  location: string
}

interface Property360ModalProps {
  property: Property
  isOpen: boolean
  onClose: () => void
}

export function Property360Modal({ property, isOpen, onClose }: Property360ModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, imageIndex: 0 })
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [showInfo, setShowInfo] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoRotateRef = useRef<NodeJS.Timeout>()

  const images = property.images360 || []
  const totalImages = images.length

  useEffect(() => {
    if (isAutoRotating && totalImages > 0) {
      autoRotateRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % totalImages)
      }, 200)
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
  }, [isAutoRotating, totalImages])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setIsAutoRotating(false)
    setDragStart({ x: e.clientX, imageIndex: currentImageIndex })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const sensitivity = 3
    const imageOffset = Math.floor(deltaX / sensitivity)
    const newIndex = (dragStart.imageIndex + imageOffset) % totalImages

    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex < 0 ? totalImages + newIndex : newIndex)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return `$${(price / 1000).toFixed(0)}K`
  }

  if (!isOpen || images.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-6xl mx-4 bg-gradient-to-br from-indigo-950 via-purple-950 to-cyan-950 rounded-lg overflow-hidden border border-indigo-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Holographic Background */}
          {property.isHolographic && (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-indigo-400/10 to-purple-400/10" />
              <motion.div
                className="absolute inset-0 border border-cyan-400/30 rounded-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.005, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </>
          )}

          {/* Header */}
          <div className="relative z-20 flex items-center justify-between p-4 border-b border-indigo-500/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: isAutoRotating ? 360 : 0 }}
                  transition={{ duration: 2, repeat: isAutoRotating ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                >
                  <RotateCcw className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <h2
                  className={`text-xl font-bold ${
                    property.isHolographic
                      ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                      : "text-white"
                  }`}
                >
                  360° Property Tour
                </h2>
              </div>
              {property.isHolographic && (
                <Badge className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white">Holographic Enhanced</Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
                className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
              >
                <Info className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(zoom === 1 ? 1.5 : 1)}
                className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
              >
                {zoom === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="border-red-500/20 bg-red-950/30 text-red-300 hover:bg-red-900/30"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 360° Viewer */}
          <div className="relative aspect-video bg-black">
            <div
              ref={containerRef}
              className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <motion.div className="relative w-full h-full" style={{ scale: zoom }} transition={{ duration: 0.3 }}>
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${property.title} - 360° view ${currentImageIndex + 1}`}
                  fill
                  className="object-cover select-none"
                  draggable={false}
                  priority
                />

                {/* Holographic Overlay Effect */}
                {property.isHolographic && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>

              {/* Drag instruction overlay */}
              {!isDragging && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isDragging ? 0 : 0.7 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                    Drag to rotate • Click and hold to explore
                  </div>
                </motion.div>
              )}
            </div>

            {/* Property Info Overlay */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`text-lg font-bold mb-1 ${
                          property.isHolographic
                            ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                            : "text-white"
                        }`}
                      >
                        {property.title}
                      </h3>
                      <p className="text-indigo-200/70 text-sm mb-2">{property.location}</p>
                      {property.isHolographic && property.holographicFeatures && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {property.holographicFeatures.slice(0, 3).map((feature, index) => (
                            <Badge
                              key={index}
                              className="text-xs bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        property.isHolographic
                          ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                          : "text-white"
                      }`}
                    >
                      {formatPrice(property.price)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="relative z-20 flex items-center justify-between p-4 border-t border-indigo-500/20">
            <div className="flex items-center gap-4">
              <div className="text-sm text-indigo-200/70">
                Image {currentImageIndex + 1} of {totalImages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`border-indigo-500/20 text-indigo-300 hover:text-indigo-200 transition-all duration-200 ${
                    isAutoRotating
                      ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-300 hover:bg-emerald-900/30"
                      : "bg-indigo-950/30 hover:bg-indigo-900/30"
                  }`}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {isAutoRotating ? "Stop Auto" : "Auto Rotate"}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-indigo-300/50">
              <span>Drag to rotate</span>
              <span>•</span>
              <span>Scroll to zoom</span>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-900/30">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
              style={{
                width: `${((currentImageIndex + 1) / totalImages) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
