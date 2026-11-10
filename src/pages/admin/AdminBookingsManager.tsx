import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle,
  XCircle,
  CalendarDays,
  Settings,
  Trash2,
  Edit2,
  AlertCircle,
  X,
  Save,
  Check,
  Plus,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GlassCard } from '../../components/common/GlassCard';
import { GoldButton } from '../../components/common/GoldButton';
import { ConsultationBooking } from '../../types/models';

export const AdminBookingsManager: React.FC = () => {
  const {
    bookings,
    updateBooking,
    deleteBooking,
    availabilitySchedule,
    updateAvailabilitySchedule,
  } = useData();

  const [activeView, setActiveView] = useState<'list' | 'availability'>('list');
  const [reschedulingBooking, setReschedulingBooking] = useState<ConsultationBooking | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Availability Settings Local State
  const [scheduleTimezone, setScheduleTimezone] = useState(availabilitySchedule.timezone);
  const [workingDays, setWorkingDays] = useState<string[]>(availabilitySchedule.workingDays);
  const [timeSlotsInput, setTimeSlotsInput] = useState(availabilitySchedule.timeSlots.join('\n'));
  const [slotDuration, setSlotDuration] = useState(availabilitySchedule.slotDurationMinutes);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleReschedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reschedulingBooking || !newDate || !newTime) return;

    await updateBooking(reschedulingBooking.id, {
      bookingDate: newDate,
      timeSlot: newTime,
      status: 'rescheduled',
    });

    setReschedulingBooking(null);
  };

  const handleSaveAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const timeSlots = timeSlotsInput
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    updateAvailabilitySchedule({
      timezone: scheduleTimezone,
      workingDays,
      timeSlots,
      slotDurationMinutes: Number(slotDuration),
    });
  };

  const toggleDay = (day: string) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  return (
    <AdminLayout
      title="Consultation & Calendar Management"
      subtitle="Schedule strategy sessions, confirm/reschedule appointments, and configure agency booking hours"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView(activeView === 'list' ? 'availability' : 'list')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-amber-300 hover:border-amber-400 flex items-center gap-1.5 transition"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{activeView === 'list' ? 'Availability Settings' : 'View Bookings'}</span>
          </button>
        </div>
      }
    >
      {activeView === 'list' ? (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <GlassCard padding="lg" className="text-center py-12 space-y-2">
              <CalendarIcon className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-300">No scheduled consultations found.</p>
              <p className="text-xs text-slate-500">
                Clients who book a 1-on-1 strategy call through the booking funnel will appear here.
              </p>
            </GlassCard>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Client Name & Info</th>
                    <th className="py-3 px-4">Date & Time Slot</th>
                    <th className="py-3 px-4">Meeting Purpose</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-900/40 transition">
                      <td className="py-3 px-4 font-mono font-bold text-amber-400">
                        {booking.reference}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{booking.clientName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{booking.clientEmail}</div>
                        {booking.clientPhone && (
                          <div className="text-[10px] text-slate-500">{booking.clientPhone}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-semibold text-white">{booking.bookingDate}</div>
                        <div className="text-[11px] text-amber-300 font-mono">{booking.timeSlot}</div>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-slate-300">
                        {booking.projectOverview || booking.serviceType}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBooking(booking.id, { status: e.target.value as any })}
                          className={`bg-slate-900 border border-slate-700 text-xs rounded-lg px-2.5 py-1 focus:outline-none ${
                            booking.status === 'confirmed'
                              ? 'text-emerald-400'
                              : booking.status === 'rescheduled'
                              ? 'text-amber-400'
                              : booking.status === 'completed'
                              ? 'text-sky-400'
                              : 'text-slate-300'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="rescheduled">Rescheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setReschedulingBooking(booking);
                              setNewDate(booking.bookingDate);
                              setNewTime(booking.timeSlot);
                            }}
                            title="Reschedule Booking"
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400"
                          >
                            <CalendarDays className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingId(booking.id)}
                            title="Delete Booking"
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
        </div>
      ) : (
        /* Availability Configuration Tab */
        <GlassCard padding="lg" className="max-w-2xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Agency Consultation Availability Settings</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure available days, consultation slot hours, and timezone for client strategy bookings.
            </p>
          </div>

          <form onSubmit={handleSaveAvailability} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Executive Timezone
              </label>
              <select
                value={scheduleTimezone}
                onChange={(e) => setScheduleTimezone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST - India Standard Time UTC+5:30)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST - Gulf Standard Time UTC+4:00)</option>
                <option value="America/New_York">America/New_York (EST - Eastern Time)</option>
                <option value="Europe/London">Europe/London (GMT/BST - UK Time)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Working Days</label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => {
                  const isSelected = workingDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Slot Duration (Minutes)
                </label>
                <input
                  type="number"
                  min={15}
                  max={120}
                  step={15}
                  value={slotDuration}
                  onChange={(e) => setSlotDuration(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Available Time Slots (one per line)
                </label>
                <textarea
                  rows={5}
                  value={timeSlotsInput}
                  onChange={(e) => setTimeSlotsInput(e.target.value)}
                  placeholder="10:00 AM&#10;11:30 AM&#10;02:00 PM"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <GoldButton type="submit" size="sm" variant="solid" icon={<Save className="w-3.5 h-3.5" />}>
                Save Availability Settings
              </GoldButton>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Reschedule Modal */}
      {reschedulingBooking && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <GlassCard glow padding="lg" className="max-w-md w-full border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-amber-400" />
                <span>Reschedule Booking</span>
              </h3>
              <button onClick={() => setReschedulingBooking(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReschedule} className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Client:</div>
                <div className="font-semibold text-white">{reschedulingBooking.clientName}</div>
                <div className="text-amber-400 font-mono text-[11px]">{reschedulingBooking.reference}</div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">New Time Slot</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  {availabilitySchedule.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setReschedulingBooking(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <GoldButton type="submit" size="sm" variant="solid">
                  Confirm Reschedule
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
              <span>Confirm Booking Removal</span>
            </h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently cancel and remove this consultation booking?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteBooking(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Booking
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
};
