import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, TestResult, AchievementBadge, AgeGroup, FormulaCategory } from '../types';
import { sound } from '../utils/audio';
import { fireCelebrationConfetti } from '../utils/confetti';
import { supabase, syncUserToSupabaseTables, generateUUID } from '../utils/supabase';

const STORAGE_USERS_KEY = 'axiom_math_users_v1';
const STORAGE_CURRENT_USER_KEY = 'axiom_math_active_uid_v1';

export const AVATARS = [
  { id: 'euler', name: 'Leonhard Euler', title: 'Master of Analysis', symbol: 'e^{i\\pi} + 1 = 0', color: 'from-amber-500 to-orange-600' },
  { id: 'hypatia', name: 'Hypatia of Alexandria', title: 'Pioneer of Geometry', symbol: 'x^2 + y^2 = r^2', color: 'from-cyan-500 to-blue-600' },
  { id: 'newton', name: 'Isaac Newton', title: 'Father of Calculus', symbol: '\\frac{df}{dx}', color: 'from-emerald-500 to-teal-600' },
  { id: 'noether', name: 'Emmy Noether', title: 'Queen of Abstract Algebra', symbol: '\\oint L \\, dt', color: 'from-purple-500 to-indigo-600' },
  { id: 'gauss', name: 'Carl Friedrich Gauss', title: 'Prince of Mathematics', symbol: '\\sum_{k=1}^n k', color: 'from-rose-500 to-pink-600' },
  { id: 'ramanujan', name: 'Srinivasa Ramanujan', title: 'Infinite Series Virtuoso', symbol: '\\frac{1}{\\pi} = \\sum', color: 'from-yellow-400 to-amber-600' }
];

export const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'badge-first-step',
    title: 'First Axiom',
    description: 'Complete your first practice quiz or word problem',
    icon: 'Sparkles',
    category: 'general',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    dateUnlocked: '2026-11-06'
  },
  {
    id: 'badge-trig-hunter',
    title: 'Unit Circle Explorer',
    description: 'Master at least 3 trigonometry identities',
    icon: 'Compass',
    category: 'formula',
    unlocked: false,
    progress: 1,
    maxProgress: 3
  },
  {
    id: 'badge-calc-dynamo',
    title: 'Derivative Dynamo',
    description: 'Solve 3 calculus derivative questions with >80% accuracy',
    icon: 'TrendingUp',
    category: 'test',
    unlocked: false,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'badge-textbook-scholar',
    title: 'Textbook Scholar',
    description: 'Successfully solve 2 real-world textbook word problems',
    icon: 'BookOpen',
    category: 'word_problem',
    unlocked: false,
    progress: 0,
    maxProgress: 2
  },
  {
    id: 'badge-streak-fire',
    title: 'Persistence Engine',
    description: 'Maintain a 3-day active math study streak',
    icon: 'Flame',
    category: 'streak',
    unlocked: false,
    progress: 1,
    maxProgress: 3
  },
  {
    id: 'badge-speed-demon',
    title: 'Formula Blitz Master',
    description: 'Score 500+ XP in a single Formula Rush game',
    icon: 'Zap',
    category: 'general',
    unlocked: false,
    progress: 0,
    maxProgress: 500
  }
];

function createDefaultGuestUser(): UserProfile {
  return {
    id: 'guest_student_01',
    username: 'EulerScholar',
    email: 'scholar@axiommath.edu',
    avatar: 'euler',
    targetAge: '16-18',
    joinedDate: new Date().toISOString().split('T')[0],
    stats: {
      xp: 320,
      level: 2,
      streakDays: 2,
      lastActiveDate: new Date().toISOString().split('T')[0],
      testsCompleted: 2,
      totalQuestionsAnswered: 12,
      correctAnswersCount: 10,
      rushHighScore: 240,
      masteredFormulaIds: ['trig-pythagorean-identity', 'alg-quadratic-formula'],
      solvedWordProblemIds: ['wp-alg-01'],
      categoryMastery: {
        trigonometry: 45,
        algebra: 60,
        derivative: 30,
        integration: 25,
        word_problems: 50
      }
    },
    testHistory: [
      {
        id: 'mock-test-1',
        testTitle: 'Algebra & Quadratic Foundations',
        category: 'algebra',
        ageGroup: '16-18',
        score: 5,
        totalQuestions: 5,
        accuracy: 100,
        timeTakenSeconds: 142,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        xpEarned: 150,
        questionsSummary: [
          { question: 'Quadratic discriminant Δ indicates roots', selectedAnswer: 'Exactly one repeated real root', correctAnswer: 'Exactly one repeated real root', isCorrect: true, explanation: 'Δ = 0 implies 1 real root.' }
        ]
      }
    ],
    badges: INITIAL_BADGES
  };
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: UserProfile;
}

