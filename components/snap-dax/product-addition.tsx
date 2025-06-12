"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image, Info, Lock, Plus, Sparkles, Tag, Upload, X } from "lucide-react"

export function ProductAddition() {
  const [activeTab, setActiveTab] = useState("basic")
  const [productName, setProductName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [isTokenized, setIsTokenized] = useState(false)
  const [membershipLevel, setMembershipLevel] = useState("silver")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [images, setImages] = useState<string[]>([])

  // Add a tag
  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag])
      setCurrentTag("")
    }
  }

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // Add an image
  const addImage = () => {
    // In a real app, this would handle file uploads
    // For demo purposes, we'll add a placeholder
    setImages([...images, "/placeholder.svg?height=200&width=200&query=product"])
  }

  // Remove an image
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  // Check if form is complete for the current tab
  const isTabComplete = () => {
    switch (activeTab) {
      case "basic":
        return productName && productCategory && productPrice && productDescription
      case "details":
        return true // No required fields in this tab
      case "media":
        return images.length > 0
      case "tokenization":
        return true // No required fields in this tab
      case "review":
        return true // All previous tabs must be complete to reach review
      default:
        return false
    }
  }

  // Navigate to next tab
  const nextTab = () => {
    if (activeTab === "basic") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("media")
    else if (activeTab === "media") setActiveTab("tokenization")
    else if (activeTab === "tokenization") setActiveTab("review")
  }

  // Navigate to previous tab
  const prevTab = () => {
    if (activeTab === "review") setActiveTab("tokenization")
    else if (activeTab === "tokenization") setActiveTab("media")
    else if (activeTab === "media") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("basic")
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle className="text-xl text-indigo-200">Add New Product</CardTitle>
              <CardDescription className="text-indigo-400">
                Create a new product for the members-only marketplace
              </CardDescription>
            </div>
            <Badge className="bg-indigo-500/30 text-indigo-200">
              <Lock className="mr-1 h-3 w-3" />
              Admin Access
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 border border-indigo-500/20 bg-indigo-950/30 p-1">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                value="tokenization"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                Tokenization
              </TabsTrigger>
              <TabsTrigger
                value="review"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                Review
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name" className="text-indigo-200">
                      Product Name <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="product-name"
                      placeholder="Enter product name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-category" className="text-indigo-200">
                      Category <span className="text-red-400">*</span>
                    </Label>
                    <Select value={productCategory} onValueChange={setProductCategory}>
                      <SelectTrigger
                        id="product-category"
                        className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-price" className="text-indigo-200">
                      Price <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-indigo-400">$</span>
                      <Input
                        id="product-price"
                        type="number"
                        placeholder="0.00"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="border-indigo-500/20 bg-indigo-950/30 pl-7 text-indigo-200 placeholder:text-indigo-400/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-description" className="text-indigo-200">
                      Description <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="product-description"
                      placeholder="Enter product description"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="min-h-[150px] border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="tokenized"
                      checked={isTokenized}
                      onCheckedChange={setIsTokenized}
                    />
                    <Label htmlFor="tokenized" className="text-indigo-200">
                      Tokenized Asset
                    </Label>
                    {isTokenized && (
                      <Badge className="bg-indigo-500/30 text-indigo-200">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Tokenized
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="membership-level" className="text-indigo-200">
                      Membership Level
                    </Label>
                    <Select value={membershipLevel} onValueChange={setMembershipLevel}>
                      <SelectTrigger
                        id="membership-level"
                        className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200"
                      >
                        <SelectValue placeholder="Select membership level" />
                      </SelectTrigger>
                      <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inventory" className="text-indigo-200">
                      Inventory
                    </Label>
                    <Input
                      id="inventory"
                      type="number"
                      placeholder="Available units"
                      className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku" className="text-indigo-200">
                      SKU
                    </Label>
                    <Input
                      id="sku"
                      placeholder="Product SKU"
                      className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-indigo-200">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTag()
                          }
                        }}
                        className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-indigo-500/30 text-indigo-300">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                          <X
                            className="ml-1 h-3 w-3 cursor-pointer"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                      {tags.length === 0 && (
                        <div className="text-xs text-indigo-400">No tags added yet</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features" className="text-indigo-200">
                      Features
                    </Label>
                    <Textarea
                      id="features"
                      placeholder="Enter product features (one per line)"
                      className="min-h-[100px] border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-indigo-200">Product Images</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-md border border-indigo-500/20">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-2 top-2 rounded-full bg-indigo-950/70 p-1 text-indigo-300 hover:bg-indigo-900/70 hover:text-indigo-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {images.length < 4 && (
                        <button
                          type="button"
                          onClick={addImage}
                          className="flex aspect-square items-center justify-center rounded-md border border-dashed border-indigo-500/20 bg-indigo-950/30 text-indigo-400 hover:border-indigo-500/40 hover:text-indigo-300"
                        >
                          <Plus className="h-6 w-6" />
                        </button>
                      )}
                    </div>
                    {images.length === 0 && (
                      <div className="text-xs text-indigo-400">
                        Add at least one product image <span className="text-red-400">*</span>
                      </div>
                    )}
                  </div>

                  <div className="rounded-md border border-indigo-500/20 bg-indigo-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-indigo-400" />
                      <h3 className="font-medium text-indigo-200">Upload Images</h3>
                    </div>
                    <p className="mt-2 text-sm text-indigo-400">
                      Drag and drop image files here, or click to browse. Supported formats: JPG, PNG, WebP.
                    </p>
                    <div className="mt-4 flex h-32 items-center justify-center rounded-md border border-dashed border-indigo-500/20 bg-indigo-950/30">
                      <div className="text-center text-indigo-400">
                        <Image className="mx-auto mb-2 h-8 w-8" />
                        <span className="text-sm">Drop files here or click to browse</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-url" className="text-indigo-200">
                      Video URL
                    </Label>
                    <Input
                      id="video-url"
                      placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                      className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-media" className="text-indigo-200">
                      Additional Media
                    </Label>
                    <Textarea
                      id="additional-media"
                      placeholder="Enter links to additional media (one per line)"
                      className="min-h-[100px] border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                    />
                  </div>

                  <div className="rounded-md border border-indigo-500/20 bg-indigo-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-indigo-400" />
                      <h3 className="font-medium text-indigo-200">Media Guidelines</h3>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-indigo-400">
                      <li>• Images should be at least 1000x1000 pixels</li>
                      <li>• Maximum file size: 5MB per image</li>
                      <li>• Use high-quality, well-lit product photos</li>
                      <li>• Include multiple angles for physical products</li>
                      <li>• Videos should be under 2 minutes for optimal engagement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tokenization Tab */}
            <TabsContent value="tokenization" className="space-y-6">
              {isTokenized ? (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="token-price" className="text-indigo-200">
                        Token Price
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-indigo-400">$</span>
                        <Input
                          id="token-price"
                          type="number"
                          placeholder="0.00"
                          className="border-indigo-500/20 bg-indigo-950/30 pl-7 text-indigo-200 placeholder:text-indigo-400/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="total-tokens" className="text-indigo-200">
                        Total Tokens
                      </Label>
                      <Input
                        id="total-tokens"
                        type="number"
                        placeholder="Number of tokens to create"
                        className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="token-symbol" className="text-indigo-200">
                        Token Symbol
                      </Label>
                      <Input
                        id="token-symbol"
                        placeholder="3-5 character symbol (e.g. BTC)"
                        className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-400/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="token-type" className="text-indigo-200">
                        Token Type
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="token-type"
                          className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200"
                        >
                          <SelectValue placeholder="Select token type" />
                        </SelectTrigger>
                        <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
                          <SelectItem value="erc20">ERC-20 (Fungible)</SelectItem>
                          <SelectItem value="erc721">ERC-721 (NFT)</SelectItem>
                          <SelectItem value="erc1155">ERC-1155 (Multi-Token)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dividend-rate" className="\
