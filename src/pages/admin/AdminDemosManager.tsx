import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Search,
  ExternalLink,
  CheckCircle,
  X,
  AlertCircle,
  Image as ImageIcon,
  Layers,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { DemoItem } from '../../types/models';

export const AdminDemosManager: React.FC = () => {
  const {
    demos,
    addDemo,
    updateDemo,
    deleteDemo,
    togglePublishDemo,
    toggleFeatureDemo,
    navigate,
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDemo, setEditingDemo] = useState<DemoItem | null>(null);
  const [deletingDemoId, setDeletingDemoId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DemoItem['category']>('ecommerce');
  const [subCategory, setSubCategory] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [clientName, setClientName] = useState('');
  const [industry, setIndustry] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const resetForm = () => {
    setTitle('');
    setCategory('ecommerce');
    setSubCategory('');
    setShortDesc('');
    setLongDesc('');
    setClientName('');
    setIndustry('');
    setCoverImage('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80');
    setDemoUrl('/demos/ecommerce');
    setTagsInput('');
    setFeaturesInput('');
    setIsPublished(true);
    setEditingDemo(null);
  };

  const openEditModal = (demo: DemoItem) => {
    setEditingDemo(demo);
    setTitle(demo.title);
    setCategory(demo.category);
    setSubCategory(demo.subCategory || '');
    setShortDesc(demo.shortDescription);
    setLongDesc(demo.longDescription || '');
    setClientName(demo.clientName);
    setIndustry(demo.industry);
    setCoverImage(demo.coverImage);
    setDemoUrl(demo.demoUrl || '');
    setTagsInput(demo.tags.join(', '));
    setFeaturesInput(demo.features.join('\n'));
    setIsPublished(demo.isPublished);
    setShowAddModal(true);
  };

  const handleSaveDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const features = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const payload = {
      title: title.trim(),
      category,
      subCategory: subCategory.trim() || undefined,
      shortDescription: shortDesc.trim(),
      longDescription: longDesc.trim() || undefined,
      clientName: clientName.trim() || 'Enterprise Client',
      industry: industry.trim() || 'General Business',
      coverImage: coverImage.trim() || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      demoUrl: demoUrl.trim() || undefined,
      tags: tags.length > 0 ? tags : ['Technology', 'AI'],
      features,
      isPublished,
      slug,
    };

    if (editingDemo) {
      await updateDemo(editingDemo.id, payload);
    } else {
      await addDemo(payload);
    }

    setShowAddModal(false);
    resetForm();
  };

  const filteredDemos = demos.filter((demo) => {
    const matchesCategory = selectedCategory === 'all' || demo.category === selectedCategory;
    const matchesSearch =
      demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AdminLayout
      title="Live Demo Portfolio Manager"
      subtitle="Publish, unpublish, feature, and configure production technology showcases"
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
          Add New Demo
        </GoldButton>
      }
    >
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Demos' },
            { id: 'ecommerce', label: 'E-commerce' },
            { id: 'ai_automation', label: 'AI Automation' },
            { id: 'b2b_services', label: 'B2B Services' },
            { id: 'custom_apps', label: 'Custom Apps' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === tab.id
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search demos by title, industry..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Demos Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase font-semibold">
            <tr>
              <th className="py-3 px-4">Demo Showcase</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Industry & Client</th>
              <th className="py-3 px-4">Features</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredDemos.map((demo) => {
              const isFeatured = demo.tags.includes('Featured');
              return (
                <tr key={demo.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={demo.coverImage}
                        alt={demo.title}
                        className="w-12 h-10 object-cover rounded-lg border border-slate-800 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{demo.title}</span>
                          {isFeatured && (
                            <span className="p-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 max-w-xs truncate">
                          {demo.shortDescription}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-mono text-[10px] capitalize">
                      {demo.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">{demo.industry}</div>
                    <div className="text-[11px] text-slate-500">{demo.clientName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-400">
                      {demo.features.length} features
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => togglePublishDemo(demo.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition ${
                        demo.isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                      }`}
                    >
                      {demo.isPublished ? (
                        <>
                          <Eye className="w-3 h-3" /> Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" /> Unpublished
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toggleFeatureDemo(demo.id)}
                        title="Toggle Featured"
                        className={`p-1.5 rounded-lg border transition ${
                          isFeatured
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-white'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEditModal(demo)}
                        title="Edit Demo"
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingDemoId(demo.id)}
                        title="Delete Demo"
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-500 hover:text-rose-400 hover:border-rose-400/40 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Demo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <GlassCard glow padding="lg" className="max-w-2xl w-full border-amber-500/40 my-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{editingDemo ? 'Edit Demo Details' : 'Add New Live Demo Showcase'}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDemo} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Demo Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. RoyalSparkle Jewellers"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="ecommerce">E-commerce</option>
                    <option value="ai_automation">AI Automation</option>
                    <option value="b2b_services">B2B Services</option>
                    <option value="custom_apps">Custom Business Apps</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Kaveri Heritage Gems"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Industry Vertical</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Jewellery & Luxury Retail"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="One or two sentences explaining the business solution..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Gold rate live calculator&#10;WhatsApp invoice checkout&#10;COA certificate generator"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="E-commerce, Jewellery, Featured"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Interactive Demo URL</label>
                  <input
                    type="text"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="/demos/ecommerce"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isPub"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <label htmlFor="isPub" className="text-slate-300 cursor-pointer font-medium">
                  Publish immediately to public website
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <GoldButton type="submit" size="sm" variant="solid">
                  {editingDemo ? 'Save Demo Changes' : 'Create Demo'}
                </GoldButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingDemoId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <GlassCard glow padding="lg" className="max-w-md w-full border-rose-500/40 space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Confirm Demo Removal</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete this demo showcase? This operation will remove it from database tables and public listings immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setDeletingDemoId(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteDemo(deletingDemoId);
                  setDeletingDemoId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500 transition"
              >
                Yes, Delete Demo
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
