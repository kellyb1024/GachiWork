# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single-page static HTML document presenting the user flow for **GachiWork**, a service concept for E-9 foreign workers in Korea. No build system, no package manager, no JavaScript framework — just one HTML file with an inlined `<style>` block, served as-is.

Content is written in Korean. The document is structured as four numbered flows (온보딩 / 핵심 사용 / 권리 보호 / 정착) plus an SVG overview.

## Repository layout

- [index.html](index.html) — the canonical file served by GitHub Pages.
- [gachiwork_userflow.html](gachiwork_userflow.html) — a byte-identical duplicate of `index.html` kept alongside it (likely the original filename before the Pages rename). **When editing, update both files** or the duplicate will drift.
- [.github/workflows/pages.yml](.github/workflows/pages.yml) — uploads the entire repo root (`path: '.'`) as the Pages artifact on every push to `main`.

## Working on the document

- **Preview**: open `index.html` directly in a browser — no dev server needed. GitHub Pages serves the same file unchanged.
- **Deploy**: push to `main`. The Pages workflow rebuilds and publishes automatically.
- **Styling**: all CSS lives in the `<style>` block near the top of `index.html`. Color tokens are defined as CSS custom properties on `:root` (purple / teal / coral / gray / amber / blue families, each with 50/100/600/800 variants). Reuse these tokens rather than introducing new hex values.
- **Typography**: Noto Sans KR for body, JetBrains Mono for monospace labels (section numbers, tech tags), both loaded from Google Fonts.
- **Responsive breakpoint**: `@media (max-width: 640px)` near the end of the style block — collapses the flow into single-column.

## Conventions to preserve

- The document is Korean-first. Headings, descriptions, and examples are in Korean; English is used only for section labels like `Flow 01` and technical tags.
- Each flow section follows the same structure: `.section-header` → `.problem-context` (coral callout stating the problem being solved) → `.flow-container` with vertically-connected `.flow-step` entries. Preserve this rhythm when adding or editing flows.
- Step dots use color classes (`purple`/`teal`/`coral`/`gray`/`amber`/`blue`) with optional `filled` modifier — the color signals which actor/phase the step belongs to, so don't pick arbitrarily.