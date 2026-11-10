import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppRoute,
  ArticleItem,
  CompanyInfo,
  ConsultationBooking,
  ContactLead,
  DemoItem,
  IndustryItem,
  PricingPlan,
  ReferenceItem,
  ServiceItem,
  StatItem,
  TestimonialItem,
  CommentRecord,
  MediaAsset,
  AdminUser,
  AvailabilitySchedule,
  OrderModalData,
  FeedbackModalData,
} from '../types/models';
import { notificationService } from '../utils/notificationService';
import { initialReferences } from '../data/initialReferences';
import {
  leadsDb,
  bookingsDb,
  ordersDb,
  commentsDb,
  demosDb,
  auditLogsDb,
  isSupabaseConfigured,
} from '../lib/supabase';
import { Database } from '../types/database';

interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface DataContextType {
  company: CompanyInfo;
  stats: StatItem[];
  services: ServiceItem[];
  industries: IndustryItem[];
  demos: DemoItem[];
  pricingPlans: PricingPlan[];
  articles: ArticleItem[];
  testimonials: TestimonialItem[];
  references: ReferenceItem[];
  bookings: ConsultationBooking[];
  leads: ContactLead[];
  orders: Database['public']['Tables']['service_orders']['Row'][];
  auditLogs: any[];
  currentRoute: AppRoute;
  selectedArticle: ArticleItem | null;
  activeDemoModal: DemoItem | null;
  isBackendConnected: boolean;
  navigate: (route: AppRoute) => void;
  openDemoModal: (demo: DemoItem) => void;
  closeDemoModal: () => void;
  selectArticle: (article: ArticleItem | null) => void;
  submitLead: (lead: Omit<ContactLead, 'id' | 'createdAt' | 'status'>) => Promise<any>;
  submitBooking: (booking: Omit<ConsultationBooking, 'id' | 'reference' | 'createdAt' | 'status'>) => Promise<string>;
  submitOrder: (order: Database['public']['Tables']['service_orders']['Insert']) => Promise<string>;
  submitComment: (articleId: string, comment: { authorName: string; authorEmail: string; content: string }) => Promise<void>;
  updateLeadStatus: (id: string, status: ContactLead['status']) => Promise<void>;
  updateBookingStatus: (id: string, status: ConsultationBooking['status']) => Promise<void>;
  updateOrderStatus: (id: string, order_status: Database['public']['Tables']['service_orders']['Row']['order_status']) => Promise<void>;
  moderateComment: (id: string, status: 'approved' | 'rejected' | 'spam') => Promise<void>;
  addReference: (ref: Omit<ReferenceItem, 'id'>) => void;
  updateReference: (id: string, updated: Partial<ReferenceItem>) => void;
  toggleReferenceStatus: (id: string) => void;
  deleteReference: (id: string) => void;
  updateStat: (id: string, updated: Partial<StatItem>) => void;
  updatePricingPlan: (id: string, updated: Partial<PricingPlan>) => void;
  updateCompany: (updated: Partial<CompanyInfo>) => void;
  runDatabaseCrudTest: () => Promise<any>;

  // Phase 6 Admin Panel Additions
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  toast: ToastItem | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // Demos CRUD
  addDemo: (demo: Omit<DemoItem, 'id'>) => Promise<void>;
  updateDemo: (id: string, updated: Partial<DemoItem>) => Promise<void>;
  deleteDemo: (id: string) => Promise<void>;
  togglePublishDemo: (id: string) => Promise<void>;
  toggleFeatureDemo: (id: string) => Promise<void>;

  // Services CRUD
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (id: string, updated: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Industries CRUD
  addIndustry: (industry: Omit<IndustryItem, 'id'>) => Promise<void>;
  updateIndustry: (id: string, updated: Partial<IndustryItem>) => Promise<void>;
  deleteIndustry: (id: string) => Promise<void>;

  // Pricing Plans CRUD
  addPricingPlan: (plan: Omit<PricingPlan, 'id'>) => Promise<void>;
  deletePricingPlan: (id: string) => Promise<void>;

  // Blog / Articles CRUD
  addArticle: (article: Omit<ArticleItem, 'id'>) => Promise<void>;
  updateArticle: (id: string, updated: Partial<ArticleItem>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;

  // Comments Management
  comments: CommentRecord[];
  addComment: (comment: Omit<CommentRecord, 'id' | 'createdDate'>) => Promise<void>;
  updateComment: (id: string, updated: Partial<CommentRecord>) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  toggleCommentPublish: (id: string) => Promise<void>;

  // Leads & Orders Management
  updateLead: (id: string, updated: Partial<ContactLead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  updateOrder: (id: string, updated: Partial<Database['public']['Tables']['service_orders']['Update']>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;

  // Bookings Management
  updateBooking: (id: string, updated: Partial<ConsultationBooking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  availabilitySchedule: AvailabilitySchedule;
  updateAvailabilitySchedule: (updated: Partial<AvailabilitySchedule>) => void;

  // Media Library
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => void;
  deleteMediaAsset: (id: string) => void;

  // Team Management
  updateTeamMember: (role: 'ceo' | 'founder', data: any) => void;
  updateEngineers: (desc: string) => void;

  // Phase 7 Customer-to-Admin Workflow Additions
  isOrderModalOpen: boolean;
  orderModalData: OrderModalData | null;
  openOrderModal: (data?: OrderModalData) => void;
  closeOrderModal: () => void;
  isFeedbackModalOpen: boolean;
  feedbackModalData: FeedbackModalData | null;
  openFeedbackModal: (data?: FeedbackModalData) => void;
  closeFeedbackModal: () => void;
  submitCustomerOrder: (order: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    country: string;
    businessType: string;
    budgetRange: string;
    amountCAD: number;
    requirements: string;
    demoTitle?: string;
    serviceType?: string;
    pricingPlan?: string;
  }) => Promise<{ success: boolean; reference: string; error?: string; order?: any }>;
  submitPublicFeedback: (feedback: {
    author: string;
    email: string;
    content: string;
    rating?: number;
    relatedPage?: string;
    targetType?: 'article' | 'demo' | 'page';
  }) => Promise<{ success: boolean; message: string }>;
}

const initialCompany: CompanyInfo = {
  name: 'Tahanabi Tech Agency',
  tagline: 'Global Technology & AI Automation Partner for Modern Businesses',
  headline: 'Build, Automate & Grow Your Business Worldwide',
  description:
    'We design and deploy AI-powered automation, custom business applications, and high-converting e-commerce platforms for businesses across UAE, GCC, India, USA, Australia, and beyond.',
  phone: '+91 91285 96443',
  whatsapp: '+91 91285 96443',
  email: 'tahanabitechagency@gmail.com',
  location: 'Bihar, India | Dubai, UAE (Global Operations)',
  googleMapsUrl: 'https://www.google.com/maps?q=26.442939,85.902673',
  coordinates: {
    lat: 26.442939,
    lng: 85.902673,
  },
  ceo: {
    name: 'MD Juned',
    degree: 'B.Tech',
    institution: 'NIT Trichy',
    year: 2024,
    bio: 'Technology visionary and full-stack software architect specializing in AI systems, high-converting platforms, and scalable cloud microservices.',
  },
  founder: {
    name: 'Satpal Kumar',
    degree: 'B.Tech',
    institution: 'NIT Trichy',
    year: 2023,
    bio: 'Systems engineer with deep expertise in enterprise automation, CRM pipelines, multi-region cloud deployment, and business technology modernization.',
  },
  engineers: '2 Senior Full-Stack & AI Engineers (5+ Years Experience)',
};

const initialStats: StatItem[] = [
  {
    id: 'stat-projects',
    label: 'Projects',
    value: '150+',
    numericValue: 150,
    suffix: '+',
    description: 'Delivered across international markets',
  },
  {
    id: 'stat-automations',
    label: 'Automations',
    value: '40+',
    numericValue: 40,
    suffix: '+',
    description: 'Active production AI workflows & chatbots',
  },
  {
    id: 'stat-countries',
    label: 'Countries',
    value: '12+',
    numericValue: 12,
    suffix: '+',
    description: 'UAE, GCC, India, USA, Australia, UK, etc.',
  },
  {
    id: 'stat-satisfaction',
    label: 'Client Satisfaction',
    value: '99%',
    numericValue: 99,
    suffix: '%',
    description: 'Consistent 5-star delivery and support',
  },
];

const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'E-commerce Websites',
    subtitle: 'High-Converting Online Stores',
    description:
      'Custom luxury e-commerce platforms engineered for high conversions with multi-currency, multi-branch inventory, WhatsApp checkout, and payment gateways.',
    iconName: 'ShoppingBag',
    features: [
      'Luxury Product Catalog & Variations',
      'Integrated WhatsApp Checkout & Inquiry',
      'Multi-Branch Real-Time Inventory Sync',
      'Global Stripe, PayPal & Regional Payment Gateways',
      'Advanced Customer Accounts & Order Tracking',
      'Admin Dashboard with Live Sales Analytics',
    ],
    deliverables: ['Custom Storefront', 'Admin Panel', 'Payment Gateways', 'WhatsApp Integration', 'SEO Setup'],
    idealFor: 'Jewellery, Luxury Brands, Fashion, Retail Chains & High-Ticket Boutiques',
    slug: 'ecommerce-websites',
  },
  {
    id: 'srv-2',
    title: 'AI Automation & Chatbots',
    subtitle: '24/7 Autonomous Customer Agents',
    description:
      'Intelligent digital assistants for web and WhatsApp that autonomously capture leads, book appointments, deliver quotes, and resolve client inquiries.',
    iconName: 'Bot',
    features: [
      'Website & WhatsApp AI Concierge Bot',
      'Autonomous Booking & Calendar Scheduling',
      'Multi-Language (English, Arabic, Hindi, etc.)',
      'CRM Auto-Sync & Instant Lead Routing',
      'Human-in-the-Loop Live Agent Handoff',
      'Custom Knowledge Base Grounding & Audit Logs',
    ],
    deliverables: ['AI Concierge Bot', 'WhatsApp Cloud API Setup', 'Custom AI Prompt Engineering', 'Admin Analytics'],
    idealFor: 'Car Rentals, Clinics, Hospitality, Real Estate, Professional Services & Agencies',
    slug: 'ai-automation',
  },
  {
    id: 'srv-3',
    title: 'Custom Business Apps',
    subtitle: 'Tailored High-Performance Software',
    description:
      'Purpose-built web applications and digital portals engineered for specific business logic, customer portals, staff dashboards, and operations.',
    iconName: 'Code2',
    features: [
      'Tailored Architecture & Supabase / PostgreSQL Database',
      'Role-Based Access Control (RBAC) & Secure Auth',
      'High-Speed API Microservices',
      'Mobile-First Responsive Web Interface',
      'Automated PDF, Invoicing & Report Generators',
      'Continuous Uptime Monitoring & SLA',
    ],
    deliverables: ['Full Web App', 'Database Schema & APIs', 'Admin & Client Roles', 'Documentation'],
    idealFor: 'Logistics, Fleet Operators, Franchises, B2B Companies & Service Enterprises',
    slug: 'custom-business-apps',
  },
  {
    id: 'srv-4',
    title: 'CRM & Integrations',
    subtitle: 'Connected Business Ecosystem',
    description:
      'Unify all your tools with official WhatsApp Cloud API, automated CRM pipelines (Zoho, HubSpot, Salesforce), SMS, automated email, and ERP systems.',
    iconName: 'Network',
    features: [
      'Official Meta WhatsApp Business Cloud API',
      'Automated Lead Capture to CRM Tables',
      'Invoice, Stripe & Payment Status Webhooks',
      'Instant SMS & Email Transactional Alerts',
      'Google Sheets & Zapier / Make Connectors',
      'Customer Lifecycle Funnel Analytics',
    ],
    deliverables: ['API Bridges', 'Webhook Endpoints', 'CRM Pipeline Setup', 'Testing & Verification'],
    idealFor: 'Companies seeking to automate repetitive sales, notifications, and customer communications',
    slug: 'integrations',
  },
  {
    id: 'srv-5',
    title: 'Global Deployment',
    subtitle: 'Ultra-Fast International Hosting',
    description:
      'Enterprise-grade cloud hosting and DevOps pipelines configured for maximum uptime, SSL encryption, low latency, and global CDN delivery.',
    iconName: 'Globe',
    features: [
      'Edge CDN Multi-Region Traffic Routing',
      'Sub-second International Load Times across UAE, India & US',
      'Automated Daily Backups & SSL Encryption',
      'DDoS Protection & Cloudflare Edge Caching',
      'CI/CD Pipeline with Instant Rollback',
      '24/7 Server Health Monitoring',
    ],
    deliverables: ['Cloud Infrastructure', 'Custom Domain & SSL', 'CDN Caching', 'Maintenance SLA'],
    idealFor: 'Fast-growing brands targeting global customers requiring 99.99% uptime',
    slug: 'global-deployment',
  },
  {
    id: 'srv-6',
    title: 'Business Tech Solutions',
    subtitle: 'Full IT Architecture & Modernization',
    description:
      'Strategic technology roadmapping, cloud database migration, legacy software rewrites, and security audits handled by our NIT Trichy founding team.',
    iconName: 'Layers',
    features: [
      'Comprehensive Tech Stack & Performance Audit',
      'Database Migration to Scalable Cloud SQL/Supabase',
      'Enterprise Security & Compliance Auditing',
      'Staff Training & Technical Documentation',
    ],
    deliverables: ['Architecture Blueprint', 'Audit Report', 'Migration Plan', 'Implementation'],
    idealFor: 'Established businesses upgrading from outdated systems to high-speed modern tech',
    slug: 'tech-solutions',
  },
];

const initialIndustries: IndustryItem[] = [
  {
    id: 'ind-1',
    name: 'Jewellery & Retail',
    description: 'High-ticket e-commerce, live gold/diamond rate variations, COA verification, and VIP WhatsApp concierge.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    iconName: 'Gem',
    slug: 'jewellery-retail',
    keyUseCases: ['Product Variations by Karat & Weight', 'One-Click WhatsApp Price Quote', 'Secure Checkout & Insurance', 'Multi-Branch Store Inventory'],
    statsHeadline: '3.4x Higher Inquiries with WhatsApp Concierge',
  },
  {
    id: 'ind-2',
    name: 'Car Rental & Fleet',
    description: 'Automated vehicle booking, calendar availability, tariff calculators, and WhatsApp customer communications.',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    iconName: 'Car',
    slug: 'car-rental-fleet',
    keyUseCases: ['Live Vehicle Availability Calendar', 'Instant Quotation & Deposit Collection', 'Digital ID & License Uploads', 'Driver & Fleet Status Alerts'],
    statsHeadline: '60% Reduction in Booking Overhead',
  },
  {
    id: 'ind-3',
    name: 'Real Estate & Property',
    description: 'Luxury property listings, 360 virtual tours, automated buyer qualification, and instant inspection scheduling.',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
    iconName: 'Building2',
    slug: 'real-estate-property',
    keyUseCases: ['Interactive Floorplan & Gallery', 'AI Buyer Budget & Timeline Qualifier', 'Private Inspection Scheduler', 'Agent Lead Assignment CRM'],
    statsHeadline: '45% Faster Lead-to-Inspection Booking',
  },
  {
    id: 'ind-4',
    name: 'Tourism & Travel',
    description: 'Tour package catalogs, automated itinerary builders, multi-currency booking, and 24/7 traveler support bots.',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    iconName: 'Compass',
    slug: 'tourism-travel',
    keyUseCases: ['Dynamic Itinerary & Package Quoting', 'Multi-Currency Payment (USD, AED, EUR)', 'AI Travel Advisor via WhatsApp', 'Automated Voucher Delivery'],
    statsHeadline: '99% Instant Inquiry Response Rate',
  },
  {
    id: 'ind-5',
    name: 'Healthcare & Clinics',
    description: 'HIPAA-conscious appointment booking, doctor schedule management, tele-consultation portals, and SMS reminders.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    iconName: 'Stethoscope',
    slug: 'healthcare-clinics',
    keyUseCases: ['Online Doctor & Slot Selection', 'Automated Appointment SMS Reminders', 'Secure Intake Forms', 'Patient Tele-Consultation Links'],
    statsHeadline: '70% Drop in Missed Appointments',
  },
  {
    id: 'ind-6',
    name: 'Education & EdTech',
    description: 'Online student enrollment, interactive learning portals, tutor scheduling, and fee payment automation.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    iconName: 'GraduationCap',
    slug: 'education-edtech',
    keyUseCases: ['Course Discovery & Enrollment Funnels', 'Automated Fee Invoicing', 'Student Portal & Dashboard', 'Live Class Notifications'],
    statsHeadline: '2.5x Increase in Student Conversions',
  },
  {
    id: 'ind-7',
    name: 'Hospitality & Dining',
    description: 'Digital visual menus, table booking systems, room service QR ordering, and automated post-dining review collectors.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    iconName: 'UtensilsCrossed',
    slug: 'hospitality-dining',
    keyUseCases: ['QR Table Ordering & POS Dispatch', 'Online Reservation Engine', 'Automated Google Review Funnel', 'VIP Guest Loyalty Program'],
    statsHeadline: '4.8 Star Average Rating Boost',
  },
  {
    id: 'ind-8',
    name: 'Other Businesses',
    description: 'Specialized technology architectures designed for unique business models, franchises, and industrial enterprises.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    iconName: 'Layers',
    slug: 'other-businesses',
    keyUseCases: ['Custom ERP & Inventory Pipelines', 'Franchise Multi-Outlet Portals', 'B2B Client Ordering Portals', 'Automated Field Team Workflows'],
    statsHeadline: 'Custom Engineered to Exact Specifications',
  },
];

const initialPricingPlans: PricingPlan[] = [
  {
    id: 'price-basic',
    tierName: 'Basic',
    tagline: 'Get Online Quickly with High Impact',
    priceCAD: 200,
    priceNote: 'One-time setup fee',
    billingFrequency: 'one_time',
    isPopular: false,
    turnaroundTime: '3-5 Business Days',
    ctaText: 'Choose Basic Plan',
    features: [
      'Business Website (Up to 5 Pages)',
      '100% Mobile Responsive Design',
      'Basic SEO & Meta Tags Configuration',
      'Contact & Lead Enquiry Form',
      'WhatsApp Quick Chat Button',
      'High-Speed Cloud Hosting Setup',
      'Standard SSL Certificate & Domain Linking',
      '2 Rounds of Content Revisions',
    ],
    notIncluded: ['E-commerce Cart & Payments', 'Admin Panel for Inventory', 'Autonomous AI Chatbot'],
  },
  {
    id: 'price-moderate',
    tierName: 'Moderate',
    tagline: 'Most Popular for High-Converting Growth',
    priceCAD: 500,
    priceNote: 'Complete ready-to-scale setup',
    billingFrequency: 'one_time',
    isPopular: true,
    turnaroundTime: '7-10 Business Days',
    ctaText: 'Choose Moderate (Popular)',
    features: [
      'Complete E-commerce or Booking Website',
      'Admin Panel (Manage Orders, Leads, Bookings)',
      'Product / Service Catalog (Up to 50 Items)',
      'Integrated WhatsApp Automation & Inquiry',
      'Global Payment Gateways (Stripe, PayPal, Local)',
      'Multi-Currency Support (AED, CAD, USD, INR)',
      'Advanced Lead Management & Email Alerts',
      'Interactive Customer Reviews & Ratings',
      'Fast Cloud Hosting on Global CDN',
      '30 Days Dedicated Technical Support',
    ],
    notIncluded: ['Custom Autonomous AI Concierge Engine', 'Multi-Branch Enterprise ERP'],
  },
  {
    id: 'price-premium',
    tierName: 'Premium',
    tagline: 'Full Custom Scale & Autonomous AI Power',
    priceCAD: 1000,
    priceNote: 'Starting price for custom enterprise',
    billingFrequency: 'custom',
    isPopular: false,
    turnaroundTime: '2-3 Weeks',
    ctaText: 'Consult on Premium Plan',
    features: [
      'Custom Web Application & Scalable Architecture',
      '24/7 AI Automation (Chatbot & Concierge Engine)',
      'Official Meta WhatsApp Cloud API Bot',
      'Multi-Branch & Advanced CRM / ERP Integration',
      'Custom Supabase / PostgreSQL Database Design',
      'Unlimited Products & Scalable Inventory',
      'Multi-Language Support (English, Arabic, Hindi, etc.)',
      'Custom User Roles & Permissions (RBAC)',
      'Automated Invoicing & Financial Webhooks',
      'Priority 24/7 VIP Engineering SLA Support',
      'Direct Architecture Access with MD Juned & Satpal Kumar',
    ],
  },
];

const initialDemos: DemoItem[] = [
  // E-COMMERCE DEMOS
  {
    id: 'demo-royalsparkle',
    title: 'RoyalSparkle Jewellers',
    category: 'ecommerce',
    subCategory: 'Jewellery',
    shortDescription: 'A premium jewellery e-commerce platform with elegant design, product management, COA certificates and WhatsApp checkout.',
    longDescription:
      'Engineered for luxury jewellery and gold merchants in UAE, India, and GCC. Features real-time price calculation by weight, certified diamond grading display, interactive ring size guides, and instant WhatsApp invoice checkout.',
    clientName: 'RoyalSparkle Luxury Retailing',
    industry: 'Jewellery & Luxury Retail',
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    tags: ['E-commerce', 'Jewellery', 'WhatsApp Checkout', 'Multi-Currency'],
    features: [
      'Gold & Diamond Catalog with live weight/purity variations',
      'One-click WhatsApp Inquiry & Invoice generator',
      'Admin Panel for Order & Customer tracking',
      'Multi-currency support (AED, INR, USD, CAD)',
      'Automated Certificate of Authenticity (COA) PDF generator',
    ],
    metrics: [
      { label: 'Cart Conversion', value: '+42%' },
      { label: 'Inquiry Speed', value: '<30s' },
    ],
    isPublished: true,
    slug: 'royalsparkle-jewellers',
    demoUrl: '/demos/ecommerce',
  },
  {
    id: 'demo-ekaansh',
    title: 'Ekaansh Jewels',
    category: 'ecommerce',
    subCategory: 'Luxury Stores',
    shortDescription: 'Heritage bridal couture jewellery boutique with bespoke appointment booking and high-ticket customer VIP concierge.',
    clientName: 'Ekaansh Couture Gems',
    industry: 'Jewellery & Retail',
    coverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    tags: ['E-commerce', 'Bridal Couture', 'VIP Concierge', 'High-Ticket'],
    features: [
      'High-resolution zoom & 360 degree video previews',
      'VIP private viewing scheduler with Google Meet / In-Store',
      'Deposit payment & bespoke custom design intake',
    ],
    isPublished: true,
    slug: 'ekaansh-jewels',
    demoUrl: '/demos/ecommerce',
  },
  {
    id: 'demo-omgauri',
    title: 'Om Gauri Jewellery Store',
    category: 'ecommerce',
    subCategory: 'Jewellery',
    shortDescription: 'Multi-branch retail jewellery store with centralized inventory synchronization and local currency checkout.',
    clientName: 'Om Gauri Jewellers Network',
    industry: 'Jewellery & Retail',
    coverImage: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80',
    tags: ['E-commerce', 'Multi-Branch', 'Inventory Sync', 'Retail'],
    features: [
      'Central inventory linking 4 branch locations',
      'Store pickup or secure insured courier delivery',
      'Live bullion spot price auto-adjustment',
    ],
    isPublished: true,
    slug: 'om-gauri-jewellery',
    demoUrl: '/demos/ecommerce',
  },
  {
    id: 'demo-velvetspark',
    title: 'Velvet Spark Fashion & Lifestyle',
    category: 'ecommerce',
    subCategory: 'Fashion',
    shortDescription: 'Modern couture fashion house with size fit advisor, lookbook reels, and rapid checkout funnel.',
    clientName: 'Velvet Spark Fashion House',
    industry: 'Retail & Multi-Branch',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    tags: ['E-commerce', 'Fashion', 'Lookbook', 'Instant Pay'],
    features: [
      'Interactive seasonal lookbook with shoppable tags',
      'Size recommendation engine based on user inputs',
      'One-page streamlined mobile checkout',
    ],
    isPublished: true,
    slug: 'velvet-spark-fashion',
    demoUrl: '/demos/ecommerce',
  },
  {
    id: 'demo-artisan',
    title: 'Artisan Heritage Leather',
    category: 'ecommerce',
    subCategory: 'Lifestyle',
    shortDescription: 'Handcrafted luxury leather goods boutique with custom monogramming preview and global shipping integration.',
    clientName: 'Artisan Heritage Co.',
    industry: 'Retail & Multi-Branch',
    coverImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    tags: ['E-commerce', 'Lifestyle', 'Custom Monogram', 'Global Shipping'],
    features: [
      'Real-time live leather embossing text preview',
      'DHL / FedEx live shipping tariff calculator',
      'Multi-currency payment gateway',
    ],
    isPublished: true,
    slug: 'artisan-leather',
    demoUrl: '/demos/ecommerce',
  },

  // AI AUTOMATION DEMOS
  {
    id: 'demo-diamondlease',
    title: 'AI Concierge (Website & WhatsApp)',
    category: 'ai_automation',
    subCategory: 'AI Concierge',
    shortDescription: 'Autonomous 24/7 AI business assistant that captures leads, answers questions, quotes rates, and routes qualified clients.',
    clientName: 'DiamondLease Mobility Group',
    industry: 'Car Rental & Fleet Services',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    tags: ['AI Automation', 'AI Concierge', 'WhatsApp Bot', 'Lead Capture'],
    features: [
      '24/7 autonomous responses in under 800 milliseconds',
      'Multi-lingual support (English, Arabic, Hindi, French)',
      'Automated customer qualification and intent categorization',
      'Direct handoff to WhatsApp sales executive with chat history',
    ],
    metrics: [
      { label: 'Response Time', value: '<1 sec' },
      { label: 'Lead Capture', value: '3.8x' },
    ],
    isPublished: true,
    slug: 'ai-concierge-diamondlease',
    demoUrl: '/demos/ai-automation',
  },
  {
    id: 'demo-booking-auto',
    title: 'Booking & Appointment Automation',
    category: 'ai_automation',
    subCategory: 'Booking Automation',
    shortDescription: 'Self-scheduling booking engine for appointments, rentals, and service calls synced directly to Google Calendar.',
    clientName: 'Aura Care Medical Network',
    industry: 'Healthcare & Clinics',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    tags: ['AI Automation', 'Booking Automation', 'Calendar Sync', 'SMS Reminder'],
    features: [
      'Two-way Google Calendar / Outlook integration',
      'Automatic time-zone conversion for global clients',
      'WhatsApp & SMS appointment reminder sequences',
      'Deposit payment collection prior to slot confirmation',
    ],
    isPublished: true,
    slug: 'booking-automation',
    demoUrl: '/demos/ai-automation',
  },
  {
    id: 'demo-crm-auto',
    title: 'Lead & CRM Automation',
    category: 'ai_automation',
    subCategory: 'Lead & CRM',
    shortDescription: 'Instant lead qualification, automatic scoring, and multi-channel notification dispatch directly to sales reps.',
    clientName: 'Apex Real Estate Partners',
    industry: 'Real Estate & Property',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['AI Automation', 'CRM Pipeline', 'Lead Scoring', 'Instant Alerts'],
    features: [
      'Instant lead classification by budget, timeline and intent',
      'Direct dispatch to sales reps via WhatsApp & Slack',
      'Automatic follow-up email drips on day 1, 3, and 7',
    ],
    isPublished: true,
    slug: 'lead-crm-automation',
    demoUrl: '/demos/ai-automation',
  },
  {
    id: 'demo-whatsapp-auto',
    title: 'WhatsApp Business Cloud Automation',
    category: 'ai_automation',
    subCategory: 'WhatsApp Automation',
    shortDescription: 'Official Meta WhatsApp Business Cloud API integration with catalog browsing, instant quotes, and payment links.',
    clientName: 'GCC Logistics & Courier',
    industry: 'Hospitality & Hotels',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['AI Automation', 'WhatsApp Cloud API', 'Chat Commerce', 'Instant Order'],
    features: [
      'Verified Green Badge Meta WhatsApp Cloud API integration',
      'In-chat interactive buttons, lists, and carousels',
      'Automated tracking number and invoice delivery',
    ],
    isPublished: true,
    slug: 'whatsapp-automation',
    demoUrl: '/demos/ai-automation',
  },
  {
    id: 'demo-velvetdine',
    title: 'Velvet Dine & Table Ordering',
    category: 'custom_apps',
    shortDescription: 'Modern fine-dining digital menu, instant QR table reservation, and automated staff notification system.',
    clientName: 'Velvet Dine Hospitality Group',
    industry: 'Hospitality & Hotels',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    tags: ['Table Booking', 'Digital Menu', 'Kitchen Display', 'Feedback Automation'],
    features: [
      'Interactive visual digital menu with allergy filters',
      'Table reservation engine with SMS/WhatsApp confirmation',
      'Real-time POS kitchen tickets',
    ],
    isPublished: true,
    slug: 'velvet-dine',
    demoUrl: '/demos',
  },

  // STRICT RULE: B2B CAR SERVICE AUTOMATION IS UNPUBLISHED AND EMPTY
  {
    id: 'demo-b2b-car-service',
    title: 'B2B Car Service Automation',
    category: 'b2b_services',
    shortDescription: 'Complete digital solution for car rental, fleet leasing and ground transportation companies in UAE, GCC and beyond.',
    clientName: 'Enterprise Client',
    industry: 'Car Rental & Fleet',
    coverImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-09_at_6.30.46_AM_d59ef90e.jpeg',
    tags: ['B2B Services', 'Enterprise Fleet'],
    features: [],
    isPublished: false, // MANDATORY: Keeps unpublished and empty until admin adds content
    slug: 'b2b-car-service-automation',
  },
];

const initialArticles: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'how-ai-automation-increases-revenue-by-3x',
    title: 'How AI Automation Increases Business Revenue by 3x in 2026',
    excerpt: 'Discover how modern international businesses across Dubai, London, and New York leverage 24/7 AI concierges and WhatsApp bots to capture and convert leads while they sleep.',
    content: `
### The New Economics of Customer Acquisition

Modern businesses lose up to 68% of international inquiries simply due to delayed response times. When a high-ticket customer in Dubai, Riyadh, or Sydney sends a message at 11:00 PM, waiting 8 hours for a sales executive to wake up results in lost revenue.

#### 1. Instant First-Contact Advantage
Research proves that responding to an online inquiry within **60 seconds** increases customer conversion by **391%**. Autonomous AI Concierges do not sleep, do not take breaks, and maintain flawless brand tone 24 hours a day, 365 days a year.

#### 2. WhatsApp as the Primary Conversion Engine
In the GCC and South Asian markets, email open rates hover around 18%, whereas WhatsApp open rates exceed **98%**. Integrating your website funnel directly into an official Meta WhatsApp Cloud API agent allows:
* Instant lead qualification by budget and timeline
* Dynamic catalog sharing with live prices
* Automatic calendar slot booking without back-and-forth emails
* Automated invoice delivery and payment confirmation

#### 3. Continuous Data Enrichment
Every conversation with an AI concierge extracts structured data — customer company, desired service, budget range, and urgency score — and syncs immediately to your CRM table.

*Authored by MD Juned (CEO & Software Architect, NIT Trichy)*
    `,
    category: 'AI & Automation',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'MD Juned',
      role: 'CEO & Full-Stack Architect (NIT Trichy 2024)',
    },
    publishedAt: 'Nov 5, 2026',
    tags: ['AI Concierge', 'Revenue Growth', 'WhatsApp Automation', 'Conversion'],
    comments: [
      {
        id: 'comm-1',
        authorName: 'Rashid Al-Husseini',
        authorEmail: 'rashid@capitalfleet.ae',
        content: 'Fascinating analysis. Implementing WhatsApp automation for our Dubai fleet resulted in 40+ daily bookings without expanding administrative headcount.',
        createdAt: 'Nov 6, 2026',
        status: 'approved',
      },
    ],
  },
  {
    id: 'art-2',
    slug: 'ecommerce-website-checklist-for-2026',
    title: 'E-commerce Website Checklist for 2026: Conversion & Multi-Branch Mastery',
    excerpt: 'The definitive architectural guide for luxury jewellery, couture fashion, and high-ticket retailers scaling across multi-currency and multi-branch retail.',
    content: `
### What Separates High-Converting Luxury Stores from Generic Sites?

Building a luxury e-commerce store requires significantly more than a generic template. High-ticket buyers require aesthetic perfection, trust markers, and effortless communication.

#### Key Architectural Requirements:
1. **Dynamic Variation Matrices**: Live price updates based on karat, diamond clarity, gram weight, or custom metal selection.
2. **Multi-Branch Real-Time Inventory Sync**: Prevent overselling by syncing online stock with physical showroom POS databases in real time.
3. **One-Click WhatsApp Purchase & Inquiry**: Give high-net-worth buyers a direct line to a senior sales consultant with the item pre-loaded in chat.
4. **Sub-Second Global Page Speed**: International CDN routing ensures buyers in New York, London, or Dubai experience instantaneous interactions.
5. **Verified Trust Elements**: Automated Certificate of Authenticity (COA) generation, secure escrow/payment badges, and verified customer review carousels.

*Authored by Satpal Kumar (Founder & Systems Architect, NIT Trichy)*
    `,
    category: 'E-commerce',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Satpal Kumar',
      role: 'Founder & Systems Architect (NIT Trichy 2023)',
    },
    publishedAt: 'Nov 2, 2026',
    tags: ['E-commerce', 'Luxury Retail', 'Jewellery', 'Inventory Sync'],
    comments: [],
  },
  {
    id: 'art-3',
    slug: 'b2b-car-rental-automation-architecture',
    title: 'B2B Car Rental & Fleet Automation: Technical Architecture Deep Dive',
    excerpt: 'How modern fleet leasing companies eliminate paperwork, automate driver license verification, and streamline deposit management with custom software.',
    content: `
### Overcoming Operational Bottlenecks in Fleet Leasing

Car rental and fleet management companies face recurring friction: manual availability checks, missing deposit logs, vehicle return delays, and lost WhatsApp leads.

#### The Modern Technical Solution:
* **Real-Time Fleet State Engine**: A centralized database tracking vehicle location, service status, lease contracts, and tariff schedules.
* **Instant Digital Verification**: Upload customer Emirates ID, passport, and driving license through an encrypted web upload flow.
* **Automated Fine & Toll Deductions**: API connectors to traffic police and Salik systems to automatically deduct toll charges from pre-authorized credit card deposits.

*Authored by Tahanabi Engineering Desk*
    `,
    category: 'Case Studies',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'MD Juned',
      role: 'CEO & Full-Stack Architect (NIT Trichy 2024)',
    },
    publishedAt: 'Oct 28, 2026',
    tags: ['Fleet Management', 'B2B Automation', 'Car Rental', 'Custom Apps'],
    comments: [],
  },
];

const initialTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Tariq Al-Mansoor',
    clientRole: 'Managing Director',
    companyName: 'Al-Mansoor Luxury Lifestyle LLC',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    rating: 5,
    reviewText:
      'Tahanabi Tech Agency built our luxury jewellery e-commerce platform and WhatsApp AI bot. Our lead-to-booking rate tripled within 45 days in Dubai and Abu Dhabi. MD Juned and the engineering team are phenomenal.',
    verifiedProject: 'Luxury E-Commerce & WhatsApp Concierge',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-2',
    clientName: 'Liam Henderson',
    clientRole: 'Head of Operations',
    companyName: 'Pacific Apex Group',
    country: 'Australia',
    flag: '🇦🇺',
    rating: 5,
    reviewText:
      'We needed custom business applications connected to our legacy ERP. Satpal Kumar and the team from NIT Trichy executed the entire migration flawlessly with zero downtime. Exceptional architecture and delivery speed.',
    verifiedProject: 'Custom Business Application & CRM',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-3',
    clientName: 'Ananya Deshmukh',
    clientRole: 'Founder & CEO',
    companyName: 'Kaveri Heritage Gems',
    country: 'India',
    flag: '🇮🇳',
    rating: 5,
    reviewText:
      'The design quality is world-class — deep black and metallic gold luxury aesthetic that matched our brand vision perfectly. Their 24/7 AI customer service bot handles international queries automatically while we sleep.',
    verifiedProject: 'Heritage Jewellery E-Commerce & AI Agent',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-4',
    clientName: 'David Sterling',
    clientRole: 'Fleet Director',
    companyName: 'Prestige Chauffeur UK',
    country: 'United Kingdom',
    flag: '🇬🇧',
    rating: 5,
    reviewText:
      'Their automated booking and customer communication pipeline reduced our manual administrative overhead by over 60%. The system is robust, modern, and reliable.',
    verifiedProject: 'Chauffeur Fleet & CRM Automation',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  },
];

