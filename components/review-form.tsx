"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReviewFormProps {
  sharpenerId: string
  onReviewSubmitted: () => void
}

export function ReviewForm({ sharpenerId, onReviewSubmitted }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    rating: 0,
    review_text: "",
    service_type: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sharpener_id: sharpenerId,
          ...formData,
        }),
      })

      if (response.ok) {
        setFormData({
          customer_name: "",
          customer_email: "",
          rating: 0,
          review_text: "",
          service_type: "",
        })
        setShowForm(false)
        onReviewSubmitted()
      } else {
        console.error("Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!showForm) {
    return (
      <Button onClick={() => setShowForm(true)} className="w-full mb-4" variant="outline">
        Write a Review
      </Button>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Your Name</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_email">Email</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label>Rating</Label>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="service_type">Service Type</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, service_type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kitchen Knives">Kitchen Knives</SelectItem>
                <SelectItem value="Pocket Knives">Pocket Knives</SelectItem>
                <SelectItem value="Hunting Knives">Hunting Knives</SelectItem>
                <SelectItem value="Scissors">Scissors</SelectItem>
                <SelectItem value="Garden Tools">Garden Tools</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="review_text">Review</Label>
            <Textarea
              id="review_text"
              value={formData.review_text}
              onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
              placeholder="Share your experience..."
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting || formData.rating === 0}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
