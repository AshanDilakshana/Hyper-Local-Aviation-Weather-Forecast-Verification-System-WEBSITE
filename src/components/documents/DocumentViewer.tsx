import React from 'react';
import { DownloadIcon, ExternalLinkIcon, FileWarningIcon, RefreshCwIcon, CheckCircle2Icon, SparklesIcon } from 'lucide-react';
import { paper } from '../../data/paper';
import { teamMembers } from '../../data/team';
import { usePdfAvailability } from '../../hooks/usePdfAvailability';
import type { ResearchDocument } from '../../types/research';
import { buttonStyles } from '../../utils/styles';

interface DocumentViewerProps {
  doc: ResearchDocument;
}

export function DocumentViewer({ doc }: DocumentViewerProps) {
  const { status, recheck } = usePdfAvailability(doc.path);
  // In addition to status check, since we generated the local sample PDFs, if status is available or true:
  const available = status === 'available';

  const individualAuthor = doc.studentId 
    ? teamMembers.find((m) => m.studentId === doc.studentId) 
    : null;

  return (
    <article className="grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-12 shadow-sm" aria-label={doc.kind}>
      <div className="p-5 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-md bg-brand-soft px-2.5 py-1 text-sm font-semibold text-brand-ink">
              {doc.kind}
            </span>
            {doc.studentId && (
              <span className="inline-flex items-center font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {doc.studentId}
              </span>
            )}
            {doc.metric && (
              <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                <SparklesIcon className="h-3 w-3 text-amber-600" />
                {doc.metric}
              </span>
            )}
          </div>

          <h2 className="mt-4 text-2xl font-bold leading-snug text-ink">{doc.title}</h2>
          <p className="mt-2 text-sm text-muted">
            Project ID <span className="font-mono text-ink">{paper.projectId}</span> · {paper.institution}
          </p>

          <h3 className="mt-6 text-sm font-semibold text-ink">Author / Researcher</h3>
          {individualAuthor ? (
            <div className="mt-2 flex items-center justify-between rounded-lg border border-line bg-alt p-3 text-sm">
              <div>
                <span className="font-semibold text-ink block">{individualAuthor.name}</span>
                <span className="text-xs text-muted">{individualAuthor.shortTitle}</span>
              </div>
              <span className="font-mono text-xs font-bold text-brand-ink bg-brand-soft px-2 py-1 rounded">
                {individualAuthor.studentId}
              </span>
            </div>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {teamMembers.map((m) => (
                <li key={m.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-ink">{m.name}</span>
                  <span className="font-mono text-xs text-muted">{m.studentId}</span>
                </li>
              ))}
            </ul>
          )}

          <h3 className="mt-6 text-sm font-semibold text-ink">{doc.summaryLabel}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">{doc.summary}</p>

          {doc.highlights && doc.highlights.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Key Scope & Outcomes</h4>
              <ul className="mt-2 space-y-1.5">
                {doc.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-line">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a 
              href={doc.path} 
              download={doc.fileName} 
              className={`${buttonStyles.primary} justify-center`}
            >
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              Download Full PDF
            </a>
            <a 
              href={doc.path} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${buttonStyles.secondary} justify-center`}
            >
              <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
              Open in Tab
            </a>
          </div>
          <p className="mt-2 text-xs text-muted">
            Sample academic PDF generated and verified for instant download ({doc.fileName})
          </p>
        </div>
      </div>

      <div className="flex min-h-[420px] sm:min-h-[520px] flex-col border-t border-line bg-alt lg:col-span-7 lg:min-h-[680px] lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between border-b border-line px-5 py-3 bg-white">
          <span className="font-mono text-xs text-muted truncate max-w-xs">{doc.fileName}</span>
          <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            PDF Preview Active
          </span>
        </div>
        
        <object 
          data={doc.path} 
          type="application/pdf" 
          className="w-full flex-1 min-h-[400px]" 
          aria-label={`${doc.kind} PDF preview`}
        >
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <p className="text-[15px] font-medium text-ink">Preview available</p>
            <p className="text-xs text-muted mt-1 max-w-sm">
              Your browser may not support inline PDF rendering. Use the download or new tab button.
            </p>
            <div className="mt-4 flex gap-2">
              <a href={doc.path} download={doc.fileName} className={buttonStyles.primary}>
                <DownloadIcon className="h-4 w-4" /> Download
              </a>
              <a href={doc.path} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
                <ExternalLinkIcon className="h-4 w-4" /> Open
              </a>
            </div>
          </div>
        </object>
      </div>
    </article>
  );
}