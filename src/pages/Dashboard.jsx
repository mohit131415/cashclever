'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BookOpen, CreditCard, PiggyBank, Award, User, Settings, Bell, Menu, LogOut, Search, Command, Loader2, Check, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import WelcomeBanner from '../components/dashboard/WelcomeBanner'
import QuickActions from '../components/dashboard/QuickActions'
import ExpenseSummary from '../components/dashboard/ExpenseSummary'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import Expenses from './Expenses'
import Learn from './Learn'
import Payments from './Payments'
import Profile from './Profile'
import Savings from './Savings'
import SettingsPage from './Settings'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import { BottomNav } from '@/components/layout/BottomNav'

const tabs = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'expenses', label: 'Expenses', icon: CreditCard, component: Expenses },
  { id: 'savings', label: 'Savings', icon: PiggyBank, component: Savings },
  { id: 'payments', label: 'Payments', icon: Award, component: Payments },
  { id: 'learn', label: 'Learn', icon: BookOpen, component: Learn },
  { id: 'profile', label: 'Profile', icon: User, component: Profile },
  { id: 'settings', label: 'Settings', icon: Settings, component: SettingsPage }
]

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const { level, points } = useGame()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])


  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  if (loading) {
    return <LoadingFallback />
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex h-full">
          {/* Desktop Sidebar */}
          <Sidebar className="hidden lg:flex border-r" collapsible="icon">
            <SidebarHeader className="border-b p-4">
              <div className="flex items-center gap-2">
                <PiggyBank className="h-6 w-6 text-primary" />
                <span className="font-semibold text-xl">CashClever</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  {tabs.map((tab) => (
                    <SidebarMenuItem key={tab.id}>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab(tab.id)}
                        isActive={activeTab === tab.id}
                        tooltip={tab.label}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.photoURL} />
                  <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                  <p className="text-xs text-muted-foreground">Level {level}</p>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center gap-4">
                <div className="flex lg:hidden">
                  <SidebarTrigger />
                </div>

                <div className="flex flex-1 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold truncate">
                      {tabs.find(t => t.id === activeTab)?.label}
                    </h1>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:flex"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search
                      <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4">
                    {/* Notifications */}
                    <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                          <Bell className="h-5 w-5" />
                          {notifications.length > 0 && (
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                        <SheetHeader>
                          <SheetTitle>Notifications</SheetTitle>
                          <SheetDescription>
                            Stay updated with your financial activity
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-4 space-y-4">
                          {notifications.length === 0 ? (
                            <p className="text-center text-sm text-muted-foreground py-8">
                              No new notifications
                            </p>
                          ) : (
                            notifications.map((notification, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-4 rounded-lg p-4 hover:bg-accent"
                              >
                                <div className="flex-1 space-y-1">
                                  <p className="text-sm font-medium">{notification.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                  </p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Mobile Avatar Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="lg:hidden">
                        <Button variant="ghost" size="icon">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.photoURL} />
                            <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium">{user?.email}</p>
                            <p className="text-xs text-muted-foreground">Level {level}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {tabs.map((tab) => (
                          <DropdownMenuItem 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                          >
                            <tab.icon className="mr-2 h-4 w-4" />
                            <span>{tab.label}</span>
                            {tab.id === activeTab && (
                              <span className="ml-auto flex h-4 w-4 items-center justify-center">
                                <Check className="h-4 w-4" />
                              </span>
                            )}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Desktop Settings Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="hidden lg:inline-flex">
                        <Button variant="ghost" size="icon">
                          <Settings className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                          Settings
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Help
                          <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          Log out
                          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1">
              <div className="container py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Suspense fallback={<LoadingFallback />}>
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsContent value="overview" className="space-y-6">
                          <WelcomeBanner user={user} />
                          <QuickActions />
                          <div className="grid gap-6 md:grid-cols-2">
                            <ExpenseSummary />
                            <ActivityFeed />
                          </div>
                        </TabsContent>

                        {tabs.map(tab => tab.component && (
                          <TabsContent key={tab.id} value={tab.id}>
                            <tab.component />
                          </TabsContent>
                        ))}
                      </Tabs>
                    </Suspense>
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>

      {/* Command Menu (Search) */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {tabs.map((tab) => (
              <CommandItem
                key={tab.id}
                onSelect={() => {
                  setActiveTab(tab.id)
                  setIsSearchOpen(false)
                }}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => setActiveTab('expenses')}>
              <CreditCard className="mr-2 h-4 w-4" />
              Add Expense
            </CommandItem>
            <CommandItem onSelect={() => setActiveTab('savings')}>
              <PiggyBank className="mr-2 h-4 w-4" />
              Create Savings Goal
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <BottomNav/>
   </div>
  )
}

