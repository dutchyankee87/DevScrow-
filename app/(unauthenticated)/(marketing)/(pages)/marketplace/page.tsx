import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getListings } from "@/actions/listings"
import Link from "next/link"
import { Clock, Shield, Search, Filter, Grid, List, ChevronDown } from "lucide-react"

export default async function MarketplacePage() {
  const { listings } = await getListings({ limit: 12 })

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Services</h1>
        <p className="text-muted-foreground">Find professional services with guaranteed escrow protection</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search services (e.g. 'React development', 'SEO audit', 'brand design')" 
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          "All Services",
          "Software Development", 
          "Marketing & Growth",
          "Design & Creative",
          "AI & Automation",
          "Business Intelligence",
          "Blockchain & Web3",
          "Consulting"
        ].map((category) => (
          <Badge 
            key={category}
            variant={category === "All Services" ? "default" : "outline"}
            className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing {listings.length} services
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Sort by:
          <Button variant="ghost" size="sm" className="h-8">
            Relevance <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-xs">{listing.category}</Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {listing.deliveryTimeHours}h
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-2 hover:text-primary cursor-pointer">
                {listing.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 text-sm">
                {listing.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              {listing.tags && listing.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {listing.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    ${(listing.priceMinor / 100).toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground">{listing.currency}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Shield className="h-3 w-3 text-green-500" />
                    Escrow Protected
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Link href={`/listings/${listing.id}`} className="w-full">
                <Button className="w-full" size="sm">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-16">
          <div className="mb-6">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No services found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We're building our marketplace of professional services. Check back soon or be the first to list your services!
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/signup">
              <Button>List Your Services</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Load More */}
      {listings.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Services
          </Button>
        </div>
      )}
    </div>
  )
}