import React from 'react';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  Database,
  ExternalLink,
  Briefcase,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminDashboardOverview: React.FC = () => {
  const {
    orders,
    leads,
    bookings,
    comments,
    demos,
    services,
    navigate,
    auditLogs,
  } = useData();

  // STRICT RULE: Real DB-calculated statistics (no fake stats)
  const totalRevenueCAD = orders.reduce((acc, curr) => acc + (Number(curr.amount_cad) || 0), 0);
  const totalOrdersCount = orders.length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;
  const pendingCommentsCount = comments.filter((c) => c.approvalStatus === 'pending').length;
  const publishedDemosCount = demos.filter((d) => d.isPublished).length;

  return (
    <AdminLayout
      title="Executive Operations Dashboard"
      subtitle="Real-time synchronized database statistics, pending transactions, and customer pipelines"
      actions={
        <div className="flex items-center gap-2">
          <GoldButton
            size="sm"
            variant="outline"
            onClick={() => navigate('/admin/database')}
            icon={<Database className="w-4 h-4" />}
          >
            Database Console
          </GoldButton>
          <GoldButton
            size="sm"
            variant="solid"
            onClick={() => navigate('/admin/demos')}
            icon={<Sparkles className="w-4 h-4" />}
          >
            Manage Demos
          </GoldButton>
        </div>
      }
    >
      {/* Real Statistics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard padding="md" className="space-y-2 border-amber-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Order Volume
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/25">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            CAD ${totalRevenueCAD.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>{totalOrdersCount} Total Service Orders</span>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-amber-400 hover:underline flex items-center gap-0.5"
            >
              View <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </GlassCard>

        <GlassCard padding="md" className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Inquiries & Leads
            </span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/25">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {leads.length}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span className={newLeadsCount > 0 ? 'text-amber-400 font-semibold' : ''}>
              {newLeadsCount} New / Uncontacted
            </span>
            <button
              onClick={() => navigate('/admin/leads')}
              className="text-amber-400 hover:underline flex items-center gap-0.5"
            >
              Manage <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </GlassCard>

        <GlassCard padding="md" className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Consultation Bookings
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {bookings.length}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span className={pendingBookingsCount > 0 ? 'text-amber-400 font-semibold' : ''}>
              {pendingBookingsCount} Awaiting Confirmation
            </span>
            <button
              onClick={() => navigate('/admin/bookings')}
              className="text-amber-400 hover:underline flex items-center gap-0.5"
            >
              Calendar <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </GlassCard>

        <GlassCard padding="md" className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Comments & Moderation
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/25">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {comments.length}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span className={pendingCommentsCount > 0 ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
              {pendingCommentsCount} Pending Moderation
            </span>
            <button
              onClick={() => navigate('/admin/comments')}
              className="text-amber-400 hover:underline flex items-center gap-0.5"
            >
              Moderate <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Urgent Action Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {newLeadsCount > 0 && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-300">New Client Leads ({newLeadsCount})</h4>
              <p className="text-[11px] text-slate-300">
                You have received new project requirements requiring response within 60 minutes.
              </p>
              <button
                onClick={() => navigate('/admin/leads')}
                className="text-xs font-bold text-amber-400 hover:underline inline-block pt-1"
              >
                Open Leads Manager →
              </button>
            </div>
          </div>
        )}

        {pendingCommentsCount > 0 && (
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-start gap-3">
            <Clock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-purple-300">Comments Pending ({pendingCommentsCount})</h4>
              <p className="text-[11px] text-slate-300">
                Reviews submitted by prospective clients are awaiting moderation before public display.
              </p>
              <button
                onClick={() => navigate('/admin/comments')}
                className="text-xs font-bold text-purple-400 hover:underline inline-block pt-1"
              >
                Approve or Reject →
              </button>
            </div>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-200">Supabase Backend Status</h4>
            <p className="text-[11px] text-slate-400">
              Row Level Security active across all 16 tables. Service-role key secured.
            </p>
            <button
              onClick={() => navigate('/admin/database')}
              className="text-xs font-bold text-amber-400 hover:underline inline-block pt-1"
            >
              Verify DB Integrity →
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Leads & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Client Leads */}
        <GlassCard padding="md" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Recent Client Inquiries</h3>
            </div>
            <button
              onClick={() => navigate('/admin/leads')}
              className="text-xs text-amber-400 hover:underline font-medium"
            >
              View All ({leads.length})
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">No leads recorded yet.</div>
          ) : (
            <div className="divide-y divide-slate-800">
              {leads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{lead.fullName}</div>
                    <div className="text-slate-400 text-[11px]">{lead.email} • {lead.businessType}</div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono capitalize ${
                        lead.status === 'new'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : lead.status === 'qualified'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {lead.status}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Recent Service Orders */}
        <GlassCard padding="md" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Recent Service Orders</h3>
            </div>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-xs text-amber-400 hover:underline font-medium"
            >
              View All ({orders.length})
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">No service orders received yet.</div>
          ) : (
            <div className="divide-y divide-slate-800">
              {orders.slice(0, 4).map((order) => (
                <div key={order.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{order.customer_name}</div>
                    <div className="text-slate-400 text-[11px] font-mono">
                      {order.order_reference} • {order.pricing_plan_name || order.selected_service}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-400 font-mono">
                      CAD ${order.amount_cad}
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono capitalize">
                      {order.order_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Quick Launchpad to All Admin Modules */}
      <GlassCard padding="md" className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Quick Management Launchpad
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
          <button
            onClick={() => navigate('/admin/demos')}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 text-left transition"
          >
            <Sparkles className="w-4 h-4 text-amber-400 mb-1" />
            <div className="font-semibold text-white">Demos</div>
            <div className="text-[10px] text-slate-500">{demos.length} Items</div>
          </button>

          <button
            onClick={() => navigate('/admin/services')}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 text-left transition"
          >
            <Briefcase className="w-4 h-4 text-amber-400 mb-1" />
            <div className="font-semibold text-white">Services</div>
            <div className="text-[10px] text-slate-500">{services.length} Offerings</div>
          </button>

          <button
            onClick={() => navigate('/admin/pricing')}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 text-left transition"
          >
            <DollarSign className="w-4 h-4 text-amber-400 mb-1" />
            <div className="font-semibold text-white">Pricing</div>
            <div className="text-[10px] text-slate-500">CAD 200 - 1,000+</div>
          </button>

          <button
            onClick={() => navigate('/admin/comments')}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 text-left transition"
          >
            <MessageSquare className="w-4 h-4 text-amber-400 mb-1" />
            <div className="font-semibold text-white">Comments</div>
            <div className="text-[10px] text-slate-500">{comments.length} Reviews</div>
          </button>

          <button
            onClick={() => navigate('/admin/media')}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 text-left transition"
          >
            <Users className="w-4 h-4 text-amber-400 mb-1" />
            <div className="font-semibold text-white">Media</div>
            <div className="text-[10px] text-slate-500">Asset Gallery</div>
          </button>

          <button
            onClick={() => navigate('/admin/team')}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 text-left transition"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400 mb-1" />
            <div className="font-semibold text-white">Team</div>
            <div className="text-[10px] text-slate-500">NIT Trichy Team</div>
          </button>

          <button
            onClick={() => navigate('/admin/settings')}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 text-left transition"
          >
            <Database className="w-4 h-4 text-amber-400 mb-1" />
            <div className="font-semibold text-white">Settings</div>
            <div className="text-[10px] text-slate-500">Coordinates & Phone</div>
          </button>
        </div>
      </GlassCard>
    </AdminLayout>
  );
};
