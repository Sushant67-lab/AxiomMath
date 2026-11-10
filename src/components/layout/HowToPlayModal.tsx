import React, { useState } from 'react';
import { X, Zap, BookOpen, FileCheck2, Sparkles, HelpCircle, ArrowRight, Gamepad2, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'play' | 'help';
  onNavigateToTab?: (tab: 'vault' | 'wordproblems' | 'rush' | 'test') => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ 
  isOpen, 
  onClose, 
  initialTab = 'play',
  onNavigateToTab 
}) => {
  const [activeTab, setActiveTab] = useState<'play' | 'help'>(initialTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const playSections = [
    {
      title: 'Speed Rush (45-Second Game Blitz)',
      badge: 'Game Mode',
      color: 'border-amber-500/30 bg-amber-950/15 text-amber-300',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      rules: [
        'You have exactly 45 seconds to solve as many mathematical formula identities as you can.',
        'Build Streak Combos: 2 streak = 2x multiplier, 4 streak = 3x multiplier, 6+ streak = 4x multiplier!',
        'Missing Components: Inspect the missing expression on screen and tap the correct math identity choice.',
        'High Scores & XP: Correct answers score points and convert to Scholar XP on game over.'
      ],
      actionTab: 'rush' as const,
      actionLabel: 'Launch Speed Rush Game'
    },
    {
      title: 'Textbook Word Problems Arena',
      badge: 'Curriculum Exercises',
      color: 'border-emerald-500/30 bg-emerald-950/15 text-emerald-300',
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
      rules: [
        'Authentic multi-step applied problems from standard curricula (Ages 12–25).',
        'Interactive Scratchpad: Open the digital scratchpad on the right to sketch derivatives and calculate intermediate terms.',
        '3-Tier Guided Hints: Reveal progressive hints if you need a conceptual nudge.',
        'Complete Proofs: Once submitted, inspect the fully worked textbook solution.'
      ],
      actionTab: 'wordproblems' as const,
      actionLabel: 'Solve Word Problems'
    },
    {
      title: 'Formula Vault & Handbook',
      badge: '20 Chapters',
      color: 'border-cyan-500/30 bg-cyan-950/15 text-cyan-300',
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      rules: [
        'Study all 20 chapters of engineering and higher mathematics with high-contrast KaTeX notation.',
        'Instant Search: Filter formulas across all 20 chapters in real-time.',
        'One-Click Copy: Copy LaTeX equations directly to your clipboard.',
        'Favorites (★): Bookmark frequently referenced formulas for rapid review.'
      ],
      actionTab: 'vault' as const,
      actionLabel: 'Explore Formula Vault'
    },
    {
      title: 'Diagnostic Test Center',
      badge: 'Examinations',
      color: 'border-purple-500/30 bg-purple-950/15 text-purple-300',
      icon: <FileCheck2 className="w-5 h-5 text-purple-400" />,
      rules: [
        'Take timed, proctored examinations across Trigonometry, Algebra, Calculus, and Integration.',
        'Review and flag difficult questions before final submission.',
        'Comprehensive Dossier: Get immediate accuracy ratings, itemized reviews, and academic XP.'
      ],
      actionTab: 'test' as const,
      actionLabel: 'Start Diagnostic Exam'
    }
  ];

  const helpTopics = [
    {
      q: 'Which age or curriculum level should I select?',
      a: 'AxiomMath caters to three distinct stages: Ages 12–15 (Middle school foundations, linear algebra, geometry), Ages 16–18 (High school pre-calculus, trigonometry, power derivatives), and Ages 19–25 (University STEM, differential equations, integrals, Laplace & Fourier series).'
    },
    {
      q: 'Can I play as a Guest or is registration required?',
      a: 'You can enjoy full access to all formulas, word problems, and games as a Guest. Signing in or registering permanently preserves your high scores, XP level, and printable achievement certificates.'
    },
    {
      q: 'How does multilingual support work?',
      a: 'Use the language dropdown in the second navbar to switch between English, Hindi (हिन्दी), Marathi (मराठी), Tamil (தமிழ்), Telugu (తెలుగు), Spanish (Español), French (Français), and German (Deutsch). Your preference is saved automatically.'
    },
    {
      q: 'How do I copy formulas to my notes or assignments?',
      a: 'In the Formula Vault, every formula card has a Copy button. Tapping it copies the clean mathematical formula directly into your clipboard.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/90 backdrop-blur-md overflow-y-auto transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 my-8 max-h-[90vh] overflow-y-auto transition-colors"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header with Tab Selector */}
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4 pr-8">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setActiveTab('play')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'play'
                  ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                  : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>How to Play & Rules</span>
            </button>

            <button
              onClick={() => setActiveTab('help')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'help'
                  ? 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                  : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Scholar FAQ & Help</span>
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {activeTab === 'play' ? 'How to Play AxiomMath' : 'Frequently Asked Questions & Help'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {activeTab === 'play'
              ? 'Complete guide to the mathematical speed blitz, textbook problem arena, and diagnostic testing.'
              : 'Everything you need to know about curriculum levels, account sync, formula copying, and languages.'}
          </p>
        </div>

        {/* Content: How to Play Tab */}
        {activeTab === 'play' && (
          <div className="space-y-4">
            {playSections.map((sec, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${sec.color} space-y-2.5 transition-all`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-black/60 border border-slate-800">
                      {sec.icon}
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {sec.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 border border-slate-800 text-slate-300">
                    {sec.badge}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300 pl-2">
                  {sec.rules.map((rule, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5 shrink-0">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>

                {onNavigateToTab && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToTab(sec.actionTab);
                      }}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                      <span>{sec.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Content: Help & FAQ Tab */}
        {activeTab === 'help' && (
          <div className="space-y-3">
            {helpTopics.map((topic, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 space-y-1.5 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {topic.q}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                  {topic.a}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Button */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            Got It, Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
