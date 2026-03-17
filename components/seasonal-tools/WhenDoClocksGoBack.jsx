'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getClocksGoBackDate(year) {
  const october = new Date(year, 9, 1);
  let dayOfWeek = october.getDay();
  const daysUntilSunday = (0 - dayOfWeek + 7) % 7;
  const firstSunday = new Date(year, 9, 1 + daysUntilSunday);
  const lastSunday = new Date(firstSunday);
  while (lastSunday.getMonth() === 9) {
    const nextSunday = new Date(lastSunday);
    nextSunday.setDate(nextSunday.getDate() + 7);
    if (nextSunday.getMonth() === 9) {
      lastSunday.setDate(nextSunday.getDate());
    } else {
      break;
    }
  }
  return lastSunday;
}

export default function WhenDoClocksGoBack() {
  return (
    <WhenIsTemplate
      name="Clocks Go Back"
      getDate={getClocksGoBackDate}
      description="In the UK, clocks go back one hour on the last Sunday in October, marking the end of British Summer Time and the return to Greenwich Mean Time. This transition reduces daylight in the evening but extends it in the morning. The change happens at 2 AM, when clocks go back to 1 AM. This adjustment aligns the UK with standard time and is observed across most of Europe."
      traditions={[
        'Setting clocks back one hour before bedtime on Saturday night',
        'Gaining an extra hour of sleep on the night of the change',
        'Noticing darker evenings from the following day',
        'Adjusting schedules and routines',
        'Updating all clocks and devices',
        'Changing car dashboard clocks',
        'Adjusting heating systems for the winter season',
        'Preparing for the darker winter months',
      ]}
      funFacts={[
        'Clocks go back at 2 AM, reverting to 1 AM',
        'The change marks the official end of British Summer Time',
        'The clock change is observed across Europe on the same day',
        'Daylight Saving Time transitions have been used since World War I',
        'The time change affects sleep patterns and daily routines temporarily',
      ]}
      relatedSlugs={['clocks-go-forward-countdown', 'winter-solstice-countdown']}
    />
  );
}