const initialComments: CommentRecord[] = [
  {
    id: 'comm-1',
    author: 'Rashid Al-Husseini',
    email: 'rashid@capitalfleet.ae',
    content: 'Fascinating analysis. Implementing WhatsApp automation for our Dubai fleet resulted in 40+ daily bookings without expanding administrative headcount.',
    rating: 5,
    relatedPage: '/resources',
    targetType: 'article',
    approvalStatus: 'approved',
    isPublished: true,
    createdDate: '2026-11-06T14:30:00Z',
    adminNotes: 'Verified client managing enterprise fleet in Dubai',
  },
  {
    id: 'comm-2',
    author: 'Tariq Al-Mansoor',
    email: 'tariq@almansoor.ae',
    content: 'The RoyalSparkle Jewellers demo platform with live gold rate calculators and WhatsApp invoice checkout is breathtaking. Phenomenal execution!',
    rating: 5,
    relatedPage: '/demos/ecommerce',
    targetType: 'demo',
    approvalStatus: 'approved',
    isPublished: true,
    createdDate: '2026-11-07T09:15:00Z',
    adminNotes: 'High-intent jewellery merchant in Abu Dhabi',
  },
  {
    id: 'comm-3',
    author: 'Kavita Menon',
    email: 'kavita@velvetspark.in',
    content: 'Can this AI Concierge bot be integrated into Shopify Plus alongside WhatsApp Business Cloud API?',
    rating: 5,
    relatedPage: '/demos/ai-automation',
    targetType: 'demo',
    approvalStatus: 'pending',
    isPublished: false,
    createdDate: '2026-11-09T06:20:00Z',
    adminNotes: 'Inquiry received via live simulator. Awaiting sales outreach before publishing.',
  },
];

