export type ThemeId = 'romantic' | 'elegant' | 'party' | 'playful' | 'minimal';

export type EffectType = 'confetti' | 'balloons' | 'stars' | 'hearts' | 'fireworks' | 'flowers';

export type RelationshipType = 
  | 'friend' 
  | 'partner' 
  | 'sibling' 
  | 'parent' 
  | 'colleague' 
  | 'family' 
  | 'other';

export interface WishPhoto {
  id?: string;
  image_url: string;
  display_order: number;
}

export interface BirthdayWish {
  id: string;
  slug: string;
  recipient_name: string;
  relationship: RelationshipType;
  birthday_date?: string;
  title: string;
  message: string;
  quote?: string;
  sender_name: string;
  theme: ThemeId;
  music_track: string;
  music_enabled: boolean;
  confetti_enabled: boolean;
  effects: EffectType[];
  view_count: number;
  is_public: boolean;
  expires_at?: string;
  report_count?: number;
  created_at: string;
  updated_at: string;
  photos?: WishPhoto[];
}

export interface WishFormData {
  recipient_name: string;
  relationship: RelationshipType;
  birthday_date?: string;
  title: string;
  message: string;
  quote?: string;
  sender_name: string;
  theme: ThemeId;
  music_track: string;
  music_enabled: boolean;
  confetti_enabled: boolean;
  effects: EffectType[];
  photos: { url: string; file?: File; order: number }[];
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  description: string;
  badgeColor: string;
  bgGradient: string;
  cardStyle: string;
  accentColor: string;
  textColor: string;
  subtextColor: string;
  fontFamily: string;
  defaultEffect: EffectType;
  previewImage: string;
}
