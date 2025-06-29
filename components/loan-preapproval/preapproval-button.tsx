"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Lock, Unlock, Clock, Zap, Star, Award } from "lucide-react"
import { PreApprovalForm } from "./preapproval-form"
import { PreApprovalStatus } from "./preapproval-status"
import { usePreApproval } from "@/hooks/use-preapproval"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"

interface PreApprovalButtonProps {
  variant?: "default" | "premium" | "floating"
  size?: "sm" | "md" | "lg"
  className?: string
  onUnlock?: (approvalData: any) => void
}

export function PreApprovalButton({
  variant = "default",
  size = "md",
  className = "",
  onUnlock,
}: PreApprovalButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { preApprovalStatus, isLoading, submitPreApproval, getPreApprovalBenefits, isPreApproved } = usePreApproval()

  const handleUnlock = (approvalData: any) => {
    onUnlock?.(approvalData)
    setIsOpen(false)
  }

  const getButtonContent = () => {
    if (isPreApproved) {
      return (
        <div className="flex items-center gap-2">
          <Unlock className="h-4 w-4 text-green-400" />
          <span>Pre-Approved</span>
          <Badge className="bg-green-500/20 text-green-400 ml-2">
            ${preApprovalStatus?.approvedAmount?.toLocaleString()}
          </Badge>
        </div>
      )
    }

    if (preApprovalStatus?.status === "pending") {
      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 animate-pulse text-yellow-400" />
          <span>Review in Progress</span>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4" />
        <span>Get Pre-Approved</span>
        <Zap className="h-4 w-4 text-yellow-400" />
      </div>
    )
  }

  const getButtonVariant = () => {
    if (isPreApproved) return "default"
    if (preApprovalStatus?.status === "pending") return "secondary"
    return "default"
  }

  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className={`
                rounded-full shadow-2xl backdrop-blur-sm border-2
                ${
                  isPreApproved
                    ? "bg-green-500/20 border-green-500/40 text-green-400 hover:bg-green-500/30"
                    : "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/40 hover:from-purple-500/30 hover:to-cyan-500/30"
                }
                ${className}
              `}
            >
              {getButtonContent()}
            </Button>
          </DialogTrigger>
          <PreApprovalDialog onUnlock={handleUnlock} />
        </Dialog>
      </div>
    )
  }

  if (variant === "premium") {
    return (
      <RoyalDiamondSlabCard
        variant={isPreApproved ? "emerald" : "diamond"}
        size="lg"
        title="Loan Pre-Approval"
        content={isPreApproved ? "Unlocked" : "Get Started"}
        highlightWords={["Pre-Approval"]}
        className={`cursor-pointer transition-all hover:scale-105 ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="flex items-center justify-between w-full">
              {getButtonContent()}
              {isPreApproved && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Award className="h-4 w-4 text-yellow-400" />
                </div>
              )}
            </div>
          </DialogTrigger>
          <PreApprovalDialog onUnlock={handleUnlock} />
        </Dialog>
      </RoyalDiamondSlabCard>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={getButtonVariant()}
          size={size}
          disabled={isLoading}
          className={`
            ${
              isPreApproved
                ? "bg-green-500/20 text-green-400 border-green-500/40 hover:bg-green-500/30"
                : "bg-gradient-to-r from-purple-500/10 to-cyan-500/10 hover:from-purple-500/20 hover:to-cyan-500/20"
            }
            ${className}
          `}
        >
          {getButtonContent()}
        </Button>
      </DialogTrigger>
      <PreApprovalDialog onUnlock={handleUnlock} />
    </Dialog>
  )
}

function PreApprovalDialog({ onUnlock }: { onUnlock: (data: any) => void }) {
  const { preApprovalStatus, isPreApproved } = usePreApproval()

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-sm border-white/20">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          {isPreApproved ? "Pre-Approval Complete" : "Get Pre-Approved for Your Loan"}
        </DialogTitle>
        <DialogDescription>
          {isPreApproved
            ? "Congratulations! You're pre-approved. Unlock premium features and exclusive rates."
            : "Get pre-approved in minutes and unlock exclusive rates, premium features, and priority processing."}
        </DialogDescription>
      </DialogHeader>

      {isPreApproved ? <PreApprovalStatus onUnlock={onUnlock} /> : <PreApprovalForm onSuccess={onUnlock} />}
    </DialogContent>
  )
}
