-- Create sharpeners table for directory listings
CREATE TABLE IF NOT EXISTS public.sharpeners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  website TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  services TEXT[] DEFAULT '{}',
  specialties TEXT[] DEFAULT '{}',
  years_experience INTEGER,
  pricing_info TEXT,
  hours_of_operation JSONB,
  mobile_service BOOLEAN DEFAULT false,
  pickup_delivery BOOLEAN DEFAULT false,
  instagram_handle TEXT,
  facebook_page TEXT,
  is_active BOOLEAN DEFAULT true,
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'inactive')),
  trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '14 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_sharpeners_zip_code ON public.sharpeners(zip_code);
CREATE INDEX IF NOT EXISTS idx_sharpeners_city_state ON public.sharpeners(city, state);
CREATE INDEX IF NOT EXISTS idx_sharpeners_location ON public.sharpeners(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_sharpeners_active ON public.sharpeners(is_active);
CREATE INDEX IF NOT EXISTS idx_sharpeners_subscription ON public.sharpeners(subscription_status);

-- Enable Row Level Security
ALTER TABLE public.sharpeners ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (directory is public)
CREATE POLICY "Allow public read access to active sharpeners"
  ON public.sharpeners FOR SELECT
  USING (is_active = true);

-- Create policies for sharpeners to manage their own listings
CREATE POLICY "Allow sharpeners to insert their own listings"
  ON public.sharpeners FOR INSERT
  WITH CHECK (true); -- Anyone can create a listing initially

CREATE POLICY "Allow sharpeners to update their own listings"
  ON public.sharpeners FOR UPDATE
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_sharpeners_updated_at
    BEFORE UPDATE ON public.sharpeners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
