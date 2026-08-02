import { nanoid } from "nanoid";

export function generateSlug(length: number = 8): string {
  try {
    return nanoid(length);
  } catch {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const cryptoObj = typeof window !== "undefined" ? window.crypto : null;
    if (cryptoObj && cryptoObj.getRandomValues) {
      const values = new Uint8Array(length);
      cryptoObj.getRandomValues(values);
      for (let i = 0; i < length; i++) {
        result += chars[values[i] % chars.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    return result;
  }
}
