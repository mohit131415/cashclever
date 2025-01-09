import { motion } from 'framer-motion'
import { Lock, CheckCircle, Play } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function LevelCard({ level, isActive, isCompleted, onStart }) {
  return (
    <Card className={`relative overflow-hidden ${
      isActive ? 'border-[#45D18F] border-2' : ''
    }`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Level {level.id}</span>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-[#45D18F]"
            >
              <CheckCircle className="w-6 h-6" />
            </motion.div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{level.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-[#FFD952] rounded-full">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-[#AAB4BC]">
              {level.pointsRequired} points required
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onStart}
          disabled={!isActive}
          className="w-full"
          variant={isActive ? "default" : "outline"}
        >
          {!isActive && !isCompleted && <Lock className="w-4 h-4 mr-2" />}
          {isCompleted ? 'Replay Level' : isActive ? 'Start Level' : 'Locked'}
          {isActive && <Play className="w-4 h-4 ml-2" />}
        </Button>
      </CardFooter>

      {/* Level completion confetti effect */}
      {isCompleted && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-[#45D18F] to-transparent opacity-20" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#45D18F] to-transparent opacity-20" />
        </div>
      )}
    </Card>
  )
}

