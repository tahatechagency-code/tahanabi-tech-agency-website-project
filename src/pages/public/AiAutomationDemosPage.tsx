import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Calendar,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Send,
  Zap,
  Globe,
  Headphones,
  Eye,
  ShieldCheck,
  FileText,
  Clock,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiAutomationDemosPage: React.FC = () => {
  const { demos, openDemoModal, navigate, company } = useData();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Marhaban & Welcome to DiamondLease & Tahanabi AI Concierge! I can provide luxury car tariffs, book service appointments, or schedule an engineering consultation. How may I assist you?',
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiDemos = demos.filter(
    (d) => d.category === 'ai_automation' && d.isPublished
  );

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('car') || lower.includes('rental') || lower.includes('fleet')) {
        reply = 'For our Dubai luxury fleet, we currently have the Range Rover Autobiography (AED 1,450/day) and Porsche Cayenne Coupe (AED 1,200/day) available with zero-deposit corporate leasing. Would you like me to reserve a vehicle or send the contract via WhatsApp?';
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('package')) {
        reply = 'Our Tahanabi Tech Agency packages are: Basic (CAD 200), Moderate E-Commerce & Booking (CAD 500 - Most Popular), and Full AI Concierge & Enterprise (CAD 1,000+). Shall I book a strategy call with our NIT Trichy founding team?';
      } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('call')) {
        reply = 'I have open consultation slots today at 02:00 PM and 04:00 PM with MD Juned (CEO) and Satpal Kumar (Founder). I can lock in your slot right now.';
      } else {
        reply = `Thank you for your inquiry regarding "${query}". Our autonomous AI engine has qualified your requirement and forwarded the project scope to our senior engineering desk. We can also continue instantly on WhatsApp (+91 91285 96443).`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: reply,
          timestamp: 'Just now',
        },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <Bot className="w-3.5 h-3.5" />
          <span>Autonomous 24/7 Digital Operations</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI Automation <span className="text-gold-gradient">Demos &amp; Concierge</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Test real-time conversational AI agents, automated WhatsApp booking engines, CRM lead qualification, and customer support pipelines in action.
        </p>
      </div>

      {/* Live Interactive AI Concierge Chat Simulator */}
      <GlassCard glow padding="xl" className="border-amber-400/40 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Live AI Concierge Simulator</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-slate-400">
                Trained on luxury fleet booking, agency services &amp; multi-lingual dialogue
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-mono">
              Latency: 0.6s
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              WhatsApp Linked
            </span>
          </div>
        </div>

        {/* Chat History Window */}
        <div className="h-80 sm:h-96 overflow-y-auto space-y-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-sans text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-400 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                {m.text}
                <div
                  className={`text-[9px] mt-1 ${
                    m.sender === 'user' ? 'text-slate-800 text-right' : 'text-slate-500'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-amber-300 text-[11px] animate-pulse">
              <Zap className="w-3.5 h-3.5" />
              <span>AI Concierge is generating response...</span>
            </div>
          )}
        </div>

        {/* Sample Prompt Chips */}
        <div className="space-y-2">
          <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            Quick Simulation Prompts:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Book a luxury car rental quote in Dubai',
              'What are the agency pricing plans?',
              'Schedule a consultation call with MD Juned',
              'Connect me to WhatsApp desk',
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/40 text-[11px] text-slate-300 hover:text-amber-300 transition"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type any question or prompt for the AI Concierge..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
          />
          <GoldButton
            type="submit"
            size="md"
            variant="solid"
            icon={<Send className="w-4 h-4" />}
          >
            Send
          </GoldButton>
        </form>
      </GlassCard>

      {/* 6 AI Automation Categories Detailed */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            6 Core <span className="text-gold-gradient">Automation Modules</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Deployed seamlessly on your existing website, WhatsApp Business account, or custom cloud portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiDemos.map((demo) => (
            <GlassCard key={demo.id} glow padding="lg" className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] text-amber-300 font-bold uppercase">
                    {demo.subCategory || 'AI Automation'}
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Production Live
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{demo.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{demo.shortDescription}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  {demo.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <GoldButton
                  size="sm"
                  fullWidth
                  variant="outline"
                  onClick={() => openDemoModal(demo)}
                  icon={<Eye className="w-3.5 h-3.5" />}
                >
                  Inspect Architecture
                </GoldButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
