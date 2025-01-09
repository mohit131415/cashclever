export { UPIHistory }
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight, Calendar, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/dateHelpers'

export default function UPIHistory({ transactions = [] }) {
  const [filter, setFilter] = useState('all') // all, sent, received

  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' || transaction.type === filter
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>UPI Transactions</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              {filter === 'all' ? 'All' : filter === 'sent' ? 'Sent' : 'Received'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter('all')}>
              All Transactions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('sent')}>
              Money Sent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('received')}>
              Money Received
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-50"
            >
              <div className={`p-2 rounded-full ${
                transaction.type === 'sent' 
                  ? 'bg-red-100' 
                  : 'bg-green-100'
              }`}>
                {transaction.type === 'sent' 
                  ? <ArrowUpRight className="h-5 w-5 text-red-600" />
                  : <ArrowDownLeft className="h-5 w-5 text-green-600" />
                }
              </div>

              <div className="flex-1">
                <p className="font-medium">{transaction.upiId}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  {formatDate(transaction.timestamp)}
                </div>
              </div>

              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'sent' 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`}>
                  {transaction.type === 'sent' ? '-' : '+'}
                  {formatCurrency(transaction.amount)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'success'
                    ? 'bg-green-100 text-green-700'
                    : transaction.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </motion.div>
          ))}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transactions found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

