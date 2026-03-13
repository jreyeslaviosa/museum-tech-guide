# Museum Creative Tech Taxonomy — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, browsable taxonomy website for museum tech staff — tree sidebar navigation, rich entry detail panel, and client-side fuzzy search — deployed to GitHub Pages.

**Architecture:** Single Astro page (`index.astro`) pre-renders all entry content as hidden `<article>` elements. Tree metadata is embedded as a JSON blob in a `<script>` tag. Client-side vanilla TypeScript handles hash-based navigation, tree expand/collapse, and lazy Fuse.js search. A `postbuild` script generates `search-index.json`.

**Tech Stack:** Astro 4.x, TypeScript, Zod (Astro Content Collections), Fuse.js, Vitest, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-03-13-museum-taxonomy-design.md`

---

## File Map

### Created
- `.nvmrc` — Node version pin (18.17.1)
- `.gitignore` — Standard Astro ignore + `.superpowers/`
- `astro.config.mjs` — Astro config: `base`, `output: static`
- `package.json` — Dependencies + scripts (`build`, `dev`, `test`)
- `tsconfig.json` — TypeScript strict config
- `vitest.config.ts` — Vitest config (globals: true)
- `src/content/config.ts` — Zod schema for all 5 content collections
- `src/data/categories.ts` — Category metadata (emoji, label, canonical order)
- `src/lib/taxonomy.ts` — `buildTree`, `parseHash`, `serializeHash`, `buildEntryId`, `resolveRelated`
- `src/lib/taxonomy.test.ts` — Vitest tests for all exported functions
- `src/styles/global.css` — All CSS (layout, tree, search, detail panel, mobile)
- `src/components/TreeNav.astro` — Left sidebar collapsible tree
- `src/components/SearchBar.astro` — Search input HTML
- `src/components/EntryCard.astro` — Single entry rendered as hidden article
- `src/pages/index.astro` — Main page: loads collections, renders tree + all entries
- `src/scripts/app.ts` — Client-side: navigation, tree toggle, search
- `scripts/build-search-index.mjs` — postbuild: writes `dist/search-index.json`
- `.github/workflows/deploy.yml` — GitHub Actions deploy to Pages
- `src/content/display/advatek-pixlite.md`
- `src/content/display/touchdesigner.md`
- `src/content/display/resolume-arena.md`
- `src/content/display/led-strip.md`
- `src/content/light/artnet.md`
- `src/content/light/dmx-basics.md`
- `src/content/physical/arduino.md`
- `src/content/physical/stepper-motors.md`
- `src/content/interaction/kinect.md`

---

## Chunk 1: Setup & Data Layer

### Task 1: Initialise project

**Files:**
- Create: `.nvmrc`
- Create: `astro.config.mjs`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `.gitignore`

- [ ] **Step 1.0: Determine repo name for GitHub Pages base path**

The Astro `base` config must match the GitHub repository name exactly.

```bash
# If the repo already exists:
git remote get-url origin
# e.g. https://github.com/mymuseum/taxo → repo name is "taxo"

# If not yet created, decide the repo name now (e.g. "taxo") and use it throughout.
```

Write the repo name down — it will be used in Step 1.5 and Task 10.

- [ ] **Step 1.1: Create `.nvmrc`**

```
18.17.1
```

- [ ] **Step 1.2: Scaffold Astro project**

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-git --install
```

Accept all prompts. This generates `package.json`, `astro.config.mjs`, `tsconfig.json`, and `src/pages/index.astro`.

- [ ] **Step 1.3: Install runtime and dev dependencies**

```bash
npm install fuse.js
npm install --save-dev vitest @vitest/coverage-v8
```

- [ ] **Step 1.4: Update `package.json`**

Add `engines` and update `scripts`:

```json
{
  "engines": { "node": ">=18.17.1" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && node scripts/build-search-index.mjs",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 1.5: Replace `astro.config.mjs`**

Use the repo name determined in Step 1.0 (e.g. `taxo`):

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'

export default defineConfig({
  base: '/taxo/',   // ← replace 'taxo' with your actual repo name from Step 1.0
  output: 'static',
})
```

- [ ] **Step 1.6: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
})
```

- [ ] **Step 1.7: Update `.gitignore`**

Ensure these lines are present (Astro's default template includes most):

```
dist/
.astro/
node_modules/
.env
.DS_Store
.superpowers/
```

- [ ] **Step 1.8: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts at `http://localhost:4321`, no errors.

- [ ] **Step 1.9: Commit**

```bash
git init
git add .nvmrc .gitignore package.json astro.config.mjs tsconfig.json vitest.config.ts
git commit -m "chore: initialise Astro project"
```

---

### Task 2: Content collection schema

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 2.1: Create `src/content/config.ts`**

```ts
import { z, defineCollection } from 'astro:content'

const entrySchema = z.object({
  title: z.string(),
  subcategory: z.string(),
  skill_level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  we_use_this: z.boolean().default(false),
  related: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
})

export type EntryFrontmatter = z.infer<typeof entrySchema>

const collection = { type: 'content' as const, schema: entrySchema }

export const collections = {
  display:     defineCollection(collection),
  light:       defineCollection(collection),
  sound:       defineCollection(collection),
  physical:    defineCollection(collection),
  interaction: defineCollection(collection),
}
```

- [ ] **Step 2.2: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: add content collection schema"
```

---

### Task 3: Taxonomy data layer + tests

**Files:**
- Create: `src/data/categories.ts`
- Create: `src/lib/taxonomy.test.ts`
- Create: `src/lib/taxonomy.ts`

- [ ] **Step 3.1: Create `src/data/categories.ts`**

```ts
export type Category = 'display' | 'light' | 'sound' | 'physical' | 'interaction'

