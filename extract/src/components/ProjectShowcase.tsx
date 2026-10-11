import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MapPin, Users, Building, ShieldCheck, X } from 'lucide-react';
import { COMMUNITY_PROBLEMS, CommunityProblem } from '../data/catalystData';

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProblem, setActiveModalProblem] = useState<CommunityProblem | null>(null);
  const [backendChallenges, setBackendChallenges] = useState<CommunityProblem[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    fetch(`${apiUrl}/api/challenges`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map(item => ({
            id: item.id,
            title: item.title,
            category: item.category as any,
            location: item.location,
            coordinates: 'GPS Pending',
            affectedPopulation: 'TBD',
            summary: item.description.length > 150 ? item.description.substring(0, 150) + '...' : item.description,
            fullDescription: item.description,
            image: '/src/assets/images/urban_water_sensor_1791563391292.jpg',
            status: item.status as any || 'Submitted',
            leadInstitution: 'Awaiting Matching',
            studentTeamSize: 0,
            industrySponsor: 'Awaiting Sponsor',
            impactMetric: 'N/A',
            urgency: 'High',
            timeline: `Reported on ${new Date(item.created_at).toLocaleDateString()}`
          }));
          setBackendChallenges(mapped);
        }
      })
      .catch(err => console.error('Error fetching challenges:', err));
  }, []);

  const categories = [
    'All',
    'Environment & Water',
    'Clean Energy',
    'Urban Mobility',
    'Agriculture & Soil'
  ];

  const combinedProblems = [...backendChallenges, ...COMMUNITY_PROBLEMS];

  const filteredProblems = selectedCategory === 'All'
    ? combinedProblems
    : combinedProblems.filter(p => p.category === selectedCategory);

  return (
    <section id="explore" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5A623]">
                FIELD DEPLOYMENTS
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              ACTIVE COMMUNITY INITIATIVES
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-md">
            Explore live problem briefs matched with university laboratories, multidisciplinary student
            teams, and municipal field sponsors.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2x2 Grid of High-Fidelity Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProblems.map((prob) => (
            <div
              key={prob.id}
              onClick={() => setActiveModalProblem(prob)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/70 hover:border-neutral-700 hover:bg-neutral-900/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview with measured contrast scrim */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                <img
                  src={prob.image}
                  alt={prob.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

                {/* Status & Category Unboxed Metadata */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-200 bg-black/70 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                    <span>{prob.category}</span>
                    <span aria-hidden="true" className="text-neutral-500">·</span>
                    <span className="text-[#F5A623]">{prob.status}</span>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    {prob.timeline}
                  </span>
                </div>

                {/* Location indicator */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-mono text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>{prob.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-neutral-100 transition-colors">
                    {prob.title}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light mt-3 leading-relaxed">
                    {prob.summary}
                  </p>
                </div>

                {/* Metadata & Key Impact */}
                <div className="pt-4 border-t border-neutral-800/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-400 gap-2">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="truncate max-w-[240px]">{prob.leadInstitution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{prob.studentTeamSize} student researchers</span>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-neutral-300 bg-neutral-900/60 p-2.5 rounded border border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-500 uppercase">MEASURED IMPACT:</span>
                    <span className="text-[#F5A623] font-medium text-right truncate max-w-[280px]">
                      {prob.impactMetric}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-mono text-neutral-500">
                      POPULATION: {prob.affectedPopulation}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-white uppercase group-hover:text-[#F5A623] transition-colors">
                      <span>VIEW DOSSIER</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Full Project Dossier */}
      {activeModalProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProblem(null)}
              className="absolute top-6 right-6 p-2 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dossier Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623] uppercase mb-2">
                <span>PROJECT DOSSIER #{activeModalProblem.id}</span>
                <span>·</span>
                <span className="text-neutral-400">{activeModalProblem.status}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {activeModalProblem.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Coordinates: {activeModalProblem.coordinates} · {activeModalProblem.location}
              </p>
            </div>

            {/* Image Preview */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-neutral-800">
              <img
                src={activeModalProblem.image}
                alt={activeModalProblem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Detailed Narrative */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-wider">
                COMMUNITY CONTEXT & ARCHITECTURE
              </h4>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {activeModalProblem.fullDescription}
              </p>
            </div>

            {/* Structured Stakeholder Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
              <div>
                <span className="text-neutral-500 uppercase block mb-1">LEAD ACADEMIC LAB</span>
                <span className="text-white font-medium">{activeModalProblem.leadInstitution}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase block mb-1">STUDENT RESEARCH COHORT</span>
                <span className="text-white font-medium">{activeModalProblem.studentTeamSize} interdisciplinary members</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase block mb-1">INDUSTRY & CIVIC SPONSOR</span>
                <span className="text-white font-medium">{activeModalProblem.industrySponsor}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase block mb-1">CURRENT TIMELINE PHASE</span>
                <span className="text-[#F5A623] font-medium">{activeModalProblem.timeline}</span>
              </div>
            </div>

            {/* Measured Impact Statement */}
            <div className="p-4 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/30">
              <div className="text-xs font-mono text-[#F5A623] uppercase mb-1">
                VERIFIED IMPACT METRIC
              </div>
              <div className="text-sm text-neutral-200">
                {activeModalProblem.impactMetric}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
              <button
                onClick={() => setActiveModalProblem(null)}
                className="px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white bg-neutral-900 transition-colors"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  alert(`Accessing open telemetry data for ${activeModalProblem.title}...`);
                }}
                className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#F8F8F6] hover:bg-white transition-colors"
              >
                Download Open Data ↗
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
