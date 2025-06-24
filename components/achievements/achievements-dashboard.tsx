"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Target, Zap, Crown, Gift, Calendar, TrendingUp } from "lucide-react"
import type { Achievement } from "@/hooks/use-user-progress"

interface AchievementStats {
  totalAchievements: number
  unlockedAchievements: number
  recentAchievements: Achievement[]
  categories: {
    [key: string]: {
      total: number
      unlocked: number
    }
  }
}

export default function AchievementsDashboard() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [stats, setStats] = useState<AchievementStats>({
    totalAchievements: 0,
    unlockedAchievements: 0,
    recentAchievements: [],
    categories: {},
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await fetch("/api/achievements?userId=supreme_citizen_001")
      const { achievements: fetchedAchievements } = await response.json()

      setAchievements(fetchedAchievements)

      // Calculate stats
      const totalAchievements = fetchedAchievements.length
      const unlockedAchievements = fetchedAchievements.filter((a: Achievement) => a.isUnlocked).length
      const recentAchievements = fetchedAchievements
        .filter((a: Achievement) => a.isUnlocked)
        .sort((a: Achievement, b: Achievement) => b.unlockedAt - a.unlockedAt)
        .slice(0, 3)

      // Group by category
      const categories = fetchedAchievements.reduce((acc: any, achievement: Achievement) => {
        if (!acc[achievement.category]) {
          acc[achievement.category] = { total: 0, unlocked: 0 }
        }
        acc[achievement.category].total++
        if (achievement.isUnlocked) {
          acc[achievement.category].unlocked++
        }
        return acc
      }, {})

      setStats({
        totalAchievements,
        unlockedAchievements,
        recentAchievements,
        categories,
      })
    } catch (error) {
      console.error("Error fetching achievements:", error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "goal":
        return <Target className="h-5 w-5" />
      case "milestone":
        return <Trophy className="h-5 w-5" />
      case "streak":
        return <Zap className="h-5 w-5" />
      case "special":
        return <Crown className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "goal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "milestone":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "streak":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "special":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const unlockedAchievements = achievements.filter((a) => a.isUnlocked)
  const lockedAchievements = achievements.filter((a) => !a.isUnlocked)

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading achievements...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
          <Trophy className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Achievements</h2>
          <p className="text-muted-foreground">Track your financial milestones and accomplishments</p>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Total Achievements</p>
                <p className="text-3xl font-bold">{stats.totalAchievements}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Unlocked</p>
                <p className="text-3xl font-bold">{stats.unlockedAchievements}</p>
              </div>
              <Star className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Completion Rate</p>
                <p className="text-3xl font-bold">
                  {stats.totalAchievements > 0
                    ? Math.round((stats.unlockedAchievements / stats.totalAchievements) * 100)
                    : 0}
                  %
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Recent Unlocks</p>
                <p className="text-3xl font-bold">{stats.recentAchievements.length}</p>
              </div>
              <Gift className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      {stats.recentAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recent Achievements</span>
            </CardTitle>
            <CardDescription>Your latest accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg"
                >
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievement Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Achievement Categories</CardTitle>
          <CardDescription>Progress by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stats.categories).map(([category, data]) => (
              <div key={category} className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  {getCategoryIcon(category)}
                  <h3 className="font-medium capitalize">{category}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {data.unlocked}/{data.total}
                    </span>
                  </div>
                  <Progress value={(data.unlocked / data.total) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round((data.unlocked / data.total) * 100)}% Complete
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Achievements */}
      <Tabs defaultValue="unlocked" className="space-y-4">
        <TabsList>
          <TabsTrigger value="unlocked">Unlocked ({unlockedAchievements.length})</TabsTrigger>
          <TabsTrigger value="locked">Locked ({lockedAchievements.length})</TabsTrigger>
          <TabsTrigger value="all">All Achievements ({achievements.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="unlocked" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{achievement.icon}</div>
                    <Badge className="bg-green-100 text-green-800">Unlocked</Badge>
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                    <span className="text-muted-foreground">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="locked" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="opacity-60">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl grayscale">{achievement.icon}</div>
                    <Badge variant="outline">Locked</Badge>
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                    <span className="text-muted-foreground">{achievement.progress}% Progress</span>
                  </div>
                  {achievement.progress > 0 && <Progress value={achievement.progress} className="h-2 mt-2" />}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={achievement.isUnlocked ? "border-green-200 bg-green-50" : "opacity-60"}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`text-3xl ${!achievement.isUnlocked ? "grayscale" : ""}`}>{achievement.icon}</div>
                    <Badge
                      className={achievement.isUnlocked ? "bg-green-100 text-green-800" : ""}
                      variant={achievement.isUnlocked ? "default" : "outline"}
                    >
                      {achievement.isUnlocked ? "Unlocked" : "Locked"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                    <span className="text-muted-foreground">
                      {achievement.isUnlocked
                        ? new Date(achievement.unlockedAt).toLocaleDateString()
                        : `${achievement.progress}% Progress`}
                    </span>
                  </div>
                  {!achievement.isUnlocked && achievement.progress > 0 && (
                    <Progress value={achievement.progress} className="h-2 mt-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
