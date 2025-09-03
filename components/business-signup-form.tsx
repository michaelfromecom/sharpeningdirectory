"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, MapPin, Loader2, CheckCircle } from "lucide-react"

export function BusinessSignupForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    description: "",
    experience: "",
    priceRange: "",
    turnaround: "",
    services: [] as string[],
    specialties: [] as string[],
    businessHours: {
      monday: { open: "", close: "", closed: false },
      tuesday: { open: "", close: "", closed: false },
      wednesday: { open: "", close: "", closed: false },
      thursday: { open: "", close: "", closed: false },
      friday: { open: "", close: "", closed: false },
      saturday: { open: "", close: "", closed: false },
      sunday: { open: "", close: "", closed: true },
    },
    mobileService: false,
    pickupDelivery: false,
    acceptsCards: false,
    acceptsCash: true,
    instagramHandle: "",
    facebookPage: "",
  })

  const [currentService, setCurrentService] = useState("")
  const [currentSpecialty, setCurrentSpecialty] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const serviceOptions = [
    "Kitchen Knives",
    "Pocket Knives",
    "Scissors",
    "Garden Tools",
    "Hunting Knives",
    "Woodworking Tools",
    "Chisels",
    "Garden Shears",
    "Straight Razors",
    "Axes & Hatchets",
    "Lawn Mower Blades",
    "Chainsaw Chains",
  ]

  const specialtyOptions = [
    "Japanese Knives",
    "Ceramic Blades",
    "Custom Sharpening",
    "Blade Repair",
    "Mobile Service",
    "Pickup & Delivery",
    "Same Day Service",
    "Bulk Orders",
    "Restaurant Services",
    "Professional Tools",
    "Antique Restoration",
  ]

  const addService = (service: string) => {
    if (service && !formData.services.includes(service)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }))
    }
    setCurrentService("")
  }

  const removeService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }))
  }

  const addSpecialty = (specialty: string) => {
    if (specialty && !formData.specialties.includes(specialty)) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, specialty],
      }))
    }
    setCurrentSpecialty("")
  }

  const removeSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/sharpeners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_name: formData.businessName,
          owner_name: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          description: formData.description,
          services: formData.services,
          specialties: formData.specialties,
          years_experience: formData.experience ? Number.parseInt(formData.experience) : null,
          pricing_info: formData.priceRange,
          hours_of_operation: formData.businessHours,
          mobile_service: formData.mobileService,
          pickup_delivery: formData.pickupDelivery,
          instagram_handle: formData.instagramHandle,
          facebook_page: formData.facebookPage,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setSubmitError(data.error || "Failed to submit application")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="mb-4 text-2xl">Application Submitted Successfully!</CardTitle>
          <CardDescription className="text-lg mb-6">
            Thank you for joining SharpConnect! We've received your application and will review it within 24 hours.
            You'll receive an email confirmation shortly with next steps for your 14-day free trial.
          </CardDescription>
          <Button onClick={() => (window.location.href = "/")}>Return to Homepage</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Business Information
          </CardTitle>
          <CardDescription>Tell us about your sharpening business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                placeholder="Sharp Edge Professional Services"
                required
              />
            </div>
            <div>
              <Label htmlFor="ownerName">Owner/Contact Name *</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => setFormData((prev) => ({ ...prev, ownerName: e.target.value }))}
                placeholder="John Smith"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="john@sharpedge.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
              placeholder="www.sharpedge.com"
            />
          </div>

          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                placeholder="Seattle"
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WA">Washington</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="OR">Oregon</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  {/* Add more states as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                placeholder="98101"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="instagramHandle">Instagram Handle (Optional)</Label>
              <Input
                id="instagramHandle"
                value={formData.instagramHandle}
                onChange={(e) => setFormData((prev) => ({ ...prev, instagramHandle: e.target.value }))}
                placeholder="@sharpedgepro"
              />
            </div>
            <div>
              <Label htmlFor="facebookPage">Facebook Page (Optional)</Label>
              <Input
                id="facebookPage"
                value={formData.facebookPage}
                onChange={(e) => setFormData((prev) => ({ ...prev, facebookPage: e.target.value }))}
                placeholder="facebook.com/sharpedgepro"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services & Specialties */}
      <Card>
        <CardHeader>
          <CardTitle>Services & Specialties</CardTitle>
          <CardDescription>What services do you offer and what are your specialties?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Services Offered *</Label>
            <div className="flex gap-2 mt-2 mb-3">
              <Select value={currentService} onValueChange={setCurrentService}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a service to add" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions
                    .filter((service) => !formData.services.includes(service))
                    .map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={() => addService(currentService)} disabled={!currentService}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((service) => (
                <Badge key={service} variant="secondary" className="flex items-center gap-1">
                  {service}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeService(service)} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Specialties (Optional)</Label>
            <div className="flex gap-2 mt-2 mb-3">
              <Select value={currentSpecialty} onValueChange={setCurrentSpecialty}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a specialty to add" />
                </SelectTrigger>
                <SelectContent>
                  {specialtyOptions
                    .filter((specialty) => !formData.specialties.includes(specialty))
                    .map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={() => addSpecialty(currentSpecialty)} disabled={!currentSpecialty}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" className="flex items-center gap-1">
                  {specialty}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSpecialty(specialty)} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Business Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your business, experience, and what makes you unique..."
              rows={4}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                placeholder="15"
              />
            </div>
            <div>
              <Label htmlFor="priceRange">Price Range</Label>
              <Input
                id="priceRange"
                value={formData.priceRange}
                onChange={(e) => setFormData((prev) => ({ ...prev, priceRange: e.target.value }))}
                placeholder="$5-15 per knife"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="turnaround">Typical Turnaround Time</Label>
            <Input
              id="turnaround"
              value={formData.turnaround}
              onChange={(e) => setFormData((prev) => ({ ...prev, turnaround: e.target.value }))}
              placeholder="Same day service available"
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Services</CardTitle>
          <CardDescription>Do you offer any of these additional services?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mobileService"
              checked={formData.mobileService}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, mobileService: checked as boolean }))}
            />
            <Label htmlFor="mobileService">Mobile Service (I travel to customers)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="pickupDelivery"
              checked={formData.pickupDelivery}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, pickupDelivery: checked as boolean }))}
            />
            <Label htmlFor="pickupDelivery">Pickup & Delivery Service</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptsCards"
              checked={formData.acceptsCards}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptsCards: checked as boolean }))}
            />
            <Label htmlFor="acceptsCards">Accept Credit/Debit Cards</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptsCash"
              checked={formData.acceptsCash}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptsCash: checked as boolean }))}
            />
            <Label htmlFor="acceptsCash">Accept Cash</Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Ready to Join SharpConnect?</h3>
            <p className="text-muted-foreground">Start your 14-day free trial today. No credit card required.</p>

            {submitError && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">{submitError}</div>}

            <Button type="submit" size="lg" className="text-lg px-8 py-3" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              We'll review your application and contact you within 24 hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export default BusinessSignupForm
