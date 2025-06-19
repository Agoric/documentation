import type { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { createHmac } from "crypto"
import type { APIResponse, APIError, RateLimitConfig, APIAuditLog } from "./banking-api-types"

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export class BankingAPIMiddleware {
  private static instance: BankingAPIMiddleware
  private auditLogs: APIAuditLog[] = []

  static getInstance(): BankingAPIMiddleware {
    if (!BankingAPIMiddleware.instance) {
      BankingAPIMiddleware.instance = new BankingAPIMiddleware()
    }
    return BankingAPIMiddleware.instance
  }

  // Authentication Middleware
  async authenticateRequest(request: NextRequest): Promise<{ success: boolean; clientId?: string; error?: APIError }> {
    try {
      const authHeader = request.headers.get("Authorization")
      const apiKey = request.headers.get("X-API-Key")

      if (!authHeader && !apiKey) {
        return {
          success: false,
          error: {
            code: "MISSING_AUTHENTICATION",
            message: "Authentication required. Provide either Authorization header or X-API-Key.",
          },
        }
      }

      // API Key Authentication
      if (apiKey) {
        const clientId = await this.validateAPIKey(apiKey)
        if (!clientId) {
          return {
            success: false,
            error: {
              code: "INVALID_API_KEY",
              message: "Invalid API key provided.",
            },
          }
        }
        return { success: true, clientId }
      }

      // Bearer Token Authentication
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.substring(7)
        const clientId = await this.validateBearerToken(token)
        if (!clientId) {
          return {
            success: false,
            error: {
              code: "INVALID_TOKEN",
              message: "Invalid or expired bearer token.",
            },
          }
        }
        return { success: true, clientId }
      }

      return {
        success: false,
        error: {
          code: "INVALID_AUTHENTICATION",
          message: "Invalid authentication format.",
        },
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: "AUTHENTICATION_ERROR",
          message: "Authentication processing failed.",
        },
      }
    }
  }

  // Rate Limiting Middleware
  async checkRateLimit(
    request: NextRequest,
    config: RateLimitConfig,
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const key = config.keyGenerator(request)
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Clean up old entries
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k)
      }
    }

    const current = rateLimitStore.get(key)

    if (!current || current.resetTime < now) {
      // New window
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      })
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetTime: now + config.windowMs,
      }
    }

    if (current.count >= config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: current.resetTime,
      }
    }

    current.count++
    return {
      allowed: true,
      remaining: config.maxRequests - current.count,
      resetTime: current.resetTime,
    }
  }

  // Request Validation Middleware
  validateRequest(request: any, schema: any): { valid: boolean; errors?: APIError[] } {
    const errors: APIError[] = []

    // Basic validation logic (in production, use a proper validation library like Joi or Zod)
    if (schema.required) {
      for (const field of schema.required) {
        if (!request[field]) {
          errors.push({
            code: "MISSING_REQUIRED_FIELD",
            message: `Required field '${field}' is missing.`,
            field,
          })
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    }
  }

  // Idempotency Middleware
  private idempotencyStore = new Map<string, { response: any; timestamp: number }>()

  async checkIdempotency(idempotencyKey: string, clientId: string): Promise<{ exists: boolean; response?: any }> {
    const key = `${clientId}:${idempotencyKey}`
    const existing = this.idempotencyStore.get(key)

    if (existing && Date.now() - existing.timestamp < 24 * 60 * 60 * 1000) {
      // Return cached response if within 24 hours
      return { exists: true, response: existing.response }
    }

    return { exists: false }
  }

  async storeIdempotentResponse(idempotencyKey: string, clientId: string, response: any): Promise<void> {
    const key = `${clientId}:${idempotencyKey}`
    this.idempotencyStore.set(key, {
      response,
      timestamp: Date.now(),
    })
  }

  // Webhook Signature Validation
  validateWebhookSignature(payload: string, signature: string, secret: string): boolean {
    const expectedSignature = createHmac("sha256", secret).update(payload).digest("hex")
    const providedSignature = signature.replace("sha256=", "")
    return expectedSignature === providedSignature
  }

  // Audit Logging
  logAPIRequest(request: NextRequest, response: NextResponse, clientId: string, startTime: number): void {
    const endTime = Date.now()
    const log: APIAuditLog = {
      logId: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      clientId,
      endpoint: request.nextUrl.pathname,
      method: request.method,
      requestId: request.headers.get("X-Request-ID") || `req_${Date.now()}`,
      responseStatus: response.status,
      responseTime: endTime - startTime,
      ipAddress: request.headers.get("X-Forwarded-For") || request.headers.get("X-Real-IP") || "unknown",
      userAgent: request.headers.get("User-Agent") || "unknown",
      requestSize: Number.parseInt(request.headers.get("Content-Length") || "0"),
      responseSize: 0, // Would be calculated from response
    }

    this.auditLogs.push(log)

    // In production, send to logging service
    console.log("API Request Logged:", log)
  }

  // Error Response Helper
  createErrorResponse(error: APIError, requestId: string): APIResponse {
    return {
      success: false,
      error,
      timestamp: new Date().toISOString(),
      requestId,
      version: "1.0.0",
    }
  }

  // Success Response Helper
  createSuccessResponse<T>(data: T, requestId: string): APIResponse<T> {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
      requestId,
      version: "1.0.0",
    }
  }

  // Private helper methods
  private async validateAPIKey(apiKey: string): Promise<string | null> {
    // In production, validate against database
    const validKeys = {
      sk_test_123456789: "client_test_001",
      sk_live_987654321: "client_live_001",
    }

    return validKeys[apiKey as keyof typeof validKeys] || null
  }

  private async validateBearerToken(token: string): Promise<string | null> {
    try {
      // In production, use proper JWT validation with your secret
      const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key") as any
      return decoded.clientId || null
    } catch {
      return null
    }
  }

  // Compliance Helpers
  getAuditLogs(clientId?: string, startDate?: Date, endDate?: Date): APIAuditLog[] {
    let logs = this.auditLogs

    if (clientId) {
      logs = logs.filter((log) => log.clientId === clientId)
    }

    if (startDate) {
      logs = logs.filter((log) => new Date(log.timestamp) >= startDate)
    }

    if (endDate) {
      logs = logs.filter((log) => new Date(log.timestamp) <= endDate)
    }

    return logs
  }

  generateComplianceReport(clientId: string, startDate: Date, endDate: Date): any {
    const logs = this.getAuditLogs(clientId, startDate, endDate)

    return {
      reportId: `report_${Date.now()}`,
      clientId,
      reportType: "API_USAGE_COMPLIANCE",
      period: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
      summary: {
        totalRequests: logs.length,
        successfulRequests: logs.filter((log) => log.responseStatus < 400).length,
        failedRequests: logs.filter((log) => log.responseStatus >= 400).length,
        averageResponseTime: logs.reduce((sum, log) => sum + log.responseTime, 0) / logs.length || 0,
      },
      details: logs,
      generatedAt: new Date().toISOString(),
    }
  }
}

// Rate limit configurations for different endpoints
export const rateLimitConfigs: Record<string, RateLimitConfig> = {
  default: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    keyGenerator: (req: NextRequest) => req.headers.get("X-API-Key") || req.headers.get("X-Forwarded-For") || "unknown",
  },
  transactions: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
    keyGenerator: (req: NextRequest) => req.headers.get("X-API-Key") || "unknown",
  },
  transfers: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
    keyGenerator: (req: NextRequest) => req.headers.get("X-API-Key") || "unknown",
  },
  balance: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
    keyGenerator: (req: NextRequest) => req.headers.get("X-API-Key") || "unknown",
  },
}
