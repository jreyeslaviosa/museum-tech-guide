import Fuse from 'fuse.js'
import { parseHash, serializeHash, buildEntryId } from '../lib/taxonomy'
import type { EntryMeta } from '../lib/taxonomy'

// ── Data ──────────────────────────────────────────────────────────────────────

const allEntries: EntryMeta[] = JSON.parse(
  document.getElementById('taxonomy-data')!.textContent!
)

// ── Navigation ────────────────────────────────────────────────────────────────

function hidePanels() {
  document.getElementById('welcome')!.style.display = 'none'
  document.getElementById('cat-view')!.classList.remove('active')
  document.getElementById('not-found')!.classList.remove('active')
  document.querySelectorAll<HTMLElement>('.entry-body.active').forEach(el => el.classList.remove('active'))
  document.querySelectorAll('.tree-entry.active').forEach(el => el.classList.remove('active'))
}

function showWelcome() {
  hidePanels()
  document.getElementById('welcome')!.style.display = ''
}

function navigate(hash: string) {
  hidePanels()

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

  // Highlight tree entry and expand parent nodes
  const treeEntry = document.querySelector<HTMLElement>(`.tree-entry[data-href="${hash}"]`)
  if (treeEntry) {
    treeEntry.classList.add('active')
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
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      location.hash = el.dataset.href!
    }
  })
})

// ── Related chip clicks ───────────────────────────────────────────────────────

document.addEventListener('click', e => {
  const chip = (e.target as HTMLElement).closest<HTMLElement>('.related-chip[data-href]')
  if (chip) location.hash = chip.dataset.href!
})

// ── Filters ───────────────────────────────────────────────────────────────────

let activeSkillFilter: string | null = null
let activeWeUseFilter = false
let activeTagFilter: string | null = null

function updateEntryCount() {
  const total = document.querySelectorAll<HTMLElement>('.tree-entry').length
  const visible = Array.from(document.querySelectorAll<HTMLElement>('.tree-entry'))
    .filter(e => e.style.display !== 'none').length
  const countEl = document.getElementById('entry-count')!
  const anyActive = activeSkillFilter !== null || activeWeUseFilter || activeTagFilter !== null
  countEl.textContent = anyActive ? `${visible} / ${total}` : ''
}

function applyFilters() {
  document.querySelectorAll<HTMLElement>('.tree-entry').forEach(el => {
    const skill = el.dataset.skill
    const weUse = el.dataset.weUse === 'true'
    const tags = (el.dataset.tags || '').split(',').filter(Boolean)
    let show = true
    if (activeSkillFilter && skill !== activeSkillFilter) show = false
    if (activeWeUseFilter && !weUse) show = false
    if (activeTagFilter && !tags.includes(activeTagFilter)) show = false
    el.style.display = show ? '' : 'none'
  })

  // Hide subcategories with no visible entries
  document.querySelectorAll<HTMLElement>('.tree-sub').forEach(sub => {
    const hasVisible = Array.from(sub.querySelectorAll<HTMLElement>('.tree-entry'))
      .some(e => e.style.display !== 'none')
    sub.style.display = hasVisible ? '' : 'none'
  })

  // Hide categories with no visible subcategories
  document.querySelectorAll<HTMLElement>('.tree-cat').forEach(cat => {
    const hasVisible = Array.from(cat.querySelectorAll<HTMLElement>('.tree-sub'))
      .some(e => e.style.display !== 'none')
    cat.style.display = hasVisible ? '' : 'none'
  })

  // Auto-expand all visible nodes when a filter is active
  const anyActive = activeSkillFilter !== null || activeWeUseFilter || activeTagFilter !== null
  if (anyActive) {
    document.querySelectorAll<HTMLElement>('.tree-cat, .tree-sub').forEach(node => {
      if (node.style.display !== 'none') {
        node.querySelector<HTMLElement>('.tree-children')?.classList.add('open')
        node.querySelector<HTMLElement>('.tree-toggle')?.classList.add('open')
      }
    })
  }

  updateEntryCount()
}

// Skill filter buttons
document.querySelectorAll<HTMLElement>('.filter-btn[data-skill]').forEach(btn => {
  btn.addEventListener('click', () => {
    const skill = btn.dataset.skill!
    if (activeSkillFilter === skill) {
      activeSkillFilter = null
      btn.classList.remove('active')
    } else {
      document.querySelectorAll<HTMLElement>('.filter-btn[data-skill]').forEach(b => b.classList.remove('active'))
      activeSkillFilter = skill
      btn.classList.add('active')
    }
    applyFilters()
  })
})

// We use this filter
document.getElementById('we-use-filter')?.addEventListener('click', function () {
  activeWeUseFilter = !activeWeUseFilter
  this.classList.toggle('active', activeWeUseFilter)
  applyFilters()
})

// Tag chip clicks (in entry cards)
document.addEventListener('click', e => {
  const chip = (e.target as HTMLElement).closest<HTMLElement>('.tag-chip[data-tag]')
  if (!chip) return
  const tag = chip.dataset.tag!
  activeTagFilter = activeTagFilter === tag ? null : tag

  const bar = document.getElementById('active-tag-bar')!
  const label = document.getElementById('active-tag-label')!
  if (activeTagFilter) {
    label.textContent = `#${activeTagFilter}`
    bar.hidden = false
    showWelcome()
  } else {
    bar.hidden = true
  }
  document.querySelectorAll<HTMLElement>('.tag-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.tag === activeTagFilter)
  })
  applyFilters()
})

