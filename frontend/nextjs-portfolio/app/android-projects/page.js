'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaArrowLeft, FaAndroid, FaDownload } from 'react-icons/fa';
import { SiKotlin, SiJetpackcompose, SiAndroidstudio } from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { getProjects } from '../../lib/api';
import Footer from '../../sections/Footer';

export default function AndroidProjectsPage() {
  const [androidProjects, setAndroidProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects('android');
      setAndroidProjects(data || []);
    }
    loadProjects();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Banner */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.08)_0%,transparent_65%)]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-400 transition-colors mb-8"
            >
              <FaArrowLeft /> Back to Portfolio
            </Link>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400/60 font-mono text-xs tracking-widest uppercase mb-3"
            >
              //&nbsp;MOBILE PROJECTS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black font-orbitron text-white mb-4"
            >
              Android{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Development
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-xl mx-auto text-base"
            >
              Modern Android apps built with Kotlin, Jetpack Compose & Material Design.
            </motion.p>
          </div>
        </section>

        {/* Projects */}
        <div className="max-w-5xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            {androidProjects.map((project, idx) => {
              const imageSource = project.image || project.screenshots?.[0] || null;
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
                className="glass-card border border-green-500/20 hover:border-green-500/40 group overflow-hidden transition-all duration-300"
              >
                <div className="h-1 bg-gradient-to-r from-green-500 to-teal-500 opacity-70" />
                
                {/* Project Image */}
                {imageUrl && (
                  <div className="relative w-full h-48 bg-gradient-to-b from-green-500/10 to-transparent overflow-hidden">
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
                    <h2 className="text-xl font-bold font-orbitron text-white group-hover:text-green-400 transition-colors leading-tight">
                      {project.title}
                    </h2>
                    <span className="tech-badge border border-green-500/30 text-green-400 bg-green-500/10 flex-shrink-0">
                      Android
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.longDescription}</p>

                  <div className="mb-5">
                    <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-3">Key Features</p>
                    <ul className="space-y-2">
                      {(project.features || []).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">▸</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.tech_stack || []).map((t) => (
                      <span key={t} className="tech-badge border border-green-500/30 text-green-400 bg-green-500/8">
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.screenshots?.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-3">App Screenshots</p>
                      <div className="grid grid-cols-2 gap-3">
                        {project.screenshots.map((screenshot, screenshotIndex) => (
                          <div
                            key={`${project.id}-screenshot-${screenshotIndex}`}
                            className="relative aspect-[9/16] overflow-hidden rounded-xl border border-white/10 bg-white/5"
                          >
                            <Image
                              src={screenshot}
                              alt={`${project.title} screenshot ${screenshotIndex + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 240px"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <FaGithub /> View on GitHub
                    </a>
                    {project.apk_url && (
                      <a
                        href={project.apk_url}
                        download
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <FaDownload /> Download APK
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
              );})}

            {/* Stack card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card border border-green-500/15 p-7"
            >
              <p className="text-xs font-mono text-green-400/60 tracking-widest mb-4">ANDROID TECH STACK</p>
              <div className="space-y-4">
                {[
                  { name: 'Java', icon: <DiJava className="text-red-500 text-2xl" /> },
                  { name: 'Kotlin', icon: <SiKotlin className="text-purple-500 text-2xl" /> },
                  { name: 'Android Studio', icon: <SiAndroidstudio className="text-green-500 text-2xl" /> },
                  { name: 'Jetpack Compose', icon: <SiJetpackcompose className="text-blue-500 text-2xl" /> },
                ].map(({ name, icon }) => (
                  <div key={name} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                    {icon}
                    <span className="text-sm text-gray-300">{name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/5 flex justify-center">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <FaAndroid className="text-5xl text-green-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
