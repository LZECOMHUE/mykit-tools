'use client';
import { useState, useMemo } from 'react';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const MONTHS = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' },
];

const LATITUDES = [
  { value: 'N60', label: 'Northern 60° (Iceland, Norway)' },
  { value: 'N50', label: 'Northern 50° (UK, Canada)' },
  { value: 'N40', label: 'Northern 40° (New York, Beijing)' },
  { value: 'N30', label: 'Northern 30° (Cairo, Saudi Arabia)' },
  { value: 'N20', label: 'Northern 20° (Mexico City, India)' },
  { value: 'N10', label: 'Northern 10° (West Africa, Caribbean)' },
  { value: 'EQ', label: 'Equator (Kenya, Brazil, Indonesia)' },
  { value: 'S10', label: 'Southern 10° (Northern Australia)' },
  { value: 'S20', label: 'Southern 20° (Southern Australia, South Africa)' },
  { value: 'S30', label: 'Southern 30° (Sydney, South Africa)' },
  { value: 'S40', label: 'Southern 40° (New Zealand, Argentina)' },
  { value: 'S50', label: 'Southern 50° (Tasmania, South America)' },
  { value: 'S60', label: 'Southern 60° (Antarctica)' },
];

const SUNRISE_SUNSET_DATA = {
  N60: {
    January: { sunrise: '09:47', sunset: '14:31', dayLength: 4.7, golden: '09:20-10:20, 13:00-14:30' },
    February: { sunrise: '08:18', sunset: '16:20', dayLength: 8.1, golden: '07:30-09:30, 15:00-17:00' },
    March: { sunrise: '06:35', sunset: '18:15', dayLength: 11.7, golden: '05:30-07:30, 17:00-19:15' },
    April: { sunrise: '04:43', sunset: '20:22', dayLength: 15.6, golden: '03:00-05:30, 20:00-22:15' },
    May: { sunrise: '02:51', sunset: '22:11', dayLength: 19.3, golden: '00:30-04:00, 21:00-23:59' },
    June: { sunrise: '00:00', sunset: '24:00', dayLength: 24.0, golden: 'Midnight sun' },
    July: { sunrise: '00:00', sunset: '24:00', dayLength: 24.0, golden: 'Midnight sun' },
    August: { sunrise: '02:33', sunset: '21:58', dayLength: 19.4, golden: '00:00-04:00, 20:00-23:59' },
    September: { sunrise: '04:25', sunset: '20:09', dayLength: 15.7, golden: '03:00-05:30, 19:00-21:15' },
    October: { sunrise: '06:17', sunset: '17:57', dayLength: 11.7, golden: '05:15-07:30, 16:30-19:00' },
    November: { sunrise: '08:10', sunset: '15:31', dayLength: 7.4, golden: '07:30-09:15, 14:30-16:15' },
    December: { sunrise: '09:44', sunset: '14:07', dayLength: 4.4, golden: '09:00-10:30, 13:00-14:45' },
  },
  N50: {
    January: { sunrise: '07:52', sunset: '16:52', dayLength: 9.0, golden: '07:15-08:45, 15:45-17:30' },
    February: { sunrise: '07:24', sunset: '17:43', dayLength: 10.3, golden: '06:45-08:15, 16:45-18:15' },
    March: { sunrise: '06:30', sunset: '18:44', dayLength: 12.2, golden: '05:45-07:15, 17:45-19:30' },
    April: { sunrise: '05:17', sunset: '19:47', dayLength: 14.5, golden: '04:15-06:00, 19:00-20:45' },
    May: { sunrise: '04:15', sunset: '20:47', dayLength: 16.5, golden: '03:00-05:00, 20:00-21:45' },
    June: { sunrise: '03:49', sunset: '21:16', dayLength: 17.5, golden: '02:45-04:45, 20:15-22:00' },
    July: { sunrise: '04:04', sunset: '21:11', dayLength: 17.1, golden: '03:00-05:00, 20:15-21:45' },
    August: { sunrise: '04:47', sunset: '20:35', dayLength: 15.8, golden: '03:45-05:30, 19:30-21:15' },
    September: { sunrise: '05:43', sunset: '19:30', dayLength: 13.8, golden: '04:45-06:15, 18:30-20:15' },
    October: { sunrise: '06:48', sunset: '18:18', dayLength: 11.5, golden: '06:00-07:30, 17:15-19:15' },
    November: { sunrise: '07:53', sunset: '16:51', dayLength: 9.0, golden: '07:15-08:45, 15:45-17:30' },
    December: { sunrise: '08:20', sunset: '16:07', dayLength: 7.8, golden: '07:45-09:00, 15:15-16:45' },
  },
  N40: {
    January: { sunrise: '07:18', sunset: '17:28', dayLength: 10.2, golden: '06:45-08:00, 16:45-18:00' },
    February: { sunrise: '07:06', sunset: '18:00', dayLength: 10.9, golden: '06:30-07:45, 17:15-18:30' },
    March: { sunrise: '06:25', sunset: '18:47', dayLength: 12.4, golden: '05:45-07:00, 17:45-19:15' },
    April: { sunrise: '05:31', sunset: '19:42', dayLength: 14.2, golden: '04:45-06:00, 18:45-20:15' },
    May: { sunrise: '04:54', sunset: '20:36', dayLength: 15.7, golden: '04:00-05:15, 19:45-21:15' },
    June: { sunrise: '04:38', sunset: '21:00', dayLength: 16.4, golden: '03:45-05:00, 20:00-21:45' },
    July: { sunrise: '04:56', sunset: '20:50', dayLength: 15.9, golden: '04:00-05:15, 19:45-21:15' },
    August: { sunrise: '05:28', sunset: '20:16', dayLength: 14.8, golden: '04:45-06:00, 19:15-20:45' },
    September: { sunrise: '06:09', sunset: '19:19', dayLength: 13.2, golden: '05:30-06:45, 18:30-19:45' },
    October: { sunrise: '07:00', sunset: '18:19', dayLength: 11.3, golden: '06:15-07:30, 17:30-18:45' },
    November: { sunrise: '07:37', sunset: '17:15', dayLength: 9.6, golden: '07:00-08:15, 16:15-17:45' },
    December: { sunrise: '07:53', sunset: '17:00', dayLength: 9.1, golden: '07:15-08:30, 15:45-17:15' },
  },
  N30: {
    January: { sunrise: '06:54', sunset: '17:48', dayLength: 10.9, golden: '06:15-07:30, 16:45-18:15' },
    February: { sunrise: '06:46', sunset: '18:10', dayLength: 11.4, golden: '06:00-07:30, 17:15-18:45' },
    March: { sunrise: '06:13', sunset: '18:47', dayLength: 12.6, golden: '05:30-06:45, 17:45-19:15' },
    April: { sunrise: '05:25', sunset: '19:32', dayLength: 14.1, golden: '04:30-06:00, 18:45-20:00' },
    May: { sunrise: '04:52', sunset: '20:12', dayLength: 15.3, golden: '03:45-05:15, 19:30-21:00' },
    June: { sunrise: '04:41', sunset: '20:30', dayLength: 15.8, golden: '03:30-05:00, 19:45-21:15' },
    July: { sunrise: '05:00', sunset: '20:23', dayLength: 15.4, golden: '04:00-05:30, 19:30-21:00' },
    August: { sunrise: '05:26', sunset: '19:53', dayLength: 14.5, golden: '04:30-06:00, 18:45-20:15' },
    September: { sunrise: '05:58', sunset: '19:08', dayLength: 13.2, golden: '05:15-06:45, 18:15-19:45' },
    October: { sunrise: '06:45', sunset: '18:18', dayLength: 11.5, golden: '06:00-07:30, 17:15-18:45' },
    November: { sunrise: '07:18', sunset: '17:26', dayLength: 10.1, golden: '06:45-08:00, 16:15-17:45' },
    December: { sunrise: '07:21', sunset: '17:22', dayLength: 10.0, golden: '06:45-08:00, 16:15-17:45' },
  },
  N20: {
    January: { sunrise: '06:39', sunset: '18:02', dayLength: 11.4, golden: '05:50-07:30, 17:00-18:45' },
    February: { sunrise: '06:35', sunset: '18:14', dayLength: 11.7, golden: '05:45-07:30, 17:15-18:45' },
    March: { sunrise: '06:06', sunset: '18:36', dayLength: 12.5, golden: '05:15-07:00, 17:45-19:15' },
    April: { sunrise: '05:21', sunset: '19:05', dayLength: 13.7, golden: '04:15-06:00, 18:15-19:45' },
    May: { sunrise: '04:52', sunset: '19:35', dayLength: 14.7, golden: '03:45-05:30, 18:45-20:15' },
    June: { sunrise: '04:48', sunset: '19:48', dayLength: 15.0, golden: '03:30-05:15, 19:00-20:30' },
    July: { sunrise: '05:07', sunset: '19:39', dayLength: 14.5, golden: '04:00-05:45, 18:45-20:15' },
    August: { sunrise: '05:23', sunset: '19:20', dayLength: 14.0, golden: '04:15-06:00, 18:30-20:00' },
    September: { sunrise: '05:45', sunset: '18:46', dayLength: 13.0, golden: '04:45-06:30, 17:45-19:15' },
    October: { sunrise: '06:20', sunset: '18:10', dayLength: 11.8, golden: '05:30-07:15, 17:00-18:45' },
    November: { sunrise: '06:51', sunset: '17:45', dayLength: 10.9, golden: '06:00-07:45, 16:45-18:15' },
    December: { sunrise: '07:03', sunset: '17:41', dayLength: 10.6, golden: '06:15-08:00, 16:30-18:15' },
  },
  N10: {
    January: { sunrise: '06:31', sunset: '18:15', dayLength: 11.7, golden: '05:30-07:15, 17:30-19:00' },
    February: { sunrise: '06:29', sunset: '18:20', dayLength: 11.8, golden: '05:30-07:15, 17:30-19:00' },
    March: { sunrise: '06:05', sunset: '18:28', dayLength: 12.4, golden: '05:00-06:45, 17:45-19:15' },
    April: { sunrise: '05:27', sunset: '18:41', dayLength: 13.2, golden: '04:15-06:00, 18:00-19:30' },
    May: { sunrise: '05:05', sunset: '18:59', dayLength: 13.9, golden: '03:45-05:30, 18:15-19:45' },
    June: { sunrise: '05:02', sunset: '19:08', dayLength: 14.1, golden: '03:45-05:15, 18:30-20:00' },
    July: { sunrise: '05:20', sunset: '19:02', dayLength: 13.7, golden: '04:00-05:45, 18:15-19:45' },
    August: { sunrise: '05:32', sunset: '18:47', dayLength: 13.3, golden: '04:15-06:00, 18:00-19:30' },
    September: { sunrise: '05:42', sunset: '18:22', dayLength: 12.7, golden: '04:30-06:15, 17:45-19:15' },
    October: { sunrise: '06:07', sunset: '18:03', dayLength: 12.0, golden: '05:00-07:00, 17:15-18:45' },
    November: { sunrise: '06:32', sunset: '17:53', dayLength: 11.3, golden: '05:30-07:15, 17:00-18:45' },
    December: { sunrise: '06:43', sunset: '18:02', dayLength: 11.3, golden: '05:45-07:15, 17:15-18:45' },
  },
  EQ: {
    January: { sunrise: '06:17', sunset: '18:30', dayLength: 12.2, golden: '05:15-07:00, 17:45-19:15' },
    February: { sunrise: '06:17', sunset: '18:29', dayLength: 12.2, golden: '05:15-07:00, 17:45-19:15' },
    March: { sunrise: '06:14', sunset: '18:22', dayLength: 12.1, golden: '05:15-07:00, 17:45-19:15' },
    April: { sunrise: '06:09', sunset: '18:15', dayLength: 12.1, golden: '05:00-06:45, 17:30-19:00' },
    May: { sunrise: '06:07', sunset: '18:13', dayLength: 12.1, golden: '05:00-06:45, 17:30-19:00' },
    June: { sunrise: '06:10', sunset: '18:19', dayLength: 12.1, golden: '05:00-06:45, 17:30-19:00' },
    July: { sunrise: '06:17', sunset: '18:28', dayLength: 12.2, golden: '05:15-07:00, 17:45-19:15' },
    August: { sunrise: '06:22', sunset: '18:32', dayLength: 12.2, golden: '05:15-07:00, 17:45-19:15' },
    September: { sunrise: '06:20', sunset: '18:25', dayLength: 12.1, golden: '05:15-07:00, 17:45-19:15' },
    October: { sunrise: '06:14', sunset: '18:17', dayLength: 12.1, golden: '05:15-07:00, 17:30-19:00' },
    November: { sunrise: '06:12', sunset: '18:18', dayLength: 12.1, golden: '05:15-07:00, 17:30-19:00' },
    December: { sunrise: '06:17', sunset: '18:31', dayLength: 12.2, golden: '05:15-07:00, 17:45-19:15' },
  },
  S30: {
    January: { sunrise: '04:43', sunset: '19:24', dayLength: 14.7, golden: '03:45-05:30, 18:45-20:15' },
    February: { sunrise: '05:07', sunset: '19:05', dayLength: 14.0, golden: '04:15-06:00, 18:15-20:00' },
    March: { sunrise: '05:39', sunset: '18:29', dayLength: 12.8, golden: '04:45-06:30, 17:30-19:15' },
    April: { sunrise: '06:26', sunset: '17:43', dayLength: 11.3, golden: '05:30-07:15, 16:45-18:15' },
    May: { sunrise: '07:03', sunset: '17:09', dayLength: 10.1, golden: '06:15-07:45, 16:15-17:45' },
    June: { sunrise: '07:24', sunset: '16:54', dayLength: 9.5, golden: '06:45-08:00, 15:45-17:15' },
    July: { sunrise: '07:18', sunset: '17:05', dayLength: 9.8, golden: '06:30-07:45, 16:15-17:45' },
    August: { sunrise: '06:47', sunset: '17:42', dayLength: 10.9, golden: '05:45-07:30, 16:45-18:15' },
    September: { sunrise: '06:04', sunset: '18:25', dayLength: 12.4, golden: '05:00-06:45, 17:30-19:15' },
    October: { sunrise: '05:17', sunset: '19:09', dayLength: 13.9, golden: '04:15-06:00, 18:15-20:00' },
    November: { sunrise: '04:37', sunset: '19:47', dayLength: 15.2, golden: '03:30-05:30, 19:00-20:45' },
    December: { sunrise: '04:26', sunset: '20:01', dayLength: 15.6, golden: '03:15-05:15, 19:15-21:00' },
  },
};

