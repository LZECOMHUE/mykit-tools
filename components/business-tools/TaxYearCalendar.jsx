'use client';

const TaxYearCalendar = () => {
  const taxYearEvents = [
    { date: '2026-04-06', title: 'Tax Year 2026/27 Begins', type: 'start' },
    { date: '2026-07-31', title: 'Quarter 1 Payment on Account (if applicable)', type: 'payment' },
    { date: '2026-10-31', title: 'Quarter 2 Payment on Account', type: 'payment' },
    { date: '2026-01-31', title: 'Quarter 3 Payment on Account', type: 'payment' },
    { date: '2026-01-31', title: 'Self Assessment Tax Return Deadline (Online)', type: 'deadline' },
    { date: '2026-02-14', title: 'Payment of Final Tax Due', type: 'payment' },
    { date: '2026-04-05', title: 'Tax Year 2026/27 Ends', type: 'end' },
  ];

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          UK Tax Year 2026/27 Key Dates
        </h3>

        <div className="space-y-3">
          {taxYearEvents.map((event, idx) => {
            const eventDate = new Date(event.date);
            const color = {
              start: 'border-accent',
              end: 'border-error',
              deadline: 'border-warning',
              payment: 'border-success',
            }[event.type];

            const bgColor = {
              start: 'bg-blue-100',
              end: 'bg-red-100',
              deadline: 'bg-orange-100',
              payment: 'bg-green-100',
            }[event.type];

            return (
              <div
                key={idx}
                className={`border-l-4 ${color} ${bgColor} rounded-[var(--radius-input)] p-4`}
              >
                <p className="text-sm text-text-muted">
                  {eventDate.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="font-medium text-text-primary">{event.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Important Deadlines
        </h3>

        <div className="space-y-3">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="font-medium text-text-primary mb-1">P60 Deadline</p>
            <p className="text-sm text-text-secondary">31 May 2026 (employers must issue P60s)</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="font-medium text-text-primary mb-1">P11D Deadline</p>
            <p className="text-sm text-text-secondary">6 July 2026 (benefits-in-kind forms)</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="font-medium text-text-primary mb-1">Dividend Tax Return</p>
            <p className="text-sm text-text-secondary">31 January 2027 (self assessment)</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        All dates are for the UK. Tax year runs from 6 April to 5 April. Check HMRC for official dates and any changes.
      </p>
    </div>
  );
};

export default TaxYearCalendar;
