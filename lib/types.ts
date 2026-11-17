export type DealStatus =
  | "AWAITING_SELLER"
  | "AWAITING_PAYMENT"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "DISPUTED"
  | "COMPLETED"
  | "CANCELLED";

export type Deal = {
  id: string;
  title: string;
  description: string;
  buyerName: string;
  sellerName: string;
  sellerEmail: string;
  amountMinor: number;
  currency: string;
  status: DealStatus;
  createdAt: string;
};

export const statusLabels: Record<DealStatus, string> = {
  AWAITING_SELLER: "Awaiting seller",
  AWAITING_PAYMENT: "Awaiting payment",
  IN_PROGRESS: "In progress",
  DELIVERED: "Delivered",
  DISPUTED: "Disputed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled"
};

export function formatMoney(amountMinor: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(amountMinor / 100);
}
