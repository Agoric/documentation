"use server"

import type { FeatureToggle } from "./types"

/**
 * Load the list of feature toggles from the API.
 * Throws a descriptive error when the request fails or the payload
 * is not valid JSON. Returns an empty array if you prefer a soft-fail.
 */
export async function loadFeatures(): Promise<FeatureToggle[]> {
  const url = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/feature-toggles`

  const res = await fetch(url, { next: { revalidate: 0 } })

  // 1️⃣ HTTP error (404, 500, etc.)
  if (!res.ok) {
    // Attempt to extract `{ error: "…" }` sent by the API; fall back to status text
    let apiMessage: string | undefined
    try {
      if (res.headers.get("content-type")?.includes("application/json")) {
        const body = (await res.json()) as { error?: string }
        apiMessage = body.error
      }
    } catch (err) {
      /* ignore JSON-parse failures – we'll use statusText instead */
    }

    throw new Error(apiMessage ?? `Feature-toggle API responded with ${res.status} ${res.statusText}`)
  }

  // 2️⃣ Non-JSON response (e.g. Next.js HTML error page)
  const contentType = res.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    const bodyPreview = (await res.text()).slice(0, 120)
    throw new Error(`Expected JSON but received “${contentType}”.\n\nPreview:\n${bodyPreview}`)
  }

  try {
    return (await res.json()) as FeatureToggle[]
  } catch (err) {
    // Network error, CORS, dev server offline, etc.
    // Convert *anything* we catch into a real Error with a readable message.
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Request to /api/feature-toggles failed"

    throw new Error(message)
  }
}
