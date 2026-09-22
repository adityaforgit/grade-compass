import { useState, useMemo } from 'react'
import {
  Compass,
  Sun,
  GraduationCap,
  Calendar,
  FileText,
  FileCode,
  Database,
  Monitor,
  Cpu,
  FlaskConical,
  Code2,
  MessageSquare,
  Leaf,
  Search,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Home,
  BookOpen,
  Calculator as CalcIcon,
} from 'lucide-react'
import {
  BRANCHES,
  SEMESTERS,
  getSubjectsForBranchAndSemester,
} from '../data/curriculumData'

// Helper to map icon names to Lucide icon components
function SubjectIcon({ iconName, className = 'w-5 h-5' }) {
  switch (iconName) {
    case 'file-text':
      return <FileText className={className} />
    case 'file-code':
      return <FileCode className={className} />
    case 'database':
      return <Database className={className} />
    case 'monitor':
      return <Monitor className={className} />
    case 'cpu':
      return <Cpu className={className} />
    case 'flask':
      return <FlaskConical className={className} />
    case 'code':
      return <Code2 className={className} />
    case 'message':
      return <MessageSquare className={className} />
    case 'leaf':
      return <Leaf className={className} />
    default:
      return <FileText className={className} />
  }
}

export default function SubjectExplorer({
  onNavigateHome,
  onOpenGradeSystem,
  onOpenAbout,
  onOpenResources,
  onSelectSubject,
}) {
  // Default values set to Computer Science & Engineering and Semester 3
  const [selectedBranch, setSelectedBranch] = useState('CSE')
  const [selectedSemester, setSelectedSemester] = useState('SEM-3')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Fetch subjects dynamically based on selected branch and semester
  const subjects = useMemo(() => {
    return getSubjectsForBranchAndSemester(selectedBranch, selectedSemester)
  }, [selectedBranch, selectedSemester])

  // Filter subjects based on live search query
  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return subjects
    const q = searchQuery.toLowerCase().trim()
    return subjects.filter(
      (sub) =>
        sub.name.toLowerCase().includes(q) ||
        sub.code.toLowerCase().includes(q) ||
        sub.type.toLowerCase().includes(q)
    )
  }, [subjects, searchQuery])

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. TOP NAVBAR (matching screenshot) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand */}
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

            {/* Center: Top Navigation Links */}
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

            {/* Right: Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                title="Toggle Theme"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Sun className="w-4 h-4" />
              </button>

              {/* Mobile Menu Toggle Button */}
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
                  const target = document.querySelector('h1')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-left cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>My Subjects</span>
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
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span>About</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-1">
                SELECT YOUR ACADEMIC DETAILS
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Choose Your Branch and Semester
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                Select your branch and semester to view your subjects and start calculating your target marks.
              </p>
            </div>

            {/* MAKAUT Evaluation Badge (Right Top) */}
            <div className="flex items-center space-x-3 bg-blue-50/70 border border-blue-100 rounded-2xl px-4 py-3 self-start lg:self-auto shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">
                  MAKAUT
                </span>
                <span className="text-xs text-slate-500 block">
                  Based on official evaluation rules
                </span>
              </div>
            </div>
          </div>

          {/* Branch and Semester Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {/* Select Branch */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Select Branch
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FileText className="w-4 h-4" />
                </div>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 shadow-2xs appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
                >
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Select Semester */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Select Semester
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 shadow-2xs appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
                >
                  {SEMESTERS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* "Your Subjects" Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Your Subjects
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click on a subject to calculate your required marks.
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Subject Cards Grid (3 cols on desktop) */}
            {filteredSubjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSubjects.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => onSelectSubject && onSelectSubject(sub)}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[135px]"
                  >
                    {/* Top Row: Icon + Subject Info + Arrow */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                          <SubjectIcon iconName={sub.icon} className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                            {sub.name}
                          </h3>
                          <span className="text-xs text-slate-400 font-mono block mt-0.5">
                            {sub.code}
                          </span>
                        </div>
                      </div>

                      {/* Right Circular Arrow Button */}
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2"
                        title="Calculate for this subject"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bottom Row: Badge */}
                    <div className="mt-4 pt-2 flex items-center justify-between">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                          sub.type === 'Lab'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                        }`}
                      >
                        {sub.type}
                      </span>
                      {sub.credits > 0 && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          {sub.credits} Credits
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-6">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-700">
                  {searchQuery ? 'No subjects found' : 'No subjects added yet'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchQuery
                    ? `We couldn't find any subject matching "${searchQuery}". Try another term or clear the search.`
                    : 'Curriculum data for this semester will be available once added.'}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </main>

        {/* 3. FOOTER */}
        <footer className="border-t border-slate-200/80 bg-white py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>GradeCompass • Plan today. Score higher tomorrow.</span>
            <span>Developed by <strong className="text-slate-600 font-semibold">ADI</strong></span>
          </div>
        </footer>
      </div>
    )
  }

