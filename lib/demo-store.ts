import type { Deal, DealStatus } from "@/lib/types";

const STORAGE_KEY = "iescrow-demo-deals-v1";

export const starterDeals: Deal[] = [
  {
    id: "demo-1001",
    title: "Brand identity design",
    description: "Logo, color palette, and a one-page brand guide for a small business.",
    buyerName: "Jordan Lee",
    sellerName: "Avery Studio",
    sellerEmail: "avery@example.test",
    amountMinor: 85000,
    currency: "USD",
    status: "IN_PROGRESS",
    createdAt: "2026-11-12T10:00:00.000Z"
  },
  {
    id: "demo-1002",
    title: "Laptop sale",
    description: "Used laptop, inspected and shipped with tracking.",
    buyerName: "Jordan Lee",
    sellerName: "Morgan Reed",
    sellerEmail: "morgan@example.test",
    amountMinor: 120000,
    currency: "USD",
    status: "DELIVERED",
    createdAt: "2026-11-10T10:00:00.000Z"
  },
  {
    id: "demo-1003",
    title: "Website copywriting",
    description: "Homepage and three product descriptions.",
    buyerName: "Jordan Lee",
    sellerName: "Taylor Writes",
    sellerEmail: "taylor@example.test",
    amountMinor: 32000,
    currency: "USD",
    status: "AWAITING_SELLER",
    createdAt: "2026-11-08T10:00:00.000Z"
  }
];

export function readDeals(): Deal[] {
  if (typeof window === "undefined") return starterDeals;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Deal[]) : starterDeals;
  } catch {
    return starterDeals;
  }
}

export function saveDeals(deals: Deal[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  }
}

export function addDeal(deal: Deal) {
  const deals = [deal, ...readDeals()];
  saveDeals(deals);
  return deals;
}

export function updateDealStatus(id: string, status: DealStatus) {
  const deals = readDeals().map((deal) => (deal.id === id ? { ...deal, status } : deal));
  saveDeals(deals);
  return deals;
}
