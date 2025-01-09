'use client'

import { useState } from 'react'
import { useExpenses } from '@/hooks/useExpenses'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import ExpenseList from '@/components/expenses/ExpenseList'
import ExpenseChart from '@/components/expenses/ExpenseChart'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export default function Expenses() {
  const { expenses, loading, error, addExpense } = useExpenses()
  const [selectedCategory, setSelectedCategory] = useState('all')

  if (loading) {
    return <LoadingSpinner />
  }

  const filteredExpenses = selectedCategory === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory)

  const handleAddExpense = async (data) => {
    const result = await addExpense(data)
    if (!result.success) {
      // Handle error
      return { success: false, error: result.error }
    }
    return { success: true }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <AddExpenseForm onSubmit={handleAddExpense} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseChart expenses={expenses} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseList 
              expenses={filteredExpenses}
              onCategoryChange={setSelectedCategory}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

