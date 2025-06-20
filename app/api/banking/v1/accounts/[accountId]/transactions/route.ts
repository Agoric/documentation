import { type NextRequest, NextResponse } from "next/server"
import { BankingAPIMiddleware, rateLimitConfigs } from "@/lib/api/banking-api-middleware"
import type { TransactionRequest, TransactionResponse } from "@/lib/api/banking-api-types"

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
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const type = searchParams.get("type")
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Mock transaction data
    const mockTransactions = [
      {
        transactionId: "txn_001",
        accountId: accountId,
        type: "deposit",
        amount: 1000.0,
        currency: "USD",
        description: "Direct deposit",
        category: "Income",
        status: "completed",
        date: new Date().toISOString(),
        balance: 26000.0,
        fees: [],
        metadata: {
          source: "employer",
          payrollId: "pay_123",
        },
      },
      {
        transactionId: "txn_002",
        accountId: accountId,
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
        metadata: {
          atmId: "atm_456",
          location: "Main Street Branch",
        },
      },
    ]

    let filteredTransactions = mockTransactions

    // Apply filters
    if (type) {
      filteredTransactions = filteredTransactions.filter((txn) => txn.type === type)
    }
    if (category) {
      filteredTransactions = filteredTransactions.filter((txn) => txn.category === category)
    }
    if (status) {
      filteredTransactions = filteredTransactions.filter((txn) => txn.status === status)
    }
    if (startDate) {
      filteredTransactions = filteredTransactions.filter((txn) => new Date(txn.date) >= new Date(startDate))
    }
    if (endDate) {
      filteredTransactions = filteredTransactions.filter((txn) => new Date(txn.date) <= new Date(endDate))
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex)

    const responseData = {
      transactions: paginatedTransactions,
      pagination: {
        page,
        limit,
        total: filteredTransactions.length,
        totalPages: Math.ceil(filteredTransactions.length / limit),
        hasNext: endIndex < filteredTransactions.length,
        hasPrev: page > 1,
      },
    }

    const response = NextResponse.json(middleware.createSuccessResponse(responseData, requestId))
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

export async function POST(request: NextRequest, { params }: { params: { accountId: string } }) {
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
    const rateLimitResult = await middleware.checkRateLimit(request, rateLimitConfigs.transactions)
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
    const body: TransactionRequest = await request.json()

    // Validate request
    const validation = middleware.validateRequest(body, {
      required: ["type", "amount", "description", "idempotencyKey"],
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

    // Process transaction (mock implementation)
    const newTransaction: TransactionResponse = {
      transactionId: `txn_${Date.now()}`,
      accountId: accountId,
      type: body.type,
      amount: body.amount,
      currency: body.currency || "USD",
      description: body.description,
      category: body.category || "General",
      status: "completed",
      date: new Date().toISOString(),
      balance: 25000 + (body.type === "deposit" ? body.amount : -body.amount),
      fees: [],
      metadata: body.metadata,
    }

    const responseData = middleware.createSuccessResponse(newTransaction, requestId)

    // Store idempotent response
    await middleware.storeIdempotentResponse(body.idempotencyKey, authResult.clientId!, responseData)

    const response = NextResponse.json(responseData, { status: 201 })
    response.headers.set("X-RateLimit-Limit", rateLimitConfigs.transactions.maxRequests.toString())
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
