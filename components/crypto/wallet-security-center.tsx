"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,
  Fingerprint,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Copy,
  Download,
  Upload,
  Zap,
  Crown,
} from "lucide-react"
import { motion } from "framer-motion"

export function WalletSecurityCenter() {
  const [securityScore, setSecurityScore] = useState(85)
  const [seedPhraseVisible, setSeedPhraseVisible] = useState(false)
  const [backupDialogOpen, setBackupDialogOpen] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)

  const sampleSeedPhrase = [
    "royal",
    "vault",
    "sovereign",
    "crypto",
    "treasury",
    "secure",
    "blockchain",
    "digital",
    "assets",
    "protection",
    "wealth",
    "freedom",
  ]

  const securityChecks = [
    { name: "Strong Password", completed: true, points: 20 },
    { name: "Seed Phrase Backup", completed: true, points: 25 },
    { name: "Two-Factor Authentication", completed: true, points: 20 },
    { name: "Biometric Lock", completed: false, points: 15 },
    { name: "Hardware Wallet", completed: false, points: 20 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div className="text-center space-y-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-amber-300 font-serif">Security Center</h1>
            <Crown className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-purple-200 font-serif tracking-wider">FORTRESS-GRADE WALLET PROTECTION</p>
        </motion.div>

        {/* Security Score */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-amber-300 font-serif flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-purple-600"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${securityScore * 2.51}, 251`}
                    className="text-amber-400"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-300">{securityScore}%</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-100 mb-2">Excellent Security</h3>
                <p className="text-purple-300 mb-4">Your wallet is well protected with multiple security layers.</p>
                <div className="space-y-2">
                  {securityChecks.map((check, index) => (
                    <div key={check.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {check.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        )}
                        <span className="text-purple-200 text-sm">{check.name}</span>
                      </div>
                      <span className="text-amber-300 text-sm">+{check.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <Tabs defaultValue="authentication" className="space-y-6">
          <TabsList className="bg-purple-900/50 border-amber-400/30">
            <TabsTrigger value="authentication" className="data-[state=active]:bg-amber-500/20">
              <Lock className="w-4 h-4 mr-2" />
              Authentication
            </TabsTrigger>
            <TabsTrigger value="backup" className="data-[state=active]:bg-amber-500/20">
              <Key className="w-4 h-4 mr-2" />
              Backup & Recovery
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-amber-500/20">
              <Shield className="w-4 h-4 mr-2" />
              Security Monitoring
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-amber-500/20">
              <Zap className="w-4 h-4 mr-2" />
              Advanced Security
            </TabsTrigger>
          </TabsList>

          {/* Authentication Tab */}
          <TabsContent value="authentication" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif">Password Protection</CardTitle>
                  <CardDescription className="text-purple-200">
                    Secure your wallet with a strong password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-purple-200">Current Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      className="bg-purple-800/30 border-purple-600 text-purple-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-purple-200">New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="bg-purple-800/30 border-purple-600 text-purple-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-purple-200">Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-purple-800/30 border-purple-600 text-purple-100"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600">Update Password</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif">Multi-Factor Authentication</CardTitle>
                  <CardDescription className="text-purple-200">
                    Add extra layers of security to your wallet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-purple-100 font-medium">Two-Factor Authentication</p>
                        <p className="text-purple-300 text-sm">SMS or authenticator app</p>
                      </div>
                    </div>
                    <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Fingerprint className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-purple-100 font-medium">Biometric Authentication</p>
                        <p className="text-purple-300 text-sm">Fingerprint or face unlock</p>
                      </div>
                    </div>
                    <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
                  </div>

                  {twoFactorEnabled && (
                    <Button variant="outline" className="w-full bg-purple-800/30 border-purple-600 text-purple-100">
                      Configure 2FA
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Backup & Recovery Tab */}
          <TabsContent value="backup" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif">Seed Phrase Backup</CardTitle>
                  <CardDescription className="text-purple-200">
                    Your 12-word recovery phrase - keep it safe and secret
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-800/30 p-4 rounded-lg border border-amber-400/20">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-purple-200">Recovery Phrase</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSeedPhraseVisible(!seedPhraseVisible)}
                        className="text-purple-200 hover:text-amber-300"
                      >
                        {seedPhraseVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {sampleSeedPhrase.map((word, index) => (
                        <div key={index} className="bg-purple-700/30 p-2 rounded text-center text-sm">
                          <span className="text-purple-300">{index + 1}.</span>{" "}
                          <span className="text-purple-100">{seedPhraseVisible ? word : "•••••"}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-purple-800/30 border-purple-600 text-purple-100"
                      onClick={() => navigator.clipboard.writeText(sampleSeedPhrase.join(" "))}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Dialog open={backupDialogOpen} onOpenChange={setBackupDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600">
                          <Download className="w-4 h-4 mr-2" />
                          Backup
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gradient-to-br from-purple-900 to-indigo-900 border-amber-400/30">
                        <DialogHeader>
                          <DialogTitle className="text-amber-300">Backup Seed Phrase</DialogTitle>
                          <DialogDescription className="text-purple-200">
                            Choose how you want to backup your recovery phrase
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                            <Download className="w-4 h-4 mr-2" />
                            Download Encrypted File
                          </Button>
                          <Button className="w-full bg-gradient-to-r from-green-500 to-green-600">
                            <Smartphone className="w-4 h-4 mr-2" />
                            Send to Secure Device
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full bg-purple-800/30 border-purple-600 text-purple-100"
                          >
                            Print Physical Copy
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-400/30 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <p className="text-amber-300 font-medium text-sm">Security Warning</p>
                        <p className="text-amber-200 text-xs">
                          Never share your seed phrase. Anyone with access can control your wallet.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif">Wallet Recovery</CardTitle>
                  <CardDescription className="text-purple-200">
                    Restore access to your wallet using your seed phrase
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-purple-200">Recovery Phrase</Label>
                    <textarea
                      placeholder="Enter your 12-word recovery phrase..."
                      className="w-full h-24 p-3 bg-purple-800/30 border border-purple-600 rounded-md text-purple-100 placeholder-purple-400 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-purple-200">New Wallet Name</Label>
                    <Input
                      placeholder="Enter wallet name"
                      className="bg-purple-800/30 border-purple-600 text-purple-100"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Recover Wallet
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Security Activity</CardTitle>
                <CardDescription className="text-purple-200">
                  Monitor suspicious activity and security events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-400/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-green-300 font-medium">Successful Login</p>
                        <p className="text-green-200 text-sm">Today at 2:34 PM from New York, NY</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-300 border-green-400">
                      Normal
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-blue-300 font-medium">Password Changed</p>
                        <p className="text-blue-200 text-sm">Yesterday at 10:15 AM</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-blue-300 border-blue-400">
                      Security
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-900/20 border border-yellow-400/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-yellow-300 font-medium">Failed Login Attempt</p>
                        <p className="text-yellow-200 text-sm">2 days ago at 3:22 AM from Unknown Location</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-yellow-300 border-yellow-400">
                      Warning
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Security Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif">Hardware Wallet</CardTitle>
                  <CardDescription className="text-purple-200">
                    Connect a hardware wallet for maximum security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                    <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-purple-300 mb-4">No hardware wallet connected</p>
                    <Button className="bg-gradient-to-r from-purple-500 to-purple-600">Connect Hardware Wallet</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif">Multi-Signature</CardTitle>
                  <CardDescription className="text-purple-200">
                    Require multiple signatures for transactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                    <Key className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-purple-300 mb-4">Multi-sig not configured</p>
                    <Button className="bg-gradient-to-r from-amber-500 to-amber-600">Setup Multi-Signature</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
