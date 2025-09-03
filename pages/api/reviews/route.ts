import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sharpenerId = searchParams.get("sharpener_id")

  if (!sharpenerId) {
    return NextResponse.json({ error: "Sharpener ID is required" }, { status: 400 })
  }

  try {
    const supabase = createClient()

    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("sharpener_id", sharpenerId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
    }

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sharpener_id, customer_name, customer_email, rating, review_text, service_type } = body

    // Validate required fields
    if (!sharpener_id || !customer_name || !customer_email || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const supabase = createClient()

    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        sharpener_id,
        customer_name,
        customer_email,
        rating,
        review_text,
        service_type,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
    }

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
