import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import LevelCard from './LevelCard'
import QuizCard from './QuizCard'
import { GAME_CONFIG } from '@/utils/constants/gameConfig'

export { GameBoard }
export default function GameBoard({ currentLevel = 1, points = 0 }) {
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [completedLevels, setCompletedLevels] = useState([])

  const handleQuizComplete = (score) => {
    if (score >= 0.8) { // 80% or higher to pass
      setCompletedLevels([...completedLevels, currentLevel])
    }
  }

  return (
    <div className="space-y-8">
      {/* Level Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GAME_CONFIG.levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            isActive={level.id === currentLevel}
            isCompleted={completedLevels.includes(level.id)}
            onStart={() => setActiveQuiz(level.id)}
          />
        ))}
      </div>

      {/* Active Quiz */}
      <AnimatePresence mode="wait">
        {activeQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardContent className="p-6">
                <QuizCard
                  levelId={activeQuiz}
                  onComplete={handleQuizComplete}
                  onClose={() => setActiveQuiz(null)}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Banner */}
      <AnimatePresence>
        {completedLevels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-4 right-4 bg-[#45D18F] text-white p-4 rounded-lg shadow-lg flex items-center gap-3"
          >
            <div className="p-2 bg-white/20 rounded-full">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">Level Complete!</p>
              <p className="text-sm opacity-90">+100 points earned</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

