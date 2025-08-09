import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clipboard,
  RefreshCcw,
  Trash2,
  Sparkles,
  Loader2,
} from 'lucide-react'
import { Typewriter } from 'react-simple-typewriter'
import { supabase } from '../lib/supabase'

const tones = ['Funny', 'Professional', 'Motivational', 'Sarcastic']
const lengths = ['Short', 'Medium', 'Thread', 'Twitter Free']

export default function CreateTweet() {
  const [progress, setProgress] = useState('')
  const [tone, setTone] = useState('Professional')
  const [length, setLength] = useState('Short')
  const [generated, setGenerated] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // ✅ Use env-based API URL
  const API_URL = import.meta.env.VITE_API_URL

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerated(null)

    const session = await supabase.auth.getSession()
    const userId = session.data.session?.user.id

    if (!userId) {
      alert('You must be logged in to generate tweets.')
      setIsGenerating(false)
      return
    }

    try {
      const res = await fetch(`${API_URL}/generate-tweet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          progress,
          tone,
          length,
        }),
      })

      const data = await res.json()
      setGenerated(data.tweet)
    } catch (err) {
      console.error('Error generating tweet:', err)
      setGenerated('❌ Failed to generate tweet.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setProgress('')
    setGenerated(null)
  }

  const handleCopy = () => {
    if (generated) navigator.clipboard.writeText(generated)
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-10 text-white">
      {/* === Input Textarea === */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">
          What did you work on today?
        </label>
        <motion.textarea
          rows={5}
          className="w-full p-4 rounded-xl bg-transparent border-2 border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all placeholder-gray-500"
          placeholder="Built authentication using Supabase!"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </div>

      {/* === Tone Selector Buttons === */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-300">Tone</p>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <motion.button
              key={t}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setTone(t)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-150 border ${
                tone === t
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#222] text-white hover:bg-[#333]'
              }`}
            >
              {t}
            </motion.button>
          ))}
        </div>
      </div>

      {/* === Length Selector Buttons === */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-300">Length</p>
        <div className="flex flex-wrap gap-2">
          {lengths.map((l) => (
            <motion.button
              key={l}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setLength(l)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-150 border ${
                length === l
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#222] text-white hover:bg-[#333]'
              }`}
            >
              {l}
            </motion.button>
          ))}
        </div>
        {length === 'Twitter Free' && (
          <p className="text-xs text-yellow-400 mt-1">
            Twitter Free users may face length limits. We'll keep it short.
          </p>
        )}
      </div>

      {/* === Generate Button === */}
      <div>
        <button
          onClick={handleGenerate}
          disabled={!progress.trim() || isGenerating}
          className="bg-blue-500 hover:bg-blue-600 transition-all px-6 py-3 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={18} />
          {isGenerating ? 'Generating...' : 'Generate Tweet'}
        </button>
      </div>

      {/* === Loading Spinner While Generating === */}
      {isGenerating && (
        <motion.div
          className="flex items-center gap-3 text-sm text-white mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader2 className="animate-spin" size={20} />
          Preparing your perfect tweet...
        </motion.div>
      )}

      {/* === Generated Tweet Preview === */}
      {generated && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-6 text-white space-y-4"
        >
          {/* Output with typing animation */}
          <div className="whitespace-pre-wrap text-lg leading-relaxed p-4 rounded-xl border-2 border-[#444] bg-transparent">
            <Typewriter
              words={[generated]}
              cursor={false}
              typeSpeed={30}
              delaySpeed={300}
            />
          </div>

          {/* === Action Buttons (Copy / Clear / Regenerate) === */}
          <div className="flex gap-3 flex-wrap mt-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-md bg-[#1e1e1e] hover:bg-[#2c2c2c] transition-all"
              title="Copy"
            >
              <Clipboard size={18} />
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-md bg-[#1e1e1e] hover:bg-[#2c2c2c] transition-all"
              title="Clear"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={handleGenerate}
              className="p-2 rounded-md bg-[#1e1e1e] hover:bg-[#2c2c2c] transition-all"
              title="Regenerate"
            >
              <RefreshCcw size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
