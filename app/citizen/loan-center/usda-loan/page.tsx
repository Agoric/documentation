"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Home, ArrowLeft, FileText, DollarSign, User, CheckCircle, Shield } from "lucide-react"

export default function USDALoanPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ssn: "",
    dateOfBirth: "",

    // Employment Information
    employer: "",
    jobTitle: "",
    employmentLength: "",
    annualIncome: "",
    householdSize: "",

    // Property Information
    propertyAddress: "",
    propertyType: "single-family",
    purchasePrice: "",
    downPayment: "0",

    // Loan Information
    loanAmount: "",
    loanPurpose: "purchase",
    occupancy: "primary",
  })

  const loanSteps = [
    { id: 1, title: "Personal Info", icon: User, completed: false },
    { id: 2, title: "Employment", icon: FileText, completed: false },
    { id: 3, title: "Property", icon: Home, completed: false },
    { id: 4, title: "Income Verification", icon: DollarSign, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const usdaLoanPrograms = [
    {
      name: "USDA Direct Loan",
      rate: "Variable",
      downPayment: "0%",
      description: "Direct funding from USDA for low-income applicants",
      features: ["Payment assistance available", "Income-based payments", "Direct USDA funding"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "USDA Guaranteed Loan",
      rate: "6.75%",
      downPayment: "0%",
      description: "USDA-backed loan through approved lenders",
      features: ["No down payment", "Competitive rates", "Private lender funding"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "USDA Home Improvement",
      rate: "1.00%",
      downPayment: "N/A",
      description: "Grants and loans for home repairs",
      features: ["Very low interest", "Grant options available", "Health/safety improvements"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "USDA Refinance",
      rate: "6.50%",
      downPayment: "N/A",
      description: "Refinance existing USDA loans",
      features: ["Streamlined process", "Lower payments", "Cash-out options"],
      color: "from-orange-500 to-red-500",
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < loanSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitApplication = () => {
    const applicationId = `USDA-${Date.now()}`
    router.push(`/citizen/loan-center/status/${applicationId}`)
  }

  const calculateMonthlyPayment = () => {
    const principal = Number(formData.loanAmount) || 300000
    const rate = 6.75 / 100 / 12
    const payments = 30 * 12

    if (rate === 0) return principal / payments

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1)
    
    // Add USDA guarantee fee (1% upfront, 0.35% annual)
    const guaranteeFee = (principal * 0.0035) / 12
    
    return monthlyPayment + guaranteeFee
  }

  const monthlyPayment = calculateMonthlyPayment()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                USDA Rural Loan Application
              </h1>
              <p className="text-xl text-purple-200 mt-2">Rural development loan program for eligible areas</p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2">
                <Shield className="h-4 w-4 mr-1" />
                USDA Government Guaranteed
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="\
