'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';

const THEMES = [
  { value: 'none', label: 'No prompt', icon: '✏️' },
  { value: 'love', label: 'Love', icon: '❤️' },
  { value: 'loss', label: 'Loss', icon: '🕯️' },
  { value: 'horror', label: 'Horror', icon: '👻' },
  { value: 'hope', label: 'Hope', icon: '🌱' },
  { value: 'mystery', label: 'Mystery', icon: '🔍' },
  { value: 'childhood', label: 'Childhood', icon: '🪁' },
];

const PROMPTS = {
  none: null,
  love: 'Write about a love found, lost, or remembered.',
  loss: 'Write about something - or someone - that is gone.',
  horror: 'Write something that unsettles the reader in six words.',
  hope: 'Write about a small moment of light or possibility.',
  mystery: 'Leave the reader with a question that lingers.',
  childhood: 'Write about a memory, a game, or a moment from being young.',
};

const FAMOUS_STORIES = [
  { text: 'For sale: baby shoes, never worn.', attr: 'Ernest Hemingway (attributed)' },
  { text: 'Failed SAT. Lost scholarship. Invented rocket.', attr: 'William Van Winkle' },
  { text: 'Longed for him. Got him. Shit.', attr: 'Margaret Atwood' },
  { text: 'Computer, did we bring batteries? Computer?', attr: 'Eileen Gunn' },
  { text: 'Gown removed carelessly. Head, less so.', attr: 'Joss Whedon' },
  { text: 'Automobile warranty expires. Die soon after.', attr: 'Greg van Eekhout' },
  { text: 'Lie detector broken. Lied about that.', attr: 'Laurie Chapa' },
  { text: 'I still make coffee for two.', attr: 'Unknown' },
  { text: 'They said I could be anything.', attr: 'Unknown' },
  { text: 'Sorry soldier, shoes sold in pairs.', attr: 'Gabriel M.' },
];

const MAX_SAVED = 10;
const STORAGE_KEY = 'six-word-stories';

function loadStories() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveStoriesToStorage(stories) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  } catch {}
}

