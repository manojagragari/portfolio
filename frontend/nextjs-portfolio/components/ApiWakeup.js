'use client';

import { useEffect, useRef } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ApiWakeup() {
  const lastPingRef = useRef(0);

  useEffect(() => {
    const ping = async () => {
      const now = Date.now();
      // Avoid excessive pings if multiple resume events fire together.
      if (now - lastPingRef.current < 20000) {
        return;
      }
      lastPingRef.current = now;

      try {
        await fetch(`${API_BASE}/`, {
          method: 'GET',
          cache: 'no-store',
          keepalive: true,
        });
      } catch {
        // Silent: wake-up ping is best-effort only.
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        ping();
      }
    };

    const onFocus = () => {
      ping();
    };

    const onOnline = () => {
      ping();
    };

    // Initial warm-up when app mounts.
    ping();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onFocus);
    window.addEventListener('online', onOnline);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('online', onOnline);
    };
  }, []);

  return null;
}
