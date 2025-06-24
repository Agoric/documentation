import { type NextRequest, NextResponse } from "next/server"
import { BankingAPIMiddleware, rateLimitConfigs } from "@/lib/api/banking-api-middleware"

const middleware = BankingAPIMiddleware.getInstance()

export async function GET(request: NextRequest, { params }: { params: { accountId: string } }) {
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
    const rateLimitResult = await middleware.checkRateLimit(request, rateLimitConfigs.balance)
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

    const { accountId } = params

    // Mock account lookup
    const mockAccount = {
      accountId: accountId,
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
      openDate: new Date(2024, 0, 15).toISOString(),
      features: ["onlinebanking", "mobilebanking", "billPay", "wireTransfers"],
      limits: {
        dailyWithdrawalLimit: 5000,
        dailyTransferLimit: 10000,
        monthlyTransactionLimit: 100,
        wireTransferLimit: 50000,
      },
    }

    if (!mockAccount) {
      const response = NextResponse.json(
        middleware.createErrorResponse(
          {
            code: "ACCOUNT_NOT_FOUND",
            message: "Account not found.",
          },
          requestId,
        ),
        { status: 404 },
      )
      middleware.logAPIRequest(request, response, authResult.clientId!, startTime)
      return response
    }

    const response = NextResponse.json(middleware.createSuccessResponse(mockAccount, requestId))
    response.headers.set("X-RateLimit-Limit", rateLimitConfigs.balance.maxRequests.toString())
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

export async function PUT(request: NextRequest, { params }: { params: { accountId: string } }) {
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
    const rateLimitResult = await middleware.checkRateLimit(request, rateLimitConfigs.default)
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

    const { accountId } = params
    const body = await request.json()

    // Mock account update
    const updatedAccount = {
      accountId: accountId,
      accountNumber: "1234567890",
      routingNumber: "021000021",
      accountType: "checking",
      accountStatus: body.accountStatus || "active",
      holderInfo: {
        holderId: "citizen_001",
        holderType: "individual",
        holderName: body.holderName || "Global Citizen Alpha",
      },
      balance: 25000.0,
      availableBalance: 24500.0,
      currency: "USD",
      openDate: new Date(2024, 0, 15).toISOString(),
      features: body.features || ["onlinebanking", "mobilebanking", "billPay", "wireTransfers"],
      limits: body.limits || {
        dailyWithdrawalLimit: 5000,
        dailyTransferLimit: 10000,
        monthlyTransactionLimit: 100,
        wireTransferLimit: 50000,
      },
    }

    const response = NextResponse.json(middleware.createSuccessResponse(updatedAccount, requestId))
    response.headers.set("X-RateLimit-Limit", rateLimitConfigs.default.maxRequests.toString())
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

export async function DELETE(request: NextRequest, { params }: { params: { accountId: string } }) {
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
    const rateLimitResult = await middleware.checkRateLimit(request, rateLimitConfigs.default)
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

    const { accountId } = params

    // Mock account closure
    const closedAccount = {
      accountId: accountId,
      accountStatus: "closed",
      closedDate: new Date().toISOString(),
      message: "Account successfully closed",
    }

    const response = NextResponse.json(middleware.createSuccessResponse(closedAccount, requestId))
    response.headers.set("X-RateLimit-Limit", rateLimitConfigs.default.maxRequests.toString())
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
