"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useAIAgentAutomation } from "@/contexts/ai-agent-automation-context"
import {
  Bot,
  Zap,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Mail,
  Scale,
  TrendingUp,
  Search,
  Settings,
  Play,
  Pause,
  ThumbsUp,
  ThumbsDown,
  Brain,
  Target,
} from "lucide-react"

export function SupremeAIAgentDashboard() {
  const {
    activeTasks,
    completedTasks,
    pendingConfirmations,
    isAgentActive,
    agentCapabilities,
    automationLevel,
    citizenMemory,
    executeTask,
    confirmTask,
    cancelTask,
    prepareTaxes,
    generateClientEmails,
    analyzeLegalDocument,
    createMarketStrategy,
    autoFillForm,
    researchTopic,
    setAutomationLevel,
    enableTaskType,
  } = useAIAgentAutomation()

  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [newTaskType, setNewTaskType] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [researchQuery, setResearchQuery] = useState("")
  const [emailRecipients, setEmailRecipients] = useState("")
  const [documentUrl, setDocumentUrl] = useState("")

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "tax_preparation":
        return FileText
      case "email_generation":
        return Mail
      case "legal_analysis":
        return Scale
      case "market_strategy":
        return TrendingUp
      case "research":
        return Search
      default:
        return Bot
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-900/20 border-green-400/30"
      case "in_progress":
        return "text-blue-400 bg-blue-900/20 border-blue-400/30"
      case "awaiting_confirmation":
        return "text-orange-400 bg-orange-900/20 border-orange-400/30"
      case "failed":
        return "text-red-400 bg-red-900/20 border-red-400/30"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-400/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400"
      case "high":
        return "text-orange-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const handleQuickTask = async (taskType: string) => {
    switch (taskType) {
      case "tax_prep":
        await prepareTaxes(2024, false)
        break
      case "client_emails":
        if (emailRecipients) {
          await generateClientEmails(
            "investment_update",
            emailRecipients.split(",").map((e) => e.trim()),
          )
        }
        break
      case "legal_analysis":
        if (documentUrl) {
          await analyzeLegalDocument(documentUrl, "contract_review")
        }
        break
      case "market_strategy":
        await createMarketStrategy(["AAPL", "GOOGL", "MSFT"], 100000)
        break
      case "research":
        if (researchQuery) {
          await researchTopic(researchQuery, "comprehensive")
        }
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Agent Status Header */}
      <Card className="bg-gradient-to-br from-genius-900/95 to-genius-800/95 backdrop-blur-xl border-genius-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{
                  scale: isAgentActive ? [1, 1.1, 1] : 1,
                  rotate: isAgentActive ? [0, 360] : 0,
                }}
                transition={{
                  repeat: isAgentActive ? Number.POSITIVE_INFINITY : 0,
                  duration: 3,
                }}
              >
                <Bot className="w-8 h-8 text-genius-400" />
              </motion.div>
              <div>
                <CardTitle className="text-genius-300">Supreme AI Agent</CardTitle>
                <p className="text-genius-400/70 text-sm">
                  Autonomous task execution with{" "}
                  {Math.round(
                    (agentCapabilities.reduce((acc, cap) => acc + cap.accuracy, 0) / agentCapabilities.length) * 100,
                  )}
                  % accuracy
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                className={`${isAgentActive ? "bg-green-600/20 text-green-300 border-green-400/30" : "bg-red-600/20 text-red-300 border-red-400/30"}`}
              >
                {isAgentActive ? "ACTIVE" : "INACTIVE"}
              </Badge>
              <Badge className="bg-genius-600/20 text-genius-300 border-genius-400/30">
                {automationLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-illumination-300 font-medium text-sm">Active Tasks</div>
                <div className="text-illumination-400/70 text-xs">{activeTasks.length} running</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-illumination-300 font-medium text-sm">Pending Approval</div>
                <div className="text-illumination-400/70 text-xs">{pendingConfirmations.length} waiting</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-illumination-300 font-medium text-sm">Completed</div>
                <div className="text-illumination-400/70 text-xs">{completedTasks.length} today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-illumination-300 font-medium text-sm">Memory Usage</div>
                <div className="text-illumination-400/70 text-xs">
                  {citizenMemory?.interactions.length || 0} interactions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-royal-200/20">
          <TabsTrigger value="tasks" className="text-xs">
            <Target className="w-3 h-3 mr-1" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="confirmations" className="text-xs">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Approvals
          </TabsTrigger>
          <TabsTrigger value="capabilities" className="text-xs">
            <Zap className="w-3 h-3 mr-1" />
            Capabilities
          </TabsTrigger>
          <TabsTrigger value="quick-actions" className="text-xs">
            <Play className="w-3 h-3 mr-1" />
            Quick Actions
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs">
            <Settings className="w-3 h-3 mr-1" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Active Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <CardTitle className="text-illumination-300 text-lg flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Active Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeTasks.length === 0 ? (
                <div className="text-center text-illumination-400/70 py-8">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <div>No active tasks. AI Agent is ready for new assignments.</div>
                </div>
              ) : (
                activeTasks.map((task) => {
                  const IconComponent = getTaskIcon(task.type)
                  return (
                    <motion.div
                      key={task.id}
                      className={`p-4 rounded-lg border ${getStatusColor(task.status)} cursor-pointer`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <IconComponent className="w-5 h-5 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-sm">{task.title}</h4>
                              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                            </div>
                            <p className="text-xs opacity-70 mb-2">{task.description}</p>
                            <div className="flex items-center space-x-4 text-xs">
                              <span>🤖 {task.automationLevel}</span>
                              <span>⏱️ {task.createdAt.toLocaleTimeString()}</span>
                              {task.confirmationRequired && (
                                <span className="text-orange-400">⚠️ Confirmation Required</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              executeTask(task.id)
                            }}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          >
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              cancelTask(task.id)
                            }}
                          >
                            <Pause className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Task Details (Expanded) */}
                      <AnimatePresence>
                        {selectedTask === task.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 pt-4 border-t border-opacity-30"
                          >
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <div className="font-medium mb-1">Configuration:</div>
                                <pre className="bg-black/20 p-2 rounded text-xs overflow-auto">
                                  {JSON.stringify(task.config, null, 2)}
                                </pre>
                              </div>
                              <div>
                                <div className="font-medium mb-1">Progress:</div>
                                <div className="space-y-2">
                                  <div>Status: {task.status}</div>
                                  <div>
                                    Retries: {task.retryCount}/{task.maxRetries}
                                  </div>
                                  <div>Last Updated: {task.lastUpdated.toLocaleString()}</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Confirmations Tab */}
        <TabsContent value="confirmations" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <CardTitle className="text-illumination-300 text-lg flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Pending Confirmations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingConfirmations.length === 0 ? (
                <div className="text-center text-illumination-400/70 py-8">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <div>No tasks awaiting confirmation.</div>
                </div>
              ) : (
                pendingConfirmations.map((task) => {
                  const IconComponent = getTaskIcon(task.type)
                  return (
                    <motion.div
                      key={task.id}
                      className="p-4 bg-orange-800/20 rounded-lg border border-orange-400/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <IconComponent className="w-5 h-5 mt-0.5 text-orange-400" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-orange-300 font-medium text-sm">{task.title}</h4>
                              <Badge className="bg-orange-600/20 text-orange-300 border-orange-400/30">
                                AWAITING APPROVAL
                              </Badge>
                            </div>
                            <p className="text-orange-400/70 text-xs mb-2">{task.description}</p>

                            {/* Accuracy Check Results */}
                            {task.accuracyCheck && (
                              <div className="mb-3 p-2 bg-orange-900/20 rounded border border-orange-400/20">
                                <div className="text-xs text-orange-300 font-medium mb-1">Accuracy Check:</div>
                                <div className="text-xs text-orange-400">
                                  Confidence: {Math.round(task.accuracyCheck.confidence * 100)}%
                                </div>
                                {task.accuracyCheck.issues.length > 0 && (
                                  <div className="mt-1">
                                    <div className="text-xs text-orange-300">Issues Found:</div>
                                    {task.accuracyCheck.issues.map((issue, index) => (
                                      <div key={index} className="text-xs text-orange-400/70">
                                        • {issue.description}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Task Results Preview */}
                            {task.results && (
                              <div className="mb-3 p-2 bg-blue-900/20 rounded border border-blue-400/20">
                                <div className="text-xs text-blue-300 font-medium mb-1">Results Preview:</div>
                                <div className="text-xs text-blue-400">
                                  Success: {task.results.success ? "✅" : "❌"}
                                </div>
                                <div className="text-xs text-blue-400">
                                  Execution Time: {task.results.metrics.executionTime / 1000}s
                                </div>
                                <div className="text-xs text-blue-400">
                                  Cost Savings: ${task.results.metrics.costSavings.toLocaleString()}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => confirmTask(task.id, true)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => confirmTask(task.id, false, "Needs revision")}
                            className="border-red-400/30 text-red-400 hover:bg-red-900/20"
                          >
                            <ThumbsDown className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent Capabilities Tab */}
        <TabsContent value="capabilities" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <CardTitle className="text-illumination-300 text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                AI Agent Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agentCapabilities.map((capability) => (
                <motion.div
                  key={capability.id}
                  className="p-4 bg-genius-800/20 rounded-lg border border-genius-400/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-genius-300 font-medium text-sm">{capability.name}</h4>
                        <Badge
                          className={`${capability.enabled ? "bg-green-600/20 text-green-300 border-green-400/30" : "bg-gray-600/20 text-gray-300 border-gray-400/30"}`}
                        >
                          {capability.enabled ? "ENABLED" : "DISABLED"}
                        </Badge>
                        <Badge className="bg-genius-600/20 text-genius-300 border-genius-400/30">
                          {capability.category.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-genius-400/70 text-xs mb-3">{capability.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-genius-300 mb-1">Automation Level</div>
                          <Progress value={capability.automationLevel * 100} className="h-2" />
                          <div className="text-xs text-genius-400 mt-1">
                            {Math.round(capability.automationLevel * 100)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-genius-300 mb-1">Accuracy</div>
                          <Progress value={capability.accuracy * 100} className="h-2" />
                          <div className="text-xs text-genius-400 mt-1">{Math.round(capability.accuracy * 100)}%</div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <Button
                        size="sm"
                        variant={capability.enabled ? "outline" : "default"}
                        onClick={() => enableTaskType(capability.id, !capability.enabled)}
                        className={
                          capability.enabled
                            ? "border-red-400/30 text-red-400 hover:bg-red-900/20"
                            : "bg-gradient-to-r from-green-600 to-emerald-600"
                        }
                      >
                        {capability.enabled ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quick Actions Tab */}
        <TabsContent value="quick-actions" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <CardTitle className="text-illumination-300 text-lg flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tax Preparation */}
              <div className="p-4 bg-blue-800/20 rounded-lg border border-blue-400/30">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h4 className="text-blue-300 font-medium">Tax Preparation</h4>
                </div>
                <p className="text-blue-400/70 text-xs mb-3">
                  Automatically prepare and file tax returns with 98% accuracy
                </p>
                <Button
                  onClick={() => handleQuickTask("tax_prep")}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Prepare 2024 Tax Return
                </Button>
              </div>

              {/* Email Generation */}
              <div className="p-4 bg-green-800/20 rounded-lg border border-green-400/30">
                <div className="flex items-center space-x-2 mb-3">
                  <Mail className="w-5 h-5 text-green-400" />
                  <h4 className="text-green-300 font-medium">Client Communication</h4>
                </div>
                <p className="text-green-400/70 text-xs mb-3">Generate personalized emails for clients and prospects</p>
                <Input
                  placeholder="Enter email addresses (comma separated)"
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                  className="mb-2 bg-green-900/20 border-green-400/30"
                />
                <Button
                  onClick={() => handleQuickTask("client_emails")}
                  disabled={!emailRecipients}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Generate Client Emails
                </Button>
              </div>

              {/* Legal Analysis */}
              <div className="p-4 bg-purple-800/20 rounded-lg border border-purple-400/30">
                <div className="flex items-center space-x-2 mb-3">
                  <Scale className="w-5 h-5 text-purple-400" />
                  <h4 className="text-purple-300 font-medium">Legal Analysis</h4>
                </div>
                <p className="text-purple-400/70 text-xs mb-3">Analyze contracts, compliance, and legal risks</p>
                <Input
                  placeholder="Enter document URL or upload path"
                  value={documentUrl}
                  onChange={(e) => setDocumentUrl(e.target.value)}
                  className="mb-2 bg-purple-900/20 border-purple-400/30"
                />
                <Button
                  onClick={() => handleQuickTask("legal_analysis")}
                  disabled={!documentUrl}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Scale className="w-4 h-4 mr-2" />
                  Analyze Legal Document
                </Button>
              </div>

              {/* Market Strategy */}
              <div className="p-4 bg-orange-800/20 rounded-lg border border-orange-400/30">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  <h4 className="text-orange-300 font-medium">Market Strategy</h4>
                </div>
                <p className="text-orange-400/70 text-xs mb-3">Develop investment strategies and execute trades</p>
                <Button
                  onClick={() => handleQuickTask("market_strategy")}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Create Investment Strategy
                </Button>
              </div>

              {/* Research */}
              <div className="p-4 bg-cyan-800/20 rounded-lg border border-cyan-400/30">
                <div className="flex items-center space-x-2 mb-3">
                  <Search className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-cyan-300 font-medium">Research & Analysis</h4>
                </div>
                <p className="text-cyan-400/70 text-xs mb-3">Access and analyze any information or data</p>
                <Input
                  placeholder="Enter research topic or question"
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  className="mb-2 bg-cyan-900/20 border-cyan-400/30"
                />
                <Button
                  onClick={() => handleQuickTask("research")}
                  disabled={!researchQuery}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Start Research
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <CardTitle className="text-illumination-300 text-lg flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Agent Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Automation Level */}
              <div className="p-4 bg-genius-800/20 rounded-lg border border-genius-400/30">
                <h4 className="text-genius-300 font-medium mb-3">Automation Level</h4>
                <div className="grid grid-cols-4 gap-2">
                  {["minimal", "moderate", "aggressive", "maximum"].map((level) => (
                    <Button
                      key={level}
                      variant={automationLevel === level ? "default" : "outline"}
                      onClick={() => setAutomationLevel(level)}
                      className="text-xs"
                    >
                      {level.toUpperCase()}
                    </Button>
                  ))}
                </div>
                <p className="text-genius-400/70 text-xs mt-2">
                  Current: <strong>{automationLevel}</strong> -
                  {automationLevel === "minimal" && " Manual approval required for all tasks"}
                  {automationLevel === "moderate" && " Auto-execute low-risk tasks"}
                  {automationLevel === "aggressive" && " Auto-execute most tasks with confirmation"}
                  {automationLevel === "maximum" && " Full automation with minimal human intervention"}
                </p>
              </div>

              {/* Memory & Learning */}
              <div className="p-4 bg-blue-800/20 rounded-lg border border-blue-400/30">
                <h4 className="text-blue-300 font-medium mb-3">Memory & Learning</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400">Citizen Interactions Stored:</span>
                    <span className="text-blue-300">{citizenMemory?.interactions.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400">Learning Enabled:</span>
                    <Badge className="bg-green-600/20 text-green-300 border-green-400/30">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400">Last Memory Update:</span>
                    <span className="text-blue-300">{citizenMemory?.lastUpdated.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="p-4 bg-purple-800/20 rounded-lg border border-purple-400/30">
                <h4 className="text-purple-300 font-medium mb-3">Privacy & Security</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">Data Encryption:</span>
                    <Badge className="bg-green-600/20 text-green-300 border-green-400/30">ENABLED</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">Supreme Authority Protection:</span>
                    <Badge className="bg-gold-600/20 text-gold-300 border-gold-400/30">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">Identity Shielding:</span>
                    <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">MAXIMUM</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
