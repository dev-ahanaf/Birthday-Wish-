import { createClient } from "@supabase/supabase-js";
import { BirthdayWish, WishFormData, WishPhoto } from "../types";
import { generateSlug } from "../slug";
import { sanitizeText } from "../sanitize";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage / Memory Fallback Store for seamless offline/dev usage
const LOCAL_STORAGE_KEY = "wishbloom_wishes_db";

function getLocalWishes(): BirthdayWish[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalWishes(wishes: BirthdayWish[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishes));
  } catch {
    // LocalStorage quota excess or unavailable
  }
}

export async function createWishInDatabase(data: WishFormData): Promise<BirthdayWish> {
  const slug = generateSlug();
  const now = new Date().toISOString();

  const wishRecord: BirthdayWish = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `wish_${Date.now()}`,
    slug,
    recipient_name: sanitizeText(data.recipient_name),
    relationship: data.relationship,
    birthday_date: data.birthday_date || undefined,
    title: sanitizeText(data.title),
    message: sanitizeText(data.message),
    quote: data.quote ? sanitizeText(data.quote) : undefined,
    sender_name: sanitizeText(data.sender_name),
    theme: data.theme,
    music_track: data.music_track,
    music_enabled: data.music_enabled,
    confetti_enabled: data.confetti_enabled,
    effects: data.effects,
    view_count: 0,
    is_public: true,
    created_at: now,
    updated_at: now,
    photos: data.photos.map((p, idx) => ({
      id: `photo_${idx}_${Date.now()}`,
      image_url: p.url,
      display_order: idx,
    })),
  };

  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from("birthday_wishes")
        .insert({
          slug,
          recipient_name: wishRecord.recipient_name,
          relationship: wishRecord.relationship,
          birthday_date: wishRecord.birthday_date,
          title: wishRecord.title,
          message: wishRecord.message,
          quote: wishRecord.quote,
          sender_name: wishRecord.sender_name,
          theme: wishRecord.theme,
          music_track: wishRecord.music_track,
          music_enabled: wishRecord.music_enabled,
          confetti_enabled: wishRecord.confetti_enabled,
          effects: wishRecord.effects,
          view_count: 0,
          is_public: true,
        })
        .select()
        .single();

      if (!error && inserted) {
        if (wishRecord.photos && wishRecord.photos.length > 0) {
          const photoInserts = wishRecord.photos.map((p, order) => ({
            wish_id: inserted.id,
            image_url: p.image_url,
            display_order: order,
          }));
          await supabase.from("wish_photos").insert(photoInserts);
        }
        return {
          ...inserted,
          photos: wishRecord.photos,
        };
      }
    } catch {
      // Fallback to local store on error
    }
  }

  // Fallback to local storage
  const existing = getLocalWishes();
  existing.unshift(wishRecord);
  saveLocalWishes(existing);
  return wishRecord;
}

export function encodeWishToUrl(wish: BirthdayWish): string {
  try {
    // Only include http/https image URLs in URL parameter to keep link concise (<2000 chars)
    const validHttpPhotos = (wish.photos || [])
      .map((p) => p.image_url)
      .filter((url) => url && (url.startsWith("http://") || url.startsWith("https://")));

    const payload = {
      rn: wish.recipient_name,
      rel: wish.relationship,
      bd: wish.birthday_date,
      t: wish.title,
      m: wish.message,
      q: wish.quote,
      sn: wish.sender_name,
      th: wish.theme,
      mt: wish.music_track,
      me: wish.music_enabled,
      ce: wish.confetti_enabled,
      eff: wish.effects,
      p: validHttpPhotos,
    };
    const jsonStr = JSON.stringify(payload);
    if (typeof window !== "undefined" && window.btoa) {
      return encodeURIComponent(window.btoa(encodeURIComponent(jsonStr)));
    }
    return "";
  } catch {
    return "";
  }
}

export function decodeWishFromUrl(encodedData: string, slug: string): BirthdayWish | null {
  try {
    if (!encodedData) return null;
    let jsonStr = "";
    
    try {
      const decodedBase64 = decodeURIComponent(encodedData);
      jsonStr = decodeURIComponent(atob(decodedBase64));
    } catch {
      try {
        jsonStr = decodeURIComponent(atob(encodedData));
      } catch {
        jsonStr = atob(encodedData);
      }
    }

    const data = JSON.parse(jsonStr);
    const now = new Date().toISOString();

    return {
      id: `url_${slug}`,
      slug,
      recipient_name: data.rn || "Friend",
      relationship: data.rel || "friend",
      birthday_date: data.bd,
      title: data.t || "Happy Birthday! 🎉",
      message: data.m || "",
      quote: data.q,
      sender_name: data.sn || "A Special Friend",
      theme: data.th || "romantic",
      music_track: data.mt || "synth-celebration",
      music_enabled: data.me ?? true,
      confetti_enabled: data.ce ?? true,
      effects: data.eff || ["confetti", "balloons"],
      view_count: 1,
      is_public: true,
      created_at: now,
      updated_at: now,
      photos: (data.p || []).map((url: string, idx: number) => ({
        id: `p_${idx}`,
        image_url: url,
        display_order: idx,
      })),
    };
  } catch {
    return null;
  }
}

export async function fetchWishBySlug(slug: string, encodedParam?: string): Promise<BirthdayWish | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("birthday_wishes")
        .select(`
          *,
          photos:wish_photos(*)
        `)
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return data as BirthdayWish;
      }
    } catch {
      // Fallback
    }
  }

  // Fallback 1: LocalStorage lookup
  const wishes = getLocalWishes();
  const found = wishes.find((w) => w.slug === slug);
  if (found) return found;

  // Fallback 2: URL payload decode
  if (encodedParam) {
    const decoded = decodeWishFromUrl(encodedParam, slug);
    if (decoded) return decoded;
  }

  return null;
}


export async function incrementWishViews(slug: string): Promise<number> {
  if (supabase) {
    try {
      const { data } = await supabase.rpc("increment_wish_views", { wish_slug: slug });
      if (data) return data;
    } catch {
      // Fallback
    }
  }

  const wishes = getLocalWishes();
  const index = wishes.findIndex((w) => w.slug === slug);
  if (index !== -1) {
    wishes[index].view_count = (wishes[index].view_count || 0) + 1;
    saveLocalWishes(wishes);
    return wishes[index].view_count;
  }
  return 1;
}

export async function fetchAllUserWishes(): Promise<BirthdayWish[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("birthday_wishes")
        .select(`*, photos:wish_photos(*)`)
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as BirthdayWish[];
      }
    } catch {
      // Fallback
    }
  }

  return getLocalWishes();
}

export async function deleteWishBySlug(slug: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from("birthday_wishes").delete().eq("slug", slug);
    } catch {
      // Fallback
    }
  }

  const wishes = getLocalWishes().filter((w) => w.slug !== slug);
  saveLocalWishes(wishes);
  return true;
}
