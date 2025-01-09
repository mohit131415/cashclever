'use client'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { isValidEmail, isValidPassword } from '@/utils/validators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SignUpForm() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'Contains uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'Contains lowercase letter', test: (p) => /[a-z]/.test(p) },
    { label: 'Contains number', test: (p) => /\d/.test(p) }
  ]

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!isValidPassword(formData.password)) {
      setError('Password does not meet requirements')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')

    try {
      await signUp(formData.email, formData.password)
      setShowVerificationDialog(true)
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationClose = () => {
    setShowVerificationDialog(false)
    navigate('/auth/login')
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-[#2D3A45] mb-2">Create Account</h2>
        <p className="text-[#AAB4BC] mb-6">Join CashClever and start your financial journey</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="h-12"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="h-12"
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mt-2 space-y-2">
              {passwordRequirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  {req.test(formData.password) ? (
                    <CheckCircle className="text-[#00A9FF]" size={16} />
                  ) : (
                    <XCircle className="text-gray-300" size={16} />
                  )}
                  <span className={req.test(formData.password) ? 'text-[#00A9FF]' : 'text-[#AAB4BC]'}>
                    {req.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="h-12"
              placeholder="Confirm your password"
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
            className="w-full h-12 bg-[#00A9FF] hover:bg-[#0098E5]"
          >
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                Creating Account...
              </motion.div>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[#AAB4BC]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00A9FF] hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </motion.div>

      <Dialog open={showVerificationDialog} onOpenChange={handleVerificationClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify your email</DialogTitle>
            <DialogDescription>
              We've sent a verification link to {formData.email}. Please check your inbox and click the link to verify your account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Mail className="h-6 w-6 text-[#00A9FF]" />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Didn't receive the email? Check your spam folder or click below to resend.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                // Implement resend verification email logic
              }}
            >
              Resend verification email
            </Button>
          </div>
          <Button onClick={handleVerificationClose} className="w-full">
            Continue to Login
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

