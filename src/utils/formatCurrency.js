/**
 * Format a number as Indian currency
 */
export function formatCurrency(amount) {
    if (amount === null || amount === undefined) {
      return '₹0.00'
    }
  
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  
    try {
      return formatter.format(amount)
    } catch (error) {
      console.error('Error formatting currency:', error)
      return '₹0.00'
    }
  }
  
  /**
   * Format a number as a percentage
   */
  export function formatPercentage(value, decimals = 1) {
    if (value === null || value === undefined) {
      return '0%'
    }
  
    try {
      return `${Number(value).toFixed(decimals)}%`
    } catch (error) {
      console.error('Error formatting percentage:', error)
      return '0%'
    }
  }
  
  /**
   * Format large numbers with K, M, B suffixes
   */
  export function formatCompactNumber(number) {
    if (number === null || number === undefined) {
      return '0'
    }
  
    const formatter = new Intl.NumberFormat('en-IN', {
      notation: 'compact',
      compactDisplay: 'short'
    })
  
    try {
      return formatter.format(number)
    } catch (error) {
      console.error('Error formatting compact number:', error)
      return '0'
    }
  }
  
  /**
   * Calculate percentage change between two numbers
   */
  export function calculatePercentageChange(oldValue, newValue) {
    if (!oldValue || !newValue) return 0
    
    try {
      return ((newValue - oldValue) / oldValue) * 100
    } catch (error) {
      console.error('Error calculating percentage change:', error)
      return 0
    }
  }
  
  