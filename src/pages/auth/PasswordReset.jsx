'use client'

import { useNavigate } from 'react-router-dom'
import AuthLayout from '@/components/auth/AuthLayout'
import PasswordResetForm from '@/components/auth/PasswordResetForm'
import { motion } from 'framer-motion'

export default function PasswordReset() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PasswordResetForm />
      </motion.div>
    </AuthLayout>
  )
}