export const CATEGORIES: Category[] = [
  'display', 'light', 'sound', 'physical', 'interaction',
]

export const CATEGORY_META: Record<Category, { label: string; emoji: string }> = {
  display:     { label: 'Display',     emoji: '🖥️' },
  light:       { label: 'Light',       emoji: '💡' },
  sound:       { label: 'Sound',       emoji: '🔊' },
  physical:    { label: 'Physical',    emoji: '⚙️' },
  interaction: { label: 'Interaction', emoji: '🤝' },
}
```

- [ ] **Step 3.2: Write failing tests**

Create `src/lib/taxonomy.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import {
  buildTree,
  parseHash,
  serializeHash,
  buildEntryId,
  resolveRelated,
} from './taxonomy'
import type { EntryMeta } from './taxonomy'

const make = (overrides: Partial<EntryMeta> = {}): EntryMeta => ({
  slug: 'test',
  category: 'display',
  title: 'Test',
  subcategory: 'Sub A',
  normalizedSubcategory: 'sub a',
  skill_level: 'beginner',
  we_use_this: false,
  related: [],
  tags: [],
  ...overrides,
})

describe('buildTree', () => {
  it('returns [] for no entries', () => {
    expect(buildTree([])).toEqual([])
  })

  it('groups entries by category', () => {
    const entries = [
      make({ category: 'display', slug: 'a' }),
      make({ category: 'light',   slug: 'b' }),
    ]
    const tree = buildTree(entries)
    expect(tree).toHaveLength(2)
    expect(tree[0].category).toBe('display')
    expect(tree[1].category).toBe('light')
  })

  it('groups entries into subcategories within a category', () => {
    const entries = [
      make({ slug: 'a', subcategory: 'LED Systems',  normalizedSubcategory: 'led systems' }),
      make({ slug: 'b', subcategory: 'Projection',   normalizedSubcategory: 'projection' }),
      make({ slug: 'c', subcategory: 'LED Systems',  normalizedSubcategory: 'led systems' }),
    ]
    const tree = buildTree(entries)
    expect(tree[0].subcategories).toHaveLength(2)
    const led = tree[0].subcategories.find(s => s.normalizedName === 'led systems')!
    expect(led.entries).toHaveLength(2)
  })

  it('deduplicates subcategories case-insensitively', () => {
    const entries = [
      make({ slug: 'a', subcategory: 'LED Systems', normalizedSubcategory: 'led systems' }),
      make({ slug: 'b', subcategory: 'led systems', normalizedSubcategory: 'led systems' }),
    ]
    const tree = buildTree(entries)
    expect(tree[0].subcategories).toHaveLength(1)
    expect(tree[0].subcategories[0].entries).toHaveLength(2)
  })

  it('omits categories with no entries', () => {
    const entries = [make({ category: 'display' })]
    const tree = buildTree(entries)
    expect(tree).toHaveLength(1)
    expect(tree[0].category).toBe('display')
  })

  it('preserves canonical category order', () => {
    const entries = [
      make({ category: 'interaction', slug: 'i' }),
      make({ category: 'display',     slug: 'd' }),
      make({ category: 'light',       slug: 'l' }),
    ]
    const tree = buildTree(entries)
    expect(tree.map(n => n.category)).toEqual(['display', 'light', 'interaction'])
  })
})

describe('parseHash', () => {
  it('returns null for empty or missing hash', () => {
    expect(parseHash('')).toBeNull()
    expect(parseHash('#')).toBeNull()
  })

  it('returns null for hash with no slash', () => {
    expect(parseHash('#noslash')).toBeNull()
  })

  it('parses a valid category/slug hash', () => {
    expect(parseHash('#display/advatek-pixlite')).toEqual({
      category: 'display',
      slug: 'advatek-pixlite',
    })
  })
})

describe('serializeHash', () => {
  it('produces #category/slug', () => {
    expect(serializeHash('display', 'advatek-pixlite')).toBe('#display/advatek-pixlite')
  })
})

describe('buildEntryId', () => {
  it('produces entry-category-slug', () => {
    expect(buildEntryId('display', 'advatek-pixlite')).toBe('entry-display-advatek-pixlite')
  })
})

describe('resolveRelated', () => {
  const pool: EntryMeta[] = [
    make({ slug: 'artnet',        category: 'light'   }),
    make({ slug: 'touchdesigner', category: 'display' }),
    make({ slug: 'led-strip',     category: 'display' }),
  ]

  it('resolves a bare slug', () => {
    const result = resolveRelated(['artnet'], pool)
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('artnet')
  })

  it('resolves a category/slug qualified ref', () => {
    const result = resolveRelated(['display/touchdesigner'], pool)
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('touchdesigner')
  })

  it('skips unresolved slugs (returns empty, warns)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const result = resolveRelated(['nonexistent'], pool)
    expect(result).toHaveLength(0)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })

  it('deduplicates refs', () => {
    const result = resolveRelated(['artnet', 'artnet'], pool)
    expect(result).toHaveLength(1)
  })

  it('throws a build error when a bare slug matches multiple entries in different categories', () => {
    const ambiguous: EntryMeta[] = [
      make({ slug: 'osc', category: 'light' }),
      make({ slug: 'osc', category: 'sound' }),
    ]
    expect(() => resolveRelated(['osc'], ambiguous)).toThrow(/ambiguous/)
  })
})
```

- [ ] **Step 3.3: Run tests — confirm they fail**

```bash
npm test
```

Expected: Multiple failures — `taxonomy` module not found.

- [ ] **Step 3.4: Implement `src/lib/taxonomy.ts`**

```ts
import { CATEGORIES } from '../data/categories'
import type { Category } from '../data/categories'

