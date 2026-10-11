import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Building, GraduationCap, Users2, Landmark, TrendingUp } from 'lucide-react';
import { ECOSYSTEM_STAKEHOLDERS } from '../data/catalystData';

interface EcosystemSectionProps {
  onExploreProblems: () => void;
  onReportProblem: () => void;
}

export default function EcosystemSection({ onExploreProblems, onReportProblem }: EcosystemSectionProps) {
  const [selectedKey, setSelectedKey] = useState<keyof typeof ECOSYSTEM_STAKEHOLDERS>('problems');

  const keys: (keyof typeof ECOSYSTEM_STAKEHOLDERS)[] = [
    'problems',
    'universities',
    'students',
    'industry',
    'impact'
  ];

  const current = ECOSYSTEM_STAKEHOLDERS[selectedKey];

  return (
    <section id="ecosystem" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Lead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5A623]">
                COLLABORATIVE INFRASTRUCTURE
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              THE CATALYST ECOSYSTEM
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-md">
            Five interdependent pillars connecting lived civic realities with frontier science,
            student vigor, and sovereign industry capital.
          </p>
        </div>

        {/* Five Refined Typographic Entry Points */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {keys.map((key) => {
            const item = ECOSYSTEM_STAKEHOLDERS[key];
            const isSelected = selectedKey === key;

            return (
              <button
                key={key}
                onClick={() => setSelectedKey(key)}
                className={`group text-left p-5 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? 'bg-neutral-900/90 border-[#F5A623] shadow-[0_0_25px_rgba(245,166,35,0.15)]'
                    : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/40'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <span className="absolute top-0 left-0 right-0 h-1 bg-[#F5A623]" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest ${
                      isSelected ? 'text-[#F5A623]' : 'text-neutral-500'
                    }`}
                  >
                    ENTRY POINT
                  </span>
                  <ArrowUpRight
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isSelected
                        ? 'text-[#F5A623] translate-x-0.5 -translate-y-0.5'
                        : 'text-neutral-600 group-hover:text-neutral-400'
                    }`}
                  />
                </div>

                <div className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
                  {item.title}
                </div>

                <div className="text-xs text-neutral-400 mt-1 line-clamp-1">
                  {item.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Focal Display for Selected Pillar */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950/90 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Pillar Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F5A623]/10 border border-[#F5A623]/30 text-xs font-mono text-[#F5A623]">
                <span>KEY CAPABILITY</span>
                <span>·</span>
                <span className="font-bold">{current.keyStats}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                {current.title} — {current.tagline}
              </h3>

              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                {current.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-3 pt-2">
                {current.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-2 shrink-0" />
                    <span className="text-sm text-neutral-300 leading-normal">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-4 flex flex-wrap gap-4">
                {selectedKey === 'problems' && (
                  <button
                    onClick={onExploreProblems}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-md transition-colors"
                  >
                    <span>BROWSE ACTIVE CHALLENGES</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={onReportProblem}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-md transition-colors"
                >
                  <span>SUBMIT CIVIC INTAKE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F5A623]" />
                </button>
              </div>
            </div>

            {/* Right Concrete Artifacts & Cohorts */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block border-b border-neutral-800 pb-3">
                REAL-WORLD COHORTS & ADOPTION
              </span>

              {selectedKey === 'problems' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Environmental & Clean Water</div>
                    <div className="text-neutral-400">74 challenges · Watershed monitoring, lead remediation, micro-runoff</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Clean Energy & Municipal Storage</div>
                    <div className="text-neutral-400">58 challenges · Heat island alleviation, solar community microgrids</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Urban Mobility & Public Transit Deserts</div>
                    <div className="text-neutral-400">42 challenges · Rural shuttle optimization, accessible medical transit</div>
                  </div>
                </div>
              )}

              {selectedKey === 'universities' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">UC Davis & Cal Poly</div>
                    <div className="text-neutral-400">Hydrologic systems, precision agricultural drones, biochar beds</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Colorado School of Mines</div>
                    <div className="text-neutral-400">Power grid distribution, municipal battery safety, inverter control</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">University of Washington</div>
                    <div className="text-neutral-400">Urban freight routing, autonomous EV shuttle telemetry</div>
                  </div>
                </div>
              )}

              {selectedKey === 'students' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Cross-Disciplinary Team Composition</div>
                    <div className="text-neutral-400">Each team has: 2 Hardware/Software Engineers, 1 Policy Analyst, 1 Field Researcher</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Academic Accreditation</div>
                    <div className="text-neutral-400">Integrated as 2-semester senior capstones with full university course credit</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Career Placement Pipeline</div>
                    <div className="text-neutral-400">88% of student cohort fellows secure high-impact roles in clean tech & civic engineering</div>
                  </div>
                </div>
              )}

              {selectedKey === 'industry' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Hardware & Compute Grants</div>
                    <div className="text-neutral-400">Direct component supply, GPU cluster hours, and lab prototyping kits</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Municipal Transition Fund</div>
                    <div className="text-neutral-400">Matching 1:1 public municipal dollars with private corporate endowments</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Executive Fellow Mentorship</div>
                    <div className="text-neutral-400">Senior engineering directors conduct weekly design reviews with student teams</div>
                  </div>
                </div>
              )}

              {selectedKey === 'impact' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Verified Clean Gallons</div>
                    <div className="text-neutral-400">420,000+ gallons protected from seasonal agricultural runoff spikes</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Decentralized Power Delivered</div>
                    <div className="text-neutral-400">2.4 Megawatt-hours delivered during summer peak heat waves</div>
                  </div>
                  <div className="p-3 rounded bg-black/40 border border-neutral-800">
                    <div className="font-semibold text-white mb-1">Open-Source Replication</div>
                    <div className="text-neutral-400">12 peer municipalities deployed cloned sensor nodes under Apache 2.0</div>
                  </div>
                </div>
              )}

              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-800">
                VERIFIED ECOSYSTEM AUDIT · MARCH 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
