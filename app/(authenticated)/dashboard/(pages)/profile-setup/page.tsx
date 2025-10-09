"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { createOrUpdateProfile } from "@/actions/profiles"
import { toast } from "sonner"

export default function ProfileSetupPage() {
  const [loading, setLoading] = useState(false)
  const [canBuy, setCanBuy] = useState(true)
  const [canSell, setCanSell] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      const data = {
        displayName: formData.get("displayName") as string,
        canBuy,
        canSell,
        bio: formData.get("bio") as string || undefined
      }

      const result = await createOrUpdateProfile(data)
      
      if (result.success) {
        toast.success("Profile created successfully!")
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Setup Your Marketplace Profile</h1>
        <p className="text-muted-foreground">
          Complete your profile to start using the DevvE marketplace
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            This information will be visible to other users on the marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                name="displayName"
                placeholder="Your display name"
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Marketplace Capabilities</Label>
              <p className="text-sm text-muted-foreground">
                Choose what you'd like to do on the marketplace. You can enable both!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox 
                    id="canBuy"
                    checked={canBuy}
                    onCheckedChange={(checked) => setCanBuy(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="canBuy" className="font-medium cursor-pointer">
                      🛒 Buyer Capability
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Purchase services with atomic escrow protection
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox 
                    id="canSell"
                    checked={canSell}
                    onCheckedChange={(checked) => setCanSell(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="canSell" className="font-medium cursor-pointer">
                      💼 Seller Capability
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Create listings and offer services
                    </p>
                  </div>
                </div>
              </div>

              {!canBuy && !canSell && (
                <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded">
                  ⚠️ Please select at least one capability to use the marketplace
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell others about yourself..."
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading || (!canBuy && !canSell)} 
              className="w-full"
            >
              {loading ? "Creating Profile..." : "Create Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <p className="text-sm text-yellow-800">
            <strong>DevvE Integration:</strong> You can change your role later and connect your DevvE wallet 
            from the dashboard. The marketplace currently runs in mock mode for safe testing.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}