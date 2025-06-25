"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Database, Loader2, AlertTriangle, Rocket } from "lucide-react"

interface SetupResult {
  table: string
  status: "created" | "error" | "inserted"
  error: string | null
}

export function SetupWizard() {
  const [status, setStatus] = useState<"idle" | "testing" | "setting-up">("idle")
  const [connectionStatus, setConnectionStatus] = useState<any>(null)
  const [setupResults, setSetupResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setStatus("testing")
    setError(null)

    try {
      const response = await fetch("/api/snap-dax/setup")
      const data = await response.json()
      setConnectionStatus(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection test failed")
    } finally {
      setStatus("idle")
    }
  }

  const runSetup = async () => {
    setStatus("setting-up")
    setError(null)

    try {
      const response = await fetch("/api/snap-dax/setup", {
        method: "POST",
      })
      const data = await response.json()

      if (data.success) {
        setSetupResults(data)
      } else {
        setError(data.error || "Setup failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Setup failed")
    } finally {
      setStatus("idle")
    }
  }

  const getProgressValue = () => {
    if (!setupResults?.results) return 0
    const total = setupResults.results.length
    const completed = setupResults.results.filter((r: SetupResult) => r.status !== "error").length
    return (completed / total) * 100
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Rocket className="h-6 w-6 text-purple-600" />
            SnappAiFi DAX Setup Wizard
          </CardTitle>
          <CardDescription className="text-lg">
            Initialize your Digital Asset Exchange with QGI bonds and government program integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Test Connection */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="h-5 w-5" />
              Step 1: Test Database Connection
            </h3>
            <Button
              onClick={testConnection}
              disabled={status !== "idle"}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {status === "testing" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test Connection
            </Button>

            {connectionStatus && (
              <div
                className={`p-4 rounded-lg border ${
                  connectionStatus.status === "connected" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {connectionStatus.status === "connected" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="font-medium">
                    {connectionStatus.status === "connected" ? "Connected" : "Connection Failed"}
                  </span>
                </div>
                <p className="text-sm mt-1">{connectionStatus.message}</p>
                {connectionStatus.current_time && (
                  <p className="text-xs text-gray-600 mt-1">
                    Database time: {new Date(connectionStatus.current_time).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Run Setup */}
          {connectionStatus?.status === "connected" && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Step 2: Initialize SNAP DAX
              </h3>
              <Button
                onClick={runSetup}
                disabled={status !== "idle"}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                {status === "setting-up" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Initialize Database
              </Button>

              {status === "setting-up" && (
                <div className="space-y-2">
                  <Progress value={33} className="w-full" />
                  <p className="text-sm text-gray-600">Setting up SNAP DAX tables and data...</p>
                </div>
              )}
            </div>
          )}

          {/* Setup Results */}
          {setupResults && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-700">Setup Complete!</h3>
              </div>

              <Progress value={getProgressValue()} className="w-full" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{setupResults.summary?.successful || 0}</div>
                    <div className="text-sm text-gray-600">Tables Created</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">$250K</div>
                    <div className="text-sm text-gray-600">QGI Bond Value</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">60x</div>
                    <div className="text-sm text-gray-600">Leverage Ratio</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Setup Details:</h4>
                <div className="space-y-1">
                  {setupResults.results?.map((result: SetupResult, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {result.status === "error" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span className="capitalize">{result.table.replace(/_/g, " ")}</span>
                      <Badge variant={result.status === "error" ? "destructive" : "default"}>{result.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Setup Error</span>
              </div>
              <p className="text-red-600 mt-1">{error}</p>
              <div className="mt-3 text-sm text-red-600">
                <p className="font-medium">Troubleshooting:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Check your NEON_NEON_NEON_DATABASE_URL environment variable</li>
                  <li>Verify your database is running and accessible</li>
                  <li>Ensure you have table creation permissions</li>
                  <li>Try refreshing and running the setup again</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
