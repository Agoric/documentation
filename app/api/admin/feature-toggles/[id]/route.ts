import type { NextRequest } from "next/server"
import { featureToggleManager } from "@/lib/feature-toggle-system"

type Params = { params: { id: string } }

// GET /api/admin/feature-toggles/:id  ➜  single feature
export async function GET(_req: NextRequest, { params }: Params) {
  const feature = featureToggleManager.getAllFeatures().find((f) => f.id === params.id)
  if (!feature) {
    return new Response("Feature not found", { status: 404 })
  }
  return Response.json(feature)
}

// PUT /api/admin/feature-toggles/:id  ➜  enable / disable a feature
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { enabled } = (await req.json()) as { enabled: boolean }

    // If feature already at requested state, just return it.
    const current = featureToggleManager.getAllFeatures().find((f) => f.id === params.id)
    if (!current) {
      return new Response("Feature not found", { status: 404 })
    }
    if (current.enabled === enabled) {
      return Response.json(current) // 200 OK – nothing changed
    }

    // Otherwise toggle it
    const ok = featureToggleManager.toggleFeature(params.id, enabled, "api")
    if (!ok) throw new Error("Toggle failed")

    const updated = featureToggleManager.getAllFeatures().find((f) => f.id === params.id)
    return Response.json(updated)
  } catch (err) {
    return new Response((err as Error).message, { status: 400 })
  }
}

// Unsupported methods → 405
export async function POST() {
  return new Response("Method Not Allowed", { status: 405 })
}

export const runtime = "nodejs"
