"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Award, Clock, Star, CheckCircle, Play, Users, TrendingUp, Trophy } from "lucide-react"

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
      icon: "⚛️",
      unlocked: false,
      date: null,
    },
  ]

  const userStats = {
    coursesCompleted: 2,
    totalCourses: 6,
    certificatesEarned: 2,
    studyHours: 12.5,
    currentStreak: 7,
    overallProgress: 68,
  }

  const currentCourse = courses.find((course) => course.id === selectedCourse) || courses[0]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Education Center</h2>
          <p className="text-muted-foreground">Enhance your financial knowledge with expert-designed courses</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <BookOpen className="h-3 w-3 mr-1" />
          {userStats.coursesCompleted}/{userStats.totalCourses} Completed
        </Badge>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.coursesCompleted}</div>
                <p className="text-xs text-muted-foreground">of {userStats.totalCourses} total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.studyHours}</div>
                <p className="text-xs text-muted-foreground">total hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.currentStreak}</div>
                <p className="text-xs text-muted-foreground">days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                <Award className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.certificatesEarned}</div>
                <p className="text-xs text-muted-foreground">earned</p>
              </CardContent>
            </Card>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className={`cursor-pointer transition-all ${selectedCourse === course.id ? "ring-2 ring-blue-500" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      2.3k students
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium">Topics covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.topics.slice(0, 2).map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {course.topics.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.topics.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {course.completed ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => setSelectedCourse(course.id)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        {course.progress > 0 ? "Continue" : "Start"}
                      </Button>
                    )}
                    {course.certificate && (
                      <Badge className="bg-purple-100 text-purple-800">
                        <Award className="h-3 w-3 mr-1" />
                        Certificate
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress Overview</CardTitle>
              <CardDescription>Track your financial education journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{userStats.overallProgress}%</div>
                <p className="text-muted-foreground">Overall Progress</p>
                <Progress value={userStats.overallProgress} className="h-3 mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Course Progress</h4>
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium text-sm">{course.title}</h5>
                        <p className="text-xs text-muted-foreground">{course.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{course.progress}%</div>
                        {course.completed && <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Learning Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                      <span>Total Study Time</span>
                      <span className="font-bold">{userStats.studyHours} hours</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                      <span>Courses Completed</span>
                      <span className="font-bold">{userStats.coursesCompleted}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                      <span>Certificates Earned</span>
                      <span className="font-bold">{userStats.certificatesEarned}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
                      <span>Current Streak</span>
                      <span className="font-bold">{userStats.currentStreak} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses
              .filter((course) => course.certificate)
              .map((course) => (
                <Card key={course.id} className="border-2 border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Award className="h-8 w-8 text-purple-600" />
                      <Badge className="bg-purple-100 text-purple-800">Verified</Badge>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>Certificate of Completion</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium">Congratulations!</p>
                      <p className="text-sm text-muted-foreground">You have successfully completed this course</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1" variant="outline">
                        View Certificate
                      </Button>
                      <Button className="flex-1">Download PDF</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Learning Achievements</span>
              </CardTitle>
              <CardDescription>Unlock achievements as you progress through your financial education</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 border rounded-lg ${
                      achievement.unlocked ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${achievement.unlocked ? "text-green-900" : "text-gray-600"}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${achievement.unlocked ? "text-green-700" : "text-gray-500"}`}>
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.date && (
                          <p className="text-xs text-green-600 mt-1">
                            Unlocked on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {achievement.unlocked ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
