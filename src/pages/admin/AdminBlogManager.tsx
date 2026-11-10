import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Search,
  Calendar,
  User,
  Clock,
  X,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { ArticleItem } from '../../types/models';

export const AdminBlogManager: React.FC = () => {
  const { articles, addArticle, updateArticle, deleteArticle, navigate, selectArticle } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ArticleItem['category']>('AI & Automation');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('6 min read');
  const [coverImage, setCoverImage] = useState('');
  const [authorName, setAuthorName] = useState('MD Juned');
  const [authorRole, setAuthorRole] = useState('CEO & Full-Stack Architect (NIT Trichy 2024)');
  const [tagsInput, setTagsInput] = useState('');

  const resetForm = () => {
    setTitle('');
    setCategory('AI & Automation');
    setExcerpt('');
    setContent('');
    setReadTime('6 min read');
    setCoverImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');
    setAuthorName('MD Juned');
    setAuthorRole('CEO & Full-Stack Architect (NIT Trichy 2024)');
    setTagsInput('');
    setEditingArticle(null);
  };

  const openEditModal = (art: ArticleItem) => {
    setEditingArticle(art);
    setTitle(art.title);
    setCategory(art.category);
    setExcerpt(art.excerpt);
    setContent(art.content);
    setReadTime(art.readTime);
    setCoverImage(art.coverImage);
    setAuthorName(art.author.name);
    setAuthorRole(art.author.role);
    setTagsInput(art.tags.join(', '));
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const payload = {
      title: title.trim(),
      slug,
      category,
      excerpt: excerpt.trim(),
      content: content.trim() || excerpt.trim(),
      readTime,
      coverImage: coverImage.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      author: {
        name: authorName,
        role: authorRole,
      },
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: tags.length > 0 ? tags : ['AI', 'Engineering'],
      comments: editingArticle ? editingArticle.comments : [],
    };

    if (editingArticle) {
      await updateArticle(editingArticle.id, payload);
    } else {
      await addArticle(payload);
    }

    setShowModal(false);
    resetForm();
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout
      title="Articles & Knowledge Base Manager"
      subtitle="Create, edit, publish, and delete research publications and engineering articles"
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
          Write Article
        </GoldButton>
      }
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          Showing <span className="text-amber-400 font-bold">{filtered.length}</span> published publications
        </p>

        <div className="relative w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((art) => (
          <GlassCard key={art.id} padding="none" className="overflow-hidden flex flex-col justify-between group">
            <div className="relative h-44 overflow-hidden">
              <img
                src={art.coverImage}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-300 font-mono text-[10px] font-semibold border border-amber-500/30">
                  {art.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
              <div className="space-y-1.5">
                <h3 className="font-bold text-white text-sm line-clamp-2">{art.title}</h3>
                <p className="text-slate-400 text-[11px] line-clamp-2 leading-relaxed">{art.excerpt}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>{art.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-slate-500">{art.publishedAt}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        selectArticle(art);
                        navigate('/resources');
                      }}
                      title="View Article"
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openEditModal(art)}
                      title="Edit Article"
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingId(art.id)}
                      title="Delete Article"
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Add / Edit Article Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <GlassCard glow padding="lg" className="max-w-2xl w-full border-amber-500/40 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>{editingArticle ? 'Edit Article Publication' : 'Create New Article'}</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. How AI Automation Increases Business Revenue by 3x"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Business Growth">Business Growth</option>
                    <option value="Case Studies">Case Studies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="6 min read"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Author Name</label>
                  <select
                    value={authorName}
                    onChange={(e) => {
                      setAuthorName(e.target.value);
                      if (e.target.value === 'MD Juned') {
                        setAuthorRole('CEO & Full-Stack Architect (NIT Trichy 2024)');
                      } else if (e.target.value === 'Satpal Kumar') {
                        setAuthorRole('Founder & Systems Architect (NIT Trichy 2023)');
                      } else {
                        setAuthorRole('Senior AI Engineer (5+ Years)');
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="MD Juned">MD Juned (CEO)</option>
                    <option value="Satpal Kumar">Satpal Kumar (Founder)</option>
                    <option value="Tahanabi Engineering Desk">Tahanabi Engineering Desk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Summary Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short introductory summary for card view..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Content (Markdown)</label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="### Detailed breakdown&#10;In-depth technical architecture..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="AI Concierge, Revenue Growth, WhatsApp Automation"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
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
                  {editingArticle ? 'Save Changes' : 'Publish Article'}
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
              <span>Confirm Article Deletion</span>
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete this article from knowledge base and public view?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteArticle(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Article
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
