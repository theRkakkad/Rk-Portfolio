import React, { forwardRef } from 'react';
import { CATEGORIES } from './techStackData';

interface CategoryLayoutProps {
  // Empty props as opacity is controlled directly via ref for 60fps performance
}

export const CategoryLayout = forwardRef<HTMLDivElement, CategoryLayoutProps>(
  function CategoryLayout(_props, ref) {
    return (
      <div
        ref={ref}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col justify-between h-full pointer-events-none will-change-[opacity]"
        style={{
          opacity: 0,
          visibility: 'hidden',
        }}
      >
        {/* Section Top Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-3 sm:pb-4 gap-2">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#B45309] font-black">
                02 / TECHNICAL ARSENAL
              </span>
              <div className="w-8 h-px bg-[#B45309]/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-[#1A1816] uppercase leading-none">
              System Architecture
            </h2>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#1A1816]/65 max-w-md leading-relaxed text-left md:text-right">
            Curated tools and runtime ecosystems powering resilient full-stack platforms and AI pipelines.
          </p>
        </div>

        {/* 6 Symmetrical Category Groups (3 x 2 Grid, perfectly aligned 2 x 2 slots) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-6 my-auto pt-2 sm:pt-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col bg-white/70 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-black/[0.08] pb-2 mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] font-black text-[#B45309] tracking-widest">
                    {cat.index}
                  </span>
                  <h3 className="font-serif italic font-black text-sm sm:text-base text-[#1A1816] tracking-tight">
                    {cat.title}
                  </h3>
                </div>
                <span className="font-mono text-[9px] text-black/40 font-bold tracking-wider">
                  [{cat.items.length}]
                </span>
              </div>

              {/* 2 x 2 Symmetrical Slot Grid: Exact Matching Dimensions for Both Columns */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    data-slot-id={item.id}
                    className="h-10 sm:h-11 w-full invisible pointer-events-none rounded-full"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Technical Metadata */}
        <div className="border-t border-black/10 pt-2.5 sm:pt-3 flex items-center justify-between font-mono text-[9.5px] sm:text-[10px] text-black/45 uppercase tracking-widest">
          <span>24 Engineered Modules</span>
          <span className="hidden sm:inline">Harmonic Dual-Orbit Formation</span>
          <span>Verified Production Stack</span>
        </div>
      </div>
    );
  }
);
