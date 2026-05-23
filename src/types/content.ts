// Site-wide configuration
export interface SiteConfig {
  company: CompanyInfo;
  navigation: NavigationConfig;
  footer: FooterConfig;
  theme: ThemeConfig;
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
    tagline: string;
  };
  founded: number;
  certifications: string[];
  contact: {
    address: string[];
    phones: string[];
    emails: string[];
    hours: string[];
  };
}

export interface NavigationConfig {
  logo: {
    text: string;
    fullText: string;
  };
  links: Array<{
    label: string;
    path: string;
  }>;
}

export interface FooterConfig {
  brandDescription: string;
  columns: Array<{
    title: string;
    links: Array<{
      label: string;
      path: string;
    }>;
  }>;
  copyright: string;
  bottomTag: string;
}

export interface ThemeConfig {
  colors: {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    steelSilver: string;
    steelLight: string;
    copperBronze: string;
    copperLight: string;
    blueprintBlue: string;
    blueprintCyan: string;
    textPrimary: string;
    textSecondary: string;
    borderColor: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
}

// Page content interfaces
export interface PageMeta {
  title: string;
  description: string;
}

export interface HeroSectionData {
  badge: string;
  headline: string[];
  subtitle: string;
  locationBadge: string;
  buttons: Array<{
    label: string;
    path: string;
    variant: 'primary' | 'secondary';
  }>;
  decor: {
    showGears: boolean;
    showScanLine: boolean;
    cornerAccents: boolean;
  };
}

export interface AboutSectionData {
  sectionLabel: string;
  title: string[];
  paragraphs: string[];
  stats: Array<{
    value: string;
    label: string;
  }>;
  visual: {
    logoText: string;
    details: string[];
  };
}

export interface PartnersSectionData {
  sectionLabel: string;
  title: string;
  logos: Array<{
    name: string;
    image?: string;
    alt?: string;
  }>;
}

export interface HomeContent {
  meta: PageMeta;
  hero: HeroSectionData;
  about: AboutSectionData;
  partners: PartnersSectionData;
  clients: PartnersSectionData;
}

export interface ProductCategory {
  id: string;
  icon: string;
  title: string;
  items: string[];
}

export interface PartnerDetail {
  name: string;
  description: string;
  products: string[];
  logo?: string;
  website?: string;
}

export interface ProductItem {
  name: string;
  image: string;
  company: string;
  description: string;
}

export interface ProductsContent {
  meta: PageMeta;
  header: {
    sectionLabel: string;
    title: string;
    subtitle: string;
  };
  categories: ProductCategory[];
  productsCatalog: {
    sectionLabel: string;
    title: string;
    description: string;
    items: ProductItem[];
  };
  partners: {
    sectionLabel: string;
    title: string;
    description: string;
    list: PartnerDetail[];
  };
}

export interface CapacityCardData {
  tonnage: number;
  label: string;
  description: string;
  badge: {
    text: string;
    variant: 'available' | 'book-now' | 'limited';
  };
}

export interface SpecRow {
  model: string;
  capacity: string;
  stroke: string;
  pressure: string;
}

export interface RentalsContent {
  meta: PageMeta;
  header: {
    sectionLabel: string;
    title: string;
    subtitle: string;
  };
  intro: {
    heading: string;
    paragraphs: string[];
  };
  capacities: {
    sectionLabel: string;
    title: string;
    cards: CapacityCardData[];
  };
  specifications: {
    sectionLabel: string;
    title: string;
    table: {
      headers: string[];
      rows: SpecRow[];
    };
    footnotes: string[];
  };
}

export interface VisionMissionCard {
  icon: string;
  title: string;
  content: string;
}

export interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseFeature {
  number: string;
  title: string;
  description: string;
}

export interface Owner {
  name: string;
  title: string;
  image: string;
  bio: string;
}

export interface AboutContent {
  meta: PageMeta;
  about: AboutSectionData;
  visionMission: {
    sectionLabel: string;
    title: string;
    cards: VisionMissionCard[];
  };
  coreValues: {
    sectionLabel: string;
    title: string;
    values: CoreValue[];
  };
  owners: {
    sectionLabel: string;
    title: string;
    description: string;
    owners: Owner[];
  };
  whyChooseUs: {
    sectionLabel: string;
    title: string;
    features: WhyChooseFeature[];
  };
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  lines: string[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export interface ContactContent {
  meta: PageMeta;
  header: {
    sectionLabel: string;
    title: string;
  };
  info: {
    heading: string;
    items: ContactInfoItem[];
  };
  form: {
    heading: string;
    fields: FormField[];
    submitButton: string;
    successMessage: string;
  };
}

// Component prop types
export interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}
