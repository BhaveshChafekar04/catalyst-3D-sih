import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, Sparkles, Compass } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenReportModal: () => void;
}

export default function Navbar({ onNavigate, onOpenReportModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark per Top Bar Contract) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('hero')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <span className="w-2 h-2 bg-[#F5A623] rounded-xs group-hover:scale-125 transition-transform duration-200" />
            <span className="text-lg font-black tracking-widest text-white group-hover:text-neutral-200 transition-colors uppercase">
              CATALYST
            </span>
          </button>
          <span className="hidden xl:inline text-[11px] font-mono tracking-wider text-neutral-500 uppercase border-l border-neutral-800 pl-3">
            Accelerating Change · Creating Impact
          </span>
        </div>

        {/* Zone 2: Navigation Links (Single-line, understated) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <button
            onClick={() => handleLinkClick('explore')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Explore
          </button>
          <button
            onClick={() => handleLinkClick('how-it-works')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </button>
          <button
            onClick={() => handleLinkClick('ecosystem')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Our Ecosystem
          </button>
          <button
            onClick={() => handleLinkClick('report')}
            className="hover:text-[#F5A623] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            Report a Problem
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReportModal}
            className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-[#F8F8F6] hover:bg-white rounded-md transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,166,35,0.25)] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <span>Report a Problem</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-black" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onOpenReportModal}
            className="px-3 py-1.5 text-xs font-medium bg-[#F5A623] text-black rounded font-mono"
          >
            Report
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#070709] px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
            Navigation
          </div>
          <div className="flex flex-col space-y-3 text-sm">
            <button
              onClick={() => handleLinkClick('explore')}
              className="text-left py-1 text-neutral-300 hover:text-white font-medium flex items-center justify-between"
            >
              <span>Explore Initiatives</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </button>
            <button
              onClick={() => handleLinkClick('how-it-works')}
              className="text-left py-1 text-neutral-300 hover:text-white font-medium flex items-center justify-between"
            >
              <span>How It Works (5 Stages)</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </button>
            <button
              onClick={() => handleLinkClick('ecosystem')}
              className="text-left py-1 text-neutral-300 hover:text-white font-medium flex items-center justify-between"
            >
              <span>Our Ecosystem</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </button>
            <button
              onClick={() => handleLinkClick('report')}
              className="text-left py-1 text-[#F5A623] font-medium flex items-center justify-between"
            >
              <span>Report a Problem</span>
              <ArrowUpRight className="w-4 h-4 text-[#F5A623]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
