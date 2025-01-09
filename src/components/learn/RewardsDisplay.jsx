import { motion } from 'framer-motion'
import { Star, Gift, Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RewardsDisplay({ achievements = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#FFD952]" />
          Your Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7EC8E3] to-[#45D18F] opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
              
              <div className="relative p-4 bg-gray-50 group-hover:bg-white/90 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    {achievement.icon || <Star className="w-6 h-6 text-[#FFD952]" />}
                  </div>
                  
                  <div>
                    <h3 className="font-medium group-hover:text-white transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-[#AAB4BC] group-hover:text-white/80 transition-colors">
                      {achievement.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Gift className="w-4 h-4 text-[#45D18F]" />
                      <span className="text-sm font-medium">
                        +{achievement.points} points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {achievements.length === 0 && (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="text-[#AAB4BC]">No achievements yet. Keep learning!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

