"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = exports.orderItemSchema = exports.orderItemCustomizationSchema = exports.insertUserSchema = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
    username: true,
    password: true,
});
// Order item customization schema
exports.orderItemCustomizationSchema = zod_1.z.object({
    size: zod_1.z.enum(["small", "medium", "large"]),
    milk: zod_1.z.enum(["whole", "skim", "oat", "almond", "none"]),
    extras: zod_1.z.array(zod_1.z.string()),
    sweetness: zod_1.z.number().min(0).max(100),
});
// Order item schema
exports.orderItemSchema = zod_1.z.object({
    productId: zod_1.z.number(),
    name: zod_1.z.string(),
    quantity: zod_1.z.number().min(1),
    customization: exports.orderItemCustomizationSchema,
    totalPrice: zod_1.z.number(),
});
// Order creation schema
exports.createOrderSchema = zod_1.z.object({
    customerName: zod_1.z.string().min(1, "Name is required"),
    customerEmail: zod_1.z.string().email("Valid email is required"),
    customerPhone: zod_1.z.string().min(1, "Phone number is required"),
    pickupTime: zod_1.z.string().min(1, "Pickup time is required"),
    specialInstructions: zod_1.z.string().optional(),
    items: zod_1.z.array(exports.orderItemSchema).min(1, "At least one item is required"),
    subtotal: zod_1.z.number(),
    tax: zod_1.z.number(),
    total: zod_1.z.number(),
});