// Clear tag filter
document.getElementById('clear-tag')?.addEventListener('click', () => {
  activeTagFilter = null
  document.getElementById('active-tag-bar')!.hidden = true
  document.querySelectorAll<HTMLElement>('.tag-chip').forEach(c => c.classList.remove('active'))
  applyFilters()
})

// ── Category view ─────────────────────────────────────────────────────────────

const CATEGORY_DESC: Record<string, string> = {
  'creative-code': 'Visual frameworks, engines & environments',
  display:         'Projection, LED panels & video distribution',
  'av-tools':      'Show control, audio & lighting protocols',
  physical:        'Microcontrollers, motors & embedded hardware',
  sensors:         'Depth cameras, tracking & computer vision',
  'ai-tools':      'Generative AI, voice synthesis & image tools',
}

const CATEGORY_LABELS: Record<string, string> = {}
document.querySelectorAll<HTMLElement>('.tree-cat[data-cat]').forEach(el => {
  const cat = el.dataset.cat!
  const label = el.querySelector<HTMLElement>('.tree-cat-hd span:last-child')?.textContent ?? cat
  CATEGORY_LABELS[cat] = label
})

function showCategoryView(cat: string) {
  hidePanels()
  const view = document.getElementById('cat-view')!
  document.getElementById('cat-view-title')!.textContent = CATEGORY_LABELS[cat] ?? cat
  document.getElementById('cat-view-desc')!.textContent = CATEGORY_DESC[cat] ?? ''

  const entries = allEntries.filter(e => e.category === cat)
  const list = document.getElementById('cat-view-entries')!
  list.innerHTML = entries.map(e =>
    `<div class="cv-entry" data-href="${serializeHash(e.category, e.slug)}">
       <div class="cv-entry-left">
         <span class="skill-dot skill-${e.skill_level}" title="${e.skill_level}"></span>
         <span class="cv-title">${e.title}</span>
       </div>
       <span class="cv-sub">${e.subcategory}</span>
       ${e.we_use_this ? '<span class="cv-we-use">◆</span>' : ''}
     </div>`
  ).join('')

  list.querySelectorAll<HTMLElement>('.cv-entry[data-href]').forEach(el => {
    el.addEventListener('click', () => { location.hash = el.dataset.href! })
  })

  view.classList.add('active')
}

// Category card clicks
document.querySelectorAll<HTMLElement>('.cat-card[data-cat]').forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.dataset.cat!
    showCategoryView(cat)
    // Also expand in tree
    const catEl = document.querySelector<HTMLElement>(`.tree-cat[data-cat="${cat}"]`)
    if (catEl) {
      catEl.querySelector<HTMLElement>('.tree-children')?.classList.add('open')
      catEl.querySelector<HTMLElement>('.tree-toggle')?.classList.add('open')
    }
  })
})

// Cat view back button
document.getElementById('cat-view-back')?.addEventListener('click', () => {
  showWelcome()
})

// ── Back home ────────────────────────────────────────────────────────────────

document.getElementById('back-home')?.addEventListener('click', e => {
  e.preventDefault()
  location.hash = ''
  showWelcome()
})

document.getElementById('home-link')?.addEventListener('click', () => {
  location.hash = ''
  showWelcome()
})

// ── Mobile toggle ─────────────────────────────────────────────────────────────

document.getElementById('mobile-browse')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.toggle('open')
})

// ── Keyboard navigation ───────────────────────────────────────────────────────

const searchInput = document.getElementById('search-input') as HTMLInputElement

document.addEventListener('keydown', e => {
  // / to focus search (when not already in an input)
  if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
    e.preventDefault()
    searchInput.focus()
    searchInput.select()
    return
  }

  // Escape: clear search or go back to welcome
  if (e.key === 'Escape') {
    if (searchInput.value) {
      searchInput.value = ''
      searchInput.dispatchEvent(new Event('input'))
      searchInput.blur()
    } else if (document.getElementById('cat-view')!.classList.contains('active')) {
      showWelcome()
    } else if (document.querySelector('.entry-body.active')) {
      location.hash = ''
      showWelcome()
    }
    return
  }

  // Arrow keys navigate tree entries when tree is focused
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const focused = document.activeElement as HTMLElement
    if (!focused?.classList.contains('tree-entry')) return
    e.preventDefault()
    const all = Array.from(document.querySelectorAll<HTMLElement>('.tree-entry'))
      .filter(el => el.style.display !== 'none' && el.offsetParent !== null)
    const idx = all.indexOf(focused)
    const next = e.key === 'ArrowDown' ? all[idx + 1] : all[idx - 1]
    next?.focus()
  }
})

// ── Search ────────────────────────────────────────────────────────────────────

const searchResults = document.getElementById('search-results')!
const searchError = document.getElementById('search-error') as HTMLElement
const treeEl = document.getElementById('tree')!

type SearchEntry = EntryMeta & { body: string }
let fuse: Fuse<SearchEntry> | null = null
let fuseError = false

async function initFuse() {
  if (fuse || fuseError) return
  try {
    const base = (document.querySelector('base') as HTMLBaseElement | null)?.href
      ?? import.meta.env.BASE_URL
      ?? '/'
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
           <div class="sr-title">
             <span class="skill-dot skill-${h.item.skill_level}"></span>
             ${h.item.title}
             ${h.item.we_use_this ? '<span class="sr-we-use">◆</span>' : ''}
           </div>
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
