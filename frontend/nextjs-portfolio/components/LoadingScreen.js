'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = ['INITIALIZING...', 'LOADING ASSETS...', 'BOOTING PORTFOLIO...', 'READY'];

  useEffect(() => {
    // Skip loading screen if already shown in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('portfolio_loaded')) {
      setLoading(false);
      return;
    }

    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 15 + 5;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => {
          if (typeof window !== 'undefined') sessionStorage.setItem('portfolio_loaded', '1');
          setLoading(false);
        }, 400);
      }
      setProgress(Math.min(prog, 100));
      if (prog < 30) setPhase(0);
      else if (prog < 60) setPhase(1);
      else if (prog < 90) setPhase(2);
      else setPhase(3);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Cyber grid bg */}
          <div className="absolute inset-0 bg-cyber-grid opacity-30" />

          {/* Animated scan line */}
          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent pointer-events-none"
            style={{ animation: 'scanLine 2s linear infinite' }}
          />

          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)]" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo / initials */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'backOut' }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-2xl border border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center shadow-glow-cyan">
                <span className="text-3xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-400">
                  MA
                </span>
              </div>
              {/* Corner accents */}
              <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <h1 className="text-2xl font-bold font-orbitron text-white tracking-widest mb-1">
                MANOJ AGRAHARI
              </h1>
              <p className="text-xs text-cyan-400/70 font-mono tracking-widest">
                DATA SCIENCE · WEB · ANDROID
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 sm:w-80">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-cyan-400/60">{phases[phase]}</span>
                <span className="text-xs font-mono text-cyan-400">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-500"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
