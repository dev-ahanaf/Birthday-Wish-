import { createClient } from "./client";

export async function uploadPhotoToSupabase(
  dataUrlOrFile: string | File,
  slug: string,
  index: number
): Promise<string> {
  const supabase = createClient();
  const fileName = `${slug}/${Date.now()}_${index}.jpg`;

  try {
    let body: Blob | File;

    if (typeof dataUrlOrFile === "string") {
      if (dataUrlOrFile.startsWith("data:")) {
        const res = await fetch(dataUrlOrFile);
        body = await res.blob();
      } else {
        // Already a public URL
        return dataUrlOrFile;
      }
    } else {
      body = dataUrlOrFile;
    }

    const { data, error } = await supabase.storage
      .from("wish-photos")
      .upload(fileName, body, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error("[Storage Upload Error]:", error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from("wish-photos")
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("[Storage Exception]:", err);
    // If it's already an http/https URL, return it
    if (typeof dataUrlOrFile === "string" && dataUrlOrFile.startsWith("http")) {
      return dataUrlOrFile;
    }
    throw err;
  }
}
