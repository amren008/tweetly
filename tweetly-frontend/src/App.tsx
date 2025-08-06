import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from './lib/supabase'
import type { User } from '@supabase/supabase-js' // ✅ Add this

import LandingView from './views/LandingView'
import TweetlyHome from './views/TweetlyHome'

function App() {
  const [user, setUser] = useState<User | null>(null) // ✅ Fix typing
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {user ? (
          <motion.div
            key="demo"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <TweetlyHome />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <LandingView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
