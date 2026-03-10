'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGithub } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Web Dev', href: '/web-projects' },
  { label: 'Data Science', href: '/data-science-projects' },
  { label: 'Android', href: '/android-projects' },
];

const sectionLinks = [
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section on home page
  useEffect(() => {
    if (pathname !== '/') return;
    const sectionIds = [
      'hero', 'education', 'web-development', 'data-science',
      'android-development', 'skills', 'achievements', 'certifications',
      'hobbies', 'contact',
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg border border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center transition-all duration-300 group-hover:shadow-glow-cyan group-hover:border-cyan-400">
            <span className="text-sm font-black font-orbitron text-cyan-400">MA</span>
          </div>
          <span className="hidden sm:block font-orbitron text-sm font-bold text-white tracking-wider group-hover:text-cyan-400 transition-colors">
            Manoj<span className="text-cyan-400">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 font-inter ${
                isActive(href)
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
              {isActive(href) && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                />
              )}
            </Link>
          ))}
          <div className="w-px h-5 bg-white/10 mx-2" />
          {sectionLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="https://github.com/manojagragari"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 w-9 h-9 rounded-lg border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-200 hover:bg-cyan-500/10"
            aria-label="GitHub"
          >
            <FaGithub className="text-lg" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(href)
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-1" />
              {sectionLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
