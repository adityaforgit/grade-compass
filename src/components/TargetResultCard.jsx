import {
  Target,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'

export default function TargetResultCard({
  targetAnalysis,
  selectedGradeInfo,
}) {
  const {
    internalMarks,
    targetCutoff,
    maxFinal,
    maxPossibleTotal,
    maxAchievableGrade,
    requiredMarks,
    requiredPercentage,
    status,
    difficulty,
    message,
    finalMinAdvisory,
  } = targetAnalysis

  // Color theme based on difficulty/status
  const getStatusBadge = () => {
    switch (status) {
      case 'IMPOSSIBLE':
        return {
          icon: <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
          title: 'Mathematically Impossible',
          badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800',
          bannerBg: 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60',
        }
      case 'ALREADY_SECURED':
        return {
          icon: <Sparkles className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
          title: 'Grade Threshold Secured!',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          bannerBg: 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60',
        }
      default:
        if (difficulty === 'EASY') {
          return {
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
            title: 'Easily Achievable Target',
            badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
            bannerBg: 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60',
          }
        }
        if (difficulty === 'MODERATE') {
          return {
            icon: <TrendingUp className="w-5 h-5 text-indigo-500 flex-shrink-0" />,
            title: 'Comfortably Realistic',
            badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
            bannerBg: 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/60',
          }
        }
        if (difficulty === 'CHALLENGING') {
          return {
            icon: <TrendingUp className="w-5 h-5 text-amber-500 flex-shrink-0" />,
            title: 'Challenging Target',
            badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
            bannerBg: 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60',
          }
        }
        return {
          icon: <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />,
          title: 'High Focus / Near Perfection Needed',
          badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-300 dark:border-orange-800',
          bannerBg: 'bg-orange-50/70 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/60',
        }
    }
  }

  const badgeInfo = getStatusBadge()

  // Proportions for visual progress breakdown
  const internalWidthPercent = (internalMarks / 100) * 100
  const finalNeededWidthPercent = (Math.min(requiredMarks, maxFinal) / 100) * 100

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors space-y-6">
      {/* Top Banner: Target Grade & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Target Output
              </span>
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                • {selectedGradeInfo.grade} Grade ({targetCutoff}+ Marks)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              End-Semester Score Requirement
            </h2>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-bold self-start sm:self-auto ${badgeInfo.badgeClass}`}
        >
          {badgeInfo.icon}
          <span>{badgeInfo.title}</span>
        </div>
      </div>

      {/* Main Requirement Callout Box */}
      <div className={`p-6 rounded-2xl border ${badgeInfo.bannerBg} transition-all`}>
        {status === 'IMPOSSIBLE' ? (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Cutoff Exceeds Maximum Attainable Score
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-rose-600 dark:text-rose-400 font-mono">
                {requiredMarks} / {maxFinal}
              </span>
              <span className="text-sm font-bold text-rose-700 dark:text-rose-300">
                (Need {requiredPercentage}% — impossible in a {maxFinal}-mark exam)
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              With your current internal score of{' '}
              <span className="font-mono font-bold">{internalMarks}</span>, even scoring a flawless{' '}
              <span className="font-mono font-bold">{maxFinal} / {maxFinal}</span> in the final exam
              yields a maximum possible total of{' '}
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {maxPossibleTotal} / 100
              </span>
              . The highest attainable grade is{' '}
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {maxAchievableGrade.grade} ({maxAchievableGrade.label})
              </span>
              .
            </p>
          </div>
        ) : status === 'ALREADY_SECURED' ? (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Cutoff Requirement Satisfied
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                0 / {maxFinal}
              </span>
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                (Target cutoff of {targetCutoff} already met by internal marks)
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Your internal score of{' '}
              <span className="font-mono font-bold">{internalMarks}</span> already satisfies or exceeds the{' '}
              <span className="font-mono font-bold">{targetCutoff}</span>-mark threshold for the{' '}
              <span className="font-bold">{selectedGradeInfo.grade}</span> grade!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Minimum Final Score Needed
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {requiredMarks}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-400 dark:text-slate-500 font-mono">
                / {maxFinal} Marks
              </span>
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-2.5 py-0.5 rounded-lg">
                {requiredPercentage}% of final exam
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {message}
            </p>
          </div>
        )}
      </div>

      {/* Visual Component Breakdown Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>Marks Breakdown Toward 100 Total</span>
          <span className="font-mono">
            Internal ({internalMarks}) + Required Final ({status === 'IMPOSSIBLE' ? maxFinal : requiredMarks}) ={' '}
            {status === 'IMPOSSIBLE' ? maxPossibleTotal : targetCutoff} / 100
          </span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="relative h-6 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex p-1">
          {/* Internal Secured Portion */}
          <div
            style={{ width: `${internalWidthPercent}%` }}
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-l-lg transition-all duration-300 relative group flex items-center justify-center text-[10px] font-bold text-white overflow-hidden"
            title={`Internal Secured: ${internalMarks} marks`}
          >
            {internalMarks >= 10 && <span>Internal: {internalMarks}</span>}
          </div>

          {/* Required End-Sem Portion */}
          {status !== 'IMPOSSIBLE' && (
            <div
              style={{ width: `${finalNeededWidthPercent}%` }}
              className={`h-full ${
                status === 'ALREADY_SECURED'
                  ? 'bg-emerald-500'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600'
              } rounded-r-lg transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden`}
              title={`Needed in Final: ${requiredMarks} marks`}
            >
              {requiredMarks >= 12 && <span>Final: {requiredMarks}</span>}
            </div>
          )}

          {/* Impossible Excess Marker */}
          {status === 'IMPOSSIBLE' && (
            <div
              style={{ width: `${((maxFinal) / 100) * 100}%` }}
              className="h-full bg-rose-400/80 rounded-r-lg flex items-center justify-center text-[10px] font-bold text-white"
            >
              <span>Max Final: {maxFinal}</span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></div>
              <span>Secured Internals ({internalMarks})</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></div>
              <span>Needed in Finals ({status === 'IMPOSSIBLE' ? '-' : requiredMarks})</span>
            </div>
          </div>
          <div>
            <span>Target Cutoff: <strong className="text-slate-800 dark:text-slate-200">{targetCutoff} Marks</strong></span>
          </div>
        </div>
      </div>

      {/* University End-Sem Minimum Passing Advisory */}
      {finalMinAdvisory && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            <strong className="font-bold">Official University Regulation:</strong> {finalMinAdvisory}
          </div>
        </div>
      )}
    </div>
  )
}

