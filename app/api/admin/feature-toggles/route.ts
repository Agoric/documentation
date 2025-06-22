import { featureToggleManager } from "@/lib/feature-toggle-system"

// GET /api/admin/feature-toggles  ➜  returns every feature-toggle
export async function GET() {
  // featureToggleManager.getAllFeatures() may return a Map or an object
  const raw = featureToggleManager.getAllFeatures()

  // - If it's already an array, use it as-is
  // - If it's a Map, take its values
  // - Otherwise, fall back to Object.values()
  const features = Array.isArray(raw)
    ? raw
    : Array.from(
        // Map ⇒ raw.values() ; object ⇒ Object.values(raw)
        (raw as any).values ? (raw as Map<string, unknown>).values() : Object.values(raw),
      )

  return Response.json(features, { status: 200 })
}

// Unsupported methods → 405
export async function POST() {
  return new Response("Method Not Allowed", { status: 405 })
}

export const runtime = "nodejs"
