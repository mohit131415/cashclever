'use client'

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import UPIPaymentForm from '@/components/upi/UPIPaymentForm'
import UPIStatus from '@/components/upi/UPIStatus'
import QRGenerator from '@/components/payments/QRGenerator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Payment() {
  const navigate = useNavigate()

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">UPI Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pay" className="space-y-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="pay">Pay</TabsTrigger>
                <TabsTrigger value="collect">Collect</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pay">
                <UPIPaymentForm 
                  type="payment"
                  onSuccess={() => navigate('/upi/history')} 
                />
              </TabsContent>
              
              <TabsContent value="collect">
                <UPIPaymentForm 
                  type="collect"
                  onSuccess={() => navigate('/upi/history')} 
                />
              </TabsContent>
              
              <TabsContent value="qr">
                <QRGenerator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <UPIStatus 
          transactionId="latest"
          onComplete={(status) => {
            if (status === 'success') {
              navigate('/upi/history')
            }
          }} 
        />
      </motion.div>
    </div>
  )
}

