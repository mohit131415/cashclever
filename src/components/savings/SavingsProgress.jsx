import { motion } from 'framer-motion'
import { PiggyBank, TrendingUp, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/utils/formatCurrency'

export default function SavingsProgress({ goals = [] }) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const overallProgress = (totalSaved / totalTarget) * 100 || 0

  const completedGoals = goals.filter(goal => 
    goal.currentAmount >= goal.targetAmount
  ).length

  const activeGoals = goals.length - completedGoals

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Overall Progress</span>
              <span className="font-medium">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Saved: {formatCurrency(totalSaved)}</span>
              <span>Target: {formatCurrency(totalTarget)}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="p-2 bg-[#7EC8E3]/20 rounded-full mb-2">
                <PiggyBank className="h-5 w-5 text-[#7EC8E3]" />
              </div>
              <span className="text-2xl font-bold">{goals.length}</span>
              <span className="text-xs text-gray-500">Total Goals</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="p-2 bg-[#45D18F]/20 rounded-full mb-2">
                <TrendingUp className="h-5 w-5 text-[#45D18F]" />
              </div>
              <span className="text-2xl font-bold">{activeGoals}</span>
              <span className="text-xs text-gray-500">Active Goals</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="p-2 bg-[#FFD952]/20 rounded-full mb-2">
                <Calendar className="h-5 w-5 text-[#FFD952]" />
              </div>
              <span className="text-2xl font-bold">{completedGoals}</span>
              <span className="text-xs text-gray-500">Completed</span>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

