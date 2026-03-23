'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAchievements } from '../lib/api';
import Image from 'next/image';
import ScreenshotLightbox from '../components/ScreenshotLightbox';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Achievements() {
  const [achievements, setAchievements] = useState(null);
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
    async function loadAchievements() {
      const data = await getAchievements();
      setAchievements(data || []);
    }
    loadAchievements();
  }, []);

  return (
    <section id="achievements" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(0,229,255,0.05)_0%,transparent_55%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />

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
            //&nbsp;07. MILESTONES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Achievements
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {(achievements || []).map((item) => {
            const borderClass = item.border_color || item.borderColor || 'border-cyan-500/30';
            const textClass = item.text_color || item.textColor || 'text-cyan-400';
            const supportiveImages = Array.isArray(item.supportive_images) ? item.supportive_images : [];
            return (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={`glass-card border ${borderClass} p-6 transition-all duration-300 group relative overflow-hidden`}
            >
              {/* BG gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Cover image */}
                {item.cover_image && (
                  <div className="w-full h-32 mb-4 rounded overflow-hidden bg-black/20">
                    <Image
                      src={item.cover_image}
                      alt={item.title}
                      width={640}
                      height={256}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl">{item.icon}</span>
                  <span className={`text-xs font-mono ${textClass} border border-current/30 px-2 py-0.5 rounded-full opacity-70`}>
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-lg font-bold font-orbitron ${textClass} mb-2 leading-tight`}>
                  {item.title}
                </h3>

                {/* Platform */}
                <p className="text-xs font-mono text-gray-500 mb-3">
                  📍 {item.platform}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>

                {supportiveImages.length > 0 && (
                  <div className="mt-4">
                    <p className={`text-[11px] uppercase tracking-[0.18em] ${textClass} opacity-80 mb-2`}>
                      Supportive Documents ({supportiveImages.length})
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {supportiveImages.slice(0, 2).map((imageUrl, imageIndex) => (
                        <button
                          type="button"
                          key={`${item.id}-supportive-${imageIndex}`}
                          onClick={() => openLightbox(supportiveImages, imageIndex, `${item.title} Supportive Documents`)}
                          className="relative h-20 overflow-hidden rounded-md border border-white/15 bg-white/5 cursor-zoom-in"
                          aria-label={`Open supportive document ${imageIndex + 1} for ${item.title}`}
                        >
                          <Image
                            src={imageUrl}
                            alt={`${item.title} supportive document ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 45vw, 180px"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reference link */}
                {item.reference_url && (
                  <a
                    href={item.reference_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 mt-4 text-xs border border-current/30 px-2.5 py-1 rounded-full ${item.text_color || item.textColor || 'text-cyan-400'} hover:opacity-80 transition-opacity`}
                  >
                    View Reference ↗
                  </a>
                )}
              </div>

              {/* Corner accents */}
              <span className={`absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 ${borderClass} opacity-50`} />
              <span className={`absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 ${borderClass} opacity-50`} />
            </motion.div>
            );
          })}
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
