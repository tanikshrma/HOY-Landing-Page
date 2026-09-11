# HOY — landing page

Lead-capture landing page for HOY (House of You), a personal styling service in
India.

The service itself is the thing the page has to communicate: HOY catalogues
the clothes already in your wardrobe, takes your body measurements, and puts
your own pieces into combinations that suit your proportions. No shopping
required. The measurement step is the differentiator — it is what separates
this from generic styling advice — so it gets its own step, its own
photograph, and its own FAQ entry. Keep it prominent in any rewrite.

Free access is capped at **20 people per day**, and that cap is real — it is
enforced server-side and the counter on the page reads from it.

React 19 + Vite + Tailwind v4 on the front, Express on the back.

---

## Running it

```bash
npm install
cp .env.example .env     # optional — it runs fine with defaults
npm run dev              # http://localhost:3000
```

```bash
npm run build            # client → dist/, server → dist-server/
npm start                # serves the build
npm run lint             # tsc --noEmit
```

One process serves both the API and the site. In development Vite runs as
Express middleware, so there is no second port and no proxy.

---

## Where the leads go

Leads are appended to `data/leads.json` (gitignored). Three ways to get at them:

**Webhook — set this up.** Put a Slack incoming webhook, or a Zapier/Make catch
hook, in `LEAD_WEBHOOK_URL` and every lead is POSTed there the moment it lands.
Without it, nobody finds out about a signup until someone opens the file.

**CSV export.** Set `ADMIN_TOKEN`, then:

```bash
curl -H "x-admin-token: $ADMIN_TOKEN" https://yoursite.com/api/admin/leads.csv -o leads.csv
```

The route 404s when `ADMIN_TOKEN` is unset, and the comparison is timing-safe.

**The file itself**, if you would rather just read JSON.

> `data/` holds personal information and is gitignored. If you deploy to a
> container that gets replaced on each release, mount it on a volume or the
> leads go with the old container.

---

## The daily cap

`server/store.ts` owns it.

- The day boundary is **IST**, not the server's timezone — a VM in `us-central`
  would otherwise roll the counter over at 11:30 in the morning, Mumbai time.
  Change it with `TIMEZONE`.
- Writes go through a promise queue, so two people submitting at the same
  instant cannot both take slot 20. Verified against 30 concurrent submissions:
  exactly 20 succeed, numbered 1–20, and the rest get a 409.
- Writes are atomic (temp file, then rename), so a crash mid-write cannot
  truncate the store.
- Someone who submits twice in a day gets their **existing** slot back rather
  than burning a second one. Matched on either email or phone.
- A corrupt `leads.json` is renamed aside rather than taking the site down.

Set a different cap with `DAILY_CAPACITY`.

### On the scarcity claim

Every number the page shows comes from the real count. Nothing counts down on a
timer and nothing is seeded with a fake head start. The counter renders a
skeleton until it has a confirmed figure, specifically so it never flashes
"20 left" and then corrects itself — that reads as theatre even when it isn't.

Keep it that way. Invented scarcity is the fastest way to lose the people who
notice, and it is a misrepresentation problem on both Meta and Google Ads.

---

## Ad tracking

`src/lib/analytics.ts` is the only place that talks to an ad platform. Set any
of these **before `npm run build`** (they are inlined at build time) and the
corresponding tag is injected; leave them blank and nothing loads at all:

```
VITE_META_PIXEL_ID=
VITE_GA4_ID=
VITE_GTM_ID=
```

Events fired: `page_view`, `form_start` (first keystroke), `form_error`,
`lead`, `lead_duplicate`, `sold_out_view`, `cta_click`, `faq_open`. On Meta
these map to `PageView`, `InitiateCheckout` and `Lead`; everything else goes
out as a custom event. **Optimise your campaigns for `Lead`.**

Tags load 1.2s after mount so they never compete with the hero image.

UTM parameters and `fbclid`/`gclid` are captured on arrival, held in
`sessionStorage`, and stored against the lead — so a signup that happens after
five minutes of scrolling still reports against the right campaign. They show
up in the CSV export.

---

## The logo

The master artwork lives in `scripts/brand-src/` — two 1536x1024 PNGs with
alpha, dark and white. Everything the site uses is derived from them:

```bash
npm run brand
```

That writes `src/assets/brand/hoy-mark-{dark,light}.png` and the favicons.

The master is a single lockup: the mark (H pill, O circle, tall Y pill, full
stop) with "HOUSE OF YOU" tucked bottom-left underneath. The build cuts the
mark out on its own, because the baked-in wordmark renders around 7px even at
a 64px lockup — below the size at which it reads as words. Where a tagline is
wanted, the footer sets "House of You" in type instead, at a size you can
actually read.

