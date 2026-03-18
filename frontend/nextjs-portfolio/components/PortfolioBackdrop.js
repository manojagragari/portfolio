'use client';

import { motion } from 'framer-motion';

export default function PortfolioBackdrop() {
  return (
    <div className="portfolio-backdrop fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 portfolio-surface" />
      <div className="absolute inset-0 portfolio-lines opacity-20" />
      <motion.div
        className="absolute -top-24 right-[12%] h-[24rem] w-[24rem] rounded-full bg-purple-500/20 blur-[120px]"
        animate={{ x: [0, 18, 0], y: [0, 10, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 noise-overlay opacity-25" />
    </div>
  );
}
