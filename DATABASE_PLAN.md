# Tahanabi Tech Agency - Supabase Database Plan & Schema

## 1. Schema Overview & Database Design

The database is built on **PostgreSQL (Supabase)**, optimized for high read performance, strict Row-Level Security (RLS), and auditability.

```
                           +----------------------+
                           |   admin_users / auth |
                           +----------+-----------+
                                      |
       +------------------------------+-------------------------------+
       |                              |                               |
       v                              v                               v
+--------------+              +---------------+               +---------------+
|    demos     |              |   services    |               |  industries   |
+--------------+              +---------------+               +---------------+
       ^
       | (B2B Car Service: is_published = false)
       |
+--------------+              +---------------+               +---------------+
| pricing_plans|              |     leads     |               | consultation_ |
+-------+------+              +---------------+               |   bookings    |
        |                                                     +---------------+
        v                                                             ^
+--------------+              +---------------+                       |
|    orders    |              |   resources   |                       |
+--------------+              +-------+-------+                       |
                                      |                               |
                                      v                               |
                              +---------------+                       |
                              |   comments    |                       |
                              +---------------+                       |
```

---

## 2. Table Specifications & DDL Scripts

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN PROFILES & ROLES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DEMOS (With strict B2B Car Service unpublished flag)
CREATE TABLE IF NOT EXISTS demos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('ecommerce', 'ai_automation', 'b2b_services', 'custom_apps')),
  short_description TEXT NOT NULL,
  full_description TEXT,
  client_name TEXT,
  industry TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  live_demo_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial insertion of the B2B Car Service Automation demo as UNPUBLISHED and empty
INSERT INTO demos (slug, title, category, short_description, industry, cover_image, is_published, features)
VALUES (
  'b2b-car-service-automation',
  'B2B Car Service Automation',
  'b2b_services',
  'Complete digital solution for car rental, fleet leasing and ground transportation companies in UAE, GCC and beyond.',
  'Car Rental & Fleet',
  '/public/assets/aistudio/WhatsApp_Image_2026-11-09_at_6.30.46_AM_d59ef90e.jpeg',
  false, -- MANDATORY: B2B Car Service remains UNPUBLISHED and empty until populated via Admin
  ARRAY[]::TEXT[]
) ON CONFLICT (slug) DO NOTHING;

-- 3. CORE SERVICES
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  starting_price_cad NUMERIC(10, 2),
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INDUSTRIES
CREATE TABLE IF NOT EXISTS industries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  relevant_demo_slug TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRICING TIERS
CREATE TABLE IF NOT EXISTS pricing_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier_name TEXT NOT NULL CHECK (tier_name IN ('Basic', 'Moderate', 'Premium')),
  tagline TEXT NOT NULL,
  price_cad NUMERIC(10, 2) NOT NULL,
  billing_frequency TEXT NOT NULL DEFAULT 'one_time' CHECK (billing_frequency IN ('one_time', 'monthly', 'yearly')),
  is_popular BOOLEAN NOT NULL DEFAULT false,
  features TEXT[] NOT NULL,
  cta_text TEXT NOT NULL DEFAULT 'Get Started',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CUSTOMER ORDERS WORKFLOW
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  company_name TEXT,
  selected_plan_id UUID REFERENCES pricing_plans(id),
  plan_name TEXT NOT NULL,
  amount_cad NUMERIC(10, 2) NOT NULL,
  custom_requirements TEXT,
  order_status TEXT NOT NULL DEFAULT 'received' CHECK (order_status IN ('received', 'in_review', 'in_development', 'testing', 'delivered', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'fully_paid', 'refunded')),
  estimated_delivery_date DATE,
  assigned_engineer TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. INQUIRIES & LEADS
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_type TEXT NOT NULL,
  message TEXT NOT NULL,
  source_page TEXT DEFAULT 'contact',
  lead_status TEXT NOT NULL DEFAULT 'new' CHECK (lead_status IN ('new', 'contacted', 'qualified', 'closed_won', 'closed_lost')),
  ip_country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONSULTATION BOOKINGS
