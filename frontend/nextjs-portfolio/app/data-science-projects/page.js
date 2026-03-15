'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaArrowLeft, FaFilter } from 'react-icons/fa';
import { BsBarChartFill } from 'react-icons/bs';
import {
  SiPython, SiPandas, SiNumpy, SiJupyter,
} from 'react-icons/si';
import { getProjects } from '../../lib/api';
import Footer from '../../sections/Footer';

const allTech = ['All', 'Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI', 'Jupyter Notebook'];

const techBadges = ['tech-badge-purple', 'tech-badge-blue', 'tech-badge-cyan'];

export default function DataSciencePage() {
  const [filter, setFilter] = useState('All');
  const [dsProjects, setDsProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects('data_science');
      setDsProjects(data || []);
    }
    loadProjects();
  }, []);

  const filtered =
    filter === 'All'
      ? dsProjects
      : dsProjects.filter((p) => (p.tech_stack || []).includes(filter));

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Banner */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(168,85,247,0.08)_0%,transparent_65%)]" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-400 transition-colors mb-8"
            >
              <FaArrowLeft /> Back to Portfolio
            </Link>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-purple-400/60 font-mono text-xs tracking-widest uppercase mb-3"
            >
              //&nbsp;DATA & ML PROJECTS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black font-orbitron text-white mb-4"
            >
              Data <span className="gradient-text-cyan-purple">Science</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-xl mx-auto text-base"
            >
              Exploratory analysis, visualisations and dashboards with Python&apos;s data science stack.
            </motion.p>
          </div>
        </section>

        {/* Filter */}
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <FaFilter className="text-gray-600 text-sm" />
            {allTech.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all duration-200 ${
                  filter === tech
                    ? 'bg-purple-500/20 border-purple-500/60 text-purple-400'
                    : 'border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300 bg-transparent'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="max-w-6xl mx-auto px-6 pb-24">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-600 font-mono">
              No projects found for &quot;{filter}&quot;
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {filtered.map((project, idx) => {
                const imageSource = project.cover_image || project.image || null;
                const imageFitClass = project.image_fit === 'contain'
                  ? 'object-contain p-2 bg-black/30'
                  : 'object-cover group-hover:scale-105';
                const imageUrl = imageSource
                  ? (imageSource.startsWith('http') || imageSource.startsWith('/')
                    ? imageSource
                    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${imageSource}`)
                  : null;

                return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass-card border border-purple-500/20 hover:border-purple-500/40 group overflow-hidden transition-all duration-300"
                >
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-70" />
                  
                  {/* Project Image */}
                  {imageUrl && (
                    <div className="relative w-full h-48 bg-gradient-to-b from-purple-500/10 to-transparent overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className={`${imageFitClass} transition-transform duration-300`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h2 className="text-xl font-bold font-orbitron text-white group-hover:text-purple-400 transition-colors leading-tight">
                        {project.title}
                      </h2>
                      <span className="tech-badge tech-badge-purple flex-shrink-0">Data Science</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.longDescription}</p>
                    <div className="mb-5">
                      <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-3">Key Focus Areas</p>
                      <ul className="space-y-2">
                        {(project.features || []).map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-purple-500 mt-0.5 flex-shrink-0">▸</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.tech_stack || []).map((t, i) => (
                        <span key={t} className={`tech-badge ${techBadges[i % techBadges.length]}`}>{t}</span>
                      ))}
                    </div>

                    {project.screenshots?.length > 0 && (
                      <div className="mb-6">
                        <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-3">Supportive Images</p>
                        <div className="grid grid-cols-2 gap-3">
                          {project.screenshots.map((screenshot, screenshotIndex) => (
                            <div
                              key={`${project.id}-ds-shot-${screenshotIndex}`}
                              className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/5"
                            >
                              <Image
                                src={screenshot}
                                alt={`${project.title} supportive image ${screenshotIndex + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 260px"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <FaGithub /> View on GitHub
                    </a>
                  </div>
                </motion.article>
                );
              })}

              {/* Skills chart card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card border border-purple-500/15 p-7"
              >
                <p className="text-xs font-mono text-purple-400/60 tracking-widest mb-6">PROFICIENCY OVERVIEW</p>
                <div className="space-y-4">
                  {[
                    { name: 'Python', pct: 90, icon: <SiPython className="text-yellow-400" /> },
                    { name: 'Pandas + NumPy', pct: 87, icon: <SiPandas className="text-blue-400" /> },
                    { name: 'Matplotlib + Seaborn', pct: 83, icon: <BsBarChartFill className="text-orange-400" /> },
                    { name: 'Power BI', pct: 78, icon: <BsBarChartFill className="text-yellow-500" /> },
                    { name: 'Jupyter Notebook', pct: 92, icon: <SiJupyter className="text-orange-500" /> },
                  ].map(({ name, pct, icon }) => (
                    <div key={name}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          {icon}
                          <span className="text-gray-400">{name}</span>
                        </div>
                        <span className="text-purple-400 font-mono">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
