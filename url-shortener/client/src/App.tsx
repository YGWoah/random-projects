import axios from "axios"
import React from "react"



export default function App() {
  const [url, setUrl] = React.useState("")
  const [shortenedUrl, setShortenedUrl] = React.useState("")
  const [completed, setCompleted] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const shortenUrl = async () => {
    setLoading(true)
    axios.get('/todos/1').then(res => console.log(res));

    axios.post('/api/generate', {
      url: url
    }).then((res) => {

      setShortenedUrl("http://localhost:3000/api/" + String(res.data.id))
    })
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">

      <h1 className="text-3xl font-bold underline">
        Welcome to url shortener app!
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        This is a simple URL shortener application built with React and Tailwind CSS.
      </p>
      {shortenedUrl && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <p className="text-green-500">Shortened URL:</p>
          <a href={shortenedUrl} className="text-blue-500 hover:underline">
            {shortenedUrl}
          </a>
          <button onClick={async () => {
            await navigator.clipboard.writeText(shortenedUrl);
          }}>
            copy to keyboard
          </button>
        </div>
      )}{!shortenedUrl && (
        <div className="mt-6">
          <input
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="Enter URL to shorten"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg" onClick={shortenUrl} >
            Shorten URL
          </button>
        </div>)}
      <a
        className="mt-6 text-blue-500 hover:underline"
        href="https://github.com/your-username/url-shortener"
      >
        View Source Code
      </a>
    </div>
  )
}