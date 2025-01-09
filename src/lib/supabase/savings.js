import { supabase } from './client'

export const savings = {
  // Create a new savings goal
  createGoal: async (goal) => {
    const { data, error } = await supabase
      .from('savings_goals')
      .insert([goal])
      .select()
    if (error) throw error
    return data[0]
  },

  // Get all savings goals for a user
  getGoals: async (userId) => {
    const { data, error } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Update savings goal progress
  updateGoalProgress: async (goalId, amount) => {
    const { data, error } = await supabase
      .from('savings_goals')
      .update({ current_amount: amount })
      .eq('id', goalId)
      .select()
    if (error) throw error
    return data[0]
  },

  // Complete a savings goal
  completeGoal: async (goalId) => {
    const { data, error } = await supabase
      .from('savings_goals')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', goalId)
      .select()
    if (error) throw error
    return data[0]
  }
}