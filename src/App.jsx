'use client'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { useAuth, AuthProvider } from '@/context/AuthContext' // Import AuthProvider
import { ThemeProvider } from '@/context/ThemeContext'
import { GameProvider } from '@/context/GameContext'
import { UPIProvider } from '@/context/UPIContext'

// Auth Pages
import Login from '@/pages/auth/Login'
import SignUp from '@/pages/auth/SignUp'
import PasswordReset from '@/pages/auth/PasswordReset'
import AuthCallback from '@/pages/auth/callback' // Correct import path

// Main Pages
import Dashboard from '@/pages/Dashboard'
import Expenses from '@/pages/Expenses'
import Learn from '@/pages/Learn'
import Payments from '@/pages/Payments'
import Profile from '@/pages/Profile'
import Savings from '@/pages/Savings'
import Settings from '@/pages/Settings'
import Achievements from '@/pages/Achievements'
import Leaderboard from '@/pages/Leaderboard'
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { BottomNav } from '@/components/layout/BottomNav';


// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <BottomNav/>
    </div>
  )
}

export default function App() {
  return (
      <ThemeProvider>
        <GameProvider>
          <UPIProvider>
            <AuthProvider> {/* Wrap routes with AuthProvider */}
              <Router>
                <Routes>
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/auth/callback" element={<AuthCallback />} /> {/* Correct path */}
                  <Route path="/reset-password" element={<PasswordReset />} />

                  {/* Protected Routes */}
                  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
                  <Route path="/savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />
                  <Route path="/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
                  <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                  <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Toaster />
              </Router>
            </AuthProvider>
          </UPIProvider>
        </GameProvider>
      </ThemeProvider>
  )
}

