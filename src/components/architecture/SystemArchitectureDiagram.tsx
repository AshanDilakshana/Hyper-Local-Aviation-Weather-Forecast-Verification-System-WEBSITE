import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   Animated System Architecture Diagram
   Standard symbols: cylinder (DB), rectangle (process), parallelogram (I/O),
   hexagon (AI/ML model), cloud shape (external data), diamond (decision),
   arrow flows with animated dashes.
───────────────────────────────────────────────────────────────────────────── */

const COLORS = {
  dataBg: '#0f172a',      // dark navy
  layer1: '#1e3a5f',     // deep blue – data sources
  layer2: '#1a4731',     // dark green – processing
  layer3: '#3b1f5e',     // deep purple – AI models
  layer4: '#3d2200',     // dark amber – backend
  layer5: '#0d3347',     // dark teal – UI
  accent1: '#38bdf8',    // sky blue
  accent2: '#34d399',    // emerald
  accent3: '#a78bfa',    // violet
  accent4: '#fbbf24',    // amber
  accent5: '#22d3ee',    // cyan
  border: '#334155',
  text: '#f1f5f9',
  muted: '#94a3b8',
  flow: '#f59e0b',
  feedback: '#f43f5e',
};

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ── SVG shape helpers ───────────────────────────────────────────────────────

function Cylinder({ x, y, w, h, fill, stroke, label, sublabel, textColor = COLORS.text, animated = false }: {
  x: number; y: number; w: number; h: number; fill: string; stroke: string;
  label: string; sublabel?: string; textColor?: string; animated?: boolean;
}) {
  const rx = w / 2;
  const ry = 10;
  return (
    <g className={animated ? 'arch-node' : ''}>
      {/* body */}
      <rect x={x} y={y + ry} width={w} height={h - ry} rx={4} fill={fill} stroke={stroke} strokeWidth={1.5} />
      {/* bottom ellipse */}
      <ellipse cx={x + rx} cy={y + h} rx={rx} ry={ry} fill={fill} stroke={stroke} strokeWidth={1.5} />
      {/* top ellipse cap */}
      <ellipse cx={x + rx} cy={y + ry} rx={rx} ry={ry} fill={fill} stroke={stroke} strokeWidth={1.5} />
      {/* top rim highlight */}
      <ellipse cx={x + rx} cy={y + ry} rx={rx - 2} ry={ry - 2} fill="none" stroke={textColor} strokeWidth={0.5} opacity={0.3} />
      <text x={x + rx} y={y + ry + (h - ry) / 2 + (sublabel ? -7 : 5)} textAnchor="middle" fill={textColor} fontSize={11} fontWeight={600}>{label}</text>
      {sublabel && <text x={x + rx} y={y + ry + (h - ry) / 2 + 9} textAnchor="middle" fill={textColor} fontSize={9} opacity={0.75}>{sublabel}</text>}
    </g>
  );
}

function Hexagon({ cx, cy, r, fill, stroke, label, sublabel, textColor = COLORS.text }: {
  cx: number; cy: number; r: number; fill: string; stroke: string;
  label: string; sublabel?: string; textColor?: string;
}) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ');
  return (
    <g>
      <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={cx} y={cy + (sublabel ? -6 : 5)} textAnchor="middle" fill={textColor} fontSize={10} fontWeight={700}>{label}</text>
      {sublabel && <text x={cx} y={cy + 8} textAnchor="middle" fill={textColor} fontSize={8} opacity={0.8}>{sublabel}</text>}
    </g>
  );
}

function ProcessBox({ x, y, w, h, fill, stroke, label, sublabel, textColor = COLORS.text }: {
  x: number; y: number; w: number; h: number; fill: string; stroke: string;
  label: string; sublabel?: string; textColor?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + h / 2 + (sublabel ? -7 : 5)} textAnchor="middle" fill={textColor} fontSize={11} fontWeight={600}>{label}</text>
      {sublabel && <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle" fill={textColor} fontSize={9} opacity={0.75}>{sublabel}</text>}
    </g>
  );
}

function Parallelogram({ x, y, w, h, skew = 14, fill, stroke, label, sublabel, textColor = COLORS.text }: {
  x: number; y: number; w: number; h: number; skew?: number;
  fill: string; stroke: string; label: string; sublabel?: string; textColor?: string;
}) {
  const pts = `${x + skew},${y} ${x + w + skew},${y} ${x + w},${y + h} ${x},${y + h}`;
  return (
    <g>
      <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={x + w / 2 + skew / 2} y={y + h / 2 + (sublabel ? -6 : 5)} textAnchor="middle" fill={textColor} fontSize={10} fontWeight={600}>{label}</text>
      {sublabel && <text x={x + w / 2 + skew / 2} y={y + h / 2 + 8} textAnchor="middle" fill={textColor} fontSize={8} opacity={0.8}>{sublabel}</text>}
    </g>
  );
}

