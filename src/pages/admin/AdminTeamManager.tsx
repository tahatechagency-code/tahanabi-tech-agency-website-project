import React, { useState } from 'react';
import {
  UserCheck,
  GraduationCap,
  Save,
  ShieldCheck,
  Users,
  Award,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminTeamManager: React.FC = () => {
  const { company, updateTeamMember, updateEngineers } = useData();

  // CEO Form State
  const [ceoName, setCeoName] = useState(company.ceo.name);
  const [ceoDegree, setCeoDegree] = useState(company.ceo.degree);
  const [ceoInstitution, setCeoInstitution] = useState(company.ceo.institution);
  const [ceoYear, setCeoYear] = useState(company.ceo.year);
  const [ceoBio, setCeoBio] = useState(company.ceo.bio);

  // Founder Form State
  const [founderName, setFounderName] = useState(company.founder.name);
  const [founderDegree, setFounderDegree] = useState(company.founder.degree);
  const [founderInstitution, setFounderInstitution] = useState(company.founder.institution);
  const [founderYear, setFounderYear] = useState(company.founder.year);
  const [founderBio, setFounderBio] = useState(company.founder.bio);

  // Engineering Team State
  const [engineers, setEngineers] = useState(company.engineers);

  const handleSaveCeo = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeamMember('ceo', {
      name: ceoName,
      degree: ceoDegree,
      institution: ceoInstitution,
      year: Number(ceoYear),
      bio: ceoBio,
    });
  };

  const handleSaveFounder = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeamMember('founder', {
      name: founderName,
      degree: founderDegree,
      institution: founderInstitution,
      year: Number(founderYear),
      bio: founderBio,
    });
  };

  const handleSaveEngineers = (e: React.FormEvent) => {
    e.preventDefault();
    updateEngineers(engineers);
  };

  return (
    <AdminLayout
      title="Leadership & Engineering Team Manager"
      subtitle="Configure executive credentials, NIT Trichy institutional records, and engineering capacity"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CEO Profile Card */}
        <GlassCard padding="lg" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Chief Executive Officer (CEO)</h3>
                <span className="text-[10px] text-amber-400 font-mono">Executive Leadership</span>
              </div>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Verified NIT Trichy
            </span>
          </div>

          <form onSubmit={handleSaveCeo} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={ceoName}
                  onChange={(e) => setCeoName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Degree Awarded</label>
                <input
                  type="text"
                  required
                  value={ceoDegree}
                  onChange={(e) => setCeoDegree(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Institution</label>
                <input
                  type="text"
                  required
                  value={ceoInstitution}
                  onChange={(e) => setCeoInstitution(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Graduation Year</label>
                <input
                  type="number"
                  required
                  value={ceoYear}
                  onChange={(e) => setCeoYear(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Professional Biography</label>
              <textarea
                rows={3}
                value={ceoBio}
                onChange={(e) => setCeoBio(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <GoldButton type="submit" size="sm" variant="solid" icon={<Save className="w-3.5 h-3.5" />}>
                Save CEO Profile
              </GoldButton>
            </div>
          </form>
        </GlassCard>

        {/* Founder Profile Card */}
        <GlassCard padding="lg" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Agency Founder & Architect</h3>
                <span className="text-[10px] text-amber-400 font-mono">Systems Leadership</span>
              </div>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Verified NIT Trichy
            </span>
          </div>

          <form onSubmit={handleSaveFounder} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Degree Awarded</label>
                <input
                  type="text"
                  required
                  value={founderDegree}
                  onChange={(e) => setFounderDegree(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Institution</label>
                <input
                  type="text"
                  required
                  value={founderInstitution}
                  onChange={(e) => setFounderInstitution(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Graduation Year</label>
                <input
                  type="number"
                  required
                  value={founderYear}
                  onChange={(e) => setFounderYear(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Professional Biography</label>
              <textarea
                rows={3}
                value={founderBio}
                onChange={(e) => setFounderBio(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <GoldButton type="submit" size="sm" variant="solid" icon={<Save className="w-3.5 h-3.5" />}>
                Save Founder Profile
              </GoldButton>
            </div>
          </form>
        </GlassCard>
      </div>

      {/* Engineering Staffing & Capacity */}
      <GlassCard padding="lg" className="space-y-4 max-w-2xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Users className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Engineering Team Staffing</h3>
            <p className="text-xs text-slate-400">Published on About Us page and institutional profiles</p>
          </div>
        </div>

        <form onSubmit={handleSaveEngineers} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Engineering Team Capacity Description
            </label>
            <input
              type="text"
              required
              value={engineers}
              onChange={(e) => setEngineers(e.target.value)}
              placeholder="e.g. 2 Senior Full-Stack & AI Engineers (5+ Years Experience)"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <GoldButton type="submit" size="sm" variant="solid" icon={<Save className="w-3.5 h-3.5" />}>
              Save Engineering Staffing
            </GoldButton>
          </div>
        </form>
      </GlassCard>
    </AdminLayout>
  );
};
