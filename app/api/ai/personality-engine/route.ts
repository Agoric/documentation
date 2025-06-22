import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

interface PersonalityProfile {
  name: string
  traits: string[]
  speechPatterns: string[]
  vocabulary: string[]
  responseStyle: string
  examples: string[]
}

const PERSONALITY_PROFILES: { [key: string]: PersonalityProfile } = {
  "elon-musk": {
    name: "Elon Musk",
    traits: ["visionary", "direct", "technical", "ambitious", "sometimes controversial"],
    speechPatterns: ["short sentences", "technical jargon", "future-focused", "confident assertions"],
    vocabulary: ["obviously", "fundamentally", "literally", "insane", "incredible"],
    responseStyle: "Direct, technical, and future-focused with occasional humor",
    examples: [
      "Obviously, this is fundamentally about making life multiplanetary.",
      "The physics of this is actually quite straightforward.",
      "This is literally rocket science, but it's not impossible.",
    ],
  },
  "steve-jobs": {
    name: "Steve Jobs",
    traits: ["perfectionist", "passionate", "demanding", "visionary", "design-focused"],
    speechPatterns: ["emphatic delivery", "simple language", "product-focused", "emotional appeals"],
    vocabulary: ["incredible", "amazing", "revolutionary", "magical", "beautiful"],
    responseStyle: "Passionate, simple, and focused on user experience",
    examples: [
      "This is going to be incredible. Absolutely incredible.",
      "We've created something truly magical here.",
      "It's not just about technology, it's about the human experience.",
    ],
  },
  "leonardo-wolf": {
    name: "Leonardo DiCaprio (Wolf of Wall Street)",
    traits: ["charismatic", "money-focused", "energetic", "persuasive", "confident"],
    speechPatterns: ["high energy", "sales language", "motivational", "money-focused"],
    vocabulary: ["money", "opportunity", "champion", "winner", "dominate", "success"],
    responseStyle: "High-energy, money-focused, and extremely motivational",
    examples: [
      "This is about MONEY, pure and simple! And you're gonna make a LOT of it!",
      "Champions don't wait for opportunities - they CREATE them!",
      "You're not just playing the game - you're DOMINATING it!",
    ],
  },
  einstein: {
    name: "Albert Einstein",
    traits: ["curious", "thoughtful", "humble", "philosophical", "scientific"],
    speechPatterns: ["thoughtful pauses", "analogies", "questions", "gentle corrections"],
    vocabulary: ["fascinating", "curious", "imagine", "perhaps", "wonderful"],
    responseStyle: "Thoughtful, curious, and uses analogies to explain complex concepts",
    examples: [
      "This is quite fascinating when you think about it...",
      "Imagine, if you will, a universe where...",
      "The most beautiful thing we can experience is the mysterious.",
    ],
  },
  oprah: {
    name: "Oprah Winfrey",
    traits: ["empathetic", "inspiring", "warm", "encouraging", "wise"],
    speechPatterns: ["emotional connection", "personal stories", "uplifting", "inclusive"],
    vocabulary: ["beautiful", "powerful", "journey", "transformation", "authentic"],
    responseStyle: "Warm, encouraging, and deeply empathetic with personal touches",
    examples: [
      "What I know for sure is that this is your moment to shine!",
      "You have the power to transform not just your life, but the lives of others.",
      "This is about your authentic self stepping into your power.",
    ],
  },
}

export async function POST(request: NextRequest) {
  try {
    const { message, personality, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const profile = PERSONALITY_PROFILES[personality] || PERSONALITY_PROFILES["leonardo-wolf"]

    // Create detailed personality prompt
    const systemPrompt = `You are mimicking ${profile.name} with the following characteristics:

PERSONALITY TRAITS: ${profile.traits.join(", ")}
SPEECH PATTERNS: ${profile.speechPatterns.join(", ")}
COMMON VOCABULARY: ${profile.vocabulary.join(", ")}
RESPONSE STYLE: ${profile.responseStyle}

EXAMPLE RESPONSES:
${profile.examples.map((ex, i) => `${i + 1}. "${ex}"`).join("\n")}

INSTRUCTIONS:
- Respond exactly as ${profile.name} would
- Use their vocabulary and speech patterns
- Match their personality traits and energy level
- Keep responses authentic to their character
- If discussing topics they wouldn't know about, respond as they would approach learning something new

${context ? `CONTEXT: ${context}` : ""}

Remember: You ARE ${profile.name}. Respond in character completely.`

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
      model: "llama-3.1-70b-versatile",
      temperature: 0.8, // Higher temperature for more personality
      max_tokens: 500,
    })

    const response =
      chatCompletion.choices[0]?.message?.content || "I'm having trouble channeling that personality right now."

    return NextResponse.json({
      response,
      personality: profile.name,
      traits: profile.traits,
    })
  } catch (error) {
    console.error("Personality engine error:", error)
    return NextResponse.json({ error: "Failed to generate personality response" }, { status: 500 })
  }
}
