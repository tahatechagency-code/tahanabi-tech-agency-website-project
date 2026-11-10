import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Eye,
  ArrowRight,
  ShoppingBag,
  Bot,
  Layers,
  Code2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { DemoCard } from '../../components/home/DemoCard';
import { GoldButton } from '../../components/common/GoldButton';

export const DemosPage: React.FC = () => {
  const { demos, navigate } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Strictly filter only published demos
  const publishedDemos = demos.filter((d) => d.isPublished);

  const categories = [
    { id: 'all', label: 'All Demos', icon: Layers },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingBag },
    { id: 'ai_automation', label: 'AI Automation', icon: Bot },
    { id: 'custom_apps', label: 'Custom Apps', icon: Code2 },
  ];

  const filteredDemos = publishedDemos.filter((demo) => {
    const matchesCategory =
      activeCategory === 'all' || demo.category === activeCategory;
    const matchesSearch =
      demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive Demonstrations</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Live Business <span className="text-gold-gradient">Demo Collection</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Explore ready-to-deploy, high-converting platforms designed for modern enterprises. Click any demo to inspect features and launch simulations.
        </p>

        {/* Quick Links to dedicated sub-pages */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/demos/ecommerce')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-400/30 text-xs text-amber-300 hover:bg-slate-800 transition"
          >
            Explore E-commerce Showcases &rarr;
          </button>
          <button
            onClick={() => navigate('/demos/ai-automation')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-400/30 text-xs text-amber-300 hover:bg-slate-800 transition"
          >
            Explore AI Concierge Simulator &rarr;
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 shrink-0 transition-all ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search demos, tags, industry..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60"
          />
        </div>
      </div>

      {/* Demos Grid */}
      {filteredDemos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDemos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <p className="text-sm font-semibold text-slate-300">No demos match your criteria.</p>
          <p className="text-xs text-slate-500">Try searching for &quot;jewellery&quot;, &quot;concierge&quot;, or &quot;e-commerce&quot;.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="text-xs text-amber-400 underline pt-2"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Custom Demo Consultation CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-amber-500/25 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold text-white">Need a Demonstration Tailored to Your Specific Data?</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            We can prepare a custom private prototype with your branding, products, and WhatsApp API workflows.
          </p>
        </div>
        <GoldButton
          size="md"
          variant="solid"
          onClick={() => navigate('/book-consultation')}
          icon={<ArrowRight className="w-4 h-4" />}
          className="shrink-0"
        >
          Request Custom Prototype
        </GoldButton>
      </div>
    </div>
  );
};