The crop is measured from the alpha channel, not eyeballed. It works because
the H pill and O circle end at row 808, the wordmark starts at row 830, and
the Y pill starts at column 902 while the wordmark ends by column 890. If the
master artwork is ever redrawn, re-measure — those constants are at the top of
`scripts/build-brand.mjs`.

Use `<Wordmark />` rather than importing the PNGs directly; it picks the right
colour variant from the `tone` prop and declares intrinsic dimensions so the
header does not shift as it loads.

---

## Photography

Every photograph is generated with Gemini (Nano Banana Pro) from the prompts in
`scripts/image-prompts.mjs`.

```bash
npm run images                        # fills in anything missing
npm run images -- --force             # regenerate all
npm run images -- --only hero-desktop # just one
```

Needs `GEMINI_API_KEY`. Full-size originals are cached in `scripts/.raw/`
(gitignored) so re-encoding never costs another API call. The served AVIF/WebP/
JPEG derivatives **are** committed, so a fresh clone builds without a key.

Two things the prompts are deliberately shaped against, both learned the hard
way:

1. **Generic AI stock** — colour-matched outfits, plastic smiles, beige studio
   voids. Countered by the `NEGATIVE` block and by asking for real rooms with
   real clutter.
2. **Prompting hard for "documentary realism" drifts Western.** Ask for film
   grain and unretouched skin and the model will quietly hand back a white
   subject in a peeling American apartment. The `ANCHOR` block restates
   ethnicity and location in *every* prompt for that reason — do not remove it.

If you regenerate and a shot comes back grim, that is the third failure mode:
realism cues like "dim", "grey", "peeling" read as poverty. The brand is
aspirational — bright, well-kept homes and subjects who look comfortable.

---

## Testimonials

`src/content/testimonials.ts` ships **empty**, and the section does not render
while it is. Fill it in with quotes you actually have permission to use.

Nothing is invented here on purpose. Fabricated reviews are the single easiest
thing for a visitor to smell, and they are a policy violation on both Meta and
Google Ads.

---

## Spam handling

Three layers, none of which a real person ever sees:

- **Honeypot** — a `company` field hidden off-screen. Anything in it is a bot.
- **Timing** — submissions faster than `MIN_FILL_SECONDS` (2.5s) are bots.
- **Rate limit** — `RATE_LIMIT_PER_HOUR` (5) submissions per IP per hour.

The first two answer `200 OK` without saving anything, so the bot believes it
succeeded and does not come back with a different shape. The rate limit returns
a real 429 because a human can legitimately hit it.

IPs are stored as a salted hash, never in the clear. Set a fixed `IP_SALT` in
production, otherwise it regenerates on restart and abuse tracking resets.

---

## Layout notes

Things that are the way they are on purpose:

- **The form is above the fold on mobile**, directly under the headline, with
  the photograph below it. Most ad traffic is mobile and the previous build put
  a full-height image and a "scroll down" button in front of the form.
- **The hero photograph is full-bleed**, not a side panel. As a right-hand
  panel the form card covered its middle and left two useless slivers of image
  — and it made a 150KB photo the LCP element.
- **Nothing auto-advances.** The old value-prop carousel moved every 3.2
  seconds, which meant nobody could finish reading a card.
- **Reveal animations are CSS**, toggled by `IntersectionObserver`. They
  respect `prefers-reduced-motion` with no JS branching, and content stays
  visible if the observer never fires.
- **No client-side "success" without a server write.** The previous build fell
  back to `localStorage` when the API was unreachable and still showed a
  confirmation screen — the lead was silently lost. A failure now surfaces as a
  failure, with the visitor's input preserved so they can retry.

Measured on the production build: **LCP 824ms, CLS 0.006** on a good-4G/2×-CPU
profile; 3.9s LCP on slow-4G/4×-CPU. No horizontal overflow at 390 / 820 /
1440px.

---

## Before you go live

- [ ] Point `VITE_META_PIXEL_ID` at the real pixel and rebuild
- [ ] Set `LEAD_WEBHOOK_URL` so leads reach a human immediately
- [ ] Set `ADMIN_TOKEN` and a fixed `IP_SALT`
- [ ] Replace `hello@houseofyou.in` in `src/sections/Footer.tsx` if that is not
      the address you want
- [ ] Replace `https://houseofyou.in/` in `index.html` (canonical, OG, JSON-LD)
      and `public/sitemap.xml` with the real domain
- [ ] Mount a volume for `data/` if the host replaces containers on deploy
- [ ] Add a privacy policy page and link it from the footer — Meta requires one
      on lead-gen destinations
