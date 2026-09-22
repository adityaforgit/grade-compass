import { useEffect } from 'react'
import { X, Compass, Shield } from 'lucide-react'

export default function AboutModal({ isOpen, onClose }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 text-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                About GradeCompass
              </h3>
              <p className="text-xs text-slate-500">
                Ideas for a better academic tomorrow
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">GradeCompass</strong> is an algorithmic grade calculator built to eliminate academic anxiety for students by giving them transparent, zero-latency mathematical clarity.
          </p>
          <p>
            Developed by <strong className="text-slate-900">ADI</strong>, it is engineered to model the official MAKAUT assessment architecture (30-mark theory internal normalizations, 40-mark practical internal evaluations, and 70/60 end-semester exams).
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="flex items-center space-x-2 font-bold text-slate-900">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>100% Privacy &amp; Offline Ready</span>
            </div>
            <p className="text-slate-500">
              No login required, no tracking, and zero server logging. All computations run right in your browser.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <div className="text-xs text-slate-400">
            Developed by <strong className="text-slate-700">ADI</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

