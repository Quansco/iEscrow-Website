"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { addDeal } from "@/lib/demo-store";
import type { Deal } from "@/lib/types";

export default function NewDealPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const sellerName = String(form.get("sellerName") ?? "").trim();
    const sellerEmail = String(form.get("sellerEmail") ?? "").trim();
    const amount = Number(form.get("amount"));
    if (!title || !description || !sellerName || !sellerEmail || !Number.isFinite(amount) || amount <= 0) {
      setError("Complete all fields and enter a valid amount greater than zero.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sellerEmail)) {
      setError("Enter a valid seller email address.");
      return;
    }
    setBusy(true);
    const deal: Deal = {
      id: `demo-${Date.now()}`,
      title,
      description,
      buyerName: "Jordan Lee",
      sellerName,
      sellerEmail,
      amountMinor: Math.round(amount * 100),
      currency: "USD",
      status: "AWAITING_SELLER",
      createdAt: new Date().toISOString()
    };
    addDeal(deal);
    router.push(`/deals/${deal.id}`);
  }
  return <div className="container page-wrap">
    <div style={{ marginBottom: 26 }}><Link className="text-link" href="/dashboard">← Back to dashboard</Link><span className="eyebrow" style={{ display: "block", marginTop: 22 }}>New agreement</span><h1 className="page-title">Create a deal</h1><p className="page-subtitle">Write down the essentials so both sides know what to expect.</p></div>
    <div className="form-layout"><form className="form-card" onSubmit={handleSubmit}>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="field"><label htmlFor="title">Agreement title</label><input id="title" name="title" required maxLength={100} placeholder="e.g. Website redesign" /></div>
      <div className="field"><label htmlFor="description">Scope and terms</label><textarea id="description" name="description" required maxLength={2000} placeholder="Describe the work or item, deliverables, and any important expectations." /><div className="field-help">Be specific about what counts as complete.</div></div>
      <div className="form-grid"><div className="field"><label htmlFor="sellerName">Seller name</label><input id="sellerName" name="sellerName" required maxLength={100} placeholder="Name or business" /></div><div className="field"><label htmlFor="sellerEmail">Seller email</label><input id="sellerEmail" name="sellerEmail" type="email" required maxLength={254} placeholder="seller@example.com" /></div></div>
      <div className="form-grid"><div className="field"><label htmlFor="amount">Agreed amount (USD)</label><input id="amount" name="amount" type="number" min="0.01" max="1000000" step="0.01" required placeholder="0.00" /><div className="field-help">For agreement display only; no money is collected.</div></div><div className="field"><label htmlFor="buyer">Buyer</label><input id="buyer" value="Jordan Lee (demo)" disabled /></div></div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><button className="button" disabled={busy} type="submit">{busy ? "Creating…" : "Create demo agreement →"}</button><Link className="button button-secondary" href="/dashboard">Cancel</Link></div>
    </form><aside className="info-card"><h3>What happens next?</h3><ul><li>The agreement is saved in this browser’s local storage.</li><li>You can review the details and use the demo status actions.</li><li>No invitation is actually sent to the seller.</li><li>Nothing here creates a payment or holds funds.</li></ul></aside></div>
  </div>;
}
