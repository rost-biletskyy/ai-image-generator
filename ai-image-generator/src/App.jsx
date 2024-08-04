import { useState } from "react";
import OpenAI from "openai";
import "./App.css";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const generateImage = async () => {
    try {
      setLoading(true);
      const response = await openai.images.generate({
        model: "dall-e-3", // fix after update
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      setLoading(false);
      setResult(response.data.data[0].url);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className="app">
      <h1>React AI Image Generator</h1>
      {loading && <h2>Image generation in progress ... Please wait!</h2>}
      <div className="card">
        <textarea
          className="text-input"
          placeholder="Enter a prompt"
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
          cols={50}
        />
        <button className="button" onClick={generateImage} disabled={loading}>
          Generate Image
        </button>
        {result && (
          <img className="result-image" src={result} alt="Generated Image" />
        )}
      </div>
      <p className="footer">Powered by OpenAI</p>
    </div>
  );
};

export default App;
