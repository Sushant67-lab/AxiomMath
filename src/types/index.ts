export type FormulaCategory = 'trigonometry' | 'algebra' | 'derivative' | 'integration';

export type AgeGroup = '12-15' | '16-18' | '19-25' | 'all';

export interface Formula {
  id: string;
  title: string;
  category: FormulaCategory;
  ageGroup: AgeGroup;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  latex: string;
  formulaDisplay: string;
  readable: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
  keyRulesOrIdentities: string[];
  workedExample: {
    question: string;
    stepByStep: string[];
    finalAnswer: string;
    tip: string;
  };
  interactiveType?: 'unit_circle' | 'quadratic_roots' | 'tangent_derivative' | 'riemann_integral';
}

export interface WordProblem {
  id: string;
  title: string;
  category: FormulaCategory;
  ageGroup: AgeGroup;
  gradeLevel: string; // e.g., "Grade 8-9 (Age 12-15)", "Grade 11-12 (Age 16-18)", "College / STEM (Age 19-25)"
  textbookChapter: string;
  contextStory: string;
  questionText: string;
  givens: { label: string; value: string }[];
  toFind: string;
  primaryFormula: string;
  hints: string[];
  options: { id: string; text: string; explanation: string }[];
  correctOptionId: string;
  detailedStepByStep: { step: string; explanation: string; math: string }[];
  practicalApplication: string;
}

export interface QuizQuestion {
  id: string;
  category: FormulaCategory | 'word_problems';
  ageGroup: AgeGroup;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  question: string;
  formulaContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TestResult {
  id: string;
  testTitle: string;
  category: FormulaCategory | 'all' | 'word_problems';
  ageGroup: AgeGroup;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeTakenSeconds: number;
  date: string;
  xpEarned: number;
  questionsSummary: {
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'general' | 'formula' | 'streak' | 'test' | 'word_problem';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  dateUnlocked?: string;
}

export interface UserStats {
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  testsCompleted: number;
  totalQuestionsAnswered: number;
  correctAnswersCount: number;
  rushHighScore: number;
  masteredFormulaIds: string[];
  solvedWordProblemIds: string[];
  categoryMastery: {
    trigonometry: number; // 0 - 100
    algebra: number;
    derivative: number;
    integration: number;
    word_problems: number;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  password?: string;
  avatar: string; // e.g., 'euler', 'hypatia', 'newton', 'noether', 'gauss', 'ramanujan'
  targetAge: AgeGroup;
  joinedDate: string;
  stats: UserStats;
  testHistory: TestResult[];
  badges: AchievementBadge[];
}
