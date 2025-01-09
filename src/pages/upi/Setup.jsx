'use client'

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import UPIVerification from '@/components/upi/UPIVerification'
import UPIQRScanner from '@/components/upi/UPIQRScanner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Setup() {
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
            <CardTitle className="text-2xl">Set Up UPI</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="verify" className="space-y-6">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="verify">Verify UPI ID</TabsTrigger>
                <TabsTrigger value="scan">Scan QR</TabsTrigger>
              </TabsList>
              
              <TabsContent value="verify">
                <UPIVerification onSuccess={() => navigate('/upi/payment')} />
              </TabsContent>
              
              <TabsContent value="scan">
                <UPIQRScanner onScan={(data) => {
                  console.log('QR Scanned:', data)
                  navigate('/upi/payment')
                }} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

