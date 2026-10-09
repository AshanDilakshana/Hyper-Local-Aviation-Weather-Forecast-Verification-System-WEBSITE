import type { ResearchDocument } from '../types/research';

/**
 * Single source of truth for document files.
 * Place the supplied PDFs in the public assets directory at these paths.
 */
export const PAPER_PDF_PATH = '/research-paper.pdf';
export const THESIS_PDF_PATH = '/thesis.pdf';

export const paper = {
  title:
  'AI-Based Hyper-Local Aviation Weather Forecast Verification System for Sri Lankan Monsoon Patterns',
  fileName: 'R26-IT-132-Research-Paper.pdf',
  projectId: 'R26-IT-132',
  institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
  group: 'Centre of Excellence for AI (CoEAI)',
  year: 2026,
  abstract:
  'This research presents an AI-based, hyper-local weather forecasting and verification system for Bandaranaike International Airport, Sri Lanka. Historical airport observations are used to train parameter-specific models for temperature and pressure, wind, cloud and visibility, and QNH and dew point. Predictions are verified against METAR observations and TAF forecasts, then translated into aviation-relevant indicators presented through an interactive dashboard.'
};

export const documents: ResearchDocument[] = [
{
  id: 'paper',
  kind: 'Research Paper',
  title: paper.title,
  path: PAPER_PDF_PATH,
  fileName: paper.fileName,
  summaryLabel: 'Abstract',
  summary: paper.abstract
},
{
  id: 'thesis',
  kind: 'Thesis',
  title: paper.title,
  path: THESIS_PDF_PATH,
  fileName: 'R26-IT-132-Thesis.pdf',
  summaryLabel: 'About this document',
  summary: 'The complete thesis document submitted for project R26-IT-132.'
}];