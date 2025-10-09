"use client"

import { Settings2, User, Users, Package, Shield, Store, DollarSign } from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "../_components/nav-main"
import { NavUser } from "../_components/nav-user"
import { TeamSwitcher } from "../_components/team-switcher"

export function AppSidebar({
  userData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userData: {
    name: string
    email: string
    avatar: string
    membership: string
  }
}) {
  const data = {
    user: userData,
    teams: [
      {
        name: "DevScrow",
        logo: Shield,
        plan: "Marketplace"
      }
    ],
    navMain: [
      {
        title: "Marketplace",
        url: "#",
        icon: Store,
        items: [
          {
            title: "Browse Services",
            url: "/marketplace"
          },
          {
            title: "My Listings",
            url: "/dashboard/listings"
          },
          {
            title: "Create Listing",
            url: "/dashboard/listings/new"
          }
        ]
      },
      {
        title: "Escrows",
        url: "#",
        icon: Shield,
        items: [
          {
            title: "My Escrows",
            url: "/dashboard/escrows"
          },
          {
            title: "As Buyer",
            url: "/dashboard/escrows?tab=buyer"
          },
          {
            title: "As Seller", 
            url: "/dashboard/escrows?tab=seller"
          }
        ]
      },
      {
        title: "Wallet",
        url: "#",
        icon: DollarSign,
        items: [
          {
            title: "Balance",
            url: "/dashboard/wallet"
          },
          {
            title: "Transactions",
            url: "/dashboard/wallet/transactions"
          }
        ]
      },
      {
        title: "Account",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Profile",
            url: "/dashboard/account"
          },
          {
            title: "Marketplace Profile",
            url: "/dashboard/profile-setup"
          },
          {
            title: "Billing",
            url: "/dashboard/billing"
          },
          {
            title: "Support",
            url: "/dashboard/support"
          }
        ]
      }
    ]
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
