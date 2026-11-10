import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  X,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { IndustryItem } from '../../types/models';

export const AdminIndustriesManager: React.FC = () => {
  const { industries, addIndustry, updateIndustry, deleteIndustry } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<IndustryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [statsHeadline, setStatsHeadline] = useState('');
  const [useCasesInput, setUseCasesInput] = useState('');

  const resetForm = () => {
    setName('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80');
    setStatsHeadline('');
    setUseCasesInput('');
    setEditingIndustry(null);
  };

  const openEditModal = (item: IndustryItem) => {
    setEditingIndustry(item);
    setName(item.name);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setStatsHeadline(item.statsHeadline || '');
    setUseCasesInput(item.keyUseCases.join('\n'));
    setShowAddModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const keyUseCases = useCasesInput
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const payload = {
      name: name.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      iconName: 'Layers',
      slug,
      keyUseCases: keyUseCases.length > 0 ? keyUseCases : ['Custom ERP Workflows', 'Client Portals'],
      statsHeadline: statsHeadline.trim() || undefined,
    };

    if (editingIndustry) {
      await updateIndustry(editingIndustry.id, payload);
    } else {
      await addIndustry(payload);
    }

    setShowAddModal(false);
    resetForm();
  };

  const filtered = industries.filter((ind) =>
    ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ind.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout
      title="Industry Verticals Manager"
      subtitle="Configure tailored industry landing profiles, metrics, and key automation workflows"
      actions={
        <GoldButton
          size="sm"
          variant="solid"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Industry
        </GoldButton>
      }
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          Showing <span className="text-amber-400 font-bold">{filtered.length}</span> active industry categories
        </p>

        <div className="relative w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search industries..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((ind) => (
          <GlassCard key={ind.id} padding="none" className="overflow-hidden flex flex-col justify-between group">
            <div className="relative h-36 overflow-hidden">
              <img
                src={ind.imageUrl}
                alt={ind.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white drop-shadow">{ind.name}</span>
                <span className="text-[10px] font-mono text-amber-400 bg-slate-950/80 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {ind.keyUseCases.length} use cases
                </span>
              </div>
            </div>

            <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between text-xs">
              <p className="text-slate-400 text-[11px] line-clamp-2">{ind.description}</p>
              {ind.statsHeadline && (
                <div className="text-[10px] text-amber-300 font-mono bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                  {ind.statsHeadline}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono">/{ind.slug}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(ind)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(ind.id)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Add / Edit Industry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <GlassCard glow padding="lg" className="max-w-lg w-full border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>{editingIndustry ? 'Edit Industry Vertical' : 'Add New Industry'}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Industry Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jewellery & Luxury Retail"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description *</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of business needs and technology solutions..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Key Use Cases (one per line)</label>
                <textarea
                  rows={3}
                  value={useCasesInput}
                  onChange={(e) => setUseCasesInput(e.target.value)}
                  placeholder="Online Product Variations&#10;WhatsApp Price Inquiries&#10;Multi-Branch Inventory Sync"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Headline Metric Banner</label>
                <input
                  type="text"
                  value={statsHeadline}
                  onChange={(e) => setStatsHeadline(e.target.value)}
                  placeholder="e.g. 3.4x Higher Inquiries with WhatsApp Concierge"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
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
                  {editingIndustry ? 'Save Changes' : 'Create Industry'}
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
              <span>Confirm Industry Deletion</span>
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this industry profile? It will no longer appear on public website routes.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteIndustry(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Industry
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
