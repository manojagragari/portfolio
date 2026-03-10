'use client';

import { motion } from 'framer-motion';
import { certifications } from '../lib/data';
import { FaExternalLinkAlt } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const colorMap = {
  cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/8',
  purple: 'text-purple-400 border-purple-500/30 bg-purple-500/8',
  blue: 'text-blue-400 border-blue-500/30 bg-blue-500/8',
  green: 'text-green-400 border-green-500/30 bg-green-500/8',
};

export default function Certifications() {
  return (
    <section id="certifications" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_100%,rgba(168,85,247,0.05)_0%,transparent_55%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400/60 font-mono text-xs tracking-widest uppercase mb-3">
            //&nbsp;08. CREDENTIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Certifications
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {certifications.map((cert) => {
            const color = colorMap[cert.color] || colorMap.cyan;
            return (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`glass-card border ${color} p-5 transition-all duration-300 group relative cursor-default`}
              >
                {/* Icon */}
                <div className="text-4xl mb-4">{cert.icon}</div>

                {/* Title */}
                <h3 className="text-white font-bold text-sm font-orbitron mb-2 leading-tight group-hover:text-cyan-100 transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer + Year */}
                <p className={`text-xs font-mono ${color.split(' ')[0]} mb-1`}>{cert.issuer}</p>
                <p className="text-xs text-gray-600 mb-4">{cert.year}</p>

                {/* Verified badge */}
                <div className={`inline-flex items-center gap-1 text-xs border ${color} px-2.5 py-1 rounded-full`}>
                  <span>✓</span> Verified
                </div>

                {/* External link */}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${cert.title}`}
                    className="absolute top-4 right-4 text-gray-600 hover:text-cyan-400 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                )}

                {/* Corner accent */}
                <span className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-current opacity-20" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
