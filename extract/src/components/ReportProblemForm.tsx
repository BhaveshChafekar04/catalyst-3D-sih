import React, { useState, useRef } from 'react';
import {
  Upload,
  X,
  FileText,
  Video,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MapPin,
  Users,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

interface AttachedMedia {
  id: string;
  name: string;
  url: string;
  size: string;
  type: 'image' | 'doc' | 'video';
}

interface ChallengeResponse {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: string;
  created_at?: string | null;
}

const CHALLENGES_API_URL = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/challenges`;

function isChallengeResponse(value: unknown): value is ChallengeResponse {
  if (typeof value !== 'object' || value === null) return false;
  const challenge = value as Record<string, unknown>;
  return ['id', 'title', 'category', 'location', 'description', 'status'].every(
    (field) => typeof challenge[field] === 'string'
  );
}

function getApiErrorMessage(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) return value;
  if (typeof value !== 'object' || value === null) return null;

  const detail = (value as Record<string, unknown>).detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => {
        if (typeof item === 'object' && item !== null && 'msg' in item && typeof item.msg === 'string') {
          return item.msg;
        }
        return null;
      })
      .filter((message): message is string => message !== null);
    if (messages.length > 0) return messages.join(' ');
  }
  return null;
}

function isChallengeResponseList(value: unknown): value is ChallengeResponse[] {
  return Array.isArray(value) && value.every(isChallengeResponse);
}

export default function ReportProblemForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Environment & Water');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [affectedPopulation, setAffectedPopulation] = useState('');
  const [mediaList, setMediaList] = useState<AttachedMedia[]>([
    {
      id: 'sample-1',
      name: 'field_water_sample_clarity.jpg',
      url: '/src/assets/images/urban_water_sensor_1791563391292.jpg',
      size: '2.4 MB',
      type: 'image'
    }
  ]);
  const [optionalDocName, setOptionalDocName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedChallenge, setSubmittedChallenge] = useState<ChallengeResponse | null>(null);
  const [challenges, setChallenges] = useState<ChallengeResponse[]>([]);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState(false);
  const [challengeListError, setChallengeListError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Environment & Water',
    'Clean Energy',
    'Urban Mobility',
    'Agriculture & Soil',
    'Public Health',
    'Civic Infrastructure'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setMediaList((prev) => [
          ...prev,
          {
            id: `upload-${Date.now()}-${Math.random()}`,
            name: file.name,
            url,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            type: 'image',
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (id: string) => {
    setMediaList((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOptionalDocName(`${file.name} (${(file.size / 1024).toFixed(0)} KB)`);
    }
  };

  const loadPreset = (presetType: 'water' | 'energy' | 'transit') => {
    if (presetType === 'water') {
      setTitle('Agricultural Nitrate Spike at Rio Linda Municipal Wellhead');
      setCategory('Environment & Water');
      setLocation('Rio Linda, Sacramento County, CA (38.69° N, 121.45° W)');
      setAffectedPopulation('42,000 residents dependent on unmonitored shallow aquifer');
      setDescription(
        'During early spring fertilizer applications, local residential tap water tests indicate nitrate concentrations exceeding 14 mg/L (EPA standard: 10 mg/L). Municipal treatment plant lacks real-time sensor notification to divert river flow before distribution pipelines fill.'
      );
      setMediaList([
        {
          id: 'preset-water-1',
          name: 'wellhead_nitrate_flourimeter_reading.jpg',
          url: '/src/assets/images/urban_water_sensor_1791563391292.jpg',
          size: '3.1 MB',
          type: 'image',
        },
      ]);
    } else if (presetType === 'energy') {
      setTitle('Senior Center High-Temperature Battery Islanding Failure');
      setCategory('Clean Energy');
      setLocation('East Denver Neighborhood District, CO');
      setAffectedPopulation('8,200 elderly and medically vulnerable individuals');
      setDescription(
        'Summer heatwaves exceeding 102°F frequently trigger localized circuit trips. The existing residential facility generator failed twice during brownouts. We require a distributed rooftop solar microgrid with autonomous battery switchgear.'
      );
      setMediaList([
        {
          id: 'preset-energy-1',
          name: 'rooftop_array_inspection.jpg',
          url: '/src/assets/images/community_solar_microgrid_1791563402614.jpg',
          size: '2.8 MB',
          type: 'image',
        },
      ]);
    } else {
      setTitle('Suburban Shift-Worker Night Transit Desert');
      setCategory('Urban Mobility');
      setLocation('South King County Corridor, WA');
      setAffectedPopulation('19,000 hospital custodians and logistics shift workers');
      setDescription(
        'Public bus lines discontinue service after 10:30 PM, leaving second and third shift hospital workers without transportation. Commuters spend up to 28% of their income on late-night ride-hailing.'
      );
      setMediaList([
        {
          id: 'preset-transit-1',
          name: 'transit_depot_scheduling.jpg',
          url: '/src/assets/images/smart_transit_rural_1791563415100.jpg',
          size: '2.1 MB',
          type: 'image',
        },
      ]);
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please provide at least a Problem Title and Description before analyzing.');
      return;
    }

    setSubmitError(null);
    setSubmittedChallenge(null);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate structured Catalyst AI decomposition
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        title,
        category,
        urgencyScore: 'Critical (Tier 1)',
        confidenceMetric: '96.4%',
        primarySystemicCause: `Intermittent threshold monitoring gap exacerbated by environmental seasonal shifts in ${location || 'the specified jurisdiction'}.`,
        suggestedDisciplines: [
          'Hydrological & Sensor Engineering',
          'Autonomous Embedded Telemetry',
          'Public Policy & Municipal Compliance',
          'Community Field Operations',
        ],
        matchedInstitutions: [
          'UC Davis College of Agricultural & Environmental Sciences',
          'Stanford Woods Institute for the Environment',
          'Pacific Northwest National Laboratory',
        ],
        sprintRoadmap: [
          { phase: 'Weeks 1–3', goal: 'Deploy optical telemetry bench and field calibrate sensors.' },
          { phase: 'Weeks 4–8', goal: 'Build student multidisciplinary hardware enclosure & telemetry backend.' },
          { phase: 'Weeks 9–12', goal: 'Establish municipal bypass protocol with regional water authority.' },
        ],
        projectedOutcome: `Immediate 85%+ decrease in detection latency; automated fail-safe protection for ${affectedPopulation || 'impacted civic population'}.`,
        evidenceCount: mediaList.length,
      });
    }, 1400);
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmittedChallenge(null);

    const submittedDescription = affectedPopulation.trim()
      ? `${description.trim()}\n\nAffected population estimate: ${affectedPopulation.trim()}`
      : description.trim();

    try {
      const response = await fetch(CHALLENGES_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          category,
          location: location.trim(),
          description: submittedDescription,
        }),
      });

      const responseText = await response.text();
      let responseBody: unknown = responseText;
      if (responseText) {
        try {
          responseBody = JSON.parse(responseText);
        } catch {
          responseBody = responseText;
        }
      }

      if (!response.ok) {
        const detail = getApiErrorMessage(responseBody);
        throw new Error(detail ?? `The server returned HTTP ${response.status}.`);
      }
      if (!isChallengeResponse(responseBody)) {
        throw new Error('The server response did not contain the expected challenge details.');
      }

      setSubmittedChallenge(responseBody);
      setChallenges((current) => [
        responseBody,
        ...current.filter((challenge) => challenge.id !== responseBody.id),
      ]);
    } catch (error) {
      setSubmitError(
        error instanceof TypeError
          ? `Could not connect to the backend at ${CHALLENGES_API_URL}. Make sure the FastAPI server is running.`
          : error instanceof Error
            ? error.message
            : 'An unexpected error occurred while submitting the challenge.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadChallenges = async () => {
    setIsLoadingChallenges(true);
    setChallengeListError(null);

    try {
      const response = await fetch(CHALLENGES_API_URL);
      const responseText = await response.text();
      let responseBody: unknown = responseText;
      if (responseText) {
        try {
          responseBody = JSON.parse(responseText);
        } catch {
          responseBody = responseText;
        }
      }

      if (!response.ok) {
        const detail = getApiErrorMessage(responseBody);
        throw new Error(detail ?? `The server returned HTTP ${response.status}.`);
      }
      if (!isChallengeResponseList(responseBody)) {
        throw new Error('The server response did not contain a valid challenge list.');
      }

      setChallenges(responseBody);
    } catch (error) {
      setChallengeListError(
        error instanceof TypeError
          ? `Could not connect to the backend at ${CHALLENGES_API_URL}. Make sure the FastAPI server is running.`
          : error instanceof Error
            ? error.message
            : 'An unexpected error occurred while retrieving challenges.'
      );
    } finally {
      setIsLoadingChallenges(false);
    }
  };

  return (
    <section id="report" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070709] border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5A623]">
              CIVIC PROBLEM INTAKE
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            REPORT A COMMUNITY PROBLEM
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            Submit an empirical community challenge. Catalyst will break down the problem, structure
            the technical requirements, and route it to matching academic labs and student cohorts.
          </p>

          {/* Preset Helper Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-neutral-500 uppercase">QUICK PRESETS:</span>
            <button
              type="button"
              onClick={() => loadPreset('water')}
              className="px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              River Water Runoff
            </button>
            <button
              type="button"
              onClick={() => loadPreset('energy')}
              className="px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              Senior Solar Microgrid
            </button>
            <button
              type="button"
              onClick={() => loadPreset('transit')}
              className="px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              Night Shift Transit Desert
            </button>
          </div>
        </div>

        {/* Main Form Box */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleAnalyze} className="space-y-8">
            {/* Row 1: Title and Category */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  PROBLEM TITLE <span className="text-[#F5A623]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Seasonal Nitrates Overwhelming Municipal Wellhead"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 focus:border-[#F5A623] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                />
              </div>

              <div className="md:col-span-4 space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  DOMAIN CATEGORY <span className="text-[#F5A623]">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 focus:border-[#F5A623] focus:outline-none text-white text-sm transition-colors cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-neutral-950 text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Location and Affected Population */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>LOCATION & JURISDICTION</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, County, or GPS Coordinates (e.g., 38.58° N, 121.49° W)"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 focus:border-[#F5A623] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                  <Users className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>AFFECTED POPULATION ESTIMATE</span>
                </label>
                <input
                  type="text"
                  value={affectedPopulation}
                  onChange={(e) => setAffectedPopulation(e.target.value)}
                  placeholder="e.g., ~45,000 residents across 3 agricultural townships"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 focus:border-[#F5A623] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Problem Description */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                EMPIRICAL PROBLEM DESCRIPTION <span className="text-[#F5A623]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail what is happening on the ground, why existing municipal tools fail, and what technical or community constraints must be honored..."
                className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 focus:border-[#F5A623] focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors leading-relaxed"
              />
            </div>

            {/* Row 4: Image Evidence Uploads (Prominent Experience) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300">
                  <ImageIcon className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>PHOTOGRAPHIC & VISUAL EVIDENCE</span>
                  <span className="text-neutral-500 font-normal">({mediaList.length} attached)</span>
                </label>
                <span className="text-[11px] font-mono text-neutral-500">
                  CRITICAL FOR AI FIELD DECOMPOSITION
                </span>
              </div>
              <p className="text-[11px] font-mono text-neutral-500">
                Evidence previews are not uploaded; the current API accepts challenge text fields only.
              </p>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-neutral-800 hover:border-[#F5A623]/60 rounded-xl p-6 text-center cursor-pointer transition-colors bg-neutral-900/30 hover:bg-neutral-900/60"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="p-3 rounded-full bg-neutral-800/80 text-neutral-300">
                    <Upload className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <p className="text-sm font-medium text-neutral-200">
                    Drag and drop photos here, or <span className="text-[#F5A623]">click to browse</span>
                  </p>
                  <p className="text-xs text-neutral-500">
                    Supports high-res PNG, JPG, or sensor camera export (Max 25MB each)
                  </p>
                </div>
              </div>

              {/* Image Previews with Remove Buttons */}
              {mediaList.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
                  {mediaList.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 aspect-video flex flex-col justify-end"
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMedia(item.id);
                        }}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/70 hover:bg-red-500 text-white transition-colors"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* File badge */}
                      <div className="relative z-10 p-2 text-[10px] font-mono text-neutral-300 truncate">
                        <span className="block truncate">{item.name}</span>
                        <span className="text-neutral-500">{item.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Row 5: Optional Video or Document Attachment */}
            <div className="pt-2 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <input
                  ref={docInputRef}
                  type="file"
                  accept=".pdf,.csv,.xlsx,.mp4,.mov"
                  onChange={handleDocUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Attach Document or Telemetry CSV (Optional)</span>
                </button>

                {optionalDocName && (
                  <span className="text-xs font-mono text-[#F5A623] truncate max-w-xs">
                    {optionalDocName}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#F5A623] hover:bg-[#ffb338] disabled:opacity-50 transition-all duration-200 shadow-[0_0_25px_rgba(245,166,35,0.25)] active:scale-[0.98]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>DECOMPOSING WITH CATALYST AI...</span>
                  </>
                ) : (
                  <>
                    <span>ANALYZE WITH CATALYST</span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                SAVED COMMUNITY CHALLENGES
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Retrieve reports saved by the backend.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLoadChallenges}
              disabled={isLoadingChallenges}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#F5A623] hover:bg-[#ffb338] disabled:opacity-50 transition-colors"
            >
              {isLoadingChallenges && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoadingChallenges ? 'Loading challenges...' : 'Load saved challenges'}
            </button>
          </div>

          {challengeListError && (
            <div role="alert" className="mt-4 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono">
              {challengeListError}
            </div>
          )}

          {challenges.length > 0 && (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {challenges.map((challenge) => (
                <article
                  key={challenge.id}
                  className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-semibold text-white">{challenge.title}</h4>
                    <span className="shrink-0 text-[10px] font-mono text-[#F5A623]">
                      {challenge.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-neutral-400">
                    {challenge.category} · {challenge.location}
                  </p>
                  <p className="mt-2 text-[11px] font-mono text-neutral-500">
                    {challenge.id}
                    {challenge.created_at
                      ? ` · ${new Date(challenge.created_at).toLocaleString()}`
                      : ''}
                  </p>
                </article>
              ))}
            </div>
          )}

          {!isLoadingChallenges && !challengeListError && challenges.length === 0 && (
            <p className="mt-4 text-xs text-neutral-500">
              Select “Load saved challenges” to retrieve reports from the backend.
            </p>
          )}
        </div>

        {/* AI Analysis Decomposition Output */}
        {analysisResult && (
          <div className="mt-10 rounded-2xl border border-[#F5A623]/40 bg-neutral-950 p-6 sm:p-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623] uppercase mb-1">
                  <span>LOCAL ANALYSIS PREVIEW</span>
                  <span>·</span>
                  <span className="text-neutral-400">NOT SUBMITTED</span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  {analysisResult.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded bg-[#F5A623]/10 border border-[#F5A623]/30 text-xs font-mono text-[#F5A623]">
                  {analysisResult.urgencyScore}
                </div>
              </div>
            </div>

            {/* Root Cause & Synthesis */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                SYSTEMIC ROOT CAUSE SYNTHESIS
              </span>
              <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                {analysisResult.primarySystemicCause}
              </p>
            </div>

            {/* Disciplines and Lab Matches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  RECOMMENDED ACADEMIC DISCIPLINES
                </span>
                <div className="space-y-2 text-xs">
                  {analysisResult.suggestedDisciplines.map((d: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  CANDIDATE RESEARCH LABS
                </span>
                <div className="space-y-2 text-xs">
                  {analysisResult.matchedInstitutions.map((inst: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 90-Day Execution Roadmap */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                90-DAY DEPLOYMENT ROADMAP
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {analysisResult.sprintRoadmap.map((road: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/50 border border-neutral-800">
                    <span className="text-xs font-mono text-[#F5A623] block mb-1">
                      {road.phase}
                    </span>
                    <span className="text-xs text-neutral-300">{road.goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Metric Projection & Confirmation Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-800">
              <div className="text-xs font-mono text-neutral-400">
                <span className="text-neutral-500 uppercase">PROJECTED CIVIC OUTCOME: </span>
                <span className="text-neutral-200">{analysisResult.projectedOutcome}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isSubmitting || Boolean(submittedChallenge)}
                  className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting challenge...
                    </span>
                  ) : submittedChallenge ? (
                    'Challenge submitted'
                  ) : (
                    'Submit challenge ↗'
                  )}
                </button>
              </div>
            </div>

            {submitError && (
              <div role="alert" className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Could not submit challenge: {submitError}</span>
              </div>
            )}

            {submittedChallenge && (
              <div role="status" className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Challenge submitted successfully. Backend ID: {submittedChallenge.id} · Status: {submittedChallenge.status}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
