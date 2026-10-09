import React, { useRef, useState } from 'react';
import { FileTextIcon } from 'lucide-react';
import { DocumentViewer } from '../components/documents/DocumentViewer';
import { Section } from '../components/layout/Section';
import { SectionHeading } from '../components/SectionHeading';
import { documents } from '../data/paper';
import { focusRing } from '../utils/styles';
import { useScreenInit } from '../useScreenInit.js';

export function Documents() {
  const screenInit = useScreenInit() as {docId?: string;};
  const [activeId, setActiveId] = useState(screenInit.docId ?? documents[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = documents.find((d) => d.id === activeId) ?? documents[0];

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + documents.length) % documents.length;
    setActiveId(documents[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="documents" labelledBy="documents-heading" asPage>
      <SectionHeading
        as="h1"
        id="documents-heading"
        label="Documents"
        title="Research Paper and Thesis"
        intro="Open either document in your browser or download the full PDF." />
      

      <div role="tablist" aria-label="Documents" className="mt-10 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
        {documents.map((d, i) => {
          const selected = d.id === active.id;
          return (
            <button
              key={d.id}
              ref={(el) => tabRefs.current[i] = el}
              role="tab"
              id={`tab-${d.id}`}
              aria-selected={selected}
              aria-controls={`panel-${d.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(d.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors duration-150 ease-out ${focusRing} ${
              selected ? 'border-brand bg-brand-soft' : 'border-line bg-white hover:border-line-strong'}`
              }>
              
              <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ${selected ? 'bg-brand' : 'bg-alt'} text-ink`}>
                <FileTextIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-base font-semibold text-ink">{d.kind}</span>
                <span className="block font-mono text-sm text-muted">{d.fileName}</span>
              </span>
            </button>);

        })}
      </div>

      <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`} className="mt-8">
        <DocumentViewer key={active.id} doc={active} />
      </div>
    </Section>);

}