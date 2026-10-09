import React from 'react';

export function BrandMark({ className = 'h-8 w-8' }: {className?: string;}) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#F5C542" />
      <path d="M14 25 L15.2 11 L16.8 11 L18 25 Z" fill="#FFFFFF" stroke="#202124" strokeWidth="1" strokeLinejoin="round" />
      <path d="M7 13 C 11 9.5, 21 9.5, 25 13" fill="none" stroke="#202124" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 16.5 C 12.5 14.5, 19.5 14.5, 22.5 16.5" fill="none" stroke="#202124" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
    </svg>);

}