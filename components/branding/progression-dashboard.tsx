"use client"

import { motion } from "framer-motion"
import { useBadgeProgression } from "@/contexts/badge-progression-context"
import { SupremeAuthorityShield } from "./supreme-authority-shields"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Star, Zap, Clock, TrendingUp, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const getNextTierKey = (currentTier: string): string | null => {
  const tiers = ["initiate", "adept", "master", "grandmaster", "supreme"]
  const currentIndex = tiers.indexOf(currentTier)
  return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null
}

const getRarityColor = (rarity: string) => {
  const colors = {
    common: "text-gray-400 border-gray-400/30",
    rare: "text-blue-400 border-blue-400/30",
    epic: "text-purple-400 border-purple-400/30",
    legendary: "text-amber-400 border-amber-400/30",
    mythic: "text-pink-400 border-pink-400/30",
  }
  return colors[rarity as keyof typeof colors] || colors.common
}

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    novice: "text-green-400 bg-green-400/10",
    intermediate: "text-yellow-400 bg-yellow-400/10",
    advanced: "text-orange-400 bg-orange-400/10",
    expert: "text-red-400 bg-red-400/10",
    master: "text-purple-400 bg-purple-400/10",
  }
  return colors[difficulty as keyof typeof colors] || colors.novice
}

