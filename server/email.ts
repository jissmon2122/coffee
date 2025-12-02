// Resend integration for sending order confirmation emails
import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

export async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

interface OrderItem {
  name: string;
  quantity: number;
  customization: {
    size: string;
    milk: string;
    extras: string[];
  };
  totalPrice: number;
}

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupTime: string;
  specialInstructions?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}

function formatCustomization(item: OrderItem): string {
  const parts = [];
  parts.push(item.customization.size.charAt(0).toUpperCase() + item.customization.size.slice(1));
  if (item.customization.milk !== "none") {
    parts.push(item.customization.milk.charAt(0).toUpperCase() + item.customization.milk.slice(1) + " milk");
  }
  if (item.customization.extras.length > 0) {
    parts.push(...item.customization.extras.map(e => 
      e.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    ));
  }
  return parts.join(", ");
}

function generateOrderEmailHtml(order: OrderDetails): string {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">
        <strong>${item.quantity}x ${item.name}</strong><br/>
        <span style="color: #666; font-size: 14px;">${formatCustomization(item)}</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">
        $${item.totalPrice.toFixed(2)}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #8B4513; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Brew Haven</h1>
          <p style="color: #f5deb3; margin: 10px 0 0 0;">Artisan Coffee</p>
        </div>
        
        <!-- Confirmation Message -->
        <div style="padding: 30px; text-align: center;">
          <div style="width: 60px; height: 60px; background-color: #22c55e; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 30px;">✓</span>
          </div>
          <h2 style="color: #333; margin: 0 0 10px 0;">Order Confirmed!</h2>
          <p style="color: #666; margin: 0;">Thank you for your order, ${order.customerName}!</p>
        </div>
        
        <!-- Order Details Box -->
        <div style="margin: 0 30px 30px; background-color: #f9f5f1; border-radius: 8px; padding: 20px;">
          <div style="text-align: center; margin-bottom: 15px;">
            <p style="color: #666; margin: 0; font-size: 14px;">Order Number</p>
            <p style="color: #8B4513; margin: 5px 0 0 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">${order.orderNumber}</p>
          </div>
          <div style="text-align: center;">
            <p style="color: #666; margin: 0; font-size: 14px;">Pickup Time</p>
            <p style="color: #333; margin: 5px 0 0 0; font-size: 18px; font-weight: 600;">${order.pickupTime}</p>
          </div>
        </div>
        
        <!-- Order Items -->
        <div style="padding: 0 30px 30px;">
          <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${itemsHtml}
            <tr>
              <td style="padding: 12px; color: #666;">Subtotal</td>
              <td style="padding: 12px; text-align: right;">$${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 12px; color: #666;">Tax (8%)</td>
              <td style="padding: 12px; text-align: right;">$${order.tax.toFixed(2)}</td>
            </tr>
            <tr style="background-color: #f9f5f1;">
              <td style="padding: 12px; font-weight: bold;">Total</td>
              <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 18px; color: #8B4513;">$${order.total.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        ${order.specialInstructions ? `
        <!-- Special Instructions -->
        <div style="padding: 0 30px 30px;">
          <h3 style="color: #333; margin: 0 0 10px 0; font-size: 16px;">Special Instructions</h3>
          <p style="color: #666; margin: 0; padding: 15px; background-color: #f5f5f5; border-radius: 6px;">${order.specialInstructions}</p>
        </div>
        ` : ''}
        
        <!-- Footer -->
        <div style="background-color: #f9f5f1; padding: 25px 30px; text-align: center;">
          <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">
            Questions about your order? Contact us at<br/>
            <a href="tel:+15551234567" style="color: #8B4513;">+1 (555) 123-4567</a>
          </p>
          <p style="color: #999; margin: 0; font-size: 12px;">
            © ${new Date().getFullYear()} Brew Haven. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendOrderConfirmationEmail(order: OrderDetails): Promise<{ success: boolean; error?: string }> {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    
    const result = await client.emails.send({
      from: fromEmail || 'Brew Haven <onboarding@resend.dev>',
      to: order.customerEmail,
      subject: `Order Confirmed - ${order.orderNumber} | Brew Haven`,
      html: generateOrderEmailHtml(order),
    });

    if (result.error) {
      console.error('Email send error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('Order confirmation email sent:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
