import axios from "axios";
import React from "react";

export default function App() {
  const [url, setUrl] = React.useState("");
  const [shortenedUrl, setShortenedUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const shortenUrl = async () => {
    if (!url) {
      setError("Please enter a URL.");
      return;
    }
    setError("");
    setLoading(true);
    setShortenedUrl("");

    try {
      const response = await axios.post("/api/generate", { url });
setShortenedUrl(`${window.location.origin}/api/${response.data.id}`);

    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    // Optional: Add a notification that text has been copied, e.g., using a toast library.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">URL Shortener</h1>
          <p className="mt-2 text-gray-600">
            Create short and easy-to-share links
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <input
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            placeholder="https://example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            disabled={loading}
          />
          <button
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 transition-colors"
            onClick={shortenUrl}
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {shortenedUrl && (
          <div className="p-4 space-y-3 bg-gray-100 rounded-lg">
            <p className="font-medium text-gray-700">Your shortened URL:</p>
            <div className="flex items-center space-x-2">
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow text-blue-600 hover:underline truncate"
              >
                {shortenedUrl}
              </a>
              <button
                className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={handleCopyToClipboard}
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <footer className="text-center text-gray-500 text-sm">
          <a
            href="https://github.com/your-username/url-shortener"
            className="hover:underline"
          >
            View Source on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}