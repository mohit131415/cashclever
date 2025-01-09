'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { isValidEmail } from '@/utils/validators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function PasswordResetForm() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.')
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
      <Link
        to="/login"
        className="inline-flex items-center gap-2 text-[#00A9FF] hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        Back to Login
      </Link>

      <h2 className="text-2xl font-bold text-[#2D3A45] mb-2">Reset Password</h2>
      <p className="text-[#AAB4BC] mb-6">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      {success ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="mx-auto w-12 h-12 bg-[#00A9FF] rounded-full flex items-center justify-center mb-4">
            <Check className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-[#2D3A45] mb-2">
            Check your email
          </h3>
          <p className="text-[#AAB4BC] mb-6">
            We've sent password reset instructions to {email}
          </p>
          <Link
            to="/login"
            className="text-[#00A9FF] hover:underline"
          >
            Back to Login
          </Link>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              placeholder="you@example.com"
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base bg-[#00A9FF] hover:bg-[#0098E5]"
          >
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                Sending Instructions...
              </motion.div>
            ) : (
              'Send Reset Instructions'
            )}
          </Button>
        </form>
      )}
    </motion.div>
  )
}

