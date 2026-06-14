import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from '../types';
import { Terminal, Send, Trash2, ShieldAlert, Cpu, Heart, Check } from 'lucide-react';

const STATIC_FILES = {
  'AGENTS.md': `# Agent Directives
- Role: Antigravity Code Architect
- Capabilities: Server-Authorized Synthesis
- Priority: Human Intent Execution
- Latency: 42ms overhead`,
  'rules.md': `# Workspace Rules
1. Respect UI layout constraints
2. Never leak private credentials
3. Ensure absolute compilation integrity
4. Exquisite font hierarchies ONLY`
};

export default function RetroTerminal() {
  const [activeFile, setActiveFile] = useState<keyof typeof STATIC_FILES | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: "System initialized - Welcome Nikunj.dev console v2.4", type: 'system', timestamp: "15:48:00" },
    { text: "Scanning active node configurations...", type: 'system', timestamp: "15:48:02" },
    { text: "No leaks found. Security status: SHIELD ACTIVE", type: 'command', timestamp: "15:48:05" }
  ]);
  const [commandInput, setCommandInput] = useState('');
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal container only to prevent outer window jumps
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Periodic automatic terminal activities to mimic a real system
  useEffect(() => {
    const simulationPhrases = [
      "Optimizing file indexing system metrics...",
      "Incoming request parsed successfully from port 3000.",
      "Garbage collection flushed 1.2MB memory buffers.",
      "Heartbeat ping verified: Docker container stable.",
      "Redux store state is fully synchronized."
    ];

    const interval = setInterval(() => {
      const randomPhrase = simulationPhrases[Math.floor(Math.random() * simulationPhrases.length)];
      appendLine(`> ${randomPhrase}`, 'system');
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const appendLine = (text: string, type: TerminalLine['type']) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0];
    setTerminalHistory(prev => [...prev, { text, type, timestamp }]);
  };

  const handleCommandSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    appendLine(`$ ${commandInput}`, 'command');
    setCommandInput('');

    // Custom router commands
    setTimeout(() => {
      switch (cmd) {
        case 'help':
          appendLine("Available commands: 'help', 'scan', 'praise', 'status', 'clear', 'cat <filename>'", 'system');
          break;
        case 'scan':
          appendLine("Scanning workspace security matrices...", 'system');
          setTimeout(() => {
            appendLine("SUCCESS: All workspace dependencies are clean! (0 vulnerabilities)", 'output');
          }, 400);
          break;
        case 'praise':
          appendLine("💖 NIKUNJ MODE IS ACTIVE: Slaying low-perf servers globally!", 'output');
          break;
        case 'status':
          appendLine("CONTAINER HOST: Cloud Run Sandbox Container Ready", 'system');
          appendLine("HEALTH CHECKS: PASSING (Port 3000 ingress online)", 'system');
          appendLine("ENGINE INGESTION: 10M+ operations/day", 'output');
          break;
        case 'clear':
          setTerminalHistory([]);
          break;
        case 'cat agents.md':
          clickFile('AGENTS.md');
          break;
        case 'cat rules.md':
          clickFile('rules.md');
          break;
        default:
          if (cmd.startsWith('cat ')) {
            const filename = cmd.substring(4).trim() as any;
            if (STATIC_FILES[filename]) {
              clickFile(filename);
            } else {
              appendLine(`ERROR: File '${filename}' not found. Try 'cat AGENTS.md'`, 'error');
            }
          } else {
            appendLine(`bash: command unknown: '${cmd}'. Type 'help' for support.`, 'error');
          }
      }
    }, 200);
  };

  const clickFile = (filename: keyof typeof STATIC_FILES) => {
    setActiveFile(filename);
    appendLine(`$ cat ${filename}`, 'command');
    const lines = STATIC_FILES[filename].split('\n');
    setTimeout(() => {
      lines.forEach((line, i) => {
        setTimeout(() => {
          appendLine(line, 'output');
        }, i * 60);
      });
    }, 150);
  };

  const handleShortcutCommand = (command: string) => {
    setCommandInput(command);
    setTimeout(() => {
      // Trigger submission simulated
      const originalInput = command;
      appendLine(`$ ${originalInput}`, 'command');
      
      // Execute simulated reaction
      if (originalInput === 'scan') {
        appendLine("Initiating high-throughput safety audits...", 'system');
        setTimeout(() => appendLine("STATUS: Secured, 0 bugs found.", 'output'), 400);
      } else if (originalInput === 'status') {
        appendLine("Ingress Node Metrics: 33 transactions/sec, 6ms median delay.", 'system');
      } else if (originalInput === 'clear') {
        setTerminalHistory([]);
      }
    }, 100);
  };

  return (
    <div id="retro-terminal" className="bg-[#8ff6d0] border-solid-neo p-6 md:p-8 neo-shadow flex flex-col h-[520px]">
      {/* Top Header Bars matching the original mockup decoration */}
      <div className="flex justify-between items-center pb-4 border-b-2 border-black border-dashed mb-4">
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ba1a1a] border-2 border-black" title="Nuke Server Node"></div>
          <div className="w-4 h-4 rounded-full bg-[#ffe600] border-2 border-black" title="Warm Halt Node"></div>
          <div className="w-4 h-4 rounded-full bg-[#006c52] border-2 border-black" title="Scale Up Node"></div>
        </div>
        <div className="font-mono text-xs font-black text-black">
          🟢 NIKUNJ-ENGINE@PROD
        </div>
      </div>

      {/* Main Terminal Split Body */}
      <div className="flex-grow grid grid-cols-12 gap-4 h-[340px] items-stretch overflow-hidden">
        {/* Left Side File Explorer */}
        <div className="col-span-4 border-r-3 border-black border-dashed pr-2 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs font-black text-[#002117] flex items-center gap-1 mb-2 select-none">
              📁 ROOT/
            </div>
            <div className="space-y-1.5 ml-2">
              {Object.keys(STATIC_FILES).map((fileName) => {
                const isSelected = activeFile === fileName;
                return (
                  <button
                    key={fileName}
                    onClick={() => clickFile(fileName as any)}
                    className={`block w-full text-left font-mono text-xs p-1 cursor-pointer transition ${
                      isSelected
                        ? 'bg-black text-[#8ff6d0] font-bold border-l-3 border-black'
                        : 'text-black hover:bg-[#a1f9da]'
                    }`}
                  >
                    ├── {fileName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xxs font-mono text-[#00513d] bg-white/40 p-1.5 border border-black/20 font-semibold select-none leading-relaxed">
            Click on file nodes to display source metadata! Or click shortcut commands beneath.
          </div>
        </div>

        {/* Right Side Console Display */}
        <div className="col-span-8 bg-black text-white p-3 font-mono text-xs flex flex-col justify-between h-full overflow-hidden border-2 border-black">
          <div ref={terminalContainerRef} className="overflow-y-auto flex-grow space-y-1.5 pr-1.5">
            {terminalHistory.map((line, ix) => (
              <div key={ix} className="leading-relaxed">
                <span className="text-gray-500 text-xxs font-semibold mr-1.5 select-none font-sans">
                  [{line.timestamp}]
                </span>
                <span className={
                  line.type === 'command' ? 'text-[#ffe600] font-bold' :
                  line.type === 'error' ? 'text-red-400 font-bold' :
                  line.type === 'system' ? 'text-[#8ff6d0]' : 'text-gray-200'
                }>
                  {line.text}
                </span>
              </div>
            ))}
          </div>

          {/* Prompt Form */}
          <form onSubmit={handleCommandSubmit} className="flex gap-2 items-center pt-2 border-t border-[#8ff6d0]/20 mt-1">
            <span className="text-[#ffe600] font-bold select-none">$</span>
            <input
              type="text"
              placeholder="Type 'help'..."
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              className="bg-transparent text-[#8ff6d0] outline-none flex-grow font-mono text-xs border-none focus:ring-0 p-0"
              spellCheck="false"
            />
            <button
              type="submit"
              className="text-[#8ff6d0] hover:text-white cursor-pointer active:scale-90 transition shrink-0"
              title="Execute command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Under Section: Helper Shortcuts */}
      <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t-2 border-black border-dashed">
        <span className="font-mono text-xs font-bold self-center mr-1 uppercase text-[#002117]">
          Matrix Shortcuts:
        </span>
        <button
          onClick={() => handleShortcutCommand('scan')}
          className="bg-white text-xs font-mono font-bold px-2.5 py-1 border-2 border-black cursor-pointer hover:bg-black hover:text-[#8ff6d0] transition-colors"
        >
          scan-workspace
        </button>
        <button
          onClick={() => handleShortcutCommand('status')}
          className="bg-white text-xs font-mono font-bold px-2.5 py-1 border-2 border-black cursor-pointer hover:bg-black hover:text-[#8ff6d0] transition-colors"
        >
          query-metrics
        </button>
        <button
          onClick={() => handleShortcutCommand('clear')}
          className="bg-white text-xs font-mono font-bold px-2.5 py-1 border-2 border-black cursor-pointer hover:bg-[#ba1a1a] hover:text-white transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" /> Clear
        </button>
      </div>
    </div>
  );
}
