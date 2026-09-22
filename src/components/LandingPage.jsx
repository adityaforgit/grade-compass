import { useState, useMemo, useEffect } from 'react'
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
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Menu,
  X,
  Home,
} from 'lucide-react'
import { calculateTheoryInternal } from '../utils/gradeCalculations'
import { BRANCHES, SEMESTERS, getSubjectsForBranchAndSemester } from '../data/curriculumData'

export default function LandingPage({
  onGetStarted,
  onOpenGradeSystem,
  onOpenAbout,
}) {
  // Sliding showcase state (0: Internal Calculator, 1: Target Matrix, 2: Subject Explorer)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // State for the interactive Subject Calculator preview
  const [ca1, setCa1] = useState(18)
  const [ca2, setCa2] = useState(16)
  const [wca, setWca] = useState(8)
  const [eca, setEca] = useState(42)

  // State for the Subject Explorer preview
  const [previewBranch, setPreviewBranch] = useState('CSE')
  const [previewSemester, setPreviewSemester] = useState('SEM-3')

  // Auto-slide every 3 seconds when not hovered
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [isHovered])

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % 3)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + 3) % 3)

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
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors">
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo */}
            <a href="#home" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105 group-hover:rotate-12 duration-300">
                <Compass className="w-5 h-5 text-blue-600 animate-compass-needle" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Grade<span className="text-blue-600">Compass</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
              <a href="#home" className="text-slate-900 dark:text-white font-semibold relative py-1">
                Home
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full"></span>
              </a>
              <a href="#features" className="nav-link-hover hover:text-blue-600 dark:hover:text-blue-400 py-1">
                Features
              </a>
              <a href="#how-it-works" className="nav-link-hover hover:text-blue-600 dark:hover:text-blue-400 py-1">
                How It Works
              </a>
              <button
                type="button"
                onClick={onOpenGradeSystem}
                className="nav-link-hover hover:text-blue-600 dark:hover:text-blue-400 py-1 cursor-pointer"
              >
                Grade System
              </button>
              <button
                type="button"
                onClick={onOpenAbout}
                className="nav-link-hover hover:text-blue-600 dark:hover:text-blue-400 py-1 cursor-pointer"
              >
                About
              </button>
            </div>

            {/* Right Action Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={onGetStarted}
                className="btn-shimmer bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Get Started
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <a
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/50"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </a>
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-slate-400" />
                <span>Features</span>
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <BarChart2 className="w-4 h-4 text-slate-400" />
                <span>How It Works</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenGradeSystem()
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-slate-400" />
                <span>Grade System</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenAbout()
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left cursor-pointer"
              >
                <Users className="w-4 h-4 text-slate-400" />
                <span>About</span>
              </button>
              <div className="pt-2 px-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onGetStarted()
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <span>Open Subject Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-12 pb-20 overflow-hidden">
        {/* Soft Background Blur Blobs with Drift Animations */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-50/80 dark:bg-blue-950/20 rounded-full filter blur-3xl pointer-events-none -z-10 animate-blob-1"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-sky-50/70 dark:bg-indigo-950/20 rounded-full filter blur-3xl pointer-events-none -z-10 animate-blob-2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline */}
          <p className="text-xs sm:text-[13px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-4 inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FOR A SMARTER ACADEMIC JOURNEY</span>
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5">
            Calculate <span className="text-blue-600 dark:text-blue-400">Plan</span> Achieve
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8">
            A simple and reliable grade calculator for <strong className="text-slate-800 dark:text-white font-semibold">MAKAUT</strong> students.
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

          {/* 3. HERO APP MOCKUP with Sliding Showcase */}
          <div className="relative max-w-5xl mx-auto text-left">
            {/* Floating Sliding Mockup Card Container */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-200/60 dark:shadow-black/60 overflow-hidden transition-all"
            >
              {/* Top Window Chrome Bar with Sliding Navigation Controls */}
              <div className="bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
                {/* Window Dots & Breadcrumb */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400/80 border border-rose-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80 border border-emerald-500/20"></div>
                  </div>
                  <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 pl-2 border-l border-slate-200 dark:border-slate-700">
                    <span className="text-slate-800 dark:text-white font-bold">GradeCompass</span>
                    <span>•</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Interactive Showcase</span>
                  </div>
                </div>

                {/* Minimalist Segmented Slide Switcher */}
                <div className="flex items-center bg-slate-200/60 dark:bg-slate-800/80 p-1 rounded-xl shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setActiveSlide(0)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSlide === 0
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    <CalcIcon className="w-3.5 h-3.5" />
                    <span>Internal Calculator</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSlide(1)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSlide === 1
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Target Matrix (6 Grades)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSlide(2)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSlide === 2
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Subject Explorer</span>
                  </button>
                </div>

                {/* Carousel Prev / Next Controls */}
                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={prevSlide}
                    title="Previous Slide"
                    aria-label="Previous Slide"
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    title="Next Slide"
                    aria-label="Next Slide"
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sliding Content Viewport */}
              <div className="overflow-hidden relative min-h-[480px]">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {/* SLIDE 0: INTERNAL MARKS CALCULATOR */}
                  <div className="w-full flex-shrink-0 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    {/* Slide Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            Continuous Internal Assessment
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                          Data Structures &amp; Algorithms
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className="font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/60">
                            PCC-CS301
                          </span>
                          <span>•</span>
                          <span>Theory Course</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">3 Credits</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl px-4 py-2 text-right self-start sm:self-auto shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                          Total Internal
                        </span>
                        <span className="text-sm sm:text-base font-black text-slate-800 dark:text-white font-mono">
                          Max 30 Marks
                        </span>
                      </div>
                    </div>

                    {/* 4 Clean Input Cards */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Enter 4 Internal Components (Live Interactive):
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          Edit values to preview dynamic calculations
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                        {/* CA1 */}
                        <div className="bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-3.5 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-2xs">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                            CA1 (Out of 25)
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={ca1}
                            onChange={(e) => setCa1(Math.max(0, Math.min(25, Number(e.target.value) || 0)))}
                            className="w-full text-lg font-black text-slate-900 dark:text-white bg-transparent focus:outline-none"
                          />
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">Class Test 1</span>
                        </div>

                        {/* CA2 */}
                        <div className="bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-3.5 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-2xs">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                            CA2 (Out of 25)
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={ca2}
                            onChange={(e) => setCa2(Math.max(0, Math.min(25, Number(e.target.value) || 0)))}
                            className="w-full text-lg font-black text-slate-900 dark:text-white bg-transparent focus:outline-none"
                          />
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">Class Test 2</span>
                        </div>

                        {/* WCA */}
                        <div className="bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-3.5 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-2xs">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                            WCA (Out of 10)
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={wca}
                            onChange={(e) => setWca(Math.max(0, Math.min(10, Number(e.target.value) || 0)))}
                            className="w-full text-lg font-black text-slate-900 dark:text-white bg-transparent focus:outline-none"
                          />
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">Direct Out of 10</span>
                        </div>

                        {/* ECA */}
                        <div className="bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-3.5 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-2xs">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                            ECA (Out of 70)
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="70"
                            value={eca}
                            onChange={(e) => setEca(Math.max(0, Math.min(70, Number(e.target.value) || 0)))}
                            className="w-full text-lg font-black text-slate-900 dark:text-white bg-transparent focus:outline-none"
                          />
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">Scaled as ECA / 7</span>
                        </div>
                      </div>
                    </div>

                    {/* Result Summary & Formula Banner */}
                    <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-blue-50/80 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                            Calculated Internal Marks
                          </span>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-blue-400 font-mono tracking-tight">
                              {previewCalc.totalInternal}
                            </span>
                            <span className="text-sm font-bold text-blue-500/80 dark:text-blue-400/80 font-mono">/ 30 Marks</span>
                          </div>
                        </div>
                        <div className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 px-3 py-1.5 rounded-xl border border-blue-100 dark:border-blue-900/50 shadow-2xs self-start sm:self-auto">
                          Formula: ((CA1 + CA2) / 5) + (ECA / 7) + WCA
                        </div>
                      </div>

                      {/* 3 Component Breakdown Badges */}
                      <div className="grid grid-cols-3 gap-2.5 pt-1">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 shadow-2xs text-center sm:text-left">
                          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">CA Component</span>
                          <span className="text-xs sm:text-sm font-black font-mono text-slate-800 dark:text-white">
                            {previewCalc.caMarks} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">/ 10</span>
                          </span>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 shadow-2xs text-center sm:text-left">
                          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">ECA Component</span>
                          <span className="text-xs sm:text-sm font-black font-mono text-slate-800 dark:text-white">
                            {previewCalc.ecaMarks} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">/ 10</span>
                          </span>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-800 shadow-2xs text-center sm:text-left">
                          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">WCA Component</span>
                          <span className="text-xs sm:text-sm font-black font-mono text-slate-800 dark:text-white">
                            {previewCalc.wcaMarks} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">/ 10</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Slide CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <p className="text-xs text-slate-500 text-center sm:text-left">
                        With <strong>{previewCalc.totalInternal}/30</strong> internal marks, see what you need in the end-semester exam:
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveSlide(1)}
                        className="btn-shimmer bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center space-x-2"
                      >
                        <span>See Required Target Marks</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* SLIDE 1: TARGET SCORE MATRIX */}
                  <div className="w-full flex-shrink-0 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    {/* Slide Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            End-Semester Exam Targets (Out of 70)
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                          Required Marks to Score Each Grade
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Calculated from Internal Score ({previewCalc.totalInternal} / 30). Passing requires 40/100 aggregate.
                        </p>
                      </div>

                      <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 rounded-2xl px-3.5 py-2 text-right self-start sm:self-auto shadow-2xs">
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                          Official Rule
                        </span>
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                          No 28/70 Floor Constraint
                        </span>
                      </div>
                    </div>

                    {/* 6 Target Cards Grid: 3 cols */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {/* D / Pass */}
                      <div className="bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100/90 dark:border-rose-900/40 rounded-2xl p-4 flex items-center justify-between hover:scale-[1.02] transition-transform shadow-2xs">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-rose-500 text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                            D
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">To Pass</span>
                              <span className="text-[10px] font-mono text-rose-700 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-900/50 px-1.5 py-0.2 rounded font-semibold">49-40</span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Min 40 overall aggregate</span>
                          </div>
                        </div>
                        <div className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400 font-mono">
                          {formatTargetScore(previewCalc.passNeeded)}
                        </div>
                      </div>

                      {/* C / 6 Pointer */}
                      <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100/90 dark:border-amber-900/40 rounded-2xl p-4 flex items-center justify-between hover:scale-[1.02] transition-transform shadow-2xs">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                            C
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">6 Pointer</span>
                              <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/50 px-1.5 py-0.2 rounded font-semibold">59-50</span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Fair grade cutoff</span>
                          </div>
                        </div>
                        <div className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                          {formatTargetScore(previewCalc.cNeeded)}
                        </div>
                      </div>

                      {/* B / 7 Pointer */}
                      <div className="bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100/90 dark:border-purple-900/40 rounded-2xl p-4 flex items-center justify-between hover:scale-[1.02] transition-transform shadow-2xs">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                            B
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">7 Pointer</span>
                              <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-900/50 px-1.5 py-0.2 rounded font-semibold">69-60</span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Good grade cutoff</span>
                          </div>
                        </div>
                        <div className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400 font-mono">
                          {formatTargetScore(previewCalc.bNeeded)}
                        </div>
                      </div>

                      {/* A / 8 Pointer */}
                      <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100/90 dark:border-blue-900/40 rounded-2xl p-4 flex items-center justify-between hover:scale-[1.02] transition-transform shadow-2xs">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                            A
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">8 Pointer</span>
                              <span className="text-[10px] font-mono text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/50 px-1.5 py-0.2 rounded font-semibold">79-70</span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Very Good grade cutoff</span>
                          </div>
                        </div>
                        <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                          {formatTargetScore(previewCalc.aNeeded)}
                        </div>
                      </div>

                      {/* E / 9 Pointer */}
                      <div className="bg-teal-50/60 dark:bg-teal-950/20 border border-teal-100/90 dark:border-teal-900/40 rounded-2xl p-4 flex items-center justify-between hover:scale-[1.02] transition-transform shadow-2xs">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                            E
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">9 Pointer</span>
                              <span className="text-[10px] font-mono text-teal-700 dark:text-teal-300 bg-teal-100/70 dark:bg-teal-900/50 px-1.5 py-0.2 rounded font-semibold">89-80</span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Excellent grade cutoff</span>
                          </div>
                        </div>
                        <div className="text-base sm:text-lg font-black text-teal-600 dark:text-teal-400 font-mono">
                          {formatTargetScore(previewCalc.eNeeded)}
                        </div>
                      </div>

                      {/* O / 10 Pointer */}
                      <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100/90 dark:border-emerald-900/40 rounded-2xl p-4 flex items-center justify-between hover:scale-[1.02] transition-transform shadow-2xs">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                            O
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">10 Pointer</span>
                              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/50 px-1.5 py-0.2 rounded font-semibold">100-90</span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Outstanding grade</span>
                          </div>
                        </div>
                        <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                          {formatTargetScore(previewCalc.oNeeded)}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Slide CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveSlide(0)}
                        className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 cursor-pointer py-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to Internal Marks</span>
                      </button>
                      <div className="flex items-center space-x-2.5">
                        <button
                          type="button"
                          onClick={() => setActiveSlide(2)}
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-3 py-2 cursor-pointer"
                        >
                          <span>Explore Curriculum →</span>
                        </button>
                        <button
                          type="button"
                          onClick={onGetStarted}
                          className="btn-shimmer bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center space-x-1.5"
                        >
                          <span>Open Full Calculator</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SLIDE 2: CURRICULUM EXPLORER */}
                  <div className="w-full flex-shrink-0 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    {/* Slide Header & Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            Official MAKAUT Curriculum Database
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                          11 Engineering Disciplines Pre-Loaded
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Select your branch and semester to preview mapped theory subjects.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 self-start sm:self-auto">
                        <select
                          value={previewBranch}
                          onChange={(e) => setPreviewBranch(e.target.value)}
                          className="text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-2xs focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          {BRANCHES.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.name}
                            </option>
                          ))}
                        </select>
                        <select
                          value={previewSemester}
                          onChange={(e) => setPreviewSemester(e.target.value)}
                          className="text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-2xs focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          {SEMESTERS.slice(2).map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Subject Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {explorerSubjects.slice(0, 6).map((subj) => (
                        <div
                          key={subj.id}
                          onClick={onGetStarted}
                          className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-mono text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/60">
                                {subj.code}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                {subj.credits} Credits
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {subj.name}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400">
                            <span>Calculate Target</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Slide CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveSlide(1)}
                        className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 cursor-pointer py-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to Target Scores</span>
                      </button>
                      <button
                        type="button"
                        onClick={onGetStarted}
                        className="btn-shimmer bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center space-x-2"
                      >
                        <span>Browse All 350+ Subjects</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Minimal Navigation Footer Bar */}
              <div className="bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                {/* Progress Indicators */}
                <div className="flex items-center space-x-2">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSlide === idx
                          ? 'w-8 bg-blue-600 shadow-xs'
                          : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 pl-1.5">
                    Slide {activeSlide + 1} of 3
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="hidden sm:inline text-[11px] text-slate-400 dark:text-slate-500">
                    {isHovered ? 'Paused on hover' : 'Auto-advances every 3s'}
                  </span>
                  <button
                    type="button"
                    onClick={onGetStarted}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer inline-flex items-center space-x-1"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "WHY GRADECOMPASS" FEATURE SECTION */}
      <section id="features" className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Features List (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
                  WHY GRADECOMPASS
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Focus on <span className="text-blue-600 dark:text-blue-400">Your Goals</span>
                  <br />
                  Not the Formulas
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed max-w-xl">
                  GradeCompass takes care of the complex calculations, so you can spend more time learning, improving and achieving what matters.
                </p>
              </div>

              {/* 4 Feature Items */}
              <div className="space-y-4 pt-2">
                {/* 1. Accurate Calculations */}
                <div className="flex items-start space-x-3.5 group hover:translate-x-1.5 transition-transform duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Accurate Calculations
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Based on official MAKAUT evaluation rules
                    </p>
                  </div>
                </div>

                {/* 2. No Login Required */}
                <div className="flex items-start space-x-3.5 group hover:translate-x-1.5 transition-transform duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      No Login Required
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Instant results, no personal data needed
                    </p>
                  </div>
                </div>

                {/* 3. Simple & Clean */}
                <div className="flex items-start space-x-3.5 group hover:translate-x-1.5 transition-transform duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Simple &amp; Clean
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Easy to use interface
                    </p>
                  </div>
                </div>

                {/* 4. 100% Client-Side */}
                <div className="flex items-start space-x-3.5 group hover:translate-x-1.5 transition-transform duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      100% Client-Side
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
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
                <div className="absolute inset-0 rounded-full border border-dashed border-blue-200/80 dark:border-blue-800/60 animate-spin-slow pointer-events-none">
                  {/* Planetary Satellite Dots with Glowing Rings */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-600 shadow-md shadow-blue-500/60 ring-2 ring-white dark:ring-slate-900"></div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-md shadow-sky-400/60 ring-2 ring-white dark:ring-slate-900"></div>
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-md shadow-indigo-500/60 ring-2 ring-white dark:ring-slate-900"></div>
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/60 ring-2 ring-white dark:ring-slate-900"></div>
                </div>

                {/* Inner Orbit Circle with Counter-Spin */}
                <div className="absolute inset-10 rounded-full border border-dotted border-blue-200/60 dark:border-blue-900/40 animate-spin-reverse-slow pointer-events-none"></div>

                {/* Radar Sweep Ambient Beam */}
                <div className="absolute inset-4 rounded-full overflow-hidden pointer-events-none opacity-25">
                  <div className="w-full h-full animate-radar-sweep origin-center bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(37,99,235,0.22)_360deg)] rounded-full"></div>
                </div>

                {/* Expanding Ambient Wave Pulse Ring */}
                <div className="absolute w-44 h-44 rounded-full border-2 border-blue-400/30 dark:border-blue-500/20 animate-pulse-ring pointer-events-none"></div>

                {/* Center Core Circle: A Clearer You */}
                <div className="w-36 h-36 rounded-full bg-white dark:bg-slate-900 shadow-xl shadow-blue-500/10 border border-slate-100 dark:border-slate-800 ring-4 ring-blue-50/80 dark:ring-blue-950/40 flex flex-col items-center justify-center text-center p-3 z-10 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                  <div className="w-11 h-11 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Compass className="w-6 h-6 animate-compass-needle" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    A Clearer
                  </span>
                  <span className="text-lg font-black text-blue-600 dark:text-blue-400 -mt-1 tracking-tight">
                    You
                  </span>
                </div>

                {/* Orbit Node 1: Plan (Top Left) */}
                <div className="absolute top-6 left-2 z-20 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 px-3.5 py-2 flex items-center space-x-2 animate-float-slow hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Plan
                  </span>
                </div>

                {/* Orbit Node 2: Calculate (Top Right) */}
                <div className="absolute top-6 right-2 z-20 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 px-3.5 py-2 flex items-center space-x-2 animate-float-delayed-1 hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <CalcIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Calculate
                  </span>
                </div>

                {/* Orbit Node 3: Track (Bottom Left) */}
                <div className="absolute bottom-6 left-2 z-20 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 px-3.5 py-2 flex items-center space-x-2 animate-float-delayed-2 hover:scale-110 hover:translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Track
                  </span>
                </div>

                {/* Orbit Node 4: Achieve (Bottom Right) */}
                <div className="absolute bottom-6 right-2 z-20 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 px-3.5 py-2 flex items-center space-x-2 animate-float-delayed-3 hover:scale-110 hover:translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Achieve
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THREE HIGHLIGHT VALUE CARDS STRIP */}
      <section className="py-10 bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Currently in Building Phase */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-start space-x-3.5 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:rotate-180 transition-transform duration-700 ease-out">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Currently in Building Phase
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Continuously improving with your feedback
                </p>
              </div>
            </div>

            {/* Card 2: Built for MAKAUT Students */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-start space-x-3.5 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Built for MAKAUT Students
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Designed around your university&apos;s grading system
                </p>
              </div>
            </div>

            {/* Card 3: Free to Use */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-start space-x-3.5 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400 flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-transform duration-300">
                <Heart className="w-5 h-5 animate-heartbeat" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Free to Use
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Always accessible, no hidden costs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "MORE THAN A CALCULATOR" SECTION */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left Column: Modern UI Showcase Card (5 cols) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Dot Grid Pattern Background */}
                <div className="absolute -left-6 -bottom-6 w-32 h-32 opacity-30 grid grid-cols-6 gap-2 pointer-events-none">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                  ))}
                </div>

                {/* Main Feature UI Showcase Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-2xl border border-slate-200/90 dark:border-slate-800 relative z-10 transition-all duration-300 space-y-4">
                  {/* Card Header: Simulated App Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Curriculum Database
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-900/60">
                      11 Branches Mapped
                    </span>
                  </div>

                  {/* Subject Preview Snippet */}
                  <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/40 dark:border-blue-800/60">
                        PCC-CS301
                      </span>
                      <span className="font-semibold text-slate-500 dark:text-slate-400">
                        3 Credits • Theory
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Data Structure &amp; Algorithms
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      Internal = ((CA1 + CA2) / 5) + (ECA / 7) + WCA
                    </div>
                  </div>

                  {/* Target Scores Pill Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-rose-50 dark:bg-rose-950/30 rounded-lg p-2 border border-rose-100 dark:border-rose-900/40">
                      <div className="text-[10px] font-bold text-rose-700 dark:text-rose-300">D / Pass</div>
                      <div className="text-sm font-black font-mono text-rose-600 dark:text-rose-400 mt-0.5">20/70</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2 border border-blue-100 dark:border-blue-900/40">
                      <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300">A / 8 Ptr</div>
                      <div className="text-sm font-black font-mono text-blue-600 dark:text-blue-400 mt-0.5">50/70</div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-2 border border-emerald-100 dark:border-emerald-900/40">
                      <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">O / 10 Ptr</div>
                      <div className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">70/70</div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="pt-1 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Zero hardcoded 28/70 floor (Aggregate pass)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Semesters 3 to 8 pre-loaded for all major branches</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Copy & Link (7 cols) */}
            <div className="md:col-span-7 space-y-4 text-left">
              <p className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                MORE THAN A CALCULATOR
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Plan Smarter<br />
                <span className="text-blue-600 dark:text-blue-400">Perform</span> Better
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Set realistic goals, understand your grades, and stay motivated throughout your semester with GradeCompass.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm inline-flex items-center space-x-1.5 group cursor-pointer"
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
      <section className="py-16 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 text-center transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Ready to take control of your grades?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
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
      <footer id="about" className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 pt-16 pb-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Footer Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Column 1 & 2: Brand & Tagline */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full border border-blue-600 flex items-center justify-center text-blue-600">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  Grade<span className="text-blue-600 dark:text-blue-400">Compass</span>
                </span>
              </div>
              <p className="text-slate-400 dark:text-slate-500 text-xs max-w-xs">
                Ideas for a better academic tomorrow.
              </p>
              {/* Social Icons */}
              <div className="flex items-center space-x-3 pt-2 text-slate-400 dark:text-slate-500">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
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
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
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
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
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
              <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">Product</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenGradeSystem}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Grade System
                  </button>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#study-tips" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Study Tips
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenGradeSystem}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left"
                  >
                    University Guidelines
                  </button>
                </li>
                <li>
                  <a href="#blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: About */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">About</h5>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={onOpenAbout}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Our Story
                  </button>
                </li>
                <li>
                  <a href="mailto:contact@gradecompass.org" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#feedback" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 6: Developed by ADI */}
            <div className="border-l border-slate-100 dark:border-slate-800 pl-4 space-y-1">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 block">Developed by</span>
              <span className="text-base font-black text-slate-900 dark:text-white tracking-tight block">
                ADI
              </span>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                Ideas for a better tomorrow.
              </p>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 gap-2">
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
