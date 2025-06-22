// Snapifi Banking API Types and Schemas

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: APIError
  timestamp: string
  requestId: string
  version: string
}

export interface APIError {
  code: string
  message: string
  details?: Record<string, any>
  field?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Authentication Types
export interface APICredentials {
  clientId: string
  clientSecret: string
  apiKey: string
  environment: "sandbox" | "production"
}

export interface APIToken {
  accessToken: string
  tokenType: "Bearer"
  expiresIn: number
  refreshToken: string
  scope: string[]
}

export interface WebhookConfig {
  webhookId: string
  url: string
  events: WebhookEvent[]
  secret: string
  status: "active" | "inactive" | "failed"
  retryPolicy: RetryPolicy
}

export interface WebhookEvent {
  eventType: string
  description: string
  schema: Record<string, any>
}

export interface RetryPolicy {
  maxRetries: number
  retryDelay: number
  backoffMultiplier: number
}

// API Request/Response Types
export interface CreateAccountRequest {
  holderInfo: {
    holderId: string
    holderType: "individual" | "business" | "institutional" | "vendor"
    holderName: string
    email: string
    phone: string
    address: AddressInfo
    taxId?: string
    businessInfo?: BusinessInfo
  }
  accountType: "checking" | "savings" | "business_checking" | "investment"
  initialDeposit?: number
  features?: AccountFeatureRequest[]
}

export interface AddressInfo {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface BusinessInfo {
  businessName: string
  businessType: string
  incorporationDate: string
  businessAddress: AddressInfo
  annualRevenue: number
  employeeCount: number
}

export interface AccountFeatureRequest {
  feature: string
  enabled: boolean
  configuration?: Record<string, any>
}

export interface TransactionRequest {
  accountId: string
  type: "deposit" | "withdrawal" | "transfer" | "payment"
  amount: number
  currency: string
  description: string
  category?: string
  merchant?: string
  metadata?: Record<string, any>
  idempotencyKey: string
}

export interface TransferRequest {
  fromAccountId: string
  toAccountId?: string
  externalAccount?: ExternalAccountInfo
  amount: number
  currency: string
  description: string
  transferType: "internal" | "ach" | "wire" | "international"
  metadata?: Record<string, any>
  idempotencyKey: string
}

export interface ExternalAccountInfo {
  bankName: string
  accountNumber: string
  routingNumber: string
  accountHolderName: string
  bankAddress?: AddressInfo
  swiftCode?: string
}

export interface BalanceInquiryRequest {
  accountId: string
  includeAvailable?: boolean
  includePending?: boolean
}

export interface TransactionHistoryRequest {
  accountId: string
  startDate?: string
  endDate?: string
  type?: string
  category?: string
  status?: string
  minAmount?: number
  maxAmount?: number
  page?: number
  limit?: number
}

export interface StatementRequest {
  accountId: string
  startDate: string
  endDate: string
  format: "pdf" | "csv" | "json"
}

// API Response Types
export interface AccountResponse {
  accountId: string
  accountNumber: string
  routingNumber: string
  accountType: string
  accountStatus: string
  holderInfo: {
    holderId: string
    holderType: string
    holderName: string
  }
  balance: number
  availableBalance: number
  currency: string
  openDate: string
  features: string[]
  limits: AccountLimitsResponse
}

export interface AccountLimitsResponse {
  dailyWithdrawalLimit: number
  dailyTransferLimit: number
  monthlyTransactionLimit: number
  wireTransferLimit: number
}

export interface TransactionResponse {
  transactionId: string
  accountId: string
  type: string
  amount: number
  currency: string
  description: string
  category: string
  status: string
  date: string
  balance: number
  fees: FeeResponse[]
  metadata?: Record<string, any>
}

export interface FeeResponse {
  feeType: string
  amount: number
  description: string
}

export interface BalanceResponse {
  accountId: string
  balance: number
  availableBalance: number
  pendingBalance: number
  currency: string
  lastUpdated: string
}

export interface TransferResponse {
  transferId: string
  fromAccountId: string
  toAccountId?: string
  amount: number
  currency: string
  status: string
  transferType: string
  estimatedCompletion: string
  fees: FeeResponse[]
  trackingNumber?: string
}

// Webhook Payload Types
export interface WebhookPayload {
  eventId: string
  eventType: string
  timestamp: string
  data: Record<string, any>
  signature: string
}

export interface AccountWebhookPayload extends WebhookPayload {
  eventType: "account.created" | "account.updated" | "account.closed" | "account.frozen"
  data: {
    accountId: string
    accountStatus: string
    changes?: Record<string, any>
  }
}

export interface TransactionWebhookPayload extends WebhookPayload {
  eventType: "transaction.created" | "transaction.completed" | "transaction.failed" | "transaction.cancelled"
  data: {
    transactionId: string
    accountId: string
    amount: number
    status: string
    type: string
  }
}

export interface TransferWebhookPayload extends WebhookPayload {
  eventType: "transfer.initiated" | "transfer.completed" | "transfer.failed" | "transfer.cancelled"
  data: {
    transferId: string
    fromAccountId: string
    toAccountId?: string
    amount: number
    status: string
    transferType: string
  }
}

// Rate Limiting Types
export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  skipSuccessfulRequests: boolean
  skipFailedRequests: boolean
  keyGenerator: (req: any) => string
}

export interface RateLimitResponse {
  limit: number
  remaining: number
  reset: number
  retryAfter?: number
}

// API Documentation Types
export interface APIEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  description: string
  parameters: APIParameter[]
  requestBody?: APISchema
  responses: Record<string, APIResponse>
  examples: APIExample[]
  authentication: string[]
  rateLimit: RateLimitConfig
}

export interface APIParameter {
  name: string
  in: "path" | "query" | "header" | "body"
  required: boolean
  type: string
  description: string
  example?: any
}

export interface APISchema {
  type: string
  properties: Record<string, APIProperty>
  required: string[]
}

export interface APIProperty {
  type: string
  description: string
  example?: any
  enum?: string[]
  format?: string
}

export interface APIExample {
  name: string
  description: string
  request: any
  response: any
}

// SDK Types
export interface SDKConfig {
  baseUrl: string
  apiKey: string
  clientId: string
  clientSecret: string
  environment: "sandbox" | "production"
  timeout: number
  retryConfig: RetryConfig
}

export interface RetryConfig {
  maxRetries: number
  retryDelay: number
  retryCondition: (error: any) => boolean
}

// Compliance and Audit Types
export interface APIAuditLog {
  logId: string
  timestamp: string
  clientId: string
  endpoint: string
  method: string
  requestId: string
  responseStatus: number
  responseTime: number
  ipAddress: string
  userAgent: string
  requestSize: number
  responseSize: number
  errors?: string[]
}

export interface ComplianceReport {
  reportId: string
  clientId: string
  reportType: string
  period: {
    startDate: string
    endDate: string
  }
  summary: {
    totalRequests: number
    successfulRequests: number
    failedRequests: number
    averageResponseTime: number
  }
  details: APIAuditLog[]
  generatedAt: string
}
