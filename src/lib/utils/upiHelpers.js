// Dummy UPI validation
export const isValidUPI = (upiId) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/
    return upiRegex.test(upiId)
  }
  
  // Generate dummy UPI transaction ID
  export const generateTransactionId = () => {
    return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
  }
  
  // Simulate UPI payment status (dummy implementation)
  export const checkTransactionStatus = async (transactionId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Randomly return success or failure
    return {
      status: Math.random() > 0.2 ? 'SUCCESS' : 'FAILURE',
      transactionId,
      timestamp: new Date().toISOString()
    }
  }