export default function SixWordStory() {
  const [text, setText] = useState('');
  const [theme, setTheme] = useState('none');
  const [savedStories, setSavedStories] = useState([]);
  const [saveMsg, setSaveMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setSavedStories(loadStories());
  }, []);

  const wordCount = useMemo(() => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  }, [text]);

  const charCount = text.length;

  const wordCountColor = useMemo(() => {
    if (wordCount === 6) return 'text-success';
    if (wordCount === 5 || wordCount === 7) return 'text-warning';
    if (wordCount > 7) return 'text-error';
    return 'text-text-muted';
  }, [wordCount]);

  const wordCountBg = useMemo(() => {
    if (wordCount === 6) return 'bg-success/10 border-success/30';
    if (wordCount === 5 || wordCount === 7) return 'bg-warning/10 border-warning/30';
    if (wordCount > 7) return 'bg-error/10 border-error/30';
    return 'bg-surface border-border';
  }, [wordCount]);

  const handleSave = useCallback(() => {
    if (!text.trim()) return;
    if (wordCount !== 6) {
      setSaveMsg('Story must be exactly 6 words to save.');
      setTimeout(() => setSaveMsg(''), 2500);
      return;
    }
    const newStory = {
      id: Date.now(),
      text: text.trim(),
      theme,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setSavedStories((prev) => {
      const updated = [newStory, ...prev].slice(0, MAX_SAVED);
      saveStoriesToStorage(updated);
      return updated;
    });
    setSaveMsg('Story saved!');
    setTimeout(() => setSaveMsg(''), 2000);
  }, [text, theme, wordCount]);

  const handleDelete = useCallback((id) => {
    setSavedStories((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveStoriesToStorage(updated);
      return updated;
    });
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [text]);

  const handleShare = useCallback(async () => {
    const shareText = text.trim();
    if (!shareText) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Six-Word Story',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setShared(true);
      setTimeout(() => setShared(false), 1500);
    } catch {}
  }, [text]);

  const handleCopyFamous = useCallback(async (storyText) => {
    try {
      await navigator.clipboard.writeText(storyText);
    } catch {}
  }, []);

  return (
    <div className="space-y-4">
      {/* Hemingway inspiration panel */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">The inspiration</p>
        <p className="font-heading text-xl font-bold text-text-primary">"For sale: baby shoes, never worn."</p>
        <p className="text-xs text-text-muted mt-1">Six words. One complete story. Attributed to Ernest Hemingway - and still the gold standard.</p>
      </div>

      {/* Theme chooser */}
      <div>
        <p className="text-xs font-medium text-text-secondary mb-2">Theme prompt (optional)</p>
        <div className="flex flex-wrap gap-1.5">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                theme === t.value
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        {PROMPTS[theme] && (
          <p className="mt-2 text-xs text-accent bg-accent/5 border border-accent/20 rounded-lg px-3 py-2">
            {PROMPTS[theme]}
          </p>
        )}
      </div>

      {/* Story input + live counters */}
      <div>
        <div className="flex items-end justify-between mb-1.5">
          <label className="text-xs font-medium text-text-secondary">Your story</label>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono font-bold transition-colors ${wordCountBg}`}>
            <span className={wordCountColor}>{wordCount}</span>
            <span className="text-text-muted">/6 words</span>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your six-word story here..."
          rows={3}
          className="w-full px-3 py-2.5 border border-border rounded-lg bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none font-heading text-lg leading-relaxed"
        />
        <div className="flex items-center justify-between mt-1">
          <span className="text-[11px] text-text-muted font-mono">{charCount} characters</span>
          {wordCount === 6 && (
            <span className="text-[11px] text-success font-medium">Perfect - exactly 6 words</span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          className="flex-1 min-w-[120px] py-2.5 rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
        >
          Save My Story
        </button>
        <button
          onClick={handleCopy}
          disabled={!text.trim()}
          className="px-4 py-2.5 rounded-lg border border-border bg-white hover:border-accent/30 hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed text-text-secondary font-medium text-sm transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <button
          onClick={handleShare}
          disabled={!text.trim()}
          className="px-4 py-2.5 rounded-lg border border-border bg-white hover:border-accent/30 hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed text-text-secondary font-medium text-sm transition-colors"
        >
          {shared ? '✓ Link copied' : 'Share'}
        </button>
      </div>

      {saveMsg && (
        <p className={`text-xs font-medium ${saveMsg.includes('must') ? 'text-error' : 'text-success'}`}>
          {saveMsg}
        </p>
      )}

      {/* Saved stories */}
      {savedStories.length > 0 && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Your saved stories</p>
            <p className="text-white text-sm font-medium">{savedStories.length} of {MAX_SAVED} saved</p>
          </div>
          <div className="divide-y divide-border">
            {savedStories.map((story) => (
              <div key={story.id} className="flex items-start gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-base text-text-primary leading-snug">"{story.text}"</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-text-muted">{story.date}</span>
                    {story.theme !== 'none' && (
                      <>
                        <span className="text-text-muted text-[11px]">·</span>
                        <span className="text-[11px] text-text-muted capitalize">{story.theme}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="text-text-muted hover:text-error transition-colors p-1 shrink-0"
                  aria-label="Delete story"
                >
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Famous examples gallery */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Famous examples</p>
          <p className="text-white text-sm font-medium">Classic six-word stories for inspiration</p>
        </div>
        <div className="divide-y divide-border">
          {FAMOUS_STORIES.map((story, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="font-heading text-base text-text-primary leading-snug">"{story.text}"</p>
                <p className="text-[11px] text-text-muted mt-0.5">{story.attr}</p>
              </div>
              <button
                onClick={() => handleCopyFamous(story.text)}
                className="text-text-muted hover:text-accent transition-colors p-1 shrink-0 text-[11px] font-medium"
                aria-label="Copy story"
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
