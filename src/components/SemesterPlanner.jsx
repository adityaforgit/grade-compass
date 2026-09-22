import { useState, useEffect } from 'react'
import {
  Plus,
  Trash2,
  Printer,
  RotateCcw,
  BookOpen,
  FlaskConical,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import {
  COURSE_TYPES,
  LETTER_GRADES,
  calculateRequiredFinalScore,
  calculateSGPA,
} from '../utils/gradeCalculations'
import { DEFAULT_SEMESTER_SUBJECTS } from '../utils/presets'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'

export default function SemesterPlanner() {
  const [subjects, setSubjects] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.SEMESTER_SUBJECTS, DEFAULT_SEMESTER_SUBJECTS)
  })

  // Persist to local storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SEMESTER_SUBJECTS, subjects)
  }, [subjects])

  // New subject form state
  const [newName, setNewName] = useState('')
  const [newCode, setNewCode] = useState('')
  const [newType, setNewType] = useState('THEORY')
  const [newCredits, setNewCredits] = useState(3)
  const [newInternal, setNewInternal] = useState(22)
  const [newTargetGrade, setNewTargetGrade] = useState('O')
  const [showAddForm, setShowAddForm] = useState(false)

  // Calculate SGPA
  const enrichedSubjects = subjects.map((sub) => {
    const courseConfig =
      sub.type === 'PRACTICAL' ? COURSE_TYPES.PRACTICAL : COURSE_TYPES.THEORY
    const gradeObj = LETTER_GRADES.find((g) => g.grade === sub.targetGrade) || LETTER_GRADES[0]
    const targetAnalysis = calculateRequiredFinalScore(
      sub.internalMarks,
      gradeObj.cutoff,
      courseConfig
    )

    return {
      ...sub,
      gradePoint: gradeObj.gradePoint,
      targetCutoff: gradeObj.cutoff,
      analysis: targetAnalysis,
      courseConfig,
    }
  })

  const sgpaResult = calculateSGPA(
    enrichedSubjects.map((s) => ({
      credits: s.credits,
      gradePoint: s.gradePoint,
    }))
  )

  const handleAddSubject = (e) => {
    e.preventDefault()
    if (!newName.trim()) return

    const maxInt = newType === 'PRACTICAL' ? 40 : 30
    const newSub = {
      id: `sub-${Date.now()}`,
      name: newName.trim(),
      code: newCode.trim() || `CS${Math.floor(100 + Math.random() * 900)}`,
      type: newType,
      credits: Number(newCredits) || 3,
      internalMarks: Math.max(0, Math.min(maxInt, Number(newInternal) || 0)),
      targetGrade: newTargetGrade,
    }

    setSubjects([...subjects, newSub])
    setNewName('')
    setNewCode('')
    setShowAddForm(false)
  }

  const handleRemoveSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id))
  }

  const handleUpdateSubject = (id, field, value) => {
    setSubjects(
      subjects.map((s) => {
        if (s.id !== id) return s
        if (field === 'internalMarks') {
          const maxInt = s.type === 'PRACTICAL' ? 40 : 30
          return { ...s, [field]: Math.max(0, Math.min(maxInt, Number(value) || 0)) }
        }
        if (field === 'credits') {
          return { ...s, [field]: Math.max(0.5, Math.min(10, Number(value) || 0)) }
        }
        return { ...s, [field]: value }
      })
    )
  }

  const handleResetDefaults = () => {
    if (window.confirm('Reset all subjects to sample semester data?')) {
      setSubjects(DEFAULT_SEMESTER_SUBJECTS)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  // Get honor description
  const getHonorsLabel = (sgpa) => {
    if (sgpa >= 9.0) return { label: 'Outstanding / University Topper Potential', color: 'text-emerald-600 dark:text-emerald-400' }
    if (sgpa >= 8.0) return { label: 'First Class with Distinction', color: 'text-indigo-600 dark:text-indigo-400' }
    if (sgpa >= 6.5) return { label: 'First Class', color: 'text-blue-600 dark:text-blue-400' }
    if (sgpa >= 5.0) return { label: 'Second Class', color: 'text-amber-600 dark:text-amber-400' }
    return { label: 'Needs Improvement', color: 'text-rose-600 dark:text-rose-400' }
  }

  const honors = getHonorsLabel(sgpaResult.sgpa)

  return (
    <div className="space-y-6">
      {/* SGPA Hero Dashboard Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                Semester Roadmap &amp; SGPA Forecaster
              </span>
              <span className="text-xs text-indigo-300">
                • {subjects.length} Subjects Total
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Projected Semester SGPA
            </h2>
            <p className="text-sm text-indigo-200/80 max-w-xl">
              Calculated dynamically from your credit weights and target grades. Shows the exact final score needed for every course simultaneously.
            </p>
          </div>

          {/* SGPA Score Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex items-center space-x-6 self-stretch md:self-auto justify-between md:justify-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 block">
                Target SGPA
              </span>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                  {sgpaResult.sgpa.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-indigo-200">/ 10.0</span>
              </div>
              <div className={`text-xs font-bold mt-1 ${honors.color}`}>
                {honors.label}
              </div>
            </div>
            <div className="border-l border-white/20 pl-5 text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 block">
                Total Credits
              </span>
              <span className="text-2xl font-black font-mono text-white">
                {sgpaResult.totalCredits}
              </span>
              <span className="text-[11px] text-indigo-300 block">
                {sgpaResult.weightedPoints} W.Points
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print / Save Target Card</span>
        </button>
      </div>

      {/* Inline Add Course Modal/Panel */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubject}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 shadow-lg space-y-4 no-print animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Add New Course to Semester
            </h4>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Subject Name */}
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Subject Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Database Management"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Code */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Course Code
              </label>
              <input
                type="text"
                placeholder="CS401"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Type */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Course Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="THEORY">Theory (30/70)</option>
                <option value="PRACTICAL">Practical (40/60)</option>
              </select>
            </div>

            {/* Credits */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Credits
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="8"
                value={newCredits}
                onChange={(e) => setNewCredits(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Internal Marks */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Internal Score ({newType === 'PRACTICAL' ? 'Max 40' : 'Max 30'})
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max={newType === 'PRACTICAL' ? 40 : 30}
                value={newInternal}
                onChange={(e) => setNewInternal(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {/* Target Grade Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Target Grade:
              </span>
              <div className="flex items-center space-x-1">
                {LETTER_GRADES.map((g) => (
                  <button
                    key={g.grade}
                    type="button"
                    onClick={() => setNewTargetGrade(g.grade)}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                      newTargetGrade === g.grade
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {g.grade}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              Add to Semester
            </button>
          </div>
        </form>
      )}

      {/* Semester Subjects Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Credits</th>
                <th className="py-3 px-3">Internal Score</th>
                <th className="py-3 px-3">Target Grade</th>
                <th className="py-3 px-3">Final Exam Required</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {enrichedSubjects.map((sub) => {
                const analysis = sub.analysis
                const isImpossible = analysis.status === 'IMPOSSIBLE'
                const isSecured = analysis.status === 'ALREADY_SECURED'

                return (
                  <tr
                    key={sub.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Subject Name & Code */}
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {sub.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                          {sub.code}
                        </div>
                      </div>
                    </td>

                    {/* Course Type */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                          sub.type === 'THEORY'
                            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                            : 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300'
                        }`}
                      >
                        {sub.type === 'THEORY' ? (
                          <BookOpen className="w-3 h-3" />
                        ) : (
                          <FlaskConical className="w-3 h-3" />
                        )}
                        <span>{sub.type === 'THEORY' ? '30/70' : '40/60'}</span>
                      </span>
                    </td>

                    {/* Credits Input */}
                    <td className="py-3.5 px-3">
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        max="8"
                        value={sub.credits}
                        onChange={(e) => handleUpdateSubject(sub.id, 'credits', e.target.value)}
                        className="w-14 px-2 py-1 text-xs font-mono font-bold rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </td>

                    {/* Internal Score Input */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max={sub.courseConfig.maxInternal}
                          value={sub.internalMarks}
                          onChange={(e) =>
                            handleUpdateSubject(sub.id, 'internalMarks', e.target.value)
                          }
                          className="w-14 px-2 py-1 text-xs font-mono font-bold rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                        />
                        <span className="text-xs text-slate-400">/ {sub.courseConfig.maxInternal}</span>
                      </div>
                    </td>

                    {/* Target Grade Selector Dropdown */}
                    <td className="py-3.5 px-3">
                      <select
                        value={sub.targetGrade}
                        onChange={(e) => handleUpdateSubject(sub.id, 'targetGrade', e.target.value)}
                        className="text-xs font-bold px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        {LETTER_GRADES.map((g) => (
                          <option key={g.grade} value={g.grade}>
                            {g.grade} ({g.cutoff}+)
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Required Final Exam Marks */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span
                          className={`font-mono font-extrabold text-sm ${
                            isImpossible
                              ? 'text-rose-600 dark:text-rose-400'
                              : isSecured
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-indigo-600 dark:text-indigo-400'
                          }`}
                        >
                          {analysis.requiredMarks} / {sub.courseConfig.maxFinal}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({analysis.requiredPercentage}% of finals)
                        </span>
                      </div>
                    </td>

                    {/* Feasibility Badge */}
                    <td className="py-3.5 px-3">
                      {isImpossible ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                          <AlertCircle className="w-3 h-3" />
                          <span>Impossible</span>
                        </span>
                      ) : isSecured ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Secured</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{analysis.difficulty}</span>
                        </span>
                      )}
                    </td>

                    {/* Delete Action */}
                    <td className="py-3.5 px-3 text-right no-print">
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(sub.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

