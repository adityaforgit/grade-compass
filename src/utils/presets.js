/**
 * Presets and sample student scenarios for instant demonstration
 */

export const CALCULATOR_PRESETS = [
  {
    id: 'aiming_o_theory',
    title: "Targeting 'O' Grade in Theory",
    subtitle: 'High internal score (25/30) aiming for 90+ overall',
    courseType: 'THEORY',
    internalScore: 25,
    targetGrade: 'O',
    rawScores: {
      classTests: [22, 24],
      testSelection: 'avg',
      continuousAssessment: 60,
      scalingMethod: 'balanced',
    },
  },
  {
    id: 'pass_anxiety_relief',
    title: 'Passing Threshold (Anxiety Relief)',
    subtitle: 'Modest internal score (15/30) checking exact passing requirement',
    courseType: 'THEORY',
    internalScore: 15,
    targetGrade: 'D / P',
    rawScores: {
      classTests: [12, 14],
      testSelection: 'avg',
      continuousAssessment: 38,
      scalingMethod: 'balanced',
    },
  },
  {
    id: 'aiming_a_theory',
    title: "Securing 'A' Grade (70+ marks)",
    subtitle: 'Average internal score (20/30) planning final exam strategy',
    courseType: 'THEORY',
    internalScore: 20,
    targetGrade: 'A',
    rawScores: {
      classTests: [18, 19],
      testSelection: 'avg',
      continuousAssessment: 52,
      scalingMethod: 'balanced',
    },
  },
  {
    id: 'practical_lab_target',
    title: 'Practical / Lab Exam Target',
    subtitle: '40-mark internal + 60-mark final viva/practical exam',
    courseType: 'PRACTICAL',
    internalScore: 34,
    targetGrade: 'E',
    rawScores: {
      labPerformance: 52,
      labViva: 34,
    },
  },
]

export const DEFAULT_SEMESTER_SUBJECTS = [
  {
    id: 'sub-1',
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    type: 'THEORY',
    credits: 4,
    internalMarks: 24,
    targetGrade: 'O',
  },
  {
    id: 'sub-2',
    name: 'Computer Architecture & Org',
    code: 'CS302',
    type: 'THEORY',
    credits: 4,
    internalMarks: 21,
    targetGrade: 'E',
  },
  {
    id: 'sub-3',
    name: 'Discrete Mathematics',
    code: 'M301',
    type: 'THEORY',
    credits: 3,
    internalMarks: 19,
    targetGrade: 'A',
  },
  {
    id: 'sub-4',
    name: 'Digital Logic & System Design',
    code: 'EC301',
    type: 'THEORY',
    credits: 3,
    internalMarks: 22,
    targetGrade: 'A',
  },
  {
    id: 'sub-5',
    name: 'Data Structures Lab',
    code: 'CS391',
    type: 'PRACTICAL',
    credits: 1.5,
    internalMarks: 36,
    targetGrade: 'O',
  },
  {
    id: 'sub-6',
    name: 'Digital Electronics Lab',
    code: 'EC391',
    type: 'PRACTICAL',
    credits: 1.5,
    internalMarks: 35,
    targetGrade: 'E',
  },
]

