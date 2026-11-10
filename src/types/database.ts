export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role: 'super_admin' | 'admin' | 'editor';
          avatar_url: string | null;
          phone: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          role?: 'super_admin' | 'admin' | 'editor';
          avatar_url?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          role?: 'super_admin' | 'admin' | 'editor';
          avatar_url?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      site_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value: Json;
          description: string | null;
          updated_by: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          setting_key: string;
          setting_value: Json;
          description?: string | null;
          updated_by?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          setting_key?: string;
          setting_value?: Json;
          description?: string | null;
          updated_by?: string | null;
          updated_at?: string;
        };
      };

      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string;
          description: string;
          icon_name: string;
          features: string[];
          deliverables: string[];
          ideal_for: string;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle: string;
          description: string;
          icon_name: string;
          features?: string[];
          deliverables?: string[];
          ideal_for: string;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          subtitle?: string;
          description?: string;
          icon_name?: string;
          features?: string[];
          deliverables?: string[];
          ideal_for?: string;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      industries: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          image_url: string;
          icon_name: string;
          key_use_cases: string[];
          stats_headline: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description: string;
          image_url: string;
          icon_name: string;
          key_use_cases?: string[];
          stats_headline?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string;
          image_url?: string;
          icon_name?: string;
          key_use_cases?: string[];
          stats_headline?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
      };

      demos: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          category: 'ecommerce' | 'ai_automation' | 'b2b_services' | 'custom_apps';
          sub_category: string | null;
          industry: string;
          cover_image: string;
          preview_url: string | null;
          external_url: string | null;
          is_published: boolean;
          is_featured: boolean;
          sort_order: number;
          tags: string[];
          features: string[];
          metrics: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description: string;
          category: 'ecommerce' | 'ai_automation' | 'b2b_services' | 'custom_apps';
          sub_category?: string | null;
          industry: string;
          cover_image: string;
          preview_url?: string | null;
          external_url?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          sort_order?: number;
          tags?: string[];
          features?: string[];
          metrics?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          category?: 'ecommerce' | 'ai_automation' | 'b2b_services' | 'custom_apps';
          sub_category?: string | null;
          industry?: string;
          cover_image?: string;
          preview_url?: string | null;
          external_url?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          sort_order?: number;
          tags?: string[];
          features?: string[];
          metrics?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      demo_references: {
        Row: {
          id: string;
          title: string;
          category: string;
          category_label: string;
          url: string;
          description: string;
          cover_image: string;
          tags: string[];
          key_design_takeaways: string[];
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          category_label: string;
          url: string;
          description: string;
          cover_image: string;
          tags?: string[];
          key_design_takeaways?: string[];
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          category_label?: string;
          url?: string;
          description?: string;
          cover_image?: string;
          tags?: string[];
          key_design_takeaways?: string[];
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      pricing_plans: {
        Row: {
          id: string;
          tier_name: 'Basic' | 'Moderate' | 'Premium';
          tagline: string;
          price_cad: number;
          price_note: string;
          billing_frequency: 'one_time' | 'monthly' | 'custom';
          is_popular: boolean;
          turnaround_time: string;
          cta_text: string;
          features: string[];
          not_included: string[];
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tier_name: 'Basic' | 'Moderate' | 'Premium';
          tagline: string;
          price_cad: number;
          price_note: string;
          billing_frequency?: 'one_time' | 'monthly' | 'custom';
          is_popular?: boolean;
          turnaround_time: string;
          cta_text?: string;
          features?: string[];
          not_included?: string[];
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tier_name?: 'Basic' | 'Moderate' | 'Premium';
          tagline?: string;
          price_cad?: number;
          price_note?: string;
          billing_frequency?: 'one_time' | 'monthly' | 'custom';
          is_popular?: boolean;
          turnaround_time?: string;
          cta_text?: string;
          features?: string[];
          not_included?: string[];
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          qualification: string;
          institution: string;
          graduation_year: number;
          bio: string;
          avatar_url: string | null;
          specializations: string[];
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          qualification: string;
          institution: string;
          graduation_year: number;
          bio: string;
          avatar_url?: string | null;
          specializations?: string[];
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          qualification?: string;
          institution?: string;
          graduation_year?: number;
          bio?: string;
          avatar_url?: string | null;
          specializations?: string[];
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };

      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          category: 'AI & Automation' | 'E-commerce' | 'Business Growth' | 'Case Studies';
          read_time: string;
          cover_image: string;
          author_name: string;
          author_role: string;
          tags: string[];
          is_published: boolean;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          category: 'AI & Automation' | 'E-commerce' | 'Business Growth' | 'Case Studies';
          read_time?: string;
          cover_image: string;
          author_name?: string;
          author_role?: string;
          tags?: string[];
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          category?: 'AI & Automation' | 'E-commerce' | 'Business Growth' | 'Case Studies';
          read_time?: string;
          cover_image?: string;
          author_name?: string;
          author_role?: string;
          tags?: string[];
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      comments: {
        Row: {
          id: string;
          blog_post_id: string | null;
          author: string;
          email: string;
          content: string;
          rating: number | null;
          related_page: string;
          approval_status: 'pending' | 'approved' | 'rejected' | 'spam';
          created_date: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          blog_post_id?: string | null;
          author: string;
          email: string;
          content: string;
          rating?: number | null;
          related_page?: string;
          approval_status?: 'pending' | 'approved' | 'rejected' | 'spam';
          created_date?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          blog_post_id?: string | null;
          author?: string;
          email?: string;
          content?: string;
          rating?: number | null;
          related_page?: string;
          approval_status?: 'pending' | 'approved' | 'rejected' | 'spam';
          created_date?: string;
          updated_at?: string;
        };
      };

      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          country: string | null;
          business_type: string;
          service: string;
          budget: string | null;
          requirements: string;
          status: 'new' | 'contacted' | 'qualified' | 'closed_won' | 'closed_lost';
          source: string | null;
          created_date: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          country?: string | null;
          business_type: string;
          service: string;
          budget?: string | null;
          requirements: string;
          status?: 'new' | 'contacted' | 'qualified' | 'closed_won' | 'closed_lost';
          source?: string | null;
          created_date?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          country?: string | null;
          business_type?: string;
          service?: string;
          budget?: string | null;
          requirements?: string;
          status?: 'new' | 'contacted' | 'qualified' | 'closed_won' | 'closed_lost';
          source?: string | null;
          created_date?: string;
          updated_at?: string;
        };
      };

      service_orders: {
        Row: {
          id: string;
          order_reference: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          company_name: string | null;
          selected_service: string;
          demo_id: string | null;
          demo_slug: string | null;
          pricing_plan_id: string | null;
          pricing_plan_name: string;
          amount_cad: number;
          requirements: string;
          contact_details: Json;
          order_status: 'received' | 'in_review' | 'in_development' | 'testing' | 'delivered' | 'cancelled';
          payment_status: 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_reference: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          company_name?: string | null;
          selected_service: string;
          demo_id?: string | null;
          demo_slug?: string | null;
          pricing_plan_id?: string | null;
          pricing_plan_name: string;
          amount_cad: number;
          requirements: string;
          contact_details?: Json;
          order_status?: 'received' | 'in_review' | 'in_development' | 'testing' | 'delivered' | 'cancelled';
          payment_status?: 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_reference?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          company_name?: string | null;
          selected_service?: string;
          demo_id?: string | null;
          demo_slug?: string | null;
          pricing_plan_id?: string | null;
          pricing_plan_name?: string;
          amount_cad?: number;
          requirements?: string;
          contact_details?: Json;
          order_status?: 'received' | 'in_review' | 'in_development' | 'testing' | 'delivered' | 'cancelled';
          payment_status?: 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded';
          created_at?: string;
          updated_at?: string;
        };
      };

      consultation_bookings: {
        Row: {
          id: string;
          booking_reference: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          company_name: string | null;
          booking_date: string;
          time: string;
          timezone: string;
          meeting_purpose: string;
          budget_range: string | null;
          status: 'pending' | 'confirmed' | 'completed' | 'rescheduled' | 'cancelled';
          meeting_channel: string;
          meeting_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_reference: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          company_name?: string | null;
          booking_date: string;
          time: string;
          timezone?: string;
          meeting_purpose: string;
          budget_range?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'rescheduled' | 'cancelled';
          meeting_channel?: string;
          meeting_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_reference?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          company_name?: string | null;
          booking_date?: string;
          time?: string;
          timezone?: string;
          meeting_purpose?: string;
          budget_range?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'rescheduled' | 'cancelled';
          meeting_channel?: string;
          meeting_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      contact_messages: {
        Row: {
          id: string;
          sender_name: string;
          sender_email: string;
          sender_phone: string | null;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_name: string;
          sender_email: string;
          sender_phone?: string | null;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_name?: string;
          sender_email?: string;
          sender_phone?: string | null;
          subject?: string | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };

      media_library: {
        Row: {
          id: string;
          file_name: string;
          file_path: string;
          mime_type: string;
          file_size_bytes: number;
          bucket_name: string;
          public_url: string;
          alt_text: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          file_name: string;
          file_path: string;
          mime_type: string;
          file_size_bytes: number;
          bucket_name?: string;
          public_url: string;
          alt_text?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          file_name?: string;
          file_path?: string;
          mime_type?: string;
          file_size_bytes?: number;
          bucket_name?: string;
          public_url?: string;
          alt_text?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
        };
      };

      admin_audit_logs: {
        Row: {
          id: string;
          admin_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string;
          details: Json | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id?: string | null;
          action: string;
          entity_type: string;
          entity_id: string;
          details?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string;
          details?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
