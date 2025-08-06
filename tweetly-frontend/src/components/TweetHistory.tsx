import { useState } from 'react'
import { Clipboard, RefreshCcw } from 'lucide-react'
import { motion } from 'framer-motion'

// 🔹 Mock tweet data to simulate Supabase-stored results
const mockTweets = [
  {
    id: '1',
    tweet: "🚀 Just integrated Supabase auth and it's buttery smooth.",
    tone: 'Professional',
    length: 'Short',
    created_at: '2025-08-06T20:20:00Z',
  },
  {
    id: '2',
    tweet: "🧠 Trained my first custom LLM today. What a ride!",
    tone: 'Motivational',
    length: 'Medium',
    created_at: '2025-08-05T14:45:00Z',
  },
]

export default function TweetHistory() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // 🔹 Copy button logic for individual tweet
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-white">
      {/* 🔹 Section title */}
      <motion.h1
        className="text-2xl md:text-3xl font-semibold text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Tweet History
      </motion.h1>

      {/* 🔹 Fallback if no tweets exist */}
      {mockTweets.length === 0 ? (
        <p className="text-center text-gray-400">No tweets yet. Go generate one!</p>
      ) : (
        <div className="space-y-6">
          {/* 🔹 Render each tweet card */}
          {mockTweets.map((tweet) => (
            <motion.div
              key={tweet.id}
              className="border-2 border-[#333] rounded-xl p-4 bg-transparent relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* 🔹 Tweet content */}
              <p className="text-base whitespace-pre-wrap mb-3 text-gray-100">
                {tweet.tweet}
              </p>

              {/* 🔹 Metadata and controls */}
              <div className="flex flex-wrap justify-between items-center text-sm text-gray-400 gap-3">
                {/* Metadata: time, tone, length */}
                <div className="flex gap-4">
                  <span>🕒 {new Date(tweet.created_at).toLocaleString()}</span>
                  <span>🎨 {tweet.tone}</span>
                  <span>📏 {tweet.length}</span>
                </div>

                {/* Copy + Regenerate buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCopy(tweet.tweet, tweet.id)}
                    className="p-2 rounded-md bg-[#1e1e1e] hover:bg-[#2c2c2c] transition-all"
                    title="Copy tweet"
                  >
                    <Clipboard size={16} />
                  </button>
                  <button
                    disabled
                    className="p-2 rounded-md bg-[#1e1e1e] hover:bg-[#2c2c2c] opacity-50 cursor-not-allowed"
                    title="Regenerate (coming soon)"
                  >
                    <RefreshCcw size={16} />
                  </button>
                </div>
              </div>

              {/* 🔹 Copy feedback message */}
              {copiedId === tweet.id && (
                <p className="absolute top-2 right-4 text-xs text-green-400">Copied!</p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
