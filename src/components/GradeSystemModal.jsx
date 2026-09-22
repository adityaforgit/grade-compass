import { useEffect } from 'react'
import { X, BookOpen, ShieldAlert } from 'lucide-react'

export default function GradeSystemModal({ isOpen, onClose }) {
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                MAKAUT Assessment Architecture
              </h3>
              <p className="text-xs text-slate-500">
                Maulana Abul Kalam Azad University of Technology, West Bengal
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

        {/* 1. Theory Architecture */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Theory Course Evaluation (100 Marks Total)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Continuous Assessment (CA – 30 Marks) is divided into <strong>three equal components</strong> of 10 marks each:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Part A */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Part A: Class Tests</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">CA1 &amp; CA2 (25 Marks each)</span>
              <p className="text-[11px] text-slate-500 mt-1">
                College written tests; average of two considered.
              </p>
              <div className="text-blue-600 font-mono font-bold mt-2 pt-1 border-t border-slate-200/60">
                (Avg / 25) &times; 10 Marks
              </div>
            </div>

            {/* Part B: Updated to Pre-Exam Mock Test 70 -> 10 */}
            <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 block">Part B: End-Sem CA</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 bg-blue-600 text-white rounded">Updated</span>
              </div>
              <span className="text-[11px] font-bold text-blue-700 block mt-0.5">Pre-Exam Mock Test (70 Marks)</span>
              <p className="text-[11px] text-slate-600 mt-1">
                Written pre-exam mock test covering whole syllabus.
              </p>
              <div className="text-blue-600 font-mono font-bold mt-2 pt-1 border-t border-blue-200/60">
                (Score / 70) &times; 10 Marks
              </div>
            </div>

            {/* Part C */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Part C: Whole-Sem CA</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Skills (NEP) &amp; Attendance</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Continuous activities and attendance designed by teacher.
              </p>
              <div className="text-blue-600 font-mono font-bold mt-2 pt-1 border-t border-slate-200/60">
                Converted &rarr; 10 Marks
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 flex items-center justify-between font-mono">
            <span>CA (30 Marks) + End-Semester Theory Exam (70 Marks)</span>
            <span className="font-bold text-blue-700">= 100 Marks Total</span>
          </div>
        </div>

        {/* 2. Practical Architecture */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Practical Course Evaluation (100 Marks Total)
          </h4>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 leading-relaxed">
            <div className="flex justify-between items-center font-semibold text-slate-900">
              <span>Continuous Assessment: PCA1 (40) &amp; PCA2 (40)</span>
              <span className="font-mono text-blue-600">Average = 40 Marks</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-slate-900 pt-1 border-t border-slate-200">
              <span>End-Semester Practical Exam (Report + Performance + Viva)</span>
              <span className="font-mono text-blue-600">60 Marks</span>
            </div>
          </div>
        </div>

        {/* 3. Official Letter Grade Cutoffs Table */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Official Letter Grade Scale
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Letter Grade</th>
                  <th className="py-2.5 px-3">Score on 100 Percentage Points</th>
                  <th className="py-2.5 px-3 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                <tr>
                  <td className="py-2 px-3 font-bold text-emerald-600">O</td>
                  <td className="py-2 px-3 font-mono">100 to 90</td>
                  <td className="py-2 px-3 text-right font-mono font-bold">10</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-teal-600">E</td>
                  <td className="py-2 px-3 font-mono">89 to 80</td>
                  <td className="py-2 px-3 text-right font-mono font-bold">9</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-blue-600">A</td>
                  <td className="py-2 px-3 font-mono">79 to 70</td>
                  <td className="py-2 px-3 text-right font-mono font-bold">8</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-indigo-600">B</td>
                  <td className="py-2 px-3 font-mono">69 to 60</td>
                  <td className="py-2 px-3 text-right font-mono font-bold">7</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-600">C</td>
                  <td className="py-2 px-3 font-mono">59 to 50</td>
                  <td className="py-2 px-3 text-right font-mono font-bold">6</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-orange-600">D</td>
                  <td className="py-2 px-3 font-mono">49 to 40</td>
                  <td className="py-2 px-3 text-right font-mono font-bold">5</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-rose-600">F</td>
                  <td className="py-2 px-3 font-mono">Below 40</td>
                  <td className="py-2 px-3 text-right font-mono font-bold">2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Minimum Passing Criteria Notice */}
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start space-x-2.5">
          <ShieldAlert className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Overall Passing Criterion:</strong> Students must secure an overall total of at least <strong>40 out of 100 marks</strong> (<strong>Internal Marks + End-Semester Marks</strong>) to clear the course (D Grade).
          </p>
        </div>

        {/* Close */}
        <div className="pt-2 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  )
}
