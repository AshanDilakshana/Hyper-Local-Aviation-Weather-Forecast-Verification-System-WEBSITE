import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Maximize2Icon, RotateCcwIcon } from 'lucide-react';
import { buttonStyles } from '../../utils/styles';
import { Section } from '../layout/Section';
import { SectionHeading } from '../SectionHeading';
import { Modal } from '../Modal';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { useScreenInit } from '../../useScreenInit.js';

export function ArchitectureSection({ asPage = false }: {asPage?: boolean;}) {
  const screenInit = useScreenInit() as {archFull?: boolean;};
  const [full, setFull] = useState(screenInit.archFull ?? false);

  return (
    <Section id="architecture" labelledBy="architecture-heading" asPage={asPage}>
      <SectionHeading
        as={asPage ? 'h1' : 'h2'}
        id="architecture-heading"
        label="Architecture"
        title="From Weather Data to Verified Forecasts"
        intro="Five layers move data from airport sources to the people who use the forecasts.">
        
        <button type="button" onClick={() => setFull(true)} className={`${buttonStyles.secondary} self-start lg:self-auto`}>
          <Maximize2Icon className="h-4 w-4" aria-hidden="true" />
          View Full Diagram
        </button>
      </SectionHeading>

      <div className="mt-12 rounded-2xl border border-line bg-alt p-5 sm:p-8">
        <ArchitectureDiagram />
        <div className="mt-6 flex items-start gap-2.5 border-t border-line pt-5 text-[15px] text-muted">
          <RotateCcwIcon className="mt-0.5 h-4 w-4 flex-none text-brand-ink" aria-hidden="true" />
          <p>
            Feedback loop: verification results inform model maintenance where implemented. The diagram describes the research implementation, not a production deployment.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {full &&
        <Modal title="System architecture" subtitle="Full diagram · scroll horizontally on small screens" size="xl" onClose={() => setFull(false)}>
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[1080px]">
                <ArchitectureDiagram wide />
              </div>
            </div>
          </Modal>
        }
      </AnimatePresence>
    </Section>);

}