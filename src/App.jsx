import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import SubjectExplorer from './components/SubjectExplorer'
import SubjectCalculator from './components/SubjectCalculator'
import Header from './components/Header'
import Calculator from './components/Calculator'
import SemesterPlanner from './components/SemesterPlanner'
import GradeSystemModal from './components/GradeSystemModal'
import AboutModal from './components/AboutModal'
import ResourcesModal from './components/ResourcesModal'
import FormulaExplainerModal from './components/FormulaExplainerModal'
import Footer from './components/Footer'
import { ArrowLeft } from 'lucide-react'

export default function App() {
  // Current view: 'landing' (default), 'subjects' (academic details & subjects), 'calculator', or 'planner'
  const [currentView, setCurrentView] = useState('landing')

  // Clean up any previously persisted dark theme so the app runs in clean default light theme
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.removeItem('gc_theme')
  }, [])

  // Selected subject from SubjectExplorer
  const [selectedSubject, setSelectedSubject] = useState(null)

  // Modals state
  const [isGradeSystemOpen, setIsGradeSystemOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false)

  // Calculator state
  const [courseType, setCourseType] = useState('THEORY')
  const [internalMarks, setInternalMarks] = useState(24)
  const [selectedGrade, setSelectedGrade] = useState('A')

  // Preset selection handler
  const handleSelectPreset = (preset) => {
    setCourseType(preset.courseType)
    setInternalMarks(preset.internalScore)
    setSelectedGrade(preset.targetGrade)
    setCurrentView('calculator')
  }

  // If on landing page, render the exact pixel-perfect landing page from the screenshot
  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          onGetStarted={() => {
            setCurrentView('subjects')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onOpenGradeSystem={() => setIsGradeSystemOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />

        <GradeSystemModal
          isOpen={isGradeSystemOpen}
          onClose={() => setIsGradeSystemOpen(false)}
        />

        <AboutModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />
      </>
    )
  }

  // If on academic details / subject explorer page (matching media_1790019502351.png)
  if (currentView === 'subjects') {
    return (
      <>
        <SubjectExplorer
          onNavigateHome={() => {
            setCurrentView('landing')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onOpenGradeSystem={() => setIsGradeSystemOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenResources={() => setIsResourcesOpen(true)}
          onSelectSubject={(subject) => {
            setSelectedSubject(subject)
            setCurrentView('subject-calculator')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />

        <GradeSystemModal
          isOpen={isGradeSystemOpen}
          onClose={() => setIsGradeSystemOpen(false)}
        />

        <AboutModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />

        <ResourcesModal
          isOpen={isResourcesOpen}
          onClose={() => setIsResourcesOpen(false)}
        />
      </>
    )
  }

  // If on Subject Score Calculator page (matching media_1790021476353.png)
  if (currentView === 'subject-calculator') {
    return (
      <>
        <SubjectCalculator
          subject={
            selectedSubject || {
              name: 'Data Structures',
              code: 'CS301',
              type: 'Theory',
              credits: 3,
            }
          }
          onBackToSubjects={() => {
            setCurrentView('subjects')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onNavigateHome={() => {
            setCurrentView('landing')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onOpenGradeSystem={() => setIsGradeSystemOpen(true)}
          onOpenResources={() => setIsResourcesOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
        />

        <GradeSystemModal
          isOpen={isGradeSystemOpen}
          onClose={() => setIsGradeSystemOpen(false)}
        />

        <AboutModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />

        <ResourcesModal
          isOpen={isResourcesOpen}
          onClose={() => setIsResourcesOpen(false)}
        />

        <FormulaExplainerModal
          isOpen={isFormulaModalOpen}
          onClose={() => setIsFormulaModalOpen(false)}
        />
      </>
    )
  }

  // Full Workspace View (Single Course Calculator / Semester SGPA Planner)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner to Return to Subjects or Landing Page */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-8 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => {
              setCurrentView('subjects')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-flex items-center space-x-1.5 font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Subjects</span>
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => {
              setCurrentView('landing')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Home
          </button>
        </div>
        <span className="text-slate-500 hidden sm:inline">
          Official MAKAUT Assessment Architecture &amp; Reverse Calculator
        </span>
      </div>

      {/* Header */}
      <Header
        activeTab={currentView}
        setActiveTab={setCurrentView}
        onSelectPreset={handleSelectPreset}
        onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'calculator' ? (
          <Calculator
            courseType={courseType}
            setCourseType={setCourseType}
            internalMarks={internalMarks}
            setInternalMarks={setInternalMarks}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            subject={selectedSubject}
            onBackToSubjects={() => {
              setCurrentView('subjects')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        ) : (
          <SemesterPlanner />
        )}
      </main>

      {/* Modals */}
      <GradeSystemModal
        isOpen={isGradeSystemOpen}
        onClose={() => setIsGradeSystemOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <ResourcesModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />

      <FormulaExplainerModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenFormulaModal={() => setIsFormulaModalOpen(true)} />
    </div>
  )
}
