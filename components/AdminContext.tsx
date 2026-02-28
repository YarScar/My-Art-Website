"use client";
// components/AdminContext.tsx
//
// This file does two things:
//  1. Creates a "context" — a way to share the admin-unlocked state across
//     every component in your app without passing props everywhere.
//  2. Renders the password modal popup that appears when you click 🦋.
//
// HOW THE LOCK WORKS:
//  - isAdmin = false  →  the "+ Add Artwork" button is hidden from everyone
//  - isAdmin = true   →  you've entered the correct password; button is visible
//  - The unlock lasts for the browser session (until you close the tab)

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

// ----- CONTEXT SHAPE -----
// This describes what data/functions the context will provide to other components.
type AdminContextType = {
  isAdmin: boolean;               // true = unlocked, false = locked
  openPasswordModal: () => void;  // call this to show the password popup
  lockAdmin: () => void;          // call this to lock admin mode immediately
};

// Create the context with safe defaults (locked, no-op function)
const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  openPasswordModal: () => {},
  lockAdmin: () => {},
});

// ----- CUSTOM HOOK -----
// Other components call  useAdmin()  instead of  useContext(AdminContext)
// It's just a shortcut that reads cleaner.
export function useAdmin() {
  return useContext(AdminContext);
}

// ----- PROVIDER COMPONENT -----
// Wrap your whole app in this so every component can access the context.
export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ----- RESTORE SESSION -----
  // When the page first loads, check sessionStorage.
  // sessionStorage keeps data alive while the tab is open but clears on close.
  // This means you don't have to re-enter the password on every page navigation.
  useEffect(() => {
    if (sessionStorage.getItem("adminUnlocked") === "true") {
      setIsAdmin(true);
    }
  }, []);

  // Auto-focus the password input when the modal opens
  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [modalOpen]);

  // ----- OPEN THE MODAL -----
  function openPasswordModal() {
    if (isAdmin) return; // already unlocked, no need to show modal
    setPassword("");
    setError("");
    setModalOpen(true);
  }

  // ----- LOCK ADMIN -----
  // Lets you log out of admin mode (used by the lock button inside AdminPanel)
  function lockAdmin() {
    setIsAdmin(false);
    sessionStorage.removeItem("adminUnlocked");
  }

  // ----- CHECK PASSWORD -----
  // Sends the typed password to POST /api/auth (server-side).
  // The actual password lives in .env and never touches the browser.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          // ✅ Correct password
          setIsAdmin(true);
          sessionStorage.setItem("adminUnlocked", "true"); // remember for this session
          setModalOpen(false);
          setPassword("");
        } else {
          setError("Wrong password. Try again.");
        }
      } else {
        setError("Wrong password. Try again.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setChecking(false);
    }
  }

  return (
    // Provide isAdmin, openPasswordModal, and lockAdmin to every child component
    <AdminContext.Provider value={{ isAdmin, openPasswordModal, lockAdmin }}>
      {children}

      {/* ----- PASSWORD MODAL ----- */}
      {/* Only renders when modalOpen is true (i.e. after clicking the 🦋) */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(20,5,40,0.7)", backdropFilter: "blur(10px)" }}
          onClick={() => setModalOpen(false)} // click outside to close
        >
          <div
            className="glass rounded-3xl p-8 w-full max-w-sm shadow-2xl"
            style={{
              animation: "fadeUp 0.3s ease forwards",
              boxShadow: "0 32px 80px rgba(74,16,112,0.5)",
            }}
            onClick={(e) => e.stopPropagation()} // don't close when clicking inside
          >
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-5xl block mb-3">🦋</span>
              <h2
                className="font-display text-2xl font-bold"
                style={{ color: "var(--plum-deep)" }}
              >
                Admin Access
              </h2>
              <p
                className="font-cormorant italic text-base mt-1"
                style={{ color: "var(--plum-rich)" }}
              >
                Enter your password to manage artworks.
              </p>
            </div>

            {/* Password form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-purple-200 bg-white/70 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all"
              />

              {/* Error message — shows if wrong password */}
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={checking || !password}
                  className="btn-primary flex-1 justify-center"
                >
                  {checking ? "Checking..." : "Unlock ✦"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminContext.Provider>
  );
}
