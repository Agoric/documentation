"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { motion } from "framer-motion"
import {
  Shield,
  FileText,
  TrendingUp,
  Award,
  User,
  Download,
  Eye,
  Lock,
  CheckCircle,
  Crown,
  Globe,
  Zap,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Mountain,
  Waves,
  TreePine,
  Cpu,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { VOAI_ENVIRONMENTS, type VOAIEnvironment, type VOAIAction } from "@/lib/voai-environments"

// Mock data - replace with actual user data
const citizenData = {
  id: "GC-2024-789456",
  name: "Alexander Magnus",
  romanName: "Supreme Authority Citizen",
  title: "Global Citizen - Level VII",
  memberSince: "2024-01-15",
  status: "active",
  level: 7,
  nextLevelProgress: 75,
  qgiBalance: 250000,
  bondValue: 8333,
  taxBenefits: 37500,
  avatar: "/placeholder-user.jpg",
  address: {
    street: "Digital Domicile Territory",
    city: "QUICA Realm",
    jurisdiction: "Global Citizenship Zone",
  },
  contact: {
    email: "alexander.magnus@quica.global",
    phone: "+1 (555) 123-4567",
  },
}

const creditScores = {
  snapScore: {
    score: 847,
    change: +23,
    trend: "up",
    description: "Snapifi Proprietary Credit Score",
    factors: [
      "QGI Investment Performance",
      "Global Citizenship Status",
      "Payment History Excellence",
      "Credit Utilization Optimization",
      "Inclusive Lending Participation",
    ],
  },
  businessSnapScore: {
    score: 792,
    change: +18,
    trend: "up",
    description: "Business Credit Enhancement Score",
    factors: [
      "Commercial QGI Allocation",
      "Business Citizenship Benefits",
      "Trade Line Performance",
      "Vendor Payment History",
    ],
  },
  fico: {
    score: 798,
    change: +12,
    trend: "up",
    description: "FICO Score 8",
  },
  vantage: {
    score: 785,
    change: +8,
    trend: "up",
    description: "VantageScore 4.0",
  },
  experian: {
    score: 802,
    change: +15,
    trend: "up",
    description: "Experian PLUS Score",
  },
  equifax: {
    score: 791,
    change: +9,
    trend: "up",
    description: "Equifax Credit Score",
  },
  transunion: {
    score: 788,
    change: +11,
    trend: "up",
    description: "TransUnion CreditVision",
  },
  dnb: {
    score: 76,
    change: +4,
    trend: "up",
    description: "D&B PAYDEX Score",
    outOf: 100,
  },
}

const documents = [
  {
    id: "1",
    name: "Global Citizenship Certificate",
    type: "Certificate",
    date: "2024-01-15",
    size: "2.4 MB",
    status: "verified",
    icon: Award,
  },
  {
    id: "2",
    name: "QGI Investment Agreement",
    type: "Contract",
    date: "2024-01-15",
    size: "1.8 MB",
    status: "active",
    icon: FileText,
  },
  {
    id: "3",
    name: "Digital Domicile Registration",
    type: "Legal Document",
    date: "2024-01-16",
    size: "3.2 MB",
    status: "verified",
    icon: Globe,
  },
  {
    id: "4",
    name: "Tax Benefit Contract",
    type: "Tax Document",
    date: "2024-01-20",
    size: "2.1 MB",
    status: "active",
    icon: DollarSign,
  },
  {
    id: "5",
    name: "Credit Acceleration Agreement",
    type: "Financial",
    date: "2024-02-01",
    size: "1.5 MB",
    status: "active",
    icon: TrendingUp,
  },
  {
    id: "6",
    name: "Identity Protection Policy",
    type: "Insurance",
    date: "2024-02-01",
    size: "2.8 MB",
    status: "active",
    icon: Shield,
  },
]

const protectionServices = [
  {
    title: "Identity Theft Protection",
    description: "Comprehensive identity monitoring and restoration services",
    status: "active",
    coverage: "$1,000,000",
    features: [
      "24/7 Identity Monitoring",
      "Dark Web Surveillance",
      "Credit Report Monitoring",
      "Identity Restoration Services",
      "Legal Support & Assistance",
    ],
    icon: Shield,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Bankruptcy Protection",
    description: "Financial protection and recovery assistance",
    status: "active",
    coverage: "$250,000",
    features: [
      "Pre-Bankruptcy Counseling",
      "Legal Representation",
      "Asset Protection Planning",
      "Credit Rehabilitation",
      "Financial Recovery Support",
    ],
    icon: Lock,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Credit Acceleration Tier III",
    description: "Maximum credit optimization with guaranteed results",
    status: "active",
    coverage: "$250,000",
    features: [
      "Credit Score Acceleration up to 300 points",
      "Payment Protection for 36 months",
      "Guaranteed Home Financing Approval",
      "Comprehensive Life & Disability Coverage",
      "Wealth Management Services",
    ],
    icon: TrendingUp,
    color: "from-purple-500 to-indigo-600",
  },
]

export function HomeDashboard() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [selectedEnvironment, setSelectedEnvironment] = useState<VOAIEnvironment>(VOAI_ENVIRONMENTS[0])
  const [environmentProgress, setEnvironmentProgress] = useState<Record<string, number>>({
    wolf: 45,
    forest: 32,
    mountain: 67,
    ocean: 23,
    cyber: 89,
  })
  const [executionResults, setExecutionResults] = useState<string[]>([])
  const [isExecuting, setIsExecuting] = useState(false)

  const getEnvironmentIcon = (envId: string) => {
    const icons = {
      wolf: Crown,
      forest: TreePine,
      mountain: Mountain,
      ocean: Waves,
      cyber: Cpu,
    }
    return icons[envId as keyof typeof icons] || Globe
  }

  const getEnvironmentGradient = (envId: string) => {
    const gradients = {
      wolf: "from-gray-800 to-slate-700",
      forest: "from-green-800 to-emerald-700",
      mountain: "from-slate-800 to-blue-700",
      ocean: "from-blue-800 to-cyan-700",
      cyber: "from-purple-800 to-indigo-700",
    }
    return gradients[envId as keyof typeof gradients] || "from-slate-800 to-gray-700"
  }

  const handleEnvironmentAction = async (env: VOAIEnvironment, action: VOAIAction) => {
    setIsExecuting(true)

    // Simulate action execution
    setTimeout(() => {
      const result = `Successfully executed "${action.label}" in ${env.name} environment!`
      setExecutionResults((prev) => [result, ...prev.slice(0, 2)])

      // Update progress
      setEnvironmentProgress((prev) => ({
        ...prev,
        [env.id]: Math.min((prev[env.id] || 0) + 15, 100),
      }))

      setIsExecuting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <SupremeAuthorityCoin size="lg" variant="logo" animated />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif">
                Citizen Dashboard
              </h1>
              <p className="text-xl text-amber-300/80 italic font-serif">Supreme Authority Platform</p>
            </div>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="environments">VOAI Environments</TabsTrigger>
            <TabsTrigger value="documents">Documents & Protection</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - ID Card & Citizenship */}
              <div className="space-y-6">
                {/* Digital ID Card */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                  <CardHeader>
                    <CardTitle className="text-amber-300 font-serif flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Digital Citizenship ID
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center">
                        <Crown className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-amber-300">{citizenData.name}</h3>
                        <p className="text-sm text-amber-300/70 italic">{citizenData.romanName}</p>
                        <Badge className="mt-1 bg-purple-600/20 text-purple-300 border-purple-400/30">
                          {citizenData.title}
                        </Badge>
                      </div>
                    </div>

                    <Separator className="bg-amber-400/20" />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Citizen ID</span>
                        <span className="text-amber-300 font-mono">{citizenData.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status</span>
                        <Badge className="bg-green-600/20 text-green-300 border-green-400/30">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Level</span>
                        <span className="text-amber-300">Level {citizenData.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Member Since</span>
                        <span className="text-amber-300">{new Date(citizenData.memberSince).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Next Level Progress</span>
                        <span className="text-amber-300">{citizenData.nextLevelProgress}%</span>
                      </div>
                      <Progress value={citizenData.nextLevelProgress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex items-center text-gray-400">
                        <MapPin className="w-3 h-3 mr-1" />
                        {citizenData.address.jurisdiction}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Mail className="w-3 h-3 mr-1" />
                        {citizenData.contact.email}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Phone className="w-3 h-3 mr-1" />
                        {citizenData.contact.phone}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Summary */}
                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                  <CardHeader>
                    <CardTitle className="text-green-300 font-serif flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Financial Portfolio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">QGI Balance</span>
                        <span className="text-green-300 font-bold">${citizenData.qgiBalance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Bond Value</span>
                        <span className="text-green-300 font-bold">${citizenData.bondValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Annual Tax Benefits</span>
                        <span className="text-green-300 font-bold">${citizenData.taxBenefits.toLocaleString()}</span>
                      </div>
                    </div>

                    <Separator className="bg-green-400/20" />

                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">
                        ${(citizenData.qgiBalance + citizenData.bondValue + citizenData.taxBenefits).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">Total Portfolio Value</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Center Column - Credit Scores */}
              <div className="space-y-6">
                {/* Snap Score - Most Prominent */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
                  <CardHeader>
                    <CardTitle className="text-purple-300 font-serif flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Snap Score
                      </div>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-400/30">PROPRIETARY</Badge>
                    </CardTitle>
                    <CardDescription className="text-purple-200/70">
                      Advanced inclusive credit scoring with QGI integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-purple-300 mb-2">{creditScores.snapScore.score}</div>
                      <div className="flex items-center justify-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold">
                          +{creditScores.snapScore.change} this month
                        </span>
                      </div>
                    </div>

                    <Separator className="bg-purple-400/20" />

                    <div className="space-y-2">
                      <h5 className="text-purple-300 font-semibold text-sm">Scoring Factors</h5>
                      {creditScores.snapScore.factors.map((factor, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-400">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                          {factor}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Traditional Credit Scores Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(creditScores)
                    .filter(([key]) => !["snapScore", "businessSnapScore", "dnb"].includes(key))
                    .map(([key, score]) => (
                      <Card key={key} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-300 mb-1">{score.score}</div>
                          <div className="text-xs text-gray-400 mb-2">{score.description}</div>
                          <div className="flex items-center justify-center space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 text-xs">+{score.change}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {/* Business Scores */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-amber-300 mb-1">
                        {creditScores.businessSnapScore.score}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">Business Snap Score</div>
                      <div className="flex items-center justify-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs">+{creditScores.businessSnapScore.change}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-400/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-300 mb-1">{creditScores.dnb.score}</div>
                      <div className="text-xs text-gray-400 mb-2">D&B PAYDEX</div>
                      <div className="flex items-center justify-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs">+{creditScores.dnb.change}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column - Quick Environment Access */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-400/30">
                  <CardHeader>
                    <CardTitle className="text-indigo-300 font-serif flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Quick Environment Access
                    </CardTitle>
                    <CardDescription className="text-indigo-200/70">
                      Jump into your favorite VOAI environments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {VOAI_ENVIRONMENTS.slice(0, 3).map((env) => {
                      const IconComponent = getEnvironmentIcon(env.id)
                      return (
                        <motion.div key={env.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Card
                            className={`cursor-pointer bg-gradient-to-r ${getEnvironmentGradient(env.id)} border-slate-600/30 hover:border-slate-500/50`}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg">{env.emoji}</span>
                                    <IconComponent className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-white">{env.name}</div>
                                    <div className="text-xs text-gray-300">
                                      {environmentProgress[env.id] || 0}% mastery
                                    </div>
                                  </div>
                                </div>
                                <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                                  Enter
                                </Button>
                              </div>
                              <Progress value={environmentProgress[env.id] || 0} className="h-1 mt-2" />
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      <Globe className="w-4 h-4 mr-2" />
                      View All Environments
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Environment Activity */}
                <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300 font-serif text-sm flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {executionResults.length === 0 ? (
                      <div className="text-center py-4 text-slate-400">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="text-xs">No recent activity</div>
                      </div>
                    ) : (
                      executionResults.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-2 bg-green-900/20 rounded border border-green-400/20"
                        >
                          <div className="text-xs text-green-300">{result}</div>
                          <div className="text-xs text-gray-500 mt-1">{new Date().toLocaleTimeString()}</div>
                        </motion.div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* VOAI Environments Tab */}
          <TabsContent value="environments" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">VOAI Environment Platform</h2>
              <p className="text-slate-400">Select an environment and execute immersive actions</p>
            </div>

            {/* Environment Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VOAI_ENVIRONMENTS.map((env) => {
                const IconComponent = getEnvironmentIcon(env.id)
                return (
                  <motion.div key={env.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className={`bg-gradient-to-br ${getEnvironmentGradient(env.id)} border-amber-400/30 hover:border-amber-400/50 transition-all duration-300`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              className="flex items-center space-x-2"
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            >
                              <span className="text-3xl">{env.emoji}</span>
                              <IconComponent className="w-6 h-6 text-white" />
                            </motion.div>
                            <div>
                              <CardTitle className="text-white">{env.name}</CardTitle>
                              <p className="text-sm text-gray-200">Environment</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Mastery Progress</span>
                            <span className="text-amber-300">{environmentProgress[env.id] || 0}%</span>
                          </div>
                          <Progress value={environmentProgress[env.id] || 0} className="h-2" />
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-white">Quick Actions</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {env.actions.slice(0, 3).map((action) => (
                              <Button
                                key={action.id}
                                size="sm"
                                variant="ghost"
                                className="justify-start text-white hover:bg-white/10"
                                onClick={() => handleEnvironmentAction(env, action)}
                                disabled={isExecuting}
                              >
                                <span className="mr-2">{action.icon}</span>
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                          onClick={() => setSelectedEnvironment(env)}
                        >
                          Enter {env.name}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Selected Environment Details */}
            {selectedEnvironment && (
              <Card
                className={`bg-gradient-to-br ${getEnvironmentGradient(selectedEnvironment.id)} border-amber-400/30 mt-8`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="text-5xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        {selectedEnvironment.emoji}
                      </motion.div>
                      <div>
                        <CardTitle className="text-2xl text-white">{selectedEnvironment.name} Environment</CardTitle>
                        <p className="text-gray-200">Execute actions to gain mastery and unlock new abilities</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30">
                      {environmentProgress[selectedEnvironment.id] || 0}% Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedEnvironment.actions.map((action) => (
                      <motion.div key={action.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                          <CardContent
                            className="p-4 text-center"
                            onClick={() => handleEnvironmentAction(selectedEnvironment, action)}
                          >
                            <div className="text-3xl mb-2">{action.icon}</div>
                            <div className="text-sm font-medium text-white">{action.label}</div>
                            {isExecuting && (
                              <motion.div
                                className="mt-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <Zap className="w-4 h-4 text-amber-400 mx-auto" />
                              </motion.div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Documents & Protection Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Document Vault */}
              <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-400/30">
                <CardHeader>
                  <CardTitle className="text-indigo-300 font-serif flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Document Vault
                  </CardTitle>
                  <CardDescription className="text-indigo-200/70">
                    Secure storage for all citizenship and financial documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {documents.map((doc) => {
                      const Icon = doc.icon
                      return (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 bg-indigo-900/30 rounded-lg border border-indigo-400/20 hover:border-indigo-400/40 transition-colors cursor-pointer"
                          onClick={() => setSelectedDocument(doc.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4 text-indigo-300" />
                            <div>
                              <div className="text-sm font-medium text-indigo-300">{doc.name}</div>
                              <div className="text-xs text-gray-400">
                                {doc.type} • {doc.size}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={cn(
                                "text-xs",
                                doc.status === "verified"
                                  ? "bg-green-600/20 text-green-300 border-green-400/30"
                                  : "bg-blue-600/20 text-blue-300 border-blue-400/30",
                              )}
                            >
                              {doc.status}
                            </Badge>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Separator className="bg-indigo-400/20" />

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                    <Button size="sm" variant="outline" className="border-indigo-400/30 text-indigo-300">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Protection Services */}
              <div className="space-y-4">
                {protectionServices.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <Card
                      key={index}
                      className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-slate-300 font-serif text-sm flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon className="w-4 h-4 mr-2" />
                            {service.title}
                          </div>
                          <Badge className="bg-green-600/20 text-green-300 border-green-400/30 text-xs">
                            {service.status.toUpperCase()}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-xs text-gray-400">{service.description}</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Coverage</span>
                          <span className="text-slate-300 font-semibold">{service.coverage}</span>
                        </div>
                        <div className="space-y-1">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-400">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                              {feature}
                            </div>
                          ))}
                          {service.features.length > 3 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{service.features.length - 3} more features
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
