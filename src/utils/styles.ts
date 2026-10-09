const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export const buttonStyles = {
  primary: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand px-5 py-3 text-[15px] font-semibold text-ink transition-colors duration-150 ease-out hover:bg-brand-hover ${focus}`,
  secondary: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-line-strong bg-white px-5 py-3 text-[15px] font-semibold text-ink transition-colors duration-150 ease-out hover:bg-alt ${focus}`,
  compact: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-ink transition-colors duration-150 ease-out hover:bg-brand-hover ${focus}`,
  text: `inline-flex items-center gap-1.5 whitespace-nowrap rounded text-[15px] font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-ink ${focus}`
};

export type ButtonVariant = keyof typeof buttonStyles;

export const focusRing = focus;