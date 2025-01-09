import { supabase } from './client'
import { v4 as uuidv4 } from 'uuid'

export const upi = {
  // Create a new UPI transaction
  createTransaction: async (transaction) => {
    const transactionWithId = {
      ...transaction,
      transaction_id: `TXN_${uuidv4()}`,
      status: 'pending'
    }
    
    const { data, error } = await supabase
      .from('upi_transactions')
      .insert([transactionWithId])
      .select()
    if (error) throw error
    return data[0]
  },

  // Get all transactions for a user
  getTransactions: async (userId) => {
    const { data, error } = await supabase
      .from('upi_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Update transaction status
  updateStatus: async (transactionId, status) => {
    const updates = {
      status,
      ...(status === 'completed' && { completed_at: new Date().toISOString() })
    }
    
    const { data, error } = await supabase
      .from('upi_transactions')
      .update(updates)
      .eq('transaction_id', transactionId)
      .select()
    if (error) throw error
    return data[0]
  },

  // Get transaction by ID
  getTransaction: async (transactionId) => {
    const { data, error } = await supabase
      .from('upi_transactions')
      .select('*')
      .eq('transaction_id', transactionId)
      .single()
    if (error) throw error
    return data
  }
}