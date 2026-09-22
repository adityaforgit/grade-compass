/**
 * GradeCompass Core Calculation Engine
 * Handles normalization, reverse-engineering target scores, feasibility status, and SGPA calculation.
 */

export const COURSE_TYPES = {
  THEORY: {
    id: 'THEORY',
    label: 'Theory Course',
    maxInternal: 30,
    maxFinal: 70,
    totalMarks: 100,
    minTotalPassing: 40,
    examName: 'End-Sem Theory Exam',
    internalName: 'Continuous Evaluation & Class Tests',
  },
  PRACTICAL: {
    id: 'PRACTICAL',
    label: 'Practical / Lab Course',
    maxInternal: 40,
    maxFinal: 60,
    totalMarks: 100,
    minTotalPassing: 40,
    examName: 'End-Sem Practical / Viva Exam',
    internalName: 'Continuous Lab & Viva Evaluation',
  },
}

export const OFFICIAL_GRADE_SCALE = [
  { grade: 'O', scoreRange: '100 to 90', points: 10 },
  { grade: 'E', scoreRange: '89 to 80', points: 9 },
  { grade: 'A', scoreRange: '79 to 70', points: 8 },
  { grade: 'B', scoreRange: '69 to 60', points: 7 },
  { grade: 'C', scoreRange: '59 to 50', points: 6 },
  { grade: 'D', scoreRange: '49 to 40', points: 5 },
  { grade: 'F', scoreRange: 'Below 40', points: 2 },
]

export const LETTER_GRADES = [
  {
    grade: 'O',
    label: 'Outstanding',
    cutoff: 90,
    scoreRange: '100 to 90',
    gradePoint: 10,
    color: 'emerald',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    ringClass: 'ring-emerald-500',
    textClass: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    grade: 'E',
    label: 'Excellent',
    cutoff: 80,
    scoreRange: '89 to 80',
    gradePoint: 9,
    color: 'teal',
    badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300 border-teal-300 dark:border-teal-800',
    ringClass: 'ring-teal-500',
    textClass: 'text-teal-600 dark:text-teal-400',
  },
  {
    grade: 'A',
    label: 'Very Good',
    cutoff: 70,
    scoreRange: '79 to 70',
    gradePoint: 8,
    color: 'blue',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    ringClass: 'ring-blue-500',
    textClass: 'text-blue-600 dark:text-blue-400',
  },
  {
    grade: 'B',
    label: 'Good',
    cutoff: 60,
    scoreRange: '69 to 60',
    gradePoint: 7,
    color: 'purple',
    badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    ringClass: 'ring-purple-500',
    textClass: 'text-purple-600 dark:text-purple-400',
  },
  {
    grade: 'C',
    label: 'Fair',
    cutoff: 50,
    scoreRange: '59 to 50',
    gradePoint: 6,
    color: 'amber',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    ringClass: 'ring-amber-500',
    textClass: 'text-amber-600 dark:text-amber-400',
  },
  {
    grade: 'D',
    label: 'Below Average',
    cutoff: 40,
    scoreRange: '49 to 40',
    gradePoint: 5,
    color: 'rose',
    badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    ringClass: 'ring-rose-500',
    textClass: 'text-rose-600 dark:text-rose-400',
  },
]

/**
 * Returns letter grade information for a given total score out of 100
 */
export function getGradeForTotal(totalScore) {
  const rounded = Math.round(Number(totalScore) * 10) / 10
  for (const item of LETTER_GRADES) {
    if (rounded >= item.cutoff) {
      return item
    }
  }
  return {
    grade: 'F',
    label: 'Failed',
    cutoff: 0,
    scoreRange: 'Below 40',
    gradePoint: 2,
    color: 'red',
    badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    ringClass: 'ring-rose-500',
    textClass: 'text-rose-600 dark:text-rose-400',
  }
}

/**
 * Calculates Theory Internal Marks based on official MAKAUT formula:
 * Step 1: CA Average = (CA1 + CA2) / 2 (out of 25)
 * Step 2: CA Marks = CA Average * 10 / 25 = (CA1 + CA2) / 5 (out of 10)
 * Step 3: ECA Marks = ECA * 10 / 70 = ECA / 7 (out of 10)
 * Step 4: WCA Marks = WCA (already out of 10)
 * Total: Internal = ((CA1 + CA2) / 5) + (ECA / 7) + WCA (Maximum 30 marks)
 */
