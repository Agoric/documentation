"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, CheckCircle, Clock, AlertTriangle, Globe } from "lucide-react"

interface LegalDocument {
  id: string
  title: string
  type: "agreement" | "treaty" | "regulation" | "policy"
  jurisdiction: string[]
  content: string
  hash: string
  timestamp: number
  signatures: DigitalSignature[]
  version: number
  status: "draft" | "active" | "superseded" | "revoked"
}

interface DigitalSignature {
  signerId: string
  signerName: string
  signerRole: string
  timestamp: number
  signature: string
  publicKey: string
  verified: boolean
}

export default function BlockchainLegalRegistry() {
  const [documents, setDocuments] = useState<LegalDocument[]>([])
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null)
  const [newDocument, setNewDocument] = useState({
    title: "",
    type: "agreement" as const,
    jurisdiction: "",
    content: "",
  })
  const [loading, setLoading] = useState(false)
  const [verificationResults, setVerificationResults] = useState<Record<string, boolean>>({})

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    setLoading(true)
    try {
      // Simulate loading documents
      const mockDocuments: LegalDocument[] = [
        {
          id: "doc_1",
          title: "International Data Privacy Agreement",
          type: "agreement",
          jurisdiction: ["USA", "EU", "UK"],
          content: "This agreement establishes data privacy standards...",
          hash: "a1b2c3d4e5f6...",
          timestamp: Date.now() - 86400000,
          signatures: [
            {
              signerId: "user_1",
              signerName: "John Smith",
              signerRole: "Legal Director",
              timestamp: Date.now() - 3600000,
              signature: "sig_123...",
              publicKey: "pub_456...",
              verified: true,
            },
          ],
          version: 1,
          status: "active",
        },
        {
          id: "doc_2",
          title: "Cross-Border Financial Regulation",
          type: "regulation",
          jurisdiction: ["USA", "Canada", "Mexico"],
          content: "This regulation governs cross-border financial transactions...",
          hash: "b2c3d4e5f6g7...",
          timestamp: Date.now() - 172800000,
          signatures: [],
          version: 1,
          status: "draft",
        },
      ]
      setDocuments(mockDocuments)
    } catch (error) {
      console.error("Error loading documents:", error)
    } finally {
      setLoading(false)
    }
  }

  const storeDocument = async () => {
    if (!newDocument.title || !newDocument.content) return

    setLoading(true)
    try {
      const response = await fetch("/api/compliance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "store_document",
          document: {
            ...newDocument,
            jurisdiction: newDocument.jurisdiction.split(",").map((j) => j.trim()),
            status: "draft",
          },
        }),
      })

      if (response.ok) {
        const { documentId } = await response.json()
        await loadDocuments()
        setNewDocument({ title: "", type: "agreement", jurisdiction: "", content: "" })
      }
    } catch (error) {
      console.error("Error storing document:", error)
    } finally {
      setLoading(false)
    }
  }

  const verifyDocument = async (documentId: string) => {
    try {
      const response = await fetch(`/api/compliance?action=verify&documentId=${documentId}`)
      const { isValid } = await response.json()
      setVerificationResults((prev) => ({ ...prev, [documentId]: isValid }))
    } catch (error) {
      console.error("Error verifying document:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "draft":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "revoked":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "agreement":
        return "bg-blue-100 text-blue-800"
      case "treaty":
        return "bg-purple-100 text-purple-800"
      case "regulation":
        return "bg-green-100 text-green-800"
      case "policy":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Blockchain Legal Registry</h2>
      </div>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="create">Create Document</TabsTrigger>
          <TabsTrigger value="verify">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {documents.map((doc) => (
              <Card
                key={doc.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedDocument(doc)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      <Badge className={getTypeColor(doc.type)}>{doc.type}</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Globe className="h-4 w-4" />
                      <span>{doc.jurisdiction.join(", ")}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Hash: {doc.hash.substring(0, 16)}...</span>
                    <span>{doc.signatures.length} signatures</span>
                    <span>v{doc.version}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Legal Document</CardTitle>
              <CardDescription>Store a new legal document on the blockchain registry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input
                    id="title"
                    value={newDocument.title}
                    onChange={(e) => setNewDocument((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter document title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select
                    value={newDocument.type}
                    onValueChange={(value: any) => setNewDocument((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agreement">Agreement</SelectItem>
                      <SelectItem value="treaty">Treaty</SelectItem>
                      <SelectItem value="regulation">Regulation</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jurisdiction">Jurisdictions (comma-separated)</Label>
                <Input
                  id="jurisdiction"
                  value={newDocument.jurisdiction}
                  onChange={(e) => setNewDocument((prev) => ({ ...prev, jurisdiction: e.target.value }))}
                  placeholder="USA, EU, UK"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Document Content</Label>
                <Textarea
                  id="content"
                  value={newDocument.content}
                  onChange={(e) => setNewDocument((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter the legal document content..."
                  rows={8}
                />
              </div>
              <Button onClick={storeDocument} disabled={loading} className="w-full">
                {loading ? "Storing..." : "Store on Blockchain"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
              <CardDescription>Verify document integrity using blockchain hashes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{doc.title}</h4>
                      <p className="text-sm text-gray-600">Hash: {doc.hash.substring(0, 32)}...</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {verificationResults[doc.id] !== undefined && (
                        <Badge variant={verificationResults[doc.id] ? "default" : "destructive"}>
                          {verificationResults[doc.id] ? "Verified" : "Invalid"}
                        </Badge>
                      )}
                      <Button variant="outline" size="sm" onClick={() => verifyDocument(doc.id)}>
                        Verify
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedDocument && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedDocument.title}</CardTitle>
            <CardDescription>Document Details and Signatures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Type:</strong> {selectedDocument.type}
              </div>
              <div>
                <strong>Status:</strong> {selectedDocument.status}
              </div>
              <div>
                <strong>Version:</strong> {selectedDocument.version}
              </div>
              <div>
                <strong>Jurisdictions:</strong> {selectedDocument.jurisdiction.join(", ")}
              </div>
            </div>
            <div>
              <strong>Content:</strong>
              <p className="mt-2 p-3 bg-gray-50 rounded text-sm">{selectedDocument.content}</p>
            </div>
            {selectedDocument.signatures.length > 0 && (
              <div>
                <strong>Digital Signatures:</strong>
                <div className="mt-2 space-y-2">
                  {selectedDocument.signatures.map((sig, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{sig.signerName}</p>
                          <p className="text-sm text-gray-600">{sig.signerRole}</p>
                        </div>
                        <Badge variant={sig.verified ? "default" : "destructive"}>
                          {sig.verified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Signed: {new Date(sig.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
