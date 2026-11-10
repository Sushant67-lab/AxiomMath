import React, { useState, useEffect, useRef } from 'react';
import { RUSH_CHALLENGES, RushChallenge } from '../../data/quizQuestionsData';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { sound } from '../../utils/audio';
import { fireCelebrationConfetti } from '../../utils/confetti';
import { Zap, Timer, Flame, Trophy, Play, RotateCcw, ArrowRight, Check, X, ShieldAlert, UserCheck, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormulaRushProps {
  onOpenAuth: (mode?: 'guest' | 'signin' | 'signup') => void;
}

export const FormulaRush: React.FC<FormulaRushProps> = ({ onOpenAuth }) => {
  const { currentUser, isGuest, addXp } = useAuth();
  const { t, isMandatoryAuth, setIsMandatoryAuth } = useLanguage();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [showGuestGate, setShowGuestGate] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [feedbackEffect, setFeedbackEffect] = useState<'correct' | 'wrong' | null>(null);
  const [sessionChallenges, setSessionChallenges] = useState<RushChallenge[]>([]);

  const timerRef = useRef<number | null>(null);

  // Auto generate pop up when user opens the game as requested
  useEffect(() => {
    if (isGuest && gameState === 'idle') {
      const alreadyDismissed = sessionStorage.getItem('axiom_guest_dismissed_rush');
      if (!alreadyDismissed) {
        setShowGuestGate(true);
      }
    }
  }, [isGuest, gameState]);

  const handleStartClicked = () => {
    sound.playClick();
    if (isGuest) {
      // If user is guest, show guest choice or mandatory sign in prompt
      setShowGuestGate(true);
      return;
    }
    // Authenticated user starts immediately
    startActualGame();
  };

  const startActualGame = () => {
    sessionStorage.setItem('axiom_guest_dismissed_rush', 'true');
    setShowGuestGate(false);
    const shuffled = [...RUSH_CHALLENGES].sort(() => Math.random() - 0.5);
    setSessionChallenges(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setMultiplier(1);
    setTimeLeft(45);
    setGameState('playing');
    setFeedbackEffect(null);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const handleGameOver = () => {
    setGameState('gameover');
    sound.playVictory();
    fireCelebrationConfetti();
    if (score > 0) {
      addXp(Math.round(score / 2), 'Formula Rush Score');
    }
  };

  const handleAnswer = (selected: string) => {
    if (gameState !== 'playing') return;
    const challenge = sessionChallenges[currentIdx % sessionChallenges.length];
    const isCorrect = selected === challenge.correctAnswer;

    if (isCorrect) {
      sound.playCorrect();
      setFeedbackEffect('correct');

      const nextStreak = streak + 1;
      setStreak(nextStreak);

      let nextMultiplier = 1;
      if (nextStreak >= 6) nextMultiplier = 4;
      else if (nextStreak >= 4) nextMultiplier = 3;
      else if (nextStreak >= 2) nextMultiplier = 2;
      setMultiplier(nextMultiplier);

      const pointsWon = 20 * nextMultiplier;
      setScore(prev => prev + pointsWon);

      if (nextStreak % 3 === 0) {
        sound.playStreakBonus();
      }
    } else {
      sound.playIncorrect();
      setFeedbackEffect('wrong');
      setStreak(0);
      setMultiplier(1);
    }

    setTimeout(() => {
      setFeedbackEffect(null);
      setCurrentIdx(prev => prev + 1);
    }, 280);
  };

  const currentChallenge = sessionChallenges[currentIdx % (sessionChallenges.length || 1)] || RUSH_CHALLENGES[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {t('rush.title')}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {t('rush.subtitle')}
          </p>
        </div>

        {/* High Score & Mode Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">{t('rush.best')}</span>
            <span className="text-white font-mono font-bold">{currentUser.stats.rushHighScore || 0} {t('rush.pts')}</span>
          </div>

          {/* Mode Pill: Guest vs Verified */}
          <div className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 ${
            isGuest 
              ? 'bg-amber-950/30 border-amber-800/60 text-amber-300' 
              : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isGuest ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            <span>{isGuest ? t('nav.guestTag') : 'Verified Player'}</span>
          </div>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        {/* IDLE STATE */}
        {gameState === 'idle' && (
          <div className="text-center py-10 max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Zap className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">{t('rush.blitzTitle')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('rush.blitzDesc')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs font-mono text-slate-300">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">{t('rush.time')}</span>
                <span className="text-emerald-400 font-bold text-sm">45s</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">{t('rush.combos')}</span>
                <span className="text-cyan-400 font-bold text-sm">Up to 4x</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">{t('rush.rewards')}</span>
                <span className="text-amber-400 font-bold text-sm">+XP Sync</span>
              </div>
            </div>

            {/* Launch Game Button */}
            <div className="space-y-3">
              <button
                onClick={handleStartClicked}
                className="px-8 py-3.5 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 mx-auto transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                {t('rush.startBtn')}
              </button>

              {/* Mandatory Sign-in vs Guest Toggle Settings */}
              <div className="pt-4 border-t border-slate-800/80 max-w-sm mx-auto flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2 text-left">
                  {isMandatoryAuth ? <Lock className="w-4 h-4 text-amber-400" /> : <Unlock className="w-4 h-4 text-slate-500" />}
                  <div>
                    <span className="font-semibold text-slate-200 block">{t('rush.mandatoryToggle')}</span>
                    <span className="text-[10px] text-slate-500">{isMandatoryAuth ? 'Sign-in strictly required' : 'Guests may play freely'}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMandatoryAuth(!isMandatoryAuth)}
                  className={`px-3 py-1 rounded-lg border text-xs font-mono transition-colors ${
                    isMandatoryAuth
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {isMandatoryAuth ? 'ENABLED' : 'OFF'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PLAYING STATE */}
        {gameState === 'playing' && (
          <div className="space-y-6">
            {/* Top Bar Stats */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              {/* Timer */}
              <div className="flex items-center gap-2">
                <Timer className={`w-5 h-5 ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`} />
                <span className={`font-mono text-lg font-bold ${timeLeft <= 10 ? 'text-rose-400' : 'text-white'}`}>
                  {timeLeft}s
                </span>
              </div>

              {/* Combo Multiplier */}
              <div className="flex items-center gap-2">
                <Flame className={`w-4 h-4 ${multiplier > 1 ? 'text-amber-400 animate-bounce' : 'text-slate-500'}`} />
                <span className="font-mono text-xs font-semibold text-slate-300">
                  {streak} Streak {multiplier > 1 && <span className="text-amber-400 font-bold">({multiplier}x Multiplier!)</span>}
                </span>
              </div>

              {/* Score */}
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block font-mono">SCORE</span>
                <span className="font-mono text-lg font-bold text-emerald-400">{score}</span>
              </div>
            </div>

            {/* Progress Bar of time */}
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${timeLeft <= 10 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                animate={{ width: `${(timeLeft / 45) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Flashcard Formula Center */}
            <motion.div
              key={currentIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-8 rounded-2xl border text-center transition-all duration-200 relative ${
                feedbackEffect === 'correct'
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
                  : feedbackEffect === 'wrong'
                  ? 'bg-rose-950/40 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.25)]'
                  : 'bg-black/80 border-slate-800'
              }`}
            >
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Discipline: {currentChallenge.category}
              </div>

              <h3 className="text-base text-slate-300 mb-4 font-medium">
                {currentChallenge.prompt}
              </h3>

              <div className="font-mono text-2xl sm:text-3xl text-emerald-400 font-bold my-4 tracking-wide">
                <span>{currentChallenge.leftHandSide} </span>
                <span className="text-amber-400 underline decoration-dashed underline-offset-8">
                  {currentChallenge.missingPart}
                </span>
              </div>
            </motion.div>

            {/* 4 Answer Choice Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentChallenge.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/90 hover:border-emerald-500/60 text-slate-100 font-mono text-base font-semibold transition-all active:scale-98"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME OVER STATE */}
        {gameState === 'gameover' && (
          <div className="text-center py-10 max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">Time Expired!</h3>
              <p className="text-xs text-slate-400">
                Tremendous effort! Here is how you performed in this round:
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Final Score:</span>
                <span className="text-emerald-400 font-bold text-base">{score} pts</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Longest Combo Streak:</span>
                <span className="text-amber-400 font-bold">{streak}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800">
                <span>Experience Awarded:</span>
                <span className="text-cyan-400 font-bold">+{Math.round(score / 2)} XP</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={startActualGame}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Play Again
              </button>
              <button
                onClick={() => setGameState('idle')}
                className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:text-white"
              >
                Return to Menu
              </button>
            </div>
          </div>
        )}
      </div>

      {/* GUEST VS MANDATORY SIGN-IN MODAL GATE */}
      <AnimatePresence>
        {showGuestGate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-5"
            >
              <button
                onClick={() => setShowGuestGate(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs"
              >
                ✕
              </button>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {t('rush.guestPromptTitle')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t('rush.guestPromptDesc')}
                  </p>
                </div>
              </div>

              {isMandatoryAuth ? (
                /* When Mandatory Mode is ON */
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200 flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Sign-In is Mandatory for this Session</strong>
                      <span>Mandatory authentication mode is active. Please log in or create an account so your quiz results, high scores, and certifications are preserved.</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowGuestGate(false);
                      onOpenAuth();
                    }}
                    className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Sign In or Sign Up Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => setIsMandatoryAuth(false)}
                      className="text-[11px] text-slate-500 hover:text-slate-300 underline"
                    >
                      Disable Mandatory Mode & Allow Guest Play
                    </button>
                  </div>
                </div>
              ) : (
                /* When Guest Mode is allowed: 3 distinct options */
                <div className="space-y-3">
                  {/* Option 1: Play as Guest */}
                  <div
                    onClick={startActualGame}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900 cursor-pointer transition-all space-y-1 text-left group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span className="flex items-center gap-1.5 group-hover:text-white">
                        <span>⚡</span>
                        <span>{t('rush.guestContinue')}</span>
                      </span>
                      <span className="text-emerald-400 text-[10px] font-mono font-semibold">Instant Play</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {t('rush.guestContinueDesc')}
                    </p>
                  </div>

                  {/* Option 2: Sign In */}
                  <div
                    onClick={() => {
                      setShowGuestGate(false);
                      onOpenAuth('signin');
                    }}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-emerald-500/50 hover:bg-slate-900 cursor-pointer transition-all space-y-1 text-left group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span className="flex items-center gap-1.5 group-hover:text-emerald-300">
                        <span>🔑</span>
                        <span>Sign In (Existing Scholar)</span>
                      </span>
                      <span className="text-slate-500 text-[10px] font-mono">Sync Profile</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Log in to restore your XP, streak badges, and personalized mathematical progress.
                    </p>
                  </div>

                  {/* Option 3: Sign Up */}
                  <div
                    onClick={() => {
                      setShowGuestGate(false);
                      onOpenAuth('signup');
                    }}
                    className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/30 cursor-pointer transition-all space-y-1 text-left shadow-[0_0_15px_rgba(16,185,129,0.1)] group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
                      <span className="flex items-center gap-1.5">
                        <span>🎓</span>
                        <span>Create Account / Sign Up</span>
                      </span>
                      <span className="text-emerald-400 text-[10px] font-mono">Recommended</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Register your academic tier (12–25) to unlock certificates, high score records, and level progression.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
