'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getClocksGoForwardDate(year) {
  const march = new Date(year, 2, 1);
  let dayOfWeek = march.getDay();
  const daysUntilSunday = (0 - dayOfWeek + 7) % 7;
  const firstSunday = new Date(year, 2, 1 + daysUntilSunday);
  const lastSunday = new Date(firstSunday);
  while (lastSunday.getMonth() === 2) {
    const nextSunday = new Date(lastSunday);
    nextSunday.setDate(nextSunday.getDate() + 7);
    if (nextSunday.getMonth() === 2) {
      lastSunday.setDate(nextSunday.getDate());
    } else {
      break;
    }
  }
  return lastSunday;
}

export default function WhenDoClocksGoForward() {
  return (
    <WhenIsTemplate
      name="Clocks Go Forward"
      getDate={getClocksGoForwardDate}
      description="In the UK, clocks go forward one hour on the last Sunday in March, marking the start of British Summer Time. This transition from Greenwich Mean Time (GMT) to British Summer Time (BST) extends daylight into the evening. The change happens at 1 AM, when clocks jump forward to 2 AM. This adjustment helps make better use of daylight hours and is observed across most of Europe."
      traditions={[
        'Setting clocks forward one hour before bedtime on Saturday night',
        'Losing one hour of sleep on the night of the change',
        'Enjoying longer evenings from the following day',
        'Adjusting schedules and routines',
        'Updating all clocks and devices',
        'Changing car dashboard clocks',
        'Informing children about the time change',
        'Adjusting heating and lighting schedules',
      ]}
      funFacts={[
        'Clocks go forward at 1 AM, jumping to 2 AM',
        'British Summer Time gives an extra hour of daylight in the evening',
        'The clock change is also observed across Europe on the same day',
        'Daylight Saving Time was originally introduced during World War I to save fuel',
        'Some argue that clock changes are unnecessary in modern times',
      ]}
      relatedSlugs={['clocks-go-back-countdown', 'summer-equinox-countdown']}
    />
  );
}
