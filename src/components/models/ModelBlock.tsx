import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import type { ModelFamily } from '../../types/research';
import { focusRing } from '../../utils/styles';

interface ModelBlockProps {
  family: ModelFamily;
}

export function ModelBlock({ family }: ModelBlockProps) {
  const [open, setOpen] = useState(false);
  const Icon = family.icon;
  const rows = [
  { label: 'What the model does', value: family.what },
  { label: 'Why it suits the task', value: family.why },
  { label: 'Alternatives considered', value: family.alternatives },
  { label: 'How performance is evaluated', value: family.evaluation }];


  return (
    <article className="flex flex-col rounded-2xl border border-line bg-white p-7 lg:p-8">
      <header className="flex items-start gap-4">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-soft text-brand-ink">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-ink">{family.title}</h3>
          <p className="mt-0.5 text-sm text-muted">{family.owner}</p>
        </div>
      </header>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Models">
        {family.models.map((m) =>
        <li key={m} className="rounded-md border border-line bg-alt px-2.5 py-1 text-sm font-medium text-ink">
            {m}
          </li>
        )}
      </ul>

      <dl className="mt-6 space-y-5">
        {rows.map((r) =>
        <div key={r.label}>
            <dt className="text-sm font-semibold text-ink">{r.label}</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-muted">{r.value}</dd>
          </div>
        )}
      </dl>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`details-${family.id}`}
          className={`inline-flex items-center gap-2 rounded-md text-[15px] font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 ${focusRing}`}>
          
          {open ? 'Show less' : 'Learn more'}
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ease-out ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
          {open &&
          <motion.div
            id={`details-${family.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden">
            
              <ul className="mt-5 divide-y divide-line border-t border-line">
                {family.details.map((d) =>
              <li key={d.name} className="py-4">
                    <p className="text-[15px] font-semibold text-ink">{d.name}</p>
                    <p className="text-sm text-brand-ink">{d.type}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{d.what}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{d.relevance}</p>
                    {d.formula &&
                <code className="mt-3 block overflow-x-auto whitespace-pre rounded-lg border border-line bg-alt px-3 py-2 font-mono text-[13px] text-ink">
                        {d.formula}
                      </code>
                }
                  </li>
              )}
              </ul>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </article>);

}