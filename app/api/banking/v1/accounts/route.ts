import { type NextRequest, NextResponse } from "next/server"
import { BankingAPIMiddleware, rateLimitConfigs } from "@/lib/api/banking-api-middleware"
import type { CreateAccountRequest, AccountResponse } from "@/lib/api/banking-api-types"

const middleware = BankingAPIMiddleware.getInstance()

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
      response.headers.set("X-RateLimit-Limit", rateLimitConfigs.default.maxRequests.toString())
      response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString())
      response.headers.set("X-RateLimit-Reset", rateLimitResult.resetTime.toString())
      middleware.logAPIRequest(request, response, authResult.clientId!, startTime)
      return response
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const holderType = searchParams.get("holderType")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Mock banking context (in production, this would be properly injected)
    const mockBankingContext = {
      getAllAccounts: () => [
        {
          accountId: "acc_individual_001",
          accountNumber: "1234567890",
          routingNumber: "021000021",
          accountType: "checking",
          accountStatus: "active",
          holderId: "citizen_001",
          holderType: "individual",
          holderName: "Global Citizen Alpha",
          balance: 25000.0,
          availableBalance: 24500.0,
          currency: "USD",
          openDate: new Date(2024, 0, 15),
          features: {
            onlinebanking: true,
            mobilebanking: true,
            billPay: true,
            wireTransfers: true,
            achTransfers: true,
            internationalTransfers: true,
            checkWriting: true,
            debitCard: true,
            overdraftProtection: true,
            interestEarning: true,
          },
          limits: {
            dailyWithdrawalLimit: 5000,
            dailyTransferLimit: 10000,
            monthlyTransactionLimit: 100,
            wireTransferLimit: 50000,
          },
        },
      ],
    }

    let accounts = mockBankingContext.getAllAccounts()

    // Apply filters
    if (holderType) {
      accounts = accounts.filter((acc) => acc.holderType === holderType)
    }
    if (status) {
      accounts = accounts.filter((acc) => acc.accountStatus === status)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedAccounts = accounts.slice(startIndex, endIndex)

    // Transform to API response format
    const accountResponses: AccountResponse[] = paginatedAccounts.map((account) => ({
      accountId: account.accountId,
      accountNumber: account.accountNumber,
      routingNumber: account.routingNumber,
      accountType: account.accountType,
      accountStatus: account.accountStatus,
      holderInfo: {
        holderId: account.holderId,
        holderType: account.holderType,
        holderName: account.holderName,
      },
      balance: account.balance,
      availableBalance: account.availableBalance,
      currency: account.currency,
      openDate: account.openDate.toISOString(),
      features: Object.keys(account.features).filter((key) => account.features[key as keyof typeof account.features]),
      limits: account.limits,
    }))

    const responseData = {
      accounts: accountResponses,
      pagination: {
        page,
        limit,
        total: accounts.length,
        totalPages: Math.ceil(accounts.length / limit),
        hasNext: endIndex < accounts.length,
        hasPrev: page > 1,
      },
    }

    const response = NextResponse.json(middleware.createSuccessResponse(responseData, requestId))
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

    // Parse request body
    const body: CreateAccountRequest = await request.json()

    // Validate request
    const validation = middleware.validateRequest(body, {
      required: ["holderInfo", "accountType"],
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
    const idempotencyKey = request.headers.get("Idempotency-Key")
    if (idempotencyKey) {
      const idempotencyResult = await middleware.checkIdempotency(idempotencyKey, authResult.clientId!)
      if (idempotencyResult.exists) {
        const response = NextResponse.json(idempotencyResult.response)
        middleware.logAPIRequest(request, response, authResult.clientId!, startTime)
        return response
      }
    }

    // Create account (mock implementation)
    const newAccount = {
      accountId: `acc_${body.holderInfo.holderType}_${Date.now()}`,
      accountNumber: Math.random().toString().slice(2, 12),
      routingNumber: "021000021",
      accountType: body.accountType,
      accountStatus: "active",
      holderInfo: {
        holderId: body.holderInfo.holderId,
        holderType: body.holderInfo.holderType,
        holderName: body.holderInfo.holderName,
      },
      balance: body.initialDeposit || 0,
      availableBalance: body.initialDeposit || 0,
      currency: "USD",
      openDate: new Date().toISOString(),
      features: ["onlinebanking", "mobilebanking", "billPay"],
      limits: {
        dailyWithdrawalLimit: 5000,
        dailyTransferLimit: 10000,
        monthlyTransactionLimit: 100,
        wireTransferLimit: 50000,
      },
    }

    const responseData = middleware.createSuccessResponse(newAccount, requestId)

    // Store idempotent response
    if (idempotencyKey) {
      await middleware.storeIdempotentResponse(idempotencyKey, authResult.clientId!, responseData)
    }

    const response = NextResponse.json(responseData, { status: 201 })
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
