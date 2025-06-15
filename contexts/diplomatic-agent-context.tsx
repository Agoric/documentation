"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Define types for diplomatic agent system
export interface DiplomaticAgent {
  id: string
  agentCode: string
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  dateOfBirth: string
  profileImage?: string

  // Certification Details
  certificationLevel: "Trainee" | "Associate" | "Senior" | "Ambassador" | "Supreme"
  specializations: DiplomaticSpecialization[]
  certificationDate: Date
  expirationDate: Date
  renewalDate?: Date

  // Status and Activity
  status: "Active" | "Inactive" | "Suspended" | "Under Review" | "Retired"
  lastActive: Date
  totalMissions: number
  successfulMissions: number
  currentAssignments: Assignment[]

  // Diplomatic Credentials
  diplomaticPassport: string
  immunityLevel: "Full" | "Functional" | "Limited" | "None"
  authorizedTerritories: string[]
  securityClearance: "Public" | "Confidential" | "Secret" | "Top Secret" | "Quantum"

  // Performance Metrics
  performanceRating: number
  commendations: Commendation[]
  incidents: Incident[]
  trainingRecords: TrainingRecord[]

  // Contact and Emergency
  emergencyContact: {
    name: string
    relationship: string
    phone: string
    email: string
  }

  // Biometric and Security
  biometricHash: string
  quantumSignature: string
  encryptionKeys: {
    public: string
    private?: string
  }
}

export interface DiplomaticSpecialization {
  id: string
  name: string
  description: string
  certificationDate: Date
  level: "Basic" | "Intermediate" | "Advanced" | "Expert"
  category: "Economic" | "Legal" | "Technical" | "Security" | "Cultural" | "Trade"
}

export interface Assignment {
  id: string
  title: string
  description: string
  priority: "Low" | "Medium" | "High" | "Critical" | "Emergency"
  status: "Pending" | "Active" | "Completed" | "Cancelled" | "On Hold"
  startDate: Date
  endDate?: Date
  location: string
  objectives: string[]
  progress: number
}

export interface Commendation {
  id: string
  title: string
  description: string
  awardedBy: string
  date: Date
  category: "Excellence" | "Bravery" | "Innovation" | "Leadership" | "Service"
  points: number
}

export interface Incident {
  id: string
  title: string
  description: string
  severity: "Minor" | "Moderate" | "Serious" | "Critical"
  date: Date
  resolved: boolean
  resolution?: string
  impactOnImmunity: boolean
}

export interface TrainingRecord {
  id: string
  courseName: string
  provider: string
  completionDate: Date
  score: number
  certificateUrl?: string
  renewalRequired: boolean
  renewalDate?: Date
}

export interface CertificationApplication {
  id: string
  applicantInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    nationality: string
    dateOfBirth: string
  }
  desiredLevel: DiplomaticAgent["certificationLevel"]
  requestedSpecializations: string[]
  experience: string
  education: string
  references: {
    name: string
    position: string
    organization: string
    contact: string
  }[]
  status: "Submitted" | "Under Review" | "Interview Scheduled" | "Background Check" | "Approved" | "Rejected"
  submissionDate: Date
  reviewNotes?: string
}

interface DiplomaticAgentContextType {
  agents: DiplomaticAgent[]
  applications: CertificationApplication[]
  selectedAgent: DiplomaticAgent | null

  // Agent Management
  createAgent: (application: CertificationApplication) => Promise<DiplomaticAgent>
  updateAgent: (agentId: string, updates: Partial<DiplomaticAgent>) => void
  suspendAgent: (agentId: string, reason: string) => void
  reactivateAgent: (agentId: string) => void
  retireAgent: (agentId: string) => void

  // Certification Management
  submitApplication: (application: Omit<CertificationApplication, "id" | "submissionDate" | "status">) => void
  reviewApplication: (applicationId: string, status: CertificationApplication["status"], notes?: string) => void
  renewCertification: (agentId: string) => void
  addSpecialization: (agentId: string, specialization: DiplomaticSpecialization) => void

  // Assignment Management
  assignMission: (agentId: string, assignment: Assignment) => void
  updateAssignment: (agentId: string, assignmentId: string, updates: Partial<Assignment>) => void
  completeAssignment: (agentId: string, assignmentId: string) => void

