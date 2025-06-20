"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Building, CreditCard, TrendingUp, Home, Shield, CheckCircle, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface BusinessEntity {
  businessId: string
  businessName: string
  businessType: "llc" | "corporation" | "partnership" | "sole_proprietorship"
  taxId: string
  incorporationDate: Date
  businessAddress: string
  industryCode: string
  annualRevenue: number
  employeeCount: number
  creditRating: string
}

interface BusinessCoverageFormProps {
  selectedTier: "business_tier1" | "business_tier2" | "business_tier3"
  onSubmit: (businessInfo: BusinessEntity) => void
  onCancel: () => void
}

const businessTypes = [
  { value: "llc", label: "Limited Liability Company (LLC)" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
]

const industryCodes = [
  { value: "11", label: "Agriculture, Forestry, Fishing" },
  { value: "21", label: "Mining, Quarrying, Oil & Gas" },
  { value: "22", label: "Utilities" },
  { value: "23", label: "Construction" },
  { value: "31-33", label: "Manufacturing" },
  { value: "42", label: "Wholesale Trade" },
  { value: "44-45", label: "Retail Trade" },
  { value: "48-49", label: "Transportation & Warehousing" },
  { value: "51", label: "Information Technology" },
  { value: "52", label: "Finance & Insurance" },
  { value: "53", label: "Real Estate & Rental" },
  { value: "54", label: "Professional Services" },
  { value: "55", label: "Management Services" },
  { value: "56", label: "Administrative Services" },
  { value: "61", label: "Educational Services" },
  { value: "62", label: "Healthcare & Social Assistance" },
  { value: "71", label: "Arts & Entertainment" },
  { value: "72", label: "Accommodation & Food Services" },
  { value: "81", label: "Other Services" },
  { value: "92", label: "Public Administration" },
]

const tierInfo = {
  business_tier1: {
    name: "Business Credit Acceleration Package",
    subtitle: "Acceleratio Crediti Negotium",
    amount: "$50,000",
    monthlyFee: "$99.99",
    icon: CreditCard,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
  business_tier2: {
    name: "Enhanced Business Credit Program",
    subtitle: "Programma Crediti Negotium Supremus",
    amount: "$250,000",
    monthlyFee: "$299.99",
    icon: TrendingUp,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20",
  },
  business_tier3: {
    name: "Commercial Property Purchase Guarantee",
    subtitle: "Garantia Proprietatis Commercialis",
    amount: "$500,000",
    monthlyFee: "$599.99",
    icon: Home,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
  },
}

export function BusinessCoverageForm({ selectedTier, onSubmit, onCancel }: BusinessCoverageFormProps) {
  const [formData, setFormData] = useState<Partial<BusinessEntity>>({
    businessName: "",
    businessType: undefined,
    taxId: "",
    incorporationDate: undefined,
    businessAddress: "",
    industryCode: "",
    annualRevenue: 0,
    employeeCount: 0,
    creditRating: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const tier = tierInfo[selectedTier]
  const Icon = tier.icon

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.businessName?.trim()) {
      newErrors.businessName = "Business name is required"
    }

    if (!formData.businessType) {
      newErrors.businessType = "Business type is required"
    }

    if (!formData.taxId?.trim()) {
      newErrors.taxId = "Tax ID is required"
    } else if (!/^\d{2}-\d{7}$/.test(formData.taxId)) {
      newErrors.taxId = "Tax ID must be in format XX-XXXXXXX"
    }

    if (!formData.incorporationDate) {
      newErrors.incorporationDate = "Incorporation date is required"
    }

    if (!formData.businessAddress?.trim()) {
      newErrors.businessAddress = "Business address is required"
    }

    if (!formData.industryCode) {
      newErrors.industryCode = "Industry code is required"
    }

    if (!formData.annualRevenue || formData.annualRevenue <= 0) {
      newErrors.annualRevenue = "Annual revenue must be greater than 0"
    }

    if (!formData.employeeCount || formData.employeeCount < 1) {
      newErrors.employeeCount = "Employee count must be at least 1"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const businessEntity: BusinessEntity = {
        businessId: `business_${Date.now()}`,
        businessName: formData.businessName!,
        businessType: formData.businessType!,
        taxId: formData.taxId!,
        incorporationDate: formData.incorporationDate!,
        businessAddress: formData.businessAddress!,
        industryCode: formData.industryCode!,
        annualRevenue: formData.annualRevenue!,
        employeeCount: formData.employeeCount!,
        creditRating: formData.creditRating || "Not Rated",
      }

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      onSubmit(businessEntity)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: keyof BusinessEntity, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <Card className={cn("bg-gradient-to-br from-black/40 to-purple-900/20", tier.borderColor)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={cn("p-3 rounded-full", tier.bgColor)}>
                <Icon className={cn("w-6 h-6", tier.color)} />
              </div>
              <div>
                <CardTitle className={cn("text-xl", tier.color)}>{tier.name}</CardTitle>
                <CardDescription className="text-amber-300/60 italic font-serif">{tier.subtitle}</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className={cn("text-2xl font-bold", tier.color)}>{tier.amount}</div>
              <div className="text-sm text-gray-400">Coverage Amount</div>
              <div className={cn("text-lg font-semibold mt-1", tier.color)}>{tier.monthlyFee}</div>
              <div className="text-xs text-gray-400">Monthly Premium</div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Building className={cn("w-5 h-5", tier.color)} />
                <h3 className={cn("text-lg font-semibold", tier.color)}>Business Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-gray-300">
                    Business Name *
                  </Label>
                  <Input
                    id="businessName"
                    value={formData.businessName || ""}
                    onChange={(e) => updateFormData("businessName", e.target.value)}
                    placeholder="Enter business name"
                    className={cn(
                      "bg-black/20 border-gray-600 text-white",
                      errors.businessName ? "border-red-400" : "",
                    )}
                  />
                  {errors.businessName && <p className="text-red-400 text-sm">{errors.businessName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-gray-300">
                    Business Type *
                  </Label>
                  <Select
                    value={formData.businessType || ""}
                    onValueChange={(value) => updateFormData("businessType", value)}
                  >
                    <SelectTrigger
                      className={cn(
                        "bg-black/20 border-gray-600 text-white",
                        errors.businessType ? "border-red-400" : "",
                      )}
                    >
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.businessType && <p className="text-red-400 text-sm">{errors.businessType}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId" className="text-gray-300">
                    Tax ID (EIN) *
                  </Label>
                  <Input
                    id="taxId"
                    value={formData.taxId || ""}
                    onChange={(e) => updateFormData("taxId", e.target.value)}
                    placeholder="XX-XXXXXXX"
                    className={cn("bg-black/20 border-gray-600 text-white", errors.taxId ? "border-red-400" : "")}
                  />
                  {errors.taxId && <p className="text-red-400 text-sm">{errors.taxId}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incorporationDate" className="text-gray-300">
                    Incorporation Date *
                  </Label>
                  <Input
                    id="incorporationDate"
                    type="date"
                    value={formData.incorporationDate?.toISOString().split("T")[0] || ""}
                    onChange={(e) => updateFormData("incorporationDate", new Date(e.target.value))}
                    className={cn(
                      "bg-black/20 border-gray-600 text-white",
                      errors.incorporationDate ? "border-red-400" : "",
                    )}
                  />
                  {errors.incorporationDate && <p className="text-red-400 text-sm">{errors.incorporationDate}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAddress" className="text-gray-300">
                  Business Address *
                </Label>
                <Input
                  id="businessAddress"
                  value={formData.businessAddress || ""}
                  onChange={(e) => updateFormData("businessAddress", e.target.value)}
                  placeholder="Enter complete business address"
                  className={cn(
                    "bg-black/20 border-gray-600 text-white",
                    errors.businessAddress ? "border-red-400" : "",
                  )}
                />
                {errors.businessAddress && <p className="text-red-400 text-sm">{errors.businessAddress}</p>}
              </div>
            </div>

            <Separator className={tier.borderColor} />

            {/* Financial Information Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className={cn("w-5 h-5", tier.color)} />
                <h3 className={cn("text-lg font-semibold", tier.color)}>Financial Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industryCode" className="text-gray-300">
                    Industry Code *
                  </Label>
                  <Select
                    value={formData.industryCode || ""}
                    onValueChange={(value) => updateFormData("industryCode", value)}
                  >
                    <SelectTrigger
                      className={cn(
                        "bg-black/20 border-gray-600 text-white",
                        errors.industryCode ? "border-red-400" : "",
                      )}
                    >
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryCodes.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industryCode && <p className="text-red-400 text-sm">{errors.industryCode}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualRevenue" className="text-gray-300">
                    Annual Revenue *
                  </Label>
                  <Input
                    id="annualRevenue"
                    type="number"
                    value={formData.annualRevenue || ""}
                    onChange={(e) => updateFormData("annualRevenue", Number.parseInt(e.target.value))}
                    placeholder="Enter annual revenue"
                    className={cn(
                      "bg-black/20 border-gray-600 text-white",
                      errors.annualRevenue ? "border-red-400" : "",
                    )}
                  />
                  {errors.annualRevenue && <p className="text-red-400 text-sm">{errors.annualRevenue}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount" className="text-gray-300">
                    Employee Count *
                  </Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    value={formData.employeeCount || ""}
                    onChange={(e) => updateFormData("employeeCount", Number.parseInt(e.target.value))}
                    placeholder="Number of employees"
                    className={cn(
                      "bg-black/20 border-gray-600 text-white",
                      errors.employeeCount ? "border-red-400" : "",
                    )}
                  />
                  {errors.employeeCount && <p className="text-red-400 text-sm">{errors.employeeCount}</p>}
                </div>
              </div>
            </div>

            <Separator className={tier.borderColor} />

            {/* Coverage Summary */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className={cn("w-5 h-5", tier.color)} />
                <h3 className={cn("text-lg font-semibold", tier.color)}>Coverage Summary</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={cn("p-4 rounded-lg", tier.bgColor, tier.borderColor, "border")}>
                  <h4 className={cn("font-semibold mb-3", tier.color)}>Coverage Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Coverage Amount</span>
                      <span className={tier.color}>{tier.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Premium</span>
                      <span className={tier.color}>{tier.monthlyFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Annual Premium</span>
                      <span className={tier.color}>
                        ${(Number.parseFloat(tier.monthlyFee.replace("$", "")) * 12).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Deductible</span>
                      <span className={tier.color}>
                        $
                        {selectedTier === "business_tier1"
                          ? "1,000"
                          : selectedTier === "business_tier2"
                            ? "2,000"
                            : "5,000"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={cn("p-4 rounded-lg", tier.bgColor, tier.borderColor, "border")}>
                  <h4 className={cn("font-semibold mb-3", tier.color)}>Key Benefits</h4>
                  <div className="space-y-2">
                    {[
                      "Guaranteed approval process",
                      "24/7 business support hotline",
                      "Certified letter of coverage",
                      "Global business recognition",
                      "Digital certificate verification",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={cn(
                  "flex-1 font-semibold",
                  selectedTier === "business_tier1"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                    : selectedTier === "business_tier2"
                      ? "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Processing Application..."
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Purchase Business Coverage
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
