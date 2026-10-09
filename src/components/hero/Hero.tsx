import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { heroFacts, project } from '../../data/project';
import { buttonStyles } from '../../utils/styles';
import { HeroIllustration } from './HeroIllustration';

export function Hero() {
  return (
    <section id="overview" aria-labelledby="hero-title" className="bg-white">
      <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-12 sm:gap-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex rounded-md bg-brand-soft px-3 py-1.5 text-[13px] font-semibold tracking-wide text-brand-ink">
            {project.heroLabel}
          </p>
          <h1 id="hero-title" className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:mt-6 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            {project.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{project.heroDescription}</p>

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {heroFacts.map((f) =>
            <li key={f} className="flex items-center gap-2 text-[15px] font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand" aria-hidden="true">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} />
                </span>
                {f}
              </li>
            )}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#research" className={buttonStyles.primary}>
              Explore Research
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link to="/documents" className={buttonStyles.secondary}>
              View Research Paper
            </Link>
          </div>
        </div>

        <HeroIllustration />
      </div>
    </section>);

}