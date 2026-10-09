import React from 'react';
import { Hero } from '../components/hero/Hero';
import { WhyItMatters } from '../components/research/WhyItMatters';
import { WorkflowSteps } from '../components/workflow/WorkflowSteps';
import { VerificationDashboard } from '../components/dashboard/VerificationDashboard';
import { ExploreLinks } from '../components/home/ExploreLinks';

export function Home() {
  return (
    <>
      <Hero />
      <WhyItMatters />
      <WorkflowSteps />
      <VerificationDashboard />
      <ExploreLinks />
    </>);

}