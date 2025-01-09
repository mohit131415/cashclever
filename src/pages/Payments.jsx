'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { UPIPaymentForm } from '@/components/upi/UPIPaymentForm'
import { UPIHistory } from '@/components/upi/UPIHistory'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export default function Payments() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return

    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from('upi_transactions')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setTransactions(data)
      } catch (error) {
        console.error('Error fetching transactions:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [user])

  const handlePayment = async (paymentData) => {
    try {
      const { data, error } = await supabase
        .from('upi_transactions')
        .insert([{
          user_id: user.id,
          transaction_id: `TXN${Date.now()}`,
          ...paymentData,
          status: 'pending',
          type: 'payment'
        }])
        .select()

      if (error) throw error

      setTransactions([data[0], ...transactions])
      return { success: true, data: data[0] }
    } catch (error) {
      console.error('Error processing payment:', error)
      return { success: false, error: error.message }
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="send">
        <TabsList>
          <TabsTrigger value="send">Send Money</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <UPIPaymentForm onSubmit={handlePayment} />
        </TabsContent>

        <TabsContent value="history">
          <UPIHistory transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

