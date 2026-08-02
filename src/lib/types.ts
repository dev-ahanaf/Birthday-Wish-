export type ThemeId = 'romantic' | 'elegant' | 'party' | 'playful' | 'minimal';

export type EffectType = 'confetti' | 'balloons' | 'stars' | 'hearts' | 'fireworks' | 'flowers';

export type EventType =
  | 'birthday'
  | 'wedding'
  | 'engagement'
  | 'success'
  | 'anniversary'
  | 'baby'
  | 'appreciation'
  | 'custom';

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
  event_type?: EventType;
  recipient_name: string;
  sender_name: string;
  title?: string;
  message: string;
  quote?: string;
  relationship?: RelationshipType;
  birthday_date?: string;
  theme: ThemeId;
  music_url?: string;
  effects: EffectType[];
  photo_urls: string[];
  photos?: { id?: string; image_url: string; display_order: number }[];
  is_public: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface WishFormData {
  event_type: EventType;
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
