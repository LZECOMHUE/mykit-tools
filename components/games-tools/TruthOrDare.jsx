"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Toggle from "@/components/ui/Toggle";

const TRUTHS = {
  mild: [
    "What's your biggest pet peeve?",
    "What's your guilty pleasure TV show?",
    "What's the most embarrassing thing that's happened to you?",
    "Have you ever told a lie to avoid getting in trouble?",
    "What's the weirdest dream you've had?",
    "What's a skill you wish you had?",
    "Who's your celebrity crush?",
    "What's your go-to comfort food?",
    "Have you ever stalked someone on social media?",
    "What's the most childish thing you still do?",
  ],
  medium: [
    "What's something you've never told your best friend?",
    "Have you ever cheated on a test?",
    "What's the most expensive thing you've secretly bought?",
    "Have you ever pretended to be sick to avoid something?",
    "What's your biggest insecurity?",
    "Have you ever been jealous of a friend?",
    "What's something you're really bad at?",
    "Would you date an ex again?",
    "Have you ever bad-mouthed someone behind their back?",
    "What's your weirdest habit?",
  ],
  spicy: [
    "Have you ever ghosted someone?",
    "What's the most controversial opinion you hold?",
    "Have you ever snooped on someone's private messages?",
    "What's something you'd never admit to your parents?",
    "Have you ever lied to a partner?",
    "What's the worst thing you've done for money?",
    "Have you ever been attracted to someone you shouldn't be?",
    "What's a secret you've kept from everyone?",
    "Have you ever betrayed a friend's trust?",
    "What's something you're ashamed of?",
  ],
};

const DARES = {
  mild: [
    "Do your best impression of someone here",
    "Sing the chorus of your favorite song",
    "Smell each person's shoe",
    "Do 10 jumping jacks",
    "Make a funny face for 10 seconds",
    "Speak in an accent for the next 3 turns",
    "Do a silly dance",
    "Lick your elbow (if you can!)",
    "Wiggle your ears",
    "Tell a terrible joke",
  ],
  medium: [
    "Text your crush (or mom) a silly message",
    "Call a friend and sing Happy Birthday",
    "Wear something on your head for the next 5 rounds",
    "Do the splits",
    "Act out a scene with no words for others to guess",
    "Do a handstand for 10 seconds",
    "Switch clothes with someone for 1 round",
    "Let someone put makeup on you",
    "Do a runway walk",
    "Eat something unusual",
  ],
  spicy: [
    "Confess something you've never told anyone here",
    "Message someone saying 'I love you' platonically",
    "Pretend to be someone else for the next turn",
    "Do something you're afraid of",
    "Ask someone out (as a dare)",
    "Take a selfie with someone and post it",
    "Go outside and yell something silly",
    "Let someone choose your next outfit item",
    "Read a text out loud that you're embarrassed about",
    "Do something you've always wanted to but were scared to",
  ],
};

export default function TruthOrDare() {
  const [category, setCategory] = useState("mild");
  const [isKidsMode, setIsKidsMode] = useState(false);
  const [choice, setChoice] = useState(null);
  const [prompt, setPrompt] = useState("");

  const getPrompt = (type) => {
    const mode = isKidsMode ? "mild" : category;
    const list = type === "truth" ? TRUTHS[mode] : DARES[mode];
    const selected = list[Math.floor(Math.random() * list.length)];
    setPrompt(selected);
    setChoice(type);
  };

  const categoryOptions = isKidsMode
    ? [{ value: "mild", label: "Mild (Kids Appropriate)" }]
    : [
        { value: "mild", label: "Mild" },
        { value: "medium", label: "Medium" },
        { value: "spicy", label: "Spicy (Adults)" },
      ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="space-y-4">
          <Toggle
            label="Kids Mode"
            checked={isKidsMode}
            onChange={(val) => setIsKidsMode(val)}
            helper="Only mild, age-appropriate prompts"
          />

          {!isKidsMode && (
            <Select
              label="Intensity Level"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryOptions}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={() => getPrompt("truth")}
              className="w-full"
              size="lg"
            >
              Truth
            </Button>
            <Button
              variant="secondary"
              onClick={() => getPrompt("dare")}
              className="w-full"
              size="lg"
            >
              Dare
            </Button>
          </div>
        </div>
      </Card>

      {prompt && (
        <Card hover className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-48 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-sm text-text-secondary font-semibold uppercase tracking-wide">
              {choice === "truth" ? "Truth" : "Dare"}
            </p>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-text-primary leading-snug">
              {prompt}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => getPrompt(choice)}
            >
              Skip This One →
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