  // Performance Management
  addCommendation: (agentId: string, commendation: Commendation) => void
  reportIncident: (agentId: string, incident: Incident) => void
  updatePerformanceRating: (agentId: string, rating: number) => void

  // Tracking and Monitoring
  trackAgentActivity: (agentId: string, activity: string) => void
  getAgentLocation: (agentId: string) => Promise<{ lat: number; lng: number; timestamp: Date } | null>
  getAgentsByStatus: (status: DiplomaticAgent["status"]) => DiplomaticAgent[]
  getAgentsBySpecialization: (specialization: string) => DiplomaticAgent[]

  // Security and Verification
  verifyAgentIdentity: (agentId: string, biometricData: string) => Promise<boolean>
  generateQuantumSignature: (agentId: string) => string
  validateDiplomaticCredentials: (agentId: string) => boolean

  // Utility Functions
  setSelectedAgent: (agent: DiplomaticAgent | null) => void
  searchAgents: (query: string) => DiplomaticAgent[]
  getAgentStatistics: () => {
    total: number
    active: number
    byLevel: Record<DiplomaticAgent["certificationLevel"], number>
    bySpecialization: Record<string, number>
  }
}

const DiplomaticAgentContext = createContext<DiplomaticAgentContextType | undefined>(undefined)

export const useDiplomaticAgents = () => {
  const context = useContext(DiplomaticAgentContext)
  if (!context) {
    throw new Error("useDiplomaticAgents must be used within a DiplomaticAgentProvider")
  }
  return context
}

// Sample data for demonstration
const sampleAgents: DiplomaticAgent[] = [
  {
    id: "DA001",
    agentCode: "SNAP-AMB-001",
    firstName: "Alexandra",
    lastName: "Chen",
    email: "a.chen@snappcreditcom.realm",
    phone: "+1-555-DIPLOMAT",
    nationality: "Economic Global Citizen",
    dateOfBirth: "1985-03-15",
    certificationLevel: "Ambassador",
    specializations: [
      {
        id: "spec1",
        name: "Economic Global Citizenship",
        description: "Expert in EGC policies and implementation",
        certificationDate: new Date("2023-01-15"),
        level: "Expert",
        category: "Economic",
      },
      {
        id: "spec2",
        name: "Quantum Finance",
        description: "Advanced quantum financial systems",
        certificationDate: new Date("2023-06-20"),
        level: "Advanced",
        category: "Technical",
      },
    ],
    certificationDate: new Date("2023-01-15"),
    expirationDate: new Date("2025-01-15"),
    status: "Active",
    lastActive: new Date(),
    totalMissions: 47,
    successfulMissions: 45,
    currentAssignments: [
      {
        id: "assign1",
        title: "EU Digital Currency Integration",
        description: "Negotiate SNAP currency acceptance in European markets",
        priority: "High",
        status: "Active",
        startDate: new Date("2024-01-01"),
        location: "Brussels, Belgium",
        objectives: ["Establish regulatory framework", "Negotiate exchange agreements", "Implement pilot programs"],
        progress: 75,
      },
    ],
    diplomaticPassport: "SNAP-DP-001-2024",
    immunityLevel: "Full",
    authorizedTerritories: ["Global", "Digital Realm", "Quantum Space"],
    securityClearance: "Top Secret",
    performanceRating: 9.2,
    commendations: [
      {
        id: "comm1",
        title: "Excellence in Diplomatic Service",
        description: "Outstanding performance in Asian market expansion",
        awardedBy: "Supreme Digital Council",
        date: new Date("2023-12-01"),
        category: "Excellence",
        points: 100,
      },
    ],
    incidents: [],
    trainingRecords: [
      {
        id: "train1",
        courseName: "Advanced Diplomatic Protocol",
        provider: "SNAPPCREDITCOM Academy",
        completionDate: new Date("2023-11-15"),
        score: 98,
        renewalRequired: true,
        renewalDate: new Date("2024-11-15"),
      },
    ],
    emergencyContact: {
      name: "Michael Chen",
      relationship: "Spouse",
      phone: "+1-555-EMERGENCY",
      email: "m.chen@personal.com",
    },
    biometricHash: "quantum_hash_abc123",
    quantumSignature: "QS_alexandra_chen_2024",
    encryptionKeys: {
      public: "pub_key_alexandra_001",
    },
  },
  {
    id: "DA002",
    agentCode: "SNAP-SEN-002",
    firstName: "Marcus",
    lastName: "Rodriguez",
    email: "m.rodriguez@snappcreditcom.realm",
    phone: "+1-555-DIPLOMAT",
    nationality: "Economic Global Citizen",
    dateOfBirth: "1990-07-22",
    certificationLevel: "Senior",
    specializations: [
      {
        id: "spec3",
        name: "Empirical Credit Systems",
        description: "Specialist in credit assessment algorithms",
        certificationDate: new Date("2023-03-10"),
        level: "Expert",
        category: "Technical",
      },
    ],
    certificationDate: new Date("2023-03-10"),
    expirationDate: new Date("2025-03-10"),
    status: "Active",
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    totalMissions: 23,
    successfulMissions: 22,
    currentAssignments: [],
    diplomaticPassport: "SNAP-DP-002-2024",
    immunityLevel: "Functional",
    authorizedTerritories: ["Americas", "Digital Realm"],
    securityClearance: "Secret",
    performanceRating: 8.7,
    commendations: [],
    incidents: [
      {
        id: "inc1",
        title: "Minor Protocol Violation",
        description: "Exceeded authority in trade negotiation",
        severity: "Minor",
        date: new Date("2023-08-15"),
        resolved: true,
        resolution: "Additional training completed",
        impactOnImmunity: false,
      },
    ],
    trainingRecords: [],
    emergencyContact: {
      name: "Sofia Rodriguez",
      relationship: "Sister",
      phone: "+1-555-FAMILY",
      email: "s.rodriguez@personal.com",
    },
    biometricHash: "quantum_hash_def456",
    quantumSignature: "QS_marcus_rodriguez_2024",
    encryptionKeys: {
      public: "pub_key_marcus_002",
    },
  },
]

