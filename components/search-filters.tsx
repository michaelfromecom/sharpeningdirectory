"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [services, setServices] = useState<string[]>([])
  const [maxDistance, setMaxDistance] = useState([10])
  const [minRating, setMinRating] = useState([4])
  const [mobileService, setMobileService] = useState(false)
  const [pickupDelivery, setPickupDelivery] = useState(false)

  const serviceOptions = [
    "Kitchen Knives",
    "Pocket Knives",
    "Scissors",
    "Garden Tools",
    "Hunting Knives",
    "Woodworking Tools",
    "Chisels",
    "Garden Shears",
  ]

  const handleServiceChange = (service: string, checked: boolean) => {
    const newServices = checked ? [...services, service] : services.filter((s) => s !== service)
    setServices(newServices)
    updateFilters({ services: newServices })
  }

  const handleDistanceChange = (value: number[]) => {
    setMaxDistance(value)
    updateFilters({ maxDistance: value[0] })
  }

  const handleRatingChange = (value: number[]) => {
    setMinRating(value)
    updateFilters({ minRating: value[0] })
  }

  const handleMobileServiceChange = (checked: boolean) => {
    setMobileService(checked)
    updateFilters({ mobileService: checked })
  }

  const handlePickupDeliveryChange = (checked: boolean) => {
    setPickupDelivery(checked)
    updateFilters({ pickupDelivery: checked })
  }

  const updateFilters = (updates: any) => {
    const currentFilters = {
      services,
      maxDistance: maxDistance[0],
      minRating: minRating[0],
      mobileService,
      pickupDelivery,
      ...updates,
    }
    onFiltersChange(currentFilters)
  }

  const clearFilters = () => {
    setServices([])
    setMaxDistance([10])
    setMinRating([4])
    setMobileService(false)
    setPickupDelivery(false)
    onFiltersChange({
      services: [],
      maxDistance: 10,
      minRating: 4,
      mobileService: false,
      pickupDelivery: false,
    })
  }

  return (
    <Card className="mb-6 sm:mb-8">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <CardTitle className="text-lg sm:text-xl">Filter Results</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="w-fit">
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Services */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Services Offered</h3>
            <div className="space-y-2 max-h-40 sm:max-h-48 overflow-y-auto pr-2">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={services.includes(service)}
                    onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-xs sm:text-sm leading-tight">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Maximum Distance</h3>
            <div className="px-1 sm:px-2">
              <Slider
                value={maxDistance}
                onValueChange={handleDistanceChange}
                max={50}
                min={1}
                step={1}
                className="mb-2"
              />
              <div className="text-xs sm:text-sm text-muted-foreground text-center">Within {maxDistance[0]} miles</div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Minimum Rating</h3>
            <div className="px-1 sm:px-2">
              <Slider
                value={minRating}
                onValueChange={handleRatingChange}
                max={5}
                min={1}
                step={0.5}
                className="mb-2"
              />
              <div className="text-xs sm:text-sm text-muted-foreground text-center">{minRating[0]}+ stars</div>
            </div>
          </div>

          {/* Additional Services */}
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Additional Services</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="mobileService" checked={mobileService} onCheckedChange={handleMobileServiceChange} />
                <Label htmlFor="mobileService" className="text-xs sm:text-sm leading-tight">
                  Mobile Service
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pickupDelivery" checked={pickupDelivery} onCheckedChange={handlePickupDeliveryChange} />
                <Label htmlFor="pickupDelivery" className="text-xs sm:text-sm leading-tight">
                  Pickup & Delivery
                </Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
