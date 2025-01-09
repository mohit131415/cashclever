'use client'

import { motion } from 'framer-motion'
import { PiggyBank, Gift, Target, Book, TrendingUp, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/formatCurrency'

export default function TeenDashboard() {
  // Sample data - replace with real data
  const stats = {
    allowance: 500,
    savings: 2500,
    parentMatch: 1250,
    spendingLimit: 1000,
    spent: 300,
    streakDays: 7
  }

  const achievements = [
    { id: 1, title: 'First Save', icon: '🎯', unlocked: true },
    { id: 2, title: 'Saving Streak', icon: '🔥', unlocked: true },
    { id: 3, title: 'Budget Master', icon: '📊', unlocked: false }
  ]

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 md:p-8"
      >
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Hey there, Future Money Master! 🚀
          </h1>
          <p className="text-white/80 mb-6">
            You're on a {stats.streakDays}-day saving streak! Keep it up! 
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Allowance</p>
                    <p className="text-lg font-bold">{formatCurrency(stats.allowance)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <PiggyBank className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Savings</p>
                    <p className="text-lg font-bold">{formatCurrency(stats.savings)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Parent Match</p>
                    <p className="text-lg font-bold">{formatCurrency(stats.parentMatch)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Level</p>
                    <p className="text-lg font-bold">Level 5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Spending Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Spending Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Limit</span>
                <span className="font-medium">
                  {formatCurrency(stats.spent)} / {formatCurrency(stats.spendingLimit)}
                </span>
              </div>
              <Progress 
                value={(stats.spent / stats.spendingLimit) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {formatCurrency(stats.spendingLimit - stats.spent)} remaining this month
              </p>
            </div>

            <div className="grid gap-4">
              <Button className="w-full" variant="outline">View Spending History</Button>
              <Button className="w-full">Request Limit Increase</Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Book className="h-5 w-5" />
              Financial Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Current Course</h4>
                  <p className="text-sm text-muted-foreground">Budgeting Basics</p>
                </div>
                <Badge variant="secondary">3/5 Complete</Badge>
              </div>
              <Progress value={60} className="h-2" />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Recent Achievements</h4>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <span className="text-lg">{achievement.icon}</span>
                    <span className="text-sm font-medium">{achievement.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full">Continue Learning</Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: Gift, label: 'Request Allowance', color: 'bg-green-500/10 text-green-500' },
              { icon: PiggyBank, label: 'Add to Savings', color: 'bg-blue-500/10 text-blue-500' },
              { icon: Target, label: 'Set Goal', color: 'bg-purple-500/10 text-purple-500' },
              { icon: Book, label: 'Take Quiz', color: 'bg-yellow-500/10 text-yellow-500' },
              { icon: TrendingUp, label: 'View Stats', color: 'bg-pink-500/10 text-pink-500' },
              { icon: Award, label: 'Achievements', color: 'bg-indigo-500/10 text-indigo-500' }
            ].map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-accent transition-colors"
              >
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-center">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

