# 🚀 QUICK EMAIL SETUP - Step by Step

## ⏱️ Time Required: 5 minutes

---

## STEP 1️⃣: Get Your Gmail App Password (2 min)

1. Open browser and go to: https://myaccount.google.com/apppasswords
2. Sign in if not already signed in
3. You should see a page saying "App passwords"
   - If you see "This option isn't available", you need to enable 2-Factor Authentication first
   - Go to Security tab → Enable 2-Step Verification first, then come back here
4. Under "Select the app and device you're using":
   - **App:** Select "Mail"
   - **Device:** Select "Windows Computer"
5. Click **Generate**
6. A popup shows a 16-character password with spaces: `xxxx xxxx xxxx xxxx`
7. Copy this password (the system removes spaces automatically)

**Example:** `hxyz bcde fghi jklm` becomes `hxyzbcdefghijklm`

---

## STEP 2️⃣: Update the .env File (1 min)

1. In VS Code, open the file: `.env` in the project root
   ```
   CoffeeShopOrder/.env
   ```

2. Replace the placeholder values with your Gmail info:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=hxyzbcdefghijklm
   NODE_ENV=development
   PORT=5000
   ```

   **Example:**
   ```env
   GMAIL_USER=jissmonjolly75@gmail.com
   GMAIL_PASSWORD=hxyzbcdefghijklm
   NODE_ENV=development
   PORT=5000
   ```

3. Save the file (Ctrl+S)

---

## STEP 3️⃣: Restart the Server (1 min)

1. Go to the terminal where the server is running
2. Press **Ctrl+C** to stop the current server
3. Run this command:
   ```bash
   npm run dev
   ```
4. You should see:
   ```
   [express] serving on port 5000
   ```

---

## STEP 4️⃣: Test Email (1 min)

1. Open http://localhost:5000 in your browser
2. Select a coffee (e.g., "Iced Latte")
3. Click "Add to Cart"
4. Click "View Cart" or go to checkout
5. Fill in the form:
   - **Name:** Your Name
   - **Email:** Your email address
   - **Phone:** Your phone number
   - **Pickup Time:** Select a time
6. Click **Place Order**

---

## STEP 5️⃣: Check Your Email ✅

1. Go to your email inbox
2. Look for an email from "Brew Haven" with subject like:
   ```
   Order Confirmed - BH080166 | Brew Haven
   ```
3. If not there, check **Spam/Junk** folder
4. Click the email to view order details

**You should see:**
- ✅ Order number
- ✅ Pickup time
- ✅ Items ordered with customizations
- ✅ Total price
- ✅ Your name personalized greeting

---

## ✨ Done! Your Email System is Working!

If you received the email, your setup is complete! 🎉

**What happens now:**
- Every time a customer places an order, they receive a confirmation email
- The email comes from your Gmail address
- It includes all order details

---

## ❌ Troubleshooting

### Problem: Email not received

**Check 1:** Look in Spam folder
- Gmail sometimes puts first emails there
- Mark as "Not Spam" to add to whitelist

**Check 2:** Verify .env file
- Open `.env` file
- Make sure `GMAIL_USER` and `GMAIL_PASSWORD` are filled in
- No spaces around the = sign

**Check 3:** Check server logs
- Look at the terminal where server is running
- You should see: `[GMAIL] Order confirmation email sent: ...`
- If you see an error, copy it

**Check 4:** Restart server
- Stop server (Ctrl+C)
- Run: `npm run dev`
- Try placing order again

### Problem: "Gmail credentials not configured"

**Solution:**
- Edit `.env` file
- Make sure GMAIL_USER line is NOT commented out (no # at start)
- Save file
- Restart server

### Problem: "Authentication failed - Invalid credentials"

**Solution:**
- Go back to Step 1
- Generate a NEW app password
- Update .env with the new password
- Restart server

### Problem: Still having issues?

Check the detailed guide:
- See: `EMAIL_SETUP_GUIDE.md` file in the project
- Has full troubleshooting section

---

## 📝 Summary

You now have:
- ✅ Gmail configured
- ✅ `.env` file with credentials
- ✅ Server restarted
- ✅ Email tested and working

**All customers will automatically receive order confirmation emails!**

---

## 🔒 Security Tip

The `.env` file contains your Gmail app password:
- ✅ DO: Keep it safe and secure
- ✅ DO: Regenerate password if you suspect it's compromised
- ❌ DON'T: Share it with anyone
- ❌ DON'T: Commit it to Git
- ❌ DON'T: Upload to public websites

---

## 🎯 Next Time

Next time you want to run the server:
1. Open terminal in project folder
2. Run: `npm run dev`
3. Go to: http://localhost:5000
4. Emails will automatically work!

The `.env` file is permanent - you only set it up once!
