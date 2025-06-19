import { type NextRequest, NextResponse } from "next/server"
import { BankingAPIMiddleware } from "@/lib/api/banking-api-middleware"
import type { WebhookConfig } from "@/lib/api/banking-api-types"

const middleware = BankingAPIMiddleware.getInstance()

// Webhook configuration store (in production, use database)
const webhookStore = new Map<string, WebhookConfig>()

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  try {
    // Authentication
    const authResult = await middleware.authenticateRequest(request)
    if (!authResult.success) {
      const response = NextResponse.json(middleware.createErrorResponse(authResult.error!, requestId), { status: 401 })
      middleware.logAPIRequest(request, response, "unknown", startTime)
      return response
    }

    // Get webhooks for client
    const clientWebhooks = Array.from(webhookStore.values()).filter((webhook) =>
      webhook.webhookId.startsWith(authResult.clientId!),
    )

    const response = NextResponse.json(middleware.createSuccessResponse({ webhooks: clientWebhooks }, requestId))
    middleware.logAPIRequest(request, response, authResult.clientId!, startTime)
    return response
  } catch (error) {
    const response = NextResponse.json(
      middleware.createErrorResponse(
        {
          code: "INTERNAL_SERVER_ERROR",
          message: "An internal server error occurred.",
        },
        requestId,
      ),
      { status: 500 },
    )
    middleware.logAPIRequest(request, response, "unknown", startTime)
    return response
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  try {
    // Authentication
    const authResult = await middleware.authenticateRequest(request)
    if (!authResult.success) {
      const response = NextResponse.json(middleware.createErrorResponse(authResult.error!, requestId), { status: 401 })
      middleware.logAPIRequest(request, response, "unknown", startTime)
      return response
    }

    const body = await request.json()

    // Validate webhook configuration
    const validation = middleware.validateRequest(body, {
      required: ["url", "events"],
    })

    if (!validation.valid) {
      const response = NextResponse.json(
        middleware.createErrorResponse(
          {
            code: "VALIDATION_ERROR",
            message: "Request validation failed.",
            details: validation.errors,
          },
          requestId,
        ),
        { status: 400 },
      )
      middleware.logAPIRequest(request, response, authResult.clientId!, startTime)
      return response
    }

    // Create webhook configuration
    const webhookId = `${authResult.clientId}_webhook_${Date.now()}`
    const webhookSecret = `whsec_${Math.random().toString(36).substr(2, 32)}`

    const webhookConfig: WebhookConfig = {
      webhookId,
      url: body.url,
      events: body.events || [
        { eventType: "account.created", description: "Account created", schema: {} },
        { eventType: "transaction.completed", description: "Transaction completed", schema: {} },
        { eventType: "transfer.completed", description: "Transfer completed", schema: {} },
      ],
      secret: webhookSecret,
      status: "active",
      retryPolicy: {
        maxRetries: 3,
        retryDelay: 1000,
        backoffMultiplier: 2,
      },
    }

    webhookStore.set(webhookId, webhookConfig)

    const response = NextResponse.json(middleware.createSuccessResponse(webhookConfig, requestId), { status: 201 })
    middleware.logAPIRequest(request, response, authResult.clientId!, startTime)
    return response
  } catch (error) {
    const response = NextResponse.json(
      middleware.createErrorResponse(
        {
          code: "INTERNAL_SERVER_ERROR",
          message: "An internal server error occurred.",
        },
        requestId,
      ),
      { status: 500 },
    )
    middleware.logAPIRequest(request, response, "unknown", startTime)
    return response
  }
}
