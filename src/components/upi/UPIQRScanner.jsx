import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, QrCode, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function UPIQRScanner({ onScan }) {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState('')
  const videoRef = useRef(null)

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      videoRef.current.srcObject = stream
      setScanning(true)
      setError('')
    } catch (err) {
      setError('Unable to access camera. Please check permissions.')
    }
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
    }
    setScanning(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Scan UPI QR Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {scanning ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-[#45D18F]">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#45D18F]" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#45D18F]" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#45D18F]" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#45D18F]" />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={stopScanning}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <div className="p-4 bg-gray-100 rounded-full">
                <Camera className="h-8 w-8" />
              </div>
              <Button onClick={startScanning}>
                Start Scanning
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

