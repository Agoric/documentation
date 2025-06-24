import type { NextRequest } from "next/server"

/**
 * POST /api/voice/replicate
 * Body: { text: string; voice_preset?: string }
 *
 * If REPLICATE_API_TOKEN is set in the environment we use it.
 * Otherwise we look for a header `x-replicate-key` provided by the client.
 *
 * The handler proxies the request to Replicate’s Bark TTS model and returns
 * `{ audio_url }` – the format expected by RealVoiceEngine.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { text?: string; voice_preset?: string }

    if (!body?.text) {
      return new Response(JSON.stringify({ error: "Missing `text` in body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 1️⃣  Pick the API token
    const tokenFromEnv = process.env.REPLICATE_API_TOKEN?.trim()
    const tokenFromHeader = req.headers.get("x-replicate-key")?.trim()
    const replicateToken = tokenFromEnv || tokenFromHeader

    if (!replicateToken) {
      return new Response(
        JSON.stringify({
          error: "No Replicate API token – set REPLICATE_API_TOKEN or provide x-replicate-key header.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      )
    }

    // 2️⃣  Build the prediction payload – Bark needs `prompt` (text) & optional preset
    const predictionRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${replicateToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Bark model reference
        version: "7cc4e24e02139cd55cdbad43b179b05aae06e19b4fc2698fbbd983ae86c74f18",
        input: {
          prompt: body.text,
          speaker: body.voice_preset ?? "v2/en_speaker_0",
        },
      }),
    })

    if (!predictionRes.ok) {
      const err = await predictionRes.text()
      return new Response(JSON.stringify({ error: `Replicate API error: ${predictionRes.status} ${err}` }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      })
    }

    const prediction = (await predictionRes.json()) as {
      urls: { get: string }
    }

    // 3️⃣  Poll until the prediction is finished (Replicate’s long-running job pattern)
    let outputUrl: string | undefined
    for (let i = 0; i < 20 && !outputUrl; i++) {
      await new Promise((r) => setTimeout(r, 1500))

      const pollRes = await fetch(prediction.urls.get, {
        headers: { Authorization: `Token ${replicateToken}` },
        cache: "no-store",
      })

      if (!pollRes.ok) break
      const pollData = (await pollRes.json()) as {
        status: string
        output?: string[]
      }

      if (pollData.status === "succeeded" && Array.isArray(pollData.output) && pollData.output.length) {
        outputUrl = pollData.output[0]
      }

      if (["canceled", "failed"].includes(pollData.status)) {
        break
      }
    }

    if (!outputUrl) {
      return new Response(JSON.stringify({ error: "Failed to fetch Bark TTS output from Replicate" }), {
        status: 504,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 4️⃣  Return the audio URL expected by the client
    return new Response(JSON.stringify({ audio_url: outputUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Replicate proxy error:", err)
    return new Response(JSON.stringify({ error: "Internal Replicate proxy error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
