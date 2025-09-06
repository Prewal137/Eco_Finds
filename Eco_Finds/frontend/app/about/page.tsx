"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Leaf, 
  ArrowLeft, 
  Users, 
  Recycle, 
  Heart, 
  Target, 
  Award,
  Globe,
  TrendingUp,
  Shield
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">EcoFinds</h1>
            </Link>

            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">About EcoFinds</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building a sustainable future through conscious consumption. 
            EcoFinds connects people who want to give their items a second life 
            with those who value quality, sustainability, and community.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create a thriving marketplace that promotes sustainable consumption, 
                reduces waste, and builds a community of environmentally conscious individuals 
                who believe in the power of giving items a second chance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A world where every item finds its perfect home, where waste is minimized, 
                and where communities come together to create a more sustainable future 
                through conscious consumption and circular economy principles.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Recycle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every transaction extends product lifecycles and reduces environmental impact.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Building connections between like-minded individuals who share our values.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Creating a safe, transparent marketplace where everyone can buy and sell with confidence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Our Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">1,247</div>
                <div className="text-sm text-muted-foreground">Items Rehomed</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">2.3k</div>
                <div className="text-sm text-muted-foreground">CO₂ Saved (kg)</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">$45k</div>
                <div className="text-sm text-muted-foreground">Value Circulated</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">How EcoFinds Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">List Your Items</h4>
              <p className="text-muted-foreground">
                Take photos, write descriptions, and set fair prices for items you no longer need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Connect with Buyers</h4>
              <p className="text-muted-foreground">
                Our platform connects you with environmentally conscious buyers in your community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Make a Difference</h4>
              <p className="text-muted-foreground">
                Every transaction helps reduce waste and supports a more sustainable future.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Sarah Chen</h4>
                <Badge variant="outline" className="mb-3">Founder & CEO</Badge>
                <p className="text-muted-foreground text-sm">
                  Passionate about sustainability and building communities that make a difference.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Marcus Johnson</h4>
                <Badge variant="outline" className="mb-3">CTO</Badge>
                <p className="text-muted-foreground text-sm">
                  Technology enthusiast focused on creating seamless user experiences.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Elena Rodriguez</h4>
                <Badge variant="outline" className="mb-3">Community Manager</Badge>
                <p className="text-muted-foreground text-sm">
                  Dedicated to fostering meaningful connections within our community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Be part of the movement towards a more sustainable future. 
              Start buying and selling on EcoFinds today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="gap-2">
                  <Users className="h-4 w-4" />
                  Join EcoFinds
                </Button>
              </Link>
              <Link href="/browse">
                <Button variant="outline" size="lg" className="gap-2">
                  <Leaf className="h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
