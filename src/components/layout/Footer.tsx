import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../data/navigation';
import { project } from '../../data/project';
import { teamMembers } from '../../data/team';
import { BrandMark } from './BrandMark';

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2.5">
            <BrandMark />
            <span className="whitespace-nowrap text-[13px] font-bold tracking-[0.08em] text-ink">AVIATION WEATHER AI</span>
          </div>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">{project.officialTitle}</p>
          <p className="mt-4 text-sm text-muted">
            <span className="font-mono text-ink">{project.projectId}</span> · {project.group} · {project.institutionShort}
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-ink">Pages</h2>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) =>
            <li key={item.to}>
                <Link to={item.to} className="text-[15px] text-muted transition-colors duration-150 ease-out hover:text-ink">
                  {item.label}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="text-sm font-semibold text-ink">Research team</h2>
          <ul className="mt-4 space-y-2.5">
            {teamMembers.map((m) =>
            <li key={m.id} className="flex items-baseline justify-between gap-4 text-[15px]">
                <span className="text-ink">{m.name}</span>
                <span className="font-mono text-sm text-muted">{m.studentId}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-line bg-alt">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-4 py-4 text-sm text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {project.year} {project.institution}
          </p>
          <p>No live weather data is displayed on this site.</p>
        </div>
      </div>
    </footer>);

}