/**
 * Email validation using RFC 5322 Official Standard
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return emailRegex.test(email)
  }
  
  /**
   * Password validation
   * - At least 8 characters
   * - Contains at least one uppercase letter
   * - Contains at least one lowercase letter
   * - Contains at least one number
   * - Contains at least one special character
   */
  export const isValidPassword = (password) => {
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
    return minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
  }
  
  /**
   * Phone number validation for Indian numbers
   * - Must start with 6-9
   * - Must be 10 digits long
   */
  export const isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
  }
  
  /**
   * Amount validation
   * - Must be a positive number
   * - Must not exceed maximum limit
   * - Must have maximum 2 decimal places
   */
  export const isValidAmount = (amount, maxLimit = 100000) => {
    if (typeof amount !== 'number') {
      amount = parseFloat(amount)
    }
  
    if (isNaN(amount)) return false
  
    const hasValidDecimals = /^\d+(\.\d{1,2})?$/.test(amount.toString())
    return amount > 0 && amount <= maxLimit && hasValidDecimals
  }
  
  /**
   * Date validation
   * - Must be a valid date
   * - Must be within allowed range
   */
  export const isValidDate = (date, { minDate, maxDate } = {}) => {
    const dateObj = new Date(date)
    
    if (isNaN(dateObj.getTime())) return false
    
    if (minDate && dateObj < new Date(minDate)) return false
    if (maxDate && dateObj > new Date(maxDate)) return false
    
    return true
  }
  
  /**
   * Username validation
   * - 3-20 characters long
   * - Can contain letters, numbers, underscores, hyphens
   * - Must start with a letter
   */
  export const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/
    return usernameRegex.test(username)
  }
  
  /**
   * PIN validation
   * - Must be exactly 4 or 6 digits
   */
  export const isValidPIN = (pin) => {
    const pinRegex = /^(\d{4}|\d{6})$/
    return pinRegex.test(pin)
  }
  
  /**
   * OTP validation
   * - Must be exactly 6 digits
   */
  export const isValidOTP = (otp) => {
    const otpRegex = /^\d{6}$/
    return otpRegex.test(otp)
  }
  
  /**
   * Name validation
   * - 2-50 characters long
   * - Can contain letters, spaces, hyphens, apostrophes
   */
  export const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z\s'-]{1,49}$/
    return nameRegex.test(name)
  }
  
  /**
   * URL validation
   */
  export const isValidURL = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  /**
   * Validate form fields with custom rules
   * @param {Object} fields - Object containing field values
   * @param {Object} rules - Object containing validation rules
   * @returns {Object} - Object containing validation errors
   */
  export const validateForm = (fields, rules) => {
    const errors = {}
  
    Object.keys(rules).forEach(field => {
      const value = fields[field]
      const fieldRules = rules[field]
  
      if (fieldRules.required && !value) {
        errors[field] = 'This field is required'
        return
      }
  
      if (value) {
        if (fieldRules.minLength && value.length < fieldRules.minLength) {
          errors[field] = `Must be at least ${fieldRules.minLength} characters`
        }
  
        if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
          errors[field] = `Must be no more than ${fieldRules.maxLength} characters`
        }
  
        if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
          errors[field] = fieldRules.message || 'Invalid format'
        }
  
        if (fieldRules.validate) {
          const validateResult = fieldRules.validate(value)
          if (validateResult !== true) {
            errors[field] = validateResult
          }
        }
      }
    })
  
    return errors
  }
  
  // Example usage of validateForm:
  /*
  const fields = {
    username: 'john',
    email: 'john@example.com',
    password: 'Password123!'
  }
  
  const rules = {
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
      message: 'Username must start with a letter and can contain letters, numbers, underscores, and hyphens'
    },
    email: {
      required: true,
      validate: isValidEmail
    },
    password: {
      required: true,
      validate: isValidPassword
    }
  }
  
  const errors = validateForm(fields, rules)
  */