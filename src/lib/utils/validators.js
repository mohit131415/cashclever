// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  // Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
  export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(password)
  }
  
  // Phone number validation (Indian format)
  export const isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
  }
  
  // Amount validation
  export const isValidAmount = (amount) => {
    return !isNaN(amount) && amount > 0 && amount <= 100000
  }