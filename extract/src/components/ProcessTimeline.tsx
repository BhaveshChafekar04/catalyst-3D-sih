import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Activity, Cpu, GraduationCap, Users, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/catalystData';

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [
    Activity,
    Cpu,
    GraduationCap,
    Users,
    CheckCircle2
  ];

  return (
    <section id="how-it-works" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070709] border-t border-neutral-900 overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neutral-900/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5A623]">
              THE CATALYST PROTOCOL
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase text-balance">
            EVERY SOLUTION STARTS WITH A PROBLEM.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            A rigorous, decentralized pipeline that converts unstructured community distress signals
            into verified, production-grade solutions deployed in the field.
          </p>
        </div>

        {/* Minimal Animated Process Header: PROBLEM → INTELLIGENCE → EXPERTISE → COLLABORATION → IMPACT */}
        <div className="mb-14 overflow-x-auto pb-4 scrollbar-none">
          <div className="min-w-[720px] flex items-center justify-between relative border border-neutral-800/80 bg-neutral-950/60 p-3 sm:p-4 rounded-xl backdrop-blur-xs">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = stepIcons[idx];
              const isCurrent = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <React.Fragment key={step.step}>
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      isCurrent
                        ? 'bg-white/[0.08] text-white shadow-xs'
                        : isPast
                        ? 'text-neutral-300 hover:text-white'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {/* Small Point of Light */}
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#F5A623] shadow-[0_0_10px_#F5A623]'
                          : isPast
                          ? 'bg-neutral-300'
                          : 'bg-neutral-700'
                      }`}
                    />

                    <div>
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                        {step.step}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-bold tracking-wider uppercase font-mono ${
                          isCurrent ? 'text-white' : ''
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </button>

                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="flex items-center px-1">
                      <span className="h-[1px] w-6 sm:w-10 bg-neutral-800" />
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-600 -ml-1 shrink-0" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Deep Stage Inspector Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Active Detail Showcase */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-neutral-900/50 to-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono text-[#F5A623] tracking-widest uppercase">
                  PHASE {PROCESS_STEPS[activeStep].step} SPECIFICATION
                </span>
                <span className="text-xs font-mono text-neutral-500 uppercase">
                  STATUS: VERIFIED
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase mb-2">
                  {PROCESS_STEPS[activeStep].title} — {PROCESS_STEPS[activeStep].subtitle}
                </h3>
                <p className="text-base text-neutral-300 font-light leading-relaxed mt-4">
                  {PROCESS_STEPS[activeStep].detail}
                </p>
              </div>

              {/* Technical deliverables grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-black/40 border border-neutral-800/80">
                  <span className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                    PRIMARY INPUT
                  </span>
                  <span className="text-xs text-neutral-200 font-medium">
                    {activeStep === 0 && 'Civic observation & raw multimedia telemetry'}
                    {activeStep === 1 && 'Problem constraints & 40M+ academic journals'}
                    {activeStep === 2 && 'Decomposed engineering briefs & IRB clearances'}
                    {activeStep === 3 && 'Hardware testbenches & civic sandbox permits'}
                    {activeStep === 4 && 'Functional prototypes & municipal hand-off'}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-black/40 border border-neutral-800/80">
                  <span className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                    TRANSFORMATION
                  </span>
                  <span className="text-xs text-neutral-200 font-medium">
                    {activeStep === 0 && 'Geotagging, deduplication & impact scoring'}
                    {activeStep === 1 && 'AI semantic extraction & dependency graph'}
                    {activeStep === 2 && 'Lab-to-problem capability matching index'}
                    {activeStep === 3 && '12-week agile sprint & rapid deployment'}
                    {activeStep === 4 && 'Longitudinal sensor tracking & open audit'}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-black/40 border border-neutral-800/80">
                  <span className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                    KEY OUTCOME
                  </span>
                  <span className="text-xs text-[#F5A623] font-medium">
                    {activeStep === 0 && 'Structured RFP'}
                    {activeStep === 1 && 'Project Blueprint'}
                    {activeStep === 2 && 'Lab Commitment'}
                    {activeStep === 3 && 'Verified Prototype'}
                    {activeStep === 4 && 'Municipal Scale'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center justify-between pt-8 border-t border-neutral-800/60 mt-8">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                ← Previous Stage
              </button>

              <div className="flex items-center gap-1.5">
                {PROCESS_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-1.5 transition-all rounded-full ${
                      activeStep === i ? 'w-8 bg-[#F5A623]' : 'w-2 bg-neutral-800'
                    }`}
                    aria-label={`Jump to stage ${i + 1}`}
                  />
                ))}
              </div>

              <button
                disabled={activeStep === PROCESS_STEPS.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-neutral-200 hover:text-white flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Side Editorial Snapshot */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                THE CATALYST GUARANTEE
              </span>
              <h4 className="text-xl font-bold text-white tracking-tight uppercase leading-snug">
                NO VACUOUS CODE SPRINT. NO SHELVED PAPERS.
              </h4>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Traditional hackathons produce code that is never deployed. Traditional academic
                papers stay trapped in subscription paywalls. Catalyst enforces civic partner
                adoption agreements before work begins.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <span>100% of projects require verified community municipal sponsors</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <span>Dual peer-review: Academic rigor + Civic viability check</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <span>Open-source hardware and software licenses for global adoption</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-800 text-xs font-mono text-neutral-500">
              AUDITED PROTOCOL · VERSION 2.8-PRODUCTION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
