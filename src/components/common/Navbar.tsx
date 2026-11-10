import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ArrowRight,
  Globe,
  ChevronDown,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AppRoute } from '../../types/models';
import { BrandLogo } from './BrandLogo';
import { GoldButton } from './GoldButton';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, company } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route: AppRoute }[] = [
    { label: 'Home', route: '/' },
    { label: 'Solutions', route: '/solutions' },
    { label: 'Industries', route: '/industries' },
    { label: 'Demos', route: '/demos' },
    { label: 'References', route: '/references' },
    { label: 'Pricing', route: '/pricing' },
    { label: 'Resources', route: '/resources' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' },
  ];

  const handleNavClick = (route: AppRoute) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-slate-950/60 backdrop-blur-md border-b border-slate-800/80'
        }`}
      >
        {/* Top Global Announce Strip (Desktop) */}
        <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-amber-500/10 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Global Technology & AI Automation Partner
            </span>
            <span className="text-slate-600">•</span>
            <span>Serving businesses in UAE, GCC, India, Australia, UK & USA</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${company.phone}`}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 text-slate-300"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              {company.phone}
            </a>
            <span className="text-slate-600">•</span>
            <a
              href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-300 text-emerald-400 transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp Live Desk
            </a>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => handleNavClick('/admin/login')}
              className="text-slate-400 hover:text-amber-400 text-[11px] flex items-center gap-1"
              title="Admin Console"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400/80" />
              Admin Portal
            </button>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <BrandLogo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-amber-300 bg-amber-400/10 border border-amber-400/30 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Country Indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-xs text-slate-300">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-medium text-amber-200">EN</span>
            </div>

            {/* CTA Button */}
            <GoldButton
              size="sm"
              variant="solid"
              onClick={() => handleNavClick('/book-consultation')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Book a Consultation
            </GoldButton>
          </div>

          {/* Mobile Hamburger & Actions */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 sm:hidden"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-amber-400/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-950/95 border-b border-amber-500/20 backdrop-blur-2xl px-4 py-5 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
            <div className="space-y-1.5 pb-4 border-b border-slate-800">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
                        : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  </button>
                );
              })}
            </div>

            {/* Mobile Contact & CTAs */}
            <div className="pt-4 space-y-3">
              <GoldButton
                size="md"
                fullWidth
                variant="solid"
                onClick={() => handleNavClick('/book-consultation')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book a Free Consultation
              </GoldButton>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-300"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  Call Agency
                </a>
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => handleNavClick('/admin/login')}
                  className="text-xs text-slate-500 hover:text-amber-400 inline-flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Admin Console Login
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
