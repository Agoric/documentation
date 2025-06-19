"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Copy,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  CreditCard,
  ArrowUpDown,
  Webhook,
  Key,
  Activity,
  BarChart3,
  Shield,
} from "lucide-react"

interface APIResponse {
  success: boolean
  data?: any
  error?: any
  timestamp: string
  requestId: string
  version: string
  responseTime?: number
}

interface DemoStats {
  totalAccounts: number
  totalTransactions: number
  totalTransfers: number
  totalVolume: number
  activeWebhooks: number
  apiCalls: number
}

export default function BankingAPIDemoPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("accounts")
  const [apiKey, setApiKey] = useState("sk_test_demo_123456789")
  const [requestBody, setRequestBody] = useState("")
  const [response, setResponse] = useState<APIResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [demoStats, setDemoStats] = useState<DemoStats>({
    totalAccounts: 0,
    totalTransactions: 0,
    totalTransfers: 0,
    totalVolume: 0,
    activeWebhooks: 0,
    apiCalls: 0,
  })

  // Demo data
  const endpoints = {
    accounts: {
      method: "GET",
      path: "/api/banking/v1/accounts",
      description: "List all bank accounts",
      sampleRequest: "",
      sampleResponse: {
        success: true,
        data: {
          accounts: [
            {
              accountId: "acc_individual_001",
              accountNumber: "1234567890",
              routingNumber: "021000021",
              accountType: "checking",
              accountStatus: "active",
              holderInfo: {
                holderId: "citizen_001",
                holderType: "individual",
                holderName: "Global Citizen Alpha",
              },
              balance: 25000.0,
              availableBalance: 24500.0,
              currency: "USD",
              openDate: "2024-01-15T00:00:00Z",
              features: ["onlinebanking", "mobilebanking", "billPay", "wireTransfers"],
            },
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1,
            hasNext: false,
            hasPrev: false,
          },
        },
        timestamp: new Date().toISOString(),
        requestId: "req_demo_001",
        version: "1.0.0",
      },
    },
    createAccount: {
      method: "POST",
      path: "/api/banking/v1/accounts",
      description: "Create a new bank account",
      sampleRequest: JSON.stringify(
        {
          holderInfo: {
            holderId: "citizen_002",
            holderType: "individual",
            holderName: "Demo User",
            email: "demo@example.com",
            phone: "+1-555-0123",
            address: {
              street: "123 Demo Street",
              city: "Demo City",
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
      sampleResponse: {
        success: true,
        data: {
          accountId: "acc_individual_002",
          accountNumber: "9876543210",
          routingNumber: "021000021",
          accountType: "checking",
          accountStatus: "active",
          holderInfo: {
            holderId: "citizen_002",
            holderType: "individual",
            holderName: "Demo User",
          },
          balance: 1000.0,
          availableBalance: 1000.0,
          currency: "USD",
          openDate: new Date().toISOString(),
          features: ["onlinebanking", "mobilebanking", "billPay"],
        },
        timestamp: new Date().toISOString(),
        requestId: "req_demo_002",
        version: "1.0.0",
      },
    },
    transactions: {
      method: "GET",
      path: "/api/banking/v1/accounts/acc_individual_001/transactions",
      description: "Get transaction history for an account",
      sampleRequest: "",
      sampleResponse: {
        success: true,
        data: {
          transactions: [
            {
              transactionId: "txn_001",
              accountId: "acc_individual_001",
              type: "deposit",
              amount: 1000.0,
              currency: "USD",
              description: "Direct deposit",
              category: "Income",
              status: "completed",
              date: new Date().toISOString(),
              balance: 26000.0,
              fees: [],
            },
            {
              transactionId: "txn_002",
              accountId: "acc_individual_001",
              type: "withdrawal",
              amount: 500.0,
              currency: "USD",
              description: "ATM withdrawal",
              category: "Cash",
              status: "completed",
              date: new Date(Date.now() - 86400000).toISOString(),
              balance: 25500.0,
              fees: [
                {
                  feeType: "atm_fee",
                  amount: 2.5,
                  description: "ATM usage fee",
                },
              ],
            },
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 2,
            totalPages: 1,
            hasNext: false,
            hasPrev: false,
          },
        },
        timestamp: new Date().toISOString(),
        requestId: "req_demo_003",
        version: "1.0.0",
      },
    },
    createTransaction: {
      method: "POST",
      path: "/api/banking/v1/accounts/acc_individual_001/transactions",
      description: "Create a new transaction",
      sampleRequest: JSON.stringify(
        {
          type: "deposit",
          amount: 500.0,
          currency: "USD",
          description: "Demo deposit",
          category: "Income",
          idempotencyKey: `demo_txn_${Date.now()}`,
        },
        null,
        2,
      ),
      sampleResponse: {
        success: true,
        data: {
          transactionId: "txn_demo_001",
          accountId: "acc_individual_001",
          type: "deposit",
          amount: 500.0,
          currency: "USD",
          description: "Demo deposit",
          category: "Income",
          status: "completed",
          date: new Date().toISOString(),
          balance: 25500.0,
          fees: [],
        },
        timestamp: new Date().toISOString(),
        requestId: "req_demo_004",
        version: "1.0.0",
      },
    },
    transfers: {
      method: "POST",
      path: "/api/banking/v1/transfers",
      description: "Create a transfer between accounts",
      sampleRequest: JSON.stringify(
        {
          fromAccountId: "acc_individual_001",
          toAccountId: "acc_individual_002",
          amount: 250.0,
          currency: "USD",
          description: "Demo transfer",
          transferType: "internal",
          idempotencyKey: `demo_xfer_${Date.now()}`,
        },
        null,
        2,
      ),
      sampleResponse: {
        success: true,
        data: {
          transferId: "xfer_demo_001",
          fromAccountId: "acc_individual_001",
          toAccountId: "acc_individual_002",
          amount: 250.0,
          currency: "USD",
          status: "processing",
          transferType: "internal",
          estimatedCompletion: new Date(Date.now() + 60000).toISOString(),
          fees: [],
          trackingNumber: "TRK123456789",
        },
        timestamp: new Date().toISOString(),
        requestId: "req_demo_005",
        version: "1.0.0",
      },
    },
    webhooks: {
      method: "POST",
      path: "/api/banking/v1/webhooks",
      description: "Create a webhook configuration",
      sampleRequest: JSON.stringify(
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
      sampleResponse: {
        success: true,
        data: {
          webhookId: "webhook_demo_001",
          url: "https://your-app.com/webhooks/banking",
          events: [
            {
              eventType: "account.created",
              description: "Account created",
              schema: {},
            },
            {
              eventType: "transaction.completed",
              description: "Transaction completed",
              schema: {},
            },
          ],
          secret: "whsec_demo_secret_key",
          status: "active",
          retryPolicy: {
            maxRetries: 3,
            retryDelay: 1000,
            backoffMultiplier: 2,
          },
        },
        timestamp: new Date().toISOString(),
        requestId: "req_demo_006",
        version: "1.0.0",
      },
    },
  }

  // Initialize demo stats
  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStats((prev) => ({
        totalAccounts: prev.totalAccounts + Math.floor(Math.random() * 2),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 5),
        totalTransfers: prev.totalTransfers + Math.floor(Math.random() * 3),
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 10000),
        activeWebhooks: Math.max(1, prev.activeWebhooks + Math.floor(Math.random() * 2) - 1),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 10),
      }))
    }, 3000)

    // Initial values
    setDemoStats({
      totalAccounts: 1247,
      totalTransactions: 8934,
      totalTransfers: 2156,
      totalVolume: 12450000,
      activeWebhooks: 23,
      apiCalls: 45678,
    })

    return () => clearInterval(timer)
  }, [])

  // Set initial request body when endpoint changes
  useEffect(() => {
    const endpoint = endpoints[selectedEndpoint as keyof typeof endpoints]
    setRequestBody(endpoint.sampleRequest)
  }, [selectedEndpoint])

  const executeAPICall = async () => {
    setLoading(true)
    const startTime = Date.now()

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const endpoint = endpoints[selectedEndpoint as keyof typeof endpoints]
    const responseTime = Date.now() - startTime

    // Simulate response
    const mockResponse: APIResponse = {
      ...endpoint.sampleResponse,
      responseTime,
      timestamp: new Date().toISOString(),
      requestId: `req_demo_${Date.now()}`,
    }

    setResponse(mockResponse)
    setLoading(false)

    // Update stats
    setDemoStats((prev) => ({
      ...prev,
      apiCalls: prev.apiCalls + 1,
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
      case "success":
        return "bg-green-100 text-green-800"
      case "processing":
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <Activity className="w-4 h-4" />
            Live Demo Environment
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Snapifi Banking REST API Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive demonstration of our comprehensive banking API. Test endpoints, explore responses, and see
            real-time integration examples.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Accounts</p>
                  <p className="text-2xl font-bold">{demoStats.totalAccounts.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Transactions</p>
                  <p className="text-2xl font-bold">{demoStats.totalTransactions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Transfers</p>
                  <p className="text-2xl font-bold">{demoStats.totalTransfers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Volume</p>
                  <p className="text-2xl font-bold">${(demoStats.totalVolume / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Webhook className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Webhooks</p>
                  <p className="text-2xl font-bold">{demoStats.activeWebhooks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">API Calls</p>
                  <p className="text-2xl font-bold">{demoStats.apiCalls.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Demo Interface */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* API Testing Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Testing Console
              </CardTitle>
              <CardDescription>Test API endpoints with live requests and responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* API Key */}
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                  />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(apiKey)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Endpoint Selection */}
              <div className="space-y-2">
                <Label htmlFor="endpoint">Endpoint</Label>
                <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accounts">GET /accounts - List Accounts</SelectItem>
                    <SelectItem value="createAccount">POST /accounts - Create Account</SelectItem>
                    <SelectItem value="transactions">GET /transactions - List Transactions</SelectItem>
                    <SelectItem value="createTransaction">POST /transactions - Create Transaction</SelectItem>
                    <SelectItem value="transfers">POST /transfers - Create Transfer</SelectItem>
                    <SelectItem value="webhooks">POST /webhooks - Create Webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Endpoint Info */}
              <Alert>
                <Shield className="w-4 h-4" />
                <AlertDescription>
                  <strong>{endpoints[selectedEndpoint as keyof typeof endpoints].method}</strong>{" "}
                  {endpoints[selectedEndpoint as keyof typeof endpoints].path}
                  <br />
                  {endpoints[selectedEndpoint as keyof typeof endpoints].description}
                </AlertDescription>
              </Alert>

              {/* Request Body */}
              {requestBody && (
                <div className="space-y-2">
                  <Label htmlFor="requestBody">Request Body</Label>
                  <Textarea
                    id="requestBody"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
              )}

              {/* Execute Button */}
              <Button onClick={executeAPICall} disabled={loading} className="w-full" size="lg">
                {loading ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Execute API Call
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Response Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                API Response
              </CardTitle>
              <CardDescription>Live response from the API endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              {response ? (
                <div className="space-y-4">
                  {/* Response Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {response.success ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <Badge className={response.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {response.success ? "Success" : "Error"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">{response.responseTime}ms</div>
                  </div>

                  {/* Response Headers */}
                  <div className="space-y-2">
                    <Label>Response Headers</Label>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm font-mono space-y-1">
                      <div>Status: {response.success ? "200 OK" : "400 Bad Request"}</div>
                      <div>Content-Type: application/json</div>
                      <div>X-Request-ID: {response.requestId}</div>
                      <div>X-API-Version: {response.version}</div>
                      <div>X-Response-Time: {response.responseTime}ms</div>
                    </div>
                  </div>

                  {/* Response Body */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Response Body</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <ScrollArea className="h-96 w-full">
                      <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </ScrollArea>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Execute an API call to see the response</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Code Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Examples</CardTitle>
            <CardDescription>Code samples for integrating with the Snapifi Banking API</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="sdk">SDK</TabsTrigger>
              </TabsList>

              <TabsContent value="javascript" className="space-y-4">
                <div className="space-y-2">
                  <Label>Node.js Example</Label>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {`const response = await fetch('https://api.snapifi.com/api/banking/v1/accounts', {
  method: 'GET',
  headers: {
    'X-API-Key': '${apiKey}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log('Accounts:', data.data.accounts);`}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(`const response = await fetch('https://api.snapifi.com/api/banking/v1/accounts', {
  method: 'GET',
  headers: {
    'X-API-Key': '${apiKey}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log('Accounts:', data.data.accounts);`)
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="python" className="space-y-4">
                <div className="space-y-2">
                  <Label>Python Example</Label>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {`import requests

response = requests.get(
    'https://api.snapifi.com/api/banking/v1/accounts',
    headers={
        'X-API-Key': '${apiKey}',
        'Content-Type': 'application/json'
    }
)

data = response.json()
print('Accounts:', data['data']['accounts'])`}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(`import requests

response = requests.get(
    'https://api.snapifi.com/api/banking/v1/accounts',
    headers={
        'X-API-Key': '${apiKey}',
        'Content-Type': 'application/json'
    }
)

data = response.json()
print('Accounts:', data['data']['accounts'])`)
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curl" className="space-y-4">
                <div className="space-y-2">
                  <Label>cURL Example</Label>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {`curl -X GET https://api.snapifi.com/api/banking/v1/accounts \\
  -H "X-API-Key: ${apiKey}" \\
  -H "Content-Type: application/json"`}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(`curl -X GET https://api.snapifi.com/api/banking/v1/accounts \\
  -H "X-API-Key: ${apiKey}" \\
  -H "Content-Type: application/json"`)
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sdk" className="space-y-4">
                <div className="space-y-2">
                  <Label>Snapifi SDK Example</Label>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {`import { SnapifiBankingSDK } from '@snapifi/banking-sdk';

const client = new SnapifiBankingSDK({
  baseUrl: 'https://api.snapifi.com',
  apiKey: '${apiKey}',
  environment: 'sandbox'
});

// List accounts
const accounts = await client.listAccounts();

// Create account
const newAccount = await client.createAccount({
  holderInfo: {
    holderId: 'user_123',
    holderType: 'individual',
    holderName: 'John Doe',
    email: 'john@example.com'
  },
  accountType: 'checking'
});`}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(`import { SnapifiBankingSDK } from '@snapifi/banking-sdk';

const client = new SnapifiBankingSDK({
  baseUrl: 'https://api.snapifi.com',
  apiKey: '${apiKey}',
  environment: 'sandbox'
});

// List accounts
const accounts = await client.listAccounts();

// Create account
const newAccount = await client.createAccount({
  holderInfo: {
    holderId: 'user_123',
    holderType: 'individual',
    holderName: 'John Doe',
    email: 'john@example.com'
  },
  accountType: 'checking'
});`)
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-4">
              Sign up for a free developer account and start integrating with Snapifi Banking API today.
            </p>
            <div className="flex justify-center gap-4">
              <Button>Get API Keys</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
