"use client";
import { useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function TextToMorseCode() {
  const [input, setInput] = useState("HELLO");

  const morseAlphabet = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.-",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
  };

  const textToMorse = (text) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char === " ") {
          return "/";
        }
        return morseAlphabet[char] || "?";
      })
      .join(" ");
  };

  const morse = textToMorse(input);

  const handleCopy = () => {
    navigator.clipboard.writeText(morse);
  };

  const morseReferenceChars = [
    { char: "A", morse: ".-" },
    { char: "B", morse: "-..." },
    { char: "C", morse: "-.-." },
    { char: "D", morse: "-.." },
    { char: "E", morse: "." },
    { char: "F", morse: "..-." },
    { char: "G", morse: "--." },
    { char: "H", morse: "...." },
    { char: "I", morse: ".." },
    { char: "J", morse: ".---" },
    { char: "K", morse: "-.-" },
    { char: "L", morse: ".-.." },
    { char: "M", morse: "--" },
    { char: "N", morse: "-." },
    { char: "O", morse: "---" },
    { char: "P", morse: ".--." },
    { char: "Q", morse: "--.-" },
    { char: "R", morse: ".-." },
    { char: "S", morse: "..." },
    { char: "T", morse: "-" },
    { char: "U", morse: "..-" },
    { char: "V", morse: "...-" },
    { char: "W", morse: ".--" },
    { char: "X", morse: "-..-" },
    { char: "Y", morse: "-.--" },
    { char: "Z", morse: "--.." },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Input Text
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert to Morse code"
              rows={6}
            />
          </div>

          <div>
            <p className="text-sm text-text-secondary mb-2">Morse Code Output</p>
            <div className="bg-surface p-4 rounded-lg border border-border break-all max-h-40 overflow-y-auto">
              <p className="font-mono text-text-primary text-sm">
                {morse}
              </p>
            </div>
          </div>

          <Button onClick={handleCopy} className="w-full">
            Copy Morse Code
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          Morse Code Alphabet Reference
        </h3>
        <p className="text-xs text-text-muted mb-4">
          Dot (.) = short signal, Dash (-) = long signal
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {morseReferenceChars.map((item, idx) => (
            <div key={idx} className="bg-surface p-3 rounded border border-border">
              <p className="font-mono font-bold text-text-primary text-center mb-1">
                {item.char}
              </p>
              <p className="font-mono text-text-secondary text-center text-sm">
                {item.morse}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          How Morse Code Works
        </h3>
        <div className="space-y-3 text-sm text-text-secondary">
          <div>
            <p className="font-medium text-text-primary mb-1">Dot (.) = Short</p>
            <p>
              One unit of time. Used to represent short signals or pulses.
            </p>
          </div>
          <div>
            <p className="font-medium text-text-primary mb-1">
              Dash (-) = Long
            </p>
            <p>
              Three units of time. Used to represent longer signals or pulses.
            </p>
          </div>
          <div>
            <p className="font-medium text-text-primary mb-1">
              Space = Gap Between
            </p>
            <p>
              A forward slash (/) represents a gap between words. Each character
              is separated by a space.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
