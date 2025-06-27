"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, Eye, Plus, Download } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  status: "required" | "uploaded" | "verified" | "rejected"
  uploadDate?: string
  fileSize?: string
  rejectionReason?: string
  required: boolean
}

interface DocumentUploadManagerProps {
  applicationId: string
  onDocumentStatusChange?: (documentId: string, status: string) => void
}

export function DocumentUploadManager({ applicationId, onDocumentStatusChange }: DocumentUploadManagerProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc-1",
      name: "Proof of Income",
      type: "income",
      status: "verified",
      uploadDate: "2024-01-20",
      fileSize: "2.4 MB",
      required: true,
    },
    {
      id: "doc-2",
      name: "Bank Statements",
      type: "financial",
      status: "uploaded",
      uploadDate: "2024-01-22",
      fileSize: "1.8 MB",
      required: true,
    },
    {
      id: "doc-3",
      name: "Tax Returns (2023)",
      type: "tax",
      status: "required",
      required: true,
    },
    {
      id: "doc-4",
      name: "Tax Returns (2022)",
      type: "tax",
      status: "required",
      required: true,
    },
    {
      id: "doc-5",
      name: "Property Insurance",
      type: "insurance",
      status: "rejected",
      uploadDate: "2024-01-21",
      fileSize: "0.9 MB",
      rejectionReason: "Document expired. Please upload current policy.",
      required: true,
    },
    {
      id: "doc-6",
      name: "Employment Letter",
      type: "employment",
      status: "uploaded",
      uploadDate: "2024-01-23",
      fileSize: "0.5 MB",
      required: false,
    },
  ])

  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "uploaded":
        return <FileText className="h-4 w-4 text-blue-400" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <Upload className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-400 bg-green-500/20"
      case "uploaded":
        return "text-blue-400 bg-blue-500/20"
      case "rejected":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-yellow-400 bg-yellow-500/20"
    }
  }

  const handleFileUpload = async (documentId: string) => {
    setUploadProgress((prev) => ({ ...prev, [documentId]: 0 }))

    // Simulate file upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadProgress((prev) => ({ ...prev, [documentId]: i }))
    }

    // Update document status
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              status: "uploaded",
              uploadDate: new Date().toISOString().split("T")[0],
              fileSize: "1.2 MB",
            }
          : doc,
      ),
    )

    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[documentId]
      return newProgress
    })

    if (onDocumentStatusChange) {
      onDocumentStatusChange(documentId, "uploaded")
    }
  }

  const requiredDocs = documents.filter((doc) => doc.required)
  const completedRequired = requiredDocs.filter((doc) => doc.status === "verified").length
  const completionPercentage = (completedRequired / requiredDocs.length) * 100

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-200 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Collection Progress
          </CardTitle>
          <CardDescription className="text-blue-300">Application ID: {applicationId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-200">Required Documents Verified</span>
            <span className="text-blue-300">
              {completedRequired} of {requiredDocs.length}
            </span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-200">{Math.round(completionPercentage)}% Complete</span>
            <span className="text-blue-300">{requiredDocs.length - completedRequired} documents remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-200">Required Documents</CardTitle>
          <CardDescription className="text-blue-300">Upload and manage your loan application documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((document) => (
              <div
                key={document.id}
                className={`p-4 rounded-lg border transition-colors ${
                  document.status === "rejected"
                    ? "bg-gradient-to-br from-red-800/30 to-red-800/20 border-red-500/20"
                    : document.status === "verified"
                      ? "bg-gradient-to-br from-green-800/30 to-emerald-800/20 border-green-500/20"
                      : document.status === "uploaded"
                        ? "bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border-blue-500/20"
                        : "bg-gradient-to-br from-yellow-800/30 to-amber-800/20 border-yellow-500/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(document.status)}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{document.name}</h4>
                        {document.required && (
                          <Badge variant="outline" className="text-xs text-red-300 border-red-500/30">
                            Required
                          </Badge>
                        )}
                      </div>

                      {document.uploadDate && document.fileSize && (
                        <p className="text-xs text-blue-200">
                          Uploaded: {document.uploadDate} • {document.fileSize}
                        </p>
                      )}

                      {document.rejectionReason && (
                        <p className="text-xs text-red-300 mt-1">Rejection reason: {document.rejectionReason}</p>
                      )}

                      {uploadProgress[document.id] !== undefined && (
                        <div className="mt-2">
                          <Progress value={uploadProgress[document.id]} className="h-2" />
                          <p className="text-xs text-blue-300 mt-1">Uploading... {uploadProgress[document.id]}%</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(document.status)}>{document.status.toUpperCase()}</Badge>

                    <div className="flex items-center gap-1">
                      {document.status === "uploaded" || document.status === "verified" ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleFileUpload(document.id)}
                          disabled={uploadProgress[document.id] !== undefined}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      )}

                      {document.status === "rejected" && (
                        <Button
                          size="sm"
                          onClick={() => handleFileUpload(document.id)}
                          disabled={uploadProgress[document.id] !== undefined}
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Re-upload
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-blue-500/20">
            <Button
              variant="outline"
              className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Additional Document
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-200">Quick Actions</CardTitle>
          <CardDescription className="text-blue-300">Common document management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
            <Button
              variant="outline"
              className="border-green-500/30 text-green-300 hover:bg-green-500/20 bg-transparent"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Request Review
            </Button>
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20 bg-transparent"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Get Help
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
