export type AppRoute =
  | '/'
  | '/solutions'
  | '/industries'
  | '/demos'
  | '/pricing'
  | '/demos/ecommerce'
  | '/demos/ai-automation'
  | '/references'
  | '/about'
  | '/resources'
  | '/contact'
  | '/book-consultation'
  | '/admin/login'
  | '/admin/dashboard'
  | '/admin/database'
  | '/admin/demos'
  | '/admin/references'
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

export interface ReferenceItem {
  id: string;
  title: string;
  category:
    | 'jewellery'
    | 'fashion'
    | 'ecommerce'
    | 'real_estate'
    | 'tourism'
    | 'healthcare'
    | 'education'
    | 'ai_automation'
    | 'pricing'
    | 'about_us'
    | 'blog'
    | 'booking';
  categoryLabel: string;
  url: string;
  description: string;
  coverImage: string;
  tags: string[];
  keyDesignTakeaways: string[];
  isActive: boolean;
  displayOrder: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  idealFor: string;
  slug: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  iconName: string;
  slug: string;
  keyUseCases: string[];
  statsHeadline?: string;
}

export interface DemoItem {
  id: string;
  title: string;
  category: 'ecommerce' | 'ai_automation' | 'b2b_services' | 'custom_apps';
  subCategory?: string;
  shortDescription: string;
  longDescription?: string;
  clientName: string;
  industry: string;
  coverImage: string;
  tags: string[];
  features: string[];
  isPublished: boolean;
  demoUrl?: string;
  slug: string;
  metrics?: { label: string; value: string }[];
}

export interface PricingPlan {
  id: string;
  tierName: 'Basic' | 'Moderate' | 'Premium';
  tagline: string;
  priceCAD: number;
  priceNote: string;
  billingFrequency: 'one_time' | 'monthly' | 'custom';
  isPopular: boolean;
  features: string[];
  notIncluded?: string[];
  turnaroundTime: string;
  ctaText: string;
}

export interface ArticleComment {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'AI & Automation' | 'E-commerce' | 'Business Growth' | 'Case Studies';
  readTime: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  publishedAt: string;
  tags: string[];
  comments: ArticleComment[];
}

export interface ConsultationBooking {
  id: string;
  reference: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  bookingDate: string;
  timeSlot: string;
  serviceType: string;
  budgetRange: string;
  projectOverview: string;
  status: 'confirmed' | 'pending' | 'rescheduled' | 'completed' | 'cancelled';
  internalNotes?: string;
  createdAt: string;
}

export interface ContactLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
  internalNotes?: string;
}

export interface CommentRecord {
  id: string;
  author: string;
  email: string;
  content: string;
  rating: number;
  relatedPage: string;
  targetType: 'article' | 'demo' | 'page';
  approvalStatus: 'pending' | 'approved' | 'rejected' | 'spam';
  isPublished: boolean;
  createdDate: string;
  adminNotes?: string;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  url: string;
  category: 'branding' | 'demos' | 'hero' | 'team' | 'general';
  fileSizeBytes: number;
  mimeType: string;
  uploadedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'admin' | 'editor';
  avatarUrl?: string;
}

export interface AvailabilitySchedule {
  timezone: string;
  workingDays: string[];
  workingHoursStart?: string;
  workingHoursEnd?: string;
  timeSlots: string[];
  slotDurationMinutes: number;
  autoConfirm: boolean;
  holidays?: string[];
}

export interface OrderModalData {
  demoTitle?: string;
  serviceType?: string;
  industry?: string;
  pricingPlan?: string;
  budgetCAD?: number;
}

export interface FeedbackModalData {
  relatedPage?: string;
  targetType?: 'article' | 'demo' | 'page';
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  country: string;
  flag: string;
  rating: number;
  reviewText: string;
  verifiedProject: string;
  avatarUrl?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  description: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  headline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  ceo: {
    name: string;
    degree: string;
    institution: string;
    year: number;
    bio: string;
  };
  founder: {
    name: string;
    degree: string;
    institution: string;
    year: number;
    bio: string;
  };
  engineers: string;
}
