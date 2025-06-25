"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Sparkles } from "lucide-react"

interface Property {
  id: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  lotSize: number
  yearBuilt: number
  propertyType: string
  images: string[]
  description: string
  features: string[]
  neighborhood: string
  walkScore: number
  schoolRating: number
  marketTrend: "up" | "down" | "stable"
  daysOnMarket: number
  pricePerSqft: number
  isHolographic?: boolean
  holographicFeatures?: string[]
  has360View?: boolean
  zestimate: number
  priceHistory: Array<{ date: string; price: number }>
}

interface BidModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property
}

export function BidModal({ isOpen, onClose, property }: BidModalProps) {
  const [bidAmount, setBidAmount] = useState<number | "">("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  async function handleSubmit() {
    if (!bidAmount || bidAmount <= 0) return
    setIsSubmitting(true)

    // Simulate submission latency
    await new Promise((r) => setTimeout(r, 1200))

    setIsSubmitting(false)
    onClose()
    // In a real app, you’d call a server action or API here.
  }

  const minBid = Math.floor(property.price * 0.9)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-indigo-950/70 via-purple-950/60 to-cyan-950/70 border border-indigo-500/30 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
            <DollarSign className="w-5 h-5" />
            Place Your Bid
          </DialogTitle>
          <DialogDescription className="text-indigo-200/80">
            Submit a competitive offer for&nbsp;
            <span className="font-semibold text-indigo-100">{property.address}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Suggested bid range */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
              List Price&nbsp;{formatCurrency(property.price)}
            </Badge>
            <Badge variant="outline" className="border-cyan-400/40 text-cyan-300">
              Min. Competitive Bid&nbsp;{formatCurrency(minBid)}
            </Badge>
            {property.isHolographic && (
              <Badge className="flex items-center gap-1 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300">
                <Sparkles className="w-3 h-3" />
                Holographic Premium
              </Badge>
            )}
          </div>

          {/* Bid input */}
          <div>
            <label htmlFor="bid" className="block text-sm font-medium text-indigo-200/80 mb-1">
              Your Offer
            </label>
            <Input
              id="bid"
              type="number"
              min={minBid}
              step={1000}
              placeholder={formatCurrency(minBid)}
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="border-white/20">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isSubmitting || !bidAmount || bidAmount < minBid}
            onClick={handleSubmit}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Bid"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