export function calculateTheoryInternal({ ca1 = 0, ca2 = 0, wca = 0, eca = 0 }) {
  const numCA1 = Math.max(0, Math.min(25, Number(ca1) || 0))
  const numCA2 = Math.max(0, Math.min(25, Number(ca2) || 0))
  const numWCA = Math.max(0, Math.min(10, Number(wca) || 0))
  const numECA = Math.max(0, Math.min(70, Number(eca) || 0))

  const caAvg = (numCA1 + numCA2) / 2
  const caMarks = (numCA1 + numCA2) / 5
  const ecaMarks = numECA / 7
  const wcaMarks = numWCA

  const rawTotal = caMarks + ecaMarks + wcaMarks
  const totalInternal = Math.min(30, rawTotal)

  return {
    numCA1,
    numCA2,
    numWCA,
    numECA,
    caAvg: Math.round(caAvg * 100) / 100,
    caMarks: Math.round(caMarks * 100) / 100,
    ecaMarks: Math.round(ecaMarks * 100) / 100,
    wcaMarks: Math.round(wcaMarks * 100) / 100,
    totalInternal: Math.round(totalInternal * 100) / 100,
    totalInternalFormatted: totalInternal.toFixed(1),
  }
}

/**
 * Normalizes Theory raw scores (Class Tests + Continuous Assessment) to 30 marks
 * @param {Object} rawScores
 * @param {Array<number>} rawScores.classTests - array of test scores (each out of 25)
 * @param {string} rawScores.testSelection - 'avg' or 'best2' or 'best1'
 * @param {number} rawScores.continuousAssessment - continuous assessment score (out of 70)
 * @param {string} rawScores.scalingMethod - 'balanced' (15+15) or 'proportional' ((CT+CA)/95 * 30)
 */
export function normalizeTheoryInternal(rawScores) {
  const tests = (rawScores.classTests || []).map((t) => Math.max(0, Math.min(25, Number(t) || 0)))
  let effectiveTestScore = 0

  if (tests.length > 0) {
    if (rawScores.testSelection === 'best1') {
      effectiveTestScore = Math.max(...tests)
    } else if (rawScores.testSelection === 'best2') {
      const sorted = [...tests].sort((a, b) => b - a)
      const top2 = sorted.slice(0, 2)
      effectiveTestScore = top2.reduce((a, b) => a + b, 0) / Math.max(top2.length, 1)
    } else {
      // Default: Average of all taken tests
      effectiveTestScore = tests.reduce((a, b) => a + b, 0) / tests.length
    }
  }

  const mockScore = Math.max(0, Math.min(70, Number(rawScores.continuousAssessment ?? rawScores.mockTest) || 0))
  const wholeSemScore = Number(rawScores.wholeSemCA !== undefined ? rawScores.wholeSemCA : 10)

  // MAKAUT 3-Part Evaluation Model:
  // Part A: Class Tests (CA1 & CA2 average out of 25) -> converted to 10 marks
  const classTestContribution = (effectiveTestScore / 25) * 10
  // Part B: Pre-Exam Mock Test (written mock test out of 70 marks) -> converted to 10 marks
  const caContribution = (mockScore / 70) * 10
  // Part C: Whole-Semester CA (Skills/NEP & Attendance) -> converted to 10 marks
  const wcaContribution = Math.min(10, Math.max(0, wholeSemScore))

  let normalizedMarks = classTestContribution + caContribution + wcaContribution

  if (rawScores.scalingMethod === 'proportional') {
    const totalRaw = effectiveTestScore + mockScore
    normalizedMarks = (totalRaw / 95) * 30
  }

  return {
    effectiveTestScore: Math.round(effectiveTestScore * 100) / 100,
    caScore: mockScore,
    classTestContribution: Math.round(classTestContribution * 100) / 100,
    caContribution: Math.round(caContribution * 100) / 100,
    wcaContribution: Math.round(wcaContribution * 100) / 100,
    normalizedInternal: Math.min(30, Math.round(normalizedMarks * 100) / 100),
  }
}

/**
 * Normalizes Practical raw scores (Lab experiments + Lab viva/report) to 40 marks
 */
export function normalizePracticalInternal(rawScores) {
  const labPerf = Math.max(0, Math.min(60, Number(rawScores.labPerformance) || 0))
  const labViva = Math.max(0, Math.min(40, Number(rawScores.labViva) || 0))

  // 60 lab performance normalized to 24 marks (60% of 40)
  // 40 viva/report normalized to 16 marks (40% of 40)
  const perfContribution = (labPerf / 60) * 24
  const vivaContribution = (labViva / 40) * 16
  const normalizedMarks = perfContribution + vivaContribution

  return {
    labPerf,
    labViva,
    perfContribution: Math.round(perfContribution * 100) / 100,
    vivaContribution: Math.round(vivaContribution * 100) / 100,
    normalizedInternal: Math.min(40, Math.round(normalizedMarks * 100) / 100),
  }
}

/**
 * Reverse-engineers target final score for a specific grade cutoff
 */
