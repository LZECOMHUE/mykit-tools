'use client';

import { useState, useMemo } from 'react';

const gradeScale = {
  'a-plus': { letter: 'A+', min: 97, max: 100, value: 4.0, color: 'from-green-500 to-green-600' },
  'a': { letter: 'A', min: 90, max: 96, value: 4.0, color: 'from-green-500 to-green-600' },
  'a-minus': { letter: 'A-', min: 87, max: 89, value: 3.7, color: 'from-green-400 to-green-500' },
  'b-plus': { letter: 'B+', min: 84, max: 86, value: 3.3, color: 'from-blue-400 to-blue-500' },
  'b': { letter: 'B', min: 80, max: 83, value: 3.0, color: 'from-blue-400 to-blue-500' },
  'b-minus': { letter: 'B-', min: 77, max: 79, value: 2.7, color: 'from-blue-300 to-blue-400' },
  'c-plus': { letter: 'C+', min: 74, max: 76, value: 2.3, color: 'from-yellow-400 to-yellow-500' },
  'c': { letter: 'C', min: 70, max: 73, value: 2.0, color: 'from-yellow-400 to-yellow-500' },
  'c-minus': { letter: 'C-', min: 67, max: 69, value: 1.7, color: 'from-yellow-300 to-yellow-400' },
  'd-plus': { letter: 'D+', min: 64, max: 66, value: 1.3, color: 'from-orange-400 to-orange-500' },
  'd': { letter: 'D', min: 60, max: 63, value: 1.0, color: 'from-orange-400 to-orange-500' },
  'f': { letter: 'F', min: 0, max: 59, value: 0.0, color: 'from-red-500 to-red-600' },
};

const getGradeFromPercentage = (percentage) => {
  const p = parseFloat(percentage) || 0;
  for (const [key, grade] of Object.entries(gradeScale)) {
    if (p >= grade.min && p <= grade.max) {
      return grade;
    }
  }
  return gradeScale['f'];
};

