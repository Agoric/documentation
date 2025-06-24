"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Shield, FileText, Globe, Lock, CheckCircle, Scale, Star } from "lucide-react"

export default function BlockchainPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blockchain Legal Registry</h1>
          <p className="text-muted-foreground">Immutable legal documentation and compliance management on blockchain</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          <Zap className="h-3 w-3 mr-1" />
          Blockchain Secured
        </Badge>
      </div>

      <Tabs defaultValue="registry" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="registry">Registry</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="registry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Legal Document Registry</span>
              </CardTitle>
              <CardDescription>Immutable storage of legal documents and contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Secure Document Storage</h3>
                <p className="text-muted-foreground mb-4">
                  Store legal documents on blockchain with cryptographic verification
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="h-5 w-5" />
                <span>Compliance Dashboard</span>
              </CardTitle>
              <CardDescription>Real-time compliance monitoring and reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">98.7%</div>
                  <p className="text-sm text-green-800">Compliance Score</p>
                </div>
                <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600">24/7</div>
                  <p className="text-sm text-blue-800">Monitoring</p>
                </div>
                <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-600">150+</div>
                  <p className="text-sm text-purple-800">Jurisdictions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Smart Contracts</span>
              </CardTitle>
              <CardDescription>Automated contract execution and management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Smart Contract Management</h3>
                <p className="text-muted-foreground mb-4">
                  Deploy and manage smart contracts for automated legal processes
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Deploy Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Document Verification</span>
              </CardTitle>
              <CardDescription>Verify authenticity of blockchain-stored documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Cryptographic Verification</h3>
                <p className="text-muted-foreground mb-4">
                  Verify document authenticity using blockchain cryptographic proofs
                </p>
                <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
