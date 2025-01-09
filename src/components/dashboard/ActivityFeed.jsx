'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/formatCurrency'
import { getRelativeTime } from '@/utils/dateHelpers'

export default function ActivityFeed() {
  const activities = [
    {
      type: 'expense',
      title: 'Added new expense',
      amount: 299,
      category: 'Food',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      type: 'achievement',
      title: 'Earned new badge',
      badge: 'Savings Master',
      points: 50,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      type: 'goal',
      title: 'Created savings goal',
      goal: 'New Laptop',
      target: 50000,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    },
    {
      type: 'quiz',
      title: 'Completed quiz',
      score: '8/10',
      points: 80,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'expense': return '💰'
      case 'achievement': return '🏆'
      case 'goal': return '🎯'
      case 'quiz': return '📝'
      default: return '📌'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'expense': return 'bg-red-500/10 text-red-500'
      case 'achievement': return 'bg-purple-500/10 text-purple-500'
      case 'goal': return 'bg-blue-500/10 text-blue-500'
      case 'quiz': return 'bg-green-500/10 text-green-500'
      default: return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border shadow-sm">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3 md:space-y-4">
            <AnimatePresence>
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-accent transition-colors"
                >
                  <div className={`shrink-0 p-2 md:p-3 rounded-xl ${getActivityColor(activity.type)}`}>
                    <span className="text-xl md:text-2xl">{getActivityIcon(activity.type)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm md:text-base font-medium truncate">
                        {activity.title}
                      </p>
                      <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                        {getRelativeTime(activity.timestamp)}
                      </span>
                    </div>

                    <div className="mt-1">
                      {activity.type === 'expense' && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{activity.category}</Badge>
                          <span className="text-xs md:text-sm text-red-500 font-semibold">
                            -{formatCurrency(activity.amount)}
                          </span>
                        </div>
                      )}

                      {activity.type === 'achievement' && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{activity.badge}</Badge>
                          <span className="text-xs md:text-sm text-muted-foreground">
                            +{activity.points} points
                          </span>
                        </div>
                      )}

                      {activity.type === 'goal' && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{activity.goal}</Badge>
                          <span className="text-xs md:text-sm text-muted-foreground">
                            Target: {formatCurrency(activity.target)}
                          </span>
                        </div>
                      )}

                      {activity.type === 'quiz' && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">Score: {activity.score}</Badge>
                          <span className="text-xs md:text-sm text-muted-foreground">
                            +{activity.points} points
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

