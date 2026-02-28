// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AdminProvider } from "@/components/AdminContext";

export const metadata: Metadata = {
  title: "Little Butterfly — Fine Art",
  description:
    "Original paintings and fine art by Little Butterfly. Explore the gallery, learn about the artist, and commission original works.",
  openGraph: {
    title: "Little Butterfly — Fine Art",
    description: "Original paintings and fine art",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* AdminProvider wraps everything so any component can check isAdmin */}
        <AdminProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
