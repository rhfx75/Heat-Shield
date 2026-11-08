# Site-wide Mobile Pass — Phase 0 Discovery (report only)

Date: 2026-11-08. Repo: `E:\Heat-Shield-Engineering`. Branch created: `feature/mobile-friendly-site` (from `feature/brands-page-redesign` @ `8670958`). Backup tag: `backup/site-before-mobile-pass`. Working tree was clean before this pass.

## 3.1 Routes inventory (`src/App.tsx`, no 404 route)
| Route | Component | Responsive notes (CSS read, not visual) |
|---|---|---|
| `/` | `Home` | Mixed: many sections use Tailwind responsive prefixes; hero/feature areas vary; needs sweep. |
| `/about` | `About` | Uses `hse-ab-*` + global styles; partial responsive rules in `index.css`/component CSS. |
| `/services` | `Services` | `hse-sv-*` scoped CSS has breakpoints (1280/1024/900/640). |
| `/services/:id` | `ServiceDetail` | `hse-sd-*` scoped CSS; breakpoints present. |
| `/products` (+ 8 category aliases) | `Products` | `hse-pr-*` has 1024/1023.98/641/640/420; hero chips scroll on mobile; filter drawer exists; quote modal exists (basic). |
| `/products/:slug` | `ProductDetail` | Tailwind + `hse-pd-*`/global; needs sweep (gallery zoom/touch/sticky CTA). |
| `/product-catalogues` | `ProductCatalogues` | Needs audit. |
| `/standards` | `StandardsPage` | Grid-based; needs audit. |
| `/projects` | `Projects` | `hse-pj-*` redesigned; 1024/900/600 breakpoints, chips scroll, art hidden <=600. |
| `/projects/:id` | `ProjectDetail` | `hse-pd-*` 1024/720; mostly responsive. |
| `/brands` | `Brands` | New `hse-br-*` hero (1024/768/480) + legacy `.brand-grid`/`.brand-card` in `index.css`; content below hero uses Tailwind grids. |
| `/brands/:id` | `BrandDetail` | Needs audit. |
| `/resources` | `Resources` | Needs audit. |
| `/contact` | `Contact` | Hero improved recently; form uses `md:grid-cols-2` (stacks on mobile) but inputs `text-sm` (<16px) and labels ok; sidebar stacks below on `lg`; map fixed height 260. |
| (none) | — | **No catch-all/404 route found** in `App.tsx` (13.10). |

