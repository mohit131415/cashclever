import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, IndianRupee, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function AddGoalForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
    initialAmount: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.targetAmount || !formData.deadline) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await onSubmit(formData)
      setFormData({
        title: '',
        targetAmount: '',
        deadline: '',
        initialAmount: ''
      })
    } catch (err) {
      setError('Failed to create savings goal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Create Savings Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., New Laptop"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                className="pl-10"
                placeholder="0.00"
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialAmount">Initial Deposit (Optional)</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="initialAmount"
                type="number"
                value={formData.initialAmount}
                onChange={(e) => setFormData({ ...formData, initialAmount: e.target.value })}
                className="pl-10"
                placeholder="0.00"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Target Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="pl-10"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Goal...' : 'Create Goal'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

