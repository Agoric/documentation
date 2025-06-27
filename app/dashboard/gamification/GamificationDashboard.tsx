"use client"

// GamificationDashboard.tsx
// This is a placeholder for the Gamification Dashboard component.
// It will be responsible for displaying and managing gamification elements.

import { useState, useEffect } from "react"

interface Achievement {
  id: number
  name: string
  description: string
  isUnlocked: boolean
  isPremium: boolean
}

interface Reward {
  id: number
  name: string
  description: string
  isVIPOnly: boolean
}

interface Challenge {
  id: number
  name: string
  description: string
  isExclusive: boolean
}

const GamificationDashboard = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])
  const [bonusMultiplierEnabled, setBonusMultiplierEnabled] = useState<boolean>(false)
  const [challenges, setChallenges] = useState<Challenge[]>([])

  useEffect(() => {
    // ---- 1.  Seed initial data ---------------------------------------------
    const initialAchievements: Achievement[] = [
      { id: 1, name: "First Step", description: "Completed your first task.", isUnlocked: false, isPremium: false },
      { id: 2, name: "Explorer", description: "Visited all sections of the app.", isUnlocked: false, isPremium: false },
      { id: 3, name: "Master", description: "Achieved expert level in a skill.", isUnlocked: false, isPremium: true },
    ]

    const initialRewards: Reward[] = [
      { id: 1, name: "Badge", description: "A shiny badge for your profile.", isVIPOnly: false },
      { id: 2, name: "Discount", description: "10% off your next purchase.", isVIPOnly: true },
    ]

    const initialChallenges: Challenge[] = [
      { id: 1, name: "Daily Grind", description: "Complete 5 tasks today.", isExclusive: false },
      { id: 2, name: "Weekend Warrior", description: "Complete 10 tasks this weekend.", isExclusive: true },
    ]

    // ---- 2.  Apply the “unlock everything” rules ONCE -----------------------
    const unlockedAchievements = initialAchievements.map((a) => (a.isPremium ? { ...a, isUnlocked: true } : a))

    const unlockedRewards = initialRewards.map((r) => ({ ...r, isVIPOnly: false }))

    const unlockedChallenges = initialChallenges.map((c) => ({ ...c, isExclusive: false }))

    // ---- 3.  Commit to state ------------------------------------------------
    setAchievements(unlockedAchievements)
    setRewards(unlockedRewards)
    setChallenges(unlockedChallenges)
    setBonusMultiplierEnabled(true)
  }, []) // ← runs only once

  return (
    <div>
      <h1>Gamification Dashboard</h1>
      <h2>Achievements</h2>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement.id}>
            {achievement.name} - {achievement.description} - Unlocked: {achievement.isUnlocked ? "Yes" : "No"} -
            Premium: {achievement.isPremium ? "Yes" : "No"}
          </li>
        ))}
      </ul>

      <h2>Rewards</h2>
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id}>
            {reward.name} - {reward.description} - VIP Only: {reward.isVIPOnly ? "Yes" : "No"}
          </li>
        ))}
      </ul>

      <h2>Challenges</h2>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            {challenge.name} - {challenge.description} - Exclusive: {challenge.isExclusive ? "Yes" : "No"}
          </li>
        ))}
      </ul>

      <h2>Bonus Multiplier</h2>
      <p>Enabled: {bonusMultiplierEnabled ? "Yes" : "No"}</p>
    </div>
  )
}

export default GamificationDashboard
