import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'

export function useExpenses() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const fetchExpenses = async () => {
      try {
        const { data, error } = await supabase
          .from('expenses')
          .select('*')
          .order('date', { ascending: false })

        if (error) throw error
        setExpenses(data)
      } catch (error) {
        console.error('Error fetching expenses:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [user])

  const addExpense = async (expenseData) => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([{ ...expenseData, user_id: user.id }])
        .select()

      if (error) throw error
      setExpenses([...expenses, data[0]])
      return { success: true, data }
    } catch (error) {
      console.error('Error adding expense:', error)
      return { success: false, error: error.message }
    }
  }

  return { expenses, loading, error, addExpense }
}

