'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaReact, FaCode } from 'react-icons/fa';
import { SiDjango, SiTailwindcss, SiNextdotjs, SiPython, SiFlask, SiSqlite } from 'react-icons/si';
import { getProjects } from '../lib/api';

const techIcons = {
  React: <FaReact className="text-cyan-400" />,
  'Next.js': <SiNextdotjs className="text-white" />,
  Django: <SiDjango className="text-green-500" />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-500" />,
  Python: <SiPython className="text-yellow-400" />,
  Flask: <SiFlask className="text-white" />,
  SQLite: <SiSqlite className="text-blue-400" />,
  DRF: <FaCode className="text-orange-400" />,
};

const stackColors = [
  'tech-badge-cyan', 'tech-badge-purple', 'tech-badge-blue',
  'tech-badge-cyan', 'tech-badge-purple', 'tech-badge-blue',
  'tech-badge-cyan', 'tech-badge-purple',
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const webStack = [
  { name: 'React', icon: <FaReact className="text-cyan-400 text-2xl" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white text-2xl" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-500 text-2xl" /> },
  { name: 'Django', icon: <SiDjango className="text-green-500 text-2xl" /> },
  { name: 'DRF', icon: <FaCode className="text-orange-400 text-2xl" /> },
  { name: 'Flask', icon: <SiFlask className="text-white text-2xl" /> },
  { name: 'SQLite', icon: <SiSqlite className="text-blue-400 text-2xl" /> },
  { name: 'Python', icon: <SiPython className="text-yellow-400 text-2xl" /> },
];

export default function WebDevelopment() {
  const [webProjects, setWebProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects('web');
      setWebProjects(data || []);
    }
    loadProjects();
  }, []);

  return (
    <section id="web-development" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(0,229,255,0.05)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

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
            //&nbsp;03. FULL-STACK ENGINEERING
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Web Development
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-8" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Crafting modern, performant full-stack web applications using React & Next.js on the
            frontend and Django + DRF on the backend. Focused on clean architecture, intuitive UI
            and data-driven features.
          </p>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {webStack.map(({ name, icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="glass-card border border-white/8 px-5 py-3 flex items-center gap-2.5 cursor-default transition-all duration-200 hover:border-cyan-500/30"
            >
              {icon}
              <span className="text-sm text-gray-300 font-medium">{name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid md:grid-cols-2 gap-8 mb-10"
        >
          {webProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="glass-card-hover border group overflow-hidden"
            >
              {/* Card top accent */}
              <div
                className={`h-1 bg-gradient-to-r ${project.gradient.replace('/20', '')} opacity-70`}
              />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <span className="tech-badge tech-badge-cyan flex-shrink-0">Web</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Features */}
                <ul className="space-y-1 mb-5">
                  {(project.features || []).slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="text-cyan-500 mt-0.5 flex-shrink-0">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {(project.tech_stack || []).map((t, i) => (
                    <span key={t} className={`tech-badge ${stackColors[i % stackColors.length]}`}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <FaGithub />
                    GitHub
                  </a>
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Corner accents */}
              <span className="absolute top-3 right-3 w-2 h-2 border-t border-r border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.article>
          ))}
        </motion.div>

        {/* See all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/web-projects" className="btn-outline-cyan">
            <FaExternalLinkAlt className="text-sm" />
            View All Web Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
