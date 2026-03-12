// Client-side fuzzy search over tool registry
// Lightweight implementation — can swap for Fuse.js later if needed

import { tools } from "./tool-registry";

function normalise(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, "");
}

function scoreMatch(query, tool) {
  const q = normalise(query);
  const fields = [
    { text: normalise(tool.name), weight: 4 },
    { text: normalise(tool.description), weight: 2 },
    { text: normalise(tool.tags.join(" ")), weight: 2 },
    { text: normalise(tool.keywords || ""), weight: 3 },
    { text: normalise(tool.category), weight: 1 },
  ];

  let score = 0;
  for (const { text, weight } of fields) {
    if (text.includes(q)) score += weight * 2;
    // Check individual words
    const words = q.split(/\s+/);
    for (const word of words) {
      if (word.length > 1 && text.includes(word)) score += weight;
    }
  }
  return score;
}

export function searchTools(query, limit = 8) {
  if (!query || query.trim().length < 2) return [];

  return tools
    .map((tool) => ({ ...tool, _score: scoreMatch(query, tool) }))
    .filter((t) => t._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
}
