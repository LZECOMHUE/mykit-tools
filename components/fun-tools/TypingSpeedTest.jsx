"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";

const PARAGRAPHS = {
  easy: [
    "The quick brown fox jumps over the lazy dog near the river bank on a warm summer day while birds sing in the trees above.",
    "She sells sea shells by the sea shore while the sun sets behind the old stone lighthouse casting long golden shadows across the sand.",
    "A small grey cat sat on the red mat and watched the rain fall gently on the garden flowers outside the kitchen window.",
    "The old man walked his dog along the quiet path through the park every morning before the sun rose too high in the sky.",
    "We went to the shop to buy some bread and milk for breakfast and came home with bags full of fresh fruit and cheese.",
    "The children played in the garden all day long running through the sprinkler and eating ice cream in the warm afternoon sun.",
  ],
  medium: [
    "The restaurant on the corner of Fifth Avenue has been serving authentic Italian cuisine for over thirty years and remains a favourite destination for locals and tourists alike.",
    "Scientists at the research laboratory announced a breakthrough discovery that could potentially transform our understanding of climate change and its effects on marine ecosystems worldwide.",
    "The software development team implemented several significant improvements to the application during the quarterly sprint including better performance and enhanced security features.",
    "Photography requires a combination of technical knowledge and creative vision to capture compelling images that tell stories and evoke emotional responses from viewers.",
    "The marathon runner maintained a steady pace throughout the first twenty miles before accelerating during the final stretch to finish with a personal best time.",
    "Modern architecture blends functionality with aesthetic appeal creating buildings that serve practical purposes while contributing to the visual landscape of contemporary cities.",
  ],
  hard: [
    "Notwithstanding the unprecedented circumstances surrounding the pharmaceutical industry's regulatory framework, stakeholders unanimously acknowledged the necessity of implementing comprehensive quality assurance protocols.",
    "The juxtaposition of Byzantine architectural principles with contemporary minimalist aesthetics yielded an extraordinarily captivating synthesis that fundamentally challenged conventional design paradigms.",
    "Cryptocurrency's decentralised infrastructure leverages sophisticated cryptographic algorithms and distributed ledger technology to facilitate pseudonymous transactions across jurisdictional boundaries.",
    "The neuroplasticity hypothesis suggests that synaptic connections within the cerebral cortex continuously reorganise themselves in response to experiential stimuli throughout an individual's lifespan.",
    "Epistemological discourse surrounding phenomenological reductionism has persistently challenged the foundational assumptions underlying empiricist methodologies in contemporary philosophical inquiry.",
    "Quantum entanglement experiments at superconducting temperatures demonstrated previously hypothetical correlations between spatially separated photon pairs exhibiting instantaneous state synchronisation.",
  ],
};

const DIFFICULTY_LABELS = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "Hard" },
];

export default function TypingSpeedTest() {
  const [difficulty, setDifficulty] = useState("medium");
  const [paragraph, setParagraph] = useState("");
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const pickParagraph = useCallback((diff) => {
    const list = PARAGRAPHS[diff];
    return list[Math.floor(Math.random() * list.length)];
  }, []);

  // Init
  useEffect(() => {
    setParagraph(pickParagraph(difficulty));
  }, [difficulty, pickParagraph]);

  const resetTest = (sameParagraph = false, newDifficulty) => {
    const d = newDifficulty || difficulty;
    if (!sameParagraph) setParagraph(pickParagraph(d));
    setTyped("");
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setElapsed(0);
    setErrors(0);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Timer
  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, finished, startTime]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (finished) return;

    // Start on first keystroke - use local variable to avoid stale state
    let currentStartTime = startTime;
    if (!started && val.length > 0) {
      currentStartTime = Date.now();
      setStartTime(currentStartTime);
      setStarted(true);
    }

    // Count errors for newly typed characters
    if (val.length > typed.length) {
      const newChars = val.slice(typed.length);
      let newErrors = 0;
      for (let i = 0; i < newChars.length; i++) {
        const idx = typed.length + i;
        if (idx < paragraph.length && newChars[i] !== paragraph[idx]) {
          newErrors++;
        }
      }
      setErrors((prev) => prev + newErrors);
    }

    setTyped(val);

    // Check completion
    if (val.length >= paragraph.length) {
      setFinished(true);
      setElapsed(Date.now() - currentStartTime);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const minutes = elapsed / 60000;
  const wpm = minutes > 0 ? Math.round((typed.length / 5) / minutes) : 0;
  const accuracy = typed.length > 0 ? Math.round(((typed.length - errors) / typed.length) * 100) : 100;
  const timeStr = (elapsed / 1000).toFixed(1);

  // Render character colouring
  const renderText = () => {
    return paragraph.split("").map((char, i) => {
      let cls = "text-text-muted"; // untyped
      if (i < typed.length) {
        cls = typed[i] === char ? "text-green-600" : "text-red-500 bg-red-50 underline";
      } else if (i === typed.length) {
        cls = "text-text-primary bg-accent/15 border-l-2 border-accent";
      }
      return (
        <span key={i} className={cls}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {DIFFICULTY_LABELS.map((d) => (
            <button
              key={d.key}
              onClick={() => { resetTest(false, d.key); setDifficulty(d.key); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                difficulty === d.key
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        {started && !finished && (
          <div className="flex items-center gap-4 ml-auto text-sm">
            <span className="text-text-muted">
              <span className="font-mono text-text-primary">{wpm}</span> WPM
            </span>
            <span className="text-text-muted">
              <span className="font-mono text-text-primary">{accuracy}%</span> acc
            </span>
            <span className="text-text-muted">
              <span className="font-mono text-text-primary">{timeStr}</span>s
            </span>
          </div>
        )}
      </div>

      {/* Results screen */}
      {finished ? (
        <div className="space-y-4">
          <div className="text-center py-6">
            <div className="text-6xl font-mono font-bold text-accent mb-1">{wpm}</div>
            <div className="text-text-muted text-sm">words per minute</div>
          </div>
          <div className="flex justify-center gap-4 text-center">
            <div>
              <div className="text-2xl font-mono font-semibold text-text-primary">{accuracy}%</div>
              <div className="text-xs text-text-muted">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-semibold text-text-primary">{timeStr}s</div>
              <div className="text-xs text-text-muted">Time</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-semibold text-text-primary">{errors}</div>
              <div className="text-xs text-text-muted">Errors</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-semibold text-text-primary">{typed.length}</div>
              <div className="text-xs text-text-muted">Characters</div>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <Button onClick={() => resetTest(false)}>Try Again</Button>
            <Button variant="secondary" onClick={() => resetTest(true)}>Same Text</Button>
          </div>
        </div>
      ) : (
        <>
          {/* Text display */}
          <div
            className="p-4 rounded-lg border border-border bg-surface text-base leading-relaxed font-mono tracking-wide cursor-text select-none"
            onClick={() => inputRef.current?.focus()}
          >
            {renderText()}
          </div>

          {/* Hidden input */}
          <textarea
            ref={inputRef}
            value={typed}
            onChange={handleInput}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full p-3 rounded-lg border border-border bg-white text-text-primary font-mono text-base focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 resize-none"
            rows={3}
            placeholder="Start typing here..."
          />

          {!started && (
            <p className="text-xs text-text-muted text-center">Start typing to begin the test</p>
          )}
        </>
      )}
    </div>
  );
}
