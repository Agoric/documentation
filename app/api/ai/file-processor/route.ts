import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, unlink } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const action = formData.get("action") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const fileId = uuidv4()
    const extension = file.name.split(".").pop() || "txt"
    const filename = `${fileId}.${extension}`
    const filepath = join(process.cwd(), "tmp", filename)

    // Save file temporarily
    await writeFile(filepath, buffer)

    let result: any = {}

    try {
      switch (action) {
        case "read-text":
          result = await readTextFile(filepath, file.type)
          break
        case "analyze":
          result = await analyzeFile(filepath, file.type, file.name)
          break
        case "extract-data":
          result = await extractFileData(filepath, file.type)
          break
        default:
          result = await readTextFile(filepath, file.type)
      }

      // Clean up temporary file
      await unlink(filepath)

      return NextResponse.json({
        success: true,
        filename: file.name,
        size: file.size,
        type: file.type,
        ...result,
      })
    } catch (error) {
      // Clean up on error
      try {
        await unlink(filepath)
      } catch {}
      throw error
    }
  } catch (error) {
    console.error("File processing error:", error)
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}

async function readTextFile(filepath: string, mimeType: string) {
  const content = await readFile(filepath, "utf-8")

  const lines = content.split(/\r?\n/)
  const wordCount = content.split(/\s+/).filter(Boolean).length
  const charCount = content.length

  return {
    content: content.slice(0, 5000), // Limit to first 5000 characters
    preview: content.slice(0, 500) + (content.length > 500 ? "..." : ""),
    stats: {
      lines: lines.length,
      words: wordCount,
      characters: charCount,
    },
  }
}

async function analyzeFile(filepath: string, mimeType: string, filename: string) {
  const textResult = await readTextFile(filepath, mimeType)

  // Simple analysis
  const content = textResult.content.toLowerCase()
  const keywords = extractKeywords(content)
  const sentiment = analyzeSentiment(content)
  const language = detectLanguage(content)

  return {
    ...textResult,
    analysis: {
      keywords,
      sentiment,
      language,
      fileType: mimeType,
      complexity: calculateComplexity(content),
    },
  }
}

async function extractFileData(filepath: string, mimeType: string) {
  const textResult = await readTextFile(filepath, mimeType)
  const content = textResult.content

  // Extract various data patterns
  const emails = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || []
  const urls = content.match(/https?:\/\/[^\s]+/g) || []
  const phones = content.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g) || []
  const dates = content.match(/\b\d{1,2}\/\d{1,2}\/\d{4}\b/g) || []
  const numbers = content.match(/\b\d+(?:,\d{3})*(?:\.\d+)?\b/g) || []

  return {
    ...textResult,
    extractedData: {
      emails: [...new Set(emails)],
      urls: [...new Set(urls)],
      phones: [...new Set(phones)],
      dates: [...new Set(dates)],
      numbers: [...new Set(numbers.slice(0, 20))], // Limit numbers
    },
  }
}

function extractKeywords(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3)

  const frequency: { [key: string]: number } = {}
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1
  })

  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word)
}

function analyzeSentiment(text: string): "positive" | "negative" | "neutral" {
  const positiveWords = ["good", "great", "excellent", "amazing", "wonderful", "fantastic", "love", "like"]
  const negativeWords = ["bad", "terrible", "awful", "hate", "dislike", "horrible", "worst", "sad"]

  const words = text.toLowerCase().split(/\s+/)
  let positiveCount = 0
  let negativeCount = 0

  words.forEach((word) => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
  })

  if (positiveCount > negativeCount) return "positive"
  if (negativeCount > positiveCount) return "negative"
  return "neutral"
}

function detectLanguage(text: string): string {
  // Simple language detection based on common words
  const englishWords = ["the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by"]
  const words = text.toLowerCase().split(/\s+/)

  const englishCount = words.filter((word) => englishWords.includes(word)).length
  const ratio = englishCount / Math.min(words.length, 100)

  return ratio > 0.1 ? "English" : "Unknown"
}

function calculateComplexity(text: string): "low" | "medium" | "high" {
  const sentences = text.split(/[.!?]+/).filter(Boolean)
  const avgWordsPerSentence = text.split(/\s+/).length / sentences.length

  if (avgWordsPerSentence < 10) return "low"
  if (avgWordsPerSentence < 20) return "medium"
  return "high"
}
