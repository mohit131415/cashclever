import { motion } from 'framer-motion'
import logo from '@/assets/logo/logo.png'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00A9FF] to-[#A0E9FF] flex items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-400/20" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-400/20" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <img 
              src={logo} 
              alt="CashClever Logo" 
              className="w-24 h-24 object-contain"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = logo
              }}
            />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">CashClever</h1>
          <p className="text-white/80 text-lg">Smart Money, Clever Choices</p>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

