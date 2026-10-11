import React, { useState } from 'react';
import { DocumentArchitectureDiagram } from '../components/documents/DocumentArchitectureDiagram';
import { DocumentModal } from '../components/documents/DocumentModal';
import { Section } from '../components/layout/Section';
import { SectionHeading } from '../components/SectionHeading';
import { documents } from '../data/paper';
import type { ResearchDocument } from '../types/research';

export function Documents() {
  const [modalDoc, setModalDoc] = useState<ResearchDocument | null>(null);

  const handleSelectDoc = (doc: ResearchDocument) => {
    setModalDoc(doc);
  };

  return (
    <Section id="documents" labelledBy="documents-heading" asPage>
      <SectionHeading
        as="h1"
        id="documents-heading"
        label="Research Documentation & Downloads"
        title="Research Paper, TAF Specifications & Theses"
        intro="Explore the interactive research architecture map below. Click on any node to view document details, inspect specifications, and download the authentic academic PDF."
      />

      {/* ── INTERACTIVE ARCHITECTURE & DEPENDENCY MAP ── */}
      <div className="mt-10">
        <DocumentArchitectureDiagram 
          documents={documents} 
          onSelectDoc={handleSelectDoc} 
        />
      </div>

      {/* ── POPUP MODAL (Opens on node click) ── */}
      <DocumentModal 
        doc={modalDoc} 
        onClose={() => setModalDoc(null)} 
      />
    </Section>
  );
}