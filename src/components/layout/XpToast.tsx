import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const XpToast: React.FC = () => {
  const { recentXpEvent } = useAuth();
  const [visible, setVisible] = useState(false);
  const [eventData, setEventData] = useState<{ amount: number; reason: string } | null>(null);

  useEffect(() => {
    if (recentXpEvent) {
      setEventData({ amount: recentXpEvent.amount, reason: recentXpEvent.reason });
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [recentXpEvent?.timestamp]);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {visible && eventData && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="p-3.5 rounded-xl bg-slate-950/95 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-3 font-mono text-xs backdrop-blur-md"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-emerald-400 font-bold text-sm">
                +{eventData.amount} XP
              </div>
              <div className="text-slate-400 text-[11px] font-sans">
                {eventData.reason}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
