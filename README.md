# WishBloom 🌸 - Animated Birthday Wish Generator

WishBloom is a modern, mobile-responsive web application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Supabase**. It empowers users to create personalized, full-screen animated birthday surprise pages with custom messages, photo slideshows, background music, floating particle effects, and share them instantly via unique links on WhatsApp, Messenger, and social media.

---

## ✨ Features

- 🎨 **5 Distinct Visual Themes**: Romantic Glow, Midnight Luxury, Colorful Party, Cute Pastel, and Minimal Dark Mode.
- 📸 **Photo Slideshow**: Upload up to 10 photos with automatic canvas image compression, thumbnail navigation, and fullscreen lightbox expansion.
- 🎵 **Background Music & Audio Synthesizer**: Royalty-free soundtracks + built-in Web Audio API Happy Birthday chime synthesizer.
- ✨ **Floating Particle Effects**: Interactive confetti bursts, floating balloons, night stars, hearts, fireworks, and petal blossoms.
- 📱 **Mobile-First Responsive Design**: 100% optimized for iOS, Android, and Desktop browsers.
- 🔗 **Instant Social Link Sharing**: Unique short URLs formatted with OpenGraph meta tags for WhatsApp, Facebook, and Email preview cards.
- 🔒 **Dual-Mode Data Layer**: Works out-of-the-box with Supabase PostgreSQL or offline with LocalStorage fallback.
- 📊 **Wish Dashboard**: View total wishes created, view analytics, preview links, copy URLs, and delete wishes.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & Canvas-Confetti
- **Validation**: React Hook Form + Zod
- **Backend & Storage**: Supabase PostgreSQL & Storage (with LocalStorage fallback)
- **Icons**: Lucide React

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/dev-ahanaf/Birthday-Wish-.git
cd Birthday-Wish-
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Supabase credentials if available:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
*(Note: If Supabase keys are omitted, WishBloom will automatically run in local store fallback mode).*

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (Supabase)

Execute the SQL script located in `supabase/schema.sql` inside your Supabase SQL Editor to initialize tables, indexes, and RLS policies.
