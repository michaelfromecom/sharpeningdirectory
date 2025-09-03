"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Phone, Globe, Clock, DollarSign, MessageSquare } from "lucide-react"
import Link from "next/link"
import { ContactModal } from "./contact-modal"

interface Sharpener {
  id: number | string
  name: string
  location: string
  zipCode: string
  distance: string
  rating: number
  reviewCount: number
  services: string[]
  specialties: string[]
  phone: string
  website: string
  description: string
  priceRange: string
  turnaround: string
}

interface SharpenerCardProps {
  sharpener: Sharpener
}

export function SharpenerCard({ sharpener }: SharpenerCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 sm:h-4 w-3 sm:w-4 ${
          i < Math.floor(rating)
            ? "fill-accent text-accent"
            : i < rating
              ? "fill-accent/50 text-accent"
              : "text-muted-foreground"
        }`}
      />
    ))
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl mb-2 break-words">{sharpener.name}</CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 sm:h-4 w-3 sm:w-4 flex-shrink-0" />
                <span className="truncate">{sharpener.location}</span>
                {sharpener.distance !== "N/A" && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="sm:inline block">{sharpener.distance}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <div className="flex items-center gap-1">{renderStars(sharpener.rating)}</div>
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <span className="font-semibold">{sharpener.rating}</span>
                <span className="text-muted-foreground">({sharpener.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Starting at</div>
            <div className="font-semibold text-primary text-sm sm:text-base">{sharpener.priceRange}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="mb-4 leading-relaxed text-sm sm:text-base">{sharpener.description}</CardDescription>

        {/* Services */}
        <div className="mb-4">
          <h4 className="font-semibold text-xs sm:text-sm mb-2">Services:</h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {sharpener.services.map((service) => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Specialties */}
        {sharpener.specialties.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-xs sm:text-sm mb-2">Specialties:</h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {sharpener.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-3 sm:h-4 w-3 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{sharpener.turnaround}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-3 sm:h-4 w-3 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{sharpener.priceRange}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Primary action - always full width on mobile */}
          <Button className="w-full text-sm sm:text-base">
            <Phone className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
            Call {sharpener.phone}
          </Button>

          {/* Secondary actions - stack on mobile, row on larger screens */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <ContactModal
              sharpenerName={sharpener.name}
              sharpenerId={sharpener.id.toString()}
              trigger={
                <Button variant="outline" className="flex-1 text-sm sm:text-base bg-transparent">
                  <MessageSquare className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                  Send Message
                </Button>
              }
            />

            {sharpener.website && (
              <Button variant="outline" className="flex-1 bg-transparent text-sm sm:text-base" asChild>
                <Link href={`https://${sharpener.website}`} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                  Visit Website
                </Link>
              </Button>
            )}
            <Button variant="secondary" className="flex-1 text-sm sm:text-base" asChild>
              <Link href={`/sharpener/${sharpener.id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
