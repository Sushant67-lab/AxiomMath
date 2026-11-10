import React from 'react';
import { useTheme, Theme } from '../../context/ThemeContext';
import { sound } from '../../utils/audio';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  variant?: 'footer' | 'compact';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'footer', className = '' }) => {
  const { theme, setTheme, toggleTheme, isTransitioning } = useTheme();

  const handleSelectTheme = (newTheme: Theme) => {
    if (newTheme === theme) return;
    sound.playClick();
    setTheme(newTheme);
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => {
          sound.playClick();
          toggleTheme();
        }}
        className={`relative p-2 rounded-xl transition-all flex items-center justify-center group overflow-hidden border ${
          theme === 'light'
            ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-amber-600 shadow-sm'
            : 'bg-slate-900/90 hover:bg-slate-900 border-slate-800 text-slate-300 hover:text-white shadow-sm'
        } ${className}`}
        title={`Current: ${theme === 'light' ? 'Light Theme' : 'Dark Theme'}. Click to switch theme.`}
        aria-label="Toggle visual theme"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -70, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 70, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {theme === 'light' ? (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-400/20" />
          ) : (
            <Moon className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
          )}
        </motion.div>
      </button>
    );
  }

  return (
    <div className={`inline-flex items-center p-1 rounded-2xl border transition-all ${
      theme === 'light'
        ? 'bg-slate-100/90 border-slate-200 shadow-inner'
        : 'bg-slate-950/90 border-slate-800 shadow-inner'
    } ${className}`}>
      {/* Light Option Button */}
      <button
        type="button"
        onClick={() => handleSelectTheme('light')}
        className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors z-10 ${
          theme === 'light'
            ? 'text-slate-950 font-bold'
            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
        title="Switch to Light Theme"
      >
        {theme === 'light' && (
          <motion.div
            layoutId="theme-active-indicator"
            className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-slate-200/80 -z-10"
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          />
        )}
        <motion.div
          animate={{ rotate: theme === 'light' ? 0 : -30, scale: theme === 'light' ? 1.05 : 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          <Sun className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-amber-500 fill-amber-400/30' : 'text-slate-400'}`} />
        </motion.div>
        <span className="font-medium">Light</span>
      </button>

      {/* Dark Option Button */}
      <button
        type="button"
        onClick={() => handleSelectTheme('dark')}
        className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors z-10 ${
          theme === 'dark'
            ? 'text-white font-bold'
            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
        title="Switch to Dark Theme"
      >
        {theme === 'dark' && (
          <motion.div
            layoutId="theme-active-indicator"
            className="absolute inset-0 rounded-xl bg-slate-800/90 shadow-[0_2px_10px_rgba(0,0,0,0.4)] border border-slate-700/80 -z-10"
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          />
        )}
        <motion.div
          animate={{ rotate: theme === 'dark' ? 0 : 30, scale: theme === 'dark' ? 1.05 : 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-emerald-400 fill-emerald-400/30' : 'text-slate-400'}`} />
        </motion.div>
        <span className="font-medium">Dark</span>
      </button>
    </div>
  );
};
