export { ProgressTracker }

import { motion } from 'framer-motion'
import { Trophy, Target, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function ProgressTracker({ currentLevel, totalPoints, streakDays }) {
  const nextLevelPoints = (currentLevel + 1) * 1000
  const progress = (totalPoints / nextLevelPoints) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#AAB4BC]">Progress to Level {currentLevel + 1}</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-[#AAB4BC]">
            <span>{totalPoints} points</span>
            <span>{nextLevelPoints} points</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="p-2 bg-[#7EC8E3]/20 rounded-full mb-2">
              <Trophy className="w-5 h-5 text-[#7EC8E3]" />
            </div>
            <span className="text-2xl font-bold">{currentLevel}</span>
            <span className="text-xs text-[#AAB4BC]">Current Level</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="p-2 bg-[#45D18F]/20 rounded-full mb-2">
              <Target className="w-5 h-5 text-[#45D18F]" />
            </div>
            <span className="text-2xl font-bold">{totalPoints}</span>
            <span className="text-xs text-[#AAB4BC]">Total Points</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="p-2 bg-[#FFD952]/20 rounded-full mb-2">
              <Zap className="w-5 h-5 text-[#FFD952]" />
            </div>
            <span className="text-2xl font-bold">{streakDays}</span>
            <span className="text-xs text-[#AAB4BC]">Day Streak</span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

