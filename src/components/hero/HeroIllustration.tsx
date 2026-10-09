import React from 'react';

const arrows = [
{ x: 70, y: 150, a: 48 },
{ x: 130, y: 150, a: 52 },
{ x: 190, y: 150, a: 50 },
{ x: 250, y: 150, a: 54 },
{ x: 70, y: 205, a: 52 },
{ x: 130, y: 205, a: 55, highlight: true },
{ x: 190, y: 205, a: 51 },
{ x: 250, y: 205, a: 49 }];


const indicators = [
{ label: 'WIND', fill: 0.62 },
{ label: 'QNH', fill: 0.48 },
{ label: 'VIS', fill: 0.85 }];


export function HeroIllustration() {
  return (
    <figure>
      <svg viewBox="0 0 520 440" className="h-auto w-full" role="img" aria-labelledby="hero-ill-title">
        <title id="hero-ill-title">
          Illustration of an airport runway with wind direction arrows, a forecast-versus-observed chart and weather data indicators
        </title>

        <rect x="0.5" y="0.5" width="519" height="439" rx="20" fill="#FFFDF5" stroke="#E8E3D5" />
        {Array.from({ length: 11 }).map((_, i) =>
        <line key={i} x1={40 + i * 44} y1="24" x2={40 + i * 44} y2="262" stroke="#F1ECDD" />
        )}

        <circle cx="62" cy="64" r="18" fill="#F5C542" />
        <path d="M78 84 h58 a14 14 0 0 0 -6 -26 a20 20 0 0 0 -38 -4 a14 14 0 0 0 -14 30 z" fill="#FFFFFF" stroke="#D6CFBC" strokeWidth="1.5" />

        {arrows.map((ar) =>
        <g key={`${ar.x}-${ar.y}`} transform={`translate(${ar.x} ${ar.y}) rotate(${ar.a})`}>
            <line x1="0" y1="12" x2="0" y2="-12" stroke={ar.highlight ? '#D9A514' : '#202124'} strokeOpacity={ar.highlight ? 1 : 0.5} strokeWidth={ar.highlight ? 3 : 1.8} strokeLinecap="round" />
            <polyline points="-5,-5 0,-12 5,-5" fill="none" stroke={ar.highlight ? '#D9A514' : '#202124'} strokeOpacity={ar.highlight ? 1 : 0.5} strokeWidth={ar.highlight ? 3 : 1.8} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        <text x="40" y="250" fontFamily="Inter, sans-serif" fontSize="12" fill="#626262">
          Wind direction
        </text>

        <g>
          <rect x="300" y="36" width="192" height="138" rx="12" fill="#FFFFFF" stroke="#E8E3D5" />
          <text x="316" y="60" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#202124">
            Forecast vs observed
          </text>
          <line x1="316" y1="150" x2="476" y2="150" stroke="#E8E3D5" />
          <path d="M402 112 L476 96 L476 128 Z" fill="#FFF5CC" />
          <path d="M316 132 C 336 126, 352 136, 370 120 S 392 108, 402 112" fill="none" stroke="#202124" strokeWidth="2" />
          <path d="M402 112 C 420 116, 440 104, 476 112" fill="none" stroke="#D9A514" strokeWidth="2.5" strokeDasharray="5 4" />
          <line x1="402" y1="76" x2="402" y2="150" stroke="#626262" strokeOpacity="0.4" strokeDasharray="3 3" />
          <text x="316" y="166" fontFamily="Inter, sans-serif" fontSize="11" fill="#626262">Observed</text>
          <text x="440" y="166" fontFamily="Inter, sans-serif" fontSize="11" fill="#7A5C00">+1 h</text>
        </g>

        <line x1="0" y1="272" x2="520" y2="272" stroke="#E8E3D5" />
        <polygon points="246,274 274,274 392,420 128,420" fill="#F4F0E4" stroke="#D6CFBC" />
        <line x1="260" y1="282" x2="260" y2="380" stroke="#202124" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="10 10" />
        {[0, 1, 2, 3, 4, 5].map((i) =>
        <rect key={i} x={188 + i * 14 + (i > 2 ? 32 : 0)} y="402" width="8" height="12" fill="#202124" fillOpacity="0.35" />
        )}
        <text x="260" y="396" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="16" fontWeight="500" fill="#202124" fillOpacity="0.7">
          22
        </text>

        {indicators.map((ind, i) =>
        <g key={ind.label} transform={`translate(24 ${296 + i * 40})`}>
            <rect width="112" height="30" rx="8" fill="#FFFFFF" stroke="#E8E3D5" />
            <text x="12" y="19.5" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#202124">
              {ind.label}
            </text>
            <rect x="52" y="12" width="48" height="6" rx="3" fill="#F1ECDD" />
            <rect x="52" y="12" width={48 * ind.fill} height="6" rx="3" fill="#F5C542" />
          </g>
        )}

        {['METAR', 'TAF'].map((t, i) =>
        <g key={t} transform={`translate(400 ${306 + i * 40})`}>
            <rect width="96" height="30" rx="15" fill="#FFFFFF" stroke="#E8E3D5" />
            <circle cx="16" cy="15" r="4" fill={i === 0 ? '#202124' : '#F5C542'} />
            <text x="28" y="19.5" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#202124">
              {t}
            </text>
          </g>
        )}
      </svg>
      <figcaption className="mt-3 text-sm text-muted">Illustrative graphic — not live weather data.</figcaption>
    </figure>);

}