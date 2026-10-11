/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProcessTimeline from './components/ProcessTimeline';
import EcosystemSection from './components/EcosystemSection';
import ProjectShowcase from './components/ProjectShowcase';
import ReportProblemForm from './components/ReportProblemForm';
import VectorInspectorModal from './components/VectorInspectorModal';
import Footer from './components/Footer';

export default function App() {
  const [inspectorOpen, setInspectorOpen] = useState(false);

  // Vector Wordmark live interactive configuration
  const [wordmarkConfig, setWordmarkConfig] = useState({
    text: 'CATALYST',
    accent: '#F5A623', // Catalyst signature warm amber
    reach: 290,
    speed: 50,
    damping: 60,
    showLabels: true,
  });

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenReport = () => {
    handleNavigate('report');
  };

  const handleExplore = () => {
    handleNavigate('explore');
  };

  const updateWordmarkConfig = (updated: Partial<typeof wordmarkConfig>) => {
    setWordmarkConfig((prev) => ({ ...prev, ...updated }));
  };

  const resetWordmarkConfig = () => {
    setWordmarkConfig({
      text: 'CATALYST',
      accent: '#F5A623',
      reach: 290,
      speed: 50,
      damping: 60,
      showLabels: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F8F8F6] selection:bg-[#F5A623] selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenReportModal={handleOpenReport}
      />

      {/* Hero Section with Interactive Vector Wordmark */}
      <Hero
        onExploreClick={handleExplore}
        onReportClick={handleOpenReport}
        onOpenInspector={() => setInspectorOpen(true)}
        wordmarkConfig={wordmarkConfig}
      />

      {/* The 5-Stage Protocol: PROBLEM → INTELLIGENCE → EXPERTISE → COLLABORATION → IMPACT */}
      <ProcessTimeline />

      {/* 5-Pillar Ecosystem Section */}
      <EcosystemSection
        onExploreProblems={handleExplore}
        onReportProblem={handleOpenReport}
      />

      {/* Active Community Initiatives Showcase */}
      <ProjectShowcase />

      {/* Dedicated Problem Reporting Intake Form & AI Analyzer */}
      <ReportProblemForm />

      {/* Editorial Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenReportModal={handleOpenReport}
      />

      {/* Vector Controls Modal */}
      <VectorInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
        config={wordmarkConfig}
        onChange={updateWordmarkConfig}
        onReset={resetWordmarkConfig}
      />
    </div>
  );
}
