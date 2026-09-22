import { useState, useEffect } from 'react'
import { Sliders, Calculator, Plus, Trash2, CheckCircle2 } from 'lucide-react'
import { normalizeTheoryInternal, normalizePracticalInternal } from '../utils/gradeCalculations'

export default function InternalScoreInput({
  courseConfig,
  internalMarks,
  onChangeInternal,
}) {
  const [inputMode, setInputMode] = useState('direct') // 'direct' or 'normalizer'

  // Theory Raw State
  const [classTests, setClassTests] = useState([20, 22])
  const [testSelection, setTestSelection] = useState('avg')
  const [continuousAssessment, setContinuousAssessment] = useState(55)
  const [scalingMethod, setScalingMethod] = useState('balanced')

  // Practical Raw State
  const [labPerformance, setLabPerformance] = useState(50)
  const [labViva, setLabViva] = useState(32)

  // Calculate normalized values
  const theoryNorm = normalizeTheoryInternal({
    classTests,
    testSelection,
    continuousAssessment,
    scalingMethod,
  })

  const practicalNorm = normalizePracticalInternal({
    labPerformance,
    labViva,
  })

  const currentNormalizedScore =
    courseConfig.id === 'THEORY'
      ? theoryNorm.normalizedInternal
      : practicalNorm.normalizedInternal

  // Auto sync if user is in normalizer mode
  useEffect(() => {
    if (inputMode === 'normalizer') {
      onChangeInternal(currentNormalizedScore)
    }
  }, [inputMode, currentNormalizedScore, onChangeInternal])

  const handleAddTest = () => {
    if (classTests.length < 4) {
      setClassTests([...classTests, 20])
    }
  }

  const handleRemoveTest = (index) => {
    if (classTests.length > 1) {
      setClassTests(classTests.filter((_, i) => i !== index))
    }
  }

  const handleUpdateTest = (index, value) => {
    const num = Math.max(0, Math.min(25, Number(value) || 0))
    const updated = [...classTests]
    updated[index] = num
    setClassTests(updated)
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm transition-colors">
      {/* Header and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Internal Evaluation Marks
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Max {courseConfig.maxInternal} Marks
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Enter marks secured so far before the final end-semester exam
          </p>
        </div>

        {/* Mode Toggle: Direct vs Normalizer */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto border border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setInputMode('direct')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              inputMode === 'direct'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Direct Score</span>
          </button>
          <button
            type="button"
            onClick={() => setInputMode('normalizer')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              inputMode === 'normalizer'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Raw Normalizer</span>
          </button>
        </div>
      </div>

      {/* DIRECT MODE */}
      {inputMode === 'direct' && (
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="direct-internal-input"
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Your Internal Score (out of {courseConfig.maxInternal})
            </label>
            <div className="flex items-baseline space-x-1">
              <input
                id="direct-internal-input"
                type="number"
                min="0"
                max={courseConfig.maxInternal}
                step="0.5"
                value={internalMarks}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(courseConfig.maxInternal, Number(e.target.value) || 0))
                  onChangeInternal(val)
                }}
                className="w-20 px-3 py-1.5 text-right font-mono font-bold text-lg rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
                / {courseConfig.maxInternal}
              </span>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={courseConfig.maxInternal}
              step="0.5"
              value={internalMarks}
              onChange={(e) => onChangeInternal(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              <span>0 Marks</span>
              <span>Halfway ({courseConfig.maxInternal / 2})</span>
              <span>Full Marks ({courseConfig.maxInternal})</span>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quick Pick:</span>
            {[
              Math.round(courseConfig.maxInternal * 0.5),
              Math.round(courseConfig.maxInternal * 0.7),
              Math.round(courseConfig.maxInternal * 0.8),
              Math.round(courseConfig.maxInternal * 0.9),
              courseConfig.maxInternal,
            ].map((presetVal) => (
              <button
                key={presetVal}
                type="button"
                onClick={() => onChangeInternal(presetVal)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  internalMarks === presetVal
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {presetVal}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RAW NORMALIZER MODE */}
      {inputMode === 'normalizer' && (
        <div className="mt-5 space-y-6">
          {courseConfig.id === 'THEORY' ? (
            /* THEORY NORMALIZER: 25-mark tests + 70-mark continuous assessment -> 30 marks */
            <div className="space-y-5">
              {/* Class Tests */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Class Tests (Max 25 Marks Each)
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Midterms or unit tests conducted during the semester
                    </p>
                  </div>
                  {/* Test Selection: Average vs Best 2 */}
                  <select
                    value={testSelection}
                    onChange={(e) => setTestSelection(e.target.value)}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="avg">Average All Tests</option>
                    <option value="best2">Best 2 Tests</option>
                    <option value="best1">Best Single Test</option>
                  </select>
                </div>

                {/* Tests Input Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {classTests.map((score, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 block">
                          Test {idx + 1}
                        </span>
                        <input
                          type="number"
                          min="0"
                          max="25"
                          step="0.5"
                          value={score}
                          onChange={(e) => handleUpdateTest(idx, e.target.value)}
                          className="w-14 font-mono font-bold text-sm text-slate-900 dark:text-white bg-transparent focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-[11px] text-slate-400">/25</span>
                        {classTests.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTest(idx)}
                            className="text-slate-400 hover:text-rose-500 p-0.5 rounded transition-colors"
                            title="Remove test"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {classTests.length < 4 && (
                    <button
                      type="button"
                      onClick={handleAddTest}
                      className="p-2.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex flex-col items-center justify-center text-xs font-semibold transition-colors"
                    >
                      <Plus className="w-4 h-4 mb-0.5" />
                      <span>Add Test</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Continuous Assessment (70 Marks) */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Part B: Pre-Exam Mock Test (Max 70 Marks)
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Written mock test covering whole syllabus, converted to 10 marks
                    </p>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <input
                      type="number"
                      min="0"
                      max="70"
                      step="0.5"
                      value={continuousAssessment}
                      onChange={(e) =>
                        setContinuousAssessment(
                          Math.max(0, Math.min(70, Number(e.target.value) || 0))
                        )
                      }
                      className="w-16 px-2.5 py-1 text-right font-mono font-bold text-base rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-bold text-slate-400">/ 70</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="70"
                  step="1"
                  value={continuousAssessment}
                  onChange={(e) => setContinuousAssessment(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Scaling Scheme Toggle */}
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Normalization Weightage Scheme:</span>
                <select
                  value={scalingMethod}
                  onChange={(e) => setScalingMethod(e.target.value)}
                  className="px-2 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                >
                  <option value="balanced">Balanced (15 CT + 15 CA = 30)</option>
                  <option value="proportional">Proportional ((CT+CA)/95 × 30)</option>
                </select>
              </div>

              {/* Normalization Mathematical Summary Card */}
              <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Mathematical Normalization Result</span>
                    </div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-300 font-mono">
                      Part A: ({theoryNorm.effectiveTestScore}/25) &times; 10 = {theoryNorm.classTestContribution}
                      <span className="mx-1.5">+</span>
                      Part B (Mock): ({theoryNorm.caScore}/70) &times; 10 = {theoryNorm.caContribution}
                      <span className="mx-1.5">+</span>
                      Part C: {theoryNorm.wcaContribution}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {theoryNorm.normalizedInternal}
                    </span>
                    <span className="text-xs font-bold text-indigo-400 dark:text-indigo-500 block">
                      / 30 Marks
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* PRACTICAL NORMALIZER: 60 Lab Performance + 40 Lab Viva -> 40 marks */
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Continuous Lab Experiments & Records
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Weekly lab performance and lab notebook reports (Max 60 Marks)
                    </p>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <input
                      type="number"
                      min="0"
                      max="60"
                      step="0.5"
                      value={labPerformance}
                      onChange={(e) =>
                        setLabPerformance(Math.max(0, Math.min(60, Number(e.target.value) || 0)))
                      }
                      className="w-16 px-2.5 py-1 text-right font-mono font-bold text-base rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-bold text-slate-400">/ 60</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="1"
                  value={labPerformance}
                  onChange={(e) => setLabPerformance(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Midterm Lab Viva & Quiz
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Internal viva voce and practical test (Max 40 Marks)
                    </p>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <input
                      type="number"
                      min="0"
                      max="40"
                      step="0.5"
                      value={labViva}
                      onChange={(e) =>
                        setLabViva(Math.max(0, Math.min(40, Number(e.target.value) || 0)))
                      }
                      className="w-16 px-2.5 py-1 text-right font-mono font-bold text-base rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-bold text-slate-400">/ 40</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={labViva}
                  onChange={(e) => setLabViva(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Practical Normalization Result */}
              <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Practical Normalization Result</span>
                    </div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-300 font-mono">
                      Lab Records: ({practicalNorm.labPerf}/60) × 24 = {practicalNorm.perfContribution}
                      <span className="mx-1.5">+</span>
                      Viva: ({practicalNorm.labViva}/40) × 16 = {practicalNorm.vivaContribution}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {practicalNorm.normalizedInternal}
                    </span>
                    <span className="text-xs font-bold text-indigo-400 dark:text-indigo-500 block">
                      / 40 Marks
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

