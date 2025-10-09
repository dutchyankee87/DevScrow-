import { getCustomerByUserId } from "@/actions/customers"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardClientLayout from "./_components/layout-client"

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect("/login")
  }

  const customer = await getCustomerByUserId(user.id)

  // Create customer with pro membership if they don't exist
  if (!customer) {
    const { createCustomer } = await import("@/actions/customers")
    await createCustomer(user.id)
    // Redirect to refresh the page with the new customer data
    redirect("/dashboard")
  }

  const userData = {
    name:
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || "User",
    email: user.emailAddresses[0]?.emailAddress || "",
    avatar: user.imageUrl,
    membership: customer.membership
  }

  return (
    <DashboardClientLayout userData={userData}>
      {children}
    </DashboardClientLayout>
  )
}
