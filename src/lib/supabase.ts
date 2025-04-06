
import { createClient } from '@supabase/supabase-js';

// Default values for development to prevent errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Validate environment variables
if (supabaseUrl === 'https://your-project-url.supabase.co' || supabaseAnonKey === 'your-anon-key') {
  console.warn('Using default Supabase credentials. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables for proper functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types based on your database schema
export type Category = {
  id: string;
  name: string;
  name_ar?: string;
  slug: string;
  image?: string;
};

export type Subcategory = {
  id: string;
  category_id: string;
  name: string;
  name_ar?: string;
  slug: string;
  image?: string;
};

export type Course = {
  id: string;
  title: string;
  title_ar?: string;
  slug: string;
  short_description: string;
  short_description_ar?: string;
  description: string;
  description_ar?: string;
  price: number;
  discount_price?: number;
  duration: string;
  level: string;
  featured: boolean;
  status: string;
  image_url?: string;
  category_id: string;
  subcategory_id?: string;
  created_at?: string;
  updated_at?: string;
};

export type Session = {
  id: string;
  course_id: string;
  start_date: string;
  end_date: string;
  location: string;
  location_ar?: string;
  capacity: number;
  price?: number;
  status: string;
};

export type Registration = {
  id: string;
  session_id: string;
  user_id?: string;
  attendee_name: string;
  attendee_email: string;
  company?: string;
  job_title?: string;
  phone?: string;
  payment_status: string;
  payment_amount: number;
  notes?: string;
  created_at?: string;
};

export type Slider = {
  id: string;
  title: string;
  title_ar?: string;
  subtitle: string;
  subtitle_ar?: string;
  image_url: string;
  button_text?: string;
  button_text_ar?: string;
  button_link?: string;
  is_active: boolean;
  display_order: number;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  is_active: boolean;
};

export type CompanyInfo = {
  id: string;
  name: string;
  about: string;
  vision: string;
  mission: string;
  values: string;
  phone: string;
  email: string;
  address: string;
  social_media: Record<string, string>;
};

export type CustomPage = {
  id: string;
  title: string;
  slug: string;
  content: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

// Export a dummy supabase object so imports don't break
export const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          data: [],
          error: null
        })
      })
    })
  })
};
