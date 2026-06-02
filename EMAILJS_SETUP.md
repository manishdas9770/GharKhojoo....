# 📧 Email Notification Setup Guide (EmailJS)

Jab bhi koi user room book kare, aapko apne Gmail par turant notification milega.

---

## Step 1 — EmailJS Account Banao

1. Jao: https://www.emailjs.com/
2. **Sign Up** karo (free plan mein 200 emails/month milte hain)

---

## Step 2 — Email Service Connect Karo

1. Dashboard mein jao → **Email Services** → **Add New Service**
2. **Gmail** chuniyo
3. Apna Gmail account connect karo
4. **Service ID** copy karo (e.g. `service_abc123`)

---

## Step 3 — Email Template Banao

1. **Email Templates** → **Create New Template**
2. Template mein yeh content daalo:

**Subject:**
```
🏠 Naya Booking Request: {{room_title}}
```

**Body:**
```
Namaskar Admin,

Ek naya room booking request aaya hai!

━━━━━━━━━━━━━━━━━━━━
👤 User Details
━━━━━━━━━━━━━━━━━━━━
Naam:    {{user_name}}
Email:   {{user_email}}
Phone:   {{user_phone}}

━━━━━━━━━━━━━━━━━━━━
🏠 Room Details
━━━━━━━━━━━━━━━━━━━━
Room:    {{room_title}}
Room ID: {{room_id}}
Time:    {{booked_at}}

Admin Panel kholne ke liye login karein.
━━━━━━━━━━━━━━━━━━━━

— GharKhojo System
```

3. **To Email** field mein apna Gmail daalo ya `{{admin_email}}` variable use karo
4. **Save** karo
5. **Template ID** copy karo (e.g. `template_xyz789`)

---

## Step 4 — Public Key Copy Karo

1. **Account** → **General** → **Public Key** copy karo (e.g. `user_AbCdEfGhIj`)

---

## Step 5 — Project mein Values Update Karo

### File: `public/index.html`
```html
<!-- Yahan apna Public Key daalo -->
emailjs.init({ publicKey: "YOUR_EMAILJS_PUBLIC_KEY" });
```
Replace karo `YOUR_EMAILJS_PUBLIC_KEY` → aapka actual Public Key

---

### File: `src/context/AppContext.js`
```js
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // ← Step 2 se
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // ← Step 3 se
const ADMIN_NOTIFY_EMAIL  = "your_email@gmail.com"; // ← apna Gmail
```

---

## Step 6 — Build & Deploy

```bash
cd roomfinder
npm run build
```

GitHub Pages par deploy karo normally.

---

## ✅ Test Kaise Karein

1. Koi doosra account banao (ya incognito mein jaao)
2. Koi bhi room open karo → **Book Now** click karo
3. Aapke Gmail par ek email aana chahiye!
4. Admin panel mein bhi request dikhegi with 🔴 **NEW** badge

---

## ⚠️ Agar Email Na Aaye

- EmailJS dashboard mein **Email History** check karo
- Public Key, Service ID, Template ID dobara verify karo
- Gmail mein **Spam folder** check karo

---

## 🔐 Admin Login Credentials

| Field    | Value                     |
|----------|---------------------------|
| Email    | admin@roomfinder.com      |
| Password | admin123                  |

> Agar change karna hai: `AppContext.js` mein `adminAccount` object update karo.
