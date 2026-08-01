import { Metadata } from "next";
import { fetchWishBySlug } from "@/lib/supabase/client";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wish = await fetchWishBySlug(params.slug);

  if (!wish) {
    return {
      title: "Birthday Wish Not Found - WishBloom",
      description: "This birthday wish link is invalid or has expired.",
    };
  }

  const title = `🎉 A Special Birthday Surprise for ${wish.recipient_name}!`;
  const description = `"${wish.title}" - Tap to open your full-screen animated birthday surprise from ${wish.sender_name}!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: wish.photos && wish.photos[0] ? [wish.photos[0].image_url] : undefined,
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
