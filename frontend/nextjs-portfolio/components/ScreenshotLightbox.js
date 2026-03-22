'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import ResilientImage from './ResilientImage';

export default function ScreenshotLightbox({
  isOpen,
  images = [],
  initialIndex = 0,
  title = 'Project Screenshots',
  onClose,
}) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveIndex(Math.max(0, Math.min(initialIndex, Math.max(safeImages.length - 1, 0))));
  }, [isOpen, initialIndex, safeImages.length]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % safeImages.length);
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, safeImages.length, onClose]);

  if (!isOpen || safeImages.length === 0) {
    return null;
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % safeImages.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches?.[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) {
      return;
    }

    const endX = event.changedTouches?.[0]?.clientX ?? touchStartX;
    const deltaX = endX - touchStartX;
    const swipeThreshold = 40;

    if (deltaX <= -swipeThreshold) {
      goNext();
    } else if (deltaX >= swipeThreshold) {
      goPrev();
    }

    setTouchStartX(null);
  };

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0b0f14] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <p className="text-xs sm:text-sm text-gray-300 font-mono tracking-wide truncate pr-3">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-cyan-400/60 transition-colors flex items-center justify-center"
            aria-label="Close screenshot viewer"
          >
            <FaTimes />
          </button>
        </div>

        <div
          className="relative w-full h-[52vh] sm:h-[62vh]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ResilientImage
            src={safeImages[activeIndex]}
            alt={`${title} image ${activeIndex + 1}`}
            fill
            className="object-contain bg-black"
            sizes="100vw"
          />

          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white hover:border-cyan-400/70 transition-colors flex items-center justify-center"
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white hover:border-cyan-400/70 transition-colors flex items-center justify-center"
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            Swipe left/right on mobile or use arrow keys on desktop.
          </p>
          <p className="text-xs font-mono text-cyan-300">
            {activeIndex + 1} / {safeImages.length}
          </p>
        </div>
      </div>
    </div>
  );
}
