"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { RoyalDiamondSlabCard } from "./royal-diamond-slab-card"
import { DiamondParticleSystem } from "./diamond-particle-system"

interface Holographic3DCardProps {
  variant?: "emerald" | "sapphire" | "ruby" | "diamond" | "obsidian" | "platinum"
  title?: string
  subtitle?: string
  content?: string
  highlightWords?: string[]
  achievementLevel?: number
  autoRotate?: boolean
  hologramIntensity?: "low" | "medium" | "high" | "maximum"
  projectionHeight?: number
  interactive?: boolean
  showParticles?: boolean
  className?: string
}

// Holographic Shader Material
const holographicVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float time;
  uniform float intensity;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    
    vec3 pos = position;
    
    // Add holographic distortion
    pos.z += sin(pos.x * 10.0 + time * 2.0) * 0.02 * intensity;
    pos.z += cos(pos.y * 8.0 + time * 1.5) * 0.015 * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const holographicFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform float opacity;
  
  void main() {
    vec2 uv = vUv;
    
    // Holographic interference patterns
    float interference1 = sin(uv.x * 50.0 + time * 3.0) * 0.5 + 0.5;
    float interference2 = cos(uv.y * 30.0 + time * 2.0) * 0.5 + 0.5;
    float interference3 = sin((uv.x + uv.y) * 40.0 + time * 4.0) * 0.5 + 0.5;
    
    // Combine interference patterns
    float pattern = (interference1 + interference2 + interference3) / 3.0;
    
    // Create holographic color shifts
    vec3 hologramColor = mix(color1, color2, pattern);
    hologramColor = mix(hologramColor, color3, sin(time * 2.0 + pattern * 6.28) * 0.5 + 0.5);
    
    // Add fresnel effect
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - dot(vNormal, viewDirection);
    fresnel = pow(fresnel, 2.0);
    
    // Scanline effect
    float scanline = sin(uv.y * 200.0 + time * 10.0) * 0.1 + 0.9;
    
    // Final color with holographic effects
    vec3 finalColor = hologramColor * scanline * (1.0 + fresnel * 0.5);
    float finalOpacity = opacity * intensity * (0.7 + pattern * 0.3);
    
    gl_FragColor = vec4(finalColor, finalOpacity);
  }
