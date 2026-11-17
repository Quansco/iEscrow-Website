import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "iEscrow — Clear agreements, confident transactions",
  description: "A prototype workspace for organizing buyer-seller agreements and transaction milestones."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="prototype-banner">Prototype preview · No real funds are accepted, held, or transferred</div>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="iEscrow home"><span className="brand-mark">i</span> escrow</Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/disputes">Disputes</Link>
            <Link href="/admin">Admin demo</Link>
          </nav>
          <Link className="button button-small" href="/deals/new">Create a deal <span aria-hidden="true">↗</span></Link>
        </header>
        <main>{children}</main>
        <footer className="site-footer"><span>© 2026 iEscrow prototype</span><span>Built for clear, documented agreements.</span></footer>
      </body>
    </html>
  );
}
