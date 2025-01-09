import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Toast({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose 
}) {
  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

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

