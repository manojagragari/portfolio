'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import {
  SiPython, SiPandas, SiNumpy, SiJupyter,
} from 'react-icons/si';
import { BsBarChartFill } from 'react-icons/bs';
import { getProjects } from '../lib/api';
import ResilientImage from '../components/ResilientImage';
import ScreenshotLightbox from '../components/ScreenshotLightbox';

const dsStack = [
  { name: 'Python', icon: <SiPython className="text-yellow-400 text-2xl" /> },
  { name: 'Pandas', icon: <SiPandas className="text-blue-400 text-2xl" /> },
  { name: 'NumPy', icon: <SiNumpy className="text-blue-500 text-2xl" /> },
  { name: 'Matplotlib', icon: <BsBarChartFill className="text-orange-400 text-2xl" /> },
  { name: 'Seaborn', icon: <BsBarChartFill className="text-teal-400 text-2xl" /> },
  { name: 'Power BI', icon: <BsBarChartFill className="text-yellow-500 text-2xl" /> },
  { name: 'Jupyter', icon: <SiJupyter className="text-orange-500 text-2xl" /> },
];

const miniStats = [
  { label: 'Datasets Analysed', value: '15+', color: 'text-cyan-400', glow: 'shadow-glow-cyan' },
  { label: 'Visualizations', value: '50+', color: 'text-purple-400', glow: 'shadow-glow-purple' },
  { label: 'Python Projects', value: '10+', color: 'text-blue-400', glow: 'shadow-glow-blue' },
];

const SKILL_DISTRIBUTION_BUCKETS = [
  {
    name: 'Python & Data Stack',
    terms: ['python', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'jupyter notebook', 'jupyter'],
  },
  {
    name: 'BI & Analytics',
    terms: ['power bi', 'dax', 'data analytics', 'data visualization'],
  },
  {
    name: 'Web Product Engineering',
    terms: ['react', 'next.js', 'django', 'drf', 'tailwind css', 'flask', 'sqlite'],
  },
  {
    name: 'Android Engineering',
    terms: ['kotlin', 'java', 'android studio', 'jetpack compose', 'android sdk', 'material design'],
  },
];

function buildSkillDistribution(projects) {
  const techStack = projects.flatMap((project) => (
    Array.isArray(project.tech_stack)
      ? project.tech_stack.map((tech) => String(tech).toLowerCase())
      : []
  ));

  if (techStack.length === 0) {
    return SKILL_DISTRIBUTION_BUCKETS.map(({ name }) => ({ name, pct: 0 }));
  }

  const hitCounts = SKILL_DISTRIBUTION_BUCKETS.map(({ name, terms }) => {
    const hitCount = techStack.reduce((total, tech) => (
      terms.some((term) => tech.includes(term)) ? total + 1 : total
    ), 0);

    return { name, hitCount };
  });

  const maxHitCount = Math.max(...hitCounts.map((bucket) => bucket.hitCount), 1);

  return hitCounts.map(({ name, hitCount }) => ({
    name,
    pct: Math.min(100, Math.round((hitCount / maxHitCount) * 100)),
  }));
}

export default function DataScience() {
  const [dsProjects, setDsProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    initialIndex: 0,
    title: '',
  });

  const openLightbox = (images, startIndex, title) => {
    setLightboxState({
      isOpen: true,
      images,
      initialIndex: startIndex,
      title,
    });
  };

  const closeLightbox = () => {
    setLightboxState((previous) => ({ ...previous, isOpen: false }));
  };

  useEffect(() => {
    async function loadProjects() {
      const [dataScienceProjects, everyProject] = await Promise.all([
        getProjects('data_science'),
        getProjects(),
      ]);

      setDsProjects(dataScienceProjects || []);
      setAllProjects(everyProject || []);
    }
    loadProjects();
  }, []);

  const skillDistribution = useMemo(
    () => buildSkillDistribution(allProjects),
    [allProjects]
  );

  return (
    <section id="data-science" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(168,85,247,0.06)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400/60 font-mono text-xs tracking-widest uppercase mb-3">
            //&nbsp;04. ANALYTICS & ML
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Data Science
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Exploring hidden patterns in data using Python&apos;s powerful data science ecosystem.
            From raw EDA to stunning visualisations and actionable dashboards — turning numbers
            into insight.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-14"
        >
          {miniStats.map(({ label, value, color }) => (
            <div key={label} className={`glass-card border border-white/8 p-5 text-center`}>
              <div className={`text-3xl font-black font-orbitron ${color} mb-1`}>{value}</div>
              <div className="text-xs text-gray-500 font-mono">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {dsStack.map(({ name, icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="glass-card border border-white/8 px-5 py-3 flex items-center gap-2.5 cursor-default transition-all duration-200 hover:border-purple-500/30"
            >
              {icon}
              <span className="text-sm text-gray-300 font-medium">{name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
        >
          {dsProjects.map((project) => {
            const screenshots = Array.isArray(project.screenshots) ? project.screenshots : [];
            const screenshotCount = screenshots.length;
            const imageSource = project.cover_image || project.image || screenshots[0] || null;
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
              <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-70" />
              
              {/* Project Image */}
              {imageUrl && (
                <div className="relative w-full h-48 bg-gradient-to-b from-purple-500/10 to-transparent overflow-hidden">
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
                  <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-purple-400 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <span className="tech-badge tech-badge-purple flex-shrink-0">Data Science</span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                  <ul className="space-y-1">
                    {(project.features || []).slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="text-purple-500 mt-0.5 flex-shrink-0">▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {(project.tech_stack || []).map((t, i) => (
                      <span
                        key={t}
                        className={`tech-badge ${i % 2 === 0 ? 'tech-badge-purple' : 'tech-badge-blue'}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {screenshotCount > 0 && (
                    <p className="text-[11px] uppercase tracking-[0.2em] text-purple-400/70">
                      Screenshot Attached ({screenshotCount})
                    </p>
                  )}

                  {screenshotCount > 0 && (
                    <div>
                      <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2">Preview</p>
                      <div className="grid grid-cols-3 gap-2">
                        {screenshots.slice(0, 3).map((screenshot, screenshotIndex) => (
                          <button
                            type="button"
                            key={`${project.id}-ds-shot-${screenshotIndex}`}
                            onClick={() => openLightbox(screenshots, screenshotIndex, `${project.title} Screenshots`)}
                            className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-white/5 cursor-zoom-in"
                            aria-label={`Open ${project.title} screenshot ${screenshotIndex + 1}`}
                          >
                            <ResilientImage
                              src={screenshot}
                              alt={`${project.title} screenshot ${screenshotIndex + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 28vw, 140px"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 mt-4 border-t border-white/10">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.article>
            );
          })}

          {/* Animated chart card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card border border-purple-500/20 p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-mono text-purple-400/60 tracking-widest mb-2">SKILLS DISTRIBUTION</p>
              <h4 className="text-white font-bold font-orbitron text-sm mb-6">Current Project Stack Coverage</h4>
            </div>
            <div className="space-y-3">
              {skillDistribution.map(({ name, pct }) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{name}</span>
                    <span className="text-purple-400">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/data-science-projects" className="btn-outline-purple">
            <FaExternalLinkAlt className="text-sm" />
            View All Data Science Projects
          </Link>
        </motion.div>
      </div>

      <ScreenshotLightbox
        isOpen={lightboxState.isOpen}
        images={lightboxState.images}
        initialIndex={lightboxState.initialIndex}
        title={lightboxState.title}
        onClose={closeLightbox}
      />
    </section>
  );
}
