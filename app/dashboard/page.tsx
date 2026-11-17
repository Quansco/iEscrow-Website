"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readDeals } from "@/lib/demo-store";
import { Deal, formatMoney, statusLabels } from "@/lib/types";

export default function DashboardPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  useEffect(() => setDeals(readDeals()), []);
  const active = deals.filter((deal) => !["COMPLETED", "CANCELLED"].includes(deal.status));
  const total = deals.reduce((sum, deal) => sum + deal.amountMinor, 0);
  return <div className="container page-wrap">
    <div className="dashboard-head"><div><span className="eyebrow">Your workspace</span><h1 className="page-title">Good morning, Jordan</h1><p className="page-subtitle">Here’s what’s happening with your agreements.</p></div><Link className="button" href="/deals/new">＋ Create a deal</Link></div>
    <div className="stat-grid">
      <div className="stat-card"><div className="stat-label">All agreements</div><div className="stat-value">{deals.length}</div><div className="stat-foot">Across this demo workspace</div></div>
      <div className="stat-card"><div className="stat-label">Active agreements</div><div className="stat-value">{active.length}</div><div className="stat-foot">Not yet closed</div></div>
      <div className="stat-card"><div className="stat-label">Needs your attention</div><div className="stat-value">{deals.filter((deal) => ["DELIVERED", "DISPUTED"].includes(deal.status)).length}</div><div className="stat-foot">Delivery or dispute updates</div></div>
      <div className="stat-card"><div className="stat-label">Demo agreement value</div><div className="stat-value" style={{ fontSize: 23 }}>{formatMoney(total)}</div><div className="stat-foot">Not a balance or held funds</div></div>
    </div>
    <section className="table-card"><div className="table-top"><div><h2>Recent agreements</h2><p>Manage your buyer and seller activity</p></div><Link className="text-link" href="/disputes">View disputes →</Link></div>
      {deals.length ? <div className="table-scroll"><table><thead><tr><th>Agreement</th><th>Other party</th><th>Amount</th><th>Status</th><th></th></tr></thead><tbody>{deals.map((deal) => <tr key={deal.id}><td><strong>{deal.title}</strong><div className="muted" style={{ fontSize: 11, marginTop: 4 }}>#{deal.id.slice(-6).toUpperCase()}</div></td><td>{deal.sellerName}</td><td>{formatMoney(deal.amountMinor, deal.currency)}</td><td><span className={`pill status-${deal.status}`}>{statusLabels[deal.status]}</span></td><td><Link className="text-link" href={`/deals/${deal.id}`}>Open →</Link></td></tr>)}</tbody></table></div> : <div className="empty-state"><h3>No agreements yet</h3><p>Create a deal to get started.</p><Link className="button" href="/deals/new">Create a deal</Link></div>}
    </section>
    <div className="notice">Demo data is stored in this browser only. It is not shared with another user or backed by a server.</div>
  </div>;
}
