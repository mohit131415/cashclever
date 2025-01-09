'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Award } from 'lucide-react'

export default function WelcomeBanner({ user }) {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border shadow-sm"
    >
      <div className="relative z-10 p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            {greeting}, {user?.email?.split('@')[0] || 'User'} 👋
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            Here's what's happening with your finances today.
          </p>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-background/50 border shadow-sm"
            >
              <div className="rounded-full bg-primary/10 p-2 md:p-3">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Current Level</p>
                <p className="text-base md:text-lg font-bold">Level 3</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-background/50 border shadow-sm"
            >
              <div className="rounded-full bg-green-500/10 p-2 md:p-3">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Total Savings</p>
                <p className="text-base md:text-lg font-bold">₹12,500</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-background/50 border shadow-sm sm:col-span-2 md:col-span-1"
            >
              <div className="rounded-full bg-purple-500/10 p-2 md:p-3">
                <Award className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Points Earned</p>
                <p className="text-base md:text-lg font-bold">750 pts</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
