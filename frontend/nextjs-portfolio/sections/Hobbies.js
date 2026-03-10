'use client';

import { motion } from 'framer-motion';
import { hobbies } from '../lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Hobbies() {
  return (
    <section id="hobbies" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,229,255,0.04)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

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
            //&nbsp;09. BEYOND THE CODE
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Hobbies & Interests
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto"
        >
          {hobbies.map((hobby) => (
            <motion.div
              key={hobby.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.04 }}
              className="glass-card border border-white/8 hover:border-cyan-500/25 p-6 text-center flex flex-col items-center gap-3 cursor-default transition-all duration-300 group"
            >
              <motion.span
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: hobby.id * 0.5 }}
                className="text-4xl"
              >
                {hobby.icon}
              </motion.span>
              <h3 className="text-white font-bold text-sm font-orbitron group-hover:text-cyan-400 transition-colors">
                {hobby.name}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">{hobby.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
