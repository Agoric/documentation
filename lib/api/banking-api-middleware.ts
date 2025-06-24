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

  if (authorizationHeader?.startsWith("Bearer ")) {
    const token = authorizationHeader.substring(7)

    if (token !== "valid-token") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
  } else {
    return NextResponse.json({ message: "Invalid authorization header format" }, { status: 401 })
  }

  if (!idempotencyKeyHeader) {
    return NextResponse.json({ message: "Idempotency-Key header is missing" }, { status: 400 })
  }

  if (!/^[a-zA-Z0-9-]+$/.test(idempotencyKeyHeader)) {
    return NextResponse.json({ message: "Invalid Idempotency-Key header format" }, { status: 400 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/banking/:path*",
}
