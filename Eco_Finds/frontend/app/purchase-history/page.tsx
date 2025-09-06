"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Leaf, Search, Package, Star, MessageCircle, RotateCcw, Download, Calendar } from "lucide-react"

// Mock purchase history data
const mockPurchases = [
  {
    id: "ORD-001",
    date: "2024-01-20",
    status: "delivered",
    total: 165,
    items: [
      {
        id: 1,
        title: "Vintage Leather Jacket",
        price: 45,
        image: "/vintage-leather-jacket-front.jpg",
        seller: "EcoFashionista",
        sellerAvatar: "/diverse-user-avatars.png",
        condition: "Good",
        category: "Fashion",
      },
      {
        id: 2,
        title: "Wooden Coffee Table",
        price: 120,
        image: "/wooden-coffee-table.png",
        seller: "HomeDecorLover",
        sellerAvatar: "/diverse-user-avatars.png",
        condition: "Very Good",
        category: "Furniture",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-15",
    status: "delivered",
    total: 350,
    items: [
      {
        id: 3,
        title: "Canon DSLR Camera",
        price: 350,
        image: "/canon-dslr-camera.jpg",
        seller: "PhotoPro",
        sellerAvatar: "/diverse-user-avatars.png",
        condition: "Good",
        category: "Electronics",
      },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-01-10",
    status: "in-transit",
    total: 110,
    items: [
      {
        id: 4,
        title: "Designer Handbag",
        price: 85,
        image: "/luxury-quilted-handbag.png",
        seller: "LuxuryFinds",
        sellerAvatar: "/diverse-user-avatars.png",
        condition: "Excellent",
        category: "Fashion",
      },
      {
        id: 5,
        title: "Yoga Mat Set",
        price: 25,
        image: "/yoga-mat-set.png",
        seller: "WellnessGuru",
        sellerAvatar: "/diverse-user-avatars.png",
        condition: "Like New",
        category: "Sports",
      },
    ],
  },
]

export default function PurchaseHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  const filteredPurchases = mockPurchases.filter((purchase) => {
    const matchesSearch = purchase.items.some((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered"
      case "in-transit":
        return "In Transit"
      case "processing":
        return "Processing"
      case "cancelled":
        return "Cancelled"
      default:
        return status
    }
  }

  const totalSpent = mockPurchases.reduce((sum, purchase) => sum + purchase.total, 0)
  const totalItems = mockPurchases.reduce((sum, purchase) => sum + purchase.items.length, 0)

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
              <Link href="/purchase-history" className="text-primary font-medium">
                Purchase History
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/browse">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Purchase History</h2>
          <p className="text-muted-foreground">Track your sustainable purchases and their impact</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{mockPurchases.length}</div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{totalItems}</div>
              <p className="text-sm text-muted-foreground">Items Purchased</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">${totalSpent}</div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">12.4kg</div>
              <p className="text-sm text-muted-foreground">CO₂ Saved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your purchases..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 3 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Purchase History */}
        <div className="space-y-6">
          {filteredPurchases.map((purchase) => (
            <Card key={purchase.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <CardTitle className="text-lg">Order #{purchase.id}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(purchase.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className={getStatusColor(purchase.status)}>{getStatusText(purchase.status)}</Badge>
                    <div className="text-lg font-semibold mt-1">${purchase.total}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {purchase.items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold line-clamp-1">{item.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="w-5 h-5">
                                  <AvatarImage src={item.sellerAvatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">{item.seller[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">by {item.seller}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">${item.price}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge className="text-xs bg-primary">{item.condition}</Badge>
                          </div>
                        </div>
                      </div>

                      {index < purchase.items.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <MessageCircle className="h-3 w-3" />
                    Contact Seller
                  </Button>
                  {purchase.status === "delivered" && (
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Star className="h-3 w-3" />
                      Leave Review
                    </Button>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="h-3 w-3" />
                    Receipt
                  </Button>
                  {purchase.status === "delivered" && (
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <RotateCcw className="h-3 w-3" />
                      Return
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPurchases.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No purchases found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Start shopping to see your purchase history here"}
            </p>
            <Link href="/browse">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}

        {/* Sustainability Impact Summary */}
        {filteredPurchases.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Your Sustainability Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">12.4kg</div>
                  <div className="text-sm text-green-700">CO₂ Emissions Saved</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
                  <div className="text-sm text-blue-700">Items Given New Life</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">${totalSpent}</div>
                  <div className="text-sm text-purple-700">Invested in Circular Economy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
