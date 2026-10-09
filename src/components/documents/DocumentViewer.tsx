import React from 'react';
import { DownloadIcon, ExternalLinkIcon, FileWarningIcon, RefreshCwIcon } from 'lucide-react';
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
  const available = status === 'available';

  return (
    <article className="grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-12" aria-label={doc.kind}>
      <div className="p-5 sm:p-8 lg:p-10 lg:col-span-5">
        <p className="inline-flex rounded-md bg-brand-soft px-2.5 py-1 text-sm font-semibold text-brand-ink">{doc.kind}</p>
        <h2 className="mt-5 text-2xl font-semibold leading-snug text-ink">{doc.title}</h2>
        <p className="mt-3 text-[15px] text-muted">
          Project ID <span className="font-mono text-ink">{paper.projectId}</span> · {paper.institution}
        </p>

        <h3 className="mt-8 text-sm font-semibold text-ink">Authors</h3>
        <ul className="mt-2 space-y-1.5">
          {teamMembers.map((m) =>
          <li key={m.id} className="flex justify-between gap-4 text-[15px]">
              <span className="text-ink">{m.name}</span>
              <span className="font-mono text-sm text-muted">{m.studentId}</span>
            </li>
          )}
        </ul>

        <h3 className="mt-8 text-sm font-semibold text-ink">{doc.summaryLabel}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{doc.summary}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {available ?
          <>
              <a href={doc.path} download={doc.fileName} className={buttonStyles.primary}>
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                Download Full PDF
              </a>
              <a href={doc.path} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
                <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                Open {doc.kind}
              </a>
            </> :

          <>
              <button type="button" disabled className={`${buttonStyles.primary} cursor-not-allowed opacity-50`}>
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                Download Full PDF
              </button>
              <button type="button" disabled className={`${buttonStyles.secondary} cursor-not-allowed opacity-50`}>
                <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                Open {doc.kind}
              </button>
            </>
          }
        </div>
        {status === 'missing' &&
        <p className="mt-3 text-sm text-muted">
            Available once the PDF is published at <code className="font-mono text-ink">{doc.path}</code>.
          </p>
        }
      </div>

      <div className="flex min-h-[520px] flex-col border-t border-line bg-alt lg:col-span-7 lg:min-h-[680px] lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="font-mono text-sm text-muted">{doc.fileName}</span>
          <span className="text-sm text-muted">{status === 'checking' ? 'Checking…' : available ? 'Preview' : 'Not found'}</span>
        </div>
        {status === 'checking' && <div className="flex-1 animate-pulse bg-line/40" aria-busy="true" />}
        {available &&
        <object data={doc.path} type="application/pdf" className="w-full flex-1" aria-label={`${doc.kind} PDF preview`}>
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <p className="text-[15px] text-muted">Your browser cannot display PDFs inline.</p>
              <a href={doc.path} target="_blank" rel="noopener noreferrer" className={`${buttonStyles.secondary} mt-4`}>
                Open the PDF in a new tab
              </a>
            </div>
          </object>
        }
        {status === 'missing' &&
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-ink">
              <FileWarningIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-4 text-lg font-semibold text-ink">The {doc.kind.toLowerCase()} PDF has not been published yet</p>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
              Place the final file in the public folder as <code className="font-mono text-ink">{doc.path.slice(1)}</code>. Preview and download activate
              automatically.
            </p>
            <button type="button" onClick={recheck} className={`${buttonStyles.secondary} mt-6`}>
              <RefreshCwIcon className="h-4 w-4" aria-hidden="true" />
              Check again
            </button>
          </div>
        }
      </div>
    </article>);

}