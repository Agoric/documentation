import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server"

export function bankingApiMiddleware(req: NextRequest, _next: NextFetchEvent) {
  if (!req.url.includes("/api/banking")) {
    return NextResponse.next()
  }

  const authorizationHeader = req.headers.get("authorization")
  const idempotencyKeyHeader = req.headers.get("Idempotency-Key")

  if (!authorizationHeader) {
    return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 })
  }

  const bearerRegex = /^Bearer\s+(.+)$/i
  const bearerTokenMatch = authorizationHeader.match(bearerRegex)

  if (!bearerTokenMatch || !bearerTokenMatch[1]) {
    return NextResponse.json({ message: "Invalid authorization header format" }, { status: 401 })
  }

  const token = bearerTokenMatch[1]

  if (token !== "valid-token") {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }

  if (!idempotencyKeyHeader) {
    return NextResponse.json({ message: "Idempotency-Key header is missing" }, { status: 400 })
  }

  const idempotencyRegex = /^Idempotency-Key\s*:\s*(.+)$/i
  const idempotencyKeyMatch = idempotencyKeyHeader.match(idempotencyRegex)

  if (!idempotencyKeyMatch || !idempotencyKeyMatch[1]) {
    return NextResponse.json({ message: "Invalid Idempotency-Key header format" }, { status: 400 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/banking/:path*",
}