export type { Category }

export type EntryMeta = {
  slug: string
  category: Category
  title: string
  subcategory: string
  normalizedSubcategory: string
  skill_level: 'beginner' | 'intermediate' | 'advanced'
  we_use_this: boolean
  related: string[]
  tags: string[]
}

export type SubcategoryNode = {
  name: string
  normalizedName: string
  entries: EntryMeta[]
}

export type CategoryNode = {
  category: Category
  subcategories: SubcategoryNode[]
}

export type TaxonomyTree = CategoryNode[]

export function buildTree(entries: EntryMeta[]): TaxonomyTree {
  const catMap = new Map<Category, Map<string, SubcategoryNode>>()

  for (const entry of entries) {
    if (!catMap.has(entry.category)) {
      catMap.set(entry.category, new Map())
    }
    const subMap = catMap.get(entry.category)!
    const key = entry.normalizedSubcategory
    if (!subMap.has(key)) {
      subMap.set(key, { name: entry.subcategory, normalizedName: key, entries: [] })
    }
    subMap.get(key)!.entries.push(entry)
  }

  return CATEGORIES
    .filter(cat => catMap.has(cat))
    .map(cat => ({
      category: cat,
      subcategories: Array.from(catMap.get(cat)!.values()),
    }))
}

export function parseHash(hash: string): { category: string; slug: string } | null {
  if (!hash || hash === '#') return null
  const parts = hash.replace(/^#/, '').split('/')
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null
  return { category: parts[0], slug: parts[1] }
}

export function serializeHash(category: string, slug: string): string {
  return `#${category}/${slug}`
}

export function buildEntryId(category: string, slug: string): string {
  return `entry-${category}-${slug}`
}

export function resolveRelated(related: string[], allEntries: EntryMeta[]): EntryMeta[] {
  const seen = new Set<string>()
  const result: EntryMeta[] = []

  for (const ref of related) {
    let match: EntryMeta | undefined

    if (ref.includes('/')) {
      const [cat, slug] = ref.split('/')
      match = allEntries.find(e => e.category === cat && e.slug === slug)
    } else {
      const matches = allEntries.filter(e => e.slug === ref)
      if (matches.length > 1) {
        throw new Error(
          `[taxonomy] ambiguous related slug "${ref}" matches entries in multiple categories: ` +
          matches.map(e => `${e.category}/${e.slug}`).join(', ') +
          '. Use category/slug form to disambiguate.'
        )
      }
      match = matches[0]
    }

    if (!match) {
      console.warn(`[taxonomy] unresolved related slug: "${ref}"`)
      continue
    }

    const key = `${match.category}/${match.slug}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push(match)
    }
  }

  return result
}
```

- [ ] **Step 3.5: Run tests — confirm they pass**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 3.6: Commit**

```bash
git add src/data/categories.ts src/lib/taxonomy.ts src/lib/taxonomy.test.ts
git commit -m "feat: taxonomy data layer with passing tests"
```

---

## Chunk 2: Content & Components

### Task 4: Seed content entries

**Files:**
- Create: `src/content/display/advatek-pixlite.md`
- Create: `src/content/display/touchdesigner.md`
- Create: `src/content/display/resolume-arena.md`
- Create: `src/content/display/led-strip.md`
- Create: `src/content/light/artnet.md`
- Create: `src/content/light/dmx-basics.md`
- Create: `src/content/physical/arduino.md`
- Create: `src/content/physical/stepper-motors.md`
- Create: `src/content/interaction/kinect.md`

- [ ] **Step 4.1: Create `src/content/display/advatek-pixlite.md`**

```markdown
---
title: Advatek PixLite
subcategory: LED Systems
skill_level: intermediate
we_use_this: true
related: [artnet, led-strip]
tags: [led, controller, ethernet, pixel, artnet]
---

Advatek PixLite controllers are Ethernet-to-pixel bridges that receive ArtNet or sACN data and output to addressable LED strips and pixel arrays. They are the link between a computer (running TouchDesigner, Resolume, or similar) and a physical LED installation.

## Use Cases

- Driving large-scale pixel arrays in immersive gallery rooms
- Synchronised LED walls and ceilings controlled from a media server
- Multi-zone addressable lighting for interactive installations

## Learning Resources

- [Advatek PixLite documentation](https://www.advateklights.com/knowledge-base)
- [ArtNet + TouchDesigner crash course (YouTube)](https://www.youtube.com/results?search_query=artnet+touchdesigner)
```

- [ ] **Step 4.2: Create `src/content/display/touchdesigner.md`**

```markdown
---
title: TouchDesigner
subcategory: Media Servers & Software
skill_level: intermediate
we_use_this: true
related: [artnet, resolume-arena]
tags: [realtime, generative, media-server, node-based, programming]
---

TouchDesigner is a node-based visual programming environment for creating interactive media systems, real-time generative content, and complex show control pipelines. Widely used in immersive art and live performance.

## Use Cases

- Generating real-time generative visuals for projection mapping
- Processing sensor input (cameras, Kinect, audio) to drive visuals
- Controlling LED arrays via ArtNet
- Building custom interactive installations

## Learning Resources

- [TouchDesigner official tutorials](https://derivative.ca/tutorials)
- [The Interactive & Immersive HQ (YouTube)](https://www.youtube.com/@TheInteractiveImmersiveHQ)
- [TouchDesigner community forum](https://forum.derivative.ca)
```

- [ ] **Step 4.3: Create `src/content/display/resolume-arena.md`**

```markdown
---
title: Resolume Arena
subcategory: Media Servers & Software
skill_level: intermediate
we_use_this: false
related: [touchdesigner]
tags: [vjing, projection, video, mapping, realtime]
---

Resolume Arena is professional VJ and video mapping software, widely used for projection mapping onto irregular surfaces, LED installations, and live visual performances.

## Use Cases

- Projection mapping onto complex physical surfaces
- Playing back and layering pre-rendered video for installations
- Live visual performance with DMX integration for synchronised lighting

## Learning Resources

- [Resolume official tutorials](https://resolume.com/training)
- [Resolume YouTube channel](https://www.youtube.com/resolume)
```

- [ ] **Step 4.4: Create `src/content/display/led-strip.md`**

```markdown
---
title: LED Strip / Pixel Tape
subcategory: LED Systems
skill_level: beginner
we_use_this: true
related: [advatek-pixlite, artnet]
tags: [led, hardware, pixel, ws2812, apa102]
---

Addressable LED strips allow individual control of each LED via a single data wire. Common variants include WS2812B (1-wire) and APA102/SK9822 (2-wire, higher refresh rate). Typically driven by a pixel controller such as the Advatek PixLite.

## Use Cases

- Edge-lit architectural features in gallery spaces
- Bias lighting behind display surfaces
- Pixel-mapped light installations driven from a media server

## Learning Resources

- [WLED project (open-source LED firmware)](https://kno.wled.ge)
- [Advatek PixLite + LED strip wiring guide](https://www.advateklights.com/knowledge-base)
```

- [ ] **Step 4.5: Create `src/content/light/artnet.md`**

```markdown
---
title: ArtNet
subcategory: Protocols
skill_level: intermediate
we_use_this: true
related: [dmx-basics, advatek-pixlite, touchdesigner]
tags: [protocol, dmx, networking, ethernet, sacn]
---

ArtNet is an open Ethernet-based protocol for transmitting DMX512 lighting data over IP networks. It allows a single computer to control hundreds of DMX universes across a venue using standard network infrastructure.

## Use Cases

- Sending lighting control data from a media server to DMX dimmers and pixel controllers
- Bridging software (TouchDesigner, QLab, QLC+) to physical lighting hardware
- Multi-room lighting synchronisation over the museum network

## Learning Resources

- [ArtNet specification (official)](https://art-net.org.uk)
- [ArtNet in TouchDesigner (Derivative docs)](https://derivative.ca/UserGuide/Art-Net)
```

- [ ] **Step 4.6: Create `src/content/light/dmx-basics.md`**

```markdown
---
title: DMX512
subcategory: Protocols
skill_level: beginner
we_use_this: true
related: [artnet]
tags: [protocol, lighting, control, hardware, standard]
---

DMX512 (Digital Multiplex) is the standard control protocol for professional stage and architectural lighting. Each DMX universe carries 512 channels over a single cable; each channel controls one parameter of a fixture (brightness, colour, pan, tilt, etc.).

## Use Cases

- Controlling conventional and LED stage lights
- Dimming architectural lighting in gallery spaces
- Triggering practical effects in installations

## Learning Resources

- [DMX512 explained for beginners (YouTube)](https://www.youtube.com/results?search_query=dmx512+explained)
- [QLC+ open source lighting software](https://qlcplus.org)
```

- [ ] **Step 4.7: Create `src/content/physical/arduino.md`**

```markdown
---
title: Arduino
subcategory: Microcontrollers
skill_level: beginner
we_use_this: true
related: [stepper-motors]
tags: [microcontroller, hardware, c++, sensors, actuators]
---

Arduino is an open-source microcontroller platform with a simple IDE and a large community. It is the most accessible way to connect physical sensors and actuators to a computer — a common starting point for interactive art installations.

## Use Cases

- Reading sensors (distance, touch, pressure, light) for interactive installations
- Controlling small motors, solenoids, and servos
- Serial communication with a media server (TouchDesigner, Processing)

## Learning Resources

- [Arduino official getting started guide](https://www.arduino.cc/en/Guide)
- [Arduino + TouchDesigner (YouTube)](https://www.youtube.com/results?search_query=arduino+touchdesigner)
```

- [ ] **Step 4.8: Create `src/content/physical/stepper-motors.md`**

```markdown
---
title: Stepper Motors
subcategory: Actuators
skill_level: intermediate
we_use_this: false
related: [arduino]
tags: [motor, actuator, mechanical, hardware, motion]
---

Stepper motors move in precise increments without a position sensor, making them ideal for controlled positioning. Typically driven by a dedicated driver board (A4988, TMC2209) wired to a microcontroller.

## Use Cases

- Kinetic sculptures with precise, repeatable movement
- Camera or mirror rigs requiring controlled pan/tilt
- Mechanical clocks, calendars, or displays in installations

## Learning Resources

- [Stepper motor basics (How To Mechatronics, YouTube)](https://www.youtube.com/results?search_query=stepper+motor+basics+how+to+mechatronics)
- [Arduino stepper motor tutorial](https://www.arduino.cc/en/Tutorial/LibraryExamples/StepperOneRevolution)
```

- [ ] **Step 4.9: Create `src/content/interaction/kinect.md`**

```markdown
---
title: Microsoft Kinect
subcategory: Depth Cameras
skill_level: intermediate
we_use_this: false
related: [touchdesigner]
tags: [depth-camera, skeleton-tracking, interaction, sensor, computer-vision]
---

The Kinect is a depth-sensing camera that captures a depth map and skeleton data of people in a scene. Originally developed for Xbox, it became a standard tool in interactive art for body tracking and presence detection.

## Use Cases

- Body-tracking for interactive installations (respond to movement)
- Presence detection — triggering content when someone enters a zone
- Depth-mapped visuals and particle effects in TouchDesigner

## Learning Resources

- [TouchDesigner Kinect tutorial (Derivative docs)](https://derivative.ca/UserGuide/Kinect)
- [Kinect for Windows SDK](https://developer.microsoft.com/en-us/windows/kinect)
```

- [ ] **Step 4.10: Verify no schema errors**

```bash
npm run dev
```

Expected: dev server starts, no content validation errors in terminal.

- [ ] **Step 4.11: Commit**

```bash
git add src/content/
git commit -m "feat: add seed content (display, light, physical, interaction)"
```

---

### Task 5: Global styles

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 5.1: Create `src/styles/global.css`**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0d0d14;
  --surface: #111118;
  --border: #2a2a38;
  --text: #e0e0ee;
  --text-muted: #888898;
  --accent: #7eb8f7;
  --accent-dim: #1a2a3a;
  --green: #7ef7a8;
  --green-dim: #1a2a1a;
  --purple: #c87ef7;
  --sidebar-w: 280px;
}

html, body { height: 100%; background: var(--bg); color: var(--text); font-family: system-ui, -apple-system, sans-serif; font-size: 14px; line-height: 1.5; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

/* Layout */
#app { display: flex; height: 100vh; overflow: hidden; }

#sidebar {
  width: var(--sidebar-w);
  min-width: var(--sidebar-w);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
}

#main { flex: 1; overflow-y: auto; padding: 32px; }

/* Sidebar header */
#sidebar-header { padding: 14px 12px 10px; border-bottom: 1px solid var(--border); }
#sidebar-header h2 { font-size: 0.82em; color: var(--text-muted); font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; }

/* Search */
#search-wrap { padding: 10px; border-bottom: 1px solid var(--border); }
#search-input {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 7px 10px;
  color: var(--text);
  font-size: 0.88em;
  outline: none;
}
#search-input:focus { border-color: var(--accent); }
#search-input:disabled { opacity: 0.4; cursor: not-allowed; }
#search-error { padding: 6px 12px; font-size: 0.82em; color: var(--text-muted); }

/* Search results */
#search-results { display: none; overflow-y: auto; flex: 1; padding: 4px 0; }
#search-results.active { display: block; }
.sr-item { padding: 7px 12px; cursor: pointer; border-radius: 4px; margin: 1px 4px; }
.sr-item:hover { background: rgba(255,255,255,0.05); }
.sr-title { font-size: 0.88em; color: var(--text); }
.sr-crumb { font-size: 0.78em; color: var(--text-muted); margin-top: 2px; }

/* Tree */
.tree { overflow-y: auto; flex: 1; padding: 8px 0; }
.tree-cat { margin-bottom: 2px; }
.tree-cat-hd, .tree-sub-hd {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; cursor: pointer; user-select: none;
  font-size: 0.83em; letter-spacing: 0.02em;
}
.tree-cat-hd { font-weight: 600; color: var(--text-muted); }
.tree-cat-hd:hover, .tree-sub-hd:hover { color: var(--text); }
.tree-sub-hd { padding-left: 26px; color: var(--text-muted); }
.tree-toggle { font-size: 0.68em; transition: transform 0.15s; flex-shrink: 0; }
.tree-toggle.open { transform: rotate(90deg); }
.tree-children { display: none; }
.tree-children.open { display: block; }
.tree-entry {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 12px 4px 40px;
  cursor: pointer; font-size: 0.84em; color: var(--text-muted);
  border-radius: 4px; margin: 1px 4px;
}
.tree-entry:hover { color: var(--text); background: rgba(255,255,255,0.04); }
.tree-entry.active { color: var(--accent); background: var(--accent-dim); }
.dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

/* Detail panel */
.entry-body { display: none; max-width: 720px; }
.entry-body.active { display: block; }
#welcome, #not-found { max-width: 600px; }
#not-found { display: none; }
#not-found.active { display: block; }

.entry-hd { margin-bottom: 20px; }
.entry-hd h1 { font-size: 1.6em; margin-bottom: 10px; }
.badges { display: flex; flex-wrap: wrap; gap: 6px; }
.badge {
  padding: 3px 10px; border-radius: 10px;
  font-size: 0.8em; border: 1px solid var(--border); background: var(--surface);
}
.badge-we-use { border-color: #3a5a3a; background: var(--green-dim); color: var(--green); }
.badge-skill { border-color: #3a2a5a; background: #1a1a2a; color: var(--purple); }

.entry-content h2 {
  font-size: 0.78em; text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--text-muted); margin: 28px 0 8px;
}
.entry-content p { color: var(--text-muted); line-height: 1.7; margin-bottom: 10px; }
.entry-content ul { padding-left: 18px; color: var(--text-muted); }
.entry-content li { margin-bottom: 4px; line-height: 1.7; }
.entry-content a { color: var(--accent); }
.related-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.related-chip {
  padding: 4px 12px; border-radius: 12px;
  border: 1px solid var(--border); font-size: 0.82em;
  cursor: pointer; color: var(--accent);
}
.related-chip:hover { background: var(--accent-dim); }

#welcome h1 { font-size: 1.4em; margin-bottom: 12px; }
#welcome p { color: var(--text-muted); line-height: 1.7; }

/* Mobile */
#mobile-browse { display: none; }

@media (max-width: 768px) {
  #sidebar {
    position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
    transform: translateX(-100%); transition: transform 0.2s;
  }
  #sidebar.open { transform: translateX(0); }
  #main { padding: 16px; }
  #mobile-browse {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 16px; border-bottom: 1px solid var(--border);
    cursor: pointer; font-size: 0.88em; color: var(--text-muted);
    background: var(--surface);
  }
}
```

- [ ] **Step 5.2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global styles"
```

