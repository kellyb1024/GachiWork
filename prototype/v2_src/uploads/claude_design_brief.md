# GachiWork — Claude Design Brief v0.1

> Paste this document as the first instruction when starting a new Claude Design project. It is the single source of truth that keeps every screen on the same brand system.

---

## 0. One-line summary

**A mobile PWA that connects foreign workers in Korea (E-9 visa first) to information, experts, and peers in their own language.** A 50–500 user pilot. Design tone: **Quiet Confidence** — restrained, generous whitespace, trustworthy. Anything that feels "AI-generated, rainbow-colored, busy" is strictly forbidden.

---

## 1. Four Design Principles (every screen must follow)

1. **Two Voices** — Blue speaks structure and trust. Yellow speaks emphasis and warmth. Other hues appear only when they carry meaning (Danger, AI).
2. **Breath First** — Whitespace is not absence. It is the strongest design element. If a screen looks empty, you are doing it right.
3. **Trust Layered** — Every information card carries a source label (Official / Expert / Peer / AI).
4. **Thumb Reach** — Primary actions live in the bottom third of the screen. Reachable with one hand.

---

## 2. Color System (LOCKED — do not change)

### Brand (these two are the entire brand)
| Token | Hex | Use |
|-------|-----|-----|
| Primary | **#0047AB** (Cobalt) | CTA, logo, active state |
| Primary 700 | #00357F | hover, depth |
| Primary 50 | #E5EEFA | soft bg, chip background |
| Secondary | **#F59E0B** (Amber) | emphasis, verified badge — single color, no variants |

### Neutrals (the real workhorse)
| Token | Hex | Use |
|-------|-----|-----|
| Ink | #111827 | headings, emphasis |
| Ink Soft | #4B5563 | body text |
| Neutral | #6B7280 | supporting text |
| Line | #E5E7EB | dividers |
| Line Soft | #F3F4F6 | very subtle separation |
| BG | #F8FAFC | page background |
| Card | #FFFFFF | cards, inputs |

### Functional (NOT brand — single meaning each)
| Token | Hex | Use |
|-------|-----|-----|
| **Danger** | #FB1616 | rights-violation alerts only. Never decorative |
| **AI** | #7C3AED (Violet) | AI-generated content labels only (HCI principle) |

### ❌ Intentionally removed colors (forbidden)
- Success green — completion / positive states use Primary blue instead
- Warning orange — caution states use Secondary yellow instead
- Tertiary, brand purple, teal, coral, or any other added hue

### Color usage ratio (rule of thumb per screen)
- **Neutral 60%** / Blue 30% / Yellow 8% / Functional (red+violet combined) 2%

---

## 3. Typography (LOCKED)

- **One font only: Pretendard Variable** (covers Korean, Latin, Vietnamese)
- CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`

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

## 4. Geometry (LOCKED — no arbitrary values)

### Spacing — 4px base, 8 steps only
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`. **Values like 5px, 10px, 15px are forbidden.**

### Radius — 4 steps only
`4 (chip)` · `8 (button · input)` · `16 (card · modal)` · `999 (avatar · badge)`. **No arbitrary 12, 14, or 18.**

### Elevation — 3 steps only
- e-0: none (flat)
- e-1: `0 1px 2px rgba(17,24,39,.06), 0 1px 3px rgba(17,24,39,.04)` — cards
- e-2: `0 4px 12px rgba(17,24,39,.08), 0 2px 4px rgba(17,24,39,.04)` — modals, menus

**If four cards share the same shadow, that's not shadow — that's noise. Use only when meaningful.**

### Motion — 3 steps only
- `--t-fast` 150ms (button hover)
- `--t-base` 250ms (modal entrance)
- `--t-slow` 400ms (page transition)
- Easing: `cubic-bezier(.2,.8,.2,1)`. Never exceed 400ms.

---

## 5. Iconography Policy

