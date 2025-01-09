import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { BarChart, BookOpen, Home, PiggyBank, Settings, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/expenses', icon: BarChart, label: 'Expenses' },
  { path: '/savings', icon: PiggyBank, label: 'Savings' },
  { path: '/learn', icon: BookOpen, label: 'Learn' },
  { path: '/payments', icon: CreditCard, label: 'Payments' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 280 }}
      className="relative min-h-screen bg-white border-r border-gray-200"
    >
      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-8 rounded-full bg-white border shadow-sm"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Logo */}
      <div className="p-6">
        <motion.div
          animate={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          className="flex items-center"
        >
          <div className="w-8 h-8 rounded-lg bg-[#7EC8E3] flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 text-xl font-bold text-[#2D3A45]"
            >
              CashClever
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors",
                isActive 
                  ? "bg-[#45D18F] text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Progress Card */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-4 right-4"
        >
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Your Progress</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#45D18F]" 
                  style={{ width: '65%' }}
                />
              </div>
              <span className="text-gray-600">65%</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

