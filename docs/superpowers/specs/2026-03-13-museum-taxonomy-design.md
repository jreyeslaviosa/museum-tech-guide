# Museum Creative Tech Taxonomy — Design Spec

**Date:** 2026-03-13
**Project:** Interactive Creative Technology Taxonomy for Museum Tech Team

---

## Overview

A browsable, interactive learning resource for a museum tech team and mixed staff (producers, curators, project managers). Staff can explore the museum's technology landscape, learn about tools and techniques, and discover how technologies relate to each other.

Inspired by [Creative Tech Taxonomy](https://laserpilot.github.io/Creative_Tech_Taxonomy/#tree). Focused on interactive and immersive art, with emphasis on projection, LED displays, DMX/ArtNet lighting, and physical computing.

---

## Goals

- Help mixed-technical staff understand what technologies the team works with
- Provide a rich learning resource per technology (not just a name list)
- Easy for the tech team to maintain and extend by editing markdown files
- Deployed as a static site, no server required

---

## Architecture

**Stack:** Astro (static site generator) + Fuse.js (client-side fuzzy search)
**Node.js:** >=18.17.1 (Astro 4.x minimum — pin in `.nvmrc` and `package.json` `engines` field)
**Package manager:** npm
**Hosting:** GitHub Pages, deployed automatically via GitHub Actions on push to `main`
**Output:** Fully static site — no server, no API, works offline

### Routing & Deep Links

The site uses Astro's static output with a **single `index.html` page** (`src/pages/index.astro`). The tree and detail panel are rendered on this one page; entry navigation happens via client-side JavaScript updating the URL hash (`#display/advatek-pixlite`) and swapping the detail panel content without a page reload.

- Deep links work: sharing `/#display/advatek-pixlite` loads the page and opens that entry automatically
- Browser back/forward button navigates between previously viewed entries via `hashchange` events
- No client-side router library needed — hash-based navigation is sufficient

### GitHub Pages Base Path

The repo will be served from `https://<org>.github.io/<repo-name>/`. Astro must be configured with:

```js
// astro.config.mjs
export default defineConfig({
  base: '/<repo-name>/',
  output: 'static',
})
```

All internal asset paths and the `search-index.json` fetch must use Astro's `import.meta.env.BASE_URL` prefix.

### Content Structure

One markdown file per technology entry, organized in folders by category:

```
src/content/
├── display/
│   ├── advatek-pixlite.md
│   ├── resolume-arena.md
│   ├── watchout.md
│   └── ...
├── light/
│   ├── artnet.md
│   ├── dmx-basics.md
│   └── ...
├── sound/
├── physical/
│   ├── arduino.md
│   ├── stepper-motors.md
│   └── ...
└── interaction/
    ├── kinect.md
    ├── lidar.md
    └── ...
```

Categories with no entries are suppressed from the tree at build time (empty folders do not produce nodes).

### Frontmatter Schema

Defined using Astro's Content Collections (`src/content/config.ts` with Zod):

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `title` | string | yes | — | Display name |
| `subcategory` | string | yes | — | Groups entries within a category |
| `skill_level` | `beginner` \| `intermediate` \| `advanced` | no | `beginner` | Shown as badge in detail panel |
| `we_use_this` | boolean | no | `false` | Renders badge in detail panel; dot indicator in tree |
| `related` | string[] | no | `[]` | Slugs matching filenames without `.md` (e.g. `artnet` → `light/artnet.md`). Slugs must be unique across the whole content tree — if two files in different categories share a base name, use `category/slug` form (e.g. `light/osc`) to disambiguate. Duplicate bare-name matches are a build error. Unresolved slugs are skipped with a build warning. |
| `tags` | string[] | no | `[]` | Used for search indexing only, not rendered in UI |

Build fails on missing required fields. Unknown fields produce a build warning.

### Entry Format

```yaml
---
title: Advatek PixLite
subcategory: LED Systems
skill_level: intermediate
we_use_this: true
related: [artnet, touchdesigner, led-strip]
tags: [led, controller, ethernet, pixel]
---

Description paragraph here...

## Use Cases
- Driving large LED pixel arrays in immersive rooms
- Synchronised lighting walls controlled via TouchDesigner

## Museum Examples
- Rain Room installation, 2023

## Learning Resources
- [Official Advatek docs](https://...)
- [ArtNet + TouchDesigner tutorial](https://...)
```

**Adding a new entry** = create a new `.md` file in the appropriate category folder. No app code changes needed.

---

## Frontend Components

### TreeNav (left sidebar)
- Collapsible tree with top-level category nodes: Display, Light, Sound, Physical, Interaction
- Categories with no entries are hidden
- Each category expands to subcategories (auto-generated from `subcategory` frontmatter), which expand to individual entries; subcategory strings are normalised to lowercase at build time to prevent duplicate nodes from capitalisation mismatches
- Active entry is highlighted in the tree
- Entries with `we_use_this: true` show a small dot indicator next to their name in the tree

### SearchBar (above tree)
- Fuse.js fuzzy search across `title`, markdown body text, and `tags`
- While a search query is active, the tree is replaced by a **flat list of matching entries** (same pattern as the reference site)
- Each result shows: entry title + category breadcrumb
- Clicking a result loads the entry in the detail panel and clears the search
- Clear button / empty query restores the full tree
- If `search-index.json` fails to load (e.g. offline), the search bar shows a disabled state with a brief error message; tree browsing remains fully functional

### DetailPanel (right side)
- Header: title, category badge, skill level badge, "We use this" badge (if `we_use_this: true`)
- Body sections: Description, Use Cases, Museum Examples, Related Tools (clickable links that navigate to that entry), Learning Resources
- Default state (no entry selected): welcome message explaining the taxonomy and how to navigate it
- Not-found state (hash points to a non-existent entry): "Entry not found" message with a link back to the home state

### Layout
- Single-page app feel — tree and detail panel always visible side by side (tree ~280px, panel fills remaining width)
- Mobile (< 768px): tree collapses behind a hamburger menu button; selecting an entry closes the menu and shows the detail panel; a "Browse" button reopens the tree. Browser back/forward navigates between previously viewed entries (via hash history); the "Browse" button is the explicit mechanism to reopen the tree menu.

---

## Data Flow

**Build time:**
1. Astro reads all `.md` files via Content Collections, validates frontmatter with Zod schema
2. Builds `dist/index.html` with all category/entry metadata embedded as a JSON blob in a `<script>` tag (tree data — titles, slugs, subcategories, `we_use_this` flags)
3. A `postbuild` npm script (`scripts/build-search-index.mjs`) reads `src/content/**/*.md`, extracts title + body text + tags, and writes `dist/search-index.json`

**Note on page weight:** All entry body HTML is embedded in `index.html` at build time. This is intentional for the expected content scale (tens to low hundreds of entries). If the site grows significantly beyond ~200 entries, consider switching to per-entry static routes with client-side fetching.

**Runtime:**
1. Page loads; tree is populated from the embedded JSON blob (instant, no fetch)
2. Fuse.js index is built lazily on first keystroke in the search bar (fetches `search-index.json`)
3. Clicking a tree node updates the URL hash and renders the entry's full markdown content (pre-rendered into the HTML) in the detail panel

---

## Deployment

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

Triggered on push to `main`:
1. Checkout repo
2. Setup Node.js (pin version from `.nvmrc`)
3. `npm ci`
4. `npm run build` (includes `postbuild` search index script)
5. Upload artifact with `actions/upload-pages-artifact@v3` and deploy with `actions/deploy-pages@v4`

### Contribution Workflow for Tech Team

```
1. Create or edit a .md file in src/content/<category>/
2. git commit + push to main
3. GitHub Actions builds and deploys automatically (~1-2 min)
```

Entries can also be edited directly in GitHub's web UI — no local setup required.

---

## Content Priorities

**High priority (seed content):**
- Projection & Mapping (Resolume, Watchout, TouchDesigner)
- LED Systems (Advatek PixLite, pixel tape, LED panels)
- DMX / ArtNet (protocol basics, QLC+, lighting desks)
- Physical Computing (Arduino, stepper motors, servos)

**Medium priority:**
- Show Control & Automation
- Networking & Protocols (OSC, MIDI, NDI, sACN)
- Interaction & Sensing (Kinect, LIDAR, cameras)

**Lower priority:**
- Sound
- Asset Creation tools

---

## Out of Scope

- Admin UI or CMS — tech team edits files directly
- User accounts or authentication
- Comments or community contributions
- Asset management or file hosting
