import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { BrandLogo } from '../../components/common/BrandLogo';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigate } = useData();
  const [email, setEmail] = useState('tahanabitechagency@gmail.com');
  const [password, setPassword] = useState('Juned@Tahanabi2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login service unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 flex items-center justify-center relative overflow-hidden bg-slate-950">
      {/* Background radial gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <BrandLogo size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tahanabi <span className="text-gold-gradient">Admin Console</span>
          </h1>
          <p className="text-xs text-slate-400">
            Authorized management portal for executives and engineers
          </p>
        </div>

        <GlassCard glow padding="lg" className="border-amber-500/30 space-y-5">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Supabase Role-Verified Portal</span>
              <span>Only authorized administrators with valid security credentials may sign in.</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tahanabitechagency@gmail.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <span className="text-[11px] text-amber-400 font-mono">Secured</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Credentials Autofill */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Quick Login Options:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('tahanabitechagency@gmail.com');
                    setPassword('Juned@Tahanabi2026!');
                  }}
                  className="text-amber-400 hover:underline"
                >
                  MD Juned (CEO)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('satpal@tahanabi.com');
                    setPassword('Satpal@NITTrichy2023');
                  }}
                  className="text-amber-400 hover:underline"
                >
                  Satpal (Founder)
                </button>
              </div>
            </div>

            <GoldButton
              type="submit"
              size="md"
              fullWidth
              variant="solid"
              isLoading={isLoading}
              icon={<KeyRound className="w-4 h-4" />}
            >
              Authenticate & Enter Admin Suite
            </GoldButton>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Website
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
