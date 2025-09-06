"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/api"
import { Leaf, Upload, X, ArrowLeft, Loader2 } from "lucide-react"

const categories = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Sports",
  "Books",
  "Home & Garden",
  "Toys",
  "Art & Crafts",
  "Jewelry",
  "Automotive",
]

const conditions = ["New", "Like New", "Good", "Needs Love"]

export default function SellPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    brand: "",
    location: "",
    images: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)
  
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/auth/login")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.category || !formData.condition || !formData.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        condition: formData.condition,
        brand: formData.brand || undefined,
        location: formData.location || undefined,
        images: formData.images,
      }

      await api.createProduct(productData)
      
      toast({
        title: "Success!",
        description: "Your item has been listed successfully.",
      })
      
      router.push("/my-listings")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = () => {
    // TODO: Implement image upload logic
    const newImage = `/placeholder.svg?height=200&width=200&query=product+placeholder`
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImage],
    }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
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

            <Link href="/browse">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">List Your Item</h2>
            <p className="text-muted-foreground">Give your item a second life and help build a sustainable future</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Provide accurate information to help buyers make informed decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Leather Jacket - Size M"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                {/* Category and Condition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item's features, condition, and any flaws. Be honest to build trust with buyers."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Brand and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand (Optional)</Label>
                    <Input
                      id="brand"
                      placeholder="e.g., Apple, Nike, IKEA"
                      value={formData.brand}
                      onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      placeholder="e.g., New York, NY"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <Label>Photos *</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add up to 5 photos. First photo will be the main image.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {index === 0 && <Badge className="absolute bottom-2 left-2 text-xs">Main</Badge>}
                      </div>
                    ))}

                    {formData.images.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="h-32 border-dashed flex flex-col gap-2 bg-transparent"
                        onClick={handleImageUpload}
                      >
                        <Upload className="h-6 w-6" />
                        <span className="text-sm">Add Photo</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Listing Item...
                      </>
                    ) : (
                      "List Item"
                    )}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" disabled={isLoading}>
                    Save Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Tips for a Great Listing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm">Use clear, well-lit photos from multiple angles</p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm">Be honest about condition and any flaws</p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm">Research similar items to price competitively</p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm">Include keywords buyers might search for</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
