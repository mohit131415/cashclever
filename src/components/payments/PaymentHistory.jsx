import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Download, Search, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/dateHelpers'

export default function PaymentHistory({ transactions = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, sent, received

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.upi_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || transaction.type === filter
    return matchesSearch && matchesFilter
  })

  const downloadHistory = () => {
    const csv = [
      ['Date', 'Type', 'UPI ID', 'Amount', 'Status'].join(','),
      ...filteredTransactions.map(t => [
        formatDate(t.created_at),
        t.type,
        t.upi_id,
        t.amount,
        t.status
      ].join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'payment-history.csv'
    a.click()
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payment History</CardTitle>
        <Button variant="outline" size="icon" onClick={downloadHistory}>
          <Download className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="search"
                placeholder="Search by UPI ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'sent' ? 'default' : 'outline'}
                onClick={() => setFilter('sent')}
              >
                Sent
              </Button>
              <Button
                variant={filter === 'received' ? 'default' : 'outline'}
                onClick={() => setFilter('received')}
              >
                Received
              </Button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className={`p-2 rounded-full ${
                  transaction.type === 'sent' 
                    ? 'bg-red-100' 
                    : 'bg-green-100'
                }`}>
                  {transaction.type === 'sent' 
                    ? <ArrowUpRight className="w-5 h-5 text-red-500" />
                    : <ArrowDownLeft className="w-5 h-5 text-green-500" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#2D3A45]">
                    {transaction.upi_id}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#AAB4BC]">
                    <Calendar className="w-4 h-4" />
                    {formatDate(transaction.created_at)}
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'sent' 
                      ? 'text-red-500' 
                      : 'text-green-500'
                  }`}>
                    {transaction.type === 'sent' ? '-' : '+'}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-[#AAB4BC]">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

