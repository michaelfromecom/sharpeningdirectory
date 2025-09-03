"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users, Shield, Menu, X, Award, Zap, Clock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  SharpConnect
                </h1>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/search" className="text-foreground hover:text-primary transition-colors font-medium">
                Find Sharpeners
              </Link>
              <Link href="/join" className="text-foreground hover:text-primary transition-colors font-medium">
                List Your Business
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Button
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-md"
                asChild
              >
                <Link href="/join">Get Started</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-foreground hover:text-primary"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border/50 py-6 bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/search"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Sharpeners
                </Link>
                <Link
                  href="/join"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  List Your Business
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Button
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-md w-fit"
                  asChild
                >
                  <Link href="/join">Get Started</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="relative bg-gradient-to-br from-background via-card/30 to-background py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/knife-sharpening-workshop.png')] bg-cover bg-center opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 px-4 py-2 text-sm font-medium">
              Trusted Local Network
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Find Trusted Local
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block mt-2">
                Knife Sharpeners
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with professional knife sharpening services in your area. Get your blades razor-sharp from
              verified, local experts you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="inline-flex items-center justify-center rounded-xl px-10 py-4 text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-md"
                asChild
              >
                <Link href="/search">
                  <MapPin className="mr-3 h-5 w-5" />
                  Find Sharpeners Near You
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-4 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="/join">List Your Business Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 px-4 py-2">Why Choose Us</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Best Directory Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We connect customers with verified professionals and help sharpening businesses grow their local presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border border-border rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center p-8">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Verified Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  All listed sharpeners are verified for quality and reliability. Find trusted professionals with proven
                  track records and excellent customer satisfaction.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center p-8">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Local & Convenient</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  Search by zip code or use geolocation to find the closest sharpening services. Support local
                  businesses in your community with ease.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center p-8 md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex itemscenter justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Quality Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  Read reviews and ratings from real customers. Choose from top-rated professionals with excellent
                  service records and guaranteed satisfaction.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-gradient-to-br from-card/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 px-4 py-2">For Professionals</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Grow Your Sharpening Business
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Join SharpConnect to increase your visibility, attract more local customers, and build credibility in
                your community. Our trusted network helps professional sharpeners connect with customers who need their
                services.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Reach More Customers</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Get discovered by local customers actively searching for professional sharpening services.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Build Credibility</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Showcase your expertise, collect reviews, and establish trust with potential customers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent via-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Instant Connections</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Customers can contact you directly through your listing for immediate business opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="inline-flex items-center justify-center rounded-xl px-10 py-4 text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-md"
                asChild
              >
                <Link href="/join">
                  <Clock className="mr-3 h-5 w-5" />
                  Start Free Trial - $10/month
                </Link>
              </Button>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-10 order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Premium Features Included:</h3>
              <ul className="space-y-4">
                {[
                  "Professional business listing with featured placement",
                  "Direct contact information & website integration",
                  "Detailed service descriptions & specialties showcase",
                  "Customer reviews & ratings management",
                  "Enhanced local search visibility & SEO",
                  "Mobile-optimized profile with modern design",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-lg text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-gradient-to-r from-primary via-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl sm:text-2xl mb-10 opacity-95 leading-relaxed">
            Whether you're looking for a trusted sharpener or want to grow your business, SharpConnect makes it
            effortless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="inline-flex items-center justify-center rounded-xl px-10 py-4 text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary shadow-md"
              asChild
            >
              <Link href="/search">
                <MapPin className="mr-3 h-5 w-5" />
                Find Local Sharpeners
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300"
              asChild
            >
              <Link href="/join">List Your Business</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  SharpConnect
                </h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connecting customers with trusted local knife sharpening professionals through our reliable network.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">For Customers</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/search" className="hover:text-primary transition-colors text-base">
                    Find Sharpeners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors text-base">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors text-base">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">For Businesses</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/join" className="hover:text-primary transition-colors text-base">
                    List Your Business
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors text-base">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors text-base">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors text-base">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors text-base">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors text-base">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p className="text-base">&copy; 2024 SharpConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