---

### Task 6: Astro components

**Files:**
- Create: `src/components/EntryCard.astro`
- Create: `src/components/SearchBar.astro`
- Create: `src/components/TreeNav.astro`

- [ ] **Step 6.1: Create `src/components/EntryCard.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content'
import type { EntryMeta, Category } from '../lib/taxonomy'
import { buildEntryId, serializeHash } from '../lib/taxonomy'

interface Props {
  entry: CollectionEntry<Category>
  category: Category
  relatedEntries: EntryMeta[]
}

const { entry, category, relatedEntries } = Astro.props
const { Content } = await entry.render()
const fm = entry.data
const id = buildEntryId(category, entry.slug)
---

<article id={id} class="entry-body">
  <div class="entry-hd">
    <h1>{fm.title}</h1>
    <div class="badges">
      <span class="badge">{category}</span>
      <span class="badge badge-skill">{fm.skill_level}</span>
      {fm.we_use_this && <span class="badge badge-we-use">✦ We use this</span>}
    </div>
  </div>

  <div class="entry-content">
    <Content />
  </div>

  {relatedEntries.length > 0 && (
    <div>
      <h2>Related</h2>
      <div class="related-list">
        {relatedEntries.map(r => (
          <span class="related-chip" data-href={serializeHash(r.category, r.slug)}>
            {r.title}
          </span>
        ))}
      </div>
    </div>
  )}
</article>
```

