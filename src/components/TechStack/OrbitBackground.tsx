import React, { forwardRef } from 'react';

interface OrbitBackgroundProps {
  innerRadius: number;
  outerRadius: number;
}

export const OrbitBackground = forwardRef<HTMLDivElement, OrbitBackgroundProps>(
  function OrbitBackground({ innerRadius, outerRadius }, ref) {
    return (
      <div
        ref={ref}
        className="absolute inset-0 pointer-events-none flex items-center justify-center will-change-[opacity]"
        style={{ opacity: 1 }}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full max-w-[1250px] max-h-[1250px]"
          viewBox="-600 -600 1200 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Center precision crosshair */}
          <g stroke="currentColor" strokeWidth="1" className="text-black/20">
            <line x1="-24" y1="0" x2="24" y2="0" />
            <line x1="0" y1="-24" x2="0" y2="24" />
            <circle cx="0" cy="0" r="4" fill="currentColor" className="text-black/30" />
          </g>

          {/* 1. Inner Circle Orbital Boundary (10 Nodes Track) */}
          <circle
            cx="0"
            cy="0"
            r={innerRadius}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="text-black/[0.14]"
          />

          {/* 10 Precision Radial Ticks on Inner Ring */}
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 10 + Math.PI / 10;
            const x1 = Math.cos(angle) * (innerRadius - 6);
            const y1 = Math.sin(angle) * (innerRadius - 6);
            const x2 = Math.cos(angle) * (innerRadius + 6);
            const y2 = Math.sin(angle) * (innerRadius + 6);

            return (
              <line
                key={`inner-tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-black/25"
              />
            );
          })}

          {/* 2. Outer Circle Orbital Boundary (14 Nodes Track) */}
          <circle
            cx="0"
            cy="0"
            r={outerRadius}
            stroke="currentColor"
            strokeWidth="1.4"
            className="text-black/[0.18]"
          />

          {/* 14 Precision Radial Ticks on Outer Ring */}
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 14;
            const x1 = Math.cos(angle) * (outerRadius - 7);
            const y1 = Math.sin(angle) * (outerRadius - 7);
            const x2 = Math.cos(angle) * (outerRadius + 7);
            const y2 = Math.sin(angle) * (outerRadius + 7);
            const isCardinal = i % 7 === 0;

            return (
              <line
                key={`outer-tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth={isCardinal ? '1.8' : '1.2'}
                className={isCardinal ? 'text-black/35' : 'text-black/20'}
              />
            );
          })}

          {/* Minimal Faint Celestial Degree Markers */}
          <text
            x={outerRadius + 16}
            y="4"
            className="fill-black/35 font-mono text-[9.5px] tracking-[0.25em] uppercase select-none font-bold"
          >
            000° ORBIT II
          </text>
          <text
            x="0"
            y={-outerRadius - 14}
            textAnchor="middle"
            className="fill-black/35 font-mono text-[9.5px] tracking-[0.25em] uppercase select-none font-bold"
          >
            090° NORTH
          </text>
          <text
            x={-outerRadius - 16}
            y="4"
            textAnchor="end"
            className="fill-black/35 font-mono text-[9.5px] tracking-[0.25em] uppercase select-none font-bold"
          >
            180° BOUNDARY
          </text>
          <text
            x="0"
            y={outerRadius + 22}
            textAnchor="middle"
            className="fill-black/35 font-mono text-[9.5px] tracking-[0.25em] uppercase select-none font-bold"
          >
            270° SOUTH
          </text>
        </svg>

        {/* Central Watermark / Guidance */}
        <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none select-none max-w-[280px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse shadow-[0_0_8px_rgba(180,83,9,0.5)]" />
            <span className="font-mono text-[9.5px] tracking-[0.35em] uppercase text-[#B45309] font-black">
              02 / TECHNICAL ECOSYSTEM
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A1816] uppercase leading-none">
            Dual-Orbit
          </h3>
          <p className="font-mono text-[10.5px] text-black/45 mt-3 tracking-widest uppercase">
            Scroll to Organize Architecture ↓
          </p>
        </div>
      </div>
    );
  }
);
