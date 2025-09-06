"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import {
  Leaf,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Camera,
  Star,
  ShoppingBag,
  Heart,
  TrendingUp,
  Package,
  LogOut,
} from "lucide-react"

export default function DashboardPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    bio: "",
    location: "",
  })
  
  const { user, isAuthenticated, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    if (user) {
      setEditData({
        username: user.username,
        email: user.email,
        bio: "",
        location: "",
      })
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const mockStats = [
    { label: "Items Sold", value: 0, icon: Package, color: "text-green-600" },
    { label: "Items Purchased", value: 0, icon: ShoppingBag, color: "text-blue-600" },
    { label: "Active Listings", value: 0, icon: TrendingUp, color: "text-purple-600" },
    { label: "Favorites", value: 0, icon: Heart, color: "text-red-600" },
  ]

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleCancel = () => {
    setEditData({
      username: user.username,
      email: user.email,
      bio: "",
      location: "",
    })
    setIsEditing(false)
  }

  const handleAvatarChange = () => {
    // TODO: Implement avatar upload
    toast({
      title: "Avatar upload",
      description: "Avatar upload functionality would be implemented here.",
    })
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
              <Link href="/browse" className="text-foreground hover:text-primary transition-colors">
                Browse
              </Link>
              <Link href="/my-listings" className="text-foreground hover:text-primary transition-colors">
                My Listings
              </Link>
              <Link href="/dashboard" className="text-primary font-medium">
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/sell">
                <Button>Sell Item</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
            <p className="text-muted-foreground">Manage your profile and track your sustainable impact</p>
          </div>

          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} className="gap-2 bg-transparent">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl">
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
                      onClick={handleAvatarChange}
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={editData.username}
                      onChange={(e) => setEditData((prev) => ({ ...prev, username: e.target.value }))}
                      className="text-center font-semibold"
                    />
                  </div>
                ) : (
                  <div>
                    <CardTitle className="text-xl">{user.username}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>New Member</span>
                    </CardDescription>
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">
                    Member since {new Date().getFullYear()}
                  </Badge>
                </div>

                <Separator />

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">Sales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">Purchases</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {mockStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  {isEditing ? "Update your personal details" : "Your personal details"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={editData.firstName}
                        onChange={(e) => setEditData((prev) => ({ ...prev, firstName: e.target.value }))}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">{userData.firstName}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={editData.lastName}
                        onChange={(e) => setEditData((prev) => ({ ...prev, lastName: e.target.value }))}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">{userData.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded-md">{userData.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded-md">{userData.phone}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editData.location}
                      onChange={(e) => setEditData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded-md">{userData.location}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      rows={3}
                      value={editData.bio}
                      onChange={(e) => setEditData((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell others about yourself and your sustainable journey..."
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded-md min-h-[80px]">{userData.bio}</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about your listings and purchases</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Allow others to view your profile and ratings</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Public
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Newsletter</Label>
                      <p className="text-sm text-muted-foreground">Get sustainability tips and marketplace updates</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Subscribed
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sustainability Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Your Sustainability Impact
                </CardTitle>
                <CardDescription>See how you're contributing to a circular economy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">47.3kg</div>
                    <div className="text-sm text-green-700">CO₂ Saved</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">38</div>
                    <div className="text-sm text-blue-700">Items Rehomed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">$1,247</div>
                    <div className="text-sm text-purple-700">Value Circulated</div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Prevented 38 items from going to landfill</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Reduced manufacturing demand through reuse</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Supported local circular economy</span>
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
