import React, { useState } from 'react';
import { useAuth, AVATARS } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  BarChart3, 
  Flame, 
  Award, 
  Trophy, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  UserPlus, 
  Printer, 
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProgressReportProps {
  onOpenAuthModal: () => void;
  onNavigateToProblems?: () => void;
}

export const ProgressReport: React.FC<ProgressReportProps> = ({ 
  onOpenAuthModal, 
  onNavigateToProblems 
}) => {
  const { currentUser, isGuest } = useAuth();
  const { t } = useLanguage();
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const stats = currentUser.stats;
  const currentAvatar = AVATARS.find(a => a.id === currentUser.avatar) || AVATARS[0];

  // Level math: Level L requires (L - 1)^2 * 80 XP
  const currentLevelXpFloor = Math.pow(stats.level - 1, 2) * 80;
  const nextLevelXpCeil = Math.pow(stats.level, 2) * 80;
  const xpInCurrentLevel = stats.xp - currentLevelXpFloor;
  const xpSpanForLevel = Math.max(1, nextLevelXpCeil - currentLevelXpFloor);
  const levelProgressPct = Math.min(100, Math.round((xpInCurrentLevel / xpSpanForLevel) * 100));

  const overallAccuracy = stats.totalQuestionsAnswered > 0
    ? Math.round((stats.correctAnswersCount / stats.totalQuestionsAnswered) * 100)
    : 100;

  const handlePrintCertificate = () => {
    window.print();
  };

  const masteryItems = [
    { label: 'Trigonometry', score: stats.categoryMastery.trigonometry, color: 'text-cyan-400', barBg: 'bg-cyan-500' },
    { label: 'Algebra', score: stats.categoryMastery.algebra, color: 'text-emerald-400', barBg: 'bg-emerald-500' },
    { label: 'Derivatives', score: stats.categoryMastery.derivative, color: 'text-purple-400', barBg: 'bg-purple-500' },
    { label: 'Integration', score: stats.categoryMastery.integration, color: 'text-amber-400', barBg: 'bg-amber-500' },
    { label: 'Word Problems', score: stats.categoryMastery.word_problems, color: 'text-rose-400', barBg: 'bg-rose-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Overview */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar & Identity */}
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentAvatar.color} p-0.5 shadow-lg shrink-0 flex items-center justify-center`}>
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-mono text-xs text-white font-bold p-1 text-center">
                {currentAvatar.name.split(' ')[0]}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {currentUser.username}
                </h2>
                {isGuest ? (
                  <span className="text-[11px] text-amber-400 bg-amber-950/40 border border-amber-800/60 rounded px-2 py-0.5">
                    Guest Account
                  </span>
                ) : (
                  <span className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded px-2 py-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Scholar
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentAvatar.title} · Member since {currentUser.joinedDate}
              </p>
            </div>
          </div>

          {/* Level & XP Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-full sm:w-56 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Level {stats.level} Scholar</span>
                <span className="text-emerald-400 font-bold">{stats.xp} XP</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgressPct}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{xpInCurrentLevel} XP in level</span>
                <span>{xpSpanForLevel - xpInCurrentLevel} XP to Level {stats.level + 1}</span>
              </div>
            </div>

            {/* Streak & Cert CTA */}
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono">
                <Flame className="w-4 h-4 text-amber-500" />
                <span className="text-white font-bold">{stats.streakDays} Day Streak</span>
              </div>

              <button
                onClick={() => setShowCertificateModal(true)}
                className="px-3.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Report Card
              </button>
            </div>
          </div>
        </div>

        {/* Guest Warning / Sign Up Prompt */}
        {isGuest && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-900/30 -mx-6 -mb-6 p-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>You are currently in Guest mode. Sign up to permanently sync your progress and certificates.</span>
            </div>
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 shrink-0 flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Sign Up & Save
            </button>
          </div>
        )}
      </div>

      {/* 4 Quantitative Rigor Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Overall Accuracy</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-400">{overallAccuracy}%</span>
            <span className="text-xs text-slate-400">across all tests</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            {stats.correctAnswersCount} correct of {stats.totalQuestionsAnswered} answered
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Speed Rush Record</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-cyan-400">{stats.rushHighScore || 0}</span>
            <span className="text-xs text-slate-400">pts</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            45s blitz speed recall score
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Textbook Problems</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-amber-400">{stats.solvedWordProblemIds.length}</span>
            <span className="text-xs text-slate-400">solved</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Multi-step curriculum scenarios
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Diagnostic Exams</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-purple-400">{stats.testsCompleted}</span>
            <span className="text-xs text-slate-400">completed</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Timed subject assessments
          </div>
        </div>
      </div>

      {/* Domain Mastery Breakdown Matrix */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Mathematical Domain Mastery Index</h3>
            <p className="text-xs text-slate-400 mt-0.5">Calculated from quiz scores, formula inspections, and word problem solutions.</p>
          </div>
        </div>

        <div className="space-y-4">
          {masteryItems.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-semibold">{item.label}</span>
                <span className={`${item.color} font-bold`}>{item.score}% Mastery</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`h-full ${item.barBg} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Curriculum Honors & Badges</h3>
            <p className="text-xs text-slate-400 mt-0.5">Earn recognitions through consistency, accuracy, and rigorous problem-solving.</p>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            {currentUser.badges.filter(b => b.unlocked).length} of {currentUser.badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentUser.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                badge.unlocked
                  ? 'bg-slate-900/80 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                  : 'bg-slate-950/60 border-slate-800/60 opacity-60'
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 ${badge.unlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-600'}`}>
                <Award className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                  {badge.unlocked && (
                    <span className="text-[10px] text-emerald-400 font-mono">Unlocked</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {badge.description}
                </p>

                {!badge.unlocked && (
                  <div className="pt-1">
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-0.5">
                      <span>Progress</span>
                      <span>{badge.progress} / {badge.maxProgress}</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-600 rounded-full"
                        style={{ width: `${Math.min(100, (badge.progress / badge.maxProgress) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test History Log Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Recent Examination History</h3>
            <p className="text-xs text-slate-400 mt-0.5">Archived diagnostic records and performance metrics.</p>
          </div>
        </div>

        {currentUser.testHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500">
                  <th className="pb-2.5 font-normal">Date</th>
                  <th className="pb-2.5 font-normal">Assessment Title</th>
                  <th className="pb-2.5 font-normal">Discipline</th>
                  <th className="pb-2.5 font-normal text-right">Score</th>
                  <th className="pb-2.5 font-normal text-right">Accuracy</th>
                  <th className="pb-2.5 font-normal text-right">XP Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {currentUser.testHistory.map((test) => (
                  <tr key={test.id} className="hover:bg-slate-900/40">
                    <td className="py-3 text-slate-400">{test.date}</td>
                    <td className="py-3 text-white font-sans font-medium">{test.testTitle}</td>
                    <td className="py-3 capitalize text-slate-400">{test.category}</td>
                    <td className="py-3 text-right">{test.score} / {test.totalQuestions}</td>
                    <td className="py-3 text-right font-bold text-emerald-400">{test.accuracy}%</td>
                    <td className="py-3 text-right text-amber-400">+{test.xpEarned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-500">
            No diagnostic exams recorded yet. Take your first test in the Test Center!
          </div>
        )}
      </div>

      {/* Official Certificate & Report Card Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-950 border border-slate-700 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative text-slate-100"
          >
            {/* Close */}
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800 text-sm"
            >
              ✕
            </button>

            {/* Printable Document Frame */}
            <div id="printable-report" className="border-2 border-emerald-500/40 rounded-xl p-6 bg-black/90 space-y-6 text-center">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block">
                  AxiomMath Institute of Mathematical Sciences
                </span>
                <h2 className="text-2xl font-extrabold text-white font-display tracking-tight">
                  Academic Achievement & Progress Dossier
                </h2>
                <p className="text-xs text-slate-400">
                  Official evaluation record for Ages 12-25 Curriculum
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto space-y-2">
                <div className="text-xs text-slate-400">This certifies that</div>
                <div className="text-xl font-bold text-emerald-300 font-display">
                  {currentUser.username}
                </div>
                <div className="text-xs text-slate-400">
                  Has achieved status of <strong className="text-white">Level {stats.level} Scholar</strong> with a cumulative score of <strong className="text-amber-400">{stats.xp} XP</strong> and <strong className="text-cyan-400">{overallAccuracy}%</strong> historical accuracy.
                </div>
              </div>

              {/* Subject Breakdown in Certificate */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                {masteryItems.map((m, i) => (
                  <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">{m.label}</span>
                    <span className="text-emerald-400 font-bold">{m.score}%</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[11px] font-mono text-slate-500">
                <span>Date: {new Date().toISOString().split('T')[0]}</span>
                <span>Registry: {currentUser.id.toUpperCase()}</span>
                <span>Status: VERIFIED</span>
              </div>
            </div>

            {/* Print and Export Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handlePrintCertificate}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs hover:text-white"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