export function ProgressionDashboard() {
  const {
    userProgression,
    tierRequirements,
    availableMissions,
    achievements,
    getProgressToNextTier,
    getTierProgress,
    checkTierAdvancement,
    advanceToNextTier,
    startMission,
    completeMission,
    getRecommendedMissions,
    getProgressionInsights,
  } = useBadgeProgression()

  const nextTierKey = getNextTierKey(userProgression.currentTier)
  const progressToNext = getProgressToNextTier()
  const canAdvance = checkTierAdvancement()
  const tierProgress = nextTierKey ? getTierProgress(nextTierKey) : []
  const recommendedMissions = getRecommendedMissions()
  const insights = getProgressionInsights()

  return (
    <div className="space-y-8">
      {/* Current Status Header */}
      <div className="bg-gradient-to-br from-black/40 to-purple-900/20 rounded-lg p-8 backdrop-blur-sm border border-amber-400/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <SupremeAuthorityShield
              ideology={userProgression.currentIdeology as any}
              tier={userProgression.currentTier}
              size="lg"
              animated={true}
            />
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Authority Progression
              </h2>
              <p className="text-amber-300/70 italic font-serif">Progressio Auctoritatis</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline" className="text-amber-400 border-amber-400/30">
                  {userProgression.currentTier.toUpperCase()}
                </Badge>
                <span className="text-gray-400">•</span>
                <span className="text-amber-300">{userProgression.totalExperience.toLocaleString()} XP</span>
                <span className="text-gray-400">•</span>
                <span className="text-amber-300">Rating: {userProgression.authorityRating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {canAdvance && nextTierKey && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Button
                onClick={advanceToNextTier}
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold px-8 py-3"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Advance to {nextTierKey.charAt(0).toUpperCase() + nextTierKey.slice(1)}
              </Button>
            </motion.div>
          )}
        </div>

        {/* Progress to Next Tier */}
        {nextTierKey && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-amber-400 font-semibold">
                Progress to {nextTierKey.charAt(0).toUpperCase() + nextTierKey.slice(1)}
              </span>
              <span className="text-amber-300">{Math.round(progressToNext)}%</span>
            </div>
            <Progress value={progressToNext} className="h-3" />
          </div>
        )}
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-amber-400/20">
          <TabsTrigger value="progress" className="data-[state=active]:bg-amber-400/20">
            <Target className="w-4 h-4 mr-2" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="missions" className="data-[state=active]:bg-amber-400/20">
            <Zap className="w-4 h-4 mr-2" />
            Missions
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-amber-400/20">
            <Award className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-amber-400/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          {nextTierKey && (
            <Card className="bg-black/20 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400">
                  Requirements for {nextTierKey.charAt(0).toUpperCase() + nextTierKey.slice(1)} Tier
                </CardTitle>
                <CardDescription>Complete all requirements to advance to the next tier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tierProgress.map((requirement) => (
                    <div
                      key={requirement.id}
                      className={cn(
                        "p-4 rounded-lg border",
                        requirement.completed
                          ? "bg-green-400/10 border-green-400/30"
                          : "bg-gray-400/10 border-gray-400/30",
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{requirement.name}</h4>
                        {requirement.completed && <Star className="w-5 h-5 text-green-400" />}
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{requirement.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-amber-300">
                            {requirement.current} / {requirement.target}
                          </span>
                        </div>
                        <Progress value={(requirement.current / requirement.target) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="missions" className="space-y-6">
          {/* Active Missions */}
          {userProgression.activeMissions.length > 0 && (
            <Card className="bg-black/20 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Active Missions</CardTitle>
                <CardDescription>Currently in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProgression.activeMissions.map((missionId) => {
                    const mission = availableMissions.find((m) => m.id === missionId)
                    if (!mission) return null

                    return (
                      <div key={mission.id} className="p-4 bg-blue-400/10 rounded-lg border border-blue-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{mission.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getDifficultyColor(mission.difficulty)}>{mission.difficulty}</Badge>
                            <Button
                              size="sm"
                              onClick={() => completeMission(mission.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Complete
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{mission.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-amber-300">+{mission.experienceReward} XP</span>
                          {mission.timeLimit && (
                            <span className="text-red-300 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {mission.timeLimit}h limit
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommended Missions */}
          <Card className="bg-black/20 border-amber-400/20">
            <CardHeader>
              <CardTitle className="text-amber-400">Recommended Missions</CardTitle>
              <CardDescription>Missions suited to your current level and specialization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedMissions.map((mission) => (
                  <div key={mission.id} className="p-4 bg-amber-400/10 rounded-lg border border-amber-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{mission.title}</h4>
                      <Badge className={getDifficultyColor(mission.difficulty)}>{mission.difficulty}</Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{mission.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-amber-300">+{mission.experienceReward} XP</span>
                        {mission.timeLimit && (
                          <span className="text-red-300 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {mission.timeLimit}h
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => startMission(mission.id)}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        Start Mission
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const isUnlocked = userProgression.unlockedAchievements.includes(achievement.id)
              return (
                <motion.div
                  key={achievement.id}
                  className={cn(
                    "p-4 rounded-lg border",
                    isUnlocked
                      ? `bg-gradient-to-br from-${achievement.rarity === "legendary" ? "amber" : achievement.rarity === "epic" ? "purple" : "blue"}-400/10 to-black/20 border-${achievement.rarity === "legendary" ? "amber" : achievement.rarity === "epic" ? "purple" : "blue"}-400/30`
                      : "bg-gray-400/10 border-gray-400/30 opacity-60",
                  )}
                  animate={isUnlocked ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className={cn("font-semibold", isUnlocked ? "text-white" : "text-gray-500")}>
                        {achievement.name}
                      </h4>
                      <Badge className={cn("text-xs", getRarityColor(achievement.rarity))}>{achievement.rarity}</Badge>
                    </div>
                  </div>
                  <p className={cn("text-sm mb-2", isUnlocked ? "text-gray-300" : "text-gray-500")}>
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-sm", isUnlocked ? "text-amber-300" : "text-gray-500")}>
                      +{achievement.points} XP
                    </span>
                    {isUnlocked && <Star className="w-4 h-4 text-amber-400" />}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-green-400/10 border-green-400/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Strength Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {insights.strengthAreas.map((area, index) => (
                    <li key={index} className="text-green-300 flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      {area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-orange-400/10 border-orange-400/20">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Improvement Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {insights.improvementAreas.map((area, index) => (
                    <li key={index} className="text-orange-300 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      {area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-purple-400/10 border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Next Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {insights.nextMilestones.map((milestone, index) => (
                    <li key={index} className="text-purple-300 flex items-center">
                      <Trophy className="w-4 h-4 mr-2" />
                      {milestone}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Progression History */}
          <Card className="bg-black/20 border-amber-400/20">
            <CardHeader>
              <CardTitle className="text-amber-400">Recent Progression History</CardTitle>
              <CardDescription>Your latest achievements and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userProgression.progressionHistory
                  .slice(-5)
                  .reverse()
                  .map((entry, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-amber-400/5 rounded-lg">
                      <div className="w-2 h-2 bg-amber-400 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{entry.event}</span>
                          <span className="text-xs text-gray-400">{entry.date.toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-400">{entry.description}</p>
                        {entry.experienceGained > 0 && (
                          <span className="text-xs text-amber-300">+{entry.experienceGained} XP</span>
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
