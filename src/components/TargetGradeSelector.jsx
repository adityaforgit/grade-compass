import { CheckCircle2, XCircle, Sparkles } from 'lucide-react'

export default function TargetGradeSelector({
  selectedGrade,
  onSelectGrade,
  allGradeTargets,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm transition-colors">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            Choose Target Letter Grade
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select the grade you want to target in this subject
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          Official University Scale
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
        {allGradeTargets.map((item) => {
          const isSelected = selectedGrade === item.grade
          const analysis = item.analysis
          const isImpossible = analysis.status === 'IMPOSSIBLE'
          const isSecured = analysis.status === 'ALREADY_SECURED'

          return (
            <button
              key={item.grade}
              type="button"
              onClick={() => onSelectGrade(item.grade)}
              className={`relative p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all group ${
                isSelected
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/30 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/80 hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
              }`}
            >
              {/* Top: Grade & Cutoff */}
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xl font-black tracking-tight ${
                      isSelected
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.grade}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.gradePoint} GP
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.label}
                </div>
                <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1">
                  Cutoff: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{item.cutoff}+</span>
                </div>
              </div>

              {/* Bottom: Feasibility Mini Badge */}
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                {isImpossible ? (
                  <div className="flex items-center space-x-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                    <XCircle className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">Max {analysis.maxPossibleTotal}</span>
                  </div>
                ) : isSecured ? (
                  <div className="flex items-center space-x-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">Secured!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate font-mono">Need {analysis.requiredMarks}</span>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

