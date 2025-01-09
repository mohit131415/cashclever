import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'

export function useSavings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getSavingsGoals = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('savings_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [user])

  const createSavingsGoal = async (goalData) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('savings_goals')
        .insert([{
          ...goalData,
          user_id: user.id,
          current_amount: goalData.initial_amount || 0,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateSavingsGoal = async (id, updates) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('savings_goals')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteSavingsGoal = async (id) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('savings_goals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const addContribution = async (goalId, amount) => {
    try {
      setLoading(true)
      // First, get the current goal
      const { data: goal, error: fetchError } = await supabase
        .from('savings_goals')
        .select('current_amount')
        .eq('id', goalId)
        .eq('user_id', user.id)
        .single()

      if (fetchError) throw fetchError

      // Update the goal with new amount
      const { data, error: updateError } = await supabase
        .from('savings_goals')
        .update({
          current_amount: goal.current_amount + amount,
          last_contribution_at: new Date().toISOString()
        })
        .eq('id', goalId)
        .eq('user_id', user.id)
        .select()
        .single()

      if (updateError) throw updateError

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getSavingsStats = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('savings_goals')
        .select('current_amount, target_amount, deadline')
        .eq('user_id', user.id)

      if (error) throw error

      const stats = {
        totalSaved: data.reduce((sum, goal) => sum + goal.current_amount, 0),
        totalTarget: data.reduce((sum, goal) => sum + goal.target_amount, 0),
        activeGoals: data.length,
        completedGoals: data.filter(goal => 
          goal.current_amount >= goal.target_amount
        ).length
      }

      return stats
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
    getSavingsGoals,
    createSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    addContribution,
    getSavingsStats
  }
}

