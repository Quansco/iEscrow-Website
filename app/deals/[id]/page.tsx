"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readDeals, updateDealStatus } from "@/lib/demo-store";
import type { Deal, DealStatus } from "@/lib/types";
import { formatMoney, statusLabels } from "@/lib/types";

export default function DealDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [deal, setDeal] = useState<Deal | null>(null);
  useEffect(() => setDeal(readDeals().find((item) => item.id === params.id) ?? null), [params.id]);
  function changeStatus(status: DealStatus) {
    const updated = updateDealStatus(params.id, status).find((item) => item.id === params.id);
    if (updated) setDeal(updated);
  }
  if (!deal) return <div className="container page-wrap"><Link className="text-link" href="/dashboard">← Dashboard</Link><div className="empty-state"><h3>Agreement not found</h3><p>This demo agreement may be stored in a different browser.</p></div></div>;
  return <div className="container page-wrap">
    <div style={{ marginBottom: 25 }}><Link className="text-link" href="/dashboard">← Back to dashboard</Link><div className="deal-heading" style={{ marginTop: 20 }}><div><span className="eyebrow">Agreement #{deal.id.slice(-6).toUpperCase()}</span><h1 className="page-title">{deal.title}</h1><p className="page-subtitle">Created {new Date(deal.createdAt).toLocaleDateString()}</p></div><span className={`pill status-${deal.status}`}>{statusLabels[deal.status]}</span></div></div>
    <div className="detail-grid"><div>
      <section className="card"><div className="eyebrow">Agreed amount · demo only</div><div className="deal-amount" style={{ marginTop: 7 }}>{formatMoney(deal.amountMinor, deal.currency)}</div><div className="detail-row" style={{ marginTop: 15 }}><span className="muted">Buyer</span><strong>{deal.buyerName}</strong></div><div className="detail-row"><span className="muted">Seller</span><strong>{deal.sellerName}</strong></div><div className="detail-row"><span className="muted">Seller email</span><strong>{deal.sellerEmail}</strong></div></section>
      <section className="card detail-card"><h2>Scope and terms</h2><p>{deal.description}</p></section>
      <section className="card detail-card"><h2>Activity</h2><div className="timeline"><div className="timeline-item"><span className="timeline-dot">✓</span><div><strong>Agreement created</strong><p>Created by Jordan Lee in the local demo workspace.</p></div></div><div className="timeline-item"><span className="timeline-dot">{deal.status === "DELIVERED" || deal.status === "COMPLETED" ? "✓" : "2"}</span><div><strong>{deal.status === "DELIVERED" || deal.status === "COMPLETED" ? "Delivery marked" : "Waiting for seller"}</strong><p>{deal.status === "DELIVERED" || deal.status === "COMPLETED" ? "A simulated delivery update was recorded." : "This is a demo status; no real invitation was sent."}</p></div></div></div></section>
    </div><aside><section className="info-card"><h3>Demo controls</h3><p>These controls only update sample data in your browser. They do not send messages or move funds.</p><div className="action-stack">{deal.status === "AWAITING_SELLER" && <button className="button" onClick={() => changeStatus("AWAITING_PAYMENT")}>Simulate seller acceptance</button>}{deal.status === "AWAITING_PAYMENT" && <button className="button" onClick={() => changeStatus("IN_PROGRESS")}>Simulate start of work</button>}{deal.status === "IN_PROGRESS" && <button className="button" onClick={() => changeStatus("DELIVERED")}>Simulate delivery</button>}{deal.status === "DELIVERED" && <button className="button" onClick={() => changeStatus("COMPLETED")}>Simulate buyer approval</button>}{!["COMPLETED", "CANCELLED", "DISPUTED"].includes(deal.status) && <button className="button button-danger" onClick={() => router.push(`/disputes?deal=${deal.id}`)}>Open demo dispute</button>}{deal.status === "DISPUTED" && <p className="muted">A demo dispute is marked on this agreement.</p>}</div></section><div className="notice">This prototype is not an escrow service. No funds are collected, protected, refunded, or released.</div></aside></div>
  </div>;
}
