import { createContext, useContext, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from './AuthContext'
import { generateTransactionId } from '@/utils/upiHelpers'

const UPIContext = createContext({})

export function UPIProvider({ children }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [activeTransaction, setActiveTransaction] = useState(null)

  const initiatePayment = async ({ upiId, amount, note }) => {
    setLoading(true)
    try {
      const transactionId = generateTransactionId()
      
      const { data, error } = await supabase
        .from('upi_transactions')
        .insert([{
          user_id: user.id,
          transaction_id: transactionId,
          upi_id: upiId,
          amount,
          note,
          type: 'payment',
          status: 'pending'
        }])
        .select()
        .single()

      if (error) throw error

      setActiveTransaction(data)
      return data
    } catch (error) {
      console.error('Error initiating payment:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const requestPayment = async ({ upiId, amount, note }) => {
    setLoading(true)
    try {
      const transactionId = generateTransactionId()
      
      const { data, error } = await supabase
        .from('upi_transactions')
        .insert([{
          user_id: user.id,
          transaction_id: transactionId,
          upi_id: upiId,
          amount,
          note,
          type: 'collection',
          status: 'pending'
        }])
        .select()
        .single()

      if (error) throw error

      setActiveTransaction(data)
      return data
    } catch (error) {
      console.error('Error requesting payment:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateTransactionStatus = async (transactionId, status) => {
    try {
      const { data, error } = await supabase
        .from('upi_transactions')
        .update({ 
          status,
          completed_at: status === 'completed' ? new Date().toISOString() : null
        })
        .eq('transaction_id', transactionId)
        .select()
        .single()

      if (error) throw error

      if (activeTransaction?.transaction_id === transactionId) {
        setActiveTransaction(data)
      }

      return data
    } catch (error) {
      console.error('Error updating transaction:', error)
      throw error
    }
  }

  const getTransactionHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('upi_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data
    } catch (error) {
      console.error('Error fetching transactions:', error)
      throw error
    }
  }

  const value = {
    loading,
    activeTransaction,
    initiatePayment,
    requestPayment,
    updateTransactionStatus,
    getTransactionHistory,
    clearActiveTransaction: () => setActiveTransaction(null)
  }

  return (
    <UPIContext.Provider value={value}>
      {children}
    </UPIContext.Provider>
  )
}

export const useUPI = () => {
  const context = useContext(UPIContext)
  if (context === undefined) {
    throw new Error('useUPI must be used within a UPIProvider')
  }
  return context
}

