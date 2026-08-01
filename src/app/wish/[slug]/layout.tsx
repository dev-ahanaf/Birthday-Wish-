import { Metadata } from "next";
import { fetchWishBySlug } from "@/lib/supabase/client";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wish = await fetchWishBySlug(params.slug);

  const title = wish
    ? `🎉 A Special Birthday Surprise for ${wish.recipient_name}!`
    : "🎉 A Special Birthday Surprise | WishBloom";
  const description = wish
    ? `"${wish.title}" - Tap to open your full-screen animated birthday surprise from ${wish.sender_name}!`
    : "Tap to open your full-screen animated birthday surprise!";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: wish?.photos && wish.photos[0] ? [wish.photos[0].image_url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function WishLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
