"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Crown, Mic } from "lucide-react"

/* ---- 1.  Register widgets here (lazy-loaded, no SSR) --------------------- */
const widgetMap = {
  aiChat: dynamic(() => import("../ai/imperial-ai-chat").then((m) => ({ default: m.ImperialAIChat })), {
    ssr: false,
  }),
  realVoice: dynamic(() => import("../ai/real-voice-engine").then((m) => ({ default: m.RealVoiceEngine })), {
    ssr: false,
  }),
  wolfVoice: dynamic(() => import("../ai/wolf-voice-engine").then((m) => ({ default: m.WolfVoiceEngine })), {
    ssr: false,
  }),
} as const

type WidgetKey = keyof typeof widgetMap

/* ------------------------------------------------------------------------- */

export function FuturisticCommandCenter() {
  /* ---- 2.  Store active key, not an object (avoids null.type issues) ---- */
  const [active, setActive] = useState<WidgetKey | null>("aiChat")

  /* ---- 3.  Derive component safely with optional chaining --------------- */
  const ActiveWidget = active ? widgetMap[active] : null

  /* ---- 4.  Simple UI to switch widgets ---------------------------------- */
  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Futuristic Command Center
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 pb-6">
          <Button
            variant={active === "aiChat" ? "default" : "outline"}
            onClick={() => setActive("aiChat")}
            size="sm"
            className="gap-1"
          >
            <Brain className="w-4 h-4" /> AI Chat
          </Button>
          <Button
            variant={active === "realVoice" ? "default" : "outline"}
            onClick={() => setActive("realVoice")}
            size="sm"
            className="gap-1"
          >
            <Mic className="w-4 h-4" /> Real Voice
          </Button>
          <Button
            variant={active === "wolfVoice" ? "default" : "outline"}
            onClick={() => setActive("wolfVoice")}
            size="sm"
            className="gap-1"
          >
            <Crown className="w-4 h-4" /> Wolf Voice
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1"
            onClick={() => setActive(null)}
            title="Hide panel"
          >
            × Close
          </Button>
        </CardContent>
      </Card>

      {/* ---- 5.  Render the widget if one is selected ---------------------- */}
      {ActiveWidget && (
        <div className="w-full max-w-4xl border rounded-lg overflow-hidden shadow-lg">
          <ActiveWidget />
        </div>
      )}

      {/* ---- 6.  Fallback when nothing selected --------------------------- */}
      {!ActiveWidget && (
        <p className="text-sm text-gray-500 italic">
          Select a module above to begin <span className="text-purple-500">🚀</span>
        </p>
      )}
    </div>
  )
}
