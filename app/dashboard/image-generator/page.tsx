"use client"; // Ensure this is a client component

import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Set this in .env.local
  dangerouslyAllowBrowser: true, // Needed for client-side calls
});

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageUrl(null);

    try {
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
        console.error("❌ Missing OpenAI API Key");
        return;
      }

      const response = await openai.images.generate({
        model: "dall-e-3", // ✅ Use DALL·E for image generation
        prompt,
        n: 1,
        size: "1024x1024",
      });

      if (response.data.length > 0) {
        setImageUrl(response.data[0].url);
      } else {
        console.error("⚠️ No image received from OpenAI.");
      }
    } catch (error) {
      console.error("❌ Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">AI Image Generator</h1>
      <input
        type="text"
        placeholder="Enter image prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="p-2 border rounded w-full max-w-md mb-4"
      />
      <button
        onClick={generateImage}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {imageUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Generated Image:</h2>
          <img src={imageUrl} alt="Generated" className="rounded shadow-lg" />
        </div>
      )}
    </div>
  );
}
