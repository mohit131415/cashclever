import { supabase } from './client'

export const expenses = {
  // Create a new expense
  create: async (expense) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert([expense])
      .select()
    if (error) throw error
    return data[0]
  },

  // Get all expenses for a user
  getAll: async (userId) => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
    if (error) throw error
    return data
  },

  // Get expenses by category
  getByCategory: async (userId, category) => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .eq('category', category)
      .order('date', { ascending: false })
    if (error) throw error
    return data
  },

  // Update an expense
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  // Delete an expense
  delete: async (id) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}