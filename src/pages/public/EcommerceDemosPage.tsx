import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Star,
  Eye,
  CreditCard,
  Layers,
  Gem,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const EcommerceDemosPage: React.FC = () => {
  const { demos, openDemoModal, navigate, company } = useData();
  const [selectedKarat, setSelectedKarat] = useState<'18k' | '22k' | '24k'>('22k');
  const [selectedWeight, setSelectedWeight] = useState<number>(14.5);
  const [activeNiche, setActiveNiche] = useState<string>('all');

  const ecommerceDemos = demos.filter(
    (d) => d.category === 'ecommerce' && d.isPublished
  );

  const niches = [
    { id: 'all', label: 'All E-commerce' },
    { id: 'Jewellery', label: 'Jewellery Stores' },
    { id: 'Luxury Stores', label: 'Luxury & Couture' },
    { id: 'Fashion', label: 'Fashion & Apparel' },
    { id: 'Lifestyle', label: 'Lifestyle & Retail' },
  ];

  const filteredDemos = ecommerceDemos.filter((d) => {
    if (activeNiche === 'all') return true;
    return d.subCategory === activeNiche;
  });

  // Calculate live gold demo price
  const baseRatePerGram = {
    '18k': 265, // AED per gram
    '22k': 310,
    '24k': 335,
  };
  const livePriceAED = Math.round(selectedWeight * baseRatePerGram[selectedKarat] + 450); // + making charges

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>High-Converting Digital Flagships</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          E-Commerce <span className="text-gold-gradient">Website Demos</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Specialized high-ticket store architectures engineered for jewellery brands, couture fashion, luxury lifestyle, and multi-branch retail networks.
        </p>
      </div>

      {/* Featured Interactive Showcase: RoyalSparkle Jewellers Interactive Simulator */}
      <GlassCard glow padding="xl" className="border-amber-400/40 space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] uppercase">
                Featured Live Demo
              </span>
              <span className="text-xs text-slate-400 font-mono">RoyalSparkle Jewellers Flagship</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Luxury Jewellery E-Commerce with Dynamic Gold Tariffs
            </h2>
          </div>

          <GoldButton
            size="sm"
            variant="solid"
            onClick={() => {
              window.open(
                `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=Hello%20Tahanabi,%20I%20am%20interested%20in%20a%20Jewellery%20E-Commerce%20Store%20like%20RoyalSparkle`,
                '_blank'
              );
            }}
            icon={<MessageCircle className="w-4 h-4 text-slate-950" />}
          >
            Request Jewellery Store Demo
          </GoldButton>
        </div>

        {/* Interactive Simulation Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950 group">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
              alt="RoyalSparkle Gold Necklace"
              className="w-full h-80 sm:h-96 object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Heritage Collection
                </span>
                <h3 className="text-lg font-bold text-white">
                  The Empress 22K Gold &amp; Polki Choker
                </h3>
                <div className="flex items-center gap-1 text-amber-400 text-xs mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-slate-400 text-[11px] ml-1.5">(48 Verified Reviews)</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">Live Calculated Tariff</div>
                <div className="text-2xl font-extrabold text-gold-gradient font-mono">
                  AED {livePriceAED.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Controls & Live Calculation Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Gem className="w-4 h-4 text-amber-400" />
                Live Product Customizer (Test Real-Time Pricing):
              </h4>

              {/* Karat Selector */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Gold Purity (Karat):</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['18k', '22k', '24k'] as const).map((karat) => (
                    <button
                      key={karat}
                      onClick={() => setSelectedKarat(karat)}
                      className={`py-2 rounded-lg text-xs font-bold uppercase transition ${
                        selectedKarat === karat
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-400/40'
                      }`}
                    >
                      {karat.toUpperCase()} Solid Gold
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Gross Weight (Grams):</span>
                  <span className="text-amber-300 font-mono font-bold">{selectedWeight.toFixed(1)}g</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="0.5"
                  value={selectedWeight}
                  onChange={(e) => setSelectedWeight(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Price Breakdown */}
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div>Bullion Rate ({selectedKarat.toUpperCase()}): <span className="text-white font-mono">AED {baseRatePerGram[selectedKarat]}/g</span></div>
                <div>Making Charges: <span className="text-white font-mono">AED 450</span></div>
                <div>Certificate: <span className="text-emerald-400 font-semibold">Included (COA)</span></div>
                <div>Insured Shipping: <span className="text-emerald-400 font-semibold">Free Worldwide</span></div>
              </div>
            </div>

            {/* Direct Order Actions */}
            <div className="space-y-3">
              <GoldButton
                size="md"
                fullWidth
                variant="solid"
                onClick={() => {
                  window.open(
                    `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=Hi%20Tahanabi,%20I%20am%20testing%20the%20RoyalSparkle%20Jewellery%20demo%20(${selectedKarat.toUpperCase()},%20${selectedWeight}g%20for%20AED%20${livePriceAED}).%20I%20want%20to%20build%20a%20similar%20store.`,
                    '_blank'
                  );
                }}
                icon={<MessageCircle className="w-4 h-4 text-slate-950" />}
              >
                Inquire on WhatsApp with Pre-Filled Spec (AED {livePriceAED.toLocaleString()})
              </GoldButton>

              <GoldButton
                size="md"
                fullWidth
                variant="outline"
                onClick={() => navigate('/book-consultation')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Get Custom Quote for Your Jewellery Brand
              </GoldButton>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Category Filter for E-commerce Demos */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {niches.map((niche) => (
          <button
            key={niche.id}
            onClick={() => setActiveNiche(niche.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
              activeNiche === niche.id
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-400/40'
            }`}
          >
            {niche.label}
          </button>
        ))}
      </div>

      {/* Grid of All E-commerce Stores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDemos.map((demo) => (
          <GlassCard
            key={demo.id}
            glow
            padding="none"
            className="overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative h-52 w-full overflow-hidden bg-slate-950">
              <img
                src={demo.coverImage}
                alt={demo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur border border-amber-400/30 text-[10px] text-amber-300 font-medium">
                {demo.subCategory || 'E-commerce'}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {demo.title}
                </h4>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {demo.shortDescription}
              </p>

              <div className="space-y-1.5">
                {demo.features.slice(0, 3).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <GoldButton
                  size="sm"
                  fullWidth
                  variant="solid"
                  onClick={() => openDemoModal(demo)}
                  icon={<Eye className="w-3.5 h-3.5" />}
                >
                  Inspect Store Demo
                </GoldButton>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
