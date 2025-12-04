# 🚀 AWS SNS Setup - Step by Step

## Step 1: Create AWS Account (2 minutes)

1. Go to: https://aws.amazon.com
2. Click "Create an AWS Account"
3. Enter email and password
4. Choose "Personal" account type
5. Enter phone number for verification
6. Add payment method (won't be charged for free tier)
7. Verify phone number with code
8. Complete setup

---

## Step 2: Create IAM User (3 minutes)

1. Go to AWS Console: https://console.aws.amazon.com
2. Search for "IAM" in the search bar
3. Click "IAM" from results
4. In left menu, click "Users"
5. Click "Create user"
6. Enter username: `BrewHaven`
7. Click "Next"
8. Click "Attach policies directly"
9. Search for: `AmazonSNSFullAccess`
10. Check the box next to it
11. Click "Next"
12. Click "Create user"

---

## Step 3: Create Access Key (2 minutes)

1. Click on the user "BrewHaven" you just created
2. Go to "Security credentials" tab
3. Scroll down to "Access keys"
4. Click "Create access key"
5. Choose "Command Line Interface (CLI)"
6. Check the box: "I understand..."
7. Click "Create access key"
8. **Important:** Copy both:
   - **Access Key ID** (starts with AKIA)
   - **Secret Access Key**
   - Save them somewhere safe!

---

## Step 4: Update .env File (1 minute)

Edit your `.env` file:

```env
# Email Configuration - Gmail SMTP
GMAIL_USER=jissmonjolly5215@gmail.com
GMAIL_PASSWORD=anolfkwsndpkytet

# SMS Configuration - AWS SNS (FREE: 100 SMS/month)
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1

# Environment
NODE_ENV=development
PORT=5000
```

**Replace with YOUR values:**
- Copy your Access Key ID
- Copy your Secret Access Key

---

## Step 5: Restart Server (1 minute)

Kill the current server and restart:

```bash
npm run dev
```

---

## Step 6: Test SMS (1 minute)

1. Open http://localhost:5000
2. Add coffee to cart
3. Go to checkout
4. Fill in your info:
   - Name: Your name
   - Email: Your email
   - Phone: **Your phone number** (10 digits or with +1)
   - Pickup time: Select time
5. Click "Place Order"
6. **Check your phone for SMS within 5 seconds!** 📱

---

## 📱 Expected SMS

You should receive:
```
Brew Haven Order Confirmation!

Order #BH847915
Pickup: 45 minutes

Items: 1x Cappuccino
Total: $5.13

Thank you!
```

---

## ✅ Success Signs

Server logs should show:
```
[AWS SNS] Sending SMS from AWS SNS to: +12015551234
[AWS SNS] Order confirmation SMS sent: 1234567890
```

---

## ❌ Troubleshooting

### "AWS credentials not configured"
- Check .env file has AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
- No spaces around = signs
- Restart server after updating

### "Invalid phone number"
- Must be 10+ digits
- Can use +1 prefix: +12015551234
- System auto-formats

### "Access denied" error
- Check Secret Access Key is correct
- Regenerate access key if needed

### No SMS received
- Check phone for SMS (give it 10 seconds)
- Check spam messages
- Check server logs for errors

---

## 💰 Free Tier Details

- **100 SMS per month** - FREE
- **Valid for 12 months** - From account creation
- **After 12 months** - $0.00645 per SMS
- **Example:** 100 orders/month = $0.65/month (Year 2+)

---

## 🎯 You're All Set!

Once you add the credentials and restart:
- ✅ Email confirmations work
- ✅ SMS confirmations work
- ✅ Both automatic
- ✅ FREE for first 12 months

Total cost for 100 orders/month: **$0!** 🎉

---

## 📊 System Now Has

```
Customer Orders
     ↓
┌────┴────┐
│         │
↓         ↓
Email    SMS
Gmail    AWS SNS
(Free)   (FREE: 100/mo)
│         │
└────┬────┘
     ↓
Customer Gets Both! ✓
```

---

**Your Coffee Shop Order system is now complete with FREE email + SMS!** 📧📱
