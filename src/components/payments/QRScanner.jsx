import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, Camera, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function QRScanner({ onScan }) {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState('')
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setScanning(true)
        setError('')
      }
    } catch (err) {
      setError('Unable to access camera. Please make sure you have granted camera permissions.')
    }
  }

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    setScanning(false)
  }

  // In a real implementation, you would use a QR code scanning library
  // like `jsQR` or `zxing` to process video frames and detect QR codes

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          Scan QR Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <AnimatePresence>
            {scanning ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute inset-0 border-2 border-[#45D18F] rounded-lg">
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
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <div className="p-4 bg-gray-100 rounded-full">
                  <Camera className="w-8 h-8 text-[#2D3A45]" />
                </div>
                <Button onClick={startScanning}>
                  Start Scanning
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