- [ ] **Step 6.2: Create `src/components/SearchBar.astro`**

```astro
---
---
<div id="search-wrap">
  <input
    id="search-input"
    type="search"
    placeholder="🔍 Search..."
    autocomplete="off"
    aria-label="Search taxonomy"
  />
  <div id="search-error" hidden>Search unavailable offline</div>
</div>
```

- [ ] **Step 6.3: Create `src/components/TreeNav.astro`**

```astro
---
import type { TaxonomyTree } from '../lib/taxonomy'
import { serializeHash } from '../lib/taxonomy'
import { CATEGORY_META } from '../data/categories'

interface Props { tree: TaxonomyTree }
const { tree } = Astro.props
---

<nav id="sidebar">
  <div id="sidebar-header"><h2>Tech Taxonomy</h2></div>

  <slot name="search" />

  <div id="search-results" role="listbox"></div>

  <div class="tree" id="tree">
    {tree.map(node => {
      const meta = CATEGORY_META[node.category]
      return (
        <div class="tree-cat" data-cat={node.category}>
          <div class="tree-cat-hd">
            <span class="tree-toggle">▶</span>
            <span>{meta.emoji} {meta.label}</span>
          </div>
          <div class="tree-children">
            {node.subcategories.map(sub => (
              <div class="tree-sub">
                <div class="tree-sub-hd">
                  <span class="tree-toggle">▶</span>
                  <span>{sub.name}</span>
                </div>
                <div class="tree-children">
                  {sub.entries.map(e => (
                    <div class="tree-entry" data-href={serializeHash(e.category, e.slug)}>
                      {e.we_use_this && <span class="dot" title="We use this" />}
                      {e.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    })}
  </div>
</nav>
```

