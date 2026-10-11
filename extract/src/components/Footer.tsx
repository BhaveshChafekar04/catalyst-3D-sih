import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenReportModal: () => void;
}

export default function Footer({ onNavigate, onOpenReportModal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-neutral-900 text-neutral-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-[#F5A623] rounded-xs" />
              <span className="text-xl font-black tracking-widest text-white uppercase font-sans">
                CATALYST
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm font-light leading-relaxed">
              Accelerating Change. Creating Impact. Transforming real-world community challenges
              into structured projects connecting universities, researchers, industry, and government.
            </p>
            <div className="text-xs font-mono text-neutral-500 pt-2">
              All field solutions are published under open knowledge licenses.
            </div>
          </div>

          {/* Navigation Mirrors */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            <div className="space-y-3">
              <span className="text-white uppercase tracking-wider block font-bold">PLATFORM</span>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => onNavigate('explore')}
                    className="hover:text-white transition-colors"
                  >
                    Active Initiatives
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('how-it-works')}
                    className="hover:text-white transition-colors"
                  >
                    The 5-Stage Protocol
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('ecosystem')}
                    className="hover:text-white transition-colors"
                  >
                    Our Ecosystem
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenReportModal}
                    className="text-[#F5A623] hover:underline"
                  >
                    Report a Problem ↗
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-white uppercase tracking-wider block font-bold">ECOSYSTEM</span>
              <ul className="space-y-2">
                <li>
                  <span className="text-neutral-400">Research Universities</span>
                </li>
                <li>
                  <span className="text-neutral-400">Multidisciplinary Cohorts</span>
                </li>
                <li>
                  <span className="text-neutral-400">Corporate Sponsors</span>
                </li>
                <li>
                  <span className="text-neutral-400">Municipal Partners</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-white uppercase tracking-wider block font-bold">GOVERNANCE</span>
              <ul className="space-y-2">
                <li>
                  <span className="text-neutral-400">Open Research Ledger</span>
                </li>
                <li>
                  <span className="text-neutral-400">Ethics & Field Safety</span>
                </li>
                <li>
                  <span className="text-neutral-400">Municipal Procurement</span>
                </li>
                <li>
                  <button onClick={scrollToTop} className="hover:text-white transition-colors">
                    Back to Top ↑
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} CATALYST SOCIETAL INNOVATION PLATFORM. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>SOCIETAL IMPACT VERIFIED</span>
            <span>·</span>
            <span>OPEN ACCREDITATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
