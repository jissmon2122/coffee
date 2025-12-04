// SMS integration for sending order confirmation messages
// Supports AWS SNS (FREE - 100/month) and Twilio (paid)
import twilio from 'twilio';
import AWS from 'aws-sdk';

let twilioClient: any = null;
let snsClient: AWS.SNS | null = null;

function getTwilioClient() {
  if (twilioClient) return twilioClient;
  
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  
  if (!accountSid || !authToken || !twilioPhone) {
    throw new Error('Twilio credentials not configured (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)');
  }
  
  twilioClient = twilio(accountSid, authToken);
  return twilioClient;
}

function getSNSClient() {
  if (snsClient) return snsClient;
  
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || 'us-east-1';
  
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials not configured (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)');
  }
  
  snsClient = new AWS.SNS({
    accessKeyId,
    secretAccessKey,
    region
  });
  
  return snsClient;
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

export async function sendOrderConfirmationSms(order: OrderDetails): Promise<{ success: boolean; error?: string }> {
  try {
    // Determine which provider to use
    const hasAWS = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY;
    const hasTwilio = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER;
    
    if (hasAWS) {
      return await sendViaSNS(order);
    } else if (hasTwilio) {
      return await sendViaTwilio(order);
    } else {
      console.log('[SMS] No SMS provider configured - skipping SMS send');
      return { success: false, error: 'SMS not configured' };
    }
  } catch (error) {
    console.error('[SMS] Failed to send SMS:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

async function sendViaSNS(order: OrderDetails): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getSNSClient();
    const toPhone = order.customerPhone;
    
    // Validate phone number format
    if (!toPhone || toPhone.length < 10) {
      console.warn('[AWS SNS] Invalid phone number:', toPhone);
      return { success: false, error: 'Invalid phone number' };
    }

    // Format phone number: add +1 prefix if US number
    const formattedPhone = toPhone.startsWith('+') ? toPhone : `+1${toPhone.replace(/\D/g, '')}`;
    
    console.log('[AWS SNS] Sending SMS to:', formattedPhone);
    
    const smsText = generateOrderSmsText(order);
    
    const params = {
      Message: smsText,
      PhoneNumber: formattedPhone,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: 'BrewHaven'
        },
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
    };

    const result = await client.publish(params).promise();

    console.log('[AWS SNS] Order confirmation SMS sent:', result.MessageId);
    return { success: true };
  } catch (error) {
    console.error('[AWS SNS] Failed to send SMS:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

async function sendViaTwilio(order: OrderDetails): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getTwilioClient();
    const fromPhone = process.env.TWILIO_PHONE_NUMBER!;
    const toPhone = order.customerPhone;
    
    // Validate phone number format
    if (!toPhone || toPhone.length < 10) {
      console.warn('[TWILIO] Invalid phone number:', toPhone);
      return { success: false, error: 'Invalid phone number' };
    }

    // Format phone number: add +1 prefix if US number
    const formattedPhone = toPhone.startsWith('+') ? toPhone : `+1${toPhone.replace(/\D/g, '')}`;
    
    console.log('[TWILIO] Sending SMS from:', fromPhone, 'to:', formattedPhone);
    
    const smsText = generateOrderSmsText(order);

    const result = await client.messages.create({
      body: smsText,
      from: fromPhone,
      to: formattedPhone
    });

    console.log('[TWILIO] Order confirmation SMS sent:', result.sid);
    return { success: true };
  } catch (error) {
    console.error('[TWILIO] Failed to send SMS:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function getSmsProvider() {
  return process.env.AWS_ACCESS_KEY_ID ? 'aws-sns' : (process.env.TWILIO_ACCOUNT_SID ? 'twilio' : null);
}
