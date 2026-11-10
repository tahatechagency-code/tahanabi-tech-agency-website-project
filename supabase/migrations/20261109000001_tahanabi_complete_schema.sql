-- ============================================================================
-- Tahanabi Tech Agency - Comprehensive Database Migration
-- Modules: 16 Core Tables, RLS Policies, Indexes & Automated Audit Logs
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. PROFILES (Admin & Staff Roles)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  avatar_url TEXT,
  phone TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. SITE SETTINGS (Key-Value Dynamic Configuration)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. SERVICES (Core Agency Offerings)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  deliverables TEXT[] NOT NULL DEFAULT '{}',
  ideal_for TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 4. INDUSTRIES (Specialized Verticals)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.industries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  key_use_cases TEXT[] NOT NULL DEFAULT '{}',
  stats_headline TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 5. DEMOS (Interactive Showcases)
-- Requirements: Title, description, category, industry, cover image, preview URL,
-- external URL, published status, featured status and sort order.
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.demos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('ecommerce', 'ai_automation', 'b2b_services', 'custom_apps')),
  sub_category TEXT,
  industry TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  preview_url TEXT,
  external_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  tags TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  metrics JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MANDATORY GUARDRAIL: B2B Car Service Automation is UNPUBLISHED and empty by default
INSERT INTO public.demos (slug, title, description, category, sub_category, industry, cover_image, is_published, is_featured, sort_order, features)
VALUES (
  'b2b-car-service-automation',
  'B2B Car Service Automation',
  'Complete digital solution for car rental, fleet leasing and ground transportation companies in UAE, GCC and beyond.',
  'b2b_services',
  'Enterprise Fleet',
  'Car Rental & Fleet',
  '/public/assets/aistudio/WhatsApp_Image_2026-11-09_at_6.30.46_AM_d59ef90e.jpeg',
  false, -- STRICTLY UNPUBLISHED
  false,
  99,
  ARRAY[]::TEXT[]
) ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- 6. DEMO REFERENCES (Third-Party Inspiration Library)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.demo_references (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('jewellery', 'fashion', 'ecommerce', 'real_estate', 'tourism', 'healthcare', 'education', 'ai_automation', 'pricing', 'about_us', 'blog', 'booking')),
  category_label TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  key_design_takeaways TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 7. PRICING PLANS (Dynamic Tier Matrix)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier_name TEXT NOT NULL CHECK (tier_name IN ('Basic', 'Moderate', 'Premium')),
  tagline TEXT NOT NULL,
  price_cad NUMERIC(10, 2) NOT NULL,
  price_note TEXT NOT NULL,
  billing_frequency TEXT NOT NULL DEFAULT 'one_time' CHECK (billing_frequency IN ('one_time', 'monthly', 'custom')),
  is_popular BOOLEAN NOT NULL DEFAULT false,
  turnaround_time TEXT NOT NULL,
  cta_text TEXT NOT NULL DEFAULT 'Choose Plan',
  features TEXT[] NOT NULL DEFAULT '{}',
  not_included TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 8. TEAM MEMBERS (Founders & Senior Engineers)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  qualification TEXT NOT NULL,
  institution TEXT NOT NULL,
  graduation_year INTEGER NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT,
  specializations TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 9. BLOG POSTS (Resources & Technical Guides)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('AI & Automation', 'E-commerce', 'Business Growth', 'Case Studies')),
  read_time TEXT NOT NULL DEFAULT '5 min read',
  cover_image TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'MD Juned',
  author_role TEXT NOT NULL DEFAULT 'CEO & Software Architect (NIT Trichy)',
  tags TEXT[] NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 10. COMMENTS (Public Comments & Moderation Pipeline)
