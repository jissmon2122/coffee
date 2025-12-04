// Vonage (Nexmo) SMS integration - Free $2 credit
// Gets you ~25-30 SMS for free

import { Vonage } from "@vonage/server-sdk";

let vonageClient: Vonage | null = null;

function getVonageClient() {
  if (vonageClient) return vonageClient;
  
  const apiKey = process.env.VONAGE_API_KEY;
  const apiSecret = process.env.VONAGE_API_SECRET;
  
  if (!apiKey || !apiSecret) {
    throw new Error('Vonage credentials not configured (VONAGE_API_KEY, VONAGE_API_SECRET)');
  }
  
  vonageClient = new Vonage({
    apiKey: apiKey,
    apiSecret: apiSecret
  });
  
  return vonageClient;
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
  customerPhone: string;
  pickupTime: string;
  items: OrderItem[];
  total: number;
}

function formatItemsForSMS(items: OrderItem[]): string {
  return items
    .map(item => `${item.quantity}x ${item.name}`)
    .join(', ');
}

function generateOrderSmsText(order: OrderDetails): string {
  const itemsText = formatItemsForSMS(order.items);
  
  return `Brew Haven Order Confirmation!\n\nOrder #${order.orderNumber}\nPickup: ${order.pickupTime}\n\nItems: ${itemsText}\nTotal: $${order.total.toFixed(2)}\n\nThank you!`;
}

export async function sendOrderConfirmationSmsVonage(order: OrderDetails): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Vonage is configured
    if (!process.env.VONAGE_API_KEY || !process.env.VONAGE_API_SECRET) {
      console.log('[VONAGE] Vonage credentials not configured - skipping SMS send');
      return { success: false, error: 'Vonage SMS not configured' };
    }

    const client = getVonageClient();
    const toPhone = order.customerPhone;
    const fromName = process.env.VONAGE_FROM_NAME || 'BrewHaven';
    
    // Validate phone number format
    if (!toPhone || toPhone.length < 10) {
      console.warn('[VONAGE] Invalid phone number:', toPhone);
      return { success: false, error: 'Invalid phone number' };
    }

    // Format phone number: add +1 prefix if US number
    const formattedPhone = toPhone.startsWith('+') ? toPhone : `1${toPhone.replace(/\D/g, '')}`;
    
    console.log('[VONAGE] Sending SMS from Vonage to:', formattedPhone);
    
    const smsText = generateOrderSmsText(order);
    
    const result = await client.sms.send({
      to: formattedPhone,
      from: fromName,
      text: smsText
    });

    if (result.messages[0]['status'] === '0') {
      console.log('[VONAGE] Order confirmation SMS sent:', result.messages[0]['message-id']);
      return { success: true };
    } else {
      console.error('[VONAGE] Failed to send SMS:', result.messages[0]['error-text']);
      return { success: false, error: result.messages[0]['error-text'] };
    }
  } catch (error) {
    console.error('[VONAGE] Failed to send SMS:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function getVonageProvider() {
  return process.env.VONAGE_API_KEY ? 'vonage' : null;
}
