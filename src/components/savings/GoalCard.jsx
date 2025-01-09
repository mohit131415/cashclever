import { motion } from 'framer-motion'
import { Calendar, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/dateHelpers'

export default function GoalCard({ goal, onEdit, onDelete }) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100
  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))
  const isCompleted = progress >= 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={isCompleted ? 'border-green-500' : ''}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{goal.title}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(goal)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(goal.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-500">Current Amount</p>
                <p className="text-2xl font-bold">{formatCurrency(goal.currentAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Target</p>
                <p className="text-2xl font-bold">{formatCurrency(goal.targetAmount)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>
                {daysLeft > 0 
                  ? `${daysLeft} days left` 
                  : isCompleted 
                  ? 'Goal completed!' 
                  : 'Deadline passed'}
              </span>
              <span>•</span>
              <span>Due {formatDate(goal.deadline)}</span>
            </div>

            {isCompleted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm text-center"
              >
                🎉 Congratulations! Goal achieved!
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