-- Requirements: Author, email, content, rating, related page, approval status and created date.
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  email TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  related_page TEXT NOT NULL DEFAULT '/resources',
  approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected', 'spam')),
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 11. LEADS (Inquiries & Customer Leads)
-- Requirements: Name, email, phone, country, business type, service, budget, requirements, status and created date.
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT DEFAULT 'India / UAE',
  business_type TEXT NOT NULL,
  service TEXT NOT NULL,
  budget TEXT,
  requirements TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed_won', 'closed_lost')),
  source TEXT DEFAULT 'website_contact_form',
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 12. SERVICE ORDERS (Customer Order Pipeline)
-- Requirements: Customer details, selected service, demo, pricing plan, requirements, contact details and order status.
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.service_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_reference TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  company_name TEXT,
  selected_service TEXT NOT NULL,
  demo_id UUID REFERENCES public.demos(id),
  demo_slug TEXT,
  pricing_plan_id UUID REFERENCES public.pricing_plans(id),
  pricing_plan_name TEXT NOT NULL,
  amount_cad NUMERIC(10, 2) NOT NULL,
  requirements TEXT NOT NULL,
  contact_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  order_status TEXT NOT NULL DEFAULT 'received' CHECK (order_status IN ('received', 'in_review', 'in_development', 'testing', 'delivered', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'fully_paid', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 13. CONSULTATION BOOKINGS (Strategy Call Scheduler)
-- Requirements: Customer details, date, time, timezone, meeting purpose and status.
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_reference TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  company_name TEXT,
  booking_date DATE NOT NULL,
  time TEXT NOT NULL, -- e.g. '11:00 AM'
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  meeting_purpose TEXT NOT NULL,
  budget_range TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'rescheduled', 'cancelled')),
  meeting_channel TEXT NOT NULL DEFAULT 'Google Meet',
  meeting_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 14. CONTACT MESSAGES (General Inquiries)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 15. MEDIA LIBRARY (Uploaded Assets & Screenshots)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  bucket_name TEXT NOT NULL DEFAULT 'tahanabi-media',
  public_url TEXT NOT NULL,
  alt_text TEXT,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 16. ADMIN AUDIT LOGS (Compliance & Security Tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL, -- e.g. 'UPDATE_PRICING', 'APPROVE_COMMENT', 'TOGGLE_DEMO_STATUS'
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS across all 16 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ ACCESS (Strictly for published & active items)
CREATE POLICY "Public can view published demos"
  ON public.demos FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can view active references"
  ON public.demo_references FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view active services"
  ON public.services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view active industries"
  ON public.industries FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view active pricing plans"
  ON public.pricing_plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view published team members"
  ON public.team_members FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can view approved comments only"
  ON public.comments FOR SELECT
  USING (approval_status = 'approved');

CREATE POLICY "Public can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- 2. PUBLIC WRITE ACCESS (Leads, Bookings, Orders, Comments with strict check)
CREATE POLICY "Public can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert consultation bookings"
  ON public.consultation_bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert service orders"
  ON public.service_orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can submit comments as pending"
  ON public.comments FOR INSERT
  WITH CHECK (approval_status = 'pending');

CREATE POLICY "Public can insert contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- 3. ADMIN AUTHENTICATED FULL ACCESS
CREATE POLICY "Authenticated admins have full access to profiles"
  ON public.profiles FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to site_settings"
  ON public.site_settings FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to services"
  ON public.services FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to industries"
  ON public.industries FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to demos"
  ON public.demos FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to demo_references"
  ON public.demo_references FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to pricing_plans"
  ON public.pricing_plans FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to team_members"
  ON public.team_members FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to blog_posts"
  ON public.blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to comments"
  ON public.comments FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to leads"
  ON public.leads FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to service_orders"
  ON public.service_orders FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to consultation_bookings"
  ON public.consultation_bookings FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to contact_messages"
  ON public.contact_messages FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to media_library"
  ON public.media_library FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated admins have full access to admin_audit_logs"
  ON public.admin_audit_logs FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- PERFORMANCE INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_demos_category ON public.demos(category);
CREATE INDEX IF NOT EXISTS idx_demos_published ON public.demos(is_published);
CREATE INDEX IF NOT EXISTS idx_demo_references_category ON public.demo_references(category);
CREATE INDEX IF NOT EXISTS idx_demo_references_active ON public.demo_references(is_active);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.consultation_bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_comments_status ON public.comments(approval_status);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.service_orders(order_status);
