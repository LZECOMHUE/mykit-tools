'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function PregnancyMilestoneCalendar() {
  const [inputType, setInputType] = useState('lmp');
  const [date, setDate] = useState('');
  const [results, setResults] = useState(null);

  const milestones = {
    4: {
      week: 4,
      trimester: 1,
      title: 'Embryo Development Begins',
      babyDev: 'Blastocyst implanting in uterus. Placenta and amniotic sac forming.',
      motherSymp: 'May notice no symptoms yet. Some experience light spotting.',
      appointments: 'First GP appointment if you have confirmed pregnancy.',
    },
    8: {
      week: 8,
      trimester: 1,
      title: 'Heartbeat Visible',
      babyDev: 'Heartbeat can now be seen on ultrasound. Basic facial features forming. Fingers and toes emerging.',
      motherSymp: 'Nausea and fatigue often peak. Breast tenderness increases.',
      appointments: 'Dating scan offered. 8-12 week scan to confirm due date.',
    },
    12: {
      week: 12,
      trimester: 1,
      title: 'End of First Trimester',
      babyDev: 'All major organs formed. 6cm long. Facial features distinct. Baby can swallow.',
      motherSymp: 'Energy levels may start improving. Morning sickness may ease.',
      appointments: 'Nuchal translucency scan. Full antenatal screening offered.',
    },
    16: {
      week: 16,
      trimester: 2,
      title: 'Movement May Be Felt',
      babyDev: 'Sex of baby usually determinable. Bones hardening. Growth accelerating.',
      motherSymp: 'Energy levels return. Appetite increases. May feel first flutters of movement.',
      appointments: 'Second GP check-up. Blood pressure monitoring.',
    },
    20: {
      week: 20,
      trimester: 2,
      title: 'Anatomy Scan',
      babyDev: 'All organs present. Eyelids still closed. Head hair beginning. Baby 25cm long.',
      motherSymp: 'More visible bump. Regular movements. May experience back pain.',
      appointments: 'Detailed anatomy scan. Checks all organs and measurements.',
    },
    24: {
      week: 24,
      trimester: 2,
      title: 'Viability Point',
      babyDev: 'Lungs developing. Eyes partially open. Baby 30cm long, weighs 500g. Rapid growth.',
      motherSymp: 'Increased appetite. Sleep position becoming important. May have Braxton Hicks contractions.',
      appointments: 'Glucose tolerance test offered. Growth monitoring begins.',
    },
    28: {
      week: 28,
      trimester: 3,
      title: 'Third Trimester Begins',
      babyDev: 'Lungs becoming functional. Can blink. Eyes open and close. Baby 35cm long.',
      motherSymp: 'Shortness of breath common. Swelling of feet and ankles. Increased need to urinate.',
      appointments: 'Full blood count. Blood pressure and urine checks.',
    },
    32: {
      week: 32,
      trimester: 3,
      title: 'Baby Positioning Matters',
      babyDev: 'Baby settles into head-down position. Toenails form. Baby 42cm long.',
      motherSymp: 'Heavier belly. Sleep disturbances. Practice contractions increase.',
      appointments: 'Growth scan offered. Position assessment begins.',
    },
    36: {
      week: 36,
      trimester: 3,
      title: 'Full Term Approaching',
      babyDev: 'Baby can suck thumb. Head engages into pelvis. Baby 45cm long, ready for delivery.',
      motherSymp: 'Increased back pain. Pelvic pressure. May lose mucus plug.',
      appointments: 'Weekly check-ups begin. Internal examination to assess cervix.',
    },
    40: {
      week: 40,
      trimester: 3,
      title: 'Due Date',
      babyDev: 'Baby fully mature. 50cm long. Ready for birth.',
      motherSymp: 'Waiting for labour. May have show or Braxton Hicks.',
      appointments: 'Continued monitoring. Labour may begin spontaneously.',
    },
  };

  const calculateMilestones = () => {
    if (!date) return;

    const baseDate = new Date(date);
    if (isNaN(baseDate)) return;

    let lmpDate;
    if (inputType === 'lmp') {
      lmpDate = new Date(baseDate);
    } else {
      lmpDate = new Date(baseDate);
      lmpDate.setDate(lmpDate.getDate() - 280);
    }

    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);

    const today = new Date();
    const weeksPregnant = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));

    const calendarData = [];
    for (let week = 4; week <= 40; week += 4) {
      const milestoneDate = new Date(lmpDate);
      milestoneDate.setDate(milestoneDate.getDate() + week * 7);

      calendarData.push({
        ...milestones[week],
        date: milestoneDate,
        isPast: week <= weeksPregnant,
      });
    }

    setResults({
      lmpDate,
      dueDate,
      weeksPregnant,
      calendarData,
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

  const getTrimesterColor = (trimester) => {
    if (trimester === 1) return 'bg-blue-50 border-blue-200';
    if (trimester === 2) return 'bg-green-50 border-green-200';
    return 'bg-purple-50 border-purple-200';
  };

  const getTrimesterLabel = (trimester) => {
    if (trimester === 1) return '1st Trimester';
    if (trimester === 2) return '2nd Trimester';
    return '3rd Trimester';
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div>
            <Select
              label="Calculate From"
              options={[
                { value: 'lmp', label: 'Last Menstrual Period (LMP)' },
                { value: 'duedate', label: 'Due Date' },
              ]}
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            />
          </div>

          <div>
            <Input
              type="date"
              label={inputType === 'lmp' ? 'Last Menstrual Period Date' : 'Due Date'}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Button onClick={calculateMilestones} className="w-full">
            Generate Milestone Calendar
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <div className="space-y-3">
              <div>
                <p className="text-secondary text-xs font-semibold mb-1">DUE DATE</p>
                <p className="font-mono text-lg font-bold text-primary">
                  {formatDate(results.dueDate)}
                </p>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-secondary text-xs font-semibold mb-1">CURRENTLY</p>
                <p className="font-mono text-lg font-bold text-primary">
                  {results.weeksPregnant} weeks pregnant
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {results.calendarData.map((milestone) => (
              <Card
                key={milestone.week}
                className={`${getTrimesterColor(milestone.trimester)} border ${
                  milestone.isPast ? 'opacity-60' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-secondary mb-1">WEEK {milestone.week}</p>
                      <p className="font-heading text-lg font-bold text-primary">
                        {milestone.title}
                      </p>
                      <p className="text-secondary text-xs mt-1">
                        {formatDate(milestone.date)}
                      </p>
                    </div>
                    <Badge variant={milestone.isPast ? 'default' : 'success'}>
                      {getTrimesterLabel(milestone.trimester)}
                    </Badge>
                  </div>

                  <div className="border-t border-current border-opacity-20 pt-3">
                    <p className="text-secondary text-xs font-semibold mb-1">BABY DEVELOPMENT</p>
                    <p className="text-secondary text-sm">{milestone.babyDev}</p>
                  </div>

                  <div className="border-t border-current border-opacity-20 pt-3">
                    <p className="text-secondary text-xs font-semibold mb-1">WHAT YOU MAY FEEL</p>
                    <p className="text-secondary text-sm">{milestone.motherSymp}</p>
                  </div>

                  <div className="border-t border-current border-opacity-20 pt-3">
                    <p className="text-secondary text-xs font-semibold mb-1">APPOINTMENTS</p>
                    <p className="text-secondary text-sm">{milestone.appointments}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border border-blue-200">
            <h3 className="font-heading font-bold mb-2">Key Appointment Summary</h3>
            <ul className="text-secondary text-sm space-y-2">
              <li><span className="font-semibold">Week 8-12:</span> Dating scan and antenatal screening</li>
              <li><span className="font-semibold">Week 16:</span> Second GP check-up and blood pressure monitoring</li>
              <li><span className="font-semibold">Week 20:</span> Detailed anatomy scan (all organs checked)</li>
              <li><span className="font-semibold">Week 24-28:</span> Glucose tolerance test and growth monitoring</li>
              <li><span className="font-semibold">Week 32+:</span> Growth scans and position assessment</li>
              <li><span className="font-semibold">Week 36+:</span> Weekly check-ups and labour preparation</li>
            </ul>
          </Card>
        </div>
      )}

      <Card className="bg-blue-50 border border-blue-200">
        <Badge>Disclaimer</Badge>
        <p className="text-secondary text-sm mt-2">
          This tool is for informational purposes only and should not replace professional medical advice.
          Always consult your healthcare provider for medical decisions.
        </p>
      </Card>
    </div>
  );
}
