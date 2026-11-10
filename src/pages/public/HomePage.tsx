import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Layers,
  ChevronRight,
  ExternalLink,
  Users,
  Target,
  Eye,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { HeroSection } from '../../components/home/HeroSection';
import { StatsTicker } from '../../components/home/StatsTicker';
import { ServiceCard } from '../../components/home/ServiceCard';
import { IndustryCard } from '../../components/home/IndustryCard';
import { DemoCard } from '../../components/home/DemoCard';
import { TestimonialCard } from '../../components/home/TestimonialCard';
import { ContactCTA } from '../../components/home/ContactCTA';
import { GoldButton } from '../../components/common/GoldButton';
import { GlassCard } from '../../components/common/GlassCard';

export const HomePage: React.FC = () => {
  const { services, industries, demos, testimonials, company, navigate } = useData();

  // Filter only published demos (enforces strict unpublished rule for B2B Car Service)
  const publishedDemos = demos.filter((d) => d.isPublished);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Hero Section with AI Concierge Visual */}
      <HeroSection />

      {/* 2. Dynamic Editable Statistics Ticker */}
      <StatsTicker />

      {/* 3. Core Business Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Core Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                End-to-End Digital &amp;{' '}
                <span className="text-gold-gradient">AI Automation Solutions</span>
              </h2>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
                We design, engineer, and deploy high-converting websites, autonomous AI concierges, and custom applications engineered for scale.
              </p>
            </div>

            <GoldButton
              size="sm"
              variant="outline"
              onClick={() => navigate('/solutions')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View All 8 Solutions
            </GoldButton>
          </div>

          {/* 5 Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}

            {/* Sixth Custom Enterprise Box */}
            <GlassCard
              glow
              padding="lg"
              className="flex flex-col justify-between border-dashed border-amber-400/40 bg-gradient-to-br from-amber-500/5 via-slate-900 to-slate-950"
            >
              <div>
                <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 w-fit mb-4">
                  <Layers className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  Need a Custom Architecture?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Have unique ERP, fleet management, or specialized workflow requirements? Our founding architects build custom enterprise solutions tailored to your operational KPIs.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <GoldButton
                  size="sm"
                  fullWidth
                  variant="solid"
                  onClick={() => navigate('/book-consultation')}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Consult Our Architects
                </GoldButton>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. Featured Live Demos Showcase */}
      <section className="py-20 relative bg-gradient-to-b from-slate-950 via-[#070b16] to-slate-950 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-3">
              <Eye className="w-3.5 h-3.5" />
              <span>Live Interactive Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Our <span className="text-gold-gradient">Real-World Demos</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Interactive e-commerce platforms, WhatsApp AI booking concierges, and custom applications ready to be tailored to your brand.
            </p>
          </div>

          {/* Demos Grid (Only Published Demos shown) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedDemos.map((demo) => (
              <DemoCard key={demo.id} demo={demo} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <GoldButton
              size="md"
              variant="outline"
              onClick={() => navigate('/demos')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Browse Full Demo Catalog
            </GoldButton>
          </div>
        </div>
      </section>

      {/* 5. Industry Highlights Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-3">
                <Target className="w-3.5 h-3.5" />
                <span>Specialized Domains</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Industries <span className="text-gold-gradient">We Transform</span>
              </h2>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
                Domain-specific solutions engineered for jewellery retail, car rentals, fine dining, healthcare, and global multi-branch operations.
              </p>
            </div>

            <GoldButton
              size="sm"
              variant="outline"
              onClick={() => navigate('/industries')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View All Industries
            </GoldButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.slice(0, 4).map((ind) => (
              <IndustryCard key={ind.id} industry={ind} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Company Introduction & NIT Trichy Leadership Section */}
      <section className="py-20 relative bg-gradient-to-b from-slate-950 via-[#0a0f20] to-slate-950 border-y border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission, Vision & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
                <Award className="w-3.5 h-3.5" />
                <span>About Tahanabi Tech Agency</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Engineering Excellence From{' '}
                <span className="text-gold-gradient">NIT Trichy Alumni</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Tahanabi Tech Agency was founded by alumni of the prestigious <strong>National Institute of Technology, Tiruchirappalli (NIT Trichy)</strong>. We combine elite software engineering principles with bleeding-edge AI automation to build modern, revenue-generating digital systems for international clients.
              </p>

              {/* Founder Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-1.5 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Chief Executive Officer
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-mono">
                      NIT Trichy &apos;24
                    </span>
                  </div>
                  <div className="text-base font-bold text-white">
                    {company.ceo.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {company.ceo.degree}, NIT Trichy. Full-stack cloud architect &amp; AI system designer.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-1.5 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Agency Founder
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-mono">
                      NIT Trichy &apos;23
                    </span>
                  </div>
                  <div className="text-base font-bold text-white">
                    {company.founder.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {company.founder.degree}, NIT Trichy. Enterprise systems, integrations &amp; scalability specialist.
                  </div>
                </div>
              </div>

              {/* Engineering Team & Location */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-amber-300 font-semibold">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Core Engineering Team:</span>
                  <span className="text-slate-300 font-normal">{company.engineers}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Operating Base: {company.location} (GPS: {company.coordinates.lat}, {company.coordinates.lng})</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mission & Vision Cards */}
            <div className="lg:col-span-5 space-y-4">
              <GlassCard glow padding="lg" className="border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                  <Target className="w-4 h-4" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To empower modern businesses across the globe with autonomous AI automations, elegant e-commerce platforms, and scalable web software that drive measurable revenue growth and operational freedom.
                </p>
              </GlassCard>

              <GlassCard glow padding="lg" className="border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Our Vision</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To become the premier international technology agency recognized worldwide for blending luxury aesthetic perfection with robust, production-grade AI intelligence.
                </p>
              </GlassCard>

              <div className="pt-2">
                <GoldButton
                  size="md"
                  fullWidth
                  variant="solid"
                  onClick={() => navigate('/about')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Read Full Company Story
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Client Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>International Client Endorsements</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trusted by Businesses <span className="text-gold-gradient">Across the Globe</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Verified feedback from enterprise directors, luxury retail founders, and operations leaders in UAE, Australia, India, and the UK.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test) => (
              <TestimonialCard key={test.id} testimonial={test} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. High-Converting Contact CTA Section */}
      <ContactCTA />
    </div>
  );
};