export default function USSchoolGradeCalculator() {
  const [inputMode, setInputMode] = useState('percentage'); // 'percentage' or 'points'
  const [score, setScore] = useState('87');
  const [maxPoints, setMaxPoints] = useState('100');
  const [courses, setCourses] = useState([
    { id: 1, name: 'Math', percentage: 92, weight: 1 },
    { id: 2, name: 'English', percentage: 85, weight: 1 },
  ]);
  const [useWeighting, setUseWeighting] = useState(false);

  // Single grade conversion
  const singleGrade = useMemo(() => {
    if (inputMode === 'percentage') {
      return getGradeFromPercentage(score);
    } else {
      const points = parseFloat(score) || 0;
      const max = parseFloat(maxPoints) || 100;
      const percentage = (points / max) * 100;
      return getGradeFromPercentage(percentage);
    }
  }, [score, maxPoints, inputMode]);

  // GPA Calculation
  const gpaResult = useMemo(() => {
    if (courses.length === 0) return { gpa: 0, scale: 4.0 };

    let totalPoints = 0;
    let totalWeight = 0;

    courses.forEach((course) => {
      const grade = getGradeFromPercentage(course.percentage);
      const weight = useWeighting ? course.weight : 1;
      totalPoints += grade.value * weight;
      totalWeight += weight;
    });

    const gpa = totalWeight > 0 ? totalPoints / totalWeight : 0;
    return { gpa: gpa.toFixed(2), scale: 4.0 };
  }, [courses, useWeighting]);

  const handleAddCourse = () => {
    const newId = Math.max(...courses.map(c => c.id), 0) + 1;
    setCourses([...courses, { id: newId, name: 'New Course', percentage: 90, weight: 1 }]);
  };

  const handleRemoveCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleCourseChange = (id, field, value) => {
    setCourses(courses.map(c =>
      c.id === id ? { ...c, [field]: field === 'name' ? value : parseFloat(value) || 0 } : c
    ));
  };

  return (
    <div className="bg-surface rounded-lg p-4 space-y-4">
      {/* Single Grade Converter */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Single Grade Converter
        </h3>

        {/* Input Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setInputMode('percentage')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              inputMode === 'percentage'
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-text-primary'
            }`}
          >
            Percentage
          </button>
          <button
            onClick={() => setInputMode('points')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              inputMode === 'points'
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-text-primary'
            }`}
          >
            Points
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {inputMode === 'percentage' ? (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Percentage Score
              </label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Points Earned
                </label>
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Total Possible Points
                </label>
                <input
                  type="number"
                  value={maxPoints}
                  onChange={(e) => setMaxPoints(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>
            </>
          )}
        </div>

        {/* Grade Display */}
        <div className={`bg-gradient-to-r ${singleGrade.color} rounded-lg text-white p-4`}>
          <div className="text-sm opacity-90 mb-1">Letter Grade</div>
          <div className="text-5xl font-bold">{singleGrade.letter}</div>
          <div className="text-sm opacity-90 mt-3">
            GPA Value: {singleGrade.value.toFixed(1)} / 4.0
          </div>
        </div>

        {/* Grade Scale Reference */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-text-primary mb-3">US Grade Scale</h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {Object.entries(gradeScale).map(([key, grade]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-text-secondary">
                  {grade.letter}: {grade.min} - {grade.max}%
                </span>
                <span className="font-mono font-bold text-text-primary">
                  {grade.value.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GPA Calculator */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-text-primary text-lg">
            GPA Calculator
          </h3>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useWeighting}
              onChange={(e) => setUseWeighting(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-text-secondary">Weighted GPA</span>
          </label>
        </div>

        {/* Courses List */}
        <div className="space-y-3 mb-4">
          {courses.map((course) => {
            const grade = getGradeFromPercentage(course.percentage);
            return (
              <div
                key={course.id}
                className="border border-border rounded-lg p-4 space-y-3"
              >
                <div className="grid md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                    placeholder="Course name"
                    className="px-3 py-2 border border-border rounded focus:outline-none focus:border-accent text-sm"
                  />
                  <div>
                    <input
                      type="number"
                      value={course.percentage}
                      onChange={(e) => handleCourseChange(course.id, 'percentage', e.target.value)}
                      min="0"
                      max="100"
                      placeholder="Percentage"
                      className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                  {useWeighting && (
                    <input
                      type="number"
                      value={course.weight}
                      onChange={(e) => handleCourseChange(course.id, 'weight', e.target.value)}
                      min="0"
                      step="0.5"
                      placeholder="Weight"
                      className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:border-accent text-sm"
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <div className={`bg-gradient-to-r ${grade.color} text-white px-3 py-2 rounded font-bold text-sm`}>
                      {grade.letter}
                    </div>
                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded font-medium text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleAddCourse}
          className="w-full px-4 py-2 border-2 border-dashed border-accent text-accent rounded-lg hover:bg-accent/5 font-medium mb-4"
        >
          + Add Course
        </button>

        {/* GPA Display */}
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <div className="text-sm text-accent mb-1">Cumulative GPA</div>
          <div className="text-5xl font-mono font-bold text-accent">
            {gpaResult.gpa}
          </div>
          <div className="text-sm text-text-secondary mt-2">
            / {gpaResult.scale.toFixed(1)}
          </div>
        </div>
      </div>

      {/* GPA Interpretation */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-3">GPA Benchmarks</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { gpa: '3.9 - 4.0', label: 'Excellent - Top universities' },
            { gpa: '3.7 - 3.9', label: 'Very Good - Selective universities' },
            { gpa: '3.5 - 3.7', label: 'Good - Many universities' },
            { gpa: '3.0 - 3.5', label: 'Above Average - Regional universities' },
            { gpa: '2.5 - 3.0', label: 'Average - Community college + universities' },
            { gpa: 'Below 2.5', label: 'Below Average - May affect admissions' },
          ].map((item) => (
            <div key={item.gpa} className="bg-white border border-border rounded p-2">
              <span className="font-mono font-bold text-accent">{item.gpa}</span>
              <div className="text-xs text-text-secondary">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
