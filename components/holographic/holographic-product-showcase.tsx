"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Eye,
  Settings,
  Share,
  Heart,
  ArrowLeft,
  ArrowRight,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"

interface HolographicProduct {
  id: string
  name: string
  description: string
  price: number
  category: string
  rating: number
  reviews: number
  holographicLevel: "basic" | "premium" | "ultra"
  features: string[]
  specifications: Record<string, string>
  media: {
    images: string[]
    videos: string[]
    holographicData: string[]
  }
  animations: {
    rotation: boolean
    floating: boolean
    particles: boolean
    glow: boolean
  }
  interactivity: {
    clickable: boolean
    hoverable: boolean
    draggable: boolean
    zoomable: boolean
  }
}

const mockProducts: HolographicProduct[] = [
  {
    id: "holo_001",
    name: "Quantum Investment Portfolio",
    description:
      "Advanced AI-powered investment portfolio with holographic visualization and real-time market analysis",
    price: 50000,
    category: "Investment",
    rating: 4.9,
    reviews: 1247,
    holographicLevel: "ultra",
    features: [
      "Real-time 3D Market Visualization",
      "AI-Powered Risk Assessment",
      "Quantum Computing Integration",
      "Holographic Portfolio Analytics",
      "Neural Network Predictions",
    ],
    specifications: {
      "Processing Power": "Quantum-Enhanced",
      "Data Sources": "10,000+ Global Markets",
      "Update Frequency": "Real-time",
      "AI Model": "GPT-5 Financial",
      Security: "Quantum Encryption",
    },
    media: {
      images: ["/placeholder.svg?height=400&width=600&text=Quantum+Portfolio"],
      videos: ["/placeholder.mp4"],
      holographicData: ["quantum_portfolio.holo"],
    },
    animations: {
      rotation: true,
      floating: true,
      particles: true,
      glow: true,
    },
    interactivity: {
      clickable: true,
      hoverable: true,
      draggable: true,
      zoomable: true,
    },
  },
  {
    id: "holo_002",
    name: "Imperial Real Estate Empire",
    description: "Luxury real estate investment platform with holographic property tours and imperial-grade analytics",
    price: 75000,
    category: "Real Estate",
    rating: 4.8,
    reviews: 892,
    holographicLevel: "premium",
    features: [
      "360° Holographic Property Tours",
      "Imperial Market Analysis",
      "Luxury Property Curation",
      "Global Investment Opportunities",
      "Aristocratic Advisory Services",
    ],
    specifications: {
      "Property Database": "1M+ Global Properties",
      "Tour Quality": "8K Holographic",
      "Market Coverage": "150+ Countries",
      "Advisory Level": "White-Glove Service",
      "Investment Minimum": "$100,000",
    },
    media: {
      images: ["/placeholder.svg?height=400&width=600&text=Imperial+Estate"],
      videos: ["/placeholder.mp4"],
      holographicData: ["imperial_estate.holo"],
    },
    animations: {
      rotation: true,
      floating: false,
      particles: true,
      glow: true,
    },
    interactivity: {
      clickable: true,
      hoverable: true,
      draggable: false,
      zoomable: true,
    },
  },
  {
    id: "holo_003",
    name: "Supreme Authority Bonds",
    description: "Ultra-premium bond portfolio with sovereign-grade security and holographic yield visualization",
    price: 100000,
    category: "Bonds",
    rating: 5.0,
    reviews: 456,
    holographicLevel: "ultra",
    features: [
      "Sovereign-Grade Security",
      "Holographic Yield Tracking",
      "Supreme Authority Backing",
      "Global Bond Diversification",
      "Imperial Guarantee Program",
    ],
    specifications: {
      "Minimum Investment": "$100,000",
      "Yield Range": "8-15% APY",
      "Security Rating": "AAA+ Supreme",
      "Term Options": "1-50 Years",
      Backing: "Supreme Authority",
    },
    media: {
      images: ["/placeholder.svg?height=400&width=600&text=Supreme+Bonds"],
      videos: ["/placeholder.mp4"],
      holographicData: ["supreme_bonds.holo"],
    },
    animations: {
      rotation: false,
      floating: true,
      particles: true,
      glow: true,
    },
    interactivity: {
      clickable: true,
      hoverable: true,
      draggable: true,
      zoomable: true,
    },
  },
]