const sampleApplications: CertificationApplication[] = [
  {
    id: "APP001",
    applicantInfo: {
      firstName: "Sarah",
      lastName: "Kim",
      email: "s.kim@applicant.com",
      phone: "+1-555-APPLY",
      nationality: "South Korean",
      dateOfBirth: "1992-11-08",
    },
    desiredLevel: "Associate",
    requestedSpecializations: ["Economic Global Citizenship", "Cultural Relations"],
    experience: "5 years in international trade and diplomacy",
    education: "Master's in International Relations, Seoul National University",
    references: [
      {
        name: "Dr. James Park",
        position: "Professor",
        organization: "Seoul National University",
        contact: "j.park@snu.ac.kr",
      },
    ],
    status: "Under Review",
    submissionDate: new Date("2024-01-10"),
    reviewNotes: "Strong candidate with excellent academic background",
  },
]

export const DiplomaticAgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<DiplomaticAgent[]>(sampleAgents)
  const [applications, setApplications] = useState<CertificationApplication[]>(sampleApplications)
  const [selectedAgent, setSelectedAgent] = useState<DiplomaticAgent | null>(null)

  // Agent Management Functions
  const createAgent = async (application: CertificationApplication): Promise<DiplomaticAgent> => {
    const newAgent: DiplomaticAgent = {
      id: `DA${String(agents.length + 1).padStart(3, "0")}`,
      agentCode: `SNAP-${application.desiredLevel.substring(0, 3).toUpperCase()}-${String(agents.length + 1).padStart(3, "0")}`,
      firstName: application.applicantInfo.firstName,
      lastName: application.applicantInfo.lastName,
      email: application.applicantInfo.email,
      phone: application.applicantInfo.phone,
      nationality: application.applicantInfo.nationality,
      dateOfBirth: application.applicantInfo.dateOfBirth,
      certificationLevel: application.desiredLevel,
      specializations: [],
      certificationDate: new Date(),
      expirationDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000), // 2 years
      status: "Active",
      lastActive: new Date(),
      totalMissions: 0,
      successfulMissions: 0,
      currentAssignments: [],
      diplomaticPassport: `SNAP-DP-${String(agents.length + 1).padStart(3, "0")}-2024`,
      immunityLevel:
        application.desiredLevel === "Ambassador" || application.desiredLevel === "Supreme" ? "Full" : "Functional",
      authorizedTerritories: ["Digital Realm"],
      securityClearance: "Confidential",
      performanceRating: 7.0,
      commendations: [],
      incidents: [],
      trainingRecords: [],
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
        email: "",
      },
      biometricHash: `quantum_hash_${Date.now()}`,
      quantumSignature: `QS_${application.applicantInfo.firstName.toLowerCase()}_${application.applicantInfo.lastName.toLowerCase()}_2024`,
      encryptionKeys: {
        public: `pub_key_${application.applicantInfo.firstName.toLowerCase()}_${String(agents.length + 1).padStart(3, "0")}`,
      },
    }

    setAgents((prev) => [...prev, newAgent])
    return newAgent
  }

  const updateAgent = (agentId: string, updates: Partial<DiplomaticAgent>) => {
    setAgents((prev) =>
      prev.map((agent) => (agent.id === agentId ? { ...agent, ...updates, lastActive: new Date() } : agent)),
    )
  }

  const suspendAgent = (agentId: string, reason: string) => {
    updateAgent(agentId, {
      status: "Suspended",
      incidents: [
        ...(agents.find((a) => a.id === agentId)?.incidents || []),
        {
          id: `inc_${Date.now()}`,
          title: "Agent Suspended",
          description: reason,
          severity: "Serious" as const,
          date: new Date(),
          resolved: false,
          impactOnImmunity: true,
        },
      ],
    })
  }

  const reactivateAgent = (agentId: string) => {
    updateAgent(agentId, { status: "Active" })
  }

  const retireAgent = (agentId: string) => {
    updateAgent(agentId, { status: "Retired" })
  }

  // Application Management
  const submitApplication = (application: Omit<CertificationApplication, "id" | "submissionDate" | "status">) => {
    const newApplication: CertificationApplication = {
      ...application,
      id: `APP${String(applications.length + 1).padStart(3, "0")}`,
      submissionDate: new Date(),
      status: "Submitted",
    }
    setApplications((prev) => [...prev, newApplication])
  }

  const reviewApplication = (applicationId: string, status: CertificationApplication["status"], notes?: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status, reviewNotes: notes } : app)),
    )
  }

  // Certification Management
  const renewCertification = (agentId: string) => {
    const renewalDate = new Date()
    const expirationDate = new Date(renewalDate.getTime() + 2 * 365 * 24 * 60 * 60 * 1000)
    updateAgent(agentId, { renewalDate, expirationDate })
  }

  const addSpecialization = (agentId: string, specialization: DiplomaticSpecialization) => {
    const agent = agents.find((a) => a.id === agentId)
    if (agent) {
      updateAgent(agentId, {
        specializations: [...agent.specializations, specialization],
      })
    }
  }

  // Assignment Management
  const assignMission = (agentId: string, assignment: Assignment) => {
    const agent = agents.find((a) => a.id === agentId)
    if (agent) {
      updateAgent(agentId, {
        currentAssignments: [...agent.currentAssignments, assignment],
      })
    }
  }

  const updateAssignment = (agentId: string, assignmentId: string, updates: Partial<Assignment>) => {
    const agent = agents.find((a) => a.id === agentId)
    if (agent) {
      const updatedAssignments = agent.currentAssignments.map((assignment) =>
        assignment.id === assignmentId ? { ...assignment, ...updates } : assignment,
      )
      updateAgent(agentId, { currentAssignments: updatedAssignments })
    }
  }

  const completeAssignment = (agentId: string, assignmentId: string) => {
    const agent = agents.find((a) => a.id === agentId)
    if (agent) {
      const assignment = agent.currentAssignments.find((a) => a.id === assignmentId)
      if (assignment) {
        updateAssignment(agentId, assignmentId, { status: "Completed", endDate: new Date(), progress: 100 })
        updateAgent(agentId, {
          totalMissions: agent.totalMissions + 1,
          successfulMissions: agent.successfulMissions + 1,
        })
      }
    }
  }

  // Performance Management
  const addCommendation = (agentId: string, commendation: Commendation) => {
    const agent = agents.find((a) => a.id === agentId)
    if (agent) {
      updateAgent(agentId, {
        commendations: [...agent.commendations, commendation],
      })
    }
  }

  const reportIncident = (agentId: string, incident: Incident) => {
    const agent = agents.find((a) => a.id === agentId)
    if (agent) {
      updateAgent(agentId, {
        incidents: [...agent.incidents, incident],
      })
    }
  }

  const updatePerformanceRating = (agentId: string, rating: number) => {
    updateAgent(agentId, { performanceRating: Math.max(0, Math.min(10, rating)) })
  }

  // Tracking and Monitoring
  const trackAgentActivity = (agentId: string, activity: string) => {
    updateAgent(agentId, { lastActive: new Date() })
    // In a real implementation, this would log the activity
    console.log(`Agent ${agentId} activity: ${activity}`)
  }

  const getAgentLocation = async (agentId: string): Promise<{ lat: number; lng: number; timestamp: Date } | null> => {
    // Simulated location data - in real implementation, this would query actual location services
    return {
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lng: -74.006 + (Math.random() - 0.5) * 0.1,
      timestamp: new Date(),
    }
  }

  const getAgentsByStatus = (status: DiplomaticAgent["status"]) => {
    return agents.filter((agent) => agent.status === status)
  }

  const getAgentsBySpecialization = (specialization: string) => {
    return agents.filter((agent) =>
      agent.specializations.some((spec) => spec.name.toLowerCase().includes(specialization.toLowerCase())),
    )
  }

  // Security and Verification
  const verifyAgentIdentity = async (agentId: string, biometricData: string): Promise<boolean> => {
    const agent = agents.find((a) => a.id === agentId)
    if (!agent) return false

    // Simulated biometric verification
    return agent.biometricHash === biometricData
  }

  const generateQuantumSignature = (agentId: string): string => {
    const agent = agents.find((a) => a.id === agentId)
    if (!agent) return ""

    const timestamp = Date.now()
    return `QS_${agent.firstName.toLowerCase()}_${agent.lastName.toLowerCase()}_${timestamp}`
  }

  const validateDiplomaticCredentials = (agentId: string): boolean => {
    const agent = agents.find((a) => a.id === agentId)
    if (!agent) return false

    const now = new Date()
    return agent.status === "Active" && agent.expirationDate > now
  }

  // Utility Functions
  const searchAgents = (query: string): DiplomaticAgent[] => {
    const lowercaseQuery = query.toLowerCase()
    return agents.filter(
      (agent) =>
        agent.firstName.toLowerCase().includes(lowercaseQuery) ||
        agent.lastName.toLowerCase().includes(lowercaseQuery) ||
        agent.email.toLowerCase().includes(lowercaseQuery) ||
        agent.agentCode.toLowerCase().includes(lowercaseQuery) ||
        agent.specializations.some((spec) => spec.name.toLowerCase().includes(lowercaseQuery)),
    )
  }

  const getAgentStatistics = () => {
    const total = agents.length
    const active = agents.filter((a) => a.status === "Active").length

    const byLevel = agents.reduce(
      (acc, agent) => {
        acc[agent.certificationLevel] = (acc[agent.certificationLevel] || 0) + 1
        return acc
      },
      {} as Record<DiplomaticAgent["certificationLevel"], number>,
    )

    const bySpecialization = agents.reduce(
      (acc, agent) => {
        agent.specializations.forEach((spec) => {
          acc[spec.name] = (acc[spec.name] || 0) + 1
        })
        return acc
      },
      {} as Record<string, number>,
    )

    return { total, active, byLevel, bySpecialization }
  }

  return (
    <DiplomaticAgentContext.Provider
      value={{
        agents,
        applications,
        selectedAgent,
        createAgent,
        updateAgent,
        suspendAgent,
        reactivateAgent,
        retireAgent,
        submitApplication,
        reviewApplication,
        renewCertification,
        addSpecialization,
        assignMission,
        updateAssignment,
        completeAssignment,
        addCommendation,
        reportIncident,
        updatePerformanceRating,
        trackAgentActivity,
        getAgentLocation,
        getAgentsByStatus,
        getAgentsBySpecialization,
        verifyAgentIdentity,
        generateQuantumSignature,
        validateDiplomaticCredentials,
        setSelectedAgent,
        searchAgents,
        getAgentStatistics,
      }}
    >
      {children}
    </DiplomaticAgentContext.Provider>
  )
}
