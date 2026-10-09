'use client';

import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('himaza.creates@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('https://formsubmit.co/ajax/himaza.creates@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer id="contact" className="relative min-h-screen pt-20 pb-12 px-6 md:px-12 max-w-7xl mx-auto z-10 flex flex-col justify-between">
      
      <div>
        {/* SECTION HEADER */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#99E1D9] animate-pulse" />
          <span className="text-xs font-mono text-[#99E1D9] uppercase tracking-widest">
            05 / CONTACT
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          Let’s build something extraordinary.
        </h2>
        <p className="text-neutral-400 font-mono text-xs md:text-sm mb-12">
          // Open for fullstack engineering, brand strategy, and creative inquiries.
        </p>

        {/* GRID: FORM + DIRECT CONNECT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT: FORM TERMINAL */}
          <div className="lg:col-span-7 p-8 rounded-2xl backdrop-blur-xl bg-[#231B20]/60 border border-white/10 hover:border-[#99E1D9]/40 transition-all duration-500 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#99E1D9] focus:ring-1 focus:ring-[#99E1D9] transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#99E1D9] focus:ring-1 focus:ring-[#99E1D9] transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  SUBJECT
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry / Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#99E1D9] focus:ring-1 focus:ring-[#99E1D9] transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  MESSAGE *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your idea or project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#99E1D9] focus:ring-1 focus:ring-[#99E1D9] transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-xl bg-[#99E1D9] hover:bg-[#80d0c8] text-[#181216] font-mono text-xs tracking-widest uppercase font-black transition-all duration-300 shadow-[0_0_25px_rgba(153,225,217,0.3)] disabled:opacity-50"
              >
                {status === 'submitting' ? 'SENDING TRANSMISSION...' : 'SEND MESSAGE →'}
              </button>

              {status === 'success' && (
                <p className="text-xs font-mono text-[#99E1D9] text-center">
                  ✓ Message transmitted successfully! I will get back to you shortly.
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs font-mono text-red-400 text-center">
                  ✕ Transmission failed. Please email directly at himaza.creates@gmail.com
                </p>
              )}
            </form>
          </div>

          {/* RIGHT: DIRECT CHANNELS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* DIRECT EMAIL CARD */}
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-[#231B20]/60 border border-white/10 space-y-4">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                DIRECT EMAIL
              </span>
              <a
                href="mailto:himaza.creates@gmail.com"
                className="text-lg md:text-xl font-mono text-white hover:text-[#99E1D9] transition-colors block font-semibold break-all"
              >
                himaza.creates@gmail.com
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-2"
              >
                <span>{copied ? '✓ COPIED TO CLIPBOARD' : '📋 COPY ADDRESS'}</span>
              </button>
            </div>

            {/* LINKEDIN */}
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-[#231B20]/60 border border-white/10 space-y-4">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                PROFESSIONAL NETWORK
              </span>

              <a
                href="https://www.linkedin.com/in/himaza-zahara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#99E1D9]/50 hover:bg-[#99E1D9]/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#99E1D9] font-mono font-bold text-sm">in</span>
                  <span className="text-sm font-medium text-white group-hover:text-[#99E1D9]">
                    LinkedIn / Himaza Zahara
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-500 group-hover:text-white transition-colors">
                  ↗
                </span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* MINIMAL FOOTER */}
      <div className="pt-8 border-t border-white/10 text-center text-xs font-mono text-neutral-400">
        DEVELOPED BY <span className="text-[#99E1D9] font-semibold">HIMAZA ZJ</span>
      </div>

    </footer>
  );
}

export default Contact;