- [ ] **Step 6.4: Commit**

```bash
git add src/components/
git commit -m "feat: add Astro components (TreeNav, SearchBar, EntryCard)"
```

---

### Task 7: Main page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 7.1: Replace `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import type { Category, EntryMeta } from '../lib/taxonomy'
import { buildTree, resolveRelated } from '../lib/taxonomy'
import TreeNav from '../components/TreeNav.astro'
import SearchBar from '../components/SearchBar.astro'
import EntryCard from '../components/EntryCard.astro'
import '../styles/global.css'

import { CATEGORIES } from '../data/categories'

type Loaded = { meta: EntryMeta; entry: CollectionEntry<Category>; category: Category }

const loaded: Loaded[] = (
  await Promise.all(
    CATEGORIES.map(async cat => {
      const entries = await getCollection(cat)
      return entries.map(e => ({
        meta: {
          slug: e.slug,
          category: cat,
          title: e.data.title,
          subcategory: e.data.subcategory,
          normalizedSubcategory: e.data.subcategory.toLowerCase(),
          skill_level: e.data.skill_level,
          we_use_this: e.data.we_use_this,
          related: e.data.related,
          tags: e.data.tags,
        } satisfies EntryMeta,
        entry: e,
        category: cat,
      }))
    })
  )
).flat()

const allEntries = loaded.map(l => l.meta)
const tree = buildTree(allEntries)

// Safe JSON: escape </script> sequences
const taxonomyJson = JSON.stringify(allEntries).replace(/<\/script>/gi, '<\\/script>')
---

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Museum Tech Taxonomy</title>
</head>
<body>

<script id="taxonomy-data" type="application/json" set:html={taxonomyJson}></script>

<div id="mobile-browse">☰ Browse</div>

<div id="app">
  <TreeNav tree={tree}>
    <SearchBar slot="search" />
  </TreeNav>

  <div id="main">
    <div id="welcome">
      <h1>Museum Tech Taxonomy</h1>
      <p>
        A learning resource for the museum tech team. Browse the tree on the left
        to explore tools, protocols, and technologies — or search for something specific.
      </p>
    </div>

    <div id="not-found">
      <h1>Entry not found</h1>
      <p><a href="#" id="back-home">← Back home</a></p>
    </div>

    {loaded.map(({ entry, category, meta }) => (
      <EntryCard
        entry={entry}
        category={category}
        relatedEntries={resolveRelated(meta.related, allEntries)}
      />
    ))}
  </div>
