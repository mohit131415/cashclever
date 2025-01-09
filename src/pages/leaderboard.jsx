'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy } from 'lucide-react'

export default function Leaderboard() {
  const { user } = useAuth()
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, avatar_url, total_points, current_level')
          .order('total_points', { ascending: false })
          .limit(50)

        if (error) throw error
        setLeaderboard(data)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

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

      <Card>
        <CardHeader>
          <CardTitle>Global Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center gap-4 p-4 rounded-lg ${
                  player.id === user?.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-center justify-center w-8">
                  {index < 3 ? (
                    <Trophy className={`w-6 h-6 ${
                      index === 0 ? 'text-yellow-500' :
                      index === 1 ? 'text-gray-400' :
                      'text-amber-600'
                    }`} />
                  ) : (
                    <span className="text-muted-foreground">{index + 1}</span>
                  )}
                </div>

                <Avatar>
                  <AvatarImage src={player.avatar_url} />
                  <AvatarFallback>
                    {player.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="font-medium">{player.username || 'Anonymous'}</p>
                  <p className="text-sm text-muted-foreground">Level {player.current_level}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold">{player.total_points}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

