import React, { useState, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../utils/audio';
import { Menu, X, ChevronDown, HelpCircle, Gamepad2, Infinity as InfinityIcon, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HowToPlayModal } from './HowToPlayModal';
import { ThemeToggle } from './ThemeToggle';

export type NavTab = 'vault' | 'wordproblems' | 'rush' | 'test' | 'progress';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenAuth }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<'play' | 'help'>('play');
  const [isScrolled, setIsScrolled] = useState(false);

  // Silky smooth scroll listener with requestAnimationFrame and hysteresis buffer
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > 35) {
            setIsScrolled(true);
          } else if (currentY < 12) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'vault', label: t('nav.vault') },
    { id: 'wordproblems', label: t('nav.wordproblems') },
    { id: 'rush', label: t('nav.rush') },
    { id: 'test', label: t('nav.test') },
    { id: 'progress', label: t('nav.progress') }
  ];

  const handleSelectLang = (code: LanguageCode) => {
    sound.playClick();
    setLanguage(code);
    setLangDropdownOpen(false);
  };

  const handleSignOut = async () => {
    sound.playClick();
    await signOut();
    onOpenAuth();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-black shadow-sm dark:shadow-lg transition-colors">
        {/* ============================================================ */}
        {/* 1. FIRST NAVBAR: DISSOLVES / COLLAPSES SILKY SMOOTH ON SCROLL */}
        {/* Brand Name + Logo "Play" & "Help" Buttons + User / Sign Out */}
        {/* ============================================================ */}
        <AnimatePresence initial={false}>
          {!isScrolled && (
            <motion.div
              key="top-navbar-brand"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="overflow-hidden border-b border-slate-200 dark:border-slate-900 bg-white/95 dark:bg-black/95 backdrop-blur-md"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                {/* Brand Emblem & Wordmark */}
                <button
                  onClick={() => onSelectTab('vault')}
                  className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-emerald-400/30 border border-emerald-400/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-[0_0_18px_rgba(16,185,129,0.25)] group-hover:border-emerald-500 transition-colors">
                    <InfinityIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                    AxiomMath
                  </span>
                </button>

                {/* Right side: Play, Help & User Sign Out Buttons */}
                <div className="flex items-center gap-2">
                  {/* How to Play Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setModalInitialTab('play');
                      setHelpModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] group"
                    title="How to Play and Game Rules"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                      <Gamepad2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="hidden sm:inline">How to Play</span>
                  </button>

                  {/* Help Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setModalInitialTab('help');
                      setHelpModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] group"
                    title="Help and Frequently Asked Questions"
                  >
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="hidden sm:inline">Help</span>
                  </button>

                  {/* User Profile & Sign Out Controls */}
                  <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 border-l border-slate-200 dark:border-slate-800">
                    <button
                      onClick={onOpenAuth}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      title="Account & Profile Settings"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="max-w-[90px] sm:max-w-[120px] truncate font-semibold">
                        {currentUser?.username || 'Scholar'}
                      </span>
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      title="Sign Out of Account"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Sign Out</span>
                    </button>
                  </div>

                  {/* Mobile menu trigger */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white ml-1"
                  >
                    {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================================ */}
        {/* 2. SECOND NAVBAR: STICKY AT TOP                              */}
        {/* Navigation tabs + Quick Language/Theme + Compact Sign Out     */}
        {/* ============================================================ */}
        <div className="border-b border-slate-200 dark:border-slate-900 bg-white/90 dark:bg-black/90 backdrop-blur-sm transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-12">
            {/* Navigation Tabs */}
            <nav className="flex items-center gap-3 sm:gap-4 md:gap-5 overflow-x-auto scrollbar-none h-full pl-2 sm:pl-[195px]">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectTab(item.id);
                    }}
                    className={`h-full whitespace-nowrap text-sm font-medium transition-all flex items-center border-b-2 px-1 sm:px-1.5 ${
                      isActive
                        ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500 font-semibold'
                        : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white border-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Side: Quick Theme, Language, and Compact Sign Out */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <ThemeToggle variant="compact" />

              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Change Language"
                >
                  <span>{currentLangObj.flag}</span>
                  <span className="hidden md:inline">{currentLangObj.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-1 z-50 text-xs max-h-80 overflow-y-auto">
                    <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-900">
                      Select Language
                    </div>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLang(lang.code)}
                        className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors ${
                          language === lang.code
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">({lang.label})</span>
                        </span>
                        {language === lang.code && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Compact Sign Out button when scrolled */}
              {isScrolled && (
                <button
                  onClick={handleSignOut}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                  title={`Sign Out (${currentUser?.username || 'User'})`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden lg:inline">Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE DRAWER (For small screens)                            */}
        {/* ============================================================ */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-3 text-xs font-medium">
            {/* Active User Card & Sign Out */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  {currentUser?.username ? currentUser.username.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">
                    {currentUser?.username || 'Scholar'}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {currentUser?.email || 'Active Scholar'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="px-2.5 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-400 font-semibold text-xs flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    currentTab === item.id
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {currentTab === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Controls: Theme Toggle & Language */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ThemeToggle variant="compact" />

                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-2"
                >
                  <span>{currentLangObj.flag}</span>
                  <span>{currentLangObj.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setModalInitialTab('play');
                    setHelpModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Play</span>
                </button>

                <button
                  onClick={() => {
                    setModalInitialTab('help');
                    setHelpModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 text-xs font-semibold flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Help</span>
                </button>
              </div>
            </div>

            {langDropdownOpen && (
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLang(lang.code)}
                    className={`p-2 rounded-lg border text-left flex items-center gap-1.5 text-xs ${
                      language === lang.code
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Help & How to Play Game Instructions Modal */}
      <HowToPlayModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        initialTab={modalInitialTab}
        onNavigateToTab={onSelectTab}
      />
    </>
  );
};
