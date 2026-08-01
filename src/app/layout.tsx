import type { Metadata } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "WishBloom - Animated Birthday Wish Generator",
  description:
    "Create personalized, full-screen animated birthday wish pages with custom messages, photo slideshows, background music, and floating particle effects. Share via WhatsApp or social link.",
  keywords: [
    "birthday wish generator",
    "animated birthday greeting",
    "personalized birthday page",
    "birthday surprise link",
    "WhatsApp birthday wish",
  ],
  openGraph: {
    title: "WishBloom - Create Birthday Surprises They Will Never Forget",
    description:
      "Craft full-screen animated birthday pages with photos, music, and confetti in under 2 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${outfit.variable} font-sans bg-slate-950 text-slate-100 antialiased selection:bg-pink-500 selection:text-white flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
