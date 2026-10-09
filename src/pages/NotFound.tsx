import React from 'react';
import { Link } from 'react-router-dom';
import { buttonStyles } from '../utils/styles';

export function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-start px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <p className="font-mono text-sm text-brand-ink">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-ink">This page does not exist</h1>
      <p className="mt-3 text-lg text-muted">The page you requested could not be found.</p>
      <Link to="/" className={`${buttonStyles.primary} mt-8`}>
        Back to home
      </Link>
    </section>);

}