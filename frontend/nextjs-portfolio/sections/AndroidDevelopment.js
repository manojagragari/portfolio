'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaAndroid, FaDownload } from 'react-icons/fa';
import { SiKotlin, SiJetpackcompose, SiAndroidstudio } from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { getProjects } from '../lib/api';
import ResilientImage from '../components/ResilientImage';

const androidStack = [
  { name: 'Java', icon: <DiJava className="text-red-500 text-2xl" /> },
  { name: 'Kotlin', icon: <SiKotlin className="text-purple-500 text-2xl" /> },
  { name: 'Android Studio', icon: <SiAndroidstudio className="text-green-500 text-2xl" /> },
  { name: 'Jetpack Compose', icon: <SiJetpackcompose className="text-blue-500 text-2xl" /> },
];

export default function AndroidDevelopment() {
  const [androidProjects, setAndroidProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects('android');
      setAndroidProjects(data || []);
    }
    loadProjects();
  }, []);

  return (
    <section id="android-development" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(16,185,129,0.05)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-green-400/60 font-mono text-xs tracking-widest uppercase mb-3">
            //&nbsp;05. MOBILE ENGINEERING
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Android Development
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mb-8" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Building modern, user-friendly Android applications using Jetpack Compose and
            Material Design principles. Focused on clean architecture, smooth UX, and
            offline-first development.
          </p>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {androidStack.map(({ name, icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="glass-card border border-white/8 px-6 py-4 flex items-center gap-3 cursor-default transition-all duration-200 hover:border-green-500/30"
            >
              {icon}
              <span className="text-sm text-gray-300 font-medium">{name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {androidProjects.map((project) => {
            const imageSource = project.cover_image || project.image || project.screenshots?.[0] || null;
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="glass-card-hover border group overflow-hidden h-full min-h-[42rem] flex flex-col"
            >
              <div className="h-1 bg-gradient-to-r from-green-500 to-teal-500 opacity-70" />
              
              {/* Project Image */}
              {imageUrl && (
                <div className="relative w-full h-48 bg-gradient-to-b from-green-500/10 to-transparent overflow-hidden">
                  <ResilientImage
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className={`${imageFitClass} transition-transform duration-300`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="p-6 flex-1 min-h-0 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-green-400 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <span className="tech-badge border border-green-500/30 text-green-400 bg-green-500/10 flex-shrink-0">
                    Android
                  </span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                  <ul className="space-y-1">
                    {(project.features || []).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {(project.tech_stack || []).map((t) => (
                      <span key={t} className="tech-badge border border-green-500/30 text-green-400 bg-green-500/8">
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.screenshots?.length > 1 && (
                    <p className="text-[11px] uppercase tracking-[0.2em] text-green-400/60">
                      {project.screenshots.length} app screenshots available
                    </p>
                  )}

                  {project.screenshots?.length > 0 && (
                    <div>
                      <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2">Supportive Images</p>
                      <div className="grid grid-cols-3 gap-2">
                        {project.screenshots.slice(0, 3).map((screenshot, screenshotIndex) => (
                          <div
                            key={`${project.id}-section-shot-${screenshotIndex}`}
                            className="relative aspect-[9/16] overflow-hidden rounded-lg border border-white/10 bg-white/5"
                          >
                            <ResilientImage
                              src={screenshot}
                              alt={`${project.title} supportive image ${screenshotIndex + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 28vw, 140px"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 mt-4 border-t border-white/10">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                  {project.apk_url && (
                    <a
                      href={project.apk_url}
                      download
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <FaDownload /> Download APK
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
            );
          })}

          {/* Android illustration card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card border border-green-500/20 p-8 flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaAndroid className="text-green-400 text-8xl drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]" />
            </motion.div>
            <div className="text-center">
              <h4 className="text-white font-bold font-orbitron mb-2">Modern Android Dev</h4>
              <p className="text-gray-500 text-sm">
                Building with Jetpack Compose for declarative, responsive UIs that delight users
                on every screen size.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {['MVVM', 'Compose UI', 'Material 3', 'Offline-First'].map((tag) => (
                <span key={tag} className="tech-badge border border-green-500/30 text-green-400 bg-green-500/10">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/android-projects"
            className="btn-outline-cyan border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400"
          >
            <FaExternalLinkAlt className="text-sm" />
            View All Android Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
