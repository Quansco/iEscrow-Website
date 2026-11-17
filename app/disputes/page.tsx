"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readDeals, updateDealStatus } from "@/lib/demo-store";
import type { Deal } from "@/lib/types";
import { formatMoney, statusLabels } from "@/lib/types";

export default function DisputesPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  useEffect(() => setDeals(readDeals().filter((deal) => deal.status === "DISPUTED")), []);
  function openDispute(id: string) {
    setDeals(updateDealStatus(id, "DISPUTED").filter((deal) => deal.status === "DISPUTED"));
  }
  return <div className="container page-wrap"><span className="eyebrow">Resolution center</span><h1 className="page-title">Disputes and concerns</h1><p className="page-subtitle">Keep disagreements documented alongside the original agreement.</p>
    <div className="notice">Dispute handling here is a visual prototype only. It does not provide legal mediation or decide who is entitled to money.</div>
    {deals.length ? <div className="dispute-grid">{deals.map((deal) => <article className="case-card" key={deal.id}><span className={`pill status-${deal.status}`}>{statusLabels[deal.status]}</span><h3>{deal.title}</h3><p>{deal.buyerName} and {deal.sellerName} · {formatMoney(deal.amountMinor, deal.currency)}</p><Link className="text-link" href={`/deals/${deal.id}`}>Review agreement →</Link></article>)}</div> : <div className="card" style={{ marginTop: 24 }}><div className="empty-state"><div className="feature-icon" style={{ margin: "0 auto" }}>✓</div><h3>No open demo disputes</h3><p>Agreements flagged for a concern will appear here.</p><Link className="text-link" href="/dashboard">Return to dashboard →</Link></div></div>}
    <section className="card" style={{ marginTop: 22 }}><h2 style={{ fontSize: 15, marginTop: 0 }}>Create a sample dispute</h2><p className="muted" style={{ fontSize: 12 }}>Select an active agreement to add it to this local demo queue.</p><div className="table-scroll"><table><thead><tr><th>Agreement</th><th>Status</th><th>Action</th></tr></thead><tbody>{readDeals().filter((deal) => !["COMPLETED", "CANCELLED", "DISPUTED"].includes(deal.status)).map((deal) => <tr key={deal.id}><td>{deal.title}</td><td><span className={`pill status-${deal.status}`}>{statusLabels[deal.status]}</span></td><td><button className="button button-quiet" onClick={() => openDispute(deal.id)}>Flag concern</button></td></tr>)}</tbody></table></div></section>
  </div>;
}
