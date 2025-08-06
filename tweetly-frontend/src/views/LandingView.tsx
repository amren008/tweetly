import { useEffect, useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

export default function LandingView() {
  const [showTyped, setShowTyped] = useState(false)

  useEffect(() => {
    // 🔹 Delay to trigger typewriter animation
    const timeout = setTimeout(() => setShowTyped(true), 500)
    // Scroll to top on load
    window.scrollTo(0, 0)
    return () => clearTimeout(timeout)
  }, [])

  // 🔹 Scroll to feature section
  const scrollToFeatures = () => {
    const section = document.getElementById('features')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  // 🔹 Google login via Supabase
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app` // redirect after login
      }
    })

    if (error) console.error('Login error:', error)
  }

  return (
    <div className="bg-[#111111] text-white font-sans overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* === Hero Section === */}
        <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          {/* 🔹 Animated heading */}
          <h1
            className="text-4xl md:text-6xl font-bold mb-10 max-w-2xl mx-auto"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            {showTyped && (
              <Typewriter
                words={["Say Hello to Tweetly"]}
                cursor={false}
                typeSpeed={80}
              />
            )}
          </h1>

          {/* 🔹 CTA + Learn more buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
            <button
              className="bg-white text-black px-6 py-3 font-semibold rounded-md hover:opacity-90"
              onClick={handleGoogleLogin}
            >
              Try Tweetly
            </button>
            <button
              onClick={scrollToFeatures}
              className="underline text-white opacity-80 hover:opacity-100"
            >
              Learn more about Tweetly
            </button>
          </div>

          {/* 🔹 Divider */}
          <div className="w-40 h-1 bg-white mb-10 rounded-full opacity-60" />

          {/* 🔹 App description */}
          <div
            className="max-w-3xl text-md leading-relaxed text-center opacity-80 px-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p>
              Tweetly is your AI assistant for tweeting. Whether you're building a side project,
              learning to code, or documenting your startup journey, Tweetly converts your progress
              into clean, consistent, and personalized tweets. It helps you save time, build in public,
              and stay visible without the stress of writing daily updates. Let Tweetly handle your content
              while you focus on creating.
            </p>
          </div>
        </section>

        {/* === Features Section === */}
        <section
          id="features"
          className="w-full flex flex-col justify-start items-center px-4 sm:px-6 md:px-8 pt-12 pb-24"
        >
          {/* 🔹 Section heading */}
          <h2
            className="text-3xl md:text-5xl font-semibold mb-12 text-center"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Automate your tweets.
          </h2>

          {/* 🔹 Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 max-w-5xl w-full">
            {[
              {
                title: "Effortless Progress Sharing",
                desc: "Tweetly automatically turns your work into tweets. You just update your progress and we handle the rest."
              },
              {
                title: "AI-Powered Customization",
                desc: "Select tones, styles, and formats that match your personality. Tweetly adapts every tweet to your voice."
              },
              {
                title: "Time-Saving Automation",
                desc: "No more pausing to write. Schedule tweets or let Tweetly generate them instantly from your updates."
              },
              {
                title: "Stay Consistent Without Stress",
                desc: "Maintain an active social presence even when you're deep in work. Tweetly tweets for you automatically."
              },
              {
                title: "Built for Builders",
                desc: "Indie hackers, learners, and founders can use Tweetly to share progress without losing time or energy."
              },
              {
                title: "Personalized to Your Preferences",
                desc: "Tweetly remembers your style and preferences to improve every tweet it creates, the more you use it."
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#18181b] rounded-xl shadow-md p-6 flex flex-col"
              >
                <h4
                  className="text-lg font-semibold mb-2 text-white"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  {feature.title}
                </h4>
                <p
                  className="text-base opacity-80 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  )
}
