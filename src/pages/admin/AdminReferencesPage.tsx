import React, { useState } from 'react';
import {
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Search,
  Globe,
  ArrowLeft,
  Save,
  X,
  Bookmark,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ReferenceItem } from '../../types/models';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminReferencesPage: React.FC = () => {
  const {
    references,
    addReference,
    updateReference,
    toggleReferenceStatus,
    deleteReference,
    navigate,
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRef, setEditingRef] = useState<ReferenceItem | null>(null);

  // New Reference Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ReferenceItem['category']>('jewellery');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [takeawayInput, setTakeawayInput] = useState('');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'jewellery', label: 'Jewellery' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'real_estate', label: 'Real Estate' },
    { id: 'tourism', label: 'Tourism' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'education', label: 'Education' },
    { id: 'ai_automation', label: 'AI Automation' },
    { id: 'pricing', label: 'Pricing Design' },
    { id: 'about_us', label: 'About Us' },
    { id: 'blog', label: 'Blog' },
    { id: 'booking', label: 'Booking' },
  ];

  const filteredReferences = references.filter((r) => {
    const matchesCat = selectedCategory === 'all' || r.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.title.toLowerCase().includes(q) ||
      r.url.toLowerCase().includes(q) ||
      r.categoryLabel.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    addReference({
      title: title.trim(),
      category,
      categoryLabel: categories.find((c) => c.id === category)?.label || 'General',
      url: url.trim(),
      description: description.trim() || 'Third-party reference architecture.',
      coverImage: coverImage.trim() || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      keyDesignTakeaways: takeawayInput.split(',').map((t) => t.trim()).filter(Boolean),
      isActive: true,
      displayOrder: references.length + 1,
    });

    setShowAddModal(false);
    setTitle('');
    setUrl('');
    setDescription('');
    setCoverImage('');
    setTagsInput('');
    setTakeawayInput('');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRef) return;
    updateReference(editingRef.id, editingRef);
    setEditingRef(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <button
            onClick={() => navigate('/references')}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Public Reference Library
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-400" />
            <span>Admin Console: Reference Library Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage external reference websites, active states, custom URLs, and design takeaways.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GoldButton
            size="sm"
            variant="solid"
            onClick={() => setShowAddModal(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add New Benchmark
          </GoldButton>
        </div>
      </div>

      {/* Filters and Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard glow padding="sm" className="space-y-1">
          <div className="text-[11px] text-slate-400">Total Benchmarks</div>
          <div className="text-2xl font-bold text-white font-mono">{references.length}</div>
        </GlassCard>
        <GlassCard glow padding="sm" className="space-y-1">
          <div className="text-[11px] text-slate-400">Active (Publicly Visible)</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {references.filter((r) => r.isActive).length}
          </div>
        </GlassCard>
        <GlassCard glow padding="sm" className="space-y-1">
          <div className="text-[11px] text-slate-400">Inactive / Hidden</div>
          <div className="text-2xl font-bold text-slate-500 font-mono">
            {references.filter((r) => !r.isActive).length}
          </div>
        </GlassCard>
        <GlassCard glow padding="sm" className="space-y-1">
          <div className="text-[11px] text-slate-400">Categories Covered</div>
          <div className="text-2xl font-bold text-amber-400 font-mono">12 Categories</div>
        </GlassCard>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or URL..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Table of References */}
      <GlassCard glow padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              <tr>
                <th className="p-3.5">Reference Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">External Target URL</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredReferences.map((ref) => (
                <tr key={ref.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{ref.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 max-w-sm mt-0.5">
                      {ref.description}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300 font-mono text-[10px]">
                      {ref.categoryLabel}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-[11px]">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-1 max-w-xs truncate"
                    >
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{ref.url}</span>
                    </a>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => toggleReferenceStatus(ref.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition ${
                        ref.isActive
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {ref.isActive ? 'Active (Live)' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingRef(ref)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="Edit reference"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete reference "${ref.title}"?`)) {
                            deleteReference(ref.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition"
                        title="Delete reference"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Add Benchmark Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add New Website Benchmark</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Benchmark Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Stripe Billing"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    {categories.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Exact External URL *</label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Design &amp; Architecture Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Why is this a design/technical benchmark?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Key Takeaways (comma separated)</label>
                <input
                  type="text"
                  value={takeawayInput}
                  onChange={(e) => setTakeawayInput(e.target.value)}
                  placeholder="Clean pricing grid, Interactive sliders, Sub-second checkout"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="SaaS, Checkout, Minimalist"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <GoldButton size="sm" variant="solid" type="submit">
                  Save Benchmark
                </GoldButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Benchmark Modal */}
      {editingRef && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Edit Website Benchmark</h3>
              <button onClick={() => setEditingRef(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Title</label>
                <input
                  type="text"
                  required
                  value={editingRef.title}
                  onChange={(e) => setEditingRef({ ...editingRef, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Target URL</label>
                <input
                  type="url"
                  required
                  value={editingRef.url}
                  onChange={(e) => setEditingRef({ ...editingRef, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={editingRef.description}
                  onChange={(e) => setEditingRef({ ...editingRef, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRef(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <GoldButton size="sm" variant="solid" type="submit" icon={<Save className="w-3.5 h-3.5" />}>
                  Save Changes
                </GoldButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
