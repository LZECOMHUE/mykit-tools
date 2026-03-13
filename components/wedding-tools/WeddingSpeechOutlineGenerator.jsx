"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

export default function WeddingSpeechOutlineGenerator() {
  const [config, setConfig] = useState({
    role: "best-man",
    tone: "mix",
    coupleNames: "Jane & John",
    yearsMet: 5,
    story1: "",
    story2: "",
    story3: "",
  });

  const [outline, setOutline] = useState(null);

  const generateOutline = () => {
    const lines = {
      opening: getOpeningLine(),
      introduction: getIntroduction(),
      stories: getStoriesSections(),
      tribute: getTributeLine(),
      toast: getToastLine(),
    };

    setOutline(lines);
  };

  const getOpeningLine = () => {
    const openings = {
      "best-man": [
        "Good evening everyone, for those who don't know me, I'm [Your Name], and I've had the pleasure of being best man to this incredible guy.",
        "Hello everyone, I'm [Your Name], and I've been lucky enough to call myself [Groom]'s best friend for the last [X] years.",
      ],
      "maid-of-honour": [
        "Good evening everyone, I'm [Your Name], and I've had the absolute honour of being [Bride]'s maid of honour today.",
        "Hello everyone, for those who don't know me, I'm [Your Name], and I've had the joy of watching [Bride] grow into this amazing woman.",
      ],
      "father-of-bride": [
        "Good evening, I'm [Name], and as the father of the bride, I couldn't be happier to stand here today.",
        "Hello everyone, as the father of this beautiful bride, I'm honoured to say a few words.",
      ],
      "mother-of-bride": [
        "Good evening everyone, I'm [Name], mother of this stunning bride, and I'm so proud to be here.",
        "Hello, I'm [Name], and as [Bride]'s mum, I'm thrilled to share some thoughts about my daughter.",
      ],
      groom: [
        "Good evening everyone, I'm [Name], and I still can't believe I get to call myself [Bride]'s husband.",
        "Hello everyone, I'm the groom, and I'm the luckiest man in the world standing next to [Bride] today.",
      ],
      bride: [
        "Good evening everyone, I'm [Name], and I get to stand here as the luckiest bride alive.",
        "Hello everyone, I'm the bride, and I've never been happier than I am right now.",
      ],
    };
    return openings[config.role][0];
  };

  const getIntroduction = () => {
    const intros = {
      "best-man": `I've known [Groom] for ${config.yearsMet} years, and I can honestly say he's one of the best people I know. When he first told me about [Bride], I'd never seen him so excited. The moment I met her, I understood why. They're perfect together.`,
      "maid-of-honour": `I've known [Bride] for ${config.yearsMet} years, and watching her fall in love with [Groom] has been incredible. I've seen how happy he makes her, and I've never been more certain that two people were meant to be together.`,
      "father-of-bride": `As [Bride]'s father, I've watched her grow into this amazing woman. Seeing her with [Groom] today fills my heart with joy. He's the man I would have chosen for my daughter.`,
      "mother-of-bride": `As [Bride]'s mum, I've had the privilege of watching her journey to this day. When she met [Groom], I saw something change in her. She found her person, and I couldn't be happier for them both.`,
      groom: `When I first met [Bride], I knew my life was about to change. She's the most incredible, strong, kind, and beautiful woman I've ever known. Today, marrying her is the best decision I've ever made.`,
      bride: `When I first saw [Groom], something just clicked. He's kind, caring, supportive, and he makes me laugh every single day. Today, I'm marrying my best friend.`,
    };
    return intros[config.role];
  };

  const getStoriesSections = () => {
    return [
      {
        title: "First Story",
        content: config.story1 || "Share a funny or touching memory about [Person].",
      },
      {
        title: "Second Story",
        content: config.story2 || "Share a moment that shows their character or humor.",
      },
      {
        title: "Third Story",
        content: config.story3 || "Share a story about how they changed or grew.",
      },
    ];
  };

  const getTributeLine = () => {
    const tributes = {
      "best-man": `[Groom], you're a true friend, and I'm honoured to celebrate you today. [Bride], welcome to the family. I couldn't have asked for a better sister-in-law.`,
      "maid-of-honour": `[Bride], you deserve all the happiness in the world. [Groom], look after this incredible woman. I'm watching you.`,
      "father-of-bride": `[Bride], my beautiful daughter, I'm so proud of the woman you've become. [Groom], thank you for loving her as much as I do. Welcome to our family.`,
      "mother-of-bride": `[Bride], you've always been my pride and joy. [Groom], I'm so glad [Bride] found you. Thank you for being the man she deserves.`,
      groom: `[Bride], I promise to love, cherish, and support you every single day of our lives. You've made me the happiest man alive.`,
      bride: `[Groom], thank you for being my partner, my best friend, and now my husband. I can't wait to spend forever with you.`,
    };
    return tributes[config.role];
  };

  const getToastLine = () => {
    return `So, ladies and gentlemen, please join me in raising a glass to [Bride] and [Groom]. To love, to laughter, and to happily ever after. Cheers!`;
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Speech Outline Configuration
        </h2>

        <div className="space-y-4 mb-6">
          <Select
            label="Your Role"
            value={config.role}
            onChange={(e) => setConfig({ ...config, role: e.target.value })}
            options={[
              { value: "best-man", label: "Best Man" },
              { value: "maid-of-honour", label: "Maid of Honour" },
              { value: "father-of-bride", label: "Father of Bride" },
              { value: "mother-of-bride", label: "Mother of Bride" },
              { value: "groom", label: "Groom" },
              { value: "bride", label: "Bride" },
            ]}
          />

          <Input
            label="Couple Names (e.g., 'Jane & John')"
            type="text"
            value={config.coupleNames}
            onChange={(e) => setConfig({ ...config, coupleNames: e.target.value })}
          />

          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Years You've Known Them: {config.yearsMet}
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={config.yearsMet}
              onChange={(e) =>
                setConfig({ ...config, yearsMet: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <Select
            label="Speech Tone"
            value={config.tone}
            onChange={(e) => setConfig({ ...config, tone: e.target.value })}
            options={[
              { value: "traditional", label: "Traditional & Heartfelt" },
              { value: "funny", label: "Funny & Light-hearted" },
              { value: "emotional", label: "Emotional & Sincere" },
              { value: "mix", label: "Mix of Humour & Heart" },
            ]}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Story/Memory 1 (Optional)
            </label>
            <textarea
              placeholder="Share a funny or touching memory..."
              value={config.story1}
              onChange={(e) => setConfig({ ...config, story1: e.target.value })}
              className="w-full h-16 p-3 border border-border rounded-lg text-text-primary"
            />
          </div>

          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Story/Memory 2 (Optional)
            </label>
            <textarea
              placeholder="Share another memory..."
              value={config.story2}
              onChange={(e) => setConfig({ ...config, story2: e.target.value })}
              className="w-full h-16 p-3 border border-border rounded-lg text-text-primary"
            />
          </div>

          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Story/Memory 3 (Optional)
            </label>
            <textarea
              placeholder="Share a final memory..."
              value={config.story3}
              onChange={(e) => setConfig({ ...config, story3: e.target.value })}
              className="w-full h-16 p-3 border border-border rounded-lg text-text-primary"
            />
          </div>
        </div>

        <Button onClick={generateOutline} className="w-full mt-6">
          Generate Speech Outline
        </Button>
      </Card>

      {outline && (
        <div className="space-y-4">
          <Card>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
              Your Speech Outline
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-text-primary mb-3">
                  1. Opening
                </h3>
                <p className="text-text-secondary text-sm">
                  {outline.opening}
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-heading font-bold text-text-primary mb-3">
                  2. Introduction
                </h3>
                <p className="text-text-secondary text-sm">
                  {outline.introduction}
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-heading font-bold text-text-primary mb-3">
                  3. Stories & Memories
                </h3>
                <div className="space-y-4">
                  {outline.stories.map((section, idx) => (
                    <div key={idx} className="bg-surface p-4 rounded-lg">
                      <p className="font-heading font-bold text-text-primary mb-2">
                        {section.title}
                      </p>
                      <p className="text-text-secondary text-sm">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-heading font-bold text-text-primary mb-3">
                  4. Tribute
                </h3>
                <p className="text-text-secondary text-sm">
                  {outline.tribute}
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-heading font-bold text-text-primary mb-3">
                  5. The Toast
                </h3>
                <p className="text-text-secondary text-sm font-medium">
                  {outline.toast}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-text-secondary text-sm font-medium mb-2">
                Speech Tips
              </p>
              <ul className="text-text-muted text-sm space-y-1 list-disc list-inside">
                <li>Practice your speech multiple times</li>
                <li>Keep it to 3-5 minutes maximum</li>
                <li>Make eye contact with the couple</li>
                <li>Smile and let your genuine emotion show</li>
                <li>Raise your glass high for the toast</li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
