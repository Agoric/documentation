"use client"

// Comprehensive Institutional Verification System
export interface InstitutionalEntity {
  entityId: string
  entityName: string
  entityType:
    | "corporation"
    | "llc"
    | "partnership"
    | "trust"
    | "financial_institution"
    | "government_entity"
    | "non_profit"

  // Basic Information
  registrationNumber: string
  taxId: string
  incorporationDate: Date
  jurisdiction: string
  registeredAddress: Address
  businessAddress: Address

  // Financial Information
  financialProfile: FinancialProfile

  // Verification Status
  verificationStatus: VerificationStatus

  // Compliance Information
  complianceProfile: ComplianceProfile

  // Key Personnel
  keyPersonnel: KeyPersonnel[]

  // Business Operations
  businessProfile: BusinessProfile

  // Risk Assessment
  riskAssessment: RiskAssessment

  // Documentation
  documents: InstitutionalDocument[]

  // Verification History
  verificationHistory: VerificationEvent[]
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface FinancialProfile {
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  annualRevenue: number
  annualProfit: number

  // Credit Information
  creditRating: string
  creditScore: number
  creditHistory: CreditEvent[]

  // Banking Information
  primaryBank: string
  bankingRelationshipYears: number

  // Financial Ratios
  debtToEquityRatio: number
  currentRatio: number
  returnOnAssets: number
  returnOnEquity: number

  // Cash Flow
  operatingCashFlow: number
  freeCashFlow: number
  cashReserves: number
}

export interface CreditEvent {
  eventDate: Date
  eventType: "rating_change" | "default" | "restructuring" | "payment_delay"
  description: string
  impact: "positive" | "negative" | "neutral"
  ratingBefore?: string
  ratingAfter?: string
}

export interface VerificationStatus {
  overallStatus: "pending" | "in_progress" | "verified" | "rejected" | "expired"
  verificationLevel: "basic" | "enhanced" | "premium"
  verificationDate: Date | null
  expirationDate: Date | null

  // Individual Verification Components
  identityVerification: ComponentStatus
  financialVerification: ComponentStatus
  complianceVerification: ComponentStatus
  documentVerification: ComponentStatus
  backgroundVerification: ComponentStatus

  // Verification Score
  verificationScore: number // 0-100
  confidenceLevel: number // 0-1

  // Verification Notes
  verificationNotes: string[]
  rejectionReasons: string[]
}

export interface ComponentStatus {
  status: "pending" | "in_progress" | "completed" | "failed"
  completedDate: Date | null
  verifiedBy: string | null
  notes: string[]
}

export interface ComplianceProfile {
  // Regulatory Compliance
  regulatoryCompliance: RegulatoryCompliance[]

  // AML/KYC Status
  amlStatus: "compliant" | "non_compliant" | "under_review"
  kycStatus: "compliant" | "non_compliant" | "under_review"

  // Sanctions Screening
  sanctionsScreening: SanctionsScreening

  // PEP (Politically Exposed Person) Screening
  pepScreening: PEPScreening

  // Industry-Specific Compliance
  industryCompliance: IndustryCompliance[]

  // Compliance History
  complianceHistory: ComplianceEvent[]

  // Risk Rating
  complianceRiskRating: "low" | "medium" | "high" | "critical"
}

export interface RegulatoryCompliance {
  regulation: string
  jurisdiction: string
  complianceStatus: "compliant" | "non_compliant" | "partial" | "not_applicable"
  lastReviewDate: Date
  nextReviewDate: Date
  certificationNumber?: string
  certifyingBody?: string
}

export interface SanctionsScreening {
  lastScreeningDate: Date
  screeningResult: "clear" | "match_found" | "potential_match" | "error"
  screeningProvider: string
  matchDetails?: SanctionsMatch[]
}

export interface SanctionsMatch {
  listName: string
  matchType: "exact" | "partial" | "phonetic"
  matchScore: number
  entityName: string
  listingDate: Date
  reason: string
}

export interface PEPScreening {
  lastScreeningDate: Date
  screeningResult: "clear" | "pep_identified" | "potential_pep" | "error"
  pepDetails?: PEPDetails[]
}

export interface PEPDetails {
  personName: string
  position: string
  country: string
  pepCategory:
    | "head_of_state"
    | "government_official"
    | "judicial_official"
    | "military_official"
    | "party_official"
    | "international_organization"
  riskLevel: "low" | "medium" | "high"
}

export interface IndustryCompliance {
  industry: string
  regulations: string[]
  licenses: License[]
  certifications: Certification[]
}

export interface License {
  licenseType: string
  licenseNumber: string
  issuingAuthority: string
  issueDate: Date
  expirationDate: Date
  status: "active" | "expired" | "suspended" | "revoked"
}

export interface Certification {
  certificationType: string
  certificationNumber: string
  certifyingBody: string
  issueDate: Date
  expirationDate: Date
  status: "active" | "expired" | "suspended"
}

export interface ComplianceEvent {
  eventDate: Date
  eventType: "violation" | "fine" | "warning" | "remediation" | "audit" | "certification"
  description: string
  severity: "low" | "medium" | "high" | "critical"
  resolution: string
  resolutionDate: Date | null
}

export interface KeyPersonnel {
  personId: string
  name: string
  position: string
  startDate: Date
  endDate: Date | null

  // Personal Information
  dateOfBirth: Date
  nationality: string
  residenceAddress: Address

  // Professional Background
  professionalBackground: ProfessionalBackground[]

  // Verification Status
  backgroundCheckStatus: "pending" | "in_progress" | "cleared" | "flagged"
  backgroundCheckDate: Date | null

  // PEP Status
  isPEP: boolean
  pepDetails?: PEPDetails

  // Sanctions Status
  sanctionsStatus: "clear" | "flagged" | "under_review"

  // Ownership Information
  ownershipPercentage: number
  votingRights: boolean
  controlRights: boolean
}

export interface ProfessionalBackground {
  company: string
  position: string
  startDate: Date
  endDate: Date | null
  industry: string
  description: string
}

export interface BusinessProfile {
  // Business Description
  businessDescription: string
  primaryIndustry: string
  secondaryIndustries: string[]
  
  // Business Model
  businessModel: string
  revenueStreams: string[]
  targetMarkets: string[]
  
  // Geographic Presence
  operatingCountries: string[]
  headquartersCountry: string
  
  // Business Relationships
  majorCustomers: BusinessRelationship[]
  majorSuppliers: BusinessRelationship[]
  subsidiaries: Subsidiary[]
  parentCompany?: ParentCompany
  
  // Financial Performance
  financialTrends: FinancialTrend[]
  
  // Business Risks
  businessRisks: BusinessRisk[]
