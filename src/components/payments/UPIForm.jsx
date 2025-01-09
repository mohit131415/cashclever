import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { isValidUPI } from '@/utils/upiHelpers'

export default function UPIForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    upiId: '',
    amount: '',
    note: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidUPI(formData.upiId)) {
      setError('Please enter a valid UPI ID')
      return
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    setLoading(true)
    setError('')

    try {
      await onSubmit(formData)
      setSuccess(true)
      setFormData({ upiId: '', amount: '', note: '' })
    } catch (err) {
      setError('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              value={formData.upiId}
              onChange={(e) => setFormData(prev => ({ ...prev, upiId: e.target.value }))}
              placeholder="name@upi"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AAB4BC]">₹</span>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="pl-8"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              value={formData.note}
              onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
              placeholder="Add a note..."
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert className="bg-[#45D18F]/10 text-[#45D18F] border-[#45D18F]">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Your payment has been sent successfully.</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Money
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

