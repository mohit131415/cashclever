import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qgyhjxedfbijagbourmj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWhqeGVkZmJpamFnYm91cm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzc5MDcsImV4cCI6MjA1MTgxMzkwN30.pLyGSAxWOdpA_KiYan9oqirQEgVtMovo-yVWJPqiaxU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

