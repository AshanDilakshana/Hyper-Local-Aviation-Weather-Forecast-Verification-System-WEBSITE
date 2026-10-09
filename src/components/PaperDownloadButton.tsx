import React from 'react';
import { Link } from 'react-router-dom';
import { DownloadIcon } from 'lucide-react';
import { PAPER_PDF_PATH, paper } from '../data/paper';
import { usePdfAvailability } from '../hooks/usePdfAvailability';
import { buttonStyles, type ButtonVariant } from '../utils/styles';

interface PaperDownloadButtonProps {
  variant?: ButtonVariant;
  label?: string;
  missingLabel?: string;
  className?: string;
  showIcon?: boolean;
}

export function PaperDownloadButton({
  variant = 'primary',
  label = 'Download Research Paper',
  missingLabel = 'View Documents',
  className = '',
  showIcon = true
}: PaperDownloadButtonProps) {
  const { status } = usePdfAvailability(PAPER_PDF_PATH);

  if (status === 'available') {
    return (
      <a href={PAPER_PDF_PATH} download={paper.fileName} className={`${buttonStyles[variant]} ${className}`}>
        {showIcon && <DownloadIcon className="h-4 w-4" aria-hidden="true" />}
        {label}
      </a>);

  }

  return (
    <Link
      to="/documents"
      className={`${buttonStyles[variant]} ${className}`}
      title={status === 'checking' ? 'Checking for the paper file' : 'The PDF has not been uploaded yet'}>
      
      {status === 'checking' ? label : missingLabel}
    </Link>);

}