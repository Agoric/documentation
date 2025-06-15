"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Diamond,
  AlertTriangle,
  Upload,
  FileText,
  CheckCircle2,
  Clock,
  Shield,
  Crown,
  Zap,
  Eye,
  Lock,
  Globe,
  Scale,
  BanknoteIcon as Bank,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"

interface DocumentRequirement {
  id: string
  title: string
  description: string
  required: boolean
  uploaded: boolean
  verified: boolean
  urgency: "critical" | "high" | "medium"
  category: "citizenship" | "financial" | "identity"
  fileTypes: string[]
}

interface PersistentGCIProfileCardProps {
  userStatus: "pending" | "processing" | "verified" | "rejected"
  completionPercentage: number
  onDocumentUpload?: (documentId: string, file: File) => void
  onStatusUpdate?: () => void
}

export function PersistentGCIProfileCard({
  userStatus = "pending",
  completionPercentage = 25,
  onDocumentUpload,
  onStatusUpdate,
}: PersistentGCIProfileCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [laserEffect, setLaserEffect] = useState(false)
  const [urgentPulse, setUrgentPulse] = useState(true)

  const documentRequirements: DocumentRequirement[] = [
    {
      id: "passport",
      title: "Native Country Passport",
      description: "Current valid passport from your country of birth/citizenship",
      required: true,
      uploaded: false,
      verified: false,
      urgency: "critical",
      category: "citizenship",
      fileTypes: ["PDF", "JPG", "PNG"],
    },
    {
      id: "birth-certificate",
      title: "Birth Certificate",
      description: "Official birth certificate with government seal",
      required: true,
      uploaded: false,
      verified: false,
      urgency: "critical",
      category: "citizenship",
      fileTypes: ["PDF", "JPG", "PNG"],
    },
    {
      id: "proof-of-residence",
      title: "Proof of Current Residence",
      description: "Utility bill or bank statement (last 3 months)",
      required: true,
      uploaded: false,
      verified: false,
      urgency: "high",
      category: "identity",
      fileTypes: ["PDF", "JPG", "PNG"],
    },
    {
      id: "financial-statement",
      title: "Financial Declaration",
      description: "Bank statements and income verification (last 6 months)",
      required: true,
      uploaded: false,
      verified: false,
      urgency: "high",
      category: "financial",
      fileTypes: ["PDF", "XLS", "XLSX"],
    },
    {
      id: "tax-records",
      title: "Tax Records",
      description: "Recent tax returns or tax clearance certificate",
      required: true,
      uploaded: false,
      verified: false,
      urgency: "medium",
      category: "financial",
      fileTypes: ["PDF"],
    },
    {
      id: "identity-photo",
      title: "Government ID Photo",
      description: "Driver's license or national ID card",
      required: true,
      uploaded: false,
      verified: false,
      urgency: "high",
      category: "identity",
      fileTypes: ["JPG", "PNG"],
    },
  ]

  const criticalDocs = documentRequirements.filter((doc) => doc.urgency === "critical" && !doc.uploaded)
  const highPriorityDocs = documentRequirements.filter((doc) => doc.urgency === "high" && !doc.uploaded)
  const pendingDocs = documentRequirements.filter((doc) => !doc.uploaded)

  useEffect(() => {
    const interval = setInterval(() => {
      setLaserEffect(true)
      setTimeout(() => setLaserEffect(false), 2000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "from-red-500 to-red-600"
      case "high":
        return "from-orange-500 to-orange-600"
      case "medium":
        return "from-yellow-500 to-yellow-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "citizenship":
        return Globe
      case "financial":
        return Bank
      case "identity":
        return Shield
      default:
        return FileText
    }
  }

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed top-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-2xl shadow-amber-500/50 relative overflow-hidden"
        >
          <Diamond className="h-8 w-8 text-white" />
          {urgentPulse && <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping" />}
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-40 p-4"
    >
      <div className="max-w-6xl mx-auto">
        <HolographicGlassCard className="relative overflow-hidden">
          {/* Diamond Slab Background with Laser Engraving Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Diamond Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, rgba(212, 175, 55, 0.3) 25%, transparent 25%),
                  linear-gradient(-45deg, rgba(212, 175, 55, 0.3) 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, rgba(212, 175, 55, 0.3) 75%),
                  linear-gradient(-45deg, transparent 75%, rgba(212, 175, 55, 0.3) 75%)
                `,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }}
            />

            {/* Laser Engraving Effect */}
            <AnimatePresence>
              {laserEffect && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="absolute inset-y-0 w-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  style={{
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.8)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Holographic Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-2xl shadow-amber-500/50">
                    <Diamond className="h-8 w-8 text-white" />
                  </div>
                  {urgentPulse && <div className="absolute inset-0 bg-red-500/30 rounded-lg animate-ping" />}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Crown className="h-6 w-6 text-amber-400" />
                    Global Citizenship Status
                  </h2>
                  <p className="text-amber-200/80">Supreme Authority Realm Citizenship Processing</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 text-lg font-bold animate-pulse">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  URGENT ACTION REQUIRED
                </Badge>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-white hover:bg-white/10"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(true)}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Citizenship Verification Progress</span>
                <span className="text-amber-400 font-bold">{completionPercentage}%</span>
              </div>
              <Progress
                value={completionPercentage}
                className="h-3 bg-gray-800"
                indicatorClassName="bg-gradient-to-r from-amber-500 to-yellow-600"
              />
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Critical Documents Alert */}
                  {criticalDocs.length > 0 && (
                    <div className="bg-gradient-to-r from-red-950/50 to-red-900/50 rounded-xl p-6 border border-red-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="h-6 w-6 text-red-400 animate-pulse" />
                        <h3 className="text-xl font-bold text-red-300">Critical Documents Required</h3>
                        <Badge className="bg-red-500 text-white">{criticalDocs.length} Missing</Badge>
                      </div>
                      <p className="text-red-200/80 mb-4">
                        These documents are essential for native citizenship validation and must be uploaded immediately
                        to proceed with domicile processing.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {criticalDocs.map((doc) => (
                          <DocumentUploadCard
                            key={doc.id}
                            document={doc}
                            onUpload={(file) => onDocumentUpload?.(doc.id, file)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* High Priority Documents */}
                  {highPriorityDocs.length > 0 && (
                    <div className="bg-gradient-to-r from-orange-950/50 to-orange-900/50 rounded-xl p-6 border border-orange-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="h-6 w-6 text-orange-400" />
                        <h3 className="text-xl font-bold text-orange-300">High Priority Documents</h3>
                        <Badge className="bg-orange-500 text-white">{highPriorityDocs.length} Pending</Badge>
                      </div>
                      <p className="text-orange-200/80 mb-4">
                        Required for financial declarations and establishing credibility with Supreme Authority.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {highPriorityDocs.map((doc) => (
                          <DocumentUploadCard
                            key={doc.id}
                            document={doc}
                            onUpload={(file) => onDocumentUpload?.(doc.id, file)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator className="bg-amber-500/30" />

                  {/* Status Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/50 rounded-xl p-6 border border-blue-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <Globe className="h-6 w-6 text-blue-400" />
                        <h4 className="font-bold text-blue-300">Native Citizenship</h4>
                      </div>
                      <p className="text-blue-200/80 text-sm mb-3">
                        Validation of your native country citizenship status
                      </p>
                      <Badge className="bg-blue-500 text-white">
                        {documentRequirements.filter((d) => d.category === "citizenship" && d.uploaded).length}/
                        {documentRequirements.filter((d) => d.category === "citizenship").length} Complete
                      </Badge>
                    </div>

                    <div className="bg-gradient-to-br from-purple-950/50 to-purple-900/50 rounded-xl p-6 border border-purple-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <Crown className="h-6 w-6 text-purple-400" />
                        <h4 className="font-bold text-purple-300">Domicile Processing</h4>
                      </div>
                      <p className="text-purple-200/80 text-sm mb-3">Establishment of digital jurisdiction residency</p>
                      <Badge className="bg-purple-500 text-white">
                        {documentRequirements.filter((d) => d.category === "identity" && d.uploaded).length}/
                        {documentRequirements.filter((d) => d.category === "identity").length} Complete
                      </Badge>
                    </div>

                    <div className="bg-gradient-to-br from-green-950/50 to-green-900/50 rounded-xl p-6 border border-green-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <Scale className="h-6 w-6 text-green-400" />
                        <h4 className="font-bold text-green-300">Financial Declaration</h4>
                      </div>
                      <p className="text-green-200/80 text-sm mb-3">
                        Financial credibility and compliance verification
                      </p>
                      <Badge className="bg-green-500 text-white">
                        {documentRequirements.filter((d) => d.category === "financial" && d.uploaded).length}/
                        {documentRequirements.filter((d) => d.category === "financial").length} Complete
                      </Badge>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 pt-4">
                    <Button
                      onClick={onStatusUpdate}
                      className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-8 py-3 text-lg font-bold rounded-full shadow-lg shadow-amber-500/30"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Check Status Update
                    </Button>

                    <Button
                      variant="outline"
                      className="border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-8 py-3 text-lg font-bold rounded-full"
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      View Full Requirements
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </HolographicGlassCard>
      </div>
    </motion.div>
  )
}

interface DocumentUploadCardProps {
  document: DocumentRequirement
  onUpload: (file: File) => void
}

function DocumentUploadCard({ document, onUpload }: DocumentUploadCardProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const Icon = getCategoryIcon(document.category)

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onUpload(file)
    setIsUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  return (
    <div
      className={`
        relative p-4 rounded-lg border-2 border-dashed transition-all duration-300 cursor-pointer
        ${isDragOver ? "border-amber-400 bg-amber-500/10" : "border-gray-600 hover:border-amber-500/50"}
        ${document.uploaded ? "bg-green-950/30 border-green-500" : ""}
      `}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
          w-10 h-10 rounded-lg flex items-center justify-center
          ${document.uploaded ? "bg-green-500" : "bg-gray-700"}
        `}
        >
          {document.uploaded ? (
            <CheckCircle2 className="h-5 w-5 text-white" />
          ) : isUploading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <Icon className="h-5 w-5 text-white" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h5 className="font-medium text-white">{document.title}</h5>
            <Badge className={`bg-gradient-to-r ${getUrgencyColor(document.urgency)} text-white text-xs`}>
              {document.urgency}
            </Badge>
          </div>
          <p className="text-gray-300 text-sm mb-2">{document.description}</p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Accepts: {document.fileTypes.join(", ")}</span>
            {document.required && <Badge className="bg-red-500 text-white">Required</Badge>}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          {!document.uploaded && (
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = document.fileTypes.map((type) => `.${type.toLowerCase()}`).join(",")
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) handleFileUpload(file)
                }
                input.click()
              }}
            >
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Button>
          )}

          {document.uploaded && document.verified && (
            <Badge className="bg-green-500 text-white">
              <Lock className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "citizenship":
      return Globe
    case "financial":
      return Bank
    case "identity":
      return Shield
    default:
      return FileText
  }
}

function getUrgencyColor(urgency: string) {
  switch (urgency) {
    case "critical":
      return "from-red-500 to-red-600"
    case "high":
      return "from-orange-500 to-orange-600"
    case "medium":
      return "from-yellow-500 to-yellow-600"
    default:
      return "from-gray-500 to-gray-600"
  }
}
