import { motion } from 'framer-motion'
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getRelativeTime } from '@/utils/dateHelpers'

export default function NotificationList({ notifications = [], onMarkAsRead }) {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[#45D18F]" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-[#FFD952]" />
      case 'info':
      default:
        return <Info className="w-5 h-5 text-[#7EC8E3]" />
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </CardTitle>
        {notifications.some(n => !n.read) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead?.()}
          >
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-4 p-3 rounded-lg transition-colors ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#2D3A45]">
                    {notification.title}
                  </p>
                  <p className="text-sm text-[#AAB4BC] mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-[#AAB4BC] mt-2">
                    {getRelativeTime(notification.timestamp)}
                  </p>
                </div>

                {!notification.read && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#45D18F]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="text-[#AAB4BC]">No notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

