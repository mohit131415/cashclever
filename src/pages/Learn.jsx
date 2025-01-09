'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import GameBoard from '@/components/learn/GameBoard'
import { QuizCard } from '@/components/learn/QuizCard'
import { ProgressTracker } from '@/components/learn/ProgressTracker'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export default function Learn() {
  const { user } = useAuth()
  const [quizzes, setQuizzes] = useState([])
  const [userProgress, setUserProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      try {
        // Fetch quizzes
        const { data: quizzesData, error: quizzesError } = await supabase
          .from('quizzes')
          .select('*')
          .order('difficulty_level')

        if (quizzesError) throw quizzesError

        // Fetch user progress
        const { data: progressData, error: progressError } = await supabase
          .from('profiles')
          .select('current_level, total_points')
          .eq('id', user.id)
          .single()

        if (progressError) throw progressError

        setQuizzes(quizzesData)
        setUserProgress(progressData)
      } catch (error) {
        console.error('Error fetching learn data:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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

      {userProgress && (
        <ProgressTracker
          level={userProgress.current_level}
          points={userProgress.total_points}
        />
      )}

      <GameBoard currentLevel={userProgress?.current_level || 1} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map(quiz => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onComplete={handleQuizComplete}
          />
        ))}
      </div>
    </div>
  )
}

