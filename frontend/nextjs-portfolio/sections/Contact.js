'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone,
} from 'react-icons/fa';
import { getContactMethods } from '../lib/api';
import { contact as fallbackContact } from '../lib/data';

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  email: FaEnvelope,
  phone: FaPhone,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function resolveContactHref(item) {
  const rawHref = item.href || '';
  if (rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
    return rawHref;
  }

  if (item.icon === 'email') {
    const email = (item.value || '').trim();
    return email ? `mailto:${email}` : rawHref;
  }

  if (item.icon === 'phone') {
    const phoneRaw = item.value || '';
    const sanitized = phoneRaw.replace(/[^\d+]/g, '');
    return sanitized ? `tel:${sanitized}` : rawHref;
  }

  return rawHref;
}

export default function Contact() {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    async function loadContact() {
      const data = await getContactMethods();
      setContact(data && data.length ? data : fallbackContact);
    }
    loadContact();
  }, []);

  const preferred = contact.find((item) => item.icon === 'email') || fallbackContact.find((item) => item.icon === 'email');
  const preferredHref = preferred ? resolveContactHref(preferred) : 'mailto:manojagrahari7521@gmail.com';

  return (
    <section id="contact" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.06)_0%,transparent_65%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-cyan-400/60 font-mono text-xs tracking-widest uppercase mb-3">
            //&nbsp;10. GET IN TOUCH
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Contact
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6" />
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            Have an opportunity, collaboration or just want to say hi? I&apos;m always open to connecting.
            Reach out through any of the channels below.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        >
          {contact.map((item) => {
            const Icon = iconMap[item.icon];
            const borderClass = item.border_color || item.borderColor || 'border-cyan-500/30';
            const hoverBgClass = item.hover_bg || item.hoverBg || 'hover:bg-cyan-500/20';
            const href = resolveContactHref(item);
            const isDirectLink = href.startsWith('mailto:') || href.startsWith('tel:');
            return (
              <motion.a
                key={item.id}
                href={href}
                target={isDirectLink ? undefined : '_blank'}
                rel={isDirectLink ? undefined : 'noopener noreferrer'}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`glass-card border ${borderClass} ${item.bg} ${hoverBgClass} p-5 flex items-center gap-4 transition-all duration-300 group`}
              >
                <div
                  className={`w-11 h-11 rounded-xl ${item.bg} border ${borderClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`text-xl ${item.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-mono mb-0.5">{item.label}</p>
                  <p className={`text-sm font-medium ${item.color} truncate`}>{item.value}</p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass-card border border-cyan-500/20 p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.04)_0%,transparent_70%)] pointer-events-none" />
          <p className="text-gray-400 text-sm mb-2 relative z-10">Preferred contact</p>
          <a
            href={preferredHref}
            className="text-xl font-bold font-orbitron text-cyan-400 hover:text-cyan-300 transition-colors relative z-10 text-glow-cyan"
          >
            {preferred ? preferred.value : 'manojagrahari7521@gmail.com'}
          </a>
          <p className="text-gray-600 text-xs mt-2 relative z-10 font-mono">
            Response within 24 hours
          </p>
          {/* Corner accents */}
          <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
          <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />
        </motion.div>
      </div>
    </section>
  );
}
