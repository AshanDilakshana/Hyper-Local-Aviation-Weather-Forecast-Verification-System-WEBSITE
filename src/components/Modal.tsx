import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { focusRing } from '../utils/styles';

interface ModalProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  size?: 'lg' | 'xl';
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, eyebrow, subtitle, size = 'lg', onClose, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div
        className="fixed inset-0 bg-ink/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        onClick={onClose}
        aria-hidden="true" />
      
      <div className="pointer-events-none relative flex min-h-full items-center justify-center p-3 sm:p-6 lg:p-8">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={`pointer-events-auto flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden ${size === 'xl' ? 'max-w-6xl' : 'max-w-3xl'} rounded-2xl border border-line bg-white shadow-xl sm:max-h-[calc(100vh-3rem)]`}
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
          
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8 sm:py-5">
            <div>
              {eyebrow && <p className="font-mono text-xs sm:text-sm text-brand-ink">{eyebrow}</p>}
              <h2 id="modal-title" className="mt-1 text-xl sm:text-2xl font-semibold text-ink">
                {title}
              </h2>
              {subtitle && <p className="mt-1 text-sm sm:text-[15px] text-muted">{subtitle}</p>}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`flex h-9 w-9 sm:h-10 sm:w-10 flex-none items-center justify-center rounded-lg border border-line text-muted transition-colors duration-150 ease-out hover:text-ink ${focusRing}`}>
              
              <XIcon className="h-5 w-5" />
            </button>
          </header>
          <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">{children}</div>
        </motion.div>
      </div>
    </div>);

}