import React, { useState } from "react";

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const cleanParagraph = (text, targetLen = 400) => {
  // pick a paragraph near target length (split on blank lines)
  const paras = text
    .split(/\n{2,}/g)
    .map(p => p.replace(/\s+/g, " ").trim())
    .filter(p => p.length > 50);
  if (!paras.length) return text.trim();

  // prefer medium-ish paragraphs
  const sorted = [...paras].sort(
    (a, b) => Math.abs(a.length - targetLen) - Math.abs(b.length - targetLen)
  );
  // ensure it ends at a sentence boundary if possible
  const p = sorted[0];
  const lastPeriod = p.lastIndexOf(".");
  return lastPeriod > 100 ? p.slice(0, lastPeriod + 1) : p;
};

export default function Randomizer() {
  const [source, setSource] = useState("wikipedia"); // wikipedia | gutenberg
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { text, title, url, source }

  const fetchWikipedia = async () => {
    // Random summary with link
    // CORS-friendly and no key required
    const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
    if (!res.ok) throw new Error("Wikipedia request failed");
    const data = await res.json();
    return {
      text: data.extract,
      title: data.title,
      url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`,
      source: "Wikipedia"
    };
  };

  const fetchGutenberg = async () => {
    // 1) pick a random page of English books
    const randomPage = Math.floor(Math.random() * 50) + 1;
    const res = await fetch(`https://gutendex.com/books/?languages=en&page=${randomPage}`);
    if (!res.ok) throw new Error("Gutendex request failed");
    const data = await res.json();
    const book = pickRandom(data.results);

    // 2) find a plain text format URL
    const formats = book.formats || {};
    const textUrl =
      formats["text/plain; charset=utf-8"] ||
      formats["text/plain; charset=us-ascii"] ||
      formats["text/plain"] ||
      null;
    if (!textUrl) throw new Error("No plain-text format found for this book");

    // 3) fetch book text and pick a paragraph
    const txtRes = await fetch(textUrl);
    if (!txtRes.ok) throw new Error("Failed to download book text");
    const fullText = await txtRes.text();

    const paragraph = cleanParagraph(fullText, 600);
    return {
      text: paragraph,
      title: book.title,
      url: `https://www.gutenberg.org/ebooks/${book.id}`,
      source: "Project Gutenberg (public domain)"
    };
  };

  const getRandom = async () => {
    setLoading(true);
    setError("");
    try {
      const data =
        source === "wikipedia"
          ? await fetchWikipedia()
          : await fetchGutenberg();

      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <label>
          Source:{" "}
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="wikipedia">Wikipedia (random article summary)</option>
            <option value="gutenberg">Project Gutenberg (random book paragraph)</option>
          </select>
        </label>
        <button onClick={getRandom} disabled={loading}>
          {loading ? "Loading…" : "Randomize"}
        </button>
      </div>

      {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

      {result && (
        <div>
          {/* Your blackout box could wrap JUST this section */}
          <div
            style={{
              border: "2px solid black",
              borderRadius: 8,
              padding: 20,
              background: "#f9f9f9",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.08)",
              lineHeight: "1.6em",
              fontSize: 18,
              maxWidth: 720
            }}
          >
            {result.text.split(" ").map((w, i) => (
              <span key={i} style={{ marginRight: 4 }}>{w}</span>
            ))}
          </div>

          {/* Source / citation */}
          <div style={{ marginTop: 10, fontSize: 14 }}>
            Source: <strong>{result.source}</strong>{result.title ? ` — “${result.title}”` : ""} ·{" "}
            <a href={result.url} target="_blank" rel="noreferrer">Open source</a>
          </div>
        </div>
      )}
    </div>
  );
}
