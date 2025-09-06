"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { Search, Heart, Leaf, Plus, Loader2 } from "lucide-react"

interface Product {
  product_id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  brand?: string;
  location?: string;
  images?: string[];
  seller_id: number;
  is_sold: boolean;
  is_active: boolean;
  createdAt: string;
  seller: {
    username: string;
    profile_pic?: string;
  };
}

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Furniture",
  "Sports",
  "Books",
  "Home & Garden",
  "Toys",
  "Art & Crafts",
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  const { toast } = useToast()

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await api.getProducts({
        category: selectedCategory === "All" ? undefined : selectedCategory,
        search: searchQuery || undefined,
        page: currentPage,
        limit: 20
      }) as { products: Product[]; totalPages: number }
      
      setProducts(response.products)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, searchQuery, currentPage])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchProducts()
  }

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
              <Link href="/browse" className="text-primary font-medium">
                Browse
              </Link>
              <Link href="/my-listings" className="text-foreground hover:text-primary transition-colors">
                My Listings
              </Link>
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/sell">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Sell Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for sustainable finds..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{selectedCategory === "All" ? "All Items" : selectedCategory}</h2>
          <p className="text-muted-foreground">{products.length} items found</p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading products...</span>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.product_id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Badge className="absolute top-2 left-2 bg-primary">{product.condition}</Badge>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <span className="text-lg font-bold text-primary">${product.price}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">Sold by {product.seller.username}</p>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Link href={`/product/${product.product_id}`} className="w-full">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}