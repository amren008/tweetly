// App.tsx
import './index.css'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Import view components
import LandingView from './views/LandingView'
import TweetlyHome from './views/TweetlyHome' // ✅ updated name

function App() {
  const [view, setView] = useState<'landing' | 'demo'>('landing')

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <LandingView onStart={() => setView('demo')} />
          </motion.div>
        )}

        {view === 'demo' && (
          <motion.div
            key="demo"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <TweetlyHome /> {/* ✅ updated component */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
