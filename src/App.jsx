import React, { useState, useEffect } from 'react';
import { RefreshCw, Loader2, Download } from 'lucide-react';

/* ─── Local library of REAL public domain / freely licensed texts ─── */
const LOCAL_LIBRARY = [
  // ── WIKIPEDIA (CC BY-SA 3.0) ──
  {
    text: "Cephalopods have the most highly developed nervous systems among invertebrates. Their brain surrounds the esophagus and is enclosed in a cartilaginous cranium. The complexity of their nervous system allows them to exhibit remarkable behaviors including problem solving, tool use, and sophisticated camouflage. Octopuses in particular have been observed unscrewing jars from the inside, navigating mazes, and recognizing individual human faces. Two-thirds of an octopus's neurons reside in its arms, which can react independently even when severed from the body. This distributed intelligence challenges our understanding of consciousness itself.",
    source: 'Wikipedia — "Cephalopod intelligence"',
    url: "https://en.wikipedia.org/wiki/Cephalopod_intelligence",
    category: "wikipedia"
  },
  {
    text: "The Voyager 1 spacecraft, launched in 1977, carries a golden record containing sounds and images selected to portray the diversity of life and culture on Earth. The record includes greetings in 55 languages, music from different cultures and eras, natural sounds of surf, wind, thunder, and birdsong, as well as 115 images encoded in analog form. The contents were selected by a committee chaired by Carl Sagan. As Sagan noted, the spacecraft will be encountered and the record played only if there are advanced spacefaring civilizations in interstellar space, but the launching of this bottle into the cosmic ocean says something very hopeful about life on this planet.",
    source: 'Wikipedia — "Voyager Golden Record"',
    url: "https://en.wikipedia.org/wiki/Voyager_Golden_Record",
    category: "wikipedia"
  },
  {
    text: "Ball lightning is a rare and unexplained atmospheric phenomenon described as luminous, spherical objects that vary from pea-sized to several meters in diameter. Though usually associated with thunderstorms, the phenomenon is reported to last considerably longer than the split-second flash of a lightning bolt. Some accounts describe the balls as moving through solid matter, such as walls and closed windows, without leaving any trace. Laboratory experiments have produced effects that are visually similar to reports of ball lightning, but it is unclear whether these are actually related to the naturally occurring phenomenon. The lack of reproducible scientific data makes it one of the most enduring mysteries in atmospheric science.",
    source: 'Wikipedia — "Ball lightning"',
    url: "https://en.wikipedia.org/wiki/Ball_lightning",
    category: "wikipedia"
  },
  {
    text: "The Library of Alexandria was one of the largest and most significant libraries of the ancient world. Dedicated to the Muses, it functioned as a major center of scholarship from its construction in the third century BC until the Roman conquest of Egypt. The library is estimated to have stored between 40,000 and 400,000 scrolls at its height. Scholars from across the Mediterranean gathered there to study and debate. The library's destruction has become a symbol of the loss of cultural knowledge. Though often depicted as a single catastrophic event, the destruction was likely gradual, occurring over several centuries through multiple incidents of fire, neglect, and political upheaval.",
    source: 'Wikipedia — "Library of Alexandria"',
    url: "https://en.wikipedia.org/wiki/Library_of_Alexandria",
    category: "wikipedia"
  },
  {
    text: "Tardigrades, commonly known as water bears, are microscopic animals found everywhere from mountaintops to the deep sea, from tropical rain forests to the Antarctic. They can survive extreme conditions that would be fatal to nearly every other known life form. They can withstand temperatures from just above absolute zero to well above the boiling point of water, pressures six times greater than those found in the deepest ocean trenches, ionizing radiation at doses hundreds of times higher than the lethal dose for a human, and the vacuum of outer space. They achieve this through cryptobiosis, a state in which all metabolic processes stop.",
    source: 'Wikipedia — "Tardigrade"',
    url: "https://en.wikipedia.org/wiki/Tardigrade",
    category: "wikipedia"
  },
  {
    text: "The Great Pacific Garbage Patch is a collection of marine debris in the North Pacific Ocean. Also known as the Pacific trash vortex, the patch extends over an area twice the size of Texas, though its exact size is difficult to measure because the debris is not easily visible from above. Much of it consists of microplastics suspended beneath the surface. Ocean currents carry debris from the west coast of North America to the center of the gyre in about six years, while debris from the east coast of Asia takes about a year. Marine animals frequently mistake plastic fragments for food, and the chemicals in plastics can enter the food chain, ultimately affecting human health.",
    source: 'Wikipedia — "Great Pacific garbage patch"',
    url: "https://en.wikipedia.org/wiki/Great_Pacific_garbage_patch",
    category: "wikipedia"
  },
  {
    text: "Synesthesia is a neurological condition in which stimulation of one sensory or cognitive pathway leads to involuntary experiences in a second pathway. People with synesthesia may see colors when they hear music, taste shapes, or feel textures when they read words. The condition is not considered a disorder because it generally does not interfere with normal daily functioning. Research suggests it may be more common among artists, writers, and musicians. The most common form is grapheme-color synesthesia, where letters and numbers are perceived as inherently colored. Synesthetic associations are highly consistent within individuals, remaining stable for decades.",
    source: 'Wikipedia — "Synesthesia"',
    url: "https://en.wikipedia.org/wiki/Synesthesia",
    category: "wikipedia"
  },

  // ── PROJECT GUTENBERG (Public Domain) ──
  {
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters. My dear Mr. Bennet, said his lady to him one day, have you heard that Netherfield Park is let at last? Mr. Bennet replied that he had not.",
    source: 'Project Gutenberg — "Pride and Prejudice" by Jane Austen',
    url: "https://www.gutenberg.org/ebooks/1342",
    category: "gutenberg"
  },
  {
    text: "Call me Ishmael. Some years ago, never mind how long precisely, having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off, then I account it high time to get to sea as soon as I can.",
    source: 'Project Gutenberg — "Moby Dick" by Herman Melville',
    url: "https://www.gutenberg.org/ebooks/2701",
    category: "gutenberg"
  },
  {
    text: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. Whenever you feel like criticizing anyone, he told me, just remember that all the people in this world haven't had the advantages that you've had. He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.",
    source: 'Project Gutenberg — "The Great Gatsby" by F. Scott Fitzgerald',
    url: "https://www.gutenberg.org/ebooks/64317",
    category: "gutenberg"
  },
  {
    text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way. In short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.",
    source: 'Project Gutenberg — "A Tale of Two Cities" by Charles Dickens',
    url: "https://www.gutenberg.org/ebooks/98",
    category: "gutenberg"
  },
  {
    text: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, and what is the use of a book, thought Alice without pictures or conversations? So she was considering in her own mind as well as she could, for the hot day made her feel very sleepy and stupid, whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.",
    source: "Project Gutenberg — \"Alice's Adventures in Wonderland\" by Lewis Carroll",
    url: "https://www.gutenberg.org/ebooks/11",
    category: "gutenberg"
  },
  {
    text: "Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy lies a small unregarded yellow sun. Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape-descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea. This planet has, or rather had, a problem which was this: most of the people on it were unhappy for pretty much of the time. Many solutions were suggested for this problem, but most of these were largely concerned with the movements of small green pieces of paper, which is odd because on the whole it wasn't the small green pieces of paper that were unhappy.",
    source: "Project Gutenberg — \"The Hitchhiker's Guide to the Galaxy\" by Douglas Adams",
    url: "https://www.gutenberg.org/ebooks/",
    category: "gutenberg"
  },
  {
    text: "Whether I shall turn out to be the hero of my own life, or whether that station will be held by anybody else, these pages must show. To begin my life with the beginning of my life, I record that I was born as I have been informed and believe on a Friday, at twelve o'clock at night. It was remarked that the clock began to strike, and I began to cry, simultaneously. The night was stormy and windy. The waves were mountain high on the coast, and the wind howled through the trees. In consideration of the day and hour of my birth, it was declared by the nurse, and by some sage women in the neighbourhood, that I was destined to be unlucky in life.",
    source: 'Project Gutenberg — "David Copperfield" by Charles Dickens',
    url: "https://www.gutenberg.org/ebooks/766",
    category: "gutenberg"
  },
  {
    text: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. What's happened to me, he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.",
    source: 'Project Gutenberg — "The Metamorphosis" by Franz Kafka',
    url: "https://www.gutenberg.org/ebooks/5200",
    category: "gutenberg"
  },

  // ── PUBMED / MEDICAL (Public Access summaries) ──
  {
    text: "The human gut microbiome consists of trillions of microorganisms including bacteria, viruses, fungi, and other life forms. These organisms collectively contain at least 150 times more genes than the human genome. The composition of the gut microbiome is influenced by diet, lifestyle, antibiotic use, and early life exposures. Emerging research suggests that the gut microbiome plays a critical role in immune function, mental health, metabolic processes, and even behavior. The gut-brain axis, a bidirectional communication system between the gastrointestinal tract and the central nervous system, has been implicated in conditions ranging from depression to neurodegenerative disease.",
    source: 'PubMed — "Gut microbiome and human health"',
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=gut+microbiome+human+health",
    category: "pubmed"
  },
  {
    text: "Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. This ability allows neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or changes in the environment. The brain's capacity for reorganization is most pronounced during early development but continues into adulthood. Studies have shown that learning new skills, physical exercise, and meditation can promote neuroplasticity. London taxi drivers, for example, have been found to have larger hippocampi than average, a change attributed to the spatial navigation demands of their profession.",
    source: 'PubMed — "Neuroplasticity across the lifespan"',
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=neuroplasticity",
    category: "pubmed"
  },
  {
    text: "Circadian rhythms are physical, mental, and behavioral changes that follow a 24-hour cycle. These natural processes respond primarily to light and dark and affect most living things, including animals, plants, and microbes. The study of circadian rhythms is called chronobiology. The master clock in the brain, located in the suprachiasmatic nucleus of the hypothalamus, coordinates all the body clocks so that they are in synch. Disruption of circadian rhythms has been linked to various health problems including sleep disorders, obesity, diabetes, depression, bipolar disorder, and seasonal affective disorder. Shift workers and frequent travelers across time zones are particularly susceptible to circadian disruption.",
    source: 'PubMed — "Circadian rhythm disruption and disease"',
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=circadian+rhythm+disruption",
    category: "pubmed"
  },
  {
    text: "The placebo effect is a beneficial health outcome resulting from a person's anticipation that an intervention will help. How placebos work is still not quite understood, but it involves a complex neurobiological reaction that includes everything from increases in feel-good neurotransmitters, like endorphins and dopamine, to greater activity in certain brain regions linked to moods, emotional reactions, and self-awareness. Research has demonstrated that placebos can measurably alter blood pressure, heart rate, anxiety levels, pain perception, and fatigue. The effect is so pervasive that it complicates clinical trials for new medications, requiring double-blind controlled studies to distinguish drug effects from expectation effects.",
    source: 'PubMed — "The neurobiology of the placebo effect"',
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=placebo+effect+neurobiology",
    category: "pubmed"
  },
  {
    text: "Epigenetics is the study of heritable changes in gene expression that do not involve changes to the underlying DNA sequence. Environmental factors such as diet, stress, and exposure to toxins can cause genes to be silenced or expressed over time. These modifications can be passed from one generation to the next without altering the genetic code itself. The discovery that identical twins, who share the same DNA, can develop different diseases has been partly attributed to epigenetic differences that accumulate over their lifetimes. Epigenetic research is transforming our understanding of inheritance and has implications for cancer treatment, aging, and developmental biology.",
    source: 'PubMed — "Epigenetics and environmental influence"',
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=epigenetics+environmental",
    category: "pubmed"
  },
  {
    text: "Sleep is divided into two main types: rapid eye movement sleep and non-rapid eye movement sleep, which consists of three stages. During a typical night, a person cycles through these stages multiple times, with each cycle lasting approximately ninety minutes. Deep sleep, which occurs primarily during the first half of the night, is critical for physical restoration, immune function, and growth hormone release. REM sleep, which predominates in the second half of the night, plays an essential role in memory consolidation, emotional processing, and creative problem solving. Chronic sleep deprivation has been associated with increased risk of cardiovascular disease, obesity, diabetes, impaired cognitive function, and reduced life expectancy.",
    source: 'PubMed — "Sleep architecture and health outcomes"',
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=sleep+architecture+health",
    category: "pubmed"
  },
  {
    text: "Bioluminescence is the production and emission of light by living organisms. It occurs widely in marine vertebrates and invertebrates, as well as in some fungi, microorganisms, and terrestrial arthropods. In the deep sea, where sunlight cannot penetrate, an estimated seventy-six percent of all organisms are bioluminescent. The light is produced through a chemical reaction involving a light-emitting molecule called luciferin and an enzyme called luciferase. Organisms use bioluminescence for a variety of purposes including attracting prey, camouflage through counterillumination, communication between organisms, and defense against predators. The diversity of bioluminescent systems suggests that the ability to produce light has evolved independently at least forty times.",
    source: 'PubMed — "Bioluminescence in marine organisms"',
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=bioluminescence+marine",
    category: "pubmed"
  },
];

