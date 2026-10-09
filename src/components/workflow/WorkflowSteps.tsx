import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { workflowSteps } from '../../data/workflow';
import { Section } from '../layout/Section';
import { SectionHeading } from '../SectionHeading';

export function WorkflowSteps() {
  return (
    <Section id="workflow" labelledBy="workflow-heading">
      <SectionHeading
        id="workflow-heading"
        label="Workflow"
        title="How the System Works"
        intro="Six stages take raw airport observations to verified forecasts and clear aviation information." />
      

      <ol className="mt-14 grid md:grid-cols-3 md:gap-x-8 md:gap-y-12 xl:grid-cols-6 xl:gap-x-5">
        {workflowSteps.map((step, i) => {
          const Icon = step.icon;
          const last = i === workflowSteps.length - 1;
          return (
            <li key={step.id} className="relative flex gap-5 pb-10 last:pb-0 md:block md:pb-0">
              {!last && <span className="absolute left-[21px] top-14 bottom-2 w-px bg-line-strong md:hidden" aria-hidden="true" />}
              {!last &&
              <span className="pointer-events-none absolute left-[3.75rem] right-[-0.85rem] top-[22px] hidden items-center xl:flex" aria-hidden="true">
                  <span className="h-px flex-1 bg-line-strong" />
                  <ChevronRightIcon className="-ml-1.5 h-4 w-4 text-brand-ink" />
                </span>
              }
              <div className="relative h-11 w-11 flex-none md:mb-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-ink">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>);

        })}
      </ol>
    </Section>);

}