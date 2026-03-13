"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function SecretSantaGenerator() {
  const [participants, setParticipants] = useState(["Alice", "Bob"]);
  const [exclusions, setExclusions] = useState("");
  const [budget, setBudget] = useState(25);
  const [assignments, setAssignments] = useState(null);
  const [revealedFor, setRevealedFor] = useState(new Set());

  const addParticipant = () => {
    setParticipants([...participants, ""]);
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (index, value) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const generateAssignments = () => {
    const validParticipants = participants.filter((p) => p.trim());

    if (validParticipants.length < 3) {
      alert("You need at least 3 participants for Secret Santa");
      return;
    }

    const exclusionMap = {};
    const exclusionLines = exclusions
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    exclusionLines.forEach((line) => {
      const [person1, person2] = line.split(/[,-]/).map((p) => p.trim());
      if (!exclusionMap[person1]) exclusionMap[person1] = new Set();
      if (!exclusionMap[person2]) exclusionMap[person2] = new Set();
      exclusionMap[person1].add(person2);
      exclusionMap[person2].add(person1);
    });

    let assignments = null;
    let attempts = 0;
    const maxAttempts = 100;

    while (!assignments && attempts < maxAttempts) {
      const shuffled = [...validParticipants].sort(() => Math.random() - 0.5);
      assignments = [];
      let valid = true;

      for (let i = 0; i < shuffled.length; i++) {
        const giver = shuffled[i];
        const receiver = shuffled[(i + 1) % shuffled.length];

        if (giver === receiver) {
          valid = false;
          break;
        }

        if (
          exclusionMap[giver] &&
          exclusionMap[giver].has(receiver)
        ) {
          valid = false;
          break;
        }

        assignments.push({
          giver,
          receiver,
          revealed: false,
        });
      }

      if (!valid) {
        assignments = null;
      }

      attempts++;
    }

    if (!assignments) {
      alert(
        "Could not generate valid assignments with those exclusions. Try adjusting them."
      );
      return;
    }

    setAssignments(assignments);
    setRevealedFor(new Set());
  };

  const toggleReveal = (index) => {
    const newRevealed = new Set(revealedFor);
    if (newRevealed.has(index)) {
      newRevealed.delete(index);
    } else {
      newRevealed.add(index);
    }
    setRevealedFor(newRevealed);
  };

  const isValidConfiguration =
    participants.filter((p) => p.trim()).length >= 3;

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Secret Santa Setup
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-text-secondary text-sm font-medium block mb-3">
              Participants
            </label>
            <div className="space-y-2">
              {participants.map((participant, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Participant name"
                    value={participant}
                    onChange={(e) => updateParticipant(index, e.target.value)}
                  />
                  <Button
                    onClick={() => removeParticipant(index)}
                    variant="secondary"
                    className="px-4"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button
              onClick={addParticipant}
              variant="secondary"
              className="w-full mt-3"
            >
              Add Participant
            </Button>
          </div>

          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Budget per Person (Optional): £{budget}
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Exclusions (Optional)
            </label>
            <p className="text-text-muted text-xs mb-2">
              One per line. Format: "Name1, Name2" or "Name1 - Name2"
            </p>
            <textarea
              value={exclusions}
              onChange={(e) => setExclusions(e.target.value)}
              placeholder="Alice, Bob&#10;Charlie, David"
              className="w-full h-20 p-3 border border-border rounded-lg text-text-primary"
            />
          </div>
        </div>

        <Button
          onClick={generateAssignments}
          disabled={!isValidConfiguration}
          className="w-full"
        >
          Generate Secret Santa Assignments
        </Button>
      </Card>

      {assignments && (
        <div className="space-y-4">
          <Card>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">
              Secret Santa Assignments
            </h2>
            <p className="text-text-secondary text-sm mb-6">
              Budget: £{budget} | Participants: {assignments.length}
            </p>

            <div className="space-y-3">
              {assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="bg-surface border border-border rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-heading text-lg font-bold text-text-primary">
                      {assignment.giver}
                    </p>
                    <Button
                      onClick={() => toggleReveal(index)}
                      variant={revealedFor.has(index) ? "primary" : "secondary"}
                      className="px-4"
                    >
                      {revealedFor.has(index) ? "Hide" : "Reveal"}
                    </Button>
                  </div>

                  {revealedFor.has(index) && (
                    <div className="mt-3 pt-3 border-t border-border-hover">
                      <p className="text-text-muted text-xs mb-1">
                        Shopping for:
                      </p>
                      <p className="font-mono text-lg font-bold text-accent">
                        {assignment.receiver}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-text-secondary text-sm font-medium mb-2">
                Hints
              </p>
              <ul className="text-text-muted text-sm space-y-1 list-disc list-inside">
                <li>Budget: £{budget} per person</li>
                <li>Keep it secret until the big reveal</li>
                <li>Consider personalising your gift</li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
