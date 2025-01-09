/**
 * Format a date string or Date object to a localized date string
 */
export function formatDate(date) {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatDate:', date)
    return ''
  }

  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj)
}

/**
 * Format a date string or Date object to include time
 */
export function formatDateTime(date) {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatDateTime:', date)
    return ''
  }

  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(dateObj)
}

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(date) {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to getRelativeTimeString:', date)
    return ''
  }

  const now = new Date()
  const diffInSeconds = Math.floor((now - dateObj) / 1000)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second')
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute')
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour')
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, 'day')
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month')
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return rtf.format(-diffInYears, 'year')
}

/**
 * Calculate the number of days between two dates
 */
export function getDaysBetween(startDate, endDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error('Invalid dates provided to getDaysBetween:', { startDate, endDate })
    return 0
  }

  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to isPastDate:', date)
    return false
  }

  return dateObj < new Date()
}

/**
 * Get the start and end dates for different periods
 */
export function getDateRangeForPeriod(period = 'month') {
  const end = new Date()
  const start = new Date()

  switch (period) {
    case 'week':
      start.setDate(start.getDate() - 7)
      break
    case 'month':
      start.setMonth(start.getMonth() - 1)
      break
    case 'quarter':
      start.setMonth(start.getMonth() - 3)
      break
    case 'year':
      start.setFullYear(start.getFullYear() - 1)
      break
    default:
      start.setMonth(start.getMonth() - 1) // Default to month
  }

  return { start, end }
}

