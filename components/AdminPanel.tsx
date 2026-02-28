"use client";
// components/AdminPanel.tsx
// This component is the admin panel. It has THREE tabs:
//   1. "Add / Edit Artwork" — form to create a new artwork OR edit an existing one
//   2. "Manage Artworks"    — list all artworks with Edit and Delete buttons
//   3. "Messages"           — inbox of contact form submissions

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// ----- TYPE DEFINITIONS -----
// A "type" describes what shape the data will be.

// Describes one artwork row from the database
type Artwork = {
  id: number;
  title: string;
  description: string;
  long?: string | null;
  image?: string | null;
  price: number;
  medium?: string | null;
  dimensions?: string | null;
  year?: number | null;
  sold: boolean;
  tags: string[];
  createdAt: string;
};

// Describes one message row from the database
type Message = {
  id: number;
  name: string | null;
  email: string | null;
  message: string;
  createdAt: string;
};

type ArtworkForm = {
  title: string;
  description: string;
  long: string;
  price: string;
  medium: string;
  dimensions: string;
  year: string;
  sold: boolean;
  tags: string;
  image: string;
};

const empty: ArtworkForm = {
  title: "",
  description: "",
  long: "",
  price: "",
  medium: "",
  dimensions: "",
  year: "",
  sold: false,
  tags: "",
  image: "",
};