export function calculateRequiredFinalScore(internalMarks, targetCutoff, courseTypeConfig) {
  const maxFinal = courseTypeConfig.maxFinal
  const maxInternal = courseTypeConfig.maxInternal

  const safeInternal = Math.max(0, Math.min(maxInternal, Number(internalMarks) || 0))
  const maxPossibleTotal = safeInternal + maxFinal
  const maxAchievableGrade = getGradeForTotal(maxPossibleTotal)

  const rawRequired = targetCutoff - safeInternal
  const effectiveRequired = Math.max(0, rawRequired)
  const roundedRequired = Math.ceil(effectiveRequired)

  const requiredPercentage = Math.round((effectiveRequired / maxFinal) * 1000) / 10

  // Feasibility status
  let status = 'ACHIEVABLE'
  let difficulty = 'MODERATE'
  let message = ''

  if (rawRequired > maxFinal) {
    status = 'IMPOSSIBLE'
    difficulty = 'IMPOSSIBLE'
    message = `Target requires ${Math.round(rawRequired * 10) / 10} / ${maxFinal} marks. Max score you can reach is ${Math.round(maxPossibleTotal * 10) / 10} (${maxAchievableGrade.grade} Grade).`
  } else if (rawRequired <= 0) {
    status = 'ALREADY_SECURED'
    difficulty = 'SECURED'
    message = `Your internal score (${safeInternal}) already meets the ${targetCutoff}-mark cutoff!`
  } else {
    // Required is between 0 and maxFinal
    const ratio = effectiveRequired / maxFinal
    if (ratio < 0.45) {
      difficulty = 'EASY'
      message = 'Easily achievable with moderate regular preparation.'
    } else if (ratio < 0.65) {
      difficulty = 'MODERATE'
      message = 'Comfortably realistic with focused study.'
    } else if (ratio < 0.80) {
      difficulty = 'CHALLENGING'
      message = 'Requires thorough preparation and good time management.'
    } else if (ratio <= 0.92) {
      difficulty = 'DIFFICULT'
      message = 'High target: High accuracy and comprehensive coverage needed.'
    } else {
      difficulty = 'EXTREME'
      message = 'Near perfection required! Very tight margin for error.'
    }
  }

  return {
    internalMarks: safeInternal,
    targetCutoff,
    maxFinal,
    maxInternal,
    maxPossibleTotal,
    maxAchievableGrade,
    requiredMarks: roundedRequired,
    requiredPercentage,
    status,
    difficulty,
    message,
  }
}

/**
 * Calculates reverse-engineering outcomes for all letter grades
 */
export function calculateAllGradeTargets(internalMarks, courseTypeConfig) {
  return LETTER_GRADES.map((gradeInfo) => {
    const analysis = calculateRequiredFinalScore(internalMarks, gradeInfo.cutoff, courseTypeConfig)
    return {
      ...gradeInfo,
      analysis,
    }
  })
}

/**
 * Simulates final score what-if slider
 */
export function simulateFinalScore(internalMarks, simulatedFinalMarks, courseTypeConfig) {
  const safeInternal = Math.max(0, Math.min(courseTypeConfig.maxInternal, Number(internalMarks) || 0))
  const safeFinal = Math.max(0, Math.min(courseTypeConfig.maxFinal, Number(simulatedFinalMarks) || 0))
  const projectedTotal = Math.round((safeInternal + safeFinal) * 10) / 10
  const finalPercentage = Math.round((safeFinal / courseTypeConfig.maxFinal) * 1000) / 10
  const totalPercentage = Math.round((projectedTotal / courseTypeConfig.totalMarks) * 1000) / 10

  const grade = getGradeForTotal(projectedTotal)
  const isPass = projectedTotal >= courseTypeConfig.minTotalPassing

  return {
    internalMarks: safeInternal,
    simulatedFinalMarks: safeFinal,
    projectedTotal,
    finalPercentage,
    totalPercentage,
    grade,
    isTotalPass: isPass,
    isPass,
  }
}

/**
 * Calculates Semester Grade Point Average (SGPA) for a list of subjects
 * SGPA = sum(credits * gradePoint) / sum(credits)
 */
export function calculateSGPA(subjects) {
  let totalCredits = 0
  let weightedPoints = 0

  for (const sub of subjects) {
    const credits = Number(sub.credits) || 0
    const gp = Number(sub.targetGradePoint ?? sub.gradePoint) || 0
    if (credits > 0) {
      totalCredits += credits
      weightedPoints += credits * gp
    }
  }

  const sgpa = totalCredits > 0 ? weightedPoints / totalCredits : 0
  return {
    sgpa: Math.round(sgpa * 100) / 100,
    totalCredits: Math.round(totalCredits * 10) / 10,
    weightedPoints: Math.round(weightedPoints * 100) / 100,
  }
}

