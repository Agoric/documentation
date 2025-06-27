"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, DollarSign, User, CheckCircle, BarChart3 } from "lucide-react"

export default function BusinessLoanPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "llc",
    industry: "",
    yearsInBusiness: "",
    ein: "",
    businessAddress: "",
    
    // Owner Information
    ownerName: "",
    ownerSSN: "",
    ownershipPercentage: "",
    ownerEmail: "",
    ownerPhone: "",
    
    // Financial Information
    annualRevenue: "",
    monthlyRevenue: "",
    businessExpenses: "",
    existingDebt: "",
    
    // Loan Information
    loanAmount: "",
    loanPurpose: "working-capital",
    loanTerm: "60",
  })

  const loanSteps = [
    { id: 1, title: "Business Info", icon: Building2, completed: false },
    { id: 2, title: "Owner Info", icon: User, completed: false },
    { id: 3, title: "Financials", icon: BarChart3, completed: false },
    { id: 4, title: "Loan Details", icon: DollarSign, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const businessLoanPrograms = [
    {
      name: "Working Capital Loan",
      rate: "7.50%",\
      amount: "Up to
