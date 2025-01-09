'use client'

import { useNavigate } from 'react-router-dom'
import AuthLayout from '@/components/auth/AuthLayout'
import SignUpForm from '@/components/auth/SignUpForm'
import { motion } from 'framer-motion'

export default function SignUp() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SignUpForm />
      </motion.div>
    </AuthLayout>
  )
}

