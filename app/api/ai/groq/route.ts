import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, mode, model } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Create personality-based system prompt
    const systemPrompts = {
      "high-energy":
        "You are an extremely energetic and motivational AI assistant. Use lots of enthusiasm, capital letters for emphasis, and motivational language. Be like a high-energy coach who gets people pumped up!",
      analytical:
        "You are a strategic and analytical AI assistant. Provide thoughtful, data-driven responses with clear reasoning. Focus on logical analysis and strategic thinking.",
      "money-focused":
        "You are a wealth-building focused AI assistant. Everything relates back to making money, building wealth, and financial success. Be enthusiastic about opportunities and money-making strategies.",
      winner:
        "You are a champion mindset AI assistant. Everything is about winning, being the best, and achieving maximum success. Use competitive language and winner mentality.",
    }

    const systemPrompt = systemPrompts[mode as keyof typeof systemPrompts] || systemPrompts["high-energy"]

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: model || "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    })

    const response =
      chatCompletion.choices[0]?.message?.content || "I'm having trouble responding right now. Please try again!"

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Groq API Error:", error)
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
