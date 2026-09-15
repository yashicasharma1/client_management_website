# Client Hub

An internal roster for an agency managing multiple clients' brand and digital
media work. For each client it tracks:

- Brand basics (industry, status, primary contact, notes)
- Social media handles (Instagram, Facebook, LinkedIn, X, YouTube, TikTok,
  Pinterest, Threads, website)
- Reporting links: Google Analytics 4 property, Microsoft Clarity project,
  Google Search Console property — each with its ID and a one-click link to
  the dashboard on that platform

It's a Next.js app you run yourself, push to GitHub, and deploy on Vercel.
No login is required (per your setup choice) — anyone with the URL can view
and edit it, so don't put anything you wouldn't want public behind it unless
you add auth later (see **Adding a login** below).

## What this is — and isn't

This app stores **links and IDs**, not live numbers. Google Analytics,
Microsoft Clarity and Search Console each require the client to grant your
Google/Microsoft account access before any real traffic data can be pulled
in automatically — that's a per-client authorization step only you can do
with each client. So instead of trying to fake a live embed, Client Hub
gives your team one clean, reliable link straight into each platform for
each client, plus the property/project ID so nobody has to go hunting for
it.

If later you want live charts embedded directly in the page (not just a
link out), that means building GA4/Search Console API access per client
using OAuth — a bigger step, happy to help with that next.

## Running it locally

You'll need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll see two example clients already loaded
so you can see the layout before adding your own.

## How data is stored

Client records live in `data/clients.json` in the project. Adding, editing,
or deleting a client through the app writes to that file directly — no
database needed to get started.

**Important limitation on Vercel:** Vercel's servers reset their file
system on every deploy and between some requests, so edits made through the
live site **can disappear** rather than persisting reliably. This setup is
great for local use, for a first demo, or if you re-deploy the file
yourself. Once the roster is something your team relies on day to day,
move it to a real database — Vercel Postgres or Supabase are both simple
next steps and the code in `lib/clients.ts` is written so only that one
file needs to change.

## Deploying: GitHub + Vercel

**1. Push the code to GitHub**

```bash
cd client-hub
git init
git add .
git commit -m "Initial commit"
```

Create a new empty repository on GitHub (github.com → New repository —
don't add a README or .gitignore there, you already have them), then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/client-hub.git
git branch -M main
git push -u origin main
```

**2. Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com) and sign in (you can sign in
   directly with your GitHub account).
2. Click **Add New → Project**.
3. Select the `client-hub` repository you just pushed. Vercel detects it's
   a Next.js app automatically — no configuration needed.
4. Click **Deploy**. In about a minute you'll get a live URL like
   `client-hub-yourname.vercel.app`.

Every time you `git push` to `main` after this, Vercel redeploys
automatically.

## Adding each client's social handles and reporting links

From the live site: **Add a client** → fill in their brand info → **Add
channel** for each social platform → paste in their GA4 property ID,
Clarity project ID, and Search Console property, along with the dashboard
link for each (copy it straight from your browser's address bar while
you're logged into that platform for the client). Save, and the client's
page shows everything in one place with one-click links out to each
dashboard.

## Adding a login later

Since the roster is open right now, the simplest way to lock it down later
is [Vercel's built-in password protection](https://vercel.com/docs/deployment-protection)
(available on paid plans), or a lightweight middleware check — ask and I
can add that in.
