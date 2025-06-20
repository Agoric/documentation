"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Maximize2, RotateCcw, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface PropertyImageGalleryProps {
  images: string[]
  title: string
  isHolographic?: boolean
  has360View?: boolean
  onView360?: () => void
}

export function PropertyImageGallery({
  images,
  title,
  isHolographic = false,
  has360View = false,
  onView360,
}: PropertyImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }))
  }

  const getImageUrl = (url: string, index: number) => {
    if (imageError[index]) {
      return `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(`Property Image ${index + 1}`)}`
    }
    return url
  }

  return (
    <>
      <div className="relative group">
        {/* Main Image Display */}
        <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
          <Image
            src={getImageUrl(images[currentIndex], currentIndex) || "/placeholder.svg"}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            style={{
              filter: isHolographic
                ? "brightness(1.2) contrast(1.2) saturate(1.3) hue-rotate(5deg)"
                : "brightness(1.1) contrast(1.1) saturate(1.1)",
            }}
            onError={() => handleImageError(currentIndex)}
            priority={currentIndex === 0}
          />

          {/* Holographic Overlay */}
          {isHolographic && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"
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

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Top Action Buttons */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            {has360View && (
              <Button
                size="sm"
                className="bg-cyan-600/80 backdrop-blur-sm hover:bg-cyan-600 text-white"
                onClick={onView360}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                360° View
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Property Badges */}
          <div className="absolute bottom-2 left-2 flex gap-2">
            {isHolographic && (
              <Badge className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white">Holographic Enhanced</Badge>
            )}
            {has360View && (
              <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">360° Tour Available</Badge>
            )}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex
                    ? "border-cyan-400 ring-2 ring-cyan-400/50"
                    : "border-transparent hover:border-indigo-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={getImageUrl(image, index) || "/placeholder.svg"}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(index)}
                />
                {index === currentIndex && <div className="absolute inset-0 bg-cyan-400/20" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl w-full h-full max-h-screen p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={getImageUrl(images[currentIndex], currentIndex) || "/placeholder.svg"}
              alt={`${title} - Fullscreen`}
              fill
              className="object-contain"
              onError={() => handleImageError(currentIndex)}
            />

            {/* Fullscreen Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
                onClick={() => {
                  // Download functionality
                  const link = document.createElement("a")
                  link.href = images[currentIndex]
                  link.download = `${title}-image-${currentIndex + 1}.jpg`
                  link.click()
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
                onClick={() => {
                  // Share functionality
                  if (navigator.share) {
                    navigator.share({
                      title: title,
                      url: images[currentIndex],
                    })
                  }
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
                onClick={() => setIsFullscreen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Fullscreen Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Fullscreen Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              {currentIndex + 1} of {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