- **One set only: Lucide** (https://lucide.dev). 1.75–2px stroke, 24px default.
- Sizes: 16 (small) · 20 (medium) · 24 (default) · 32 (emphasis). No other sizes.
- Never mix filled and line icons.
- **Keyboard emoji strictly forbidden** (🤖🏛⚠✓✗ — use line SVG instead). Reason: emoji rendering varies by OS, breaking consistency.

---

## 6. Logo

- Existing asset: `/Users/kellybae/Desktop/dev/GachiWork/brand/logo.png` (1254×1254 PNG)
- Form: rounded square app icon. Motif: speech bubble + two figures (white + yellow)
- Lockup (with wordmark): **Gachi=Primary blue · Work=Secondary yellow**
- Proportions: wordmark x-height ≈ 50% of logo height; gap = 1/4 of logo width
- Forbidden: recolor, distort, add shadow/outline/glow, rotate, mirror, place over photos or gradients

---

## 7. Trust Labels (HCI Critical)

**Every information card and every answer must carry one of the four labels below.** Not decoration — a core service promise.

| Label | Color | Meaning | Examples |
|-------|-------|---------|----------|
| 🏛 OFFICIAL | Primary blue fill + white text | Government / public agency | Ministry of Employment and Labor, HRD-Korea, EPS |
| 👤 EXPERT | Secondary yellow fill + white text | Verified expert direct reply | Labor attorney, lawyer, administrative agent |
| 🤝 PEER | Transparent + Neutral outline | Other workers' experience or opinion | Community posts, comments |
| 🤖 AI | **Violet (#7C3AED) bg/text** | AI-generated reply | FAQ chatbot, translation |

Label style: `display:inline-flex; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.04em; gap:4px` (12px Lucide line icon + label text).

### AI Provenance Principle (non-negotiable)
- AI-generated content **must always be visually separated** with a violet label and sparkle icon
- AI replies always include 👍/👎 rating buttons (5+ thumbs-down → auto-hidden)
- Showing AI replies with the same color/style as human replies destroys trust

---

## 8. Naming Rules for Internationalization (i18n)

| Selector | Notation | Examples |
|----------|----------|----------|
| **Country** | English, uniform | Cambodia, Indonesia, Nepal, Vietnam |
| **Language** | Native script | 한국어, English, Bahasa Indonesia, Tiếng Việt |

- Country sort: English alphabetical. "Việt Nam" → "Vietnam"
- Language sort: ① 한국어 · English at top (common languages) ② others alphabetical
- Country labels paired with SVG flag (`flag-icons` library, 24×18px, radius 3px)

### v1 supported languages (4)
한국어 / English / Bahasa Indonesia / Tiếng Việt

### v1 country list (16 E-9 sender countries, alphabetical)
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
- Height 44px. Text 15px. Radius 8. border=Line.
- Focus: border=Primary + box-shadow `0 0 0 3px Primary 50`
- Error: border=Danger + a friendly one-sentence message ("That format doesn't match. Try again.")

### Card
- bg=Card (#fff). border=Line. radius 16. padding 24.
- Interactive: hover → e-2 shadow + translateY(-1px)
- Top: Trust Label → title (16/700) → 2-line body (14/400) → meta (12/Neutral)

### Chip / Tag
- Height 28px. Radius 999 (pill). Text 12/600. padding 0 12.
- Variants: default (Line Soft) / Primary / Secondary / Danger / Outline

### Country dropdown (custom)
- Closed: SVG flag 24×18 + English country name on the left, chevron-down on the right
- Open: each option [flag + country name]; selected item gets Primary 50 background + check icon

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

## 11. Don'ts (explicitly rejected by user)

1. ❌ Adding meaningless colors like purple, teal, or coral
2. ❌ Gradient overuse (only the logo monogram is allowed)
3. ❌ Same shadow on every card
4. ❌ Arbitrary border-radius values (10, 14, 18, etc.)
5. ❌ Keyboard emoji (🤖🏛⚠ etc.) — replace with line SVG
6. ❌ 3D characters, Memoji, or stock illustrations
7. ❌ Rainbow categorical color coding
8. ❌ Meaningless flashy animations (>400ms)
9. ❌ Exposing technical codes like "Error 422" to users
10. ❌ Country names in native script (Việt Nam, 中国 forbidden) — English only
11. ❌ Language names in English only (Korean, Vietnamese forbidden) — native script
12. ❌ Adding Success green or Warning orange (intentionally removed)

---

## 12. v1 Screen Scope (10 screens)

Refactor the existing 6MB prototype (`prototype/gachiwork_interactive_prototype.html`) into a v2 by keeping/changing/removing the items below.

### 🟢 Onboarding
- **Landing / Welcome**: logo + lockup + short value statement + Login · Sign up CTA
- **Login**: User ID (Anonymous ID) + magic link or Google OAuth (no Naver). Welcome-back copy.
- **Sign up (3 steps)**:
  - Step 1 — Welcome: Language (native script) + Country (SVG flag + English) + Google OAuth
  - Step 2 — Who are you?: User Name + Industry + Visa type (E-9 default)
  - Step 3 (optional) — Visa verification: E-9 photo → ARC OCR (client-side, no server upload) / manual / skip

### 🟢 Primary (Hypothesis 1 — Information Accessibility)
- **Home**: logo + user name + Verified E-9 badge + segmented tabs (Followed Boards / Community Pages) + feed cards + FAB (compose) + bottom tab bar
- **Search**: search bar (recommend bottom-floating — Thumb Reach), Recent Searches (dismissible chips), Top Boards list, Trending Topics list (rank · count · trend)
- **Expert**: expert card list (avatar + name + rating pill + field + reply-language badges). Note banner for free/paid + response time

### 🟡 Secondary (Hypothesis 2 — Trust through Community, lightweight)
- **Board**: category header (no gradient — flat color block), horizontal-scrolling filter chips, same feed cards
- **Post Detail**: tags + title + time + author chip + body + comment list + actions (share, report, save). Like/comment counts shown
- **Inbox**: tabs (Notification / Chat) + notification/message list + unread badges

### 🟡 Personal
- **Profile**: large avatar + User_042 + meta (industry · region · country) + Verified E-9 + Trust Temperature bar (STABLE / VERIFIED / FLAMING) + tabs (My Posts / Replies / Followers)

### ❌ NOT in v1 (do not build)
- Payments / Stripe
- Naver OAuth (Google + magic link is enough)
- Ad banners (`.ad` class)
- Direct government API integration (info comes from curated static content)
- Realtime chat (async messaging is enough for v1)
- AI auto-categorization (defer to v2 after content accumulates)
- Languages beyond the four supported
- Native iOS/Android (PWA only)

---

## 13. Differences from the existing prototype (change summary)

| Item | Existing 6MB prototype | v2 |
|------|------------------------|-----|
| Color | Primary #2E74B5 (steel blue) + purple/teal/coral mix | **Primary #0047AB (cobalt) + yellow + functional only** |
| Gradients | auth-logo, btn, ad banners — everywhere | **Logo monogram only** |
| Shadow | Same shadow on every card | **e-1, e-2 — only when meaningful** |
| Categorical colors | Purple/teal/coral arbitrary | **Primary 50, Secondary 50, Neutral outline only** |
| Trust labels | None | **OFFICIAL / EXPERT / PEER / AI mandatory** |
| AI distinction | Generic gray chip | **Violet only (HCI principle)** |
| Country labels | Inconsistent | **English uniform, alphabetical, with SVG flag** |
| Language labels | "Korean", "Vietnamese" in English | **Native script (한국어, Tiếng Việt)** |
| Sign up | Single-step form | **3 steps split (each ~30–60s)** |
| Nickname | "Nickname" | **"User Name"** |

---

## 14. Output expectations

When the Claude Design work is complete, export as:
- HTML files into `prototype/v2/` folder
- Or a single HTML at `prototype/v2_design.html`
- **Claude Code (Kelly's coding agent) will then**:
  1. Audit any brand-kit violations (wrong hex, radius, shadow)
  2. Replace inline colors with `var(--primary)` etc. from the token system
  3. Wire up to `tokens.css` single source
  4. Commit to git and feed into the next stage (Next.js implementation)

---

## 15. Reference Files

- Brand kit (visual reference): `/Users/kellybae/Desktop/dev/GachiWork/brand/brand_kit.html` — share screenshots with Claude Design as visual context
- Design tokens (CSS): `/Users/kellybae/Desktop/dev/GachiWork/web/app/tokens.css` — all hex values, single source of truth
- Logo: `/Users/kellybae/Desktop/dev/GachiWork/brand/logo.png` (1254×1254 PNG)
- Deep Interview spec: `/Users/kellybae/Desktop/dev/GachiWork/.omc/specs/deep-interview-gachiwork-realapp.md`

---

## 16. Self-checklist (verify before exporting from Claude Design)

- [ ] No more than 3 hues per screen (Primary blue + Secondary yellow + neutrals + occasional Danger or AI)
- [ ] Every information card carries a Trust Label
- [ ] AI content is always separated by violet
- [ ] Primary CTAs sit in the bottom third of the screen
- [ ] Font is Pretendard Variable, single
- [ ] Border radius is one of 4 / 8 / 16 / 999
- [ ] Shadows are limited to e-0 / e-1 / e-2
- [ ] Zero keyboard emoji (🤖🏛⚠ etc.) — all line SVG
- [ ] Country in English, language in native script
- [ ] No payments, Naver OAuth, or ad banners on v1 screens
- [ ] All UI copy is in English (Korean appears only as one of the i18n options inside language switcher)

---

**End of Brief.** Paste this document as the instruction for a new Claude Design project, and additionally share `brand/brand_kit.html` as a visual reference to start the v2 design with consistent rules.
