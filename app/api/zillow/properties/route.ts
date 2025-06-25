import type { NextRequest } from "next/server"
/* … */

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  /* rest of the function stays the same */
}
