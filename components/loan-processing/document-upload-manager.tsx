"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDropzone } from "react-dropzone"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Download,
  Eye,
  RefreshCw,
  Clock,
  Shield,
  DollarSign,
  Home,
  CreditCard,
} from "lucide-react"

interface DocumentUploadManagerProps {
  applicationId: string
}

interface Document {
  id: string
  name: string
  category: string
  status: "pending" | "uploaded" | "verified" | "rejected"
  uploadDate?: string
  size?: string
  type?: string
  rejectionReason?: string
  required: boolean
}

export function DocumentUploadManager({ applicationId }: DocumentUploadManagerProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Pay Stub - December 2023",
      category: "income",
      status: "verified",
      uploadDate: "2024-01-20",
      size: "245 KB",
      type: "PDF",
      required: true,
    },
    {
      id: "2",
      name: "Pay Stub - January 2024",
      category: "income",
      status: "verified",
      uploadDate: "2024-01-20",
      size: "238 KB",
      type: "PDF",
      required: true,
    },
    {
      id: "3",
      name: "Tax Return 2023",
      category: "income",
      status: "uploaded",
      uploadDate: "2024-01-21",
      size: "1.2 MB",
      type: "PDF",
      required: true,
    },
    {
      id: "4",
      name: "Tax Return 2022",
      category: "income",
      status: "pending",
      required: true,
    },
    {
      id: "5",
      name: "Bank Statement - December",
      category: "assets",
      status: "verified",
      uploadDate: "2024-01-20",
      size: "892 KB",
      type: "PDF",
      required: true,
    },
    {
      id: "6",
      name: "Bank Statement - January",
      category: "assets",
      status: "rejected",
      uploadDate: "2024-01-21",
      size: "756 KB",
      type: "PDF",
      rejectionReason: "Statement is incomplete - missing last page",
      required: true,
    },
    {
      id: "7",
      name: "Investment Account Statement",
      category: "assets",
      status: "pending",
      required: false,
    },
    {
      id: "8",
      name: "Property Purchase Agreement",
      category: "property",
      status: "uploaded",
      uploadDate: "2024-01-22",
      size: "2.1 MB",
      type: "PDF",
      required: true,
    },
    {
      id: "9",
      name: "Property Inspection Report",
      category: "property",
      status: "pending",
      required: true,
    },
    {
      id: "10",
      name: "Driver's License",
      category: "identification",
      status: "verified",
      uploadDate: "2024-01-20",
      size: "156 KB",
      type: "JPG",
      required: true,
    },
  ])

  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const documentCategories = [
    {
      id: "income",
      name: "Income Verification",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      description: "Pay stubs, tax returns, employment verification",
    },
    {
      id: "assets",
      name: "Asset Documentation",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
      description: "Bank statements, investment accounts, savings",
    },
    {
      id: "property",
      name: "Property Information",
      icon: Home,
      color: "from-purple-500 to-pink-500",
      description: "Purchase agreement, appraisal, inspection reports",
    },
    {
      id: "identification",
      name: "Identification",
      icon: CreditCard,
      color: "from-orange-500 to-red-500",
      description: "Driver's license, passport, social security card",
    },
  ]

  const onDrop = useCallback((acceptedFiles: File[], category: string) => {
    acceptedFiles.forEach((file) => {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        category,
        status: "uploaded",
        uploadDate: new Date().toISOString().split("T")[0],
        size: `${(file.size / 1024).toFixed(0)} KB`,
        type: file.name.split(".").pop()?.toUpperCase() || "FILE",
        required: false,
      }

      // Simulate upload progress
      setUploadProgress((prev) => ({ ...prev, [newDoc.id]: 0 }))

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const currentProgress = prev[newDoc.id] || 0
          if (currentProgress >= 100) {
            clearInterval(interval)
            setDocuments((prevDocs) => [...prevDocs, newDoc])
            return { ...prev, [newDoc.id]: 100 }
          }
          return { ...prev, [newDoc.id]: currentProgress + 10 }
        })
      }, 200)
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "uploaded":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "pending":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4" />
      case "uploaded":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      case "pending":
        return <Upload className="h-4 w-4" />
      default:
        return <Upload className="h-4 w-4" />
    }
  }

  const handleDeleteDocument = (docId: string) => {
    setDocuments((docs) => docs.filter((doc) => doc.id !== docId))
  }

  const handleReuploadDocument = (docId: string) => {
    setDocuments((docs) =>
      docs.map((doc) => (doc.id === docId ? { ...doc, status: "uploaded", rejectionReason: undefined } : doc)),
    )
  }

  const getCompletionStats = () => {
    const total = documents.length
    const verified = documents.filter((doc) => doc.status === "verified").length
    const uploaded = documents.filter((doc) => doc.status === "uploaded").length
    const pending = documents.filter((doc) => doc.status === "pending").length
    const rejected = documents.filter((doc) => doc.status === "rejected").length

    return { total, verified, uploaded, pending, rejected }
  }

  const stats = getCompletionStats()

  return (
    <div className="space-y-6">
      {/* Document Overview */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Document Upload Center
          </CardTitle>
          <CardDescription className="text-blue-200">Upload and manage your loan application documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.verified}</div>
              <div className="text-sm text-green-300">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.uploaded}</div>
              <div className="text-sm text-blue-300">Under Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.pending}</div>
              <div className="text-sm text-orange-300">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
              <div className="text-sm text-red-300">Rejected</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">Overall Progress</span>
              <span className="text-white font-medium">
                {Math.round(((stats.verified + stats.uploaded) / stats.total) * 100)}% Complete
              </span>
            </div>
            <Progress value={((stats.verified + stats.uploaded) / stats.total) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="by-category" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="all-documents">All Documents</TabsTrigger>
          <TabsTrigger value="upload-center">Upload Center</TabsTrigger>
        </TabsList>

        <TabsContent value="by-category" className="space-y-6">
          {documentCategories.map((category) => {
            const categoryDocs = documents.filter((doc) => doc.category === category.id)
            const CategoryIcon = category.icon

            return (
              <Card
                key={category.id}
                className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
              >
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                      <CategoryIcon className="h-5 w-5 text-white" />
                    </div>
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-blue-200">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg border border-blue-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-400" />
                        <div>
                          <h4 className="font-medium text-white">{doc.name}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            {doc.uploadDate && <span className="text-blue-300">Uploaded: {doc.uploadDate}</span>}
                            {doc.size && <span className="text-blue-300">• {doc.size}</span>}
                            {doc.type && <span className="text-blue-300">• {doc.type}</span>}
                            {doc.required && (
                              <Badge variant="outline" className="text-xs border-orange-500/30 text-orange-400">
                                Required
                              </Badge>
                            )}
                          </div>
                          {doc.rejectionReason && (
                            <p className="text-sm text-red-400 mt-1">Rejection reason: {doc.rejectionReason}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {getStatusIcon(doc.status)}
                          <span className="ml-1 capitalize">{doc.status}</span>
                        </Badge>

                        <div className="flex gap-1">
                          {doc.status === "uploaded" || doc.status === "verified" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-500/30 text-blue-300 bg-transparent"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-500/30 text-blue-300 bg-transparent"
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            </>
                          ) : null}

                          {doc.status === "rejected" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-500/30 text-green-300 bg-transparent"
                              onClick={() => handleReuploadDocument(doc.id)}
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          )}

                          {doc.status !== "verified" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-500/30 text-red-300 bg-transparent"
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Upload progress for this category */}
                  {Object.entries(uploadProgress).map(([docId, progress]) => {
                    const uploadingDoc = documents.find((d) => d.id === docId && d.category === category.id)
                    if (!uploadingDoc && progress < 100) {
                      return (
                        <div key={docId} className="p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                          <div className="flex items-center gap-3 mb-2">
                            <Upload className="h-5 w-5 text-blue-400" />
                            <span className="text-white">Uploading document...</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <p className="text-sm text-blue-300 mt-1">{progress}% complete</p>
                        </div>
                      )
                    }
                    return null
                  })}

                  {/* Upload dropzone for this category */}
                  <DropzoneArea category={category.id} onDrop={onDrop} />
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="all-documents" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">All Documents</h3>
            <div className="flex gap-2">
              <Button variant="outline" className="border-blue-500/30 text-blue-300 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
              <Button variant="outline" className="border-blue-500/30 text-blue-300 bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Request Review
              </Button>
            </div>
          </div>

          {documents.map((doc) => {
            const category = documentCategories.find((cat) => cat.id === doc.category)
            const CategoryIcon = category?.icon || FileText

            return (
              <Card
                key={doc.id}
                className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="h-5 w-5 text-blue-400" />
                      <div>
                        <h4 className="font-medium text-white">{doc.name}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-blue-300 capitalize">{category?.name}</span>
                          {doc.uploadDate && <span className="text-blue-300">• {doc.uploadDate}</span>}
                          {doc.size && <span className="text-blue-300">• {doc.size}</span>}
                          {doc.required && (
                            <Badge variant="outline" className="text-xs border-orange-500/30 text-orange-400">
                              Required
                            </Badge>
                          )}
                        </div>
                        {doc.rejectionReason && (
                          <p className="text-sm text-red-400 mt-1">Rejection reason: {doc.rejectionReason}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(doc.status)}>
                        {getStatusIcon(doc.status)}
                        <span className="ml-1 capitalize">{doc.status}</span>
                      </Badge>

                      <div className="flex gap-1">
                        {doc.status === "uploaded" || doc.status === "verified" ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-500/30 text-blue-300 bg-transparent"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-500/30 text-blue-300 bg-transparent"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </>
                        ) : null}

                        {doc.status === "rejected" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500/30 text-green-300 bg-transparent"
                            onClick={() => handleReuploadDocument(doc.id)}
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        )}

                        {doc.status !== "verified" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-300 bg-transparent"
                            onClick={() => handleDeleteDocument(doc.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="upload-center" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-400" />
                Bulk Document Upload
              </CardTitle>
              <CardDescription className="text-blue-200">Upload multiple documents at once</CardDescription>
            </CardHeader>
            <CardContent>
              <DropzoneArea category="general" onDrop={onDrop} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Dropzone component for file uploads
interface DropzoneAreaProps {
  category: string
  onDrop: (files: File[], category: string) => void
}

function DropzoneArea({ category, onDrop }: DropzoneAreaProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, category),
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: true,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-blue-400 bg-blue-500/10"
          : "border-blue-500/30 hover:border-blue-400/50 hover:bg-blue-500/5"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="h-8 w-8 text-blue-400 mx-auto mb-2" />
      {isDragActive ? (
        <p className="text-blue-300">Drop the files here...</p>
      ) : (
        <div className="space-y-2">
          <p className="text-blue-300">Drag & drop files here, or click to select</p>
          <p className="text-sm text-blue-400">Supports PDF, JPG, PNG, DOC, DOCX (max 10MB each)</p>
        </div>
      )}
    </div>
  )
}
