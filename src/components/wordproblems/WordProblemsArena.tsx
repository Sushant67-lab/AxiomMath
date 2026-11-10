import React, { useState } from 'react';
import { WordProblem, FormulaCategory, AgeGroup } from '../../types';
import { WORD_PROBLEMS_DATA } from '../../data/wordProblemsData';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import { 
  BookOpen, 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Edit3, 
  Calculator, 
  ArrowRight, 
  ChevronRight,
  Award,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WordProblemsArena: React.FC = () => {
  const { currentUser, recordWordProblemSolved } = useAuth();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FormulaCategory | 'all'>('all');
  const [activeProblemId, setActiveProblemId] = useState<string>(WORD_PROBLEMS_DATA[0].id);

  // Scratchpad state
  const [scratchpadText, setScratchpadText] = useState<string>('');
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  // Hints revealed state per problem
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);

  // Answer selection and submission state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const activeProblem = WORD_PROBLEMS_DATA.find(p => p.id === activeProblemId) || WORD_PROBLEMS_DATA[0];
  const isAlreadySolved = currentUser.stats.solvedWordProblemIds.includes(activeProblem.id);

  const filteredProblems = WORD_PROBLEMS_DATA.filter(p => {
    return selectedCategory === 'all' || p.category === selectedCategory;
  });

  const handleSelectProblem = (pId: string) => {
    sound.playClick();
    setActiveProblemId(pId);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setFeedback(null);
    setHintsRevealed(0);
    setScratchpadText('');
  };

  const handleRevealNextHint = () => {
    if (hintsRevealed < activeProblem.hints.length) {
      sound.playClick();
      setHintsRevealed(prev => prev + 1);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;

    setIsSubmitted(true);
    const chosen = activeProblem.options.find(o => o.id === selectedOptionId);
    const isCorrect = selectedOptionId === activeProblem.correctOptionId;

    if (isCorrect) {
      sound.playCorrect();
      // Calculate XP: 100 XP base minus 10 per hint used, minimum 60 XP
      const xpEarned = Math.max(60, 100 - hintsRevealed * 15);
      recordWordProblemSolved(activeProblem.id, activeProblem.category, xpEarned);
      setFeedback({
        isCorrect: true,
        message: `Outstanding! You solved it correctly. +${xpEarned} XP awarded to your academic record!`
      });
    } else {
      sound.playIncorrect();
      setFeedback({
        isCorrect: false,
        message: chosen?.explanation || 'Incorrect answer. Review the hints and worked solution breakdown below.'
      });
    }
  };

  const handleResetCurrent = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setFeedback(null);
    setHintsRevealed(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {t('wp.title')}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {t('wp.subtitle')}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {(['all', 'algebra', 'trigonometry', 'derivative', 'integration'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? t('wp.allChapters') : t(`cat.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Problem Index on Left, Active Problem Viewer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem Selector Drawer (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex justify-between items-center">
            <span>{t('wp.exercises')}</span>
            <span>{filteredProblems.length} Problems</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredProblems.map((prob, index) => {
              const active = prob.id === activeProblem.id;
              const solved = currentUser.stats.solvedWordProblemIds.includes(prob.id);

              return (
                <div
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                    active
                      ? 'bg-slate-900/90 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="capitalize text-slate-400">{prob.category}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">{prob.gradeLevel.split('(')[0]}</span>
                      {solved && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                  </div>

                  <h4 className={`text-sm font-semibold line-clamp-1 ${active ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {index + 1}. {prob.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {prob.questionText}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Problem Workspace (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 relative shadow-2xl">
          {/* Textbook Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-4">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                {activeProblem.textbookChapter}
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {activeProblem.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {isAlreadySolved && (
                <span className="text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-lg px-2.5 py-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Solved in Record
                </span>
              )}
              <button
                onClick={() => setShowScratchpad(!showScratchpad)}
                className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  showScratchpad
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                {showScratchpad ? t('wp.hideScratchpad') : t('wp.openScratchpad')}
              </button>
            </div>
          </div>

          {/* Interactive Scratchpad Note Area */}
          <AnimatePresence>
            {showScratchpad && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-5"
              >
                <div className="p-3 bg-slate-900/90 rounded-xl border border-purple-500/30 space-y-2">
                  <div className="flex justify-between items-center text-xs text-purple-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5" />
                      Digital Scratchpad / Working Notes
                    </span>
                    <button
                      onClick={() => setScratchpadText('')}
                      className="text-[11px] text-slate-400 hover:text-white underline"
                    >
                      Clear Notes
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={scratchpadText}
                    onChange={(e) => setScratchpadText(e.target.value)}
                    placeholder="Write your equations, intermediate calculations, or rough scratch steps here..."
                    className="w-full bg-black/60 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Real-World Context Scenario Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-sm leading-relaxed mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Textbook Scenario
            </span>
            <p className="text-slate-200">{activeProblem.contextStory}</p>
          </div>

          {/* The Actual Question */}
          <div className="p-4 rounded-xl bg-black/70 border border-emerald-500/20 mb-5">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Problem Query
            </span>
            <p className="text-base font-semibold text-white leading-snug">
              {activeProblem.questionText}
            </p>
          </div>

          {/* Givens & Target */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px] tracking-wider block">Givens & Constraints</span>
              {activeProblem.givens.map((g, idx) => (
                <div key={idx} className="flex justify-between text-slate-300">
                  <span className="text-slate-400">{g.label}:</span>
                  <span className="text-white font-semibold">{g.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px] tracking-wider block">To Find & Governing Formula</span>
              <div className="text-slate-300">
                <span className="text-slate-400">Target: </span>
                <span className="text-amber-300 font-semibold">{activeProblem.toFind}</span>
              </div>
              <div className="pt-1 text-[11px] text-cyan-400 border-t border-slate-800/80">
                {activeProblem.primaryFormula}
              </div>
            </div>
          </div>

          {/* Hints Section */}
          <div className="mb-5 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                {t('wp.hints')} ({hintsRevealed} of {activeProblem.hints.length} revealed)
              </span>
              {hintsRevealed < activeProblem.hints.length && (
                <button
                  onClick={handleRevealNextHint}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                >
                  {t('wp.revealHint')} {hintsRevealed + 1}
                </button>
              )}
            </div>

            {hintsRevealed === 0 ? (
              <p className="text-xs text-slate-500 italic">
                Try setting up the equation on your own first! Click "{t('wp.revealHint')}" if you get stuck.
              </p>
            ) : (
              <div className="space-y-2 mt-2">
                {activeProblem.hints.slice(0, hintsRevealed).map((h, i) => (
                  <div key={i} className="text-xs text-amber-200/90 bg-amber-950/20 border border-amber-900/40 p-2.5 rounded-lg flex items-start gap-2">
                    <span className="font-mono text-amber-400 font-bold shrink-0">{i + 1}.</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Multiple Choice Answer Selection */}
          <div className="space-y-2.5 mb-6">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Select Your Final Answer:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeProblem.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optionStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700';

                if (isSelected) {
                  optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                }
                if (isSubmitted) {
                  if (opt.id === activeProblem.correctOptionId) {
                    optionStyle = 'bg-emerald-500/25 border-emerald-500 text-emerald-300 font-semibold';
                  } else if (isSelected && opt.id !== activeProblem.correctOptionId) {
                    optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isSubmitted}
                    onClick={() => {
                      sound.playClick();
                      setSelectedOptionId(opt.id);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-start gap-2.5 ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current shrink-0 flex items-center justify-center text-[10px] font-bold">
                      {opt.id.split('-')[1].toUpperCase()}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row: Check / Reset */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handleResetCurrent}
              className="px-3.5 py-2 text-xs font-medium rounded-lg text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t('wp.resetProblem')}
            </button>

            {!isSubmitted ? (
              <button
                disabled={!selectedOptionId}
                onClick={handleSubmitAnswer}
                className={`px-5 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                  selectedOptionId
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {t('wp.verifyBtn')}
              </button>
            ) : (
              <button
                onClick={() => {
                  const currentIndex = filteredProblems.findIndex(p => p.id === activeProblem.id);
                  const nextIndex = (currentIndex + 1) % filteredProblems.length;
                  handleSelectProblem(filteredProblems[nextIndex].id);
                }}
                className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 flex items-center gap-2 transition-colors"
              >
                {t('wp.nextBtn')} <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Feedback & Detailed Step-by-Step Breakdown */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl border text-xs ${
                feedback.isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-3">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-sm text-white mb-0.5">
                    {feedback.isCorrect ? 'Verification Passed!' : 'Requires Revision'}
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{feedback.message}</p>
                </div>
              </div>

              {/* Step-by-step textbook proof */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  {t('wp.workedSolution')}
                </span>
                {activeProblem.detailedStepByStep.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-black/60 border border-slate-800/60 font-mono text-slate-300 space-y-1">
                    <span className="text-emerald-400 font-semibold block">{s.step}</span>
                    <p className="text-slate-300 font-sans text-xs">{s.explanation}</p>
                    <div className="text-cyan-300 pt-1 text-[11px] font-bold">{s.math}</div>
                  </div>
                ))}

                {/* Practical application */}
                <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-slate-300">Engineering & Scientific Application: </strong>
                  {activeProblem.practicalApplication}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