`

// 3D Card Mesh Component
function Card3D({
  variant = "diamond",
  title,
  subtitle,
  content,
  highlightWords,
  achievementLevel,
  hologramIntensity = "medium",
  projectionHeight = 2,
  showParticles = true,
}: Holographic3DCardProps) {
  const meshRef = React.useRef<THREE.Mesh>(null)
  const materialRef = React.useRef<THREE.ShaderMaterial>(null)
  const groupRef = React.useRef<THREE.Group>(null)
  const { clock } = useThree()

  const intensityMap = {
    low: 0.3,
    medium: 0.6,
    high: 0.9,
    maximum: 1.2,
  }

  const variantColors = {
    emerald: {
      color1: new THREE.Color(0x10b981),
      color2: new THREE.Color(0x34d399),
      color3: new THREE.Color(0x6ee7b7),
    },
    sapphire: {
      color1: new THREE.Color(0x3b82f6),
      color2: new THREE.Color(0x60a5fa),
      color3: new THREE.Color(0x93c5fd),
    },
    ruby: {
      color1: new THREE.Color(0xef4444),
      color2: new THREE.Color(0xf87171),
      color3: new THREE.Color(0xfca5a5),
    },
    diamond: {
      color1: new THREE.Color(0xffffff),
      color2: new THREE.Color(0xe2e8f0),
      color3: new THREE.Color(0xcbd5e1),
    },
    obsidian: {
      color1: new THREE.Color(0x8b5cf6),
      color2: new THREE.Color(0xa78bfa),
      color3: new THREE.Color(0xc4b5fd),
    },
    platinum: {
      color1: new THREE.Color(0x6b7280),
      color2: new THREE.Color(0x9ca3af),
      color3: new THREE.Color(0xd1d5db),
    },
  }

  const colors = variantColors[variant]

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
    }

    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, projectionHeight, 0]}>
      {/* Main Card Mesh */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[4, 2.5, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={holographicVertexShader}
          fragmentShader={holographicFragmentShader}
          uniforms={{
            time: { value: 0 },
            intensity: { value: intensityMap[hologramIntensity] },
            color1: { value: colors.color1 },
            color2: { value: colors.color2 },
            color3: { value: colors.color3 },
            opacity: { value: 0.8 },
          }}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Holographic Frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.2, 2.7, 1, 1]} />
        <meshBasicMaterial color={colors.color1} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* 3D Text Elements */}
      {title && (
        <Text
          position={[0, 0.8, 0.1]}
          fontSize={0.3}
          color="gold"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          {title}
        </Text>
      )}

      {subtitle && (
        <Text
          position={[0, 0.4, 0.1]}
          fontSize={0.15}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.ttf"
        >
          {subtitle}
        </Text>
      )}

      {content && (
        <Text
          position={[0, -0.2, 0.1]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
          textAlign="center"
          font="/fonts/Geist-Regular.ttf"
        >
          {content}
        </Text>
      )}

      {/* Achievement Level Indicators */}
      {achievementLevel && achievementLevel > 1 && (
        <group position={[0, -0.8, 0.1]}>
          {[...Array(Math.min(achievementLevel, 5))].map((_, i) => (
            <mesh key={i} position={[(i - 2) * 0.3, 0, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color={colors.color2} />
            </mesh>
          ))}
        </group>
      )}

      {/* Holographic Particles */}
      {showParticles && (
        <HolographicParticles
          variant={variant}
          intensity={hologramIntensity}
          count={hologramIntensity === "maximum" ? 100 : 50}
        />
      )}

      {/* Projection Beams */}
      <ProjectionBeams variant={variant} intensity={hologramIntensity} height={projectionHeight} />
    </group>
  )
}

// Holographic Particles in 3D Space
function HolographicParticles({
  variant,
  intensity = "medium",
  count = 50,
}: {
  variant: string
  intensity: string
  count: number
}) {
  const particlesRef = React.useRef<THREE.Points>(null)
  const { clock } = useThree()

  const variantColors = {
    emerald: 0x10b981,
    sapphire: 0x3b82f6,
    ruby: 0xef4444,
    diamond: 0xffffff,
    obsidian: 0x8b5cf6,
    platinum: 0x6b7280,
  }

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [count])

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(clock.getElapsedTime() + i) * 0.001
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={variantColors[variant as keyof typeof variantColors]}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Projection Beams from Base
function ProjectionBeams({
  variant,
  intensity = "medium",
  height = 2,
}: {
  variant: string
  intensity: string
  height: number
}) {
  const beamRefs = React.useRef<THREE.Mesh[]>([])
  const { clock } = useThree()

  const variantColors = {
    emerald: 0x10b981,
    sapphire: 0x3b82f6,
    ruby: 0xef4444,
    diamond: 0xffffff,
    obsidian: 0x8b5cf6,
    platinum: 0x6b7280,
  }

  useFrame(() => {
    beamRefs.current.forEach((beam, index) => {
      if (beam) {
        beam.material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2 + index) * 0.2
      }
    })
  })

  return (
    <group>
      {/* Corner Projection Beams */}
      {[
        [-2, -1.25],
        [2, -1.25],
        [-2, 1.25],
        [2, 1.25],
      ].map(([x, y], index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) beamRefs.current[index] = el
          }}
          position={[x, y - height, 0]}
          rotation={[0, 0, 0]}
        >
          <cylinderGeometry args={[0.02, 0.1, height, 8]} />
          <meshBasicMaterial color={variantColors[variant as keyof typeof variantColors]} transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Base Projector Platform */}
      <mesh position={[0, -height - 0.1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 16]} />
        <meshBasicMaterial color={variantColors[variant as keyof typeof variantColors]} transparent opacity={0.6} />
      </mesh>

      {/* Central Projection Beam */}
      <mesh position={[0, -height / 2, 0]}>
        <cylinderGeometry args={[0.05, 0.2, height, 8]} />
        <meshBasicMaterial color={variantColors[variant as keyof typeof variantColors]} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// Main Holographic 3D Card Component
export function Holographic3DCard({
  variant = "diamond",
  title = "Snapifi Platform Citizen",
  subtitle = "Elite Financial Status",
  content = "Revolutionary 50-Year Loans • Premium Trading Access • Diplomatic Immunity",
  highlightWords = ["50-Year", "Premium", "Diplomatic"],
  achievementLevel = 1,
  autoRotate = true,
  hologramIntensity = "medium",
  projectionHeight = 2,
  interactive = true,
  showParticles = true,
  className,
}: Holographic3DCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<"3d" | "2d">("3d")

  return (
    <div className={`relative w-full h-96 ${className}`}>
      {/* 3D Holographic View */}
      {viewMode === "3d" && (
        <div
          className="w-full h-full rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 2, 6]} />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />

            {/* Environment */}
            <Environment preset="night" />

            {/* 3D Card */}
            <Card3D
              variant={variant}
              title={title}
              subtitle={subtitle}
              content={content}
              highlightWords={highlightWords}
              achievementLevel={achievementLevel}
              hologramIntensity={hologramIntensity}
              projectionHeight={projectionHeight}
              showParticles={showParticles}
            />

            {/* Controls */}
            {interactive && (
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                autoRotate={autoRotate}
                autoRotateSpeed={0.5}
                minDistance={3}
                maxDistance={10}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
              />
            )}
          </Canvas>

          {/* 2D Overlay Card for Comparison */}
          <div className="absolute top-4 right-4 opacity-20 hover:opacity-100 transition-opacity">
            <RoyalDiamondSlabCard
              variant={variant}
              size="sm"
              title={title}
              subtitle={subtitle}
              content={content}
              highlightWords={highlightWords}
              achievementLevel={achievementLevel}
              className="scale-50 origin-top-right"
            />
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(viewMode === "3d" ? "2d" : "3d")}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/20 transition-colors"
            >
              {viewMode === "3d" ? "2D View" : "3D View"}
            </motion.button>
          </div>

          {/* Holographic Status Indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-xs font-medium">HOLOGRAM ACTIVE</span>
          </div>
        </div>
      )}

      {/* 2D Fallback View */}
      {viewMode === "2d" && (
        <div className="w-full h-full flex items-center justify-center">
          <RoyalDiamondSlabCard
            variant={variant}
            size="lg"
            title={title}
            subtitle={subtitle}
            content={content}
            highlightWords={highlightWords}
            achievementLevel={achievementLevel}
            premiumAnimation={isHovered ? "laser-show" : "none"}
          />

          {/* Switch to 3D Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("3d")}
            className="absolute bottom-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/20 transition-colors"
          >
            3D Hologram
          </motion.button>
        </div>
      )}

      {/* Particle Effects Overlay */}
      {showParticles && viewMode === "3d" && (
        <div className="absolute inset-0 pointer-events-none">
          <DiamondParticleSystem
            variant={variant as any}
            intensity={hologramIntensity as any}
            active={isHovered}
            count={30}
          />
        </div>
      )}
    </div>
  )
}
