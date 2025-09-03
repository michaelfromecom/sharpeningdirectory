import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Globe, Clock } from "lucide-react";
import Link from "next/link";
import { ReviewForm } from "@/components/review-form";
import { ReviewCard } from "@/components/review-card";
import { mockSharpeners, mockReviews } from "@/lib/mock-data";

type Sharpener = {
  id: string;
  business_name: string;
  city: string;
  state: string;
  description?: string;
  services?: string[];
  specialties?: string[];
  years_experience?: number;
  pricing_info?: string;
  phone?: string;
  website?: string | null;
  mobile_service?: boolean;
  pickup_delivery?: boolean;
};

type Review = {
  id: string;
  sharpener_id: string;
  rating: number;
  review_text: string;
  customer_name: string;
  created_at: string;
};

function parseCityState(location?: string): { city: string; state: string } {
  if (!location) return { city: "", state: "" };
  const parts = location.split(",");
  return {
    city: (parts[0] || "").trim(),
    state: (parts[1] || "").trim(),
  };
}

export const getServerSideProps: GetServerSideProps<{
  sharpener: Sharpener;
  reviews: Review[];
}> = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params?.id as string | undefined;
  if (!id) {
    return { notFound: true };
  }

  const source = mockSharpeners.find((s) => s.id === id);
  if (!source) {
    return { notFound: true };
  }

  const { city, state } = parseCityState((source as any).location);

  const sharpener: Sharpener = {
    id: source.id,
    business_name: (source as any).name ?? "",
    city,
    state,
    description: (source as any).description,
    services: (source as any).services,
    specialties: (source as any).specialties,
    years_experience: (source as any).yearsExperience,
    pricing_info: (source as any).priceRange ?? (source as any).pricing,
    phone: (source as any).phone,
    website: (source as any).website,
    mobile_service: (source as any).mobileService ?? false,
    pickup_delivery: (source as any).pickupDelivery ?? false,
  };

  const reviews = mockReviews.filter((r) => r.sharpener_id === id) as Review[];

  return {
    props: {
      sharpener,
      reviews,
    },
  };
};

export default function SharpenerProfilePage({
  sharpener,
  reviews,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
            ? "fill-yellow-400/50 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-4">{sharpener.business_name}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="h-5 w-5" />
                    <span>
                      {sharpener.city}, {sharpener.state}
                    </span>
                  </div>

                  {reviews.length > 0 && (
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">{renderStars(averageRating)}</div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{averageRating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({reviews.length} reviews)</span>
                      </div>
                    </div>
                  )}

                  <p className="text-muted-foreground leading-relaxed">{sharpener.description}</p>
                </div>

                <div className="lg:text-right">
                  <div className="text-sm text-muted-foreground mb-1">Pricing</div>
                  <div className="font-semibold text-primary text-lg mb-4">
                    {sharpener.pricing_info || "Contact for pricing"}
                  </div>

                  <div className="flex flex-col gap-3">
                    {sharpener.phone && (
                      <Button className="w-full lg:w-auto">
                        <Phone className="mr-2 h-4 w-4" />
                        Call {sharpener.phone}
                      </Button>
                    )}

                    {sharpener.website && (
                      <Button variant="outline" asChild>
                        <Link
                          href={sharpener.website.startsWith("http") ? sharpener.website : `https://${sharpener.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          Visit Website
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {sharpener.services?.map((service: string) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>

                {sharpener.specialties && sharpener.specialties.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {sharpener.specialties.map((specialty: string) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sharpener.years_experience && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{sharpener.years_experience} years of experience</span>
                  </div>
                )}

                {sharpener.mobile_service && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Mobile Service Available</Badge>
                  </div>
                )}

                {sharpener.pickup_delivery && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Pickup & Delivery</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewForm sharpenerId={sharpener.id} onReviewSubmitted={() => window.location.reload()} />

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review as any} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No reviews yet. Be the first to leave a review!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

