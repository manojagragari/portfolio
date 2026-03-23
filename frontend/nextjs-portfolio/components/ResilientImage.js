'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function withRetryParam(url, marker) {
  if (!url || typeof url !== 'string') {
    return url;
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}retry=${marker}`;
}

export default function ResilientImage({
  src,
  alt = '',
  fallbackSrc = '/projects/image-unavailable.svg',
  maxRetries = 2,
  retryDelays = [700, 1500],
  onFinalError,
  onLoad,
  ...props
}) {
  const [attempt, setAttempt] = useState(0);
  const [displaySrc, setDisplaySrc] = useState(src);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const retryTimerRef = useRef(null);

  useEffect(() => {
    setAttempt(0);
    setDisplaySrc(src);
    setIsUsingFallback(false);
  }, [src]);

  useEffect(() => () => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }
  }, []);

  const handleError = () => {
    if (isUsingFallback) {
      return;
    }

    if (attempt >= maxRetries) {
      setDisplaySrc(fallbackSrc);
      setIsUsingFallback(true);
      if (typeof onFinalError === 'function') {
        onFinalError();
      }
      return;
    }

    const delay = retryDelays[attempt] ?? 4000;
    retryTimerRef.current = setTimeout(() => {
      const nextAttempt = attempt + 1;
      setAttempt(nextAttempt);
      setDisplaySrc(withRetryParam(src, `${Date.now()}-${nextAttempt}`));
    }, delay);
  };

  const handleLoad = (event) => {
    if (typeof onLoad === 'function') {
      onLoad(event);
    }
  };

  return (
    <Image
      {...props}
      src={displaySrc || src}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
