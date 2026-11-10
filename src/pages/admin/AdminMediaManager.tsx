import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  Search,
  ExternalLink,
  Edit2,
  Upload,
  AlertCircle,
  X,
  FileImage,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { MediaAsset } from '../../types/models';

export const AdminMediaManager: React.FC = () => {
  const { mediaAssets, addMediaAsset, deleteMediaAsset, showToast } = useData();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<MediaAsset['category']>('demos');

  const handleCopyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    showToast(`Copied ${asset.fileName} URL`, 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim() || !url.trim()) return;

    addMediaAsset({
      fileName: fileName.trim(),
      url: url.trim(),
      category,
      fileSizeBytes: 420000,
      mimeType: 'image/jpeg',
    });

    setShowAddModal(false);
    setFileName('');
    setUrl('');
  };

  const filtered = mediaAssets.filter((m) => {
    const matchesCat = categoryFilter === 'all' || m.category === categoryFilter;
    const matchesSearch =
      m.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <AdminLayout
      title="Media & Assets Library"
      subtitle="Upload, replace, copy, and manage digital photography, logos, and UI screenshot assets"
      actions={
        <GoldButton
          size="sm"
          variant="solid"
          onClick={() => setShowAddModal(true)}
          icon={<Upload className="w-4 h-4" />}
        >
          Upload New Image
        </GoldButton>
      }
    >
      {/* Category Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Media' },
            { id: 'branding', label: 'Branding & Logos' },
            { id: 'demos', label: 'Demo Previews' },
            { id: 'hero', label: 'Hero & Backgrounds' },
            { id: 'team', label: 'Leadership' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                categoryFilter === tab.id
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
            placeholder="Search media files..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((asset) => (
          <GlassCard key={asset.id} padding="none" className="overflow-hidden flex flex-col justify-between group">
            <div className="relative h-44 overflow-hidden bg-slate-950">
              <img
                src={asset.url}
                alt={asset.fileName}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 font-mono text-[10px] border border-amber-500/30 capitalize">
                  {asset.category}
                </span>
              </div>
            </div>

            <div className="p-3 space-y-2 text-xs">
              <div className="font-semibold text-white truncate" title={asset.fileName}>
                {asset.fileName}
              </div>
              <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>{(asset.fileSizeBytes / 1000).toFixed(0)} KB</span>
                <span>{asset.uploadedAt}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleCopyUrl(asset)}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline font-mono"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy URL
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setDeletingId(asset.id)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Upload Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <GlassCard glow padding="lg" className="max-w-md w-full border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload / Link Image Asset</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Asset File Name *</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. jewellery-hero-cover.jpg"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Image URL / Path *</label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or /public/assets/..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="demos">Demo Previews</option>
                  <option value="branding">Branding & Logos</option>
                  <option value="hero">Hero & Backgrounds</option>
                  <option value="team">Leadership & Team</option>
                  <option value="general">General Asset</option>
                </select>
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
                  Save Asset
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
              <span>Confirm Asset Removal</span>
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this media asset?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteMediaAsset(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Asset
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
