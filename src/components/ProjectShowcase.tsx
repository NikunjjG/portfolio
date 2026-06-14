import { useState } from 'react';
import { Project } from '../types';
import { Trophy, Star } from 'lucide-react';

const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "PixMailer",
    tagline: "High-Throughput Campaign Router",
    description: "It’s not on production, the code is held together by hope, and 10M+ emails would probably melt my laptop. But hey, it works on my machine.",
    image: "/img/pixmailer.jpg",
    narrative: "What it Actually Does (Between Crashes)\n\n" +
      "**The Ultimate Nodemailer Dressing Gown:** Wrapped a basic mailing utility in enough React, Express, and Tailwind to make it look like a real SaaS product.\n\n" +
      "**The \"Drag-Drop-and-Pray\" Builder:** An intuitive visual canvas to craft newsletters. You drag, you drop, Node.js does some heavy lifting behind the curtains, and an email actually goes out. Magic.\n\n" +
      "**Bulk Roster Ingestion:** You can single-handedly upload an Excel sheet of subscribers. Does it handle enterprise scale? Absolutely not. Will it loop through a couple hundred rows without a memory leak? Usually!\n\n" +
      "**Personalization Protocol:** Dynamically slaps the recipient's name into the email so they think a real human sent it, instead of a script running on a localhost port.",
    metrics: [
      { label: "Max Capacity", value: "Local RAM limit" },
      { label: "Deployment", value: "Localhost Only" }
    ],
    tags: ["REACT", "NODE.JS", "EXPRESS", "NODEMAILER"],
    bannerUrl: "PROJECT 01"
  }
];

export default function ProjectShowcase() {
  const [activeProjIndex, setActiveProjIndex] = useState(0);
  const activeProj = PROJECTS_DATA[activeProjIndex];

  // Tag filter highlighting state
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  return (
    <div id="project-showcase-container" className="flex flex-col gap-10">

      {/* Switcher Tabs header */}
      <div className="flex flex-wrap gap-4 items-center">
        <span className="font-mono text-xs font-black uppercase text-gray-500 mr-2 select-none">
          📡 Switch Live Project Decks:
        </span>
        {PROJECTS_DATA.map((p, idx) => {
          const isActive = idx === activeProjIndex;
          return (
            <button
              key={p.id}
              onClick={() => setActiveProjIndex(idx)}
              className={`px-4 py-2 font-mono text-xs font-black uppercase border-2 border-black tracking-wider cursor-pointer transition select-none ${isActive
                ? 'bg-black text-[#ffe600] translate-x-[-2px] translate-y-[-2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black hover:bg-neutral-100 hover:shadow-sm'
                }`}
            >
              Deck {idx + 1}: {p.title}
            </button>
          );
        })}
      </div>

      {/* Main Core Showcase Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

        {/* Left Side: Mockup Card */}
        <div className="bg-white border-solid-neo neo-shadow flex flex-col justify-between group">
          {/* Static Image banner */}
          <div className="h-72 overflow-hidden relative border-b-3 border-black select-none">
            <img
              src={activeProj.image}
              alt={activeProj.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            {/* Project Sticker Badge */}
            <div className="absolute top-4 right-4 bg-[#ffe600] border-2 border-black px-4 py-1.5 font-display font-black text-xs rotate-[8deg] neo-flat-shadow uppercase">
              {activeProj.bannerUrl}
            </div>
          </div>

          {/* Project Copy */}
          <div className="p-6 md:p-8 flex-grow flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-neutral-100 border border-black/40 text-[9px] font-mono px-1.5 py-0.5 font-bold uppercase text-gray-600 rounded-none">
                  Core Release
                </span>
                <span className="text-gray-400 font-mono text-[10px]">• PROD STABLE</span>
              </div>
              <h3 className="font-display font-black text-3xl md:text-4xl text-black leading-none mb-2 select-text">
                {activeProj.title}
              </h3>
              <p className="font-mono text-xs font-black text-[#006c52] mb-3 uppercase tracking-wide">
                {activeProj.tagline}
              </p>
              <p className="font-sans text-xs md:text-sm text-neutral-700 leading-relaxed font-semibold">
                {activeProj.description}
              </p>
            </div>

            {/* Tags footer block */}
            <div className="flex flex-wrap gap-2.5 mt-6 pt-6 border-t-2 border-dashed border-gray-200">
              {activeProj.tags.map((tag) => {
                const isHovered = hoveredTag === tag;
                return (
                  <span
                    key={tag}
                    onMouseEnter={() => setHoveredTag(tag)}
                    onMouseLeave={() => setHoveredTag(null)}
                    className={`border-2 border-black px-3 py-1 font-mono text-xxs font-black tracking-widest cursor-default select-none uppercase transition-transform ${isHovered ? 'bg-[#ffe600] scale-110 rotate-3' : 'bg-[#ffdaf4] hover:-rotate-3'
                      }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Narrative Quote & Metric statistics cards */}
        <div className="flex flex-col justify-between items-stretch gap-6">

          {/* Project narrative box */}
          <div className="bg-[#006c52] p-8 border-dashed-neo neo-shadow flex-grow flex flex-col justify-center relative">
            <div className="absolute -top-3.5 -left-3 bg-white border-2 border-black px-2 py-0.5 font-mono text-xxs font-black rotate-[-4deg] text-black tracking-wider shadow-sm select-none uppercase flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-[#006c52]" /> ARCHITECT COMMENTARY
            </div>

            {activeProj.narrative.split("\n\n").map((block, i) => (
              <p key={i} className="text-white font-sans text-lg md:text-xl font-bold tracking-tight italic leading-relaxed select-text">
                {block}
              </p>
            ))}

            <div className="mt-4 font-mono text-[10px] text-emerald-200 font-black tracking-widest flex items-center gap-1.5 select-none hover:rotate-1 transition-transform">
              <Star className="w-3.5 h-3.5 fill-current text-white animate-spin" />
              NIKUNJ WORKSPACE REPORT // DEPLOY CERTIFIED ✅
            </div>
          </div>

          {/* Dynamic dynamic stats cards */}
          <div className="grid grid-cols-2 gap-4">
            {activeProj.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className="bg-white border-solid-neo neo-shadow p-6 text-center select-none flex flex-col justify-center items-center group hover:bg-neutral-50 transition"
              >
                <div className="text-3xl md:text-4xl font-black text-[#6a5f00] font-sans group-hover:scale-105 transition-transform">
                  {metric.value}
                </div>
                <div className="font-mono text-[9px] font-black text-gray-500 uppercase mt-1 tracking-wider leading-none">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
