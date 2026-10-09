import React from "react";
import { AlertTriangleIcon, ArrowRightIcon, ArrowDownIcon, TargetIcon, BoxIcon } from "lucide-react";
import { researchObjectives, researchProblem, researchSequence } from "../../data/project";
import { Section } from "../layout/Section";
import { SectionHeading } from "../SectionHeading";
interface PanelProps {
  icon: BoxIcon;
  title: string;
  body: string;
  points: string[];
}
function Panel({
  icon: Icon,
  title,
  body,
  points
}: PanelProps) {
  return <article className="flex flex-col rounded-2xl border border-line bg-white p-8 lg:p-10">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-ink">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-6 text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-[17px] leading-relaxed text-muted">{body}</p>
      <ul className="mt-6 space-y-3 border-t border-line pt-6">
        {points.map((p) => <li key={p} className="flex gap-3 text-base leading-relaxed text-ink">
            <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-brand" aria-hidden="true" />
            {p}
          </li>)}
      </ul>
    </article>;
}
export function WhyItMatters() {
  return <Section id="research" labelledBy="research-heading" tone="alt">
      <SectionHeading id="research-heading" label="Research" title="Why This Research Matters" intro="Airport weather can change faster than regional forecasts capture. This research builds and verifies forecasts for one airport." />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Panel icon={AlertTriangleIcon} {...researchProblem} />
        <Panel icon={TargetIcon} {...researchObjectives} />
      </div>

      <ol className="mt-12 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center" aria-label="Research sequence">
        {researchSequence.map((s, i) => <React.Fragment key={s.label}>
            <li className="rounded-xl border border-line bg-white px-5 py-4 text-center">
              <p className="text-sm font-bold tracking-[0.08em] text-ink">{s.label.toUpperCase()}</p>
              <p className="mt-1 text-sm text-muted">{s.caption}</p>
            </li>
            {i < researchSequence.length - 1 && <li aria-hidden="true" className="flex justify-center">
                <ArrowRightIcon className="hidden h-5 w-5 text-brand-ink lg:block" />
                <ArrowDownIcon className="h-5 w-5 text-brand-ink lg:hidden" />
              </li>}
          </React.Fragment>)}
      </ol>
    </Section>;
}