</div>

<script>
  import '../scripts/app'
</script>

</body>
</html>
```

- [ ] **Step 7.2: Create stub `src/scripts/app.ts`** (replaced in Task 8)

```ts
// stub — implementation added in Task 8
export {}
```

- [ ] **Step 7.3: Verify the page builds**

```bash
npm run dev
```

Expected: page loads at `http://localhost:4321/<repo-name>/` (the name from Step 1.0, e.g. `http://localhost:4321/taxo/`), tree visible, welcome message shown, 4 category nodes rendered, no console errors.

- [ ] **Step 7.4: Commit**

```bash
git add src/pages/index.astro src/scripts/app.ts
git commit -m "feat: main page with tree nav and entry cards"
```

---

## Chunk 3: Client Logic & Deployment

### Task 8: Client-side app script

**Files:**
- Modify: `src/scripts/app.ts` (stub created in Task 7 Step 7.2)

- [ ] **Step 8.1: Replace `src/scripts/app.ts`**

```ts
import Fuse from 'fuse.js'
import { parseHash, serializeHash, buildEntryId } from '../lib/taxonomy'
import type { EntryMeta } from '../lib/taxonomy'

// ── Data ──────────────────────────────────────────────────────────────────────

const allEntries: EntryMeta[] = JSON.parse(
  document.getElementById('taxonomy-data')!.textContent!
)

// ── Navigation ────────────────────────────────────────────────────────────────

function showWelcome() {
  document.getElementById('welcome')!.style.display = ''
  document.getElementById('not-found')!.classList.remove('active')
  document.querySelectorAll<HTMLElement>('.entry-body.active').forEach(el => el.classList.remove('active'))
  document.querySelectorAll('.tree-entry.active').forEach(el => el.classList.remove('active'))
}

function navigate(hash: string) {
  // Clear active states
  document.querySelectorAll('.tree-entry.active').forEach(el => el.classList.remove('active'))
  document.querySelectorAll<HTMLElement>('.entry-body.active').forEach(el => el.classList.remove('active'))
  document.getElementById('welcome')!.style.display = 'none'
  document.getElementById('not-found')!.classList.remove('active')

  if (!hash || hash === '#') {
    showWelcome()
    return
  }

  const parsed = parseHash(hash)
  if (!parsed) { showWelcome(); return }

  const id = buildEntryId(parsed.category, parsed.slug)
  const article = document.getElementById(id)

  if (!article) {
    document.getElementById('not-found')!.classList.add('active')
    return
  }

  article.classList.add('active')

  // Highlight tree entry
  const treeEntry = document.querySelector<HTMLElement>(`.tree-entry[data-href="${hash}"]`)
  if (treeEntry) {
    treeEntry.classList.add('active')
    // Expand parent nodes
    let el: HTMLElement | null = treeEntry.parentElement
    while (el) {
      if (el.classList.contains('tree-children')) el.classList.add('open')
      if (el.classList.contains('tree-cat') || el.classList.contains('tree-sub')) {
        el.querySelector('.tree-toggle')?.classList.add('open')
      }
      el = el.parentElement
    }
  }

  // Close mobile sidebar
  document.getElementById('sidebar')?.classList.remove('open')
}

window.addEventListener('hashchange', () => navigate(location.hash))
navigate(location.hash)

// ── Tree toggle ───────────────────────────────────────────────────────────────

document.querySelectorAll<HTMLElement>('.tree-cat-hd, .tree-sub-hd').forEach(hd => {
  hd.addEventListener('click', () => {
    const parent = hd.parentElement!
    const children = parent.querySelector<HTMLElement>('.tree-children')
    const toggle = hd.querySelector('.tree-toggle')
    children?.classList.toggle('open')
    toggle?.classList.toggle('open')
  })
})

// ── Tree entry clicks ─────────────────────────────────────────────────────────

document.querySelectorAll<HTMLElement>('.tree-entry[data-href]').forEach(el => {
  el.addEventListener('click', () => { location.hash = el.dataset.href! })
})

// ── Related chip clicks ───────────────────────────────────────────────────────

document.addEventListener('click', e => {
  const chip = (e.target as HTMLElement).closest<HTMLElement>('.related-chip[data-href]')
  if (chip) location.hash = chip.dataset.href!
})

// ── Back home ────────────────────────────────────────────────────────────────

document.getElementById('back-home')?.addEventListener('click', e => {
  e.preventDefault()
  location.hash = ''
  showWelcome()
})

// ── Mobile toggle ─────────────────────────────────────────────────────────────

document.getElementById('mobile-browse')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.toggle('open')
})

// ── Search ────────────────────────────────────────────────────────────────────

const searchInput = document.getElementById('search-input') as HTMLInputElement
const searchResults = document.getElementById('search-results')!
const searchError = document.getElementById('search-error') as HTMLElement
const treeEl = document.getElementById('tree')!

type SearchEntry = EntryMeta & { body: string }
let fuse: Fuse<SearchEntry> | null = null
let fuseError = false

async function initFuse() {
  if (fuse || fuseError) return
  try {
    const base = (document.querySelector('base') as HTMLBaseElement | null)?.href ?? '/'
    const res = await fetch(`${base}search-index.json`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: SearchEntry[] = await res.json()
    fuse = new Fuse(data, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'body',  weight: 1 },
        { name: 'tags',  weight: 1.5 },
      ],
      threshold: 0.4,
    })
  } catch {
    fuseError = true
    searchInput.disabled = true
    searchError.hidden = false
  }
}

function clearSearch() {
  searchResults.classList.remove('active')
  searchResults.innerHTML = ''
  treeEl.style.display = ''
}

searchInput.addEventListener('input', async () => {
  const q = searchInput.value.trim()
  if (!q) { clearSearch(); return }

  await initFuse()
  if (fuseError) return

  treeEl.style.display = 'none'
  const hits = fuse!.search(q, { limit: 20 })

  searchResults.innerHTML = hits.length
    ? hits.map(h =>
        `<div class="sr-item" data-href="${serializeHash(h.item.category, h.item.slug)}">
           <div class="sr-title">${h.item.title}</div>
           <div class="sr-crumb">${h.item.category} › ${h.item.subcategory}</div>
         </div>`
      ).join('')
    : `<div class="sr-item" style="color:var(--text-muted)">No results</div>`

  searchResults.classList.add('active')

  searchResults.querySelectorAll<HTMLElement>('.sr-item[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      location.hash = el.dataset.href!
      searchInput.value = ''
      clearSearch()
    })
  })
})
```

