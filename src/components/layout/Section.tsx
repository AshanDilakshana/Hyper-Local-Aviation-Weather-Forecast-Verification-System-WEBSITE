import React from 'react';

interface SectionProps {
  id: string;
  labelledBy: string;
  tone?: 'white' | 'alt';
  /** First section of a standalone page: no top divider, tighter top spacing. */
  asPage?: boolean;
  children: React.ReactNode;
}

export function Section({ id, labelledBy, tone = 'white', asPage = false, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${asPage ? 'pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-20' : 'border-t border-line py-16 sm:py-20 lg:py-28'} ${tone === 'alt' ? 'bg-alt' : 'bg-white'}`}>
      
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">{children}</div>
    </section>);

}