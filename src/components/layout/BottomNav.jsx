'use client'

import { motion } from 'framer-motion'
import { Home, PieChart, Wallet, Book, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  {
    icon: Home,
    label: 'Home',
    href: '/',
  },
  {
    icon: PieChart,
    label: 'Expenses',
    href: '/expenses',
  },
  {
    icon: Wallet,
    label: 'Savings',
    href: '/savings',
  },
  {
    icon: Book,
    label: 'Learn',
    href: '/learn',
  },
  {
    icon: User,
    label: 'Profile',
    href: '/profile',
  },
]

export function BottomNav({ currentPath }) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t z-50"
    >
      <nav className="flex items-center justify-around p-2 max-w-xl mx-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.href
          
          return (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              className={cn(
                'flex flex-col items-center gap-1 h-auto py-2 px-3',
                isActive && 'text-primary'
              )}
              asChild
            >
              <a href={item.href}>
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-3 right-3 h-0.5 bg-primary rounded-full"
                  />
                )}
              </a>
            </Button>
          )
        })}
      </nav>
    </motion.div>
  )
}

