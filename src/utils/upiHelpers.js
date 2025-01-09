/**
 * Validate UPI ID format
 * - Must be in format username@provider
 * - Username can contain letters, numbers, dots, underscores, hyphens
 * - Provider must be at least 3 letters
 */
export const isValidUPI = (upiId) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/
    return upiRegex.test(upiId)
  }
  
  /**
   * Generate a unique transaction ID
   */
  export function generateTransactionId() {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000000)
    return `TXN${timestamp}${random}`
  }
  
  /**
   * Format UPI ID for display
   */
  export function formatUPIId(upiId) {
    if (!upiId) return ''
    
    const [username, provider] = upiId.split('@')
    if (!provider) return upiId
    
    return `${username}@${provider.toLowerCase()}`
  }
  
  /**
   * Get UPI provider name from UPI ID
   */
  export function getUPIProvider(upiId) {
    if (!upiId) return ''
    
    const provider = upiId.split('@')[1]
    if (!provider) return ''
    
    const providers = {
      'okicici': 'ICICI Bank',
      'okhdfcbank': 'HDFC Bank',
      'oksbi': 'State Bank of India',
      'okaxis': 'Axis Bank',
      'okbizaxis': 'Axis Bank',
      'upi': 'BHIM',
      'paytm': 'Paytm',
      'gpay': 'Google Pay',
      'apl': 'Amazon Pay'
    }
    
    return providers[provider.toLowerCase()] || provider
  }
  
  /**
   * Parse UPI deep link
   */
  export function parseUPIDeepLink(url) {
    if (!url) return null
    
    try {
      const urlObj = new URL(url)
      if (!urlObj.protocol.startsWith('upi:')) return null
      
      const params = new URLSearchParams(urlObj.search)
      
      return {
        pa: params.get('pa'), // payee address (UPI ID)
        pn: params.get('pn'), // payee name
        am: params.get('am'), // amount
        tn: params.get('tn'), // transaction note
        tr: params.get('tr')  // transaction reference
      }
    } catch (error) {
      console.error('Error parsing UPI deep link:', error)
      return null
    }
  }
  
  /**
   * Generate UPI deep link
   */
  export function generateUPIDeepLink({
    upiId,
    name,
    amount,
    note,
    transactionId
  }) {
    const params = new URLSearchParams()
    
    if (upiId) params.append('pa', upiId)
    if (name) params.append('pn', name)
    if (amount) params.append('am', amount.toString())
    if (note) params.append('tn', note)
    if (transactionId) params.append('tr', transactionId)
    
    return `upi://pay?${params.toString()}`
  }
  
  /**
   * Validate transaction status
   */
  export function isValidTransactionStatus(status) {
    const validStatuses = ['pending', 'completed', 'failed', 'cancelled']
    return validStatuses.includes(status)
  }
  
  /**
   * Calculate transaction fee (if applicable)
   */
  export function calculateTransactionFee(amount, type = 'p2p') {
    if (!amount || amount <= 0) return 0
    
    const feeStructure = {
      p2p: 0, // peer to peer
      p2m: 0.01, // peer to merchant (1%)
      international: 0.02 // international (2%)
    }
    
    const feePercentage = feeStructure[type] || 0
    return Number((amount * feePercentage).toFixed(2))
  }
  
  /**
   * Format transaction status for display
   */
  export function formatTransactionStatus(status) {
    const statusMap = {
      pending: { label: 'Pending', color: 'yellow' },
      completed: { label: 'Completed', color: 'green' },
      failed: { label: 'Failed', color: 'red' },
      cancelled: { label: 'Cancelled', color: 'gray' }
    }
    
    return statusMap[status] || { label: status, color: 'gray' }
  }
  
  