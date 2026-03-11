'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaFilter } from 'react-icons/fa';
import { getProjects } from '../../lib/api';
import Footer from '../../sections/Footer';

const allTech = ['All', 'Python', 'Django', 'DRF', 'React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'Matplotlib', 'Seaborn'];

const stackColors = ['tech-badge-cyan', 'tech-badge-purple', 'tech-badge-blue'];

export default function WebProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [webProjects, setWebProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects('web');
      setWebProjects(data || []);
    }
    loadProjects();
  }, []);

  const filtered =
    filter === 'All'
      ? webProjects
      : webProjects.filter((p) => (p.tech_stack || []).includes(filter));

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Hero banner */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.08)_0%,transparent_65%)]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors mb-8"
            >
              <FaArrowLeft /> Back to Portfolio
            </Link>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-cyan-400/60 font-mono text-xs tracking-widest uppercase mb-3"
            >
              //&nbsp;FULL-STACK PROJECTS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black font-orbitron text-white mb-4"
            >
              Web <span className="gradient-text-cyan-purple">Development</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-xl mx-auto text-base"
            >
              Full-stack web applications built with React, Next.js, Django & DRF.
            </motion.p>
          </div>
        </section>

        {/* Filter bar */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <FaFilter className="text-gray-600 text-sm" />
            {allTech.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all duration-200 ${
                  filter === tech
                    ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-400'
                    : 'border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300 bg-transparent'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-600 font-mono">
              No projects found for &quot;{filter}&quot;
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filtered.map((project, idx) => {
                const imageUrl = project.image
                  ? (project.image.startsWith('http') ? project.image : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${project.image}`)
                  : null;

                return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass-card-hover border group overflow-hidden"
                >
                  <div className={`h-1 bg-gradient-to-r ${project.gradient.replace('/20', '')} opacity-70`} />
                  
                  {/* Project Image */}
                  {imageUrl && (
                    <div className="relative w-full h-48 bg-gradient-to-b from-cyan-500/10 to-transparent overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h2 className="text-xl font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors leading-tight">
                        {project.title}
                      </h2>
                      <span className="tech-badge tech-badge-cyan flex-shrink-0">Web</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                      {project.longDescription}
                    </p>

                    {/* Features */}
                    <div className="mb-5">
                      <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-3">Key Features</p>
                      <ul className="grid grid-cols-1 gap-1.5">
                        {(project.features || []).map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-cyan-500 mt-0.5 flex-shrink-0">▸</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.tech_stack || []).map((t, i) => (
                        <span key={t} className={`tech-badge ${stackColors[i % stackColors.length]}`}>{t}</span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <FaGithub /> View on GitHub
                      </a>
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
