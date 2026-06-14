import { useState, useEffect } from 'react';
import { Zap, Flame, Shield, ArrowRight, RotateCcw, Activity } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
}

const OPTIM_LOGS = [
  "FLUSHING GHOST DATABASES...",
  "FLIPPING HIGH-CONTRAST SWITCH...",
  "COMPRESSING IMAGE OVERHEADS BY 80%...",
  "TURNING OFF UNUSED HMR WEBSOCKETS...",
  "CRAFTING INTERACTIVE COMIC COLLAGES...",
  "OPTIMIZING SCALE PROTOCOL WITH KUBERNETES...",
  "FLUSHING PORT 3000 EGRESS CHANNELS...",
  "SUCCESS: NIKUNJ MODE ACTIVE!"
];

export default function OptimizationEngine() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentLog, setCurrentLog] = useState("");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [wittyMessage, setWittyMessage] = useState("");

  const triggerOptimize = () => {
    if (isOptimizing) return;
    
    setIsOptimizing(true);
    setIsOptimized(false);
    setWittyMessage("");
    
    // Log ticker sequence
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < OPTIM_LOGS.length) {
        setCurrentLog(OPTIM_LOGS[logIndex]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        
        // Final optimization complete trigger
        setIsOptimizing(false);
        setIsOptimized(true);
        setCurrentLog("OPTIMIZED! LATENCY DROP DETECTED!");
        setWittyMessage("ZAP! BAM! POW! SYSTEM FULLY TUNED!");
        spawnParticles();
      }
    }, 450);
  };

  const resetEngine = () => {
    setIsOptimized(false);
    setIsOptimizing(false);
    setCurrentLog("");
    setWittyMessage("");
    setParticles([]);
  };

  const spawnParticles = () => {
    const colors = ['#ffe600', '#006c52', '#ba1a1a', '#87487d', '#8ff6d0', '#ffdaf4'];
    const generatedParticles: Particle[] = Array.from({ length: 45 }).map((_, i) => ({
      id: Math.random() + i,
      x: 50, // center-relative percent
      y: 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 24 + 10,
      angle: Math.random() * 360,
      distance: Math.random() * 160 + 80
    }));
    setParticles(generatedParticles);

    // Auto clean up particles after 1.5 seconds
    setTimeout(() => {
      setParticles([]);
    }, 1800);
  };

  return (
    <div id="optimization-engine-widget" className="bg-white border-solid-neo p-8 md:p-12 neo-shadow flex flex-col items-center relative overflow-hidden select-none">
      
      {/* Background Grid Pattern to lock in the brutalist structural layout */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Comic Book burst particles layer */}
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <div
            key={p.id}
            className="absolute border border-black font-black flex items-center justify-center transition-all duration-1000 ease-out z-20 pointer-events-none"
            style={{
              left: `calc(50% + ${tx}px)`,
              top: `calc(50% + ${ty}px)`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              transform: `rotate(${p.angle}deg) scale(0)`,
              animation: 'explode 1.2s forwards'
            }}
          >
            <span className="text-[9px] font-mono block rotate-12">POP</span>
          </div>
        );
      })}

      {/* Styled inline animation for the particle explosions */}
      <style>{`
        @keyframes explode {
          0% { transform: scale(1) rotate(0deg); opacity: 1; }
          100% { transform: scale(1.6) rotate(270deg); opacity: 0; }
        }
      `}</style>

      {/* Headline Banner */}
      <div className="text-center mb-8 relative z-10 w-full max-w-xl">
        <div className="flex justify-center items-center gap-1.5 mb-2 font-mono text-xs font-black text-gray-500 uppercase tracking-widest">
          <Activity className="w-4 h-4 text-[#006c52]" />
          Infrastructure Diagnostic Level
        </div>
        <h3 className="font-display font-black text-3xl md:text-4xl text-black uppercase tracking-tight">
          Optimization Engine
        </h3>
        <p className="font-mono text-xs mt-1 text-gray-600 font-bold">
          Click the core cell to trigger physical memory compaction and pipeline shifts!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full z-10">
        
        {/* BEFORE stats panel */}
        <div className="text-center">
          <div className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            BEFORE STATUS
          </div>
          <div className="w-28 h-28 bg-[#ffdad6] border-solid-neo flex flex-col items-center justify-center text-[#ba1a1a] transition relative group">
            <span className="font-display font-black text-4xl">42</span>
            <span className="font-mono text-[9px] font-black uppercase mt-1">MS Latency</span>
            <Flame className="w-3.5 h-3.5 absolute top-1.5 right-1.5 text-red-600" />
          </div>
        </div>

        {/* Optimizing core triggers */}
        <div className="flex flex-col items-center justify-center min-w-[280px]">
          {!isOptimized && !isOptimizing && (
            <button
              id="optimize-trigger"
              onClick={triggerOptimize}
              className="bg-[#ffe600] border-solid-neo neo-shadow px-10 py-5 font-display font-black text-xl uppercase cursor-pointer select-none active:scale-95 transition-transform text-black flex items-center gap-2"
            >
              <Zap className="w-6 h-6 animate-pulse" /> Optimize!
            </button>
          )}

          {isOptimizing && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 border-4 border-dashed border-black border-t-transparent animate-spin"></div>
              <p className="font-mono text-xs font-black text-black bg-[#ffe600] px-2 py-1 border-2 border-black animate-bounce mt-2 text-center max-w-xs">
                {currentLog}
              </p>
            </div>
          )}

          {isOptimized && (
            <div className="flex flex-col items-center gap-3">
              <span className="bg-black text-[#8ff6d0] text-lg font-display font-black px-6 py-2 border-2 border-black rotate-[-2deg] select-none text-center">
                {wittyMessage}
              </span>
              <button
                onClick={resetEngine}
                className="text-xs font-mono font-bold bg-[#ffdaf4] hover:bg-pink-200 border-2 border-black px-3 py-1 cursor-pointer flex items-center gap-1 active:translate-y-0.5 select-none"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Core Metrics
              </button>
            </div>
          )}
        </div>

        {/* AFTER stats panel */}
        <div className="text-center">
          <div className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            AFTER STATUS
          </div>
          <div className={`w-28 h-28 border-solid-neo flex flex-col items-center justify-center transition-all duration-300 relative ${
            isOptimized 
              ? 'bg-[#8ff6d0] text-[#006c52] rotate-[4deg]'
              : 'bg-neutral-100 text-neutral-400'
          }`}>
            <span className="font-display font-black text-4xl">
              {isOptimized ? '99' : '??'}
            </span>
            <span className="font-mono text-[9px] font-black uppercase mt-1">
              {isOptimized ? 'Scale Score' : 'PROBING...'}
            </span>
            <Shield className={`w-3.5 h-3.5 absolute top-1.5 right-1.5 ${
              isOptimized ? 'text-[#006c52]' : 'text-neutral-400'
            }`} />
          </div>
        </div>

      </div>

      {/* Progress timeline diagnostic log metrics */}
      {isOptimizing && (
        <div className="w-full max-w-md bg-stone-100 p-2 border-2 border-black border-dashed mt-6 text-center">
          <div className="font-mono text-[10px] text-stone-600 font-bold flex justify-center items-center gap-1.5">
            <span className="animate-ping block w-1.5 h-1.5 rounded-full bg-red-600"></span>
            SYS: MEMORY ALLOCATION ADJUSTED IN REAL-TIME
          </div>
        </div>
      )}
    </div>
  );
}
