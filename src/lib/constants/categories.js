export const EXPENSE_CATEGORIES = [
  {
    id: 'food',
    label: 'Food & Dining',
    icon: '🍽️',
    color: 'bg-orange-500',
    description: 'Restaurants, groceries, and food delivery'
  },
  {
    id: 'transportation',
    label: 'Transportation',
    icon: '🚗',
    color: 'bg-blue-500',
    description: 'Public transit, fuel, and vehicle maintenance'
  },
  {
    id: 'housing',
    label: 'Housing',
    icon: '🏠',
    color: 'bg-green-500',
    description: 'Rent, utilities, and home maintenance'
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    icon: '🎮',
    color: 'bg-purple-500',
    description: 'Movies, games, and recreational activities'
  },
  {
    id: 'shopping',
    label: 'Shopping',
    icon: '🛍️',
    color: 'bg-pink-500',
    description: 'Clothing, electronics, and personal items'
  },
  {
    id: 'health',
    label: 'Health',
    icon: '⚕️',
    color: 'bg-red-500',
    description: 'Medical expenses, medications, and fitness'
  },
  {
    id: 'education',
    label: 'Education',
    icon: '📚',
    color: 'bg-yellow-500',
    description: 'Tuition, books, and courses'
  },
  {
    id: 'bills',
    label: 'Bills & Utilities',
    icon: '📱',
    color: 'bg-cyan-500',
    description: 'Phone, internet, and subscriptions'
  },
  {
    id: 'savings',
    label: 'Savings',
    icon: '💰',
    color: 'bg-emerald-500',
    description: 'Investments and emergency funds'
  },
  {
    id: 'others',
    label: 'Others',
    icon: '📦',
    color: 'bg-gray-500',
    description: 'Miscellaneous expenses'
  }
]

// Helper function to get category by ID
export const getCategoryById = (categoryId) => {
  return EXPENSE_CATEGORIES.find(category => category.id === categoryId) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1]
}

// Helper function to get category color
export const getCategoryColor = (categoryId) => {
  const category = getCategoryById(categoryId)
  return category.color
}

// Helper function to get category icon
export const getCategoryIcon = (categoryId) => {
  const category = getCategoryById(categoryId)
  return category.icon
}

// Helper function to get category label
export const getCategoryLabel = (categoryId) => {
  const category = getCategoryById(categoryId)
  return category.label
}

// Get all category IDs
export const CATEGORY_IDS = EXPENSE_CATEGORIES.map(category => category.id)

// Get all category labels
export const CATEGORY_LABELS = EXPENSE_CATEGORIES.map(category => category.label)

// Category validation
export const isValidCategory = (categoryId) => {
  return CATEGORY_IDS.includes(categoryId)
}

