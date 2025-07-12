
import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024"
        })
      });
      const data = await response.json();
      setImageUrl(data.data[0]?.url);
    } catch (error) {
      alert("فشل توليد الصورة");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>🎨 KidStory AI</h1>
      <input
        type="text"
        placeholder="اكتب وصف المشهد"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={generateImage} style={{ marginLeft: '10px', padding: '10px' }}>
        {loading ? 'جاري التوليد...' : 'توليد صورة'}
      </button>
      {imageUrl && <div><img src={imageUrl} alt="Generated" style={{ marginTop: '20px', width: '300px' }} /></div>}
    </div>
  );
}

export default App;
