"use client";
import { useState } from "react";
import axios from "axios";

type ImageResponse = {
    generated_image?: string;
    image?: string;
};

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (!prompt) return;
        setLoading(true);
        setImageUrl(null);

        try {
            // ✅ Now the request goes to our API route (no CORS issues)
            const response = await axios.post<ImageResponse>("/api/generateImage", { prompt });

            // ✅ TypeScript now understands the response structure
            const generatedImageUrl = response.data.generated_image || response.data.image;

            if (generatedImageUrl) {
                setImageUrl(generatedImageUrl);
            } else {
                console.error("Error: No image URL found in response", response.data);
            }
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        if (!imageUrl) return;

        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "generated-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">🎨 AI Image Generator</h1>

            <input 
                type="text" 
                placeholder="Enter your prompt..." 
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button 
                onClick={generateImage} 
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Image"}
            </button>

            {imageUrl && (
                <div className="mt-6 flex flex-col items-center">
                    <img src={imageUrl} alt="Generated" className="w-96 h-auto rounded-lg shadow-lg" />
                    <button 
                        onClick={downloadImage} 
                        className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Download Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;
