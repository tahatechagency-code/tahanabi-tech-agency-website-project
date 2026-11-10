# Tahanabi Tech Agency - Project Architecture & Structure

## 1. Directory Tree Architecture

```
/
├── public/
│   ├── assets/
│   │   ├── aistudio/           # Reference mockups & original design attachments
│   │   ├── images/             # Optimized web assets (heroes, avatars, logos)
│   │   └── icons/              # SVG vectors & brand emblems
│   └── favicon.ico
├── src/
│   ├── assets/                 # Embedded graphic constants & images
│   ├── components/             # Reusable UI Component Library
│   │   ├── common/             # Global atoms & molecules
│   │   │   ├── Navbar.tsx      # Premium sticky gold-accented header
│   │   │   ├── Footer.tsx      # Comprehensive multi-column luxury footer
│   │   │   ├── GoldButton.tsx  # High-converting metallic gold gradient button
│   │   │   ├── GlassCard.tsx   # Blur-glass card with gold border highlight
│   │   │   ├── Badge.tsx       # Golden/amber status & category pill
│   │   │   ├── SectionHeader.tsx # Standardized typography header
│   │   │   └── Modal.tsx       # Accessible dialog backdrop
│   │   ├── home/               # Home-specific components
│   │   │   ├── HeroSection.tsx # AI Concierge avatar & skyline hero
│   │   │   ├── StatsTicker.tsx # 150+ Projects, 40+ Automations, 12+ Countries
│   │   │   ├── SolutionsPreview.tsx # 8-card interactive solution preview
│   │   │   ├── DemoCarousel.tsx # Top demos (RoyalSparkle, DiamondLease)
│   │   │   ├── GlobalPresence.tsx # UAE, India, Australia, USA, GCC flags
│   │   │   └── FloatingConciergeWidget.tsx # Interactive AI chat popup
│   │   ├── demos/              # Demo showcases
│   │   │   ├── DemoCard.tsx    # Card with live launch & status badges
│   │   │   ├── DemoFilter.tsx  # Category filter pills
│   │   │   ├── EcommerceDemoModal.tsx # Interactive Jewellery store preview
│   │   │   └── AiConciergeSimulator.tsx # Simulated WhatsApp/Web assistant
│   │   ├── consultation/       # Booking funnel
│   │   │   ├── CalendarPicker.tsx # Custom dark-gold calendar
│   │   │   ├── TimeSlotGrid.tsx  # 10:00 AM, 11:00 AM, 02:00 PM, 04:00 PM
│   │   │   ├── RequirementForm.tsx # Project scope, budget, tech selection
│   │   │   └── BookingSummary.tsx # Confirmation & Google Meet invitation
│   │   └── admin/              # Admin-specific components
│   │       ├── AdminLayout.tsx # Sidebar + Header + Breadcrumb layout
│   │       ├── AdminSidebar.tsx # 13 navigation sections
│   │       ├── StatWidget.tsx  # Metric summary cards
│   │       ├── DataTable.tsx   # Reusable table with sorting, search, pagination
│   │       ├── StatusBadge.tsx # Order & lead status indicators
│   │       └── ConfirmDialog.tsx # Safe destructive action confirmation
│   ├── pages/                  # Page Views (Public & Admin)
│   │   ├── public/
│   │   │   ├── HomePage.tsx
│   │   │   ├── SolutionsPage.tsx
│   │   │   ├── IndustriesPage.tsx
│   │   │   ├── DemosPage.tsx
│   │   │   ├── EcommerceDemoPage.tsx
│   │   │   ├── AiAutomationDemoPage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ResourcesPage.tsx
│   │   │   ├── ResourceDetailPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   └── BookConsultationPage.tsx
│   │   └── admin/
│   │       ├── AdminLoginPage.tsx
│   │       ├── AdminDashboardPage.tsx
│   │       ├── AdminDemosPage.tsx
│   │       ├── AdminIndustriesPage.tsx
│   │       ├── AdminServicesPage.tsx
│   │       ├── AdminPricingPage.tsx
│   │       ├── AdminOrdersPage.tsx
│   │       ├── AdminLeadsPage.tsx
│   │       ├── AdminBookingsPage.tsx
│   │       ├── AdminCommentsPage.tsx
│   │       ├── AdminBlogPage.tsx
│   │       ├── AdminMediaPage.tsx
│   │       ├── AdminTeamPage.tsx
│   │       └── AdminSettingsPage.tsx
│   ├── context/                # Global Application State
│   │   ├── AuthContext.tsx     # Admin session & authentication state
│   │   ├── DataContext.tsx     # Unified reactive store for dynamic content
│   │   └── NotificationContext.tsx # Toast & alert banners
│   ├── lib/                    # Utilities & External Clients
│   │   ├── supabase.ts         # Supabase client singleton & fallback mock DB
│   │   ├── constants.ts        # Company info, phone, email, coordinates
│   │   ├── formatters.ts       # Currency (CAD, USD, INR, AED) & date formatters
│   │   └── validators.ts       # Form validation schemas
│   ├── types/                  # TypeScript Data Models
│   │   ├── database.ts         # Supabase table definitions
│   │   ├── models.ts           # Business entity interfaces
│   │   └── navigation.ts       # Route types
│   ├── App.tsx                 # Root Router & Shell
│   ├── main.tsx                # Entry point
│   └── index.css               # Tailwind v4 theme, gold gradients & glass effects
├── DATABASE_PLAN.md            # Detailed SQL Schema & RLS Policies
├── PROJECT_SPEC.md             # Detailed Requirements & Visual Analysis
├── PROJECT_STRUCTURE.md        # File & Component Hierarchy
├── PHASE_PROGRESS.md           # Implementation Phasing & Tracking
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 2. Reusable Component Matrix

| Component | Props | Purpose |
|---|---|---|
| `Navbar` | `currentRoute: string, onNavigate: (path: string) => void` | Sticky gold-bordered top navigation with mobile hamburger drawer, desktop navigation, language switcher, and booking CTA. |
| `GoldButton` | `variant: 'solid' \| 'outline' \| 'glow', size: 'sm' \| 'md' \| 'lg', icon?: ReactNode, onClick?: () => void` | Primary conversion button with gold gradient and hover shine animation. |
| `GlassCard` | `glow?: boolean, className?: string, children: ReactNode` | Card with dark glass backdrop (`rgba(15, 23, 42, 0.75)`), subtle gold edge border, and optional ambient hover glow. |
| `DemoCard` | `demo: DemoItem, onOpenDemo: (id: string) => void` | Card displaying demo cover, live tag, category, feature bullets, and "View Demo" action button. |
| `CalendarPicker` | `selectedDate: Date, onSelectDate: (date: Date) => void, minDate?: Date` | Dark-gold interactive calendar widget for consultation booking. |
| `AdminLayout` | `activeTab: string, onSelectTab: (tab: string) => void, user: User` | Responsive admin console shell with sidebar navigation, active badge counts, and logout trigger. |
| `DataTable` | `columns: Column<T>[], data: T[], actions?: (row: T) => ReactNode` | Standardized table with search filtering, status sorting, and action dropdowns. |

---

## 3. Route Mapping Table

```typescript
export type AppRoute =
  // Public
  | '/'
  | '/solutions'
  | '/industries'
  | '/demos'
  | '/pricing'
  | '/demos/ecommerce'
  | '/demos/ai-automation'
  | '/about'
  | '/resources'
  | '/contact'
  | '/book-consultation'
  // Admin
  | '/admin/login'
  | '/admin/dashboard'
  | '/admin/demos'
  | '/admin/industries'
  | '/admin/services'
  | '/admin/pricing'
  | '/admin/orders'
  | '/admin/leads'
  | '/admin/bookings'
  | '/admin/comments'
  | '/admin/blog'
  | '/admin/media'
  | '/admin/team'
  | '/admin/settings';
```
