import { useEffect, useState } from "react";
import { Clipboard, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

// Define tweet shape
type Tweet = {
  id: string;
  tweet: string;
  tone: string;
  length: string;
  created_at: string;
};

export default function TweetHistory() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch user tweets from Supabase
  useEffect(() => {
    const fetchTweets = async () => {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user.id;

      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("generated_tweets")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching tweets:", error);
      } else {
        setTweets(data as Tweet[]);
      }

      setLoading(false);
    };

    fetchTweets();
  }, []);

  // 🔹 Copy a tweet to clipboard
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-white">
      {/* Title */}
      {/* <motion.h1
        className="text-2xl md:text-3xl font-semibold text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Tweet History
      </motion.h1> */}

      {/* No tweets */}
      {!loading && tweets.length === 0 && (
        <p className="text-center text-gray-400">
          No tweets yet. Go generate one!
        </p>
      )}

      {/* Loading state */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse">
          Loading your tweet history...
        </p>
      )}

      {/* Tweet list */}
      <div className="space-y-6">
        {tweets.map((tweet) => (
          <motion.div
            key={tweet.id}
            className="border-2 border-[#333] rounded-xl p-4 bg-transparent relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Tweet text */}
            <p className="text-base whitespace-pre-wrap mb-3 text-gray-100">
              {tweet.tweet}
            </p>

            {/* Metadata and actions */}
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-400 gap-3">
              <div className="flex gap-4">
                <span>🕒 {new Date(tweet.created_at).toLocaleString()}</span>
                <span>🎨 {tweet.tone}</span>
                <span>📏 {tweet.length}</span>
              </div>

              <div className="flex gap-3">
                {/* Copy */}
                <button
                  onClick={() => handleCopy(tweet.tweet, tweet.id)}
                  className="p-2 rounded-md bg-[#1e1e1e] hover:bg-[#2c2c2c] transition-all"
                  title="Copy tweet"
                >
                  <Clipboard size={16} />
                </button>

                {/* Regenerate (disabled for now) */}
                <button
                  disabled
                  className="p-2 rounded-md bg-[#1e1e1e] hover:bg-[#2c2c2c] opacity-50 cursor-not-allowed"
                  title="Regenerate (coming soon)"
                >
                  <RefreshCcw size={16} />
                </button>
              </div>
            </div>

            {/* Feedback: Copied! */}
            {copiedId === tweet.id && (
              <p className="absolute top-2 right-4 text-xs text-green-400">
                Copied!
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
