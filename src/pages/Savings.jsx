'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Target } from 'lucide-react'
import { useSavings } from '@/hooks/useSavings'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/utils/formatCurrency'

export default function Savings() {
  const { getSavingsGoals, createSavingsGoal, addContribution, getSavingsStats } = useSavings()
  const [goals, setGoals] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    target_amount: '',
    initial_amount: '',
    deadline: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [goalsData, statsData] = await Promise.all([
        getSavingsGoals(),
        getSavingsStats()
      ])
      setGoals(goalsData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to load savings data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddGoal = async (e) => {
    e.preventDefault()
    try {
      await createSavingsGoal(newGoal)
      setShowAddDialog(false)
      setNewGoal({
        title: '',
        target_amount: '',
        initial_amount: '',
        deadline: ''
      })
      loadData()
    } catch (error) {
      console.error('Failed to create goal:', error)
    }
  }

  const handleContribution = async (goalId, amount) => {
    try {
      await addContribution(goalId, Number(amount))
      loadData()
    } catch (error) {
      console.error('Failed to add contribution:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.totalSaved || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeGoals || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completedGoals || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Goal Button */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Savings Goal
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Savings Goal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                placeholder="e.g., Emergency Fund"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_amount">Target Amount</Label>
              <Input
                id="target_amount"
                type="number"
                placeholder="0.00"
                value={newGoal.target_amount}
                onChange={(e) => setNewGoal({ ...newGoal, target_amount: e.target.value })}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initial_amount">Initial Amount</Label>
              <Input
                id="initial_amount"
                type="number"
                placeholder="0.00"
                value={newGoal.initial_amount}
                onChange={(e) => setNewGoal({ ...newGoal, initial_amount: e.target.value })}
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Target Date</Label>
              <Input
                id="deadline"
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Create Goal
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Savings Goals */}
      <div className="grid gap-6 md:grid-cols-2">
        {loading ? (
          <div className="text-center py-8 col-span-2">Loading goals...</div>
        ) : goals.length === 0 ? (
          <div className="text-center py-8 col-span-2 text-muted-foreground">
            No savings goals yet
          </div>
        ) : (
          goals.map((goal) => {
            const progress = (goal.current_amount / goal.target_amount) * 100
            const remaining = goal.target_amount - goal.current_amount
            const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))

            return (
              <motion.div key={goal.id} layout>
                <Card>
                  <CardHeader>
                    <CardTitle>{goal.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current</p>
                        <p className="font-medium">
                          {formatCurrency(goal.current_amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Target</p>
                        <p className="font-medium">
                          {formatCurrency(goal.target_amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Remaining</p>
                        <p className="font-medium">{formatCurrency(remaining)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Days Left</p>
                        <p className="font-medium">{daysLeft}</p>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="outline">
                          Add Contribution
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Contribution</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            const amount = e.target.amount.value
                            handleContribution(goal.id, amount)
                            e.target.reset()
                          }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                              id="amount"
                              name="amount"
                              type="number"
                              placeholder="0.00"
                              required
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Add Contribution
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}

