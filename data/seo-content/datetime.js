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

  "age-calculator": {
    sections: [
      createAnswerFirstSection(
        "What the Age Calculator Tells You",
        "Enter your date of birth and the calculator works out your exact age in years, months and days, plus the running totals you rarely think about: total days alive, total weeks, days until your next birthday, and the day of the week you were born on. It also pins down your zodiac sign, Chinese zodiac animal, and which generation you fall into.",
        "The maths is straightforward arithmetic against today's date. The interesting parts are the fiddly bits: an age of '34 years and 0 days' means today is your birthday; '34 years and 364 days' means it's the day before. The calculator handles the awkward case where your birthday hasn't happened yet this year by rolling back one year and counting forward through the months."
      ),
      createAnswerFirstSection(
        "How Leap Years Affect the Count",
        "The total-days figure is computed from the actual elapsed milliseconds between your birthday and now, so leap years are handled automatically. If you are 30 years old, you have lived through 7 or 8 February 29ths depending on when you were born, and those extra days are baked into the total. The Gregorian rule, in place since Pope Gregory XIII's reform in 1582, says a year is a leap year if it's divisible by 4, except century years, except century years divisible by 400. So 2000 was a leap year, 2100 won't be."
      ),
      {
        heading: "What Each Field Means",
        table: {
          headers: ["Field", "What it shows", "Useful for"],
          rows: [
            ["Years / Months / Days", "Your age broken down properly", "Forms, applications, age verification"],
            ["Total days alive", "Every single day you've been here", "Birthday milestones, running totals"],
            ["Total weeks", "Days divided by 7", "Pregnancy and infancy comparisons"],
            ["Days to next birthday", "Countdown to the next celebration", "Planning gifts, parties, holidays"],
            ["Day of week born", "Monday, Tuesday, etc.", "The 'Monday's child' nursery rhyme"],
            ["Zodiac sign", "Western astrology by birth date", "Horoscopes, social conversation"],
            ["Chinese zodiac", "12-year animal cycle", "Lunar New Year, cultural context"],
            ["Generation", "Boomer, Gen X, Millennial, Gen Z", "Demographic context"],
          ],
        },
      },
      createAnswerFirstSection(
        "Common Reasons People Use an Age Calculator",
        "Filling in forms is the most common one, especially the kind that ask for age in years and months rather than just years. Pension and benefit applications often need this. Parents track baby ages in weeks for the first year and months for the second, then quietly switch to years when nobody's checking. People also use the tool to count 10,000-day milestones (about 27 years and 4 months), or to plan birthday surprises by counting backwards from a target date.",
        "If you're working out the age of someone else, like a child or a relative, just enter their date of birth instead of yours. For more detailed date arithmetic, the [Date Difference Calculator](/date-difference-calculator) works out the gap between any two dates, including business days only."
      ),
    ],
    faqs: [
      createFAQ(
        "How is my exact age calculated?",
        "Your age in years is the difference between today's year and your birth year, minus one if your birthday hasn't happened yet this year. Months and days are calculated by subtracting components and borrowing from the next column when needed, the same way you'd do long subtraction by hand. Leap years are handled correctly because the calculation uses real calendar dates, not approximations."
      ),
      createFAQ(
        "Is the day-of-week calculation accurate for old dates?",
        "Yes, for any date after the Gregorian calendar was adopted. JavaScript's Date object uses the proleptic Gregorian calendar, which extends the modern rules backwards. For dates before the cutover (different countries adopted at different times, ranging from 1582 to 1923), the day of week may differ from what historical records show, since those used the older Julian calendar."
      ),
      createFAQ(
        "Why does my age in months seem high?",
        "Total months is years times 12 plus the remaining months, so a 30-year-old shows 360+ months. People underestimate this because we usually think in years. A useful sanity check: a 30-year-old has lived around 10,950 days, just over 1,560 weeks, and roughly 360 months."
      ),
      createFAQ(
        "Does this work for babies and toddlers?",
        "Yes. Enter the baby's date of birth and you'll see age in years, months and days plus total weeks alive (the figure most parenting books and milestone charts use during the first 18-24 months). For pregnancy week tracking, you'll need a separate due date calculator since gestational age is counted from the last menstrual period rather than birth."
      ),
      createFAQ(
        "What's the difference between zodiac and Chinese zodiac?",
        "Western zodiac (Aries, Taurus, etc.) is based on the date you were born, with twelve signs spanning roughly a month each. Chinese zodiac is based on the lunar year, with twelve animals on a rotating cycle, so everyone born in the same lunar year shares an animal. This calculator uses an approximation tied to the Gregorian year, which is correct for most birthdays; for early-year births close to Chinese New Year, the lunar date shift can move you to the previous animal."
      ),
    ],
    relatedTools: [
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
      { slug: "leap-year-checker", label: "Leap Year Checker" },
      { slug: "time-calculator", label: "Time Calculator" },
    ],
  },

  "timezone-converter": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Times Between Timezones",
        "Pick a source timezone (where the time is now), a target timezone (where you want to know the time), enter the time and date, and the converter does the offset arithmetic. Quick-jump buttons handle the most common business pairings: London to New York, London to Tokyo, Singapore to London, Sydney to New York. The calculation uses the browser's Intl.DateTimeFormat API, so the result reflects the actual local time including any current daylight saving offset.",
        "All times are anchored to UTC (Coordinated Universal Time) under the hood. UTC has no daylight saving and runs at the same speed everywhere on Earth. Each city or country has an offset from UTC: London is UTC+0 in winter and UTC+1 in summer, New York is UTC-5 in winter and UTC-4 in summer, Tokyo is permanently UTC+9. The converter looks up the offset for both timezones on the date you specify, then shifts the time accordingly."
      ),
      createAnswerFirstSection(
        "Why Time Differences Aren't Constant",
        "London to New York is usually 5 hours, but for two weeks each year it's 4 hours. This is because the UK and US don't change clocks on the same day. The UK switches to British Summer Time on the last Sunday in March and back to GMT on the last Sunday in October. The US switches on the second Sunday in March and the first Sunday in November. Between those mismatched dates the time difference shifts by an hour.",
        "Some places skip the dance entirely. Iceland never changes clocks. Most of Asia (Tokyo, Singapore, Hong Kong, Beijing) stays on a fixed offset year-round. India is permanently UTC+5:30 and never observes daylight saving. This is why a 'time difference' question doesn't have a single answer until you specify the date."
      ),
      {
        heading: "Time Difference From London During Different Months",
        table: {
          headers: ["City", "Winter (Nov-Mar)", "Summer (Apr-Oct)"],
          rows: [
            ["New York", "-5 hours", "-5 hours (briefly -4 in late Mar/early Nov)"],
            ["Los Angeles", "-8 hours", "-8 hours (briefly -7)"],
            ["Tokyo", "+9 hours", "+8 hours"],
            ["Sydney", "+11 hours", "+9 or +10 hours (Australia changes opposite)"],
            ["Dubai", "+4 hours", "+3 hours"],
            ["Singapore", "+8 hours", "+7 hours"],
            ["Mumbai", "+5:30 hours", "+4:30 hours"],
          ],
        },
      },
      createAnswerFirstSection(
        "Practical Uses for the Converter",
        "Scheduling international meetings is the obvious one. Less obvious: working out when a flight lands in local time, checking when a US store opens for an online drop, knowing whether it's a reasonable hour to message family abroad, or converting a webinar start time published in 'Eastern Time' into the time on your wall clock. For travel planning specifically, the [Distance Calculator](/distance-calculator) shows time-zone offset alongside flight time and great-circle distance.",
        "When co-ordinating across multiple zones, the ISO 8601 format (YYYY-MM-DD HH:MM:SS) plus an offset like '+00:00' is the safest way to write a time without ambiguity. Saying '3pm' is easy to misunderstand; '15:00 UTC+0' is not."
      ),
    ],
    faqs: [
      createFAQ(
        "Does the converter handle daylight saving time?",
        "Yes, automatically. The converter looks up each timezone's actual offset on the specific date you enter. So if you convert a 3pm London time on a date in July, it knows London is on BST (+1) and converts accordingly. If you pick a date in January, it uses GMT (+0). You don't need to think about whether the clocks have changed."
      ),
      createFAQ(
        "What's the difference between UTC and GMT?",
        "In casual use, none, both refer to the time at zero longitude. Strictly, UTC is the modern atomic-clock standard and GMT is the older astronomical version, but they're synchronised to within fractions of a second. The UK uses GMT in winter and switches to BST (British Summer Time, UTC+1) in summer. UTC is used by aviation, shipping, science and computing because it never changes."
      ),
      createFAQ(
        "Why is Australia 9 or 10 or 11 hours ahead of London?",
        "Three things stack up. First, eastern Australia (Sydney, Melbourne) is naturally UTC+10. Second, those states observe daylight saving in their summer (October to early April), shifting to UTC+11. Third, the UK observes BST in its summer (March to October), shifting London to UTC+1. So the net difference between London and Sydney runs 9 hours (UK summer, AU winter), 10 hours (when offsets line up), or 11 hours (UK winter, AU summer)."
      ),
      createFAQ(
        "Is there a single timezone for the whole of China?",
        "Yes, China Standard Time (UTC+8) covers the entire country despite spanning what would naturally be five time zones. This means sunrise in Kashgar (far western China) can be as late as 10am local time. The decision was political rather than astronomical, made in 1949."
      ),
      createFAQ(
        "How accurate is the converter?",
        "Accurate to the minute for any current or future date. Historical conversions before about 1970 may be approximate because daylight saving rules and time-zone boundaries have shifted over the decades, and the IANA timezone database (which JavaScript uses) handles the modern era reliably but has fewer rules for older periods."
      ),
    ],
    relatedTools: [
      { slug: "world-clock", label: "World Clock" },
      { slug: "distance-calculator", label: "Distance Calculator" },
      { slug: "age-calculator", label: "Age Calculator" },
    ],
  },

  "time-calculator": {
    sections: [
      createAnswerFirstSection(
        "What the Time Calculator Does",
        "Two modes. Add and subtract handles a list of time entries (hours, minutes, seconds), each with a plus or minus operator, and gives you the running total. Time between takes a start clock time and an end clock time and tells you how long elapsed, with a checkbox for cases where the period crosses midnight.",
        "Output appears in three formats simultaneously: HH:MM:SS for clock-style display, decimal hours (5h 30m becomes 5.50) for timesheets and billing, and total minutes for sports times and music durations. The result updates as you type, so there's no calculate button to press."
      ),
      createAnswerFirstSection(
        "Why Time Arithmetic Is Awkward",
        "Time doesn't add cleanly because the units are mixed bases: 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day. Adding 0:45 + 0:35 = 1:20, not 0:80. The calculator does the conversion behind the scenes by translating everything into seconds, doing the arithmetic, then converting back. This avoids the off-by-one errors that creep in when people try to add times in their head.",
        "Subtraction is where it gets really fiddly. 03:15 - 02:45 isn't '0:30 with a borrow'; you have to convert the hours into minutes first. The 'time between' mode handles this by parsing both times into total seconds since midnight, doing a straight subtraction, and adding 86,400 seconds (one full day) when the end time falls before the start time and the 'crosses midnight' option is ticked."
      ),
      {
        heading: "Common Time-Calculation Scenarios",
        table: {
          headers: ["Scenario", "Mode to use", "Tip"],
          rows: [
            ["Total hours worked across multiple shifts", "Add/subtract", "One row per shift, all with + operator"],
            ["Subtract a 30-minute lunch break", "Add/subtract", "Set the operator to - on the break row"],
            ["Time between clock-in and clock-out", "Time between", "Tick 'crosses midnight' if you finish next day"],
            ["Cumulative running time of a playlist", "Add/subtract", "Each track length as one row"],
            ["Race split times to total finish", "Add/subtract", "Use seconds field for sub-minute splits"],
            ["Total length of a podcast series", "Add/subtract", "Round to nearest minute if helpful"],
          ],
        },
      },
      createAnswerFirstSection(
        "How Decimal Hours Work for Timesheets",
        "Many billing and payroll systems expect time in decimal format rather than HH:MM. The conversion is simple: minutes divided by 60, then added to the hours. So 1 hour 30 minutes is 1.50 hours, 2 hours 15 minutes is 2.25 hours, 7 hours 45 minutes is 7.75 hours. The calculator shows both formats so you can copy whichever your system needs.",
        "Decimal hours are a hangover from accounting systems that hated mixed-base arithmetic. They've stuck around because spreadsheets handle decimal numbers easily and HH:MM badly. If you're invoicing a client at £75 per hour for 2 hours 24 minutes of work, decimal makes the maths straightforward: 2.40 × £75 = £180. The [Work Hours Calculator](/work-hours-calculator) is built specifically around decimal hours plus break deductions."
      ),
    ],
    faqs: [
      createFAQ(
        "How do I add a list of times?",
        "In Add/Subtract mode, leave each row's operator on the plus sign and fill in the hours and minutes (and seconds if needed). The total at the bottom updates as you type. Use the Add Row button if you need more than two entries. There's no upper limit; the calculator handles long lists fine."
      ),
      createFAQ(
        "Why is my result negative or zero?",
        "If you've subtracted more time than you added, the calculator clamps the result to zero rather than showing a negative time, since negative durations rarely make practical sense. If you genuinely need a negative result (for example, calculating how much you're under a target time), do the subtraction in the opposite direction and read the result as 'how much short'."
      ),
      createFAQ(
        "What does 'crosses midnight' mean in time-between mode?",
        "If your start time is, say, 22:00 and your end time is 06:00, the simple difference would be -16 hours. But if you actually mean a night shift that started at 10pm and finished at 6am the next morning, the real elapsed time is 8 hours. Tick the box and the calculator adds 24 hours to the end time before subtracting, giving the correct overnight duration."
      ),
      createFAQ(
        "Can I use this for billing in 6-minute or 15-minute increments?",
        "Yes, but you'll need to round the decimal-hours result yourself. 6-minute increments correspond to 0.1 of an hour, so round up to the nearest 0.1 (a 14-minute task becomes 0.30 hours, billed). 15-minute increments correspond to 0.25 of an hour. Some legal and consultancy timesheets use either system."
      ),
      createFAQ(
        "How does this differ from the date difference calculator?",
        "This one handles times within a single day or short totals across multiple sessions. The [Date Difference Calculator](/date-difference-calculator) handles intervals measured in days, months and years between two specific calendar dates. Use this for clocked time, that one for elapsed dates."
      ),
    ],
    relatedTools: [
      { slug: "work-hours-calculator", label: "Work Hours Calculator" },
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
      { slug: "stopwatch", label: "Online Stopwatch" },
    ],
  },

  "australia-public-holiday-planner": {
    sections: [
      createAnswerFirstSection(
        "Australian Public Holidays Vary by State",
        "Australia has eight federal public holidays (New Year's Day, Australia Day, Good Friday, Easter Monday, ANZAC Day, Christmas Day, Boxing Day, plus Easter Saturday in some states), but states add their own. WA has Western Australia Day. Victoria has Melbourne Cup Day and AFL Grand Final Eve. NSW has Bank Holiday. Queensland has Labour Day on a different date than other states.",
        "Approximately 11 public holidays per year in most states - one of the higher counts in OECD countries. Plus state-specific show days (Brisbane Ekka, Sydney Royal Easter Show, Adelaide Show) recognised regionally as public holidays in their hosting cities only. Always check your specific state's holiday calendar."
      ),
      createAnswerFirstSection(
        "Long Weekend Strategy",
        "Strategic annual leave can multiply each public holiday into 4-day weekends. Easter (Good Friday + Easter Monday) automatically creates a 4-day break. ANZAC Day (April 25) often near Easter, allowing combined breaks. Queens Birthday (June, varies by state) combined with leave creates 9-day breaks.",
        "Pattern for Australian workers: 20 annual leave days per year, often used in 2-week summer block plus 4-5 long weekends. Strategic mid-week public holidays (when bridging with annual leave) get the most stretch. The 'Christmas-New Year shutdown' between 25 December and Australia Day (26 January) often consumes 3-4 weeks of company-wide closure."
      ),
      createAnswerFirstSection(
        "Working on Public Holidays",
        "Most Australian award rates pay penalty rates for working public holidays - typically 200-250% of regular hourly rate (double-time-and-a-half). Many awards specify mandatory time-off-in-lieu plus penalty rates as alternatives. Specific rates depend on the industry award - retail, hospitality, healthcare all have detailed rules.",
        "Some industries are exempt from penalty rates (highly paid salaried positions, some professionals). Christmas Day and Easter Sunday have stricter trading hours in many states - many shops close completely. ANZAC Day morning (until noon) has limited trading in most states out of respect."
      ),
      createAnswerFirstSection(
        "Planning Around Holidays",
        "Holiday rosters in retail, hospitality, healthcare are typically requested 6-8 weeks in advance. Bookings: hotels, restaurants, attractions all surge for long weekends - book 4-8 weeks ahead for popular destinations. Air travel: domestic flights spike 30-50% during long weekend periods.",
        "School holidays don't always align with public holidays in Australia (4 separate state-based school calendars). The 'right' school holiday week to travel varies by state - check before booking. Use the [Australia Pay Calculator](/australia-pay-calculator) for budget context including penalty rate income calculations."
      ),
    ],
    faqs: [
      createFAQ(
        "When is Australia Day?",
        "January 26 every year. Date is fixed regardless of day of week. Many states observe a 'public holiday in lieu' on the following Monday if the 26th falls on weekend, with the actual celebration on the 26th itself."
      ),
      createFAQ(
        "Are public holidays paid?",
        "For permanent employees: yes, paid at ordinary rate as if you worked. For casuals: only paid if you work the holiday (at penalty rates). Part-timers: paid for hours they would normally work that day. Award conditions matter - check specific award."
      ),
      createFAQ(
        "What if a public holiday falls on a weekend?",
        "Typically a 'public holiday in lieu' observed on the following Monday. NSW, Victoria, Queensland generally observe this. Some holidays (Anzac Day) fall on a Saturday and don't always trigger a Monday observance. Check the specific year's published holidays."
      ),
      createFAQ(
        "Do banks open on public holidays?",
        "No, banks close on all federal and state public holidays. Online banking and ATMs work normally. Major holidays around Christmas/New Year see banks closed for multiple consecutive days. Plan ahead for any in-person banking needs."
      ),
    ],
    relatedTools: [
      { slug: "australia-pay-calculator", label: "Australia Pay Calculator" },
      { slug: "australia-income-tax-calculator", label: "Australia Income Tax Calculator" },
      { slug: "australia-cost-of-living-by-city", label: "Australia Cost of Living" },
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
    ],
  },

  "us-election-countdown": {
    sections: [
      createAnswerFirstSection(
        "Presidential Election Cycle",
        "US presidential elections occur every 4 years on the Tuesday after the first Monday of November. Most recent: November 5, 2024 (Trump vs Harris). Next: November 7, 2028. The 2024 election was the 60th US presidential election. Inauguration follows on January 20 of the year after the election.",
        "Beyond presidential, midterm elections occur every 2 years (next: November 3, 2026). All 435 House seats, one-third of Senate seats (Class 2 in 2026), most state governorships, and countless state and local races appear on the ballot. Off-year elections (in years not divisible by 2) handle municipal, judicial, and special elections."
      ),
      createAnswerFirstSection(
        "Key Dates Leading Up",
        "Primary elections begin in January-February of election year (Iowa caucuses traditionally first, though party rules have changed). Most primaries complete by June. Party conventions in July-August select official nominees. General election campaigning intensifies September-November. Early voting starts as early as September in some states.",
        "Election Day itself: November 5, 2024 was the most recent. The Tuesday-after-first-Monday formula: November 3, 2026 (midterms), November 7, 2028 (presidential), November 2, 2030 (midterms), November 4, 2032 (presidential). Date never falls earlier than November 2 or later than November 8."
      ),
      createAnswerFirstSection(
        "Early and Absentee Voting",
        "All 50 states offer some form of absentee voting. 47 states + DC offer in-person early voting (varying length, from a few days to 50+ days). Pennsylvania, New Hampshire, and Mississippi don't have traditional in-person early voting. About 70% of voters voted by mail or early in-person in 2020 (covid-era spike); 50% in 2024 (post-pandemic normalisation).",
        "Mail ballot deadlines vary by state. Some states require ballots received by Election Day; others count ballots postmarked by Election Day even if received later. State Secretary of State websites publish exact rules. Ballot tracking apps available in most states - track your ballot from mailing through receipt and verification."
      ),
      createAnswerFirstSection(
        "Why the Date Matters",
        "Presidential election results affect federal policy, Supreme Court appointments, regulatory direction, and US foreign policy. Markets react to expected election outcomes - currency, equities, and bonds all show election-cycle patterns. The Inauguration on January 20 (post-1933) is when policy shifts begin formally.",
        "Midterm elections often result in Congressional shifts that constrain or enable presidential policy. The 'midterm penalty' (incumbent president's party usually loses seats) has held in most cycles. State governorships are increasingly tied to abortion access, voting rules, and other policy areas where state action matters most. Use the [Date Difference Calculator](/date-difference-calculator) for general date math."
      ),
    ],
    faqs: [
      createFAQ(
        "When is the next presidential election?",
        "November 7, 2028. Standard 4-year cycle. Inauguration would be January 20, 2029. Midterm elections are November 3, 2026."
      ),
      createFAQ(
        "Why is Election Day always on a Tuesday?",
        "1845 federal law set the date. Reasoning: gave farmers travel time after Sunday worship before Wednesday market days. Tuesday after first Monday avoids November 1 (All Saints' Day) and November 2 (All Souls' Day) coinciding with Election Day."
      ),
      createFAQ(
        "Can I vote on the day if I haven't registered?",
        "Depends on state. 22 states + DC offer Election Day voter registration (same-day registration). Most other states require pre-registration 15-30 days before. Some states allow exceptional same-day registration with documentation. Check your state's Secretary of State website."
      ),
      createFAQ(
        "What about the Electoral College?",
        "Presidential elections use the Electoral College - 538 electors, 270 to win. Each state's electors equal Senators (2) + Representatives (varies by population). Electors meet in mid-December to officially vote. Their votes are counted by Congress on January 6 of the following year."
      ),
    ],
    relatedTools: [
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
      { slug: "us-income-tax-calculator", label: "US Income Tax Calculator" },
      { slug: "us-cost-of-living-comparison", label: "US Cost of Living Comparison" },
      { slug: "us-state-tax-comparison", label: "US State Tax Comparison" },
    ],
  },

  "hours-to-minutes": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Hours to Minutes",
        "1 hour = 60 minutes. Multiply hours by 60 to get minutes. So 2.5 hours × 60 = 150 minutes. The cleanest possible time conversion - exactly 60 minutes per hour, no decimals or rounding involved.",
        "Useful for project planning, time-tracking, and converting between work timesheet formats. A 7.5-hour workday = 450 minutes. A 40-hour work week = 2,400 minutes. An 8-hour overnight sleep = 480 minutes. Cooking timers and exercise routines often quoted in minutes; converting from hours simplifies planning."
      ),
      {
        heading: "Common Hours to Minutes",
        table: {
          headers: ["Hours", "Minutes"],
          rows: [
            ["0.25 hr (15 min)", "15 min"],
            ["0.5 hr", "30 min"],
            ["1 hr", "60 min"],
            ["1.5 hr", "90 min"],
            ["2 hr", "120 min"],
            ["3 hr", "180 min"],
            ["8 hr", "480 min"],
            ["24 hr", "1440 min"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I handle decimal hours like 1.75 hours?",
        "Multiply by 60. 1.75 × 60 = 105 minutes (1 hour 45 minutes). Decimal hours often appear in time-tracking software; converting to minutes makes them more readable."
      ),
      createFAQ(
        "What about 0.6 hours?",
        "0.6 × 60 = 36 minutes. So 0.6 hours = 36 minutes. Time-tracking systems commonly show '1.6 hours' meaning 1 hour 36 minutes - knowing this conversion lets you read decimal time correctly."
      ),
    ],
    relatedTools: [
      { slug: "minutes-to-hours", label: "Minutes to Hours" },
      { slug: "days-to-hours", label: "Days to Hours" },
      { slug: "hours-to-days", label: "Hours to Days" },
    ],
  },

  "minutes-to-hours": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Minutes to Hours",
        "60 minutes = 1 hour. Divide minutes by 60 to get hours. So 90 minutes ÷ 60 = 1.5 hours. For values that don't divide evenly, the remainder gives leftover minutes: 100 min ÷ 60 = 1 hr 40 min.",
        "Common for time tracking, exercise/workout durations, and meeting scheduling. A 90-minute meeting = 1.5 hours billable. A 240-minute movie = 4 hours. The conversion comes up when consolidating time entries from minute-based logs to hour-based timesheets."
      ),
      {
        heading: "Common Minutes to Hours",
        table: {
          headers: ["Minutes", "Hours (decimal)", "Hours and Minutes"],
          rows: [
            ["15 min", "0.25 hr", "0 hr 15 min"],
            ["30 min", "0.5 hr", "0 hr 30 min"],
            ["45 min", "0.75 hr", "0 hr 45 min"],
            ["60 min", "1 hr", "1 hr 0 min"],
            ["90 min", "1.5 hr", "1 hr 30 min"],
            ["120 min", "2 hr", "2 hr 0 min"],
            ["180 min", "3 hr", "3 hr 0 min"],
            ["480 min", "8 hr", "8 hr 0 min"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I express 100 minutes as hours?",
        "Two ways: as decimal hours (100/60 = 1.67 hr) or as hours and minutes (1 hr 40 min). Time-tracking software often uses decimal; calendars and scheduling use hours-and-minutes format."
      ),
      createFAQ(
        "What's a useful conversion for meeting planning?",
        "60-minute meetings = 1 hr (good standard length). 90-minute meetings = 1.5 hr (deep dives). 30-minute meetings = 0.5 hr (quick updates). Most calendars default to 30 or 60 minute slots; longer meetings should be deliberately sized."
      ),
    ],
    relatedTools: [
      { slug: "hours-to-minutes", label: "Hours to Minutes" },
      { slug: "hours-to-days", label: "Hours to Days" },
      { slug: "days-to-hours", label: "Days to Hours" },
    ],
  },

  "days-to-hours": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Days to Hours",
        "1 day = 24 hours. Multiply days by 24 to get hours. So 7 days × 24 = 168 hours. The conversion assumes a standard 24-hour day; adjusts in special cases like daylight saving time transitions where a calendar day is 23 or 25 hours.",
        "Used for project deadlines, deployment timelines, and travel duration calculations. A weeklong holiday = 168 hours. A 30-day month = 720 hours. Cloud computing uptime SLAs measured in hours per month - 99.9% uptime allows 43.8 minutes of downtime per month (720 hours × 0.001)."
      ),
      {
        heading: "Common Days to Hours",
        table: {
          headers: ["Days", "Hours"],
          rows: [
            ["1 day", "24 hr"],
            ["2 days", "48 hr"],
            ["3 days", "72 hr"],
            ["7 days (1 week)", "168 hr"],
            ["14 days (2 weeks)", "336 hr"],
            ["30 days (1 month)", "720 hr"],
            ["90 days (3 mo)", "2160 hr"],
            ["365 days (1 yr)", "8760 hr"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are months always 720 hours?",
        "No - depends on month length. 28-day February = 672 hr, 30-day month = 720 hr, 31-day month = 744 hr. For SLA contracts and billing periods, use the actual days in the month."
      ),
      createFAQ(
        "How many hours in a year?",
        "365 × 24 = 8,760 hours per non-leap year. Leap year: 366 × 24 = 8,784 hours. Useful for annual capacity planning, energy bills, or anything billed by hours over a yearly period."
      ),
    ],
    relatedTools: [
      { slug: "hours-to-days", label: "Hours to Days" },
      { slug: "weeks-to-days", label: "Weeks to Days" },
      { slug: "days-to-weeks", label: "Days to Weeks" },
    ],
  },

  "hours-to-days": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Hours to Days",
        "24 hours = 1 day. Divide hours by 24 to get days. So 168 hours ÷ 24 = 7 days. For values that don't divide evenly: 100 hours = 4 days 4 hours.",
        "Common in project planning - scoping hours of work into calendar days. A 200-hour project = 8.33 days of full-time work, but realistically 25-40 calendar days when accounting for meetings, breaks, and dependencies. SLA measurements sometimes report uptime in hours per month, which converts to days for executive summaries."
      ),
      {
        heading: "Common Hours to Days",
        table: {
          headers: ["Hours", "Days"],
          rows: [
            ["8 hr", "0.33 day"],
            ["24 hr", "1 day"],
            ["48 hr", "2 days"],
            ["72 hr", "3 days"],
            ["100 hr", "4.17 days"],
            ["168 hr", "7 days"],
            ["336 hr", "14 days"],
            ["720 hr", "30 days"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many work days in 100 hours?",
        "Roughly 12.5 work days at 8 hours/day, or 13.3 days at 7.5 hours/day (UK with lunch deducted). For project estimation, double the work-hour-to-calendar-day estimate to account for meetings, context-switching, and unexpected delays."
      ),
      createFAQ(
        "Are SLA hours business hours or 24/7?",
        "Depends on the contract. 'Business hours' SLAs typically count 9am-5pm Monday-Friday (40 hours/week). '24/7' SLAs count all 168 hours/week. Always confirm the SLA reference period before assuming."
      ),
    ],
    relatedTools: [
      { slug: "days-to-hours", label: "Days to Hours" },
      { slug: "minutes-to-hours", label: "Minutes to Hours" },
      { slug: "weeks-to-days", label: "Weeks to Days" },
    ],
  },

  "weeks-to-days": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Weeks to Days",
        "1 week = 7 days. Multiply weeks by 7 to get days. So 4 weeks × 7 = 28 days. The 7-day week is standardised globally despite different cultural starting days (Monday in most of Europe; Sunday in US).",
        "Useful for project timelines, due dates, and pregnancy/medical tracking. A 2-week sprint = 14 days. A 6-week course = 42 days. Pregnancy is measured in weeks (40 weeks = 280 days from LMP, though actual gestation is 38 weeks/266 days from conception). UK statutory holidays often quoted in weeks (28 days = 4 weeks for full-time)."
      ),
      {
        heading: "Common Weeks to Days",
        table: {
          headers: ["Weeks", "Days"],
          rows: [
            ["1 week", "7 days"],
            ["2 weeks", "14 days"],
            ["4 weeks", "28 days"],
            ["6 weeks", "42 days"],
            ["8 weeks", "56 days"],
            ["12 weeks (1 quarter)", "84 days"],
            ["26 weeks", "182 days"],
            ["52 weeks (1 year)", "364 days"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is 52 weeks 364 days, not 365?",
        "52 × 7 = 364, but a year is 365 days (or 366 in leap years). The extra day is why your week-day birthday shifts forward by 1 each year (or 2 days after a leap year). 52 weeks = 364 days; 1 year ≈ 52 weeks + 1 day."
      ),
      createFAQ(
        "How many weeks in a typical month?",
        "Approximately 4.33 weeks per average month (30.44 days / 7). Calendar months range 4-5 weeks: 28-day February = exactly 4 weeks; 30-day month = 4 weeks + 2 days; 31-day month = 4 weeks + 3 days. Pay periods for biweekly schedules use 26 paychecks/year (52 ÷ 2)."
      ),
    ],
    relatedTools: [
      { slug: "days-to-weeks", label: "Days to Weeks" },
      { slug: "days-to-hours", label: "Days to Hours" },
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
    ],
  },

  "days-to-weeks": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Days to Weeks",
        "7 days = 1 week. Divide days by 7 to get weeks. So 28 days ÷ 7 = 4 weeks. For values not divisible by 7, the remainder gives leftover days: 30 days = 4 weeks 2 days. The 7-day week is universal globally.",
        "Useful for time-frame estimation. A 30-day project = roughly 4.3 weeks. A 90-day quarter = 12.86 weeks. Annual leave allowance in UK: 28 days = 4 weeks for full-time employees. Statutory employment law often quoted in weeks (12 weeks parental leave = 84 days)."
      ),
      {
        heading: "Common Days to Weeks",
        table: {
          headers: ["Days", "Weeks (decimal)", "Weeks and Days"],
          rows: [
            ["7 days", "1 week", "1 week"],
            ["14 days", "2 weeks", "2 weeks"],
            ["21 days", "3 weeks", "3 weeks"],
            ["28 days", "4 weeks", "4 weeks"],
            ["30 days", "4.29 weeks", "4 weeks 2 days"],
            ["60 days", "8.57 weeks", "8 weeks 4 days"],
            ["90 days", "12.86 weeks", "12 weeks 6 days"],
            ["365 days", "52.14 weeks", "52 weeks 1 day"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many weeks is 6 months?",
        "About 26 weeks (181 days, or 184 if including 31-day months). Six calendar months ranges from 181-184 days depending on which months. For pregnancy tracking, '6 months' is approximately 26 weeks (out of 40 total weeks)."
      ),
      createFAQ(
        "What's a 'business week'?",
        "5 working days (Mon-Fri) = 1 business week. Excludes weekends and public holidays. UK: 252 working days/year typically. US: 250 (including 10 federal holidays). Business-week metrics matter for SLAs and project planning more than calendar weeks."
      ),
    ],
    relatedTools: [
      { slug: "weeks-to-days", label: "Weeks to Days" },
      { slug: "hours-to-days", label: "Hours to Days" },
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
    ],
  },

  "days-until-calculator": {
    sections: [
      createAnswerFirstSection(
        "Counting Days Until a Date",
        "Subtract today's date from the target date in days. Days until Christmas (December 25): if today is October 30, that's 56 days. Most date calculators handle this automatically and account for leap years, month-length variation, and time zones.",
        "Used for event countdowns: weddings, holidays, exams, deadlines, retirement dates. A common psychological trick - putting a number on a future event makes it feel concrete. People often plan more effectively when they can see '90 days to launch' rather than 'about 3 months'."
      ),
      {
        heading: "Common Days-Until Calculations",
        table: {
          headers: ["Target", "From January 1", "From July 1"],
          rows: [
            ["Valentine's Day (Feb 14)", "44 days", "228 days"],
            ["Mother's Day UK (Mar)", "~75 days", "~250 days"],
            ["Easter (variable)", "~80-110 days", "~250-285 days"],
            ["Summer (June 21)", "171 days", "-10 days"],
            ["Halloween (Oct 31)", "303 days", "122 days"],
            ["Christmas (Dec 25)", "358 days", "177 days"],
            ["New Year's Day", "0 days", "184 days"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Does the calculator account for leap years?",
        "Yes - any decent date calculator adjusts for the 366-day leap year (every 4 years, except century years not divisible by 400). The next leap years: 2024, 2028, 2032. The extra February 29 affects day counts that span across the date."
      ),
      createFAQ(
        "What about time zones?",
        "Most online calculators assume your local time zone or UTC. For international scheduling (event countdowns spanning time zones), be specific about the target's location. A 'New Year's Eve countdown' is meaningful only in your local time."
      ),
    ],
    relatedTools: [
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
      { slug: "weeks-to-days", label: "Weeks to Days" },
      { slug: "holiday-countdown-generator", label: "Holiday Countdown Generator" },
    ],
  },

  "unix-timestamp-converter": {
    sections: [
      createAnswerFirstSection(
        "What's a Unix Timestamp?",
        "A Unix timestamp is the number of seconds elapsed since January 1, 1970 00:00:00 UTC (the 'epoch'). So '1700000000' = November 14, 2023, 22:13:20 UTC. Used universally in computing for date storage, log files, database timestamps, and time arithmetic.",
        "Convert a timestamp to readable date by adding it as seconds to the epoch. A 32-bit Unix timestamp can represent dates up to January 19, 2038 (the 'Year 2038 problem'). Modern systems use 64-bit timestamps avoiding this. Most programming languages have built-in functions: Date(timestamp * 1000) in JavaScript (which uses milliseconds), datetime.fromtimestamp() in Python."
      ),
      {
        heading: "Common Unix Timestamps",
        table: {
          headers: ["Date/Time UTC", "Unix Timestamp"],
          rows: [
            ["Jan 1, 1970 00:00", "0"],
            ["Jan 1, 2000 00:00", "946684800"],
            ["Jan 1, 2020 00:00", "1577836800"],
            ["Jan 1, 2024 00:00", "1704067200"],
            ["Jan 1, 2025 00:00", "1735689600"],
            ["Jan 19, 2038", "2147483647 (32-bit max)"],
            ["1 day in seconds", "86400"],
            ["1 year (~)", "31536000"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does Unix start from 1970?",
        "Arbitrary choice by Unix designers in early 1970s. They needed a reference point; January 1, 1970 was rounded up from the Unix system creation date. The epoch has stuck for 50+ years and is now embedded in countless systems."
      ),
      createFAQ(
        "What's the Year 2038 problem?",
        "32-bit signed integer Unix timestamps overflow at 2,147,483,647 seconds = January 19, 2038. After that, the value wraps to a negative number, breaking 32-bit systems. Fix: 64-bit timestamps (handles dates billions of years out). Modern systems (Linux, macOS) already use 64-bit; some embedded systems still vulnerable."
      ),
    ],
    relatedTools: [
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
      { slug: "days-until-calculator", label: "Days Until Calculator" },
      { slug: "hex-to-decimal", label: "Hex to Decimal" },
    ],
  },
};
