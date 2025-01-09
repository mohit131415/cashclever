'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, PiggyBank, Users, Book, TrendingUp, ArrowRight, Star, Gift, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

// Simulated user data
const userData = {
  name: "Alex",
  level: 5,
  points: 2500,
  streakDays: 7,
  monthlyGoal: 5000,
  savedAmount: 3500,
  familyMembers: [
    { name: "Mom", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Dad", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Sister", avatar: "/placeholder.svg?height=32&width=32" }
  ]
}

export default function SmartLearningDashboard() {
  const [activeChallenge, setActiveChallenge] = useState('saving')
  
  return (
    <div className="space-y-6">
      {/* Hero Section with Personalized Goals */}
      <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Welcome back, {userData.name}! 🌟</h2>
              <p className="text-muted-foreground">
                You're on a {userData.streakDays}-day learning streak. Keep it up!
              </p>
              <div className="flex items-center gap-4">
                <Button className="gap-2">
                  Today's Challenge
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Badge variant="secondary" className="gap-2">
                  <Star className="h-4 w-4" />
                  Level {userData.level}
                </Badge>
              </div>
            </div>

            {/* Family Learning Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Family Learning Progress</h3>
                <div className="flex -space-x-2">
                  {userData.familyMembers.map((member, i) => (
                    <Avatar key={i} className="border-2 border-background w-8 h-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Your family completed 75% of this month's challenges
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Learning Paths */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Personalized Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Module: Budgeting</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">Resume</Button>
                <Button className="w-full">Next Lesson</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-world Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Active Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                <div className="p-2 bg-primary/10 rounded-full">
                  <PiggyBank className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Save ₹500 this week</p>
                  <p className="text-sm text-muted-foreground">2 days left</p>
                </div>
                <Badge>+50 pts</Badge>
              </div>
              <Button variant="outline" className="w-full">View All Challenges</Button>
            </div>
          </CardContent>
        </Card>

        {/* Family Collaboration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Family Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Savings Goal</span>
                  <span className="font-medium">₹{userData.savedAmount}/₹{userData.monthlyGoal}</span>
                </div>
                <Progress 
                  value={(userData.savedAmount / userData.monthlyGoal) * 100} 
                  className="h-2" 
                />
              </div>
              <Button className="w-full">Track Progress</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Practical Learning Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: TrendingUp,
                label: 'Budget Simulator',
                description: 'Practice real-world budgeting'
              },
              {
                icon: Gift,
                label: 'Reward Store',
                description: 'Redeem points for rewards'
              },
              {
                icon: Calendar,
                label: 'Money Calendar',
                description: 'Track financial activities'
              },
              {
                icon: Trophy,
                label: 'Achievement Center',
                description: 'View your progress'
              }
            ].map((tool, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-accent transition-colors text-center"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">{tool.label}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-green-500/10">
              <h3 className="font-medium text-green-600">Saving Habit</h3>
              <p className="text-sm mt-1">You save 25% more than last month! Keep it up!</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10">
              <h3 className="font-medium text-blue-600">Learning Streak</h3>
              <p className="text-sm mt-1">Complete today's lesson to maintain your streak!</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10">
              <h3 className="font-medium text-purple-600">Family Achievement</h3>
              <p className="text-sm mt-1">Your family is in top 10% of savers this month!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

