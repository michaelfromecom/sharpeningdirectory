"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Search, Navigation, Filter, Loader2, Menu, X } from "lucide-react"
import Link from "next/link"
import { SearchFilters } from "@/components/search-filters"
import { SharpenerCard } from "@/components/sharpener-card"

// Mock data for sharpeners
interface Sharpener {
  id: string
  business_name: string
  owner_name: string
  email: string
  phone?: string
  website?: string
  address: string
  city: string
  state: string
  zip_code: string
  latitude?: number
  longitude?: number
  description?: string
  services: string[]
  specialties: string[]
  years_experience?: number
  pricing_info?: string
  hours_of_operation?: any
  mobile_service: boolean
  pickup_delivery: boolean
  instagram_handle?: string
  facebook_page?: string
  created_at: string
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [sharpeners, setSharpeners] = useState<Sharpener[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUsingLocation, setIsUsingLocation] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filters, setFilters] = useState({
    services: [] as string[],
    mobileService: false,
    pickupDelivery: false,
  })

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()

      if (location.trim()) {
        // Check if location is a zip code (5 digits) or city/state
        if (/^\d{5}$/.test(location.trim())) {
          params.append("zipCode", location.trim())
        } else {
          // For now, treat as city - in production you'd parse city/state
          const locationParts = location.split(",")
          if (locationParts.length >= 2) {
            params.append("city", locationParts[0].trim())
            params.append("state", locationParts[1].trim())
          }
        }
      }

      if (filters.services.length > 0) {
        params.append("services", filters.services.join(","))
      }

      if (filters.mobileService) {
        params.append("mobileService", "true")
      }

      if (filters.pickupDelivery) {
        params.append("pickupDelivery", "true")
      }

      const response = await fetch(`/api/sharpeners?${params.toString()}`)
      const data = await response.json()

      if (response.ok) {
        let results = data.sharpeners || []

        if (searchQuery.trim()) {
          results = results.filter((sharpener: Sharpener) => {
            const matchesQuery =
              sharpener.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              sharpener.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (sharpener.description && sharpener.description.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesQuery
          })
        }

        setSharpeners(results)
      } else {
        console.error("Search failed:", data.error)
        setSharpeners([])
      }
    } catch (error) {
      console.error("Search error:", error)
      setSharpeners([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseLocation = () => {
    setIsUsingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get a readable location
          setLocation("Current Location")
          setIsUsingLocation(false)
          handleSearch()
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsUsingLocation(false)
          alert("Unable to get your location. Please enter your zip code manually.")
        },
      )
    } else {
      setIsUsingLocation(false)
      alert("Geolocation is not supported by this browser.")
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])

  const transformSharpenerData = (sharpener: Sharpener) => ({
    id: sharpener.id,
    name: sharpener.business_name,
    location: `${sharpener.city}, ${sharpener.state}`,
    zipCode: sharpener.zip_code,
    distance: "N/A", // Would calculate based on user location
    rating: 4.8, // Would come from reviews system
    reviewCount: 0, // Would come from reviews system
    services: sharpener.services,
    specialties: sharpener.specialties,
    phone: sharpener.phone || "",
    website: sharpener.website || "",
    description: sharpener.description || "",
    priceRange: sharpener.pricing_info || "Contact for pricing",
    turnaround: "Contact for details",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-primary text-primary-foreground shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl font-bold">SharpConnect</h1>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/search" className="hover:text-accent transition-colors">
                Find Sharpeners
              </Link>
              <Link href="/join" className="hover:text-accent transition-colors">
                List Your Business
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                About
              </Link>
              <Button variant="secondary" size="sm">
                Sign Up
              </Button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-primary-foreground hover:text-accent"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-primary-foreground/20 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/search"
                  className="hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Sharpeners
                </Link>
                <Link
                  href="/join"
                  className="hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  List Your Business
                </Link>
                <Link href="#" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
                <Button variant="secondary" size="sm" className="w-fit">
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Find Knife Sharpeners Near You
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Discover trusted local professionals for all your blade sharpening needs.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Search className="h-4 sm:h-5 w-4 sm:w-5" />
              Search for Sharpeners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label htmlFor="search" className="block text-sm font-medium mb-2">
                  Service or Business Name
                </label>
                <Input
                  id="search"
                  placeholder="e.g., kitchen knives, scissors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="location" className="block text-sm font-medium mb-2">
                  Location
                </label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Enter zip code or city"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="text-sm sm:text-base"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleUseLocation}
                    disabled={isUsingLocation}
                    title="Use my current location"
                    className="flex-shrink-0 bg-transparent"
                  >
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-end gap-2 md:col-span-1">
                <Button
                  onClick={handleSearch}
                  className="flex-1 w-full sm:w-auto text-sm sm:text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  <Filter className="h-4 w-4 mr-2 sm:mr-0" />
                  <span className="sm:hidden">Filters</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        {showFilters && (
          <SearchFilters
            onFiltersChange={(newFilters) => {
              setFilters(newFilters)
            }}
          />
        )}

        {/* Results */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {isLoading ? "Searching..." : `${sharpeners.length} Sharpeners Found`}
            </h2>
            <div className="text-xs sm:text-sm text-muted-foreground">Sorted by newest</div>
          </div>
        </div>

        {/* Sharpener Listings */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {sharpeners.map((sharpener) => (
              <SharpenerCard key={sharpener.id} sharpener={transformSharpenerData(sharpener)} />
            ))}
          </div>
        )}

        {!isLoading && sharpeners.length === 0 && (
          <Card className="text-center py-8 sm:py-12">
            <CardContent>
              <MapPin className="h-10 sm:h-12 w-10 sm:w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="mb-2 text-lg sm:text-xl">No sharpeners found</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Try adjusting your search criteria or expanding your search area.
              </CardDescription>
              <Button
                className="mt-4 text-sm sm:text-base"
                onClick={() => {
                  setSearchQuery("")
                  setLocation("")
                  setFilters({ services: [], mobileService: false, pickupDelivery: false })
                  handleSearch()
                }}
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
