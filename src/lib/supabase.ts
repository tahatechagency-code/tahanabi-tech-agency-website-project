import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// SAFETY GUARD: Check that service-role key is never used in frontend code
if (typeof window !== 'undefined' && (window as any).SUPABASE_SERVICE_ROLE_KEY) {
  delete (window as any).SUPABASE_SERVICE_ROLE_KEY;
}

const isConfiguredSupabase =
  Boolean(supabaseUrl) &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('xyzproject') &&
  Boolean(supabaseAnonKey) &&
  supabaseAnonKey.length > 20 &&
  !supabaseAnonKey.includes('...');

// Base client
export const supabase = isConfiguredSupabase
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : createClient<Database>(
      'https://tahanabi-local.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.fakeKeyForLocalDev'
    );

export const isSupabaseConfigured = () => isConfiguredSupabase;

// ============================================================================
// REAL DATABASE CRUD OPERATIONS API (Works with live Supabase & persists locally)
// ============================================================================

export interface DbResult<T> {
  data: T | null;
  error: Error | null;
}

// 1. LEADS: Create, Read, Update, Delete
export const leadsDb = {
  async create(lead: Database['public']['Tables']['leads']['Insert']): Promise<DbResult<Database['public']['Tables']['leads']['Row']>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('leads').insert(lead).select().single();
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    // Local persistence fallback
    const leads: any[] = JSON.parse(localStorage.getItem('tahanabi_db_leads') || '[]');
    const newLead = {
      ...lead,
      id: lead.id || `lead-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      created_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: lead.status || 'new',
    };
    leads.unshift(newLead);
    localStorage.setItem('tahanabi_db_leads', JSON.stringify(leads));
    auditLogsDb.log('CREATE_LEAD', 'leads', newLead.id, { name: newLead.name, service: newLead.service });
    return { data: newLead as any, error: null };
  },

  async getAll(): Promise<DbResult<Database['public']['Tables']['leads']['Row'][]>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('leads').select('*').order('created_date', { ascending: false });
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const leads = JSON.parse(localStorage.getItem('tahanabi_db_leads') || '[]');
    return { data: leads, error: null };
  },

  async update(id: string, updates: Database['public']['Tables']['leads']['Update']): Promise<DbResult<Database['public']['Tables']['leads']['Row']>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('leads').update(updates).eq('id', id).select().single();
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    let leads: any[] = JSON.parse(localStorage.getItem('tahanabi_db_leads') || '[]');
    let updatedLead: any = null;
    leads = leads.map((l) => {
      if (l.id === id) {
        updatedLead = { ...l, ...updates, updated_at: new Date().toISOString() };
        return updatedLead;
      }
      return l;
    });
    localStorage.setItem('tahanabi_db_leads', JSON.stringify(leads));
    auditLogsDb.log('UPDATE_LEAD', 'leads', id, updates);
    return { data: updatedLead, error: updatedLead ? null : new Error('Lead not found') };
  },

  async delete(id: string): Promise<DbResult<boolean>> {
    if (isConfiguredSupabase) {
      const { error } = await (supabase as any).from('leads').delete().eq('id', id);
      if (error) return { data: null, error: new Error(error.message) };
      return { data: true, error: null };
    }
    let leads: any[] = JSON.parse(localStorage.getItem('tahanabi_db_leads') || '[]');
    leads = leads.filter((l) => l.id !== id);
    localStorage.setItem('tahanabi_db_leads', JSON.stringify(leads));
    auditLogsDb.log('DELETE_LEAD', 'leads', id, {});
    return { data: true, error: null };
  },
};

// 2. CONSULTATION BOOKINGS: Create, Read, Update, Delete
export const bookingsDb = {
  async create(booking: Database['public']['Tables']['consultation_bookings']['Insert']): Promise<DbResult<Database['public']['Tables']['consultation_bookings']['Row']>> {
    const reference = booking.booking_reference || `TAH-BOOK-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    const payload = { ...booking, booking_reference: reference };

    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('consultation_bookings').insert(payload).select().single();
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const bookings: any[] = JSON.parse(localStorage.getItem('tahanabi_db_bookings') || '[]');
    const newBooking = {
      ...payload,
      id: `booking-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: payload.status || 'confirmed',
    };
    bookings.unshift(newBooking);
    localStorage.setItem('tahanabi_db_bookings', JSON.stringify(bookings));
    auditLogsDb.log('CREATE_BOOKING', 'consultation_bookings', newBooking.id, { client: newBooking.customer_name, date: newBooking.booking_date });
    return { data: newBooking as any, error: null };
  },

  async getAll(): Promise<DbResult<Database['public']['Tables']['consultation_bookings']['Row'][]>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('consultation_bookings').select('*').order('created_at', { ascending: false });
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const bookings = JSON.parse(localStorage.getItem('tahanabi_db_bookings') || '[]');
    return { data: bookings, error: null };
  },

  async update(id: string, updates: Database['public']['Tables']['consultation_bookings']['Update']): Promise<DbResult<Database['public']['Tables']['consultation_bookings']['Row']>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('consultation_bookings').update(updates).eq('id', id).select().single();
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    let bookings: any[] = JSON.parse(localStorage.getItem('tahanabi_db_bookings') || '[]');
    let updatedBooking: any = null;
    bookings = bookings.map((b) => {
      if (b.id === id) {
        updatedBooking = { ...b, ...updates, updated_at: new Date().toISOString() };
        return updatedBooking;
      }
      return b;
    });
    localStorage.setItem('tahanabi_db_bookings', JSON.stringify(bookings));
    auditLogsDb.log('UPDATE_BOOKING', 'consultation_bookings', id, updates);
    return { data: updatedBooking, error: updatedBooking ? null : new Error('Booking not found') };
  },

  async delete(id: string): Promise<DbResult<boolean>> {
    if (isConfiguredSupabase) {
      const { error } = await (supabase as any).from('consultation_bookings').delete().eq('id', id);
      if (error) return { data: null, error: new Error(error.message) };
      return { data: true, error: null };
    }
    let bookings: any[] = JSON.parse(localStorage.getItem('tahanabi_db_bookings') || '[]');
    bookings = bookings.filter((b) => b.id !== id);
    localStorage.setItem('tahanabi_db_bookings', JSON.stringify(bookings));
    auditLogsDb.log('DELETE_BOOKING', 'consultation_bookings', id, {});
    return { data: true, error: null };
  },
};

// 3. SERVICE ORDERS: Create, Read, Update, Delete
export const ordersDb = {
  async create(order: Database['public']['Tables']['service_orders']['Insert']): Promise<DbResult<Database['public']['Tables']['service_orders']['Row']>> {
    const orderRef = order.order_reference || `ORD-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    const payload = { ...order, order_reference: orderRef };

    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('service_orders').insert(payload).select().single();
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const orders: any[] = JSON.parse(localStorage.getItem('tahanabi_db_orders') || '[]');
    const newOrder = {
      ...payload,
      id: `order-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      order_status: payload.order_status || 'received',
      payment_status: payload.payment_status || 'pending',
    };
    orders.unshift(newOrder);
    localStorage.setItem('tahanabi_db_orders', JSON.stringify(orders));
    auditLogsDb.log('CREATE_ORDER', 'service_orders', newOrder.id, { plan: newOrder.pricing_plan_name, amount: newOrder.amount_cad });
    return { data: newOrder as any, error: null };
  },

  async getAll(): Promise<DbResult<Database['public']['Tables']['service_orders']['Row'][]>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('service_orders').select('*').order('created_at', { ascending: false });
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const orders = JSON.parse(localStorage.getItem('tahanabi_db_orders') || '[]');
    return { data: orders, error: null };
  },

  async update(id: string, updates: Database['public']['Tables']['service_orders']['Update']): Promise<DbResult<Database['public']['Tables']['service_orders']['Row']>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('service_orders').update(updates).eq('id', id).select().single();
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    let orders: any[] = JSON.parse(localStorage.getItem('tahanabi_db_orders') || '[]');
    let updatedOrder: any = null;
    orders = orders.map((o) => {
      if (o.id === id) {
        updatedOrder = { ...o, ...updates, updated_at: new Date().toISOString() };
        return updatedOrder;
      }
      return o;
    });
    localStorage.setItem('tahanabi_db_orders', JSON.stringify(orders));
    auditLogsDb.log('UPDATE_ORDER', 'service_orders', id, updates);
    return { data: updatedOrder, error: updatedOrder ? null : new Error('Order not found') };
  },

  async delete(id: string): Promise<DbResult<boolean>> {
    if (isConfiguredSupabase) {
      const { error } = await (supabase as any).from('service_orders').delete().eq('id', id);
      if (error) return { data: null, error: new Error(error.message) };
      return { data: true, error: null };
    }
    let orders: any[] = JSON.parse(localStorage.getItem('tahanabi_db_orders') || '[]');
    orders = orders.filter((o) => o.id !== id);
    localStorage.setItem('tahanabi_db_orders', JSON.stringify(orders));
    auditLogsDb.log('DELETE_ORDER', 'service_orders', id, {});
    return { data: true, error: null };
  },
};

// 4. COMMENTS & MODERATION: Create, Read, Update, Delete
export const commentsDb = {
  async create(comment: Database['public']['Tables']['comments']['Insert']): Promise<DbResult<Database['public']['Tables']['comments']['Row']>> {
    const payload = { ...comment, approval_status: comment.approval_status || 'pending' };

    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('comments').insert(payload).select().single();
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const comments: any[] = JSON.parse(localStorage.getItem('tahanabi_db_comments') || '[]');
    const newComment = {
      ...payload,
      id: `comm-${Date.now()}`,
      created_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    comments.unshift(newComment);
    localStorage.setItem('tahanabi_db_comments', JSON.stringify(comments));
    auditLogsDb.log('CREATE_COMMENT', 'comments', newComment.id, { author: newComment.author, status: 'pending' });
    return { data: newComment as any, error: null };
  },

  async getApproved(blogPostId?: string): Promise<DbResult<Database['public']['Tables']['comments']['Row'][]>> {
    if (isConfiguredSupabase) {
      let q = (supabase as any).from('comments').select('*').eq('approval_status', 'approved');
      if (blogPostId) q = q.eq('blog_post_id', blogPostId);
      const { data, error } = await q.order('created_date', { ascending: false });
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const comments: any[] = JSON.parse(localStorage.getItem('tahanabi_db_comments') || '[]');
    const approved = comments.filter((c) => c.approval_status === 'approved' && (!blogPostId || c.blog_post_id === blogPostId));
    return { data: approved, error: null };
  },

  async getAll(): Promise<DbResult<Database['public']['Tables']['comments']['Row'][]>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('comments').select('*').order('created_date', { ascending: false });
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const comments: any[] = JSON.parse(localStorage.getItem('tahanabi_db_comments') || '[]');
    return { data: comments, error: null };
  },

  async updateStatus(id: string, approval_status: 'approved' | 'rejected' | 'spam'): Promise<DbResult<Database['public']['Tables']['comments']['Row']>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('comments').update({ approval_status }).eq('id', id).select().single();
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    let comments: any[] = JSON.parse(localStorage.getItem('tahanabi_db_comments') || '[]');
    let updated: any = null;
    comments = comments.map((c) => {
      if (c.id === id) {
        updated = { ...c, approval_status, updated_at: new Date().toISOString() };
        return updated;
      }
      return c;
    });
    localStorage.setItem('tahanabi_db_comments', JSON.stringify(comments));
    auditLogsDb.log('MODERATE_COMMENT', 'comments', id, { approval_status });
    return { data: updated, error: updated ? null : new Error('Comment not found') };
  },

  async delete(id: string): Promise<DbResult<boolean>> {
    if (isConfiguredSupabase) {
      const { error } = await (supabase as any).from('comments').delete().eq('id', id);
      if (error) return { data: null, error: new Error(error.message) };
      return { data: true, error: null };
    }
    let comments: any[] = JSON.parse(localStorage.getItem('tahanabi_db_comments') || '[]');
    comments = comments.filter((c) => c.id !== id);
    localStorage.setItem('tahanabi_db_comments', JSON.stringify(comments));
    auditLogsDb.log('DELETE_COMMENT', 'comments', id, {});
    return { data: true, error: null };
  },
};

// 5. DEMOS & UNPUBLISHED B2B CAR SERVICE GUARD
export const demosDb = {
  async getAllPublished(): Promise<DbResult<Database['public']['Tables']['demos']['Row'][]>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('demos').select('*').eq('is_published', true).order('sort_order', { ascending: true });
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const demos: any[] = JSON.parse(localStorage.getItem('tahanabi_demos') || '[]');
    // Filter strictly published demos
    const published = demos.filter((d) => d.isPublished || d.is_published);
    return { data: published, error: null };
  },

  async getAllForAdmin(): Promise<DbResult<Database['public']['Tables']['demos']['Row'][]>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('demos').select('*').order('sort_order', { ascending: true });
      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as any, error: null };
    }
    const demos: any[] = JSON.parse(localStorage.getItem('tahanabi_demos') || '[]');
    return { data: demos, error: null };
  },

  async update(id: string, updates: Database['public']['Tables']['demos']['Update']): Promise<DbResult<any>> {
    if (isConfiguredSupabase) {
      const { data, error } = await (supabase as any).from('demos').update(updates).eq('id', id).select().single();
      if (error) return { data: null, error: new Error(error.message) };
      return { data, error: null };
    }
    let demos: any[] = JSON.parse(localStorage.getItem('tahanabi_demos') || '[]');
    let updated: any = null;
    demos = demos.map((d) => {
      if (d.id === id || d.slug === id) {
        updated = { ...d, ...updates, updated_at: new Date().toISOString() };
        return updated;
      }
      return d;
    });
    localStorage.setItem('tahanabi_demos', JSON.stringify(demos));
    auditLogsDb.log('UPDATE_DEMO', 'demos', id, updates);
    return { data: updated, error: updated ? null : new Error('Demo not found') };
  },
};

// 6. AUDIT LOGS (Compliance Tracking)
export const auditLogsDb = {
  log(action: string, entity_type: string, entity_id: string, details: Record<string, any>) {
    try {
      const logs: any[] = JSON.parse(localStorage.getItem('tahanabi_audit_logs') || '[]');
      logs.unshift({
        id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        action,
        entity_type,
        entity_id,
        details,
        ip_address: '127.0.0.1',
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('tahanabi_audit_logs', JSON.stringify(logs.slice(0, 100)));
    } catch (e) {
      console.warn('Could not write audit log', e);
    }
  },

  getAll(): any[] {
    try {
      return JSON.parse(localStorage.getItem('tahanabi_audit_logs') || '[]');
    } catch {
      return [];
    }
  },
};
