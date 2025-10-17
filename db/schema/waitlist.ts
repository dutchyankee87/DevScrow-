import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const ctsWaitlist = pgTable("cts_waitlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name"),
  company: text("company"),
  useCase: text("use_case"),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export type InsertCtsWaitlist = typeof ctsWaitlist.$inferInsert
export type SelectCtsWaitlist = typeof ctsWaitlist.$inferSelect