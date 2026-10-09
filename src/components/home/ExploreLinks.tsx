import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { exploreLinks } from '../../data/navigation';
import { focusRing } from '../../utils/styles';
import { Section } from '../layout/Section';
import { SectionHeading } from '../SectionHeading';

export function ExploreLinks() {
  return (
    <Section id="explore" labelledBy="explore-heading">
      <SectionHeading
        id="explore-heading"
        label="Explore"
        title="Go deeper into the research"
        intro="Each part of the project has its own page with the full detail." />
      
      <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {exploreLinks.map((l) =>
        <li key={l.to} className="border-b border-line">
            <Link
            to={l.to}
            className={`group flex h-full items-start justify-between gap-4 py-6 pr-6 transition-colors duration-150 ease-out ${focusRing}`}>
            
              <span>
                <span className="block text-lg font-semibold text-ink">{l.label}</span>
                <span className="mt-1 block text-[15px] leading-relaxed text-muted">{l.description}</span>
              </span>
              <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line transition-colors duration-150 ease-out group-hover:border-brand group-hover:bg-brand">
                <ArrowRightIcon className="h-4 w-4 text-ink" aria-hidden="true" />
              </span>
            </Link>
          </li>
        )}
      </ul>
    </Section>);

}