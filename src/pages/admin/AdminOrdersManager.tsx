import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Download,
  Filter,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  Trash2,
  Edit,
  Eye,
  AlertCircle,
  X,
  Save,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { exportToCsv } from '../../utils/exportCsv';
import { Database } from '../../types/database';

type OrderRow = Database['public']['Tables']['service_orders']['Row'];

export const AdminOrdersManager: React.FC = () => {
  const { orders, updateOrder, deleteOrder, showToast } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.order_status === statusFilter;
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.pricing_plan_name && order.pricing_plan_name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const totalVolume = orders.reduce((sum, o) => sum + (Number(o.amount_cad) || 0), 0);

  const handleExportCsv = () => {
    if (orders.length === 0) {
      showToast('No orders available to export', 'info');
      return;
    }

    const headers = [
      'Order Reference',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Service / Plan',
      'Amount CAD',
      'Order Status',
      'Payment Status',
      'Date Created',
      'Requirements',
    ];

    const rows = orders.map((o) => [
      o.order_reference,
      o.customer_name,
      o.customer_email,
      o.customer_phone,
      o.pricing_plan_name || o.selected_service,
      o.amount_cad,
      o.order_status,
      o.payment_status,
      new Date(o.created_at).toISOString(),
      o.requirements,
    ]);

    exportToCsv('tahanabi-service-orders', headers, rows);
    showToast('Orders exported to CSV file successfully', 'success');
  };

  const openOrderDetails = (order: OrderRow) => {
    setSelectedOrder(order);
    setInternalNotes((order as any).internal_notes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedOrder) return;
    await updateOrder(selectedOrder.id, {
      ...selectedOrder,
      internal_notes: internalNotes,
    } as any);
    setSelectedOrder(null);
  };

  return (
    <AdminLayout
      title="Client Service Orders"
      subtitle="Track incoming package purchases, payment verification, fulfillment pipeline, and customer specs"
      actions={
        <GoldButton
          size="sm"
          variant="solid"
          onClick={handleExportCsv}
          icon={<Download className="w-4 h-4" />}
        >
          Export Orders CSV
        </GoldButton>
      }
    >
      {/* Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard padding="sm" className="space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Revenue</div>
          <div className="text-xl font-bold text-amber-400 font-mono">CAD ${totalVolume.toLocaleString()}</div>
        </GlassCard>

        <GlassCard padding="sm" className="space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Orders</div>
          <div className="text-xl font-bold text-white font-mono">{orders.length}</div>
        </GlassCard>

        <GlassCard padding="sm" className="space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Received / Review</div>
          <div className="text-xl font-bold text-sky-400 font-mono">
            {orders.filter((o) => o.order_status === 'received' || o.order_status === 'in_review').length}
          </div>
        </GlassCard>

        <GlassCard padding="sm" className="space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Delivered / Live</div>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            {orders.filter((o) => o.order_status === 'delivered' || (o.order_status as any) === 'completed').length}
          </div>
        </GlassCard>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'received', label: 'Received' },
            { id: 'in_review', label: 'In Review' },
            { id: 'in_development', label: 'In Dev' },
            { id: 'testing', label: 'Testing' },
            { id: 'delivered', label: 'Delivered' },
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
            placeholder="Search by customer, email, ref..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <GlassCard padding="lg" className="text-center py-12 space-y-2">
          <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm text-slate-300">No service orders match current filter.</p>
          <p className="text-xs text-slate-500">Orders placed by customers on public pricing pages appear here in real time.</p>
        </GlassCard>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Service Package</th>
                <th className="py-3 px-4">Amount CAD</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">{order.order_reference}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{order.customer_name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{order.customer_email}</div>
                    {order.customer_phone && (
                      <div className="text-[10px] text-slate-500">{order.customer_phone}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-200">
                      {order.pricing_plan_name || order.selected_service}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-amber-300 font-mono">
                    CAD ${Number(order.amount_cad).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.order_status}
                      onChange={(e) => updateOrder(order.id, { order_status: e.target.value as any })}
                      className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-2.5 py-1 text-amber-300 focus:outline-none focus:border-amber-400"
                    >
                      <option value="received">Received</option>
                      <option value="in_review">In Review</option>
                      <option value="in_development">In Development</option>
                      <option value="testing">Testing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openOrderDetails(order)}
                        title="View Full Spec & Notes"
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingId(order.id)}
                        title="Delete Order"
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

      {/* Order Detail & Notes Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <GlassCard glow padding="lg" className="max-w-xl w-full border-amber-500/40 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Order Details</span>
                <h3 className="text-base font-bold text-white">{selectedOrder.order_reference}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Customer</span>
                  <div className="font-semibold text-white">{selectedOrder.customer_name}</div>
                  <div className="text-slate-400 font-mono">{selectedOrder.customer_email}</div>
                  <div className="text-slate-400">{selectedOrder.customer_phone}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Package / Amount</span>
                  <div className="font-semibold text-amber-300">{selectedOrder.pricing_plan_name || selectedOrder.selected_service}</div>
                  <div className="text-white font-mono font-bold">CAD ${selectedOrder.amount_cad}</div>
                  <div className="text-[11px] text-slate-400 capitalize">Payment: {selectedOrder.payment_status}</div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Customer Requirements & Specifications</label>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 text-xs leading-relaxed max-h-36 overflow-y-auto">
                  {selectedOrder.requirements || 'No specific notes entered by client.'}
                </div>
              </div>

              <div>
                <label className="block text-amber-400 font-medium mb-1">Internal Engineering Notes</label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Private internal notes for executive and engineering team..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <GoldButton size="sm" variant="solid" onClick={handleSaveNotes} icon={<Save className="w-3.5 h-3.5" />}>
                  Save Internal Notes
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
              <span>Confirm Order Deletion</span>
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this order? This action will permanently remove it from database tables.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteOrder(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Order
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
