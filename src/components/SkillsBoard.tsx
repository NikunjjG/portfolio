import React, { useState } from 'react';
import { Skull, Dumbbell, CookingPot, Plus, FileCode, CheckCircle, Tag, Shuffle } from 'lucide-react';
import { SkillItem } from '../types';

const INITIAL_SKILLS: SkillItem[] = [
  { name: "React", category: "core", description: "3+ years modeling fluid component loops and lazy virtualization. Author of custom rendering optimizations that bypass layout thrashing.", icon: "atom", colorClass: "bg-white" },
  { name: "TypeScript", category: "core", description: "Pragmatic strict-type champion. Drafts complex self-documenting mapped types, deep-inferring generics, and bulletproof CJS compilation rules.", icon: "code", colorClass: "bg-[#ffe600]" },
  {
    name: "Docker",
    category: "infra",
    description: "Learning Docker by containerizing everything in sight. Builds lightweight environments and isolates dependencies so chaos stays politely contained.",
    icon: "terminal",
    colorClass: "bg-[#8ff6d0]"
  },
  { name: "Redux", category: "core", description: "Strict deterministic states. Configures efficient slice protocols, robust side-effects, and middleware action monitors that never skip a heartbeat.", icon: "cpu", colorClass: "bg-[#ffdaf4]" },
  { name: "YAML", category: "infra", description: "Indent level master. Architect of production-ready Kubernetes deploy pipelines, routing charts, and GitHub Action workflows that run flawlessly.", icon: "file-text", colorClass: "bg-white" },
  // { name: "GraphQL", category: "core", description: "Slashes API over-fetching by 90%. Designs elegant schemas, dataloader query batches, and client caches that minimize mobile radios consumption.", icon: "shuffle", colorClass: "bg-[#ffe600]" },
  // { name: "Cooking", category: "lifestyle", description: "Culinary synthesis. Master of high-octane wok cooking, precise hydration ratios for sourdough starters, and dry-aged bone-in ribeyes.", icon: "cooking-pot", colorClass: "bg-[#8ff6d0]" },
  // { name: "Deadlifts", category: "lifestyle", description: "Defies linear gravitational pulls. Personal best: 405 lbs single rep. Translates pure physical force directly into relentless build server optimizations.", icon: "dumbbell", colorClass: "bg-[#ffdaf4]" }
];

const STICKER_COLORS = [
  { label: "Stark White", class: "bg-white text-black" },
  { label: "Sunbeam Yellow", class: "bg-[#ffe600] text-black" },
  { label: "Mint Green", class: "bg-[#8ff6d0] text-black" },
  { label: "Neon Pink", class: "bg-[#ffdaf4] text-black" }
];

