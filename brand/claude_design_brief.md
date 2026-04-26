# GachiWork — Claude Design Brief v0.2

> Paste this entire document as the first instruction when starting a new Claude Design project. Single source of truth for brand + cross-device compatibility.

---

## 0. One-line summary

A mobile PWA that connects foreign workers in Korea (E-9 visa first) to information, experts, and peers in their own language. 50–500 user pilot. Design tone: **Quiet Confidence** — restrained, generous whitespace, trustworthy. Anything that feels "AI-generated, rainbow-colored, busy" is forbidden.

---

## 1. Four Design Principles

1. **Two Voices** — Blue speaks structure and trust. Yellow speaks emphasis and warmth. Other hues only when they carry meaning (Danger, AI).
2. **Breath First** — Whitespace is the strongest design element. Empty-looking is correct.
3. **Trust Layered** — Every information card carries a source label (Official / Expert / Peer / AI).
4. **Thumb Reach** — Primary actions live in the bottom third of the screen.

---

## 2. Color System (LOCKED — do not change)

### Brand (these two are the entire brand)
| Token | Hex | Use |
|-------|-----|-----|
| Primary | `#0047AB` (Cobalt) | CTA, logo, active state |
| Primary 700 | `#00357F` | hover, depth |
| Primary 50 | `#E5EEFA` | soft bg, chip background |
| Secondary | `#F59E0B` (Amber) | emphasis, verified badge — single color, no variants |

### Neutrals
| Token | Hex | Use |
|-------|-----|-----|
| Ink | `#111827` | headings, emphasis |
| Ink Soft | `#4B5563` | body text |
| Neutral | `#6B7280` | supporting text |
| Line | `#E5E7EB` | dividers |
| Line Soft | `#F3F4F6` | subtle separation |
| BG | `#F8FAFC` | page background |
| Card | `#FFFFFF` | cards, inputs |

### Functional (NOT brand — single meaning each)
| Token | Hex | Use |
|-------|-----|-----|
| Danger | `#FB1616` | rights-violation alerts only. Never decorative |
| AI | `#7C3AED` (Violet) | AI-generated content labels only (HCI principle) |

### ❌ Forbidden colors (do not use)
- Success green `#10B981` and any other green
- Warning orange `#D97706` and any other orange
- Old steel blue `#2E74B5` (replaced by Cobalt)
- Tertiary, brand purple, teal, coral, indigo, or any added hue
- Tailwind slate / gray family beyond the 7 neutrals listed above

### Color usage ratio per screen
Neutral 60% / Blue 30% / Yellow 8% / Functional 2%

---

## 3. Typography (LOCKED)

- **One font only: Pretendard Variable**
- CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`
- Apply at `:root` AND `body { font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }`
- All form elements (input, select, textarea, button) must `font-family: inherit !important;`

### Type Scale
| Role | Size / Weight | Line-height |
|------|--------------|-------------|
| Display | 40px / 700 | 1.1 |
| H1 | 28px / 700 | 1.2 |
| H2 | 22px / 700 | 1.3 |
| H3 | 18px / 600 | 1.4 |
| Body | 16px / 400 | 1.6 |
| Small | 14px / 400 | 1.5 |
| Caption | 12px / 500 | 1.4 |

- Korean headings: letter-spacing -0.01em
- Vietnamese: line-height ≥ 1.6 (avoid clipping diacritics)

---

## 4. Geometry (LOCKED)

- **Spacing** (4px base, 8 steps only): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`. No 5, 10, 15, 18, etc.
- **Radius** (4 steps only): `4` (chip) · `8` (button, input) · `16` (card, modal) · `999` (pill, avatar). No 10, 12, 14, 18.
- **Elevation** (3 steps only):
  - `e-0`: none (flat)
  - `e-1`: `0 1px 2px rgba(17,24,39,.06), 0 1px 3px rgba(17,24,39,.04)` — cards
  - `e-2`: `0 4px 12px rgba(17,24,39,.08), 0 2px 4px rgba(17,24,39,.04)` — modals, menus
- **Motion** (3 steps only): `--t-fast` 150ms · `--t-base` 250ms · `--t-slow` 400ms. Easing: `cubic-bezier(.2,.8,.2,1)`. Never exceed 400ms.

If four cards share the same shadow, that's noise — use only when meaningful.

---

## 5. Iconography

