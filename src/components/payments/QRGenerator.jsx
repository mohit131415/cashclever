'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications on your device
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="product-updates">Product Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new features
                </p>
              </div>
              <Switch
                id="product-updates"
                checked={notifications.updates}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, updates: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-4">
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

