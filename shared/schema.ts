import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Order item customization schema
export const orderItemCustomizationSchema = z.object({
  size: z.enum(["small", "medium", "large"]),
  milk: z.enum(["whole", "skim", "oat", "almond", "none"]),
  extras: z.array(z.string()),
  sweetness: z.number().min(0).max(100),
});

// Order item schema
export const orderItemSchema = z.object({
  productId: z.number(),
  name: z.string(),
  quantity: z.number().min(1),
  customization: orderItemCustomizationSchema,
  totalPrice: z.number(),
});

// Order creation schema
export const createOrderSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(1, "Phone number is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  specialInstructions: z.string().optional(),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
});

export type OrderItemCustomization = z.infer<typeof orderItemCustomizationSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;

export interface Order extends CreateOrder {
  id: string;
  orderNumber: string;
  createdAt: Date;
  status: "pending" | "preparing" | "ready" | "completed";
}