export default function AdminPanel({
  onClose,
  onSaved,
  onUpdated,
  onDeleted,
}: {
  onClose: () => void;
  onSaved: (artwork: any) => void;       // called after creating a new artwork
  onUpdated: (artwork: any) => void;     // called after editing an existing artwork
  onDeleted: (id: number) => void;       // called after deleting an artwork
}) {
  // ----- TAB STATE -----
  // Controls which tab is visible. Starts on "artwork" (the create/edit form).
  const [tab, setTab] = useState<"artwork" | "manage" | "messages">("artwork");

  // ----- ARTWORK FORM STATE -----
  const [form, setForm] = useState<ArtworkForm>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // ----- EDIT MODE STATE -----
  // editingId is null when creating a new artwork.
  // When you click "Edit" on an existing artwork, editingId is set to that artwork's id.
  // The form submit checks this: null → POST (create), number → PUT (update)
  const [editingId, setEditingId] = useState<number | null>(null);

  // ----- MANAGE ARTWORKS STATE -----
  // Holds the list of all artworks loaded from the database for the Manage tab.
  const [manageArtworks, setManageArtworks] = useState<Artwork[]>([]);
  const [manageLoading, setManageLoading] = useState(false);
  const [manageError, setManageError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null); // tracks which row is being deleted

  // ----- MESSAGES STATE -----
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [msgError, setMsgError] = useState("");

  // ----- FETCH ALL ARTWORKS (for Manage tab) -----
  // Calls GET /api/artworks → Prisma translates to: SELECT * FROM "Artwork"
  async function fetchManageArtworks() {
    setManageLoading(true);
    setManageError("");
    try {
      const res = await fetch("/api/artworks");
      if (!res.ok) throw new Error("Failed to load artworks");
      const data: Artwork[] = await res.json();
      setManageArtworks(data);
    } catch {
      setManageError("Could not load artworks. Try again.");
    } finally {
      setManageLoading(false);
    }
  }

  // ----- FETCH MESSAGES (for Messages tab) -----
  // Calls GET /api/contact → Prisma translates to: SELECT * FROM "Message"
  async function fetchMessages() {
    setMsgLoading(true);
    setMsgError("");
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to load messages");
      const data: Message[] = await res.json();
      setMessages(data);
    } catch {
      setMsgError("Could not load messages. Try again.");
    } finally {
      setMsgLoading(false);
    }
  }

  // ----- AUTO-LOAD DATA WHEN SWITCHING TABS -----
  // useEffect re-runs whenever "tab" changes.
  useEffect(() => {
    if (tab === "messages") fetchMessages();
    if (tab === "manage") fetchManageArtworks();
  }, [tab]);

  // ----- START EDITING AN ARTWORK -----
  // Called when you click the Edit ✏️ button next to an artwork in the Manage tab.
  // It pre-fills the form with that artwork's data and switches to the form tab.
  function startEdit(artwork: Artwork) {
    setEditingId(artwork.id); // remember which artwork we're editing
    setForm({
      title: artwork.title,
      description: artwork.description,
      long: artwork.long ?? "",
      price: String(artwork.price),
      medium: artwork.medium ?? "",
      dimensions: artwork.dimensions ?? "",
      year: artwork.year ? String(artwork.year) : "",
      sold: artwork.sold,
      tags: artwork.tags.join(", "),
      image: artwork.image ?? "",
    });
    setError("");
    setTab("artwork"); // switch to the form tab
  }

  // ----- CANCEL EDITING -----
  // Resets the form back to blank and clears edit mode.
  function cancelEdit() {
    setEditingId(null);
    setForm(empty);
    setError("");
  }

  // ----- DELETE AN ARTWORK -----
  // Calls DELETE /api/artworks/[id] → Prisma: DELETE FROM "Artwork" WHERE id = ...
  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this artwork? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/artworks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      // Remove from the manage list immediately (no need to re-fetch)
      setManageArtworks((prev) => prev.filter((a) => a.id !== id));
      // Tell WorkGallery to remove it from the gallery too
      onDeleted(id);
    } catch {
      alert("Could not delete. Try again.");
    } finally {
      setDeletingId(null);
    }
  }

  function set(key: keyof ArtworkForm, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) set("image", data.url);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  // ----- FORM SUBMIT: CREATE or UPDATE -----
  // If editingId is set → calls PUT /api/artworks/[id] (update)
  // If editingId is null → calls POST /api/artworks (create new)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description || !form.price) {
      setError("Title, description, and price are required.");
      return;
    }
    setSaving(true);
    setError("");

    // Build the data object to send — same shape for both create and update
    const payload = {
      title: form.title,
      description: form.description,
      long: form.long || null,
      price: parseFloat(form.price),
      medium: form.medium || null,
      dimensions: form.dimensions || null,
      year: form.year ? parseInt(form.year) : null,
      sold: form.sold,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      image: form.image || null,
    };

    try {
      let artwork: Artwork;
      if (editingId !== null) {
        // ----- UPDATE existing artwork -----
        // PUT /api/artworks/[id] → Prisma: UPDATE "Artwork" SET ... WHERE id = ...
        const res = await fetch(`/api/artworks/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update");
        artwork = await res.json();
        onUpdated(artwork);  // tell WorkGallery to update this card in the gallery
        // Also update the artwork inside the manage list
        setManageArtworks((prev) => prev.map((a) => (a.id === editingId ? artwork : a)));
        setEditingId(null);  // exit edit mode
        setForm(empty);      // reset form to blank
        setTab("manage");    // go back to the manage list
      } else {
        // ----- CREATE new artwork -----
        // POST /api/artworks → Prisma: INSERT INTO "Artwork" (...) VALUES (...)
        const res = await fetch("/api/artworks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to save");
        artwork = await res.json();
        onSaved(artwork);  // tell WorkGallery to add this card to the gallery
        setForm(empty);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle =
    "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 bg-white/70";
  const inputClass = `${inputStyle} border-purple-200 focus:ring-purple-300 focus:border-purple-400`;
  const labelClass = "block text-xs font-medium mb-1.5";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(20,5,40,0.65)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl glass rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
        style={{
          animation: "fadeUp 0.35s ease forwards",
          boxShadow: "0 32px 80px rgba(74,16,112,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-7">
          {/* ----- HEADER ROW: title + close button ----- */}
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-display text-2xl font-bold"
              style={{ color: "var(--plum-deep)" }}
            >
              {/* The title changes depending on which tab is active */}
              {tab === "artwork"
                ? editingId !== null
                  ? "Edit Artwork ✦"
                  : "Add New Artwork ✦"
                : tab === "manage"
                ? "Manage Artworks ✦"
                : "Messages Inbox ✦"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
              style={{ background: "var(--plum-rich)" }}
            >
              ✕
            </button>
          </div>

          {/* ----- TAB SWITCHER BUTTONS ----- */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {/* Add/Edit Artwork tab */}
            <button
              onClick={() => { setTab("artwork"); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === "artwork" ? "text-white" : "text-purple-700 bg-purple-50 hover:bg-purple-100"
              }`}
              style={tab === "artwork" ? { background: "var(--plum-rich)" } : {}}
            >
              {editingId !== null ? "✏️ Editing" : "+ Add Artwork"}
            </button>
            {/* Manage Artworks tab */}
            <button
              onClick={() => setTab("manage")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === "manage" ? "text-white" : "text-purple-700 bg-purple-50 hover:bg-purple-100"
              }`}
              style={tab === "manage" ? { background: "var(--plum-rich)" } : {}}
            >
              Manage Artworks
            </button>
            {/* Messages tab */}
            <button
              onClick={() => setTab("messages")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === "messages" ? "text-white" : "text-purple-700 bg-purple-50 hover:bg-purple-100"
              }`}
              style={tab === "messages" ? { background: "var(--plum-rich)" } : {}}
            >
              Messages {messages.length > 0 && `(${messages.length})`}
            </button>
          </div>

          {/* ----- MESSAGES TAB CONTENT ----- */}
          {/* This section only renders when the "messages" tab is active */}
          {tab === "messages" && (
            <div>
              {/* Refresh button — click to re-fetch latest messages from database */}
              <div className="flex justify-end mb-3">
                <button
                  onClick={fetchMessages}
                  className="btn-outline !py-1.5 !px-3 !text-xs"
                  disabled={msgLoading}
                >
                  {msgLoading ? "Loading..." : "↻ Refresh"}
                </button>
              </div>

              {/* Show an error message if the fetch failed */}
              {msgError && (
                <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl mb-3">
                  {msgError}
                </p>
              )}

              {/* Show a loading spinner while data is being fetched */}
              {msgLoading && (
                <p className="text-center py-8 text-sm" style={{ color: "var(--plum-rich)" }}>
                  Loading messages...
                </p>
              )}

              {/* Show an empty state message if there are no messages yet */}
              {!msgLoading && messages.length === 0 && !msgError && (
                <p className="text-center py-8 text-sm" style={{ color: "var(--plum-rich)" }}>
                  No messages yet. They will appear here when someone fills out the contact form.
                </p>
              )}

              {/* ----- MESSAGES TABLE ----- */}
              {/* Maps over the messages array and renders one row per message */}
              {!msgLoading && messages.length > 0 && (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {messages.map((msg) => (
                    // Each message gets a card. msg.id is used as a unique "key" (React requires this)
                    <div
                      key={msg.id}
                      className="rounded-2xl p-4 border border-purple-100 bg-white/60"
                    >
                      {/* Top row: name, email, and date */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <span className="font-medium text-sm" style={{ color: "var(--plum-deep)" }}>
                          {/* If name is null/empty, show "Anonymous" instead */}
                          {msg.name || "Anonymous"}
                        </span>
                        {msg.email && (
                          // Only show the email badge if an email was provided
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                          >
                            {msg.email}
                          </a>
                        )}
                        <span className="text-xs ml-auto" style={{ color: "var(--plum-rich)", opacity: 0.6 }}>
                          {/* Format the date into something readable like "Feb 28, 2026" */}
                          {new Date(msg.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      {/* The actual message text */}
                      <p className="text-sm leading-relaxed" style={{ color: "var(--plum-rich)" }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ----- MANAGE ARTWORKS TAB CONTENT ----- */}
          {/* Lists every artwork with Edit and Delete buttons */}
          {tab === "manage" && (
            <div>
              <div className="flex justify-end mb-3">
                <button
                  onClick={fetchManageArtworks}
                  className="btn-outline !py-1.5 !px-3 !text-xs"
                  disabled={manageLoading}
                >
                  {manageLoading ? "Loading..." : "↻ Refresh"}
                </button>
              </div>

              {manageError && (
                <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl mb-3">{manageError}</p>
              )}
              {manageLoading && (
                <p className="text-center py-8 text-sm" style={{ color: "var(--plum-rich)" }}>Loading artworks...</p>
              )}
              {!manageLoading && manageArtworks.length === 0 && !manageError && (
                <p className="text-center py-8 text-sm" style={{ color: "var(--plum-rich)" }}>
                  No artworks yet. Use the Add Artwork tab to create one.
                </p>
              )}

              {/* One row per artwork */}
              {!manageLoading && manageArtworks.length > 0 && (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {manageArtworks.map((artwork) => (
                    <div
                      key={artwork.id}
                      className="flex items-center gap-3 rounded-2xl p-3 border border-purple-100 bg-white/60"
                    >
                      {/* Thumbnail — shows the artwork image or a placeholder emoji */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-100 to-violet-200">
                        {artwork.image ? (
                          <Image src={artwork.image} alt={artwork.title} fill className="object-cover" />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center text-2xl opacity-40">🎨</span>
                        )}
                      </div>

                      {/* Title + price */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate" style={{ color: "var(--plum-deep)" }}>
                          {artwork.title}
                        </p>
                        <p className="text-xs" style={{ color: "var(--plum-mid)" }}>
                          ${artwork.price.toFixed(2)} {artwork.sold && "· Sold"}
                        </p>
                      </div>

                      {/* Edit button — pre-fills the form with this artwork's data */}
                      <button
                        onClick={() => startEdit(artwork)}
                        className="text-xs px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors flex-shrink-0"
                      >
                        ✏️ Edit
                      </button>

                      {/* Delete button — calls DELETE /api/artworks/[id] */}
                      <button
                        onClick={() => handleDelete(artwork.id)}
                        disabled={deletingId === artwork.id}
                        className="text-xs px-3 py-1.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                      >
                        {deletingId === artwork.id ? "..." : "🗑 Delete"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ----- ARTWORK FORM TAB CONTENT ----- */}
          {/* This section only renders when the "artwork" tab is active */}
          {tab === "artwork" && (
            <form onSubmit={handleSubmit} className="space-y-4">

            {/* If we're editing, show a notice with a cancel button */}
            {editingId !== null && (
              <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-purple-50 border border-purple-200">
                <p className="text-sm" style={{ color: "var(--plum-rich)" }}>
                  ✏️ Editing artwork #{editingId}
                </p>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-xs text-purple-600 underline hover:no-underline"
                >
                  Cancel — start fresh
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={labelClass}
                  style={{ color: "var(--plum-rich)" }}
                >
                  Title *
                </label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Violet Dream"
                />
              </div>
              <div>
                <label
                  className={labelClass}
                  style={{ color: "var(--plum-rich)" }}
                >
                  Price (USD) *
                </label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="e.g. 450"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label
                className={labelClass}
                style={{ color: "var(--plum-rich)" }}
              >
                Short Description *
              </label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={2}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="A brief description shown on the card..."
              />
            </div>

            <div>
              <label
                className={labelClass}
                style={{ color: "var(--plum-rich)" }}
              >
                Full Description
              </label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={4}
                value={form.long}
                onChange={(e) => set("long", e.target.value)}
                placeholder="Full story and details about this piece..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className={labelClass}
                  style={{ color: "var(--plum-rich)" }}
                >
                  Medium
                </label>
                <input
                  className={inputClass}
                  value={form.medium}
                  onChange={(e) => set("medium", e.target.value)}
                  placeholder="e.g. Oil on Canvas"
                />
              </div>
              <div>
                <label
                  className={labelClass}
                  style={{ color: "var(--plum-rich)" }}
                >
                  Dimensions
                </label>
                <input
                  className={inputClass}
                  value={form.dimensions}
                  onChange={(e) => set("dimensions", e.target.value)}
                  placeholder="e.g. 60 × 80 cm"
                />
              </div>
              <div>
                <label
                  className={labelClass}
                  style={{ color: "var(--plum-rich)" }}
                >
                  Year
                </label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.year}
                  onChange={(e) => set("year", e.target.value)}
                  placeholder="e.g. 2024"
                />
              </div>
            </div>

            <div>
              <label
                className={labelClass}
                style={{ color: "var(--plum-rich)" }}
              >
                Tags (comma-separated)
              </label>
              <input
                className={inputClass}
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="e.g. abstract, purple, large format"
              />
            </div>

            {/* Image upload */}
            <div>
              <label
                className={labelClass}
                style={{ color: "var(--plum-rich)" }}
              >
                Image
              </label>
              <div className="flex gap-2">
                <input
                  className={`${inputClass} flex-1`}
                  value={form.image}
                  onChange={(e) => set("image", e.target.value)}
                  placeholder="URL or upload below"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="btn-outline !py-2 !px-4 !text-xs whitespace-nowrap"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload File"}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
            </div>

            {/* Sold toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => set("sold", !form.sold)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  form.sold ? "bg-purple-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                    form.sold ? "left-5.5 translate-x-0.5" : "left-0.5"
                  }`}
                />
              </button>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--plum-rich)" }}
              >
                Mark as Sold
              </span>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn-primary flex-1 justify-center"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                  ? "Save Changes ✦"
                  : "Save Artwork ✦"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}