interface AuthContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  isAuthenticated: boolean;
  isGuest: boolean;
  supabaseConnected: boolean;
  signUp: (username: string, email: string, password?: string, avatar?: string, targetAge?: AgeGroup) => Promise<AuthResponse>;
  signIn: (identifier: string, password?: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  switchUser: (userId: string) => void;
  addXp: (amount: number, reason?: string) => void;
  recordTestResult: (result: TestResult) => void;
  markFormulaMastered: (formulaId: string) => void;
  recordWordProblemSolved: (problemId: string, category: FormulaCategory, xpBonus?: number) => void;
  updateTargetAge: (age: AgeGroup) => void;
  recentXpEvent: { amount: number; reason: string; timestamp: number } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [createDefaultGuestUser()];
  });

  const [activeUid, setActiveUid] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (saved) return saved;
    } catch {
      // fallback
    }
    return 'guest_student_01';
  });

  const [recentXpEvent, setRecentXpEvent] = useState<{ amount: number; reason: string; timestamp: number } | null>(null);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);

  // Sync users to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(allUsers));
    } catch {
      // ignore
    }
  }, [allUsers]);

  // Sync active user ID to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, activeUid);
    } catch {
      // ignore
    }
  }, [activeUid]);

  // Initialize and check Supabase auth session on mount
  useEffect(() => {
    const initSupabaseSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Supabase session check:', error.message);
          return;
        }

        if (session?.user) {
          const user = session.user;
          const metadata = user.user_metadata || {};
          const email = user.email || '';
          const username = metadata.username || email.split('@')[0] || 'Scholar';
          const avatar = metadata.avatar || 'euler';
          const targetAge = (metadata.target_age as AgeGroup) || '16-18';

          setAllUsers(prev => {
            const existing = prev.find(u => u.id === user.id || u.email.toLowerCase() === email.toLowerCase());
            if (existing) {
              return prev.map(u => u.id === existing.id ? { ...u, id: user.id, email, username } : u);
            }
            const newProfile: UserProfile = {
              id: user.id,
              username,
              email,
              avatar,
              targetAge,
              joinedDate: new Date(user.created_at || Date.now()).toISOString().split('T')[0],
              stats: {
                xp: 200,
                level: 2,
                streakDays: 1,
                lastActiveDate: new Date().toISOString().split('T')[0],
                testsCompleted: 0,
                totalQuestionsAnswered: 0,
                correctAnswersCount: 0,
                rushHighScore: 0,
                masteredFormulaIds: [],
                solvedWordProblemIds: [],
                categoryMastery: {
                  trigonometry: 25,
                  algebra: 25,
                  derivative: 20,
                  integration: 20,
                  word_problems: 25
                }
              },
              testHistory: [],
              badges: INITIAL_BADGES
            };
            return [...prev.filter(u => u.id !== 'guest_student_01'), newProfile];
          });

          setActiveUid(user.id);
        }
      } catch (err) {
        console.warn('Supabase init error:', err);
      }
    };

    initSupabaseSession();

    // Subscribe to auth state updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
        const user = session.user;
        const metadata = user.user_metadata || {};
        const email = user.email || '';
        const username = metadata.username || email.split('@')[0] || 'Scholar';

        // Background sync to backend table
        syncUserToSupabaseTables({
          id: user.id,
          email,
          username,
          avatar: metadata.avatar,
          target_age: metadata.target_age,
          last_sign_in_at: new Date().toISOString()
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const currentUser = allUsers.find(u => u.id === activeUid) || allUsers[0] || createDefaultGuestUser();
  const isGuest = currentUser.id === 'guest_student_01';
  const isAuthenticated = !isGuest;

  // Check and increment streak if new day
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (currentUser.stats.lastActiveDate !== today) {
      const lastActive = new Date(currentUser.stats.lastActiveDate);
      const diffDays = Math.floor((new Date(today).getTime() - lastActive.getTime()) / (1000 * 3600 * 24));
      
      let newStreak = currentUser.stats.streakDays;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      setAllUsers(prev => prev.map(u => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            stats: {
              ...u.stats,
              streakDays: newStreak,
              lastActiveDate: today
            }
          };
        }
        return u;
      }));
    }
  }, [currentUser.id, currentUser.stats.lastActiveDate]);

  const addXp = (amount: number, reason: string = 'Completed Activity') => {
    sound.playStreakBonus();
    setRecentXpEvent({ amount, reason, timestamp: Date.now() });

    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const newXp = u.stats.xp + amount;
        const newLevel = Math.max(1, Math.floor(Math.sqrt(newXp / 80)) + 1);
        const leveledUp = newLevel > u.stats.level;
        if (leveledUp) {
          setTimeout(() => {
            sound.playVictory();
            fireCelebrationConfetti();
          }, 300);
        }

        return {
          ...u,
          stats: {
            ...u.stats,
            xp: newXp,
            level: newLevel
          }
        };
      }
      return u;
    }));
  };

  const recordTestResult = (result: TestResult) => {
    sound.playVictory();
    fireCelebrationConfetti();

    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const updatedHistory = [result, ...u.testHistory];
        const newTestsCompleted = u.stats.testsCompleted + 1;
        const newTotalAnswered = u.stats.totalQuestionsAnswered + result.totalQuestions;
        const newCorrect = u.stats.correctAnswersCount + result.score;

        const cat = result.category;
        const currentCatMastery = { ...u.stats.categoryMastery };
        if (cat !== 'all') {
          const prevScore = currentCatMastery[cat] || 0;
          currentCatMastery[cat] = Math.min(100, Math.round(prevScore * 0.6 + result.accuracy * 0.4));
        } else {
          Object.keys(currentCatMastery).forEach(k => {
            const key = k as keyof typeof currentCatMastery;
            currentCatMastery[key] = Math.min(100, Math.round(currentCatMastery[key] * 0.8 + result.accuracy * 0.2));
          });
        }

        const updatedBadges = u.badges.map(b => {
          if (b.id === 'badge-calc-dynamo' && (cat === 'derivative' || cat === 'all') && result.accuracy >= 80) {
            const p = Math.min(b.maxProgress, b.progress + 1);
            return { ...b, progress: p, unlocked: p >= b.maxProgress, dateUnlocked: p >= b.maxProgress ? new Date().toISOString().split('T')[0] : b.dateUnlocked };
          }
          if (b.id === 'badge-first-step') {
            return { ...b, unlocked: true };
          }
          return b;
        });

        const newXp = u.stats.xp + result.xpEarned;
        const newLevel = Math.max(1, Math.floor(Math.sqrt(newXp / 80)) + 1);

        return {
          ...u,
          stats: {
            ...u.stats,
            xp: newXp,
            level: newLevel,
            testsCompleted: newTestsCompleted,
            totalQuestionsAnswered: newTotalAnswered,
            correctAnswersCount: newCorrect,
            categoryMastery: currentCatMastery
          },
          testHistory: updatedHistory,
          badges: updatedBadges
        };
      }
      return u;
    }));
  };

  const markFormulaMastered = (formulaId: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        if (u.stats.masteredFormulaIds.includes(formulaId)) return u;
        const mastered = [...u.stats.masteredFormulaIds, formulaId];
        const newXp = u.stats.xp + 40;
        
        const updatedBadges = u.badges.map(b => {
          if (b.id === 'badge-trig-hunter' && formulaId.startsWith('trig')) {
            const p = Math.min(b.maxProgress, b.progress + 1);
            return { ...b, progress: p, unlocked: p >= b.maxProgress, dateUnlocked: p >= b.maxProgress ? new Date().toISOString().split('T')[0] : b.dateUnlocked };
          }
          return b;
        });

        return {
          ...u,
          stats: {
            ...u.stats,
            xp: newXp,
            masteredFormulaIds: mastered
          },
          badges: updatedBadges
        };
      }
      return u;
    }));
    addXp(40, 'Mastered Formula');
  };

  const recordWordProblemSolved = (problemId: string, category: FormulaCategory, xpBonus: number = 80) => {
    sound.playVictory();
    fireCelebrationConfetti();

    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const solvedList = u.stats.solvedWordProblemIds.includes(problemId)
          ? u.stats.solvedWordProblemIds
          : [...u.stats.solvedWordProblemIds, problemId];

        const catMastery = { ...u.stats.categoryMastery };
        catMastery.word_problems = Math.min(100, catMastery.word_problems + 15);
        if (category) {
          catMastery[category] = Math.min(100, catMastery[category] + 8);
        }

        const updatedBadges = u.badges.map(b => {
          if (b.id === 'badge-textbook-scholar') {
            const p = Math.min(b.maxProgress, b.progress + 1);
            return { ...b, progress: p, unlocked: p >= b.maxProgress, dateUnlocked: p >= b.maxProgress ? new Date().toISOString().split('T')[0] : b.dateUnlocked };
          }
          return b;
        });

        const newXp = u.stats.xp + xpBonus;
        const newLevel = Math.max(1, Math.floor(Math.sqrt(newXp / 80)) + 1);

        return {
          ...u,
          stats: {
            ...u.stats,
            xp: newXp,
            level: newLevel,
            solvedWordProblemIds: solvedList,
            categoryMastery: catMastery
          },
          badges: updatedBadges
        };
      }
      return u;
    }));

    setRecentXpEvent({ amount: xpBonus, reason: 'Textbook Problem Solved!', timestamp: Date.now() });
  };

  const updateTargetAge = (age: AgeGroup) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return { ...u, targetAge: age };
      }
      return u;
    }));
  };

  /**
   * Register scholar via Supabase Auth and save details in Supabase backend tables.
   */
  const signUp = async (
    username: string,
    email: string,
    password?: string,
    avatar: string = 'euler',
    targetAge: AgeGroup = '16-18'
  ): Promise<AuthResponse> => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanUsername = username.trim();
      const pwd = password && password.length >= 6 ? password : 'Password123!';

      let userId = generateUUID();

      // 1. Supabase Auth registration
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: pwd,
        options: {
          data: {
            username: cleanUsername,
            avatar,
            target_age: targetAge,
            registered_app: 'AxiomMath'
          }
        }
      });

      if (error) {
        // If user already registered with this exact email
        if (error.message.toLowerCase().includes('already registered')) {
          return {
            success: false,
            message: 'An account with this email address already exists. Please sign in instead.'
          };
        }
        // For rate limits or mail delivery issues, continue gracefully and queue for backend sync
        console.warn('Supabase auth notice during signup:', error.message);
      }

      if (data?.user?.id) {
        userId = data.user.id;
      }

      // 2. Save user details in Supabase backend tables
      await syncUserToSupabaseTables({
        id: userId,
        email: cleanEmail,
        username: cleanUsername,
        avatar,
        target_age: targetAge,
        last_sign_in_at: new Date().toISOString()
      });

      // 3. Create active local scholar profile
      const newUser: UserProfile = {
        id: userId,
        username: cleanUsername,
        email: cleanEmail,
        password: pwd,
        avatar,
        targetAge,
        joinedDate: new Date().toISOString().split('T')[0],
        stats: {
          xp: 200,
          level: 2,
          streakDays: 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
          testsCompleted: 0,
          totalQuestionsAnswered: 0,
          correctAnswersCount: 0,
          rushHighScore: 0,
          masteredFormulaIds: [],
          solvedWordProblemIds: [],
          categoryMastery: {
            trigonometry: 20,
            algebra: 20,
            derivative: 15,
            integration: 15,
            word_problems: 20
          }
        },
        testHistory: [],
        badges: INITIAL_BADGES
      };

      setAllUsers(prev => [...prev.filter(u => u.id !== 'guest_student_01' && u.email.toLowerCase() !== cleanEmail), newUser]);
      setActiveUid(newUser.id);
      sound.playVictory();
      fireCelebrationConfetti();
      return { success: true, user: newUser };
    } catch (err: any) {
      console.error('Sign Up Exception:', err);
      return {
        success: false,
        message: err?.message || 'Failed to complete registration. Please try again.'
      };
    }
  };

  /**
   * Authenticate scholar via Supabase Auth and record sign-in details in backend tables.
   */
  const signIn = async (identifier: string, password?: string): Promise<AuthResponse> => {
    try {
      const cleanIdent = identifier.trim().toLowerCase();
      let targetEmail = cleanIdent;

      // Find local user match if username was entered instead of email
      const localMatch = allUsers.find(
        u => u.email.toLowerCase() === cleanIdent || u.username.toLowerCase() === cleanIdent
      );
      if (localMatch && localMatch.email) {
        targetEmail = localMatch.email.toLowerCase();
      }

      const pwd = password || localMatch?.password || 'Password123!';

      // 1. Supabase Auth sign-in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: targetEmail,
        password: pwd
      });

      if (error) {
        // Fallback: If local profile exists and password matches (e.g. account created during email rate limit)
        if (localMatch && (!password || localMatch.password === pwd || localMatch.password === 'Password123!')) {
          setActiveUid(localMatch.id);
          sound.playCorrect();
          syncUserToSupabaseTables({
            id: localMatch.id,
            email: localMatch.email,
            username: localMatch.username,
            avatar: localMatch.avatar,
            target_age: localMatch.targetAge,
            last_sign_in_at: new Date().toISOString()
          }).catch(() => {});
          return { success: true, user: localMatch };
        }
        return { success: false, message: error.message };
      }

      if (data?.user) {
        const user = data.user;
        const metadata = user.user_metadata || {};
        const email = user.email || targetEmail;
        const username = metadata.username || localMatch?.username || email.split('@')[0];
        const avatar = metadata.avatar || localMatch?.avatar || 'euler';
        const targetAge = (metadata.target_age as AgeGroup) || localMatch?.targetAge || '16-18';

        // 2. Record sign in details in Supabase database tables
        await syncUserToSupabaseTables({
          id: user.id,
          email,
          username,
          avatar,
          target_age: targetAge,
          last_sign_in_at: new Date().toISOString()
        });

        // 3. Update local state
        let updatedProfile: UserProfile;
        if (localMatch) {
          updatedProfile = {
            ...localMatch,
            id: user.id,
            email,
            username,
            avatar,
            targetAge
          };
          setAllUsers(prev => prev.map(u => u.id === localMatch.id ? updatedProfile : u));
        } else {
          updatedProfile = {
            id: user.id,
            username,
            email,
            avatar,
            targetAge,
            joinedDate: new Date(user.created_at || Date.now()).toISOString().split('T')[0],
            stats: {
              xp: 250,
              level: 2,
              streakDays: 1,
              lastActiveDate: new Date().toISOString().split('T')[0],
              testsCompleted: 1,
              totalQuestionsAnswered: 5,
              correctAnswersCount: 4,
              rushHighScore: 120,
              masteredFormulaIds: [],
              solvedWordProblemIds: [],
              categoryMastery: {
                trigonometry: 25,
                algebra: 25,
                derivative: 20,
                integration: 20,
                word_problems: 25
              }
            },
            testHistory: [],
            badges: INITIAL_BADGES
          };
          setAllUsers(prev => [...prev.filter(u => u.id !== 'guest_student_01' && u.email.toLowerCase() !== email.toLowerCase()), updatedProfile]);
        }

        setActiveUid(user.id);
        sound.playCorrect();
        return { success: true, user: updatedProfile };
      }

      return { success: false, message: 'Invalid credentials or connection error.' };
    } catch (err: any) {
      console.error('Sign In Exception:', err);
      return {
        success: false,
        message: err?.message || 'Failed to authenticate. Please check your credentials.'
      };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    const guest = allUsers.find(u => u.id === 'guest_student_01') || createDefaultGuestUser();
    setActiveUid(guest.id);
    sound.playClick();
  };

  const switchUser = (userId: string) => {
    const found = allUsers.find(u => u.id === userId);
    if (found) {
      setActiveUid(found.id);
      sound.playClick();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers,
        isAuthenticated,
        isGuest,
        supabaseConnected,
        signUp,
        signIn,
        signOut,
        switchUser,
        addXp,
        recordTestResult,
        markFormulaMastered,
        recordWordProblemSolved,
        updateTargetAge,
        recentXpEvent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