## 3.2 Viewport/meta (`index.html`)
Exact tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` (line ~22).
- No `maximum-scale`. No `user-scalable=no`. Pinch-zoom not disabled — **OK** (do not add restrictions). `viewport-fit=cover` not present (will add per 4.2, safe-area aware).

## 3.3 Breakpoints (distinct `min/max-width` px values, `src/**/*.css`)
Counts: 1024(14), 900(8), 768(6), 640(5), 1023(5), 600(4), 639(3), 360(3), 1280(3), 479(2), 720/960/1100/560/700(1). **Most common:** 1024, 900, 768, 640, (also 1023.98/639.98 used in Products). Tailwind defaults also present (`md` 768, `lg` 1024 etc.). **Decision:** reuse project’s real cluster (1024, ~900, 768, ~640/639, 480/479, 360) and Tailwind prefixes; do not invent a conflicting new system.

## 3.4 Header/navbar/top bar
- **Components:** `src/components/Navbar.tsx` + `src/graphics/header/header.css`. Sticky navbar (`.hse-navbar position:sticky; top:0; height:var(--hse-navbar-h)`). MainLayout has no extra offset wrapper; `:root --header-h: calc(var(--hse-topbar-h)+var(--hse-navbar-h))` and `scroll-padding-top:var(--header-h)` (header.css + index.css) — earlier gap fix pattern present; verify mobile header-height changes (768 sets `--hse-navbar-h:64px`, 520 makes topbar auto/min-height and sets `--header-h:calc(52px + var(--hse-navbar-h))` — plausible but needs verification).
- **Mobile behavior:** <=899 hides desktop nav links + header CTA buttons, shows hamburger (`44x44`). Drawer is top drop panel (`position:fixed; top:var(--hse-navbar-h); left:0; right:0; max-height:calc(100dvh - var(--hse-navbar-h)); overflow:auto`) with backdrop; Escape closes; overlay click closes. Drawer links min-height 48px. **Body scroll not locked** when drawer open (risk 16.5/4.9). Focus not moved into drawer/returned (basic a11y gap). AnimatePresence initial/exit opacity 1 (effectively no fade) — harmless.
- **Top info bar:** desktop shows tagline + phone/email links. <=768 hides tagline; <=520 makes topbar auto/column and **shows tagline again** (`display:block; white-space:normal`) — can crowd small widths; phone/email wrap. `tel:`/`mailto:` present. Needs 4.9/5.3 treatment (shorten/collapse predictably; keep tap-to-call).
- **Header CTAs on mobile:** hidden in header row <=899 and present full-width in drawer — matches 4.9/5.5 acceptable path; report will confirm.

## 3.5 Typography scale (sampled)
- Many headings use Tailwind `text-4xl md:text-6xl`/`text-*xl` fixed-ish steps and scoped `clamp()` in newer heroes (`hse-pr/pj/br/sv/sd/pd`). No single global clamp token system. Body/root 16px base; `SectionTitle` uses `text-[28px] md:text-[40px]`. Several pages/components use `text-sm` (14px) for body/labels and `text-xs` (12px) for meta — acceptable for true micro-labels only; needs audit (6.2).

## 3.6 Touch target survey (CSS read)
- **OK:** `.hse-navbar__hamburger` 44x44; `.hse-drawer__close` 44x44; `.hse-drawer__link` `min-height:48px`; `.hse-drawer__contact a` `min-height:44px`; `.hse-pr-*`/`.hse-pj-*` controls mostly 40–44+ min-heights; `ProductCard` action buttons `height:44px`; `FooterStandard` social icon CSS likely sized but must verify.
- **Risk/likely under 44px or needs check:** `.hse-header-btn` desktop `height:40px` (hidden <=899, but still under 44); `.hse-topbar__link` has no min-height/padding (small tap targets on <=520 where shown); footer links/list items padding; any icon-only buttons in modals/cards; `Button` base is `px-6 py-3` (~varies, often ~44 but not guaranteed); chips in older/global areas.
- Full before/after table required in Phase 3.

## 3.7 Forms
- **Contact (`src/components/ContactForm.tsx`):** labels visible above inputs (good). Inputs/select/textarea are `text-sm` (~14px) — **iOS auto-zoom risk (<16px), fix required (4.6/8.1)**. Two-column pairs use `grid-cols-1 md:grid-cols-2` (stack on mobile — OK). Submit uses `Button` inside full-width container but Button styling has uppercase/tracking defaults overridden inline; height becomes ~`py-4` + text — verify >=48px. Error messages `text-xs` (small but secondary). Autocomplete attributes **missing** (name/email/tel/org/address/message) — add (16.7). No 404/quote form on Contact page except WhatsApp/links.
- **Products quote modal (`src/pages/Products.tsx`):** `hse-pr-modal-back` dialog, `hse-pr-modal` `max-width:720px;margin...` (desktop-centered) — **not full/near-full-screen on mobile** (4.13/8.5). Close button exists (`hse-pr-btn`); backdrop click closes. Body scroll lock not obvious from markup (verify). Uses `ProductInquiryForm` (not fully read) — must audit for 16px inputs, tap targets, internal scroll, sticky header/close.

## 3.8 Images
- `max-width:100%`/global img rules exist in some scoped areas (`index.css` has `*` box-sizing; `hse-pr-page img{max-width:100%}`; many components set sizes). **35 `loading="lazy"` occurrences** found (sample: ProductCard lazy, ProjectCard/ServiceCard lazy, footer images/iframe lazy, some about images). Many likely missing — full sweep needed. LCP/hero images should not be lazy (`BrandsHero` has no <img>; Contact hero now `loading="eager"`; Products/Projects heroes have decorative/art images — verify). `srcset/sizes`/thumbnail pipeline exists in `ProductCard`/`productImage()`; external images remain risk (nesbd/ptel placeholders noted previously). Large assets risk: `public/media/hero-foundry.mp4` 85MB (not image, but mobile perf/reliability risk) — flag only.

## 3.9 Modals/drawers
- **Products filter drawer:** `hse-pr-drawer` slides from right, backdrop, focus moves to close (`closeRef`), `aria-hidden`, Escape not explicitly shown in snippet but common — verify; body scroll lock not explicit. Good reuse candidate.
- **Products quote modal:** centered modal, not mobile-optimized (12.1/4.13).
- **Footer map modal:** portal, body scroll locked, Escape, basic focus trap loop, restores focus — **good pattern to reuse/reference**.
- **Mobile nav drawer:** overlay/drop panel (not side slide) — acceptable if consistent; needs body scroll lock/focus mgmt per 4.9.

## 3.10 Horizontal scroll audit (read)
- **Intentional:** hero/category/sector chip rows on Products/Projects (`overflow:auto`, edge mask on Projects <=600); marquees if present on Home/Standards (not fully audited).
- **Accidental risk:** global `overflow-x: clip` on html/body/page wrappers exists (good guard, but can also hide issues); fixed/min widths, tables, long unbroken strings (emails handled in footer with break/wbr; Contact WhatsApp line had `whiteSpace:nowrap` — can overflow at 320px), brand/product grids.

## 3.11 Performance signals
- **Route code-splitting:** **No** `React.lazy`/`Suspense` in `App.tsx`/`main.tsx` (grep). All page components eagerly imported — hurts mobile first load (11.4).
- **Fonts:** Google Fonts preconnect + stylesheet in `index.html`; `display=swap`? URL not shown with `&display=swap` in snippet — verify/add if missing (only if safe, no new dep). `font-display` in CSS not audited fully.
- **Vite config:** minimal (`react()+tailwindcss()`), no manual chunks. Large assets: hero MP4 85MB.

## 3.12 Existing mobile patterns to reuse
- **Products:** `hse-pr-*` filter drawer (aside/backdrop/open state), horizontal hero/category chip scroll, focus-visible rings, min-heights 44px in controls, mobile breakpoints 1023.98/640/420, `prefers-reduced-motion`.
- **Projects:** `hse-pj-*` chip rows with nowrap overflow + edge mask <=600, hero art hidden <=600.
- **Brands:** new `hse-br-*` hero with clamp/clearance/skeleton.
- **Footer modal:** best focus/scroll-lock/portal reference.
- **Do not** create parallel drawer systems; extend/reuse `hse-pr` drawer pattern for Products only unless trivially generalizable without new infra — prefer page-local consistency first.

## 3.13 Plan (10 lines) — proceeding
1. **P0 baseline:** (done) tag/branch/report. Verify `tsc`/build after each phase.
2. **P1 Header/nav:** fix viewport `viewport-fit=cover`, drawer body scroll lock + focus return, topbar mobile shorten (keep tap-to-call), safe-area padding for sticky header, header offset vars on mobile, touch targets >=44; commit.
3. **P2 Typography/spacing:** global clamp/heading scale + section padding mobile rules via shared tokens/classes; body min 15–16px; commit.
4. **P3 Touch targets:** global/targeted min 44x44 + 8px spacing; before/after table in report; commit.
5. **P4 Forms:** all inputs/select/textarea >=16px on <768; add autocomplete attrs; stack rules already mostly OK; full-width >=48px submit; quote modal mobile full-screen/scroll/lock/close target; commit.
6. **P5 Grids/cards:** 1/2 col rules for product/project/brand/home cards; card actions stack at narrow widths if cramped; prevent overflow; commit.
7. **P6 Filters/chips/drawers:** unify chip horizontal scroll+snap+edge affordance; keep Products drawer pattern; verify body scroll/focus; commit.
8. **P7 Images/perf:** lazy/decode/width-height sweep (no lazy on LCP), responsive containment; add route-level `React.lazy`+`Suspense`; reduce heavy hero effects <480px where cheap; flag external images + 85MB MP4; commit.
9. **P8 Modals/sticky/floating:** quote modal full-screen mobile + footer-modal-quality behavior; sticky offsets/static tradeoffs; floating WA button only if exists/needed with safe-area and no overlap (verify first); commit.
10. **P9/P10 Sweep + verify:** page-by-page 320–768 fixes, 404 route? (out of scope to add route? 13.10 asks confirm 404 page; if no route exists, report plainly), run typecheck/build, report with required sections/honest testing method, no merge to main.
