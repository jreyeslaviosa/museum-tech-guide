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
