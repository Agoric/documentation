"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Environment, OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface Holographic3DCardProps {
  variant?: "emerald" | "sapphire" | "ruby" | "diamond" | "obsidian" | "platinum"
  size?: "sm" | "md" | "lg" | "xl"
  intensity?: "subtle" | "moderate" | "intense" | "maximum"
  title?: string
  subtitle?: string
  content?: string
  highlightWords?: string[]
  achievementLevel?: number
  className?: string
  autoRotate?: boolean
  hologramHeight?: number
  perspective?: "isometric" | "perspective" | "orthographic"
  interactionMode?: "orbit" | "tilt" | "float" | "locked"
  holographicEffects?: boolean
  depthLayers?: number
  children?: React.ReactNode
}

// Holographic Card Mesh Component
function HolographicCardMesh({
  variant = "diamond",
  size = "md",
  title = "Holographic Card",
  subtitle = "3D Projection",
  content = "Revolutionary holographic display technology",
  hologramHeight = 2,
  depthLayers = 5,
  autoRotate = true,
}: {
  variant: string
  size: string
  title: string
  subtitle: string
  content: string
  hologramHeight: number
  depthLayers: number
  autoRotate: boolean
}) {
  const meshRef = React.useRef<THREE.Group>(null)
  const hologramRef = React.useRef<THREE.Group>(null)
  const particlesRef = React.useRef<THREE.Points>(null)
  const { camera, scene } = useThree()

  // Card dimensions based on size
  const dimensions = {
    sm: { width: 4, height: 2.5 },
    md: { width: 5, height: 3 },
    lg: { width: 6, height: 3.5 },
    xl: { width: 7, height: 4 },
  }[size]

  // Variant colors
  const variantColors = {
    emerald: { primary: "#10b981", secondary: "#34d399", glow: "#6ee7b7" },
    sapphire: { primary: "#3b82f6", secondary: "#60a5fa", glow: "#93c5fd" },
    ruby: { primary: "#ef4444", secondary: "#f87171", glow: "#fca5a5" },
    diamond: { primary: "#ffffff", secondary: "#f8fafc", glow: "#e2e8f0" },
    obsidian: { primary: "#8b5cf6", secondary: "#a78bfa", glow: "#c4b5fd" },
    platinum: { primary: "#6b7280", secondary: "#9ca3af", glow: "#d1d5db" },
  }[variant]

  // Create holographic particles
  const particleCount = 200
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10 // x
      positions[i * 3 + 1] = Math.random() * hologramHeight * 2 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 // z
    }
    return positions
  }, [hologramHeight])

  // Animation loop
  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }

    if (hologramRef.current) {
      hologramRef.current.rotation.y += 0.01
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.005
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Holographic Base Platform */}
      <mesh position={[0, -hologramHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[dimensions.width * 0.8, dimensions.width * 0.8, 0.1, 32]} />
        <meshStandardMaterial
          color={variantColors.primary}
          emissive={variantColors.primary}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Holographic Projection Beams */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * dimensions.width * 0.7,
            -hologramHeight / 4,
            Math.sin((i * Math.PI * 2) / 8) * dimensions.width * 0.7,
          ]}
          rotation={[0, (i * Math.PI * 2) / 8, 0]}
        >
          <coneGeometry args={[0.05, hologramHeight * 1.5, 8]} />
          <meshStandardMaterial
            color={variantColors.glow}
            emissive={variantColors.glow}
            emissiveIntensity={0.8}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      {/* Multi-Layer Holographic Card */}
      <group ref={hologramRef} position={[0, hologramHeight / 2, 0]}>
        {[...Array(depthLayers)].map((_, layer) => (
          <group key={layer} position={[0, 0, -layer * 0.1]}>
            {/* Card Base */}
            <mesh>
              <boxGeometry args={[dimensions.width, dimensions.height, 0.05]} />
              <meshStandardMaterial
                color={variantColors.primary}
                emissive={variantColors.primary}
                emissiveIntensity={0.4 - layer * 0.08}
                transparent
                opacity={0.8 - layer * 0.15}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Card Border Glow */}
            <mesh>
              <boxGeometry args={[dimensions.width + 0.1, dimensions.height + 0.1, 0.02]} />
              <meshStandardMaterial
                color={variantColors.glow}
                emissive={variantColors.glow}
                emissiveIntensity={0.6 - layer * 0.1}
                transparent
                opacity={0.3 - layer * 0.05}
              />
            </mesh>

            {/* Holographic Text Layers */}
            {layer === 0 && (
              <>
                <Text
                  position={[0, 0.8, 0.03]}
                  fontSize={0.4}
                  color={variantColors.glow}
                  anchorX="center"
                  anchorY="middle"
                  font="/fonts/Geist-Bold.ttf"
                >
                  {title}
                </Text>
                <Text
                  position={[0, 0.3, 0.03]}
                  fontSize={0.2}
                  color={variantColors.secondary}
                  anchorX="center"
                  anchorY="middle"
                  font="/fonts/Geist-Regular.ttf"
                >
                  {subtitle}
                </Text>
                <Text
                  position={[0, -0.2, 0.03]}
                  fontSize={0.15}
                  color={variantColors.primary}
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={dimensions.width - 0.5}
                  textAlign="center"
                  font="/fonts/Geist-Regular.ttf"
                >
                  {content}
                </Text>
              </>
            )}
          </group>
        ))}
      </group>

      {/* Holographic Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={variantColors.glow}
          size={0.02}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Holographic Grid Lines */}
      <group>
        {[...Array(20)].map((_, i) => (
          <mesh
            key={`grid-${i}`}
            position={[(i - 10) * 0.5, -hologramHeight / 2 + 0.01, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.01, dimensions.width * 2]} />
            <meshStandardMaterial
              color={variantColors.glow}
              emissive={variantColors.glow}
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}
        {[...Array(20)].map((_, i) => (
          <mesh
            key={`grid-z-${i}`}
            position={[0, -hologramHeight / 2 + 0.01, (i - 10) * 0.5]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          >
            <planeGeometry args={[0.01, dimensions.width * 2]} />
            <meshStandardMaterial
              color={variantColors.glow}
              emissive={variantColors.glow}
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Holographic Scan Lines */}
      <group>
        {[...Array(5)].map((_, i) => (
          <mesh
            key={`scan-${i}`}
            position={[0, -hologramHeight / 2 + (i * hologramHeight) / 4, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[dimensions.width * 0.3, dimensions.width * 0.9, 32]} />
            <meshStandardMaterial
              color={variantColors.secondary}
              emissive={variantColors.secondary}
              emissiveIntensity={0.4}
              transparent
              opacity={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export function Holographic3DCard({
  variant = "diamond",
  size = "md",
  intensity = "moderate",
  title = "Holographic Card",
  subtitle = "3D Projection",
  content = "Revolutionary holographic display technology",
  highlightWords = [],
  achievementLevel = 1,
  className,
  autoRotate = true,
  hologramHeight = 3,
  perspective = "perspective",
  interactionMode = "orbit",
  holographicEffects = true,
  depthLayers = 5,
  children,
}: Holographic3DCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const canvasHeight = {
    sm: "300px",
    md: "400px",
    lg: "500px",
    xl: "600px",
  }[size]

  const cameraSettings = {
    isometric: { position: [5, 5, 5], fov: 50 },
    perspective: { position: [0, 2, 8], fov: 75 },
    orthographic: { position: [0, 0, 10], fov: 30 },
  }[perspective]

  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10",
        isFullscreen ? "fixed inset-4 z-50" : "",
        className,
      )}
      style={{ height: isFullscreen ? "auto" : canvasHeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: isFullscreen ? 1 : 1.02 }}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: cameraSettings.position,
          fov: cameraSettings.fov,
        }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#ffffff" />
        <pointLight position={[5, 0, 5]} intensity={0.4} color={variant === "emerald" ? "#10b981" : "#3b82f6"} />

        {/* Environment */}
        <Environment preset="night" />

        {/* Holographic Card */}
        <HolographicCardMesh
          variant={variant}
          size={size}
          title={title}
          subtitle={subtitle}
          content={content}
          hologramHeight={hologramHeight}
          depthLayers={depthLayers}
          autoRotate={autoRotate}
        />

        {/* Camera Controls */}
        {interactionMode === "orbit" && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
        )}
      </Canvas>

      {/* Holographic Overlay Effects */}
      {holographicEffects && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Scan Lines */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 255, 0.1) 2px,
                rgba(0, 255, 255, 0.1) 4px
              )`,
            }}
            animate={{
              backgroundPosition: isHovered ? ["0px 0px", "0px 20px"] : "0px 0px",
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
          />

          {/* Holographic Shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
            animate={{
              x: isHovered ? ["-100%", "100%"] : "-100%",
            }}
            transition={{
              duration: 3,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
          />

          {/* Corner Brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400 opacity-60" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400 opacity-60" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400 opacity-60" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400 opacity-60" />
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <motion.button
          className="p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white/80 hover:text-white"
          onClick={() => setIsFullscreen(!isFullscreen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFullscreen ? "🗙" : "⛶"}
        </motion.button>
      </div>

      {/* Status Indicators */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-cyan-400 z-10">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <span>HOLOGRAM ACTIVE</span>
        <span className="opacity-60">|</span>
        <span>LEVEL {achievementLevel}</span>
      </div>

      {/* Traditional Card Overlay (for comparison) */}
      {children && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="scale-75">{children}</div>
        </div>
      )}
    </motion.div>
  )
}
