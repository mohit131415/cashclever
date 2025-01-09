import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function UPIVerification() {
  const [upiId, setUpiId] = useState('')
  const [verificationStatus, setVerificationStatus] = useState(null) // null, 'verifying', 'valid', 'invalid'

  const verifyUPI = async () => {
    setVerificationStatus('verifying')
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setVerificationStatus(Math.random() > 0.3 ? 'valid' : 'invalid')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          UPI Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="upiId">Enter UPI ID to verify</Label>
            <div className="relative">
              <Input
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="name@upi"
                className="pr-10"
              />
              {verificationStatus === 'valid' && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
              )}
            </div>
          </div>

          <Button
            onClick={verifyUPI}
            disabled={!upiId || verificationStatus === 'verifying'}
            className="w-full"
          >
            {verificationStatus === 'verifying' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify UPI ID'
            )}
          </Button>

          {verificationStatus && verificationStatus !== 'verifying' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                verificationStatus === 'valid'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {verificationStatus === 'valid'
                ? 'UPI ID is valid and active'
                : 'UPI ID is invalid or inactive'
              }
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

