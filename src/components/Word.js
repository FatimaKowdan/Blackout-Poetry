import React, { useState } from "react";

const Word = ({ text }) => {
  const [blackout, setBlackout] = useState(false);

  return (
    <span
      onClick={() => setBlackout(!blackout)}
      style={{
        backgroundColor: blackout ? "black" : "transparent",
        color: blackout ? "black" : "inherit",
        cursor: "pointer",
        padding: "0 3px",
        marginRight: "2px"
      }}
    >
      {text}
    </span>
  );
};

export default Word;
