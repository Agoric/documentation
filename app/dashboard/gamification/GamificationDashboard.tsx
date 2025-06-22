"use client"

import { useState } from "react"
import { Trophy, Target, Crown, Shield, Sword } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { motion } from "framer-motion"

const achievements = [
  {
    id: "first-trade",
    title: "First Trader",
    latinTitle: "Primus Mercator",
    description: "Complete your first trade on the platform",
    icon: Target,
    points: 100,
    rarity: "Common",
    unlocked: true,
    progress: 100,
  },
  {
    id: "nft-collector",
    title: "NFT Collector",
    latinTitle: "Collector Digitalis",
    description: "Acquire 10 unique NFTs in your collection",
    icon: Crown,
    points: 500,
    rarity: "Rare",
    unlocked: true,
    progress: 100,
  },
  {
    id: "property-investor",
    title: "Property Investor",
    latinTitle: "Investor Praediorum",
    description: "Invest in virtual real estate properties",
    icon: Shield,
    points: 1000,
    rarity: "Epic",
    unlocked: false,
    progress: 60,
  },
  {
    id: "trading-master",
    title: "Trading Master",
    latinTitle: "Magister Negotii",
    description: "Execute 100 successful trades",
    icon: Sword,
    points: 2000,
    rarity: "Legendary",
    unlocked: false,
    progress: 25,
  },
]

const leaderboard = [
  { rank: 1, name: "Marcus Aurelius", points: 15420, title: "IMPERATOR SUPREMUS" },
  { rank: 2, name: "Julius Caesar", points: 12890, title: "CONSUL MAXIMUS" },
  { rank: 3, name: "Augustus", points: 11250, title: "PRINCEPS DIGITALIS" },
  { rank: 4, name: "Trajan", points: 9870, title: "OPTIMUS MERCATOR" },
  { rank: 5, name: "Hadrian", points: 8650, title: "CONSTRUCTOR IMPERII" },
]

const challenges = [
  {
    id: "weekly-trader",
    title: "Weekly Trader",
    latinTitle: "Mercator Hebdomadalis",
    description: "Complete 5 trades this week",
    reward: "250 Points + Rare Badge",
    deadline: "3 days remaining",
    progress: 60,
    difficulty: "Medium",
  },
  {
    id: "nft-explorer",
    title: "NFT Explorer",
    latinTitle: "Explorator NFT",
    description: "Browse 50 different NFT collections",
    reward: "500 Points + Epic Badge",
    deadline: "1 week remaining",
    progress: 30,
    difficulty: "Hard",
  },
]