export default function SunriseSunsetCalculator() {
  const [month, setMonth] = useState(5);
  const [latitude, setLatitude] = useState('N50');

  const monthName = MONTHS[month].label;
  const data = SUNRISE_SUNSET_DATA[latitude]?.[monthName] || {
    sunrise: '--:--',
    sunset: '--:--',
    dayLength: 0,
    golden: 'N/A',
  };

  const dayLengthHours = Math.floor(data.dayLength);
  const dayLengthMinutes = Math.round((data.dayLength % 1) * 60);

  return (
    <div className="space-y-4">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Month
          </label>
          <Select
            value={String(month)}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            options={MONTHS.map((m) => ({ value: String(m.value), label: m.label }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Latitude Region
          </label>
          <Select
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            options={LATITUDES}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Sunrise</p>
            <p className="font-mono text-3xl font-bold text-accent">
              {data.sunrise}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Sunset</p>
            <p className="font-mono text-3xl font-bold text-accent">
              {data.sunset}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-text-secondary">Day Length</p>
            <p className="font-mono text-2xl font-bold text-text-primary mt-1">
              {dayLengthHours}h {dayLengthMinutes}m
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">Golden Hour (approx.)</p>
          <p className="font-mono text-sm font-semibold text-text-primary mt-2 break-words">
            {data.golden === 'Midnight sun'
              ? '🌅 ' + data.golden
              : data.golden}
          </p>
          <p className="text-xs text-text-muted mt-3">
            Golden hour is the time shortly after sunrise or before sunset when sunlight is softer and
            warmer, ideal for photography and outdoor activities.
          </p>
        </div>
      </Card>

      <Card>
        <p className="text-xs text-text-muted">
          Times shown are approximate and based on standard day-of-month calculations. Actual times vary
          slightly depending on exact location within the latitude band and time zone.
        </p>
      </Card>
    </div>
  );
}
