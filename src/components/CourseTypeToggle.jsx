import { BookText, FlaskConical } from 'lucide-react'
import { COURSE_TYPES } from '../utils/gradeCalculations'

export default function CourseTypeToggle({ selectedType, onSelectType }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        {/* Theory Option */}
        <button
          type="button"
          onClick={() => onSelectType(COURSE_TYPES.THEORY.id)}
          className={`flex items-center space-x-3 p-3.5 rounded-xl border text-left transition-all ${
            selectedType === COURSE_TYPES.THEORY.id
              ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-500/60 dark:border-indigo-500/80 shadow-sm'
              : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              selectedType === COURSE_TYPES.THEORY.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            <BookText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Theory Course
              </span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                30 / 70 Split
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              30 Internal + 70 End-Sem Exam
            </p>
          </div>
        </button>

        {/* Practical Option */}
        <button
          type="button"
          onClick={() => onSelectType(COURSE_TYPES.PRACTICAL.id)}
          className={`flex items-center space-x-3 p-3.5 rounded-xl border text-left transition-all ${
            selectedType === COURSE_TYPES.PRACTICAL.id
              ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-500/60 dark:border-indigo-500/80 shadow-sm'
              : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              selectedType === COURSE_TYPES.PRACTICAL.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Practical / Lab
              </span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300">
                40 / 60 Split
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              40 Internal + 60 Final Viva/Exam
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

