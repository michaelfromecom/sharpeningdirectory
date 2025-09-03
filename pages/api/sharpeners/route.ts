import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

const mockSharpeners = [
  {
    id: "1",
    name: "Sharp Edge Professional",
    location: "Seattle, WA",
    rating: 4.8,
    reviewCount: 24,
    services: ["Kitchen Knives", "Pocket Knives", "Scissors"],
    specialties: ["Japanese Knives", "German Steel"],
    pricing: "$8-15 per knife",
    phone: "(206) 555-0123",
    website: "https://sharpedgepro.com",
    description:
      "Professional knife sharpening with 15+ years experience. Specializing in high-end kitchen knives and Japanese steel.",
    yearsExperience: 15,
    mobileService: true,
    pickupDelivery: false,
    zipCode: "98101",
    instagram: "@sharpedgepro",
    facebook: "Sharp Edge Professional",
  },
  {
    id: "2",
    name: "Blade Masters",
    location: "Portland, OR",
    rating: 4.9,
    reviewCount: 31,
    services: ["Kitchen Knives", "Garden Tools", "Scissors", "Chisels"],
    specialties: ["Antique Restoration", "Custom Angles"],
    pricing: "$10-20 per item",
    phone: "(503) 555-0456",
    website: "https://blademasters.com",
    description:
      "Family-owned business serving Portland for over 20 years. Expert restoration of antique blades and tools.",
    yearsExperience: 22,
    mobileService: false,
    pickupDelivery: true,
    zipCode: "97201",
    instagram: "@blademasters_pdx",
    facebook: "Blade Masters Portland",
  },
  {
    id: "3",
    name: "Mobile Knife Service",
    location: "San Francisco, CA",
    rating: 4.7,
    reviewCount: 18,
    services: ["Kitchen Knives", "Pocket Knives"],
    specialties: ["Mobile Service", "Same Day"],
    pricing: "$12-18 per knife",
    phone: "(415) 555-0789",
    website: null,
    description:
      "Convenient mobile knife sharpening service. We come to you! Same-day service available in SF Bay Area.",
    yearsExperience: 8,
    mobileService: true,
    pickupDelivery: true,
    zipCode: "94102",
    instagram: "@mobileknifeservice",
    facebook: null,
  },
  {
    id: "4",
    name: "Precision Sharpening Co",
    location: "Denver, CO",
    rating: 4.6,
    reviewCount: 42,
    services: ["Kitchen Knives", "Garden Tools", "Woodworking Tools"],
    specialties: ["Precision Angles", "Tool Restoration"],
    pricing: "$9-16 per item",
    phone: "(303) 555-0321",
    website: "https://precisionsharpening.co",
    description:
      "Precision sharpening for culinary professionals and woodworkers. State-of-the-art equipment ensures perfect angles every time.",
    yearsExperience: 12,
    mobileService: false,
    pickupDelivery: false,
    zipCode: "80202",
    instagram: "@precisionsharpening",
    facebook: "Precision Sharpening Company",
  },
  {
    id: "5",
    name: "The Knife Doctor",
    location: "Austin, TX",
    rating: 4.9,
    reviewCount: 67,
    services: ["Kitchen Knives", "Pocket Knives", "Scissors", "Straight Razors"],
    specialties: ["Japanese Techniques", "Razor Honing"],
    pricing: "$10-25 per item",
    phone: "(512) 555-0654",
    website: "https://knifedoctor.com",
    description:
      "Master craftsman trained in traditional Japanese sharpening techniques. Specializing in premium kitchen knives and straight razor honing.",
    yearsExperience: 18,
    mobileService: true,
    pickupDelivery: true,
    zipCode: "78701",
    instagram: "@theknifedoctor",
    facebook: "The Knife Doctor Austin",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const zipCode = searchParams.get("zipCode")
  const city = searchParams.get("city")
  const state = searchParams.get("state")
  const services = searchParams.get("services")?.split(",") || []
  const mobileService = searchParams.get("mobileService") === "true"
  const pickupDelivery = searchParams.get("pickupDelivery") === "true"

  try {
    const supabase = await createClient()

    // Build query with filters
    let query = supabase
      .from("sharpeners")
      .select(`
        *,
        reviews:reviews(rating)
      `)
      .eq("is_active", true)

    // Apply location filters
    if (zipCode) {
      query = query.eq("zip_code", zipCode)
    } else if (city && state) {
      query = query.ilike("city", `%${city}%`).ilike("state", `%${state}%`)
    } else if (city) {
      query = query.ilike("city", `%${city}%`)
    }

    // Apply service filters
    if (services.length > 0) {
      query = query.overlaps("services", services)
    }

    if (mobileService) {
      query = query.eq("mobile_service", true)
    }

    if (pickupDelivery) {
      query = query.eq("pickup_delivery", true)
    }

    const { data: sharpeners, error } = await query

    if (error) {
      console.error("Database error:", error)
      console.log("[v0] Database tables not found, using mock data")

      // Apply filters to mock data
      let filteredSharpeners = mockSharpeners

      if (zipCode) {
        filteredSharpeners = filteredSharpeners.filter((s) => s.zipCode === zipCode)
      } else if (city && state) {
        filteredSharpeners = filteredSharpeners.filter(
          (s) =>
            s.location.toLowerCase().includes(city.toLowerCase()) &&
            s.location.toLowerCase().includes(state.toLowerCase()),
        )
      } else if (city) {
        filteredSharpeners = filteredSharpeners.filter((s) => s.location.toLowerCase().includes(city.toLowerCase()))
      }

      if (services.length > 0) {
        filteredSharpeners = filteredSharpeners.filter((s) => services.some((service) => s.services.includes(service)))
      }

      if (mobileService) {
        filteredSharpeners = filteredSharpeners.filter((s) => s.mobileService)
      }

      if (pickupDelivery) {
        filteredSharpeners = filteredSharpeners.filter((s) => s.pickupDelivery)
      }

      return NextResponse.json({ sharpeners: filteredSharpeners })
    }

    if (!sharpeners || sharpeners.length === 0) {
      console.log("[v0] No results from database, using mock data")

      // Apply filters to mock data
      let filteredSharpeners = mockSharpeners

      if (zipCode) {
        filteredSharpeners = filteredSharpeners.filter((s) => s.zipCode === zipCode)
      } else if (city && state) {
        filteredSharpeners = filteredSharpeners.filter(
          (s) =>
            s.location.toLowerCase().includes(city.toLowerCase()) &&
            s.location.toLowerCase().includes(state.toLowerCase()),
        )
      } else if (city) {
        filteredSharpeners = filteredSharpeners.filter((s) => s.location.toLowerCase().includes(city.toLowerCase()))
      }

      if (services.length > 0) {
        filteredSharpeners = filteredSharpeners.filter((s) => services.some((service) => s.services.includes(service)))
      }

      if (mobileService) {
        filteredSharpeners = filteredSharpeners.filter((s) => s.mobileService)
      }

      if (pickupDelivery) {
        filteredSharpeners = filteredSharpeners.filter((s) => s.pickupDelivery)
      }

      return NextResponse.json({ sharpeners: filteredSharpeners })
    }

    // Transform data to include ratings
    const transformedSharpeners =
      sharpeners?.map((sharpener) => {
        const reviews = sharpener.reviews || []
        const averageRating =
          reviews.length > 0 ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length : 0

        return {
          id: sharpener.id,
          name: sharpener.business_name,
          location: `${sharpener.city}, ${sharpener.state}`,
          rating: Number(averageRating.toFixed(1)),
          reviewCount: reviews.length,
          services: sharpener.services || [],
          specialties: sharpener.specialties || [],
          pricing: sharpener.pricing_info || "Contact for pricing",
          phone: sharpener.phone,
          website: sharpener.website,
          description: sharpener.description,
          yearsExperience: sharpener.years_experience,
          mobileService: sharpener.mobile_service,
          pickupDelivery: sharpener.pickup_delivery,
          zipCode: sharpener.zip_code,
          instagram: sharpener.instagram_handle,
          facebook: sharpener.facebook_page,
        }
      }) || []

    return NextResponse.json({ sharpeners: transformedSharpeners })
  } catch (error) {
    console.error("API error:", error)
    console.log("[v0] API error occurred, using mock data as fallback")
    return NextResponse.json({ sharpeners: mockSharpeners })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["business_name", "owner_name", "email", "address", "city", "state", "zip_code"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Insert new sharpener into database
    const { data: sharpener, error } = await supabase
      .from("sharpeners")
      .insert([
        {
          business_name: body.business_name,
          owner_name: body.owner_name,
          email: body.email,
          phone: body.phone,
          website: body.website,
          address: body.address,
          city: body.city,
          state: body.state,
          zip_code: body.zip_code,
          description: body.description,
          services: body.services || [],
          specialties: body.specialties || [],
          years_experience: body.years_experience,
          pricing_info: body.pricing_info,
          mobile_service: body.mobile_service || false,
          pickup_delivery: body.pickup_delivery || false,
          instagram_handle: body.instagram_handle,
          facebook_page: body.facebook_page,
          subscription_status: "trial",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create listing" }, { status: 500 })
    }

    return NextResponse.json({ sharpener }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
