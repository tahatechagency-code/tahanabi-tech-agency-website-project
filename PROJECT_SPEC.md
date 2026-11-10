# Tahanabi Tech Agency - Complete Project Specification

## 1. Executive Summary & Brand Identity

**Tahanabi Tech Agency** is a premier international technology and AI automation agency catering to enterprise and modern business clients across the UAE, GCC, India, Australia, the USA, and globally.

### 1.1 Company Information
* **Company Name:** Tahanabi Tech Agency
* **Tagline:** Global Technology & AI Automation Partner for Modern Businesses
* **Headline:** Build, Automate & Grow Your Business Worldwide
* **Sub-headline:** We design and deploy AI-powered automation, custom apps, and high-converting e-commerce platforms for businesses across UAE, GCC, India, Australia, USA and beyond.
* **Phone / WhatsApp:** +91 91285 96443 / +971 50 123 4567 (Global Desk)
* **Email:** tahanabitechagency@gmail.com / hello@tahanabi.com
* **Registered Location Coordinates:** `26.442939, 85.902673` (Bihar, India & Dubai, UAE Global Operations)
* **Leadership:**
  * **Chief Executive Officer (CEO):** MD Juned — B.Tech, NIT Trichy, Class of 2024
  * **Founder:** Satpal Kumar — B.Tech, NIT Trichy, Class of 2023
  * **Core Engineering Team:** 2 Senior Full-Stack & AI Engineers with 5+ years of production experience each
* **Agency Track Record:**
  * 150+ Projects Delivered
  * 40+ Production AI Automations
  * 12+ Operating Countries
  * 99% Client Satisfaction Rate

---

## 2. Core Business Services

1. **E-commerce Website Development:** Premium luxury e-commerce platforms (Jewellery, Fashion, Retail) with multi-currency, multi-branch inventory, WhatsApp checkout, and payment gateways.
2. **AI Automation Applications:** Autonomous 24/7 AI Concierge bots, WhatsApp CRM auto-responders, AI customer support, and appointment scheduling.
3. **Custom Business Applications:** Tailored web, portal, and mobile-ready enterprise platforms.
4. **CRM and Integrations:** WhatsApp Business API, SMS gateways, ERP connectors, Zapier/Make automations, and custom webhooks.
5. **International Website Development:** Ultra-fast, localized, multi-language websites (English, Arabic, Hindi) with global CDN deployment.
6. **Business Technology Solutions:** End-to-end IT architecture, cloud deployment, and continuous DevOps support.

---

## 3. Visual & Aesthetic Architecture (Design Constitution)

Based on the 4 mandatory reference image sheets (`WhatsApp_Image_2026-11-09_at_6.30.46_AM_d59ef90e.jpeg`, `WhatsApp_Image_2026-11-09_at_6.30.47_AM_85333dfc.jpeg`, `WhatsApp_Image_2026-11-09_at_6.30.47_AM__1__d38c26b6.jpeg`, `WhatsApp_Image_2026-11-09_at_6.30.47_AM__2__6855bc82.jpeg`):

### 3.1 Color Palette & Tokens
* **Base Background:** Deep Midnight Navy / Void Black (`#050811`, `#090D1A`, `#0B1120`)
* **Primary Accent (Metallic Gold):**
  * Gold Gradient: `linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #B45309 100%)`
  * Gold Highlight: `#F59E0B` / `#D4AF37`
  * Gold Glow: `rgba(212, 175, 55, 0.25)` to `rgba(245, 158, 11, 0.40)`
* **Surface & Glass Effect:**
  * Background: `rgba(15, 23, 42, 0.70)` to `rgba(30, 41, 59, 0.85)`
  * Border: `1px solid rgba(212, 175, 55, 0.22)`
  * Backdrop Blur: `backdrop-blur-xl` (16px – 24px)
* **Text Hierarchy:**
  * Headings: Pristine White (`#FFFFFF`) with selective Gold Gradient text span highlights.
  * Body: Silver Slate (`#94A3B8` / `#CBD5E1`)
  * Badges: Amber/Gold tinted badge with border (`bg-amber-500/10 text-amber-300 border-amber-500/20`)

### 3.2 Iconography & Logo
* 3D Golden Faceted Monogram Cube ("T" logo mark)
* Clean Lucide icons with subtle metallic glow

---

## 4. Route Specifications