export default function SkillsBoard() {
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'core' | 'infra' | 'lifestyle'>('all');

  // Interactive sticker inclusion builder state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'core' | 'infra' | 'lifestyle'>('core');
  const [newSkillDesc, setNewSkillDesc] = useState('');
  const [newSkillColor, setNewSkillColor] = useState('bg-white');

  const handleAddCustomSticker = (e: React.FormEvent) => {
    e.preventDefault();
    const nameStr = newSkillName.trim();
    if (!nameStr) return;

    const item: SkillItem = {
      name: nameStr,
      category: newSkillCategory,
      description: newSkillDesc.trim() || `Custom developer stamp: Nikunj's stack integrated with ${nameStr} certified deployment!`,
      icon: 'star',
      colorClass: newSkillColor
    };

    setSkills(prev => [...prev, item]);
    setSelectedSkill(item); // Highlight newly created sticker
    setNewSkillName('');
    setNewSkillDesc('');
  };

  const filteredSkills = skills.filter(
    (s) => filterCategory === 'all' || s.category === filterCategory
  );

  return (
    <div id="skills-board-container" className="space-y-12">

      {/* Filters Sub-header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black border-dashed pb-4 select-none">
        <div className="flex flex-wrap gap-2.5">
          {(['all', 'core', 'infra', 'lifestyle'] as const).map((cat) => {
            const isActive = filterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 font-mono text-xs font-black uppercase border-2 border-black cursor-pointer transition select-none ${isActive ? 'bg-black text-[#ffe600]' : 'bg-white text-black hover:bg-neutral-50'
                  }`}
              >
                {cat === 'all' ? 'All Stickers' : `${cat} stamp`}
              </button>
            );
          })}
        </div>

        <div className="text-xxs font-mono text-stone-500 font-bold uppercase">
          ⚡ Tap any sticker below to inspect skill narrative!
        </div>
      </div>

      {/* Main Grid: left interactive stickers cloud vs right inspector detail / creator form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Side: Layout collage of stickers */}
        <div className="lg:col-span-8 flex flex-wrap justify-center gap-6 py-6 border-2 border-black border-dashed bg-white/40 min-h-[380px] content-center relative select-none">
          <div className="absolute top-2 left-3 font-mono text-xxs font-black text-gray-400 uppercase">
            📌 STICKER ALBUM BOARD
          </div>

          {filteredSkills.map((ski, index) => {
            const isHighlighted = selectedSkill?.name === ski.name;

            // Generate deterministic rotate angle based on indices to keep it solid without hydration flashes
            const rotValues = [-4, 6, -8, 5, -12, 10, -5, 8, -6, 4];
            const rotAngle = rotValues[index % rotValues.length];

            return (
              <button
                key={ski.name}
                onClick={() => setSelectedSkill(ski)}
                className={`wobble-animation bg-white border-solid-neo p-5 md:p-6 cursor-pointer select-none relative group transform transition-all ${ski.colorClass} ${isHighlighted
                    ? 'scale-115 rotate-[2deg] ring-3 ring-[#006c52] z-30 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
                    : 'hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                style={{
                  transform: isHighlighted ? 'rotate(1deg) scale(1.1)' : `rotate(${rotAngle}deg)`,
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-xl md:text-2xl uppercase select-none">
                    {ski.name}
                  </span>
                </div>
                {isHighlighted && (
                  <span className="absolute -top-2.5 -right-2 bg-black text-[#ffe600] px-1.5 py-0.5 border border-black font-mono text-[9px] font-black uppercase scale-90">
                    OPEN
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side Stack: Detail Inspector Card & Sticker Minting Creator Form */}
        <div className="lg:col-span-4 space-y-6">

          {/* Sticker Inspector Detail Box */}
          {selectedSkill ? (
            <div className="bg-[#8ff6d0] border-solid-neo p-6 neo-shadow relative animate-fade-in text-black">
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-2 right-2 font-black font-mono text-xs uppercase bg-white border-2 border-black px-1.5 text-black hover:bg-black hover:text-white cursor-pointer"
              >
                X
              </button>

              <div className="flex gap-1.5 items-center mb-1 select-none">
                <span className="bg-black text-[#8ff6d0] border border-black px-1.5 py-0.5 font-mono text-[9px] font-black uppercase">
                  ACTIVE SPEC
                </span>
                <span className="text-xs font-mono font-bold text-[#00513d] uppercase">
                  {selectedSkill.category} category
                </span>
              </div>

              <h4 className="font-display font-black text-2xl uppercase mt-2 select-text">
                {selectedSkill.name}
              </h4>

              <p className="font-sans text-xs md:text-sm font-semibold text-neutral-800 leading-relaxed mt-2.5 select-text">
                {selectedSkill.description}
              </p>

              <div className="mt-4 pt-3 border-t border-black/10 flex justify-between items-center select-none">
                <span className="text-[10px] font-mono font-black uppercase text-neutral-600">
                  Nikunj Verified Stack Item
                </span>
                <span className="text-xs">✅</span>
              </div>
            </div>
          ) : (
            <div className="border-dashed-neo bg-white/60 p-6 text-center text-gray-500 font-mono text-xs font-bold py-12 flex flex-col justify-center items-center gap-2">
              <Plus className="w-6 h-6 animate-pulse text-stone-400" />
              <span>INSPECT MODE EMPTY</span>
              <p className="font-sans font-medium text-[11px] text-gray-400 max-w-xxs uppercase">
                Tap on any sticker block on the left board grid to inspect its custom engineering review!
              </p>
            </div>
          )}

          {/* Sticker Creator Block form */}
          <div className="bg-[#ffdaf4] border-solid-neo p-6 neo-shadow">
            <h4 className="font-display font-black text-lg uppercase text-black mb-3 flex items-center gap-1.5">
              🎨 STICK A NEW SKILL!
            </h4>

            <form onSubmit={handleAddCustomSticker} className="space-y-3 font-mono text-xs text-black">
              <div>
                <label className="block font-bold mb-1 uppercase">Sticker Badge Title:</label>
                <input
                  type="text"
                  placeholder="e.g., Kubernetes, Golang"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  maxLength={18}
                  className="w-full bg-white border-2 border-black p-2 outline-none font-bold placeholder-stone-400 rounded-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1 uppercase">Category:</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="w-full bg-white border-2 border-black p-2 outline-none font-semibold rounded-none text-xs cursor-pointer"
                  >
                    <option value="core">Core Tech</option>
                    <option value="infra">Infra Node</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 uppercase">Theme Paint:</label>
                  <select
                    value={newSkillColor}
                    onChange={(e) => setNewSkillColor(e.target.value)}
                    className="w-full bg-white border-2 border-black p-2 outline-none font-semibold rounded-none text-xs cursor-pointer"
                  >
                    {STICKER_COLORS.map(col => (
                      <option key={col.class} value={col.class}>{col.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 uppercase">Commentary / Description:</label>
                <textarea
                  placeholder="How do you apply this skill?"
                  value={newSkillDesc}
                  onChange={(e) => setNewSkillDesc(e.target.value)}
                  maxLength={160}
                  className="w-full bg-white border-2 border-black p-2 outline-none font-medium h-16 resize-none rounded-none text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffe600] text-black font-black uppercase py-2 border-2 border-black hover:bg-yellow-400 transition cursor-pointer text-center text-xs"
              >
                + Affix Sticker
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
