// src/components/GeminiPrompt.js

import React, { useState } from "react";
import "./GeminiPrompt.css"; // Create this file if you want to add custom styles

const GeminiPrompt = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="GeminiPrompt">
      <h1>Gemini AI Prompt</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows="4"
        cols="50"
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating...." : "Generate"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiPrompt;
