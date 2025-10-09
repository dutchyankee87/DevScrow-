import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getListings } from "@/actions/listings"
import { getProfile } from "@/actions/profiles"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { Plus, Clock, DollarSign, Eye } from "lucide-react"

export default async function ListingsPage() {
  const { userId } = await auth()
  const { profile } = await getProfile()
  const { listings } = await getListings({ sellerId: userId || undefined })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Listings</h1>
          <p className="text-muted-foreground">
            Manage your service listings and track sales
          </p>
        </div>
        
        {profile?.canSell && (
          <Link href="/dashboard/listings/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Listing
            </Button>
          </Link>
        )}
      </div>

      {profile && !profile.canSell && (
        <Card>
          <CardHeader>
            <CardTitle>Enable Selling Capability</CardTitle>
            <CardDescription>
              To create listings, you need to enable selling capability in your profile.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/dashboard/profile-setup">
              <Button>Update Profile</Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      {listings.length === 0 && profile?.canSell ? (
        <Card>
          <CardHeader>
            <CardTitle>No listings yet</CardTitle>
            <CardDescription>
              Create your first listing to start selling on the marketplace.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/dashboard/listings/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Listing
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {listing.description}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={listing.status === "ACTIVE" ? "default" : "secondary"}
                  >
                    {listing.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    {(listing.priceMinor / 100).toFixed(2)} {listing.currency}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {listing.deliveryTimeHours}h
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span className="text-xs">Category:</span>
                  <Badge variant="outline" className="text-xs">
                    {listing.category}
                  </Badge>
                </div>
                
                {listing.tags && listing.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {listing.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex gap-2">
                <Link href={`/listings/${listing.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </Link>
                <Link href={`/dashboard/listings/${listing.id}/edit`} className="flex-1">
                  <Button size="sm" className="w-full">
                    Edit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}