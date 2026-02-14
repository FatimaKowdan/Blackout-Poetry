import React, { useState } from "react";
import Word from "./Word";

const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "In the midst of winter, I found there was, within me, an invincible summer.",
  "Once upon a time, the stars whispered secrets to those who listened."
];

const TextDisplay = () => {
  const [text, setText] = useState(paragraphs[Math.floor(Math.random() * paragraphs.length)]);

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    setText(paragraphs[randomIndex]);
  };

  const handleReset = () => setText(text);

return (
  <div>
    <div style={{ marginBottom: "15px" }}>
      <button onClick={handleRandomize}>Randomize</button>
      <button onClick={handleReset} style={{ marginLeft: "10px" }}>Reset</button>
    </div>

    {/* 🔲 Text Box Container */}
    <div
      style={{
        border: "2px solid black",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        lineHeight: "1.6em",
        fontSize: "18px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        maxWidth: "700px",
      }}
    >
      {text.split(" ").map((word, i) => (
        <Word key={i} text={word} />
      ))}
    </div>
  </div>
);
}
export default TextDisplay;