- [ ] **Step 8.2: Test navigation in the browser**

```bash
npm run dev
```

Manual checks:
- Click a tree category header → subcategories expand
- Click a leaf entry → detail panel shows entry, tree entry highlights
- Copy URL with hash → paste in new tab → correct entry shown
- Clear hash in URL → welcome screen shown
- Type in search → results appear; click result → entry shown

- [ ] **Step 8.3: Commit**

```bash
git add src/scripts/app.ts
git commit -m "feat: client-side navigation, tree toggle, and search"
```

---

### Task 9: Search index build script

**Files:**
- Create: `scripts/build-search-index.mjs`

- [ ] **Step 9.1: Create `scripts/` directory and script**

```bash
mkdir -p scripts
```

Create `scripts/build-search-index.mjs`:

```js
import { readdir, readFile, writeFile } from 'fs/promises'
import { join, basename, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentDir = join(__dirname, '../src/content')
const distDir    = join(__dirname, '../dist')

const CATEGORIES = ['display', 'light', 'sound', 'physical', 'interaction']

// Minimal frontmatter parser (no extra deps — gray-matter may not be available)
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/s)
  if (!match) return { fm: {}, body: raw }
  const fmLines = match[1].split('\n')
  const fm = {}
  for (const line of fmLines) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim()
    if (val.startsWith('[')) {
      fm[key] = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean)
    } else {
      fm[key] = val.replace(/^['"]|['"]$/g, '')
    }
  }
  return { fm, body: match[2] }
}

function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function getFiles(dir) {
  try {
    const files = await readdir(dir)
    return files.filter(f => extname(f) === '.md').map(f => join(dir, f))
  } catch { return [] }
}

async function build() {
  const index = []
  for (const cat of CATEGORIES) {
    for (const file of await getFiles(join(contentDir, cat))) {
      const raw = await readFile(file, 'utf8')
      const { fm, body } = parseFrontmatter(raw)
      index.push({
        slug:        basename(file, '.md'),
        category:    cat,
        title:       fm.title ?? '',
        subcategory: fm.subcategory ?? '',
        body:        stripMarkdown(body),
        tags:        fm.tags ?? [],
      })
    }
  }
  await writeFile(join(distDir, 'search-index.json'), JSON.stringify(index))
  console.log(`[search-index] ${index.length} entries → dist/search-index.json`)
}

build().catch(err => { console.error('[search-index] error:', err); process.exit(1) })
```

- [ ] **Step 9.2: Run a full build and verify search index**

```bash
npm run build
```

Expected output includes:
```
[search-index] 9 entries → dist/search-index.json
```

Check the file exists:
```bash
ls dist/search-index.json
```

- [ ] **Step 9.3: Test search in preview**

```bash
npm run preview
```

Type a search query (e.g. "artnet") — results should appear.

- [ ] **Step 9.4: Commit**

```bash
git add scripts/build-search-index.mjs
git commit -m "feat: postbuild search index generator"
```

---

### Task 10: GitHub Actions deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 10.1: Update `astro.config.mjs` — set real repo name**

Replace `REPO_NAME` with the actual GitHub repository name:

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  base: '/taxo/',   // ← replace with your actual repo name
  output: 'static',
})
```

- [ ] **Step 10.2: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Read Node version
        id: node-version
        run: echo "version=$(cat .nvmrc)" >> $GITHUB_OUTPUT

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ steps.node-version.outputs.version }}
          cache: npm

      - run: npm ci

      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 10.3: Enable GitHub Pages in repo settings**

In the GitHub repo: Settings → Pages → Source → **GitHub Actions**

- [ ] **Step 10.4: Push to main and verify deployment**

```bash
git add astro.config.mjs .github/workflows/deploy.yml
git commit -m "chore: configure GitHub Actions deployment"
git push origin main
```

Expected: Actions tab shows a successful workflow run. Site live at `https://<org>.github.io/taxo/`.

- [ ] **Step 10.5: Smoke test the live site**

- Open the live URL
- Expand a tree category
- Click an entry — detail panel renders correctly
- Search for "artnet" — result appears and navigates correctly
- Copy a deep link (e.g. `.../#display/advatek-pixlite`) — paste in new tab, correct entry shown

---

## Done

Plan complete. The site is live, searchable, and ready for the tech team to add entries by creating markdown files.

**Adding a new entry:**
```
1. Create src/content/<category>/<slug>.md
2. git commit + push to main
3. GitHub Actions builds and deploys in ~1–2 min
```
