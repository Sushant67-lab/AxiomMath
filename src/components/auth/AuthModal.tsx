import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AgeGroup } from '../../types';
import { sound } from '../../utils/audio';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export type AuthModalMode = 'guest' | 'signin' | 'signup' | 'switch';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthModalMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'guest' }) => {
  const { allUsers, currentUser, signUp, signIn, switchUser, updateTargetAge } = useAuth();
  const [mode, setMode] = useState<AuthModalMode>(initialMode);

  // Form fields: strictly username, email, password, and academic level / target age
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('16-18');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Keep mode in sync with initialMode when opened
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleContinueAsGuest = () => {
    sound.playClick();
    try {
      sessionStorage.setItem('axiom_user_decided_entry', 'guest');
    } catch {
      // ignore
    }
    updateTargetAge(selectedAge);
    onClose();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    if (!username.trim() || !email.trim()) {
      setErrorMsg('Please provide a valid username and email address.');
      sound.playIncorrect();
      setIsSubmitting(false);
      return;
    }

    if (password && password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      sound.playIncorrect();
      setIsSubmitting(false);
      return;
    }

    try {
      // Default avatar 'euler' assigned automatically in background without requiring extra input
      const res = await signUp(
        username.trim(),
        email.trim(),
        password || 'Password123!',
        'euler',
        selectedAge
      );

      setIsSubmitting(false);
      if (res.success) {
        setSuccessMsg('Account created successfully! Welcome.');
        try {
          sessionStorage.setItem('axiom_user_decided_entry', 'user');
        } catch {
          // ignore
        }
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setErrorMsg(res.message || 'Unable to create account. Please verify your details.');
        sound.playIncorrect();
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err?.message || 'An error occurred during registration. Please try again.');
      sound.playIncorrect();
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    if (!email.trim()) {
      setErrorMsg('Please enter your email or username.');
      sound.playIncorrect();
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await signIn(email.trim(), password);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMsg('Welcome back! Signed in successfully.');
        try {
          sessionStorage.setItem('axiom_user_decided_entry', 'user');
        } catch {
          // ignore
        }
        setTimeout(() => {
          onClose();
        }, 700);
      } else {
        setErrorMsg(res.message || 'Invalid credentials. Please verify your email and password.');
        sound.playIncorrect();
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err?.message || 'Authentication error.');
      sound.playIncorrect();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/90 backdrop-blur-md overflow-y-auto transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative transition-colors"
      >
        {/* Header */}
        <div className="text-center pb-4 mb-5 border-b border-slate-200 dark:border-slate-900">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How would you like to enter?
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-6 text-xs font-medium">
          <button
            onClick={() => { setMode('guest'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'guest' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <span>⚡</span>
            <span>Play as Guest</span>
          </button>
          <button
            onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'signin' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'signup' ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/40 text-xs text-rose-700 dark:text-rose-300">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <span>✓</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* MODE 1: GUEST CHOICE */}
        {mode === 'guest' && (
          <div className="space-y-5 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-base">
                  ⚡
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Instant Guest Access</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                    Immediate unrestricted access to the 20-chapter Formula Vault, textbook word problems, speed rush game blitz, and diagnostic exams.
                  </p>
                </div>
              </div>

              {/* Quick Curriculum Age Preference for Guest */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1.5 text-[11px]">
                  Select Curriculum Tier:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '12-15', label: 'Age 12-15', sub: 'Foundation' },
                    { id: '16-18', label: 'Age 16-18', sub: 'High School' },
                    { id: '19-25', label: 'Age 19-25', sub: 'College / STEM' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedAge(t.id as AgeGroup)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        selectedAge === t.id
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-white font-semibold'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-[11px]">{t.label}</div>
                      <div className="text-[9px] text-slate-500">{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinueAsGuest}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Continue as Guest</span>
              <span>→</span>
            </button>
          </div>
        )}

        {/* SIGN UP FORM: ONLY Username, Email, Password, Academic Level / Target Age */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Username</label>
              <input
                type="text"
                required
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                Password <span className="font-normal text-slate-400">(Min. 6 characters)</span>
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Academic Level / Target Age</label>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value as AgeGroup)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="12-15">Age 12-15 (Middle / Junior High Foundation)</option>
                <option value="16-18">Age 16-18 (Senior High / Pre-Calculus)</option>
                <option value="19-25">Age 19-25 (University STEM / Engineering Calculus)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>
        )}

        {/* SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Email or Username</label>
              <input
                type="text"
                required
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        )}

        {/* SWITCH LOCAL PROFILES */}
        {mode === 'switch' && (
          <div className="space-y-2.5 text-xs">
            <span className="text-slate-500 dark:text-slate-400 block mb-2">Select a stored profile on this machine:</span>
            {allUsers.map((u) => {
              const isCurrent = u.id === currentUser.id;
              return (
                <div
                  key={u.id}
                  onClick={() => {
                    switchUser(u.id);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white font-semibold'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{u.username}</div>
                    <div className="text-[11px] text-slate-500">{u.email} · Level {u.stats.level} · {u.stats.xp} XP</div>
                  </div>
                  {isCurrent && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold">Active</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Guest Mode Link when on signin or signup */}
        {mode !== 'guest' && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-center space-y-2">
            <p className="text-[11px] text-slate-500">
              Prefer to explore without an account?
            </p>
            <button
              type="button"
              onClick={handleContinueAsGuest}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue as Guest</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
