import { Table, Check, X, Sparkles } from 'lucide-react'

export default function GradeMatrixTable({
  allGradeTargets,
  selectedGrade,
  onSelectGrade,
  courseConfig,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm transition-colors space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Full Grade Target Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete comparison of required final exam marks across all official grade thresholds
            </p>
          </div>
        </div>

        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          Exam Max: {courseConfig.maxFinal} Marks
        </span>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <th className="py-3 px-3">Grade</th>
              <th className="py-3 px-3">Cutoff</th>
              <th className="py-3 px-3">Grade Point</th>
              <th className="py-3 px-3">Required in Final ({courseConfig.maxFinal})</th>
              <th className="py-3 px-3">Required %</th>
              <th className="py-3 px-3">Feasibility Status</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {allGradeTargets.map((item) => {
              const analysis = item.analysis
              const isSelected = selectedGrade === item.grade
              const isImpossible = analysis.status === 'IMPOSSIBLE'
              const isSecured = analysis.status === 'ALREADY_SECURED'

              return (
                <tr
                  key={item.grade}
                  className={`transition-colors ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 font-medium'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {/* Grade Badge */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-2">
                      <span className={`font-black text-base ${item.textClass}`}>
                        {item.grade}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                        ({item.label})
                      </span>
                    </div>
                  </td>

                  {/* Cutoff */}
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                    {item.cutoff}+
                  </td>

                  {/* Grade Point */}
                  <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                    {item.gradePoint}.0
                  </td>

                  {/* Required Score */}
                  <td className="py-3.5 px-3">
                    {isImpossible ? (
                      <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                        {analysis.requiredMarks} / {courseConfig.maxFinal}
                      </span>
                    ) : isSecured ? (
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        0 / {courseConfig.maxFinal}
                      </span>
                    ) : (
                      <span className="font-mono text-slate-900 dark:text-white font-bold">
                        {analysis.requiredMarks} / {courseConfig.maxFinal}
                      </span>
                    )}
                  </td>

                  {/* Required % */}
                  <td className="py-3.5 px-3 font-mono">
                    {isImpossible ? (
                      <span className="text-rose-500 font-bold">{analysis.requiredPercentage}%</span>
                    ) : isSecured ? (
                      <span className="text-emerald-500 font-bold">0% (Met)</span>
                    ) : (
                      <span className="text-slate-700 dark:text-slate-300">
                        {analysis.requiredPercentage}%
                      </span>
                    )}
                  </td>

                  {/* Feasibility Status */}
                  <td className="py-3.5 px-3">
                    {isImpossible ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                        <X className="w-3 h-3" />
                        <span>Impossible</span>
                      </span>
                    ) : isSecured ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                        <Sparkles className="w-3 h-3" />
                        <span>Secured</span>
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-xs font-semibold ${
                          analysis.difficulty === 'EASY'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                            : analysis.difficulty === 'MODERATE'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900'
                            : analysis.difficulty === 'CHALLENGING'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-200 dark:border-orange-900'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{analysis.difficulty}</span>
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectGrade(item.grade)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {isSelected ? 'Active Target' : 'Select'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

