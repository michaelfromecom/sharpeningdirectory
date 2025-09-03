"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, MessageSquare } from "lucide-react"

interface ContactModalProps {
  sharpenerName: string
  sharpenerId: string
  trigger: React.ReactNode
}

export function ContactModal({ sharpenerName, sharpenerId, trigger }: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    serviceType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitted(false)
      setIsOpen(false)
      setFormData({ name: "", email: "", phone: "", message: "", serviceType: "" })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md mx-4 sm:mx-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <MessageSquare className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
            Contact {sharpenerName}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Send a message to inquire about their sharpening services.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6 sm:py-8">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Mail className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Message Sent!</h3>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Your inquiry has been sent to {sharpenerName}. They'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="name" className="text-sm">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm">
                Phone (Optional)
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="text-sm sm:text-base"
              />
            </div>

            <div>
              <Label htmlFor="serviceType" className="text-sm">
                Service Needed
              </Label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              >
                <option value="">Select a service...</option>
                <option value="kitchen-knives">Kitchen Knives</option>
                <option value="pocket-knives">Pocket Knives</option>
                <option value="scissors">Scissors</option>
                <option value="garden-tools">Garden Tools</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message" className="text-sm">
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell them about what you need sharpened, when you need it, and any other details..."
                rows={3}
                className="text-sm sm:text-base resize-none"
              />
            </div>

            <Button type="submit" className="w-full text-sm sm:text-base py-2 sm:py-3" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
