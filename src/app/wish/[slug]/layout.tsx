import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let recipient_name = "";
  let title_text = "";
  let sender_name = "";
  let photo_url = "";

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("birthday_wishes")
      .select("*")
      .eq("slug", params.slug)
      .maybeSingle();

    if (data) {
      recipient_name = data.recipient_name;
      title_text = data.title || "Happy Birthday! 🎉";
      sender_name = data.sender_name;
      if (Array.isArray(data.photo_urls) && data.photo_urls[0]) {
        photo_url = data.photo_urls[0];
      }
    }
  } catch {
    // Ignore server metadata fetch error
  }

  const title = recipient_name
    ? `🎉 A Special Birthday Surprise for ${recipient_name}!`
    : "🎉 A Special Birthday Surprise | WishBloom";
  const description = title_text
    ? `"${title_text}" - Tap to open your full-screen animated birthday surprise from ${sender_name}!`
    : "Tap to open your full-screen animated birthday surprise!";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: photo_url ? [photo_url] : undefined,
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

