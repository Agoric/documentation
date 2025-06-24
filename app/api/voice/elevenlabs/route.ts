import { NextResponse, type NextRequest } from "next/server"

/* 
  Server-side proxy for ElevenLabs TTS.
  Requires environment var ELEVENLABS_API_KEY
*/
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { text: string; voiceId: string }
    const fallback = req.headers.get("x-elevenlabs-key") ?? ""
    const apiKey = process.env.ELEVENLABS_API_KEY ?? fallback

    if (!apiKey) {
      return NextResponse.json(
        { error: "No ElevenLabs API key supplied (env var or x-elevenlabs-key header)." },
        { status: 401 },
      )
    }

    const { text, voiceId } = body

    const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId ?? "EXAVITQu4vr4xnSDxMaL"}`, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.8,
          style: 0.15,
          use_speaker_boost: true,
        },
      }),
    })

    if (!upstream.ok) {
      const msg = await upstream.text()
      return NextResponse.json({ error: msg }, { status: upstream.status })
    }

    const buf = await upstream.arrayBuffer()
    return new NextResponse(buf, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buf.byteLength.toString(),
      },
    })
  } catch (err) {
    console.error("Proxy error:", err)
    return NextResponse.json({ error: "Voice generation failed." }, { status: 500 })
  }
}
