import { type NextRequest, NextResponse } from "next/server"
import { BankingAPIMiddleware, rateLimitConfigs } from "@/lib/api/banking-api-middleware"
import type { TransferRequest, TransferResponse } from "@/lib/api/banking-api-types"

const middleware = BankingAPIMiddleware.getInstance()

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

    // Rate limiting
    const rateLimitResult = await middleware.checkRateLimit(request, rateLimitConfigs.transfers)
    if (!rateLimitResult.allowed) {
      const response = NextResponse.json(
        middleware.createErrorResponse(
          {
            code: "RATE_LIMIT_EXCEEDED",
            message: "Rate limit exceeded. Please try again later.",
          },
          requestId,
        ),
        { status: 429 },
      )
      middleware.logAPIRequest(request, response, authResult.clientId!, startTime)
      return response
    }

    const body: TransferRequest = await request.json()

    // Validate request
    const validation = middleware.validateRequest(body, {
      required: ["fromAccountId", "amount", "transferType", "idempotencyKey"],
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

    // Check idempotency
    const idempotencyResult = await middleware.checkIdempotency(body.idempotencyKey, authResult.clientId!)
    if (idempotencyResult.exists) {
      const response = NextResponse.json(idempotencyResult.response)
      middleware.logAPIRequest(request, response, authResult.clientId!, startTime)
      return response
    }

    // Process transfer (mock implementation)
    const estimatedCompletion = new Date()
    switch (body.transferType) {
      case "internal":
        estimatedCompletion.setMinutes(estimatedCompletion.getMinutes() + 1)
        break
      case "ach":
        estimatedCompletion.setDate(estimatedCompletion.getDate() + 1)
        break
      case "wire":
        estimatedCompletion.setHours(estimatedCompletion.getHours() + 2)
        break
      case "international":
        estimatedCompletion.setDate(estimatedCompletion.getDate() + 3)
        break
    }

    const newTransfer: TransferResponse = {
      transferId: `xfer_${Date.now()}`,
      fromAccountId: body.fromAccountId,
      toAccountId: body.toAccountId,
      amount: body.amount,
      currency: body.currency || "USD",
      status: "processing",
      transferType: body.transferType,
      estimatedCompletion: estimatedCompletion.toISOString(),
      fees: [
        {
          feeType: "transfer_fee",
          amount: body.transferType === "wire" ? 25.0 : body.transferType === "international" ? 45.0 : 0.0,
          description: `${body.transferType} transfer fee`,
        },
      ],
      trackingNumber: `TRK${Date.now()}`,
    }

    const responseData = middleware.createSuccessResponse(newTransfer, requestId)

    // Store idempotent response
    await middleware.storeIdempotentResponse(body.idempotencyKey, authResult.clientId!, responseData)

    const response = NextResponse.json(responseData, { status: 201 })
    response.headers.set("X-RateLimit-Limit", rateLimitConfigs.transfers.maxRequests.toString())
    response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString())
    response.headers.set("X-RateLimit-Reset", rateLimitResult.resetTime.toString())

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
