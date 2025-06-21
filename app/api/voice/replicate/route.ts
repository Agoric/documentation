import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const apiKey =
      process.env.REPLICATE_API_TOKEN ||
      request.headers.get("x-replicate-key") || // client-supplied key
      ""

    /* If no key anywhere, bail early with an auth error */
    if (!apiKey) {
      return NextResponse.json({ error: "Missing Replicate API key" }, { status: 401 })
    }

    const { text, voice_preset } = await request.json()

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787",
        input: {
          text: text,
          voice_preset: voice_preset || "v2/en_speaker_6",
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.status}`)
    }

    const prediction = await response.json()

    // Poll for completion
    let result = prediction
    while (result.status === "starting" || result.status === "processing") {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          Authorization: `Token ${apiKey}`,
        },
      })

      result = await pollResponse.json()
    }

    if (result.status === "succeeded") {
      return NextResponse.json({ audio_url: result.output })
    } else {
      throw new Error(`Voice generation failed: ${result.error}`)
    }
  } catch (error) {
    console.error("Replicate voice generation error:", error)
    return NextResponse.json({ error: "Voice generation failed" }, { status: 500 })
  }
}
