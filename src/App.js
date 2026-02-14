import React from "react";
import Randomizer from "./components/Randomizer";
import TextDisplay from "./components/TextDisplay";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "serif", maxWidth: "700px", margin: "auto" }}>
      <h1>🖤 Blackout Poetry</h1>
      <Randomizer />
    </div>
  );
}

export default App;

