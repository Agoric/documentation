"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Webhook, Play, Pause, RotateCcw, CheckCircle, XCircle, Clock, Zap } from "lucide-react"

interface WebhookEvent {
  id: string
  eventType: string
  timestamp: string
  status: "sent" | "delivered" | "failed" | "retrying"
  payload: any
  attempts: number
  nextRetry?: string
}

export function WebhookSimulator() {
  const [webhookUrl, setWebhookUrl] = useState("https://your-app.com/webhooks/banking")
  const [isActive, setIsActive] = useState(false)
  const [events, setEvents] = useState<WebhookEvent[]>([])
  const [stats, setStats] = useState({
    totalSent: 0,
    delivered: 0,
    failed: 0,
    pending: 0,
  })

  // Simulate webhook events
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(
      () => {
        const eventTypes = [
          "account.created",
          "account.updated",
          "transaction.completed",
          "transaction.failed",
          "transfer.completed",
          "transfer.failed",
        ]

        const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const newEvent: WebhookEvent = {
          id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          eventType: randomEventType,
          timestamp: new Date().toISOString(),
          status: Math.random() > 0.1 ? "delivered" : "failed",
          attempts: 1,
          payload: generateEventPayload(randomEventType),
        }

        setEvents((prev) => [newEvent, ...prev.slice(0, 49)]) // Keep last 50 events

        // Update stats
        setStats((prev) => ({
          totalSent: prev.totalSent + 1,
          delivered: newEvent.status === "delivered" ? prev.delivered + 1 : prev.delivered,
          failed: newEvent.status === "failed" ? prev.failed + 1 : prev.failed,
          pending: prev.pending,
        }))
      },
      2000 + Math.random() * 3000,
    ) // Random interval between 2-5 seconds

    return () => clearInterval(interval)
  }, [isActive])

  const generateEventPayload = (eventType: string) => {
    const basePayload = {
      eventId: `evt_${Date.now()}`,
      eventType,
      timestamp: new Date().toISOString(),
      signature: "sha256=demo_signature_hash",
    }

    switch (eventType) {
      case "account.created":
        return {
          ...basePayload,
          data: {
            accountId: `acc_${Date.now()}`,
            accountType: "checking",
            holderType: "individual",
            status: "active",
          },
        }
      case "transaction.completed":
        return {
          ...basePayload,
          data: {
            transactionId: `txn_${Date.now()}`,
            accountId: `acc_${Math.floor(Math.random() * 1000)}`,
            type: "deposit",
            amount: Math.floor(Math.random() * 1000) + 100,
            status: "completed",
          },
        }
      case "transfer.completed":
        return {
          ...basePayload,
          data: {
            transferId: `xfer_${Date.now()}`,
            fromAccountId: `acc_${Math.floor(Math.random() * 1000)}`,
            toAccountId: `acc_${Math.floor(Math.random() * 1000)}`,
            amount: Math.floor(Math.random() * 500) + 50,
            status: "completed",
          },
        }
      default:
        return {
          ...basePayload,
          data: {
            id: `obj_${Date.now()}`,
            status: "updated",
          },
        }
    }
  }

  const toggleSimulator = () => {
    setIsActive(!isActive)
  }

  const resetSimulator = () => {
    setIsActive(false)
    setEvents([])
    setStats({
      totalSent: 0,
      delivered: 0,
      failed: 0,
      pending: 0,
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "retrying":
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "retrying":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="w-5 h-5" />
            Webhook Simulator
          </CardTitle>
          <CardDescription>Simulate real-time webhook events from the Snapifi Banking API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook Endpoint URL</Label>
            <Input
              id="webhookUrl"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-app.com/webhooks/banking"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={toggleSimulator} variant={isActive ? "destructive" : "default"} className="flex-1">
              {isActive ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Simulation
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Simulation
                </>
              )}
            </Button>
            <Button onClick={resetSimulator} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold">{stats.totalSent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-2xl font-bold">{stats.delivered}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold">{stats.failed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">
                  {stats.totalSent > 0 ? Math.round((stats.delivered / stats.totalSent) * 100) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Webhook Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Webhook Events</CardTitle>
          <CardDescription>Live stream of webhook events being sent to your endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <ScrollArea className="h-96 w-full">
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={event.id}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">{getStatusIcon(event.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{event.eventType}</Badge>
                          <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <pre className="bg-gray-50 p-3 rounded text-xs font-mono overflow-x-auto">
                          {JSON.stringify(event.payload, null, 2)}
                        </pre>
                      </div>
                    </div>
                    {index < events.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Webhook className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start the simulation to see webhook events</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
