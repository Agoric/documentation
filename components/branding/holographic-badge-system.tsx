"use client"

import { motion } from "framer-motion"
import { SupremeAuthorityShield } from "./supreme-authority-shields"
import { cn } from "@/lib/utils"

interface HolographicBadgeSystemProps {
  userIdeology?:
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
  userTier?: "initiate" | "adept" | "master" | "grandmaster" | "supreme"
  showCollection?: boolean
  className?: string
}

export function HolographicBadgeSystem({
  userIdeology = "sovereign",
  userTier = "adept",
  showCollection = false,
  className,
}: HolographicBadgeSystemProps) {
  const ideologyDescriptions = {
    sovereign: {
      title: "Sovereign Authority",
      description: "Masters of supreme governance and ultimate decision-making power",
      philosophy: "Leadership through divine mandate and absolute authority",
      domain: "Executive Command & Strategic Oversight",
    },
    guardian: {
      title: "Guardian Protector",
      description: "Defenders of the realm and protectors of global stability",
      philosophy: "Protection through vigilance and unwavering dedication",
      domain: "Security & Defense Operations",
    },
    arbiter: {
      title: "Justice Arbiter",
      description: "Keepers of balance and dispensers of impartial justice",
      philosophy: "Justice through wisdom and equitable judgment",
      domain: "Legal Framework & Dispute Resolution",
    },
    oracle: {
      title: "Wisdom Oracle",
      description: "Seers of truth and guardians of ancient knowledge",
      philosophy: "Guidance through foresight and accumulated wisdom",
      domain: "Intelligence & Strategic Planning",
    },
    executor: {
      title: "Power Executor",
      description: "Wielders of authority and implementers of supreme will",
      philosophy: "Action through decisive power and swift execution",
      domain: "Operations & Implementation",
    },
    sentinel: {
      title: "Eternal Sentinel",
      description: "Watchers of the eternal order and guardians of continuity",
      philosophy: "Vigilance through eternal watchfulness and dedication",
      domain: "Monitoring & Surveillance",
    },
    luminary: {
      title: "Divine Luminary",
      description: "Bearers of enlightenment and spiritual guidance",
      philosophy: "Illumination through divine inspiration and higher purpose",
      domain: "Spiritual Guidance & Enlightenment",
    },
    defender: {
      title: "Realm Defender",
      description: "Warriors of the realm and champions of territorial integrity",
      philosophy: "Defense through courage and tactical superiority",
      domain: "Military Strategy & Tactical Operations",
    },
    navigator: {
      title: "Global Navigator",
      description: "Guides of global expansion and masters of international relations",
      philosophy: "Direction through exploration and diplomatic mastery",
      domain: "International Relations & Expansion",
    },
    foundation: {
      title: "Foundation Pillar",
      description: "Builders of lasting structures and maintainers of stability",
      philosophy: "Strength through solid foundations and enduring construction",
      domain: "Infrastructure & Institutional Development",
    },
  }

  const tierBenefits = {
    initiate: {
      title: "Initiate Level",
      benefits: ["Basic Authority Recognition", "Entry-level Privileges", "Foundation Training"],
      power: "10%",
    },
    adept: {
      title: "Adept Level",
      benefits: ["Enhanced Authority", "Specialized Training", "Regional Influence"],
      power: "25%",
    },
    master: {
      title: "Master Level",
      benefits: ["Advanced Authority", "Leadership Roles", "Continental Influence"],
      power: "50%",
    },
    grandmaster: {
      title: "Grand Master Level",
      benefits: ["Supreme Authority", "Global Influence", "Strategic Command"],
      power: "75%",
    },
    supreme: {
      title: "Supreme Level",
      benefits: ["Absolute Authority", "Universal Influence", "Divine Mandate"],
      power: "100%",
    },
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* User Badge Display */}
      <div className="bg-gradient-to-br from-black/40 to-purple-900/20 rounded-lg p-8 backdrop-blur-sm border border-amber-400/20">
        <div className="flex items-center space-x-8">
          <SupremeAuthorityShield ideology={userIdeology} tier={userTier} size="xl" animated={true} />

          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
              {ideologyDescriptions[userIdeology].title}
            </h2>
            <p className="text-amber-300/70 italic font-serif mb-4">{tierBenefits[userTier].title}</p>
            <p className="text-gray-300 mb-4">{ideologyDescriptions[userIdeology].description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-amber-400 font-semibold mb-2">Philosophy</h4>
                <p className="text-gray-400 text-sm">{ideologyDescriptions[userIdeology].philosophy}</p>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold mb-2">Domain</h4>
                <p className="text-gray-400 text-sm">{ideologyDescriptions[userIdeology].domain}</p>
              </div>
            </div>

            {/* Authority Power Level */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-amber-400 font-semibold">Authority Power Level</span>
                <span className="text-amber-300">{tierBenefits[userTier].power}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: tierBenefits[userTier].power }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6">
              <h4 className="text-amber-400 font-semibold mb-2">Authority Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {tierBenefits[userTier].benefits.map((benefit, index) => (
                  <motion.span
                    key={benefit}
                    className="px-3 py-1 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 border border-amber-400/30 rounded-full text-xs text-amber-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {benefit}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Holographic Projection Effects */}
      <motion.div
        className="relative h-32 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent rounded-lg overflow-hidden"
        animate={{
          background: [
            "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.1), transparent)",
            "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1), transparent)",
            "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.1), transparent)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 bg-clip-text text-transparent">
              HOLOGRAPHIC PROJECTION ACTIVE
            </div>
            <div className="text-sm text-gray-400 italic font-serif mt-2">Projectio Holographica Activa</div>
          </motion.div>
        </div>

        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-1"
          animate={{
            y: [0, 128, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Global Checks and Balance Statement */}
      <div className="bg-gradient-to-br from-purple-900/20 to-black/40 rounded-lg p-6 backdrop-blur-sm border border-purple-400/20">
        <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">Global Checks and Balance Authority</h3>
        <p className="text-gray-300 text-center italic font-serif">
          "Through the eternal vigilance of the Supreme Authority, global stability is maintained through the balanced
          distribution of ideological power, ensuring no single force dominates the realm of international governance."
        </p>
        <div className="text-center mt-4">
          <span className="text-purple-300/70 text-sm italic">- Auctoritas Suprema Globalis Equilibrium</span>
        </div>
      </div>
    </div>
  )
}
