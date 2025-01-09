import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from './AuthContext'
import { GAME_CONFIG } from '@/utils/constants/gameConfig'

const GameContext = createContext({})

export function GameProvider({ children }) {
  const { user } = useAuth()
  const [level, setLevel] = useState(1)
  const [points, setPoints] = useState(0)
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadGameProgress()
    }
  }, [user])

  const loadGameProgress = async () => {
    try {
      // First check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

      // If profile doesn't exist, create it
      if (!profile) {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{ 
            id: user.id,
            current_level: 1,
            total_points: 0
          }])
          .select()
          .single()

        if (createError) throw createError
        
        setLevel(1)
        setPoints(0)
        setLoading(false)
        return
      }

      // If profile exists, load the data
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('current_level, total_points')
        .eq('id', user.id)
        .single()

      if (error) throw error

      setLevel(profileData.current_level)
      setPoints(profileData.total_points)

      // Load achievements
      const { data: userAchievements, error: achievementsError } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievements (*)
        `)
        .eq('user_id', user.id)

      if (achievementsError) throw achievementsError

      setAchievements(userAchievements)
    } catch (error) {
      console.error('Error loading game progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const addPoints = async (amount) => {
    try {
      const newTotal = points + amount
      const { error } = await supabase
        .from('profiles')
        .update({ total_points: newTotal })
        .eq('id', user.id)

      if (error) throw error

      setPoints(newTotal)

      // Check for level up
      const nextLevel = GAME_CONFIG.levels.find(l => 
        l.pointsRequired > newTotal
      )?.id || level + 1

      if (nextLevel > level) {
        await levelUp(nextLevel)
      }
    } catch (error) {
      console.error('Error adding points:', error)
    }
  }

  const levelUp = async (newLevel) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ current_level: newLevel })
        .eq('id', user.id)

      if (error) throw error

      setLevel(newLevel)
    } catch (error) {
      console.error('Error updating level:', error)
    }
  }

  const unlockAchievement = async (achievementId) => {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .insert([
          { user_id: user.id, achievement_id: achievementId }
        ])
        .select(`
          *,
          achievements (*)
        `)

      if (error) throw error

      setAchievements(prev => [...prev, data[0]])
    } catch (error) {
      console.error('Error unlocking achievement:', error)
    }
  }

  const value = {
    level,
    points,
    achievements,
    loading,
    addPoints,
    unlockAchievement,
    getCurrentLevelProgress: () => {
      const currentLevelConfig = GAME_CONFIG.levels.find(l => l.id === level)
      const nextLevelConfig = GAME_CONFIG.levels.find(l => l.id === level + 1)
      
      if (!nextLevelConfig) return 100

      const levelPoints = points - currentLevelConfig.pointsRequired
      const pointsNeeded = nextLevelConfig.pointsRequired - currentLevelConfig.pointsRequired
      return (levelPoints / pointsNeeded) * 100
    }
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

