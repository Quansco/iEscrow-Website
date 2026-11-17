import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">A clearer way to work together</span>
          <h1>Good deals start with <em>clear terms.</em></h1>
          <p className="hero-copy">Create a shared agreement, track each milestone, and keep the conversation in one place. iEscrow helps buyers and sellers stay aligned from start to finish.</p>
          <div className="hero-actions"><Link className="button" href="/deals/new">Create your first deal <span aria-hidden="true">→</span></Link><Link className="button button-secondary" href="/dashboard">Explore the dashboard</Link></div>
          <p className="hero-note">A website prototype for organizing transactions. No payments are processed.</p>
        </div>
        <div className="preview-card" aria-label="Example transaction preview">
          <div className="preview-top"><div><div className="preview-label">Example agreement · #IE-2048</div><div className="preview-amount">$1,250.00</div></div><span className="pill">In progress</span></div>
          <div className="step-list">
            <div className="step"><span className="step-icon">✓</span><div><strong>Agreement created</strong><small>Both parties can review the terms</small></div></div>
            <div className="step"><span className="step-icon">✓</span><div><strong>Seller accepted</strong><small>Milestones and amount are confirmed</small></div></div>
            <div className="step"><span className="step-icon pending">3</span><div><strong>Work in progress</strong><small>Updates and delivery notes are recorded</small></div></div>
            <div className="step"><span className="step-icon pending">4</span><div><strong>Review and close</strong><small>Resolve questions before completion</small></div></div>
          </div>
        </div>
      </section>
      <section className="section section-tint"><div className="container">
        <div className="section-heading"><span className="eyebrow">Designed around trust</span><h2>Every step, out in the open</h2><p>Keep the agreement and its progress visible to everyone involved.</p></div>
        <div className="feature-grid">
          <article className="feature-card"><div className="feature-icon">⌑</div><h3>Agree on the details</h3><p>Record the scope, amount, and expectations before work begins. A shared record helps prevent misunderstandings.</p></article>
          <article className="feature-card"><div className="feature-icon">↗</div><h3>Track milestones</h3><p>See the current status at a glance and keep delivery notes attached to the relevant deal.</p></article>
          <article className="feature-card"><div className="feature-icon">◎</div><h3>Handle issues clearly</h3><p>Document a concern and keep its review history connected to the agreement.</p></article>
        </div>
        <div className="cta-strip"><div><h2>Start with a clear agreement.</h2><p>Create a sample deal in this interactive prototype.</p></div><Link className="button" href="/deals/new">Create a deal <span aria-hidden="true">→</span></Link></div>
      </div></section>
    </>
  );
}
