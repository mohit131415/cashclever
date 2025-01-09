import { supabase } from './client'

export const game = {
  // Get user's game progress
  getProgress: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('total_points, current_level')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data
  },

  // Update user's points
  updatePoints: async (userId, points) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ total_points: points })
      .eq('id', userId)
      .select()
    if (error) throw error
    return data[0]
  },

  // Get user's achievements
  getAchievements: async (userId) => {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievements (*)
      `)
      .eq('user_id', userId)
    if (error) throw error
    return data
  },

  // Add new achievement
  addAchievement: async (userId, achievementId) => {
    const { data, error } = await supabase
      .from('user_achievements')
      .insert([
        { user_id: userId, achievement_id: achievementId }
      ])
      .select()
    if (error) throw error
    return data[0]
  }
}