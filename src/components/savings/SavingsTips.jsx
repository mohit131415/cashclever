import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const SAVINGS_TIPS = [
  {
    id: 1,
    title: "50/30/20 Rule",
    description: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.",
    category: "Budgeting"
  },
  {
    id: 2,
    title: "Automate Your Savings",
    description: "Set up automatic transfers to your savings account right after receiving your income.",
    category: "Automation"
  },
  {
    id: 3,
    title: "Track Your Expenses",
    description: "Monitor your daily expenses to identify areas where you can cut back and save more.",
    category: "Tracking"
  },
  {
    id: 4,
    title: "Emergency Fund",
    description: "Build an emergency fund that covers 3-6 months of living expenses.",
    category: "Planning"
  },
  {
    id: 5,
    title: "Review Subscriptions",
    description: "Regularly review and cancel unused subscriptions to reduce monthly expenses.",
    category: "Optimization"
  }
]

export default function SavingsTips() {
  const [currentTip, setCurrentTip] = useState(0)

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % SAVINGS_TIPS.length)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-[#FFD952]" />
          Savings Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {SAVINGS_TIPS[currentTip].title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {currentTip + 1}/{SAVINGS_TIPS.length}
                  </span>
                </div>

                <p className="text-gray-600">
                  {SAVINGS_TIPS[currentTip].description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-full">
                    {SAVINGS_TIPS[currentTip].category}
                  </span>
                  <Button variant="ghost" size="icon" onClick={nextTip}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