- **Lucide line SVG only** (https://lucide.dev). 1.75–2px stroke.
- Sizes: 16 / 20 / 24 (default) / 32. Nothing else.
- Never mix filled and line icons.
- **Zero keyboard emoji** (🤖🏛⚠✓✗ etc.) — replace every one with line SVG. Reason: emoji rendering varies by OS, breaking consistency.

---

## 6. Logo

- Asset: `/Users/kellybae/Desktop/dev/GachiWork/brand/logo.png` (1254×1254)
- Form: rounded square app icon. Motif: speech bubble + two figures (white + yellow).
- Lockup with wordmark: **Gachi=Primary blue · Work=Secondary yellow**
- Wordmark x-height ≈ 50% of logo height. Gap = 1/4 of logo width.
- Forbidden: recolor, distort, add shadow/outline/glow, rotate, mirror, place over photos or gradients.

---

## 7. Trust Labels (HCI Critical)

Every information card and every answer must carry one of the four labels below.

| Label | Color | Meaning | Examples |
|-------|-------|---------|----------|
| OFFICIAL | Primary blue fill + white text | Government / public agency | Ministry of Employment and Labor, HRD-Korea, EPS |
| EXPERT | Secondary yellow fill + white text | Verified expert direct reply | Labor attorney, lawyer, administrative agent |
| PEER | Transparent + Neutral outline | Other workers' experience or opinion | Community posts, comments |
| AI | Violet (#7C3AED) bg/text | AI-generated reply | FAQ chatbot, translation |

Style: `display:inline-flex; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.04em; gap:4px` (12px Lucide line icon + label text).

### AI Provenance Principle (non-negotiable)
- AI content always separated by violet label + sparkle icon
- AI replies always include thumbs-up / thumbs-down buttons (5+ thumbs-down → auto-hidden)
- Showing AI replies with the same color/style as human replies destroys trust

---

## 8. i18n Naming Rules

| Selector | Notation | Examples |
|----------|----------|----------|
| **Country** | English, uniform | Cambodia, Indonesia, Nepal, Vietnam |
| **Language** | Native script | 한국어, English, Bahasa Indonesia, Tiếng Việt |

- Country sort: English alphabetical. Never "Việt Nam" → use "Vietnam".
- Language sort: ① 한국어 · English at top ② others alphabetical.
- Country labels paired with SVG flag (`flag-icons` library, 24×18px, radius 3px).

### v1 supported languages (4)
한국어 / English / Bahasa Indonesia / Tiếng Việt

### v1 country list (16, alphabetical)
Bangladesh · Cambodia · China · East Timor · Indonesia · Kyrgyzstan · Laos · Mongolia · Myanmar · Nepal · Pakistan · Philippines · Sri Lanka · Thailand · Uzbekistan · Vietnam

---

## 9. Component Specs

### Button
- Height 44px (sm 32 · lg 52). Text 15px / 600. Radius 8.
- Primary: bg=Primary, text=#fff, hover bg=Primary 700
- Secondary: bg=Secondary, text=#fff, hover `filter:brightness(.92)`
- Ghost: bg=transparent, border=Line, text=Ink, hover bg=Line Soft
- Danger: bg=Danger, text=#fff
- Disabled: opacity .4

### Input
- Height 44px. Text 15px (set explicitly to prevent iOS Safari auto-zoom). Radius 8. border=Line.
- Focus: border=Primary + box-shadow `0 0 0 3px Primary 50`
- Error: border=Danger + a friendly one-sentence message

### Card
- bg=Card. border=Line. radius 16. padding 24.
- Interactive: hover → e-2 shadow + translateY(-1px)
- Top: Trust Label → title (16/700) → 2-line body (14/400) → meta (12/Neutral)

### Chip / Tag
- Height 28px. Radius 999. Text 12/600. padding 0 12.
- Variants: default (Line Soft) / Primary / Secondary / Danger / Outline

### Country dropdown (custom, not native select)
- Closed: SVG flag 24×18 + English country name on the left, chevron-down on the right
- Open: each option [flag + country name]; selected gets Primary 50 background + check icon

---

## 10. Voice & Tone

Core: **Direct · Warm · Honest**. Don't mix formal and casual within the same surface.

| Situation | Yes | No |
|-----------|-----|----|
| Guidance | "Do this." | "It might be a good idea to consider doing this." |
| Errors | "That format doesn't match. Try again." | "An error occurred (Error 422)." |
| Uncertainty | "Not sure? Ask an expert." | "This service does not provide legal advice." |
| Encouragement | "You're doing great." | "You got this!! 💪💪" |

- Avoid emoticons (haha, lol, ^^) and exclamation stacking
- "Nickname" → **"User Name"**
- Anonymous IDs are IRB-consent-based: format like "Anonymous_187" is acceptable

---

## 11. Don'ts

1. ❌ Adding meaningless colors (purple, teal, coral, indigo, slate variants beyond the 7 neutrals)
2. ❌ Gradient overuse (only the logo monogram is allowed)
3. ❌ Same shadow on every card
4. ❌ Arbitrary border-radius values (10, 14, 18, etc.)
5. ❌ Keyboard emoji (🤖🏛⚠ etc.) — replace with line SVG
6. ❌ 3D characters, Memoji, or stock illustrations
7. ❌ Rainbow categorical color coding
8. ❌ Animations longer than 400ms
9. ❌ Exposing technical codes like "Error 422" to users
10. ❌ Country names in native script (Việt Nam, 中国 forbidden) — English only
11. ❌ Language names in English only (Korean, Vietnamese forbidden) — native script
12. ❌ Adding Success green or Warning orange (intentionally removed)
13. ❌ System font fallback overriding Pretendard (always set body font-family explicitly)

---

## 12. v1 Screen Scope (10 screens)

### 🟢 Onboarding
- **Landing** — logo + lockup + short value statement + Sign up / Log in CTAs
- **Login** — User Name (Anonymous ID) + magic link or Google OAuth (NO Naver). Welcome-back copy.
- **Sign up (3 steps)**:
  - Step 1 — Welcome: Language (native script) + Country (SVG flag + English) + Google OAuth
  - Step 2 — Who are you?: User Name + Industry + Visa type (E-9 default)
  - Step 3 (optional) — Visa verification: E-9 photo → ARC OCR (client-side, no server upload) / manual / skip

### 🟢 Primary (Hypothesis 1 — Information Accessibility)
- **Home** — logo + user name + Verified E-9 badge + segmented tabs (Followed Boards / Community Pages) + feed cards + FAB (compose) + bottom tab bar
- **Search** — search bar (bottom-floating preferred — Thumb Reach), Recent Searches (dismissible chips), Top Boards list, Trending Topics list (rank · count · trend)
- **Expert** — expert card list (avatar + name + rating pill + field + reply-language badges). Note banner for free/paid + response time

### 🟡 Secondary (Hypothesis 2 — Trust through Community, lightweight)
- **Board** — category header (NO gradient — flat color block), horizontal-scrolling filter chips, same feed cards
- **Post Detail** — tags + title + time + author chip + body + comment list + actions (share, report, save). Like/comment counts shown
- **Inbox** — tabs (Notification / Chat) + notification/message list + unread badges

### 🟡 Personal
- **Profile** — large avatar + User_042 + meta (industry · region · country) + Verified E-9 + Trust Temperature bar (STABLE / VERIFIED / FLAMING) + tabs (My Posts / Replies / Followers)

### ❌ NOT in v1
- Payments / Stripe
- Naver OAuth (Google + magic link is enough)
- Ad banners
- Direct government API integration
- Realtime chat (async messaging is enough)
- AI auto-categorization (defer to v2)
- Languages beyond the four supported
- Native iOS/Android (PWA only)

---

## 13. Cross-Device Compatibility (CRITICAL — applies to every screen)

The output must render correctly on iOS Safari, Android Chrome, Samsung Internet (Galaxy default), and desktop browsers. Apply these layout rules to prevent clipping/overflow.

### 13.1 Viewport meta (in <head>)
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="#0047AB">
```

### 13.2 Viewport height — use dvh, never plain vh
- Replace every `100vh` with: `min-height: 100dvh; min-height: -webkit-fill-available;` (fallback)
- For full-screen containers always provide both.
- Reason: Safari iOS calculates `100vh` including the URL bar, pushing the bottom out of view.

### 13.3 Safe-area insets (notch + home indicator + Android nav)
- Bottom-fixed elements (tab bar, FAB, sticky CTA):
  ```css
  padding-bottom: max(env(safe-area-inset-bottom), 24px);
  ```
- Top status / app bars:
  ```css
  padding-top: max(env(safe-area-inset-top), 8px);
  ```
- Side gutters (landscape iPhones):
  ```css
  padding-left: max(env(safe-area-inset-left), 16px);
  padding-right: max(env(safe-area-inset-right), 16px);
  ```

### 13.4 Webkit prefixes (always pair)
- `backdrop-filter` ↔ `-webkit-backdrop-filter`
- `user-select: none` ↔ `-webkit-user-select: none`
- `appearance` ↔ `-webkit-appearance`
- Add `-webkit-overflow-scrolling: touch` to scrollable containers

### 13.5 Border-radius + overflow clipping bug (Safari)
- When a parent has `border-radius` and child elements with backgrounds, add to the parent:
  ```css
  isolation: isolate;
  /* or */
  transform: translateZ(0);
  ```
- This prevents Safari from failing to clip child backgrounds.

### 13.6 Touch targets
- Minimum 48×48 dp (covers iOS 44pt + Android 48dp recommendation in one)
- Apply to all buttons, links, icon buttons, dropdown handles

### 13.7 Form input zoom prevention (iOS)
- All `<input>`, `<select>`, `<textarea>` must have `font-size: 16px` minimum
- Smaller font triggers Safari iOS auto-zoom on focus

### 13.8 Samsung Internet (Galaxy) specifics
- Samsung Internet's UA may inject custom CSS for form controls — defend with:
  ```css
  input, select, textarea, button { font-family: inherit !important; }
  ```
- Pull-to-refresh interferes with full-screen drag interactions — disable on body if needed:
  ```css
  body { overscroll-behavior-y: contain; }
  ```

### 13.9 Body scroll lock (when modal opens)
- Apply to BOTH html and body:
  ```css
  html.modal-open, body.modal-open { overflow: hidden; height: 100%; }
  body.modal-open { position: fixed; width: 100%; }
  ```

### 13.10 Test viewports (must all pass)
- iPhone SE (375×667) — minimum
- iPhone 14 Pro (393×852) — notch
- Galaxy S22 (360×780) — Samsung Internet
- Galaxy A series (412×915)
- Pixel 7 (412×915) — Chrome Android
- iPad mini (768×1024) — desktop fallback
- Desktop 1280×720

Bottom tab bar, FAB, primary CTA buttons MUST be visible without scrolling on every viewport above.

---

## 14. Output Format

Single self-contained HTML file. Required:
- All React, Babel, and assets inlined (no external script src that depends on remote CDN beyond Pretendard + Lucide + flag-icons CSS)
- The bundle bootstrapper output must end with the actual app HTML, NOT a thumbnail SVG placeholder
- File works when opened directly via file:// (no HTTP server required)
- All UI copy in English (Korean appears only as one of the i18n options inside the language switcher)

---

## 15. Self-Checklist (verify before exporting)

- [ ] Pretendard Variable loaded AND applied to body (not falling back to system font)
- [ ] All viewport heights use `100dvh` + `-webkit-fill-available` fallback
- [ ] All bottom-fixed elements use `padding-bottom: max(env(safe-area-inset-bottom), 24px)`
- [ ] `<meta name="viewport" content="...viewport-fit=cover">` is in <head>
- [ ] Form inputs have `font-size: 16px` minimum (no iOS zoom)
- [ ] Form inputs have `font-family: inherit !important` (Samsung Internet defense)
- [ ] All input touch targets ≥ 48×48 px
- [ ] Zero keyboard emoji (🤖🏛⚠ etc.) — every one is a Lucide line SVG
- [ ] Country names are English (Vietnam, not Việt Nam)
- [ ] Language names are native script (한국어, not Korean)
- [ ] Every information card carries an OFFICIAL / EXPERT / PEER / AI label
- [ ] AI content is always violet (#7C3AED), never same style as human content
- [ ] Border radius is one of 4 / 8 / 16 / 999
- [ ] Shadows are only e-0 / e-1 / e-2
- [ ] No payments, Naver OAuth, ad banners, or animations >400ms
- [ ] No Success green (#10B981), Warning orange (#D97706), or any extra hue
- [ ] Output renders correctly on iPhone SE 375×667 (smallest target)
- [ ] Output renders correctly on Galaxy S22 360×780 in Samsung Internet
- [ ] Bundle output is the real app, NOT a thumbnail SVG placeholder

---

**End of Brief.** Paste this entire document as the instruction for a new Claude Design project, then attach `brand/logo.png` and screenshots of `brand/brand_kit.html` for visual reference.
