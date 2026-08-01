import { z } from "zod";

export const step1Schema = z.object({
  recipient_name: z
    .string()
    .min(2, "Recipient name must be at least 2 characters")
    .max(50, "Recipient name cannot exceed 50 characters"),
  relationship: z.enum([
    "friend",
    "partner",
    "sibling",
    "parent",
    "colleague",
    "family",
    "other",
  ]),
  birthday_date: z.string().optional(),
});

export const step2Schema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  message: z
    .string()
    .min(10, "Birthday message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
  sender_name: z
    .string()
    .min(2, "Sender name must be at least 2 characters")
    .max(50, "Sender name cannot exceed 50 characters"),
  quote: z.string().max(250, "Quote cannot exceed 250 characters").optional(),
});

export const fullWishSchema = step1Schema.merge(step2Schema).extend({
  theme: z.enum(["romantic", "elegant", "party", "playful", "minimal"]),
  music_track: z.string(),
  music_enabled: z.boolean(),
  confetti_enabled: z.boolean(),
  effects: z.array(
    z.enum(["confetti", "balloons", "stars", "hearts", "fireworks", "flowers"])
  ),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
