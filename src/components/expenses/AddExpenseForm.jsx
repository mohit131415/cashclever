import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import CategorySelector from './CategorySelector'
import { expenses } from '@/lib/supabase/expenses'

export { AddExpenseForm }
export default function AddExpenseForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.amount || !formData.category) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await expenses.create({
        ...formData,
        amount: parseFloat(formData.amount)
      })
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      })
      onSuccess?.()
    } catch (err) {
      setError('Failed to add expense. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              className="text-2xl font-bold"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <CategorySelector
              selected={formData.category}
              onSelect={(category) => setFormData(prev => ({ ...prev, category }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add notes about this expense..."
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#45D18F] text-white"
          >
            {loading ? 'Adding Expense...' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

