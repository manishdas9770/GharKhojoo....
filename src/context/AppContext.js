import { createContext, useContext, useState, useEffect } from "react";
import { ROOMS_DATA, STORAGE_KEY } from "../data/rooms";

const AppContext = createContext(null);

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// Step 1: Go to https://www.emailjs.com/ and create a free account
// Step 2: Create an Email Service (Gmail recommended) → copy "Service ID"
// Step 3: Create an Email Template with these variables:
//   {{admin_name}}, {{user_name}}, {{user_email}}, {{user_phone}},
//   {{room_title}}, {{room_id}}, {{booked_at}}
// Step 4: Copy "Template ID" and "Public Key"
// Step 5: Replace the values below:
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
// Public Key is set in public/index.html

// Admin email — this is where booking notifications will be sent
const ADMIN_NOTIFY_EMAIL = "your_real_email@gmail.com"; // ← apna asli email yahan daalo

function sendBookingEmailToAdmin({ userName, userEmail, userPhone, roomTitle, roomId }) {
  try {
    if (
      typeof window !== "undefined" &&
      window.emailjs &&
      EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID"
    ) {
      window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        admin_name:  "Admin",
        admin_email: ADMIN_NOTIFY_EMAIL,
        user_name:   userName,
        user_email:  userEmail,
        user_phone:  userPhone,
        room_title:  roomTitle,
        room_id:     roomId,
        booked_at:   new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      });
    }
  } catch (err) {
    console.error("EmailJS error:", err);
  }
}
// ─────────────────────────────────────────────────────────────────────────────

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function AppProvider({ children }) {
  const saved = loadFromStorage();

  const savedAccounts = saved?.accounts || [];
  const adminAccount = {
    name: "Admin",
    email: "admin@roomfinder.com",
    password: "admin123",
    phone: "+91 99999 99999",
  };

  function normalizeEmail(name) {
    const base = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ".")
      .replace(/[^a-z0-9.\\.]/g, "");
    return base + "@roomfinder.com";
  }

  const ownerNameToEmail = {};
  const ownerAccounts = [];
  ROOMS_DATA.forEach((room) => {
    const normalizedOwner = room.owner.trim();
    if (!ownerNameToEmail[normalizedOwner]) {
      let email = normalizeEmail(normalizedOwner);
      let suffix = 1;
      while (
        ownerAccounts.some((a) => a.email === email) ||
        email === adminAccount.email ||
        savedAccounts.some((a) => a.email === email)
      ) {
        email = `${normalizeEmail(normalizedOwner).replace(/@/, `.${suffix}@`)}`;
        suffix += 1;
      }
      ownerNameToEmail[normalizedOwner] = email;
      ownerAccounts.push({
        name: normalizedOwner,
        email,
        password: "owner123",
        phone: room.ownerPhone || "",
      });
    }
  });

  const mergedAccounts = [...savedAccounts];
  if (!mergedAccounts.some((a) => a.email === adminAccount.email)) {
    mergedAccounts.unshift(adminAccount);
  }
  ownerAccounts.forEach((owner) => {
    if (!mergedAccounts.some((a) => a.email === owner.email)) {
      mergedAccounts.push(owner);
    }
  });

  const ownerEmailsSet = new Set(ownerAccounts.map((a) => a.email));

  // Auth state
  const [user, setUser]         = useState(saved?.user || null);
  const [accounts, setAccounts] = useState(mergedAccounts);

  // Navigation state
  const [page, setPage]               = useState("home");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Feature state
  const [wishlist, setWishlist]   = useState(saved?.wishlist || []);
  const [messages, setMessages]   = useState(saved?.messages || {});
  const [requests, setRequests]   = useState(saved?.requests || []);
  const [toast, setToast]         = useState(null);

  // Persist to localStorage
  useEffect(() => {
    saveToStorage({ user, accounts, wishlist, messages, requests });
  }, [user, accounts, wishlist, messages, requests]);

  // Toast helper
  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  // Navigation helper
  function navigate(targetPage, room = null) {
    setPage(targetPage);
    if (room) setSelectedRoom(room);
    window.scrollTo(0, 0);
  }

  // Auth actions
  function login(email, password) {
    const found = accounts.find(
      (a) => a.email === email && a.password === password
    );
    if (!found) return "Incorrect email or password.";
    setUser(found);
    showToast("Welcome back, " + found.name + "! 👋");
    if (found.email === adminAccount.email) navigate("admin");
    else if (ownerEmailsSet.has(found.email)) navigate("owner");
    else navigate("home");
    return null;
  }

  function register(name, email, password, phone) {
    if (accounts.find((a) => a.email === email))
      return "This email is already registered.";
    const newUser = { name, email, password, phone };
    setAccounts((prev) => [...prev, newUser]);
    setUser(newUser);
    showToast("Welcome, " + name + "! 🎉");
    navigate("home");
    return null;
  }

  function logout() {
    showModal({
      title: "Confirm logout",
      message: "Are you sure you want to logout?",
      onConfirm: () => {
        setUser(null);
        navigate("home");
        showToast("You have been logged out.");
        hideModal();
      },
      onCancel: () => {
        hideModal();
      },
    });
  }

  // Modal state
  const [modal, setModal] = useState({ visible: false, title: "", message: "", onConfirm: null, onCancel: null });

  function showModal({ title = "", message = "", onConfirm = null, onCancel = null }) {
    setModal({ visible: true, title, message, onConfirm, onCancel });
  }

  function hideModal() {
    setModal((m) => ({ ...m, visible: false }));
  }

  // Wishlist actions
  function toggleWishlist(id) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
    const inList = wishlist.includes(id);
    showToast(inList ? "Removed from wishlist" : "Saved to wishlist ❤️");
  }

  // Messaging actions
  function sendMessage(roomId, text) {
    if (!user) { navigate("auth"); return; }
    if (!text.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const role = isAdmin ? "admin" : "user";
    const msg = { text: text.trim(), from: role, authorEmail: user.email, time };

    const adminKey = adminAccount.email + "_" + roomId;

    setMessages((prev) => {
      const next = { ...prev };
      if (isAdmin) {
        const adminConvo = next[adminKey] || [];
        const userMsg = adminConvo.find((m) => m.from === "user" && m.authorEmail);
        if (userMsg) {
          const targetKey = userMsg.authorEmail + "_" + roomId;
          next[targetKey] = [...(next[targetKey] || []), msg];
        }
        next[adminKey] = [...(next[adminKey] || []), msg];
      } else {
        const userKey = user.email + "_" + roomId;
        next[userKey] = [...(next[userKey] || []), msg];
        next[adminKey] = [...(next[adminKey] || []), msg];
      }
      return next;
    });
  }

  function bookRoom(roomId) {
    if (!user) { navigate("auth"); return; }
    const room = ROOMS_DATA.find((r) => r.id === roomId);
    if (!room) return;

    const alreadyRequested = requests.some(
      (req) => req.roomId === roomId && req.userEmail === user.email
    );
    if (alreadyRequested) {
      showToast("You already sent a booking request for this room.");
      return;
    }

    const request = {
      id: Date.now(),
      roomId,
      roomTitle: room.title,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      ownerName: room.owner,
      ownerEmail: ownerNameToEmail[room.owner],
      status: "Pending",
      isNew: true, // ← admin ko badge dikhane ke liye
      createdAt: new Date().toLocaleString([], {
        hour: "2-digit", minute: "2-digit", day: "numeric", month: "short",
      }),
    };

    setRequests((prev) => [request, ...prev]);
    showToast("Booking request sent! ✅");

    // ── Email notification to admin ──────────────────────────────────────────
    sendBookingEmailToAdmin({
      userName:  user.name,
      userEmail: user.email,
      userPhone: user.phone,
      roomTitle: room.title,
      roomId:    roomId,
    });
    // ─────────────────────────────────────────────────────────────────────────
  }

  function approveRequest(requestId) {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "Approved", isNew: false } : req
      )
    );
    showToast("Request approved.");
  }

  function rejectRequest(requestId) {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "Rejected", isNew: false } : req
      )
    );
    showToast("Request rejected.");
  }

  // Mark all requests as seen (clears new badge)
  function markRequestsSeen() {
    setRequests((prev) => prev.map((req) => ({ ...req, isNew: false })));
  }

  function getAdminRequests() {
    return [...requests].sort((a, b) => b.id - a.id);
  }

  function getNewRequestsCount() {
    return requests.filter((r) => r.isNew).length;
  }

  function getOwnerRequests() {
    if (!user) return [];
    return requests
      .filter((req) => req.ownerEmail === user.email)
      .sort((a, b) => b.id - a.id);
  }

  function getOwnerRooms() {
    if (!user) return [];
    return ROOMS_DATA.filter((room) => ownerNameToEmail[room.owner] === user.email);
  }

  function getMessages(roomId) {
    if (!user) return [];
    return messages[user.email + "_" + roomId] || [];
  }

  function getAllConversations() {
    if (!user) return [];
    return Object.entries(messages)
      .filter(([key]) => key.startsWith(user.email + "_"))
      .map(([key, msgs]) => {
        const roomId = parseInt(key.split("_")[1]);
        const room = ROOMS_DATA.find((r) => r.id === roomId);
        return { room, msgs, key };
      })
      .filter((c) => c.room);
  }

  function getAdminConversations() {
    if (!user) return [];
    const adminKey = adminAccount.email + "_";
    return Object.entries(messages)
      .filter(([key]) => key.startsWith(adminKey))
      .map(([key, msgs]) => {
        const roomId = parseInt(key.split("_")[1]);
        const room = ROOMS_DATA.find((r) => r.id === roomId);
        const last = msgs[msgs.length - 1];
        const userMsg = msgs.slice().reverse().find((m) => m.from !== "admin" && m.authorEmail);
        const userEmail = userMsg?.authorEmail || msgs.find((m) => m.authorEmail)?.authorEmail || null;
        return { key, room, msgs, last, userEmail };
      })
      .filter((c) => c.room)
      .sort((a, b) => ((b.last?.time || "") > (a.last?.time || "") ? 1 : -1));
  }

  const isAdmin = user?.email?.toLowerCase() === "admin@roomfinder.com";
  const isOwner = user && ownerEmailsSet.has(user.email) && !isAdmin;

  return (
    <AppContext.Provider
      value={{
        // Data
        rooms: ROOMS_DATA,
        // Auth
        user, accounts, login, register, logout,
        // Navigation
        page, navigate, selectedRoom,
        // Wishlist
        wishlist, toggleWishlist,
        // Messages
        sendMessage, getMessages, getAllConversations,
        // Booking requests
        requests, bookRoom, approveRequest, rejectRequest,
        getAdminRequests, markRequestsSeen, getNewRequestsCount,
        isAdmin, isOwner, getOwnerRequests, getOwnerRooms,
        // Admin messages
        getAdminConversations,
        // Toast
        toast, showToast,
        // Modal
        modal, showModal, hideModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
