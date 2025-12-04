# 📱 SMS Setup Guide - Twilio Integration

## Overview

Your Coffee Shop Order application now supports **SMS notifications** in addition to email. Customers will receive order confirmations via text message to their phone number.

---

## Quick Setup (5 Minutes)

### Step 1: Create a Twilio Account

1. Go to: https://www.twilio.com/console
2. Sign up for a free trial account
3. Verify your phone number
4. You'll get $20 in free trial credits

### Step 2: Get Your Twilio Credentials

1. On Twilio Console dashboard, find:
   - **Account SID** - Your account identifier
   - **Auth Token** - Your authentication password
   - Copy these values

2. Get a Twilio Phone Number:
   - Go to "Phone Numbers" → "Manage"
   - Click "Get Your First Twilio Phone Number"
   - Choose a phone number (US +1 numbers are available)
   - Example: `+12015551234`

### Step 3: Update .env File

Edit `.env` file:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+12015551234
```

**Example:**
```env
TWILIO_ACCOUNT_SID=ACf4d9c5f9f8d7e6c5b4a3f2e1d0c9b8a
TWILIO_AUTH_TOKEN=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
TWILIO_PHONE_NUMBER=+12015551234
```

### Step 4: Restart Server

```bash
npm run dev
```

### Step 5: Test SMS

1. Visit http://localhost:5000
2. Place an order with a valid phone number
3. Check your phone for SMS confirmation within seconds

---

## SMS Message Format

```
Brew Haven Order Confirmation!

Order #BH847915
Pickup: 45 minutes

Items: 1x Cappuccino
Total: $5.13

Thank you!
```

---

## What Customers Receive

When they place an order, they get:
- ✅ Order confirmation number
- ✅ Pickup time
- ✅ Items ordered
- ✅ Total price
- ✅ Thank you message

**All in one text message!**

---

## Twilio Pricing

### Free Trial
- ✅ $20 trial credits
- ✅ Send to verified numbers only
- ✅ Great for testing

### Pay-as-You-Go (After Trial)
- 💰 ~$0.0075 per SMS in US
- 💰 ~$0.015 per SMS internationally
- Example: 1000 SMS = ~$7.50

### Upgrade Options
- 📦 Pay-as-you-go: Pay per SMS
- 📦 Pro plans: $20-$3000+ per month

---

## Finding Your Credentials

### Where to Find Account SID & Auth Token

1. Go to https://www.twilio.com/console
2. Look at the top of the page
3. You'll see:
   ```
   Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxx
   Auth Token: xxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. Click "View" next to Auth Token to reveal it

### Where to Find Phone Number

1. In Twilio Console, click "Phone Numbers"
2. Click "Manage"
3. Your phone number will be listed
4. Copy it including the +1 prefix

---

## Step-by-Step: Get Twilio Credentials

### Getting Account SID & Auth Token

```
Twilio Console
    ↓
Dashboard
    ↓
Top right corner shows:
  Account SID: ACxxxxxxxx...
  Auth Token: [View to see]
    ↓
Copy both values
    ↓
Update .env file
```

### Getting Phone Number

```
Twilio Console
    ↓
Phone Numbers (left menu)
    ↓
Manage Phone Numbers
    ↓
Your number: +12015551234
    ↓
Copy this number
    ↓
Add to .env TWILIO_PHONE_NUMBER
```

---

## Phone Number Format

The system accepts multiple formats and converts them:

| Format | Example | Converted To |
|--------|---------|-------------|
| 10 digits | 2015551234 | +12015551234 |
| With dashes | 201-555-1234 | +12015551234 |
| With parens | (201) 555-1234 | +12015551234 |
| With + prefix | +12015551234 | +12015551234 |
| International | +442071838750 | +442071838750 |

**The system will automatically format them correctly!**

---

## Testing SMS During Trial

### Free Trial Limitations

✅ Can send SMS to verified phone numbers  
❌ Cannot send to unverified numbers  

### How to Verify Numbers

1. Go to Twilio Console
2. Navigate to "Verified Caller IDs"
3. Add your phone number
4. Verify via text confirmation
5. Now can receive SMS from Twilio

### Trial Quota

- Free $20 trial credits
- Good for ~2,500 SMS messages
- Expires after 30 days or when credits run out

---

## Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| **Twilio credentials not configured** | Missing .env variables | Add TWILIO credentials to .env |
| **Invalid phone number** | Number too short or invalid | Use 10+ digit number, try format: +1XXXXXXXXXX |
| **Authentication failed** | Wrong credentials | Check Account SID & Auth Token in .env |
| **SMT not sent but order created** | Trial/quota limits | Verify phone number is added to trial |
| **Message says "queued"** | Twilio received it | Give it 5-10 seconds to deliver |

---

## Configuration Options

### Minimum Setup (SMS Only)
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+12015551234
```

### Full Setup (Email + SMS)
```env
# Gmail
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password

# Twilio SMS
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+12015551234

# Environment
NODE_ENV=development
PORT=5000
```

---

## Advanced: Customizing SMS Message

To customize the SMS text, edit `server/sms.ts`:

```typescript
function generateOrderSmsText(order: OrderDetails): string {
  // Modify this to change SMS message format
  return `Custom message: ${order.orderNumber}...`;
}
```

The SMS has a 160 character limit (standard SMS). Keep it brief!

---

## Troubleshooting

### SMS Not Received

**Check 1:** Is Twilio configured?
- Open .env file
- Make sure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER are filled

**Check 2:** Phone number format
- Try with +1 prefix: +12015551234
- Remove special characters

**Check 3:** Trial account limits
- Free trial can only send to verified numbers
- Add your number to verified list first

**Check 4:** Server logs
- Look for: `[SMS] Order confirmation SMS sent:`
- Or error: `[SMS] Failed to send SMS:`

### Auth Error: 20003

**Cause:** Invalid credentials  
**Solution:**
1. Get new credentials from https://www.twilio.com/console
2. Update .env file
3. Restart server

### Invalid Phone Number Error

**Cause:** Phone format wrong  
**Solution:**
1. Use format: +1 followed by 10 digits
2. Example: +12015551234
3. Or just 10 digits: 2015551234 (auto-formatted)

---

## Email + SMS Flow

```
Customer Orders
    ↓
Order Created
    ↓
┌─────────────┬─────────────┐
│             │             │
↓             ↓             ↓
Send Email   Send SMS    Send Notification
(Gmail)     (Twilio)    (On-screen)
│             │
└─────────────┴──────────────┐
                             ↓
                        Return Response
                        
Response shows:
{
  "order": {...},
  "emailSent": true,
  "smsSent": true
}
```

---

## After Trial: Going Production

Once free trial ends, you have options:

1. **Pay-as-You-Go**
   - Add credit card
   - Pay $0.0075 per SMS (US)
   - Perfect for small businesses

2. **Upgrade Plan**
   - Monthly subscription
   - Higher volume discounts
   - Priority support

3. **Switch Provider**
   - AWS SNS
   - Firebase Cloud Messaging
   - Custom SMS gateway

---

## Security Notes

⚠️ **Important:**
- Never commit `.env` to Git (already in .gitignore)
- Auth Token is sensitive like a password
- Regenerate Auth Token if compromised
- Use environment variables, never hardcode credentials

---

## Current Implementation

### Supported
✅ Order confirmation SMS  
✅ Multiple phone formats  
✅ Error handling  
✅ Server-side only (secure)  

### Future Enhancements
📱 SMS status updates (order ready, cancelled)  
📱 Two-way SMS (customer texts for status)  
📱 Appointment reminders  
📱 Promotional SMS  

---

## Testing Checklist

```
□ Create Twilio account
□ Get credentials
□ Update .env file
□ Restart server
□ Place test order
□ Check phone for SMS
□ Verify message content
□ Check order in database
```

---

## Quick Reference

| What | Where | Example |
|------|-------|---------|
| Account SID | Twilio Console Dashboard | ACf4d9c5f9... |
| Auth Token | Twilio Console Dashboard | a1b2c3d4e... |
| Phone Number | Phone Numbers → Manage | +12015551234 |
| Free Trial Amount | Console | $20 USD |
| SMS Cost | Pay-as-you-go | $0.0075 per SMS (US) |

---

## Support Resources

- **Twilio Docs:** https://www.twilio.com/docs/sms
- **Twilio Console:** https://www.twilio.com/console
- **Status:** Check server logs for [SMS] messages

---

**SMS notifications are now ready to use! 📱**
