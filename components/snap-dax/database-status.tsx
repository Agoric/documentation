"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Loader2 } from "lucide-react"

export function DatabaseStatus() {
  const [status, setStatus] = useState<"idle" | "testing" | "setting-up">("idle")
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setStatus("testing")
    setError(null)

    try {
      const response = await fetch("/api/snap-dax/database-setup?action=test", {
        method: "POST",
      })
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection test failed")
    } finally {
      setStatus("idle")
    }
  }

  const setupDatabase = async () => {
    setStatus("setting-up")
    setError(null)

    try {
      const response = await fetch("/api/snap-dax/database-setup?action=setup", {
        method: "POST",
      })
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Database setup failed")
    } finally {
      setStatus("idle")
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          SNAP DAX Database Status
        </CardTitle>
        <CardDescription>Check database connectivity and setup SNAP DAX tables</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={testConnection} disabled={status !== "idle"} variant="outline">
            {status === "testing" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Test Connection
          </Button>
          <Button onClick={setupDatabase} disabled={status !== "idle"}>
            {status === "setting-up" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Setup Database
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <XCircle className="h-4 w-4" />
              <span className="font-medium">Error</span>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        )}

        {results && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Success</span>
            </div>
            <p className="text-green-600 mb-3">{results.message}</p>

            {results.environment && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Database Connections:</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant={results.environment.hasNeonUrl ? "default" : "secondary"}>
                    Neon: {results.environment.hasNeonUrl ? "Available" : "Not configured"}
                  </Badge>
                  <Badge variant={results.environment.hasPostgresUrl ? "default" : "secondary"}>
                    Postgres: {results.environment.hasPostgresUrl ? "Available" : "Not configured"}
                  </Badge>
                  <Badge variant={results.environment.hasSupabaseUrl ? "default" : "secondary"}>
                    Supabase: {results.environment.hasSupabaseUrl ? "Available" : "Not configured"}
                  </Badge>
                </div>
              </div>
            )}

            {results.tables && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">Tables Created:</p>
                <div className="flex gap-1 flex-wrap mt-1">
                  {results.tables.map((table: string) => (
                    <Badge key={table} variant="outline" className="text-xs">
                      {table}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p className="font-medium mb-1">Troubleshooting:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Make sure your database environment variables are set correctly</li>
            <li>Check that your database service is running and accessible</li>
            <li>Verify your database credentials and permissions</li>
            <li>Try the simplified SQL script if the full setup fails</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
