import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, MoreVertical } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EXPENSE_CATEGORIES } from '@/lib/constants/categories'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/dateHelpers'

export default function ExpenseList({ expenses = [], onDelete }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryDetails = (categoryId) => {
    return EXPENSE_CATEGORIES.find(cat => cat.id === categoryId) || {
      icon: '📦',
      label: 'Other',
      color: '#AAB4BC'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <CardTitle>Expense History</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="search"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[130px]">
                  {selectedCategory === 'all' ? 'All Categories' : getCategoryDetails(selectedCategory).label}
                  <ChevronDown className="ml-2" size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                  All Categories
                </DropdownMenuItem>
                {EXPENSE_CATEGORIES.map(category => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AnimatePresence>
            {filteredExpenses.map((expense) => {
              const category = getCategoryDetails(expense.category)
              
              return (
                <motion.div
                  key={expense.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {category.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-[#2D3A45]">
                          {expense.description || category.label}
                        </p>
                        <p className="text-sm text-[#AAB4BC]">
                          {formatDate(expense.date)}
                        </p>
                      </div>
                      <p className="font-semibold whitespace-nowrap">
                        {formatCurrency(expense.amount)}
                      </p>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onDelete?.(expense.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredExpenses.length === 0 && (
            <div className="text-center py-8 text-[#AAB4BC]">
              No expenses found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

