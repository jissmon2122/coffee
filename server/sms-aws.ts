// AWS SNS SMS integration - FREE tier SMS
// 100 free SMS per month (first 12 months)
// $0.00645 per SMS after free tier

import AWS from 'aws-sdk';

let snsClient: AWS.SNS | null = null;

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

export async function sendOrderConfirmationSmsSNS(order: OrderDetails): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if AWS SMS is configured
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.log('[AWS SNS] AWS credentials not configured - skipping SMS send');
      return { success: false, error: 'AWS SMS not configured' };
    }

    const client = getSNSClient();
    const toPhone = order.customerPhone;
    
    // Validate phone number format (basic validation)
    if (!toPhone || toPhone.length < 10) {
      console.warn('[AWS SNS] Invalid phone number:', toPhone);
      return { success: false, error: 'Invalid phone number' };
    }

    // Format phone number: add +1 prefix if US number
    const formattedPhone = toPhone.startsWith('+') ? toPhone : `+1${toPhone.replace(/\D/g, '')}`;
    
    console.log('[AWS SNS] Sending SMS from AWS SNS to:', formattedPhone);
    
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

export function getAWSProvider() {
  return process.env.AWS_ACCESS_KEY_ID ? 'aws-sns' : null;
}
