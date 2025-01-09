import { motion } from 'framer-motion'
import { EXPENSE_CATEGORIES } from '@/lib/constants/categories'

export default function CategorySelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {EXPENSE_CATEGORIES.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
            selected === category.id
              ? 'bg-[#45D18F] text-white'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <span className="text-2xl">{category.icon}</span>
          <span className="text-sm font-medium">{category.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

