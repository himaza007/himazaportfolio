'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'overview' | 'stack' | 'cli';

interface CommandLog {
  command: string;
  response: string;
}

export function Hero() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    { command: 'system.init()', response: 'Environment initialized. Ready for commands.' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // CLI Command Interpreter
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let res = '';
    if (cmd === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else if (cmd === 'help') {
      res = 'Available commands: whoami, stack, contact, projects, status, clear';
    } else if (cmd === 'whoami') {
      res = 'Himaza Zahara - Fullstack Developer & Brand Strategist.';
    } else if (cmd === 'stack') {
      res = 'Next.js 16, React 19, Three.js, TypeScript, Tailwind CSS, PostgreSQL.';
    } else if (cmd === 'contact') {
      res = 'Direct Channel: hello@himazazahara.dev | GitHub: @himazazahara';
    } else if (cmd === 'projects') {
      res = 'Navigating to #projects section...';
      if (typeof window !== 'undefined') window.location.hash = '#projects';
    } else if (cmd === 'status') {
      res = 'System status: 100% Operational. WebGL Atmosphere: Active.';
    } else {
      res = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setLogs((prev) => [...prev, { command: inputVal, response: res }]);
    setInputVal('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <section id="hero" className="relative z-10 px-4 pt-20 pb-8 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-screen">
      {/* Ambient Glass Glow Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-xl bg-gradient-to-r from-[#99E1D9]/15 via-transparent to-[#3A1C5C]/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Sleek Glass Console Container */}
      <div className="w-full relative rounded-2xl bg-gradient-to-b from-white/[0.08] via-[#0B0512]/50 to-[#0B0512]/75 backdrop-blur-2xl border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(153,225,217,0.08)] overflow-hidden transition-all duration-300 hover:border-[#99E1D9]/30">
        
        {/* Glass Header Window Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] backdrop-blur-md border-b border-white/10 font-mono text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/90 shadow-[0_0_6px_rgba(255,95,86,0.5)] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/90 shadow-[0_0_6px_rgba(255,189,46,0.5)] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/90 shadow-[0_0_6px_rgba(39,201,63,0.5)] inline-block" />
            <span className="ml-2.5 text-gray-300 font-medium tracking-wider text-[11px]">/DEV/TTY01 ~ HIMAZA-SHELL</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[#99E1D9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#99E1D9] shadow-[0_0_6px_#99E1D9] animate-pulse" />
            <span className="tracking-widest text-[9px] uppercase font-semibold">SYS.ONLINE</span>
          </div>
        </div>

        {/* Interactive Tab Navigation Bar */}
        <div className="flex items-center space-x-1 px-4 py-1.5 border-b border-white/10 bg-black/20 font-mono text-[11px] overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'overview'
                ? 'bg-[#99E1D9]/15 text-[#99E1D9] border border-[#99E1D9]/30 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            01. OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'stack'
                ? 'bg-[#99E1D9]/15 text-[#99E1D9] border border-[#99E1D9]/30 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            02. TECH_STACK
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'cli'
                ? 'bg-[#99E1D9]/15 text-[#99E1D9] border border-[#99E1D9]/30 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            03. CLI_CONSOLE
          </button>
        </div>

        {/* Console Body Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-5"
              >
                {/* Command Prompt */}
                <div className="font-mono text-xs text-[#99E1D9] tracking-wider flex items-center space-x-2">
                  <span>$ WHOAMI --VERBOSE | API_ID: 007</span>
                </div>

                {/* Main Hero Header */}
                <div className="space-y-2.5">
                  <h1 className="font-serif italic text-3xl sm:text-5xl text-white font-normal tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
                    Himaza Zahara
                  </h1>
                  <p className="font-mono text-base sm:text-lg text-white font-medium">
                    Fullstack Developer <span className="text-[#99E1D9]">&amp;</span> Brand Strategist
                  </p>
                  <p className="font-mono text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                    Bridging high-performance fullstack engineering with strategic brand growth.
                  </p>
                </div>

                {/* Command Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="#projects"
                    className="px-5 py-2.5 rounded-full bg-[#99E1D9] text-[#0B0512] font-mono text-xs font-bold hover:bg-white hover:shadow-[0_0_15px_rgba(153,225,217,0.4)] transition-all flex items-center space-x-2"
                  >
                    <span>&gt; ./view_work.sh</span>
                    <span>&rarr;</span>
                  </a>
                  <a
                    href="#contact"
                    className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/20 font-mono text-xs font-medium transition-all backdrop-blur-md"
                  >
                    &gt; ./contact.cmd
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'stack' && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-4 font-mono"
              >
                <div className="text-xs text-[#99E1D9]">$ cat capabilities.json</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[#99E1D9] font-bold block">[CORE_FRONTEND]</span>
                    <p className="text-[11px] leading-relaxed">Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS, Framer Motion</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[#99E1D9] font-bold block">[WEBGL_ATMOSPHERE]</span>
                    <p className="text-[11px] leading-relaxed">Three.js, React-Three-Fiber (R3F), Drei, Custom Shaders, Particle Systems</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[#99E1D9] font-bold block">[BACKEND_DATA]</span>
                    <p className="text-[11px] leading-relaxed">Node.js, PostgreSQL, Prisma, GraphQL, REST Telemetry, Edge API Routes</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[#99E1D9] font-bold block">[BRAND_STRATEGY]</span>
                    <p className="text-[11px] leading-relaxed">Visual Architecture, CLI UI/UX, Design Systems, Strategic Positioning</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'cli' && (
              <motion.div
                key="cli"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="max-h-40 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/20">
                  <div className="text-gray-400 text-[11px]">
                    Type <span className="text-[#99E1D9]">help</span> for interactive CLI commands.
                  </div>
                  {logs.map((log, index) => (
                    <div key={index} className="space-y-0.5 text-[11px]">
                      <div className="text-[#99E1D9] flex items-center space-x-1.5">
                        <span>usr@tty01:~$</span>
                        <span>{log.command}</span>
                      </div>
                      <div className="text-gray-300 pl-3">{log.response}</div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                <form onSubmit={handleCommandSubmit} className="pt-3 border-t border-white/10 flex items-center space-x-2">
                  <span className="text-[#99E1D9] font-bold">&gt;</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type a command ('help', 'whoami', 'clear')..."
                    className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-gray-500"
                  />
                  <button type="submit" className="px-3 py-1 bg-[#99E1D9] text-[#0B0512] font-bold rounded-md text-[10px] hover:bg-white transition-colors">
                    EXEC
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact Stats Footer Bar */}
          <div className="pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">4+</span>
              <span className="text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase">YRS · FULLSTACK</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">3+</span>
              <span className="text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase">YRS · BRAND STRATEGY</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">5+</span>
              <span className="text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase">YRS · OPEN SOURCE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;