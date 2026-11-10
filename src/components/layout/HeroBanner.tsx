import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { AgeGroup } from '../../types';
import { NavTab } from './Navbar';
import { sound } from '../../utils/audio';
import { BookOpen, Zap, FileCheck2 } from 'lucide-react';

interface HeroBannerProps {
  onSelectTab: (tab: NavTab) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTab }) => {
  const { currentUser, updateTargetAge } = useAuth();
  const { t } = useLanguage();

  const ageTiers: { id: AgeGroup; label: string; desc: string }[] = [
    { id: '12-15', label: 'Age 12-15', desc: 'Algebra, Uniform Motion & Triangles' },
    { id: '16-18', label: 'Age 16-18', desc: 'Pre-Calculus, Trig Identities & Power Rules' },
    { id: '19-25', label: 'Age 19-25', desc: 'College STEM, Optimization & Integrals' }
  ];

  const handleSelectTier = (tier: AgeGroup) => {
    sound.playClick();
    updateTargetAge(tier);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white via-slate-50 to-slate-100/70 dark:from-slate-900/90 dark:via-slate-950 dark:to-black border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-2xl transition-colors">
      {/* Subtle math grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Editorial Index / Subtitle */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <span>{t('hero.badge')}</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display leading-[1.15] text-balance">
          {t('hero.headline')}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* Age Level Selector Strip */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            {t('hero.selectStage')}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {ageTiers.map(tier => {
              const isSelected = currentUser.targetAge === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => handleSelectTier(tier.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : 'bg-white/80 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {tier.label}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {tier.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('vault');
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Formula Vault (20 Chapters)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('wordproblems');
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {t('hero.btnProblems')}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('rush');
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            {t('hero.btnRush')}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('test');
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileCheck2 className="w-4 h-4 text-cyan-400" />
            {t('hero.btnTest')}
          </button>
        </div>
      </div>
    </div>
  );
};
