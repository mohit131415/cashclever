'use client'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Phone } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { isValidEmail } from '@/utils/validators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GoogleLoginButton from './GoogleLoginButton'
import PhoneLoginForm from './PhoneLoginForm'

export default function LoginForm() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
    
    setLoading(true)
    setError('')
    
    try {
      await signIn(formData.email, formData.password)
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        {/* <img 
          src="/logo.png" 
          alt="CashClever Logo"
          className="w-16 h-16 mx-auto mb-4"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/placeholder.svg?height=64&width=64'
          }}
        /> */}
        <h2 className="text-2xl font-bold text-[#2D3A45] mb-2">Welcome Back!</h2>
        <p className="text-[#AAB4BC]">Enter your details to access your account</p>
      </div>

      <Tabs defaultValue="email" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Phone</span>
          </TabsTrigger>
          <TabsTrigger value="google">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
            </svg>
            <span>Google</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="h-12"
                placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
                  <span>Signing in...</span>
                </motion.div>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="text-center">
              <Link
                to="/reset-password"
                className="text-sm text-[#00A9FF] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="phone">
          <PhoneLoginForm />
        </TabsContent>

        <TabsContent value="google">
          <GoogleLoginButton />
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center text-sm text-[#AAB4BC]">
        Don't have an account?{' '}
        <Link to="/signup" className="text-[#00A9FF] hover:underline">
          Create Account
        </Link>
      </div>
    </motion.div>
  )
}

