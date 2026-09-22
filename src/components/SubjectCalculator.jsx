import { useState, useMemo } from 'react'
import {
  Compass,
  FileText,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Menu,
  X,
  Home,
  Calculator as CalcIcon,
  Users,
} from 'lucide-react'
import { calculateTheoryInternal } from '../utils/gradeCalculations'

export default function SubjectCalculator({
  subject = {
    name: 'Data Structures',
    code: 'CS301',
    type: 'Theory',
    credits: 3,
  },
  onBackToSubjects,
  onNavigateHome,
  onOpenGradeSystem,
  onOpenResources,
  onOpenAbout,
  onOpenFormulaModal,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isTheory = subject?.type !== 'Lab'
  const maxFinal = isTheory ? 70 : 60

  // State for internal marks
  const [ca1, setCa1] = useState('')
  const [ca2, setCa2] = useState('')
  const [wca, setWca] = useState('')
  const [eca, setEca] = useState('')

  // State to reveal the required marks window only after clicking submit
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Calculations based on official MAKAUT evaluation rules
  const calculations = useMemo(() => {
    const numCA1 = ca1 === '' ? 0 : Math.max(0, Math.min(25, Number(ca1) || 0))
    const numCA2 = ca2 === '' ? 0 : Math.max(0, Math.min(25, Number(ca2) || 0))
    const numWCA = wca === '' ? 0 : Math.max(0, Math.min(10, Number(wca) || 0))
    const numECA = eca === '' ? 0 : Math.max(0, Math.min(70, Number(eca) || 0))

    const isAnyEntered = ca1 !== '' || ca2 !== '' || wca !== '' || eca !== ''

    if (isTheory) {
      // Official MAKAUT Formula:
      // CA Marks = (CA1 + CA2) / 5 (out of 10)
      // ECA Marks = ECA / 7 (out of 10)
      // WCA Marks = WCA (out of 10)
      // Total Internal = CA Marks + ECA Marks + WCA (Maximum 30)
      const theory = calculateTheoryInternal({
        ca1: numCA1,
        ca2: numCA2,
        wca: numWCA,
        eca: numECA,
      })
      const totalInternal = theory.totalInternal

      // Required ESE = Math.ceil(Target Final Score - Internal Marks)
      // Passing is based on overall score: Final Score = Internal + ESE (Min 40/100 to pass)
      // Grade targets:
      // D / Pass = 40
      // C / 6 Pointer = 50
      // B / 7 Pointer = 60
      // A / 8 Pointer = 70
      // E / 9 Pointer = 80
      // O / 10 Pointer = 90
      const passNeeded = Math.max(0, Math.ceil(40 - totalInternal))
      const cNeeded = Math.max(0, Math.ceil(50 - totalInternal))
      const bNeeded = Math.max(0, Math.ceil(60 - totalInternal))
      const aNeeded = Math.max(0, Math.ceil(70 - totalInternal))
      const eNeeded = Math.max(0, Math.ceil(80 - totalInternal))
      const oNeeded = Math.max(0, Math.ceil(90 - totalInternal))

      return {
        ...theory,
        isAnyEntered,
        passNeeded,
        cNeeded,
        bNeeded,
        aNeeded,
        eNeeded,
        oNeeded,
      }
    } else {
      // Practical / Lab course: 40 internal (PCA) + 60 end-sem practical
      const pcaTotal = Math.min(40, ((numCA1 + numCA2) / 50) * 20 + (numECA / 70) * 20)
      const passNeeded = Math.max(0, Math.ceil(40 - pcaTotal))
      const cNeeded = Math.max(0, Math.ceil(50 - pcaTotal))
      const bNeeded = Math.max(0, Math.ceil(60 - pcaTotal))
      const aNeeded = Math.max(0, Math.ceil(70 - pcaTotal))
      const eNeeded = Math.max(0, Math.ceil(80 - pcaTotal))
      const oNeeded = Math.max(0, Math.ceil(90 - pcaTotal))

      return {
        totalInternal: Number(pcaTotal.toFixed(1)),
        isAnyEntered,
        passNeeded,
        cNeeded,
        bNeeded,
        aNeeded,
        eNeeded,
        oNeeded,
      }
    }
  }, [ca1, ca2, wca, eca, isTheory])

  const formatTargetScore = (score) => {
    if (score > maxFinal) return `> ${maxFinal}`
    return `${score} / ${maxFinal}`
  }

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center space-x-2.5 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4 text-blue-600 animate-compass-needle" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Grade<span className="text-blue-600">Compass</span>
              </span>
            </button>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-blue-600 transition-colors cursor-pointer py-1"
              >
                Home
              </button>
              <span className="text-blue-600 font-semibold relative py-1">
                Calculator
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full"></span>
              </span>
              <button
                type="button"
                onClick={onBackToSubjects}
                className="hover:text-blue-600 transition-colors cursor-pointer py-1"
              >
                My Subjects
              </button>
              <button
                type="button"
                onClick={onOpenGradeSystem}
                className="hover:text-blue-600 transition-colors cursor-pointer py-1"
              >
                Grade System
              </button>
              <button
                type="button"
                onClick={onOpenResources}
                className="hover:text-blue-600 transition-colors cursor-pointer py-1"
              >
                Resources
              </button>
              <button
                type="button"
                onClick={onOpenAbout}
                className="hover:text-blue-600 transition-colors cursor-pointer py-1"
              >
                About
              </button>
            </nav>

            {/* Right: Mobile Menu Toggle Button */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-100 bg-white space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onNavigateHome()
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left cursor-pointer"
              >
                <Home className="w-4 h-4 text-slate-400" />
                <span>Home</span>
              </button>

              <div className="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50/70">
                <CalcIcon className="w-4 h-4 text-blue-600" />
                <span>Calculator (Active)</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onBackToSubjects()
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400" />
                <span>Back to My Subjects</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenGradeSystem()
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span>Grade System</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenResources()
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Resources</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenAbout()
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left cursor-pointer"
              >
                <Users className="w-4 h-4 text-slate-400" />
                <span>About</span>
              </button>

              {onOpenFormulaModal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onOpenFormulaModal()
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Formula &amp; Rules Explainer</span>
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* 2. MAIN CONTENT WRAPPER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Subjects Link */}
        <div className="mb-4">
          <button
            type="button"
            onClick={onBackToSubjects}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Subjects</span>
          </button>
        </div>

        {/* Subject Header + Type Badge */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {subject.name} ({subject.code})
          </h1>
          <div className="flex items-center space-x-2 mt-2 mb-2">
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                isTheory
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
              }`}
            >
              {subject.type || 'Theory'}
            </span>
            {subject.credits > 0 && (
              <span className="text-xs text-slate-500 font-medium">
                • {subject.credits} Credits
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter your internal marks to see the required marks in the end-semester exam.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Input Card & Results Card (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* CARD 1: Enter Your Internal Marks */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-4">
                1. Enter Your Internal Marks
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {/* CA1 (Out of 25) */}
                <div className="border border-slate-200 rounded-xl p-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <label className="text-[11px] font-bold text-slate-600 truncate">
                      CA1 (Out of 25)
                    </label>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    placeholder="0"
                    value={ca1}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '') {
                        setCa1('')
                      } else {
                        const num = Number(val)
                        if (!isNaN(num)) {
                          setCa1(Math.max(0, Math.min(25, num)))
                        }
                      }
                    }}
                    className="w-full text-base font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-normal focus:outline-none"
                  />
                </div>

                {/* CA2 (Out of 25) */}
                <div className="border border-slate-200 rounded-xl p-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <label className="text-[11px] font-bold text-slate-600 truncate">
                      CA2 (Out of 25)
                    </label>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    placeholder="0"
                    value={ca2}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '') {
                        setCa2('')
                      } else {
                        const num = Number(val)
                        if (!isNaN(num)) {
                          setCa2(Math.max(0, Math.min(25, num)))
                        }
                      }
                    }}
                    className="w-full text-base font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-normal focus:outline-none"
                  />
                </div>

                {/* WCA (Out of 10) */}
                <div className="border border-slate-200 rounded-xl p-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <label className="text-[11px] font-bold text-slate-600 truncate">
                      WCA (Out of 10)
                    </label>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    placeholder="0"
                    value={wca}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '') {
                        setWca('')
                      } else {
                        const num = Number(val)
                        if (!isNaN(num)) {
                          setWca(Math.max(0, Math.min(10, num)))
                        }
                      }
                    }}
                    className="w-full text-base font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-normal focus:outline-none"
                  />
                </div>

                {/* ECA (Out of 70) */}
                <div className="border border-slate-200 rounded-xl p-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <label className="text-[11px] font-bold text-slate-600 truncate">
                      ECA (Out of 70)
                    </label>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="70"
                    placeholder="0"
                    value={eca}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '') {
                        setEca('')
                      } else {
                        const num = Number(val)
                        if (!isNaN(num)) {
                          setEca(Math.max(0, Math.min(70, num)))
                        }
                      }
                    }}
                    className="w-full text-base font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-normal focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit / Calculate Button */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-500 text-center sm:text-left">
                  {isSubmitted ? (
                    <span className="text-emerald-600 font-semibold flex items-center space-x-1 justify-center sm:justify-start">
                      <span>✓ Calculated for current marks</span>
                    </span>
                  ) : (
                    <span>Enter your marks above and click calculate to view required final scores.</span>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  className="btn-shimmer w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer inline-flex items-center justify-center space-x-2"
                >
                  <span>{isSubmitted ? 'Recalculate Required Marks' : 'Calculate Required Marks'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RESULTS SECTION: REVEALED AFTER SUBMISSION */}
            {isSubmitted && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                {/* 1. INTERNAL MARKS BREAKDOWN CARD */}
                {isTheory ? (
                  <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-100 rounded-2xl p-5 sm:p-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-blue-200/60">
                      <div>
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                          Internal Assessment Summary
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          Total Internal Marks:{' '}
                          <span className="font-mono text-blue-700 text-lg sm:text-xl font-black">
                            {calculations.totalInternal} / 30
                          </span>
                        </h3>
                      </div>
                      <div className="text-[11px] font-mono text-slate-600 bg-white/90 px-3 py-1.5 rounded-lg border border-blue-100 shadow-2xs self-start sm:self-auto">
                        Formula: ((CA1 + CA2) / 5) + (ECA / 7) + WCA
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {/* CA Contribution */}
                      <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">CA Component</span>
                        <div className="text-base font-black font-mono text-slate-900 mt-0.5">
                          {calculations.caMarks} <span className="text-xs font-normal text-slate-400">/ 10</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                          ({calculations.numCA1} + {calculations.numCA2}) / 5
                        </span>
                      </div>

                      {/* ECA Contribution */}
                      <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">ECA Component</span>
                        <div className="text-base font-black font-mono text-slate-900 mt-0.5">
                          {calculations.ecaMarks} <span className="text-xs font-normal text-slate-400">/ 10</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                          {calculations.numECA} / 7
                        </span>
                      </div>

                      {/* WCA Contribution */}
                      <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">WCA Component</span>
                        <div className="text-base font-black font-mono text-slate-900 mt-0.5">
                          {calculations.wcaMarks} <span className="text-xs font-normal text-slate-400">/ 10</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                          Direct: {calculations.numWCA}
                        </span>
                      </div>

                      {/* Total Internal */}
                      <div className="bg-blue-600/5 rounded-xl p-3.5 border border-blue-200 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-blue-600 block">Total Internal</span>
                        <div className="text-base font-black font-mono text-blue-700 mt-0.5">
                          {calculations.totalInternal} <span className="text-xs font-normal text-blue-500/70">/ 30</span>
                        </div>
                        <span className="text-[11px] text-blue-600 font-semibold block mt-0.5">
                          {Math.round((calculations.totalInternal / 30) * 100)}% Weightage
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 border border-emerald-100 rounded-2xl p-5 sm:p-6 shadow-xs">
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                      Practical Internal Assessment (PCA)
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      Total Internal Marks:{' '}
                      <span className="font-mono text-emerald-700 text-lg sm:text-xl font-black">
                        {calculations.totalInternal} / 40
                      </span>
                    </h3>
                  </div>
                )}

                {/* 2. CARD 2: REQUIRED MARKS IN END-SEMESTER EXAM */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
                  <div className="mb-5">
                    <h2 className="text-base font-bold text-slate-900">
                      2. Required Marks in End-Semester Exam (Out of {maxFinal})
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Target final exam scores required for each letter grade based on: <span className="font-semibold text-slate-700">Final Score = Internal + ESE</span> (Minimum 40/100 to pass).
                    </p>
                  </div>

                  {/* 6 Target Score Cards: D, C, B, A, E, O matching user grade scale */}
                  <div className="space-y-3">
                    {/* 1. To Pass (D Grade: 49 to 40) */}
                    <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-4 flex items-center justify-between transition-transform hover:scale-[1.01]">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-full bg-rose-500 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                          D
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              To Pass (D Grade)
                            </h3>
                            <span className="text-[11px] font-mono text-rose-600 bg-rose-100/70 px-2 py-0.5 rounded-md font-semibold">
                              49 to 40
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Minimum marks required in ESE to reach 40/100 overall passing aggregate.
                          </p>
                        </div>
                      </div>
                      <div className="text-base sm:text-lg font-black text-rose-600 font-mono flex-shrink-0 pl-3">
                        {formatTargetScore(calculations.passNeeded)}
                      </div>
                    </div>

                    {/* 2. 6 Pointer (C Grade: 59 to 50) */}
                    <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-4 flex items-center justify-between transition-transform hover:scale-[1.01]">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                          C
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              6 Pointer (C Grade)
                            </h3>
                            <span className="text-[11px] font-mono text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md font-semibold">
                              59 to 50
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Target score for a 6 CGPA grade (Fair).
                          </p>
                        </div>
                      </div>
                      <div className="text-base sm:text-lg font-black text-amber-600 font-mono flex-shrink-0 pl-3">
                        {formatTargetScore(calculations.cNeeded)}
                      </div>
                    </div>

                    {/* 3. 7 Pointer (B Grade: 69 to 60) */}
                    <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-4 flex items-center justify-between transition-transform hover:scale-[1.01]">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                          B
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              7 Pointer (B Grade)
                            </h3>
                            <span className="text-[11px] font-mono text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md font-semibold">
                              69 to 60
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Target score for a 7 CGPA grade (Good).
                          </p>
                        </div>
                      </div>
                      <div className="text-base sm:text-lg font-black text-purple-600 font-mono flex-shrink-0 pl-3">
                        {formatTargetScore(calculations.bNeeded)}
                      </div>
                    </div>

                    {/* 4. 8 Pointer (A Grade: 79 to 70) */}
                    <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex items-center justify-between transition-transform hover:scale-[1.01]">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                          A
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              8 Pointer (A Grade)
                            </h3>
                            <span className="text-[11px] font-mono text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md font-semibold">
                              79 to 70
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Target score for an 8 CGPA grade (Very Good).
                          </p>
                        </div>
                      </div>
                      <div className="text-base sm:text-lg font-black text-blue-600 font-mono flex-shrink-0 pl-3">
                        {formatTargetScore(calculations.aNeeded)}
                      </div>
                    </div>

                    {/* 5. 9 Pointer (E Grade: 89 to 80) */}
                    <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-4 flex items-center justify-between transition-transform hover:scale-[1.01]">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                          E
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              9 Pointer (E Grade)
                            </h3>
                            <span className="text-[11px] font-mono text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md font-semibold">
                              89 to 80
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Target score for a 9 CGPA grade (Excellent).
                          </p>
                        </div>
                      </div>
                      <div className="text-base sm:text-lg font-black text-teal-600 font-mono flex-shrink-0 pl-3">
                        {formatTargetScore(calculations.eNeeded)}
                      </div>
                    </div>

                    {/* 6. 10 Pointer (O Grade: 100 to 90) */}
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-4 flex items-center justify-between transition-transform hover:scale-[1.01]">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                          O
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              10 Pointer (O Grade)
                            </h3>
                            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md font-semibold">
                              100 to 90
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Target score for an Outstanding 10 CGPA grade.
                          </p>
                        </div>
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-600 font-mono flex-shrink-0 pl-3">
                        {formatTargetScore(calculations.oNeeded)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* MAKAUT Info Card */}
            <div className="bg-blue-50/70 border border-blue-100/90 rounded-2xl p-4 flex items-center space-x-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">MAKAUT</h3>
                <p className="text-xs text-slate-500">
                  Based on official evaluation rules
                </p>
              </div>
            </div>

            {/* Grade Range Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Grade Range ({isTheory ? 'Theory' : 'Practical'})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                      <th className="pb-2">Letter Grade</th>
                      <th className="pb-2">Score on 100 Percentage Points</th>
                      <th className="pb-2 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                    <tr>
                      <td className="py-2 font-bold text-emerald-600">O</td>
                      <td className="py-2 font-mono">100 to 90</td>
                      <td className="py-2 text-right font-mono font-bold">10</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-teal-600">E</td>
                      <td className="py-2 font-mono">89 to 80</td>
                      <td className="py-2 text-right font-mono font-bold">9</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-blue-600">A</td>
                      <td className="py-2 font-mono">79 to 70</td>
                      <td className="py-2 text-right font-mono font-bold">8</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-purple-600">B</td>
                      <td className="py-2 font-mono">69 to 60</td>
                      <td className="py-2 text-right font-mono font-bold">7</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-amber-600">C</td>
                      <td className="py-2 font-mono">59 to 50</td>
                      <td className="py-2 text-right font-mono font-bold">6</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-rose-600">D</td>
                      <td className="py-2 font-mono text-rose-600 font-bold">49 to 40</td>
                      <td className="py-2 text-right font-mono font-bold">5</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-red-500 font-bold">F</td>
                      <td className="py-2 font-mono text-red-500">Below 40</td>
                      <td className="py-2 text-right font-mono text-red-500">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Need Help? Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm mb-3">
                <HelpCircle className="w-4 h-4" />
                <span>Need Help?</span>
              </div>

              <div className="space-y-1 divide-y divide-slate-100">
                <button
                  type="button"
                  onClick={onOpenFormulaModal}
                  className="w-full pt-2.5 pb-2 text-left text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center justify-between group cursor-pointer"
                >
                  <span>How are marks calculated?</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onOpenGradeSystem}
                  className="w-full py-2 text-left text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center justify-between group cursor-pointer"
                >
                  <span>What do the grades mean?</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onOpenGradeSystem}
                  className="w-full py-2 text-left text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center justify-between group cursor-pointer"
                >
                  <span>About CA, WCA and ECA</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onOpenGradeSystem}
                  className="w-full pt-2 text-left text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center justify-between group cursor-pointer"
                >
                  <span>View full grading system</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. BOTTOM FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-4 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">GradeCompass</span>
            <span className="text-slate-300">•</span>
            <span>Plan today. Score higher tomorrow.</span>
          </div>
          <div>
            Developed by <strong className="text-slate-800 font-bold">ADI</strong>
          </div>
        </div>
      </footer>
    </div>
  )
}
