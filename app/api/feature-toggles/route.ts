import { NextResponse } from "next/server"

/**
 * GET /api/feature-toggles
 *
 * In production you’d fetch your flag service here.
 * For now we return static data and always surface errors as JSON.
 */
export async function GET() {
  try {
    // ─── Simulated data ────────────────────────────────────────────────────────
    const toggles = [
      { id: "new-dashboard", name: "New dashboard", enabled: true },
      { id: "beta-reports", name: "Beta reports", enabled: false },
    ]

    return NextResponse.json(toggles, { status: 200 })
  } catch (err) {
    // Anything thrown above ends up here – we never send back HTML
    const message = err instanceof Error ? err.message : "Unhandled exception in feature-toggle API"

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
