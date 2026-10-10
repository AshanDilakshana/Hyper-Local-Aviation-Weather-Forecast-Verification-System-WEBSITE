import React, { useEffect } from 'react';
import { 
  XIcon, 
  DownloadIcon, 
  ExternalLinkIcon, 
  FileTextIcon, 
  CheckCircle2Icon, 
  SparklesIcon, 
  LayersIcon,
  ShieldCheckIcon,
  UserIcon
} from 'lucide-react';
import type { ResearchDocument } from '../../types/research';

interface DocumentModalProps {
  doc: ResearchDocument | null;
  onClose: () => void;
}

export function DocumentModal({ doc, onClose }: DocumentModalProps) {
  useEffect(() => {
    if (!doc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [doc, onClose]);

  if (!doc) return null;

  const categoryBadgeColors = {
    'paper': 'bg-blue-50 text-blue-700 border-blue-200',
    'taf': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'group-thesis': 'bg-brand-soft text-brand-ink border-brand/50',
    'individual-thesis': 'bg-purple-50 text-purple-700 border-purple-200'
  };

  const badgeClass = doc.category ? categoryBadgeColors[doc.category] : 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-doc-title"
    >
      <div 
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] bg-white border border-line rounded-2xl shadow-2xl overflow-hidden text-ink animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-alt">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand-ink border border-brand/40 shadow-xs">
              <FileTextIcon className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
                  {doc.kind}
                </span>
                {doc.studentId && (
                  <span className="inline-flex items-center font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {doc.studentId}
                  </span>
                )}
                <span className="text-xs text-muted hidden sm:inline">
                  Project R26-IT-132 · VCBI
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted hover:text-ink hover:bg-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white">
          {/* Header Title Section */}
          <div>
            <h2 id="modal-doc-title" className="text-xl sm:text-2xl font-bold text-ink tracking-tight leading-snug">
              {doc.title}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <div className="flex items-center gap-1.5 font-medium text-ink">
                <UserIcon className="h-4 w-4 text-brand-ink" />
                <span>{doc.authors}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
                <span>File: {doc.fileName}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Role Banner */}
          {(doc.role || doc.metric) && (
            <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-xl bg-alt border border-line">
              {doc.role && (
                <div className="flex items-start gap-3">
                  <LayersIcon className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-muted">System Role</span>
                    <span className="text-sm font-semibold text-ink">{doc.role}</span>
                  </div>
                </div>
              )}
              {doc.metric && (
                <div className="flex items-start gap-3">
                  <SparklesIcon className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-muted">Key Performance Metric</span>
                    <span className="text-sm font-bold text-amber-800 font-mono">{doc.metric}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Abstract / Scope */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4 text-brand-ink" />
              {doc.summaryLabel}
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted bg-alt p-4 rounded-xl border border-line">
              {doc.summary}
            </p>
          </div>

          {/* Key Highlights */}
          {doc.highlights && doc.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
                Key Technical Highlights & Outcomes
              </h3>
              <ul className="mt-2.5 grid sm:grid-cols-2 gap-2.5">
                {doc.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink bg-alt p-3 rounded-xl border border-line">
                    <CheckCircle2Icon className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PDF Preview Frame */}
          <div className="rounded-xl border border-line bg-alt overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-line text-xs text-muted">
              <span className="font-mono">{doc.fileName}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                PDF Ready for Download
              </span>
            </div>
            <div className="h-64 sm:h-80 w-full bg-slate-50">
              <object 
                data={doc.path} 
                type="application/pdf" 
                className="w-full h-full"
                aria-label={`${doc.title} PDF preview`}
              >
                <div className="flex flex-col items-center justify-center h-full p-6 text-center text-muted">
                  <FileTextIcon className="h-10 w-10 text-muted mb-2 opacity-60" />
                  <p className="text-sm font-semibold text-ink">Sample PDF ready for download</p>
                  <p className="text-xs text-muted mt-1">Click the button below to download the official document.</p>
                </div>
              </object>
            </div>
          </div>
        </div>

        {/* Modal Footer with Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-line bg-alt">
          <span className="text-xs font-medium text-muted">
            {doc.fileSize ? `Format: PDF · ${doc.fileSize}` : 'Format: PDF · Ready to download'}
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={doc.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:bg-slate-100 transition-colors shadow-xs"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Open in Tab
            </a>
            <a
              href={doc.path}
              download={doc.fileName}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-ink shadow-sm hover:brightness-95 transition-all"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Full PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
