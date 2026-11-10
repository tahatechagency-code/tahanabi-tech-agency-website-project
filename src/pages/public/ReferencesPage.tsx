import React, { useState } from 'react';
import {
  ExternalLink,
  Search,
  Sparkles,
  ShieldAlert,
  Globe,
  Tag,
  CheckCircle2,
  Copy,
  SlidersHorizontal,
  Bookmark,
  Gem,
  Shirt,
  ShoppingBag,
  Building2,
  Compass,
  Stethoscope,
  GraduationCap,
  Bot,
  CreditCard,
  Users,
  BookOpen,
  Calendar,
  Layers,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const ReferencesPage: React.FC = () => {
  const { references, navigate } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All References (60)', icon: Layers },
    { id: 'jewellery', label: 'Jewellery', icon: Gem },
    { id: 'fashion', label: 'Fashion', icon: Shirt },
    { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingBag },
    { id: 'real_estate', label: 'Real Estate', icon: Building2 },
    { id: 'tourism', label: 'Tourism', icon: Compass },
    { id: 'healthcare', label: 'Healthcare', icon: Stethoscope },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'ai_automation', label: 'AI Automation', icon: Bot },
    { id: 'pricing', label: 'Pricing Design', icon: CreditCard },
    { id: 'about_us', label: 'About Us', icon: Users },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'booking', label: 'Booking', icon: Calendar },
  ];

  // Only show active references on public page
  const visibleReferences = references.filter((ref) => {
    if (!ref.isActive) return false;
    const matchesCategory = activeCategory === 'all' || ref.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      ref.title.toLowerCase().includes(q) ||
      ref.url.toLowerCase().includes(q) ||
      ref.description.toLowerCase().includes(q) ||
      ref.tags.some((t) => t.toLowerCase().includes(q)) ||
      ref.categoryLabel.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Industry Design &amp; Architectural Benchmarks</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Website Reference <span className="text-gold-gradient">Library</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Curated collection of world-class digital flagships, booking systems, e-commerce engines, and AI platforms used for client design inspiration and technical benchmarking.
        </p>
      </div>

      {/* Mandatory Disclaimer Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200/90 flex items-start gap-3 shadow-lg">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white font-semibold block text-sm">
            Third-Party Reference &amp; Design Inspiration Disclaimer
          </strong>
          <p className="text-xs text-slate-300 leading-relaxed">
            The external websites featured in this library are third-party industry benchmarks presented solely for design inspiration, user experience analysis, and architectural reference. They are independent entities and are <strong>not</strong> claimed as Tahanabi Tech Agency&apos;s own clients or projects.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          {/* Category Filter Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-thin">
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
        </div>

        {/* Search Bar & Result Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 text-xs">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand, category, URL, or design keyword..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60"
            />
          </div>

          <div className="text-slate-400 text-xs self-start sm:self-center">
            Showing <strong className="text-amber-300">{visibleReferences.length}</strong> active benchmarks
          </div>
        </div>
      </div>

      {/* Reference Cards Grid */}
      {visibleReferences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReferences.map((ref) => (
            <GlassCard
              key={ref.id}
              glow
              padding="none"
              className="overflow-hidden flex flex-col justify-between group border-amber-500/20 hover:border-amber-400/50"
            >
              <div>
                {/* Header Image with overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={ref.coverImage}
                    alt={ref.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur border border-amber-400/30 text-[10px] text-amber-300 font-semibold uppercase">
                    {ref.categoryLabel}
                  </div>

                  {/* External Domain Pill */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur border border-slate-700 text-[10px] text-slate-300 font-mono flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span>{new URL(ref.url).hostname.replace('www.', '')}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors drop-shadow-md">
                      {ref.title}
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ref.description}
                  </p>

                  {/* Key Design Takeaways */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      Architectural &amp; UX Takeaways:
                    </div>
                    {ref.keyDesignTakeaways.map((takeaway, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{takeaway}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {ref.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-slate-800/60 mt-2 flex items-center justify-between gap-2">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md transition"
                >
                  <span>Visit Reference</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>

                <button
                  onClick={() => handleCopy(ref.id, ref.url)}
                  title="Copy reference link"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition"
                >
                  {copiedId === ref.id ? (
                    <span className="text-[10px] text-emerald-400 font-bold px-1">Copied!</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <p className="text-sm font-semibold text-slate-300">No external references found.</p>
          <p className="text-xs text-slate-500">Try clearing your search query or selecting a different category.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="text-xs text-amber-400 underline pt-2"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom CTA for Custom Benchmarking */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-amber-500/25 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold text-white">Inspired by These World-Class Benchmarks?</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Let our NIT Trichy founding team engineer your custom platform with similar high-converting architecture.
          </p>
        </div>
        <GoldButton
          size="md"
          variant="solid"
          onClick={() => navigate('/book-consultation')}
          icon={<ExternalLink className="w-4 h-4" />}
          className="shrink-0"
        >
          Book Technical Scoping Call
        </GoldButton>
      </div>
    </div>
  );
};
