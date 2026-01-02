import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Space {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string;
  city_id: string;
  image_url: string | null;
  logo_url: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  price_range: string | null;
  rating: number;
  review_count: number;
  is_featured: boolean;
  rank: number | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  city?: City;
  social_links?: SocialLink[];
}

export interface SocialLink {
  id: string;
  space_id: string;
  platform: string;
  url: string;
  created_at: string;
}

export interface Review {
  id: string;
  space_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
  user_profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}
