"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Diamond, Fingerprint, Camera, Eye, Shield, Lock, CheckCircle2, Zap, Crown, Key } from "lucide-react"
import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"

interface BiometricData {
  fingerprint?: {
    template: string
    quality: number
    verified: boolean
    timestamp: string
  }
  facial?: {
    template: string
    confidence: number
    verified: boolean
    timestamp: string
    landmarks: number[]
  }
  voice?: {
    template: string
    confidence: number
    verified: boolean
    timestamp: string
  }
}

interface EnhancedGCITokenProps {
  gciToken: any
  biometricData: BiometricData
  onBiometricUpdate?: () => void
}

export function EnhancedGCITokenDisplay({ gciToken, biometricData, onBiometricUpdate }: EnhancedGCITokenProps) {
  const [isHolographicActive, setIsHolographicActive] = useState(false)
  const [securityLevel, setSecurityLevel] = useState("Standard")

  useEffect(() => {
    // Calculate security level based on biometric data
    const verifiedMethods = Object.values(biometricData).filter((data) => data?.verified).length

    if (verifiedMethods >= 3) {
      setSecurityLevel("Quantum-Secured")
    } else if (verifiedMethods >= 2) {
      setSecurityLevel("Multi-Factor")
    } else if (verifiedMethods >= 1) {
      setSecurityLevel("Biometric")
    } else {
      setSecurityLevel("Standard")
    }
  }, [biometricData])

  const getBiometricIcon = (type: string) => {
    switch (type) {
      case "fingerprint":
        return Fingerprint
      case "facial":
        return Camera
      case "voice":
        return Eye
      default:
        return Shield
    }
  }

  const getSecurityColor = () => {
    switch (securityLevel) {
      case "Quantum-Secured":
        return "from-purple-500 to-pink-600"
      case "Multi-Factor":
        return "from-blue-500 to-cyan-600"
      case "Biometric":
        return "from-green-500 to-emerald-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced GCI Token Display */}
      <HolographicGlassCard className="p-8">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div
              className="w-40 h-40 mx-auto bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 rounded-xl border-4 border-gray-400 shadow-2xl relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setIsHolographicActive(true)}
              onMouseLeave={() => setIsHolographicActive(false)}
            >
              {/* Diamond clarity effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/40 to-transparent opacity-60" />

              {/* Silver tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/30 to-gray-200/30" />

              {/* Enhanced diamond shimmer */}
              <div className="absolute inset-0 animate-pulse">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transform rotate-45 animate-spin"
                  style={{ animationDuration: "8s" }}
                />
              </div>

              {/* Holographic activation effect */}
              {isHolographicActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 animate-pulse" />
              )}

              {/* Biometric security indicators */}
              <div className="absolute top-2 right-2 space-y-1">
                {Object.entries(biometricData).map(([type, data]) => {
                  if (!data?.verified) return null
                  const Icon = getBiometricIcon(type)
                  return (
                    <div key={type} className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Icon className="h-3 w-3 text-white" />
                    </div>
                  )
                })}
              </div>

              {/* Security level indicator */}
              <div className="absolute bottom-2 left-2 right-2">
                <Badge className={`bg-gradient-to-r ${getSecurityColor()} text-white text-xs`}>
                  <Lock className="mr-1 h-3 w-3" />
                  {securityLevel}
                </Badge>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-gray-800">
                <Diamond className="h-10 w-10 mb-2" />
                <div className="text-sm font-bold">GCI</div>
                <div className="text-sm">TOKEN</div>
                <div className="text-xs mt-1 opacity-70">SECURED</div>
              </div>
            </div>

            {/* Quantum security aura */}
            {securityLevel === "Quantum-Secured" && (
              <div className="absolute inset-0 -m-4">
                <div className="w-full h-full rounded-full border-2 border-purple-500/30 animate-ping" />
                <div className="absolute inset-2 w-full h-full rounded-full border border-pink-500/20 animate-pulse" />
              </div>
            )}
          </div>

          <Badge className={`bg-gradient-to-r ${getSecurityColor()} text-white mb-4 text-lg px-4 py-2`}>
            Silver Tinted • Diamond Clarity • {securityLevel}
          </Badge>
        </div>

        {/* Token Information */}
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-gray-500/30">
          <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
            <Crown className="h-6 w-6" />
            Global Citizen Identity Certificate
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">GCIT Number:</span>
              <div className="font-mono text-gray-200 bg-gray-800/50 p-2 rounded mt-1 flex items-center gap-2">
                {gciToken.gcitNumber}
                <Shield className="h-4 w-4 text-green-400" />
              </div>
            </div>

            <div>
              <span className="text-gray-400">Security Level:</span>
              <div className={`text-transparent bg-clip-text bg-gradient-to-r ${getSecurityColor()} font-bold mt-1`}>
                {securityLevel}
              </div>
            </div>

            <div>
              <span className="text-gray-400">Legal Name:</span>
              <div className="text-gray-200 mt-1">{gciToken.legalName}</div>
            </div>

            <div>
              <span className="text-gray-400">Domiciled Name:</span>
              <div className="text-gray-200 mt-1">{gciToken.domiciledName}</div>
            </div>

            <div>
              <span className="text-gray-400">Digital Identity:</span>
              <div className="text-gray-200 mt-1">{gciToken.digitalIdentity}</div>
            </div>

            <div>
              <span className="text-gray-400">Legal Origin:</span>
              <div className="text-gray-200 mt-1">{gciToken.legalOrigin}</div>
            </div>
          </div>

          <Separator className="my-4 bg-gray-600" />

          {/* Biometric Security Status */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-300 flex items-center gap-2">
              <Key className="h-5 w-5" />
              Biometric Security Profile
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["fingerprint", "facial", "voice"].map((type) => {
                const data = biometricData[type as keyof BiometricData]
                const Icon = getBiometricIcon(type)
                const isVerified = data?.verified

                return (
                  <div
                    key={type}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      isVerified ? "bg-green-950/30 border-green-500/30" : "bg-gray-800/30 border-gray-600/30"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isVerified ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        {isVerified ? (
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        ) : (
                          <Icon className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium text-gray-300 capitalize">{type}</span>
                    </div>

                    {data ? (
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Quality:</span>
                          <span className="text-gray-200">{Math.round(data.quality || data.confidence || 0)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <Badge className={isVerified ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                            {isVerified ? "Verified" : "Failed"}
                          </Badge>
                        </div>
                        <div className="text-gray-500 text-xs">{new Date(data.timestamp).toLocaleString()}</div>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-xs">Not configured</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <Separator className="my-4 bg-gray-600" />

          {/* Maturity Terms */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-300">Maturity Terms</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Principal:</span>
                <div className="text-green-400 font-bold">${gciToken.maturityTerms.principal.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-400">Term:</span>
                <div className="text-gray-200">{gciToken.maturityTerms.termYears} years</div>
              </div>
              <div>
                <span className="text-gray-400">Rate:</span>
                <div className="text-gray-200">{gciToken.maturityTerms.interestRate}%</div>
              </div>
              <div>
                <span className="text-gray-400">Maturity Value:</span>
                <div className="text-green-400 font-bold">${gciToken.maturityTerms.maturityValue.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <Separator className="my-4 bg-gray-600" />

          {/* Jurisdiction Information */}
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-400">Jurisdiction:</span>
              <div className="text-gray-200">{gciToken.jurisdiction}</div>
            </div>
            <div>
              <span className="text-gray-400">Trustee:</span>
              <div className="text-gray-200">{gciToken.trustee}</div>
            </div>
            <div>
              <span className="text-gray-400">Issued:</span>
              <div className="text-gray-200">{new Date(gciToken.conceptionDate).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {onBiometricUpdate && (
            <Button
              onClick={onBiometricUpdate}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700"
            >
              <Zap className="mr-2 h-4 w-4" />
              Update Biometrics
            </Button>
          )}

          <Button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700">
            <Diamond className="mr-2 h-4 w-4" />
            View Full Certificate
          </Button>
        </div>
      </HolographicGlassCard>
    </div>
  )
}
