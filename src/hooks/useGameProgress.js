import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'

export function useGameProgress() {
  const { user } = useAuth()
  const { addPoints: contextAddPoints } = useGame()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getProgress = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          current_level,
          total_points,
          user_achievements (
            *,
            achievements (*)
          )
        `)
        .eq('id', user.id)
        .single()

      if (error) throw error

      return {
        level: data.current_level,
        points: data.total_points,
        achievements: data.user_achievements
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [user])

  const completeQuiz = async (quizId, score) => {
    try {
      setLoading(true)
      // Record quiz attempt
      const { error: attemptError } = await supabase
        .from('quiz_attempts')
        .insert([{
          user_id: user.id,
          quiz_id: quizId,
          score,
          completed_at: new Date().toISOString()
        }])

      if (attemptError) throw attemptError

      // Award points based on score
      const pointsEarned = Math.round(score * 100)
      await contextAddPoints(pointsEarned)

      return pointsEarned
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getQuizHistory = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select(`
          *,
          quizzes (*)
        `)
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })

      if (error) throw error

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getLeaderboard = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, total_points, current_level')
        .order('total_points', { ascending: false })
        .limit(10)

      if (error) throw error

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getDailyStreak = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('last_login_at, streak_days')
        .eq('id', user.id)
        .single()

      if (error) throw error

      const lastLogin = new Date(data.last_login_at)
      const today = new Date()
      const daysSinceLastLogin = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24))

      let newStreak = data.streak_days

      if (daysSinceLastLogin === 1) {
        // Increment streak
        newStreak += 1
        await supabase
          .from('profiles')
          .update({
            streak_days: newStreak,
            last_login_at: today.toISOString()
          })
          .eq('id', user.id)
      } else if (daysSinceLastLogin > 1) {
        // Reset streak
        newStreak = 1
        await supabase
          .from('profiles')
          .update({
            streak_days: newStreak,
            last_login_at: today.toISOString()
          })
          .eq('id', user.id)
      }

      return newStreak
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getProgress,
    completeQuiz,
    getQuizHistory,
    getLeaderboard,
    getDailyStreak
  }
}

