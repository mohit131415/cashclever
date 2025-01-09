'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Loader2 } from 'lucide-react'
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Profile() {
  const { profile, loading, error, updateProfile, updateAvatar } = useSupabaseAuth()
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
    bio: profile?.bio || ''
  })
  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setUpdateError('')

    try {
      await updateProfile(formData)
    } catch (err) {
      setUpdateError('Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUpdating(true)
      await updateAvatar(file)
    } catch (err) {
      setUpdateError('Failed to update avatar')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback>
                    {profile?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 p-2 bg-background rounded-full border cursor-pointer hover:bg-muted"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </Label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  file="pages/Profile.jsx"
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              </div>

              {updateError && (
                <Alert variant="destructive">
                  <AlertDescription>{updateError}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={updating}>
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

