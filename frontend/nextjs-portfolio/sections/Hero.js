'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiDownload, FiMail, FiArrowDown } from 'react-icons/fi';
import { getProfile } from '../lib/api';

const ROLE_TAGS = ['Data Science', 'Python Full-Stack', 'Android Development'];

function RoleTags() {
  return (
    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
      {ROLE_TAGS.map((role) => (
        <span
          key={role}
          className="rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-1 text-xs md:text-sm font-medium text-cyan-200"
        >
          {role}
        </span>
      ))}
    </div>
  );
}

function OrbitRings() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Ring 1 – slow outer */}
      <motion.div
        className="absolute rounded-full border border-cyan-400/20"
        style={{ inset: '-24px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.9)]" />
      </motion.div>
      {/* Ring 2 – medium counter-clockwise */}
      <motion.div
        className="absolute rounded-full border border-purple-500/20"
        style={{ inset: '-52px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.9)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.9)]" />
      </motion.div>
      {/* Ring 3 – large slow */}
      <motion.div
        className="absolute rounded-full border border-blue-500/15"
        style={{ inset: '-84px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then((data) => setProfile(data));
  }, []);

  const profileImageSrc = profile?.profile_image || '/profile.jpg';
  const socialLinks = [
    { icon: FaGithub, href: profile?.github_url || 'https://github.com/manojagrahari', label: 'GitHub' },
    { icon: FaLinkedin, href: profile?.linkedin_url || 'https://www.linkedin.com/in/manojagrahari', label: 'LinkedIn' },
    { icon: FaInstagram, href: profile?.instagram_url || 'https://instagram.com/manojagrahari72', label: 'Instagram' },
    { icon: FiMail, href: `mailto:${profile?.email || 'manojagrahari7521@gmail.com'}`, label: 'Email' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-60" />
      {/* Radial glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,229,255,0.07)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(168,85,247,0.07)_0%,transparent_55%)]" />
      {/* Bottom divider glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
        {/* ── LEFT ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Greeting line */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-cyan-400/70 font-mono text-xs tracking-widest uppercase mb-4"
          >
            &gt;_ Hello, World! I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black font-orbitron leading-tight mb-4"
          >
            <span className="gradient-text-white-cyan">Manoj</span>
            <br />
            <span className="text-white">Agrahari</span>
          </motion.h1>

          {/* Role tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-6"
          >
            <RoleTags />
            <p className="mt-3 text-sm md:text-base text-gray-300">
              I design and build practical products across AI, web, and mobile.
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-gray-400 text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            B.Tech CSE student at Lovely Professional University. I enjoy solving real
            problems with clean engineering and thoughtful product design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
          >
            <Link href="#web-development" className="btn-primary">
              View Projects
            </Link>
            <Link href="#contact" className="btn-outline-cyan">
              Contact Me
            </Link>
            <a href="/resume.pdf" download className="btn-outline-purple">
              <FiDownload />
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex gap-3 justify-center lg:justify-start"
          >
            {[
              ...socialLinks,
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-gray-500 hover:text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-glow-cyan"
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT ── Profile image with orbit rings */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex-shrink-0 relative"
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <OrbitRings />

            {/* Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_40px_rgba(0,229,255,0.15)]">
              <img
                src={profileImageSrc}
                alt="Manoj Agrahari"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }
                }}
              />
              {/* Fallback initials */}
              <div className="w-full h-full bg-gradient-to-br from-cyan-900/60 to-purple-900/60 items-center justify-center hidden absolute inset-0">
                <span className="text-7xl font-black font-orbitron gradient-text-cyan-purple">MA</span>
              </div>
            </div>

            {/* Glow beneath image */}
            <div className="absolute inset-x-12 -bottom-6 h-10 bg-cyan-500/15 blur-2xl rounded-full" />
          </div>

          {/* Floating tech tags */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -right-6 glass-card px-3 py-1.5 text-cyan-400 text-xs font-mono border border-cyan-500/30"
          >
            {'<React />'}
          </motion.div>
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-3 -left-6 glass-card px-3 py-1.5 text-purple-400 text-xs font-mono border border-purple-500/30"
          >
            {'{ Django }'}
          </motion.div>
          <motion.div
            animate={{ y: [-4, 6, -4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 -right-10 -translate-y-1/2 glass-card px-3 py-1.5 text-blue-400 text-xs font-mono border border-blue-500/30"
          >
            {'# Python'}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <FiArrowDown className="text-lg text-cyan-500/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
