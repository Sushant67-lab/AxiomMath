import React, { useState, useEffect } from 'react';
import { QuizQuestion, FormulaCategory, AgeGroup, TestResult } from '../../types';
import { QUIZ_QUESTIONS_DATA } from '../../data/quizQuestionsData';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import { 
  FileCheck2, 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { motion } from 'motion/react';

interface TestSimulatorProps {
  initialCategory?: FormulaCategory | 'all';
  onNavigateToProgress?: () => void;
}

export const TestSimulator: React.FC<TestSimulatorProps> = ({ initialCategory = 'all', onNavigateToProgress }) => {
  const { currentUser, recordTestResult } = useAuth();
  const { t } = useLanguage();

  const [testState, setTestState] = useState<'configure' | 'active' | 'summary'>('configure');
  const [selectedCategory, setSelectedCategory] = useState<FormulaCategory | 'all'>(initialCategory);
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(currentUser.targetAge || '16-18');
  const [questionCount, setQuestionCount] = useState<number>(5);

  // Active test state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Completed result
  const [latestResult, setLatestResult] = useState<TestResult | null>(null);

  useEffect(() => {
    let interval: number | null = null;
    if (testState === 'active') {
      interval = window.setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [testState]);

  const handleStartTest = () => {
    sound.playClick();
    // Filter candidate questions
    let pool = QUIZ_QUESTIONS_DATA.filter(q => {
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      const matchAge = selectedAge === 'all' || q.ageGroup === 'all' || q.ageGroup === selectedAge;
      return matchCat && matchAge;
    });

    if (pool.length < questionCount) {
      // Fallback to any category match
      pool = QUIZ_QUESTIONS_DATA.filter(q => selectedCategory === 'all' || q.category === selectedCategory);
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, questionCount);
    setActiveQuestions(shuffled);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setFlaggedIndices(new Set());
    setElapsedSeconds(0);
    setTestState('active');
  };

  const handleSelectAnswer = (optIndex: number) => {
    sound.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIndex]: optIndex
    }));
  };

  const toggleFlagCurrent = () => {
    sound.playClick();
    setFlaggedIndices(prev => {
      const next = new Set(prev);
      if (next.has(currentQIndex)) next.delete(currentQIndex);
      else next.add(currentQIndex);
      return next;
    });
  };

  const handleSubmitTest = () => {
    // Grade the test
    let correctCount = 0;
    const summary = activeQuestions.map((q, idx) => {
      const userChoiceIdx = selectedAnswers[idx];
      const isCorrect = userChoiceIdx === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        question: q.question,
        selectedAnswer: userChoiceIdx !== undefined ? q.options[userChoiceIdx] : 'Unanswered',
        correctAnswer: q.options[q.correctIndex],
        isCorrect,
        explanation: q.explanation
      };
    });

    const accuracy = Math.round((correctCount / activeQuestions.length) * 100);
    const xpEarned = correctCount * 25 + (accuracy >= 80 ? 50 : 0);

    const result: TestResult = {
      id: 'test_' + Date.now().toString(36),
      testTitle: `${selectedCategory === 'all' ? 'Comprehensive' : selectedCategory.toUpperCase()} Diagnostic Assessment`,
      category: selectedCategory,
      ageGroup: selectedAge,
      score: correctCount,
      totalQuestions: activeQuestions.length,
      accuracy,
      timeTakenSeconds: elapsedSeconds,
      date: new Date().toISOString().split('T')[0],
      xpEarned,
      questionsSummary: summary
    };

    setLatestResult(result);
    setTestState('summary');
    recordTestResult(result);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = activeQuestions[currentQIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {t('test.title')}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {t('test.subtitle')}
          </p>
        </div>
      </div>

      {/* STAGE 1: CONFIGURATION */}
      {testState === 'configure' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">Configure Examination Parameters</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your academic discipline and target difficulty before initiating the proctored test.
            </p>
          </div>

          {/* Discipline Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Academic Discipline
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'all', label: t('cat.all') },
                { id: 'trigonometry', label: t('cat.trigonometry') },
                { id: 'algebra', label: t('cat.algebra') },
                { id: 'derivative', label: t('cat.derivative') },
                { id: 'integration', label: t('cat.integration') }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as FormulaCategory | 'all')}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age Tier Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Age & Level Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: '12-15', label: 'Age 12-15', sub: 'Foundation Level' },
                { id: '16-18', label: 'Age 16-18', sub: 'High School / Pre-Calc' },
                { id: '19-25', label: 'Age 19-25', sub: 'College / STEM' }
              ].map(tier => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedAge(tier.id as AgeGroup)}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors ${
                    selectedAge === tier.id
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block text-white">{tier.label}</span>
                  <span className="text-[11px] text-slate-500">{tier.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Examination Length
            </label>
            <div className="flex gap-3 text-xs">
              {[5, 10].map(count => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`flex-1 py-2.5 rounded-xl border font-mono transition-colors ${
                    questionCount === count
                      ? 'bg-emerald-500 text-black font-bold border-emerald-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {count} Questions (~{count * 2} mins)
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartTest}
            className="w-full py-3.5 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2"
          >
            <FileCheck2 className="w-4 h-4" />
            {t('test.beginBtn')}
          </button>
        </div>
      )}

      {/* STAGE 2: ACTIVE TEST IN PROGRESS */}
      {testState === 'active' && currentQ && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative shadow-2xl space-y-6">
          {/* Top Bar Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                Question {currentQIndex + 1} of {activeQuestions.length}
              </span>
              <span className="text-slate-700">|</span>
              <span className="capitalize text-xs text-emerald-400 font-mono">
                {currentQ.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatTime(elapsedSeconds)}</span>
              </div>

              <button
                onClick={toggleFlagCurrent}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                  flaggedIndices.has(currentQIndex)
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('test.flag')}</span>
              </button>
            </div>
          </div>

          {/* Question Grid Navigator */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {activeQuestions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isFlagged = flaggedIndices.has(idx);
              const isCurrent = idx === currentQIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 flex items-center justify-center relative ${
                    isCurrent
                      ? 'border-2 border-emerald-500 text-white bg-slate-900'
                      : isAnswered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-200'
                  }`}
                >
                  {idx + 1}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Question Body */}
          <div className="p-6 rounded-2xl bg-black/60 border border-slate-800/80 space-y-3">
            {currentQ.formulaContext && (
              <span className="text-xs font-mono text-cyan-400 block">
                Reference Concept: {currentQ.formulaContext}
              </span>
            )}
            <h3 className="text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQIndex] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(optIdx)}
                  className={`p-4 rounded-xl border text-left font-mono text-xs sm:text-sm transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-current shrink-0 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => prev - 1)}
              className={`px-4 py-2 text-xs font-medium rounded-lg flex items-center gap-1.5 ${
                currentQIndex === 0
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> {t('test.previous')}
            </button>

            {currentQIndex < activeQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(prev => prev + 1)}
                className="px-5 py-2 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white flex items-center gap-1.5"
              >
                {t('test.next')} <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
              >
                <FileCheck2 className="w-4 h-4" />
                {t('test.submitBtn')}
              </button>
            )}
          </div>
        </div>
      )}

      {/* STAGE 3: TEST RESULT & DETAILED SUMMARY */}
      {testState === 'summary' && latestResult && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl space-y-6">
          {/* Header Scorecard */}
          <div className="text-center py-4 border-b border-slate-800">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">{latestResult.testTitle}</h3>
            <p className="text-xs text-slate-400 mt-1">Diagnostic Report Card & Analytical Performance Summary</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">ACCURACY</span>
                <span className="text-emerald-400 font-bold text-xl">{latestResult.accuracy}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">SCORE</span>
                <span className="text-white font-bold text-xl">{latestResult.score} / {latestResult.totalQuestions}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">TIME TAKEN</span>
                <span className="text-cyan-400 font-bold text-xl">{formatTime(latestResult.timeTakenSeconds)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">EXPERIENCE</span>
                <span className="text-amber-400 font-bold text-xl">+{latestResult.xpEarned} XP</span>
              </div>
            </div>
          </div>

          {/* Question Breakdown */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Itemized Question Review
            </h4>

            <div className="space-y-3">
              {latestResult.questionsSummary.map((qSum, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    qSum.isCorrect
                      ? 'bg-slate-900/40 border-emerald-500/30'
                      : 'bg-slate-900/40 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start gap-2 justify-between">
                    <span className="font-semibold text-slate-200">
                      {idx + 1}. {qSum.question}
                    </span>
                    {qSum.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] pt-1 border-t border-slate-800/60">
                    <div>
                      <span className="text-slate-500">Your Answer: </span>
                      <span className={qSum.isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                        {qSum.selectedAnswer}
                      </span>
                    </div>
                    {!qSum.isCorrect && (
                      <div>
                        <span className="text-slate-500">Correct Answer: </span>
                        <span className="text-emerald-300 font-semibold">{qSum.correctAnswer}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    Reason: {qSum.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => setTestState('configure')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Take Another Examination
            </button>

            {onNavigateToProgress && (
              <button
                onClick={onNavigateToProgress}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                View Full Progress Report
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
