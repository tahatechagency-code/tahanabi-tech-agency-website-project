import React, { useState } from 'react';
import {
  ArrowRight,
  Headphones,
  Bot,
  Sparkles,
  ShoppingBag,
  Cpu,
  Layers,
  MessageCircle,
  CheckCircle2,
  Send,
  Zap,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GoldButton } from '../common/GoldButton';

export const HeroSection: React.FC = () => {
  const { navigate, company, openDemoModal, demos } = useData();
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleQuickQuestion = (question: string) => {
    setIsTyping(true);
    setChatResponse(null);
    setTimeout(() => {
      setIsTyping(false);
      if (question.includes('Demo')) {
        setChatResponse('Opening our live interactive demonstrations right now!');
        navigate('/demos');
      } else if (question.includes('Price') || question.includes('Cost')) {
        setChatResponse('Our packages start at CAD 200 for Basic, CAD 500 for Moderate e-commerce, and CAD 1,000+ for enterprise.');
        navigate('/pricing');
      } else if (question.includes('WhatsApp')) {
        window.open(`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`, '_blank');
      } else {
        setChatResponse('Connecting you to MD Juned & Satpal Kumar on our consultation desk.');
        navigate('/book-consultation');
      }
    }, 600);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    handleQuickQuestion(chatInput);
    setChatInput('');
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-8 pb-16 overflow-hidden">
      {/* Background radial gold glow mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Action Buttons (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] text-xs text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-medium tracking-wide">
                Global Technology &amp; AI Automation Partner
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Build, Automate &amp; Grow{' '}
              <span className="text-gold-gradient block sm:inline">
                Your Business Worldwide
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We design and deploy AI-powered automation, custom business applications, and high-converting e-commerce platforms for businesses across UAE, GCC, India, USA, Australia, and beyond.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <GoldButton
                size="lg"
                variant="solid"
                onClick={() => {
                  const firstDemo = demos.find((d) => d.isPublished);
                  if (firstDemo) openDemoModal(firstDemo);
                  else navigate('/demos');
                }}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Get a Live Demo
              </GoldButton>

              <GoldButton
                size="lg"
                variant="outline"
                onClick={() => {
                  window.open(`https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=Hello%20Tahanabi%20Tech%20Agency,%20I%20would%20like%20to%20talk%20to%20an%20expert`, '_blank');
                }}
                icon={<Headphones className="w-4 h-4 text-amber-400" />}
                className="w-full sm:w-auto"
              >
                Talk to an Expert
              </GoldButton>
            </div>

            {/* Regional Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>NIT Trichy Founders (MD Juned &amp; Satpal Kumar)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enterprise SLA &amp; Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Multi-Currency (AED, CAD, USD, INR)</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Concierge Visual & Interactive Assistant (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Visual Card with AI Concierge Model & Dubai Skyline Vibe */}
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden p-1 bg-gradient-to-b from-amber-400/40 via-amber-500/10 to-transparent shadow-[0_0_50px_rgba(212,175,55,0.25)]">
              <div className="relative rounded-[22px] overflow-hidden bg-slate-950 border border-slate-800">
                {/* Hero Avatar Image matching reference */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="AI Concierge Professional"
                    className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* AI Status Pill */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/30 text-[11px] text-amber-300 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-medium">AI Concierge Online 24/7</span>
                  </div>

                  {/* Dubai / Global Skyline Badge */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] text-slate-300 flex items-center gap-1">
                    <span>🇦🇪 Dubai • 🇮🇳 India</span>
                  </div>
                </div>

                {/* Floating Interactive Concierge Dialogue */}
                <div className="p-4 sm:p-5 space-y-3 bg-gradient-to-b from-slate-950 to-[#0a0f1d]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 p-0.5 shrink-0 shadow-md">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">AI Concierge Assistant</span>
                        <span className="text-[10px] text-slate-500 font-mono">Response: &lt;1s</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        &quot;Hello! I&apos;m your 24/7 business assistant. How can I help you grow today?&quot;
                      </p>
                    </div>
                  </div>

                  {/* Quick Action Chips */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <button
                      onClick={() => handleQuickQuestion('Get a Live Demo')}
                      className="text-left px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/40 text-[11px] text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                    >
                      <span>🚀 Explore Live Demos</span>
                      <ArrowRight className="w-3 h-3 text-amber-400/70" />
                    </button>
                    <button
                      onClick={() => handleQuickQuestion('Pricing & Cost')}
                      className="text-left px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/40 text-[11px] text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                    >
                      <span>💎 View Pricing Plans</span>
                      <ArrowRight className="w-3 h-3 text-amber-400/70" />
                    </button>
                    <button
                      onClick={() => handleQuickQuestion('WhatsApp Live')}
                      className="text-left px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-slate-300 hover:text-emerald-300 transition-colors flex items-center justify-between"
                    >
                      <span>💬 WhatsApp Chat</span>
                      <ArrowRight className="w-3 h-3 text-emerald-400/70" />
                    </button>
                    <button
                      onClick={() => handleQuickQuestion('Book Consultation')}
                      className="text-left px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/40 text-[11px] text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                    >
                      <span>📅 Book Strategy Call</span>
                      <ArrowRight className="w-3 h-3 text-amber-400/70" />
                    </button>
                  </div>

                  {/* Simulated Response or Input */}
                  {isTyping && (
                    <div className="text-[11px] text-amber-300 animate-pulse flex items-center gap-1.5 py-1">
                      <Zap className="w-3 h-3" />
                      <span>AI Concierge is processing your request...</span>
                    </div>
                  )}

                  {chatResponse && (
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                      {chatResponse}
                    </div>
                  )}

                  <form onSubmit={handleChatSubmit} className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about AI automation, e-commerce, or pricing..."
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60"
                    />
                    <button
                      type="submit"
                      className="p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
                      aria-label="Send query"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pills Strip matching reference mockups */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div
            onClick={() => navigate('/demos/ecommerce')}
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 transition-all cursor-pointer group text-center sm:text-left"
          >
            <div className="text-amber-400 group-hover:text-amber-300 mb-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>E-commerce</span>
            </div>
            <div className="text-[11px] text-slate-400">(Web &amp; Mobile Stores)</div>
          </div>

          <div
            onClick={() => navigate('/demos/ai-automation')}
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 transition-all cursor-pointer group text-center sm:text-left"
          >
            <div className="text-amber-400 group-hover:text-amber-300 mb-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Automation</span>
            </div>
            <div className="text-[11px] text-slate-400">(Sales, Support, CRM)</div>
          </div>

          <div
            onClick={() => navigate('/solutions')}
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 transition-all cursor-pointer group text-center sm:text-left"
          >
            <div className="text-amber-400 group-hover:text-amber-300 mb-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Custom Apps</span>
            </div>
            <div className="text-[11px] text-slate-400">(Tailored For Business)</div>
          </div>

          <div
            onClick={() => navigate('/solutions')}
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 transition-all cursor-pointer group text-center sm:text-left"
          >
            <div className="text-amber-400 group-hover:text-amber-300 mb-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>B2B Solutions</span>
            </div>
            <div className="text-[11px] text-slate-400">(Enterprise &amp; Portals)</div>
          </div>

          <div
            onClick={() => navigate('/solutions')}
            className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 transition-all cursor-pointer group text-center sm:text-left"
          >
            <div className="text-amber-400 group-hover:text-amber-300 mb-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Integration</span>
            </div>
            <div className="text-[11px] text-slate-400">(WhatsApp, CRM, ERP)</div>
          </div>
        </div>
      </div>
    </section>
  );
};
