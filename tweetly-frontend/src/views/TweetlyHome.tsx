import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  PencilLine,
  Settings,
  Clock,
  Brain,
  LogOut,
  Menu,
} from 'lucide-react'
import { supabase } from '../lib/supabase'

const navItems = [
  { icon: Home, label: 'Dashboard' },
  { icon: PencilLine, label: 'Create Tweet' },
  { icon: Settings, label: 'Preferences' },
  { icon: Clock, label: 'Tweet History' },
  { icon: Brain, label: 'AI Models' },
]

export default function TweetlyHome() {
  const [active, setActive] = useState('Create Tweet')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="flex h-screen w-full bg-[#111111] text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform md:relative md:translate-x-0 md:flex md:flex-col md:w-64 bg-[#18181b] p-6 border-r border-[#222] transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-4">
          {navItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => {
                setActive(label)
                setSidebarOpen(false)
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-[#2a2a2a] ${
                active === label ? 'bg-[#2a2a2a]' : ''
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Mobile menu icon */}
        <div className="md:hidden relative px-4 py-3 bg-[#111111]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
          >
            <Menu size={22} />
          </button>
          <h2 className="text-lg font-semibold text-center">{active}</h2>
        </div>

        <main className="flex-1 p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-[#1e1e1e] rounded-xl p-6 min-h-[60vh]">
              <p className="text-gray-400">
                This is the "{active}" view. Content coming soon.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
