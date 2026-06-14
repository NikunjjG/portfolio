import React, { useState } from 'react';

import {
  Menu,
  X,
  FileText,
  Terminal as TermIcon,
  Code,
  BookOpen,
  Sparkles,
  Dumbbell,
  Utensils
} from 'lucide-react';
import FormBuilder from './components/FormBuilder';
import RetroTerminal from './components/RetroTerminal';
import OptimizationEngine from './components/OptimizationEngine';
import ProjectShowcase from './components/ProjectShowcase';
import SkillsBoard from './components/SkillsBoard';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Message state for the custom pop-up modal
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgBody, setMsgBody] = useState('');

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactModalOpen(false);
      setMsgName('');
      setMsgEmail('');
      setMsgBody('');
    }, 2500);
  };



  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-sans overflow-x-hidden min-h-screen selection:bg-[#ffe600] selection:text-black">

      {/* Dynamic Navigation Bar */}
      <nav className="sticky top-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-[#ffe600] border-b-3 border-dashed border-[#1a1c1c] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none">

        {/* Logo display font Anybody */}
        <a href="#home" className="font-display text-2xl md:text-3.5xl font-black text-[#1a1c1c] tracking-tighter uppercase cursor-pointer hover:skew-x-2 transition-transform">
          NIKUNJ.DEV
        </a>

        {/* Desktop Menu navigation matching guidelines */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#home" className="font-mono text-xs font-black uppercase text-black hover:bg-white/40 px-2 py-1 border-b-3 border-black pb-0.5 select-none transition">
            Home
          </a>
          <a href="#playgrounds" className="font-mono text-xs font-black uppercase text-black hover:bg-white/40 px-2 py-1 select-none transition">
            Playgrounds
          </a>
          <a href="#code" className="font-mono text-xs font-black uppercase text-black hover:bg-white/40 px-2 py-1 select-none transition">
            My Code
          </a>
          <a href="#skills" className="font-mono text-xs font-black uppercase text-black hover:bg-white/40 px-2 py-1 select-none transition">
            Skills
          </a>
          <button
            onClick={() => setContactModalOpen(true)}
            className="bg-black text-[#ffe600] px-6 py-2.5 font-mono text-xs font-black border-dashed-neo neo-shadow uppercase cursor-pointer"
          >
            Get In Touch
          </button>
        </div>

        {/* Hamburger Mobile Menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 border-2 border-[#1a1c1c] bg-white cursor-pointer active:scale-95 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="md:hidden fixed top-[72px] left-0 right-0 bg-[#ffe600] border-b-3 border-black z-40 p-6 flex flex-col gap-4 shadow-lg select-none uppercase font-mono font-black text-sm">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 border-2 border-black bg-white hover:bg-neutral-50 active:translate-y-0.5"
          >
            🏠 Home Stage
          </a>
          <a
            href="#playgrounds"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 border-2 border-black bg-white hover:bg-neutral-50 active:translate-y-0.5"
          >
            🎮 Playgrounds System
          </a>
          <a
            href="#code"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 border-2 border-black bg-white hover:bg-neutral-50 active:translate-y-0.5"
          >
            📁 Feature Showcase
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 border-2 border-black bg-white hover:bg-neutral-50 active:translate-y-0.5"
          >
            🛠️ Tools & Hobbies
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setContactModalOpen(true);
            }}
            className="w-full bg-black text-[#ffe600] p-3 border-3 border-black font-black uppercase text-center cursor-pointer select-none"
          >
            📬 Send Message Node
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-[820px] flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-12 bg-[#ffe600] relative overflow-hidden border-b-3 border-dashed border-black">

        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>

        <div className="z-10 max-w-4xl text-center md:text-left md:w-3/5">
          <div className="inline-flex gap-2 items-center bg-white border-2 border-black px-2.5 py-1 mb-6 font-mono text-xs font-black uppercase rotate-[-2deg] select-none">
            <Sparkles className="w-4 h-4 text-[#006c52] animate-bounce" />
            LIVE EXPERIENCES ARCHITECT
          </div>

          <h1 className="font-display text-4.5xl md:text-7xl font-black mb-8 leading-none tracking-tight text-black select-text">
            Hi, I'm Nikunj. <br />
            I build <span className="bg-white border-dashed-neo px-4 py-0.5 inline-block rotate-[1deg] hover:rotate-0 transition">web systems</span> that scale.
          </h1>

          <p className="font-sans text-lg md:text-xl mb-10 max-w-2xl font-semibold opacity-90 select-text leading-relaxed">
            "Architecting resilient, performance-optimized digital systems with a focus on robust state management, modular components, and config-driven UI architecture."
          </p>

          <div className="flex flex-wrap gap-5 justify-center md:justify-start select-none">
            <a
              href="#code"
              className="bg-[#006c52] text-white px-8 py-4 font-mono text-xs font-black border-dashed-neo neo-shadow uppercase tracking-widest cursor-pointer inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" /> View Projects
            </a>
            <a
              href="/docs/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 font-mono text-xs font-black border-dashed-neo neo-shadow uppercase tracking-widest cursor-pointer inline-flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" /> View Resume
            </a>
          </div>
        </div>

        {/* Right side floating portrait avatar and interactive tech stickers */}
        <div className="relative w-full md:w-2/5 h-[460px] mt-16 md:mt-0 flex items-center justify-center select-none">

          {/* Main Portrait sticker with heavy solid-neo outline */}
          <div className="w-72 h-72 bg-[#8ff6d0] border-solid-neo neo-shadow rounded-full overflow-hidden flex items-center justify-center relative z-20 group hover:rotate-2 transition-transform">
            <img
              alt="Nikunj Portrait"
              src="/img/self.png"

              className="w-full h-full object-cover grayscale transition hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Floating Sticker 1: JS/TS */}
          <div className="absolute top-6 left-12 float-animation bg-white p-3.5 border-dashed-neo neo-shadow rotate-[-12deg] z-35 hover:scale-110 transition cursor-help" title="Active Developer Stack Type signatures: JS/TS">
            <Code className="w-6 h-6 text-blue-500" />
            <span className="font-mono text-[9px] font-black block text-center mt-1">JS</span>
          </div>

          {/* Floating Sticker 2: Terminal */}
          <div className="absolute top-16 right-4 float-animation [animation-delay:1s] bg-white p-3.5 border-dashed-neo neo-shadow rotate-[15deg] z-35 hover:scale-110 transition cursor-help" title="Automation Engine: Bash/Zsh scripts master">
            <TermIcon className="w-6 h-6 text-purple-600" />
            <span className="font-mono text-[9px] font-black block text-center mt-1">DEV</span>
          </div>

          {/* Floating Sticker 3: Kitchen Skillet */}
          <div className="absolute bottom-12 left-2 float-animation [animation-delay:0.5s] bg-white p-3.5 border-dashed-neo neo-shadow rotate-[8deg] z-35 hover:scale-110 transition cursor-help" title="Culinary Synthesis: Wok chef masteries">
            <Utensils className="w-6 h-6 text-red-500" />
            <span className="font-mono text-[9px] font-black block text-center mt-1">COOK</span>
          </div>

          {/* Floating Sticker 4: Gym Weights */}
          <div className="absolute bottom-4 right-10 float-animation [animation-delay:1.5s] bg-white p-3.5 border-[#1a1c1c] border-3 neo-shadow rotate-[-5deg] z-35 hover:scale-110 transition cursor-help" title="Physique Load lifter: Deadlift champion status">
            <Dumbbell className="w-6 h-6 text-green-600" />
            <span className="font-mono text-[9px] font-black block text-center mt-1">LIFT</span>
          </div>
        </div>
      </section>

      {/* Playgrounds Portal Section */}
      <section id="playgrounds" className="py-24 px-6 md:px-16 bg-[#f3f3f4]">
        <div className="mb-16 select-none max-w-4xl">
          <div className="font-mono text-xs font-black uppercase text-gray-500 mb-2">
            🧬 DYNAMIC SIMULATION WORKSPACE
          </div>
          <h2 className="font-display text-4.5xl md:text-6.5xl font-black uppercase text-black leading-none mb-4">
            The Playgrounds
          </h2>
          <div className="h-2 w-32 bg-[#1a1c1c] border border-black"></div>
          <p className="font-mono text-xs md:text-sm text-stone-600 font-bold mt-4 max-w-2xl">
            Experiment with client form generation JSON matrices, test console commands, or click and compaction-tune the CPU optimizations engine underneath!
          </p>
        </div>

        {/* Playground Grid Layout */}
        <div className="space-y-12">
          {/* Panel A: The Dynamic Form Builder block */}
          <FormBuilder />

          {/* Panel B: Reactive Retro Terminal Console Output */}
          <div id="terminal-and-info-grid" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

            {/* Terminal Panel */}
            <div className="md:col-span-8">
              <RetroTerminal />
            </div>

            {/* Explanatory Stamp Collage block */}
            <div className="md:col-span-4 bg-[#ffe600] border-solid-neo p-6 md:p-8 neo-shadow flex flex-col justify-between text-black">
              <div className="select-none">
                <span className="bg-black text-[#ffe600] px-2 py-1 font-mono text-xxs font-black uppercase border border-black mb-3 inline-block">
                  INFRA PROFILE
                </span>
                <h4 className="font-display font-black text-xl uppercase mt-2 select-text">
                  Scalable Edge Architect
                </h4>
                <p className="font-sans text-xs font-semibold leading-relaxed text-black/90 mt-3 select-text">
                  Our system relies on highly strict single-viewport architectures. Node inputs are parsed instantaneously through strict schemas, maintaining constant memory metrics.
                </p>
              </div>

              {/* Status and logs */}
              <div className="pt-6 border-t border-black/15 font-mono text-xxs font-bold uppercase space-y-1 select-none text-stone-800">
                <div>• CONTAINER STATUS: DEPLOYED</div>
                <div>• FRAMEWORK: REACT 19 + VITE 6</div>
                <div>• SECTOR BOUND: INGRESS INBOUND</div>
                <div>• ACTIVE ADVISOR: NIKUNJ MODE</div>
              </div>
            </div>

          </div>

          {/* Panel C: Exploding Optimization engine layout */}
          <OptimizationEngine />
        </div>
      </section>

      {/* Featured Projects Showcase section */}
      <section id="code" className="py-24 px-6 md:px-16 bg-[#dec800]">

        {/* Header Title */}
        <div className="mb-16 select-none">
          <div className="font-mono text-xs font-black uppercase text-black/60 mb-2">
            📁 PRODUCTION CERTIFIED PORTFOLIO
          </div>
          <h2 className="font-display text-4.5xl md:text-6.5xl font-black uppercase text-black leading-none mb-4">
            Featured Work
          </h2>
          <div className="h-2 w-32 bg-black"></div>
        </div>

        {/* Dynamic Project items showcase switcher */}
        <ProjectShowcase />
      </section>

      {/* Skills Collage Board section */}
      <section id="skills" className="py-24 px-6 md:px-16 bg-[#f3f3f4] relative overflow-hidden">

        {/* Background Star decor stamps */}
        <div className="absolute top-12 left-1/4 opacity-[0.03] pointer-events-none rotate-12 select-none">
          <div className="text-[280px] font-display font-black">STAMP</div>
        </div>

        <div className="text-center mb-16 select-none">
          <span className="bg-white border-2 border-black px-2 py-0.5 font-mono text-xxs font-black uppercase tracking-wider text-stone-600 inline-block mb-3">
            TOOLBOX COLLAGE
          </span>
          <h2 className="font-display text-4.5xl md:text-6.5xl font-black uppercase text-black leading-none mb-4">
            Tech Stack & Lifestyle
          </h2>
          <p className="font-mono text-xs md:text-sm text-stone-500 font-bold max-w-xl mx-auto">
            A collage of deep technical structures, build automation utilities, and pure offline physical routines.
          </p>
        </div>

        {/* Interactive Sticker Board */}
        <SkillsBoard />
      </section>

      {/* Master Brutalist Footer layout */}
      <footer className="w-full py-16 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#e2e2e2] border-t-3 border-dashed border-black select-none text-black">
        <div className="text-center md:text-left">
          <div className="font-display font-black text-2xl uppercase tracking-tighter hover:skew-y-1 transition-transform">
            NIKUNJ | BUILT TO SCALE
          </div>
          <div className="font-mono text-[10px] text-stone-500 font-bold uppercase mt-1">
            © 2026 Nikunj | Software Engineer
          </div>
        </div>

        {/* Direct contact shortcuts links */}
        <div className="flex flex-wrap gap-6 font-mono text-xs font-black uppercase justify-center">
          <a
            href="https://www.linkedin.com/in/nikunj-54758521b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#006c52] transition underline underline-offset-4 decoration-2"
          >
            LinkedIn
          </a>
          <button
            onClick={() => setContactModalOpen(true)}
            className="hover:text-[#006c52] transition underline underline-offset-4 decoration-2 cursor-pointer"
          >
            Email Me
          </button>
          <a
            href="#home"
            className="hover:text-[#006c52] transition underline underline-offset-4 decoration-2"
          >
            Terminal Root ↑
          </a>
        </div>
      </footer>

      {/* Interactive Contact / Get In Touch Message Drawer Pop-up Sticker */}
      {contactModalOpen && (
        <div id="contact-portal-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs select-none">
          <div className="bg-white border-solid-neo max-w-lg w-full p-6 md:p-8 neo-shadow relative text-black transform rotate-[1deg] animate-scale-up">

            {/* Close trigger button */}
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-3 right-3 font-mono font-black text-xs uppercase bg-black text-white px-2 py-1 border-2 border-black hover:bg-[#ffe600] hover:text-black cursor-pointer"
            >
              Close X
            </button>

            <span className="bg-[#ffdaf4] text-black border border-black px-2.5 py-0.5 font-mono text-[9px] font-black uppercase mb-1.5 inline-block">
              POSTAL DISPATCHER
            </span>
            <h3 className="font-display font-black text-2xl uppercase leading-none mb-1">
              Connect with Nikunj
            </h3>
            <p className="font-sans text-xs font-semibold text-gray-500 mb-6 uppercase">
              Submit your message to trigger the pipeline socket!
            </p>

            {contactSuccess ? (
              <div className="bg-[#8ff6d0] border-2 border-black p-6 text-center space-y-2 select-none">
                <p className="font-display font-black text-lg text-black uppercase">
                  MESSAGE DISPATCHED! 🎉
                </p>
                <p className="font-mono text-xs font-bold text-emerald-800">
                  Your metadata has been packaged and queued in the mailbox stack. Returning to canvas...
                </p>
              </div>
            ) : (
              <form onSubmit={submitContact} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block font-black mb-1 uppercase">Sender Name ID:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Ada Lovelace"
                    value={msgName}
                    onChange={(e) => setMsgName(e.target.value)}
                    className="w-full bg-[#f9f9f9] border-2 border-black p-2.5 outline-none font-bold placeholder-gray-400 rounded-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-black mb-1 uppercase">E-Mail Endpoint:</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., ada@analytical.engine"
                    value={msgEmail}
                    onChange={(e) => setMsgEmail(e.target.value)}
                    className="w-full bg-[#f9f9f9] border-2 border-black p-2.5 outline-none font-bold placeholder-gray-400 rounded-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-black mb-1 uppercase">Message Payload Body:</label>
                  <textarea
                    required
                    placeholder="Compose message payload..."
                    value={msgBody}
                    onChange={(e) => setMsgBody(e.target.value)}
                    maxLength={320}
                    className="w-full bg-[#f9f9f9] border-2 border-black p-2.5 outline-none font-semibold h-24 resize-none rounded-none text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ffe600] text-black font-black uppercase py-3 border-3 border-black hover:bg-yellow-400 transition cursor-pointer text-center text-xs neo-flat-shadow"
                >
                  🚀 Push Payload
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
