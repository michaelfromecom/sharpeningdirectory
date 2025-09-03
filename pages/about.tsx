import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Shield, TrendingUp, Target, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-primary text-primary-foreground shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold hover:text-accent transition-colors">
                SharpConnect
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/search" className="hover:text-accent transition-colors">
                Find Sharpeners
              </Link>
              <Link href="/join" className="hover:text-accent transition-colors">
                List Your Business
              </Link>
              <Link href="/about" className="hover:text-accent transition-colors font-semibold">
                About
              </Link>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/join">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-card to-background py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-card-foreground mb-6">
            About <span className="text-primary">SharpConnect</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to connect knife owners with trusted local sharpening professionals, making it easier
            than ever to keep your blades razor-sharp and your business thriving.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Sharp knives are essential for safe, efficient cooking, but finding reliable sharpening services can be
                challenging. We created SharpConnect to bridge this gap, connecting knife owners with skilled local
                professionals who take pride in their craft.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a home cook with a favorite chef's knife or a professional sharpener looking to grow your
                business, SharpConnect makes the connection simple, trusted, and beneficial for everyone.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start gap-4">
                  <Target className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">For Customers</h3>
                    <p className="text-muted-foreground">
                      Find trusted, local knife sharpening services with verified reviews and transparent pricing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <TrendingUp className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">For Businesses</h3>
                    <p className="text-muted-foreground">
                      Grow your sharpening business with increased visibility and direct customer connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SharpConnect Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Why SharpConnect Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built a platform that benefits both customers and sharpening professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Verified Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All sharpening professionals are verified for quality and reliability. We ensure customers connect
                  with trusted experts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-4">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Local Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Supporting local businesses and communities by connecting neighbors with skilled professionals in
                  their area.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-4">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Affordable Value</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  At just $10/month, businesses get incredible value with local SEO presence, customer reviews, and
                  direct lead generation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Growing Together</h2>
            <p className="text-lg text-muted-foreground">
              SharpConnect is building a community of sharp knives and successful businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-lg font-semibold text-foreground mb-2">Verified Sharpeners</div>
              <div className="text-muted-foreground">Professional services across multiple cities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-lg font-semibold text-foreground mb-2">Happy Customers</div>
              <div className="text-muted-foreground">Knives sharpened through our platform</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-lg font-semibold text-foreground mb-2">Average Rating</div>
              <div className="text-muted-foreground">Customer satisfaction across all services</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the SharpConnect Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you need your knives sharpened or want to grow your sharpening business, we're here to help you
            succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-3" asChild>
              <Link href="/search">
                <MapPin className="mr-2 h-5 w-5" />
                Find Local Sharpeners
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/join">List Your Business</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 SharpConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
