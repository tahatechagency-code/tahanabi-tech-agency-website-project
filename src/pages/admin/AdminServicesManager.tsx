import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  AlertCircle,
  Car,
  ShoppingBag,
  Bot,
  Code2,
  Network,
  Globe,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { ServiceItem } from '../../types/models';

export const AdminServicesManager: React.FC = () => {
  const { services, addService, updateService, deleteService, showToast } = useData();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Briefcase');
  const [idealFor, setIdealFor] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [deliverablesInput, setDeliverablesInput] = useState('');

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setDescription('');
    setIconName('Briefcase');
    setIdealFor('');
    setFeaturesInput('');
    setDeliverablesInput('');
    setEditingService(null);
  };

  const openEditModal = (srv: ServiceItem) => {
    setEditingService(srv);
    setTitle(srv.title);
    setSubtitle(srv.subtitle);
    setDescription(srv.description);
    setIconName(srv.iconName);
    setIdealFor(srv.idealFor);
    setFeaturesInput(srv.features.join('\n'));
    setDeliverablesInput(srv.deliverables.join('\n'));
    setShowAddModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const features = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const deliverables = deliverablesInput
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || 'Tailored Business Engineering',
      description: description.trim(),
      iconName: iconName || 'Briefcase',
      features: features.length > 0 ? features : ['High Performance Architecture', 'Production Ready SLA'],
      deliverables: deliverables.length > 0 ? deliverables : ['Core Platform', 'Documentation'],
      idealFor: idealFor.trim() || 'Enterprises & Fast-Growing Businesses',
      slug,
    };

    if (editingService) {
      await updateService(editingService.id, payload);
    } else {
      await addService(payload);
    }

    setShowAddModal(false);
    resetForm();
  };

  // Special Prompt Requirement: "Allow admin to add B2B Car Service Automation manually"
  const handleAddB2BCarServiceManually = async () => {
    const existing = services.find((s) => s.slug === 'b2b-car-service-automation');
    if (existing) {
      showToast('B2B Car Service Automation service already exists', 'info');
      return;
    }

    await addService({
      title: 'B2B Car Service Automation',
      subtitle: 'Complete Fleet, Rental & Ground Transport Solution',
      description:
        'End-to-end digital automation for car rental companies, fleet leasing firms, and chauffeur fleets across UAE, GCC, and India. Features automated booking, digital agreement signatures, and WhatsApp driver alerts.',
      iconName: 'Car',
      features: [
        'Real-Time Vehicle Availability Calendar & Tariff Engine',
        'Official WhatsApp Business Automated Booking & Quotes',
        'Driver License & Emirates ID Digital Upload Portal',
        'Automated Security Deposit Pre-Authorization & Refund',
        'Multi-Branch Fleet Location Sync (Airport & Showroom)',
        'Salik Toll & Traffic Fine Automatic Deductions API',
      ],
      deliverables: [
        'Fleet Management Web App',
        'Customer Booking Portal',
        'WhatsApp Automation Bot',
        'Admin Dispatch Dashboard',
      ],
      idealFor: 'Luxury Car Rentals, Chauffeur Fleets, Corporate Leasing & Ground Transportation Networks',
      slug: 'b2b-car-service-automation',
    });
    showToast('B2B Car Service Automation added to production services!', 'success');
  };

  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'shoppingbag':
        return <ShoppingBag className="w-5 h-5 text-amber-400" />;
      case 'bot':
        return <Bot className="w-5 h-5 text-amber-400" />;
      case 'car':
        return <Car className="w-5 h-5 text-amber-400" />;
      case 'code2':
        return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'network':
        return <Network className="w-5 h-5 text-amber-400" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-amber-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <AdminLayout
      title="Business Services Manager"
      subtitle="Configure customer offerings, deliverable packages, feature lists, and targeted client profiles"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddB2BCarServiceManually}
            className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Add B2B Car Service</span>
          </button>
          <GoldButton
            size="sm"
            variant="solid"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            icon={<Plus className="w-4 h-4" />}
          >
            Create Service
          </GoldButton>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((srv) => (
          <GlassCard key={srv.id} padding="md" className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
                  {getServiceIcon(srv.iconName)}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(srv)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(srv.id)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{srv.title}</h3>
                <p className="text-[11px] text-amber-400/90 font-medium">{srv.subtitle}</p>
              </div>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{srv.description}</p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Key Deliverables:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {srv.deliverables.map((d, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 text-[10px]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>/{srv.slug}</span>
              <span className="text-amber-300 font-sans">{srv.features.length} features</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <GlassCard glow padding="lg" className="max-w-xl w-full border-amber-500/40 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>{editingService ? 'Edit Service Offering' : 'Add New Business Service'}</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. AI Automation & Chatbots"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Subtitle Tagline</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. 24/7 Autonomous Customer Agents"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description *</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive service description explaining technical deliverables..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Icon Category</label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="ShoppingBag">ShoppingBag (E-Commerce)</option>
                    <option value="Bot">Bot (AI Concierge)</option>
                    <option value="Car">Car (Fleet & Rental)</option>
                    <option value="Code2">Code2 (Custom Software)</option>
                    <option value="Network">Network (Integrations & CRM)</option>
                    <option value="Globe">Globe (Global Hosting)</option>
                    <option value="Briefcase">Briefcase (General Business)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Ideal Client Profile</label>
                  <input
                    type="text"
                    value={idealFor}
                    onChange={(e) => setIdealFor(e.target.value)}
                    placeholder="e.g. Jewellery, Car Rentals, Luxury Brands"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Features (one per line)</label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="24/7 Autonomous AI Agent&#10;WhatsApp Cloud API Integration&#10;CRM Lead Auto-Sync"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Deliverables (one per line)</label>
                <textarea
                  rows={2}
                  value={deliverablesInput}
                  onChange={(e) => setDeliverablesInput(e.target.value)}
                  placeholder="Custom AI Engine&#10;WhatsApp Business Setup&#10;Admin Portal"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <GoldButton type="submit" size="sm" variant="solid">
                  {editingService ? 'Save Changes' : 'Create Service'}
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
              <span>Confirm Service Removal</span>
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this service? It will be removed from solutions pages and public navigation immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteService(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Service
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
