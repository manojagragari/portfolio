'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getEducation } from '../lib/api';
import { education as fallbackEducation } from '../lib/data';

const colorMap = {
  cyan: {
    dot: 'bg-cyan-500 shadow-[0_0_10px_rgba(0,229,255,0.8)]',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    line: 'bg-gradient-to-b from-cyan-500/50 to-transparent',
  },
  purple: {
    dot: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    line: 'bg-gradient-to-b from-purple-500/50 to-transparent',
  },
  blue: {
    dot: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    line: 'bg-gradient-to-b from-blue-500/50 to-transparent',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    async function loadEducation() {
      const data = await getEducation();
      const normalized = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];
      setEducation(normalized.length ? normalized : fallbackEducation);
    }
    loadEducation();
  }, []);

  return (
    <section id="education" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400/60 font-mono text-xs tracking-widest uppercase mb-3">
            //&nbsp;02. ACADEMIC JOURNEY
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Education
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto" />
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-transparent" />

          <div className="space-y-10">
            {education.map((edu, idx) => {
              const colors = colorMap[edu.color] || colorMap.cyan;
              return (
                <motion.div key={edu.id} variants={cardVariants} className="relative pl-16">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 top-6 w-5 h-5 rounded-full border-2 border-[#0a0a0a] ${colors.dot} z-10 flex items-center justify-center`}
                  >
                    <span className="text-[10px]">{edu.icon}</span>
                  </div>

                  {/* Connector line to card */}
                  <div
                    className={`absolute left-[26px] top-[30px] h-px w-8 bg-gradient-to-r from-transparent ${colors.text.replace('text-', 'to-')}/40`}
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 4, borderColor: 'rgba(0,229,255,0.3)' }}
                    className={`glass-card border ${colors.border} p-6 transition-all duration-300`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <h3 className={`text-lg font-bold font-orbitron ${colors.text} mb-1`}>
                          {edu.institution}
                        </h3>
                        <p className="text-white/80 font-medium text-sm">{edu.degree}</p>
                        <p className="text-gray-500 text-xs mt-1">{edu.location}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                        <span className={`tech-badge border ${colors.badge} font-bold text-sm`}>
                          {edu.grade}
                        </span>
                        <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-0.5 rounded-full bg-white/3">
                          {edu.period}
                        </span>
                      </div>
                    </div>
                    {/* Corner accents */}
                    <span className={`absolute top-3 right-3 w-2 h-2 border-t border-r ${colors.border}`} />
                    <span className={`absolute bottom-3 left-3 w-2 h-2 border-b border-l ${colors.border}`} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
