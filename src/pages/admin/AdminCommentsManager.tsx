import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Star,
  Search,
  AlertCircle,
  X,
  Filter,
  Save,
  Link2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { CommentRecord } from '../../types/models';

export const AdminCommentsManager: React.FC = () => {
  const {
    comments,
    addComment,
    updateComment,
    deleteComment,
    moderateComment,
    toggleCommentPublish,
    demos,
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingComment, setEditingComment] = useState<CommentRecord | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [relatedPage, setRelatedPage] = useState('/resources');
  const [targetType, setTargetType] = useState<CommentRecord['targetType']>('page');
  const [approvalStatus, setApprovalStatus] = useState<CommentRecord['approvalStatus']>('approved');
  const [isPublished, setIsPublished] = useState(true);
  const [adminNotes, setAdminNotes] = useState('');

  const resetForm = () => {
    setAuthor('');
    setEmail('');
    setContent('');
    setRating(5);
    setRelatedPage('/resources');
    setTargetType('page');
    setApprovalStatus('approved');
    setIsPublished(true);
    setAdminNotes('');
    setEditingComment(null);
  };

  const openEditModal = (comm: CommentRecord) => {
    setEditingComment(comm);
    setAuthor(comm.author);
    setEmail(comm.email);
    setContent(comm.content);
    setRating(comm.rating);
    setRelatedPage(comm.relatedPage);
    setTargetType(comm.targetType);
    setApprovalStatus(comm.approvalStatus);
    setIsPublished(comm.isPublished);
    setAdminNotes(comm.adminNotes || '');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const payload = {
      author: author.trim(),
      email: email.trim() || 'feedback@tahanabi.com',
      content: content.trim(),
      rating: Number(rating),
      relatedPage,
      targetType,
      approvalStatus,
      isPublished,
      adminNotes: adminNotes.trim() || undefined,
    };

    if (editingComment) {
      await updateComment(editingComment.id, payload);
    } else {
      await addComment(payload);
    }

    setShowModal(false);
    resetForm();
  };

  const filteredComments = comments.filter((c) => {
    let matchesStatus = true;
    if (statusFilter === 'pending') matchesStatus = c.approvalStatus === 'pending';
    else if (statusFilter === 'approved') matchesStatus = c.approvalStatus === 'approved';
    else if (statusFilter === 'rejected') matchesStatus = c.approvalStatus === 'rejected';
    else if (statusFilter === 'published') matchesStatus = c.isPublished;
    else if (statusFilter === 'hidden') matchesStatus = !c.isPublished;

    const matchesSearch =
      c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.relatedPage.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <AdminLayout
      title="Client Comments & Reviews Moderation"
      subtitle="Moderate, approve, reject, publish, hide, edit, and associate comments with pages and demos"
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
          Manually Add Comment
        </GoldButton>
      }
    >
      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Comments' },
            { id: 'pending', label: 'Pending Review' },
            { id: 'approved', label: 'Approved' },
            { id: 'published', label: 'Published' },
            { id: 'hidden', label: 'Hidden' },
            { id: 'rejected', label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                statusFilter === tab.id
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
            placeholder="Search by author, text, target..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Comments Table */}
      {filteredComments.length === 0 ? (
        <GlassCard padding="lg" className="text-center py-12 space-y-2">
          <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm text-slate-300">No comments found matching filter.</p>
          <p className="text-xs text-slate-500">You can manually add customer testimonials or reviews above.</p>
        </GlassCard>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Author & Rating</th>
                <th className="py-3 px-4">Comment Content</th>
                <th className="py-3 px-4">Associated Target</th>
                <th className="py-3 px-4">Approval Status</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredComments.map((comm) => (
                <tr key={comm.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{comm.author}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{comm.email}</div>
                    <div className="flex items-center gap-0.5 text-amber-400 pt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < comm.rating ? 'fill-amber-400' : 'text-slate-700'}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-sm">
                    <p className="line-clamp-2 text-slate-200">{comm.content}</p>
                    {comm.adminNotes && (
                      <span className="text-[10px] text-amber-400/80 italic mt-0.5 block">
                        Note: {comm.adminNotes}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      <Link2 className="w-3 h-3 text-slate-500" />
                      {comm.relatedPage}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {comm.approvalStatus === 'approved' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Approved
                        </span>
                      ) : comm.approvalStatus === 'rejected' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                          Rejected
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          Pending
                        </span>
                      )}

                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => updateComment(comm.id, { approvalStatus: 'approved', isPublished: true })}
                          title="Approve & Publish"
                          className="p-1 rounded text-slate-400 hover:text-emerald-400"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateComment(comm.id, { approvalStatus: 'rejected', isPublished: false })}
                          title="Reject"
                          className="p-1 rounded text-slate-400 hover:text-rose-400"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleCommentPublish(comm.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border transition ${
                        comm.isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {comm.isPublished ? (
                        <>
                          <Eye className="w-3 h-3" /> Live
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" /> Hidden
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(comm)}
                        title="Edit Comment"
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingId(comm.id)}
                        title="Delete Comment"
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-500 hover:text-rose-400"
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
      )}

      {/* Add / Edit Comment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <GlassCard glow padding="lg" className="max-w-lg w-full border-amber-500/40 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>{editingComment ? 'Edit Comment' : 'Add New Review / Comment'}</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Tariq Al-Mansoor"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Author Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tariq@client.ae"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Comment Text *</label>
                <textarea
                  required
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Review or feedback content..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Star Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Associated Target</label>
                  <select
                    value={relatedPage}
                    onChange={(e) => setRelatedPage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  >
                    <option value="/resources">Articles (/resources)</option>
                    <option value="/demos/ecommerce">E-commerce Demo (/demos/ecommerce)</option>
                    <option value="/demos/ai-automation">AI Automation Demo (/demos/ai-automation)</option>
                    {demos.map((d) => (
                      <option key={d.id} value={`/demos#${d.slug}`}>
                        Demo: {d.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Approval Status</label>
                  <select
                    value={approvalStatus}
                    onChange={(e) => setApprovalStatus(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending Review</option>
                    <option value="rejected">Rejected</option>
                    <option value="spam">Spam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Public Display</label>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="pubComm"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-500"
                    />
                    <label htmlFor="pubComm" className="text-slate-300 font-medium cursor-pointer">
                      Published to live website
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Admin Internal Notes</label>
                <input
                  type="text"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Verified client in Abu Dhabi"
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
                  {editingComment ? 'Save Changes' : 'Create Comment'}
                </GoldButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <GlassCard glow padding="lg" className="max-w-md w-full border-rose-500/40 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 text-rose-400">
              <AlertCircle className="w-5 h-5" />
              <span>Confirm Comment Deletion</span>
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete this comment from database records?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteComment(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Comment
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
