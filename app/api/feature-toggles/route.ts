import { NextResponse } from "next/server"

// In a real app you’d call your flag service here.
// Returning static JSON so the widget always has something to parse.
export async function GET() {
  return NextResponse.json([
    { id: "new-dashboard", name: "New dashboard", enabled: true },
    { id: "beta-reports", name: "Beta reports", enabled: false },
  ])
}
