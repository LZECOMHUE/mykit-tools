// SEO content for date and time tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const datetimeSEO = {
  "online-timer": {
    sections: [
      createAnswerFirstSection(
        "How to Use the Online Timer",
        "Set a duration using the preset buttons or enter a custom time, then press start. The countdown runs in your browser tab and plays an alarm sound when it reaches zero. The remaining time also appears in the browser tab title so you can see it while working in other tabs.",
        "Preset times are available for common durations: 1 minute, 3 minutes, 5 minutes, 10 minutes, 15 minutes, 25 minutes (a Pomodoro session), 30 minutes, and 1 hour. For custom durations, enter any combination of hours, minutes, and seconds. The timer keeps running even if you scroll away on the page."
      ),
      {
        heading: "Popular Timer Durations and Uses",
        table: {
          headers: ["Duration", "Common Use"],
          rows: [
            ["1 minute", "Quick stretches, microwave heating, brushing teeth"],
            ["3-5 minutes", "Brewing tea, soft-boiled eggs, short meditation"],
            ["10-15 minutes", "Power naps, quick workouts, timed writing sprints"],
            ["25 minutes", "Pomodoro focus session, study block"],
            ["30-45 minutes", "Cooking, longer study session, meeting time box"],
            ["60 minutes", "Deep work block, exam practice, baking"],
          ],
        },
      },
      createAnswerFirstSection(
        "Timer vs Stopwatch vs Countdown",
        "A timer (or countdown timer) counts down from a set duration to zero and alerts you when time is up. A stopwatch counts up from zero to measure elapsed time. A countdown counts down to a specific date or moment in the future, like a birthday or event.",
        "This tool is a countdown timer. Use it when you know how long something should take and want to be alerted when the time is up. For measuring how long something takes without a set end point, use a stopwatch. For tracking days until an event, use a countdown calculator."
      ),
    ],
    faqs: [
      createFAQ(
        "Will the timer keep running if I switch tabs?",
        "Yes. The timer runs in the background while you work in other browser tabs. The remaining time is shown in the tab title so you can glance at it anytime. When the timer finishes, an alarm sound plays and a browser notification appears (if you have granted notification permission)."
      ),
      createFAQ(
        "Can I use this as a Pomodoro timer?",
        "Yes. The 25-minute preset is designed for the Pomodoro Technique. Start a 25-minute focus session, work until the alarm, then take a 5-minute break. After four sessions, take a longer 15-30 minute break. The preset buttons make it quick to switch between work and break intervals."
      ),
      createFAQ(
        "Does the timer work on my phone?",
        "Yes. The timer is fully responsive and works on all devices with a modern browser. On mobile, keep the browser tab open (it does not need to be the active tab, but closing the browser will stop the timer). For best results, do not let your phone go to deep sleep mode while the timer is running."
      ),
    ],
    relatedTools: [
      { slug: "stopwatch", label: "Online Stopwatch" },
      { slug: "countdown-calculator", label: "Countdown Calculator" },
      { slug: "age-calculator", label: "Age Calculator" },
    ],
  },
};
