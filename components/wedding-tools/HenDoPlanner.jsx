"use client";

import { useState } from "react";
import { henDoActivities, packingList } from "@/data/wedding/hen-do-activities";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";

export default function HenDoPlanner() {
  const [config, setConfig] = useState({
    numberOfAttendees: 8,
    budgetTier: "mid-range",
    location: "city-break",
    duration: "day",
  });

  const [plan, setPlan] = useState(null);
  const [expandedActivities, setExpandedActivities] = useState(new Set());

  const generatePlan = () => {
    const activities =
      henDoActivities[config.budgetTier][config.location] || [];
    const selectedActivities = [];
    const usedIndices = new Set();

    let numActivities = config.duration === "day" ? 3 : config.duration === "overnight" ? 4 : 5;
    numActivities = Math.min(numActivities, activities.length);

    while (selectedActivities.length < numActivities) {
      const randomIndex = Math.floor(Math.random() * activities.length);
      if (!usedIndices.has(randomIndex)) {
        selectedActivities.push(activities[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    const budgetPerPerson = calculateBudget();
    const costPerActivity = selectedActivities.map((a) => ({
      ...a,
      costPerPerson: `£${a.cost * 5}`,
    }));

    setPlan({
      activities: costPerActivity,
      totalCostPerPerson: `£${budgetPerPerson}`,
      packing: getPackingList(),
      checklist: getOrganiserChecklist(),
    });
    setExpandedActivities(new Set());
  };

  const calculateBudget = () => {
    const baseBudget = {
      "budget-friendly": 50,
      "mid-range": 150,
      luxury: 300,
    };
    return baseBudget[config.budgetTier] || 100;
  };

  const getPackingList = () => {
    const list = [...packingList.essentials];
    if (config.duration !== "day") list.push(...packingList.overnight);
    if (config.location !== "at-home") list.push(...packingList.dayTrip);
    list.push(...packingList.party);
    if (config.location === "countryside") list.push(...packingList.outdoor);
    return list;
  };

  const getOrganiserChecklist = () => {
    return [
      "Confirm all attendees and dietary requirements",
      "Book transport if needed",
      "Make activity reservations",
      "Arrange accommodation if overnight",
      "Plan the itinerary and share with guests",
      "Collect payments from attendees",
      "Create a WhatsApp/chat group",
      "Prepare welcome bags if overnight",
      "Arrange photos/videographer",
      "Plan party games and surprises",
    ];
  };

  const toggleExpanded = (index) => {
    const newSet = new Set(expandedActivities);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedActivities(newSet);
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Hen Do Planning
        </h2>

        <div className="space-y-4 mb-6">
          <Select
            label="Budget Tier"
            value={config.budgetTier}
            onChange={(e) =>
              setConfig({ ...config, budgetTier: e.target.value })
            }
            options={[
              { value: "budget-friendly", label: "Budget Friendly (under £50 pp)" },
              { value: "mid-range", label: "Mid-Range (£50-200 pp)" },
              { value: "luxury", label: "Luxury (200+ pp)" },
            ]}
          />

          <Select
            label="Location Type"
            value={config.location}
            onChange={(e) => setConfig({ ...config, location: e.target.value })}
            options={[
              { value: "city-break", label: "City Break" },
              { value: "countryside", label: "Countryside" },
              { value: "at-home", label: "At-Home" },
              { value: "abroad", label: "Abroad" },
            ]}
          />

          <Select
            label="Duration"
            value={config.duration}
            onChange={(e) => setConfig({ ...config, duration: e.target.value })}
            options={[
              { value: "day", label: "Day Celebration" },
              { value: "overnight", label: "Overnight" },
              { value: "weekend", label: "Weekend" },
            ]}
          />

          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Number of Attendees: {config.numberOfAttendees}
            </label>
            <input
              type="range"
              min="5"
              max="20"
              value={config.numberOfAttendees}
              onChange={(e) =>
                setConfig({
                  ...config,
                  numberOfAttendees: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>

        <Button onClick={generatePlan} className="w-full">
          Generate Hen Do Plan
        </Button>
      </Card>

      {plan && (
        <div className="space-y-4">
          <Card>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">
              Your Hen Do Itinerary
            </h2>
            <p className="text-accent font-mono font-bold mb-6">
              {plan.totalCostPerPerson} per person
            </p>

            <div className="space-y-2 mb-6">
              {plan.activities.map((activity, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(idx)}
                    className="w-full p-4 flex justify-between items-center hover:bg-surface transition"
                  >
                    <div className="text-left">
                      <p className="font-heading font-bold text-text-primary">
                        {activity.name}
                      </p>
                      <p className="text-text-secondary text-sm">
                        {activity.duration} - {activity.costPerPerson}
                      </p>
                    </div>
                    <span className="text-text-secondary">
                      {expandedActivities.has(idx) ? "−" : "+"}
                    </span>
                  </button>
                  {expandedActivities.has(idx) && (
                    <div className="px-4 pb-4 border-t border-border bg-surface">
                      <p className="text-text-secondary text-sm">
                        {activity.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
              Packing List
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {plan.packing.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-text-secondary text-sm"
                >
                  <span className="w-4 h-4 border border-accent rounded" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
              Organiser Checklist
            </h3>
            <ul className="space-y-2">
              {plan.checklist.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-text-secondary text-sm"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
