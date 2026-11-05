export type TicketTier = {
  id: string;
  accent: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  availability: string;
};

export type SiteContent = {
  announcement: string;
  heroEyebrow: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroIntro: string;
  matchDate: string;
  kickOff: string;
  venue: string;
  location: string;
  gates: string;
  ticketIntro: string;
  deliveryNote: string;
  supportEmail: string;
  tiers: TicketTier[];
};

export const defaultSiteContent: SiteContent = {
  announcement: "Tickets are now on sale",
  heroEyebrow: "The fixture of the summer",
  heroTitle: "YOUR SEAT",
  heroTitleAccent: "TO THE MOMENT.",
  heroIntro: "Bayern Munich meets Ajax under the Nairobi lights. Be in the stands when two football giants share one unforgettable night.",
  matchDate: "05 JAN 2027",
  kickOff: "7:00 PM EAT",
  venue: "RAILA ODINGA STADIUM",
  location: "Talanta Sports City, Nairobi, Kenya",
  gates: "Gates open from 4:00 PM EAT",
  ticketIntro: "Every ticket is a reserved seat with a mobile E-ticket delivered to your inbox after payment confirmation.",
  deliveryNote: "Your E-ticket and payment receipt are emailed after confirmation.",
  supportEmail: "hello@matchpass.ke",
  tiers: [
    { id: "grandstand", accent: "cool", name: "Grandstand", price: 35, description: "High-energy views from the main bowl.", benefits: ["Reserved seat", "Stadium atmosphere", "Mobile E-ticket"], availability: "Selling fast" },
    { id: "premium", accent: "hot", name: "Premium", price: 65, description: "Elevated sightlines, closer to the action.", benefits: ["Premium reserved seat", "Dedicated entry lane", "Mobile E-ticket"], availability: "Best value" },
    { id: "vip", accent: "gold", name: "VIP Lounge", price: 140, description: "A matchday experience with room to breathe.", benefits: ["Lounge access", "Premium padded seat", "Priority entry"], availability: "Limited release" },
  ],
};

export const SITE_CONTENT_KEY = "matchpass-site-content";

export function readSiteContent(): SiteContent {
  if (typeof window === "undefined") return defaultSiteContent;
  try {
    const raw = window.localStorage.getItem(SITE_CONTENT_KEY);
    if (!raw) return defaultSiteContent;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return { ...defaultSiteContent, ...parsed, tiers: parsed.tiers ?? defaultSiteContent.tiers };
  } catch {
    return defaultSiteContent;
  }
}

export function saveSiteContent(content: SiteContent) {
  window.localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new CustomEvent("matchpass-content-updated"));
}

export type AdminOrder = {
  id: string;
  buyerName: string;
  email: string;
  phone?: string;
  ticketLabel: string;
  quantity: number;
  total: number;
  status: "paid" | "pending" | "failed";
  delivery: "not_sent" | "sent" | "partial";
  createdAt: string;
};

export const ADMIN_ORDERS_KEY = "matchpass-admin-orders";

export const demoOrders: AdminOrder[] = [
  { id: "MP-2026-289323", buyerName: "Amina Otieno", email: "amina@example.com", phone: "+254 712 345 678", ticketLabel: "Premium", quantity: 1, total: 69, status: "paid", delivery: "not_sent", createdAt: "Today, 10:42 AM" },
  { id: "MP-2026-289118", buyerName: "David Kamau", email: "david@example.com", phone: "+254 701 555 210", ticketLabel: "VIP Lounge", quantity: 2, total: 297, status: "paid", delivery: "sent", createdAt: "Yesterday, 4:18 PM" },
  { id: "MP-2026-288904", buyerName: "Njeri Wambui", email: "njeri@example.com", ticketLabel: "Grandstand", quantity: 3, total: 111, status: "pending", delivery: "not_sent", createdAt: "Yesterday, 1:07 PM" },
];

export function readOrders(): AdminOrder[] {
  if (typeof window === "undefined") return demoOrders;
  try {
    const raw = window.localStorage.getItem(ADMIN_ORDERS_KEY);
    return raw ? (JSON.parse(raw) as AdminOrder[]) : demoOrders;
  } catch {
    return demoOrders;
  }
}

export function saveOrders(orders: AdminOrder[]) {
  window.localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(orders));
}