export function HolographicProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<HolographicProduct>(mockProducts[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [holographicIntensity, setHolographicIntensity] = useState(80)
  const [showParticles, setShowParticles] = useState(true)
  const [showGlow, setShowGlow] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const holographicRef = useRef<HTMLDivElement>(null)

  // Holographic animation effects
  useEffect(() => {
    if (!holographicRef.current) return

    const element = holographicRef.current
    let animationId: number

    const animate = () => {
      if (isPlaying && selectedProduct.animations.rotation) {
        const currentRotation = Number.parseFloat(element.style.transform?.match(/rotateY$$([^)]+)$$/)?.[1] || "0")
        element.style.transform = `rotateY(${currentRotation + rotationSpeed}deg)`
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPlaying, rotationSpeed, selectedProduct.animations.rotation])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.media.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + selectedProduct.media.images.length) % selectedProduct.media.images.length,
    )
  }

  const getHolographicLevelColor = (level: string) => {
    switch (level) {
      case "ultra":
        return "from-purple-500 to-pink-500"
      case "premium":
        return "from-blue-500 to-cyan-500"
      case "basic":
        return "from-green-500 to-emerald-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  const getHolographicLevelBadge = (level: string) => {
    switch (level) {
      case "ultra":
        return <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">ULTRA</Badge>
      case "premium":
        return <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">PREMIUM</Badge>
      case "basic":
        return <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">BASIC</Badge>
      default:
        return <Badge variant="secondary">STANDARD</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-amber-300 font-serif">Holographic Product Showcase</h1>
          <p className="text-purple-200 font-serif tracking-wider">IMMERSIVE 3D PRODUCT VISUALIZATION SYSTEM</p>
        </motion.div>

        {/* Product Selection */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-amber-300">Product Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProduct.id === product.id
                      ? "border-amber-400 bg-amber-400/10"
                      : "border-purple-600/30 bg-purple-800/20 hover:border-purple-400"
                  }`}
                  onClick={() => {
                    setSelectedProduct(product)
                    setCurrentImageIndex(0)
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-amber-300 font-semibold">{product.name}</h3>
                    {getHolographicLevelBadge(product.holographicLevel)}
                  </div>
                  <p className="text-purple-200 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-bold">${product.price.toLocaleString()}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-purple-200 text-sm">{product.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Holographic Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Holographic Viewer */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-amber-300 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Holographic Display
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className={`${isLiked ? "bg-red-600 text-white" : "bg-purple-800/30 border-purple-600 text-purple-100"}`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-purple-800/30 border-purple-600 text-purple-100">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="bg-purple-800/30 border-purple-600 text-purple-100"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-lg overflow-hidden">
                  {/* Holographic Product Display */}
                  <div
                    ref={holographicRef}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      selectedProduct.animations.floating ? "animate-pulse" : ""
                    }`}
                    style={{
                      filter: `brightness(${holographicIntensity / 100}) ${showGlow ? "drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))" : ""}`,
                      transform: "perspective(1000px) rotateY(0deg)",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`relative w-80 h-80 bg-gradient-to-br ${getHolographicLevelColor(selectedProduct.holographicLevel)} rounded-lg shadow-2xl`}
                    >
                      {/* Product Image */}
                      <img
                        src={selectedProduct.media.images[currentImageIndex] || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover rounded-lg"
                      />

                      {/* Holographic Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-lg" />

                      {/* Particles Effect */}
                      {showParticles && (
                        <div className="absolute inset-0">
                          {Array.from({ length: 20 }, (_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                              }}
                              animate={{
                                y: [-10, 10, -10],
                                opacity: [0.3, 1, 0.3],
                              }}
                              transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: Math.random() * 2,
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Product Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                        <h3 className="text-white font-bold text-lg">{selectedProduct.name}</h3>
                        <p className="text-gray-200 text-sm">{selectedProduct.category}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-green-400 font-bold text-xl">
                            ${selectedProduct.price.toLocaleString()}
                          </span>
                          {getHolographicLevelBadge(selectedProduct.holographicLevel)}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevImage}
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex space-x-1">
                      {selectedProduct.media.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-white" : "bg-white/40"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextImage}
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Playback Controls */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (holographicRef.current) {
                          holographicRef.current.style.transform = "perspective(1000px) rotateY(0deg)"
                        }
                      }}
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Holographic Settings */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-amber-300 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Holographic Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-purple-200">Rotation Speed</Label>
                  <Slider
                    value={[rotationSpeed]}
                    onValueChange={(value) => setRotationSpeed(value[0])}
                    max={5}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-purple-300 text-sm">{rotationSpeed.toFixed(1)}x</div>
                </div>

                <div className="space-y-2">
                  <Label className="text-purple-200">Holographic Intensity</Label>
                  <Slider
                    value={[holographicIntensity]}
                    onValueChange={(value) => setHolographicIntensity(value[0])}
                    max={150}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-purple-300 text-sm">{holographicIntensity}%</div>
                </div>

                <div className="space-y-2">
                  <Label className="text-purple-200">Volume</Label>
                  <Slider
                    value={[volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                    disabled={isMuted}
                  />
                  <div className="text-purple-300 text-sm">{isMuted ? "Muted" : `${volume}%`}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-purple-200">Particle Effects</Label>
                    <Switch checked={showParticles} onCheckedChange={setShowParticles} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-purple-200">Glow Effect</Label>
                    <Switch checked={showGlow} onCheckedChange={setShowGlow} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-amber-300">Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-purple-800/30">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="specs">Specs</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h3 className="text-amber-300 font-semibold mb-2">{selectedProduct.name}</h3>
                      <p className="text-purple-200 text-sm">{selectedProduct.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(selectedProduct.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                          <span className="text-purple-200 text-sm ml-2">
                            {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-xl">
                        ${selectedProduct.price.toLocaleString()}
                      </span>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-purple-200 text-sm">{feature}</span>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="specs" className="space-y-2">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-purple-300 text-sm">{key}:</span>
                        <span className="text-purple-100 text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
              <CardContent className="p-4 space-y-3">
                <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold">
                  Invest Now
                </Button>
                <Button variant="outline" className="w-full bg-purple-800/30 border-purple-600 text-purple-100">
                  Add to Watchlist
                </Button>
                <Button variant="outline" className="w-full bg-blue-800/30 border-blue-600 text-blue-100">
                  <Eye className="w-4 h-4 mr-2" />
                  Schedule Demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
