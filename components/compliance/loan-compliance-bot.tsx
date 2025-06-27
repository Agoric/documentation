"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Send,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Download,
  Zap,
  Brain,
  Scale,
  Building2,
  TrendingUp,
  Eye,
  Settings,
  RefreshCw,
  Activity,
  BarChart3,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  category?: "compliance" | "regulation" | "risk" | "documentation"
  confidence?: number
  actions?: Array<{
    label: string
    action: () => void
    variant?: "default" | "outline" | "destructive"
  }>
}

interface ComplianceCheck {
  id: string
  regulation: string
  status: "compliant" | "non-compliant" | "warning" | "pending"
  description: string
  lastChecked: Date
  nextReview: Date
  riskLevel: "low" | "medium" | "high" | "critical"
}

export function LoanComplianceBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your Loan Compliance Assistant. I can help you with regulatory compliance, risk assessment, documentation review, and institutional lending requirements. How can I assist you today?",
      timestamp: new Date(),
      category: "compliance",
      confidence: 100,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const complianceChecks: ComplianceCheck[] = [
    {
      id: "1",
      regulation: "Dodd-Frank Act",
      status: "compliant",
      description: "Qualified Mortgage (QM) requirements met",
      lastChecked: new Date(Date.now() - 2 * 60 * 60 * 1000),
      nextReview: new Date(Date.now() + 22 * 60 * 60 * 1000),
      riskLevel: "low",
    },
    {
      id: "2",
      regulation: "TRID (TILA-RESPA)",
      status: "compliant",
      description: "Loan Estimate and Closing Disclosure timing compliant",
      lastChecked: new Date(Date.now() - 4 * 60 * 60 * 1000),
      nextReview: new Date(Date.now() + 20 * 60 * 60 * 1000),
      riskLevel: "low",
    },
    {
      id: "3",
      regulation: "Fair Lending (ECOA)",
      status: "warning",
      description: "Disparate impact analysis requires review",
      lastChecked: new Date(Date.now() - 6 * 60 * 60 * 1000),
      nextReview: new Date(Date.now() + 18 * 60 * 60 * 1000),
      riskLevel: "medium",
    },
    {
      id: "4",
      regulation: "CRA Compliance",
      status: "compliant",
      description: "Community Reinvestment Act requirements satisfied",
      lastChecked: new Date(Date.now() - 1 * 60 * 60 * 1000),
      nextReview: new Date(Date.now() + 23 * 60 * 60 * 1000),
      riskLevel: "low",
    },
    {
      id: "5",
      regulation: "BSA/AML",
      status: "pending",
      description: "Customer Due Diligence (CDD) verification in progress",
      lastChecked: new Date(Date.now() - 30 * 60 * 60 * 1000),
      nextReview: new Date(Date.now() + 30 * 60 * 60 * 1000),
      riskLevel: "high",
    },
    {
      id: "6",
      regulation: "HMDA Reporting",
      status: "compliant",
      description: "Home Mortgage Disclosure Act data collection current",
      lastChecked: new Date(Date.now() - 3 * 60 * 60 * 1000),
      nextReview: new Date(Date.now() + 21 * 60 * 60 * 1000),
      riskLevel: "low",
    },
  ]

  const quickActions = [
    {
      label: "Check Loan Compliance",
      action: () => handleQuickAction("compliance-check"),
      icon: Shield,
      color: "bg-green-500",
    },
    {
      label: "Risk Assessment",
      action: () => handleQuickAction("risk-assessment"),
      icon: AlertTriangle,
      color: "bg-yellow-500",
    },
    {
      label: "Document Review",
      action: () => handleQuickAction("document-review"),
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Regulatory Update",
      action: () => handleQuickAction("regulatory-update"),
      icon: Scale,
      color: "bg-purple-500",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      "compliance-check": "Please run a comprehensive compliance check for all active loan applications.",
      "risk-assessment": "I need a risk assessment for our current loan portfolio.",
      "document-review": "Can you review the documentation requirements for institutional loans?",
      "regulatory-update": "What are the latest regulatory updates affecting institutional lending?",
    }

    const message = actionMessages[action as keyof typeof actionMessages]
    if (message) {
      handleSendMessage(message)
    }
  }

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim()
    if (!content) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(content)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()

    if (input.includes("compliance") || input.includes("check")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "I've initiated a comprehensive compliance check. Based on current regulations, I found 4 compliant items, 1 warning, and 1 pending review. The Fair Lending analysis shows potential disparate impact that requires attention. BSA/AML verification is still in progress. Would you like me to generate a detailed compliance report?",
        timestamp: new Date(),
        category: "compliance",
        confidence: 95,
        actions: [
          {
            label: "Generate Report",
            action: () => console.log("Generating compliance report"),
            variant: "default",
          },
          {
            label: "View Details",
            action: () => setActiveTab("monitoring"),
            variant: "outline",
          },
        ],
      }
    }

    if (input.includes("risk") || input.includes("assessment")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Risk assessment completed. Current portfolio shows: Low risk (67%), Medium risk (28%), High risk (5%). Key concerns: 1) Concentration risk in tech sector loans, 2) Geographic concentration in California, 3) Pending BSA/AML verification for 3 large loans. Overall risk score: 7.2/10 (Acceptable). Recommend diversification and expedited AML completion.",
        timestamp: new Date(),
        category: "risk",
        confidence: 92,
        actions: [
          {
            label: "Detailed Analysis",
            action: () => console.log("Opening detailed risk analysis"),
            variant: "default",
          },
          {
            label: "Mitigation Plan",
            action: () => console.log("Creating mitigation plan"),
            variant: "outline",
          },
        ],
      }
    }

    if (input.includes("document") || input.includes("review")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Document review requirements for institutional loans: 1) Loan Application (complete), 2) Financial Statements (audited, last 3 years), 3) Credit Reports (institutional grade), 4) Collateral Appraisals (certified), 5) Legal Opinions, 6) Environmental Reports (if applicable), 7) Insurance Certificates, 8) Compliance Certifications. All documents must be digitally signed and stored in our secure vault.",
        timestamp: new Date(),
        category: "documentation",
        confidence: 98,
        actions: [
          {
            label: "Document Checklist",
            action: () => console.log("Opening document checklist"),
            variant: "default",
          },
          {
            label: "Upload Documents",
            action: () => console.log("Opening document upload"),
            variant: "outline",
          },
        ],
      }
    }

    if (input.includes("regulatory") || input.includes("update")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Latest regulatory updates (Last 30 days): 1) CFPB issued new guidance on digital lending platforms, 2) Federal Reserve updated stress testing requirements for large institutions, 3) OCC clarified cryptocurrency collateral guidelines, 4) FDIC enhanced CRA examination procedures, 5) Treasury updated BSA/AML requirements for institutional loans >$10M. All updates have been integrated into our compliance monitoring system.",
        timestamp: new Date(),
        category: "regulation",
        confidence: 96,
        actions: [
          {
            label: "Full Update Report",
            action: () => console.log("Opening regulatory update report"),
            variant: "default",
          },
          {
            label: "Impact Analysis",
            action: () => console.log("Analyzing regulatory impact"),
            variant: "outline",
          },
        ],
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "bot",
      content:
        "I can help you with loan compliance, risk assessment, documentation review, and regulatory updates. Please specify what type of assistance you need, or use one of the quick action buttons above.",
      timestamp: new Date(),
      category: "compliance",
      confidence: 85,
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-500/20 text-green-700 border-green-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
      case "non-compliant":
        return "bg-red-500/20 text-red-700 border-red-500/30"
      case "pending":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "non-compliant":
        return <AlertTriangle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-orange-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Bot className="h-6 w-6" />
            </div>
            Loan Compliance Bot
            <Badge className="bg-white/20 text-white border-white/30">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Institutional lending compliance assistant with real-time regulatory monitoring
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">AI Assistant</TabsTrigger>
          <TabsTrigger value="monitoring">Compliance Monitor</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    Compliance Assistant
                  </CardTitle>
                  <CardDescription>Ask questions about loan compliance and regulations</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 border border-gray-200"
                            }`}
                          >
                            <div className="text-sm">{message.content}</div>
                            {message.type === "bot" && (
                              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                {message.category && (
                                  <Badge variant="outline" className="text-xs">
                                    {message.category}
                                  </Badge>
                                )}
                                {message.confidence && (
                                  <span className="flex items-center gap-1">
                                    <Brain className="h-3 w-3" />
                                    {message.confidence}%
                                  </span>
                                )}
                              </div>
                            )}
                            {message.actions && (
                              <div className="mt-3 flex gap-2">
                                {message.actions.map((action, index) => (
                                  <Button
                                    key={index}
                                    size="sm"
                                    variant={action.variant || "default"}
                                    onClick={action.action}
                                    className="text-xs"
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                              </div>
                              <span className="text-sm text-gray-500">Analyzing...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </ScrollArea>

                  <div className="mt-4 flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about compliance, regulations, or risk assessment..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={action.action}
                      className="w-full justify-start h-auto p-3 bg-transparent"
                    >
                      <div className={`p-2 rounded ${action.color} mr-3`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Compliance Engine</span>
                    <Badge className="bg-green-500/20 text-green-700">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Regulatory Database</span>
                    <Badge className="bg-green-500/20 text-green-700">Updated</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk Calculator</span>
                    <Badge className="bg-green-500/20 text-green-700">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Document Scanner</span>
                    <Badge className="bg-yellow-500/20 text-yellow-700">Processing</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Compliance Overview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Compliance Monitoring
                  </CardTitle>
                  <CardDescription>Real-time regulatory compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceChecks.map((check) => (
                      <div
                        key={check.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(check.status)}
                            <Badge className={getStatusColor(check.status)}>{check.status}</Badge>
                          </div>
                          <div>
                            <h4 className="font-medium">{check.regulation}</h4>
                            <p className="text-sm text-gray-600">{check.description}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                              <span>Last checked: {check.lastChecked.toLocaleTimeString()}</span>
                              <span>Next review: {check.nextReview.toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getRiskColor(check.riskLevel)}`}>
                            {check.riskLevel.toUpperCase()} RISK
                          </div>
                          <div className="flex gap-1 mt-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compliance Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Compliance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">83%</div>
                    <div className="text-sm text-gray-600">Overall Compliance Score</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Compliant</span>
                      <span className="text-sm font-medium text-green-600">4 items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Warnings</span>
                      <span className="text-sm font-medium text-yellow-600">1 item</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending</span>
                      <span className="text-sm font-medium text-blue-600">1 item</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Non-Compliant</span>
                      <span className="text-sm font-medium text-red-600">0 items</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Priority Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="font-medium text-yellow-800">Fair Lending Review</div>
                    <div className="text-sm text-yellow-600">Disparate impact analysis needed</div>
                    <Button size="sm" className="mt-2 bg-yellow-600 hover:bg-yellow-700">
                      Review Now
                    </Button>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-medium text-blue-800">BSA/AML Verification</div>
                    <div className="text-sm text-blue-600">Customer due diligence pending</div>
                    <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                      Complete CDD
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Compliance Reports
              </CardTitle>
              <CardDescription>Generate and download compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Daily Compliance Report",
                    description: "24-hour compliance status summary",
                    icon: Clock,
                    color: "bg-blue-500",
                  },
                  {
                    title: "Regulatory Update Report",
                    description: "Latest regulatory changes and impacts",
                    icon: Scale,
                    color: "bg-purple-500",
                  },
                  {
                    title: "Risk Assessment Report",
                    description: "Comprehensive portfolio risk analysis",
                    icon: AlertTriangle,
                    color: "bg-yellow-500",
                  },
                  {
                    title: "Audit Trail Report",
                    description: "Complete compliance audit history",
                    icon: Search,
                    color: "bg-green-500",
                  },
                  {
                    title: "Exception Report",
                    description: "Non-compliant items and remediation",
                    icon: AlertTriangle,
                    color: "bg-red-500",
                  },
                  {
                    title: "Executive Summary",
                    description: "High-level compliance overview",
                    icon: TrendingUp,
                    color: "bg-indigo-500",
                  },
                ].map((report, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded ${report.color}`}>
                          <report.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{report.title}</h4>
                          <p className="text-xs text-gray-600">{report.description}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="h-3 w-3 mr-2" />
                        Generate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Bot Configuration
                </CardTitle>
                <CardDescription>Configure compliance bot settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Response Confidence Threshold</label>
                  <Input type="number" placeholder="85" />
                  <p className="text-xs text-gray-600">Minimum confidence level for automated responses</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Compliance Check Frequency</label>
                  <select className="w-full p-2 border rounded">
                    <option>Every 15 minutes</option>
                    <option>Every 30 minutes</option>
                    <option>Every hour</option>
                    <option>Every 4 hours</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alert Notifications</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Email alerts for critical issues</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">SMS alerts for urgent compliance matters</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Daily compliance summary</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Institutional Settings
                </CardTitle>
                <CardDescription>Configure settings for institutional lending compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Institution Type</label>
                  <select className="w-full p-2 border rounded">
                    <option>Commercial Bank</option>
                    <option>Credit Union</option>
                    <option>Investment Bank</option>
                    <option>Non-Bank Lender</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Regulatory Jurisdiction</label>
                  <select className="w-full p-2 border rounded">
                    <option>Federal (US)</option>
                    <option>State-Specific</option>
                    <option>International</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loan Volume Threshold</label>
                  <Input type="number" placeholder="10000000" />
                  <p className="text-xs text-gray-600">Minimum loan amount for enhanced compliance checks</p>
                </div>
                <Button className="w-full">Save Configuration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
