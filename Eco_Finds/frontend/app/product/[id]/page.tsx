"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  Leaf,
  ArrowLeft,
  Heart,
  Share2,
  MessageCircle,
  Shield,
  Truck,
  RotateCcw,
  Star,
  ShoppingCart,
} from "lucide-react"

// Mock product data
const mockProduct = {
  id: 1,
  title: "Vintage Leather Jacket - Genuine Cowhide",
  price: 45,
  originalPrice: 120,
  category: "Fashion",
  condition: "Good",
  description:
    "Beautiful vintage leather jacket in excellent condition. Made from genuine cowhide leather with a classic design. Perfect for fall and winter seasons. Shows minimal signs of wear, mostly on the cuffs. All zippers work perfectly. Size Medium fits true to size.",
  images: [
    "/vintage-leather-jacket-front.jpg",
    "/vintage-leather-jacket-back.png",
    "/vintage-leather-jacket-detail.jpg",
    "/vintage-leather-jacket-tag.jpg",
  ],
  seller: {
    name: "EcoFashionista",
    avatar: "/diverse-user-avatars.png",
    rating: 4.8,
    totalSales: 23,
    joinedDate: "2023-06-15",
    responseTime: "Usually responds within 2 hours",
  },
  specifications: {
    Brand: "Vintage Collection",
    Size: "Medium",
    Material: "Genuine Cowhide Leather",
    Color: "Brown",
    Condition: "Good - Minor wear on cuffs",
  },
  postedDate: "2024-01-15",
  views: 24,
  likes: 5,
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Added to cart!",
      description: `${mockProduct.title} has been added to your cart.`,
    })

    setIsAddingToCart(false)
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

            <div className="flex items-center gap-3">
              <Link href="/cart">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                </Button>
              </Link>
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={mockProduct.images[selectedImage] || "/placeholder.svg"}
                alt={mockProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${mockProduct.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{mockProduct.category}</Badge>
                <Badge className="bg-primary">{mockProduct.condition}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{mockProduct.title}</h1>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">${mockProduct.price}</span>
                <span className="text-lg text-muted-foreground line-through">${mockProduct.originalPrice}</span>
                <Badge variant="secondary">
                  {Math.round((1 - mockProduct.price / mockProduct.originalPrice) * 100)}% off
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart} disabled={isAddingToCart}>
                <ShoppingCart className="h-4 w-4" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Buy */}
            <Link href="/checkout" className="block">
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Buy Now
              </Button>
            </Link>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={mockProduct.seller.avatar || "/placeholder.svg"} />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{mockProduct.seller.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{mockProduct.seller.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{mockProduct.seller.totalSales} sales</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{mockProduct.seller.responseTime}</p>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Buyer Protection</p>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Fast Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{mockProduct.description}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="space-y-3">
                  {Object.entries(mockProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Item Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posted:</span>
                    <span>Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views:</span>
                    <span>{mockProduct.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likes:</span>
                    <span>{mockProduct.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Sustainability Impact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Extends product lifecycle</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Reduces manufacturing demand</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Saves ~2.5kg CO₂ emissions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
