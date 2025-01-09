'use client'

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import UPIHistory from '@/components/upi/UPIHistory'
import PaymentHistory from '@/components/payments/PaymentHistory'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function History() {
  const navigate = useNavigate()

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/upi/payment')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Transaction History</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <UPIHistory />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentHistory />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

