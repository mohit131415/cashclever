export { UPIPaymentForm }
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, IndianRupee, Send, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { isValidUPI } from '@/utils/upiHelpers'

export default function UPIPaymentForm() {
  const [formData, setFormData] = useState({
    upiId: '',
    amount: '',
    note: '',
    paymentMode: 'direct' // 'direct' or 'collect'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidUPI(formData.upiId)) {
      return
    }
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">UPI Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="direct" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="direct">Pay</TabsTrigger>
            <TabsTrigger value="collect">Collect</TabsTrigger>
          </TabsList>

          <TabsContent value="direct">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="upiId"
                    placeholder="name@upi"
                    className="pl-10"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input
                  id="note"
                  placeholder="Add a note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                <Send className="mr-2 h-4 w-4" />
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="collect">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="collectUpiId">Request From (UPI ID)</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="collectUpiId"
                    placeholder="name@upi"
                    className="pl-10"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="collectAmount">Amount</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="collectAmount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {loading ? 'Processing...' : 'Request Payment'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}