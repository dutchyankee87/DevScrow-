"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createListing } from "@/actions/listings"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const createListingSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().min(1, "Description is required").max(5000, "Description too long"),
  category: z.string().min(1, "Category is required"),
  priceMinor: z.number().positive("Price must be positive"),
  deliveryTimeHours: z.number().positive("Delivery time must be positive"),
  requirements: z.string().optional(),
  tags: z.string().optional()
})

type CreateListingForm = z.infer<typeof createListingSchema>

const categories = [
  "Web Development",
  "Graphic Design", 
  "Writing & Translation",
  "Digital Marketing",
  "Video & Animation",
  "Music & Audio",
  "Programming",
  "Business Services",
  "Consulting",
  "Other"
]

export default function CreateListingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CreateListingForm>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      priceMinor: 0,
      deliveryTimeHours: 24
    }
  })

  const onSubmit = async (data: CreateListingForm) => {
    setIsSubmitting(true)
    
    try {
      const tags = data.tags ? data.tags.split(",").map(tag => tag.trim()).filter(Boolean) : []
      
      await createListing({
        ...data,
        currency: "DEVVE",
        tags
      })
      
      toast.success("Listing created successfully!")
      router.push("/dashboard/listings")
    } catch (error) {
      console.error("Error creating listing:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create listing")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Listing</h1>
        <p className="text-muted-foreground">
          List your service on the marketplace with instant escrow protection
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>
            Provide clear, detailed information about your service
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                placeholder="e.g., Custom React Component Development"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you'll deliver, your process, and what makes your service unique..."
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full p-2 border rounded-md"
                  {...register("category")}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceMinor">Price (DEVVE)</Label>
                <Input
                  id="priceMinor"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("priceMinor", { 
                    valueAsNumber: true,
                    setValueAs: (v) => Math.round(parseFloat(v) * 100) // Convert to minor units
                  })}
                />
                {errors.priceMinor && (
                  <p className="text-sm text-red-500">{errors.priceMinor.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryTimeHours">Delivery Time (hours)</Label>
              <Input
                id="deliveryTimeHours"
                type="number"
                min="1"
                placeholder="24"
                {...register("deliveryTimeHours", { valueAsNumber: true })}
              />
              {errors.deliveryTimeHours && (
                <p className="text-sm text-red-500">{errors.deliveryTimeHours.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements (Optional)</Label>
              <Textarea
                id="requirements"
                placeholder="What information do you need from the buyer to complete this service?"
                rows={3}
                {...register("requirements")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Optional)</Label>
              <Input
                id="tags"
                placeholder="react, javascript, frontend (comma-separated)"
                {...register("tags")}
              />
              <p className="text-sm text-muted-foreground">
                Separate tags with commas to help buyers find your service
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Escrow Protection</h3>
              <p className="text-sm text-blue-800">
                Your listing will be backed by Devve's atomic escrow system. Buyers pay into 
                escrow when they purchase, and funds are instantly released to you when they 
                confirm delivery satisfaction.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Listing"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}