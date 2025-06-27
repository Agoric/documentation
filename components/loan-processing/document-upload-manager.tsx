"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Download, Eye, Trash2, RefreshCw, Plus } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface Document {
  id: string
  name: string
  type: string
  size: number
  status: "pending" | "uploaded" | "verified" | "rejected"
  uploadDate?: string
  rejectionReason?: string
  required: boolean
  category: string
}

interface DocumentUploadManagerProps {
  applicationId: string
  onDocumentUpdate?: (documents: Document[]) => void
}

export function DocumentUploadManager({ applicationId, onDocumentUpdate }: DocumentUploadManagerProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc-1",
      name: "Pay Stub - January 2024",
      type: "application/pdf",
      size: 245760,
      status: "verified",
      uploadDate: "2024-01-15",
      required: true,
      category: "Income Verification",
    },
    {
      id: "doc-2",
      name: "Pay Stub - December 2023",
      type: "application/pdf",
      size: 238940,
      status: "verified",
      uploadDate: "2024-01-15",
      required: true,
      category: "Income Verification",
    },
    {
      id: "doc-3",
      name: "Tax Return 2023",
      type: "application/pdf",
      size: 1024000,
      status: "uploaded",
      uploadDate: "2024-01-16",
      required: true,
      category: "Income Verification",
    },
    {
      id: "doc-4",
      name: "Bank Statement - January",
      type: "application/pdf",
      size: 512000,
      status: "rejected",
      uploadDate: "2024-01-14",
      rejectionReason: "Statement is incomplete - missing page 2",
      required: true,
      category: "Asset Verification",
    },
    {
      id: "doc-5",
      name: "Employment Letter",
      type: "application/pdf",
      size: 0,
      status: "pending",
      required: true,
      category: "Income Verification",
    },
    {
      id: "doc-6",
      name: "Insurance Policy",
      type: "application/pdf",
      size: 0,
      status: "pending",
      required: false,
      category: "Property Documentation",
    },
  ])

  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsUploading(true)
      setUploadProgress(0)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)

            // Add uploaded files to documents
            const newDocuments = acceptedFiles.map((file, index) => ({
              id: `doc-${Date.now()}-${index}`,
              name: file.name,
              type: file.type,
              size: file.size,
              status: "uploaded" as const,
              uploadDate: new Date().toISOString().split("T")[0],
              required: false,
              category: "Additional Documents",
            }))

            setDocuments((prev) => [...prev, ...newDocuments])
            onDocumentUpdate?.(documents)
            return 0
          }
          return prev + 10
        })
      }, 200)
    },
    [documents, onDocumentUpdate],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: true,
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "uploaded":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "uploaded":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const requiredDocuments = documents.filter((doc) => doc.required)
  const optionalDocuments = documents.filter((doc) => !doc.required)
  const completedRequired = requiredDocuments.filter((doc) => doc.status === "verified").length
  const totalRequired = requiredDocuments.length
  const completionPercentage = (completedRequired / totalRequired) * 100

  const documentsByCategory = documents.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = []
      }
      acc[doc.category].push(doc)
      return acc
    },
    {} as Record<string, Document[]>,
  )

  const handleReupload = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, status: "uploaded" as const, rejectionReason: undefined } : doc)),
    )
  }

  const handleDelete = (docId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId))
  }

  return (
    <div className="space-y-6">
      {/* Upload Progress */}
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Document Upload Manager
          </CardTitle>
          <CardDescription>Application ID: {applicationId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Required Documents Progress</span>
              <span>
                {completedRequired} of {totalRequired} verified
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Documents</p>
              <p className="text-lg font-semibold">{documents.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-lg font-semibold text-green-400">
                {documents.filter((d) => d.status === "verified").length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-lg font-semibold text-blue-400">
                {documents.filter((d) => d.status === "uploaded").length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Need Attention</p>
              <p className="text-lg font-semibold text-red-400">
                {documents.filter((d) => d.status === "rejected" || d.status === "pending").length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Drag and drop files here or click to browse. Accepted formats: PDF, DOC, DOCX, PNG, JPG
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-600 hover:border-gray-500"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-blue-400">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg mb-2">Drop files here to upload</p>
                <p className="text-sm text-muted-foreground">
                  or <span className="text-blue-400">click to browse</span>
                </p>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">Uploading documents...</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents by Category */}
      {Object.entries(documentsByCategory).map(([category, categoryDocs]) => (
        <Card key={category} className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{category}</span>
              <Badge variant="outline">
                {categoryDocs.filter((d) => d.status === "verified").length} / {categoryDocs.length} verified
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryDocs.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">{getStatusIcon(document.status)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{document.name}</h4>
                        {document.required && (
                          <Badge variant="outline" className="text-xs">
                            Required
                          </Badge>
                        )}
                        <Badge className={`${getStatusColor(document.status)} text-xs`}>{document.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {document.size > 0 && <span>{formatFileSize(document.size)}</span>}
                        {document.uploadDate && (
                          <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      {document.rejectionReason && (
                        <p className="text-xs text-red-400 mt-1">Rejection reason: {document.rejectionReason}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {document.status === "pending" ? (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    ) : (
                      <>
                        {document.status !== "pending" && (
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        {document.status === "rejected" && (
                          <Button
                            size="sm"
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={() => handleReupload(document.id)}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Re-upload
                          </Button>
                        )}
                        {!document.required && (
                          <Button size="sm" variant="outline" onClick={() => handleDelete(document.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Bulk Actions */}
      <Card className="bg-black/20 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Bulk Actions</div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" />
                Download All
              </Button>
              <Button size="sm" variant="outline">
                <RefreshCw className="h-3 w-3 mr-1" />
                Request Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
