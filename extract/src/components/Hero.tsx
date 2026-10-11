import React, { useState } from 'react';
import { ArrowUpRight, Sliders, ChevronDown, Compass, ShieldCheck } from 'lucide-react';
import VectorWordmark from './VectorWordmark';

interface HeroProps {
  onExploreClick: () => void;
  onReportClick: () => void;
  onOpenInspector: () => void;
  wordmarkConfig: {
    text: string;
    accent: string;
    reach: number;
    speed: number;
    damping: number;
    showLabels: boolean;
  };
}

export default function Hero({
  onExploreClick,
  onReportClick,
  onOpenInspector,
  wordmarkConfig,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#050505] pt-4 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background subtle technical grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Subtle radial ambient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Tagline & Status (Above wordmark) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-2 sm:pt-4">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
          <p className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.24em] text-neutral-400 uppercase">
            SOCIETAL INNOVATION PLATFORM
          </p>
        </div>

        {/* Vector Inspector trigger */}
        <button
          onClick={onOpenInspector}
          className="group flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] rounded-md transition-all duration-200"
          title="Open Vector Wordmark Controls"
        >
          <Sliders className="w-3.5 h-3.5 text-[#F5A623] group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline">VECTOR CONTROLS</span>
        </button>
      </div>

      {/* Centerpiece: Interactive Vector Wordmark */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-4 my-auto min-h-[360px] sm:min-h-[460px] lg:min-h-[520px]">
        {/* Vector Canvas Container */}
        <div className="w-full h-[320px] sm:h-[440px] lg:h-[500px] max-w-7xl relative mx-auto rounded-xl">
          <VectorWordmark
            text={wordmarkConfig.text}
            accent={wordmarkConfig.accent}
            reach={wordmarkConfig.reach}
            speed={wordmarkConfig.speed}
            damping={wordmarkConfig.damping}
            handles={{
              labels: wordmarkConfig.showLabels,
              size: 110,
              spread: 28,
            }}
            font={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "230px",
              lineHeight: "1em",
              letterSpacing: "0.03em",
            }}
          />
        </div>

        {/* Interactive hint */}
        <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-600 uppercase text-center mt-2 pointer-events-none">
          [ INTERACTIVE VECTOR MESH · MOVE CURSOR TO DEFLECT SHADER RAYS ]
        </p>
      </div>

      {/* Hero Copy (Below wordmark) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-white/[0.08] pt-8">
          {/* Main Headline */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase text-balance leading-none">
              REAL PROBLEMS. REAL PEOPLE.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#F5A623]">
                REAL IMPACT.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed">
              “Connecting community challenges with the intelligence, expertise,
              and collaboration needed to turn them into real-world solutions.”
            </p>
          </div>

          {/* Action CTAs */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3.5">
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#F8F8F6] hover:bg-white rounded-md transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,166,35,0.35)] active:scale-[0.98]"
            >
              <span>EXPLORE CATALYST</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={onReportClick}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-200 hover:text-white bg-transparent hover:bg-white/[0.05] border border-white/20 hover:border-[#F5A623]/60 rounded-md transition-all duration-200 active:scale-[0.98]"
            >
              <span>REPORT A PROBLEM</span>
              <ArrowUpRight className="w-4 h-4 text-[#F5A623] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Quantified System Invariants Bar */}
        <div className="mt-8 pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-y-3 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-neutral-300">240+ Active Community Challenges</span>
          </div>
          <div className="hidden sm:inline text-neutral-700">·</div>
          <div>38 Research Universities</div>
          <div className="hidden sm:inline text-neutral-700">·</div>
          <div>14,200+ Student Builders</div>
          <div className="hidden sm:inline text-neutral-700">·</div>
          <div className="text-neutral-300">$18.4M Direct Field Funding</div>
        </div>
      </div>
    </section>
  );
}
