"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, FileText, Target, Users, Lightbulb, TrendingUp } from "lucide-react"

export default function ProductManagerAI() {
  const [isActive, setIsActive] = useState(false)

  const features = [
    {
      icon: FileText,
      title: "PRD Generation",
      description: "Draft comprehensive Product Requirements Documents",
    },
    {
      icon: Target,
      title: "Strategy Planning",
      description: "Develop product roadmaps and strategic initiatives",
    },
    {
      icon: Users,
      title: "User Research",
      description: "Analyze user feedback and market research",
    },
    {
      icon: Lightbulb,
      title: "Feature Ideation",
      description: "Generate and prioritize feature ideas",
    },
    {
      icon: TrendingUp,
      title: "Metrics & KPIs",
      description: "Define success metrics and tracking plans",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                AI
              </Badge>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-800 mb-4">ProductPRD - AI for Product Managers</h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            An on-demand Chief Product Officer that drafts and improves your PRDs, while coaching you to become an elite
            product manager. The best product copilot for PMs & engineers.
          </p>
        </div>

        {/* Main Action */}
        <div className="text-center mb-12">
          <Button
            size="lg"
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "Chat Active" : "Start Product Chat"}
          </Button>

          <p className="text-sm text-slate-500 mt-4">Click to activate your AI Product Manager</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800">{feature.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chat Interface Preview */}
        {isActive && (
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="border-b bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">ProductPRD AI Assistant</h3>
                  <p className="text-sm text-slate-600">Ready to help with your product management needs</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-slate-700">👋 Hello! I'm your AI Product Manager. I can help you with:</p>
                  <ul className="mt-2 text-sm text-slate-600 space-y-1">
                    <li>• Writing comprehensive PRDs</li>
                    <li>• Analyzing market opportunities</li>
                    <li>• Defining user stories and acceptance criteria</li>
                    <li>• Creating product roadmaps</li>
                    <li>• Prioritizing features using frameworks like RICE</li>
                  </ul>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm">
                    Write a PRD
                  </Button>
                  <Button variant="outline" size="sm">
                    Analyze Competition
                  </Button>
                  <Button variant="outline" size="sm">
                    Create User Stories
                  </Button>
                  <Button variant="outline" size="sm">
                    Define KPIs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">Powered by Supreme Authority AI • Built for Product Excellence</p>
        </div>
      </div>
    </div>
  )
}
