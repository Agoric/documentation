// Snapifi Banking API Documentation

export const apiDocumentation = {
  info: {
    title: "Snapifi Banking API",
    version: "1.0.0",
    description: "Comprehensive banking API for third-party integrations with Snapifi's financial platform",
    contact: {
      name: "Snapifi API Support",
      email: "api-support@snapifi.com",
      url: "https://docs.snapifi.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "https://api.snapifi.com",
      description: "Production server",
    },
    {
      url: "https://sandbox-api.snapifi.com",
      description: "Sandbox server",
    },
  ],
  authentication: {
    apiKey: {
      type: "apiKey",
      in: "header",
      name: "X-API-Key",
      description: "API key for authentication",
    },
    bearerToken: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "Bearer token for OAuth 2.0 authentication",
    },
  },
  endpoints: {
    // Account Management
    "GET /v1/accounts": {
      summary: "List all accounts",
      description: "Retrieve a paginated list of bank accounts",
      parameters: [
        {
          name: "holderType",
          in: "query",
          required: false,
          schema: { type: "string", enum: ["individual", "business", "institutional", "vendor"] },
          description: "Filter by account holder type",
        },
        {
          name: "status",
          in: "query",
          required: false,
          schema: { type: "string", enum: ["active", "frozen", "closed", "pending_verification"] },
          description: "Filter by account status",
        },
        {
          name: "page",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1, default: 1 },
          description: "Page number for pagination",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1, maximum: 100, default: 10 },
          description: "Number of items per page",
        },
      ],
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: {
                    type: "object",
                    properties: {
                      accounts: {
                        type: "array",
                        items: { $ref: "#/components/schemas/AccountResponse" },
                      },
                      pagination: { $ref: "#/components/schemas/PaginationResponse" },
                    },
                  },
                  timestamp: { type: "string", format: "date-time" },
                  requestId: { type: "string" },
                  version: { type: "string" },
                },
              },
            },
          },
        },
        401: { $ref: "#/components/responses/UnauthorizedError" },
        429: { $ref: "#/components/responses/RateLimitError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
      security: [{ apiKey: [] }, { bearerToken: [] }],
      rateLimit: {
        requests: 100,
        window: "15m",
      },
    },
    "POST /v1/accounts": {
      summary: "Create a new account",
      description: "Create a new bank account for a holder",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateAccountRequest" },
          },
        },
      },
      parameters: [
        {
          name: "Idempotency-Key",
          in: "header",
          required: true,
          schema: { type: "string" },
          description: "Unique key to ensure idempotent requests",
        },
      ],
      responses: {
        201: {
          description: "Account created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/AccountResponse" },
                  timestamp: { type: "string", format: "date-time" },
                  requestId: { type: "string" },
                  version: { type: "string" },
                },
              },
            },
          },
        },
        400: { $ref: "#/components/responses/ValidationError" },
        401: { $ref: "#/components/responses/UnauthorizedError" },
        429: { $ref: "#/components/responses/RateLimitError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
      security: [{ apiKey: [] }, { bearerToken: [] }],
      rateLimit: {
        requests: 100,
        window: "15m",
      },
    },
    "GET /v1/accounts/{accountId}": {
      summary: "Get account details",
      description: "Retrieve detailed information about a specific account",
      parameters: [
        {
          name: "accountId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Unique identifier for the account",
        },
      ],
      responses: {
        200: {
          description: "Account details retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/AccountResponse" },
                  timestamp: { type: "string", format: "date-time" },
                  requestId: { type: "string" },
                  version: { type: "string" },
                },
              },
            },
          },
        },
        404: { $ref: "#/components/responses/NotFoundError" },
        401: { $ref: "#/components/responses/UnauthorizedError" },
        429: { $ref: "#/components/responses/RateLimitError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
      security: [{ apiKey: [] }, { bearerToken: [] }],
      rateLimit: {
        requests: 30,
        window: "1m",
      },
    },
    // Transaction Management
    "GET /v1/accounts/{accountId}/transactions": {
      summary: "Get account transactions",
      description: "Retrieve transaction history for a specific account",
      parameters: [
        {
          name: "accountId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Unique identifier for the account",
        },
        {
          name: "startDate",
          in: "query",
          required: false,
          schema: { type: "string", format: "date" },
          description: "Start date for transaction history (YYYY-MM-DD)",
        },
        {
          name: "endDate",
          in: "query",
          required: false,
          schema: { type: "string", format: "date" },
          description: "End date for transaction history (YYYY-MM-DD)",
        },
        {
          name: "type",
          in: "query",
          required: false,
          schema: { type: "string", enum: ["deposit", "withdrawal", "transfer", "payment", "fee", "interest"] },
          description: "Filter by transaction type",
        },
        {
          name: "category",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "Filter by transaction category",
        },
        {
          name: "status",
          in: "query",
          required: false,
          schema: { type: "string", enum: ["pending", "completed", "failed", "cancelled"] },
          description: "Filter by transaction status",
        },
        {
          name: "page",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1, default: 1 },
          description: "Page number for pagination",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1, maximum: 100, default: 10 },
          description: "Number of items per page",
        },
      ],
      responses: {
        200: {
          description: "Transaction history retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: {
                    type: "object",
                    properties: {
                      transactions: {
                        type: "array",
                        items: { $ref: "#/components/schemas/TransactionResponse" },
                      },
                      pagination: { $ref: "#/components/schemas/PaginationResponse" },
                    },
                  },
                  timestamp: { type: "string", format: "date-time" },
                  requestId: { type: "string" },
                  version: { type: "string" },
                },
              },
            },
          },
        },
        404: { $ref: "#/components/responses/NotFoundError" },
        401: { $ref: "#/components/responses/UnauthorizedError" },
        429: { $ref: "#/components/responses/RateLimitError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
      security: [{ apiKey: [] }, { bearerToken: [] }],
      rateLimit: {
        requests: 30,
        window: "1m",
      },
    },
    "POST /v1/accounts/{accountId}/transactions": {
      summary: "Create a transaction",
      description: "Create a new transaction for a specific account",
      parameters: [
        {
          name: "accountId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Unique identifier for the account",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TransactionRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Transaction created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/TransactionResponse" },
                  timestamp: { type: "string", format: "date-time" },
                  requestId: { type: "string" },
                  version: { type: "string" },
                },
              },
            },
          },
        },
        400: { $ref: "#/components/responses/ValidationError" },
        401: { $ref: "#/components/responses/UnauthorizedError" },
        429: { $ref: "#/components/responses/RateLimitError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
      security: [{ apiKey: [] }, { bearerToken: [] }],
      rateLimit: {
        requests: 10,
        window: "1m",
      },
    },
    // Transfer Services
    "POST /v1/transfers": {
      summary: "Create a transfer",
      description: "Initiate a transfer between accounts",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TransferRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Transfer initiated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/TransferResponse" },
                  timestamp: { type: "string", format: "date-time" },
                  requestId: { type: "string" },
                  version: { type: "string" },
                },
              },
            },
          },
        },
        400: { $ref: "#/components/responses/ValidationError" },
        401: { $ref: "#/components/responses/UnauthorizedError" },
        429: { $ref: "#/components/responses/RateLimitError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
      security: [{ apiKey: [] }, { bearerToken: [] }],
      rateLimit: {
        requests: 5,
        window: "1m",
      },
    },
    // Webhook Management
    "GET /v1/webhooks": {
      summary: "List webhooks",
      description: "Retrieve all webhook configurations for the client",
      responses: {
        200: {
          description: "Webhooks retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: {
                    type: "object",
                    properties: {
                      webhooks: {
                        type: "array",
                        items: { $ref: "#/components/schemas/WebhookConfig" },
                      },
                    },
                  },
                  timestamp: { type: "string", format: "date-time" },
                  requestId: { type: "string" },
                  version: { type: "string" },
                },
              },
            },
          },
        },
        401: { $ref: "#/components/responses/UnauthorizedError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
      security: [{ apiKey: [] }, { bearerToken: [] }],
    },
    "POST /v1/webhooks": {
      summary: "Create a webhook",
      description: "Create a new webhook configuration",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["url", "events"],
              properties: {
                url: {
                  type: "string",
                  format: "uri",
                  description: "Webhook endpoint URL",
                },
                events: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      eventType: { type: "string" },
                      description: { type: "string" },
                    },
                  },
                  description: "List of events to subscribe to",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Webhook created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/WebhookConfig" },
                  timestamp: { type: "string", format: "date-time" },
                  requestId: { type: "string" },
                  version: { type: "string" },
                },
              },
            },
          },
        },
        400: { $ref: "#/components/responses/ValidationError" },
        401: { $ref: "#/components/responses/UnauthorizedError" },
        500: { $ref: "#/components/responses/InternalServerError" },
      },
      security: [{ apiKey: [] }, { bearerToken: [] }],
    },
  },
  components: {
    schemas: {
      AccountResponse: {
        type: "object",
        properties: {
          accountId: { type: "string", description: "Unique account identifier" },
          accountNumber: { type: "string", description: "Account number" },
          routingNumber: { type: "string", description: "Bank routing number" },
          accountType: {
            type: "string",
            enum: ["checking", "savings", "business_checking", "investment"],
            description: "Type of account",
          },
          accountStatus: {
            type: "string",
            enum: ["active", "frozen", "closed", "pending_verification"],
            description: "Current account status",
          },
          holderInfo: {
            type: "object",
            properties: {
              holderId: { type: "string" },
              holderType: { type: "string", enum: ["individual", "business", "institutional", "vendor"] },
              holderName: { type: "string" },
            },
          },
          balance: { type: "number", format: "decimal", description: "Current account balance" },
          availableBalance: { type: "number", format: "decimal", description: "Available balance for transactions" },
          currency: { type: "string", enum: ["USD", "EUR", "GBP", "CAD", "AUD"], description: "Account currency" },
          openDate: { type: "string", format: "date-time", description: "Account opening date" },
          features: {
            type: "array",
            items: { type: "string" },
            description: "List of enabled account features",
          },
          limits: { $ref: "#/components/schemas/AccountLimits" },
        },
      },
      CreateAccountRequest: {
        type: "object",
        required: ["holderInfo", "accountType"],
        properties: {
          holderInfo: {
            type: "object",
            required: ["holderId", "holderType", "holderName", "email", "phone", "address"],
            properties: {
              holderId: { type: "string" },
              holderType: { type: "string", enum: ["individual", "business", "institutional", "vendor"] },
              holderName: { type: "string" },
              email: { type: "string", format: "email" },
              phone: { type: "string" },
              address: { $ref: "#/components/schemas/Address" },
              taxId: { type: "string" },
              businessInfo: { $ref: "#/components/schemas/BusinessInfo" },
            },
          },
          accountType: { type: "string", enum: ["checking", "savings", "business_checking", "investment"] },
          initialDeposit: { type: "number", format: "decimal", minimum: 0 },
          features: {
            type: "array",
            items: {
              type: "object",
              properties: {
                feature: { type: "string" },
                enabled: { type: "boolean" },
                configuration: { type: "object" },
              },
            },
          },
        },
      },
      TransactionRequest: {
        type: "object",
        required: ["type", "amount", "description", "idempotencyKey"],
        properties: {
          type: { type: "string", enum: ["deposit", "withdrawal", "transfer", "payment"] },
          amount: { type: "number", format: "decimal", minimum: 0.01 },
          currency: { type: "string", enum: ["USD", "EUR", "GBP", "CAD", "AUD"], default: "USD" },
          description: { type: "string", maxLength: 255 },
          category: { type: "string" },
          merchant: { type: "string" },
          metadata: { type: "object" },
          idempotencyKey: { type: "string", description: "Unique key to ensure idempotent requests" },
        },
      },
      TransactionResponse: {
        type: "object",
        properties: {
          transactionId: { type: "string" },
          accountId: { type: "string" },
          type: { type: "string" },
          amount: { type: "number", format: "decimal" },
          currency: { type: "string" },
          description: { type: "string" },
          category: { type: "string" },
          status: { type: "string", enum: ["pending", "completed", "failed", "cancelled"] },
          date: { type: "string", format: "date-time" },
          balance: { type: "number", format: "decimal" },
          fees: {
            type: "array",
            items: { $ref: "#/components/schemas/Fee" },
          },
          metadata: { type: "object" },
        },
      },
      TransferRequest: {
        type: "object",
        required: ["fromAccountId", "amount", "transferType", "idempotencyKey"],
        properties: {
          fromAccountId: { type: "string" },
          toAccountId: { type: "string" },
          externalAccount: { $ref: "#/components/schemas/ExternalAccount" },
          amount: { type: "number", format: "decimal", minimum: 0.01 },
          currency: { type: "string", enum: ["USD", "EUR", "GBP", "CAD", "AUD"], default: "USD" },
          description: { type: "string" },
          transferType: { type: "string", enum: ["internal", "ach", "wire", "international"] },
          metadata: { type: "object" },
          idempotencyKey: { type: "string" },
        },
      },
      TransferResponse: {
        type: "object",
        properties: {
          transferId: { type: "string" },
          fromAccountId: { type: "string" },
          toAccountId: { type: "string" },
          amount: { type: "number", format: "decimal" },
          currency: { type: "string" },
          status: { type: "string", enum: ["processing", "completed", "failed", "cancelled"] },
          transferType: { type: "string" },
          estimatedCompletion: { type: "string", format: "date-time" },
          fees: {
            type: "array",
            items: { $ref: "#/components/schemas/Fee" },
          },
          trackingNumber: { type: "string" },
        },
      },
      WebhookConfig: {
        type: "object",
        properties: {
          webhookId: { type: "string" },
          url: { type: "string", format: "uri" },
          events: {
            type: "array",
            items: {
              type: "object",
              properties: {
                eventType: { type: "string" },
                description: { type: "string" },
                schema: { type: "object" },
              },
            },
          },
          secret: { type: "string" },
          status: { type: "string", enum: ["active", "inactive", "failed"] },
          retryPolicy: {
            type: "object",
            properties: {
              maxRetries: { type: "integer" },
              retryDelay: { type: "integer" },
              backoffMultiplier: { type: "number" },
            },
          },
        },
      },
      AccountLimits: {
        type: "object",
        properties: {
          dailyWithdrawalLimit: { type: "number", format: "decimal" },
          dailyTransferLimit: { type: "number", format: "decimal" },
          monthlyTransactionLimit: { type: "integer" },
          wireTransferLimit: { type: "number", format: "decimal" },
        },
      },
      Address: {
        type: "object",
        required: ["street", "city", "state", "postalCode", "country"],
        properties: {
          street: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          postalCode: { type: "string" },
          country: { type: "string" },
        },
      },
      BusinessInfo: {
        type: "object",
        properties: {
          businessName: { type: "string" },
          businessType: { type: "string" },
          incorporationDate: { type: "string", format: "date" },
          businessAddress: { $ref: "#/components/schemas/Address" },
          annualRevenue: { type: "number", format: "decimal" },
          employeeCount: { type: "integer" },
        },
      },
      ExternalAccount: {
        type: "object",
        required: ["bankName", "accountNumber", "routingNumber", "accountHolderName"],
        properties: {
          bankName: { type: "string" },
          accountNumber: { type: "string" },
          routingNumber: { type: "string" },
          accountHolderName: { type: "string" },
          bankAddress: { $ref: "#/components/schemas/Address" },
          swiftCode: { type: "string" },
        },
      },
      Fee: {
        type: "object",
        properties: {
          feeType: { type: "string" },
          amount: { type: "number", format: "decimal" },
          description: { type: "string" },
        },
      },
      PaginationResponse: {
        type: "object",
        properties: {
          page: { type: "integer" },
          limit: { type: "integer" },
          total: { type: "integer" },
          totalPages: { type: "integer" },
          hasNext: { type: "boolean" },
          hasPrev: { type: "boolean" },
        },
      },
      APIError: {
        type: "object",
        properties: {
          code: { type: "string" },
          message: { type: "string" },
          details: { type: "object" },
          field: { type: "string" },
        },
      },
    },
    responses: {
      UnauthorizedError: {
        description: "Authentication required",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                error: { $ref: "#/components/schemas/APIError" },
                timestamp: { type: "string", format: "date-time" },
                requestId: { type: "string" },
                version: { type: "string" },
              },
            },
          },
        },
      },
      ValidationError: {
        description: "Request validation failed",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                error: { $ref: "#/components/schemas/APIError" },
                timestamp: { type: "string", format: "date-time" },
                requestId: { type: "string" },
                version: { type: "string" },
              },
            },
          },
        },
      },
      NotFoundError: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                error: { $ref: "#/components/schemas/APIError" },
                timestamp: { type: "string", format: "date-time" },
                requestId: { type: "string" },
                version: { type: "string" },
              },
            },
          },
        },
      },
      RateLimitError: {
        description: "Rate limit exceeded",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                error: { $ref: "#/components/schemas/APIError" },
                timestamp: { type: "string", format: "date-time" },
                requestId: { type: "string" },
                version: { type: "string" },
              },
            },
          },
        },
        headers: {
          "X-RateLimit-Limit": {
            description: "Request limit per time window",
            schema: { type: "integer" },
          },
          "X-RateLimit-Remaining": {
            description: "Remaining requests in current window",
            schema: { type: "integer" },
          },
          "X-RateLimit-Reset": {
            description: "Time when rate limit resets",
            schema: { type: "integer" },
          },
        },
      },
      InternalServerError: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                error: { $ref: "#/components/schemas/APIError" },
                timestamp: { type: "string", format: "date-time" },
                requestId: { type: "string" },
                version: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  examples: {
    createAccountExample: {
      summary: "Create individual checking account",
      value: {
        holderInfo: {
          holderId: "citizen_001",
          holderType: "individual",
          holderName: "John Doe",
          email: "john.doe@example.com",
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
    },
    createTransactionExample: {
      summary: "Create deposit transaction",
      value: {
        type: "deposit",
        amount: 500.0,
        currency: "USD",
        description: "Payroll deposit",
        category: "Income",
        idempotencyKey: "deposit_20241219_001",
      },
    },
    createTransferExample: {
      summary: "Create internal transfer",
      value: {
        fromAccountId: "acc_individual_001",
        toAccountId: "acc_individual_002",
        amount: 250.0,
        currency: "USD",
        description: "Transfer to savings",
        transferType: "internal",
        idempotencyKey: "transfer_20241219_001",
      },
    },
  },
}

// Usage examples for different programming languages
export const codeExamples = {
  javascript: {
    installation: `npm install @snapifi/banking-sdk`,
    basicUsage: `
const { SnapifiBankingSDK } = require('@snapifi/banking-sdk');

const client = new SnapifiBankingSDK({
  baseUrl: 'https://api.snapifi.com',
  apiKey: 'your-api-key',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  environment: 'sandbox'
});

// Create an account
const account = await client.createAccount({
  holderInfo: {
    holderId: 'user_123',
    holderType: 'individual',
    holderName: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0123',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'US'
    }
  },
  accountType: 'checking',
  initialDeposit: 1000.00
});

// Create a transaction
const transaction = await client.createTransaction(account.accountId, {
  type: 'deposit',
  amount: 500.00,
  description: 'Payroll deposit',
  category: 'Income'
});

// Get account balance
const balance = await client.getBalance(account.accountId);
console.log('Current balance:', balance.balance);
    `,
  },
  python: {
    installation: `pip install snapifi-banking-sdk`,
    basicUsage: `
from snapifi_banking import SnapifiBankingClient

client = SnapifiBankingClient(
    base_url='https://api.snapifi.com',
    api_key='your-api-key',
    client_id='your-client-id',
    client_secret='your-client-secret',
    environment='sandbox'
)

# Create an account
account = client.create_account({
    'holderInfo': {
        'holderId': 'user_123',
        'holderType': 'individual',
        'holderName': 'John Doe',
        'email': 'john@example.com',
        'phone': '+1-555-0123',
        'address': {
            'street': '123 Main St',
            'city': 'Anytown',
            'state': 'CA',
            'postalCode': '12345',
            'country': 'US'
        }
    },
    'accountType': 'checking',
    'initialDeposit': 1000.00
})

# Create a transaction
transaction = client.create_transaction(account['accountId'], {
    'type': 'deposit',
    'amount': 500.00,
    'description': 'Payroll deposit',
    'category': 'Income'
})

# Get account balance
balance = client.get_balance(account['accountId'])
print(f"Current balance: {balance['balance']}")
    `,
  },
  curl: {
    authentication: `
# Get access token
curl -X POST https://api.snapifi.com/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "your-client-id",
    "client_secret": "your-client-secret",
    "grant_type": "client_credentials"
  }'
    `,
    createAccount: `
# Create account
curl -X POST https://api.snapifi.com/api/banking/v1/accounts \\
  -H "Authorization: Bearer your-access-token" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: create_account_$(date +%s)" \\
  -d '{
    "holderInfo": {
      "holderId": "user_123",
      "holderType": "individual",
      "holderName": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0123",
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "postalCode": "12345",
        "country": "US"
      }
    },
    "accountType": "checking",
    "initialDeposit": 1000.00
  }'
    `,
    getBalance: `
# Get account balance
curl -X GET https://api.snapifi.com/api/banking/v1/accounts/acc_123/balance \\
  -H "Authorization: Bearer your-access-token"
    `,
  },
}
