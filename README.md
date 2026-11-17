# iEscrow Website

A responsive Next.js prototype for documenting buyer/seller agreements, tracking demo milestones, and displaying a dispute workflow.

## Important scope and safety note

This repository currently contains a **front-end prototype**, not a production escrow or payment service. The dashboard uses sample data and browser `localStorage`; there is no authentication, server API, live database connection, email delivery, file upload, payment processing, fund custody, refund, or payout. Demo status buttons only change local sample data. The admin screen is informational and is not access-controlled.

Do not use this prototype to accept real users' money or represent that funds are held or protected. Before a real launch, get legal/compliance advice for the intended markets and use an appropriate regulated payment/escrow provider.

## Included

- Responsive landing page and navigation
- Demo dashboard with seeded agreement records
- Create agreement form with basic client-side validation
- Agreement detail page and local-only status controls
- Demo dispute queue
- Admin operations placeholder with clear non-production warnings
- PostgreSQL Prisma schema for a future persistent backend

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. No database or payment credentials are required for the front-end prototype.

## Database groundwork (not connected to the UI yet)

Copy `.env.example` to `.env.local`, configure `DATABASE_URL` for a PostgreSQL database, then run:

```bash
npx prisma generate
npx prisma validate
npx prisma db push
```

The current UI does not read or write this database. Never commit `.env.local` or secrets.

## Checks

```bash
npm run typecheck
npm run build
```

## Suggested next implementation stages

1. Add server-side authentication, verified identities, roles, and authorization checks.
2. Implement database-backed deal actions and audit records with tested state transitions.
3. Add secure delivery evidence and notifications.
4. Design and review an appropriate payment-provider integration and dispute policy before enabling any real-money workflow.
5. Add automated tests, monitoring, backups, privacy disclosures, terms, and deployment configuration.
