import { createBrowserClient } from "@supabase/ssr";
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

if (process.env.NODE_ENV === "development") {
  console.log("[Supabase Config Check]:", {
    configured: isSupabaseConfigured,
    hasUrl: Boolean(supabaseUrl),
    hasKey: Boolean(supabaseKey),
  });
}

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "[Supabase Warning]: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variables."
    );
  }
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export const supabase = isSupabaseConfigured
  ? createSupabaseJsClient(supabaseUrl, supabaseKey)
  : null;
