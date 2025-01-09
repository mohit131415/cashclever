import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, Menu, Search, Sun, Moon } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import NotificationBadge from '@/components/notifications/NotificationBadge'
import { useNavigate } from 'react-router-dom'


export function Toast({ message, type = 'info', duration = 5000, onClose }) {
  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose]) // Add dependency array

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }

  const colors = {
    success: 'bg-[#45D18F] text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-[#FFD952] text-[#2D3A45]',
    info: 'bg-[#7EC8E3] text-white'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${colors[type]}`}
    >
      <span className="text-lg">{icons[type]}</span>
      <span>{message}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="ml-2 hover:bg-white/20"
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Usage example:
// const [toasts, setToasts] = useState([])
// 
// const addToast = (message, type = 'info') => {
//   const id = Date.now()
//   setToasts(prev => [...prev, { id, message, type }])
// }
// 
// const removeToast = (id) => {
//   setToasts(prev => prev.filter(toast => toast.id !== id))
// }

export default function Navbar() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 md:flex md:items-center md:gap-4">
          <form className="hidden md:flex-1 md:flex max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden md:flex"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <NotificationBadge />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar_url} alt={user?.email} />
                  <AvatarFallback>
                    {user?.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: showMobileMenu ? 'auto' : 0,
          opacity: showMobileMenu ? 1 : 0,
        }}
        className="overflow-hidden md:hidden"
      >
        <div className="container py-4 space-y-4">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
              />
            </div>
          </form>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                Dark Mode
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </nav>
  )
}

  