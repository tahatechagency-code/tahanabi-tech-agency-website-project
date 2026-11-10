import React, { useState } from 'react';
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Save,
  Globe,
  Sliders,
  DollarSign,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminSettingsManager: React.FC = () => {
  const { company, updateCompany, stats, updateStat, showToast } = useData();

  // Contact & Agency Information
  const [phone, setPhone] = useState(company.phone);
  const [whatsapp, setWhatsapp] = useState(company.whatsapp);
  const [email, setEmail] = useState(company.email);
  const [location, setLocation] = useState(company.location);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(company.googleMapsUrl);
  const [lat, setLat] = useState(company.coordinates.lat);
  const [lng, setLng] = useState(company.coordinates.lng);

  // Home Page Copy & Headings
  const [headline, setHeadline] = useState(company.headline);
  const [description, setDescription] = useState(company.description);
  const [tagline, setTagline] = useState(company.tagline);

  // Statistics Form State
  const [statsState, setStatsState] = useState(stats);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany({
      phone,
      whatsapp,
      email,
      location,
      googleMapsUrl,
      coordinates: {
        lat: Number(lat),
        lng: Number(lng),
      },
    });
    showToast('Contact information & GPS coordinates saved', 'success');
  };

  const handleSaveHeadings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany({
      headline,
      description,
      tagline,
    });
    showToast('Home page headlines & content updated', 'success');
  };

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    statsState.forEach((st) => {
      updateStat(st.id, {
        value: st.value,
        description: st.description,
      });
    });
    showToast('Live company metrics updated', 'success');
  };

  return (
    <AdminLayout
      title="Agency Settings & Global Content"
      subtitle="Edit home page headlines, contact coordinates (+91 91285 96443, 26.442939, 85.902673), and live statistics"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Coordinates & Physical Location */}
        <GlassCard padding="lg" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Contact & Geographic Coordinates</h3>
              <p className="text-[11px] text-slate-400">Synchronized across Footer, Contact Page, and WhatsApp actions</p>
            </div>
          </div>

          <form onSubmit={handleSaveContact} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Business Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">WhatsApp Business Desk</label>
                <input
                  type="text"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Corporate Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Global Locations Description</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  required
                  value={lat}
                  onChange={(e) => setLat(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  required
                  value={lng}
                  onChange={(e) => setLng(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Google Maps Direct Link</label>
              <input
                type="url"
                required
                value={googleMapsUrl}
                onChange={(e) => setGoogleMapsUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <GoldButton type="submit" size="sm" variant="solid" icon={<Save className="w-3.5 h-3.5" />}>
                Save Contact Coordinates
              </GoldButton>
            </div>
          </form>
        </GlassCard>

        {/* Website Headlines & Copy */}
        <GlassCard padding="lg" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Home Page Headlines & Branding</h3>
              <p className="text-[11px] text-slate-400">Controls the hero title, subtitle, and intro narrative</p>
            </div>
          </div>

          <form onSubmit={handleSaveHeadings} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Brand Tagline</label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Hero Main Headline</label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Hero Lead Description</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <GoldButton type="submit" size="sm" variant="solid" icon={<Save className="w-3.5 h-3.5" />}>
                Save Home Page Headings
              </GoldButton>
            </div>
          </form>
        </GlassCard>
      </div>

      {/* Live Statistics Counters Editor */}
      <GlassCard padding="lg" className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Company Public Statistics Ticker</h3>
            <p className="text-xs text-slate-400">
              Per prompt requirements: Statistics are editable by admin and reflect immediately on public pages.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveStats} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsState.map((st, idx) => (
              <div key={st.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="font-semibold text-slate-300">{st.label}</div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase block">Display Value</label>
                  <input
                    type="text"
                    required
                    value={st.value}
                    onChange={(e) => {
                      const next = [...statsState];
                      next[idx].value = e.target.value;
                      setStatsState(next);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase block">Description</label>
                  <input
                    type="text"
                    required
                    value={st.description}
                    onChange={(e) => {
                      const next = [...statsState];
                      next[idx].description = e.target.value;
                      setStatsState(next);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 text-[11px] focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <GoldButton type="submit" size="sm" variant="solid" icon={<Save className="w-3.5 h-3.5" />}>
              Save Live Metrics
            </GoldButton>
          </div>
        </form>
      </GlassCard>
    </AdminLayout>
  );
};
