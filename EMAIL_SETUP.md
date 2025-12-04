# Email Configuration Setup

## Current Status
The application currently uses **Resend** email service. The email functionality is partially working but limited:
- ✅ Emails are sent when orders are created
- ❌ Limited to sending only to the Resend account owner's email address

## How to Enable Full Email Functionality

### Option 1: Use Resend (Recommended for Production)

1. **Create a Resend Account**
   - Go to https://resend.com
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Add a Custom Domain**
   - In Resend dashboard, add your custom domain
   - Verify DNS records as instructed
   - Once verified, you can send from your domain

3. **Set Environment Variables**
   - Set `RESEND_API_KEY` to your API key
   - In Replit: Use the Connectors feature to connect Resend
   - Or set it in a `.env` file:
     ```
     RESEND_API_KEY=your_api_key_here
     ```

4. **How Emails Will Be Sent**
   - Customer receives order confirmation at their email
   - Sender will be: `Brew Haven <noreply@yourdomain.com>`

### Option 2: Use Gmail SMTP (Alternative for Development)

If you want to use Gmail instead of Resend:

1. **Install nodemailer**
   ```
   npm install nodemailer
   npm install -D @types/nodemailer
   ```

2. **Create a Gmail App Password**
   - Enable 2-Factor Authentication on your Gmail account
   - Go to https://myaccount.google.com/apppasswords
   - Generate an app-specific password for "Mail"
   - Copy the 16-character password

3. **Update the email.ts file** (see instructions in the repository)

4. **Set Environment Variables**
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=your-app-password
   ```

### Email Flow
```
1. Customer submits order form → Order created in database
2. Order confirmation email is generated with:
   - Order number
   - Pickup time
   - Items ordered with customizations
   - Total price
   - Special instructions (if any)
3. Email is sent to customer's email address
4. Email is also sent to admin (optional)
```

### What Information is Sent in Email
- **Order Number**: Unique identifier for tracking
- **Customer Name**: Personalized greeting
- **Pickup Time**: When to collect the order
- **Item Details**: Coffee names with customizations (size, milk, extras)
- **Price Breakdown**: Subtotal, tax, and total
- **Special Instructions**: Any custom notes

## Testing Email
1. Fill out the order form with a valid email address
2. Complete the checkout
3. Check the email inbox for the order confirmation

## Troubleshooting

### "Resend not connected" Error
- Ensure your Resend credentials are properly set in environment variables
- Check that the API key is valid

### Email Not Received
- Check spam/junk folder
- Verify the email address is correct in the order form
- Check server logs for email sending errors
- Ensure sender email domain is verified (if using custom domain)

### Only Owner Receives Emails
- This is the default behavior with Resend's test email
- Add and verify a custom domain in Resend to enable sending to all addresses
