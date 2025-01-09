export const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }
  
  export const parseAmount = (amountString) => {
    // Remove currency symbols and commas
    const cleanString = amountString.replace(/[₹,]/g, '').trim()
    const amount = parseFloat(cleanString)
    return isNaN(amount) ? 0 : amount
  }