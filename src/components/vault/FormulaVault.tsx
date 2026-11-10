import React, { useState, useMemo } from 'react';
import { ENGINEERING_FORMULAS_DATA, FormulaChapter, FormulaItem } from '../../data/engineeringFormulasData';
import { MathView } from '../common/MathView';
import { sound } from '../../utils/audio';
import { 
  Search, 
  Bookmark, 
  Copy, 
  Check, 
  BookOpen, 
  Sparkles, 
  ChevronRight,
  Filter,
  Layers,
  ArrowUpRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormulaVaultProps {
  onPracticeFormula?: (category?: string) => void;
}

export const FormulaVault: React.FC<FormulaVaultProps> = ({ onPracticeFormula }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('axiom_formula_vault_bookmarks');
      return saved ? JSON.parse(saved) : ['qd-2', 'py-1', 'd-xn', 'int-1x', 'lap-sin'];
    } catch {
      return ['qd-2', 'py-1', 'd-xn'];
    }
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleBookmark = (id: string) => {
    sound.playClick();
    setBookmarkedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('axiom_formula_vault_bookmarks', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleCopyFormula = (id: string, math: string, name: string) => {
    sound.playClick();
    navigator.clipboard.writeText(`${name}: ${math}`);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  };

  // Filtered chapters and items
  const filteredChapters = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return ENGINEERING_FORMULAS_DATA.map(ch => {
      // Filter topics and formulas within this chapter
      const matchingTopics = ch.topics.map(topic => {
        const matchingFormulas = topic.formulas.filter(f => {
          const isBookmarked = bookmarkedIds.includes(f.id);
          if (showBookmarksOnly && !isBookmarked) return false;

          if (!q) return true;
          return (
            f.name.toLowerCase().includes(q) ||
            f.math.toLowerCase().includes(q) ||
            (f.explanation && f.explanation.toLowerCase().includes(q)) ||
            topic.title.toLowerCase().includes(q) ||
            ch.title.toLowerCase().includes(q)
          );
        });

        return {
          ...topic,
          formulas: matchingFormulas
        };
      }).filter(topic => topic.formulas.length > 0);

      return {
        ...ch,
        topics: matchingTopics
      };
    }).filter(ch => {
      if (selectedChapterId !== 'all' && ch.id !== selectedChapterId) return false;
      return ch.topics.length > 0;
    });
  }, [searchQuery, selectedChapterId, showBookmarksOnly, bookmarkedIds]);

  const totalFormulasCount = useMemo(() => {
    return ENGINEERING_FORMULAS_DATA.reduce((acc, ch) => {
      return acc + ch.topics.reduce((tAcc, t) => tAcc + t.formulas.length, 0);
    }, 0);
  }, []);

  const displayedFormulasCount = useMemo(() => {
    return filteredChapters.reduce((acc, ch) => {
      return acc + ch.topics.reduce((tAcc, t) => tAcc + t.formulas.length, 0);
    }, 0);
  }, [filteredChapters]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-white via-slate-50 to-slate-100/80 dark:from-slate-950 dark:via-slate-900 dark:to-black border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm dark:shadow-2xl transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold tracking-wider uppercase">
              Engineering / B.Tech Mathematics Handbook
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              20 Chapters · {totalFormulasCount} Preserved Formulas
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Formula Vault & Mathematical Compendium
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Curated handbook organized chapter-wise with preserved notation, mathematical symbols, fractional representations, powers, integrals, and coordinate forms.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search any formula (e.g., Laplace, sin(2A), quadratic roots, Bayes, Fourier)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowBookmarksOnly(!showBookmarksOnly);
              }}
              className={`px-4 py-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 shrink-0 ${
                showBookmarksOnly
                  ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300 font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200/90 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
              <span>Bookmarked ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Selection Ribbon / Drawer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Chapters (1 to 20):
          </span>
          <span className="font-mono text-emerald-400">
            Showing {displayedFormulasCount} of {totalFormulasCount} formulas
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedChapterId('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
              selectedChapterId === 'all'
                ? 'bg-emerald-500 text-black font-bold shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            All 20 Chapters
          </button>

          {ENGINEERING_FORMULAS_DATA.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                sound.playClick();
                setSelectedChapterId(ch.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                selectedChapterId === ch.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500 font-semibold'
                  : 'bg-slate-900/80 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className="font-mono font-bold mr-1.5 text-slate-500">Ch.{ch.chapterNumber}</span>
              <span>{ch.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredChapters.length === 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Matching Formulas Found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search keywords or clear the bookmarks filter to view all handbook entries.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedChapterId('all');
              setShowBookmarksOnly(false);
            }}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-emerald-400 font-medium hover:text-emerald-300"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Chapters & Topics List */}
      <div className="space-y-8">
        {filteredChapters.map((ch) => (
          <div key={ch.id} className="bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl transition-colors">
            {/* Chapter Header Banner */}
            <div className="bg-slate-50/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {ch.chapterNumber}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      Chapter {ch.chapterNumber}: {ch.title}
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {ch.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ch.description}</p>
                </div>
              </div>

              {onPracticeFormula && (
                <button
                  onClick={() => onPracticeFormula(ch.title.toLowerCase())}
                  className="self-start sm:self-auto text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>Practice Chapter</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Topics Inside Chapter */}
            <div className="p-6 space-y-6">
              {ch.topics.map((topic) => (
                <div key={topic.id} className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-2">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {topic.topicNumber}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {topic.title}
                    </h3>
                  </div>

                  {/* Formulas Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {topic.formulas.map((formula) => {
                      const isBookmarked = bookmarkedIds.includes(formula.id);
                      const isCopied = copiedId === formula.id;

                      return (
                        <div
                          key={formula.id}
                          className="bg-white dark:bg-black/80 border border-slate-200 dark:border-slate-800/90 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/40 dark:hover:border-slate-700 transition-all hover:shadow-[0_4px_16px_rgba(16,185,129,0.06)] relative group shadow-sm"
                        >
                          {/* Card Top: Title and Actions */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                              {formula.name}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleCopyFormula(formula.id, formula.math, formula.name)}
                                title="Copy formula notation"
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-xs"
                              >
                                {isCopied ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => toggleBookmark(formula.id)}
                                title={isBookmarked ? 'Remove bookmark' : 'Bookmark formula'}
                                className={`p-1.5 rounded-lg border text-xs transition-colors ${
                                  isBookmarked
                                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300'
                                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                }`}
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                              </button>
                            </div>
                          </div>

                          {/* Math Render Block */}
                          <div className="p-3.5 rounded-lg bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/60 flex items-center justify-center min-h-[56px] overflow-x-auto text-emerald-800 dark:text-emerald-300 text-sm shadow-inner transition-colors">
                            <MathView math={formula.math} block={true} />
                          </div>

                          {/* Explanation or Note if available */}
                          {formula.explanation && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed font-sans italic border-t border-slate-200 dark:border-slate-900 pt-2">
                              {formula.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
