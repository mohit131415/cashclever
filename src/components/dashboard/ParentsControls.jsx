'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, DollarSign, Bell, Calendar, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { formatCurrency } from '@/utils/formatCurrency'

export default function ParentControls() {
  const [settings, setSettings] = useState({
    allowanceAmount: 500,
    spendingLimit: 1000,
    matchRate: 50,
    notifications: true,
    restrictions: true
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Parental Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Allowance Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold">Allowance Settings</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="allowance">Weekly Allowance</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="allowance"
                    type="number"
                    value={settings.allowanceAmount}
                    onChange={(e) => setSettings({ ...settings, allowanceAmount: Number(e.target.value) })}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="matchRate">Savings Match Rate (%)</Label>
                <Input
                  id="matchRate"
                  type="number"
                  value={settings.matchRate}
                  onChange={(e) => setSettings({ ...settings, matchRate: Number(e.target.value) })}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Spending Controls */}
          <div className="space-y-4">
            <h3 className="font-semibold">Spending Controls</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="spendingLimit">Monthly Spending Limit</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="spendingLimit"
                    type="number"
                    value={settings.spendingLimit}
                    onChange={(e) => setSettings({ ...settings, spendingLimit: Number(e.target.value) })}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Purchase Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for all purchases
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Category Restrictions</Label>
                    <p className="text-sm text-muted-foreground">
                      Block certain spending categories
                    </p>
                  </div>
                  <Switch
                    checked={settings.restrictions}
                    onCheckedChange={(checked) => setSettings({ ...settings, restrictions: checked })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Next Allowance</p>
                    <p className="text-lg font-bold">{formatCurrency(settings.allowanceAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Spending Limit</p>
                    <p className="text-lg font-bold">{formatCurrency(settings.spendingLimit)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Match Rate</p>
                    <p className="text-lg font-bold">{settings.matchRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}

