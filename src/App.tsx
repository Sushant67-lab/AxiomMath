import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar, NavTab } from './components/layout/Navbar';
import { HeroBanner } from './components/layout/HeroBanner';
import { FormulaVault } from './components/vault/FormulaVault';
import { WordProblemsArena } from './components/wordproblems/WordProblemsArena';
import { FormulaRush } from './components/game/FormulaRush';
import { TestSimulator } from './components/test/TestSimulator';
import { ProgressReport } from './components/progress/ProgressReport';
import { AuthModal, AuthModalMode } from './components/auth/AuthModal';
import { XpToast } from './components/layout/XpToast';
import { ThemeToggle } from './components/layout/ThemeToggle';
import { ShieldCheck } from 'lucide-react';
import { sound } from './utils/audio';

const MainAppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('vault');
  // UNCONDITIONALLY show the mode pop up so user decides guest or sign-in on opening the app
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(true);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('guest');
  const { theme, setTheme } = useTheme();

  const handleOpenAuth = (mode: AuthModalMode = 'guest') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-black dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300 transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAuth={() => handleOpenAuth('guest')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Welcome / Stage Selector on Home Tab */}
        {(currentTab === 'vault' || currentTab === 'wordproblems') && (
          <HeroBanner
            onSelectTab={setCurrentTab}
          />
        )}

        {/* Tab Views */}
        {currentTab === 'vault' && (
          <FormulaVault
            onPracticeFormula={() => setCurrentTab('rush')}
          />
        )}

        {currentTab === 'wordproblems' && (
          <WordProblemsArena />
        )}

        {currentTab === 'rush' && (
          <FormulaRush
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentTab === 'test' && (
          <TestSimulator
            onNavigateToProgress={() => setCurrentTab('progress')}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressReport
            onOpenAuthModal={() => handleOpenAuth('signup')}
            onNavigateToProblems={() => setCurrentTab('wordproblems')}
          />
        )}
      </main>

      {/* Quiet Academic Footer with Light Theme Toggle */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white/95 dark:bg-black/90 py-6 mt-auto text-xs text-slate-500 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">AxiomMath</span>
              <span>—</span>
              <span className="text-slate-700 dark:text-slate-400 font-medium">Engineering & Higher Mathematics Handbook (20 Chapters)</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-500">Ages 12–25</span>
          </div>

          {/* Footer Controls: Light/Dark Theme Switcher & Pop-up Trigger */}
          <div className="flex items-center gap-3">
            {/* Smooth Theme Toggle Pill */}
            <ThemeToggle variant="footer" />

            {/* Quick Mode / Profile Switcher */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                handleOpenAuth('guest');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              title="Open Sign In / Guest Mode Pop-up"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mode / Sign In</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Mandatory Sign In / Sign Up / Guest Mode Pop-Up */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Floating XP Toast */}
      <XpToast />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <MainAppContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
