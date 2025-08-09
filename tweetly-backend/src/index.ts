// ✅ Core dependencies
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

// ✅ Import API route
import generateTweetRoute from './routes/generate-tweet'

// ✅ Initialize Express app
const app = express()

// ✅ Secure CORS configuration
app.use(
  cors({
    origin: [
      'https://usetweetly.vercel.app', // ✅ production frontend
      'http://localhost:5173'          // ✅ local dev (optional)
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

// ✅ Middleware
app.use(express.json())

// ✅ Routes
app.get('/', (req, res) => {
  res.send('✅ Tweetly backend is live')
})

app.use('/generate-tweet', generateTweetRoute)

// ✅ Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ Tweetly backend running on http://localhost:${PORT}`)
})
