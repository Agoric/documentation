import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    // Simulate AI response based on context
    let response = ""

    if (context === "snap-dax") {
      response = generateSnapDaxResponse(message)
    } else if (context === "financial-planning") {
      response = generateFinancialPlanningResponse(message)
    } else if (context === "real-estate") {
      response = generateRealEstateResponse(message)
    } else {
      response = generateGeneralResponse(message)
    }

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Orb chat error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process chat message",
      },
      { status: 500 },
    )
  }
}

function generateSnapDaxResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("bitcoin") || lowerMessage.includes("btc")) {
    return "Bitcoin is currently showing strong momentum. Based on technical analysis, I recommend considering a DCA strategy. The current support level is around $42,000 with resistance at $45,000. Would you like me to set up an automated trading bot for Bitcoin?"
  }

  if (lowerMessage.includes("ethereum") || lowerMessage.includes("eth")) {
    return "Ethereum is consolidating after the recent upgrade. The staking rewards are currently at 5.2% APY. I suggest monitoring the $2,500 support level. The upcoming developments in Layer 2 scaling could provide significant upside potential."
  }

  if (lowerMessage.includes("portfolio") || lowerMessage.includes("balance")) {
    return "Your current portfolio is well-diversified with a 35% allocation to Bitcoin and 30% to Ethereum. Your total return is +24.7% with a Sharpe ratio of 1.42. I recommend rebalancing if any single position exceeds 40% of your total portfolio."
  }

  if (lowerMessage.includes("trading bot") || lowerMessage.includes("automation")) {
    return "Your AI trading bots are performing excellently! The DCA bot has an 87.5% win rate, and the Grid bot has executed 156 successful trades. I can help you optimize the parameters or create new bots for different strategies."
  }

  if (lowerMessage.includes("risk") || lowerMessage.includes("volatility")) {
    return "Your current risk score is Medium with 18.5% volatility. This is within acceptable parameters for a growth-oriented crypto portfolio. I recommend maintaining your current position sizes and using stop-losses at 15% below entry points."
  }

  return "I'm here to help with your SNAP-DAX trading decisions. I can provide market analysis, portfolio optimization, trading bot management, and risk assessment. What specific aspect of your crypto trading would you like to discuss?"
}

function generateFinancialPlanningResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("budget") || lowerMessage.includes("spending")) {
    return "Based on your transaction history, I've identified potential savings of $450/month. Your largest expense categories are dining ($680/month) and subscriptions ($240/month). I recommend setting up automated transfers to your SNAP-DAX account to invest these savings in a diversified crypto portfolio."
  }

  if (lowerMessage.includes("investment") || lowerMessage.includes("portfolio")) {
    return "Your investment portfolio shows strong performance with 24.7% returns. I suggest increasing your crypto allocation through SNAP-DAX to 15-20% of your total portfolio. The AI trading bots can help automate this process while managing risk."
  }

  if (lowerMessage.includes("retirement") || lowerMessage.includes("401k")) {
    return "For retirement planning, I recommend a balanced approach: 60% traditional investments, 25% real estate through our tokenized properties, and 15% cryptocurrency via SNAP-DAX. This allocation could potentially accelerate your retirement timeline by 5-7 years."
  }

  if (lowerMessage.includes("debt") || lowerMessage.includes("loan")) {
    return "I can help optimize your debt strategy. Consider using profits from SNAP-DAX trading to accelerate debt payoff. Your current debt-to-income ratio is manageable, and strategic crypto investments could provide additional income streams."
  }

  return "I'm your AI financial planning assistant. I can help with budgeting, investment strategies, retirement planning, debt management, and integrating cryptocurrency investments through SNAP-DAX. What financial goal would you like to work on?"
}

function generateRealEstateResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("property") || lowerMessage.includes("house")) {
    return "I've found several properties matching your criteria. The luxury modern home in Beverly Hills shows strong appreciation potential with 12% projected annual growth. I can connect this investment to your SNAP-DAX portfolio for diversified funding strategies."
  }

  if (lowerMessage.includes("investment") || lowerMessage.includes("roi")) {
    return "Real estate investments in your area are showing 8-12% annual returns. Combined with SNAP-DAX crypto gains, you could achieve a blended return of 15-20%. I recommend the tokenized real estate approach for better liquidity and lower entry barriers."
  }

  if (lowerMessage.includes("mortgage") || lowerMessage.includes("financing")) {
    return "Current mortgage rates are favorable at 6.5-7%. Your SNAP-DAX portfolio could serve as collateral for better rates. I can help structure a financing strategy that leverages your crypto gains for real estate investments."
  }

  if (lowerMessage.includes("market") || lowerMessage.includes("trends")) {
    return "The real estate market is showing resilience with luxury properties outperforming. Tech-hub locations are seeing 15% year-over-year growth. Your SNAP-DAX profits could be strategically deployed into these high-growth markets."
  }

  return "I'm your real estate AI advisor. I can help with property search, investment analysis, market trends, financing options, and integrating real estate investments with your SNAP-DAX crypto portfolio. What type of property investment interests you?"
}

function generateGeneralResponse(message: string): string {
  const responses = [
    "I'm your AI assistant for the Snapifi Financial Platform. I can help with SNAP-DAX trading, financial planning, real estate investments, and portfolio management. How can I assist you today?",
    "Welcome to Snapifi! I have access to real-time market data, AI trading algorithms, and comprehensive financial planning tools. What would you like to explore?",
    "I'm here to help optimize your financial journey. Whether it's crypto trading on SNAP-DAX, real estate investments, or budget planning, I can provide personalized insights and recommendations.",
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}

export async function GET() {
  return NextResponse.json({
    message: "Snapifi AI Orb Chat API",
    endpoints: {
      "POST /": "Send chat message with context",
    },
    contexts: ["snap-dax", "financial-planning", "real-estate", "general"],
  })
}
