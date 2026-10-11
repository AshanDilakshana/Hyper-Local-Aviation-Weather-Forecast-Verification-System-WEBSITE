import React, { useState } from 'react';
import { 
  DownloadIcon, 
  SparklesIcon, 
  CpuIcon, 
  DatabaseIcon, 
  BookOpenIcon, 
  AwardIcon,
  MousePointerClickIcon
} from 'lucide-react';
import type { ResearchDocument } from '../../types/research';

interface DocumentArchitectureDiagramProps {
  documents: ResearchDocument[];
  onSelectDoc: (doc: ResearchDocument) => void;
}

export function DocumentArchitectureDiagram({ documents, onSelectDoc }: DocumentArchitectureDiagramProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const getDoc = (id: string) => documents.find((d) => d.id === id);

  const tafDoc = getDoc('taf');
  const paperDoc = getDoc('paper');
  const groupThesisDoc = getDoc('thesis');
  const sankadeepaDoc = getDoc('thesis-sankadeepa');
  const ranasinghaDoc = getDoc('thesis-ranasingha');
  const jayawardhanaDoc = getDoc('thesis-jayawardhana');
  const jayathilakaDoc = getDoc('thesis-jayathilaka');

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-5 sm:p-8 shadow-sm">
      {/* Decorative background grid and warm ambient tints */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D6CFBC 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Diagram Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-ink">
            <SparklesIcon className="h-3.5 w-3.5" />
            Interactive Research Document Hierarchy
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-ink">
            Architecture & Thesis Dependency Map
          </h2>
          <p className="mt-1 text-sm text-muted">
            Click on any architecture node to open the document viewer popup and download the full academic PDF.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-ink bg-alt border border-line px-3.5 py-2 rounded-xl shadow-xs">
          <MousePointerClickIcon className="h-4 w-4 text-brand-ink animate-pulse" />
          <span>Click any node to preview & download</span>
        </div>
      </div>

      {/* Visual Interactive SVG Flow & Nodes Layout */}
      <div className="relative z-10 mt-8 space-y-7">
        
        {/* ── TOP LAYER: Operational Standards & Ground Truth Benchmark ── */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
              [Layer 01] Meteorological Standard & Ground Truth Baseline
            </span>
          </div>

          {tafDoc && (
            <div 
              onClick={() => onSelectDoc(tafDoc)}
              onMouseEnter={() => setHoveredNodeId('taf')}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`group cursor-pointer relative w-full max-w-xl p-4 sm:p-5 rounded-2xl border transition-all duration-200 bg-white ${
                hoveredNodeId === 'taf' 
                  ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20 scale-[1.01]' 
                  : 'border-line hover:border-emerald-400 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 group-hover:bg-emerald-100 transition-colors">
                    <DatabaseIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                        Operational Standard
                      </span>
                      <span className="text-xs text-muted font-mono">ICAO Annex 3</span>
                    </div>
                    <h3 className="text-base font-bold text-ink group-hover:text-emerald-800 transition-colors">
                      {tafDoc.kind} · TAF Specification & Verification Baseline
                    </h3>
                    <p className="text-xs text-muted line-clamp-1 mt-0.5">
                      Ground truth METAR observation thresholds & verification metrics for VCBI
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-100">
                    <DownloadIcon className="h-3.5 w-3.5" />
                    Download PDF
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Animated Flow Stem Down to Individual Modules */}
          <div className="flex flex-col items-center my-2">
            <div className="w-0.5 h-5 bg-gradient-to-b from-emerald-400 to-indigo-400" />
            <div className="text-[10px] font-mono text-muted bg-alt px-2.5 py-0.5 rounded-full border border-line shadow-xs">
              feeds verification data & ground truth ↓
            </div>
            <div className="w-0.5 h-5 bg-gradient-to-b from-indigo-400 to-blue-400" />
          </div>
        </div>

        {/* ── MIDDLE LAYER: 4 Individual Theses / AI Subsystems ── */}
        <div>
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-0.5 rounded-full">
              [Layer 02] Four Specialized Machine Learning Subsystems · Individual Theses
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Subsystem 1: Sankadeepa */}
            {sankadeepaDoc && (
              <div
                onClick={() => onSelectDoc(sankadeepaDoc)}
                onMouseEnter={() => setHoveredNodeId('thesis-sankadeepa')}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`group cursor-pointer relative p-4 rounded-2xl border transition-all duration-200 bg-white flex flex-col justify-between ${
                  hoveredNodeId === 'thesis-sankadeepa'
                    ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20 scale-[1.02]'
                    : 'border-line hover:border-blue-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      IT22113986
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-full border border-blue-200">
                      R² 0.84
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 group-hover:bg-blue-100">
                      <CpuIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink group-hover:text-blue-700">
                        Sankadeepa W.D.I.
                      </h4>
                      <p className="text-[11px] text-muted">Coupled Temp & Pressure</p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted line-clamp-2">
                    Hybrid RF-LSTM architecture for density altitude and thermodynamic coupling.
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted">Individual Thesis</span>
                  <span className="text-xs font-bold text-blue-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <DownloadIcon className="h-3 w-3" /> PDF
                  </span>
                </div>
              </div>
            )}

            {/* Subsystem 2: Ranasingha */}
            {ranasinghaDoc && (
              <div
                onClick={() => onSelectDoc(ranasinghaDoc)}
                onMouseEnter={() => setHoveredNodeId('thesis-ranasingha')}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`group cursor-pointer relative p-4 rounded-2xl border transition-all duration-200 bg-white flex flex-col justify-between ${
                  hoveredNodeId === 'thesis-ranasingha'
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20 scale-[1.02]'
                    : 'border-line hover:border-emerald-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      IT22269720
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full border border-emerald-200">
                      MAE &lt; 1.0kt
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-100">
                      <CpuIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink group-hover:text-emerald-700">
                        Ranasingha R.A.A.D.
                      </h4>
                      <p className="text-[11px] text-muted">Wind & Runway Vectors</p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted line-clamp-2">
                    XGBoost and Temporal Fusion Transformer for runway 04/22 crosswind calculations.
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted">Individual Thesis</span>
                  <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <DownloadIcon className="h-3 w-3" /> PDF
                  </span>
                </div>
              </div>
            )}

            {/* Subsystem 3: Jayawardhana */}
            {jayawardhanaDoc && (
              <div
                onClick={() => onSelectDoc(jayawardhanaDoc)}
                onMouseEnter={() => setHoveredNodeId('thesis-jayawardhana')}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`group cursor-pointer relative p-4 rounded-2xl border transition-all duration-200 bg-white flex flex-col justify-between ${
                  hoveredNodeId === 'thesis-jayawardhana'
                    ? 'border-purple-500 shadow-md ring-2 ring-purple-500/20 scale-[1.02]'
                    : 'border-line hover:border-purple-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                      IT22619976
                    </span>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded-full border border-purple-200">
                      78.15% Acc
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 group-hover:bg-purple-100">
                      <CpuIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink group-hover:text-purple-700">
                        Jayawardhana H.M.
                      </h4>
                      <p className="text-[11px] text-muted">Cloud & Visibility</p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted line-clamp-2">
                    Tree ensembles and XGBoost for sudden fog detection and low cloud ceiling classification.
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted">Individual Thesis</span>
                  <span className="text-xs font-bold text-purple-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <DownloadIcon className="h-3 w-3" /> PDF
                  </span>
                </div>
              </div>
            )}

            {/* Subsystem 4: Jayathilaka */}
            {jayathilakaDoc && (
              <div
                onClick={() => onSelectDoc(jayathilakaDoc)}
                onMouseEnter={() => setHoveredNodeId('thesis-jayathilaka')}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`group cursor-pointer relative p-4 rounded-2xl border transition-all duration-200 bg-white flex flex-col justify-between ${
                  hoveredNodeId === 'thesis-jayathilaka'
                    ? 'border-amber-500 shadow-md ring-2 ring-amber-500/20 scale-[1.02]'
                    : 'border-line hover:border-amber-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      IT22069504
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-200">
                      MAE 0.58°C
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 group-hover:bg-amber-100">
                      <CpuIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink group-hover:text-amber-800">
                        Jayathilaka P.K.
                      </h4>
                      <p className="text-[11px] text-muted">Humidity & Dew Point</p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted line-clamp-2">
                    LightGBM model for dew point, QNH altimeter settings, and mathematical RH derivation.
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted">Individual Thesis</span>
                  <span className="text-xs font-bold text-amber-800 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <DownloadIcon className="h-3 w-3" /> PDF
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stem Converging into Group Thesis */}
        <div className="flex flex-col items-center my-2">
          <div className="w-0.5 h-5 bg-gradient-to-b from-indigo-400 to-amber-400" />
          <div className="text-[10px] font-mono text-muted bg-alt px-2.5 py-0.5 rounded-full border border-line shadow-xs">
            synthesized into unified system architecture ↓
          </div>
          <div className="w-0.5 h-5 bg-gradient-to-b from-amber-400 to-amber-500" />
        </div>

        {/* ── CORE LAYER: Group Thesis ── */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-amber-800 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full">
              [Layer 03] Unified Multi-Model System Architecture · Group Thesis
            </span>
          </div>

          {groupThesisDoc && (
            <div 
              onClick={() => onSelectDoc(groupThesisDoc)}
              onMouseEnter={() => setHoveredNodeId('thesis')}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`group cursor-pointer relative w-full max-w-2xl p-4 sm:p-5 rounded-2xl border transition-all duration-200 bg-white ${
                hoveredNodeId === 'thesis' 
                  ? 'border-brand shadow-md ring-2 ring-brand/30 scale-[1.01]' 
                  : 'border-line hover:border-brand/70 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-soft border border-brand/50 text-brand-ink group-hover:bg-brand/30 transition-colors">
                    <BookOpenIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink bg-brand-soft border border-brand/40 px-2 py-0.5 rounded">
                        Comprehensive Group Thesis
                      </span>
                      <span className="text-xs text-muted font-mono">Project R26-IT-132</span>
                    </div>
                    <h3 className="text-base font-bold text-ink group-hover:text-brand-ink transition-colors">
                      {groupThesisDoc.title}
                    </h3>
                    <p className="text-xs text-muted line-clamp-1 mt-0.5">
                      Full end-to-end integration, real-time prediction pipeline, and operational verification dashboard
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand text-ink shadow-xs group-hover:brightness-95">
                    <DownloadIcon className="h-3.5 w-3.5" />
                    Download PDF
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Stem Converging into Research Paper */}
          <div className="flex flex-col items-center my-2">
            <div className="w-0.5 h-5 bg-gradient-to-b from-amber-400 to-sky-500" />
            <div className="text-[10px] font-mono text-muted bg-alt px-2.5 py-0.5 rounded-full border border-line shadow-xs">
              published academic research paper ↓
            </div>
            <div className="w-0.5 h-5 bg-gradient-to-b from-sky-500 to-blue-600" />
          </div>
        </div>

        {/* ── APEX LAYER: Research Paper Publication ── */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3 py-0.5 rounded-full">
              [Layer 04] Published Academic Research Paper
            </span>
          </div>

          {paperDoc && (
            <div 
              onClick={() => onSelectDoc(paperDoc)}
              onMouseEnter={() => setHoveredNodeId('paper')}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`group cursor-pointer relative w-full max-w-2xl p-5 sm:p-6 rounded-2xl border transition-all duration-200 bg-gradient-to-r from-blue-50/50 via-white to-amber-50/40 ${
                hoveredNodeId === 'paper' 
                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-500/20 scale-[1.01]' 
                  : 'border-blue-200 hover:border-blue-400 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 group-hover:bg-blue-100 transition-colors shadow-xs">
                    <AwardIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 border border-blue-300 px-2.5 py-0.5 rounded-full">
                        Official Research Paper
                      </span>
                      <span className="text-xs text-muted font-mono">SLIIT CoEAI · 2026</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-blue-800 transition-colors">
                      {paperDoc.title}
                    </h3>
                    <p className="text-xs text-muted line-clamp-1 mt-0.5">
                      Peer-reviewed publication documenting all four ML subsystems & monsoonal skill scores
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-brand text-ink shadow-sm group-hover:brightness-95 transition-all">
                    <DownloadIcon className="h-4 w-4" />
                    Download PDF
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>


    </div>
  );
}
