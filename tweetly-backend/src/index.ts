// ✅ Core dependencies
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

// ✅ Import API route
import generateTweetRoute from './routes/generate-tweet'

// ✅ Load environment variables
dotenv.config()

// ✅ Initialize Express app
const app = express()

// ✅ Middleware
app.use(cors())
app.use(express.json())

// ✅ Routes
app.use('/generate-tweet', generateTweetRoute)

// ✅ Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ Tweetly backend running on http://localhost:${PORT}`)
})
