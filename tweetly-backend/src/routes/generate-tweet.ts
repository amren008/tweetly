import express from "express";
import { callOpenRouter } from "../services/openrouter";
import { supabase } from "../lib/supabase";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, progress, tone, length } = req.body;

  if (!progress || typeof progress !== "string") {
    return res.status(400).json({ error: "Missing or invalid progress input" });
  }

  // 🔹 Load user preferences from Supabase
  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Supabase error:", error);
  }

  // 🔹 Use manual input or fallback to user defaults or hardcoded fallback
  const finalTone = tone || profile?.default_tone || "Professional";
  const finalLength = length || profile?.default_length || "Short";
  const emojiStyle = profile?.emoji_style || "Minimal";

  // 🔹 Build smart prompt using preferences
  const prompt = `
You are TweetlyBot, an AI that only generates tweet-worthy progress updates.

User progress: ${progress}
Tone: ${finalTone}
Length: ${finalLength}
Emoji Style: ${emojiStyle}

Your response should be a tweet, written in the user's preferred tone and length. Do not include hashtags unless the tone allows it. Never respond to off-topic input.
`;

  // 🔹 Call OpenRouter
  const tweet = await callOpenRouter(prompt);

  await supabase.from("generated_tweets").insert([
    {
      user_id: userId,
      prompt: progress,
      tweet,
      tone: finalTone,
      length: finalLength,
    },
  ]);

  // Return result
  res.json({ tweet });
});

export default router;
