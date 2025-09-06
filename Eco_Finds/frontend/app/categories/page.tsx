"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { 
  Leaf, 
  ArrowLeft, 
  ShoppingBag, 
  Laptop, 
  Shirt, 
  Home, 
  BookOpen, 
  Gamepad2, 
  Palette, 
  Car, 
  Heart,
  Star,
  TrendingUp,
  Loader2
} from "lucide-react"

interface CategoryStats {
  category: string;
  count: number;
  averagePrice: number;
  icon: any;
  description: string;
}

const categoryData = [
  {
    category: "Electronics",
    icon: Laptop,
    description: "Smartphones, laptops, tablets, and tech accessories",
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    category: "Fashion",
    icon: Shirt,
    description: "Clothing, shoes, accessories, and jewelry",
    color: "bg-pink-50 text-pink-600 border-pink-200"
  },
  {
    category: "Furniture",
    icon: Home,
    description: "Home decor, furniture, and household items",
    color: "bg-green-50 text-green-600 border-green-200"
  },
  {
    category: "Books",
    icon: BookOpen,
    description: "Books, magazines, and educational materials",
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    category: "Sports",
    icon: Gamepad2,
    description: "Sports equipment, fitness gear, and outdoor items",
    color: "bg-orange-50 text-orange-600 border-orange-200"
  },
  {
    category: "Toys",
    icon: Heart,
    description: "Toys, games, and children's items",
    color: "bg-red-50 text-red-600 border-red-200"
  },
  {
    category: "Art & Crafts",
    icon: Palette,
    description: "Art supplies, crafts, and creative materials",
    color: "bg-indigo-50 text-indigo-600 border-indigo-200"
  },
  {
    category: "Home & Garden",
    icon: Home,
    description: "Garden tools, plants, and home improvement",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    category: "Jewelry",
    icon: Star,
    description: "Rings, necklaces, watches, and accessories",
    color: "bg-yellow-50 text-yellow-600 border-yellow-200"
  },
  {
    category: "Automotive",
    icon: Car,
    description: "Car parts, accessories, and automotive tools",
    color: "bg-gray-50 text-gray-600 border-gray-200"
  }
]

export default function CategoriesPage() {
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        setIsLoading(true)
        const stats: CategoryStats[] = []
        
        // Fetch stats for each category
        for (const category of categoryData) {
          try {
            const response = await api.getProducts({
              category: category.category,
              limit: 1
            }) as { products: any[]; totalCount: number }
            
            // Calculate average price from first few products
            const products = response.products.slice(0, 10)
            const averagePrice = products.length > 0 
              ? products.reduce((sum, product) => sum + product.price, 0) / products.length 
              : 0

            stats.push({
              category: category.category,
              count: response.totalCount || 0,
              averagePrice: Math.round(averagePrice),
              icon: category.icon,
              description: category.description
            })
          } catch (error) {
            // If category has no products, still show it with 0 count
            stats.push({
              category: category.category,
              count: 0,
              averagePrice: 0,
              icon: category.icon,
              description: category.description
            })
          }
        }
        
        setCategoryStats(stats)
      } catch (error) {
        console.error('Failed to fetch category stats:', error)
        toast({
          title: "Error",
          description: "Failed to load category information.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryStats()
  }, [toast])

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

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/browse" className="text-foreground hover:text-primary transition-colors">
                Browse
              </Link>
              <Link href="/categories" className="text-primary font-medium">
                Categories
              </Link>
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/browse">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Browse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover sustainable finds across all categories. Each purchase helps build a circular economy.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading categories...</span>
          </div>
        ) : (
          <>
            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {categoryStats.map((stat) => {
                const categoryInfo = categoryData.find(c => c.category === stat.category)
                const IconComponent = stat.icon
                
                return (
                  <Link key={stat.category} href={`/browse?category=${encodeURIComponent(stat.category)}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                      <CardHeader className="text-center pb-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${categoryInfo?.color || 'bg-gray-50 text-gray-600'}`}>
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-lg">{stat.category}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center space-y-3">
                        <p className="text-sm text-muted-foreground">{categoryInfo?.description}</p>
                        
                        <div className="flex items-center justify-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{stat.count}</span>
                            <span className="text-muted-foreground">items</span>
                          </div>
                          {stat.averagePrice > 0 && (
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">${stat.averagePrice}</span>
                              <span className="text-muted-foreground">avg</span>
                            </div>
                          )}
                        </div>

                        <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Browse {stat.category}
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>

            {/* Featured Categories */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Popular Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categoryStats
                  .filter(stat => stat.count > 0)
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 3)
                  .map((stat) => {
                    const categoryInfo = categoryData.find(c => c.category === stat.category)
                    const IconComponent = stat.icon
                    
                    return (
                      <Link key={stat.category} href={`/browse?category=${encodeURIComponent(stat.category)}`}>
                        <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${categoryInfo?.color || 'bg-gray-50 text-gray-600'}`}>
                                <IconComponent className="h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg">{stat.category}</h4>
                                <p className="text-sm text-muted-foreground">{stat.count} items available</p>
                              </div>
                              <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                Popular
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
              </div>
            </div>

            {/* Sustainability Message */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8 text-center">
                <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Every Purchase Makes a Difference</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  By choosing pre-loved items, you're extending product lifecycles, reducing waste, 
                  and supporting a sustainable circular economy. Together, we're building a greener future.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Reduce waste</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Save resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Lower carbon footprint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Support community</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
