import { Shield, Zap, Sparkles } from 'lucide-react'

export default function Footer({ onOpenFormulaModal }) {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-10 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-500 dark:text-slate-400">
          {/* Privacy Feature */}
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">
                Zero Server Costs &amp; 100% Client-Side Privacy
              </strong>
              <span>
                Calculations execute instantly in your browser memory. Your marks never leave your machine.
              </span>
            </div>
          </div>

          {/* Zero Latency */}
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">
                Sub-Millisecond Reactivity
              </strong>
              <span>
                Engineered with React 18, Vite, and Tailwind CSS for instant mathematical feedback and offline availability.
              </span>
            </div>
          </div>

          {/* Transparent Formulas */}
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">
                University Norm Compliant
              </strong>
              <span>
                Designed for standard 10-point university schemes (30/70 theory, 40/60 practicals).{' '}
                <button
                  type="button"
                  onClick={onOpenFormulaModal}
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium hover:text-indigo-700"
                >
                  View mathematical rules
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-2">
          <div>
            &copy; {new Date().getFullYear()} GradeCompass. Built to eliminate academic anxiety.
          </div>
          <div className="flex items-center space-x-1">
            <span>Precision grade engineering for university students</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