### 4.1 Public Routes
| Route | Page Name | Primary Objective & Key Elements |
|---|---|---|
| `/` | Home Page | Hero section with AI Concierge avatar, global partner badge, stats ticker, solutions grid preview, demo showcase, client testimonials, and consultation CTA. |
| `/solutions` | Our Solutions | Full 8-card solution matrix (E-commerce, AI Automation, B2B Car Service [unpublished badge/notice], Custom Apps, Admin/CRM, Integrations, AI Concierge, Cloud). |
| `/industries` | Industries We Serve | 8 Industry cards (Jewellery, Car Rental, Hospitality, Real Estate, Healthcare, Multi-branch Retail, EdTech, Custom). |
| `/demos` | Live Demo Collection | Filterable portfolio (All, E-commerce, AI Automation, B2B Services, Custom Apps). Live demo launch modal/iframes. |
| `/pricing` | Pricing Plans | Transparent tier matrix: Basic ($200 CAD), Moderate ($500 CAD - Most Popular), Premium ($1,000+ CAD). Monthly/Yearly toggle. |
| `/demos/ecommerce` | E-commerce Demo | Detailed showcase of RoyalSparkle / Luxury Jewellery store with variation selector, WhatsApp inquiry, cart preview, and admin view. |
| `/demos/ai-automation` | AI Automation Demo | Interactive live AI Concierge simulation widget with instant quote calculator, slot checker, and WhatsApp sync. |
| `/about` | About Us | Company background, NIT Trichy founder profiles (MD Juned & Satpal Kumar), team of senior engineers, mission, and global reach map. |
| `/resources` | Resources & Insights | Tech & AI automation articles, e-commerce checklists, case studies with filter tags and interactive comment section. |
| `/contact` | Contact Us | WhatsApp direct link, phone numbers, email, geographical coordinates (`26.442939, 85.902673`), and lead inquiry form. |
| `/book-consultation` | Book a Consultation | 3-step interactive booking funnel: (1) Date/Time slot selection, (2) Project requirements, (3) Confirmation with calendar invite & WhatsApp ping. |

### 4.2 Admin Routes (Protected - RBAC)
| Route | Admin Module | Features & Capabilities |
|---|---|---|
| `/admin/login` | Secure Admin Auth | Email/password login with Supabase Auth session management and route guards. |
| `/admin/dashboard` | Main Analytics | Real-time statistics: Total leads, active orders, bookings, pending comments, revenue overview, and recent activity logs. |
| `/admin/demos` | Demo Manager | CRUD for demo showcases. Toggle visibility, update tags, screenshots, and live URLs. **Enforces B2B Car Service unpublished default.** |
| `/admin/industries` | Industry Manager | Manage industry categories, descriptions, icons, and case studies. |
| `/admin/services` | Services Manager | Manage core offerings, pricing starting points, and feature checklists. |
| `/admin/pricing` | Pricing Manager | Configure pricing tiers (Basic CAD 200, Moderate CAD 500, Premium CAD 1,000+), currency switches, and feature toggles. |
| `/admin/orders` | Customer Orders | Manage customer orders, track pipeline status (`received`, `in_review`, `in_development`, `testing`, `delivered`), and payment status. |
| `/admin/leads` | Inquiries & Leads | Contact form submissions, business classification, priority score, and WhatsApp follow-up action buttons. |
| `/admin/bookings` | Consultation Manager | View, accept, reschedule, or cancel client consultation calls; send Google Meet / Zoom links. |
| `/admin/comments` | Comment Moderation | Review, approve, or reject visitor comments on blog/resource articles. |
| `/admin/blog` | Blog & Resources | Rich content manager for publishing guides, case studies, and industry articles. |
| `/admin/media` | Media Library | Centralized asset manager for screenshots, hero assets, and project files. |
| `/admin/team` | Team Manager | Manage team member profiles, bios, roles, and alumni badges (NIT Trichy). |
| `/admin/settings` | Agency Settings | Update global contact info (+91 91285 96443, tahanabitechagency@gmail.com, coordinates), SEO metadata, and system flags. |

---

## 5. Critical Business Constraint: B2B Car Service Automation

* **Mandatory Rule:** The *B2B Car Service Automation* solution & demonstration must remain **unpublished and completely empty** on public views by default.
* **Mechanism:**
  * Database column `is_published: false` in the `demos` and `solutions` tables.
  * Public routes query only `WHERE is_published = true`.
  * The Admin Demo Manager `/admin/demos` will have an explicit unpublished record ready for MD Juned and the team to populate with media, features, and demonstrations at their discretion.

---

## 6. Security, Authentication & Data Flow

* **Supabase Integration:**
  * Supabase Client SDK integration with environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
  * Local fallback mock state provider to ensure 100% operational UI even if Supabase keys are pending configuration.
  * Row-Level Security (RLS) policies:
    * Public: `SELECT` on published demos, active services, approved comments, and published articles.
    * Public: `INSERT` on `leads`, `orders`, and `consultation_bookings`.
    * Authenticated Admin: Full `SELECT`, `INSERT`, `UPDATE`, `DELETE` on all tables.
