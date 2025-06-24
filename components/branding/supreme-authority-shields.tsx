"use client"

import { motion } from "framer-motion"
import { Crown, Shield, Scale, Eye, Zap, Star, Sword, Anchor, Mountain } from "lucide-react"
import { cn } from "@/lib/utils"

interface SupremeAuthorityShieldProps {
  ideology:
    | "sovereign"
    | "guardian"
    | "arbiter"
    | "oracle"
    | "executor"
    | "sentinel"
    | "luminary"
    | "defender"
    | "navigator"
    | "foundation"
  tier?: "initiate" | "adept" | "master" | "grandmaster" | "supreme"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
}

export function SupremeAuthorityShield({
  ideology,
  tier = "adept",
  size = "md",
  animated = true,
  className,
}: SupremeAuthorityShieldProps) {
  const sizeClasses = {
    xs: "w-8 h-10",
    sm: "w-12 h-15",
    md: "w-16 h-20",
    lg: "w-20 h-25",
    xl: "w-28 h-35",
  }

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  }

  const getIdeologyConfig = () => {
    const configs = {
      sovereign: {
        name: "Sovereign Authority",
        latin: "Auctoritas Suprema",
        icon: Crown,
        colors: {
          primary: "from-amber-400 via-yellow-500 to-amber-600",
          secondary: "from-purple-900 via-indigo-900 to-purple-800",
          glow: "shadow-amber-400/30",
          border: "border-amber-400/50",
          text: "text-amber-300",
        },
      },
      guardian: {
        name: "Guardian Protector",
        latin: "Custos Protector",
        icon: Shield,
        colors: {
          primary: "from-emerald-400 via-green-500 to-emerald-600",
          secondary: "from-emerald-900 via-teal-900 to-emerald-800",
          glow: "shadow-emerald-400/30",
          border: "border-emerald-400/50",
          text: "text-emerald-300",
        },
      },
      arbiter: {
        name: "Justice Arbiter",
        latin: "Arbiter Iustitiae",
        icon: Scale,
        colors: {
          primary: "from-blue-400 via-indigo-500 to-blue-600",
          secondary: "from-blue-900 via-indigo-900 to-blue-800",
          glow: "shadow-blue-400/30",
          border: "border-blue-400/50",
          text: "text-blue-300",
        },
      },
      oracle: {
        name: "Wisdom Oracle",
        latin: "Oraculum Sapientiae",
        icon: Eye,
        colors: {
          primary: "from-violet-400 via-purple-500 to-violet-600",
          secondary: "from-violet-900 via-purple-900 to-violet-800",
          glow: "shadow-violet-400/30",
          border: "border-violet-400/50",
          text: "text-violet-300",
        },
      },
      executor: {
        name: "Power Executor",
        latin: "Executor Potentiae",
        icon: Zap,
        colors: {
          primary: "from-red-400 via-rose-500 to-red-600",
          secondary: "from-red-900 via-rose-900 to-red-800",
          glow: "shadow-red-400/30",
          border: "border-red-400/50",
          text: "text-red-300",
        },
      },
      sentinel: {
        name: "Eternal Sentinel",
        latin: "Sentinella Aeterna",
        icon: Star,
        colors: {
          primary: "from-cyan-400 via-teal-500 to-cyan-600",
          secondary: "from-cyan-900 via-teal-900 to-cyan-800",
          glow: "shadow-cyan-400/30",
          border: "border-cyan-400/50",
          text: "text-cyan-300",
        },
      },
      luminary: {
        name: "Divine Luminary",
        latin: "Luminarium Divinum",
        icon: Star,
        colors: {
          primary: "from-pink-400 via-rose-500 to-pink-600",
          secondary: "from-pink-900 via-rose-900 to-pink-800",
          glow: "shadow-pink-400/30",
          border: "border-pink-400/50",
          text: "text-pink-300",
        },
      },
      defender: {
        name: "Realm Defender",
        latin: "Defensor Regni",
        icon: Sword,
        colors: {
          primary: "from-orange-400 via-amber-500 to-orange-600",
          secondary: "from-orange-900 via-amber-900 to-orange-800",
          glow: "shadow-orange-400/30",
          border: "border-orange-400/50",
          text: "text-orange-300",
        },
      },
      navigator: {
        name: "Global Navigator",
        latin: "Navigator Globalis",
        icon: Anchor,
        colors: {
          primary: "from-slate-400 via-gray-500 to-slate-600",
          secondary: "from-slate-900 via-gray-900 to-slate-800",
          glow: "shadow-slate-400/30",
          border: "border-slate-400/50",
          text: "text-slate-300",
        },
      },
      foundation: {
        name: "Foundation Pillar",
        latin: "Columna Fundamentum",
        icon: Mountain,
        colors: {
          primary: "from-stone-400 via-neutral-500 to-stone-600",
          secondary: "from-stone-900 via-neutral-900 to-stone-800",
          glow: "shadow-stone-400/30",
          border: "border-stone-400/50",
          text: "text-stone-300",
        },
      },
    }
    return configs[ideology]
  }

  const getTierConfig = () => {
    const configs = {
      initiate: {
        name: "Initiate",
        latin: "Initiatus",
        stars: 1,
        glow: "0 0 10px",
      },
      adept: {
        name: "Adept",
        latin: "Adeptus",
        stars: 2,
        glow: "0 0 15px",
      },
      master: {
        name: "Master",
        latin: "Magister",
        stars: 3,
        glow: "0 0 20px",
      },
      grandmaster: {
        name: "Grand Master",
        latin: "Magnus Magister",
        stars: 4,
        glow: "0 0 25px",
      },
      supreme: {
        name: "Supreme",
        latin: "Supremus",
        stars: 5,
        glow: "0 0 30px",
      },
    }
    return configs[tier]
  }

  const ideologyConfig = getIdeologyConfig()
  const tierConfig = getTierConfig()
  const IconComponent = ideologyConfig.icon

  return (
    <motion.div
      className={cn("relative flex flex-col items-center", sizeClasses[size], className)}
      animate={
        animated
          ? {
              rotateY: [0, 5, -5, 0],
            }
          : {}
      }
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {/* Shield Base */}
      <div className="relative w-full h-full">
        {/* Outer Holographic Ring */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${ideologyConfig.colors.primary} p-0.5 rounded-t-full`}
          style={{
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          }}
          animate={
            animated
              ? {
                  boxShadow: [
                    `${tierConfig.glow} ${ideologyConfig.colors.glow.replace("shadow-", "").replace("/30", ", 0.3)")}`,
                    `${tierConfig.glow} ${ideologyConfig.colors.glow.replace("shadow-", "").replace("/30", ", 0.6)")}`,
                    `${tierConfig.glow} ${ideologyConfig.colors.glow.replace("shadow-", "").replace("/30", ", 0.3)")}`,
                  ],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {/* Inner Shield Body */}
          <div
            className={`w-full h-full bg-gradient-to-br ${ideologyConfig.colors.secondary} relative overflow-hidden`}
            style={{
              clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
            }}
          >
            {/* Holographic Pattern */}
            <div className="absolute inset-1">
              <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
                <defs>
                  <pattern
                    id={`shield-pattern-${ideology}`}
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M5,0 L10,5 L5,10 L0,5 Z"
                      fill="none"
                      stroke={ideologyConfig.colors.primary.split(" ")[1]}
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill={`url(#shield-pattern-${ideology})`} />
              </svg>
            </div>

            {/* Central Icon */}
            <div className="absolute inset-0 flex items-center justify-center pt-2">
              <motion.div
                className="relative"
                animate={
                  animated
                    ? {
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <IconComponent className={cn(ideologyConfig.colors.text, iconSizes[size])} />
                <motion.div
                  className={`absolute -inset-2 bg-gradient-to-r ${ideologyConfig.colors.primary} rounded-full blur-sm opacity-30`}
                  animate={
                    animated
                      ? {
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Tier Stars */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
              {Array.from({ length: tierConfig.stars }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1 h-1 bg-gradient-to-r ${ideologyConfig.colors.primary} rounded-full`}
                  animate={
                    animated
                      ? {
                          opacity: [0.5, 1, 0.5],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Roman Numerals */}
            {size !== "xs" && (
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                <div className={`text-xs font-serif ${ideologyConfig.colors.text} opacity-60`}>
                  {tier === "initiate" && "I"}
                  {tier === "adept" && "II"}
                  {tier === "master" && "III"}
                  {tier === "grandmaster" && "IV"}
                  {tier === "supreme" && "V"}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Holographic Shimmer */}
        <motion.div
          className="absolute inset-0 rounded-t-full"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${ideologyConfig.colors.primary.split(" ")[1]} 50%, transparent 70%)`,
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
            opacity: 0.3,
          }}
          animate={
            animated
              ? {
                  x: [-20, 20, -20],
                }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Badge Labels */}
      {size !== "xs" && (
        <div className="mt-2 text-center">
          <div className={`text-xs font-bold ${ideologyConfig.colors.text}`}>{ideologyConfig.name}</div>
          <div className={`text-xs italic font-serif ${ideologyConfig.colors.text} opacity-70`}>
            {ideologyConfig.latin}
          </div>
          <div className={`text-xs ${ideologyConfig.colors.text} opacity-50`}>
            {tierConfig.name} • {tierConfig.latin}
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Badge Collection Component
export function SupremeAuthorityBadgeCollection() {
  const ideologies = [
    "sovereign",
    "guardian",
    "arbiter",
    "oracle",
    "executor",
    "sentinel",
    "luminary",
    "defender",
    "navigator",
    "foundation",
  ] as const

  const tiers = ["initiate", "adept", "master", "grandmaster", "supreme"] as const

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4">
            Supreme Authority Insignia
          </h1>
          <p className="text-xl italic font-serif text-amber-300/70">Insignia Auctoritatis Supremae</p>
          <p className="text-gray-400 mt-4">Holographic Projection Shields & Badges for Global Checks and Balance</p>
        </div>

        {/* Ideology Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {ideologies.map((ideology) => (
            <div key={ideology} className="flex flex-col items-center">
              <SupremeAuthorityShield ideology={ideology} tier="master" size="lg" animated={true} />
            </div>
          ))}
        </div>

        {/* Tier Progression */}
        <div className="bg-black/20 rounded-lg p-8 backdrop-blur-sm border border-amber-400/20">
          <h2 className="text-2xl font-bold text-amber-400 mb-6 text-center">Authority Tier Progression</h2>
          <div className="flex justify-center space-x-8">
            {tiers.map((tier) => (
              <div key={tier} className="flex flex-col items-center">
                <SupremeAuthorityShield ideology="sovereign" tier={tier} size="md" animated={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
