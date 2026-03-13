"use client";

import { useState, useRef, useCallback } from "react";
import { pubQuizQuestions, categories } from "@/data/games/pub-quiz-questions";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";

export default function PubQuizGenerator() {
  const [config, setConfig] = useState({
    rounds: 4,
    questionsPerRound: 5,
    selectedCategories: ["general", "science", "history"],
    difficulty: "mixed",
    numTeams: 6,
  });

  const [quiz, setQuiz] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const quizRef = useRef(null);
  const answerSheetRef = useRef(null);

  const generateQuiz = () => {
    const newQuiz = [];
    const usedQuestions = new Set();

    for (let round = 1; round <= config.rounds; round++) {
      const roundQuestions = [];
      const availableCategories = [...config.selectedCategories];

      for (let i = 0; i < config.questionsPerRound; i++) {
        const randomCategoryIndex = Math.floor(
          Math.random() * availableCategories.length
        );
        const category = availableCategories[randomCategoryIndex];
        const categoryData = pubQuizQuestions[category];

        let difficulty = config.difficulty;
        if (config.difficulty === "mixed") {
          const difficulties = ["easy", "medium", "hard"];
          difficulty = difficulties[Math.floor(Math.random() * 3)];
        }

        const questionsInDifficulty = categoryData[difficulty];
        let attempts = 0;
        let question;
        do {
          question =
            questionsInDifficulty[
              Math.floor(Math.random() * questionsInDifficulty.length)
            ];
          attempts++;
        } while (usedQuestions.has(question.question) && attempts < 20);

        usedQuestions.add(question.question);

        roundQuestions.push({
          number: i + 1,
          question: question.question,
          answer: question.answer,
          category: category,
          difficulty: difficulty,
        });
      }

      newQuiz.push({
        roundNumber: round,
        questions: roundQuestions,
      });
    }

    setQuiz(newQuiz);
    setShowAnswers(false);
  };

  const handleCategoryToggle = (category) => {
    setConfig((prev) => {
      const selected = prev.selectedCategories;
      if (selected.includes(category)) {
        return {
          ...prev,
          selectedCategories: selected.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...selected, category],
        };
      }
    });
  };

  const buildQuizHTML = useCallback((includeAnswers, watermark) => {
    if (!quiz) return "";

    const totalQ = quiz.reduce((sum, r) => sum + r.questions.length, 0);

    let html = `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 32px; background: white; color: #1a1a1a;">
        <div style="text-align: center; margin-bottom: 32px; border-bottom: 3px solid #2563eb; padding-bottom: 16px;">
          <h1 style="font-family: 'Fraunces', Georgia, serif; font-size: 28px; margin: 0 0 4px 0; color: #1a1a1a;">Pub Quiz Night</h1>
          <p style="font-size: 14px; color: #525252; margin: 0;">${config.rounds} Rounds | ${totalQ} Questions | ${config.difficulty === "mixed" ? "Mixed Difficulty" : config.difficulty.charAt(0).toUpperCase() + config.difficulty.slice(1)}</p>
        </div>
    `;

    quiz.forEach((round) => {
      html += `
        <div style="margin-bottom: 24px;">
          <h2 style="font-family: 'Fraunces', Georgia, serif; font-size: 20px; color: #2563eb; margin: 0 0 12px 0; padding: 8px 12px; background: #eff6ff; border-radius: 6px;">
            Round ${round.roundNumber}
          </h2>
          <div style="padding: 0 8px;">
      `;

      round.questions.forEach((q) => {
        html += `
          <div style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #e5e5e5;">
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 14px; margin: 0; color: #1a1a1a;">
              ${q.number}. ${q.question}
            </p>
            ${includeAnswers ? `<p style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #2563eb; margin: 4px 0 0 0; font-weight: 600;">Answer: ${q.answer}</p>` : ""}
          </div>
        `;
      });

      html += `</div></div>`;
    });

    if (watermark) {
      html += `<div style="text-align: center; padding: 16px; color: #a3a3a3; font-size: 11px; opacity: 0.6;">mykit.tools</div>`;
    }

    html += `</div>`;
    return html;
  }, [quiz, config]);

  const buildAnswerSheetHTML = useCallback((teamNumber, watermark) => {
    if (!quiz) return "";

    let html = `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 32px; background: white; color: #1a1a1a;">
        <div style="text-align: center; margin-bottom: 16px; border-bottom: 3px solid #2563eb; padding-bottom: 12px;">
          <h1 style="font-family: 'Fraunces', Georgia, serif; font-size: 24px; margin: 0 0 8px 0;">Pub Quiz - Answer Sheet</h1>
          <div style="display: flex; justify-content: center; gap: 24px; align-items: center; margin-top: 8px;">
            <div style="font-size: 14px; color: #525252;">
              <span style="font-weight: 600;">Team #${teamNumber}</span>
            </div>
            <div style="font-size: 14px; color: #525252;">
              Team Name: <span style="display: inline-block; border-bottom: 2px solid #1a1a1a; min-width: 200px;">&nbsp;</span>
            </div>
          </div>
        </div>
    `;

    quiz.forEach((round) => {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="font-family: 'Fraunces', Georgia, serif; font-size: 16px; color: #2563eb; margin: 0 0 8px 0; padding: 6px 10px; background: #eff6ff; border-radius: 4px;">
            Round ${round.roundNumber}
          </h3>
      `;

      round.questions.forEach((q) => {
        html += `
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; padding: 4px 8px;">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600; min-width: 24px;">${q.number}.</span>
            <span style="flex: 1; border-bottom: 1px dotted #d4d4d4; min-height: 20px;">&nbsp;</span>
          </div>
        `;
      });

      html += `</div>`;
    });

    // Score box
    html += `
      <div style="margin-top: 16px; padding: 12px; border: 2px solid #2563eb; border-radius: 8px; text-align: center;">
        <p style="font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 700; margin: 0; color: #2563eb;">
          Total Score: ______ / ${quiz.reduce((sum, r) => sum + r.questions.length, 0)}
        </p>
      </div>
    `;

    if (watermark) {
      html += `<div style="text-align: center; padding: 12px; color: #a3a3a3; font-size: 11px; opacity: 0.6;">mykit.tools</div>`;
    }

    html += `</div>`;
    return html;
  }, [quiz]);

  const downloadFreeJPG = useCallback(async () => {
    if (!quiz) return;
    setDownloading(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "800px";
      container.style.background = "white";
      container.innerHTML = buildQuizHTML(false, true);
      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      document.body.removeChild(container);

      const link = document.createElement("a");
      link.download = "pub-quiz-questions.jpg";
      link.href = canvas.toDataURL("image/jpeg", 0.85);
      link.click();
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(false);
    }
  }, [quiz, buildQuizHTML]);

  const downloadPremiumPDF = useCallback(async () => {
    if (!quiz) return;
    setDownloading(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;

      // Helper to render HTML to a PDF page
      const renderHTMLToPDF = async (htmlContent, addPageFirst) => {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "0";
        container.style.width = "800px";
        container.style.background = "white";
        container.innerHTML = htmlContent;
        document.body.appendChild(container);

        const canvas = await html2canvas(container, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        document.body.removeChild(container);

        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        if (addPageFirst) pdf.addPage();

        // If content is taller than one page, scale to fit
        if (imgHeight > pageHeight - 20) {
          const scaleFactor = (pageHeight - 20) / imgHeight;
          const scaledWidth = imgWidth * scaleFactor;
          const scaledHeight = imgHeight * scaleFactor;
          const xOffset = (pageWidth - scaledWidth) / 2;
          pdf.addImage(imgData, "JPEG", xOffset, 10, scaledWidth, scaledHeight);
        } else {
          pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
        }
      };

      // Page 1: Quiz questions (no answers, no watermark)
      await renderHTMLToPDF(buildQuizHTML(false, false), false);

      // Page 2: Quiz with answers (host copy, no watermark)
      await renderHTMLToPDF(buildQuizHTML(true, false), true);

      // Answer sheets for each team
      const numTeams = Math.max(1, Math.min(20, config.numTeams || 6));
      for (let t = 1; t <= numTeams; t++) {
        await renderHTMLToPDF(buildAnswerSheetHTML(t, false), true);
      }

      pdf.save("pub-quiz-pack.pdf");
    } catch (err) {
      console.error("PDF error:", err);
    } finally {
      setDownloading(false);
    }
  }, [quiz, config.numTeams, buildQuizHTML, buildAnswerSheetHTML]);

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Quiz Configuration
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Number of Rounds: {config.rounds}
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={config.rounds}
              onChange={(e) =>
                setConfig({ ...config, rounds: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Questions per Round: {config.questionsPerRound}
            </label>
            <input
              type="range"
              min="5"
              max="10"
              value={config.questionsPerRound}
              onChange={(e) =>
                setConfig({
                  ...config,
                  questionsPerRound: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Difficulty"
              value={config.difficulty}
              onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
              options={[
                { value: "easy", label: "Easy" },
                { value: "medium", label: "Medium" },
                { value: "hard", label: "Hard" },
                { value: "mixed", label: "Mixed" },
              ]}
            />

            <div>
              <label className="text-text-secondary text-sm font-medium block mb-2">
                Number of Teams: {config.numTeams}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={config.numTeams}
                onChange={(e) =>
                  setConfig({ ...config, numTeams: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-text-secondary text-sm font-medium block mb-3">
            Select Categories
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.selectedCategories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  className="w-4 h-4"
                />
                <span className="text-text-secondary capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <Button onClick={generateQuiz} className="w-full">
          Generate Quiz
        </Button>
      </Card>

      {quiz && (
        <div className="space-y-4">
          <div className="flex gap-2 justify-between items-center flex-wrap">
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              Your Quiz
            </h2>
            <Button
              onClick={() => setShowAnswers(!showAnswers)}
              variant="secondary"
            >
              {showAnswers ? "Hide Answers" : "Show Answers"}
            </Button>
          </div>

          <div ref={quizRef}>
            {quiz.map((round) => (
              <Card key={round.roundNumber} className="mb-4">
                <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
                  Round {round.roundNumber}
                </h3>

                <div className="space-y-3">
                  {round.questions.map((q) => (
                    <div key={q.number} className="pb-3 border-b border-border last:border-0">
                      <p className="font-mono font-medium text-text-primary">
                        {q.number}. {q.question}
                      </p>
                      {showAnswers && (
                        <p className="text-accent font-mono mt-1 font-medium">
                          Answer: {q.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border text-text-muted text-sm">
                  <p>Host Notes: Allow 30-60 seconds per question. Award 1 point per correct answer.</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Download Section */}
          <Card className="border-2 border-accent/30">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
              Download Your Quiz
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Free Download */}
              <div className="border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold bg-gray-100 text-text-secondary px-2 py-0.5 rounded">Free</span>
                </div>
                <ul className="text-sm text-text-secondary space-y-1.5">
                  <li>Questions only (JPG)</li>
                  <li>Watermarked</li>
                  <li>Single page</li>
                </ul>
                <Button
                  onClick={downloadFreeJPG}
                  variant="secondary"
                  className="w-full"
                  disabled={downloading}
                >
                  {downloading ? "Generating..." : "Download Free JPG"}
                </Button>
              </div>

              {/* Premium Download */}
              <div className="border-2 border-amber-300 bg-amber-50/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Premium</span>
                </div>
                <ul className="text-sm text-text-secondary space-y-1.5">
                  <li>Quiz questions sheet (PDF)</li>
                  <li>Host answer key</li>
                  <li>{config.numTeams} answer sheets with team numbers</li>
                  <li>Team name space on each sheet</li>
                  <li>Score totals box</li>
                  <li>No watermark</li>
                </ul>
                <Button
                  onClick={downloadPremiumPDF}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  disabled={downloading}
                >
                  {downloading ? "Generating..." : "Download Quiz Pack (PDF)"}
                </Button>
                <p className="text-xs text-text-muted text-center">
                  Premium feature - coming soon with MyKit Pro
                </p>
              </div>
            </div>
          </Card>

          {/* Answer Sheet Preview */}
          <Card>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
              Answer Sheet Preview (Team #1)
            </h3>
            <div ref={answerSheetRef} className="border border-border rounded-lg p-4 bg-white">
              <div className="text-center mb-4 border-b-2 border-accent pb-3">
                <h4 className="font-heading text-xl font-bold">Pub Quiz - Answer Sheet</h4>
                <div className="flex justify-center gap-6 items-center mt-2">
                  <span className="text-sm font-semibold text-text-secondary">Team #1</span>
                  <span className="text-sm text-text-secondary">
                    Team Name: <span className="inline-block border-b-2 border-text-primary min-w-[160px]">&nbsp;</span>
                  </span>
                </div>
              </div>

              {quiz.map((round) => (
                <div key={round.roundNumber} className="mb-4">
                  <h5 className="font-heading text-sm font-bold text-accent mb-2 bg-blue-50 px-2 py-1 rounded">
                    Round {round.roundNumber}
                  </h5>
                  {round.questions.map((q) => (
                    <div key={q.number} className="flex items-center gap-2 mb-1.5 px-2">
                      <span className="font-mono text-sm font-semibold min-w-[24px]">{q.number}.</span>
                      <span className="flex-1 border-b border-dotted border-gray-300 min-h-[18px]">&nbsp;</span>
                    </div>
                  ))}
                </div>
              ))}

              <div className="mt-4 p-3 border-2 border-accent rounded-lg text-center">
                <p className="font-heading font-bold text-accent">
                  Total Score: ______ / {quiz.reduce((sum, r) => sum + r.questions.length, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-accent/10 border-accent">
            <h3 className="font-heading font-bold text-accent mb-2">Quiz Summary</h3>
            <p className="text-text-secondary text-sm">
              Total Questions: {quiz.reduce((sum, r) => sum + r.questions.length, 0)} | Total Rounds: {quiz.length} | Teams: {config.numTeams}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
