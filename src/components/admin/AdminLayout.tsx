import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  UserCheck,
  Settings,
  Database,
  Bookmark,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell,
  Briefcase,
  Layers,
  DollarSign,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BrandLogo } from '../common/BrandLogo';
import { AppRoute } from '../../types/models';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  actions,
}) => {
  const {
    currentRoute,
    navigate,
    adminUser,
    logoutAdmin,
    leads,
    orders,
    bookings,
    comments,
    toast,
  } = useData();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingOrders = orders.filter((o) => o.order_status === 'received').length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const pendingComments = comments.filter((c) => c.approvalStatus === 'pending').length;

  const navItems: { label: string; route: AppRoute; icon: React.ReactNode; badge?: number }[] = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Demo Manager', route: '/admin/demos', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Industries', route: '/admin/industries', icon: <Layers className="w-4 h-4" /> },
    { label: 'Services', route: '/admin/services', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Pricing Plans', route: '/admin/pricing', icon: <DollarSign className="w-4 h-4" /> },
    {
      label: 'Client Orders',
      route: '/admin/orders',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingOrders > 0 ? pendingOrders : undefined,
    },
    {
      label: 'Inquiries & Leads',
      route: '/admin/leads',
      icon: <Users className="w-4 h-4" />,
      badge: newLeads > 0 ? newLeads : undefined,
    },
    {
      label: 'Consultations',
      route: '/admin/bookings',
      icon: <Calendar className="w-4 h-4" />,
      badge: pendingBookings > 0 ? pendingBookings : undefined,
    },
    {
      label: 'Comments & Reviews',
      route: '/admin/comments',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: pendingComments > 0 ? pendingComments : undefined,
    },
    { label: 'Blog & Articles', route: '/admin/blog', icon: <FileText className="w-4 h-4" /> },
    { label: 'Media Library', route: '/admin/media', icon: <ImageIcon className="w-4 h-4" /> },
    { label: 'Leadership & Team', route: '/admin/team', icon: <UserCheck className="w-4 h-4" /> },
    { label: 'Website Settings', route: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
    { label: 'Reference Library', route: '/admin/references', icon: <Bookmark className="w-4 h-4" /> },
    { label: 'Database & SQL', route: '/admin/database', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-amber-500/30 text-white shadow-2xl backdrop-blur-xl animate-fade-in max-w-md">
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-amber-400 shrink-0" />}
          <p className="text-xs font-medium text-slate-200">{toast.message}</p>
        </div>
      )}

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <BrandLogo size="sm" />
          <div>
            <div className="text-xs font-bold text-white tracking-wider uppercase">Tahanabi Admin</div>
            <div className="text-[10px] text-amber-400 font-mono">Production Suite</div>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Drawer */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-slate-900/95 border-r border-slate-800/80 flex flex-col justify-between z-40 transition-transform duration-300 backdrop-blur-xl ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-slate-800/80">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
              <BrandLogo size="md" />
              <div>
                <span className="text-sm font-extrabold text-white tracking-tight block">
                  Tahanabi <span className="text-gold-gradient">Admin</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400/90 block">
                  Console v1.5
                </span>
              </div>
            </div>

            {/* Admin Profile Box */}
            <div className="mt-4 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                  {adminUser?.fullName?.slice(0, 2).toUpperCase() || 'AD'}
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold text-white truncate">
                    {adminUser?.fullName || 'MD Juned'}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Super Admin
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => {
                    navigate(item.route);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-400/5 text-amber-300 border border-amber-500/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800/80 space-y-2 bg-slate-950/40">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-amber-300 hover:bg-slate-800/50 transition"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Site</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={logoutAdmin}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Admin</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile drawer */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Action Bar */}
        <header className="px-6 py-4 bg-slate-900/60 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{title}</span>
            </h1>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>

          {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
        </header>

        {/* Page Body */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
