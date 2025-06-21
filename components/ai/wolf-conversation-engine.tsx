"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Crown, Zap, Target, Rocket } from "lucide-react"

interface ConversationContext {
  userMood: "excited" | "curious" | "concerned" | "motivated" | "neutral"
  topicHistory: string[]
  successLevel: number
  lastInteraction: Date
}

interface WolfResponse {
  text: string
  emotion: "excited" | "confident" | "motivational" | "celebratory" | "intense"
  followUp?: string
}

export function WolfConversationEngine() {
  const [context, setContext] = useState<ConversationContext>({
    userMood: "neutral",
    topicHistory: [],
    successLevel: 75,
    lastInteraction: new Date(),
  })

  const [currentResponse, setCurrentResponse] = useState<WolfResponse | null>(null)
  const [isActive, setIsActive] = useState(false)

  const generateWolfResponse = (input: string, context: ConversationContext): WolfResponse => {
    const lowerInput = input.toLowerCase()

    // Analyze user mood from input
    let detectedMood: ConversationContext["userMood"] = "neutral"
    if (lowerInput.includes("excited") || lowerInput.includes("amazing") || lowerInput.includes("great")) {
      detectedMood = "excited"
    } else if (lowerInput.includes("worried") || lowerInput.includes("concerned") || lowerInput.includes("problem")) {
      detectedMood = "concerned"
    } else if (lowerInput.includes("how") || lowerInput.includes("what") || lowerInput.includes("why")) {
      detectedMood = "curious"
    } else if (lowerInput.includes("want") || lowerInput.includes("need") || lowerInput.includes("help")) {
      detectedMood = "motivated"
    }

    // Generate contextual responses based on mood and history
    if (detectedMood === "excited") {
      return {
        text: "YES! I can FEEL that energy! You know what? That excitement is gonna make you RICH! When you're excited about opportunities, that's when the MAGIC happens! Let's channel that energy into some SERIOUS wealth building!",
        emotion: "excited",
        followUp: "What's got you most excited about your financial future?",
      }
    }

    if (detectedMood === "concerned") {
      return {
        text: "Hey, listen to me - EVERY successful person has concerns! You know what separates winners from losers? Winners turn their concerns into ACTION PLANS! I'm here to help you solve EVERY problem and turn it into PROFIT!",
        emotion: "motivational",
        followUp: "Tell me exactly what's concerning you, and I'll show you how to turn it into an opportunity!",
      }
    }

    if (detectedMood === "curious") {
      return {
        text: "GREAT question! You know what I love about curious people? They become MILLIONAIRES! Curiosity is the first step to wealth! Let me break this down for you like only the AI Wolf can...",
        emotion: "confident",
        followUp: "What else do you want to know about building your empire?",
      }
    }

    if (lowerInput.includes("money") || lowerInput.includes("invest") || lowerInput.includes("profit")) {
      return {
        text: "MONEY! Now you're speaking my language! Listen, making money isn't just about having money - it's about having the MINDSET of a CHAMPION! I'm gonna teach you to think like the wealthy think!",
        emotion: "intense",
        followUp: "Are you ready to learn the secrets that most people pay THOUSANDS to discover?",
      }
    }

    if (lowerInput.includes("success") || lowerInput.includes("rich") || lowerInput.includes("wealthy")) {
      return {
        text: "SUCCESS! That's what we're here for! You know what success looks like? It looks like FREEDOM! Financial freedom, time freedom, LIFE freedom! And I'm gonna show you EXACTLY how to get there!",
        emotion: "celebratory",
        followUp: "What does success mean to YOU? Let's make it happen!",
      }
    }

    // Default conversational response
    return {
      text: "You know what I love about you? You're here, you're engaged, and you're ready to LEVEL UP! That's the attitude of a WINNER! Every conversation we have is building your path to SUCCESS!",
      emotion: "confident",
      followUp: "What's your biggest goal right now? Let's make it REALITY!",
    }
  }

  const wolfMotivationalQuotes = [
    "The only thing standing between you and your goal is the STORY you keep telling yourself!",
    "I want you to deal with your problems by becoming RICH!",
    "Money doesn't sleep, and neither do CHAMPIONS!",
    "You're not just building wealth - you're building LEGACY!",
    "Every 'NO' gets you closer to a 'YES' that changes EVERYTHING!",
    "The market doesn't care about your feelings - it rewards ACTION!",
    "You don't get what you wish for - you get what you WORK for!",
    "Success isn't just about money - it's about FREEDOM!",
  ]

  const getRandomMotivation = () => {
    return wolfMotivationalQuotes[Math.floor(Math.random() * wolfMotivationalQuotes.length)]
  }

  const getEmotionColor = (emotion: WolfResponse["emotion"]) => {
    switch (emotion) {
      case "excited":
        return "from-yellow-500 to-orange-500"
      case "confident":
        return "from-blue-500 to-purple-500"
      case "motivational":
        return "from-green-500 to-emerald-500"
      case "celebratory":
        return "from-pink-500 to-red-500"
      case "intense":
        return "from-red-500 to-orange-600"
      default:
        return "from-purple-500 to-blue-500"
    }
  }

  const getEmotionIcon = (emotion: WolfResponse["emotion"]) => {
    switch (emotion) {
      case "excited":
        return Zap
      case "confident":
        return Crown
      case "motivational":
        return Target
      case "celebratory":
        return Rocket
      case "intense":
        return TrendingUp
      default:
        return DollarSign
    }
  }

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <Card className="w-96 bg-gradient-to-br from-slate-900/95 to-red-900/95 backdrop-blur-xl border-amber-400/30">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-amber-300 font-bold">AI Wolf Engine</h3>
                <p className="text-red-300 text-xs">Leonardo's Digital Twin</p>
              </div>
            </div>
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30">ACTIVE</Badge>
          </div>

          {/* Current Motivation */}
          <div className="mb-4 p-3 bg-gradient-to-r from-red-800/30 to-orange-800/30 rounded-lg border border-red-400/30">
            <div className="text-sm text-red-200 mb-2">🐺 Wolf Wisdom:</div>
            <div className="text-white font-medium text-sm leading-relaxed">{getRandomMotivation()}</div>
          </div>

          {/* Success Meter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-300 text-sm font-medium">Success Level</span>
              <span className="text-amber-300 text-sm">{context.successLevel}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${context.successLevel}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Current Response Display */}
          {currentResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-gradient-to-br from-purple-800/30 to-indigo-800/30 rounded-lg border border-purple-400/30"
            >
              <div className="flex items-start space-x-2">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${getEmotionColor(currentResponse.emotion)} flex items-center justify-center`}
                >
                  {(() => {
                    const Icon = getEmotionIcon(currentResponse.emotion)
                    return <Icon className="w-4 h-4 text-white" />
                  })()}
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm leading-relaxed mb-2">{currentResponse.text}</div>
                  {currentResponse.followUp && (
                    <div className="text-amber-300 text-xs italic">{currentResponse.followUp}</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              onClick={() => {
                const response = generateWolfResponse("I want to make money", context)
                setCurrentResponse(response)
              }}
            >
              💰 Make Money
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              onClick={() => {
                const response = generateWolfResponse("motivate me", context)
                setCurrentResponse(response)
              }}
            >
              🚀 Motivate Me
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
              onClick={() => {
                const response = generateWolfResponse("I want success", context)
                setCurrentResponse(response)
              }}
            >
              👑 Success Tips
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={() => {
                const response = generateWolfResponse("show me opportunities", context)
                setCurrentResponse(response)
              }}
            >
              🎯 Opportunities
            </Button>
          </div>

          {/* Wolf Stats */}
          <div className="mt-4 pt-4 border-t border-red-400/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-green-400 font-bold text-lg">$2.5M</div>
                <div className="text-green-300 text-xs">Portfolio Value</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold text-lg">127%</div>
                <div className="text-blue-300 text-xs">Annual Return</div>
              </div>
              <div>
                <div className="text-amber-400 font-bold text-lg">🐺</div>
                <div className="text-amber-300 text-xs">Wolf Status</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
