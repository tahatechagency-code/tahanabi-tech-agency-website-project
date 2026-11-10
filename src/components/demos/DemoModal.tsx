import React from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GoldButton } from '../common/GoldButton';

export const DemoModal: React.FC = () => {
  const { activeDemoModal, closeDemoModal, navigate, company } = useData();

  if (!activeDemoModal) return null;

  const isB2B = activeDemoModal.slug === 'b2b-car-service-automation';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-slate-950 border border-amber-500/40 shadow-[0_0_60px_rgba(212,175,55,0.25)] flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h3 className="font-bold text-sm sm:text-base text-white">
              {activeDemoModal.title}
            </h3>
          </div>
          <button
            onClick={closeDemoModal}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Cover Media */}
          <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={activeDemoModal.coverImage}
              alt={activeDemoModal.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur border border-amber-400/30 text-amber-300">
                {activeDemoModal.industry}
              </span>
              <span className="text-xs text-slate-300">
                Client: <strong className="text-white">{activeDemoModal.clientName}</strong>
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-1">
              Project Architecture &amp; Solution Scope
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeDemoModal.shortDescription}
            </p>
          </div>

          {/* B2B Constraint Notice */}
          {isB2B && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Notice for B2B Car Service:</strong> Content and demonstration assets are reserved for admin management and will be published directly through the admin panel.
              </div>
            </div>
          )}

          {/* Features */}
          {activeDemoModal.features.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Demonstrated Capabilities:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeDemoModal.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Customized for your enterprise requirements</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <GoldButton
              size="sm"
              variant="outline"
              onClick={() => {
                closeDemoModal();
                window.open(`https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=Hi,%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(activeDemoModal.title)}`, '_blank');
              }}
              className="flex-1 sm:flex-initial"
            >
              WhatsApp Us
            </GoldButton>

            <GoldButton
              size="sm"
              variant="solid"
              onClick={() => {
                closeDemoModal();
                if (activeDemoModal.demoUrl) {
                  navigate(activeDemoModal.demoUrl as any);
                } else {
                  navigate('/book-consultation');
                }
              }}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="flex-1 sm:flex-initial"
            >
              Get This Solution
            </GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
};
