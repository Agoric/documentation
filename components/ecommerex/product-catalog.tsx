"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Edit, Eye, MoreHorizontal, ShoppingCart, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample product data
const productData = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    sku: "WEP-001",
    price: 129.99,
    inventory: 145,
    category: "Electronics",
    status: "active",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: true,
      website: true,
    },
    image: "/wireless-earbuds.png",
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    sku: "SWX-002",
    price: 249.99,
    inventory: 78,
    category: "Electronics",
    status: "active",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: true,
      website: true,
    },
    image: "/smartwatch-lifestyle.png",
  },
  {
    id: 3,
    name: "Ultra HD Webcam",
    sku: "UHW-003",
    price: 89.99,
    inventory: 92,
    category: "Electronics",
    status: "active",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: false,
      website: true,
    },
    image: "/classic-webcam.png",
  },
  {
    id: 4,
    name: "Ergonomic Keyboard",
    sku: "EKB-004",
    price: 119.99,
    inventory: 64,
    category: "Computer Accessories",
    status: "active",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: false,
      website: true,
    },
    image: "/mechanical-keyboard.png",
  },
  {
    id: 5,
    name: "Portable SSD 1TB",
    sku: "SSD-005",
    price: 159.99,
    inventory: 38,
    category: "Storage",
    status: "active",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: true,
      website: true,
    },
    image: "/placeholder-m4lol.png",
  },
  {
    id: 6,
    name: "Gaming Mouse RGB",
    sku: "GMR-006",
    price: 69.99,
    inventory: 120,
    category: "Computer Accessories",
    status: "active",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: false,
      website: true,
    },
    image: "/gaming-mouse.png",
  },
  {
    id: 7,
    name: "Bluetooth Speaker Mini",
    sku: "BSM-007",
    price: 49.99,
    inventory: 95,
    category: "Audio",
    status: "draft",
    platforms: {
      amazon: false,
      ebay: false,
      shopify: false,
      etsy: false,
      walmart: false,
      website: false,
    },
    image: "/bluetooth-speaker.png",
  },
  {
    id: 8,
    name: "USB-C Hub Multiport",
    sku: "UCH-008",
    price: 39.99,
    inventory: 82,
    category: "Computer Accessories",
    status: "active",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: true,
      website: true,
    },
    image: "/usb-hub.png",
  },
]

export function ProductCatalog() {
  const [products, setProducts] = useState(productData)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const togglePlatform = (productId: number, platform: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            platforms: {
              ...product.platforms,
              [platform]: !product.platforms[platform as keyof typeof product.platforms],
            },
          }
        }
        return product
      }),
    )
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((p) => p.id))
    }
  }

  const toggleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Active</Badge>
      case "draft":
        return (
          <Badge variant="outline" className="text-gray-500">
            Draft
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="outline" className="text-amber-500">
            Archived
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 items-center gap-2 p-4 font-medium text-sm">
          <div className="col-span-1">
            <Checkbox
              checked={selectedProducts.length === products.length && products.length > 0}
              onCheckedChange={toggleSelectAll}
              aria-label="Select all products"
            />
          </div>
          <div className="col-span-3">Product</div>
          <div className="col-span-1 text-center">Price</div>
          <div className="col-span-1 text-center">Stock</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-4 text-center">Platform Availability</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>
        <div className="divide-y">
          {products.map((product) => (
            <div key={product.id} className="grid grid-cols-12 items-center gap-2 p-4">
              <div className="col-span-1">
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleSelectProduct(product.id)}
                  aria-label={`Select ${product.name}`}
                />
              </div>
              <div className="col-span-3 flex items-center gap-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-10 w-10 rounded-md object-cover"
                />
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                </div>
              </div>
              <div className="col-span-1 text-center font-medium">${product.price}</div>
              <div className="col-span-1 text-center">{product.inventory}</div>
              <div className="col-span-1 text-center">{getStatusBadge(product.status)}</div>
              <div className="col-span-4 flex justify-center gap-2">
                <div className="grid grid-cols-6 gap-2">
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs">Amazon</span>
                    <Switch
                      checked={product.platforms.amazon}
                      onCheckedChange={() => togglePlatform(product.id, "amazon")}
                      aria-label="Toggle Amazon"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs">eBay</span>
                    <Switch
                      checked={product.platforms.ebay}
                      onCheckedChange={() => togglePlatform(product.id, "ebay")}
                      aria-label="Toggle eBay"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs">Shopify</span>
                    <Switch
                      checked={product.platforms.shopify}
                      onCheckedChange={() => togglePlatform(product.id, "shopify")}
                      aria-label="Toggle Shopify"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs">Etsy</span>
                    <Switch
                      checked={product.platforms.etsy}
                      onCheckedChange={() => togglePlatform(product.id, "etsy")}
                      aria-label="Toggle Etsy"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs">Walmart</span>
                    <Switch
                      checked={product.platforms.walmart}
                      onCheckedChange={() => togglePlatform(product.id, "walmart")}
                      aria-label="Toggle Walmart"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs">Website</span>
                    <Switch
                      checked={product.platforms.website}
                      onCheckedChange={() => togglePlatform(product.id, "website")}
                      aria-label="Toggle Website"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <ShoppingCart className="mr-2 h-4 w-4" /> Manage Inventory
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{products.length}</strong> products
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