CREATE TABLE IF NOT EXISTS consultation_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_reference TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  company_name TEXT,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL, -- e.g. '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'
  time_zone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  project_type TEXT NOT NULL,
  project_budget TEXT,
  project_overview TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'rescheduled', 'cancelled')),
  meeting_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. RESOURCES & INSIGHTS (BLOG ARTICLES)
CREATE TABLE IF NOT EXISTS resources_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('AI & Automation', 'E-commerce', 'Business Growth', 'Case Studies')),
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  cover_image TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'MD Juned',
  author_role TEXT NOT NULL DEFAULT 'CEO & Full-Stack Architect',
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ARTICLE COMMENTS & MODERATION
CREATE TABLE IF NOT EXISTS article_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES resources_articles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  qualification TEXT NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  social_links JSONB DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. AGENCY SETTINGS
CREATE TABLE IF NOT EXISTS agency_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Row-Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE demos ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_settings ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ POLICIES
-- Only view published demos (strictly protects unpublished B2B Car Service)
CREATE POLICY "Public can view published demos"
  ON demos FOR SELECT USING (is_published = true);

CREATE POLICY "Public can view active services"
  ON services FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active industries"
  ON industries FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view pricing"
  ON pricing_plans FOR SELECT USING (true);

CREATE POLICY "Public can view published articles"
  ON resources_articles FOR SELECT USING (is_published = true);

-- Only view approved comments
CREATE POLICY "Public can view approved comments"
  ON article_comments FOR SELECT USING (status = 'approved');

CREATE POLICY "Public can view team members"
  ON team_members FOR SELECT USING (true);

CREATE POLICY "Public can view public agency settings"
  ON agency_settings FOR SELECT USING (true);

-- 2. PUBLIC INSERT POLICIES
CREATE POLICY "Public can submit contact leads"
  ON leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can submit orders"
  ON orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can book consultations"
  ON consultation_bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can submit comments for moderation"
  ON article_comments FOR INSERT WITH CHECK (status = 'pending');

-- 3. ADMIN FULL ACCESS (Authenticated Admin Users)
CREATE POLICY "Admins have full access to demos"
  ON demos FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to orders"
  ON orders FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to leads"
  ON leads FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to bookings"
  ON consultation_bookings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to comments"
  ON article_comments FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to articles"
  ON resources_articles FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to services"
  ON services FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to pricing"
  ON pricing_plans FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to settings"
  ON agency_settings FOR ALL USING (auth.role() = 'authenticated');
```

---

## 4. Key Workflows

### 4.1 Customer Order Lifecycle Workflow
1. Client selects a package on `/pricing` or requests custom quote on `/demos/ecommerce`.
2. Client submits requirements and contact details.
3. Record created in `orders` table with `order_status = 'received'`.
4. Instant notification dispatched to admin desk (`+91 91285 96443` & `tahanabitechagency@gmail.com`).
5. Admin updates status in `/admin/orders` to `'in_review'` -> `'in_development'` -> `'testing'` -> `'delivered'`.

### 4.2 Comment Moderation Workflow
1. Visitor submits a comment on a blog article (`/resources`).
2. Row inserted with `status = 'pending'`.
3. Not visible to the public until approved.
4. Admin opens `/admin/comments`, reviews comment text and author details.
5. Admin clicks **"Approve"** (updates `status = 'approved'`) or **"Reject"** / **"Delete"**.

### 4.3 Consultation Booking Workflow
1. Client visits `/book-consultation`.
2. Step 1: Select date on calendar + available time slot (10:00 AM, 11:00 AM, 02:00 PM, 04:00 PM).
3. Step 2: Fill in Name, Email, Phone, Company, Project Scope & Budget.
4. Step 3: Generates unique booking reference (e.g. `TAH-BOOK-2026-8941`) and writes to `consultation_bookings`.
5. Admin views in `/admin/bookings`, confirms slot, and attaches Google Meet link.

### 4.4 Demo Management Workflow & B2B Car Service Rule
1. Demos fetched by public routes with `WHERE is_published = true`.
2. **B2B Car Service Automation** defaults to `is_published: false` and empty state.
3. In `/admin/demos`, MD Juned and Satpal Kumar can edit title, upload screenshots, attach video/live preview URLs, configure feature lists, and toggle **"Publish Live"** once content is ready.
