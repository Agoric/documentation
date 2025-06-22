import { type NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function POST(request: NextRequest) {
  try {
    const { url, action } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    let result: any = {}

    switch (action) {
      case "scrape":
        result = await scrapeWebsite(url)
        break
      case "summarize":
        result = await scrapeAndSummarize(url)
        break
      case "extract-data":
        result = await extractStructuredData(url)
        break
      default:
        result = await scrapeWebsite(url)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Web access error:", error)
    return NextResponse.json({ error: "Failed to access web content" }, { status: 500 })
  }
}

async function scrapeWebsite(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AI-Assistant/1.0)",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Remove script and style elements
    $("script, style, nav, footer, aside").remove()

    // Extract main content
    const title = $("title").text().trim()
    const description = $('meta[name="description"]').attr("content") || ""
    const headings = $("h1, h2, h3")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
    const paragraphs = $("p")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
      .slice(0, 10) // Limit to first 10 paragraphs

    const links = $("a[href]")
      .map((_, el) => ({
        text: $(el).text().trim(),
        href: $(el).attr("href"),
      }))
      .get()
      .filter((link) => link.text && link.href)
      .slice(0, 20) // Limit to first 20 links

    return {
      success: true,
      data: {
        url,
        title,
        description,
        headings,
        paragraphs,
        links,
        wordCount: paragraphs.join(" ").split(" ").length,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

async function scrapeAndSummarize(url: string) {
  const scrapeResult = await scrapeWebsite(url)

  if (!scrapeResult.success) {
    return scrapeResult
  }

  const content = scrapeResult.data.paragraphs.join(" ").slice(0, 2000) // Limit content

  // Simple summarization (in a real app, you'd use an AI service)
  const sentences = content.split(/[.!?]+/).filter(Boolean)
  const summary = sentences.slice(0, 3).join(". ") + "."

  return {
    success: true,
    data: {
      ...scrapeResult.data,
      summary,
      keyPoints: scrapeResult.data.headings.slice(0, 5),
    },
  }
}

async function extractStructuredData(url: string) {
  const scrapeResult = await scrapeWebsite(url)

  if (!scrapeResult.success) {
    return scrapeResult
  }

  // Extract structured data like prices, dates, emails, etc.
  const content = scrapeResult.data.paragraphs.join(" ")

  const emails = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || []
  const phones = content.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g) || []
  const prices = content.match(/\$\d+(?:,\d{3})*(?:\.\d{2})?/g) || []
  const dates = content.match(/\b\d{1,2}\/\d{1,2}\/\d{4}\b/g) || []

  return {
    success: true,
    data: {
      ...scrapeResult.data,
      extractedData: {
        emails: [...new Set(emails)],
        phones: [...new Set(phones)],
        prices: [...new Set(prices)],
        dates: [...new Set(dates)],
      },
    },
  }
}
