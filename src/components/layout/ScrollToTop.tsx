import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}