export type Feature =
  | 'landing'
  | 'pages_4_10'
  | 'commerce'
  | 'booking'
  | 'gallery'
  | 'blog'
  | 'membership'
  | 'cart';

export type PackageItem = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  vibe: 'editorial' | 'premium' | 'sport' | 'minimal';
  features: Feature[];
};

export type CarouselItem = {
  slug: string;
  title: string;
  subtitle: string;
  vibe: 'Editorial' | 'Premium' | 'Sport' | 'Minimal';
  cover: string;
  chips: Feature[];
};

export type Story = {
  id: string;
  title: string;
  kicker: string;
  cover: string;
  steps: { title: string; desc: string; icon?: string }[];
};

export type EstimatorConfig = {
  pages: number;
  commerce: boolean;
  booking: boolean;
  blog: boolean;
  i18n: boolean;
};

export type TierId = 'lite' | 'core' | 'plus' | 'commerce' | 'enterprise';

export type Tier = {
  id: TierId;
  name: string;
  tagline: string;
  includes: { mobile: boolean; seo: boolean; perf: boolean };
  canCommerce?: boolean;
};
