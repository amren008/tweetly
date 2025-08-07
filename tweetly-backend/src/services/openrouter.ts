import axios from "axios"

export async function callOpenRouter(prompt: string): Promise<string> {
  try {
    console.log('Calling OpenRouter with prompt:', prompt)

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3-70b-instruct',
        messages: [
          {
            role: 'system',
            content:
              'You are TweetlyBot. Only generate tweet-style content based on project updates. Never answer unrelated questions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const output = response.data.choices?.[0]?.message?.content
    return output || 'No tweet generated.'
  } catch (err: any) {
    console.error('❌ OpenRouter error:', err.response?.data || err.message)
    return 'Failed to generate tweet.'
  }
}