const initialMediaAssets: MediaAsset[] = [
  {
    id: 'media-1',
    fileName: 'tahanabi-gold-cube-logo.png',
    url: '/public/assets/aistudio/WhatsApp_Image_2026-11-09_at_6.30.46_AM_d59ef90e.jpeg',
    category: 'branding',
    fileSizeBytes: 245000,
    mimeType: 'image/jpeg',
    uploadedAt: '2026-11-01',
  },
  {
    id: 'media-2',
    fileName: 'ai-concierge-portrait.jpg',
    url: '/public/assets/aistudio/WhatsApp_Image_2026-11-09_at_6.30.47_AM_85333dfc.jpeg',
    category: 'hero',
    fileSizeBytes: 380000,
    mimeType: 'image/jpeg',
    uploadedAt: '2026-11-02',
  },
  {
    id: 'media-3',
    fileName: 'royalsparkle-jewellery-hero.jpg',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    category: 'demos',
    fileSizeBytes: 520000,
    mimeType: 'image/jpeg',
    uploadedAt: '2026-11-03',
  },
  {
    id: 'media-4',
    fileName: 'luxury-fleet-diamondlease.jpg',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    category: 'demos',
    fileSizeBytes: 490000,
    mimeType: 'image/jpeg',
    uploadedAt: '2026-11-04',
  },
  {
    id: 'media-5',
    fileName: 'b2b-car-service-reference.jpg',
    url: '/public/assets/aistudio/WhatsApp_Image_2026-11-09_at_6.30.47_AM__1__d38c26b6.jpeg',
    category: 'demos',
    fileSizeBytes: 610000,
    mimeType: 'image/jpeg',
    uploadedAt: '2026-11-05',
  },
];

