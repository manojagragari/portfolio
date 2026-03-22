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
  maxRetries = 4,
  retryDelays = [1200, 2500, 5000, 8000],
  onFinalError,
  onLoad,
  ...props
}) {
  const [attempt, setAttempt] = useState(0);
  const [displaySrc, setDisplaySrc] = useState(src);
  const retryTimerRef = useRef(null);

  useEffect(() => {
    setAttempt(0);
    setDisplaySrc(src);
  }, [src]);

  useEffect(() => () => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }
  }, []);

  const handleError = () => {
    if (attempt >= maxRetries) {
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
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
