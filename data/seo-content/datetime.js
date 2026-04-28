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

  "birthday-countdown": {
    sections: [
      createAnswerFirstSection(
        "How the Birthday Countdown Works",
        "Pick the month and day you were born and the tool starts a live countdown to your next birthday, ticking down in days, hours, minutes and seconds. It also tells you the zodiac sign linked to that date, your current age, and roughly how many days you have been alive.",
        "If your birthday has already passed this year, the countdown rolls forward to the same date next year. The clock updates every second so you can leave the tab open in the background, which is useful for kids who want to watch the seconds drop on the morning of their party."
      ),
      {
        heading: "Common Countdown Lengths and Why They Feel Different",
        table: {
          headers: ["Days Out", "What Most People Are Doing"],
          rows: [
            ["100+ days", "Saving the date, booking the venue, early gift hints"],
            ["30-60 days", "Sending invites, ordering the cake, planning a theme"],
            ["7-14 days", "Buying the last presents, confirming RSVPs, food shop"],
            ["1-3 days", "Wrapping, decorating, prepping the party bags"],
            ["Final 24 hours", "The countdown becomes the entertainment itself"],
          ],
        },
      },
      createAnswerFirstSection(
        "Leap Year Birthdays and Why 29 February Is Tricky",
        "If you were born on 29 February, the tool counts down to 1 March in non-leap years so you still get a clear date to celebrate. Leap years happen every four years (the next ones after 2024 are 2028, 2032, and 2036), with the exception that century years like 2100 are not leap years unless divisible by 400.",
        "That rule comes from the Gregorian calendar reform in 1582, which trimmed the older Julian calendar to keep the seasons aligned. For modern birthdays it rarely matters, but it does mean a 29 February baby technically has a 'real' birthday only roughly 25% of years."
      ),
    ],
    faqs: [
      createFAQ(
        "Does the countdown keep running if I close the browser tab?",
        "No. The countdown only ticks while the tab is open, because it runs in your browser. When you reopen the page and re-enter your birth month and day, it picks up the correct figure straight away based on the current date and time, so nothing is lost."
      ),
      createFAQ(
        "Why does the countdown show a number of days that does not match a friend's tool?",
        "Different tools handle the cut-off moment differently. This countdown targets midnight (00:00) on your birthday in your local time zone. A tool that targets the start of the day in UTC, or one that rounds up rather than down, can be off by up to a day. UK clocks shift between GMT (UTC) in winter and BST (UTC+1) in summer, which is the most common cause of an hour-or-so mismatch."
      ),
      createFAQ(
        "Can I use this for someone else's birthday?",
        "Yes. The tool does not store any personal data, so you can set it for a partner, child or friend. Lots of parents leave it open on a tablet on the kitchen counter as the day approaches, which gives the school countdown ('how many sleeps?') a satisfying number to point at."
      ),
      createFAQ(
        "How accurate is the 'days lived' figure?",
        "It uses the standard 365.25-day year to handle leap years on average. For exact day counts to a specific date, the [Date Difference Calculator](/date-difference-calculator) gives a precise figure between any two dates and accounts for every leap year individually."
      ),
    ],
    relatedTools: [
      { slug: "age-calculator", label: "Age Calculator" },
      { slug: "days-until-calculator", label: "Days Until Calculator" },
      { slug: "custom-countdown", label: "Custom Countdown Timer" },
    ],
  },

  "custom-countdown": {
    sections: [
      createAnswerFirstSection(
        "How to Set Up a Custom Countdown",
        "Type a name for what you are counting down to, pick a target date, and set the time of day if it matters. The countdown starts immediately and updates once a second, showing weeks, days, hours, minutes and seconds remaining. The default is 30 days from today so you have something on screen straight away.",
        "Use ISO 8601 format (YYYY-MM-DD) when typing dates manually so there is no UK-vs-US confusion. The clock targets your device's local time, so a wedding at 14:00 in London on 12 June 2026 will read the same on every UK phone but will show a different absolute time for someone visiting the same page from New York."
      ),
      {
        heading: "Events People Most Often Build a Countdown For",
        table: {
          headers: ["Event Type", "Typical Lead Time", "Why a Countdown Helps"],
          rows: [
            ["Wedding", "6-18 months", "Keeps both partners on the same milestone"],
            ["Holiday departure", "1-12 months", "Drives saving and packing motivation"],
            ["Exam or deadline", "1-12 weeks", "Turns vague stress into a concrete plan"],
            ["Baby due date", "0-9 months", "Useful for nesting checklists"],
            ["House move", "2-12 weeks", "Anchors utility switches and packing"],
            ["Concert or festival", "1-9 months", "Counts down to ticket release and the gig itself"],
          ],
        },
      },
      createAnswerFirstSection(
        "Daylight Saving and Why One Day a Year Is Not 24 Hours",
        "British clocks change twice a year: forward one hour on the last Sunday in March (entering BST), back one hour on the last Sunday in October (returning to GMT). Those two days are 23 and 25 hours long. A countdown crossing one of those Sundays will appear to gain or lose an hour compared with simple 24-hour maths.",
        "If you need second-perfect accuracy across a clock change, set the target time in the same way you would describe it to a guest: 'the wedding starts at 2pm' rather than 'in exactly 4,233 hours'. The tool handles the DST shift automatically because it reads your device's time zone rules."
      ),
    ],
    faqs: [
      createFAQ(
        "What happens when the countdown reaches zero?",
        "The display freezes at zero rather than running into negative numbers. If you reload the page or change the target date, it picks up correctly from the new value. There is no audio alert, because most people use this for events spread over weeks or months rather than minute-by-minute timing."
      ),
      createFAQ(
        "Can I share a countdown with someone else?",
        "The settings live in your browser only, so a fresh visitor will see the default values until they enter their own. If you want a quick way to share a deadline with a team, take a screenshot of the live countdown or use the [Days Until Calculator](/days-until-calculator) which produces a static figure you can paste into chat."
      ),
      createFAQ(
        "Does this work on mobile?",
        "Yes. The countdown is designed mobile-first, so the seconds digits stay readable on a phone screen. Battery use is minimal because the page only updates a small DOM element each second; it is not redrawing the full layout."
      ),
      createFAQ(
        "Why are weeks shown alongside days?",
        "Most people think of medium-distance events in weeks ('it's about 8 weeks away') and short ones in days ('only 3 days left'). Showing both means you don't have to do the divide-by-7 mental maths. For events more than a year out, consider using the dedicated long-range countdowns in the related tools below."
      ),
    ],
    relatedTools: [
      { slug: "days-until-calculator", label: "Days Until Calculator" },
      { slug: "new-year-countdown", label: "New Year Countdown" },
      { slug: "birthday-countdown", label: "Birthday Countdown" },
    ],
  },

  "date-difference-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Date Difference Calculator Works",
        "Enter a start date and an end date and the tool returns the gap in years, months and days, plus running totals in weeks, days, hours, minutes and seconds. It also splits the period into business days (Monday-Friday) versus weekend days, and tells you what day of the week each end of the range falls on.",
        "Reverse the dates if you put them in the wrong order; the tool flags it but still gives you the correct figure. Tick 'include end date' when you are counting consumable items per day (a 7-day medication course, for example), because that calculation needs both bookend days counted. Leave it unticked when calculating an interval (the duration of a project, for example)."
      ),
      {
        heading: "Common Use Cases at a Glance",
        table: {
          headers: ["Scenario", "What to Calculate", "Tip"],
          rows: [
            ["Project planning", "Working days between kick-off and deadline", "Use [Work Days Calculator](/work-days-calculator) to also strip bank holidays"],
            ["Pregnancy tracking", "Days from first day of last period", "40 weeks (280 days) is the standard due-date estimate"],
            ["Visa applications", "Days remaining on a 90-in-180 rule", "Set 'include end date' on; the day you arrive counts"],
            ["Anniversary maths", "Years, months and days for a card", "Use start date = wedding day, end date = today"],
            ["Notice periods", "Calendar days from notice given to last day", "Most UK contracts count weekends, so leave business days info-only"],
          ],
        },
      },
      createAnswerFirstSection(
        "Add or Subtract Days, Weeks, Months or Years From a Date",
        "Switch tabs to add or remove a duration from any starting date. Useful for working out the date 90 days after a contract is signed, or the end of a 12-week probation period that started on 6 January. The tool returns the resulting date and the day of the week, so you can spot whether your deadline falls on a weekend.",
        "Adding 'months' uses calendar months rather than 30-day blocks. So 31 January plus one month becomes 28 February (or 29 February in a leap year), not 3 March. This matches how UK contract law typically interprets monthly notice."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does the year/month/day breakdown look different to a simple subtraction?",
        "Months are different lengths, so the breakdown borrows days from the previous month when needed. From 31 January to 1 March is 0 years, 1 month, 1 day in 2026 (a non-leap year), but the same dates in 2024 (a leap year) give 1 month and 0 days. The total day count is unaffected; only the years/months/days split changes."
      ),
      createFAQ(
        "How does the tool handle leap years?",
        "Each year is checked individually using the Gregorian rule: divisible by 4 = leap, except century years which must be divisible by 400. So 2000 was a leap year but 2100 will not be. Dates before 15 October 1582 use the same maths, even though England was actually still on the Julian calendar until 1752; for genealogy work spanning that gap, treat results as approximate."
      ),
      createFAQ(
        "What is the difference between business days and working days here?",
        "This tool excludes Saturdays and Sundays only. It does not subtract bank holidays. If you need a working-day count that strips bank holidays as well, use the [Work Days Calculator](/work-days-calculator), which has the UK 2026 calendar built in (1 Jan, 3 Apr Good Friday, 6 Apr Easter Mon, 4 May, 25 May, 31 Aug, 25 Dec, 28 Dec)."
      ),
      createFAQ(
        "Can I include time of day, not just dates?",
        "This tool works at full-day resolution. For sub-day intervals, the totalHours, totalMinutes and totalSeconds figures are derived from whole days. To time something like a 6-hour shift across midnight, the [Work Hours Calculator](/work-hours-calculator) is a better fit."
      ),
    ],
    relatedTools: [
      { slug: "work-days-calculator", label: "Work Days Calculator" },
      { slug: "days-until-calculator", label: "Days Until Calculator" },
      { slug: "age-calculator", label: "Age Calculator" },
    ],
  },

  "holiday-leave-maximiser": {
    sections: [
      createAnswerFirstSection(
        "How to Stretch Annual Leave Around UK Bank Holidays",
        "Set your number of annual leave days, pick the year, and choose your region. The tool maps your leave days onto the bank holiday calendar to find combinations that buy you the longest continuous time off for the smallest leave spend. Booking a Friday next to a Monday bank holiday turns 1 leave day into a 4-day weekend; booking either side of Christmas typically turns 3 days into 9.",
        "UK statutory annual leave is 28 days including bank holidays for full-time workers, though many employers add extra. The 2026 bank holidays are 1 Jan, Good Friday 3 Apr, Easter Mon 6 Apr, Early May 4 May, Spring 25 May, Summer 31 Aug, Christmas 25 Dec, and Boxing Day 28 Dec (Boxing Day falls on a Saturday so the substitute Monday is taken)."
      ),
      {
        heading: "Highest-Ratio Long Weekends in 2026",
        table: {
          headers: ["Booking", "Leave Days Used", "Time Off Achieved", "Ratio"],
          rows: [
            ["Tue 7 - Fri 9 Apr (around Easter)", "3", "10 days (Sat 4 - Mon 13 Apr)", "3.3x"],
            ["Tue 5 - Fri 8 May", "4", "9 days (Sat 2 - Sun 10 May)", "2.3x"],
            ["Tue 26 - Fri 29 May", "4", "9 days (Sat 23 - Sun 31 May)", "2.3x"],
            ["Tue 1 - Fri 4 Sep", "4", "9 days (Sat 29 Aug - Sun 6 Sep)", "2.3x"],
            ["Tue 22 - Thu 24 Dec, Tue 29 - Thu 31 Dec", "6", "16 days (Sat 19 Dec - Sun 3 Jan)", "2.7x"],
          ],
        },
      },
      createAnswerFirstSection(
        "Regional Differences You Can Forget About",
        "Scotland gets 2 January as a bank holiday and does not always observe Easter Monday in the same way; the tool adjusts when you select Scotland. Northern Ireland adds 17 March (St Patrick's) and 12 July (Battle of the Boyne). England and Wales share the same eight standard bank holidays.",
        "If your office is in London but your team is split across the UK, plan around the most restrictive calendar (Northern Ireland has the most bank holidays, Scotland has the second-most). Bridge days for parents, where school inset days fall awkwardly, are not bank holidays but are worth booking around if childcare is a factor."
      ),
    ],
    faqs: [
      createFAQ(
        "Can my employer reject my leave request?",
        "Yes. UK law gives the right to take leave but lets employers refuse a specific request as long as the reason is reasonable and the same total leave is allowed in the year. They must give notice at least as long as the leave being refused; for example, to refuse 5 days, they need to tell you at least 5 days before. Booking the high-value bridge weeks early (most employers open the next year's calendar in October or November) is the simplest defence."
      ),
      createFAQ(
        "Do bank holidays count as part of my 28 days?",
        "Statutory minimum leave is 28 days for full-time workers, including the 8 bank holidays. So a contract that gives '20 days plus bank holidays' meets the legal minimum. A contract offering '25 days plus bank holidays' is genuinely above-statutory by 5 days."
      ),
      createFAQ(
        "Why does Christmas 2026 give 16 days off for 6 leave days?",
        "Christmas Day 2026 is a Friday and Boxing Day a Saturday (so the substitute is Monday 28 Dec). New Year's Day 2027 is a Friday. Booking Tue 22 - Thu 24 Dec and Tue 29 - Thu 31 Dec uses 6 leave days but stitches together the weekends, the three statutory days and New Year's Day into a continuous 16-day stretch from Saturday 19 December to Sunday 3 January."
      ),
      createFAQ(
        "What about part-time workers?",
        "Part-time leave is pro-rated. A 3-day-a-week worker is entitled to 3/5 of 28 days = 16.8 days. Bank holidays are also pro-rated, so if your non-working days fall on bank holidays, you don't get extra in lieu unless your contract says so. The [Work Hours Calculator](/work-hours-calculator) helps work out your pro-rata figure."
      ),
    ],
    relatedTools: [
      { slug: "bank-holiday-checker", label: "Bank Holiday Checker" },
      { slug: "work-days-calculator", label: "Work Days Calculator" },
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
    ],
  },

  "sleep-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Sleep Cycle Calculator Works",
        "A typical sleep cycle is 90 minutes long and runs through light sleep, deep sleep and REM in sequence. Waking at the end of a cycle feels far better than waking mid-cycle. The calculator offers either: 'I need to wake up at X, so what time should I go to bed?' or 'I am going to bed at X, so when should the alarm be set?'",
        "It assumes 15 minutes to fall asleep and shows options for 3, 4, 5 and 6 cycles. The 5- and 6-cycle options are flagged as good and optimal; 4 cycles is fair (about 6 hours sleep) and 3 cycles is a minimum survival figure for a single short night, not a habit. Set a 7am wake-up and the tool will recommend going to bed at 9:45pm (6 cycles), 11:15pm (5 cycles), 12:45am (4 cycles) or 2:15am (3 cycles)."
      ),
      {
        heading: "Recommended Sleep by Age",
        table: {
          headers: ["Age Group", "Recommended Hours", "Cycles"],
          rows: [
            ["Newborns (0-3 months)", "14-17 hours", "Many short cycles, irregular"],
            ["Infants (4-11 months)", "12-15 hours", "8-10 cycles"],
            ["Toddlers (1-2 years)", "11-14 hours", "7-9 cycles"],
            ["Preschool (3-5 years)", "10-13 hours", "7-8 cycles"],
            ["School age (6-13 years)", "9-11 hours", "6-7 cycles"],
            ["Teenagers (14-17 years)", "8-10 hours", "5-6 cycles"],
            ["Adults (18-64 years)", "7-9 hours", "5-6 cycles"],
            ["Older adults (65+)", "7-8 hours", "5 cycles"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why Cycle-Based Wakeups Beat Hour-Counting",
        "A 7-hour sleep that ends in light sleep usually feels better than an 8-hour sleep that ends mid-deep-sleep. That is why a 90-minute-cycle calculator can recommend a slightly shorter sleep on a busy night and still leave you feeling more rested than if you had grabbed an extra 20 minutes. Sleep researchers call the dazed feeling after a mid-cycle wake-up 'sleep inertia'; it can last 30-60 minutes and is what makes the snooze button feel so necessary.",
        "Cycle length varies a bit between people (80-110 minutes is normal). If 90 minutes consistently feels off, try shifting your bedtime in 10-minute increments and tracking which start time produces the easiest mornings over a fortnight."
      ),
    ],
    faqs: [
      createFAQ(
        "Is 6 hours of sleep enough for an adult?",
        "Six hours covers four cycles, which most adults can run on for a few days but not as a long-term habit. Adults need 7-9 hours (5-6 cycles) for cognitive function and immune health to stay where they should. Habitual short sleep is linked to reduced concentration, slower reaction times and weaker emotional regulation."
      ),
      createFAQ(
        "What if I cannot fall asleep within 15 minutes?",
        "The tool builds in 15 minutes 'sleep latency' as a UK-typical average. If you usually take 30-45 minutes to drop off, add that gap onto the suggested bedtime. Sleep hygiene (no screens for the last 30 minutes, cool dark room, consistent wake-up time) brings most people closer to the 15-minute average within a fortnight."
      ),
      createFAQ(
        "Should I use this calculator for shift work?",
        "It works for any wake-or-bed target, including night shifts. The bigger challenge for shift workers is consistency: rotating shifts disrupt the body clock no matter how cleanly you time the cycles. Aim for the same bedtime each working day, blackout curtains, and protect a 7-hour window."
      ),
      createFAQ(
        "How is this different from a sleep tracking app?",
        "An app tracks what your sleep was actually like (movement, heart rate, sometimes audio). This calculator suggests when to set an alarm before the night begins. The two work well together: use this to plan, an app to verify, and adjust your typical cycle length if the data consistently disagrees with the 90-minute default."
      ),
    ],
    relatedTools: [
      { slug: "online-timer", label: "Online Timer" },
      { slug: "pomodoro-timer", label: "Pomodoro Timer" },
      { slug: "age-calculator", label: "Age Calculator" },
    ],
  },

  "work-days-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Work Days Calculator Counts Business Days",
        "Pick a start date and an end date. The tool walks through every day in between, and counts as a working day anything that is not a Saturday, Sunday or UK bank holiday. It returns four figures: total calendar days, working days, weekend days and bank holiday days. Toggle bank holidays off if your client treats them as billable.",
        "The 2026 UK bank holidays built in are 1 January, 3 April (Good Friday), 6 April (Easter Monday), 4 May (Early May), 25 May (Spring), 31 August (Summer), 25 December and 28 December (Boxing Day substitute, because 26 Dec is a Saturday). For a generic day-count without holidays stripped, the [Date Difference Calculator](/date-difference-calculator) is the simpler choice."
      ),
      {
        heading: "When You Need a Working Days Figure Rather Than Calendar Days",
        table: {
          headers: ["Use Case", "Why Work Days Matter"],
          rows: [
            ["Project deadlines", "Resource planning ignores weekends and holidays"],
            ["Notice periods (some contracts)", "A '20 working days' clause is materially longer than 20 calendar days"],
            ["Statutory sick pay", "SSP is paid for qualifying days only"],
            ["Court filing windows", "Most procedural deadlines count working days only"],
            ["Probation periods (some employers)", "A '90 working days' probation is roughly 18 weeks"],
            ["Freelance billing", "Quoting day-rate work for a fortnight needs to match your actual availability"],
          ],
        },
      },
      createAnswerFirstSection(
        "Regional Bank Holiday Differences",
        "England and Wales share the eight bank holidays listed in the calculator. Scotland adds 2 January and uses St Andrew's Day (30 November) when an employer chooses to grant it. Northern Ireland adds St Patrick's Day (17 March) and Battle of the Boyne (12 July). The calculator currently uses the England and Wales list, which is the largest single market and the conservative choice if your contract is silent on the question.",
        "Bridge days, also called bridging holidays, are not statutory in the UK; they are common in mainland Europe but rare here. The closest UK equivalent is the unofficial 'twixmas' shutdown between Christmas and New Year, which many offices treat as an informal holiday even though it is not legally one."
      ),
    ],
    faqs: [
      createFAQ(
        "Does the result include the start and end dates?",
        "Yes. Both the start date and end date are included in the count. So 6 April 2026 to 10 April 2026 returns 5 calendar days, which after stripping the Easter Monday on 6 April leaves 4 working days. If you need an interval that excludes one of the bookend days, subtract 1 from the result."
      ),
      createFAQ(
        "What about half-days?",
        "The tool counts in whole days only. For half-day adjustments, treat each half as 0.5 of the working-day total in your spreadsheet. For finer-grained billable time tracking, the [Work Hours Calculator](/work-hours-calculator) handles hours and minutes."
      ),
      createFAQ(
        "Can I add my own company-specific holidays?",
        "Not directly in the calculator. The simplest workaround is to run the figure with bank holidays included, then manually subtract any extra closure days (your firm's summer shutdown, founder's day, religious observance days). For repeat use, build a quick spreadsheet with your specific calendar."
      ),
      createFAQ(
        "How is this different from working out a project end date?",
        "This tool tells you how many working days fall between two dates you already know. To go the other way (start date plus N working days = ?), use the add/subtract tab in the [Date Difference Calculator](/date-difference-calculator) and adjust manually for weekends, or roll forward by hand using the bank holiday list."
      ),
    ],
    relatedTools: [
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
      { slug: "bank-holiday-checker", label: "Bank Holiday Checker" },
      { slug: "holiday-leave-maximiser", label: "Holiday Leave Maximiser" },
    ],
  },

  "work-hours-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Use the Work Hours Calculator",
        "In daily mode, enter your start time, end time and the length of any unpaid break. The tool returns hours worked in both decimal (7.5) and HH:MM (7:30) formats, plus a weekly total assuming the same shift five days a week and a monthly estimate using 4.33 weeks per month. In weekly mode, enter the hours worked on each day separately and get a weekly total without assuming a flat schedule.",
        "Anything above 40 hours triggers an overtime indicator. The UK Working Time Regulations cap the average working week at 48 hours over a 17-week reference period unless you have signed an opt-out. A typical UK contract is between 37.5 and 40 hours, often expressed as '9 to 5:30 with a 30-minute unpaid lunch'."
      ),
      {
        heading: "Common UK Schedule Patterns",
        table: {
          headers: ["Schedule", "Daily", "Weekly Decimal", "Weekly HH:MM"],
          rows: [
            ["9-5 with 1hr lunch", "7:00", "35.00", "35:00"],
            ["9-5:30 with 30min lunch", "8:00", "40.00", "40:00"],
            ["8:30-5 with 30min lunch", "8:00", "40.00", "40:00"],
            ["7:30-4 with 30min lunch", "8:00", "40.00", "40:00"],
            ["Compressed 4x9.5hr week", "9:30", "38.00", "38:00"],
            ["3 days at 12hr + 1 short", "Varies", "37.00", "37:00"],
          ],
        },
      },
      createAnswerFirstSection(
        "Decimal vs HH:MM and Why Both Matter",
        "Payroll runs on decimal (7.5 hours at £15 per hour = £112.50). Rotas and timesheets often use HH:MM (7:30) because it is closer to how people read a clock. Mixing them up is the single most common payroll dispute: 7.30 in a spreadsheet is seven and three-tenths of an hour, not seven hours thirty minutes. The tool shows both numbers side by side so you can copy whichever your system needs.",
        "When invoicing in 15-minute increments, each block is 0.25 in decimal. So 6 hours 45 minutes = 6.75. Most freelancers track in 0.25 increments because it survives rounding without obvious leakage on either side."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I deduct breaks?",
        "If your break is unpaid (the typical UK lunch arrangement) deduct it; the calculator already does. If your break is paid, set the break field to 0. UK workers are entitled to a 20-minute break after 6 hours of work, and to 11 consecutive hours off between shifts and a 24-hour rest period each week."
      ),
      createFAQ(
        "How does overtime work in the UK?",
        "There is no statutory overtime rate in the UK. Whether and how much you get for hours over 40 (or whatever your contract states as standard) depends entirely on your contract. Many salaried roles do not pay overtime at all. The 48-hour weekly cap from the Working Time Regulations applies as an average over 17 weeks, not as a hard ceiling per week."
      ),
      createFAQ(
        "Can I track shifts that cross midnight?",
        "If your end time is earlier than your start time (a 22:00 to 06:00 shift, for example), enter the times as given and the tool handles the overnight roll. The figure returned is hours actually worked, not the elapsed clock time. For multi-day or rotating-shift maths, the [Date Difference Calculator](/date-difference-calculator) covers periods longer than a single day."
      ),
      createFAQ(
        "Why does the monthly estimate use 4.33 weeks rather than 4?",
        "There are 52 weeks in a year and 12 months, so the average month contains 4.33 weeks. Using 4 weeks per month would underestimate annual hours by about 8%. For payroll purposes, the precise figure is calculated each month from actual working days; this calculator is for ballpark planning, not payslip generation."
      ),
    ],
    relatedTools: [
      { slug: "work-days-calculator", label: "Work Days Calculator" },
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
      { slug: "online-timer", label: "Online Timer" },
    ],
  },

  "world-clock": {
    sections: [
      createAnswerFirstSection(
        "How to Use the World Clock",
        "The tool ships with London, New York and Tokyo on screen by default. Use the dropdown to add any of 12 preset cities (Sydney, Dubai, Los Angeles, Paris, Singapore, Toronto, Moscow, Hong Kong, Bangkok, plus the three defaults). Each card shows the current time to the second, the date and the day of the week, all updating live in the cities' own time zones.",
        "Times are pulled from your device's clock, then offset to each city's IANA time zone (Europe/London, America/New_York, and so on). That means daylight saving is handled for each region individually: London follows BST from the last Sunday of March to the last Sunday of October, while New York's DST runs second Sunday of March to first Sunday of November, so the offset between them shifts a few times a year."
      ),
      {
        heading: "Time Zones and UTC Offsets at a Glance",
        table: {
          headers: ["City", "Standard Offset (UTC)", "DST Offset (UTC)", "Notes"],
          rows: [
            ["London", "+0 (GMT)", "+1 (BST)", "Reference for UK time"],
            ["New York", "-5 (EST)", "-4 (EDT)", "5 hours behind London most of the year"],
            ["Los Angeles", "-8 (PST)", "-7 (PDT)", "8 hours behind London"],
            ["Tokyo", "+9", "No DST", "9 hours ahead of London in winter, 8 in summer"],
            ["Sydney", "+10 (AEST)", "+11 (AEDT)", "Australian DST runs Oct-Apr (opposite to UK)"],
            ["Dubai", "+4", "No DST", "4 hours ahead year-round"],
            ["Singapore", "+8", "No DST", "Stable offset for video calls"],
          ],
        },
      },
      createAnswerFirstSection(
        "Scheduling Across Time Zones Without Mistakes",
        "The two most common scheduling errors are (a) forgetting that DST starts and ends on different weekends in the UK and US, and (b) confusing city name with country (Sydney is +11 in UK summer, but Perth is +8 with no DST). Always agree meeting times in UTC alongside the local time when the gap is more than a few hours; UTC does not shift, so '14:00 UTC' is unambiguous.",
        "For a one-off scheduling decision between two specific cities, the [Timezone Converter](/timezone-converter) does the maths in the other direction (give it a time in one zone, get it in the other). The world clock here is better when you regularly work with three or more locations and want a glance-able dashboard."
      ),
    ],
    faqs: [
      createFAQ(
        "Why is the time slightly off from the wall clock in another country?",
        "The accuracy depends on your own device's clock. If your phone or laptop is a few seconds slow, every world clock card will be a few seconds slow. To verify, compare with time.is or the speaking clock; modern devices auto-sync via NTP and are usually within a second."
      ),
      createFAQ(
        "Can I save my list of cities?",
        "The list is held in the page session, so a refresh resets it. For a permanent personal dashboard, bookmark this page after adding the cities you want; the bookmark itself does not preserve the list, but it means you can rebuild it in a few clicks each visit."
      ),
      createFAQ(
        "Why are some cities not in the dropdown?",
        "The preset list covers the 12 highest-traffic business cities. Most additional cities share a time zone with one already on the list (Edinburgh = London, Vancouver = Los Angeles, Mumbai is +5:30 from UTC, which is the most common 'odd' offset). For obscure or half-hour offset zones (Newfoundland, Nepal, parts of Australia), the [Timezone Converter](/timezone-converter) supports the full IANA zone list."
      ),
      createFAQ(
        "What is the difference between UTC and GMT?",
        "For practical purposes, none. UTC (Coordinated Universal Time) is the modern standard and is defined by atomic clocks; GMT (Greenwich Mean Time) is defined astronomically. They are kept within 0.9 seconds of each other through occasional leap seconds. UK time is GMT in winter and BST (British Summer Time, UTC+1) from the last Sunday of March until the last Sunday of October."
      ),
    ],
    relatedTools: [
      { slug: "timezone-converter", label: "Timezone Converter" },
      { slug: "online-timer", label: "Online Timer" },
      { slug: "stopwatch", label: "Online Stopwatch" },
    ],
  },

  "pomodoro-timer": {
    sections: [
      createAnswerFirstSection(
        "Why 25 Minutes Is the Default",
        "The Pomodoro Technique was invented by Francesco Cirillo in the late 1980s while he was a university student struggling to focus. He used a tomato-shaped kitchen timer (pomodoro is Italian for tomato) set to 25 minutes, took a 5-minute break, then repeated. After four cycles he took a longer break of 15 to 30 minutes. The numbers were chosen experimentally; 25 minutes is short enough that procrastination is hard to justify and long enough to make real progress.",
        "The timer ships with these defaults but lets you adjust each phase. Some users do better on 50 work / 10 break (the 'Ultradian Rhythm' approach favoured by deep-work writers), and ADHD users sometimes find 15 work / 5 break more sustainable. The shape matters more than the exact minutes: focused effort, brief recovery, repeat."
      ),
      createAnswerFirstSection(
        "Tracking Daily Sessions and Focus Time",
        "Every completed work block adds to your daily counter, which resets at midnight local time. Eight pomodoros equals roughly 3 hours 20 minutes of pure focused work, which is what most cognitive-load researchers (Anders Ericsson, Cal Newport) consider the realistic upper limit for sustained deliberate practice in a day. If you are doing more than that you are probably mixing in shallow work and counting it as deep, or burning the candle in a way that won't last.",
        "The timer stores stats in your browser via localStorage, so closing the tab does not lose your count. A student revising for finals can run two morning blocks (8 pomodoros), a long break for lunch, and another evening block, then see at a glance whether they hit a sustainable rhythm. Pair this with the [Sleep Calculator](/sleep-calculator) to make sure recovery matches output."
      ),
      {
        heading: "Suggested Pomodoro Profiles for Different Tasks",
        table: {
          headers: ["Task Type", "Work / Break", "Sessions Before Long Break", "Long Break"],
          rows: [
            ["Standard knowledge work", "25 / 5", "4", "15 min"],
            ["Deep writing or coding", "50 / 10", "2-3", "30 min"],
            ["Quick admin or email", "15 / 3", "6", "15 min"],
            ["Study/revision", "25 / 5", "4", "20 min (recall test)"],
            ["Creative work (drawing, music)", "45 / 15", "3", "30 min"],
          ],
        },
      },
      createAnswerFirstSection(
        "Common Reasons Pomodoro Fails (and How to Fix Them)",
        "It fails most often when interruptions destroy the block. The technique relies on uninterrupted focus, so the very first thing to do is silence Slack, close email, and put the phone in another room. Cirillo's original rule is that any interruption invalidates the pomodoro, full stop; you start the next 25-minute block from zero. That is harsh, but it forces you to defend the time.",
        "Second failure mode: planning blocks for tasks that genuinely need more than 25 minutes of unbroken thought (writing a complex contract, debugging a tricky distributed-systems issue). Switch to the 50/10 profile for those, or use the [Work Hours Calculator](/work-hours-calculator) to plan a longer protected block. A bell sounds at the end of each phase via the Web Audio API, so you don't need to watch the screen."
      ),
    ],
    faqs: [
      createFAQ(
        "What happens after every 4 work sessions?",
        "After your 4th, 8th, 12th and so on, the timer automatically switches to a long break (default 15 minutes) instead of the usual 5. The longer break lets your prefrontal cortex actually recover; multiple short breaks alone don't quite deliver the same restoration. You can adjust the long break duration in settings."
      ),
      createFAQ(
        "Does the Pomodoro Technique have research behind it?",
        "Some, but it is more rule of thumb than science. The general principle (focused effort followed by recovery, repeated) is supported by attention-restoration research and ultradian rhythm studies. The specific 25-minute interval has no special biological status; it works because it is short enough to start without dread and long enough to make real progress. If 25 doesn't suit you, change it."
      ),
      createFAQ(
        "Can I track which task I'm working on?",
        "Yes. The task label field at the top lets you note what the current pomodoro is for ('Maths revision Chapter 4', 'Email backlog', 'Draft pitch deck'). The label persists across the work block but does not save into the daily history yet; for full historical tracking pair the timer with a journal or task manager like Todoist or Things 3."
      ),
      createFAQ(
        "Will the timer keep running if I close the tab?",
        "No. The timer runs in JavaScript in the browser tab, so closing the tab pauses it. The Page Visibility API keeps it ticking accurately as long as the tab is open even when minimised; modern Chrome, Firefox, Safari and Edge all handle this correctly. If you need a timer that survives a tab close, run a separate phone timer alongside as backup."
      ),
      createFAQ(
        "What is the bell sound at the end of each phase?",
        "Three short tones at 800 Hz, 600 Hz, 800 Hz, lasting about half a second total. It is generated client-side using the Web Audio API rather than streamed, so it works offline and never blocks on slow connections. If your office mates can hear it, mute the tab and watch for the visual phase change instead."
      ),
    ],
    relatedTools: [
      { slug: "work-hours-calculator", label: "Work Hours Calculator" },
      { slug: "sleep-calculator", label: "Sleep Calculator" },
      { slug: "online-timer", label: "Online Timer" },
    ],
  },
};
