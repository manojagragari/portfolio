'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '../lib/api';

const colorStyles = {
  cyan: {
    card: 'border-cyan-500/20 hover:border-cyan-500/40',
    title: 'text-cyan-400',
    badge: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    glow: 'hover:shadow-[0_0_20px_rgba(0,229,255,0.08)]',
    dot: 'bg-cyan-500',
  },
  purple: {
    card: 'border-purple-500/20 hover:border-purple-500/40',
    title: 'text-purple-400',
    badge: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.08)]',
    dot: 'bg-purple-500',
  },
  blue: {
    card: 'border-blue-500/20 hover:border-blue-500/40',
    title: 'text-blue-400',
    badge: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]',
    dot: 'bg-blue-500',
  },
  green: {
    card: 'border-green-500/20 hover:border-green-500/40',
    title: 'text-green-400',
    badge: 'bg-green-500/10 border-green-500/30 text-green-300',
    glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]',
    dot: 'bg-green-500',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function loadSkills() {
      const data = await getSkills();
      setSkills(data || []);
    }
    loadSkills();
  }, []);

  return (
    <section id="skills" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.04)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400/60 font-mono text-xs tracking-widest uppercase mb-3">
            //&nbsp;06. TECHNICAL ARSENAL
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Skills
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((category) => {
            const style = colorStyles[category.color] || colorStyles.cyan;
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className={`glass-card border ${style.card} ${style.glow} p-6 transition-all duration-300 group relative overflow-hidden`}
              >
                {/* BG glow */}
                <div
                  className={`absolute -right-8 -top-8 w-24 h-24 rounded-full ${style.dot} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`}
                />

                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className={`font-bold font-orbitron text-sm ${style.title}`}>
                    {category.category}
                  </h3>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.08 }}
                      className={`tech-badge border ${style.badge} cursor-default transition-all duration-200`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Count pill */}
                <div className={`mt-4 text-right`}>
                  <span className={`text-xs font-mono ${style.title} opacity-50`}>
                    {category.items.length} skills
                  </span>
                </div>

                {/* Corner accent */}
                <span
                  className={`absolute bottom-3 right-3 w-2 h-2 border-b border-r ${style.card.split(' ')[0]} opacity-50`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
