'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getBurnsNightDate(year) {
  return new Date(year, 0, 25);
}

export default function WhenIsBurnsNight() {
  return (
    <WhenIsTemplate
      name="Burns Night"
      getDate={getBurnsNightDate}
      description="Burns Night is celebrated on 25 January in Scotland to honour the life and works of Scottish poet Robert Burns. The celebration includes a traditional Burns Supper with haggis, whisky, and poetry recitations. Burns Night is deeply rooted in Scottish culture and traditions, celebrating Scottish heritage, language, and identity. It is the most important date in the Scottish calendar after Christmas and Hogmanay."
      traditions={[
        'Hosting Burns Supper with traditional Scottish food',
        'Serving haggis as the main course',
        'Reciting "Address to a Haggis" by Burns',
        'Toasting with Scottish whisky',
        'Reading poems and works by Robert Burns',
        'Wearing tartan clothing',
        'Scottish dancing (ceilidh)',
        'Singing "Auld Lang Syne"',
      ]}
      funFacts={[
        'Robert Burns (1759-1796) is Scotland\'s national poet',
        'Burns Night is celebrated by Scots worldwide',
        'The traditional Burns Supper format dates back to 1801',
        'Haggis is a traditional Scottish dish served at Burns Night',
        '"Auld Lang Syne," written by Burns, is sung at New Year celebrations worldwide',
      ]}
      relatedSlugs={['new-year-countdown', 'scottish-culture-tools']}
    />
  );
}
