'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function PhoneLoginForm() {
  const { signInWithPhone } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    if (!phoneNumber.match(/^[6-9]\d{9}$/)) {
      setError('Please enter a valid phone number')
      return
    }

    setLoading(true)
    setError('')

    try {
      await signInWithPhone(phoneNumber)
      setStep('otp')
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1)
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      setError('Please enter a valid OTP')
      return
    }

    setLoading(true)
    setError('')

    try {
      await signInWithPhone(phoneNumber, otpValue)
    } catch (err) {
      setError('Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8"
    >
      <h2 className="text-2xl font-bold text-[#2D3A45] mb-2">Phone Login</h2>
      <p className="text-[#AAB4BC] mb-6">
        {step === 'phone' 
          ? 'Enter your phone number to receive an OTP'
          : 'Enter the OTP sent to your phone'
        }
      </p>

      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10 h-12"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#00A9FF] hover:bg-[#0098E5]"
          >
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                Sending OTP...
              </motion.div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send OTP
                <ArrowRight size={20} />
              </span>
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Enter OTP</Label>
            <div className="flex gap-2 justify-between">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  name={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-lg font-bold"
                  maxLength={1}
                  required
                />
              ))}
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#00A9FF] hover:bg-[#0098E5]"
          >
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                Verifying...
              </motion.div>
            ) : (
              'Verify OTP'
            )}
          </Button>

          <button
            type="button"
            onClick={() => setStep('phone')}
            className="w-full text-[#00A9FF] text-sm hover:underline"
          >
            Change Phone Number
          </button>
        </form>
      )}
    </motion.div>
  )
}

