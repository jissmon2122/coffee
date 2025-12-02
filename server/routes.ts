import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createOrderSchema } from "@shared/schema";
import { sendOrderConfirmationEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Create a new order
  app.post("/api/orders", async (req, res) => {
    try {
      const parseResult = createOrderSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          error: "Invalid order data", 
          details: parseResult.error.errors 
        });
      }

      const order = await storage.createOrder(parseResult.data);

      // Send confirmation email
      const emailResult = await sendOrderConfirmationEmail({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        pickupTime: order.pickupTime,
        specialInstructions: order.specialInstructions,
        items: order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          customization: {
            size: item.customization.size,
            milk: item.customization.milk,
            extras: item.customization.extras,
          },
          totalPrice: item.totalPrice,
        })),
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
      });

      if (!emailResult.success) {
        console.warn("Email sending failed but order was created:", emailResult.error);
      }

      return res.status(201).json({ 
        order,
        emailSent: emailResult.success,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Get order by order number
  app.get("/api/orders/:orderNumber", async (req, res) => {
    try {
      const order = await storage.getOrderByNumber(req.params.orderNumber);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  return httpServer;
}
