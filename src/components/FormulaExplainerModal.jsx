import { useEffect } from 'react'
import { X, Calculator, AlertCircle } from 'lucide-react'

export default function FormulaExplainerModal({ isOpen, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                University Normalization &amp; Formulas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mathematical rules applied by GradeCompass
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Reverse-Engineering Math */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            1. The Reverse-Engineering Formula
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            University grading evaluates your overall aggregate out of 100 marks:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1">
            <div>Total Score = Internal Marks (I) + Final Exam Marks (F)</div>
            <div className="text-indigo-600 dark:text-indigo-400 font-bold">
              Required Final Exam (R) = Target Cutoff (T) - Internal Score (I)
            </div>
            <div>Required Percentage = (R / Max Final Marks) × 100%</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
              <strong className="text-emerald-700 dark:text-emerald-300 block">R ≤ 0</strong>
              <span className="text-emerald-600 dark:text-emerald-400">Grade already secured by internals!</span>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60">
              <strong className="text-indigo-700 dark:text-indigo-300 block">0 &lt; R ≤ Max</strong>
              <span className="text-indigo-600 dark:text-indigo-400">Achievable with target score</span>
            </div>
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
              <strong className="text-rose-700 dark:text-rose-300 block">R &gt; Max</strong>
              <span className="text-rose-600 dark:text-rose-400">Mathematically impossible</span>
            </div>
          </div>
        </div>

        {/* Section 2: Normalization Formulas */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            2. Continuous Assessment Normalization
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Raw midterm scores and continuous assessments are normalized into university weightages:
          </p>

          <div className="space-y-3">
            {/* Theory Breakdown */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Theory Course (30 Internal Marks) &mdash; Official Formula
              </span>
              <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-slate-700 dark:text-slate-300 space-y-1.5">
                <div>&bull; <strong>CA Marks (out of 10):</strong> CA Average = (CA1 + CA2) / 2 &rarr; CA Marks = CA Avg &times; 10 / 25 = <strong>(CA1 + CA2) / 5</strong></div>
                <div>&bull; <strong>ECA Marks (out of 10):</strong> ECA &times; 10 / 70 = <strong>ECA / 7</strong></div>
                <div>&bull; <strong>WCA Marks (out of 10):</strong> Whole-Semester CA = <strong>WCA</strong></div>
                <div className="text-indigo-600 dark:text-indigo-400 font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
                  Formula: Internal = ((CA1 + CA2) / 5) + (ECA / 7) + WCA (Max 30)
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                CA1 and CA2 are each entered out of 25, ECA is entered out of 70, and WCA is entered out of 10.
              </p>
            </div>

            {/* Practical Breakdown */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Practical / Lab Course (40 Internal Marks)
              </span>
              <div className="font-mono text-xs bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg text-slate-700 dark:text-slate-300">
                Internal = [ (Lab Performance / 60) × 24 ] + [ (Lab Viva &amp; Report / 40) × 16 ]
              </div>
              <p className="text-[11px] text-slate-500">
                Day-to-day lab experiment records contribute 24 marks (60%), and internal viva/quizzes contribute 16 marks (40%).
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Overall Passing Rule */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 dark:text-blue-200">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Passing Criterion (Overall Final Score Out of 100)</span>
          </div>
          <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
            Course passing is evaluated on the <strong>Overall Final Score</strong> (<strong>Final Score = Internal Marks + ESE Marks</strong>). The minimum aggregate passing score is <strong>40 / 100 (D Grade)</strong>. There is no separate minimum threshold for the end-semester exam.
          </p>
        </div>

        {/* Close Button */}
        <div className="pt-2 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
          >
            Got It, Back to Calculator
          </button>
        </div>
      </div>
    </div>
  )
}
