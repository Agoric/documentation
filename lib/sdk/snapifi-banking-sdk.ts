// Snapifi Banking SDK for Third-Party Integrations

export interface SnapifiBankingSDKConfig {
  baseUrl: string
  apiKey: string
  clientId: string
  clientSecret: string
  environment: "sandbox" | "production"
  timeout?: number
  retryConfig?: {
    maxRetries: number
    retryDelay: number
    retryCondition?: (error: any) => boolean
  }
}

export class SnapifiBankingSDK {
  private config: SnapifiBankingSDKConfig
  private accessToken?: string
  private tokenExpiry?: number

  constructor(config: SnapifiBankingSDKConfig) {
    this.config = {
      timeout: 30000,
      retryConfig: {
        maxRetries: 3,
        retryDelay: 1000,
        retryCondition: (error) => error.status >= 500,
      },
      ...config,
    }
  }

  // Authentication
  async authenticate(): Promise<void> {
    const response = await this.makeRequest("POST", "/auth/token", {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      grant_type: "client_credentials",
    })

    this.accessToken = response.access_token
    this.tokenExpiry = Date.now() + response.expires_in * 1000
  }

  private async ensureAuthenticated(): Promise<void> {
    if (!this.accessToken || (this.tokenExpiry && Date.now() >= this.tokenExpiry)) {
      await this.authenticate()
    }
  }

  // Account Management
  async createAccount(accountData: any): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("POST", "/v1/accounts", accountData, {
      "Idempotency-Key": `create_account_${Date.now()}_${Math.random()}`,
    })
  }

  async getAccount(accountId: string): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("GET", `/v1/accounts/${accountId}`)
  }

  async listAccounts(filters?: any): Promise<any> {
    await this.ensureAuthenticated()
    const queryParams = new URLSearchParams(filters).toString()
    return this.makeRequest("GET", `/v1/accounts${queryParams ? `?${queryParams}` : ""}`)
  }

  async updateAccount(accountId: string, updates: any): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("PUT", `/v1/accounts/${accountId}`, updates)
  }

  async closeAccount(accountId: string): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("DELETE", `/v1/accounts/${accountId}`)
  }

  // Transaction Management
  async createTransaction(accountId: string, transactionData: any): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("POST", `/v1/accounts/${accountId}/transactions`, {
      ...transactionData,
      idempotencyKey: `txn_${Date.now()}_${Math.random()}`,
    })
  }

  async getTransactions(accountId: string, filters?: any): Promise<any> {
    await this.ensureAuthenticated()
    const queryParams = new URLSearchParams(filters).toString()
    return this.makeRequest("GET", `/v1/accounts/${accountId}/transactions${queryParams ? `?${queryParams}` : ""}`)
  }

  async getTransaction(accountId: string, transactionId: string): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("GET", `/v1/accounts/${accountId}/transactions/${transactionId}`)
  }

  // Transfer Services
  async createTransfer(transferData: any): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("POST", "/v1/transfers", {
      ...transferData,
      idempotencyKey: `xfer_${Date.now()}_${Math.random()}`,
    })
  }

  async getTransfer(transferId: string): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("GET", `/v1/transfers/${transferId}`)
  }

  async listTransfers(filters?: any): Promise<any> {
    await this.ensureAuthenticated()
    const queryParams = new URLSearchParams(filters).toString()
    return this.makeRequest("GET", `/v1/transfers${queryParams ? `?${queryParams}` : ""}`)
  }

  // Balance and Statements
  async getBalance(accountId: string): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("GET", `/v1/accounts/${accountId}/balance`)
  }

  async generateStatement(accountId: string, startDate: string, endDate: string, format = "pdf"): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("POST", `/v1/accounts/${accountId}/statements`, {
      startDate,
      endDate,
      format,
    })
  }

  // Webhook Management
  async createWebhook(webhookData: any): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("POST", "/v1/webhooks", webhookData)
  }

  async listWebhooks(): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("GET", "/v1/webhooks")
  }

  async updateWebhook(webhookId: string, updates: any): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("PUT", `/v1/webhooks/${webhookId}`, updates)
  }

  async deleteWebhook(webhookId: string): Promise<any> {
    await this.ensureAuthenticated()
    return this.makeRequest("DELETE", `/v1/webhooks/${webhookId}`)
  }

  // Utility Methods
  async validateWebhookSignature(payload: string, signature: string, secret: string): Promise<boolean> {
    const crypto = await import("crypto")
    const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex")
    const providedSignature = signature.replace("sha256=", "")
    return expectedSignature === providedSignature
  }

  // Private HTTP Client
  private async makeRequest(
    method: string,
    endpoint: string,
    data?: any,
    headers?: Record<string, string>,
  ): Promise<any> {
    const url = `${this.config.baseUrl}/api/banking${endpoint}`

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "X-API-Key": this.config.apiKey,
      "User-Agent": `SnapifiBankingSDK/1.0.0`,
      ...headers,
    }

    if (this.accessToken) {
      requestHeaders["Authorization"] = `Bearer ${this.accessToken}`
    }

    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
      signal: AbortSignal.timeout(this.config.timeout!),
    }

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      requestConfig.body = JSON.stringify(data)
    }

    let lastError: any
    let attempt = 0

    while (attempt <= this.config.retryConfig!.maxRetries) {
      try {
        const response = await fetch(url, requestConfig)
        const responseData = await response.json()

        if (!response.ok) {
          const error = new Error(responseData.error?.message || "API request failed")
          ;(error as any).status = response.status
          ;(error as any).response = responseData
          throw error
        }

        return responseData.data || responseData
      } catch (error) {
        lastError = error
        attempt++

        if (
          attempt <= this.config.retryConfig!.maxRetries &&
          this.config.retryConfig!.retryCondition &&
          this.config.retryConfig!.retryCondition(error)
        ) {
          const delay = this.config.retryConfig!.retryDelay * Math.pow(2, attempt - 1)
          await new Promise((resolve) => setTimeout(resolve, delay))
          continue
        }

        break
      }
    }

    throw lastError
  }
}

// SDK Factory Functions
export function createSnapifiBankingSDK(config: SnapifiBankingSDKConfig): SnapifiBankingSDK {
  return new SnapifiBankingSDK(config)
}

// Type-safe SDK wrapper
export class TypedSnapifiBankingSDK extends SnapifiBankingSDK {
  async createAccount(accountData: CreateAccountRequest): Promise<AccountResponse> {
    return super.createAccount(accountData)
  }

  async getAccount(accountId: string): Promise<AccountResponse> {
    return super.getAccount(accountId)
  }

  async createTransaction(accountId: string, transactionData: TransactionRequest): Promise<TransactionResponse> {
    return super.createTransaction(accountId, transactionData)
  }

  async createTransfer(transferData: TransferRequest): Promise<TransferResponse> {
    return super.createTransfer(transferData)
  }

  async getBalance(accountId: string): Promise<BalanceResponse> {
    return super.getBalance(accountId)
  }
}

// Import types for TypeScript users
import type {
  CreateAccountRequest,
  AccountResponse,
  TransactionRequest,
  TransactionResponse,
  TransferRequest,
  TransferResponse,
  BalanceResponse,
} from "../api/banking-api-types"
