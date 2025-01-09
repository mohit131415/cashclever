import { Loader2 } from 'lucide-react'

export { LoadingSpinner }
export default function LoadingSpinner({ size = 'default', className = '' }) {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12'
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 
        className={`animate-spin text-[#7EC8E3] ${sizeClasses[size]} ${className}`}
      />
    </div>
  )
}

// Full page loading spinner
export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="bg-white p-4 rounded-full shadow-lg">
        <LoadingSpinner size="large" />
      </div>
    </div>
  )
}

