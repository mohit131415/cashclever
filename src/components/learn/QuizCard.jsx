export { QuizCard }
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const SAMPLE_QUIZ = {
  questions: [
    {
      id: 1,
      question: "What is budgeting?",
      options: [
        "Spending all your money",
        "Planning your income and expenses",
        "Saving without a plan",
        "Taking loans regularly"
      ],
      correct: 1
    },
    // Add more questions as needed
  ]
}

export default function QuizCard({ levelId, onComplete, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    if (index === SAMPLE_QUIZ.questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < SAMPLE_QUIZ.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
      onComplete?.(score / SAMPLE_QUIZ.questions.length)
    }
  }

  const progress = ((currentQuestion + 1) / SAMPLE_QUIZ.questions.length) * 100

  return (
    <div className="space-y-6">
      {!showResult ? (
        <>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-[#AAB4BC]">
              <span>Question {currentQuestion + 1}/{SAMPLE_QUIZ.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">
              {SAMPLE_QUIZ.questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {SAMPLE_QUIZ.questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    selectedAnswer === index
                      ? 'bg-[#45D18F] text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              {currentQuestion === SAMPLE_QUIZ.questions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="mb-6">
            {score / SAMPLE_QUIZ.questions.length >= 0.8 ? (
              <CheckCircle className="w-16 h-16 mx-auto text-[#45D18F]" />
            ) : (
              <XCircle className="w-16 h-16 mx-auto text-red-500" />
            )}
          </div>

          <h3 className="text-2xl font-bold mb-2">
            Quiz Complete!
          </h3>
          <p className="text-[#AAB4BC] mb-6">
            You scored {score} out of {SAMPLE_QUIZ.questions.length}
          </p>

          <div className="space-x-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => {
              setCurrentQuestion(0)
              setSelectedAnswer(null)
              setScore(0)
              setShowResult(false)
            }}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

