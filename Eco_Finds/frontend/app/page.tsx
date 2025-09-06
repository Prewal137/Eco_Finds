import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Leaf, Recycle, Users, ShoppingBag, Plus } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">EcoFinds</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/browse" className="text-foreground hover:text-primary transition-colors">
                Browse
              </Link>
              <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
                Categories
              </Link>
              <Link href="/sell" className="text-foreground hover:text-primary transition-colors">
                Sell
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/cart">
                <Button variant="outline">Cart</Button>
              </Link>
              <Link href="/purchase-history">
                <Button variant="outline">Orders</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Discover Unique Finds,
              <span className="text-primary"> Sustain Our Planet</span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty mb-8">
              Join our community of conscious consumers. Buy and sell pre-loved items while reducing waste and
              supporting a circular economy.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-md mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search for sustainable finds..." className="pl-10" />
              </div>
              <Button>Search</Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Start Selling
                </Button>
              </Link>
              <Link href="/browse">
                <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                  <ShoppingBag className="h-4 w-4" />
                  Browse Items
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose EcoFinds?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              More than just a marketplace - we're building a sustainable future together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Recycle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Circular Economy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Extend product lifecycles and reduce waste by giving items a second chance
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Trusted Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with like-minded individuals who value sustainability and quality
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Make a positive environmental impact with every purchase and sale</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Popular Categories</h3>
            <p className="text-muted-foreground">Discover amazing finds across all categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Electronics", "Fashion", "Home & Garden", "Books", "Sports", "Toys", "Art & Crafts", "Furniture"].map(
              (category) => (
                <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShoppingBag className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold">{category}</h4>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-primary">EcoFinds</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Building a sustainable future through conscious consumption and community.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Marketplace</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/browse" className="hover:text-primary">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/sell" className="hover:text-primary">
                    Start Selling
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Community</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="hover:text-primary">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EcoFinds. All rights reserved. Building a sustainable future together.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