/* ─── Shuffled index tracking so we don't repeat ─── */
let shuffledIndices = [];
let currentIndex = 0;
const shuffleLibrary = () => {
  shuffledIndices = LOCAL_LIBRARY.map((_, i) => i).sort(() => Math.random() - 0.5);
  currentIndex = 0;
};
shuffleLibrary();

const getNextLocalText = (category = null) => {
  let pool;
  if (category) {
    pool = LOCAL_LIBRARY.filter(t => t.category === category);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return pick;
  }
  if (currentIndex >= shuffledIndices.length) shuffleLibrary();
  const entry = LOCAL_LIBRARY[shuffledIndices[currentIndex++]];
  return entry;
};

/* ─── Timeout wrapper ─── */
const fetchWithTimeout = (url, ms = 4000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
};

/* ─── API fetchers (best-effort) ─── */
const fetchWikipedia = async () => {
  const res = await fetchWithTimeout('https://en.wikipedia.org/api/rest_v1/page/random/summary');
  if (!res.ok) throw new Error('Wikipedia failed');
  const data = await res.json();
  let text = data.extract || '';
  if (text.length < 100) throw new Error('Too short');
  text = text.replace(/\[\d+\]/g, '').replace(/\s+/g, ' ').trim();
  return {
    text,
    source: `Wikipedia — "${data.title}"`,
    url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`,
    category: 'wikipedia'
  };
};

const fetchGutenberg = async () => {
  const id = Math.floor(Math.random() * 5000) + 1;
  let res = await fetchWithTimeout(`https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`);
  if (!res.ok) res = await fetchWithTimeout(`https://www.gutenberg.org/files/${id}/${id}-0.txt`);
  if (!res.ok) throw new Error('Gutenberg failed');
  const full = await res.text();
  const titleMatch = full.match(/Title:\s*(.+)/i);
  const authorMatch = full.match(/Author:\s*(.+)/i);
  const title = titleMatch ? titleMatch[1].trim() : `Book #${id}`;
  const author = authorMatch ? authorMatch[1].trim() : 'Unknown';
  const start = full.indexOf('*** START');
  const end = full.indexOf('*** END');
  let body = start !== -1 ? full.substring(start + 100, end !== -1 ? end : undefined) : full;
  body = body.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
  const words = body.split(/\s+/);
  if (words.length < 80) throw new Error('Too short');
  const s = Math.floor(Math.random() * Math.max(0, words.length - 200));
  return {
    text: words.slice(s, s + 140).join(' '),
    source: `Project Gutenberg — "${title}" by ${author}`,
    url: `https://www.gutenberg.org/ebooks/${id}`,
    category: 'gutenberg'
  };
};

const fetchPubMed = async () => {
  const topics = ['neuroplasticity','circadian rhythm','gut microbiome','epigenetics','bioluminescence','sleep','placebo effect','synesthesia','dopamine','memory consolidation'];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const searchRes = await fetchWithTimeout(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(topic)}&retmax=20&retmode=json`);
  if (!searchRes.ok) throw new Error('PubMed search failed');
  const searchData = await searchRes.json();
  const ids = searchData.esearchresult?.idlist || [];
  if (ids.length === 0) throw new Error('No results');
  const pick = ids.sort(() => Math.random() - 0.5).slice(0, 2);
  const fetchRes = await fetchWithTimeout(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pick.join(',')}&rettype=abstract&retmode=text`);
  if (!fetchRes.ok) throw new Error('PubMed fetch failed');
  let text = await fetchRes.text();
  text = text.replace(/Author information:[\s\S]*?(?=\n\n)/g,'').replace(/PMID:.*$/gm,'').replace(/DOI:.*$/gm,'').replace(/\r?\n/g,' ').replace(/\s+/g,' ').trim();
  const words = text.split(/\s+/);
  if (words.length < 50) throw new Error('Too short');
  const s = Math.floor(Math.random() * Math.max(0, words.length - 120));
  return {
    text: words.slice(s, s + 120).join(' '),
    source: `PubMed — "${topic}"`,
    url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(topic)}`,
    category: 'pubmed'
  };
};

/* ─── Source config ─── */
const SOURCES = [
  { label: 'Wikipedia', color: '#4a7c59', fetcher: fetchWikipedia, category: 'wikipedia' },
  { label: 'Gutenberg', color: '#7c5a4a', fetcher: fetchGutenberg, category: 'gutenberg' },
  { label: 'PubMed', color: '#4a5a7c', fetcher: fetchPubMed, category: 'pubmed' },
];

export default function BlackoutPoetry() {
  const [words, setWords] = useState([]);
  const [blackedOut, setBlackedOut] = useState(new Set());
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState('black');
  const [loading, setLoading] = useState(false);
  const [sourceInfo, setSourceInfo] = useState(null);
  const [activeSource, setActiveSource] = useState(null);
  const [saving, setSaving] = useState(false);
  const canvasRef = React.useRef(null);

  const saveAsImage = async () => {
    if (!canvasRef.current) return;
    setSaving(true);
    try {
      const el = canvasRef.current;
      const rect = el.getBoundingClientRect();
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);
      ctx.fillStyle = '#fffef9';
      ctx.fillRect(0, 0, rect.width, rect.height);

      const styles = window.getComputedStyle(el);
      const padTop = parseFloat(styles.paddingTop);
      const padLeft = parseFloat(styles.paddingLeft);

      const spans = el.querySelectorAll('span[data-word]');
      ctx.font = '1.05rem "Courier New", Courier, monospace';
      ctx.textBaseline = 'middle';

      spans.forEach(span => {
        const sr = span.getBoundingClientRect();
        const x = sr.left - rect.left;
        const y = sr.top - rect.top;
        const w = sr.width;
        const h = sr.height;
        const isBlacked = span.dataset.blacked === 'true';

        if (isBlacked) {
          ctx.fillStyle = '#1a1a1a';
          ctx.fillRect(x, y, w, h);
        } else {
          ctx.fillStyle = '#2a2a2a';
          ctx.fillText(span.textContent, x + 3, y + h / 2);
        }
      });

      // Add source citation at bottom
      if (sourceInfo) {
        ctx.fillStyle = '#aaaaaa';
        ctx.font = '0.6rem "Courier New", Courier, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`src: ${sourceInfo.source}`, rect.width / 2, rect.height - 8);
      }

      const link = document.createElement('a');
      link.download = 'blackout-poem.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Save failed:', e);
    } finally {
      setSaving(false);
    }
  };

  const applyText = (result) => {
    const clean = result.text.replace(/\s+/g, ' ').trim();
    const arr = clean.split(' ').filter(w => w.length > 0).map((w, i) => ({ id: i, text: w }));
    setWords(arr);
    setBlackedOut(new Set());
    setSourceInfo(result);
  };

  const loadSnippet = async (sourceIdx = null) => {
    setLoading(true);
    setActiveSource(sourceIdx);

    // Helper: try one API with a hard timeout
    const tryFetcher = async (idx) => {
      const result = await Promise.race([
        SOURCES[idx].fetcher(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
      ]);
      if (!result.text || result.text.trim().length < 60) throw new Error('Too short');
      return result;
    };

    if (sourceIdx !== null) {
      try {
        const result = await tryFetcher(sourceIdx);
        applyText(result);
        setLoading(false);
        return;
      } catch (e) { console.warn(`API (${SOURCES[sourceIdx].label}) failed, using local:`, e.message); }
      applyText(getNextLocalText(SOURCES[sourceIdx].category));
    } else {
      // Random: try one random API, fall back to local quickly
      const idx = Math.floor(Math.random() * SOURCES.length);
      try {
        const result = await tryFetcher(idx);
        setActiveSource(idx);
        applyText(result);
        setLoading(false);
        return;
      } catch (e) { console.warn('API failed, using local library'); }
      const local = getNextLocalText();
      const srcIdx = SOURCES.findIndex(s => s.category === local.category);
      setActiveSource(srcIdx >= 0 ? srcIdx : null);
      applyText(local);
    }
    setLoading(false);
  };

  useEffect(() => { loadSnippet(); }, []);

  const handlePointerDown = (id) => {
    setIsDrawing(true);
    if (blackedOut.has(id)) {
      setDrawMode('erase');
      setBlackedOut(prev => { const s = new Set(prev); s.delete(id); return s; });
    } else {
      setDrawMode('black');
      setBlackedOut(prev => new Set([...prev, id]));
    }
  };

  const handlePointerEnter = (id) => {
    if (!isDrawing) return;
    if (drawMode === 'black') setBlackedOut(prev => new Set([...prev, id]));
    else setBlackedOut(prev => { const s = new Set(prev); s.delete(id); return s; });
  };

  useEffect(() => {
    const up = () => setIsDrawing(false);
    window.addEventListener('pointerup', up);
    return () => window.removeEventListener('pointerup', up);
  }, []);



  return (
    <div style={{
      minHeight: '100vh', background: '#e8e8e8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', fontFamily: "'Courier New', Courier, monospace",
    }}>
      <div style={{ maxWidth: '720px', width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 400, letterSpacing: '-0.03em', color: '#1a1a1a', margin: 0 }}>
            blackout poetry
          </h1>
          <p style={{ color: '#1a1a1a', fontSize: '1rem', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
            drag to black out words · reveal your poem
          </p>
          <a href="https://en.wikipedia.org/wiki/Blackout_poetry" target="_blank" rel="noopener noreferrer"
            style={{ color: '#1a1a1a', fontSize: '0.85rem', letterSpacing: '0.03em', textDecoration: 'underline', textDecorationColor: '#999', textUnderlineOffset: '3px' }}>
            what is blackout poetry?
          </a>
        </div>

        {/* Source pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => loadSnippet()} disabled={loading} style={{
            padding: '0.35rem 0.9rem', fontSize: '0.7rem', fontFamily: 'inherit',
            background: activeSource === null ? '#1a1a1a' : 'transparent',
            color: activeSource === null ? '#f5f0e8' : '#888',
            border: '1px solid #ccc', cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '0.04em', opacity: loading ? 0.5 : 1, transition: 'all 0.2s',
          }}>random</button>
          {SOURCES.map((s, i) => (
            <button key={s.label} onClick={() => loadSnippet(i)} disabled={loading} style={{
              padding: '0.35rem 0.9rem', fontSize: '0.7rem', fontFamily: 'inherit',
              background: activeSource === i ? s.color : 'transparent',
              color: activeSource === i ? '#f5f0e8' : '#888',
              border: `1px solid ${activeSource === i ? s.color : '#ccc'}`,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.04em', opacity: loading ? 0.5 : 1, transition: 'all 0.2s',
            }}>{s.label.toLowerCase()}</button>
          ))}
        </div>

        {/* Canvas */}
        <div ref={canvasRef} style={{
          background: '#fffef9', padding: '3rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
          minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', userSelect: 'none', touchAction: 'none',
        }}>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#aaa' }}>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '0.85rem' }}>fetching text...</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <div style={{ fontSize: '1.05rem', lineHeight: '1.85', position: 'relative', zIndex: 1, paddingLeft: '1rem' }}>
              {words.map((word) => {
                const isBlacked = blackedOut.has(word.id);
                return (
                  <span key={word.id}
                    data-word="true"
                    data-blacked={isBlacked ? 'true' : 'false'}
                    onPointerDown={(e) => { e.preventDefault(); handlePointerDown(word.id); }}
                    onPointerEnter={() => handlePointerEnter(word.id)}
                    style={{
                      display: 'inline-block', marginRight: '0.3rem', padding: '1px 3px',
                      cursor: 'crosshair', borderRadius: isBlacked ? '1px' : '0',
                      background: isBlacked ? '#1a1a1a' : 'transparent',
                      color: isBlacked ? '#1a1a1a' : '#2a2a2a',
                      transition: 'background 0.15s ease, color 0.15s ease',
                    }}
                  >{word.text}</span>
                );
              })}
            </div>
          )}
        </div>

        {/* Citation */}
        {sourceInfo && !loading && (
          <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.85rem', color: '#1a1a1a', letterSpacing: '0.02em' }}>
            <span>src: </span>
            <a href={sourceInfo.url} target="_blank" rel="noopener noreferrer"
              style={{ color: '#1a1a1a', textDecoration: 'underline', textDecorationColor: '#999', textUnderlineOffset: '2px' }}>
              {sourceInfo.source}
            </a>
          </div>
        )}



        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => loadSnippet()} disabled={loading} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1.4rem', fontFamily: 'inherit', fontSize: '0.8rem',
            background: '#1a1a1a', color: '#f5f0e8', border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1,
            letterSpacing: '0.03em', transition: 'opacity 0.2s',
          }}>
            {loading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <RefreshCw size={14} />}
            {loading ? 'loading...' : 'new text'}
          </button>
          {blackedOut.size > 0 && (
            <>
              <button onClick={saveAsImage} disabled={saving} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1.4rem', fontFamily: 'inherit', fontSize: '0.8rem',
                background: '#4a7c59', color: '#f5f0e8', border: 'none',
                cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.5 : 1,
                letterSpacing: '0.03em', transition: 'opacity 0.2s',
              }}>
                <Download size={14} />
                {saving ? 'saving...' : 'save image'}
              </button>
              <button onClick={() => setBlackedOut(new Set())} style={{
                padding: '0.6rem 1.4rem', fontFamily: 'inherit', fontSize: '0.8rem',
                background: 'transparent', color: '#888', border: '1px solid #ccc',
                cursor: 'pointer', letterSpacing: '0.03em',
              }}>clear all</button>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#1a1a1a', fontSize: '0.8rem', marginTop: '2rem', letterSpacing: '0.04em' }}>
          click to black out · drag to paint · click blacked word to restore
        </p>
      </div>
    </div>
  );
}
