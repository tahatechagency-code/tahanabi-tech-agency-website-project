import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  User,
  Send,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ArticleItem } from '../../types/models';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const ResourcesPage: React.FC = () => {
  const { articles, selectedArticle, selectArticle, submitComment } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Comment Form state
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const categories = ['all', 'AI & Automation', 'E-commerce', 'Business Growth', 'Case Studies'];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticle || !authorName.trim() || !commentContent.trim()) return;

    submitComment(selectedArticle.id, {
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim(),
      content: commentContent.trim(),
    });

    setCommentSuccess(true);
    setAuthorName('');
    setAuthorEmail('');
    setCommentContent('');
    setTimeout(() => setCommentSuccess(false), 5000);
  };

  // If viewing an individual article
  if (selectedArticle) {
    const relatedArticles = articles
      .filter((a) => a.id !== selectedArticle.id)
      .slice(0, 2);

    return (
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        {/* Back Button */}
        <div>
          <button
            onClick={() => selectArticle(null)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Resources
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-semibold">
              {selectedArticle.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {selectedArticle.readTime}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{selectedArticle.publishedAt}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {selectedArticle.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-amber-400 text-xs">
                  {selectedArticle.author.name.charAt(0)}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-white">{selectedArticle.author.name}</div>
                <div className="text-xs text-slate-400">{selectedArticle.author.role}</div>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied to clipboard!');
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-amber-500/25 bg-slate-950">
          <img
            src={selectedArticle.coverImage}
            alt={selectedArticle.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <GlassCard glow padding="xl" className="space-y-6 text-slate-200 leading-relaxed text-sm sm:text-base font-sans">
          <div className="prose prose-invert max-w-none space-y-4">
            <p className="text-base sm:text-lg font-medium text-amber-200 leading-relaxed border-l-2 border-amber-400 pl-4">
              {selectedArticle.excerpt}
            </p>

            <div className="whitespace-pre-line text-slate-300 leading-loose">
              {selectedArticle.content}
            </div>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-2">
            {selectedArticle.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Comment Section & Moderation Form */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>Discussion &amp; Insights ({selectedArticle.comments.length})</span>
            </h3>
          </div>

          {/* Existing Comments */}
          {selectedArticle.comments.length > 0 ? (
            <div className="space-y-3">
              {selectedArticle.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{comment.authorName}</span>
                    <span className="text-[10px] text-slate-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-300">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No approved comments yet. Be the first to share your thoughts.</p>
          )}

          {/* Comment Form */}
          <GlassCard glow padding="lg" className="space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Leave a Reply / Ask an Engineer:
            </h4>

            {commentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! Your comment has been submitted and is pending moderation by the editorial team.</span>
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your Full Name"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="email"
                  required
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="Your Business Email"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <textarea
                rows={3}
                required
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Share your perspective or ask a question..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <div className="flex justify-end">
                <GoldButton size="sm" variant="solid" icon={<Send className="w-3.5 h-3.5" />}>
                  Submit For Review
                </GoldButton>
              </div>
            </form>
          </GlassCard>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 pt-10 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white">Related Technical Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => selectArticle(rel)}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 cursor-pointer transition space-y-2 group"
                >
                  <span className="text-[10px] text-amber-400 font-semibold">{rel.category}</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-medium pt-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Articles Catalog Grid View
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Engineering Insights &amp; Strategy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Resources &amp; <span className="text-gold-gradient">Technical Guides</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          In-depth architectural breakdowns, e-commerce conversion checklists, and AI automation blueprints written directly by our founders.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium shrink-0 transition ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, tags..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <GlassCard
            key={article.id}
            glow
            padding="none"
            className="overflow-hidden flex flex-col justify-between group cursor-pointer"
            onClick={() => selectArticle(article)}
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur border border-amber-400/30 text-[10px] text-amber-300 font-semibold">
                  {article.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
