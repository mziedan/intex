
// Define types previously imported from Supabase
export interface Category {
  id: string;
  name: string;
  name_ar?: string;
  slug: string;
  image?: string;
  image_url?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  name_ar?: string;
  slug: string;
  image?: string;
  image_url?: string;
}

export interface Course {
  id: string;
  title: string;
  title_ar?: string;
  slug: string;
  short_description?: string;
  description?: string;
  description_ar?: string;
  price?: number;
  discount_price?: number;
  image_url?: string;
  duration?: string;
  level?: string;
  featured?: boolean;
  status?: string; // Added status field
  category_id?: string;
  subcategory_id?: string;
  category_name?: string;
  category_slug?: string;
  subcategory_name?: string;
  subcategory_slug?: string;
  sessions?: Session[];
}

export interface Session {
  id: string;
  course_id: string;
  start_date: string; // Changed from string | Date to just string
  end_date: string;   // Changed from string | Date to just string
  location?: string;
  location_ar?: string;
  capacity?: number;
  price?: number;
  status?: string;
  registration_count?: number;
}

export interface Registration {
  id: string;
  session_id: string;
  attendee_name: string;
  attendee_email: string;
  company?: string;
  job_title?: string;
  phone?: string;
  notes?: string;
  payment_status?: string;
  payment_amount?: number;
  created_at?: string;
}

export interface Slider {
  id: string;
  title?: string;
  title_ar?: string;
  subtitle?: string;
  subtitle_ar?: string;
  image_url?: string;
  button_text?: string;
  button_text_ar?: string;
  button_link?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url?: string;
  website_url?: string;
}

export interface CompanyInfo {
  id: string;
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  phone?: string;
  email?: string;
  address?: string;
  address_ar?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  map_location?: string;
}

export interface CustomPage {
  id: string;
  title: string;
  title_ar?: string;
  slug: string;
  content?: string;
  content_ar?: string;
  image?: string;
}
