import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import BusinessSignupForm from "@/components/business-signup-form"

const JoinPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-card to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
            Grow Your Sharpening Business
            <span className="text-primary block">Join SharpConnect Today</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with more customers, build your reputation, and grow your knife sharpening business with our trusted
            directory platform.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Starting at $10/month
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              No Setup Fees
            </Badge>
          </div>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link href="#signup-form">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">One Customer Pays for Everything</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Your monthly listing costs less than what you charge for a single knife. Just one customer covers your
              entire monthly investment and brings you unlimited exposure.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 items-center mb-12">
            {/* Single Knife */}
            <Card className="bg-primary-foreground text-primary">
              <CardHeader className="text-center pb-3">
                <div className="text-2xl font-bold mb-1">$10</div>
                <CardTitle className="text-sm">Single Knife</CardTitle>
                <CardDescription className="text-xs text-primary/70">What you charge</CardDescription>
              </CardHeader>
            </Card>

            {/* Multiple Knives */}
            <Card className="bg-primary-foreground text-primary">
              <CardHeader className="text-center pb-3">
                <div className="text-2xl font-bold mb-1">$45</div>
                <CardTitle className="text-sm">5-Knife Set</CardTitle>
                <CardDescription className="text-xs text-primary/70">What you charge</CardDescription>
              </CardHeader>
            </Card>

            {/* Knife Block */}
            <Card className="bg-primary-foreground text-primary">
              <CardHeader className="text-center pb-3">
                <div className="text-2xl font-bold mb-1">$120</div>
                <CardTitle className="text-sm">Full Knife Block</CardTitle>
                <CardDescription className="text-xs text-primary/70">What you charge</CardDescription>
              </CardHeader>
            </Card>

            {/* Monthly Listing - Highlighted */}
            <Card className="bg-accent text-accent-foreground border-2 border-primary-foreground transform scale-105 shadow-lg">
              <CardHeader className="text-center pb-3">
                <div className="text-2xl font-bold mb-1">$10</div>
                <CardTitle className="text-sm">Monthly Listing</CardTitle>
                <CardDescription className="text-xs text-accent-foreground/70">Your investment</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - What You Get */}
            <div>
              <h3 className="text-2xl font-bold mb-6">What $10/Month Gets You:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">24/7 Online Presence</div>
                    <div className="text-sm opacity-90">Your business works while you sleep</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">High-Quality SEO Backlink</div>
                    <div className="text-sm opacity-90">Boost your Google rankings</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Local Search Dominance</div>
                    <div className="text-sm opacity-90">Appear first in "knife sharpening near me"</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Multiple Customers Monthly</div>
                    <div className="text-sm opacity-90">Each worth $10-$120+ in revenue</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - ROI Calculation */}
            <div className="bg-accent text-accent-foreground rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">The ROI is Incredible</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-accent-foreground/20">
                  <span>Monthly Investment:</span>
                  <span className="font-bold">$10</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-accent-foreground/20">
                  <span>Break-even needed:</span>
                  <span className="font-bold">1 single knife</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-accent-foreground/20">
                  <span>Everything else is:</span>
                  <span className="font-bold text-green-600">Pure profit</span>
                </div>
                <div className="bg-green-100 text-green-800 rounded-lg p-4 mt-6">
                  <div className="text-center">
                    <div className="text-lg font-bold">Typical Result:</div>
                    <div className="text-2xl font-bold">5-15 customers/month</div>
                    <div className="text-sm">= $50-$1,800+ revenue</div>
                    <div className="text-xs mt-1 font-semibold">500-18,000% ROI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-accent text-accent-foreground rounded-lg p-6 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">The Bottom Line</h3>
              <p className="text-lg leading-relaxed">
                Our directory has <strong>heavy SEO presence</strong> and ranks #1 for local knife sharpening searches.
                Most partners get their <strong>first customer within 48 hours</strong> and see
                <strong> 10-100x ROI in month one</strong>. Your listing pays for itself with the very first booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-8 bg-card/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-primary">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground text-2xl">★</span>
              </div>
              <CardTitle className="text-2xl">Professional Plan</CardTitle>
              <CardDescription>Perfect for growing sharpening businesses</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-2">$10</div>
                <div className="text-muted-foreground">per month</div>
                <div className="text-sm text-muted-foreground mt-1">Cancel anytime</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span>Setup Fee</span>
                  <span className="line-through text-muted-foreground">$99</span>
                  <Badge variant="secondary">FREE</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>First Month</span>
                  <Badge variant="outline">50% OFF</Badge>
                </div>
              </div>

              <Button size="lg" className="w-full text-lg mb-4" asChild>
                <Link href="#signup-form" className="scroll-smooth">
                  Start Free 14-Day Trial
                </Link>
              </Button>

              <p className="text-sm text-muted-foreground">No credit card required for trial</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Signup Form Section */}
      <section id="signup-form" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Start Your Free 14-Day Trial</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your business listed and start attracting customers today. No credit card required for your free
              trial.
            </p>
          </div>

          <BusinessSignupForm />
        </div>
      </section>
    </>
  )
}

export default JoinPage
