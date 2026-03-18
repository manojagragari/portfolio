'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const socials = [
  { icon: FaGithub, href: 'https://github.com/manojagragari', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/manojagrahari', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com/manojagrahari72', label: 'Instagram' },
  { icon: FiMail, href: 'mailto:manojagrahari7521@gmail.com', label: 'Email' },
];

const footerLinks = [
  { label: 'Web Projects', href: '/web-projects' },
  { label: 'Data Science', href: '/data-science-projects' },
  { label: 'Android Apps', href: '/android-projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative portfolio-surface border-t border-white/5 py-12 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <Link href="/" className="group flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-8 h-8 rounded-lg border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center">
                <span className="text-xs font-black font-orbitron text-cyan-400">MA</span>
              </div>
              <span className="font-orbitron font-bold text-white text-sm tracking-wider group-hover:text-cyan-400 transition-colors">
                Manoj<span className="text-cyan-400">.</span>
              </span>
            </Link>
            <p className="text-gray-600 text-xs font-mono">
              Data Science · Web Dev · Android
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map(({ label, href }) => (
              href.startsWith('#') ? (
                <a
                  key={label}
                  href={href}
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  {label}
                </Link>
              )
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-gray-600 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              >
                <Icon className="text-base" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
