# 🏠 RoomFinder MP

A professional room rental React app for **Madhya Pradesh** — built with clean component architecture, Context API, and separated pages.

---

## 📁 Project Structure

```
roomfinder/
│
├── public/
│   └── index.html                  ← HTML entry point
│
├── src/
│   ├── index.js                    ← React DOM render entry
│   ├── App.jsx                     ← Main router (switches between pages)
│   │
│   ├── context/
│   │   └── AppContext.js           ← Global state (auth, wishlist, messages, navigation)
│   │
│   ├── data/
│   │   └── rooms.js                ← All room data, cities, tier colors, amenity icons
│   │
│   ├── components/
│   │   ├── Navbar.jsx              ← Top navigation bar
│   │   ├── RoomCard.jsx            ← Reusable room listing card
│   │   └── Toast.jsx               ← Notification toast popup
│   │
│   ├── pages/
│   │   ├── HomePage.jsx            ← Home page (hero, features, featured rooms, tiers)
│   │   ├── AuthPage.jsx            ← Login & Register page
│   │   ├── SearchPage.jsx          ← Browse & filter rooms page
│   │   ├── DetailPage.jsx          ← Room detail page (gallery, chat, contact)
│   │   ├── MessagesPage.jsx        ← All conversations inbox
│   │   └── MapPage.jsx             ← Map view with city-wise room listings
│   │
│   └── styles/
│       ├── global.css              ← Base CSS reset & body styles
│       └── theme.js                ← Shared design tokens & style helpers
│
├── .env                            ← Disables ESLint warnings
├── package.json                    ← Dependencies
└── README.md
```

---

## 🚀 How to Run

**Step 1 — Install Node.js** (if not installed)
Download from: https://nodejs.org (use LTS version)

**Step 2 — Open terminal inside the `roomfinder` folder**

**Step 3 — Install dependencies**
```bash
npm install
```

**Step 4 — Start the app**
```bash
npm start
```

App opens at: **http://localhost:3000**

---

## 🏙️ Cities Covered (10)
| City | Description |
|------|-------------|
| 🏛️ Bhopal | State Capital |
| 🏙️ Indore | Commercial Hub |
| 🏰 Gwalior | Historical City |
| 🌊 Jabalpur | Marble City |
| 🛕 Ujjain | Temple City |
| 🎓 Sagar | University City |
| 🦁 Rewa | White Tiger Land |
| 🏗️ Satna | Cement City |
| 🏺 Mandsaur | Historic Town |
| 🌿 Neemuch | Border Town |

---

## ✨ Features
- 🏠 **Home Page** — Hero, city quick-links, featured rooms, pricing tiers
- 🔐 **Auth** — Register & Login with localStorage persistence
- 🔍 **Search** — Filter by city, type, furnishing, tier, price range
- 📋 **Detail** — Image gallery with arrows, amenities, live chat, contact info
- 💬 **Messages** — Full inbox of all conversations with owners
- 🗺️ **Map** — City-wise room listings with Google Maps links
- ❤️ **Wishlist** — Save rooms (persisted to localStorage)
- 🔔 **Toast** — Notification feedback for all actions

---

## 🧠 Architecture

| File | Purpose |
|------|---------|
| `AppContext.js` | Single source of truth — all state lives here |
| `rooms.js` | Data layer — rooms, cities, constants |
| `App.jsx` | Router — reads `page` from context and renders the right page |
| `Navbar.jsx` | Calls `navigate()` from context |
| `RoomCard.jsx` | Uses `toggleWishlist()` and `navigate()` from context |
| Each Page | Reads from and writes to context — no prop drilling |

---

## 📦 Build for Production
```bash
npm run build
```
Output is in the `/build` folder — ready to deploy on Netlify, Vercel, or any static host.

---

## 🛠️ Tech Stack
- **React 18** with Hooks
- **Context API** for global state management
- **localStorage** for data persistence
- **Unsplash** for room images
- Pure inline styles + CSS — no external UI library needed
