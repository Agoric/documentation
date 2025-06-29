import { type NextRequest, NextResponse } from "next/server"
import { buildZillowQuery, type ZillowApiResponse } from "@/utils/zillow-helpers"

/**
 * GET /api/zillow/properties
 *
 * Query-params supported (all optional):
 *   location       = string  – “City, ST”  or “City”
 *   minPrice       = number
 *   maxPrice       = number
 *   bedrooms       = number
 *   bathrooms      = number
 *   propertyType   = string  – “Residential”, “Condo”, “Townhouse”, etc.
 *   limit          = number  – defaults 20  (max 100)
 *   offset         = number  – defaults 0
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams

  /* ---------- Parse & sanitise user params ---------- */
  const params = {
    location: sp.get("location") ?? undefined,
    minPrice: num(sp.get("minPrice")),
    maxPrice: num(sp.get("maxPrice")),
    bedrooms: num(sp.get("bedrooms")),
    bathrooms: num(sp.get("bathrooms")),
    propertyType: sp.get("propertyType") ?? undefined,
    limit: clamp(num(sp.get("limit")) ?? 20, 1, 100),
    offset: Math.max(num(sp.get("offset")) ?? 0, 0),
  }

  /* ---------- Build Zillow URL + token ---------- */
  try {
    const apiKey = process.env.NEXT_PUBLIC_ZILLOW_API_KEY || process.env.ZILLOW_API_KEY
    if (!apiKey) {
      return jsonError(500, "Zillow API key missing. Set NEXT_PUBLIC_ZILLOW_API_KEY.")
    }

    const baseUrl = buildZillowQuery(params)
    const sep = baseUrl.includes("?") ? "&" : "?"
    const url = `${baseUrl}${sep}access_token=${encodeURIComponent(apiKey)}`

    const res = await fetch(url, { next: { revalidate: 60 } }) // 1-minute cache
    if (!res.ok) {
      console.error(`Zillow API error ${res.status}: ${res.statusText} – ${await res.text().catch(() => "")}`)
      return jsonError(res.status, res.statusText || "Zillow API error")
    }

    const data = (await res.json()) as ZillowApiResponse
    return NextResponse.json(data)
  } catch (err) {
    console.error("Unexpected Zillow fetch error:", err)
    // ---------- Fallback demo payload so UI still renders ----------
    return NextResponse.json(
      {
        demoMode: true,
        value: [
          {
            ListingId: "DEMO-123",
            UnparsedAddress: "123 Demo St, Beverly Hills CA 90210",
            City: "Beverly Hills",
            StateOrProvince: "CA",
            PostalCode: "90210",
            ListPrice: 4500000,
            BedroomsTotal: 5,
            BathroomsTotalInteger: 6,
            LivingArea: 5800,
            LotSizeAcres: 0.42,
            YearBuilt: 2022,
            PropertyType: "Residential",
            PropertySubType: "Single Family Residence",
            ListingContractDate: "2025-01-15",
            DaysOnMarket: 12,
            PublicRemarks: "Luxury modern masterpiece (demo data)",
            Media: [
              {
                MediaURL: "/properties/luxury-modern-home.jpg",
                MediaCategory: "Photo",
                MediaType: "image/jpeg",
              },
            ],
            Latitude: 34.07362,
            Longitude: -118.400352,
            WalkScore: 75,
            SchoolDistrict: "Beverly Hills Unified",
            ElementarySchool: "Hawthorne",
            MiddleOrJuniorSchool: "Beverly Vista",
            HighSchool: "Beverly Hills",
            TaxAnnualAmount: 38750,
            AssociationFee: 0,
            Heating: "Central",
            Cooling: "Central Air",
            Parking: "Attached Garage",
            PoolPrivateYN: true,
            FireplaceYN: true,
            WaterfrontYN: false,
            ViewYN: true,
          },
        ],
        "@odata.count": 1,
      },
      { status: 200 },
    )
  }
}

/* ---------- helpers ---------- */
function num(x: string | null): number | undefined {
  if (x === null) return undefined
  const n = Number(x)
  return Number.isFinite(n) ? n : undefined
}
function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}
function jsonError(status: number, message: string) {
  return NextResponse.json({ error: message }, { status })
}
