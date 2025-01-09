import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const stages = [
  { id: 1, label: 'Initiating Payment' },
  { id: 2, label: 'Processing' },
  { id: 3, label: 'Confirming' },
  { id: 4, label: 'Completing' }
]

export default function UPIStatus({ transactionId, onComplete }) {
  const [currentStage, setCurrentStage] = useState(1)
  const [status, setStatus] = useState('processing') // 'processing', 'success', 'failed'

  useEffect(() => {
    const simulateTransaction = async () => {
      for (let i = 1; i <= stages.length; i++) {
        setCurrentStage(i)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      // Simulate success/failure
      const finalStatus = Math.random() > 0.2 ? 'success' : 'failed'
      setStatus(finalStatus)
      onComplete?.(finalStatus)
    }

    simulateTransaction()
  }, [onComplete])

  const progress = (currentStage / stages.length) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {status === 'processing' && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing payment...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-4">
                {stages.map((stage) => (
                  <div
                    key={stage.id}
                    className="flex items-center gap-3"
                  >
                    <div className={`p-2 rounded-full ${
                      stage.id === currentStage
                        ? 'bg-blue-100'
                        : stage.id < currentStage
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}>
                      {stage.id === currentStage ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      ) : stage.id < currentStage ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </div>
                    <span className={
                      stage.id === currentStage
                        ? 'text-blue-600 font-medium'
                        : stage.id < currentStage
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }>
                      {stage.label}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
              <p className="text-gray-500">
                Transaction ID: {transactionId}
              </p>
            </motion.div>
          )}

          {status === 'failed' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6"
            >
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
              <p className="text-gray-500">
                Please try again or contact support if the issue persists.
              </p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

