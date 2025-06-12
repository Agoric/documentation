"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Crown, Sparkles, Shield, Star } from "lucide-react"

export function SupremeAuthorityCoin() {
  const coinRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute h-24 w-24 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.1) 50%, transparent 100%)",
          boxShadow: "0 0 40px rgba(255, 215, 0, 0.4), 0 0 80px rgba(255, 215, 0, 0.2)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Middle energy ring */}
      <motion.div
        className="absolute h-20 w-20 rounded-full border-2 border-yellow-400/50"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          boxShadow: "inset 0 0 20px rgba(255, 215, 0, 0.3)",
        }}
      />

      {/* Main coin */}
      <motion.div
        ref={coinRef}
        className="relative h-16 w-16 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600"
        animate={{
          rotateY: 360,
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          boxShadow:
            "0 4px 20px rgba(255, 215, 0, 0.5), " +
            "inset 0 2px 10px rgba(255, 255, 255, 0.3), " +
            "inset 0 -2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Coin face */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-500 flex items-center justify-center">
          {/* Crown symbol */}
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Crown className="h-6 w-6 text-yellow-900" strokeWidth={2.5} />

            {/* Crown jewels */}
            <motion.div
              className="absolute -top-1 left-1/2 transform -translate-x-1/2"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Star className="h-2 w-2 text-red-500 fill-red-500" />
            </motion.div>
          </motion.div>
        </div>

        {/* Edge inscription */}
        <div className="absolute inset-0 rounded-full">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-yellow-800 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
                transform: `rotate(${i * 45}deg) translateX(28px) translateY(-0.5px)`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: [0, Math.cos((i * 60 * Math.PI) / 180) * 40, 0],
            y: [0, Math.sin((i * 60 * Math.PI) / 180) * 40, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-3 w-3 text-yellow-300" />
        </motion.div>
      ))}

      {/* Authority shield backdrop */}
      <motion.div
        className="absolute -z-10 h-28 w-28 opacity-20"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Shield className="h-full w-full text-yellow-400" strokeWidth={0.5} />
      </motion.div>

      {/* Power pulses */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-16 w-16 rounded-full border border-yellow-400/30"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
