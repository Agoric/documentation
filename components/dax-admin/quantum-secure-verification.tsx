"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  CheckCircle,
  Zap,
  FileText,
  Clock,
  Key,
  Globe,
  Database,
  Cpu,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Fingerprint,
  QrCode,
  Layers,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface QuantumSignature {
  id: string
  algorithm: string
  keySize: number
  signature: string
  timestamp: string
  quantumResistant: boolean
}

interface BlockchainRecord {
  blockHash: string
  transactionHash: string
  blockNumber: number
  timestamp: string
  confirmations: number
  gasUsed: number
  status: "pending" | "confirmed" | "failed"
}

interface VerificationResult {
  id: string
  contributionId: string
  amount: number
  currency: string
  charity: string
  donor: string
  verificationLevel: "basic" | "enhanced" | "quantum"
  quantumSignature: QuantumSignature
  blockchainRecord: BlockchainRecord
  biometricHash?: string
  documentHashes: string[]
  verificationScore: number
  status: "verified" | "pending" | "failed" | "disputed"
  createdAt: string
  expiresAt: string
}

export function QuantumSecureVerification() {
  const [activeTab, setActiveTab] = useState("verify")
  const [contributionAmount, setContributionAmount] = useState<number>(50000)
  const [selectedCharity, setSelectedCharity] = useState<string>("imperial-trust")
  const [donorId, setDonorId] = useState<string>("")
  const [verificationLevel, setVerificationLevel] = useState<string>("quantum")
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [verificationProgress, setVerificationProgress] = useState<number>(0)
  const [currentVerification, setCurrentVerification] = useState<VerificationResult | null>(null)
  const [verificationHistory, setVerificationHistory] = useState<VerificationResult[]>([])
  const [quantumKeyPair, setQuantumKeyPair] = useState<{ public: string; private: string } | null>(null)

  const charities = [
    { id: "imperial-trust", name: "Imperial Trust Social Impact Fund", quantumEnabled: true },
    { id: "global-relief", name: "Global Relief Initiative", quantumEnabled: true },
    { id: "quantum-research", name: "Quantum Research Foundation", quantumEnabled: true },
    { id: "digital-education", name: "Digital Education Access", quantumEnabled: false },
    { id: "earth-preservation", name: "Earth Preservation Alliance", quantumEnabled: true },
  ]

  const verificationLevels = [
    {
      id: "basic",
      name: "Basic Verification",
      description: "Standard cryptographic verification",
      features: ["SHA-256 Hashing", "Digital Signatures", "Blockchain Recording"],
      quantumResistant: false,
      cost: 0,
    },
    {
      id: "enhanced",
      name: "Enhanced Verification",
      description: "Multi-layer verification with biometrics",
      features: ["Post-Quantum Cryptography", "Biometric Verification", "Multi-Signature", "Time-Lock Encryption"],
      quantumResistant: true,
      cost: 25,
    },
    {
      id: "quantum",
      name: "Quantum-Secure Verification",
      description: "Ultimate security with quantum entanglement",
      features: [
        "Quantum Key Distribution",
        "Lattice-Based Cryptography",
        "Quantum Entanglement Verification",
        "Zero-Knowledge Proofs",
        "Quantum Random Number Generation",
        "Multi-Dimensional Blockchain",
      ],
      quantumResistant: true,
      cost: 100,
    },
  ]

  // Simulate quantum key generation
  useEffect(() => {
    const generateQuantumKeyPair = () => {
      // In a real implementation, this would use actual quantum key generation
      const publicKey = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
      const privateKey = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
      setQuantumKeyPair({ public: publicKey, private: privateKey })
    }

    generateQuantumKeyPair()
  }, [])

  const generateQuantumSignature = (data: string): QuantumSignature => {
    // Simulate quantum signature generation
    const algorithms = ["Dilithium", "Falcon", "SPHINCS+", "Kyber-ML-KEM"]
    const algorithm = algorithms[Math.floor(Math.random() * algorithms.length)]
    const signature = Array.from({ length: 128 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    return {
      id: `qsig_${Date.now()}`,
      algorithm,
      keySize: 3072,
      signature,
      timestamp: new Date().toISOString(),
      quantumResistant: true,
    }
  }

  const createBlockchainRecord = (): BlockchainRecord => {
    // Simulate blockchain transaction
    const blockHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
    const transactionHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    return {
      blockHash,
      transactionHash,
      blockNumber: Math.floor(Math.random() * 1000000) + 1000000,
      timestamp: new Date().toISOString(),
      confirmations: Math.floor(Math.random() * 50) + 10,
      gasUsed: Math.floor(Math.random() * 100000) + 50000,
      status: "confirmed",
    }
  }

  const performVerification = async () => {
    setIsVerifying(true)
    setVerificationProgress(0)

    // Simulate verification process
    const steps = [
      "Generating quantum keys...",
      "Creating cryptographic hashes...",
      "Performing biometric verification...",
      "Generating quantum signature...",
      "Recording on blockchain...",
      "Validating with charity...",
      "Finalizing verification...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setVerificationProgress(((i + 1) / steps.length) * 100)
    }

    // Create verification result
    const contributionData = `${contributionAmount}-${selectedCharity}-${donorId}-${Date.now()}`
    const quantumSignature = generateQuantumSignature(contributionData)
    const blockchainRecord = createBlockchainRecord()

    const verification: VerificationResult = {
      id: `ver_${Date.now()}`,
      contributionId: `cont_${Date.now()}`,
      amount: contributionAmount,
      currency: "USD",
      charity: charities.find((c) => c.id === selectedCharity)?.name || "Unknown",
      donor: donorId || "Anonymous",
      verificationLevel: verificationLevel as "basic" | "enhanced" | "quantum",
      quantumSignature,
      blockchainRecord,
      biometricHash:
        verificationLevel !== "basic"
          ? Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
          : undefined,
      documentHashes: [
        Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
        Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      ],
      verificationScore: Math.floor(Math.random() * 20) + 80,
      status: "verified",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
    }

    setCurrentVerification(verification)
    setVerificationHistory((prev) => [verification, ...prev])
    setIsVerifying(false)
  }

  const selectedVerificationLevel = verificationLevels.find((v) => v.id === verificationLevel) || verificationLevels[2]

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Quantum-Secure Charitable Contribution Verification
          </CardTitle>
          <CardDescription>
            Ultra-secure verification using post-quantum cryptography and blockchain technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="verify" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Verify Contribution
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Verification History
              </TabsTrigger>
              <TabsTrigger value="keys" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Quantum Keys
              </TabsTrigger>
            </TabsList>

            <TabsContent value="verify" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contribution-amount">Contribution Amount (USD)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="contribution-amount"
                        type="number"
                        className="pl-8"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="charity">Charitable Organization</Label>
                    <Select value={selectedCharity} onValueChange={setSelectedCharity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {charities.map((charity) => (
                          <SelectItem key={charity.id} value={charity.id}>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              {charity.name}
                              {charity.quantumEnabled && (
                                <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100 text-xs">
                                  <Zap className="h-3 w-3 mr-1" />
                                  Quantum
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donor-id">Donor ID (Optional)</Label>
                    <Input
                      id="donor-id"
                      placeholder="Enter your DAX Citizen ID"
                      value={donorId}
                      onChange={(e) => setDonorId(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verification-level">Verification Level</Label>
                    <Select value={verificationLevel} onValueChange={setVerificationLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {verificationLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              {level.name}
                              {level.quantumResistant && (
                                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                                  Quantum-Safe
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="bg-gradient-to-r from-purple-50 to-white border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{selectedVerificationLevel.name}</CardTitle>
                      <CardDescription>{selectedVerificationLevel.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Security Features:</Label>
                        <div className="space-y-1">
                          {selectedVerificationLevel.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Verification Cost:</span>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          ${selectedVerificationLevel.cost}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Quantum Resistant:</span>
                        <Badge
                          className={
                            selectedVerificationLevel.quantumResistant
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          }
                        >
                          {selectedVerificationLevel.quantumResistant ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {isVerifying && (
                    <Card className="bg-gradient-to-r from-blue-50 to-white border-blue-200">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                            <span className="font-medium">Verification in Progress...</span>
                          </div>
                          <Progress value={verificationProgress} className="h-2" />
                          <p className="text-sm text-muted-foreground">
                            Performing quantum-secure verification protocols
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={performVerification}
                  disabled={isVerifying || !contributionAmount || !selectedCharity}
                  className="flex-1"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Start Quantum Verification
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </div>

              {currentVerification && (
                <Card className="bg-gradient-to-r from-green-50 to-white border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Verification Complete
                    </CardTitle>
                    <CardDescription>Your contribution has been quantum-verified and recorded</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Verification ID:</span>
                          <span className="font-mono text-sm">{currentVerification.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Amount:</span>
                          <span className="font-medium">${currentVerification.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Charity:</span>
                          <span className="font-medium">{currentVerification.charity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Verification Score:</span>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {currentVerification.verificationScore}/100
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Block Number:</span>
                          <span className="font-mono text-sm">#{currentVerification.blockchainRecord.blockNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Confirmations:</span>
                          <span className="font-medium">{currentVerification.blockchainRecord.confirmations}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Quantum Algorithm:</span>
                          <span className="font-medium">{currentVerification.quantumSignature.algorithm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Expires:</span>
                          <span className="font-medium">
                            {new Date(currentVerification.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download Certificate
                      </Button>
                      <Button variant="outline" size="sm">
                        <QrCode className="h-3 w-3 mr-1" />
                        Generate QR Code
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View on Blockchain
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="space-y-4">
                {verificationHistory.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No verification history available</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Complete your first verification to see records here
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  verificationHistory.map((verification) => (
                    <Card key={verification.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">{verification.charity}</span>
                          </div>
                          <Badge
                            className={
                              verification.status === "verified"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            }
                          >
                            {verification.status.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Amount</p>
                            <p className="font-medium">${verification.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Verification Level</p>
                            <p className="font-medium capitalize">{verification.verificationLevel}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Score</p>
                            <p className="font-medium">{verification.verificationScore}/100</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p className="font-medium">{new Date(verification.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="keys" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-blue-600" />
                      Quantum Key Pair
                    </CardTitle>
                    <CardDescription>Your quantum-resistant cryptographic keys</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Public Key</Label>
                      <Textarea value={quantumKeyPair?.public || ""} readOnly className="font-mono text-xs" rows={3} />
                    </div>

                    <div className="space-y-2">
                      <Label>Private Key (Encrypted)</Label>
                      <Textarea
                        value={quantumKeyPair?.private.replace(/./g, "*") || ""}
                        readOnly
                        className="font-mono text-xs"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Regenerate Keys
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Export Keys
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-purple-600" />
                      Quantum Security Status
                    </CardTitle>
                    <CardDescription>Current quantum security configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Quantum Key Distribution:</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Post-Quantum Algorithms:</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Lattice-Based Encryption:</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Quantum Random Generator:</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Multi-Dimensional Blockchain:</span>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Quantum Realm</Badge>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Fingerprint className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Biometric Authentication</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          Fingerprint
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          Retinal Scan
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          Voice Pattern
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          DNA Sequence
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-indigo-600" />
                    Multi-Dimensional Blockchain Network
                  </CardTitle>
                  <CardDescription>Quantum-entangled blockchain across multiple dimensions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Primary Dimension</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>Network: Ethereum Mainnet</p>
                        <p>Blocks: 18,542,891</p>
                        <p>
                          Status: <span className="text-green-600">Synchronized</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Quantum Dimension</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>Network: Quantum Realm Chain</p>
                        <p>Blocks: ∞ (Superposition)</p>
                        <p>
                          Status: <span className="text-purple-600">Entangled</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Parallel Dimension</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>Network: Multiverse Sidechain</p>
                        <p>Blocks: 42,000,000</p>
                        <p>
                          Status: <span className="text-green-600">Mirrored</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
