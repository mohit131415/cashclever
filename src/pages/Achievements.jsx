'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Badge } from '@/components/ui/badge'

export default function Achievements() {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return

    const fetchAchievements = async () => {
      try {
        const { data, error } = await supabase
          .from('user_achievements')
          .select(`
            *,
            achievements (
              title,
              description,
              points,
              badge_url,
              category
            )
          `)
          .eq('user_id', user.id)

        if (error) throw error
        setAchievements(data)
      } catch (error) {
        console.error('Error fetching achievements:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [user])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <h1 className="text-3xl font-bold">Your Achievements</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {achievement.achievements.title}
                <Badge variant="secondary">{achievement.achievements.points} points</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{achievement.achievements.description}</p>
              {achievement.achievements.badge_url && (
                <img
                  src={achievement.achievements.badge_url}
                  alt={`${achievement.achievements.title} badge`}
                  className="w-16 h-16 mt-4"
                />
              )}
              <p className="text-sm text-muted-foreground mt-4">
                Earned on {new Date(achievement.earned_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {achievements.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No achievements earned yet. Keep learning and completing tasks to earn badges!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

