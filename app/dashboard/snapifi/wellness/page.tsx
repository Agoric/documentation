import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wellness AI Companion | Snapifi Financial Platform",
  description: "AI-powered wellness companion for financial and behavioral insights",
}

export default function WellnessPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Wellness AI Companion</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your personal AI assistant for financial wellness, behavioral insights, and daily support
        </p>

        <div className="flex items-center justify-center p-20 border rounded-lg bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20">
          <p className="text-center text-muted-foreground">
            The Wellness AI Companion is available in the bottom right corner of your screen.
            <br />
            It will stay with you across all pages of the Snapifi platform.
          </p>
        </div>
      </div>
    </div>
  )
}
