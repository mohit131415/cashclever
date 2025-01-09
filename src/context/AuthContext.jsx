'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (event === 'SIGNED_IN' && currentUser) {
        try {
          // Check if profile exists - using proper column selection
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', currentUser.id)
            .maybeSingle()

          if (profileError) {
            console.error('Error checking profile:', profileError)
            throw profileError
          }

          if (!profile) {
            // Create new profile with proper structure
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: currentUser.id,
                email: currentUser.email,
                username: currentUser.email?.split('@')[0] || null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                avatar_url: currentUser.user_metadata?.avatar_url || null
              })

            if (insertError) {
              console.error('Error creating profile:', insertError)
              throw insertError
            }
          }
        } catch (error) {
          console.error('Error initializing profile:', error)
        }
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

