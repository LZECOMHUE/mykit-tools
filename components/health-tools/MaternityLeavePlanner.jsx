'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function MaternityLeavePlanner() {
  const [dueDate, setDueDate] = useState('');
  const [employmentStart, setEmploymentStart] = useState('');
  const [weeklyEarnings, setWeeklyEarnings] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [results, setResults] = useState(null);

  const SMP_RATE_2025_26 = 184.03; // Current statutory maternity pay rate per week
  const SMP_RATE_PERCENT = 0.9; // 90% pay for first 6 weeks

  const calculateMaternity = () => {
    if (!dueDate || !employmentStart || !weeklyEarnings) {
      alert('Please fill in all required fields');
      return;
    }

    const due = new Date(dueDate);
    const empStart = new Date(employmentStart);
    const earnings = parseFloat(weeklyEarnings);

    if (isNaN(due) || isNaN(empStart) || isNaN(earnings) || earnings <= 0) {
      alert('Please enter valid dates and earnings');
      return;
    }

    // Check 26-week employment requirement
    const twentySixWeeksAgo = new Date(due);
    twentySixWeeksAgo.setDate(twentySixWeeksAgo.getDate() - 182);
    const meetsEmploymentReq = empStart <= twentySixWeeksAgo;

    // Earliest leave start: 11 weeks before due date
    const earliestLeaveStart = new Date(due);
    earliestLeaveStart.setDate(earliestLeaveStart.getDate() - 77);

    // Latest practical leave start: due date
    const latestLeaveStart = new Date(due);

    // MATB1 form deadline: must notify employer by end of 15th week of pregnancy
    // 15 weeks before due date = 105 days
    const matb1Deadline = new Date(due);
    matb1Deadline.setDate(matb1Deadline.getDate() - 105);

    // Notification deadline: 28 days before intended leave start
    const userLeaveStart = leaveStartDate ? new Date(leaveStartDate) : due;
    const notificationDeadline = new Date(userLeaveStart);
    notificationDeadline.setDate(notificationDeadline.getDate() - 28);

    // Standard maternity leave: 52 weeks from start date
    const leaveEndDate = new Date(userLeaveStart);
    leaveEndDate.setDate(leaveEndDate.getDate() + 364); // 52 weeks

    // SMP: 39 weeks (6 weeks at 90%, 33 weeks at statutory rate)
    const smpEndDate = new Date(userLeaveStart);
    smpEndDate.setDate(smpEndDate.getDate() + 273); // 39 weeks

    // Calculate SMP amounts
    const smpWeek1to6Amount = earnings * SMP_RATE_PERCENT;
    const smpWeek7to39Amount = SMP_RATE_2025_26;
    const totalSmpWeek1to6 = smpWeek1to6Amount * 6;
    const totalSmpWeek7to39 = smpWeek7to39Amount * 33;
    const totalSmp = totalSmpWeek1to6 + totalSmpWeek7to39;

    // Average weekly SMP payment
    const averageWeeklySmp = totalSmp / 39;

    // Return to work date
    const returnToWorkDate = new Date(leaveEndDate);
    returnToWorkDate.setDate(returnToWorkDate.getDate() + 1);

    setResults({
      meetsEmploymentReq,
      earliestLeaveStart,
      latestLeaveStart: due,
      userLeaveStart,
      notificationDeadline,
      matb1Deadline,
      leaveEndDate,
      smpEndDate,
      returnToWorkDate,
      smpWeek1to6Amount: smpWeek1to6Amount.toFixed(2),
      smpWeek7to39Amount: smpWeek7to39Amount.toFixed(2),
      totalSmpWeek1to6: totalSmpWeek1to6.toFixed(2),
      totalSmpWeek7to39: totalSmpWeek7to39.toFixed(2),
      totalSmp: totalSmp.toFixed(2),
      averageWeeklySmp: averageWeeklySmp.toFixed(2),
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysUntil = (futureDate) => {
    const today = new Date();
    const diff = Math.ceil((futureDate - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return `${Math.abs(diff)} days ago`;
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `in ${diff} days`;
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <p className="text-secondary text-sm mb-2">
            UK Statutory Maternity Allowance Calculator. Based on 2025-26 rates.
          </p>

          <div>
            <Input
              type="date"
              label="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              type="date"
              label="Employment Start Date"
              value={employmentStart}
              onChange={(e) => setEmploymentStart(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              type="number"
              label="Weekly Earnings (£)"
              value={weeklyEarnings}
              onChange={(e) => setWeeklyEarnings(e.target.value)}
              placeholder="e.g. 500"
              required
            />
          </div>

          <div>
            <Input
              type="date"
              label="Planned Leave Start Date (optional)"
              value={leaveStartDate}
              onChange={(e) => setLeaveStartDate(e.target.value)}
            />
            <p className="text-secondary text-xs mt-2">
              Leave earliest from 11 weeks before due date. If blank, assumes due date.
            </p>
          </div>

          <Button onClick={calculateMaternity} className="w-full">
            Calculate Maternity Leave
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          {!results.meetsEmploymentReq && (
            <Card className="bg-red-50 border border-red-200">
              <Badge>Important</Badge>
              <p className="text-secondary text-sm mt-2">
                You may not meet the 26-week continuous employment requirement for Statutory Maternity Pay. You may be eligible for Maternity Allowance instead. Speak to your HR department.
              </p>
            </Card>
          )}

          <Card>
            <div className="space-y-5">
              <div>
                <p className="text-secondary text-xs font-semibold mb-1">PLANNED LEAVE START</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.userLeaveStart)}
                </p>
                <p className="text-secondary text-sm mt-2">{getDaysUntil(results.userLeaveStart)}</p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-xs font-semibold mb-1">NOTIFICATION DEADLINE</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.notificationDeadline)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  Notify employer 28 days before leave start
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-xs font-semibold mb-1">MATB1 FORM DEADLINE</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.matb1Deadline)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  Deadline to submit pregnancy certificate to employer (by end of 15th week of pregnancy)
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-heading font-bold mb-4">Statutory Maternity Pay</h3>
            <div className="space-y-4">
              <div className="bg-surface p-3 rounded">
                <p className="text-secondary text-xs font-semibold mb-2">WEEKS 1-6 (90% of earnings)</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  £{results.smpWeek1to6Amount} per week
                </p>
                <p className="text-secondary text-sm mt-1">Total: £{results.totalSmpWeek1to6}</p>
              </div>

              <div className="bg-surface p-3 rounded">
                <p className="text-secondary text-xs font-semibold mb-2">WEEKS 7-39 (Statutory rate)</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  £{results.smpWeek7to39Amount} per week
                </p>
                <p className="text-secondary text-sm mt-1">Total: £{results.totalSmpWeek7to39}</p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-xs font-semibold mb-2">TOTAL SMP (39 weeks)</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{results.totalSmp}
                </p>
                <p className="text-secondary text-sm mt-2">
                  Average weekly payment: £{results.averageWeeklySmp}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-heading font-bold mb-4">Leave Timeline</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-24 text-center">
                  <p className="text-secondary text-xs font-semibold mb-1">WEEK</p>
                  <p className="font-mono font-bold text-primary">1-6</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary">SMP at 90% of earnings</p>
                  <p className="text-secondary text-sm">£{results.smpWeek1to6Amount}/week</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-24 text-center">
                  <p className="text-secondary text-xs font-semibold mb-1">WEEK</p>
                  <p className="font-mono font-bold text-primary">7-39</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary">SMP at statutory rate</p>
                  <p className="text-secondary text-sm">£{results.smpWeek7to39Amount}/week</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-24 text-center">
                  <p className="text-secondary text-xs font-semibold mb-1">WEEK</p>
                  <p className="font-mono font-bold text-primary">40-52</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary">Unpaid leave</p>
                  <p className="text-secondary text-sm">No income (Additional Paternity Leave available)</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-3">
              <div>
                <p className="text-secondary text-xs font-semibold mb-1">EXPECTED RETURN TO WORK</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.returnToWorkDate)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  End of 52-week maternity leave. You can return earlier if agreed with employer.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Card className="bg-blue-50 border border-blue-200">
        <p className="text-secondary text-sm space-y-2">
          <p>
            <span className="font-semibold text-primary">Entitlements summary:</span>
          </p>
          <ul className="text-secondary text-sm space-y-1 ml-4">
            <li>- Statutory Maternity Leave: up to 52 weeks (26 weeks if statutory mat pay available)</li>
            <li>- Statutory Maternity Pay: 39 weeks (6 weeks at 90%, 33 weeks at statutory rate)</li>
            <li>- 11 weeks' notice period before taking leave</li>
            <li>- Must inform employer of pregnancy by end of 15th week (MATB1 form)</li>
            <li>- Job protection for 26 weeks maternity leave</li>
          </ul>
        </p>
      </Card>

      <Card className="bg-blue-50 border border-blue-200">
        <Badge>Disclaimer</Badge>
        <p className="text-secondary text-sm mt-2">
          This tool is for informational purposes only and should not replace professional medical advice.
          Always consult your healthcare provider for medical decisions. For specific HR/employment questions, contact your employer or ACAS.
        </p>
      </Card>
    </div>
  );
}
