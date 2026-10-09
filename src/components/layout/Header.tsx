import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { focusRing } from '../../utils/styles';
import { PaperDownloadButton } from '../PaperDownloadButton';
import { BrandMark } from './BrandMark';

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-brand focus:px-3 focus:py-1.5 focus:text-ink">
        
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className={`flex shrink-0 items-center gap-2 sm:gap-2.5 rounded-md ${focusRing}`}>
          <BrandMark />
          <span className="whitespace-nowrap text-xs font-bold tracking-[0.06em] text-ink sm:text-[13px] sm:tracking-[0.08em]">
            AVIATION WEATHER AI
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative block whitespace-nowrap px-2 py-2 text-[13px] font-medium transition-colors duration-150 ease-out xl:px-2.5 xl:text-sm ${focusRing} ${
                      isActive ? 'text-ink font-semibold' : 'text-muted hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute inset-x-2 -bottom-[13px] h-[3px] rounded-full bg-brand xl:inset-x-2.5"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <PaperDownloadButton variant="compact" showIcon={false} className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden ${focusRing}`}
          >
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-white shadow-lg lg:hidden"
          >
            <ul className="mx-auto max-w-content px-4 py-3 sm:px-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium ${focusRing} ${
                        isActive ? 'bg-brand-soft text-ink font-semibold' : 'text-muted hover:bg-alt hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`h-2 w-2 rounded-full ${isActive ? 'bg-brand' : 'bg-transparent'}`}
                          aria-hidden="true"
                        />
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mx-auto max-w-content border-t border-line px-4 py-4 sm:hidden">
              <PaperDownloadButton variant="primary" className="w-full" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>);

}