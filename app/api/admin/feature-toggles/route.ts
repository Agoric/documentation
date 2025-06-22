import { featureToggleManager } from "@/lib/feature-toggle-system"

// GET /api/admin/feature-toggles  ➜  returns every feature-toggle
export async function GET() {
  const features = featureToggleManager.getAllFeatures()
  return Response.json(features, { status: 200 })
}

// Unsupported methods → 405
export async function POST() {
  return new Response("Method Not Allowed", { status: 405 })
}

export const runtime = "nodejs"
