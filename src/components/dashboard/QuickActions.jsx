'use client'

import { motion } from 'framer-motion'
import { Plus, Receipt, PiggyBank, BookOpen, Send, BarChartIcon as ChartBar, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: 'Add Expense',
      color: 'bg-green-500/10 text-green-500',
      onClick: () => {/* Handle action */}
    },
    {
      icon: Send,
      label: 'Send Money',
      color: 'bg-blue-500/10 text-blue-500',
      onClick: () => {/* Handle action */}
    },
    {
      icon: Receipt,
      label: 'View History',
      color: 'bg-purple-500/10 text-purple-500',
      onClick: () => {/* Handle action */}
    },
    {
      icon: PiggyBank,
      label: 'Set Goal',
      color: 'bg-yellow-500/10 text-yellow-500',
      onClick: () => {/* Handle action */}
    },
    {
      icon: ChartBar,
      label: 'Analytics',
      color: 'bg-indigo-500/10 text-indigo-500',
      onClick: () => {/* Handle action */}
    },
    {
      icon: CreditCard,
      label: 'Cards',
      color: 'bg-pink-500/10 text-pink-500',
      onClick: () => {/* Handle action */}
    }
  ]

  return (
    <Card className="border shadow-sm">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-base md:text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl hover:bg-accent transition-colors"
            >
              <div className={`p-2 md:p-3 rounded-xl ${action.color}`}>
                <action.icon className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-xs md:text-sm font-medium text-center">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
