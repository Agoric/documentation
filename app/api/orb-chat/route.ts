import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

interface ConversationMessage {
  role: "user" | "assistant"
  content: string
}

interface UserProfile {
  creditScore: number
  income: number
  savings: number
  goals: string[]
  riskTolerance: "low" | "medium" | "high"
}

export async function POST(req: Request) {
  const { userMessage, conversationHistory, context, userProfile } = await req.json()

  // ---------- system prompt helpers ----------
  const getContextSpecificGuidance = (ctx: string) => {
    if (ctx.includes("real-estate"))
      return `USER IS BROWSING REAL ESTATE:
- Emphasize 50-year loan benefits
- Suggest affordability calculations
- Highlight investment potential`
    if (ctx.includes("snap-dax"))
      return `USER IS ON TRADING PLATFORM:
- Analyze portfolio
- Suggest diversification`
    if (ctx.includes("ecommerex"))
      return `USER IS SHOPPING:
- Optimize rewards
- Highlight exclusive deals`
    return `GENERAL FINANCIAL GUIDANCE:
- Improve credit score
- Optimize savings`
  }

  const getSystemPrompt = () => `You are the Genius Guide, an AI assistant on Snapifi.

USER PROFILE
- Credit Score: ${userProfile.creditScore}
- Income: $${userProfile.income.toLocaleString()}
- Savings: $${userProfile.savings.toLocaleString()}
- Goals: ${userProfile.goals.join(", ")}
- Risk Tolerance: ${userProfile.riskTolerance}
- Current Page: ${context}

${getContextSpecificGuidance(context)}

Tone: friendly, expert, actionable. Include specific numbers when useful, suggest 1-2 next steps.`

  // ---------- build full prompt ----------
  const convo = conversationHistory
    .slice(-10)
    .map((m: ConversationMessage) => `${m.role}: ${m.content}`)
    .join("\n")

  const prompt = `${getSystemPrompt()}

CONVERSATION HISTORY
${convo}

USER: ${userMessage}
ASSISTANT:`.trim()

  // ---------- call Groq ----------
  const { text } = await generateText({
    model: groq("llama-3.1-70b-versatile"),
    prompt,
    temperature: 0.7,
    maxTokens: 500,
  })

  return NextResponse.json({ content: text })
}
