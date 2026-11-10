import React, { useState } from 'react';
import {
  Users,
  Search,
  Download,
  Filter,
  Trash2,
  Eye,
  AlertCircle,
  X,
  Save,
  Phone,
  Mail,
  Building,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { exportToCsv } from '../../utils/exportCsv';
import { ContactLead } from '../../types/models';

export const AdminLeadsManager: React.FC = () => {
  const { leads, updateLead, deleteLead, showToast } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportCsv = () => {
    if (leads.length === 0) {
      showToast('No leads available to export', 'info');
      return;
    }

    const headers = [
      'ID',
      'Full Name',
      'Email Address',
      'Phone Number',
      'Business Type',
      'Requirements Message',
      'Status',
      'Created Date',
      'Internal Notes',
    ];

    const rows = leads.map((l) => [
      l.id,
      l.fullName,
      l.email,
      l.phone,
      l.businessType,
      l.message,
      l.status,
      l.createdAt,
      l.internalNotes || '',
    ]);

    exportToCsv('tahanabi-client-leads', headers, rows);
    showToast('Leads exported to CSV successfully', 'success');
  };

  const openLeadDetails = (lead: ContactLead) => {
    setSelectedLead(lead);
    setInternalNotes(lead.internalNotes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    await updateLead(selectedLead.id, {
      ...selectedLead,
      internalNotes,
    });
    setSelectedLead(null);
  };

  return (
    <AdminLayout
      title="Client Inquiries & Leads Manager"
      subtitle="Manage prospective clients, contact status, business requirements, and conversion pipeline"
      actions={
        <GoldButton
          size="sm"
          variant="solid"
          onClick={handleExportCsv}
          icon={<Download className="w-4 h-4" />}
        >
          Export Leads CSV
        </GoldButton>
      }
    >
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Leads' },
            { id: 'new', label: 'New' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'qualified', label: 'Qualified' },
            { id: 'converted', label: 'Converted' },
            { id: 'archived', label: 'Archived' },
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
            placeholder="Search leads by name, email, biz..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <GlassCard padding="lg" className="text-center py-12 space-y-2">
          <Users className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm text-slate-300">No client leads found.</p>
          <p className="text-xs text-slate-500">Inquiries submitted via contact forms or the AI concierge appear here.</p>
        </GlassCard>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Prospective Client</th>
                <th className="py-3 px-4">Contact Coordinates</th>
                <th className="py-3 px-4">Business / Service</th>
                <th className="py-3 px-4">Requirements Summary</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Received Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{lead.fullName}</div>
                    {lead.internalNotes && (
                      <span className="text-[10px] text-amber-400/90 italic">Notes added</span>
                    )}
                  </td>
                  <td className="py-3 px-4 space-y-0.5">
                    <div className="text-slate-300 font-mono text-[11px]">{lead.email}</div>
                    {lead.phone && <div className="text-slate-500 text-[10px]">{lead.phone}</div>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-amber-300">{lead.businessType}</span>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-400">
                    {lead.message}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLead(lead.id, { status: e.target.value as any })}
                      className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-2.5 py-1 text-amber-300 focus:outline-none focus:border-amber-400"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openLeadDetails(lead)}
                        title="View Full Inquiry & Notes"
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingId(lead.id)}
                        title="Delete Lead"
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

      {/* Lead Detail & Internal Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <GlassCard glow padding="lg" className="max-w-xl w-full border-amber-500/40 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Lead Profile</span>
                <h3 className="text-base font-bold text-white">{selectedLead.fullName}</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Contact Info</span>
                  <div className="font-semibold text-white flex items-center gap-1.5 pt-0.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>{selectedLead.email}</span>
                  </div>
                  {selectedLead.phone && (
                    <div className="text-slate-300 flex items-center gap-1.5 pt-1">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedLead.phone}</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Business Requirement</span>
                  <div className="font-bold text-amber-300 pt-0.5">{selectedLead.businessType}</div>
                  <div className="text-slate-500 text-[11px] pt-1 font-mono">
                    Date: {new Date(selectedLead.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Inquiry Requirements Message</label>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 text-xs leading-relaxed max-h-36 overflow-y-auto">
                  {selectedLead.message}
                </div>
              </div>

              <div>
                <label className="block text-amber-400 font-medium mb-1">Executive Notes & Follow-up Actions</label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record client phone calls, budget qualification, or assignment..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <GoldButton size="sm" variant="solid" onClick={handleSaveNotes} icon={<Save className="w-3.5 h-3.5" />}>
                  Save Notes
                </GoldButton>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <GlassCard glow padding="lg" className="max-w-md w-full border-rose-500/40 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 text-rose-400">
              <AlertCircle className="w-5 h-5" />
              <span>Confirm Lead Deletion</span>
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete this lead record? This operation cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteLead(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Lead
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
