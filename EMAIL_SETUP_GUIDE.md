# 📧 How to Enable Email Notifications

## Quick Setup with Gmail (Recommended)

### Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** in the left menu
3. Enable **2-Step Verification** if not already enabled
4. Go back to **Security** and find **App passwords**
   - If you don't see "App passwords", make sure 2-Step Verification is enabled
5. Select **Mail** and **Windows Computer** (or your device)
6. Click **Generate**
7. Copy the **16-character password** (spaces are removed when pasting)

### Step 2: Update .env File

Edit `.env` file in the project root:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
NODE_ENV=development
PORT=5000
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `xxxx-xxxx-xxxx-xxxx` with the 16-character app password

### Step 3: Restart the Server

Kill the current server (Ctrl+C) and restart:

```bash
npm run dev
```

### Step 4: Test Email Sending

1. Go to http://localhost:5000
2. Browse and add coffee items to cart
3. Fill in the checkout form with a valid email address
4. Complete the order

You should receive a confirmation email within seconds!

---

## Email Information Sent

When an order is placed, customers receive an email with:

| Information | Details |
|---|---|
| **Order Number** | Unique ID for tracking (e.g., BH080166) |
| **Pickup Time** | When to collect the order |
| **Items Ordered** | Coffee names with customizations |
| **Customizations** | Size, milk type, extras |
| **Price Breakdown** | Subtotal, tax, total |
| **Special Instructions** | Any custom notes from customer |

### Example Email Content

```
Brew Haven - Order Confirmed!

Order Number: BH080166
Pickup Time: 45 minutes

Order Summary:
1x Iced Latte (Medium, Whole Milk)
  $5.25

Subtotal: $5.25
Tax (8%): $0.42
Total: $5.67

Special Instructions: Extra shot please

Questions? Contact us at +1 (555) 123-4567
```

---

## Troubleshooting

### ❌ "Gmail credentials not configured"
- Check that `GMAIL_USER` and `GMAIL_PASSWORD` are set in `.env`
- Ensure there are no extra spaces around the values
- Verify the app password is exactly 16 characters (spaces removed)

### ❌ "Authentication failed - Invalid credentials"
- Make sure 2-Step Verification is enabled on your Google Account
- The app password must be generated from the Google Account, not your regular password
- Try generating a new app password

### ❌ Email not received
- Check email spam/junk folder
- Verify customer email is correct in the order form
- Check server logs for errors (look for [GMAIL] messages)
- Gmail may take a few seconds to send

### ❌ "SMTP Error - 535 5.7.8"
- This means invalid credentials
- Regenerate app password from https://myaccount.google.com/apppasswords
- Make sure 2-Factor Authentication is enabled

### ✅ Successful email sends show:
```
[GMAIL] Sending email from: your-email@gmail.com to: customer@example.com
[GMAIL] Order confirmation email sent: <message-id>
```

---

## Email Provider Options

### Gmail (Current Setup)
- ✅ Easy to setup
- ✅ Free tier
- ✅ Good for development and small businesses
- ❌ Limited to 500 emails/day for free accounts

### Resend (Production Alternative)
- ✅ Designed for transactional emails
- ✅ Higher sending limits
- ✅ Better deliverability
- ❌ Requires custom domain for full features
- ❌ More setup required

To switch to Resend:
1. Sign up at https://resend.com
2. Get your API key
3. Use Replit Connectors to configure it
4. The app will automatically detect and use Resend

---

## Email Customization

To customize email appearance, edit `server/email.ts`:

- `generateOrderEmailHtml()` - Email template and styling
- Change coffee shop name from "Brew Haven" to your business name
- Modify colors, fonts, footer contact info
- Add logo or images

Example customizations in the email:
- Brand color: `#8B4513` (brown)
- Success color: `#22c55e` (green)
- Footer phone: `+1 (555) 123-4567`

---

## Admin Email Notifications (Optional)

Currently, only customers receive confirmation emails. To also send to admin:

1. Add to `.env`:
   ```env
   ADMIN_EMAIL=admin@yourcompany.com
   ```

2. Modify `server/routes.ts` to send admin copy:
   ```typescript
   // Send to admin as well
   await sendOrderConfirmationEmail({
     ...order,
     customerEmail: process.env.ADMIN_EMAIL
   });
   ```

---

## Testing with Different Email Addresses

The app works with any email provider (Gmail, Outlook, Yahoo, corporate email, etc.).

Test with multiple addresses:
- `john@gmail.com`
- `jane@example.com`
- `test@company.com`

All should receive the confirmation email within seconds.

---

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to Git (it's in `.gitignore`)
- App passwords are safer than account passwords
- Gmail app passwords can only be used for email
- If you suspect compromise, regenerate app password

---

## Next Steps

1. ✅ Generate Gmail app password
2. ✅ Update `.env` file
3. ✅ Restart server
4. ✅ Test with an order
5. ✅ Check email received
6. ✅ Customize email template if desired

Your email notifications are now ready! 🎉
