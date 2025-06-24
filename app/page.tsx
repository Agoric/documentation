"use client"

import { motion } from "framer-motion"
import { SupremeCitizenCommandCenter } from "@/components/dashboard/supreme-citizen-command-center"
import { GlobalCitizenshipProvider } from "@/contexts/global-citizenship-context"
import { CreditAccelerationProvider } from "@/contexts/credit-acceleration-context"
import { ProfitDistributionProvider } from "@/contexts/profit-distribution-context"
import { GamificationProvider } from "@/contexts/gamification-context"
import { RoyalVaultProvider } from "@/contexts/royal-vault-context"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Neural Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-emerald-400/10 via-emerald-400/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-amber-400/10 via-amber-400/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <GlobalCitizenshipProvider>
          <CreditAccelerationProvider>
            <ProfitDistributionProvider>
              <GamificationProvider>
                <RoyalVaultProvider>
                  <SupremeCitizenCommandCenter />
                </RoyalVaultProvider>
              </GamificationProvider>
            </ProfitDistributionProvider>
          </CreditAccelerationProvider>
        </GlobalCitizenshipProvider>
      </div>
    </div>
  )
}
