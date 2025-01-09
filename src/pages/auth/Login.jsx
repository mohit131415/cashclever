'use client'

import { motion } from 'framer-motion'
import LoginForm from '@/components/auth/LoginForm'
import AuthLayout from '@/components/auth/AuthLayout'

export default function Login() {
  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginForm />
      </motion.div>
    </AuthLayout>
  )
}

