-- Create reviews table for sharpener ratings and feedback
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sharpener_id UUID NOT NULL REFERENCES public.sharpeners(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  service_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_sharpener_id ON public.reviews(sharpener_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (reviews are public)
CREATE POLICY "Allow public read access to reviews"
  ON public.reviews FOR SELECT
  USING (true);

-- Create policy for anyone to insert reviews
CREATE POLICY "Allow anyone to insert reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (true);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create view for sharpener ratings summary
CREATE OR REPLACE VIEW public.sharpener_ratings AS
SELECT 
  s.id,
  s.business_name,
  COALESCE(AVG(r.rating), 0) as average_rating,
  COUNT(r.id) as review_count,
  COUNT(CASE WHEN r.rating = 5 THEN 1 END) as five_star_count,
  COUNT(CASE WHEN r.rating = 4 THEN 1 END) as four_star_count,
  COUNT(CASE WHEN r.rating = 3 THEN 1 END) as three_star_count,
  COUNT(CASE WHEN r.rating = 2 THEN 1 END) as two_star_count,
  COUNT(CASE WHEN r.rating = 1 THEN 1 END) as one_star_count
FROM public.sharpeners s
LEFT JOIN public.reviews r ON s.id = r.sharpener_id
WHERE s.is_active = true
GROUP BY s.id, s.business_name;
