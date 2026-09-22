import { useState } from 'react'
import { Compass, Moon, Sun, BookOpen, GraduationCap, Sparkles, Menu, X } from 'lucide-react'
import { CALCULATOR_PRESETS } from '../utils/presets'

export default function Header({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onSelectPreset,
  onOpenFormulaModal,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 flex-shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Grade<span className="text-indigo-600 dark:text-indigo-400">Compass</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  Algorithmic Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Reverse-engineered university finals & normalization calculator
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Target Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'planner'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Semester SGPA</span>
            </button>
          </div>

          {/* Actions: Presets, Formula Modal, Dark Mode */}
          <div className="flex items-center space-x-2">
            {/* Quick Presets Dropdown */}
            <div className="relative group hidden lg:block">
              <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Presets</span>
              </button>
              <div className="absolute right-0 mt-1 w-64 p-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
                <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Quick Load Student Scenarios
                </p>
                {CALCULATOR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset)}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  >
                    <div className="font-semibold">{preset.title}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {preset.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Explainer Button */}
            <button
              onClick={onOpenFormulaModal}
              title="View Normalization & Calculation Formulas"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mobile View Selector Tabs */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveTab('calculator')
                  setIsMobileMenuOpen(false)
                }}
                className={`flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'calculator'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Target Calculator</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('planner')
                  setIsMobileMenuOpen(false)
                }}
                className={`flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'planner'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Semester SGPA</span>
              </button>
            </div>

            {/* Formula Explainer Button in Mobile Drawer */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                onOpenFormulaModal()
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>View Calculation &amp; Normalization Formulas</span>
            </button>

            {/* Quick Presets in Mobile Drawer */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="px-1 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Load Scenarios</span>
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {CALCULATOR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onSelectPreset(preset)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    <div className="font-semibold">{preset.title}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {preset.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

