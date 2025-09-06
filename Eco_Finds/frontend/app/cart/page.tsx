"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Leaf, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react"

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    price: 45,
    originalPrice: 120,
    category: "Fashion",
    condition: "Good",
    image: "/vintage-leather-jacket-front.jpg",
    seller: "EcoFashionista",
    quantity: 1,
  },
  {
    id: 2,
    title: "Wooden Coffee Table",
    price: 120,
    category: "Furniture",
    condition: "Very Good",
    image: "/wooden-coffee-table.png",
    seller: "HomeDecorLover",
    quantity: 1,
  },
  {
    id: 3,
    title: "Canon DSLR Camera",
    price: 350,
    category: "Electronics",
    condition: "Good",
    image: "/canon-dslr-camera.jpg",
    seller: "PhotoPro",
    quantity: 1,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const totalSavings = cartItems.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0,
  )

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
              <Link href="/my-listings" className="text-foreground hover:text-primary transition-colors">
                My Listings
              </Link>
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/browse">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your sustainable cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Discover amazing sustainable finds and add them to your cart</p>
            <Link href="/browse">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">Sold by {item.seller}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <Badge className="text-xs bg-primary">{item.condition}</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-lg">${item.price}</div>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <div className="text-sm text-muted-foreground line-through">${item.originalPrice}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <Tag className="h-4 w-4" />
                        <span className="font-medium">You're saving ${totalSavings.toFixed(2)}!</span>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Link href="/checkout" className="w-full">
                    <Button size="lg" className="w-full gap-2">
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/browse" className="w-full">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Promo Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sustainability Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Saving ~7.2kg CO₂ emissions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Extending lifecycle of {cartItems.length} products</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Supporting circular economy</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
