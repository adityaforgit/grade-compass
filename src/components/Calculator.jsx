import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  COURSE_TYPES,
  LETTER_GRADES,
  calculateRequiredFinalScore,
  calculateAllGradeTargets,
} from '../utils/gradeCalculations'
import CourseTypeToggle from './CourseTypeToggle'
import InternalScoreInput from './InternalScoreInput'
import TargetGradeSelector from './TargetGradeSelector'
import TargetResultCard from './TargetResultCard'
import WhatIfSimulator from './WhatIfSimulator'
import GradeMatrixTable from './GradeMatrixTable'

export default function Calculator({
  courseType,
  setCourseType,
  internalMarks,
  setInternalMarks,
  selectedGrade,
  setSelectedGrade,
  subject,
  onBackToSubjects,
}) {
  const currentCourseConfig =
    courseType === 'PRACTICAL' ? COURSE_TYPES.PRACTICAL : COURSE_TYPES.THEORY

  const currentGradeInfo =
    LETTER_GRADES.find((g) => g.grade === selectedGrade) || LETTER_GRADES[0]

  // Calculate target analysis for currently selected grade
  const targetAnalysis = calculateRequiredFinalScore(
    internalMarks,
    currentGradeInfo.cutoff,
    currentCourseConfig
  )

  // Calculate all grade outcomes for the matrix table and badges
  const allGradeTargets = calculateAllGradeTargets(internalMarks, currentCourseConfig)

  const handleSelectCourseType = (typeId) => {
    setCourseType(typeId)
    // Adjust internal marks to remain within the new maximum
    const max = typeId === 'PRACTICAL' ? 40 : 30
    if (internalMarks > max) {
      setInternalMarks(max)
    }
  }

  return (
    <div className="space-y-8">
      {/* Subject Context Banner if coming from Subject Explorer */}
      {subject && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center space-x-3.5">
            {onBackToSubjects && (
              <button
                type="button"
                onClick={onBackToSubjects}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                title="Back to Subjects"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {subject.name}
                </h2>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60">
                  {subject.code}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center space-x-2">
                <span className="font-semibold text-slate-700">{subject.type} Course</span>
                {subject.credits > 0 && <span>• {subject.credits} Credits</span>}
              </div>
            </div>
          </div>
          {onBackToSubjects && (
            <button
              type="button"
              onClick={onBackToSubjects}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Back to Subjects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Introduction Hero Callout */}
      <div className="text-center max-w-2xl mx-auto space-y-2 pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Eliminate Exam Anxiety with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500">
            Mathematical Certainty
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Enter your internal marks to reverse-engineer the exact final score needed for your target grade.
        </p>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs & Target Choice (5 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Step 1: Course Type */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Course Classification</span>
            </div>
            <CourseTypeToggle
              selectedType={courseType}
              onSelectType={handleSelectCourseType}
            />
          </div>

          {/* Step 2: Internal Marks */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Internal Evaluation Score</span>
            </div>
            <InternalScoreInput
              courseConfig={currentCourseConfig}
              internalMarks={internalMarks}
              onChangeInternal={setInternalMarks}
            />
          </div>

          {/* Step 3: Target Grade Selection */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Target Grade</span>
            </div>
            <TargetGradeSelector
              selectedGrade={selectedGrade}
              onSelectGrade={setSelectedGrade}
              allGradeTargets={allGradeTargets}
            />
          </div>
        </div>

        {/* Right Column: Output & Simulation (7 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">
          {/* The Output Result Card */}
          <TargetResultCard
            courseConfig={currentCourseConfig}
            targetAnalysis={targetAnalysis}
            selectedGradeInfo={currentGradeInfo}
          />

          {/* What-If Simulator Slider */}
          <WhatIfSimulator
            courseConfig={currentCourseConfig}
            internalMarks={internalMarks}
            targetCutoff={currentGradeInfo.cutoff}
            targetGradeName={currentGradeInfo.grade}
          />
        </div>
      </div>

      {/* Full Width Matrix Table */}
      <div className="pt-4">
        <GradeMatrixTable
          allGradeTargets={allGradeTargets}
          selectedGrade={selectedGrade}
          onSelectGrade={setSelectedGrade}
          courseConfig={currentCourseConfig}
        />
      </div>
    </div>
  )
}

