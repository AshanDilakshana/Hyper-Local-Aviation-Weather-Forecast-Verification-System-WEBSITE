import React from 'react';

interface SectionHeadingProps {
  id: string;
  label: string;
  title: string;
  intro: string;
  as?: 'h1' | 'h2';
  children?: React.ReactNode;
}

export function SectionHeading({ id, label, title, intro, as = 'h2', children }: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
          <span className="h-2 w-2 rounded-sm bg-brand" aria-hidden="true" />
          {label}
        </p>
        <Heading
          id={id}
          className={`mt-3 font-semibold tracking-tight text-ink ${as === 'h1' ? 'text-4xl lg:text-[2.75rem] lg:leading-tight' : 'text-3xl lg:text-4xl'}`}>
          
          {title}
        </Heading>
        <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
      </div>
      {children}
    </div>);

}