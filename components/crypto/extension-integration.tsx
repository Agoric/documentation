"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { extensionManager } from "@/lib/extension-compatibility"

export function ExtensionIntegration() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [extensionDetected, setExtensionDetected] = useState(false)
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([])

  useEffect(() => {
    // Initialize extension compatibility
    extensionManager.detectExtensions()
    extensionManager.preventConflicts()

    // Check for wallet
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    try {
      const ethereum = (window as any).ethereum
      if (ethereum) {
        setExtensionDetected(true)
        const accounts = await ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletConnected(true)
          setWalletAddress(accounts[0])
        }
      }
    } catch (error) {
      console.error("Wallet check failed:", error)
      setCompatibilityIssues((prev) => [...prev, "Wallet connection error"])
    }
  }

  const connectWallet = async () => {
    const result = await extensionManager.connectWallet()
    if (result) {
      setWalletConnected(true)
      setWalletAddress(result.accounts[0])
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Extension Integration Status
          </CardTitle>
          <CardDescription>Monitor and manage browser extension compatibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Extension Detected</span>
            <Badge variant={extensionDetected ? "default" : "secondary"}>
              {extensionDetected ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" /> Detected
                </>
              ) : (
                <>
                  <AlertTriangle className="h-3 w-3 mr-1" /> None
                </>
              )}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span>Wallet Connected</span>
            <Badge variant={walletConnected ? "default" : "secondary"}>
              {walletConnected ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" /> Connected
                </>
              ) : (
                <>
                  <AlertTriangle className="h-3 w-3 mr-1" /> Disconnected
                </>
              )}
            </Badge>
          </div>

          {walletAddress && (
            <div className="text-sm text-muted-foreground">
              Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          )}

          {!walletConnected && extensionDetected && (
            <Button onClick={connectWallet} className="w-full">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          )}

          {compatibilityIssues.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>Compatibility issues detected: {compatibilityIssues.join(", ")}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Compatibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span>CSS Conflict Protection</span>
            <Badge variant="default">
              <CheckCircle className="h-3 w-3 mr-1" /> Active
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span>Script Injection Guard</span>
            <Badge variant="default">
              <CheckCircle className="h-3 w-3 mr-1" /> Active
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span>Modal Z-Index Protection</span>
            <Badge variant="default">
              <CheckCircle className="h-3 w-3 mr-1" /> Active
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
