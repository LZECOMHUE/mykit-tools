"use client";

import { useRouter } from "next/navigation";
import { tools } from "@/lib/tool-registry";

const FUN_CATEGORIES = [
  "games",
  "fun",
  "quizzes",
  "creative",
];

const funTools = tools.filter((t) => FUN_CATEGORIES.includes(t.category));

export default function SurpriseButton() {
  const router = useRouter();

  function handleClick() {
    const pick = funTools[Math.floor(Math.random() * funTools.length)];
    if (pick) {
      router.push(`/${pick.slug}`);
    }
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-primary bg-white border border-border hover:bg-surface-hover rounded-[var(--radius-input)] transition-colors cursor-pointer"
    >
      <span className="text-base">🎲</span>
      Surprise Me
    </button>
  );
}
