import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  AlertCircle,
  Star,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { PricingPlan } from '../../types/models';

export const AdminPricingManager: React.FC = () => {
  const {
    pricingPlans,
    updatePricingPlan,
    addPricingPlan,
    deletePricingPlan,
  } = useData();

  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [tierName, setTierName] = useState<'Basic' | 'Moderate' | 'Premium'>('Basic');
  const [tagline, setTagline] = useState('');
  const [priceCAD, setPriceCAD] = useState<number>(200);
  const [priceNote, setPriceNote] = useState('One-time setup fee');
  const [billingFrequency, setBillingFrequency] = useState<'one_time' | 'monthly' | 'custom'>('one_time');
  const [isPopular, setIsPopular] = useState(false);
  const [turnaroundTime, setTurnaroundTime] = useState('5-7 Business Days');
  const [ctaText, setCtaText] = useState('Choose Plan');
  const [featuresInput, setFeaturesInput] = useState('');
  const [notIncludedInput, setNotIncludedInput] = useState('');

  const resetForm = () => {
    setTierName('Basic');
    setTagline('');
    setPriceCAD(200);
    setPriceNote('One-time setup fee');
    setBillingFrequency('one_time');
    setIsPopular(false);
    setTurnaroundTime('5-7 Business Days');
    setCtaText('Get Started');
    setFeaturesInput('');
    setNotIncludedInput('');
    setEditingPlan(null);
  };

  const openEditModal = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setTierName(plan.tierName);
    setTagline(plan.tagline);
    setPriceCAD(plan.priceCAD);
    setPriceNote(plan.priceNote);
    setBillingFrequency(plan.billingFrequency);
    setIsPopular(plan.isPopular);
    setTurnaroundTime(plan.turnaroundTime);
    setCtaText(plan.ctaText);
    setFeaturesInput(plan.features.join('\n'));
    setNotIncludedInput((plan.notIncluded || []).join('\n'));
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const features = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const notIncluded = notIncludedInput
      .split('\n')
      .map((n) => n.trim())
      .filter(Boolean);

    const payload = {
      tierName,
      tagline: tagline.trim(),
      priceCAD: Number(priceCAD),
      priceNote: priceNote.trim(),
      billingFrequency,
      isPopular,
      turnaroundTime: turnaroundTime.trim(),
      ctaText: ctaText.trim() || 'Select Plan',
      features,
      notIncluded: notIncluded.length > 0 ? notIncluded : undefined,
    };

    if (editingPlan) {
      await updatePricingPlan(editingPlan.id, payload);
    } else {
      await addPricingPlan(payload);
    }

    setShowModal(false);
    resetForm();
  };

  return (
    <AdminLayout
      title="Pricing Plans & Packages Manager"
      subtitle="Adjust package tiers (Basic CAD 200, Moderate CAD 500, Premium CAD 1,000+), deliverables, and pricing options"
      actions={
        <GoldButton
          size="sm"
          variant="solid"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Pricing Tier
        </GoldButton>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <GlassCard
            key={plan.id}
            glow={plan.isPopular}
            padding="lg"
            className={`flex flex-col justify-between space-y-6 relative ${
              plan.isPopular ? 'border-amber-400/50 shadow-[0_0_30px_rgba(212,175,55,0.15)]' : ''
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-slate-950" /> Most Popular
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{plan.tierName} Plan</h3>
                  <p className="text-xs text-slate-400">{plan.tagline}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(plan)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(plan.id)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    CAD ${plan.priceCAD.toLocaleString()}
                  </span>
                  {plan.billingFrequency === 'custom' ? (
                    <span className="text-xs text-amber-400 font-semibold">+</span>
                  ) : (
                    <span className="text-xs text-slate-400">/ {plan.billingFrequency.replace('_', ' ')}</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">{plan.priceNote}</div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Turnaround: {plan.turnaroundTime}</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Included Features ({plan.features.length}):
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.notIncluded && plan.notIncluded.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Not Included:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-500">
                    {plan.notIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 line-through">
                        <X className="w-3 h-3 text-slate-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500">CTA Label:</span>
              <span className="font-semibold text-amber-400">"{plan.ctaText}"</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <GlassCard glow padding="lg" className="max-w-lg w-full border-amber-500/40 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>{editingPlan ? `Edit ${editingPlan.tierName} Plan` : 'Add New Pricing Tier'}</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Plan Tier *</label>
                  <select
                    value={tierName}
                    onChange={(e) => setTierName(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Basic">Basic (CAD 200)</option>
                    <option value="Moderate">Moderate (CAD 500)</option>
                    <option value="Premium">Premium (CAD 1,000+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Price (CAD) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={priceCAD}
                    onChange={(e) => setPriceCAD(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Tagline *</label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Most Popular for High-Converting Growth"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Price Subtitle / Note</label>
                  <input
                    type="text"
                    value={priceNote}
                    onChange={(e) => setPriceNote(e.target.value)}
                    placeholder="One-time setup fee"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Turnaround Time</label>
                  <input
                    type="text"
                    value={turnaroundTime}
                    onChange={(e) => setTurnaroundTime(e.target.value)}
                    placeholder="7-10 Business Days"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Included Features (one per line) *</label>
                <textarea
                  required
                  rows={4}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Complete E-commerce or Booking Site&#10;Admin Panel&#10;WhatsApp Automation"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Not Included (one per line, optional)</label>
                <textarea
                  rows={2}
                  value={notIncludedInput}
                  onChange={(e) => setNotIncludedInput(e.target.value)}
                  placeholder="Enterprise ERP&#10;Custom Mobile App"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="pop"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <label htmlFor="pop" className="text-slate-300 cursor-pointer font-medium">
                  Mark as "Most Popular" Plan
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <GoldButton type="submit" size="sm" variant="solid">
                  {editingPlan ? 'Save Plan' : 'Create Plan'}
                </GoldButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Delete Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <GlassCard glow padding="lg" className="max-w-md w-full border-rose-500/40 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 text-rose-400">
              <AlertCircle className="w-5 h-5" />
              <span>Confirm Plan Deletion</span>
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove this pricing plan?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deletePricingPlan(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Plan
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
