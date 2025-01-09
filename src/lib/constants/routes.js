export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/',
  EXPENSES: '/expenses',
  SAVINGS: '/savings',
  LEARN: '/learn',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ACHIEVEMENTS: '/achievements',
  LEADERBOARD: '/leaderboard',
  PAYMENTS: '/payments'
}
  
  export const PROTECTED_ROUTES = [
    ROUTES.DASHBOARD,
    ROUTES.EXPENSES,
    ROUTES.SAVINGS,
    ROUTES.LEARN,
    ROUTES.PROFILE,
    ROUTES.SETTINGS,
    ROUTES.ACHIEVEMENTS,
    ROUTES.LEADERBOARD
  ]
  
  export const AUTH_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.SIGNUP
  ]