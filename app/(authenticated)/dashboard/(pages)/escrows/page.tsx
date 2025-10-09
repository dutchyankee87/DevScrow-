import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getMyEscrows } from "@/actions/escrows"
import { getProfile } from "@/actions/profiles"
import Link from "next/link"
import { Clock, DollarSign, Package, User, Shield, AlertTriangle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default async function EscrowsPage() {
  const { profile } = await getProfile()
  const { escrows: buyerEscrows } = await getMyEscrows("buyer")
  const { escrows: sellerEscrows } = await getMyEscrows("seller")

  const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "CREATED": return "secondary"
      case "RESERVED": return "outline" 
      case "FUNDED": return "default"
      case "DELIVERED": return "outline"
      case "COMPLETED": return "default"
      case "REFUNDED": return "destructive"
      case "DISPUTED": return "destructive"
      case "EXPIRED": return "secondary"
      default: return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CREATED": return <Clock className="h-4 w-4" />
      case "RESERVED": return <Shield className="h-4 w-4" />
      case "FUNDED": return <DollarSign className="h-4 w-4" />
      case "DELIVERED": return <Package className="h-4 w-4" />
      case "COMPLETED": return <Shield className="h-4 w-4" />
      case "DISPUTED": return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const EscrowCard = ({ escrow, role }: { escrow: { id: string; buyerId: string; sellerId: string; status: string; amountMinor: number; currency: string; createdAt: Date | string; deliveredAt?: Date | string | null; completedAt?: Date | string | null; reservedUntil?: Date | string | null }, role: "buyer" | "seller" }) => (
    <Card key={escrow.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Escrow #{escrow.id.slice(-8)}</CardTitle>
            <CardDescription>
              {role === "buyer" ? "Purchased from" : "Sold to"} {role === "buyer" ? escrow.sellerId : escrow.buyerId}
            </CardDescription>
          </div>
          <Badge variant={getStatusColor(escrow.status)} className="flex items-center gap-1">
            {getStatusIcon(escrow.status)}
            {escrow.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Amount:</span>
          <span className="font-semibold">
            {(escrow.amountMinor / 100).toFixed(2)} {escrow.currency}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Created:</span>
          <span>{formatDistanceToNow(new Date(escrow.createdAt), { addSuffix: true })}</span>
        </div>
        
        {escrow.deliveredAt && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Delivered:</span>
            <span>{formatDistanceToNow(new Date(escrow.deliveredAt), { addSuffix: true })}</span>
          </div>
        )}
        
        {escrow.completedAt && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Completed:</span>
            <span>{formatDistanceToNow(new Date(escrow.completedAt), { addSuffix: true })}</span>
          </div>
        )}

        {escrow.reservedUntil && escrow.status === "RESERVED" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-sm text-yellow-800">
              Reserved until {new Date(escrow.reservedUntil).toLocaleString()}
            </p>
          </div>
        )}
        
        <div className="flex gap-2">
          <Link href={`/dashboard/escrows/${escrow.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          
          {/* Quick Actions */}
          {role === "buyer" && escrow.status === "RESERVED" && (
            <Button size="sm" className="flex-1">
              Fund Escrow
            </Button>
          )}
          
          {role === "buyer" && escrow.status === "DELIVERED" && (
            <Button size="sm" className="flex-1">
              Accept & Release
            </Button>
          )}
          
          {role === "seller" && escrow.status === "FUNDED" && (
            <Button size="sm" className="flex-1">
              Upload Delivery
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Escrows</h1>
        <p className="text-muted-foreground">
          Track your purchases and sales with atomic escrow protection
        </p>
      </div>

      <Tabs defaultValue="buyer" className="space-y-6">
        <TabsList>
          <TabsTrigger value="buyer" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            As Buyer ({buyerEscrows.length})
          </TabsTrigger>
          <TabsTrigger value="seller" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            As Seller ({sellerEscrows.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buyer" className="space-y-4">
          {buyerEscrows.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No purchases yet</CardTitle>
                <CardDescription>
                  Browse the marketplace to find services you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/marketplace">
                  <Button>Browse Marketplace</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {buyerEscrows.map((escrow) => (
                <EscrowCard key={escrow.id} escrow={escrow} role="buyer" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="seller" className="space-y-4">
          {sellerEscrows.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No sales yet</CardTitle>
                <CardDescription>
                  Create listings to start selling on the marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/listings/new">
                  <Button>Create Listing</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {sellerEscrows.map((escrow) => (
                <EscrowCard key={escrow.id} escrow={escrow} role="seller" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}