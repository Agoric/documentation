"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Copy, Download, Code, Database, Clock } from "lucide-react"

interface PlaygroundProps {
  onExecute?: (endpoint: string, method: string, body?: string) => Promise<any>
}

export function APIPlayground({ onExecute }: PlaygroundProps) {
  const [selectedMethod, setSelectedMethod] = useState("GET")
  const [selectedEndpoint, setSelectedEndpoint] = useState("/v1/accounts")
  const [requestHeaders, setRequestHeaders] = useState(
    '{\n  "X-API-Key": "sk_test_demo_123456789",\n  "Content-Type": "application/json"\n}',
  )
  const [requestBody, setRequestBody] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const endpoints = [
    { value: "/v1/accounts", label: "List Accounts", method: "GET" },
    { value: "/v1/accounts", label: "Create Account", method: "POST" },
    { value: "/v1/accounts/{id}", label: "Get Account", method: "GET" },
    { value: "/v1/accounts/{id}/transactions", label: "List Transactions", method: "GET" },
    { value: "/v1/accounts/{id}/transactions", label: "Create Transaction", method: "POST" },
    { value: "/v1/transfers", label: "Create Transfer", method: "POST" },
    { value: "/v1/webhooks", label: "List Webhooks", method: "GET" },
    { value: "/v1/webhooks", label: "Create Webhook", method: "POST" },
  ]

  const sampleBodies = {
    "POST /v1/accounts": JSON.stringify(
      {
        holderInfo: {
          holderId: "user_123",
          holderType: "individual",
          holderName: "John Doe",
          email: "john@example.com",
          phone: "+1-555-0123",
          address: {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            postalCode: "12345",
            country: "US",
          },
        },
        accountType: "checking",
        initialDeposit: 1000.0,
      },
      null,
      2,
    ),
    "POST /v1/accounts/{id}/transactions": JSON.stringify(
      {
        type: "deposit",
        amount: 500.0,
        currency: "USD",
        description: "Demo deposit",
        category: "Income",
        idempotencyKey: "demo_txn_" + Date.now(),
      },
      null,
      2,
    ),
    "POST /v1/transfers": JSON.stringify(
      {
        fromAccountId: "acc_individual_001",
        toAccountId: "acc_individual_002",
        amount: 250.0,
        currency: "USD",
        description: "Demo transfer",
        transferType: "internal",
        idempotencyKey: "demo_xfer_" + Date.now(),
      },
      null,
      2,
    ),
    "POST /v1/webhooks": JSON.stringify(
      {
        url: "https://your-app.com/webhooks/banking",
        events: [
          {
            eventType: "account.created",
            description: "Account created",
          },
          {
            eventType: "transaction.completed",
            description: "Transaction completed",
          },
        ],
      },
      null,
      2,
    ),
  }

  const handleEndpointChange = (value: string) => {
    const endpoint = endpoints.find((e) => e.value === value)
    if (endpoint) {
      setSelectedEndpoint(value)
      setSelectedMethod(endpoint.method)

      const key = `${endpoint.method} ${value}`
      if (sampleBodies[key as keyof typeof sampleBodies]) {
        setRequestBody(sampleBodies[key as keyof typeof sampleBodies])
      } else {
        setRequestBody("")
      }
    }
  }

  const executeRequest = async () => {
    setLoading(true)

    try {
      if (onExecute) {
        const result = await onExecute(selectedEndpoint, selectedMethod, requestBody)
        setResponse(result)
      } else {
        // Mock response for demo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setResponse({
          success: true,
          data: { message: "Demo response" },
          timestamp: new Date().toISOString(),
          requestId: "req_demo_" + Date.now(),
          version: "1.0.0",
        })
      }
    } catch (error) {
      setResponse({
        success: false,
        error: { code: "DEMO_ERROR", message: "Demo error response" },
        timestamp: new Date().toISOString(),
        requestId: "req_demo_" + Date.now(),
        version: "1.0.0",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadResponse = () => {
    if (response) {
      const blob = new Blob([JSON.stringify(response, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "api-response.json"
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Request Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            API Request Builder
          </CardTitle>
          <CardDescription>Build and customize your API requests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Method and Endpoint */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <Label>Method</Label>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Endpoint</Label>
              <Select value={selectedEndpoint} onValueChange={handleEndpointChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {endpoints.map((endpoint) => (
                    <SelectItem key={`${endpoint.method}-${endpoint.value}`} value={endpoint.value}>
                      {endpoint.method} {endpoint.value} - {endpoint.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Headers */}
          <div className="space-y-2">
            <Label>Headers</Label>
            <Textarea
              value={requestHeaders}
              onChange={(e) => setRequestHeaders(e.target.value)}
              rows={4}
              className="font-mono text-sm"
            />
          </div>

          {/* Request Body */}
          {(selectedMethod === "POST" || selectedMethod === "PUT") && (
            <div className="space-y-2">
              <Label>Request Body</Label>
              <Textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                rows={12}
                className="font-mono text-sm"
                placeholder="Enter JSON request body..."
              />
            </div>
          )}

          {/* Execute Button */}
          <Button onClick={executeRequest} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Send Request
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Response Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            API Response
          </CardTitle>
          <CardDescription>Response from the API endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          {response ? (
            <Tabs defaultValue="response" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>

              <TabsContent value="response" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={response.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {response.success ? "Success" : "Error"}
                  </Badge>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResponse}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-96 w-full">
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="headers" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono space-y-1">
                  <div>Status: {response.success ? "200 OK" : "400 Bad Request"}</div>
                  <div>Content-Type: application/json</div>
                  <div>X-Request-ID: {response.requestId}</div>
                  <div>X-API-Version: {response.version}</div>
                  <div>X-RateLimit-Limit: 100</div>
                  <div>X-RateLimit-Remaining: 99</div>
                </div>
              </TabsContent>

              <TabsContent value="curl" className="space-y-4">
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {`curl -X ${selectedMethod} https://api.snapifi.com/api/banking${selectedEndpoint} \\
  -H "X-API-Key: sk_test_demo_123456789" \\
  -H "Content-Type: application/json"${
    requestBody
      ? ` \\
  -d '${requestBody.replace(/\n/g, "\\n").replace(/'/g, "\\'")}'`
      : ""
  }`}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(`curl -X ${selectedMethod} https://api.snapifi.com/api/banking${selectedEndpoint} \\
  -H "X-API-Key: sk_test_demo_123456789" \\
  -H "Content-Type: application/json"${
    requestBody
      ? ` \\
  -d '${requestBody.replace(/\n/g, "\\n").replace(/'/g, "\\'")}'`
      : ""
  }`)
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Send a request to see the response</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
