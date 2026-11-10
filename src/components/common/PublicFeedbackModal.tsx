import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Send,
  Loader2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GoldButton } from './GoldButton';

export const PublicFeedbackModal: React.FC = () => {
  const {
    isFeedbackModalOpen,
    feedbackModalData,
    closeFeedbackModal,
    submitPublicFeedback,
    showToast,
  } = useData();

  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [relatedPage, setRelatedPage] = useState('RoyalSparkle Jewellers Demo');
  const [commentContent, setCommentContent] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isFeedbackModalOpen) {
      setSubmitted(false);
      setErrors({});
      if (feedbackModalData?.relatedPage) {
        setRelatedPage(feedbackModalData.relatedPage);
      }
    }
  }, [isFeedbackModalOpen, feedbackModalData]);

  if (!isFeedbackModalOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!authorName.trim() || authorName.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!authorEmail.trim() || !emailRegex.test(authorEmail.trim())) {
      errs.email = 'Please provide a valid work/personal email address.';
    }
    if (!commentContent.trim() || commentContent.trim().length < 8) {
      errs.content = 'Please enter your comment or review (at least 8 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam check
    if (honeypot.trim()) {
      closeFeedbackModal();
      return;
    }

    if (!validate()) {
      showToast('Please check the required fields in your review.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitPublicFeedback({
        author: authorName.trim(),
        email: authorEmail.trim(),
        content: commentContent.trim(),
        rating,
        relatedPage,
        targetType: feedbackModalData?.targetType || 'demo',
      });

      if (res.success) {
        setSubmitted(true);
        showToast('Feedback submitted for moderation', 'success');
      } else {
        showToast(res.message || 'Failed to submit feedback', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving feedback', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-slate-950 border border-amber-500/40 shadow-[0_0_60px_rgba(212,175,55,0.25)] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base text-white">
              {submitted ? 'Feedback Received' : 'Leave Client Feedback / Review'}
            </h3>
          </div>
          <button
            onClick={closeFeedbackModal}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Notice */}
              <p className="text-slate-400 text-xs leading-relaxed">
                We value authentic feedback. In accordance with our anti-spam and quality standards, all new comments are reviewed by our engineering moderators before appearing publicly.
              </p>

              {/* Anti-spam trap */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {/* Rating Selector */}
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Rating (Optional)
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 rounded-lg hover:bg-slate-900 transition"
                      aria-label={`Rate ${star} star`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-semibold text-amber-300 ml-2">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Your Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => {
                      setAuthorName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Rashid Al-Husseini"
                    className={`w-full bg-slate-950 border rounded-xl px-3 py-2 text-white focus:outline-none ${
                      errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-rose-400 mt-0.5">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Your Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={authorEmail}
                    onChange={(e) => {
                      setAuthorEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="e.g. rashid@fleet.ae"
                    className={`w-full bg-slate-950 border rounded-xl px-3 py-2 text-white focus:outline-none ${
                      errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-amber-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-rose-400 mt-0.5">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Related Page / Demo */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Related Demo or Platform
                </label>
                <select
                  value={relatedPage}
                  onChange={(e) => setRelatedPage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="RoyalSparkle Jewellers Demo">RoyalSparkle Jewellers (E-commerce Demo)</option>
                  <option value="DiamondLease Car Rental Demo">DiamondLease Car Rental (AI Concierge Demo)</option>
                  <option value="Velvet Dine Ordering Demo">Velvet Dine Restaurant (Ordering Demo)</option>
                  <option value="B2B Car Service Automation">B2B Car Service Automation</option>
                  <option value="General Agency Engineering Services">General Agency Engineering Services</option>
                  <option value="Pricing Tiers (CAD 200 / 500 / 1000+)">Pricing Tiers (CAD 200 / 500 / 1000+)</option>
                  <option value="Resources & Articles">Resources &amp; Technical Insights</option>
                </select>
              </div>

              {/* Feedback Content */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Your Review / Comment <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={commentContent}
                  onChange={(e) => {
                    setCommentContent(e.target.value);
                    if (errors.content) setErrors({ ...errors, content: '' });
                  }}
                  placeholder="Share your experience, feature impressions, or questions for our engineering leadership..."
                  className={`w-full bg-slate-950 border rounded-xl px-3 py-2 text-white focus:outline-none ${
                    errors.content ? 'border-rose-500' : 'border-slate-800 focus:border-amber-400'
                  }`}
                />
                {errors.content && (
                  <p className="text-[10px] text-rose-400 mt-0.5">{errors.content}</p>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Your email is never displayed publicly. Initial status will be set to Pending Approval.</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <button
                  type="button"
                  onClick={closeFeedbackModal}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <GoldButton
                  type="submit"
                  size="sm"
                  variant="solid"
                  disabled={isSubmitting}
                  icon={
                    isSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-slate-950" />
                    )
                  }
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </GoldButton>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Review Submitted Successfully</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you, <strong>{authorName}</strong>! Your review has been saved in our moderation queue. Once approved by our team, it will appear publicly on the website.
                </p>
              </div>
              <div className="pt-2">
                <GoldButton size="sm" variant="outline" onClick={closeFeedbackModal}>
                  Done
                </GoldButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
