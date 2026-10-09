import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, InfoIcon } from 'lucide-react';
import { methodPrinciples, modelFamilies } from '../../data/models';
import { focusRing } from '../../utils/styles';
import { Section } from '../layout/Section';
import { SectionHeading } from '../SectionHeading';
import { ModelBlock } from './ModelBlock';

export function ModelsSection({ asPage = false }: {asPage?: boolean;}) {
  const [showPrinciples, setShowPrinciples] = useState(false);

  return (
    <Section id="methodology" labelledBy="methodology-heading" asPage={asPage}>
      <SectionHeading
        as={asPage ? 'h1' : 'h2'}
        id="methodology-heading"
        label="Methodology"
        title="Choosing the Right Model for Each Weather Parameter"
        intro="Each weather parameter behaves differently, so each research component uses models suited to it." />
      

      <p className="mt-6 flex max-w-3xl items-start gap-2.5 text-[15px] text-muted">
        <InfoIcon className="mt-0.5 h-4 w-4 flex-none text-brand-ink" aria-hidden="true" />
        This section explains methods only. Measured performance is reported separately under Reported Research Results.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {modelFamilies.map((f) =>
        <ModelBlock key={f.id} family={f} />
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-alt">
        <button
          type="button"
          onClick={() => setShowPrinciples((s) => !s)}
          aria-expanded={showPrinciples}
          aria-controls="method-principles"
          className={`flex w-full items-center justify-between gap-4 rounded-2xl px-7 py-5 text-left ${focusRing}`}>
          
          <span>
            <span className="block text-lg font-semibold text-ink">Technical principles applied across all models</span>
            <span className="mt-0.5 block text-[15px] text-muted">Feature engineering, data splitting and timestamp alignment.</span>
          </span>
          <ChevronDownIcon className={`h-5 w-5 flex-none text-ink transition-transform duration-200 ease-out ${showPrinciples ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
          {showPrinciples &&
          <motion.div
            id="method-principles"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden">
            
              <dl className="grid gap-x-10 gap-y-6 border-t border-line px-7 py-7 md:grid-cols-2">
                {methodPrinciples.map((p) =>
              <div key={p.title}>
                    <dt className="text-base font-semibold text-ink">{p.title}</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-muted">{p.body}</dd>
                  </div>
              )}
              </dl>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </Section>);

}