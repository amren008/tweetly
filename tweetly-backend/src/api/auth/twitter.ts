import express from 'express'
import fetch from 'node-fetch'
import { supabase } from '../../lib/supabase'

const router = express.Router()

const CLIENT_ID = process.env.TWITTER_CLIENT_ID!
const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET!
const REDIRECT_URI = process.env.TWITTER_REDIRECT_URI!

// Types
type TwitterTokenResponse = {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
  scope: string
}

type TwitterUserResponse = {
  data: {
    id: string
    name: string
    username: string
    profile_image_url?: string
  }
}

// Start OAuth
router.get('/', (req, res) => {
  const state = crypto.randomUUID()
  const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=${state}&code_challenge=challenge&code_challenge_method=plain`

  res.redirect(authUrl)
})

// Callback Handler
router.get('/callback', async (req, res) => {
  try {
    const code = req.query.code as string
    if (!code) return res.status(400).send('Missing code')

    // Exchange code for tokens
    const tokenRes = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code_verifier: 'challenge',
      }),
    })

    const tokenData = (await tokenRes.json()) as TwitterTokenResponse

    // Fetch user info
    const userRes = await fetch('https://api.twitter.com/2/users/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = (await userRes.json()) as TwitterUserResponse
    const user = userData.data

    // Save user in Supabase
    const { error } = await supabase.from('users').upsert({
      id: user.id,
      name: user.name,
      username: user.username,
      profile_image_url: user.profile_image_url || '',
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token || '',
    })

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).send('Failed to save user.')
    }

    // Redirect to app with token
    res.redirect(
      `tweetly-auth-success://callback?access_token=${tokenData.access_token}&user_id=${user.id}`
    )
  } catch (err) {
    console.error('OAuth error:', err)
    res.status(500).send('Authentication failed.')
  }
})

export default router