export default function GamificationDashboard() {
  const [selectedTab, setSelectedTab] = useState("achievements")

  const userStats = {
    totalPoints: 3420,
    level: 12,
    nextLevelPoints: 4000,
    rank: 156,
    achievementsUnlocked: 8,
    totalAchievements: 24,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 p-6">
      {/* Roman Column Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.1'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <SupremeAuthorityCoin size="lg" variant="logo" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif mb-2">
            Victory Achievement Empire
          </h1>

          <p className="text-amber-300/80 text-lg font-medium italic font-serif">Ludus Victoriae Imperium</p>
        </motion.div>

        {/* User Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-300 font-serif text-sm">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats.totalPoints.toLocaleString()}</div>
              <p className="text-indigo-200/70 text-xs italic font-serif">Puncta Totalia</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-300 font-serif text-sm">Empire Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Level {userStats.level}</div>
              <Progress value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} className="mt-2" />
              <p className="text-indigo-200/70 text-sm mt-1">
                {userStats.nextLevelPoints - userStats.totalPoints} to next level
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-300 font-serif text-sm">Empire Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">#{userStats.rank}</div>
              <p className="text-indigo-200/70 text-xs italic font-serif">Ordo Imperii</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-300 font-serif text-sm">Victories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {userStats.achievementsUnlocked}/{userStats.totalAchievements}
              </div>
              <p className="text-indigo-200/70 text-xs italic font-serif">Victoriae</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex space-x-1 mb-8 bg-purple-900/30 backdrop-blur-sm rounded-lg p-1 border border-amber-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { id: "achievements", label: "Achievements", latinLabel: "Victoriae" },
            { id: "leaderboard", label: "Leaderboard", latinLabel: "Tabula Honoris" },
            { id: "challenges", label: "Challenges", latinLabel: "Certamina" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "default" : "ghost"}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 ${
                selectedTab === tab.id
                  ? "bg-gradient-to-r from-amber-600 to-purple-600 text-white"
                  : "text-amber-300 hover:bg-amber-500/20"
              }`}
              style={{
                clipPath: selectedTab === tab.id ? "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" : "none",
              }}
            >
              <div className="text-center">
                <div className="font-serif font-bold text-sm">{tab.label}</div>
                <div className="text-xs opacity-80 italic font-serif">{tab.latinLabel}</div>
              </div>
            </Button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
          {selectedTab === "achievements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon

                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                  >
                    <Card
                      className={`bg-gradient-to-br backdrop-blur-xl border transition-all duration-300 ${
                        achievement.unlocked
                          ? "from-amber-900/30 to-purple-900/30 border-amber-400/40"
                          : "from-purple-900/30 to-indigo-900/30 border-purple-400/20"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-3 rounded-lg ${
                                achievement.unlocked
                                  ? "bg-gradient-to-br from-amber-600 to-purple-600"
                                  : "bg-gradient-to-br from-gray-600 to-gray-700"
                              }`}
                              style={{
                                clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                              }}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>

                            <div>
                              <CardTitle className="text-amber-300 font-serif text-lg">{achievement.title}</CardTitle>
                              <CardDescription className="text-purple-200/80 italic font-serif">
                                {achievement.latinTitle}
                              </CardDescription>
                            </div>
                          </div>

                          <Badge
                            className={`${
                              achievement.unlocked
                                ? "bg-emerald-600/20 text-emerald-300 border-emerald-500/30"
                                : "bg-gray-600/20 text-gray-300 border-gray-500/30"
                            }`}
                          >
                            {achievement.points} pts
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-indigo-200/70 mb-4">{achievement.description}</p>

                        {!achievement.unlocked && (
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-amber-300">Progress</span>
                              <span className="text-indigo-200/70">{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} />
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                          <Badge variant="outline" className="text-xs">
                            {achievement.rarity}
                          </Badge>

                          {achievement.unlocked && (
                            <div className="flex items-center text-emerald-300 text-sm">
                              <Trophy className="w-4 h-4 mr-1" />
                              Unlocked
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}

          {selectedTab === "leaderboard" && (
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif text-xl">Global Leaderboard</CardTitle>
                <CardDescription className="text-purple-200/80 italic font-serif">
                  Tabula Honoris Globalis
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-lg border border-amber-400/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1
                              ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black"
                              : user.rank === 2
                                ? "bg-gradient-to-r from-gray-300 to-gray-400 text-black"
                                : user.rank === 3
                                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                                  : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                          }`}
                        >
                          {user.rank}
                        </div>

                        <div>
                          <div className="font-semibold text-white">{user.name}</div>
                          <div className="text-sm text-amber-300 font-serif">{user.title}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-white">{user.points.toLocaleString()}</div>
                        <div className="text-sm text-indigo-200/70">points</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTab === "challenges" && (
            <div className="space-y-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-amber-300 font-serif text-lg">{challenge.title}</CardTitle>
                          <CardDescription className="text-purple-200/80 italic font-serif">
                            {challenge.latinTitle}
                          </CardDescription>
                        </div>

                        <Badge
                          className={`${
                            challenge.difficulty === "Easy"
                              ? "bg-green-600/20 text-green-300"
                              : challenge.difficulty === "Medium"
                                ? "bg-yellow-600/20 text-yellow-300"
                                : "bg-red-600/20 text-red-300"
                          }`}
                        >
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-indigo-200/70 mb-4">{challenge.description}</p>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-amber-300">Progress</span>
                            <span className="text-indigo-200/70">{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-amber-300 font-semibold">Reward</div>
                            <div className="text-indigo-200/70">{challenge.reward}</div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-red-300 font-semibold">Deadline</div>
                            <div className="text-indigo-200/70">{challenge.deadline}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
