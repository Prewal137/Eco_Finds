"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Plus, Search, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for user's listings
const mockListings = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    price: 45,
    category: "Fashion",
    image: "/vintage-leather-jacket.png",
    status: "active",
    views: 24,
    likes: 5,
    datePosted: "2024-01-15",
  },
  {
    id: 2,
    title: "Wooden Coffee Table",
    price: 120,
    category: "Furniture",
    image: "/wooden-coffee-table.png",
    status: "sold",
    views: 45,
    likes: 12,
    datePosted: "2024-01-10",
  },
  {
    id: 3,
    title: "Canon DSLR Camera",
    price: 350,
    category: "Electronics",
    image: "/canon-dslr-camera.jpg",
    status: "draft",
    views: 0,
    likes: 0,
    datePosted: "2024-01-20",
  },
]

export default function MyListingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
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
              <Link href="/my-listings" className="text-primary font-medium">
                My Listings
              </Link>
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </nav>

            <Link href="/sell">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Listing
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Listings</h2>
            <p className="text-muted-foreground">Manage your items and track their performance</p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link href="/sell">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Item
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your listings..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-sm text-muted-foreground">Total Listings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">1</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <p className="text-sm text-muted-foreground">Sold</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">1</div>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </CardContent>
          </Card>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="group">
              <div className="relative">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-2 left-2 ${getStatusColor(listing.status)}`}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                  <span className="text-lg font-bold text-primary">${listing.price}</span>
                </div>

                <Badge variant="outline" className="text-xs mb-3">
                  {listing.category}
                </Badge>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{listing.views} views</span>
                  <span>{listing.likes} likes</span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Start by creating your first listing"}
            </p>
            <Link href="/sell">
              <Button>Create Your First Listing</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
