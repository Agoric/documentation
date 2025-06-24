"use client"

import { useState } from "react"

interface Course {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  progress: number
  completed: boolean
  certificate: boolean
  topics: string[]
  rating: number
}

export function FinancialEducation() {
  const [selectedCourse, setSelectedCourse] = useState<string>("credit-mastery")

  const courses: Course[] = [
    {
      id: "credit-mastery",
      title: "Credit Score Mastery",
      description: "Complete guide to understanding and improving your credit score",
      duration: "2.5 hours",
      difficulty: "beginner",
      progress: 100,
      completed: true,
      certificate: true,
      topics: ["Credit Reports", "Score Factors", "Improvement Strategies", "Monitoring"],
      rating: 4.9,
    },
    {
      id: "investment-fundamentals",
      title: "Investment Fundamentals",
      description: "Learn the basics of investing and portfolio management",
      duration: "4 hours",
      difficulty: "beginner",
      progress: 75,
      completed: false,
      certificate: false,
      topics: ["Asset Classes", "Risk Management", "Diversification", "Market Analysis"],
      rating: 4.8,
    },
    {
      id: "real-estate-investing",
      title: "Real Estate Investment Strategies",
      description: "Advanced strategies for real estate investment and RWA tokenization",
      duration: "6 hours",
      difficulty: "advanced",
      progress: 45,
      completed: false,
      certificate: false,
      topics: ["Property Analysis", "Financing", "RWA Tokens", "Market Timing"],
      rating: 4.7,
    },
    {
      id: "quantum-finance",
      title: "Quantum Computing in Finance",
      description: "Understanding how quantum computing revolutionizes financial analysis",
      duration: "3 hours",
      difficulty: "intermediate",
      progress: 30,
      completed: false,
      certificate: false,
      topics: ["Quantum Algorithms", "Risk Modeling", "Portfolio Optimization", "Market Prediction"],
      rating: 4.9,
    },
    {
      id: "budgeting-basics",
      title: "Smart Budgeting & Cash Flow",
      description: "Master personal budgeting and cash flow management",
      duration: "1.5 hours",
      difficulty: "beginner",
      progress: 100,
      completed: true,
      certificate: true,
      topics: ["Budget Creation", "Expense Tracking", "Savings Goals", "Emergency Funds"],
      rating: 4.6,
    },
    {
      id: "crypto-defi",
      title: "Cryptocurrency & DeFi",
      description: "Navigate the world of digital assets and decentralized finance",
      duration: "5 hours",
      difficulty: "intermediate",
      progress: 60,
      completed: false,
      certificate: false,
      topics: ["Blockchain Basics", "DeFi Protocols", "Yield Farming", "Risk Management"],
      rating: 4.5,
    },
  ]

  const achievements = [
    {
      id: "first-course",
      title: "First Steps",
      description: "Completed your first financial education course",
      icon: "🎯",
      unlocked: true,
      date: "2024-01-15",
    },
    {
      id: "credit-expert",
      title: "Credit Expert",
      description: "Mastered credit score improvement strategies",
      icon: "💳",
      unlocked: true,
      date: "2024-01-20",
    },
    {
      id: "investment-scholar",
      title: "Investment Scholar",
      description: "Completed 3 investment-related courses",
      icon: "📈",
      unlocked: false,
      date: null,
    },
    {
      id: "quantum-pioneer",
      title: "Quantum Pioneer",
      description: "Learned quantum computing applications in finance",
      icon:\
