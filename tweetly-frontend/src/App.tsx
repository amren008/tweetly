import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import type { User } from '@supabase/supabase-js'
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'
import LandingView from './views/LandingView'
import TweetlyHome from './views/TweetlyHome'
import { motion } from 'framer-motion'

function App() {
  // 🔹 Auth state: current user and loading status
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Always start in dark mode
    document.documentElement.classList.add('dark')

    // 🔹 Fetch initial session on page load
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // 🔹 Listen for login/logout state changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // 🔹 Loading screen while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#111111] text-white">
        <motion.div
          className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
        />
      </div>
    )
  }

  return (
    <Routes location={location} key={location.pathname}>
      {/* 🔹 Public landing page */}
      <Route path="/" element={<LandingView />} />

      {/* 🔹 Redirect /app to /app/create (clean routing) */}
      <Route
        path="/app"
        element={<Navigate to="/app/create" replace />}
      />

      {/* 🔹 Main app page (CreateTweet + TweetHistory) — protected */}
      <Route
        path="/app/create"
        element={user ? <TweetlyHome /> : <Navigate to="/" replace />}
      />

      {/* 🔹 Catch-all route redirects to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
