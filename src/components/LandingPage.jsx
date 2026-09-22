import { useState, useMemo } from 'react'
import {
  Compass,
  LayoutGrid,
  ShieldCheck,
  Zap,
  Monitor,
  CheckSquare,
  Calculator as CalcIcon,
  BarChart2,
  Trophy,
  Settings,
  Users,
  Heart,
  GraduationCap,
  ArrowRight,
  Sparkles,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react'
import { calculateTheoryInternal } from '../utils/gradeCalculations'
import { BRANCHES, SEMESTERS, getSubjectsForBranchAndSemester } from '../data/curriculumData'

export default function LandingPage({ onGetStarted, onOpenGradeSystem, onOpenAbout }) {
  // Preview tab switcher: 'calculator' or 'explorer'
  const [previewTab, setPreviewTab] = useState('calculator')

  // State for the interactive Subject Calculator preview
  const [ca1, setCa1] = useState(18)
  const [ca2, setCa2] = useState(16)
  const [wca, setWca] = useState(8)
  const [eca, setEca] = useState(42)

  // State for the Subject Explorer preview
  const [previewBranch, setPreviewBranch] = useState('CSE')
  const [previewSemester, setPreviewSemester] = useState('SEM-3')

  // Subject Calculator calculations based on official MAKAUT formula:
  // Internal = ((CA1 + CA2) / 5) + (ECA / 7) + WCA
  // Required ESE = Math.ceil(Target - Internal) with NO 28/70 minimum constraint!
  const previewCalc = useMemo(() => {
    const numCA1 = Math.max(0, Math.min(25, Number(ca1) || 0))
    const numCA2 = Math.max(0, Math.min(25, Number(ca2) || 0))
    const numWCA = Math.max(0, Math.min(10, Number(wca) || 0))
    const numECA = Math.max(0, Math.min(70, Number(eca) || 0))

    const theory = calculateTheoryInternal({
      ca1: numCA1,
      ca2: numCA2,
      wca: numWCA,
      eca: numECA,
    })
    const totalInternal = theory.totalInternal

    // Passing is based on overall score: Final Score = Internal + ESE (Min 40/100 to pass)
    // There is NO separate 28/70 constraint!
    const passNeeded = Math.max(0, Math.ceil(40 - totalInternal))
    const cNeeded = Math.max(0, Math.ceil(50 - totalInternal))
    const bNeeded = Math.max(0, Math.ceil(60 - totalInternal))
    const aNeeded = Math.max(0, Math.ceil(70 - totalInternal))
    const eNeeded = Math.max(0, Math.ceil(80 - totalInternal))
    const oNeeded = Math.max(0, Math.ceil(90 - totalInternal))

    return {
      ...theory,
      passNeeded,
      cNeeded,
      bNeeded,
      aNeeded,
      eNeeded,
      oNeeded,
    }
  }, [ca1, ca2, wca, eca])

  const formatTargetScore = (score) => {
    if (score > 70) return '> 70'
    return `${score} / 70`
  }

  // Explorer preview subjects
  const explorerSubjects = useMemo(() => {
    return getSubjectsForBranchAndSemester(previewBranch, previewSemester)
  }, [previewBranch, previewSemester])

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105 group-hover:rotate-12 duration-300">
                <Compass className="w-5 h-5 text-blue-600 animate-compass-needle" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Grade<span className="text-blue-600">Compass</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <a href="#home" className="text-slate-900 font-semibold relative py-1">
                Home
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full"></span>
              </a>
              <a href="#features" className="nav-link-hover hover:text-blue-600 py-1">
                Features
              </a>
              <a href="#how-it-works" className="nav-link-hover hover:text-blue-600 py-1">
                How It Works
              </a>
              <button
                type="button"
                onClick={onOpenGradeSystem}
                className="nav-link-hover hover:text-blue-600 py-1 cursor-pointer"
              >
                Grade System
              </button>
              <button
                type="button"
                onClick={onOpenAbout}
                className="nav-link-hover hover:text-blue-600 py-1 cursor-pointer"
              >
                About
              </button>
            </div>

            {/* Right Action Button */}
            <div>
              <button
                type="button"
                onClick={onGetStarted}
                className="btn-shimmer bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-12 pb-20 overflow-hidden">
        {/* Soft Background Blur Blobs with Drift Animations */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-50/80 rounded-full filter blur-3xl pointer-events-none -z-10 animate-blob-1"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-sky-50/70 rounded-full filter blur-3xl pointer-events-none -z-10 animate-blob-2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline */}
          <p className="text-xs sm:text-[13px] font-bold tracking-widest text-blue-600 uppercase mb-4 inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FOR A SMARTER ACADEMIC JOURNEY</span>
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tight text-slate-900 leading-[1.15] mb-5">
            Calculate <span className="text-blue-600">Plan</span> Achieve
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
            A simple and reliable grade calculator for <strong className="text-slate-800 font-semibold">MAKAUT</strong> students.
            <br className="hidden sm:inline" />
            Know your target end-semester marks, track your progress, and take control of your academic journey.
          </p>

          {/* CTA Button */}
          <div className="mb-14">
            <button
              type="button"
              onClick={onGetStarted}
              className="btn-shimmer bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer inline-flex items-center space-x-2 group"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 3. HERO APP MOCKUP with Handwritten Annotations */}
          <div className="relative max-w-4xl mx-auto text-left">
            {/* Left Handwritten Script + Curved Arrow */}
            <div className="hidden lg:block absolute -left-36 top-1/3 -translate-y-1/2 z-20 pointer-events-none animate-float-slow">
              <div className="font-handwritten text-3xl text-slate-700 leading-tight -rotate-12 text-center">
                Your<br />
                Grades<br />
                Our Compass
              </div>
              {/* Hand-drawn curved arrow pointing to the card */}
              <svg
                className="w-16 h-12 text-slate-600 mt-1 ml-6 -rotate-6 transition-transform hover:scale-105"
                viewBox="0 0 60 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 5 10 Q 30 35 52 18" />
                <path d="M 42 16 L 52 18 L 48 28" />
              </svg>
            </div>

            {/* Right Handwritten Script + Curved Arrow */}
            <div className="hidden lg:block absolute -right-32 -top-4 z-20 pointer-events-none animate-float-delayed-2">
              <div className="font-handwritten text-3xl text-slate-700 leading-tight rotate-6 text-center">
                Plan<br />
                Calculate<br />
                Achieve
              </div>
              {/* Hand-drawn curved arrow pointing down toward the result card */}
              <svg
                className="w-16 h-12 text-slate-600 mt-1 -ml-4 rotate-12 transition-transform hover:scale-105"
                viewBox="0 0 60 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 50 5 Q 30 30 10 20" />
                <path d="M 12 10 L 10 20 L 22 22" />
              </svg>
            </div>

            {/* Floating Mockup Card Container */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-200/70 overflow-hidden">
              {/* Top Window Chrome Bar */}
              <div className="bg-slate-50/90 border-b border-slate-200/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                {/* Window Dots & Breadcrumb */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400/80 border border-rose-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80 border border-emerald-500/30"></div>
                  </div>
                  <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-slate-500 pl-2 border-l border-slate-200">
                    <span className="text-slate-800 font-bold">GradeCompass</span>
                    <span>/</span>
                    <span>MAKAUT Regulation 2022-23</span>
                  </div>
                </div>

                {/* UI Mode Switcher Tabs */}
                <div className="flex items-center space-x-1.5 bg-slate-200/70 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPreviewTab('calculator')}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewTab === 'calculator'
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <CalcIcon className="w-3.5 h-3.5" />
                    <span>Subject Calculator UI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('explorer')}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewTab === 'explorer'
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Subject Explorer UI</span>
                  </button>
                </div>

                {/* Live Indicator Pill */}
                <div className="hidden lg:flex items-center space-x-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-beacon"></span>
                  <span>Interactive Live Preview</span>
                </div>
              </div>

              {/* Mockup Body Content */}
              {previewTab === 'calculator' ? (
                /* TAB 1: SUBJECT CALCULATOR UI */
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                  {/* Left / Center Main Content (8 cols) */}
                  <div className="lg:col-span-8 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-100 space-y-5">
                    {/* Header with Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                            Data Structures &amp; Algorithms
                          </h3>
                          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                            PCC-CS301
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            Theory
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            • 3 Credits • Max 30 Internal + 70 End-Sem
                          </span>
                        </div>
                      </div>
                      <div className="self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={onGetStarted}
                          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Switch Subject</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* 1. Enter Internal Marks Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          1. Enter Your Internal Marks
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Official 4-component evaluation
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {/* CA1 */}
                        <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                          <span className="text-[10px] font-bold text-slate-500 block mb-1">
                            CA1 (Out of 25)
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={ca1}
                            onChange={(e) => setCa1(Math.max(0, Math.min(25, Number(e.target.value) || 0)))}
                            className="w-full text-sm font-black text-slate-900 bg-transparent focus:outline-none"
                          />
                        </div>

                        {/* CA2 */}
                        <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                          <span className="text-[10px] font-bold text-slate-500 block mb-1">
                            CA2 (Out of 25)
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={ca2}
                            onChange={(e) => setCa2(Math.max(0, Math.min(25, Number(e.target.value) || 0)))}
                            className="w-full text-sm font-black text-slate-900 bg-transparent focus:outline-none"
                          />
                        </div>

                        {/* WCA */}
                        <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                          <span className="text-[10px] font-bold text-slate-500 block mb-1">
                            WCA (Out of 10)
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={wca}
                            onChange={(e) => setWca(Math.max(0, Math.min(10, Number(e.target.value) || 0)))}
                            className="w-full text-sm font-black text-slate-900 bg-transparent focus:outline-none"
                          />
                        </div>

                        {/* ECA */}
                        <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                          <span className="text-[10px] font-bold text-slate-500 block mb-1">
                            ECA (Out of 70)
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="70"
                            value={eca}
                            onChange={(e) => setEca(Math.max(0, Math.min(70, Number(e.target.value) || 0)))}
                            className="w-full text-sm font-black text-slate-900 bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Internal Assessment Breakdown Summary */}
                    <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-slate-50 border border-blue-100 rounded-xl p-3.5 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-700">Total Internal Marks:</span>
                          <span className="font-mono text-blue-700 font-black text-base sm:text-lg">
                            {previewCalc.totalInternal} / 30
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-blue-100 shadow-2xs">
                          Formula: ((CA1 + CA2) / 5) + (ECA / 7) + WCA
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="bg-white rounded-lg p-2 border border-slate-200/80 shadow-2xs">
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">CA Component</span>
                          <span className="font-mono font-black text-slate-800 text-xs mt-0.5 block">
                            {previewCalc.caMarks} <span className="text-[10px] font-normal text-slate-400">/ 10</span>
                          </span>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-slate-200/80 shadow-2xs">
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">ECA Component</span>
                          <span className="font-mono font-black text-slate-800 text-xs mt-0.5 block">
                            {previewCalc.ecaMarks} <span className="text-[10px] font-normal text-slate-400">/ 10</span>
                          </span>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-slate-200/80 shadow-2xs">
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">WCA Component</span>
                          <span className="font-mono font-black text-slate-800 text-xs mt-0.5 block">
                            {previewCalc.wcaMarks} <span className="text-[10px] font-normal text-slate-400">/ 10</span>
                          </span>
                        </div>
                        <div className="bg-blue-600/10 rounded-lg p-2 border border-blue-200 shadow-2xs">
                          <span className="text-[9px] uppercase font-bold text-blue-700 block">Total Internal</span>
                          <span className="font-mono font-black text-blue-700 text-xs mt-0.5 block">
                            {previewCalc.totalInternal} <span className="text-[10px] font-normal text-blue-500">/ 30</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Target Score Cards Grid (6 Targets) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          2. Required Marks in End-Semester Exam (Out of 70)
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-600">
                          Min 40/100 aggregate pass (No 28/70 constraint)
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* D / Pass */}
                        <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3 flex items-center justify-between hover:scale-[1.01] transition-transform">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-7 h-7 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                              D
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs font-bold text-slate-900">To Pass (D Grade)</span>
                                <span className="text-[10px] font-mono text-rose-700 bg-rose-100/80 px-1.5 py-0.2 rounded font-semibold">49-40</span>
                              </div>
                              <span className="text-[10px] text-slate-500 block">Min for 40 aggregate pass</span>
                            </div>
                          </div>
                          <div className="text-sm sm:text-base font-black text-rose-600 font-mono">
                            {formatTargetScore(previewCalc.passNeeded)}
                          </div>
                        </div>

                        {/* C / 6 Pointer */}
                        <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3 flex items-center justify-between hover:scale-[1.01] transition-transform">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                              C
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs font-bold text-slate-900">6 Pointer (C Grade)</span>
                                <span className="text-[10px] font-mono text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded font-semibold">59-50</span>
                              </div>
                              <span className="text-[10px] text-slate-500 block">Target for 6 CGPA (Fair)</span>
                            </div>
                          </div>
                          <div className="text-sm sm:text-base font-black text-amber-600 font-mono">
                            {formatTargetScore(previewCalc.cNeeded)}
                          </div>
                        </div>

                        {/* B / 7 Pointer */}
                        <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3 flex items-center justify-between hover:scale-[1.01] transition-transform">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                              B
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs font-bold text-slate-900">7 Pointer (B Grade)</span>
                                <span className="text-[10px] font-mono text-purple-700 bg-purple-100/80 px-1.5 py-0.2 rounded font-semibold">69-60</span>
                              </div>
                              <span className="text-[10px] text-slate-500 block">Target for 7 CGPA (Good)</span>
                            </div>
                          </div>
                          <div className="text-sm sm:text-base font-black text-purple-600 font-mono">
                            {formatTargetScore(previewCalc.bNeeded)}
                          </div>
                        </div>

                        {/* A / 8 Pointer */}
                        <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex items-center justify-between hover:scale-[1.01] transition-transform">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                              A
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs font-bold text-slate-900">8 Pointer (A Grade)</span>
                                <span className="text-[10px] font-mono text-blue-700 bg-blue-100/80 px-1.5 py-0.2 rounded font-semibold">79-70</span>
                              </div>
                              <span className="text-[10px] text-slate-500 block">Target for 8 CGPA (Very Good)</span>
                            </div>
                          </div>
                          <div className="text-sm sm:text-base font-black text-blue-600 font-mono">
                            {formatTargetScore(previewCalc.aNeeded)}
                          </div>
                        </div>

                        {/* E / 9 Pointer */}
                        <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3 flex items-center justify-between hover:scale-[1.01] transition-transform">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                              E
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs font-bold text-slate-900">9 Pointer (E Grade)</span>
                                <span className="text-[10px] font-mono text-teal-700 bg-teal-100/80 px-1.5 py-0.2 rounded font-semibold">89-80</span>
                              </div>
                              <span className="text-[10px] text-slate-500 block">Target for 9 CGPA (Excellent)</span>
                            </div>
                          </div>
                          <div className="text-sm sm:text-base font-black text-teal-600 font-mono">
                            {formatTargetScore(previewCalc.eNeeded)}
                          </div>
                        </div>

                        {/* O / 10 Pointer */}
                        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 flex items-center justify-between hover:scale-[1.01] transition-transform">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                              O
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs font-bold text-slate-900">10 Pointer (O Grade)</span>
                                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded font-semibold">100-90</span>
                              </div>
                              <span className="text-[10px] text-slate-500 block">Outstanding performance</span>
                            </div>
                          </div>
                          <div className="text-sm sm:text-base font-black text-emerald-600 font-mono">
                            {formatTargetScore(previewCalc.oNeeded)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar (4 cols) */}
                  <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-50/60 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      {/* MAKAUT Info Badge */}
                      <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">MAKAUT Official Scale</span>
                          <span className="text-[10px] text-slate-500 block">2022-23 B.Tech Regulations</span>
                        </div>
                      </div>

                      {/* Official Grade Scale Table */}
                      <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs">
                        <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Official Grade Scale (Theory)
                        </div>
                        <table className="w-full text-left text-[10px]">
                          <thead>
                            <tr className="text-slate-400 font-semibold border-b border-slate-100">
                              <th className="pb-1">Grade</th>
                              <th className="pb-1">Range</th>
                              <th className="pb-1 text-right">Points</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                            <tr>
                              <td className="py-0.5 font-bold text-emerald-600">O</td>
                              <td className="py-0.5 font-mono">100 to 90</td>
                              <td className="py-0.5 text-right font-mono">10</td>
                            </tr>
                            <tr>
                              <td className="py-0.5 font-bold text-teal-600">E</td>
                              <td className="py-0.5 font-mono">89 to 80</td>
                              <td className="py-0.5 text-right font-mono">9</td>
                            </tr>
                            <tr>
                              <td className="py-0.5 font-bold text-blue-600">A</td>
                              <td className="py-0.5 font-mono">79 to 70</td>
                              <td className="py-0.5 text-right font-mono">8</td>
                            </tr>
                            <tr>
                              <td className="py-0.5 font-bold text-purple-600">B</td>
                              <td className="py-0.5 font-mono">69 to 60</td>
                              <td className="py-0.5 text-right font-mono">7</td>
                            </tr>
                            <tr>
                              <td className="py-0.5 font-bold text-amber-600">C</td>
                              <td className="py-0.5 font-mono">59 to 50</td>
                              <td className="py-0.5 text-right font-mono">6</td>
                            </tr>
                            <tr>
                              <td className="py-0.5 font-bold text-rose-600">D</td>
                              <td className="py-0.5 font-mono text-rose-600 font-bold">49 to 40</td>
                              <td className="py-0.5 text-right font-mono">5</td>
                            </tr>
                            <tr>
                              <td className="py-0.5 text-slate-400">F</td>
                              <td className="py-0.5 font-mono text-slate-400">Below 40</td>
                              <td className="py-0.5 text-right font-mono">2</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Aggregate Rule Highlight */}
                      <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-2.5 text-[11px] text-emerald-800">
                        <span className="font-bold block">No Separate 28/70 Floor</span>
                        <span className="text-[10px] text-emerald-700 block mt-0.5">
                          Student passes based on overall aggregate: Final = Internal + ESE &gt;= 40/100.
                        </span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      type="button"
                      onClick={onGetStarted}
                      className="btn-shimmer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <span>Open Full Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* TAB 2: SUBJECT EXPLORER UI */
                <div className="p-5 sm:p-6 space-y-5 min-h-[500px]">
                  {/* Explorer Header & Dropdowns */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                        Choose Your Branch &amp; Semester
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        11 Engineering Disciplines • Semesters 3 to 8 pre-loaded
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Branch Dropdown */}
                      <select
                        value={previewBranch}
                        onChange={(e) => setPreviewBranch(e.target.value)}
                        className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        {BRANCHES.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>

                      {/* Semester Dropdown */}
                      <select
                        value={previewSemester}
                        onChange={(e) => setPreviewSemester(e.target.value)}
                        className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        {SEMESTERS.slice(2).map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-700">
                        Official Theory Subjects ({explorerSubjects.length} Courses Mapped)
                      </span>
                      <span className="text-[11px] text-blue-600 font-semibold">
                        Click any subject to calculate target
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {explorerSubjects.map((subj) => (
                        <div
                          key={subj.id}
                          onClick={onGetStarted}
                          className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-2"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/50">
                                {subj.code}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-500">
                                {subj.credits} Credits
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {subj.name}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-semibold text-blue-600">
                            <span>Open Calculator</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explorer Bottom Banner */}
                  <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="text-slate-600">
                      Looking for your complete semester marksheet? Select your subject to start targeting your required exam score.
                    </span>
                    <button
                      type="button"
                      onClick={onGetStarted}
                      className="btn-shimmer bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto cursor-pointer"
                    >
                      Explore All Branches
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. "WHY GRADECOMPASS" FEATURE SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Features List (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">
                  WHY GRADECOMPASS
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Focus on <span className="text-blue-600">Your Goals</span>
                  <br />
                  Not the Formulas
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed max-w-xl">
                  GradeCompass takes care of the complex calculations, so you can spend more time learning, improving and achieving what matters.
                </p>
              </div>

              {/* 4 Feature Items */}
              <div className="space-y-4 pt-2">
                {/* 1. Accurate Calculations */}
                <div className="flex items-start space-x-3.5 group hover:translate-x-1.5 transition-transform duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Accurate Calculations
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Based on official MAKAUT evaluation rules
                    </p>
                  </div>
                </div>

                {/* 2. No Login Required */}
                <div className="flex items-start space-x-3.5 group hover:translate-x-1.5 transition-transform duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      No Login Required
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Instant results, no personal data needed
                    </p>
                  </div>
                </div>

                {/* 3. Simple & Clean */}
                <div className="flex items-start space-x-3.5 group hover:translate-x-1.5 transition-transform duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      Simple &amp; Clean
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Easy to use interface
                    </p>
                  </div>
                </div>

                {/* 4. 100% Client-Side */}
                <div className="flex items-start space-x-3.5 group hover:translate-x-1.5 transition-transform duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      100% Client-Side
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fast, secure and works in your browser
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Radial Orbit Diagram (5 cols) */}
            <div id="how-it-works" className="lg:col-span-5 flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
                {/* Outer Dashed Orbit Circle with Slow Planetary Spin */}
                <div className="absolute inset-0 rounded-full border border-dashed border-blue-200/80 animate-spin-slow pointer-events-none">
                  {/* Planetary Satellite Dots with Glowing Rings */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-600 shadow-md shadow-blue-500/60 ring-2 ring-white"></div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-md shadow-sky-400/60 ring-2 ring-white"></div>
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-md shadow-indigo-500/60 ring-2 ring-white"></div>
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/60 ring-2 ring-white"></div>
                </div>

                {/* Inner Orbit Circle with Counter-Spin */}
                <div className="absolute inset-10 rounded-full border border-dotted border-blue-200/60 animate-spin-reverse-slow pointer-events-none"></div>

                {/* Radar Sweep Ambient Beam */}
                <div className="absolute inset-4 rounded-full overflow-hidden pointer-events-none opacity-25">
                  <div className="w-full h-full animate-radar-sweep origin-center bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(37,99,235,0.22)_360deg)] rounded-full"></div>
                </div>

                {/* Expanding Ambient Wave Pulse Ring */}
                <div className="absolute w-44 h-44 rounded-full border-2 border-blue-400/30 animate-pulse-ring pointer-events-none"></div>

                {/* Center Core Circle: A Clearer You */}
                <div className="w-36 h-36 rounded-full bg-white shadow-xl shadow-blue-500/10 border border-slate-100 ring-4 ring-blue-50/80 flex flex-col items-center justify-center text-center p-3 z-10 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                  <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Compass className="w-6 h-6 animate-compass-needle" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    A Clearer
                  </span>
                  <span className="text-lg font-black text-blue-600 -mt-1 tracking-tight">
                    You
                  </span>
                </div>

                {/* Orbit Node 1: Plan (Top Left) */}
                <div className="absolute top-6 left-2 z-20 bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-100 hover:border-blue-300 px-3.5 py-2 flex items-center space-x-2 animate-float-slow hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="text-blue-600 group-hover:scale-110 transition-transform">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    Plan
                  </span>
                </div>

                {/* Orbit Node 2: Calculate (Top Right) */}
                <div className="absolute top-6 right-2 z-20 bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-100 hover:border-blue-300 px-3.5 py-2 flex items-center space-x-2 animate-float-delayed-1 hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="text-blue-600 group-hover:scale-110 transition-transform">
                    <CalcIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    Calculate
                  </span>
                </div>

                {/* Orbit Node 3: Track (Bottom Left) */}
                <div className="absolute bottom-6 left-2 z-20 bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-100 hover:border-blue-300 px-3.5 py-2 flex items-center space-x-2 animate-float-delayed-2 hover:scale-110 hover:translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="text-blue-600 group-hover:scale-110 transition-transform">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    Track
                  </span>
                </div>

                {/* Orbit Node 4: Achieve (Bottom Right) */}
                <div className="absolute bottom-6 right-2 z-20 bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-100 hover:border-blue-300 px-3.5 py-2 flex items-center space-x-2 animate-float-delayed-3 hover:scale-110 hover:translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="text-blue-600 group-hover:scale-110 transition-transform">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    Achieve
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THREE HIGHLIGHT VALUE CARDS STRIP */}
      <section className="py-10 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Currently in Building Phase */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-start space-x-3.5 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:rotate-180 transition-transform duration-700 ease-out">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Currently in Building Phase
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Continuously improving with your feedback
                </p>
              </div>
            </div>

            {/* Card 2: Built for MAKAUT Students */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-start space-x-3.5 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Built for MAKAUT Students
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Designed around your university&apos;s grading system
                </p>
              </div>
            </div>

            {/* Card 3: Free to Use */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-start space-x-3.5 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-transform duration-300">
                <Heart className="w-5 h-5 animate-heartbeat" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                  Free to Use
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Always accessible, no hidden costs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "MORE THAN A CALCULATOR" SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left Column: Modern UI Showcase Card (5 cols) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Dot Grid Pattern Background */}
                <div className="absolute -left-6 -bottom-6 w-32 h-32 opacity-30 grid grid-cols-6 gap-2 pointer-events-none">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  ))}
                </div>

                {/* Main Feature UI Showcase Card */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-2xl border border-slate-200/90 relative z-10 transition-all duration-300 space-y-4">
                  {/* Card Header: Simulated App Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Compass className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        Curriculum Database
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                      11 Branches Mapped
                    </span>
                  </div>

                  {/* Subject Preview Snippet */}
                  <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded">
                        PCC-CS301
                      </span>
                      <span className="font-semibold text-slate-500">
                        3 Credits • Theory
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      Data Structure &amp; Algorithms
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Internal = ((CA1 + CA2) / 5) + (ECA / 7) + WCA
                    </div>
                  </div>

                  {/* Target Scores Pill Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-rose-50 rounded-lg p-2 border border-rose-100">
                      <div className="text-[10px] font-bold text-rose-700">D / Pass</div>
                      <div className="text-sm font-black font-mono text-rose-600 mt-0.5">20/70</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                      <div className="text-[10px] font-bold text-blue-700">A / 8 Ptr</div>
                      <div className="text-sm font-black font-mono text-blue-600 mt-0.5">50/70</div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100">
                      <div className="text-[10px] font-bold text-emerald-700">O / 10 Ptr</div>
                      <div className="text-sm font-black font-mono text-emerald-600 mt-0.5">70/70</div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="pt-1 space-y-1.5 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Zero hardcoded 28/70 floor (Aggregate pass)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Semesters 3 to 8 pre-loaded for all major branches</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Copy & Link (7 cols) */}
            <div className="md:col-span-7 space-y-4 text-left">
              <p className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                MORE THAN A CALCULATOR
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Plan Smarter<br />
                <span className="text-blue-600">Perform</span> Better
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Set realistic goals, understand your grades, and stay motivated throughout your semester with GradeCompass.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center space-x-1.5 group cursor-pointer"
                >
                  <span>Explore Features</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA SECTION */}
      <section className="py-16 bg-slate-50/70 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Ready to take control of your grades?
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Start using GradeCompass today. It&apos;s free, fast and built for MAKAUT students.
          </p>
          <button
            type="button"
            onClick={onGetStarted}
            className="btn-shimmer bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center space-x-2 group"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="about" className="bg-white border-t border-slate-200/80 pt-16 pb-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Footer Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Column 1 & 2: Brand & Tagline */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full border border-blue-600 flex items-center justify-center text-blue-600">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-slate-900">
                  Grade<span className="text-blue-600">Compass</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs max-w-xs">
                Ideas for a better academic tomorrow.
              </p>
              {/* Social Icons */}
              <div className="flex items-center space-x-3 pt-2 text-slate-400">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 3: Product */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-slate-800 text-xs">Product</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="hover:text-blue-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenGradeSystem}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Grade System
                  </button>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="hover:text-blue-600 transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-slate-800 text-xs">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#study-tips" className="hover:text-blue-600 transition-colors">
                    Study Tips
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenGradeSystem}
                    className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                  >
                    University Guidelines
                  </button>
                </li>
                <li>
                  <a href="#blog" className="hover:text-blue-600 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: About */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-slate-800 text-xs">About</h5>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={onOpenAbout}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Our Story
                  </button>
                </li>
                <li>
                  <a href="mailto:contact@gradecompass.org" className="hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#feedback" className="hover:text-blue-600 transition-colors">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 6: Developed by ADI */}
            <div className="border-l border-slate-100 pl-4 space-y-1">
              <span className="text-[11px] text-slate-400 block">Developed by</span>
              <span className="text-base font-black text-slate-900 tracking-tight block">
                ADI
              </span>
              <p className="text-[11px] text-slate-400 mt-2">
                Ideas for a better tomorrow.
              </p>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <div>&copy; 2026 GradeCompass. All rights reserved.</div>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <span className="text-rose-500">❤️</span>
              <span>for students.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