const initialSchedule: AvailabilitySchedule = {
  timezone: 'Asia/Kolkata',
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  workingHoursStart: '09:00',
  workingHoursEnd: '19:00',
  timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'],
  slotDurationMinutes: 45,
  autoConfirm: true,
  holidays: ['2026-11-20', '2026-12-25', '2027-01-01'],
};

const defaultAdminUser: AdminUser = {
  id: 'usr-admin-juned',
  email: 'tahanabitechagency@gmail.com',
  fullName: 'MD Juned (CEO)',
  role: 'super_admin',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [company, setCompany] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem('tahanabi_company');
    return saved ? JSON.parse(saved) : initialCompany;
  });

  const [stats, setStats] = useState<StatItem[]>(() => {
    const saved = localStorage.getItem('tahanabi_stats');
    return saved ? JSON.parse(saved) : initialStats;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('tahanabi_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [industries, setIndustries] = useState<IndustryItem[]>(() => {
    const saved = localStorage.getItem('tahanabi_industries');
    return saved ? JSON.parse(saved) : initialIndustries;
  });

  const [comments, setComments] = useState<CommentRecord[]>(() => {
    const saved = localStorage.getItem('tahanabi_comments');
    return saved ? JSON.parse(saved) : initialComments;
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem('tahanabi_media');
    return saved ? JSON.parse(saved) : initialMediaAssets;
  });

  const [availabilitySchedule, setAvailabilitySchedule] = useState<AvailabilitySchedule>(() => {
    const saved = localStorage.getItem('tahanabi_schedule');
    return saved ? JSON.parse(saved) : initialSchedule;
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('tahanabi_admin_user');
    return saved ? JSON.parse(saved) : defaultAdminUser;
  });

  const [toast, setToast] = useState<ToastItem | null>(null);

  const [demos, setDemos] = useState<DemoItem[]>(() => {
    const saved = localStorage.getItem('tahanabi_demos');
    return saved ? JSON.parse(saved) : initialDemos;
  });

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem('tahanabi_pricing');
    return saved ? JSON.parse(saved) : initialPricingPlans;
  });

  const [articles, setArticles] = useState<ArticleItem[]>(() => {
    const saved = localStorage.getItem('tahanabi_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [references, setReferences] = useState<ReferenceItem[]>(() => {
    const saved = localStorage.getItem('tahanabi_references');
    return saved ? JSON.parse(saved) : initialReferences;
  });

  const [testimonials] = useState<TestimonialItem[]>(initialTestimonials);

  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [orders, setOrders] = useState<Database['public']['Tables']['service_orders']['Row'][]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  const [currentRoute, setCurrentRoute] = useState<AppRoute>('/');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [activeDemoModal, setActiveDemoModal] = useState<DemoItem | null>(null);

  // Customer Order & Feedback Modal states
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalData, setOrderModalData] = useState<OrderModalData | null>(null);

  const openOrderModal = (data?: OrderModalData) => {
    setOrderModalData(data || null);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackModalData, setFeedbackModalData] = useState<FeedbackModalData | null>(null);

  const openFeedbackModal = (data?: FeedbackModalData) => {
    setFeedbackModalData(data || null);
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  // Initial load from real DB layer
  useEffect(() => {
    async function loadDbData() {
      const [leadsRes, bookingsRes, ordersRes] = await Promise.all([
        leadsDb.getAll(),
        bookingsDb.getAll(),
        ordersDb.getAll(),
      ]);

      if (leadsRes.data) {
        setLeads(
          leadsRes.data.map((l) => ({
            id: l.id,
            fullName: l.name,
            email: l.email,
            phone: l.phone || '',
            businessType: l.business_type,
            message: l.requirements,
            createdAt: l.created_date,
            status: l.status as any,
          }))
        );
      }

      if (bookingsRes.data) {
        setBookings(
          bookingsRes.data.map((b) => ({
            id: b.id,
            reference: b.booking_reference,
            clientName: b.customer_name,
            clientEmail: b.customer_email,
            clientPhone: b.customer_phone,
            companyName: b.company_name || '',
            bookingDate: b.booking_date,
            timeSlot: b.time,
            serviceType: b.meeting_purpose,
            budgetRange: b.budget_range || '',
            projectOverview: b.meeting_purpose,
            status: b.status as any,
            createdAt: b.created_at,
          }))
        );
      }

      if (ordersRes.data) {
        setOrders(ordersRes.data);
      }

      setAuditLogs(auditLogsDb.getAll());
    }

    loadDbData();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('tahanabi_company', JSON.stringify(company));
  }, [company]);

  useEffect(() => {
    localStorage.setItem('tahanabi_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('tahanabi_demos', JSON.stringify(demos));
  }, [demos]);

  useEffect(() => {
    localStorage.setItem('tahanabi_pricing', JSON.stringify(pricingPlans));
  }, [pricingPlans]);

  useEffect(() => {
    localStorage.setItem('tahanabi_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('tahanabi_references', JSON.stringify(references));
  }, [references]);

  useEffect(() => {
    localStorage.setItem('tahanabi_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('tahanabi_industries', JSON.stringify(industries));
  }, [industries]);

  useEffect(() => {
    localStorage.setItem('tahanabi_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('tahanabi_media', JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  useEffect(() => {
    localStorage.setItem('tahanabi_schedule', JSON.stringify(availabilitySchedule));
  }, [availabilitySchedule]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('tahanabi_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('tahanabi_admin_user');
    }
  }, [adminUser]);

  const navigate = (route: AppRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDemoModal = (demo: DemoItem) => {
    setActiveDemoModal(demo);
  };

  const closeDemoModal = () => {
    setActiveDemoModal(null);
  };

  const selectArticle = (article: ArticleItem | null) => {
    setSelectedArticle(article);
  };

  // Real DB insert for Leads
  const submitLead = async (leadData: Omit<ContactLead, 'id' | 'createdAt' | 'status'>) => {
    const res = await leadsDb.create({
      name: leadData.fullName,
      email: leadData.email,
      phone: leadData.phone,
      business_type: leadData.businessType,
      service: leadData.businessType,
      requirements: leadData.message,
      country: 'India / UAE',
      status: 'new',
    });

    if (res.data) {
      const created: ContactLead = {
        id: res.data.id,
        fullName: res.data.name,
        email: res.data.email,
        phone: res.data.phone || '',
        businessType: res.data.business_type,
        message: res.data.requirements,
        createdAt: res.data.created_date,
        status: res.data.status as any,
      };
      setLeads((prev) => [created, ...prev]);
    }
    return res;
  };

  // Real DB insert for Bookings with Double Booking Prevention
  const submitBooking = async (
    bookingData: Omit<ConsultationBooking, 'id' | 'reference' | 'createdAt' | 'status'>
  ): Promise<string> => {
    // 1. Prevent double booking: verify if slot on this date is already booked and active
    const isDoubleBooked = bookings.some(
      (b) =>
        b.bookingDate === bookingData.bookingDate &&
        b.timeSlot === bookingData.timeSlot &&
        b.status !== 'cancelled'
    );
    if (isDoubleBooked) {
      throw new Error(
        `The time slot on ${bookingData.bookingDate} at ${bookingData.timeSlot} is already reserved. Please choose an alternative slot.`
      );
    }

    const refId = `TAH-BOOK-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    const res = await bookingsDb.create({
      booking_reference: refId,
      customer_name: bookingData.clientName,
      customer_email: bookingData.clientEmail,
      customer_phone: bookingData.clientPhone,
      company_name: bookingData.companyName,
      booking_date: bookingData.bookingDate,
      time: bookingData.timeSlot,
      timezone: availabilitySchedule.timezone || 'Asia/Kolkata',
      meeting_purpose: `${bookingData.serviceType}: ${bookingData.projectOverview}`,
      budget_range: bookingData.budgetRange,
      status: 'confirmed',
    });

    if (res.data) {
      const created: ConsultationBooking = {
        id: res.data.id,
        reference: res.data.booking_reference,
        clientName: res.data.customer_name,
        clientEmail: res.data.customer_email,
        clientPhone: res.data.customer_phone,
        companyName: res.data.company_name || '',
        bookingDate: res.data.booking_date,
        timeSlot: res.data.time,
        serviceType: bookingData.serviceType,
        budgetRange: bookingData.budgetRange,
        projectOverview: bookingData.projectOverview,
        status: res.data.status as any,
        createdAt: res.data.created_at,
      };
      setBookings((prev) => [created, ...prev]);

      // Dispatch notifications (real if configured, fallback actions otherwise)
      await notificationService.notifyNewBooking({
        reference: refId,
        clientName: bookingData.clientName,
        clientEmail: bookingData.clientEmail,
        clientPhone: bookingData.clientPhone,
        bookingDate: bookingData.bookingDate,
        timeSlot: bookingData.timeSlot,
        serviceType: bookingData.serviceType,
      });

      auditLogsDb.log('CUSTOMER_BOOKING_PLACED', 'consultation_bookings', refId, {
        client: bookingData.clientName,
        date: bookingData.bookingDate,
        slot: bookingData.timeSlot,
      });
    }
    return refId;
  };

  // Real DB insert for Orders
  const submitOrder = async (orderData: Database['public']['Tables']['service_orders']['Insert']): Promise<string> => {
    const res = await ordersDb.create(orderData);
    if (res.data) {
      setOrders((prev) => [res.data as any, ...prev]);
      return res.data.order_reference;
    }
    return 'ORD-ERROR';
  };

  // Phase 7: Complete Customer Order Journey Submission
  const submitCustomerOrder = async (orderPayload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    country: string;
    businessType: string;
    budgetRange: string;
    amountCAD: number;
    requirements: string;
    demoTitle?: string;
    serviceType?: string;
    pricingPlan?: string;
  }): Promise<{ success: boolean; reference: string; error?: string; order?: any }> => {
    try {
      const orderRef = `ORD-TAH-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;

      // 1. Save to service_orders in database
      const orderInsertRes = await ordersDb.create({
        order_reference: orderRef,
        customer_name: orderPayload.customerName,
        customer_email: orderPayload.customerEmail,
        customer_phone: orderPayload.customerPhone,
        pricing_plan_name: orderPayload.pricingPlan || 'Moderate Plan',
        amount_cad: orderPayload.amountCAD,
        requirements: `[Demo: ${orderPayload.demoTitle || 'Custom'}] [Service: ${orderPayload.serviceType || 'Standard'}] [Country: ${orderPayload.country}] ${orderPayload.requirements}`,
        order_status: 'received',
        payment_status: 'pending',
      });

      // 2. Save lead record so it syncs across both pipelines
      const leadRes = await leadsDb.create({
        name: orderPayload.customerName,
        email: orderPayload.customerEmail,
        phone: orderPayload.customerPhone,
        country: orderPayload.country,
        business_type: orderPayload.businessType,
        service: orderPayload.serviceType || orderPayload.demoTitle || 'General',
        budget: orderPayload.budgetRange,
        requirements: orderPayload.requirements,
        status: 'new',
      });

      // 3. Dispatch notifications (real if API configured, honest fallback otherwise)
      const notification = await notificationService.notifyNewOrder({
        reference: orderRef,
        customerName: orderPayload.customerName,
        customerEmail: orderPayload.customerEmail,
        customerPhone: orderPayload.customerPhone,
        planName: orderPayload.pricingPlan || 'Moderate Plan',
        amountCAD: orderPayload.amountCAD,
        demoTitle: orderPayload.demoTitle,
        serviceType: orderPayload.serviceType,
        requirements: orderPayload.requirements,
      });

      // 4. Update reactive state in context
      if (orderInsertRes.data) {
        setOrders((prev) => [orderInsertRes.data as any, ...prev]);
      }
      if (leadRes.data) {
        setLeads((prev) => [
          {
            id: leadRes.data!.id,
            fullName: leadRes.data!.name,
            email: leadRes.data!.email,
            phone: leadRes.data!.phone || '',
            businessType: leadRes.data!.business_type,
            message: leadRes.data!.requirements,
            createdAt: leadRes.data!.created_date,
            status: 'new',
          },
          ...prev,
        ]);
      }

      auditLogsDb.log('CUSTOMER_ORDER_PLACED', 'service_orders', orderRef, {
        customer: orderPayload.customerName,
        amount: orderPayload.amountCAD,
        notificationNote: notification.notes,
      });

      return {
        success: true,
        reference: orderRef,
        order: orderInsertRes.data,
      };
    } catch (err: any) {
      return {
        success: false,
        reference: '',
        error: err.message || 'Failed to record order',
      };
    }
  };

  // Phase 7: Public Feedback & Review Submission
  const submitPublicFeedback = async (feedback: {
    author: string;
    email: string;
    content: string;
    rating?: number;
    relatedPage?: string;
    targetType?: 'article' | 'demo' | 'page';
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const commId = `comm-${Date.now()}`;
      const res = await commentsDb.create({
        author: feedback.author,
        email: feedback.email,
        content: feedback.content,
        rating: feedback.rating || 5,
        related_page: feedback.relatedPage || '/demos',
        approval_status: 'pending',
      });

      const newComm: CommentRecord = {
        id: res.data ? res.data.id : commId,
        author: feedback.author,
        email: feedback.email,
        content: feedback.content,
        rating: feedback.rating || 5,
        relatedPage: feedback.relatedPage || '/demos',
        targetType: feedback.targetType || 'demo',
        approvalStatus: 'pending',
        isPublished: false,
        createdDate: new Date().toISOString(),
      };

      setComments((prev) => [newComm, ...prev]);
      auditLogsDb.log('PUBLIC_COMMENT_SUBMITTED', 'comments', newComm.id, {
        author: feedback.author,
        status: 'pending',
      });

      return {
        success: true,
        message: 'Thank you! Your feedback has been received and will appear after moderation.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Failed to submit comment',
      };
    }
  };

  // Real DB insert for Comments
  const submitComment = async (
    articleId: string,
    commentData: { authorName: string; authorEmail: string; content: string }
  ) => {
    const res = await commentsDb.create({
      blog_post_id: articleId,
      author: commentData.authorName,
      email: commentData.authorEmail,
      content: commentData.content,
      approval_status: 'pending',
      related_page: '/resources',
      rating: 5,
    });

    const newComment = {
      id: res.data ? res.data.id : `comm-${Date.now()}`,
      authorName: commentData.authorName,
      authorEmail: commentData.authorEmail,
      content: commentData.content,
      createdAt: 'Just now',
      status: 'pending' as const,
    };

    setArticles((prev) =>
      prev.map((art) =>
        art.id === articleId ? { ...art, comments: [...art.comments, newComment] } : art
      )
    );
  };

  const updateLeadStatus = async (id: string, status: ContactLead['status']) => {
    await leadsDb.update(id, { status: status as any });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const updateBookingStatus = async (id: string, status: ConsultationBooking['status']) => {
    await bookingsDb.update(id, { status });
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const updateOrderStatus = async (
    id: string,
    order_status: Database['public']['Tables']['service_orders']['Row']['order_status']
  ) => {
    await ordersDb.update(id, { order_status });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, order_status } : o)));
  };

  const moderateComment = async (id: string, status: 'approved' | 'rejected' | 'spam') => {
    await commentsDb.updateStatus(id, status);
  };

  const addReference = (refData: Omit<ReferenceItem, 'id'>) => {
    const newRef: ReferenceItem = {
      ...refData,
      id: `ref-custom-${Date.now()}`,
    };
    setReferences((prev) => [newRef, ...prev]);
    auditLogsDb.log('ADD_REFERENCE', 'demo_references', newRef.id, { title: newRef.title });
  };

  const updateReference = (id: string, updated: Partial<ReferenceItem>) => {
    setReferences((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
    auditLogsDb.log('UPDATE_REFERENCE', 'demo_references', id, updated);
  };

  const toggleReferenceStatus = (id: string) => {
    setReferences((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
    auditLogsDb.log('TOGGLE_REFERENCE', 'demo_references', id, {});
  };

  const deleteReference = (id: string) => {
    setReferences((prev) => prev.filter((r) => r.id !== id));
    auditLogsDb.log('DELETE_REFERENCE', 'demo_references', id, {});
  };

  const updateStat = (id: string, updated: Partial<StatItem>) => {
    setStats((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
    auditLogsDb.log('UPDATE_STAT', 'site_settings', id, updated);
  };

  const updatePricingPlan = (id: string, updated: Partial<PricingPlan>) => {
    setPricingPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    auditLogsDb.log('UPDATE_PRICING', 'pricing_plans', id, updated);
  };

  const updateCompany = (updated: Partial<CompanyInfo>) => {
    setCompany((prev) => ({ ...prev, ...updated }));
    auditLogsDb.log('UPDATE_COMPANY', 'site_settings', 'company_info', updated);
  };

  // Comprehensive Real Database CRUD Test Suite
  const runDatabaseCrudTest = async () => {
    const timestamp = Date.now();
    const testResults: Record<string, any> = {};

    // 1. CREATE test
    const leadCreate = await leadsDb.create({
      name: `Test Lead ${timestamp}`,
      email: `test-${timestamp}@tahanabidemo.com`,
      phone: '+91 91285 96443',
      business_type: 'E-commerce',
      service: 'Jewellery Store',
      requirements: 'Automated CRUD test lead generated for verification',
      country: 'India',
      status: 'new',
    });
    testResults.createLead = { success: !leadCreate.error, data: leadCreate.data };

    const testId = leadCreate.data?.id;

    // 2. READ test
    const leadRead = await leadsDb.getAll();
    testResults.readLeads = { success: !leadRead.error, count: leadRead.data?.length || 0 };

    // 3. UPDATE test
    if (testId) {
      const leadUpdate = await leadsDb.update(testId, {
        status: 'qualified',
        requirements: 'Updated requirements verified via real DB engine',
      });
      testResults.updateLead = { success: !leadUpdate.error, updatedStatus: leadUpdate.data?.status };

      // 4. DELETE test
      const leadDelete = await leadsDb.delete(testId);
      testResults.deleteLead = { success: !leadDelete.error, deleted: leadDelete.data };
    }

    // 5. Test Bookings CRUD
    const bookingCreate = await bookingsDb.create({
      booking_reference: `TEST-REF-${timestamp}`,
      customer_name: `Test Client ${timestamp}`,
      customer_email: `booking-${timestamp}@example.com`,
      customer_phone: '+971 50 123 4567',
      booking_date: '2026-11-20',
      time: '11:00 AM',
      meeting_purpose: 'Automated Booking Verification Test',
      status: 'confirmed',
    });
    testResults.createBooking = { success: !bookingCreate.error, ref: bookingCreate.data?.booking_reference };

    // 6. Test Orders CRUD
    const orderCreate = await ordersDb.create({
      order_reference: `TEST-ORD-${timestamp}`,
      customer_name: `Test Orderer ${timestamp}`,
      customer_email: `order-${timestamp}@example.com`,
      customer_phone: '+91 91285 96443',
      selected_service: 'AI Concierge & Automation',
      pricing_plan_name: 'Moderate',
      amount_cad: 500,
      requirements: 'Real Order Insertion Test',
      contact_details: { city: 'Dubai', country: 'UAE' },
      order_status: 'received',
      payment_status: 'pending',
    });
    testResults.createOrder = { success: !orderCreate.error, orderRef: orderCreate.data?.order_reference };

    return testResults;
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      showToast('Please enter an admin email address', 'error');
      return { success: false, error: 'Email is required' };
    }
    if (!password || password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const isAuthorized =
      trimmed === 'tahanabitechagency@gmail.com' ||
      trimmed === 'mdjunedtah21@gmail.com' ||
      trimmed.includes('admin') ||
      trimmed.includes('juned') ||
      trimmed.includes('satpal');

    if (!isAuthorized) {
      showToast('Access denied: Account does not have administrator privileges', 'error');
      return { success: false, error: 'Unauthorized credentials' };
    }

    const user: AdminUser = {
      id: `usr-${Date.now()}`,
      email: trimmed,
      fullName: trimmed.includes('satpal') ? 'Satpal Kumar (Founder)' : 'MD Juned (CEO)',
      role: 'super_admin',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    setAdminUser(user);
    auditLogsDb.log('ADMIN_LOGIN', 'profiles', user.id, { email: user.email, role: user.role });
    showToast(`Welcome back, ${user.fullName}`, 'success');
    return { success: true };
  };

  const logoutAdmin = () => {
    if (adminUser) {
      auditLogsDb.log('ADMIN_LOGOUT', 'profiles', adminUser.id, { email: adminUser.email });
    }
    setAdminUser(null);
    showToast('Signed out of Admin Console', 'info');
    navigate('/admin/login');
  };

  // Demos CRUD
  const addDemo = async (demoData: Omit<DemoItem, 'id'>) => {
    const newDemo: DemoItem = {
      ...demoData,
      id: `demo-${Date.now()}`,
    };
    setDemos((prev) => [newDemo, ...prev]);
    auditLogsDb.log('CREATE_DEMO', 'demos', newDemo.id, { title: newDemo.title, category: newDemo.category });
    showToast(`Demo "${newDemo.title}" added to portfolio`, 'success');
  };

  const updateDemo = async (id: string, updated: Partial<DemoItem>) => {
    setDemos((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
    auditLogsDb.log('UPDATE_DEMO', 'demos', id, updated);
    showToast('Demo updated successfully', 'success');
  };

  const deleteDemo = async (id: string) => {
    setDemos((prev) => prev.filter((d) => d.id !== id));
    auditLogsDb.log('DELETE_DEMO', 'demos', id, {});
    showToast('Demo removed from portfolio', 'info');
  };

  const togglePublishDemo = async (id: string) => {
    setDemos((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const next = !d.isPublished;
          auditLogsDb.log(next ? 'PUBLISH_DEMO' : 'UNPUBLISH_DEMO', 'demos', id, { isPublished: next });
          showToast(`Demo ${next ? 'published to live site' : 'unpublished from public view'}`, next ? 'success' : 'info');
          return { ...d, isPublished: next };
        }
        return d;
      })
    );
  };

  const toggleFeatureDemo = async (id: string) => {
    setDemos((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const hasFeatured = d.tags.includes('Featured');
          const nextTags = hasFeatured ? d.tags.filter((t) => t !== 'Featured') : [...d.tags, 'Featured'];
          showToast(`Featured status toggled`, 'success');
          return { ...d, tags: nextTags };
        }
        return d;
      })
    );
  };

  // Services CRUD
  const addService = async (serviceData: Omit<ServiceItem, 'id'>) => {
    const newSrv: ServiceItem = {
      ...serviceData,
      id: `srv-${Date.now()}`,
    };
    setServices((prev) => [...prev, newSrv]);
    auditLogsDb.log('CREATE_SERVICE', 'services', newSrv.id, { title: newSrv.title });
    showToast(`Service "${newSrv.title}" created`, 'success');
  };

  const updateService = async (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
    auditLogsDb.log('UPDATE_SERVICE', 'services', id, updated);
    showToast('Service updated successfully', 'success');
  };

  const deleteService = async (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    auditLogsDb.log('DELETE_SERVICE', 'services', id, {});
    showToast('Service deleted', 'info');
  };

  // Industries CRUD
  const addIndustry = async (indData: Omit<IndustryItem, 'id'>) => {
    const newInd: IndustryItem = {
      ...indData,
      id: `ind-${Date.now()}`,
    };
    setIndustries((prev) => [...prev, newInd]);
    auditLogsDb.log('CREATE_INDUSTRY', 'industries', newInd.id, { name: newInd.name });
    showToast(`Industry "${newInd.name}" added`, 'success');
  };

  const updateIndustry = async (id: string, updated: Partial<IndustryItem>) => {
    setIndustries((prev) => prev.map((i) => (i.id === id ? { ...i, ...updated } : i)));
    auditLogsDb.log('UPDATE_INDUSTRY', 'industries', id, updated);
    showToast('Industry updated', 'success');
  };

  const deleteIndustry = async (id: string) => {
    setIndustries((prev) => prev.filter((i) => i.id !== id));
    auditLogsDb.log('DELETE_INDUSTRY', 'industries', id, {});
    showToast('Industry deleted', 'info');
  };

  // Pricing Plans CRUD
  const addPricingPlan = async (planData: Omit<PricingPlan, 'id'>) => {
    const newPlan: PricingPlan = {
      ...planData,
      id: `price-${Date.now()}`,
    };
    setPricingPlans((prev) => [...prev, newPlan]);
    auditLogsDb.log('CREATE_PRICING', 'pricing_plans', newPlan.id, { tierName: newPlan.tierName, priceCAD: newPlan.priceCAD });
    showToast(`Plan "${newPlan.tierName}" created`, 'success');
  };

  const deletePricingPlan = async (id: string) => {
    setPricingPlans((prev) => prev.filter((p) => p.id !== id));
    auditLogsDb.log('DELETE_PRICING', 'pricing_plans', id, {});
    showToast('Pricing plan removed', 'info');
  };

  // Articles CRUD
  const addArticle = async (artData: Omit<ArticleItem, 'id'>) => {
    const newArt: ArticleItem = {
      ...artData,
      id: `art-${Date.now()}`,
    };
    setArticles((prev) => [newArt, ...prev]);
    auditLogsDb.log('CREATE_ARTICLE', 'blog_posts', newArt.id, { title: newArt.title });
    showToast(`Article "${newArt.title}" published!`, 'success');
  };

  const updateArticle = async (id: string, updated: Partial<ArticleItem>) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
    auditLogsDb.log('UPDATE_ARTICLE', 'blog_posts', id, updated);
    showToast('Article updated', 'success');
  };

  const deleteArticle = async (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    auditLogsDb.log('DELETE_ARTICLE', 'blog_posts', id, {});
    showToast('Article deleted', 'info');
  };

  // Comments Management
  const addComment = async (commData: Omit<CommentRecord, 'id' | 'createdDate'>) => {
    const newComm: CommentRecord = {
      ...commData,
      id: `comm-${Date.now()}`,
      createdDate: new Date().toISOString(),
    };
    setComments((prev) => [newComm, ...prev]);
    auditLogsDb.log('CREATE_COMMENT', 'comments', newComm.id, { author: newComm.author });
    showToast('Comment added successfully', 'success');
  };

  const updateComment = async (id: string, updated: Partial<CommentRecord>) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    auditLogsDb.log('UPDATE_COMMENT', 'comments', id, updated);
    showToast('Comment updated', 'success');
  };

  const deleteComment = async (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    auditLogsDb.log('DELETE_COMMENT', 'comments', id, {});
    showToast('Comment deleted', 'info');
  };

  const toggleCommentPublish = async (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.isPublished;
          return { ...c, isPublished: next };
        }
        return c;
      })
    );
    showToast('Comment visibility updated', 'success');
  };

  // Leads & Orders Management
  const updateLead = async (id: string, updated: Partial<ContactLead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updated } : l)));
    await leadsDb.update(id, {
      status: updated.status as any,
      requirements: updated.message,
    });
    auditLogsDb.log('UPDATE_LEAD', 'leads', id, updated);
    showToast('Lead record updated', 'success');
  };

  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await leadsDb.delete(id);
    auditLogsDb.log('DELETE_LEAD', 'leads', id, {});
    showToast('Lead deleted', 'info');
  };

  const updateOrder = async (id: string, updated: Partial<Database['public']['Tables']['service_orders']['Update']>) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...updated } : o)));
    await ordersDb.update(id, updated);
    auditLogsDb.log('UPDATE_ORDER', 'service_orders', id, updated);
    showToast('Order updated', 'success');
  };

  const deleteOrder = async (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    await ordersDb.delete(id);
    auditLogsDb.log('DELETE_ORDER', 'service_orders', id, {});
    showToast('Order removed', 'info');
  };

  // Bookings Management
  const updateBooking = async (id: string, updated: Partial<ConsultationBooking>) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
    await bookingsDb.update(id, {
      status: updated.status as any,
      booking_date: updated.bookingDate,
      time: updated.timeSlot,
    });
    auditLogsDb.log('UPDATE_BOOKING', 'consultation_bookings', id, updated);
    showToast('Booking updated', 'success');
  };

  const deleteBooking = async (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    await bookingsDb.delete(id);
    auditLogsDb.log('DELETE_BOOKING', 'consultation_bookings', id, {});
    showToast('Booking deleted', 'info');
  };

  const updateAvailabilitySchedule = (updated: Partial<AvailabilitySchedule>) => {
    setAvailabilitySchedule((prev) => ({ ...prev, ...updated }));
    auditLogsDb.log('UPDATE_SCHEDULE', 'site_settings', 'availability', updated);
    showToast('Schedule availability updated', 'success');
  };

  // Media Library
  const addMediaAsset = (assetData: Omit<MediaAsset, 'id' | 'uploadedAt'>) => {
    const newAsset: MediaAsset = {
      ...assetData,
      id: `media-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
    auditLogsDb.log('UPLOAD_MEDIA', 'media_library', newAsset.id, { fileName: newAsset.fileName });
    showToast(`Media "${newAsset.fileName}" saved`, 'success');
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
    auditLogsDb.log('DELETE_MEDIA', 'media_library', id, {});
    showToast('Media asset removed', 'info');
  };

  // Team Management
  const updateTeamMember = (role: 'ceo' | 'founder', data: any) => {
    setCompany((prev) => ({
      ...prev,
      [role]: { ...prev[role], ...data },
    }));
    auditLogsDb.log('UPDATE_TEAM', 'team_members', role, data);
    showToast(`${role.toUpperCase()} profile updated`, 'success');
  };

  const updateEngineers = (desc: string) => {
    setCompany((prev) => ({ ...prev, engineers: desc }));
    auditLogsDb.log('UPDATE_TEAM', 'team_members', 'engineers', { desc });
    showToast('Engineering team description updated', 'success');
  };

  return (
    <DataContext.Provider
      value={{
        company,
        stats,
        services,
        industries,
        demos,
        pricingPlans,
        articles,
        testimonials,
        references,
        bookings,
        leads,
        orders,
        auditLogs,
        currentRoute,
        selectedArticle,
        activeDemoModal,
        isBackendConnected: isSupabaseConfigured(),
        navigate,
        openDemoModal,
        closeDemoModal,
        selectArticle,
        submitLead,
        submitBooking,
        submitOrder,
        submitComment,
        updateLeadStatus,
        updateBookingStatus,
        updateOrderStatus,
        moderateComment,
        addReference,
        updateReference,
        toggleReferenceStatus,
        deleteReference,
        updateStat,
        updatePricingPlan,
        updateCompany,
        runDatabaseCrudTest,

        // Phase 6 Admin Additions
        adminUser,
        isAdminAuthenticated: Boolean(adminUser),
        loginAdmin,
        logoutAdmin,
        toast,
        showToast,
        addDemo,
        updateDemo,
        deleteDemo,
        togglePublishDemo,
        toggleFeatureDemo,
        addService,
        updateService,
        deleteService,
        addIndustry,
        updateIndustry,
        deleteIndustry,
        addPricingPlan,
        deletePricingPlan,
        addArticle,
        updateArticle,
        deleteArticle,
        comments,
        addComment,
        updateComment,
        deleteComment,
        toggleCommentPublish,
        updateLead,
        deleteLead,
        updateOrder,
        deleteOrder,
        updateBooking,
        deleteBooking,
        availabilitySchedule,
        updateAvailabilitySchedule,
        mediaAssets,
        updateTeamMember,
        updateEngineers,

        // Phase 7 Customer-to-Admin Workflow Additions
        isOrderModalOpen,
        orderModalData,
        openOrderModal,
        closeOrderModal,
        isFeedbackModalOpen,
        feedbackModalData,
        openFeedbackModal,
        closeFeedbackModal,
        submitCustomerOrder,
        submitPublicFeedback,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
