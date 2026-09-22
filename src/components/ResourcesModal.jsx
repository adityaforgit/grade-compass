import { useState } from 'react'
import {
  X,
  BookOpen,
  Sparkles,
  FileText,
  Award,
  ArrowRight,
  Bell,
  CheckCircle2,
} from 'lucide-react'

export default function ResourcesModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  if (!isOpen) return null

  const handleNotifySubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Floating Glow Blobs */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-100/70 rounded-full filter blur-2xl pointer-events-none -z-10 animate-blob-1"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-sky-100/70 rounded-full filter blur-2xl pointer-events-none -z-10 animate-blob-2"></div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Central Animated Illustration */}
        <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
          {/* Outer Pulsing Wave Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse-ring pointer-events-none"></div>

          {/* Rotating Dashed Orbit Ring */}
          <div className="absolute inset-2 rounded-full border border-dashed border-blue-300 animate-spin-slow pointer-events-none">
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50 ring-2 ring-white"></div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400"></div>
          </div>

          {/* Center Glowing Hub */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform duration-300">
            <BookOpen className="w-10 h-10 animate-float-slow" />
          </div>

          {/* Floating Satellites with Staggered Animations */}
          <div className="absolute -top-1 -right-2 bg-white rounded-lg shadow-md border border-slate-100 px-2 py-1 flex items-center space-x-1 text-[10px] font-bold text-blue-600 animate-float-delayed-1 pointer-events-none">
            <FileText className="w-3 h-3" />
            <span>PYQs</span>
          </div>

          <div className="absolute -bottom-1 -left-2 bg-white rounded-lg shadow-md border border-slate-100 px-2 py-1 flex items-center space-x-1 text-[10px] font-bold text-emerald-600 animate-float-delayed-2 pointer-events-none">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Notes</span>
          </div>

          <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white rounded-lg shadow-md border border-slate-100 px-2 py-1 flex items-center space-x-1 text-[10px] font-bold text-indigo-600 animate-float-delayed-3 pointer-events-none">
            <Award className="w-3 h-3" />
            <span>Cheatsheets</span>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
          <span>STUDY RESOURCES &amp; PYQs</span>
        </div>

        {/* Main Heading & Subtitle */}
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Coming Soon!
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
          We&apos;re currently assembling official <strong className="text-slate-800">MAKAUT previous year question papers</strong>, semester module roadmaps, and high-yield formula cheat sheets for your branch.
        </p>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-1.5">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] font-bold text-slate-800 leading-tight">MAKAUT PYQs</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Solved 5-year papers</div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] font-bold text-slate-800 leading-tight">Module Notes</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Organized by syllabus</div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
            <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-1.5">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] font-bold text-slate-800 leading-tight">Formula Sheets</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Quick exam revision</div>
          </div>
        </div>

        {/* Notify Me Box or Thank You State */}
        {!isSubscribed ? (
          <form onSubmit={handleNotifySubmit} className="space-y-3">
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl p-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <input
                type="email"
                required
                placeholder="Enter your email for early access..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-shimmer bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer flex items-center space-x-1"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Notify Me</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              No spam ever. We&apos;ll notify you the moment resources are released.
            </p>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-center space-x-2 text-xs font-bold text-green-700 animate-pop-in">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>You&apos;re on the early access list! We&apos;ll keep you posted.</span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <span>Back to Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

