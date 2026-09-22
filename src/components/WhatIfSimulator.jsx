import { useState } from 'react'
import { SlidersHorizontal, Sparkles, AlertCircle, CheckCircle } from 'lucide-react'
import confetti from 'canvas-confetti'
import { simulateFinalScore } from '../utils/gradeCalculations'

export default function WhatIfSimulator({
  courseConfig,
  internalMarks,
  targetCutoff,
  targetGradeName,
}) {
  const [simulatedScore, setSimulatedScore] = useState(
    Math.round(courseConfig.maxFinal * 0.75)
  )

  const safeSimulatedScore = Math.min(simulatedScore, courseConfig.maxFinal)
  const simulation = simulateFinalScore(internalMarks, safeSimulatedScore, courseConfig)

  const margin = Math.round((simulation.projectedTotal - targetCutoff) * 10) / 10
  const achievesTarget = simulation.projectedTotal >= targetCutoff

  // Trigger confetti when achieving target grade
  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'],
    })
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800/80 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              &quot;What If&quot; Exam Score Simulator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag the slider to test different end-semester scores in real-time
            </p>
          </div>
        </div>

        {achievesTarget && (
          <button
            type="button"
            onClick={handleTriggerConfetti}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/80 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Target Achieved! Celebrate 🎉</span>
          </button>
        )}
      </div>

      {/* Interactive Slider Area */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label
            htmlFor="simulated-final-score-input"
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Simulated Final Exam Score:
          </label>
          <div className="flex items-baseline space-x-1">
            <input
              id="simulated-final-score-input"
              type="number"
              min="0"
              max={courseConfig.maxFinal}
              step="0.5"
              value={safeSimulatedScore}
              onChange={(e) =>
                setSimulatedScore(
                  Math.max(0, Math.min(courseConfig.maxFinal, Number(e.target.value) || 0))
                )
              }
              className="w-20 px-3 py-1 text-right font-mono font-bold text-lg rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
              / {courseConfig.maxFinal} ({simulation.finalPercentage}%)
            </span>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max={courseConfig.maxFinal}
          step="0.5"
          value={safeSimulatedScore}
          onChange={(e) => setSimulatedScore(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />

        <div className="flex justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500">
          <span>0 Marks</span>
          <span>Passing Min ({courseConfig.minFinalPassing})</span>
          <span>75% Target ({Math.round(courseConfig.maxFinal * 0.75)})</span>
          <span>Full Marks ({courseConfig.maxFinal})</span>
        </div>
      </div>

      {/* Outcome Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {/* Projected Total Score */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Projected Total
          </span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {simulation.projectedTotal}
            </span>
            <span className="text-xs font-bold text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {internalMarks} Internal + {safeSimulatedScore} Final
          </p>
        </div>

        {/* Projected Letter Grade & GP */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Resultant Grade
          </span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className={`text-3xl font-black ${simulation.grade.textClass}`}>
              {simulation.grade.grade}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {simulation.grade.gradePoint} GP
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {simulation.grade.label} (Cutoff: {simulation.grade.cutoff}+)
          </p>
        </div>

        {/* Comparison with Target */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Target Comparison
          </span>
          <div className="flex items-center space-x-1.5 mt-1">
            {achievesTarget ? (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  +{margin} Buffer
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400 font-mono">
                  {margin} Marks
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {achievesTarget
              ? `Meets ${targetGradeName} grade with ${margin} marks margin!`
              : `Short of ${targetGradeName} grade by ${Math.abs(margin)} marks.`}
          </p>
        </div>
      </div>
    </div>
  )
}

