/*
  # Create Complete Spaces Platform Schema

  ## Overview
  This migration creates a comprehensive database schema for a Moroccan spaces platform
  with categories (gastronomy, accommodation, etc.), user authentication, reviews, and social features.

  ## New Tables

  ### 1. `categories`
  - `id` (uuid, primary key)
  - `name` (text) - Category name (e.g., "Gastronomie", "Hébergement")
  - `slug` (text) - URL-friendly identifier
  - `description` (text) - Category description
  - `icon` (text) - Icon identifier
  - `created_at` (timestamptz)

  ### 2. `cities`
  - `id` (uuid, primary key)
  - `name` (text) - City name (e.g., "Marrakech", "Casablanca")
  - `slug` (text) - URL-friendly identifier
  - `description` (text)
  - `image_url` (text)
  - `created_at` (timestamptz)

  ### 3. `spaces`
  - `id` (uuid, primary key)
  - `name` (text) - Space name
  - `slug` (text) - URL-friendly identifier
  - `description` (text) - Detailed description
  - `category_id` (uuid) - Foreign key to categories
  - `city_id` (uuid) - Foreign key to cities
  - `image_url` (text) - Main image
  - `logo_url` (text) - Logo/icon
  - `phone` (text) - Contact phone
  - `email` (text) - Contact email
  - `website` (text) - Website URL
  - `address` (text) - Physical address
  - `price_range` (text) - Price range (e.g., "€€", "500-1000 MAD")
  - `rating` (decimal) - Average rating (0-5)
  - `review_count` (integer) - Number of reviews
  - `is_featured` (boolean) - Featured space flag
  - `rank` (integer) - Ranking within category
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `social_links`
  - `id` (uuid, primary key)
  - `space_id` (uuid) - Foreign key to spaces
  - `platform` (text) - Social platform name (facebook, instagram, twitter, etc.)
  - `url` (text) - Social media URL
  - `created_at` (timestamptz)

  ### 5. `reviews`
  - `id` (uuid, primary key)
  - `space_id` (uuid) - Foreign key to spaces
  - `user_id` (uuid) - Foreign key to auth.users
  - `rating` (integer) - Rating (1-5)
  - `title` (text) - Review title
  - `comment` (text) - Review text
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `user_profiles`
  - `id` (uuid, primary key) - References auth.users
  - `full_name` (text)
  - `avatar_url` (text)
  - `bio` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for spaces, categories, cities, and reviews
  - Authenticated users can create reviews and manage their profiles
  - Users can only edit/delete their own reviews
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create spaces table
CREATE TABLE IF NOT EXISTS spaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  image_url text,
  logo_url text,
  phone text,
  email text,
  website text,
  address text,
  price_range text,
  rating decimal DEFAULT 0,
  review_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  rank integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid REFERENCES spaces(id) ON DELETE CASCADE,
  platform text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid REFERENCES spaces(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_spaces_category ON spaces(category_id);
CREATE INDEX IF NOT EXISTS idx_spaces_city ON spaces(city_id);
CREATE INDEX IF NOT EXISTS idx_spaces_featured ON spaces(is_featured);
CREATE INDEX IF NOT EXISTS idx_spaces_rating ON spaces(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_space ON reviews(space_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_social_links_space ON social_links(space_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- RLS Policies for cities (public read)
CREATE POLICY "Anyone can view cities"
  ON cities FOR SELECT
  TO public
  USING (true);

-- RLS Policies for spaces (public read)
CREATE POLICY "Anyone can view spaces"
  ON spaces FOR SELECT
  TO public
  USING (true);

-- RLS Policies for social_links (public read)
CREATE POLICY "Anyone can view social links"
  ON social_links FOR SELECT
  TO public
  USING (true);

-- RLS Policies for reviews (public read, authenticated create/update/delete own)
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for user_profiles
CREATE POLICY "Anyone can view profiles"
  ON user_profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_spaces_updated_at
  BEFORE UPDATE ON spaces
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update space rating and review count
CREATE OR REPLACE FUNCTION update_space_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE spaces
  SET 
    rating = (SELECT AVG(rating)::decimal FROM reviews WHERE space_id = COALESCE(NEW.space_id, OLD.space_id)),
    review_count = (SELECT COUNT(*) FROM reviews WHERE space_id = COALESCE(NEW.space_id, OLD.space_id))
  WHERE id = COALESCE(NEW.space_id, OLD.space_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update space rating when review is added/updated/deleted
CREATE TRIGGER update_space_rating_on_review
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_space_rating();