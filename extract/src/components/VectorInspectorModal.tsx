import React from 'react';
import { X, RotateCcw, Sliders, Check } from 'lucide-react';

interface VectorInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    text: string;
    accent: string;
    reach: number;
    speed: number;
    damping: number;
    showLabels: boolean;
  };
  onChange: (updated: any) => void;
  onReset: () => void;
}

export default function VectorInspectorModal({
  isOpen,
  onClose,
  config,
  onChange,
  onReset,
}: VectorInspectorModalProps) {
  if (!isOpen) return null;

  const accentOptions = [
    { name: 'Catalyst Amber', value: '#F5A623' },
    { name: 'Refined Silver', value: '#E2E8F0' },
    { name: 'Electric Cyan', value: '#38BDF8' },
    { name: 'Pure White', value: '#FFFFFF' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl p-6 space-y-6 text-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#F5A623]" />
            <h3 className="font-bold text-white uppercase tracking-wider text-xs font-mono">
              Vector Wordmark Studio
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onReset}
              className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
              title="Reset defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-5 font-mono text-xs">
          {/* Wordmark Text */}
          <div className="space-y-1.5">
            <label className="text-neutral-400 uppercase text-[11px]">Wordmark Text</label>
            <input
              type="text"
              value={config.text}
              onChange={(e) => onChange({ text: e.target.value.toUpperCase() })}
              placeholder="CATALYST"
              maxLength={12}
              className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white focus:border-[#F5A623] focus:outline-none"
            />
          </div>

          {/* Accent Color Palette */}
          <div className="space-y-1.5">
            <label className="text-neutral-400 uppercase text-[11px]">Accent Tone</label>
            <div className="grid grid-cols-2 gap-2">
              {accentOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ accent: opt.value })}
                  className={`flex items-center gap-2 p-2 rounded border transition-colors ${
                    config.accent.toLowerCase() === opt.value.toLowerCase()
                      ? 'border-[#F5A623] bg-neutral-900 text-white'
                      : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/40 shrink-0"
                    style={{ backgroundColor: opt.value }}
                  />
                  <span className="truncate text-[11px]">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reach Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400">
              <span className="uppercase text-[11px]">Reach (px)</span>
              <span className="text-white">{config.reach}</span>
            </div>
            <input
              type="range"
              min={100}
              max={500}
              step={10}
              value={config.reach}
              onChange={(e) => onChange({ reach: Number(e.target.value) })}
              className="w-full accent-[#F5A623] cursor-pointer"
            />
          </div>

          {/* Speed Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400">
              <span className="uppercase text-[11px]">Speed</span>
              <span className="text-white">{config.speed}</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={config.speed}
              onChange={(e) => onChange({ speed: Number(e.target.value) })}
              className="w-full accent-[#F5A623] cursor-pointer"
            />
          </div>

          {/* Damping Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400">
              <span className="uppercase text-[11px]">Damping (%)</span>
              <span className="text-white">{config.damping}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={90}
              step={5}
              value={config.damping}
              onChange={(e) => onChange({ damping: Number(e.target.value) })}
              className="w-full accent-[#F5A623] cursor-pointer"
            />
          </div>

          {/* Coordinate Labels Toggle */}
          <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
            <span className="text-neutral-400 uppercase text-[11px]">Vector Coordinates</span>
            <button
              type="button"
              onClick={() => onChange({ showLabels: !config.showLabels })}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-200 ${
                config.showLabels ? 'bg-[#F5A623]' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`bg-black w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-200 ${
                  config.showLabels ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-2 border-t border-neutral-800 text-[10px] font-mono text-neutral-500 leading-normal">
          OriginKit WebGL Vector Wordmark Engine · Adapted for Catalyst Societal Innovation Platform.
        </div>
      </div>
    </div>
  );
}
