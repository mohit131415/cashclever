import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'

export function useSupabaseAuth() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [user])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      setProfile(data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching user profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      setProfile(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateAvatar = async (file) => {
    try {
      setLoading(true)
      const fileExt = file.name.split('.').pop()
      const filePath = `${user.id}/avatar.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      await updateProfile({ avatar_url: publicUrl })

      return publicUrl
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    updateAvatar,
    refreshProfile: fetchUserProfile
  }
}

