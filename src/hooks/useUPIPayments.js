import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { useUPI } from '@/context/UPIContext'

export function useUPIPayments() {
  const { user } = useAuth()
  const { initiatePayment: contextInitiatePayment } = useUPI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getTransactions = useCallback(async (filters = {}) => {
    try {
      setLoading(true)
      let query = supabase
        .from('upi_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (filters.type) {
        query = query.eq('type', filters.type)
      }

      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      if (filters.startDate && filters.endDate) {
        query = query
          .gte('created_at', filters.startDate)
          .lte('created_at', filters.endDate)
      }

      const { data, error } = await query

      if (error) throw error

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [user])

  const sendMoney = async (paymentDetails) => {
    try {
      setLoading(true)
      const transaction = await contextInitiatePayment(paymentDetails)

      // Simulate UPI payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Update transaction status (in a real app, this would be handled by a webhook)
      const { error } = await supabase
        .from('upi_transactions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('transaction_id', transaction.transaction_id)

      if (error) throw error

      return transaction
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const requestMoney = async (requestDetails) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('upi_transactions')
        .insert([{
          user_id: user.id,
          upi_id: requestDetails.upiId,
          amount: requestDetails.amount,
          note: requestDetails.note,
          type: 'request',
          status: 'pending'
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

  const verifyUPI = async (upiId) => {
    try {
      setLoading(true)
      // In a real app, this would call a UPI verification API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate verification (random success/failure)
      const isValid = Math.random() > 0.1

      return {
        isValid,
        message: isValid ? 'UPI ID is valid' : 'Invalid UPI ID'
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getPaymentStats = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('upi_transactions')
        .select('amount, type, status, created_at')
        .eq('user_id', user.id)
        .eq('status', 'completed')

      if (error) throw error

      const stats = {
        totalSent: data
          .filter(t => t.type === 'payment')
          .reduce((sum, t) => sum + t.amount, 0),
        totalReceived: data
          .filter(t => t.type === 'collection')
          .reduce((sum, t) => sum + t.amount, 0),
        transactionCount: data.length,
        recentTransactions: data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5)
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
    getTransactions,
    sendMoney,
    requestMoney,
    verifyUPI,
    getPaymentStats
  }
}

