// src/index.ts
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import twitterRoutes from './api/auth/twitter'

dotenv.config()

const app = express()
app.use(cors())
app.use('/auth/twitter', twitterRoutes)

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