function FlowArrow({ d, color = COLORS.flow, animated = true, label }: {
  d: string; color?: string; animated?: boolean; label?: string;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={animated ? '8 4' : 'none'}
        markerEnd="url(#arrowhead)"
        opacity={0.85}
        style={animated ? { animation: 'dashMove 1.4s linear infinite' } : undefined}
      />
      {label && (
        <text fontSize={8.5} fill={color} opacity={0.9} fontWeight={600}>
          {/* rough midpoint label – positioned by caller */}
        </text>
      )}
    </g>
  );
}

function SectionLabel({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  return (
    <text x={x} y={y} fill={color} fontSize={9} fontWeight={700} letterSpacing={1.5} opacity={0.7} textAnchor="middle">
      {text.toUpperCase()}
    </text>
  );
}

// ── Main diagram ────────────────────────────────────────────────────────────

export function SystemArchitectureDiagram({ wide = false }: { wide?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  // SVG viewport
  const W = 1100;
  const H = 680;

  return (
    <>
      <style>{`
        @keyframes dashMove { to { stroke-dashoffset: -24; } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .arch-node { animation: fadeSlideUp 0.6s ease both; }
        .blink { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="System architecture diagram for the Hyper-Local Aviation Weather Forecast Verification System"
        className="w-full"
        style={{ background: COLORS.dataBg, borderRadius: 16, fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        <defs>
          {/* Arrow markers */}
          <marker id="arrowhead" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={COLORS.flow} />
          </marker>
          <marker id="arrowRed" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={COLORS.feedback} />
          </marker>
          <marker id="arrowBlue" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={COLORS.accent1} />
          </marker>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Layer background gradients */}
          <linearGradient id="gradLayer1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.layer1} stopOpacity={0.95} />
            <stop offset="100%" stopColor="#0d2340" stopOpacity={0.95} />
          </linearGradient>
          <linearGradient id="gradLayer2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.layer2} />
            <stop offset="100%" stopColor="#0d2b1e" />
          </linearGradient>
          <linearGradient id="gradLayer3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.layer3} />
            <stop offset="100%" stopColor="#1e0a38" />
          </linearGradient>
          <linearGradient id="gradLayer4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.layer4} />
            <stop offset="100%" stopColor="#1f1100" />
          </linearGradient>
          <linearGradient id="gradLayer5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.layer5} />
            <stop offset="100%" stopColor="#041a24" />
          </linearGradient>
        </defs>

        {/* ── Background grid ─────────────────────────── */}
        <pattern id="grid" width={40} height={40} patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth={0.5} />
        </pattern>
        <rect width={W} height={H} fill="url(#grid)" />

        {/* ── Title bar ─────────────────────────────────── */}
        <rect x={0} y={0} width={W} height={38} fill="#0f172a" />
        <text x={16} y={24} fill={COLORS.text} fontSize={12} fontWeight={700}>
          Hyper-Local Aviation Weather Forecast Verification System — Architecture
        </text>
        <text x={W - 16} y={24} fill={COLORS.muted} fontSize={9} textAnchor="end">VCBI · Bandaranaike Intl</text>

        {/* ════════════════════════════════════════════════════
            LAYER 1 — DATA SOURCES  (x: 14–212)
        ════════════════════════════════════════════════════ */}
        <rect x={14} y={46} width={198} height={590} rx={10} fill="url(#gradLayer1)" stroke={COLORS.accent1} strokeWidth={1} opacity={0.9} />
        <SectionLabel x={113} y={63} text="Layer 1 · Data Sources" color={COLORS.accent1} />

        {/* METAR – cylinder (DB standard symbol) */}
        <Cylinder x={30} y={76} w={76} h={72} fill="#1e3a5f" stroke={COLORS.accent1} label="METAR" sublabel="Observations" />

        {/* TAF – cylinder */}
        <Cylinder x={124} y={76} w={76} h={72} fill="#1e3a5f" stroke={COLORS.accent1} label="TAF" sublabel="Forecasts" />

        {/* Historical DB – cylinder */}
        <Cylinder x={30} y={172} w={76} h={72} fill="#1e3a5f" stroke={COLORS.accent1} label="Historical" sublabel="Weather DB" />

        {/* External API – cloud shape (parallelogram approximation) */}
        <Parallelogram x={116} y={176} w={84} h={62} skew={10} fill="#122a45" stroke={COLORS.accent1} label="Aviation Wx" sublabel="API (NOAA)" />

        {/* ASOS/AWS sensor */}
        <ProcessBox x={30} y={268} w={168} h={44} fill="#0d1f35" stroke={COLORS.accent1} label="ASOS / AWS Sensors" sublabel="In-situ surface obs" />

        {/* Legend items */}
        <text x={30} y={338} fill={COLORS.muted} fontSize={9}>Parameters:</text>
        {[
          ['T / Td', COLORS.accent1],
          ['Wind dir / spd', COLORS.accent2],
          ['QNH (hPa)', COLORS.accent3],
          ['Visibility (m)', COLORS.accent4],
          ['Cloud cover', COLORS.accent5],
        ].map(([label, col], i) => (
          <g key={label as string}>
            <circle cx={38} cy={352 + i * 18} r={4} fill={col as string} className="blink" style={{ animationDelay: `${i * 0.3}s` }} />
            <text x={48} y={356 + i * 18} fill={COLORS.text} fontSize={9}>{label as string}</text>
          </g>
        ))}

        {/* ════════════════════════════════════════════════════
            LAYER 2 — DATA PROCESSING  (x: 228–420)
        ════════════════════════════════════════════════════ */}
        <rect x={228} y={46} width={186} height={590} rx={10} fill="url(#gradLayer2)" stroke={COLORS.accent2} strokeWidth={1} opacity={0.9} />
        <SectionLabel x={321} y={63} text="Layer 2 · Processing" color={COLORS.accent2} />

        {/* Parsing – parallelogram (I/O symbol) */}
        <Parallelogram x={238} y={74} w={160} h={44} skew={12} fill="#163825" stroke={COLORS.accent2} label="METAR / TAF Parser" sublabel="Decode raw strings" />
        <Parallelogram x={238} y={132} w={160} h={44} skew={12} fill="#163825" stroke={COLORS.accent2} label="Data Cleaning" sublabel="QC · imputation" />
        <Parallelogram x={238} y={190} w={160} h={44} skew={12} fill="#163825" stroke={COLORS.accent2} label="Feature Engineering" sublabel="Lag · rolling stats" />
        <Parallelogram x={238} y={248} w={160} h={44} skew={12} fill="#163825" stroke={COLORS.accent2} label="Timestamp Alignment" sublabel="Obs ↔ forecast sync" />
        <Parallelogram x={238} y={306} w={160} h={44} skew={12} fill="#163825" stroke={COLORS.accent2} label="Train / Test Split" sublabel="80 / 20 · time-aware" />
        {/* Feature store */}
        <Cylinder x={250} y={368} w={136} h={60} fill="#0d2b1e" stroke={COLORS.accent2} label="Feature Store" sublabel="Parquet / CSV" />

        {/* ════════════════════════════════════════════════════
            LAYER 3 — AI / ML MODELS  (x: 430–650)
        ════════════════════════════════════════════════════ */}
        <rect x={430} y={46} width={226} height={590} rx={10} fill="url(#gradLayer3)" stroke={COLORS.accent3} strokeWidth={1} opacity={0.9} />
        <SectionLabel x={543} y={63} text="Layer 3 · AI / ML Models" color={COLORS.accent3} />

        {/* Hexagons for each model – standard ML symbol */}
        <Hexagon cx={497} cy={115} r={52} fill="#2d1650" stroke={COLORS.accent3} label="RF–LSTM" sublabel="Temp · QNH" />
        <Hexagon cx={594} cy={115} r={52} fill="#2d1650" stroke={COLORS.accent3} label="LightGBM" sublabel="Dew pt · QNH" />
        <Hexagon cx={497} cy={230} r={52} fill="#2d1650" stroke={COLORS.accent3} label="XGBoost" sublabel="Visibility" />
        <Hexagon cx={594} cy={230} r={52} fill="#2d1650" stroke={COLORS.accent3} label="XGB–TFT" sublabel="Wind" />
        <Hexagon cx={543} cy={345} r={52} fill="#2d1650" stroke={COLORS.accent3} label="Decision Tree" sublabel="Cloud cover" />

        {/* Model outputs aggregator */}
        <ProcessBox x={446} y={415} w={196} h={44} fill="#1e0a38" stroke={COLORS.accent3} label="Ensemble Output Layer" sublabel="Prediction aggregation" />

        {/* Metrics evaluation */}
        <ProcessBox x={446} y={476} w={196} h={44} fill="#1e0a38" stroke={COLORS.accent3} label="Metrics Engine" sublabel="MAE · RMSE · R² · Accuracy" />

        {/* ════════════════════════════════════════════════════
            LAYER 4 — BACKEND & STORAGE  (x: 672–856)
        ════════════════════════════════════════════════════ */}
        <rect x={672} y={46} width={200} height={590} rx={10} fill="url(#gradLayer4)" stroke={COLORS.accent4} strokeWidth={1} opacity={0.9} />
        <SectionLabel x={772} y={63} text="Layer 4 · Backend" color={COLORS.accent4} />

        {/* FastAPI service – rectangle */}
        <ProcessBox x={685} y={74} w={172} h={52} fill="#2d1800" stroke={COLORS.accent4} label="FastAPI Service" sublabel="REST endpoints" />

        {/* Verification engine – diamond shape (decision) */}
        {(() => {
          const cx = 772, cy = 194, hw = 86, hh = 36;
          const pts = `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`;
          return (
            <g>
              <polygon points={pts} fill="#3d1f00" stroke={COLORS.accent4} strokeWidth={1.5} />
              <text x={cx} y={cy - 5} textAnchor="middle" fill={COLORS.text} fontSize={10} fontWeight={700}>Verification</text>
              <text x={cx} y={cy + 9} textAnchor="middle" fill={COLORS.text} fontSize={9} opacity={0.8}>Obs ≈ Pred?</text>
            </g>
          );
        })()}

        {/* Databases */}
        <Cylinder x={685} y={250} w={80} h={62} fill="#2d1800" stroke={COLORS.accent4} label="Forecast DB" sublabel="SQLite" />
        <Cylinder x={779} y={250} w={80} h={62} fill="#2d1800" stroke={COLORS.accent4} label="Obs DB" sublabel="METAR" />

        {/* Model registry */}
        <Cylinder x={685} y={335} w={172} h={62} fill="#1f1100" stroke={COLORS.accent4} label="Model Registry" sublabel="Versioned artefacts" />

        {/* Scheduler */}
        <ProcessBox x={685} y={416} w={172} h={44} fill="#1f1100" stroke={COLORS.accent4} label="Cron Scheduler" sublabel="Hourly prediction cycle" />

        {/* Auth / logging */}
        <ProcessBox x={685} y={476} w={172} h={44} fill="#1f1100" stroke={COLORS.accent4} label="Logging & Auth" sublabel="Audit trail" />

        {/* ════════════════════════════════════════════════════
            LAYER 5 — USER INTERFACE  (x: 888–1086)
        ════════════════════════════════════════════════════ */}
        <rect x={888} y={46} width={198} height={590} rx={10} fill="url(#gradLayer5)" stroke={COLORS.accent5} strokeWidth={1} opacity={0.9} />
        <SectionLabel x={987} y={63} text="Layer 5 · User Interface" color={COLORS.accent5} />

        {/* Screen device – rectangle */}
        <ProcessBox x={900} y={74} w={172} h={52} fill="#042030" stroke={COLORS.accent5} label="Research Dashboard" sublabel="React · Vite · Tailwind" />
        <ProcessBox x={900} y={142} w={172} h={44} fill="#042030" stroke={COLORS.accent5} label="Verification Dashboard" sublabel="Live METAR · parameters" />
        <ProcessBox x={900} y={202} w={172} h={44} fill="#042030" stroke={COLORS.accent5} label="Model Evaluation" sublabel="Charts · MAE · RMSE" />
        <ProcessBox x={900} y={262} w={172} h={44} fill="#042030" stroke={COLORS.accent5} label="Aviation Insights" sublabel="Runway · crosswind · SIGMET" />
        <ProcessBox x={900} y={322} w={172} h={44} fill="#042030" stroke={COLORS.accent5} label="TAF Comparison" sublabel="Predicted vs official" />
        <ProcessBox x={900} y={382} w={172} h={44} fill="#042030" stroke={COLORS.accent5} label="Document Repository" sublabel="Papers · methodology" />
        <ProcessBox x={900} y={442} w={172} h={44} fill="#042030" stroke={COLORS.accent5} label="Team Profiles" sublabel="Research contributors" />

        {/* ════════════════════════════════════════════════════
            DATA FLOW ARROWS (animated)
        ════════════════════════════════════════════════════ */}

        {/* L1 → L2: METAR/TAF to parser */}
        <path d="M 212 116 L 238 116" fill="none" stroke={COLORS.flow} strokeWidth={2} strokeDasharray="6 3" markerEnd="url(#arrowhead)" style={{ animation: 'dashMove 1.2s linear infinite' }} />
        <path d="M 212 210 L 238 210" fill="none" stroke={COLORS.flow} strokeWidth={2} strokeDasharray="6 3" markerEnd="url(#arrowhead)" style={{ animation: 'dashMove 1.2s linear infinite', animationDelay: '0.3s' }} />

        {/* L2 → L3: Feature store to models */}
        <path d="M 414 398 L 430 398" fill="none" stroke={COLORS.accent2} strokeWidth={2} strokeDasharray="6 3" markerEnd="url(#arrowBlue)" style={{ animation: 'dashMove 1.2s linear infinite' }} />

        {/* L3 → L4: Predictions to FastAPI */}
        <path d="M 642 440 L 672 440" fill="none" stroke={COLORS.accent3} strokeWidth={2} strokeDasharray="6 3" markerEnd="url(#arrowhead)" style={{ animation: 'dashMove 1.2s linear infinite', animationDelay: '0.6s' }} />
        <path d="M 642 498 L 672 498" fill="none" stroke={COLORS.accent3} strokeWidth={2} strokeDasharray="6 3" markerEnd="url(#arrowhead)" style={{ animation: 'dashMove 1.2s linear infinite', animationDelay: '0.9s' }} />

        {/* L4 → L5: Backend to UI */}
        <path d="M 872 100 L 900 100" fill="none" stroke={COLORS.accent4} strokeWidth={2} strokeDasharray="6 3" markerEnd="url(#arrowhead)" style={{ animation: 'dashMove 1.2s linear infinite', animationDelay: '0.2s' }} />
        <path d="M 872 164 L 900 164" fill="none" stroke={COLORS.accent4} strokeWidth={2} strokeDasharray="6 3" markerEnd="url(#arrowhead)" style={{ animation: 'dashMove 1.2s linear infinite', animationDelay: '0.4s' }} />
        <path d="M 872 224 L 900 224" fill="none" stroke={COLORS.accent4} strokeWidth={2} strokeDasharray="6 3" markerEnd="url(#arrowhead)" style={{ animation: 'dashMove 1.2s linear infinite', animationDelay: '0.6s' }} />
        <path d="M 872 284 L 900 284" fill="none" stroke={COLORS.accent4} strokeWidth={2} strokeDasharray="6 3" markerEnd="url(#arrowhead)" style={{ animation: 'dashMove 1.2s linear infinite', animationDelay: '0.8s' }} />

        {/* Feedback loop: verification → model registry (curved back arrow) */}
        <path
          d="M 772 230 C 772 620, 543 620, 543 530"
          fill="none" stroke={COLORS.feedback} strokeWidth={1.5} strokeDasharray="5 4"
          markerEnd="url(#arrowRed)"
          style={{ animation: 'dashMove 2s linear infinite reverse' }}
        />
        <text x={640} y={630} fill={COLORS.feedback} fontSize={9} fontWeight={600} opacity={0.9}>Feedback loop · model retraining</text>

        {/* ════════════════════════════════════════════════════
            LEGEND  (bottom-right)
        ════════════════════════════════════════════════════ */}
        <rect x={14} y={644} width={1072} height={32} rx={6} fill="#0f172a" stroke={COLORS.border} strokeWidth={1} />
        {[
          [COLORS.accent1, 'Cylinder = Database', 90],
          [COLORS.accent2, 'Parallelogram = I/O Process', 240],
          [COLORS.accent3, 'Hexagon = AI/ML Model', 430],
          [COLORS.accent4, 'Diamond = Decision', 610],
          [COLORS.accent5, 'Rectangle = Component', 770],
          [COLORS.feedback, 'Red dash = Feedback', 940],
        ].map(([col, label, lx]) => (
          <g key={label as string}>
            <circle cx={(lx as number) + 6} cy={660} r={4} fill={col as string} />
            <text x={(lx as number) + 16} y={664} fill={COLORS.muted} fontSize={8.5}>{label as string}</text>
          </g>
        ))}
      </svg>
    </>
  );
}
